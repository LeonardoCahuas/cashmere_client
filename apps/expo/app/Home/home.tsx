import { PostingCard } from '@siva/ui'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { ForYouSection } from './ForYouSection'
import { HighlightedSection } from './HighligthedSection'

type Posting = React.ComponentProps<typeof PostingCard.Large>['posting']

const Home: React.FC = () => {
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
        <ForYouSection />
        <View style={{ width: '100%', paddingHorizontal: 16 }}>
          <PostingCard.Medium posting={posting} onCardClick={() => {}} />
        </View>

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
})
