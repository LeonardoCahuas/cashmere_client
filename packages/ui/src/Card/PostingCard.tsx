import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Posting } from '@siva/entities'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors } from '../base/colors'
import { Icon } from '../base/icons/index'

interface PostingCardProps extends Posting {}

interface CardProps {
  posting: PostingCardProps
  onCardClick: () => void
}

const PostingCardBase = ({
  posting,
  onCardClick,
  size,
}: CardProps & { size: 'small' | 'medium' | 'large' }) => {
  const isShortTerm = posting.duration === 'short_term'
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.9} onPress={onCardClick}>
      <View style={styles.card}>
        {size === 'large' && (
          <>
            <View id="top-container" style={styles.topContainer}>
              <View style={styles.imageCont}>
                <View style={styles.centerTextContainer}>
                  <Icon name="verified_check" color={Colors.greenPrimary} />
                  <Text style={styles.centerText}> Verificato</Text>
                </View>
                <View style={styles.centerIconContainer}>
                  <View style={styles.iconCont}>
                    <Icon
                      name="share"
                      width={20}
                      color={Colors.blackPrimary}
                      style={styles.iconTop}
                    />
                  </View>
                  <View style={styles.iconCont}>
                    <Icon
                      name="heart_filled"
                      width={20}
                      color={Colors.greenPrimary}
                      style={styles.iconTop}
                    />
                  </View>
                </View>
                <Image
                  source={{ uri: posting.vehicle_images ? posting.vehicle_images[0] : '' }}
                  style={styles.cardImage}
                />
              </View>
            </View>
            <View style={styles.cardContent}>
              <View style={{ marginBottom: 16 }}>
                <Text style={styles.cardTitle}>
                  {posting.brand} {posting.model}
                </Text>
                <Text style={styles.descriptionText}>{posting.subtitle}</Text>
              </View>
              <View style={styles.cardContentBottom}>
                <View style={styles.priceContainer}>
                  <Text style={styles.priceNumber}>€{posting.price}</Text>
                  <Text style={styles.priceLabel}>
                    {'/ '}
                    {posting.duration == 'short_term' ? 'giorno' : 'mese IVA inc.'}
                  </Text>
                </View>
                <View style={styles.durationTextCont}>
                  <Icon
                    name={posting.duration == 'short_term' ? 'lightning' : 'clock'}
                    color={Colors.greenPrimary}
                    width={15}
                  />
                  <Text style={styles.durationText}>
                    {posting.duration == 'short_term' ? 'Breve' : 'Lungo'} termine
                  </Text>
                </View>
              </View>
            </View>
          </>
        )}

        {size === 'medium' && (
          <>
            <View style={styles.mediumCardContainer}>
              <View style={styles.mediumCardContent}>
                <View>
                  <Text style={styles.mediumCardTitle}>
                    {posting.brand} {posting.model}
                  </Text>
                  <Text style={styles.mediumCardSubtitle}>{posting.subtitle}</Text>
                </View>

                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: 6,
                  }}
                >
                  <View style={styles.mediumPriceContainer}>
                    <Text style={styles.mediumPriceAmount}>€{posting.price}</Text>
                    <Text style={styles.mediumPriceUnit}>
                      / {isShortTerm ? 'giorno' : 'mese'} IVA inc.
                    </Text>
                  </View>
                  <View style={styles.durationBadge}>
                    <Icon name={isShortTerm ? 'lightning' : 'clock'} color={Colors.greenPrimary} />
                    <Text style={styles.durationText}>
                      {isShortTerm ? 'Breve' : 'lungo'} termine
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.mediumImageContainer}>
                <Image
                  source={{ uri: posting.vehicle_images ? posting.vehicle_images[0] : '' }}
                  style={styles.mediumCardImage}
                />
                <View
                  style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    backgroundColor: 'white',
                    borderRadius: 2,
                    paddingHorizontal: 8,
                    paddingVertical: 2,
                    zIndex: 999,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <Icon name="verified_check" color={Colors.greenPrimary} />
                  <Text style={styles.verifiedText}>Verificato</Text>
                </View>
              </View>
            </View>
          </>
        )}

        <View style={styles.detailsContainer}>
          <View style={styles.detailRowsContainer}>
            <View style={styles.detailsRow}>
              <View style={styles.iconDetailsCont}>
                <Icon name="card_payment" color={Colors.textSecondary} />
              </View>
              {posting.duration == 'long_term' ? (
                <Text style={styles.valueText}>
                  <Text style={styles.labelText}>Anticipo: </Text> €{posting.deposit}{' '}
                  <Text style={styles.ivaText}>IVA inc.</Text>
                </Text>
              ) : (
                <Text style={styles.valueText}>
                  <Text style={styles.labelText}>Cauzione: </Text> €{posting.deposit}
                </Text>
              )}
            </View>

            <View style={styles.detailsRow}>
              <View style={styles.iconDetailsCont}>
                <Icon name="distance" color={Colors.textSecondary} />
              </View>
              <Text style={styles.valueText}>
                <Text style={styles.labelText}>
                  Limite Km {posting.duration == 'long_term' ? 'mensile' : 'giornaliero'}:{' '}
                </Text>
                {posting.distance_limit_in_km}
              </Text>
            </View>

            <View style={styles.detailsRow}>
              <View style={styles.iconDetailsCont}>
                <Icon name="clock" color={Colors.textSecondary} />
              </View>
              {posting.duration == 'long_term' ? (
                <Text style={styles.valueText}>
                  <Text style={styles.labelText}>Durata noleggio: </Text>
                  {/*TODO: MINIMO MESI */}
                </Text>
              ) : (
                <Text style={styles.valueText}>
                  <Text style={styles.labelText}>Età minima: </Text>
                  {posting.age_required}
                </Text>
              )}
            </View>

            <View style={styles.detailsRow}>
              <View style={styles.iconDetailsCont}>
                <Icon name="location" color={Colors.greenPrimary} />
              </View>
              <Text style={{ color: Colors.greenPrimary, fontWeight: '600', fontSize: 15 }}>
                {posting.pickup_location_plain}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.ownerContainer}>
          <View style={styles.ownerReviewsCont}>
            <Text>
              {posting.renter_name} {/* <VerifiedIcon/> */}
            </Text>
            <View style={styles.starsReviewsCont}>
              <View style={styles.starsCont}>
                <FontAwesome size={18} name="star" color={Colors.greenPrimary} />
                <FontAwesome size={18} name="star" color={Colors.greenPrimary} />
                <FontAwesome size={18} name="star" color={Colors.greenPrimary} />
                <FontAwesome size={18} name="star" color={Colors.greenPrimary} />
                <FontAwesome size={18} name="star" color={Colors.greySecondary} />
              </View>
              <Text style={styles.reviewsNumber}>(45)</Text>
            </View>
          </View>
          <View>
            <Image
              source={require('../../../../apps/expo/assets/siva-black.png')}
              style={styles.ownerLogo}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export const PostingCard = {
  Large: (props: CardProps) => <PostingCardBase {...props} size="large" />,
  Medium: (props: CardProps) => <PostingCardBase {...props} size="medium" />,
}

