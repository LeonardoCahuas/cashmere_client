import { Colors, PostingCard } from '@siva/ui'
import { BooleanSelect } from 'apps/expo/app/components/BooleanSelect'
import { ModalSheetProvider, useModalSheetRef } from 'apps/expo/app/components/ModalSheet'
import { ModalSheet } from 'apps/expo/app/components/ModalSheet/ModalSheet'
import { SecondaryButton } from 'apps/expo/app/components/SecondaryButton'
import { useAppStore } from 'apps/expo/app/setup/store'
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import { ModalInput } from '../../_components/ModalInput'
import { PageLayout } from '../../_components/PageLayout'
import { Section } from '../../_components/Section'
import { TextInput } from '../../_components/TextInput'
import { WhiteSection } from './WhiteSection'

const width = Dimensions.get('screen').width

const PostingDetails = () => {
  const { posting } = useAppStore((s) => s.add)
  const ref = useModalSheetRef()
  const images = ['uno', 'due', 'tre', 'quattro', 'cinque', 'sei', 'sette', 'otto', 'nove']

  const handleSelectImage = async () => {}

  return (
    <ModalSheetProvider>
      <PageLayout onButtonPress={() => {}}>
        <View style={styles.container}>
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
                  {images.map((image) => (
                    <View
                      key={image}
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
                    >
                      <Text>{image}</Text>
                    </View>
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
                {/*  */}
                <View style={styles.row}>
                  <TextInput
                    value={''}
                    title="Anticipo"
                    onChange={() => {}}
                    placeholder=""
                    containerStyle={{ width: (width - 64) / 2 }}
                  />
                  <ModalInput
                    title={'Limite km annuale'}
                    value={undefined}
                    mapKey={'main_details'}
                    index={0}
                    type={'single'}
                    style={{ width: (width - 64) / 2 }}
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
      <ModalSheet ref={ref}>{}</ModalSheet>
    </ModalSheetProvider>
  )
}

export default PostingDetails

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
