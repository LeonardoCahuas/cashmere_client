import { Colors, Icon } from '@siva/ui'
import { useAppStore } from 'apps/expo/app/setup/store'
import { StyleSheet, TextInput, TouchableOpacity, View, Image, ScrollView, Text } from 'react-native'
import { Keyboard } from 'react-native';
import { MediaItem } from '.';
import { useEffect, useState } from 'react';
import { LayoutAnimation } from 'react-native';

interface ChatControlsProps {
    selectedMedia: MediaItem[];
    onRemoveMedia: (index: number) => void;
    onAddMedia: (media: string) => void;
}

export const ChatControls = ({ selectedMedia, onRemoveMedia, onAddMedia }: ChatControlsProps) => {
    const { openMediaModal } = useAppStore((s) => s.messages)
    const [message, setMessage] = useState('')
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

    useEffect(() => {
        const keyboardWillShowListener = Keyboard.addListener(
            'keyboardWillShow',
            () => setIsKeyboardOpen(true)
        );
        const keyboardWillHideListener = Keyboard.addListener(
            'keyboardWillHide',
            () => setIsKeyboardOpen(false)
        );

        return () => {
            keyboardWillShowListener.remove();
            keyboardWillHideListener.remove();
        };
    }, []);

    const handlePlusPress = () => {
        Keyboard.dismiss();
        openMediaModal();
    };

    const handleMessageChange = (text: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setMessage(text);
    };

    return (
        <>
            {selectedMedia.length > 0 && (
                <ScrollView
                    horizontal
                    style={styles.imagePreviewContainer}
                    contentContainerStyle={styles.imagePreviewContent}
                    showsHorizontalScrollIndicator={false}
                >
                    {selectedMedia.map((media, index) => (
                        <View key={index} style={styles.imageWrapper}>
                            {media.type === 'image' ? (
                                <Image source={{ uri: media.base64 }} style={styles.imagePreview} />
                            ) : (
                                <View style={styles.documentPreview}>
                                    <Icon name="document" color={Colors.blackPrimary} width={30} height={30} />
                                    <Text numberOfLines={1} style={styles.documentName}>
                                        {media.name || 'Documento'}
                                    </Text>
                                </View>
                            )}
                            <TouchableOpacity
                                style={styles.removeImage}
                                onPress={() => onRemoveMedia(index)}
                            >
                                <Icon name="close" color={Colors.blackPrimary} width={10} height={10} />
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            )}
            <View style={[styles.container, !isKeyboardOpen ? { paddingBottom: 50 } : { paddingBottom: 20 }]}>
                <TouchableOpacity
                    onPress={handlePlusPress}
                    disabled={selectedMedia.length >= 5}
                >
                    <Icon
                        name="tab_plus"
                        color={selectedMedia.length >= 5 ? Colors.greySecondary : Colors.blackPrimary}
                        width={25}
                        height={25}
                    />
                </TouchableOpacity>
                <View style={styles.inputCont}>
                    <TextInput 
                        style={styles.input} 
                        value={message} 
                        onChangeText={handleMessageChange} 
                    />
                    <TouchableOpacity style={styles.arrow}>
                        <Icon name="chevron-right" color={"white"} height={15} />
                    </TouchableOpacity>
                </View>
                {message.length < 1 && <TouchableOpacity onPress={() => onAddMedia('camera')}>
                    <Icon name="camera" color={Colors.greenPrimary} width={30} height={30} />
                </TouchableOpacity>}
                {message.length < 1 && <TouchableOpacity>
                    <Icon name='microphone' color={Colors.greenPrimary} width={30} height={25} />
                </TouchableOpacity>}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 20,
        paddingHorizontal: 25,
        paddingTop: 10,
        borderTopWidth: 0.3,
        borderTopColor: Colors.greySecondary,
        backgroundColor: "white",
    },
    input: {
        color: Colors.blackPrimary,
        flex: 1,
    },
    inputCont: {
        flex: 1,
        borderRadius: 20,
        backgroundColor: Colors.lightGray,
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: Colors.greySecondary
    },
    arrow: {
        borderRadius: 100,
        backgroundColor: Colors.greenPrimary,
        width: 25,
        height: 25,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    imagePreviewContainer: {
        backgroundColor: 'white',
        borderTopWidth: 0.3,
        borderTopColor: Colors.greySecondary,
        maxHeight: 85,
    },
    imagePreviewContent: {
        padding: 8,
    },
    imageWrapper: {
        marginRight: 8,
        position: 'relative',
    },
    imagePreview: {
        width: 65,
        height: 65,
        borderRadius: 6,
    },
    removeImage: {
        position: 'absolute',
        top: -4,
        right: -4,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 5,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
    },
    documentPreview: {
        width: 65,
        height: 65,
        borderRadius: 6,
        backgroundColor: Colors.lightGray,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    documentName: {
        fontSize: 10,
        color: Colors.blackPrimary,
        marginTop: 4,
        maxWidth: 60,
    },
});
