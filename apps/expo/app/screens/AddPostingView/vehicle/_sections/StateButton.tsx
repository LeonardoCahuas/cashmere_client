import { Colors } from '@siva/ui'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface StateButtonProps {
  items: { label: string; value: string }[]
  onPress: (state: 'new' | 'used') => void
  selected?: string
}

export const StateButtons = ({ items, onPress, selected }: StateButtonProps) => {
  return (
    <View style={styles.powerRow}>
      {items.map(({ label, value }) => (
        <TouchableOpacity
          key={value}
          style={{
            ...styles.powerButton,
            borderColor: value === selected ? Colors.greenPrimary : Colors.greySecondary,
            backgroundColor: value === selected ? Colors.greenSelection : 'white',
          }}
          onPress={() => onPress(value as 'new' | 'used')}
        >
          <Text>{label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  powerRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },
  powerButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.greySecondary,
    flexGrow: 1,
    borderRadius: 8,
  },
})
