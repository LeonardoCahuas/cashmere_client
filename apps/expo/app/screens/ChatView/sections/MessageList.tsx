import { FlatList, View, StyleSheet, Text } from "react-native"
import { Message, MessageProps } from "./components/Message"
import { UserProps } from ".."
import { Colors } from "@siva/ui"


const MessageRenderer = ({ data, from, user }: { data: MessageProps, from: boolean, user: UserProps | undefined }) => {
    return (
        <View style={[styles.messageWrapper, { alignItems: from ? "flex-start" : "flex-end" }]}>
            <Message data={data} isIncoming={from} user={user} />
        </View>)
}


const DateDivider = ({ date }: { date: Date }) => {
    const formattedDate = date.toLocaleDateString('it-IT', { weekday: 'short', day: 'numeric', month: 'long' });
    return (
        <View style={styles.dateDivider}>
            <Text style={styles.dateDividerText}>{formattedDate}</Text>
        </View>
    );
}


export const MessageList = ({ id, messages, users }: { id: string, messages: MessageProps[], users: UserProps[] }) => {
    const sort = (messages: MessageProps[]): MessageProps[] => {
        return [...messages].sort((a, b) =>
             new Date(a.created_at).getTime() - new Date(b.created_at).getTime() 
        );
    };

    const groupMessagesByDate = (messages: MessageProps[]): (MessageProps | { type: 'dateDivider', date: Date })[] => {
        const sortedMessages = sort(messages);
        const groupedMessages: (MessageProps | { type: 'dateDivider', date: Date })[] = [];
        let currentDate: string | null = null;

        for (let i = 0; i < sortedMessages.length; i++) {
            const message = sortedMessages[i];
            const messageDate = new Date(message.created_at).toDateString();
            
            if (messageDate !== currentDate) {
                groupedMessages.push({ type: 'dateDivider', date: new Date(message.created_at) });
                currentDate = messageDate;
            }
            
            groupedMessages.push(message);
        }

        return groupedMessages.reverse();
    };

    const renderItem = ({ item }: { item: MessageProps | { type: 'dateDivider', date: Date } }) => {
        if ('type' in item && item.type === 'dateDivider') {
            return <DateDivider date={item.date} />;
        }
        return <MessageRenderer data={item} from={id !== item.sender_id} user={users.find(user => user.id == item.sender_id)} />;
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={groupMessagesByDate(messages)}
                inverted
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    messageWrapper: {
        flexDirection: "column",
        marginVertical: 10,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    listContent: {
        paddingBottom: 100,
    },
    dateDivider: {
        alignItems: 'center',
        marginVertical: 10,
    },
    dateDividerText: {
        color: Colors.greyPrimary,
        fontSize: 13,
        fontWeight:"500"
    },
})
