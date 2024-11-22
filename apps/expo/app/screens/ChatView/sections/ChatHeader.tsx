import { Posting } from '@siva/entities'
import { Colors, Icon } from '@siva/ui'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export const ChatHeader = ({ data, onClick }: { data: Posting; onClick: () => void }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onClick} activeOpacity={1}>
      <View style={styles.mediumCardContainer}>
        <View style={styles.mediumImageContainer}>
          {data.vehicle_images && data.vehicle_images.length > 0 ? (
            <Image source={{ uri: data.vehicle_images[0] }} style={styles.mediumCardImage} />
          ) : (
            <View style={[styles.mediumCardImage, styles.placeholderImage]}>
              <Text style={styles.placeholderText}>{data.brand.charAt(0).toUpperCase()}</Text>
            </View>
          )}
        </View>
        <View style={styles.mediumCardContent}>
          <View>
            <Text style={styles.mediumCardTitle}>
              {data.brand} {data.model}
            </Text>
          </View>

          <View style={styles.priceRow}>
            <View style={styles.mediumPriceContainer}>
              <Text style={styles.mediumPriceAmount}>€{data.price}</Text>
              <Text style={styles.mediumPriceUnit}>
                / {data.duration == 'GIORNALIERO' ? 'giorno' : 'mese'}
              </Text>
            </View>
            <View style={styles.durationBadge}>
              <Icon
                name={data.duration == 'GIORNALIERO' ? 'lightning' : 'clock'}
                color={Colors.greenPrimary}
              />
              <Text style={styles.durationText}>
                {data.duration == 'GIORNALIERO' ? 'Breve' : 'lungo'} termine
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    top: 0,
    borderBottomWidth: 0.3,
    borderBottomColor: Colors.greySecondary,
    zIndex: 3,
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
    borderRadius: 0,
    paddingHorizontal: 20,
    gap: 15,
  },
  mediumImageContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  mediumCardImage: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  mediumCardContent: {
    flex: 1,
    paddingHorizontal: 6,
    paddingTop: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 8,
  },
  durationText: {
    color: Colors.greenPrimary,
    fontSize: 12,
    fontWeight: '600',
  },
  mediumCardTitle: {
    fontSize: 15,
    fontWeight: '400',
  },
  mediumCardSubtitle: {
    fontSize: 15,
    color: Colors.greyPrimary,
  },
  mediumPriceContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  mediumPriceAmount: {
    fontSize: 15,
    color: Colors.blackPrimary,
    fontWeight: '500',
    marginRight: 3,
  },
  mediumPriceUnit: {
    color: Colors.greyPrimary,
    fontSize: 12,
    fontWeight: '300',
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
    borderRadius: 5,
    marginTop: 1,
  },
  placeholderImage: {
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.greyPrimary,
  },
  priceRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
})
