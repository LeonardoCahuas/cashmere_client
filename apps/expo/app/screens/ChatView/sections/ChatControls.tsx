import { Colors, Icon } from '@siva/ui'
import { StyleSheet, TextInput, View } from 'react-native'

export const ChatControls = () => {
    return (
        <View style={styles.container}>
            <View>
                <Icon name="tab_plus" color={Colors.blackPrimary} width={25} height={25} />
            </View>
            <View style={styles.inputCont}>
                <TextInput placeholder='Scrivi un messaggio...' style={styles.input} />
                <View style={styles.arrow}>
                    <Icon name="chevron-right" color={"white"} height={15} />
                </View>
            </View>
            <View>
                <Icon name="camera" color={Colors.greenPrimary} width={30} height={30} />
            </View>
            <View>
                <Icon name='microphone' color={Colors.greenPrimary} width={30} height={25} />
            </View>
        </View>
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
        paddingBottom:35,
        borderTopWidth: 0.3,
        borderTopColor: Colors.greySecondary,
        backgroundColor: "white",
    },
    input: {
        color: Colors.blackPrimary,
        flex: 1
    },
    inputCont: {
        flex: 1,
        borderRadius: 20,
        backgroundColor: Colors.lightGray,
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection: "row",
        alignItems: "center"
    },
    arrow: {
        borderRadius: 100,
        backgroundColor: Colors.greenPrimary,
        width: 25,
        height: 25,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    }
})
