import { PostingCard } from '@siva/ui'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { linkToDetail } from '../_link'

type ForYouPosting = React.ComponentProps<typeof PostingCard.Small>['posting']

interface CardRendererProps {
  item: ForYouPosting
}

const CardRenderer = ({ item }: CardRendererProps) => {
  return (
    <View style={style.cardWrapper}>
      <PostingCard.Small posting={item} onCardClick={() => linkToDetail(item)} />
    </View>
  )
}

export const RelatedVehiclesSection = () => {
  const postings = [
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
    <View style={style.container}>
      <Text style={style.title}>Veicoli Correlati</Text>
      <FlatList
        data={postings}
        keyExtractor={(item) => item.model}
        renderItem={({ item }) => <CardRenderer item={item} />}
        numColumns={2}
        columnWrapperStyle={style.columnWrapperStyle}
        contentContainerStyle={style.contentContainerStyle}
      />
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    paddingHorizontal: 20,
  },
  cont: {
    width: '100%',
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
