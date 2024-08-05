import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../base/colors';
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { ShadowPrimary } from '../base/shadows';
import { Icon } from '../base/icons/index';

interface SearchPosting {
    brand: string;
    model: string;
    duration: string;
    price: number;
    description: string;
    imageUrl: string | any;
    location: string;
    owner: string;
    kmLimit: number,
    anticipo: number,
    minimumMonths: number;
    minimumAge: number
}

interface CardProps {
    posting: SearchPosting;
    onCardClick: () => void;
}

export const SearchCard: React.FC<CardProps> = ({ posting, onCardClick, /* uuid */ }) => {

    /* const posting = useGetVehicleById(uuid) */
    return (
        <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={onCardClick}>
            <View style={styles.topContainer}>
                <View style={styles.imageCont}>
                    <View style={styles.centerTextContainer}>
                        <Icon name='verified_check' color={Colors.greenPrimary} /><Text style={styles.centerText}>   Verificato</Text>
                    </View>
                    <View style={styles.centerIconContainer}>
                        <View style={styles.iconCont}><Icon name="share" width={20} color={Colors.blackPrimary} style={styles.iconTop} /></View>
                        <View style={styles.iconCont}><Icon name="heart_filled" width={20} color={Colors.greenPrimary} style={styles.iconTop} /></View>
                    </View>
                    <Image source={{ uri: posting.imageUrl }} style={styles.cardImage} />
                </View>


            </View>
            <View style={styles.cardContent}>
                <View>
                    <Text style={styles.cardTitle}>{posting.brand} {posting.model}</Text>
                    <Text style={styles.descriptionText}>{posting.description}</Text>
                </View>
                <View style={styles.cardContentBottom}>
                    <View style={styles.priceContainer}>
                        <Text style={styles.priceNumber}>
                            €{posting.price}
                        </Text>
                        <Text style={styles.priceLabel}>
                            /{posting.duration == "GIORNALIERO" ? "giorno" : "mese IVA inc."}
                        </Text>
                    </View>
                    <View style={styles.durationTextCont}>
                        <Text style={styles.durationText}>
                            <Icon name={posting.duration == "GIORNALIERO" ? "lightning" : "clock"} color={Colors.greenPrimary} width={15} />    {posting.duration == "GIORNALIERO" ? "Breve" : "Lungo"} termine
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.detailsContainer}>
                <View style={styles.detailRowsContainer}>
                    <View style={styles.detailsRow}>
                        <View style={styles.iconDetailsCont}>
                            <FontAwesome size={18} name="map-marker" color={Colors.greyPrimary} />
                            {/* {
                                {
                                    posting.duration == "MENSILE" ?
                                    <CardIcon/> :
                                    <CardPaymentIcon/>
                                } 
                            } */}
                        </View>
                        {posting.duration == "MENSILE" ?
                            <Text style={styles.valueText}><Text style={styles.labelText}>Anticipo: </Text> €{posting.anticipo} <Text style={styles.ivaText}>IVA inc.</Text></Text> :
                            <Text style={styles.valueText}><Text style={styles.labelText}>Cauzione: </Text> €{posting.anticipo}</Text>
                        }
                    </View>

                    <View style={styles.detailsRow}>
                        <View style={styles.iconDetailsCont}>
                            <FontAwesome size={18} name="credit-card" color={Colors.greyPrimary} />
                            {/* 
                               KmLimitIcon/>
                            */}
                        </View>
                        <Text style={styles.valueText}>
                            <Text style={styles.labelText}>Limite Km {posting.duration == "MENSILE" ? "mensile" : "giornaliero"}: </Text>
                            {posting.kmLimit}
                        </Text>
                    </View>

                    <View style={styles.detailsRow}>
                        <View style={styles.iconDetailsCont}>
                            <FontAwesome size={18} name="map-marker" color={Colors.greyPrimary} />
                            {/* 
                                {
                                    posting.duration == "MENSILE" ?
                                    <DurationIcon/> :
                                    <MinimumAgeIcon/>
                                } 
                             */}
                        </View>
                        {posting.duration == "MENSILE" ?
                            <Text style={styles.valueText}><Text style={styles.labelText}>Durata noleggio: </Text>{posting.minimumMonths}</Text> :
                            <Text style={styles.valueText}><Text style={styles.labelText}>Età minima: </Text>{posting.minimumAge}</Text>
                        }
                    </View>


                    <View style={styles.detailsRow}>
                        <View style={styles.iconDetailsCont}>
                            <FontAwesome size={18} name="clock-o" color={Colors.greenPrimary} />
                            {/* <PositionIcon/> */}
                        </View>
                        <Text style={{ color: Colors.greenPrimary }}>{posting.location}</Text>
                    </View>

                </View>



            </View>
            <View style={styles.ownerContainer}>
                <View style={styles.ownerReviewsCont}>
                    <Text>{posting.owner} {/* <VerifiedIcon/> */}</Text>
                    <View style={styles.starsReviewsCont}>
                        <View style={styles.starsCont}>
                            <FontAwesome size={18} name="star" color={Colors.greenPrimary} />
                            <FontAwesome size={18} name="star" color={Colors.greenPrimary} />
                            <FontAwesome size={18} name="star" color={Colors.greenPrimary} />
                            <FontAwesome size={18} name="star" color={Colors.greenPrimary} />
                            <FontAwesome size={18} name="star" color={Colors.greyPrimary} />
                        </View>
                        <Text style={styles.reviewsNumber}>
                            (45)
                        </Text>
                    </View>
                </View>
                <View>
                    <Image source={require("../../../../apps/expo/assets/siva-black.png")} style={styles.ownerLogo} />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: "90%",
        backgroundColor: "white",
        borderRadius: 10,
        color: 'black',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden"
    },
    imageCont: {
        width: '100%',
        height: 200,
        resizeMode: "contain",
        overflow: "hidden"
    },
    actionsIconContainer: {
        width: '35%',
        display: "flex",
        flexDirection: "row",
        gap: 20,
        justifyContent: "flex-end"
    },
    detailsRow: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    valueText: {
        fontSize: 15,
        fontWeight: '400'
    },
    detailRowsContainer: {
        width: "65%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        gap: 12,
        paddingVertical: 10
    },
    centerTextContainer: {
        position: 'absolute',
        backgroundColor: 'white',
        top: 13,
        left: 18,
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 2,
        zIndex: 999,
        height: 20,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap:0

    },
    centerIconContainer: {
        position: 'absolute',
        backgroundColor: 'transparent',
        top: 10,
        right: 13,
        paddingHorizontal: 2,
        paddingVertical: 2,
        borderRadius: 2,
        zIndex: 999,
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 10,
        padding: 30
    },
    cardContentBottom: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    descriptionText: {
        fontSize: 14.5,
        fontWeight: '300',
        marginBottom: 10,
    },
    centerText: {
        color: 'black',
        fontSize: 13,
        fontWeight: '500',
        height: "100%"
    },
    topContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
    },
    iconTop: {
        backgroundColor: "transparent",
    },
    iconCont: {
        backgroundColor: "#fff",
        borderRadius: 100,
        height: 33,
        width: 33,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    cardImage: {
        width: "100%",
        height: "100%"
    },
    cardContent: {
        width: "100%",
        paddingHorizontal: 18,
        paddingBottom: 10,
        borderBottomColor: Colors.tertiaryGray,
        borderBottomWidth: 5,
        paddingTop: 20
    },
    cardTitle: {
        fontSize: 14.5,
        fontWeight: '500',
    },
    detailsContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        width: "100%",
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderBottomColor: Colors.tertiaryGray,
        borderBottomWidth: 5,
    },
    cardDescription: {
        fontSize: 14,
        color: Colors.greyPrimary,
    },
    iconDetailsCont: {
        width: 30
    },
    priceContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: 5
    },
    priceNumber: {
        fontSize: 17,
        color: Colors.blackPrimary,
        fontWeight: '500',
        marginRight: 3
    },
    priceLabel: {
        color: Colors.greyPrimary,
        fontSize: 12
    },
    durationText: {
        color: Colors.greenPrimary,
        fontSize: 12,
        fontWeight: '600'
    },
    durationTextCont: {
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 0,
        backgroundColor: Colors.tertiaryGray,
        color: "white",
        alignSelf: 'flex-start',
        marginTop: 5
    },
    locationText: {
        paddingHorizontal: 5,
        paddingVertical: 5,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        color: Colors.greyPrimary,
        alignSelf: 'flex-start',
        gap: 5
    },
    ownerContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 18
    },
    starsCont: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        marginTop: 5
    },
    starsReviewsCont: {
        marginTop: 0,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    reviewsNumber: {
        color: Colors.blackPrimary,
        fontSize: 12
    },
    ownerReviewsCont: {
        width: "80%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start"
    },
    ownerLogo: {
        borderRadius: 50,
        width: 30,
        height: 30,
        resizeMode: "contain"
    },
    labelText: {
        fontWeight: "300",
        color: Colors.greyPrimary
    },
    infoText: {
        fontWeight: "900"
    },
    positionText: {
        color: Colors.greenPrimary
    },
    ivaText: {
        fontSize: 10,
        fontWeight: "200",
        marginLeft: 5
    }
});