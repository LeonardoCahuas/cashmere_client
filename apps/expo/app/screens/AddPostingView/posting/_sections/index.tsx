import { Colors } from '@siva/ui'
import { useAppStore } from 'apps/expo/app/setup/store'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { PageLayout } from '../../_components/PageLayout'
import { TextInput } from '../../_components/TextInput'
import { WhiteSection } from './WhiteSection'

const PostingDetails = () => {
  const { posting } = useAppStore((s) => s.add)
  const images = ['uno', 'due', 'tre', 'quattro', 'cinque', 'sei', 'sette', 'otto', 'nove']
  return (
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
              {posting?.brand} {posting?.model}
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
          </HorizontalPadding>
        </WhiteSection>
      </View>
    </PageLayout>
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
})

const HorizontalPadding = ({ children }: { children: React.ReactNode }) => {
  return <View style={styles.horizontalPadding}>{children}</View>
}

const SectionHeading = ({ children }: { children: React.ReactNode }) => {
  return <Text style={styles.title}>{children}</Text>
}

const SectionDescription = ({ children }: { children: React.ReactNode }) => {
  return <Text style={styles.description}>{children}</Text>
}
