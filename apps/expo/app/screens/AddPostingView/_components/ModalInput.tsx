import { Colors, Icon } from '@siva/ui'
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'

export type AddModalKey =
  | 'main_details'
  | 'vehicle_state'
  | 'vehicle_features'
  | 'engine'
  | 'equipment'

export type InputObject = { mapKey: AddModalKey; index: number; type: 'single' | 'multi' }

export interface ModalInputProps {
  title: string
  placeholder?: string
  value: string | undefined
  note?: string
  mapKey: AddModalKey
  index: number
  type: 'single' | 'multi'
  onPress?: (obj: InputObject) => void
  style?: ViewStyle
}

export const ModalInput = ({
  title,
  placeholder,
  note,
  value,
  mapKey,
  index,
  type,
  onPress,
  style,
}: ModalInputProps) => {
  return (
    <View style={{ ...styles.container, ...style }}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        style={styles.box}
        onPress={() => {
          if (!onPress) return
          onPress({ mapKey, index, type })
        }}
      >
        <View style={styles.boxContent}>
          {value && <Text style={styles.value}>{value}</Text>}
          {!value && placeholder && <Text style={styles.placeholder}>{placeholder}</Text>}
        </View>
        <Icon name="chevron-right" color={Colors.textSecondary} width={12} height={12} />
      </TouchableOpacity>
      {note && <Text style={styles.noteText}>{note}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: 10,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    paddingLeft: 2,
  },
  box: {
    width: '100%',
    height: 42,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: Colors.greySecondary,
    alignItems: 'center',
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 12,
  },
  boxContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 8,
  },
  placeholder: {
    fontSize: 14,
    color: Colors.greySecondary,
  },
  noteText: {
    fontSize: 13,
    lineHeight: 18,
    color: Colors.textSecondary,
    width: '90%',
    paddingLeft: 4,
  },
  value: {
    fontSize: 14,
    color: Colors.blackPrimary,
    fontWeight: '500',
  },
})
