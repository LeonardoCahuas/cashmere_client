import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'
import { ChatControls } from './ChatControls'
import { ChatHeader } from './ChatHeader'
import { MessageList } from './MessageList'
import { UserProps } from '..'
import { MessageProps } from './components/Message'
import { ModalSheetProvider } from 'apps/expo/app/components/ModalSheet'
import { ModalOptions, ModalSheet } from 'apps/expo/app/components/ModalSheet/ModalSheet'
import { useAppStore } from 'apps/expo/app/setup/store'
import { Colors, Icon } from '@siva/ui'
import { linkToDetail } from '../../PostingDetailView/_link'
import { Posting } from '@siva/entities'
import { HorizontalModalSheet } from 'apps/expo/app/components/ModalSheet/HorizontalModalSheet'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';

export interface ChatProps {
  id: string
  users: UserProps[]
  vehicle: Posting | null
  messages: MessageProps[]
}

export interface MediaItem {
  base64: string;
  type: 'image' | 'document';
  name?: string;
  size?: number;
}

const ChatView = ({ chat, currentUser }: { chat: ChatProps, currentUser: string }) => {
  const { chatModalRef, mediaModalRef } = useAppStore((s) => s.messages)
  const [selectedMedia, setSelectedMedia] = useState<MediaItem[]>([]);

  const options: ModalOptions = {
    options: [
      {
        label: 'Attiva notifiche',
        icon: <Icon name="notifications" color={Colors.blackPrimary} />,
        action: () => { }
      },
      {
        label: 'Blocca utente',
        icon: <Icon name="block" color={Colors.blackPrimary} />,
        action: () => { }
      },
      {
        label: 'Segnala utente',
        icon: <Icon name="report" color={Colors.blackPrimary} />,
        action: () => { }
      },
      {
        label: 'Elimina chat',
        icon: <Icon name="trash" color={"red"} />,
        action: () => { }
      },
    ]
  }

  const handleRemoveMedia = (index: number) => {
    setSelectedMedia(prev => prev.filter((_, i) => i !== index));
  };

  const handleMediaSelect = async (type: 'camera' | 'gallery' | 'document') => {
    try {
      switch (type) {
        case 'camera': {
          const { status } = await ImagePicker.requestCameraPermissionsAsync();
          if (status !== 'granted') return;

          const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
          });

          if (!result.canceled && result.assets[0]) {
            const base64 = await getBase64(result.assets[0].uri);
            setSelectedMedia(prev => [...prev, {
              base64: base64,
              type: 'image',
              name: result.assets[0].fileName ?? undefined,
              size: result.assets[0].fileSize
            }]);
          }
          break;
        }

        case 'gallery': {
          if (selectedMedia.length >= 5) return;

          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') return;

          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            allowsMultipleSelection: true,
          });

          if (!result.canceled && result.assets) {
            const remainingSlots = 5 - selectedMedia.length;
            const newMedia: MediaItem[] = await Promise.all(result.assets
              .slice(0, remainingSlots)
              .map(async asset => {
                const base64 = await getBase64(asset.uri);
                return {
                  base64: base64,
                  type: 'image',
                  name: asset.fileName,
                  size: asset.fileSize
                } as MediaItem;
              }));

            setSelectedMedia((prev) => ([...prev, ...newMedia]));
          }
          break;
        }

        case 'document': {
          const result = await DocumentPicker.getDocumentAsync({
            type: '*/*',
            multiple: false,
            copyToCacheDirectory: true,
          });

          if (result.assets && result.assets[0]) {
            const document = result.assets[0];

            if (document.size && document.size > 3 * 1024 * 1024 * 1024) return;

            const base64 = await getBase64(document.uri);
            setSelectedMedia(prev => [...prev, {
              base64: base64,
              type: 'document',
              name: document.name,
              size: document.size
            }]);
          }
          break;
        }
      }
      mediaModalRef.current?.close();
    } catch (err) {
      console.error('errore nella selezione del documento:', err);
    }
  };

  const getBase64 = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const mediaOptions: ModalOptions = {
    options: [
      {
        label: 'Fotocamera',
        icon: <Icon name="camera" color={Colors.blackPrimary} width={30} height={30} />,
        action: () => handleMediaSelect('camera')
      },
      {
        label: 'Galleria',
        icon: <Icon name="gallery" color={Colors.blackPrimary} width={30} height={30} />,
        action: () => handleMediaSelect('gallery')
      },
      {
        label: 'Documento',
        icon: <Icon name="document" color={Colors.blackPrimary} width={30} height={30} />,
        action: () => handleMediaSelect('document')
      },
    ]
  };

  const handlePress = (posting: Posting | null) => {
    if (!posting) return
    linkToDetail(posting)
  }

  return (
    <ModalSheetProvider>
      <View style={styles.container}>
        {chat.vehicle && <ChatHeader data={chat.vehicle} onClick={() => handlePress(chat?.vehicle)} />}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
          keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        >
          <MessageList id={currentUser} messages={chat.messages} users={chat.users} />
          <ChatControls
            selectedMedia={selectedMedia}
            onRemoveMedia={handleRemoveMedia} 
            onAddMedia={handleMediaSelect} 
            />
        </KeyboardAvoidingView>
      </View>
      <ModalSheet ref={chatModalRef} title="Azioni" options={options} />
      <HorizontalModalSheet ref={mediaModalRef} options={mediaOptions} />
    </ModalSheetProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  keyboardAvoidingView: {
    flex: 1
  }
})

export default ChatView
