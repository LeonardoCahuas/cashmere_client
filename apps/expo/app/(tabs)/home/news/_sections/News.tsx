import { PostingCard } from '@siva/ui'
import { linkToDetail } from 'apps/expo/app/screens/PostingDetailView/_link'
import { Stack } from 'expo-router'
import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { FilterTab } from './components/FilterTab'

type PostingCard = React.ComponentProps<typeof PostingCard.Large>['posting']

interface CardRendererProps {
  item: PostingCard
}

const CardRenderer = ({ item }: CardRendererProps) => {
  return (
    <View style={styles.cardWrapper}>
      <PostingCard.Large posting={item} onCardClick={() => linkToDetail(item)} />
    </View>
  )
}

const News = () => {
  const postings: Array<PostingCard> = [
    {
      id: 'id',
      posting_id: 'b89e5b72-9d28-474d-ace3-44ca21437d97',
      created_at: '2024-09-18T10:32:35.000Z',
      duration: 'long_term',
      subtitle: 'Offertona Estiva',
      dropoff_location_plain: 'Milano',
      pickup_location_plain: 'Malpensa',
      deposit: '40',
      price: 43,
      age_required: 18,
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
      id: '07788071-75c3-4e44-8eb3-13981ce3f229',
      posting_id: '07788071-75c3-4e44-8eb3-13981ce3f229',
      created_at: '2024-09-25T21:33:40.611Z',
      duration: 'long_term',
      subtitle: null,
      dropoff_location_plain: 'Malpensa',
      pickup_location_plain: 'Linate, MI',
      deposit: '35',
      price: 99,
      age_required: 21,
      distance_limit_in_km: '87',
      taxes_included: true,
      vehicle_id: '27ced9af-010b-407a-9bd7-c17416c3585c',
      brand: 'Kia',
      model: 'Seltos',
      fuel_type: 'Hybrid',
      year: 2023,
      interior_material: null,
      interior_color: null,
      exterior_color: null,
      transmission_type: null,
      renter_name: 'Imbruttito Noleggi',
      vehicle_images: [
        'https://mkvfjhboywoocbqdzilx.supabase.co/storage/v1/object/public/images/cq5dam.thumbnail.1024.680.png?t=2024-09-25T21%3A28%3A09.423Z',
      ],
    },
    {
      id: '203fa9f8-d5f3-409d-a286-594a92921206',
      posting_id: '203fa9f8-d5f3-409d-a286-594a92921206',
      created_at: '2024-09-25T09:32:21.000Z',
      duration: 'short_term',
      subtitle: 'Offerta Estiva',
      dropoff_location_plain: 'Linate',
      pickup_location_plain: 'Milano',
      deposit: '25',
      price: 179,
      age_required: 24,
      distance_limit_in_km: '56',
      taxes_included: true,
      vehicle_id: '034cf97f-901a-4f25-9859-719c656e2092',
      brand: 'Honda',
      model: 'CRV',
      fuel_type: 'Hybrid',
      year: 2025,
      interior_material: null,
      interior_color: null,
      exterior_color: null,
      transmission_type: null,
      renter_name: 'Imbruttito Noleggi',
      vehicle_images: [
        'https://mkvfjhboywoocbqdzilx.supabase.co/storage/v1/object/public/images/2024_honda_cr-v_4dr-suv_sport-hybrid_fq_oem_1_815.avif?t=2024-09-25T20%3A14%3A47.707Z',
      ],
    },
    {
      id: '213ef',
      posting_id: '5f1f15b2-905b-41cd-b114-747b8330ba9d',
      created_at: '2024-09-28T01:14:52.789Z',
      duration: 'short_term',
      subtitle: null,
      dropoff_location_plain: 'Varese, MI',
      pickup_location_plain: 'Varese, MI',
      deposit: '19',
      price: 39,
      age_required: 18,
      distance_limit_in_km: '50',
      taxes_included: false,
      vehicle_id: '75cf1268-faf4-4a4d-8ae7-3f0c1b75b744',
      brand: 'Honda',
      model: 'HRV',
      fuel_type: 'Gas',
      year: 2024,
      interior_material: null,
      interior_color: null,
      exterior_color: null,
      transmission_type: 'Automatic',
      renter_name: 'Imbruttito Noleggi',
      vehicle_images: [
        'https://mkvfjhboywoocbqdzilx.supabase.co/storage/v1/object/public/images/hr-v-00.webp',
      ],
    },
  ]
  return (
    <View>
      <Stack.Screen
        options={{
          title: 'Per te',
        }}
      />
      <FilterTab />
      <FlatList
        horizontal={false}
        data={postings}
        keyExtractor={(item) => item.model}
        renderItem={({ item }) => <CardRenderer item={item} />}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </View>
  )
}

export default News

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingBottom: 100,
    paddingHorizontal: 18,
    paddingTop: 0,
    overflow: 'visible',
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: '100%',
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
    alignItems: 'center',
    paddingTop: 16,
  },
})
