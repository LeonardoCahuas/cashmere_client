import { Colors } from '@siva/ui'
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

export const SecondaryButton = ({ ...props }: TouchableOpacityProps) => (
  <TouchableOpacity {...props} style={[style.secondary]} activeOpacity={1}>
    <Text style={style.label}>{props.children}</Text>
  </TouchableOpacity>
)

const style = StyleSheet.create({
  secondary: {
    width: '100%',
    borderColor: Colors.blackPrimary,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 13,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: Colors.blackPrimary,
    fontSize: 14,
    fontWeight: '500',
  },
})
