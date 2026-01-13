import { TouchableOpacity, Text } from 'react-native'
import theme from '@/theme'

export interface ButtonProps {
  title: string
  onPress: () => void
  disabled?: boolean
}

export const Button = ({ title, onPress, disabled = false }: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[theme.button, disabled && theme.buttonDisabled]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={theme.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}
