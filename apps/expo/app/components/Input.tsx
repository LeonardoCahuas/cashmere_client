import { Controller } from 'react-hook-form'
import { StyleProp, TextInput, TextStyle } from 'react-native'

interface InputProps {
  name: string
  placeholder?: string
  control: any
  required?: boolean
  password?: boolean
  style?: StyleProp<TextStyle>
}

export const Input = ({ name, placeholder, control, required, password, style }: InputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          autoCapitalize="none"
          secureTextEntry={password}
          style={style}
        />
      )}
    />
  )
}
