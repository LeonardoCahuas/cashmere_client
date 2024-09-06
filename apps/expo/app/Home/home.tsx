import { CardsPerTe, PostingCard } from '@siva/ui'
import React from 'react'
import { FlatList, ScrollView, StyleSheet, View } from 'react-native'
import { HighlightedSection } from './HighligthedSection'

type ForYouPosting = React.ComponentProps<typeof CardsPerTe>['posting']
type Posting = React.ComponentProps<typeof PostingCard.Large>['posting']

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

const Home: React.FC = () => {
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

  const posting: Posting = {
    brand: 'Kia',
    model: 'Seltos',
    duration: 'MENSILE',
    price: 550,
    description: 'SUV Subcompatta',
    imageUrl:
      'https://mkvfjhboywoocbqdzilx.supabase.co/storage/v1/object/public/images/1.jpg?t=2024-09-06T04%3A03%3A19.187Z',
    location: 'Milano',
    owner: 'Fratelli Giacomel',
    kmLimit: 500,
    anticipo: 200,
    minimumAge: 25,
    minimumMonths: 36,
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={{ width: '100%', paddingHorizontal: 16 }}>
          <PostingCard.Medium posting={posting} onCardClick={() => {}} />
        </View>
        <FlatList
          data={postings}
          keyExtractor={(item) => item.model}
          renderItem={({ item }) => <CardRenderer item={item} />}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapperStyle}
          contentContainerStyle={styles.contentContainerStyle}
        />
        <HighlightedSection />
      </ScrollView>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 96,
  },
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
})
