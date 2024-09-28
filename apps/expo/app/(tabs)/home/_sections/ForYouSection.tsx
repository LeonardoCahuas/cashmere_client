import { Colors, PostingCard } from '@siva/ui'
import { linkToDetail } from 'apps/expo/app/screens/PostingDetailView/_link'
import { useRouter } from 'expo-router'
import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SectionTitle } from './components/SectionTitle'

type ForYouPosting = React.ComponentProps<typeof PostingCard.Small>['posting']

interface CardRendererProps {
  item: ForYouPosting
}

const CardRenderer = ({ item }: CardRendererProps) => {
  return (
    <View style={styles.cardWrapper}>
      <PostingCard.Small posting={item} onCardClick={() => linkToDetail(item)} />
    </View>
  )
}

export const ForYouSection = () => {
  const router = useRouter()

  const handlePress = () => router.push('/home/news')

  const postings: Array<ForYouPosting> = [
    {
      id: 'id',
      posting_id: 'b89e5b72-9d28-474d-ace3-44ca21437d97',
      created_at: '2024-09-18T10:32:35.000Z',
      duration: 'long_term',
      subtitle: 'Offertona Estiva',
      dropoff_location_plain: 'Milano',
      pickup_location_plain: 'Malpensa',
      deposit: '40',
      price: '43',
      age_required: '18',
      distance_limit_in_km: '',
      taxes_included: true,
      vehicle_id: '5da8af70-9543-4770-90a6-4c5995520924',
      brand: 'Kia',
      model: 'Sorento',
      fuel_type: 'Diesel',
      year: 2024,
      interior_material: 'Black',
      interior_color: 'Gray',
      exterior_color: 'Beige',
      transmission_type: 'Manual',
      renter_name: 'Imbruttito Noleggi',
      vehicle_images: [
        'https://mkvfjhboywoocbqdzilx.supabase.co/storage/v1/object/public/images/kia-sorento-2024-frontal-lateral.369513.webp?t=2024-09-25T16%3A15%3A47.703Z',
      ],
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
        <TouchableOpacity onPress={handlePress}>
          <Text style={{ color: Colors.greenPrimary, fontSize: 14, fontWeight: '600' }}>
            Vedi Tutto
          </Text>
        </TouchableOpacity>
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
    borderWidth: 1,
  },
  titleRow: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 16,
  },
})
