import { Colors, Icon } from '@siva/ui'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

interface SelectableRowProps {
  checked: boolean
  onPress: () => void
  item: { label: string; value: string }
  children?: JSX.Element
}

export const SelectableRow = ({ checked, item, children, onPress }: SelectableRowProps) => {
  return (
    <TouchableOpacity
      key={item.value}
      style={selectableRowStyle.actionContainer}
      onPress={() => {
        onPress()
        Haptics.selectionAsync()
      }}
    >
      {!!children ? children : <Text>{item.label}</Text>}
      {checked ? (
        <View style={selectableRowStyle.checkContainerFull}>
          <Icon name="check" color="#fff" />
        </View>
      ) : (
        <View style={selectableRowStyle.checkContainerEmpty}></View>
      )}
    </TouchableOpacity>
  )
}

const selectableRowStyle = StyleSheet.create({
  actionContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.tertiaryGray,
    paddingVertical: 12,
  },
  checkContainerFull: {
    width: 24,
    height: 24,
    borderRadius: 24,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.greenPrimary,
  },
  checkContainerEmpty: {
    width: 24,
    height: 24,
    borderRadius: 24,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.greySecondary,
  },
})
