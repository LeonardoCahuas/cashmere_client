import { Colors, Icon } from '@siva/ui'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export interface ModalInputProps {
  title: string
  placeholder?: string
  note?: string
  onPress?: () => void
}

export const ModalInput = ({ title, placeholder, note, onPress }: ModalInputProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.box}>
        <View style={styles.boxContent}>
          {placeholder && <Text style={styles.placeholder}>{placeholder}</Text>}
        </View>
        <Icon name="chevron-right" color={Colors.textSecondary} width={12} height={12} />
      </View>
      <Text style={styles.noteText}>{note}</Text>
    </TouchableOpacity>
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
