import { Text, TextInput, View, TextInputProps } from 'react-native'
import theme from '@/theme'

export interface TextareaProps extends TextInputProps {
  label?: string
  focused?: boolean
  error?: boolean
}

export const Textarea = ({ label, focused, error, ...props }: TextareaProps) => {
  return (
    <View>
      {label && <Text style={theme.inputLabel}>{label}</Text>}
      <TextInput
        multiline
        numberOfLines={5}
        style={[
          theme.input,
          theme.textarea,
          focused && theme.focusedInput,
          error && theme.inputError
        ]}
        placeholderTextColor={theme.colors.gray}
        {...props}
      />  
    </View>
  )
}
