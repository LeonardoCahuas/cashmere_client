import { Colors, Icon } from '@siva/ui'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface CheckItemProps {
  name: string
  checked: boolean
  onPress: () => void
}

export const CheckItem = ({ name, checked, onPress }: CheckItemProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {checked ? (
        <View style={styles.checkedCircle}>
          <Icon name="check" color="#fff" />
        </View>
      ) : (
        <View style={styles.uncheckedCircle} />
      )}
      <Text style={styles.label}>{name}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  uncheckedCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.lightGray,
    borderWidth: 1,
    borderColor: Colors.textSecondary,
  },
  checkedCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.greenPrimary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
})
