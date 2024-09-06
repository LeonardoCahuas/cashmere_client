import { Icon, IconName } from '@siva/ui'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Colors } from '../base/colors'
import CustomButton from './typeButton'

const tabs: Array<TabItem> = [
  { label: 'Macchine', icon: 'car' },
  { label: 'Moto', icon: 'motorbike' },
  { label: 'Furgoni', icon: 'truck' },
]

export const TypeTab: React.FC = () => {
  const [activeTypes, setActiveTypes] = useState(tabs.map((tab) => ({ ...tab, selected: false })))

  return (
    <View style={styles.container}>
      {activeTypes.map(({ label, icon, selected }, i) => (
        <CustomButton
          key={label}
          icon={<Icon name={icon} color={selected ? 'white' : Colors.textSecondary} />}
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 5,
  },
})

interface TabItem {
  label: string
  icon: IconName
}
