import { AnimatedSwitch, Icon, PostingCard } from '@siva/ui'
import { ModalSheetProvider } from 'apps/expo/app/components/ModalSheet'
import { ModalOptions, ModalSheet } from 'apps/expo/app/components/ModalSheet/ModalSheet'
import { linkToDetail } from 'apps/expo/app/screens/PostingDetailView/_link'
import { useUser } from 'apps/expo/app/setup/auth/hooks'
import { useGetBookmarksByUser } from 'apps/expo/app/setup/query/hooks'
import { useAppStore } from 'apps/expo/app/setup/store'
import { rentalDurations } from 'apps/expo/app/types'
import { useState } from 'react'
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'

type Posting = React.ComponentProps<typeof PostingCard.Medium>['posting']
interface CardRendererProps {
  item: Posting
}

const CardRenderer = ({ item }: CardRendererProps) => {
  return (
    <View style={styles.cardWrapper}>
      <PostingCard.Medium posting={item} onCardClick={() => linkToDetail(item)} />
    </View>
  )
}

const Saved = () => {
  const user = useUser()
  // if (!user) return <Text>Fai log in</Text>
  const { modalRef: ref, searchText } = useAppStore((state) => state.saved)
  const [sorting, setSorting] = useState<{ key: keyof Posting; direction: 'asc' | 'desc' }>()
  const [filter, setFilter] = useState<(typeof rentalDurations)[number]>('long_term')
  const { data: postings, isLoading } = useGetBookmarksByUser(userId)

  const modalOptions: ModalOptions = {
    options: [
      {
        icon: <Icon name="up_down_arrows" color="#000" />,
        label: 'Ultimo salvato',
        action: () => {
          const key: keyof Posting = 'created_at'
          setSorting({ key, direction: 'desc' })
          ref.current?.close()
        },
      },
      {
        icon: <Icon name="percentage" color="#000" />,
        label: 'Veicoli scontati',
        action: () => {
          ref.current?.close()
        },
      },
      {
        icon: <Icon name="increasing_value" color="#000" />,
        label: 'Prezzo crescente',
        action: () => {
          const key: keyof Posting = 'price'
          setSorting({ key, direction: 'asc' })
          ref.current?.close()
        },
      },
      {
        icon: <Icon name="decreasing_value" color="#000" />,
        label: 'Prezzo decrescente',
        action: () => {
          const key: keyof Posting = 'price'
          setSorting({ key, direction: 'desc' })
          ref.current?.close()
        },
      },
      {
        icon: <Icon name="sorting_plus" color="#000" />,
        label: 'Prezzo IVA Incl.',
        action: () => {
          ref.current?.close()
        },
      },
      {
        icon: <Icon name="sorting_minus" color="#000" />,
        label: 'Prezzo IVA Escl.',
        action: () => {
          ref.current?.close()
        },
      },
    ],
  }

  const tabs = [
    {
      label: 'Lungo Termine',
      icon: <Icon name="clock" width={24} color="black" />,
      action: () => setFilter('long_term'),
    },
    {
      label: 'Breve Termine',
      icon: <Icon name="lightning" width={24} color="black" />,
      action: () => setFilter('short_term'),
    },
  ]

  const sort = (a: Posting, b: Posting) => {
    if (!sorting?.key || !postings || a[sorting.key] === null || b[sorting.key] === null) return 0
    const direction = sorting.direction === 'asc' ? 1 : -1
    if (sorting.key === 'created_at')
      return (new Date(a[sorting.key]).getTime() - new Date(b[sorting.key]).getTime()) * direction
    // @ts-ignore
    const result = a[sorting.key] - b[sorting.key]
    return result * direction
  }

  if (isLoading) {
    return (
      <View style={styles.content}>
        <Text>Load</Text>
      </View>
    )
  }

  if (!postings) {
    return (
      <View style={styles.content}>
        <Text>Ancora non hai annunci salvati</Text>
      </View>
    )
  }

  return (
    <ModalSheetProvider style={styles.container}>
      <View style={styles.content}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.switchContainer}>
            <AnimatedSwitch tabs={tabs} />
          </View>
          <FlatList
            horizontal={false}
            data={postings
              .filter((p) => p.duration === filter)
              .filter(
                (p) =>
                  searchText == null ||
                  p.brand.toLowerCase().includes(searchText.toLowerCase()) ||
                  p.model.toLowerCase().includes(searchText.toLowerCase())
              )
              .sort(sort)}
            keyExtractor={(item) => item.model}
            renderItem={({ item }) => <CardRenderer item={item} />}
            contentContainerStyle={styles.contentContainerStyle}
          />
        </ScrollView>
      </View>
      <ModalSheet ref={ref} title="Ordina" options={modalOptions} />
    </ModalSheetProvider>
  )
}

export default Saved

const userId = 'fa0d125a-756d-4fba-8de1-d36597e0c41b'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    width: '100%',
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 96,
    paddingTop: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  switchContainer: {
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 24,
  },
  cardWrapper: {
    width: '100%',
    display: 'flex',
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 24,
  },
  contentContainerStyle: {
    paddingBottom: 64,
    paddingHorizontal: 8,
    overflow: 'visible',
  },
})
