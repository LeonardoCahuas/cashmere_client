import { CardsPerTe } from '@siva/ui'
import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

type Posting = React.ComponentProps<typeof CardsPerTe>['posting']

interface CardRendererProps {
  item: Posting
}

const CardRenderer = ({ item }: CardRendererProps) => {
  return <CardsPerTe posting={item} onCardClick={() => {}} />
}

const Home: React.FC = () => {
  const postings: Array<Posting> = [
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
  ]

  return (
    <View>
      <FlatList
        data={postings}
        keyExtractor={(item) => item.model}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={({ item }) => <CardRenderer item={item} />}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapperStyle}
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  contentContainerStyle: {
    gap: 16,
    padding: 16,
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
  },
})
