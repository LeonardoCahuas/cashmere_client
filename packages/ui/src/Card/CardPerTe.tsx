import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../base/colors';
import { ShadowPrimary } from '../base/shadows';

interface ForYouPosting {
    brand: string;
    model: string;
    duration: string;
    price: number;
    description: string;
    imageUrl: string | any;
    location: string;
    owner: string;
}

interface CardProps {
    posting: ForYouPosting;
    onCardClick: () => void;
}

export const CardsPerTe: React.FC<CardProps> = ({ posting, onCardClick }) => {
    return (
        <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={onCardClick}>
            <View style={styles.imageCont}>
                <View style={styles.centerTextContainer}>
                    <Text style={styles.centerText}> {/* <VerifiedIcon /> */} Verificato</Text>
                </View>
                <Image source={posting.imageUrl} style={styles.cardImage} />
            </View>
            <View style={styles.cardContent}>
                <Text style={styles.cardDescription}>{posting.owner} {/* <VerifiedIcon /> */} </Text>
                <Text style={styles.cardTitle}>{posting.brand} {posting.model}</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.priceNumber}>
                        €{posting.price}
                    </Text>
                    <Text style={styles.priceLabel}>
                        /{posting.duration == "GIORNALIERO" ? "giorno" : "mese"}
                    </Text>
                </View>
                <View style={styles.durationText}>
                    <Text style={{ color: Colors.greyPrimary }}>
                        {/* {posting.duration == "GIORNALIERO" ? <ShortIcon /> : <LongIcon />} */}    {posting.duration == "GIORNALIERO" ? "Breve" : "Lungo"} termine
                    </Text>
                </View>
            </View>
            <View style={styles.locationText}>
                <FontAwesome size={18} name="map-marker" color={Colors.greyPrimary} />
                <Text style={{ color: Colors.greyPrimary }}>{posting.location}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: "100%",
        backgroundColor: "white",
        borderRadius: 10,
        color: 'black',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        shadowColor: ShadowPrimary.shadowColor,
        shadowOffset: ShadowPrimary.shadowOffset,
        shadowOpacity: ShadowPrimary.shadowOpacity,
        shadowRadius: ShadowPrimary.shadowRadius,
        elevation: ShadowPrimary.elevation,
    },
    imageCont: {
        width: '100%',
        height: 140,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: "hidden",
        position: "relative",
        justifyContent: "center",
        alignItems: "center"
    },
    centerTextContainer: {
        position: 'absolute',
        backgroundColor: 'white',
        top: 13,
        left: 13,
        borderWidth: 1,
        borderColor: Colors.greySecondary,
        paddingHorizontal: 2,
        paddingVertical: 2,
        borderRadius: 2,
        zIndex: 999
    },
    centerText: {
        color: 'black',
        fontSize: 12,
    },
    cardImage: {
        position: "relative",
        width: "100%",
        height: "100%",
        top: -1
    },
    cardContent: {
        paddingVertical: 10,
        width: "90%",
        borderBottomColor: Colors.greySecondary,
        borderBottomWidth: 1,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'medium',
        marginBottom: 10,
    },
    cardDescription: {
        fontSize: 14,
        color: Colors.greyPrimary,
        fontWeight: "200"
    },
    priceContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    priceNumber: {
        color: Colors.blackPrimary,
        fontWeight: 'bold'
    },
    priceLabel: {
        color: Colors.greyPrimary
    },
    durationText: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 0,
        backgroundColor: Colors.greySecondary,
        color: "white",
        alignSelf: 'flex-start',
        marginTop: 5
    },
    locationText: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        color: Colors.greyPrimary,
        alignSelf: 'flex-start',
        gap: 5
    }
});
