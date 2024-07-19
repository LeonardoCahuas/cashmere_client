import { CardsPerTe } from '@siva/ui'
import React from 'react'
import { View } from 'react-native'

type Posting = React.ComponentProps<typeof CardsPerTe>['posting']

const Home: React.FC = () => {
  const arr: Array<Posting> = [
    {
      brand: 'Volvo',
      model: 'XC60',
      duration: '123',
      price: 330,
      description: 'A cool SUV',
      imageUrl: '',
      location: 'Milano',
      owner: 'Fratelli Giacomel',
    },
  ]
  return (
    <View>
      {arr.map((posting) => (
        <CardsPerTe posting={posting} onCardClick={() => {}} />
      ))}
    </View>
  )
}

export default Home
