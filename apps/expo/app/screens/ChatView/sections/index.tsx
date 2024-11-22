import { Posting } from '@siva/entities'
import { Colors, Icon } from '@siva/ui'
import { ModalSheetProvider } from 'apps/expo/app/components/ModalSheet'
import {
  HorizontalModalOptions,
  HorizontalModalSheet,
} from 'apps/expo/app/components/ModalSheet/HorizontalModalSheet'
import { ModalOptions, ModalSheet } from 'apps/expo/app/components/ModalSheet/ModalSheet'
import { useAppStore } from 'apps/expo/app/setup/store'
import * as DocumentPicker from 'expo-document-picker'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'
import { linkToDetail } from '../../PostingDetailView/_link'
import { ChatControls } from './ChatControls'
import { ChatHeader } from './ChatHeader'
import { MessageList } from './MessageList'
import { useChat, useGetMessages } from './_query'
import { getBase64 } from './_utils'

export interface UserProps {
  id: string
  name: string
  image: string | null
}

const mock_posting: Posting = {
  id: 'b89e5b72-9d28-474d-ace3-44ca21437d97',
  created_at: '',
  posting_id: '',
  duration: 'GIORNALIERO',
  subtitle: null,
  dropoff_location_plain: '',
  pickup_location_plain: '',
  deposit: '',
  price: 1400,
  age_required: 0,
  distance_limit_in_km: '',
  taxes_included: false,
  vehicle_id: '',
  brand: 'Lamborghini',
  model: 'Huracan',
  fuel_type: '',
  year: 0,
  interior_material: null,
  interior_color: null,
  exterior_color: null,
  transmission_type: null,
  vehicle_images: [
    'https://mkvfjhboywoocbqdzilx.supabase.co/storage/v1/object/public/images/kia-sorento-2024-frontal-lateral.369513.webp?t=2024-09-25T16%3A15%3A47.703Z',
  ],
  renter_name: null,
  bookmarked: false,
  vehicle_type: '',
  services: [],
  insurancePolicies: [],
  otherServices: [],
}

const chatId = '93b858d7-1444-41ae-8f21-e76eb01f236b'
const users = [
  {
    id: '79194c4e-37fc-475b-aee6-f53d351d9406',
    name: 'Rod',
    image:
      'https://lh3.googleusercontent.com/ogw/AF2bZygqwVtHlqfvqHOrJ5AQWQPRSBDG_2cC3IL6HsmnmpR0MA=s64-c-mo',
  },
  {
    id: 'fa0d125a-756d-4fba-8de1-d36597e0c41b',
    name: 'Leo',
    image: null,
  },
]

