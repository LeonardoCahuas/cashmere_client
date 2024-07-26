import { Icon } from '@siva/ui';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
    const isShortTerm = posting.duration == 'GIORNALIERO'
    return (
        <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={onCardClick}>
            <View style={styles.imageCont}>
                <View style={styles.centerTextContainer}>
                    <Icon name='verified_check' color={Colors.greenPrimary} />
                    <Text style={styles.centerText}> Verificato</Text>
                </View>
                <Image source={{uri: posting.imageUrl}} style={styles.cardImage} />
            </View>
            <View style={styles.cardContent}>
                <Text style={styles.owner}>{posting.owner} <Icon name='verified_check' color={Colors.greenPrimary} /></Text>
                <Text style={styles.cardTitle}>{posting.brand} {posting.model}</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.priceNumber}>
                        €{posting.price}{" "}
                    </Text>
                    <Text style={styles.priceLabel}>
                        /{" "}{posting.duration == "GIORNALIERO" ? "giorno" : "mese"}
                    </Text>
                </View>
                <View style={styles.durationContainer}>
                    <Icon name={isShortTerm ? 'lightning' : 'clock'} color={Colors.greenPrimary} />
                    <Text style={styles.durationText}>
                        {isShortTerm ? 'Breve': 'Lungo'} termine
                    </Text>
                </View>
            </View>
            <View style={styles.locationText}>
                <Icon name='location' color={Colors.greyPrimary} />
                <Text style={{ color: Colors.greyPrimary }}>{posting.location}</Text>
            </View>
        </TouchableOpacity>
    );
};

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
    card: {
        width: (width - 48) / 2,
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
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 2,
        zIndex: 999,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
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
        width: "100%",
        borderBottomColor: Colors.tertiaryGray,
        borderBottomWidth: 5,
        padding: 8,
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: 'medium',
        marginBottom: 48,
    },
    owner: {
        fontSize: 14,
        color: Colors.greyPrimary,
        fontWeight: "300",
        marginBottom: 6
    },
    priceContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginBottom: 8
    },
    priceNumber: {
        color: Colors.blackPrimary,
        fontWeight: 'bold'
    },
    priceLabel: {
        color: Colors.greyPrimary
    },
    durationContainer: {
        paddingHorizontal: 6,
        borderRadius: 0,
        backgroundColor: Colors.lightGray,
        alignSelf: 'flex-start',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        height: 22,
    },
    durationText: {
        color: Colors.greenPrimary,
        fontWeight: '500' ,
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
    },
    row : {
        display: 'flex',
        alignItems: 'center',
        justifyContent:'space-between'
    }
});
