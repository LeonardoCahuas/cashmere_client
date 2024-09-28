import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Colors, Icon } from '@siva/ui'
import { useState } from 'react'
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

interface Car {
  id: string
  brand: string
  model: string
  subtitle: string
  location: string
  vatDeductible: boolean
  duration: string
  mileage: string
  downPayment: string
  price: number
  imageUrl: string
  bgImageUrl: string
  fuel: string
  seats: number
  transmission: string
  bodyType: string
  owner: string
  year: number
  km: number
  description: string
}

const mockCar: Car = {
  id: '1',
  brand: 'Mercedes',
  model: 'Classe G AMG',
  subtitle: 'Iva Inclusa, pagamento anticipato.',
  price: 30000,
  location: 'Arezzo - AR',
  vatDeductible: true,
  duration: '12 mesi',
  mileage: '15,000 km',
  downPayment: '2,000 €',
  imageUrl: 'https://mkvfjhboywoocbqdzilx.supabase.co/storage/v1/object/public/images/huracan.png',
  bgImageUrl:
    'https://mkvfjhboywoocbqdzilx.supabase.co/storage/v1/object/public/images/huracan.png',
  fuel: 'Benzina',
  seats: 5,
  transmission: 'Automatico',
  bodyType: 'Berlina',
  owner: 'Giunima auto',
  year: 2020,
  km: 50000,
  description:
    'Sono NICOLAS di Giunima Auto per questa autovettura potete contattarmi al 3758018581 NESSUN COSTO NASCOSTO. GARANZIA INCLUSA NEL PREZZO. AUTO VISIONABILE PRESSO LA NOSTRA SEDE IN VIA CUSAGO 160 (MI) MANUTENZIONE: TUTTO IN ORDINE DAL PUNTO DI VISTA MECCANICO RICEVIAMO SU APPUNTAMENTO.',
}

const images = [
  {
    id: '1',
    uri: 'https://mkvfjhboywoocbqdzilx.supabase.co/storage/v1/object/public/images/g-class.png?t=2024-07-24T20%3A57%3A21.219Z',
  },
  {
    id: '2',
    uri: 'https://mkvfjhboywoocbqdzilx.supabase.co/storage/v1/object/public/images/smart-fortwo.png?t=2024-07-24T20%3A57%3A29.672Z',
  },
  {
    id: '3',
    uri: 'https://mkvfjhboywoocbqdzilx.supabase.co/storage/v1/object/public/images/huracan.png',
  },
]

const ProductPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleScroll = (event) => {
    const slideWidth = Dimensions.get('window').width
    const offset = event.nativeEvent.contentOffset.x
    const newIndex = Math.round(offset / slideWidth)
    setCurrentIndex(newIndex)
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: 'white' }}>
        <View style={{ position: 'relative' }}>
          <FlatList
            data={images}
            renderItem={({ item }) => (
              <View>
                <Image source={{ uri: item.uri }} style={styles.sliderImage} />
              </View>
            )}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
          />
          <Text
            style={styles.slideCounter}
          >{`${currentIndex + 1 > 0 ? currentIndex + 1 : 1}/${images.length}`}</Text>
        </View>

        <View style={styles.topInfoWrapper}>
          <View style={styles.topInfoContainer}>
            <Text style={styles.brandModel}>
              {mockCar.brand} {mockCar.model}
            </Text>
            <Text style={styles.subTitle}>{mockCar.subtitle}</Text>
            <View style={styles.locationContainer}>
              <Icon name="location" color={Colors.bluePrimary} width={10} />
              <Text style={styles.location}>{mockCar.location}</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>€{mockCar.price.toLocaleString('it-IT')}</Text>
              <Text style={styles.priceDuration}>/mese</Text>
            </View>
            <Text style={styles.vatDeductible}>
              {mockCar.vatDeductible ? 'IVA deducibile' : 'IVA non deducibile'}
            </Text>
          </View>
        </View>
        <View style={styles.detailsGrid}>
          <View style={styles.infoRow}>
            <Icon name="duration" color="black" width={20} />
            <View style={styles.infoTextContainer}>
              <Text style={styles.labelText}>Durata:</Text>
              <Text style={styles.infoTextValue}>{mockCar.duration}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Icon name="distance" color="black" width={20} />
            <View style={styles.infoTextContainer}>
              <Text style={styles.labelText}>Percorrenza:</Text>
              <Text style={styles.infoTextValue}>{mockCar.mileage}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Icon name="card_payment" color="black" width={20} />
            <View style={styles.infoTextContainer}>
              <Text style={styles.labelText}>Anticipo:</Text>
              <Text style={styles.infoTextValue}>{mockCar.downPayment}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Icon name="trasmission" color="black" width={20} />
            <View style={styles.infoTextContainer}>
              <Text style={styles.labelText}>Cambio:</Text>
              <Text style={styles.infoTextValue}>{mockCar.transmission}</Text>
            </View>
          </View>
        </View>
        <View style={styles.cardCont}>
          <View style={styles.card}>
            <Image source={{ uri: mockCar.imageUrl }} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{mockCar.owner}</Text>
              <Text style={styles.cardSubtitle}>48 annunci attivi</Text>
            </View>
            <View style={styles.reviewCont}>
              <Text style={styles.averageReview}>4.6</Text>
              <View style={styles.starsCont}>
                <FontAwesome size={14} name="star" color={Colors.greenPrimary} />
                <FontAwesome size={14} name="star" color={Colors.greenPrimary} />
                <FontAwesome size={14} name="star" color={Colors.greenPrimary} />
                <FontAwesome size={14} name="star" color={Colors.greenPrimary} />
                <FontAwesome size={14} name="star" color={Colors.greySecondary} />
              </View>
              <Text style={styles.reviewsText}>Recensioni</Text>
            </View>
          </View>
        </View>
        <View style={styles.detailsWrapper}>
          <View style={styles.details}>
            <Text style={styles.detailsTitle}>Dati di base</Text>
            <View style={styles.infoRowDetails}>
              <View style={styles.detailsLabel}>
                <View style={{ width: 30 }}>
                  <Icon name="fuel" width={1} color="black" />
                </View>
                <Text style={styles.detailsLabelText}>Alimentazione:</Text>
              </View>
              <Text style={styles.detailsValue}>{mockCar.fuel}</Text>
            </View>

            <View style={styles.infoRowDetails}>
              <View style={styles.detailsLabel}>
                <View style={{ width: 30 }}>
                  <Icon name="seats" width={1} color="black" />
                </View>
                <Text style={styles.detailsLabelText}>Posti:</Text>
              </View>
              <Text style={styles.detailsValue}>{mockCar.seats}</Text>
            </View>

            <View style={styles.infoRowDetails}>
              <View style={styles.detailsLabel}>
                <View style={{ width: 30 }}>
                  <Icon name="trasmission" width={1} color="black" />
                </View>
                <Text style={styles.detailsLabelText}>Cambio:</Text>
              </View>
              <Text style={styles.detailsValue}>{mockCar.transmission}</Text>
            </View>

            <View style={styles.infoRowDetails}>
              <View style={styles.detailsLabel}>
                <View style={{ width: 30 }}>
                  <Icon name="body" width={1} color="black" />
                </View>
                <Text style={styles.detailsLabelText}>Carrozzeria:</Text>
              </View>
              <Text style={styles.detailsValue}>{mockCar.bodyType}</Text>
            </View>
          </View>
        </View>

        <View style={styles.detailsWrapper}>
          <View style={styles.details}>
            <View style={styles.conditionTitle}>
              <Icon name="condition" />
              <Text style={styles.detailsTitle}>Stato veicolo</Text>
            </View>
            <View style={styles.infoRowDetails}>
              <Text style={styles.detailsLabelText}>Anno di immatricolazione</Text>

              <Text style={styles.detailsValue}>{mockCar.year}</Text>
            </View>

            <View style={styles.infoRowDetails}>
              <Text style={styles.detailsLabelText}>Kilometraggio</Text>

              <Text style={styles.detailsValue}>{mockCar.km} km</Text>
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: 18 }}>
          <View style={styles.detailsContainer}>
            <View style={styles.detailsButton}>
              <Icon name="door" />
              <Text style={styles.detailsButtonText}>Caratteristiche</Text>
            </View>
            <FontAwesome name="chevron-right" color={Colors.greenPrimary} width={15} />
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.detailsButton}>
              <Icon name="engine" />
              <Text style={styles.detailsButtonText}>Motore</Text>
            </View>
            <FontAwesome name="chevron-right" color={Colors.greenPrimary} width={15} />
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.detailsButton}>
              <Icon name="wheel" />
              <Text style={styles.detailsButtonText}>Equipaggiamento</Text>
            </View>
            <FontAwesome name="chevron-right" color={Colors.greenPrimary} width={15} />
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.detailsButton}>
              <Icon name="services" />
              <Text style={styles.detailsButtonText}>Servizi inclusi con il noleggio</Text>
            </View>
            <FontAwesome name="chevron-right" color={Colors.greenPrimary} width={15} />
          </View>
        </View>

        <View style={styles.descriptionWrapper}>
          <View style={styles.descriptionContainer}>
            <View style={styles.descriptionTitle}>
              <Icon name="description" />
              <Text style={styles.detailsButtonText}>Descrizione</Text>
            </View>
            <Text style={styles.descriptionText}>{mockCar.description}</Text>
          </View>
        </View>
        <View style={styles.ownerImages}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: mockCar.bgImageUrl }} style={styles.bgImage} />
            <Image source={{ uri: mockCar.imageUrl }} style={styles.imageSquare} />
          </View>
        </View>
        <View style={styles.cardContBottom}>
          <View style={styles.card}>
            <Image source={{ uri: mockCar.imageUrl }} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{mockCar.owner}</Text>
              <Text style={styles.cardSubtitleBottom}>Visita il profilo</Text>
            </View>
            <View style={styles.reviewCont}>
              <Text style={styles.averageReview}>4.6</Text>
              <View style={styles.starsCont}>
                <FontAwesome size={14} name="star" color={Colors.greenPrimary} />
                <FontAwesome size={14} name="star" color={Colors.greenPrimary} />
                <FontAwesome size={14} name="star" color={Colors.greenPrimary} />
                <FontAwesome size={14} name="star" color={Colors.greenPrimary} />
                <FontAwesome size={14} name="star" color={Colors.greySecondary} />
              </View>
              <Text style={styles.reviewsText}>Recensioni</Text>
            </View>
          </View>
        </View>
        <View style={{ paddingHorizontal: 18 }}>
          <View
            style={{
              borderTopColor: Colors.greySecondary,
              borderTopWidth: 1,
              marginVertical: 15,
            }}
          ></View>
        </View>
        <View style={styles.logoContainer}>
          <Image
            source={{
              uri: 'https://mkvfjhboywoocbqdzilx.supabase.co/storage/v1/object/public/images/LOGO.png?t=2024-09-06T07%3A09%3A24.114Z',
            }}
            style={{ width: 80, height: 25, marginBottom: 30 }}
          />
          <View style={styles.overlay} />
        </View>
      </ScrollView>
      <View style={styles.fixedButtonsContainer}>
        <TouchableOpacity style={styles.button} activeOpacity={0.95}>
          <Icon name="phone" color="white" />
          <Text style={styles.buttonText}>Chiama</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} activeOpacity={0.95}>
          <Icon name="tab_chat" color="white" />
          <Text style={styles.buttonText}>Chatta</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  sliderImage: {
    width: Dimensions.get('window').width,
    height: 300,
  },
  slideCounter: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
    borderRadius: 2,
    fontSize: 10,
    borderWidth: 0.5,
    borderColor: 'white',
    overflow: 'hidden',
    paddingHorizontal: 10,
  },
  topInfoWrapper: {
    padding: 18,
    paddingBottom: 0,
  },
  topInfoContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderBottomColor: Colors.greySecondary,
    borderBottomWidth: 1,
    paddingBottom: 18,
  },
  infoRow: {
    width: '48%',
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  labelText: {
    color: Colors.greyPrimary,
    fontSize: 12.5,
    fontWeight: '300',
  },
  infoTextValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  infoRowCont: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  brandModel: {
    fontSize: 18,
    fontWeight: '500',
  },
  price: {
    fontSize: 23.5,
    fontWeight: '500',
    marginVertical: 6,
  },
  locationContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 3,
    marginTop: 6,
  },
  vatDeductible: {
    fontSize: 11,
    fontWeight: '300',
    color: Colors.greyPrimary,
  },
  priceContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 3,
    alignItems: 'center',
  },
  priceDuration: {
    fontSize: 12,
    fontWeight: '100',
  },
  location: {
    fontSize: 13,
    fontWeight: '300',
    color: Colors.bluePrimary,
  },
  subTitle: {
    fontSize: 15,
    color: 'black',
    fontWeight: '200',
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    width: '100%',
    padding: 18,
  },
  infoTextContainer: {
    marginLeft: 10,
    flexDirection: 'column',
  },
  cardCont: {
    padding: 18,
  },
  card: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: Colors.greySecondary,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  cardContent: {
    marginLeft: 10,
    justifyContent: 'center',
    borderRightColor: Colors.greySecondary,
    borderRightWidth: 1,
    width: '45%',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'medium',
  },
  cardSubtitle: {
    fontSize: 11,
    fontWeight: '200',
    color: Colors.greyPrimary,
  },
  starsCont: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 2,
  },
  reviewCont: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: 3,
  },
  averageReview: {
    fontSize: 16,
    fontWeight: 'medium',
  },
  reviewsText: {
    fontSize: 10,
    textDecorationLine: 'underline',
  },
  detailsWrapper: {
    padding: 18,
    paddingTop: 18,
    paddingBottom: 0,
  },
  details: {
    borderBottomColor: Colors.greySecondary,
    borderBottomWidth: 1,
    paddingBottom: 18,
    display: 'flex',
    flexDirection: 'column',
    gap: 23,
  },
  infoRowDetails: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailsLabel: {
    display: 'flex',
    flexDirection: 'row',
    gap: 3,
  },
  detailsButtonText: {
    fontSize: 15,
    fontWeight: '500',
  },
  detailsLabelText: {
    fontSize: 14,
    color: Colors.greyPrimary,
    fontWeight: '300',
  },
  detailsValue: {
    width: '40%',
    fontSize: 13,
    fontWeight: '500',
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 700,
  },
  conditionTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  detailsContainer: {
    padding: 18,
    borderBottomColor: Colors.greySecondary,
    borderBottomWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    paddingVertical: 22,
  },
  detailsButton: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  descriptionWrapper: {
    padding: 18,
  },
  descriptionContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 10,
    borderBottomColor: Colors.greySecondary,
    borderBottomWidth: 1,
    paddingBottom: 18,
  },
  descriptionTitle: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
  },
  descriptionText: {
    fontSize: 14,
    fontWeight: '200',
  },
  descriptionTitleText: {
    fontSize: 18,
    fontWeight: '600',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
  },
  bgImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  imageSquare: {
    position: 'absolute',
    bottom: -50,
    left: '50%',
    transform: [{ translateX: -50 }],
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  ownerImages: {
    padding: 18,
  },
  cardContBottom: {
    marginTop: 50,
    padding: 18,
  },
  cardSubtitleBottom: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.bluePrimary,
  },
  logoContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 130,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    zIndex: 1,
  },
  fixedButtonsContainer: {
    position: 'absolute',
    bottom: 90,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 18,
    zIndex: 1,
    gap: 8,
  },
  button: {
    backgroundColor: 'rgba(0, 193, 92, 0.98)',
    padding: 12,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: '400',
  },
})

export default ProductPage
