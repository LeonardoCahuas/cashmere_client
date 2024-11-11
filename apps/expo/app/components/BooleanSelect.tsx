import { FontAwesome } from '@expo/vector-icons'
import { Colors } from '@siva/ui'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface BooleanSelectProps {
  label: string
  selected: boolean
  setSelected: (currentValue: string) => void
}

export const BooleanSelect = ({ label, selected, setSelected }: BooleanSelectProps) => {
  return (
    <TouchableOpacity
      style={[styles.onlyVerifiedCont, selected ? styles.onlyVerifiedContActive : {}]}
      activeOpacity={1}
      onPress={() => setSelected('')}
    >
      <Text>{label}</Text>
      <View
        style={[
          styles.checkContainer,
          selected
            ? { backgroundColor: Colors.greenPrimary }
            : { borderWidth: 2, borderColor: Colors.greySecondary },
        ]}
      >
        {selected && <FontAwesome name="check" color="white" />}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  onlyVerifiedCont: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.lightGray,
    padding: 16,
    paddingVertical: 11,
    borderRadius: 6,
  },
  onlyVerifiedContActive: {
    backgroundColor: Colors.greenSelection,
    borderColor: Colors.greenPrimary,
  },
  checkContainer: {
    width: 21,
    height: 21,
    borderRadius: 21,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
