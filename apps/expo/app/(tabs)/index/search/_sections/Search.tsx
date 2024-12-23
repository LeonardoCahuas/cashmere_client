import { Colors, ScrollView } from '@siva/ui'
import DurationCard from 'apps/expo/app/(tabs)/index/_sections/components/DurationButton'
import { ExploreSection } from 'apps/expo/app/(tabs)/index/search/_sections/ExploreSection'
import { Stack } from 'expo-router'
import { View } from 'react-native'

export default function Search() {
  return (
    <View>
      <Stack.Screen
        options={{
          title: 'Avvia la ricerca',
        }}
      />
      <ScrollView>
        <DurationCard duration="short" />
        <View style={{ height: 5, backgroundColor: Colors.lightGray }}></View>
        <DurationCard duration="long" />
        <View style={{ height: 5, backgroundColor: Colors.lightGray }}></View>
        <ExploreSection />
      </ScrollView>
    </View>
  )
}
