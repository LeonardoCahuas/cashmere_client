import { Colors, PostingCard } from '@siva/ui'
import { BooleanSelect } from 'apps/expo/app/components/BooleanSelect'
import { ModalSheetProvider, useModalSheetRef } from 'apps/expo/app/components/ModalSheet'
import {
  ModalPage,
  MultiStepModalSheet,
} from 'apps/expo/app/components/ModalSheet/MultiStepModalSheet'
import { SecondaryButton } from 'apps/expo/app/components/SecondaryButton'
import { useAppStore } from 'apps/expo/app/setup/store'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { InputObject, ModalInput } from '../../_components/ModalInput'
import { PageLayout } from '../../_components/PageLayout'
import { Section } from '../../_components/Section'
import { TextInput } from '../../_components/TextInput'
import { WhiteSection } from './WhiteSection'

const width = Dimensions.get('screen').width
const emptyCallback = () => {}
type ModalKeys = 'deposit' | 'km_limit'

const PostingDetails = () => {
  const { posting, setPosting } = useAppStore((s) => s.add)
  const ref = useModalSheetRef()

  const [page, setPage] = useState<ModalKeys>('km_limit')
  const step = 'initial'
  const openModal = ({ mapKey, type, index }: InputObject<ModalKeys>) => {
    setPage(mapKey)
    ref.current?.expand()
  }
  const pages: { [main: string]: ModalPage } = {
    deposit: {
      initial: {
        key: 'initial',
        title: 'Anticipo',
        doneButton: true,
        content: (
          <View style={depositModalStyles.container}>
            <BooleanSelect
              label="Nessun anticipo richiesto"
              selected={posting?.deposit != null}
              setSelected={() =>
                setPosting({
                  deposit: posting?.deposit == null || posting?.deposit == undefined ? '' : null,
                })
              }
            />
            {posting?.deposit != undefined && posting?.deposit != null && (
              <TextInput
                value={posting.deposit}
                title="Cifra di anticipo"
                onChange={(v) => {
                  if (isNaN(Number(v))) return
                  setPosting({ deposit: String(Number(v)) })
                }}
                placeholder="$100,00"
              />
            )}
          </View>
        ),
      },
    },
    km_limit: {
      initial: {
        key: 'initial',
        title: 'Limite Km Annuale',
        doneButton: true,
        content: (
          <View style={depositModalStyles.container}>
            <BooleanSelect
              label="Nessun limite Km annuale"
              selected={posting?.distance_limit_in_km != null}
              setSelected={() =>
                setPosting({
                  distance_limit_in_km:
                    posting?.distance_limit_in_km == null ||
                    posting?.distance_limit_in_km == undefined
                      ? ''
                      : null,
                })
              }
            />
            {posting?.distance_limit_in_km != undefined &&
              posting?.distance_limit_in_km != null && (
                <TextInput
                  value={posting.distance_limit_in_km}
                  title="Limite km annuale"
                  onChange={(v) => {
                    if (isNaN(Number(v))) return
                    setPosting({ distance_limit_in_km: String(Number(v)) })
                  }}
                  placeholder="100 km"
                />
              )}
          </View>
        ),
      },
    },
  }

  const imagesBase = ['uno', 'due', 'tre', 'quattro', 'cinque'].map(() => '')
  const [images, setImages] = useState(imagesBase)
  const handleSelectImage = async (i: number) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setImages((p) => [...p.slice(0, i), result.assets[0].uri, ...p.slice(i + 1)])
    }
  }

  return (
    <ModalSheetProvider>
      <PageLayout onButtonPress={emptyCallback}>
        <View style={styles.container}>
          {/* Carousel */}
          <WhiteSection>
            <View
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
              }}
            >
              <HorizontalPadding>
                <SectionHeading>Foto</SectionHeading>
                <SectionDescription>Inserisci fino a 20 foto del tuo veicolo</SectionDescription>
              </HorizontalPadding>
              <View style={{ width: '100%', display: 'flex', gap: 4 }}>
                <HorizontalPadding>
                  <Text style={styles.cover}>Copertina</Text>
                </HorizontalPadding>
                <ScrollView horizontal contentContainerStyle={{ paddingHorizontal: 24, gap: 12 }}>
                  {images.map((src, i) => (
                    <TouchableOpacity key={`${src}-${i}`} onPress={() => handleSelectImage(i)}>
                      <Image
                        style={{
                          width: 140,
                          height: 100,
                          borderWidth: 1,
                          borderColor: Colors.greySecondary,
                          borderRadius: 12,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        src={src}
                      />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          </WhiteSection>

          <WhiteSection>
            <HorizontalPadding>
              <Text style={styles.car}>
                Mercedes Classe G AMG {posting?.brand} {posting?.model}
              </Text>
              <View style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <TextInput
                  value={''}
                  title="Sottotitolo"
                  onChange={() => {}}
                  placeholder="(Es: Versione, Prezzo + IVA, offerta limitata etc.)"
                  note="Inserisci un sottotitolo per il tuo veicolo, in modo da far visualizzare nel titolo dell’annuncio delle informazioni aggiuntive."
                />
              </View>

              <View style={styles.inputs}>
                <View style={styles.row}>
                  <TextInput
                    value={''}
                    title="Prezzo al mese"
                    onChange={() => {}}
                    placeholder=""
                    containerStyle={{ width: (width - 64) / 2 }}
                  />
                  <TextInput
                    value={''}
                    title="Durata noleggio"
                    onChange={() => {}}
                    placeholder=""
                    containerStyle={{ width: (width - 64) / 2 }}
                  />
                </View>
                <View style={styles.row}>
                  <ModalInput<ModalKeys>
                    value={posting?.deposit ? `€ ${posting?.deposit}` : ''}
                    title="Anticipo"
                    placeholder="Nessun anticipo"
                    style={{ width: (width - 64) / 2 }}
                    mapKey="deposit"
                    index={0}
                    type="multi"
                    onPress={openModal}
                  />
                  <ModalInput<ModalKeys>
                    value={
                      posting?.distance_limit_in_km ? `${posting?.distance_limit_in_km} km` : ''
                    }
                    title="Limite km annuale"
                    placeholder="Nessun limite"
                    style={{ width: (width - 64) / 2 }}
                    mapKey="km_limit"
                    index={0}
                    type="multi"
                    onPress={openModal}
                  />
                </View>
                {/* IVA */}
                <BooleanSelect label="IVA Detraibile" selected={true} setSelected={() => {}} />
              </View>
            </HorizontalPadding>
          </WhiteSection>

          <WhiteSection>
            <HorizontalPadding>
              <View style={{ display: 'flex', gap: 20 }}>
                <TextInput
                  value={''}
                  title="Numero di telefono"
                  onChange={() => {}}
                  placeholder="(Es: Versione, Prezzo + IVA, offerta limitata etc.)"
                />
                <SecondaryButton>Aggiungi numero di telefono</SecondaryButton>
                <BooleanSelect
                  label="Nascondi numero di telefono"
                  selected={true}
                  setSelected={() => {}}
                />
              </View>
            </HorizontalPadding>
          </WhiteSection>

          {/* Description */}
          <WhiteSection>
            <HorizontalPadding>
              <TextInput
                value={''}
                title="Descrizione"
                onChange={() => {}}
                placeholder="Inserisci tutto ciò che reputi importante
                per il veicolo (max 700 caratteri)"
                multiline
                numberOfLines={8}
                style={styles.textArea}
              />
            </HorizontalPadding>
          </WhiteSection>

          <Section
            title="Anteprima annuncio"
            icon="citycar"
            subtitle="Visualizza l’anteprima del tuo annuncio prima di pubblicarlo"
          >
            <PostingCard.Large posting={posting} onCardClick={() => {}} />
          </Section>
        </View>
      </PageLayout>
      <MultiStepModalSheet ref={ref} pages={pages[page]} step={step} setStep={emptyCallback} />
    </ModalSheetProvider>
  )
}

export default PostingDetails

const depositModalStyles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    gap: 24,
    paddingBottom: 240,
  },
})

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  horizontalPadding: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
  },
  description: {
    fontSize: 13,
    fontWeight: '400',
    color: Colors.textSecondary,
  },
  cover: {
    fontSize: 13,
    fontWeight: '400',
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  car: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.blackPrimary,
    marginBottom: 24,
  },
  row: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputs: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    marginTop: 20,
  },
  textArea: {
    height: 160,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: Colors.greySecondary,
    paddingHorizontal: 12,
    paddingVertical: 12,
    width: '100%',
  },
})

/** 24 is the horitonzal padding */
const HorizontalPadding = ({ children }: { children: React.ReactNode }) => {
  return <View style={styles.horizontalPadding}>{children}</View>
}

const SectionHeading = ({ children }: { children: React.ReactNode }) => {
  return <Text style={styles.title}>{children}</Text>
}

const SectionDescription = ({ children }: { children: React.ReactNode }) => {
  return <Text style={styles.description}>{children}</Text>
}
