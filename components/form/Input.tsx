import { Text, TextInput, View, TextInputProps } from 'react-native'
import theme from '@/theme'

export interface InputProps extends TextInputProps {
  label?: string
  focused?: boolean
  error?: boolean
}

export const Input = ({ label, focused, error, ...props }: InputProps) => {
  return (
    <View>
      {label && <Text style={theme.inputLabel}>{label}</Text>}
      <TextInput
        style={[
          theme.input,
          focused && theme.focusedInput,
          error && theme.inputError
        ]}
        placeholderTextColor={theme.colors.gray}
        {...props}
      />  
    </View>
  )
}
