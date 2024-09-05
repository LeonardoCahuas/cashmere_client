import { Colors } from '@siva/ui'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface HighlightedData {
  title: string
  text: string
  buttonText: string
  imageUrl: string
}

interface HighlightedProps {
  data: HighlightedData
  onButtonClick: () => void
}

export const HighlightedButton: React.FC<HighlightedProps> = ({ data, onButtonClick }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: data.imageUrl }} style={styles.cardImage} />
      <View style={styles.container}>
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
  )
}

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    width: width * 0.85,
    padding: 6,
    borderColor: Colors.lightGray,
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardImage: {
    width: 100,
    height: 120,
    borderRadius: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    flexShrink: 1,
    overflow: 'hidden',
    textAlign: 'left',
  },
  text: {
    color: Colors.greyPrimary,
    fontSize: 14,
    flexShrink: 1,
    marginBottom: 10,
  },
  button: {
    backgroundColor: Colors.greenPrimary,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '600',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 10,
  },
})
