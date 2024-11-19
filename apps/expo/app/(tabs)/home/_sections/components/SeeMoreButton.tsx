import { FontAwesome } from '@expo/vector-icons'
import { Colors } from '@siva/ui'
import { ShadowPrimary } from '@siva/ui/src/base/shadows'
import { Image, StyleSheet, Text, View } from 'react-native'

interface ImagesData {
  images: string[]
}

interface SeeMoreProps {
  data: ImagesData
  onButtonClick: () => void
}

export const SeeMoreButton: React.FC<SeeMoreProps> = ({ data, onButtonClick }) => {
  return (
    <View style={styles.card}>
      <View style={styles.imagesContainer}>
        {data.images.slice(0, 3).map((image, index) => (
          <View
            key={`${image}-${index}`}
            style={[styles.imageContainer, { zIndex: 3 - index, left: index * 15 }]}
          >
            <Image key={index} source={{ uri: image }} style={styles.smallImage} />
          </View>
        ))}
      </View>
      <View style={styles.textCont}>
        <Text style={styles.buttonText}>Vedi tutto </Text>
        <FontAwesome name="chevron-right" size={12} color={Colors.greenPrimary} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 6,
    shadowColor: ShadowPrimary.shadowColor,
    shadowOffset: ShadowPrimary.shadowOffset,
    shadowOpacity: ShadowPrimary.shadowOpacity,
    shadowRadius: ShadowPrimary.shadowRadius,
    elevation: ShadowPrimary.elevation,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    flexShrink: 1,
    overflow: 'hidden',
    textAlign: 'left',
  },
  button: {
    width: '100%',
    backgroundColor: Colors.greenPrimary,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.greenPrimary,
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
  },
  imagesContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    height: 35,
  },
  imageContainer: {
    padding: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    height: 35,
    width: 35,
    borderRadius: 10,
  },
  smallImage: {
    width: 30,
    height: 30,
    position: 'absolute',
    borderRadius: 5,
  },
  textCont: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
})
