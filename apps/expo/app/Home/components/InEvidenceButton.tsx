import { Colors } from '@siva/ui';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface InEvidenceData {
    title: string;
    text: string;
    buttonText: string;
    imageUrl: string;
}

interface InEvidenceProps {
    data: InEvidenceData;
    onButtonClick: () => void;
}

export const InEvidenceButton: React.FC<InEvidenceProps> = ({ data, onButtonClick }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: data.imageUrl }} style={styles.cardImage} />
            <View style={styles.inEvidenceCont}>
                <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                    {data.title}
                </Text>
                <Text style={styles.text} numberOfLines={3}>
                    {data.text}
                </Text>
                <TouchableOpacity style={styles.button} onPress={onButtonClick}>
                    <Text style={styles.buttonText}>{data.buttonText}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        width: "70%",
        padding: 6,
        borderColor: Colors.greySecondary,
        borderWidth: 1,
        borderRadius: 10,
        overflow: "hidden",
    },
    cardImage: {
        width: 100,
        height: 120,
        borderRadius: 10,
    },
    title: {
        fontSize: 12,
        fontWeight: "500",
        flexShrink: 1, // Allow text to shrink if needed
        overflow: "hidden", // Hide overflow content
        textAlign: "left", // Align text to the left
    },
    text: {
        color: Colors.greyPrimary,
        fontSize: 10,
        flexShrink: 1, 
        marginBottom: 10,
    },
    button: {
        backgroundColor: Colors.greenPrimary,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 3,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 12,
        textAlign: "center",
    },
    inEvidenceCont: {
        flex: 1, // Allow content to use remaining space
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        gap: 6,
        paddingHorizontal: 10, 
    }
});
