import { PostingCard, TypeTab } from '@siva/ui'
import React from 'react'
import { Image, ScrollView, StyleSheet, View } from 'react-native'
import { ForYouSection } from './ForYouSection'
import { HighlightedSection } from './HighligthedSection'
import { SearchButton } from './components/SearchButton'

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
        <View
          style={{
            width: '100%',
            paddingHorizontal: 16,
            display: 'flex',
            alignItems: 'center',
            paddingTop: 32,
            paddingBottom: 32,
          }}
        >
          <Image
            source={{
              uri: 'https://mkvfjhboywoocbqdzilx.supabase.co/storage/v1/object/public/images/LOGO.png?t=2024-09-06T07%3A09%3A24.114Z',
            }}
            style={{ width: 80, height: 25, marginBottom: 16 }}
          />
          <SearchButton />
          <View style={{ width: '100%', marginTop: 8 }}>
            <TypeTab />
          </View>
        </View>
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
