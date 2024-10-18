import { Colors, Icon } from '@siva/ui'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export type InputObject = { mapKey: string; index: number; type: 'single' | 'multi' }

export interface ModalInputProps {
  title: string
  placeholder?: string
  note?: string
  mapKey: string
  index: number
  type: 'single' | 'multi'
  onPress?: (obj: InputObject) => void
}

export const ModalInput = ({
  title,
  placeholder,
  note,
  mapKey,
  index,
  type,
  onPress,
}: ModalInputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        style={styles.box}
        onPress={() => {
          if (!onPress) return
          onPress({ mapKey, index, type })
        }}
      >
        <View style={styles.boxContent}>
          {placeholder && <Text style={styles.placeholder}>{placeholder}</Text>}
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
})
