import { Colors } from "@siva/ui"
import { Image, StyleSheet, Text, View } from "react-native"
import { UserProps } from "../MessageList"
import { Message as MessageType } from "../_query"

export interface MessageProps extends MessageType {
    sender_picture?: string
}

export const Message = ({ data, isIncoming, user }: { data: MessageProps, isIncoming: boolean, user: UserProps | undefined }) => {
    const time = new Date(data.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const renderUserAvatar = () => {
        if (user?.image) {
            return <Image source={{ uri: user.image }} style={styles.image} />;
        } else if (user?.name) {
            return (
                <View style={[styles.image, styles.avatarPlaceholder]}>
                    <Text style={styles.avatarLetter}>{user.name.charAt(0).toUpperCase()}</Text>
                </View>
            );
        }
        return null;
    };

    return (
        <View style={[styles.container, isIncoming ? { flexDirection: "row", alignItems: "center", gap: 10 } : {}]}>
            {isIncoming && renderUserAvatar()}
            <View style={isIncoming ? styles.messageIncoming : styles.messageOutgoing}>
                <Text style={styles.time}>{time}</Text>
                <View style={[styles.content, isIncoming ? styles.contentIncoming : styles.contentOutgoing]}>
                    <Text style={{ color: isIncoming ? Colors.blackPrimary : "white", lineHeight: 22, fontSize: 15 }}>{data.content}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "70%"
    },
    image: {
        width: 35,
        height: 35,
        borderRadius: 35
    },
    messageIncoming: {
        flexDirection: "column",
        alignItems: "flex-start"
    },
    messageOutgoing: {
        flexDirection: "column",
        alignItems: "flex-end"
    },
    content: {
        padding: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    contentIncoming: {
        backgroundColor: Colors.lightGray,
        color: Colors.blackPrimary,
        borderBottomLeftRadius: 0,
    },
    contentOutgoing: {
        backgroundColor: Colors.greenPrimary,
        color: "white",
        borderBottomRightRadius: 0,
    },
    time: {
        fontSize: 10,
        color: Colors.greyPrimary
    },
    avatarPlaceholder: {
        width:35,
        height:35,
        borderRadius:35,
        backgroundColor: Colors.blackPrimary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarLetter: {
        fontSize: 17,
        color: "white",
        fontWeight: '400',
    }
})
