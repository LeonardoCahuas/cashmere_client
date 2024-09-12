import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ShadowPrimary } from '../base/shadows'

interface BrandPosting {
  brand: string
  imageUrl: string
}

interface CardProps {
  brand: BrandPosting
  onCardClick: () => void
}

export const BrandCard: React.FC<CardProps> = ({ brand, onCardClick }) => {
  if (!brand) {
    console.error('Brand is undefined')
    return null
  }

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={onCardClick}>
      <View style={styles.imageCont}>
        {brand.imageUrl ? (
          <Image source={{ uri: brand.imageUrl }} style={styles.cardImage} />
        ) : (
          <Text>No image available</Text>
        )}
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.brandText}>{brand.brand || 'Unknown Brand'}</Text>
      </View>
    </TouchableOpacity>
  )
}

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  card: {
    width: (width - 48) / 2,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: ShadowPrimary.shadowColor,
    shadowOffset: ShadowPrimary.shadowOffset,
    shadowOpacity: ShadowPrimary.shadowOpacity,
    shadowRadius: ShadowPrimary.shadowRadius,
    elevation: ShadowPrimary.elevation,
    marginBottom: 16,
  },
  imageCont: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 8,
    height: 40,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandText: {
    fontSize: 14,
    fontWeight: '600',
  },
})
