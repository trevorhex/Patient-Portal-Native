import { TouchableOpacity, Text } from 'react-native'
import theme from '@/theme'

export interface ButtonProps {
  title: string
  onPress: () => void
  disabled?: boolean
  variant?: 'filled' | 'outlined'
  color?: 'primary' | 'secondary'
}

export const Button = ({
  title,
  onPress,
  disabled = false,
  variant = 'filled',
  color = 'primary'
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        theme.button,
        variant === 'outlined' && theme.buttonOutlined,
        color === 'secondary' && theme.buttonSecondary,
        disabled && theme.buttonDisabled
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={theme.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}