const ChatView = () => {
  const { chatModalRef, mediaModalRef, __loadedUser } = useAppStore((s) => s.messages)
  const [selectedMedia, setSelectedMedia] = useState<MediaItem[]>([])

  const { sendMessage } = useChat({
    chatId,
    userId: __loadedUser,
    sessionToken: '',
  })
  console.log('chat view')
  const { data: messages } = useGetMessages(chatId)

  const options: ModalOptions = [
    {
      label: 'Attiva notifiche',
      icon: <Icon name="notifications" color={Colors.blackPrimary} />,
      action: () => {},
    },
    {
      label: 'Blocca utente',
      icon: <Icon name="block" color={Colors.blackPrimary} />,
      action: () => {},
    },
    {
      label: 'Segnala utente',
      icon: <Icon name="report" color={Colors.blackPrimary} />,
      action: () => {},
    },
    {
      label: 'Elimina chat',
      icon: <Icon name="trash" color={'red'} />,
      action: () => {},
    },
  ]

  const handleRemoveMedia = (index: number) => {
    setSelectedMedia((prev) => prev.filter((_, i) => i !== index))
  }

  const handleMediaSelect = async (type: 'camera' | 'gallery' | 'document') => {
    try {
      switch (type) {
        case 'camera': {
          const { status } = await ImagePicker.requestCameraPermissionsAsync()
          if (status !== 'granted') return

          const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
          })

          if (!result.canceled && result.assets[0]) {
            const base64 = await getBase64(result.assets[0].uri)
            setSelectedMedia((prev) => [
              ...prev,
              {
                base64: base64,
                type: 'image',
                name: result.assets[0].fileName ?? undefined,
                size: result.assets[0].fileSize,
              },
            ])
          }
          break
        }

        case 'gallery': {
          if (selectedMedia.length >= 5) return

          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
          if (status !== 'granted') return

          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            allowsMultipleSelection: true,
          })

          if (!result.canceled && result.assets) {
            const remainingSlots = 5 - selectedMedia.length
            const newMedia: MediaItem[] = await Promise.all(
              result.assets.slice(0, remainingSlots).map(async (asset) => {
                const base64 = await getBase64(asset.uri)
                return {
                  base64: base64,
                  type: 'image',
                  name: asset.fileName,
                  size: asset.fileSize,
                } as MediaItem
              })
            )

            setSelectedMedia((prev) => [...prev, ...newMedia])
          }
          break
        }

        case 'document': {
          const result = await DocumentPicker.getDocumentAsync({
            type: '*/*',
            multiple: false,
            copyToCacheDirectory: true,
          })

          if (result.assets && result.assets[0]) {
            const document = result.assets[0]

            if (document.size && document.size > 3 * 1024 * 1024 * 1024) return

            const base64 = await getBase64(document.uri)
            setSelectedMedia((prev) => [
              ...prev,
              {
                base64: base64,
                type: 'document',
                name: document.name,
                size: document.size,
              },
            ])
          }
          break
        }
      }
      mediaModalRef.current?.close()
    } catch (err) {
      console.error('errore nella selezione del documento:', err)
    }
  }

  const mediaOptions: HorizontalModalOptions = {
    options: [
      {
        label: 'Fotocamera',
        icon: <Icon name="camera" color={Colors.blackPrimary} width={30} height={30} />,
        action: () => handleMediaSelect('camera'),
      },
      {
        label: 'Galleria',
        icon: <Icon name="gallery" color={Colors.blackPrimary} width={30} height={30} />,
        action: () => handleMediaSelect('gallery'),
      },
      {
        label: 'Documento',
        icon: <Icon name="document" color={Colors.blackPrimary} width={30} height={30} />,
        action: () => handleMediaSelect('document'),
      },
    ],
  }

  const handlePress = (posting: Posting | null) => {
    if (!posting) return
    linkToDetail(posting)
  }
  console.log('messages!', messages)
  if (!messages) return null

  return (
    <ModalSheetProvider>
      <View style={styles.container}>
        {mock_posting && (
          <ChatHeader data={mock_posting} onClick={() => handlePress(mock_posting)} />
        )}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          <MessageList id={__loadedUser} messages={messages.messages} users={users} />
          <ChatControls
            selectedMedia={selectedMedia}
            onRemoveMedia={handleRemoveMedia}
            onAddMedia={handleMediaSelect}
            sendMessage={sendMessage}
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
    backgroundColor: 'white',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
})

export default ChatView

export interface MediaItem {
  base64: string
  type: 'image' | 'document'
  name?: string
  size?: number
}

const x = {
  messages: [
    {
      content: 'Qwert',
      created_at: '2024-11-22T07:00:58.361859+00:00',
      sender_id: 'fa0d125a-756d-4fba-8de1-d36597e0c41b',
      type: 'text',
    },
  ],
  posting: {
    brand: 'Honda',
    id: '203fa9f8-d5f3-409d-a286-594a92921206',
    model: 'CRV',
    preview:
      'https://mkvfjhboywoocbqdzilx.supabase.co/storage/v1/object/public/images/2024HondaCr-v_4dr-suvSport-hybridFqOem_1_815.avif?t=2024-09-25T20%3A14%3A47.707Z',
    price: 179,
    term: 'long_term',
  },
  users: [{ id: 'fa0d125a-756d-4fba-8de1-d36597e0c41b', image: null, name: 'Drigo' }],
}
