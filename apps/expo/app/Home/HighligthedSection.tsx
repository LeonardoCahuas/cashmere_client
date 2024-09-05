import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { HighlightedButton } from './components/InEvidenceButton'

interface Highlight {
  title: string
  text: string
  buttonText: string
  imageUrl: string
}

export const highlights: Highlight[] = [
  {
    title: 'Luxury Breve Termine',
    text: "Vivi un'esperienza con i veicoli luxury",
    buttonText: 'Guarda gli annunci',
    imageUrl:
      'https://mkvfjhboywoocbqdzilx.supabase.co/storage/v1/object/public/images/luxury.png?t=2024-09-05T21%3A13%3A44.014Z',
  },
  {
    title: 'Offerte Speciali',
    text: 'Scopri le nostre offerte del mese',
    buttonText: 'Vedi offerte',
    imageUrl: 'https://example.com/path/to/offers-image.jpg',
  },
  {
    title: 'Nuovi Arrivi',
    text: 'Esplora i nostri ultimi modelli',
    buttonText: 'Scopri di più',
    imageUrl: 'https://example.com/path/to/new-arrivals-image.jpg',
  },
]

export const HighlightedSection: React.FC = () => {
  return (
    <>
      <View style={{ marginTop: 24, marginBottom: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', marginLeft: 16 }}>In evidenza</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
      >
        {highlights.map((highlight, index) => (
          <HighlightedButton key={index} data={highlight} onButtonClick={() => {}} />
        ))}
      </ScrollView>
    </>
  )
}
