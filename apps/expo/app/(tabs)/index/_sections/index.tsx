import { TypeTab } from '@siva/ui'
import React from 'react'
import { Image, ScrollView, StyleSheet, View } from 'react-native'
import { BrandSection } from './BrandSection'
import { DriverSection } from './DriverSection'
import { ForYouSection } from './ForYouSection'
import { HighlightedSection } from './HighligthedSection'
import { SwitchSection } from './SwitchSection'
import { SearchButton } from './components/SearchButton'

const Home: React.FC = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View
          style={{
            width: '100%',
            paddingHorizontal: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <Image
            source={{
              uri: 'https://mkvfjhboywoocbqdzilx.supabase.co/storage/v1/object/public/images/LOGO.png?t=2024-09-06T07%3A09%3A24.114Z',
            }}
            style={{ width: 80, height: 25, marginBottom: 16 }}
          />
          <SearchButton />
        </View>
        <View style={{ width: '100%', marginTop: 25, paddingHorizontal: 16, paddingBottom: 32 }}>
          <TypeTab />
        </View>
        <ForYouSection />
        <SwitchSection />
        <HighlightedSection />
        <DriverSection />
        <BrandSection />
      </ScrollView>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 96,
    paddingTop: 20,
  },
})
