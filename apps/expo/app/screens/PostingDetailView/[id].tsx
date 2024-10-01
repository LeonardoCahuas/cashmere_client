import { Colors, Icon } from '@siva/ui'
import { useLocalSearchParams } from 'expo-router'
import { cloneElement, useState } from 'react'
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
import { ModalSheet, ModalSheetProvider, useModalSheetRef } from '../../components/ModalSheet'
import { useGetPosting } from '../../setup/query/hooks'

type ModalKey = 'features' | 'engine' | 'equipment' | 'services'

const PostingDetailView = () => {
  const { id } = useLocalSearchParams()
  if (!id || typeof id !== 'string') {
    return <Text>No id data</Text>
  }

  const ref = useModalSheetRef()
  const { data: posting, isLoading } = useGetPosting(id)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [modalKey, setModalKey] = useState<ModalKey | null>(null)

  const handleScroll = (event) => {
    const slideWidth = Dimensions.get('window').width
    const offset = event.nativeEvent.contentOffset.x
    const newIndex = Math.round(offset / slideWidth)
    setCurrentIndex(newIndex)
  }

  if (isLoading) {
    return <Text>Loading...</Text>
  }

  if (!posting) {
    return <Text>No posting data</Text>
  }

  const img = posting.vehicle_images ? posting.vehicle_images[0] : ''

  const modals: Record<ModalKey, { title: string; content: JSX.Element }> = {
    features: {
      title: 'Caratteristiche',
      content: (
        <View style={{ display: 'flex', gap: 32 }}>
          {[
            { k: 'Porte', v: '5' },
            { k: 'Colore esterno', v: 'Rosso' },
            { k: 'Colore interno', v: 'Nero' },
            { k: 'Materiale interni', v: 'Alcantara' },
          ].map(({ k, v }) => (
            <View key={`features-${k}`} style={{ ...styles.row, gap: 80 }}>
              <Text style={{ ...styles.modalRowKey, width: 128 }}>{k}</Text>
              <Text style={styles.modalRowValue}>{v}</Text>
            </View>
          ))}
        </View>
      ),
    },
    engine: {
      title: 'Motore',
      content: (
        <View style={{ display: 'flex', gap: 32 }}>
          {[
            { k: 'Classe inquitamento', v: 'Euro 6' },
            { k: 'Trazione', v: 'Anteriore' },
            { k: 'Potenza', v: '700Cv / 900 Kw' },
            { k: 'Marce', v: '6' },
          ].map(({ k, v }) => (
            <View key={`engine-${k}`} style={{ ...styles.row, gap: 64 }}>
              <Text style={{ ...styles.modalRowKey, width: 152 }}>{k}</Text>
              <Text style={styles.modalRowValue}>{v}</Text>
            </View>
          ))}
        </View>
      ),
    },
    equipment: {
      title: 'Equipaggiamento',
      content: (
        <View style={{ display: 'flex', gap: 32 }}>
          {['Airbag', 'Aria condizionata', 'Stereo bluetooth', 'Ruotino di scorta'].map((item) => (
            <View
              key={item}
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                gap: 12,
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  height: 5,
                  width: 5,
                  borderRadius: 5,
                  backgroundColor: Colors.blackPrimary,
                }}
              />
              <Text style={styles.modalRowValue}>{item}</Text>
            </View>
          ))}
        </View>
      ),
    },
    services: {
      title: 'Servizi inclusi nel noleggio',
      content: (
        <View style={{ display: 'flex' }}>
          <View
            style={{
              display: 'flex',
              borderBottomWidth: 1,
              borderBottomColor: Colors.greySecondary,
            }}
          >
            <Text style={styles.modalRowValue}>Manutenzione</Text>
            <View style={{ width: '100%', display: 'flex', gap: 20, paddingVertical: 20 }}>
              {['Manutenzione ordinaria', 'Manutenzione straordinaria'].map((item) => (
                <View
                  key={item}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 16,
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={{
                      height: 24,
                      width: 24,
                      backgroundColor: Colors.greenPrimary,
                      borderRadius: 24,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Icon name="check" color="#fff" />
                  </View>
                  <Text style={{ fontSize: 16, fontWeight: '400', color: Colors.blackPrimary }}>
                    {item}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/*  */}
          <View style={{ display: 'flex', paddingTop: 20 }}>
            <Text style={styles.modalRowValue}>Copertura Assicurativa</Text>
            <View style={{ width: '100%', display: 'flex', gap: 20, paddingVertical: 20 }}>
              {['RCA', 'Kasko', 'Assistenza nelle pratiche burocratiche'].map((item) => (
                <View
                  key={item}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 16,
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={{
                      height: 24,
                      width: 24,
                      backgroundColor: Colors.greenPrimary,
                      borderRadius: 24,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Icon name="check" color="#fff" />
                  </View>
                  <Text style={{ fontSize: 16, fontWeight: '400', color: Colors.blackPrimary }}>
                    {item}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      ),
    },
  }

  const openModal = (k: ModalKey) => {
    ref?.current?.expand()
    setModalKey(k)
  }

  return (
    <ModalSheetProvider style={styles.container}>
      <View>
        <ScrollView style={{ backgroundColor: 'white' }}>
          <View style={{ position: 'relative' }}>
            <FlatList
              data={posting.vehicle_images}
              renderItem={({ item: uri }) => (
                <View>
                  <Image source={{ uri }} style={styles.sliderImage} />
                </View>
              )}
              keyExtractor={(item) => item}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
            />
            {!!posting?.vehicle_images && (
              <Text
                style={styles.slideCounter}
              >{`${currentIndex + 1 > 0 ? currentIndex + 1 : 1}/${6969}`}</Text>
            )}
          </View>
          <View style={styles.topInfoWrapper}>
            <View style={styles.topInfoContainer}>
              <Text style={styles.brandModel}>
                {posting.brand} {posting.model}
              </Text>
              <Text style={styles.subTitle}>{posting.subtitle}</Text>
              <View style={styles.locationContainer}>
                <Icon name="location" color={Colors.bluePrimary} width={10} />
                <Text style={styles.location}>{posting.pickup_location_plain}</Text>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>€{posting.price?.toLocaleString('it-IT')}</Text>
                <Text style={styles.priceDuration}>/ mese</Text>
              </View>
              <Text style={styles.vatDeductible}>
                {!posting.taxes_included ? 'IVA deducibile' : 'IVA non deducibile'}
              </Text>
            </View>
          </View>
          <View style={styles.detailsGrid}>
            <View style={styles.infoRow}>
              <Icon name="duration" color="black" width={20} />
              <View style={styles.infoTextContainer}>
                <Text style={styles.labelText}>Durata:</Text>
                <Text style={styles.infoTextValue}>{posting.duration}</Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <Icon name="distance" color="black" width={20} />
              <View style={styles.infoTextContainer}>
                <Text style={styles.labelText}>Percorrenza:</Text>
                <Text style={styles.infoTextValue}>{'__mileage'}</Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <Icon name="card_payment" color="black" width={20} />
              <View style={styles.infoTextContainer}>
                <Text style={styles.labelText}>Anticipo:</Text>
                <Text style={styles.infoTextValue}>{posting.deposit}</Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <Icon name="trasmission" color="black" width={20} />
              <View style={styles.infoTextContainer}>
                <Text style={styles.labelText}>Cambio:</Text>
                <Text style={styles.infoTextValue}>{posting.transmission_type}</Text>
              </View>
            </View>
          </View>
          <View style={styles.cardCont}>
            <View style={styles.card}>
              {!!posting.vehicle_images && (
                <Image source={{ uri: posting.vehicle_images[0] }} style={styles.image} />
              )}
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{posting.renter_name}</Text>
                <Text style={styles.cardSubtitle}>48 annunci attivi</Text>
              </View>
              <View style={styles.reviewCont}>
                <Text style={styles.averageReview}>4.6</Text>
                <View style={styles.starsCont}>
                  <Icon name="star" color={Colors.greenPrimary} />
                  <Icon name="star" color={Colors.greenPrimary} />
                  <Icon name="star" color={Colors.greenPrimary} />
                  <Icon name="star" color={Colors.greenPrimary} />
                  <Icon name="star" color={Colors.greySecondary} />
                </View>
                <Text style={styles.reviewsText}>Recensioni</Text>
              </View>
            </View>
          </View>

          <Section title="Dati di base">
            <View style={styles.details}>
              <View style={styles.infoRowDetails}>
                <View style={styles.detailsLabel}>
                  <View style={{ width: 30 }}>
                    <Icon name="fuel" color="black" />
                  </View>
                  <Text style={styles.detailsLabelText}>Alimentazione:</Text>
                </View>
                <Text style={styles.detailsValue}>{posting.fuel_type}</Text>
              </View>

              <View style={styles.infoRowDetails}>
                <View style={styles.detailsLabel}>
                  <View style={{ width: 30 }}>
                    <Icon name="seats" color="black" />
                  </View>
                  <Text style={styles.detailsLabelText}>Posti:</Text>
                </View>
                <Text style={styles.detailsValue}>{'__seats'}</Text>
              </View>

              <View style={styles.infoRowDetails}>
                <View style={styles.detailsLabel}>
                  <View style={{ width: 30 }}>
                    <Icon name="trasmission" color="black" />
                  </View>
                  <Text style={styles.detailsLabelText}>Cambio:</Text>
                </View>
                <Text style={styles.detailsValue}>{posting.transmission_type}</Text>
              </View>

              <View style={styles.infoRowDetails}>
                <View style={styles.detailsLabel}>
                  <View style={{ width: 30 }}>
                    <Icon name="body" color="black" />
                  </View>
                  <Text style={styles.detailsLabelText}>Carrozzeria:</Text>
                </View>
                <Text style={styles.detailsValue}>{'__body_type'}</Text>
              </View>
            </View>
          </Section>
          <Section title="Stato veicolo" icon={<Icon name="condition" />}>
            <View style={styles.details}>
              <View style={styles.infoRowDetails}>
                <Text style={styles.detailsLabelText}>Anno di immatricolazione</Text>

                <Text style={styles.detailsValue}>{posting.year}</Text>
              </View>
              <View style={styles.infoRowDetails}>
                <Text style={styles.detailsLabelText}>Kilometraggio</Text>
                <Text style={styles.detailsValue}>{'__mileage'} km</Text>
              </View>
            </View>
          </Section>
          <Section
            title="Caratteristiche"
            icon={<Icon name="door" />}
            onPress={() => openModal('features')}
          />
          <Section
            title="Motore"
            icon={<Icon name="engine" />}
            onPress={() => openModal('engine')}
          />
          <Section
            title="Equipaggiamento"
            icon={<Icon name="wheel" />}
            onPress={() => openModal('equipment')}
          />
          <Section
            title="Servizi inclusi nel noleggio"
            icon={<Icon name="services" />}
            onPress={() => openModal('services')}
          />
          <Section title="Descrizione" icon={<Icon name="description" />}>
            <Text style={styles.descriptionText}>
              Sono NICOLAS di Giunima Auto per questa autovettura potete contattarmi al 3758018581
              NESSUN COSTO NASCOSTO. GARANZIA INCLUSA NEL PREZZO. AUTO VISIONABILE PRESSO LA NOSTRA
              SEDE IN VIA CUSAGO 160 (MI) MANUTENZIONE: TUTTO IN ORDINE DAL PUNTO DI VISTA MECCANICO
              RICEVIAMO SU APPUNTAMENTO.
            </Text>
          </Section>

          <View style={styles.ownerImages}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: img }} style={styles.bgImage} />
              <Image source={{ uri: img }} style={styles.imageSquare} />
            </View>
          </View>

          <View style={styles.cardContBottom}>
            <View style={styles.card}>
              <Image source={{ uri: img }} style={styles.image} />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{posting.renter_name}</Text>
                <Text style={styles.cardSubtitleBottom}>Visita il profilo</Text>
              </View>
              <View style={styles.reviewCont}>
                <Text style={styles.averageReview}>4.6</Text>
                <View style={styles.starsCont}>
                  <Icon name="star" color={Colors.greenPrimary} />
                  <Icon name="star" color={Colors.greenPrimary} />
                  <Icon name="star" color={Colors.greenPrimary} />
                  <Icon name="star" color={Colors.greenPrimary} />
                  <Icon name="star" color={Colors.greySecondary} />
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
      <ModalSheet ref={ref} title={modalKey ? modals[modalKey].title : ''}>
        {!!modalKey && modals[modalKey].content}
      </ModalSheet>
    </ModalSheetProvider>
  )
}

export default PostingDetailView

interface SectionProps {
  title: string
  icon?: JSX.Element
  children?: JSX.Element
  onPress?: () => void
}

const Section = ({ title, icon, children, onPress }: SectionProps) => {
  return (
    <View style={sectionStyles.container}>
      <View style={sectionStyles.borderContainer}>
        <View
          style={sectionStyles.titleContainer}
          onTouchEnd={() => {
            if (onPress) {
              onPress()
            }
          }}
        >
          <View style={sectionStyles.titleRow}>
            {!!icon && cloneElement(icon, { color: '#000' })}
            <Text style={sectionStyles.title}>{title}</Text>
          </View>

          {!children && <Icon name="chevron-right" color={Colors.greenPrimary} />}
        </View>
        {!!children && <View style={sectionStyles.childrenContainer}>{children}</View>}
      </View>
    </View>
  )
}

const sectionStyles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  borderContainer: {
    width: '100%',
    borderBottomWidth: 0.5,
    paddingBottom: 20,
    borderBottomColor: Colors.greySecondary,
  },
  titleContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 8,
  },
  titleRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
  },
  title: {
    fontSize: 17,
    fontWeight: '500',
  },
  childrenContainer: {
    paddingTop: 20,
  },
})

const styles = StyleSheet.create({
  row: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  modalRowKey: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.greyPrimary,
  },
  modalRowValue: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.blackPrimary,
  },
  container: {
    flex: 1,
  },
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
    bottom: 32,
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
