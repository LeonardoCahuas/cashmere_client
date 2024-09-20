import { AnimatedSwitch, Icon, PostingCard } from '@siva/ui'
import { ModalOptions, ModalSheet, ModalSheetProvider } from 'apps/expo/app/components/ModalSheet'
import { useAppStore } from 'apps/expo/app/setup/store'
import { useState } from 'react'
import { FlatList, ScrollView, StyleSheet, View } from 'react-native'

type Posting = React.ComponentProps<typeof PostingCard.Medium>['posting']
interface CardRendererProps {
  item: Posting
}

const CardRenderer = ({ item }: CardRendererProps) => {
  return (
    <View style={styles.cardWrapper}>
      <PostingCard.Medium posting={item} onCardClick={() => {}} />
    </View>
  )
}

const Saved = () => {
  const ref = useAppStore((state) => state.saved.modalRef)
  const [sorting, setSorting] = useState<{ key: keyof Posting; direction: 'asc' | 'desc' }>()
  const [filter, setFilter] = useState<Posting['duration']>('MENSILE')

  const modalOptions: ModalOptions = {
    title: 'Ordina',
    options: [
      {
        label: 'Ultimo salvato',
        action: () => {
          ref.current?.close()
        },
      },
      {
        label: 'Veicoli scontati',
        action: () => {
          ref.current?.close()
        },
      },
      {
        label: 'Prezzo crescente',
        action: () => {
          const key: keyof Posting = 'price'
          setSorting({ key, direction: 'asc' })
          ref.current?.close()
        },
      },
      {
        label: 'Prezzo decrescente',
        action: () => {
          const key: keyof Posting = 'price'
          setSorting({ key, direction: 'desc' })
          ref.current?.close()
        },
      },
      {
        label: 'Prezzo IVA Incl.',
        action: () => {
          ref.current?.close()
        },
      },
      {
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
      action: () => {
        setFilter('MENSILE')
      },
    },
    {
      label: 'Breve Termine',
      icon: <Icon name="lightning" width={24} color="black" />,
      action: () => {
        setFilter('GIORNALIERO')
      },
    },
  ]

  const postings: Array<Posting> = [
    {
      brand: 'Volvo',
      model: 'XC60',
      duration: 'MENSILE',
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
      price: 190,
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
      price: 85,
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
              .sort((a, b) => {
                if (!sorting?.key) return 0
                const result = a[sorting.key] - b[sorting.key]
                return sorting.direction === 'asc' ? result : result * -1
              })}
            keyExtractor={(item) => item.model}
            renderItem={({ item }) => <CardRenderer item={item} />}
            contentContainerStyle={styles.contentContainerStyle}
          />
        </ScrollView>
      </View>
      <ModalSheet ref={ref} onChange={() => {}} options={modalOptions} selected={sorting?.key} />
    </ModalSheetProvider>
  )
}

export default Saved

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