const styles = StyleSheet.create({
  container: {
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 10,
  },
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    color: 'black',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
  },
  imageCont: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    overflow: 'hidden',
  },
  actionsIconContainer: {
    width: '35%',
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'flex-end',
  },
  detailsRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: 18,
  },
  valueText: {
    fontSize: 15,
    fontWeight: '400',
  },
  detailRowsContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 10,
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
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 0,
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
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    padding: 30,
  },
  cardContentBottom: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  descriptionText: {
    fontSize: 18,
    fontWeight: '300',
  },
  centerText: {
    color: 'black',
    fontSize: 13,
    fontWeight: '500',
    height: '100%',
  },
  topContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconTop: {
    backgroundColor: 'transparent',
  },
  iconCont: {
    backgroundColor: '#fff',
    borderRadius: 100,
    height: 33,
    width: 33,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardContent: {
    width: '100%',
    minWidth: '100%',
    paddingHorizontal: 18,
    paddingBottom: 10,
    paddingTop: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderTopColor: Colors.tertiaryGray,
    borderTopWidth: 5,
    borderBottomColor: Colors.tertiaryGray,
    borderBottomWidth: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: Colors.greyPrimary,
  },
  iconDetailsCont: {
    width: 30,
  },
  priceContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 4,
    height: 18,
  },
  priceNumber: {
    fontSize: 17,
    color: Colors.blackPrimary,
    fontWeight: '500',
    marginRight: 3,
  },
  priceLabel: {
    color: Colors.greyPrimary,
    fontSize: 12,
  },
  durationText: {
    color: Colors.greenPrimary,
    fontSize: 12,
    fontWeight: '600',
  },
  durationTextCont: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 0,
    backgroundColor: Colors.tertiaryGray,
    marginTop: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
  },
  locationText: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    color: Colors.greyPrimary,
    alignSelf: 'flex-start',
    gap: 5,
  },
  ownerContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  starsCont: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 5,
  },
  starsReviewsCont: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 4,
  },
  reviewsNumber: {
    color: Colors.blackPrimary,
    fontSize: 12,
    paddingBottom: 2,
  },
  ownerReviewsCont: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  ownerLogo: {
    borderRadius: 50,
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  labelText: {
    fontWeight: '300',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  infoText: {
    fontWeight: '900',
  },
  positionText: {
    color: Colors.greenPrimary,
  },
  ivaText: {
    fontSize: 10,
    fontWeight: '200',
    marginLeft: 5,
  },
  mediumCardContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  mediumImageContainer: {
    height: 96,
    width: 144,
    borderRadius: 8,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  mediumCardImage: {
    width: '100%',
    height: '100%',
  },
  verifiedBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 2,
    paddingHorizontal: 8,
    paddingVertical: 2,
    zIndex: 999,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 0,
  },
  verifiedText: {
    color: 'black',
    fontSize: 13,
    fontWeight: '500',
    height: '100%',
  },
  mediumCardContent: {
    paddingHorizontal: 6,
    paddingTop: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  mediumCardTitle: {
    fontSize: 15,
    fontWeight: '500',
  },
  mediumCardSubtitle: {
    fontSize: 15,
    color: Colors.greyPrimary,
  },
  mediumPriceContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 4,
    height: 18,
  },
  mediumPriceAmount: {
    fontSize: 17,
    color: Colors.blackPrimary,
    fontWeight: '500',
    marginRight: 3,
  },
  mediumPriceUnit: {
    color: Colors.greyPrimary,
    fontSize: 12,
  },
  durationBadge: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: Colors.lightGray,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
})
