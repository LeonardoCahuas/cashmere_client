import { PostingCard } from '@siva/ui'
import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { SectionTitle } from './components/SectionTitle'
import { SeeMoreButton } from './components/SeeMoreButton'

type ForYouPosting = React.ComponentProps<typeof PostingCard.Medium>['posting']
type ImagesData = React.ComponentProps<typeof SeeMoreButton>['data']

interface CardRendererProps {
  item: ForYouPosting
}

const images: ImagesData = {
  images: [
    'https://mkvfjhboywoocbqdzilx.supabase.co/storage/v1/object/public/images/1.jpg?t=2024-09-06T04%3A03%3A19.187Z',
    'https://mkvfjhboywoocbqdzilx.supabase.co/storage/v1/object/public/images/brands/yamaha.png',
    'https://mkvfjhboywoocbqdzilx.supabase.co/storage/v1/object/public/images/brands/volkswagen.png?t=2024-09-12T08%3A36%3A24.014Z',
  ],
}

const CardRenderer = ({ item }: CardRendererProps) => {
  return (
    <View style={styles.cardWrapper}>
      <PostingCard.Medium posting={item} onCardClick={() => {}} />
    </View>
  )
}

export const DriverSection = () => {
  const postings: Array<ForYouPosting> = [
    {
      brand: 'Volvo',
      model: 'XC60',
      duration: 'GIORNALIERO',
      price: 6500,
      description: 'A cool SUV',
      imageUrl:
        'https://mkvfjhboywoocbqdzilx.supabase.co/storage/v1/object/public/images/huracan.png',
      location: 'Corsico, MI',
      owner: 'Fratelli Giacomel',
      kmLimit: 0,
      anticipo: 0,
      minimumMonths: 0,
      minimumAge: 0,
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
      kmLimit: 0,
      anticipo: 0,
      minimumMonths: 0,
      minimumAge: 0,
    },
    {
      brand: 'Volvo',
      model: 'Polestar 2',
      duration: 'GIORNALIERO',
      price: 330,
      description: 'A cool SUV',
      imageUrl:
        'https://mkvfjhboywoocbqdzilx.supabase.co/storage/v1/object/public/images/smart-fortwo.png?t=2024-07-24T20%3A57%3A29.672Z',
      location: 'Milano',
      owner: 'Fratelli Giacomel',
      kmLimit: 0,
      anticipo: 0,
      minimumMonths: 0,
      minimumAge: 0,
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
      kmLimit: 0,
      anticipo: 0,
      minimumMonths: 0,
      minimumAge: 0,
    },
  ]

  return (
    <>
      <View style={styles.titleRow}>
        <SectionTitle>Veicoli con conducente</SectionTitle>
      </View>
      <FlatList
        data={postings}
        keyExtractor={(item) => item.model}
        renderItem={({ item }) => <CardRenderer item={item} />}
        contentContainerStyle={styles.contentContainerStyle}
      />
      <View style={styles.seeMoreContainer}>
        <SeeMoreButton
          data={images}
          onButtonClick={function (): void {
            console.log('see more')
          }}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingBottom: 20,
    paddingHorizontal: 8,
  },

  cardWrapper: {
    width: '100%',
    display: 'flex',
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 24,
  },
  titleRow: {
    paddingTop: 48,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingRight: 16,
    alignSelf: 'center',
  },
  seeMoreContainer: {
    width: '92%',
    alignSelf: 'center',
  },
})
