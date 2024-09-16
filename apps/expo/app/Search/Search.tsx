import { View } from "react-native"
import DurationCard from "../Home/components/DurationButton"
import { Colors, ScrollView } from "@siva/ui"
import { ExploreSection } from "../Home/ExploreSection"

export default function Search() {
  return (
    <View>
      <ScrollView>
        <DurationCard duration="short" />
        <View style={{ height: 5, backgroundColor: Colors.lightGray }}></View>
        <DurationCard duration="long" />
        <View style={{ height: 5, backgroundColor: Colors.lightGray }}></View>
        <ExploreSection/>
      </ScrollView>
    </View>
  )
}
