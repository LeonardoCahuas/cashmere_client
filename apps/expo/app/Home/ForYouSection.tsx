import { CardsPerTe, Colors } from '@siva/ui'
import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { SectionTitle } from './components/SectionTitle'

type ForYouPosting = React.ComponentProps<typeof CardsPerTe>['posting']

interface CardRendererProps {
  item: ForYouPosting
}

const CardRenderer = ({ item }: CardRendererProps) => {
  return (
    <View style={styles.cardWrapper}>
      <CardsPerTe posting={item} onCardClick={() => {}} />
    </View>
  )
}

export const ForYouSection = () => {
  const postings: Array<ForYouPosting> = [
    {
      brand: 'Volvo',
      model: 'XC60',
      duration: '123',
      price: 6500,
      description: 'A cool SUV',
      imageUrl:
        'https://mkvfjhboywoocbqdzilx.supabase.co/storage/v1/object/public/images/huracan.png',
      location: 'Corsico, MI',
      owner: 'Fratelli Giacomel',
    },
    {
      brand: 'Volvo',
      model: 'XC90',
      duration: 'GIORNALIERO',
      price: 330,
      description: 'A cool SUV',
      imageUrl:
        'https://mkvfjhboywoocbqdzilx.supabase.co/storage/v1/object/public/images/g-class.png?t=2024-07-24T20%3A57%3A21.219Z',
      location: 'Pavia, PV',
      owner: 'Fratelli Giacomel',
    },
    {
      brand: 'Volvo',
      model: 'Polestar 2',
      duration: '123',
      price: 330,
      description: 'A cool SUV',
      imageUrl:
        'https://mkvfjhboywoocbqdzilx.supabase.co/storage/v1/object/public/images/smart-fortwo.png?t=2024-07-24T20%3A57%3A29.672Z',
      location: 'Milano',
      owner: 'Fratelli Giacomel',
    },
    {
      brand: 'Volvo',
      model: 'XC40',
      duration: 'GIORNALIERO',
      price: 330,
      description: 'A cool SUV',
      imageUrl:
        'https://mkvfjhboywoocbqdzilx.supabase.co/storage/v1/object/public/images/g-class.png?t=2024-07-24T20%3A57%3A21.219Z',
      location: 'Pavia, PV',
      owner: 'Fratelli Giacomel',
    },
  ]

  return (
    <>
      <View style={styles.titleRow}>
        <SectionTitle>Novità</SectionTitle>
        <Text style={{ color: Colors.greenPrimary, fontSize: 14, fontWeight: '600' }}>
          Vedi Tutto
        </Text>
      </View>
      <FlatList
        data={postings}
        keyExtractor={(item) => item.model}
        renderItem={({ item }) => <CardRenderer item={item} />}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapperStyle}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </>
  )
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingBottom: 40,
    paddingHorizontal: 8,
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
  },
  titleRow: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingRight: 16,
  },
})
