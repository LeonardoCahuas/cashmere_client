import { Colors } from '@siva/ui'
import { TextInput as RNTextInput, StyleSheet, Text, View } from 'react-native'

interface TextInputProps {
  title: string
  placeholder?: string
  note?: string
  value: string
  onChange: (text: string) => void
}

export const TextInput = ({ title, placeholder, note, value, onChange }: TextInputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <RNTextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        autoCapitalize="none"
        style={styles.input}
        keyboardType="numeric"
      />
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
  noteText: {
    fontSize: 13,
    lineHeight: 20,
    color: Colors.textSecondary,
    width: '90%',
    paddingLeft: 4,
  },
  input: {
    height: 42,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: Colors.greySecondary,
    paddingHorizontal: 12,
    width: '100%',
  },
})
