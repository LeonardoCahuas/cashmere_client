import { Colors, ScrollView } from '@siva/ui'
import { ExploreSection } from 'apps/expo/app/Home/ExploreSection'
import DurationCard from 'apps/expo/app/Home/components/DurationButton'
import { View } from 'react-native'

export default function Search() {
  return (
    <View>
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
