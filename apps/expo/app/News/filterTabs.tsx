import { Icon, IconName } from '@siva/ui'
import { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Colors } from '@siva/ui'
import FilterButton from './filterButton'

const tabs: Array<TabItem> = [
  { label: 'Audi', icon: 'close' },
  { label: 'Prezzo da 1.500€', icon: 'close' },
  { label: 'Breve termine', icon: 'close' },
  { label: 'Lungo termine', icon: 'close' },
  { label: 'Cambio automatico', icon: 'close' },
  { label: 'Volvo', icon: 'close' },
]

export const FilterTab = () => {
  const [activeTypes, setActiveTypes] = useState(tabs.map((tab) => ({ ...tab, selected: false })))

  return (
    <View style={styles.container}>
    <ScrollView  horizontal  showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabContainer} >
      {activeTypes.map(({ label, icon, selected }, i) => (
        <FilterButton
          key={label}
          icon={<Icon name={icon} color={selected ? 'white' : 'black'} />}
          label={label}
          active={selected}
          onClick={() => {
            setActiveTypes((p) => {
              const px = [...p]
              px.splice(i, 1, { ...p[i], selected: !p[i].selected })
              return px
            })
          }}
        />
      ))}
    </ScrollView>
    </View> 
  )
}

const styles = StyleSheet.create({
  container: {
    padding:16,
    borderBottomColor:Colors.lightGray,
    borderBottomWidth:4
  },
  tabContainer:{
    display:"flex",
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 8,
  }
})

interface TabItem {
  label: string
  icon: IconName
}
