import { Icon } from '@siva/ui'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors } from '../base/colors'
import { ShadowPrimary } from '../base/shadows'

interface ForYouPosting {
  brand: string
  model: string
  duration: string
  price: number
  description: string
  imageUrl: string | any
  location: string
  owner: string
}

interface CardProps {
  posting: ForYouPosting
  onCardClick: () => void
}

export const CardsPerTe: React.FC<CardProps> = ({ posting, onCardClick }) => {
  const isShortTerm = posting.duration == 'GIORNALIERO'
  return (
    <TouchableOpacity style={styles.smallCard_card} activeOpacity={0.9} onPress={onCardClick}>
      <View style={styles.smallCard_imageCont}>
        <View style={styles.smallCard_centerTextContainer}>
          <Icon name="verified_check" color={Colors.greenPrimary} />
          <Text style={styles.smallCard_centerText}> Verificato</Text>
        </View>
        <Image source={{ uri: posting.imageUrl }} style={styles.smallCard_cardImage} />
      </View>
      <View style={styles.smallCard_cardContent}>
        <Text style={styles.smallCard_owner}>
          {posting.owner} <Icon name="verified_check" color={Colors.greenPrimary} />
        </Text>
        <Text style={styles.smallCard_cardTitle}>
          {posting.brand} {posting.model}
        </Text>
        <View style={styles.smallCard_priceContainer}>
          <Text style={styles.smallCard_priceNumber}>€{posting.price} </Text>
          <Text style={styles.smallCard_priceLabel}>
            / {posting.duration == 'GIORNALIERO' ? 'giorno' : 'mese'}
          </Text>
        </View>
        <View style={styles.smallCard_durationContainer}>
          <Icon name={isShortTerm ? 'lightning' : 'clock'} color={Colors.greenPrimary} />
          <Text style={styles.smallCard_durationText}>
            {isShortTerm ? 'Breve' : 'Lungo'} termine
          </Text>
        </View>
      </View>
      <View style={styles.smallCard_locationText}>
        <Icon name="location" color={Colors.greyPrimary} />
        <Text style={{ color: Colors.greyPrimary }}>{posting.location}</Text>
      </View>
    </TouchableOpacity>
  )
}

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  smallCard_card: {
    width: (width - 48) / 2,
    backgroundColor: 'white',
    borderRadius: 10,
    color: 'black',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    shadowColor: ShadowPrimary.shadowColor,
    shadowOffset: ShadowPrimary.shadowOffset,
    shadowOpacity: ShadowPrimary.shadowOpacity,
    shadowRadius: ShadowPrimary.shadowRadius,
    elevation: ShadowPrimary.elevation,
  },
  smallCard_imageCont: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallCard_centerTextContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    top: 13,
    left: 13,
    borderWidth: 1,
    borderColor: '#DCDCDC',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 2,
    zIndex: 999,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallCard_centerText: {
    color: 'black',
    fontSize: 12,
  },
  smallCard_cardImage: {
    position: 'relative',
    width: '100%',
    height: '100%',
    top: -1,
  },
  smallCard_cardContent: {
    paddingVertical: 10,
    width: '100%',
    borderBottomColor: '#F8F9F9',
    borderBottomWidth: 5,
    padding: 8,
  },
  smallCard_cardTitle: {
    fontSize: 14,
    fontWeight: 'medium',
    marginBottom: 48,
  },
  smallCard_owner: {
    fontSize: 14,
    color: Colors.greyPrimary,
    fontWeight: '300',
    marginBottom: 6,
  },
  smallCard_priceContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 8,
  },
  smallCard_priceNumber: {
    color: Colors.blackPrimary,
    fontWeight: 'bold',
  },
  smallCard_priceLabel: {
    color: Colors.greyPrimary,
  },
  smallCard_durationContainer: {
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
  smallCard_durationText: {
    color: Colors.greenPrimary,
    fontWeight: '500',
  },
  smallCard_locationText: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    color: Colors.greyPrimary,
    alignSelf: 'flex-start',
    gap: 5,
  },
  smallCard_row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})
