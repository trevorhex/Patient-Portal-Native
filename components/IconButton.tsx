import { ComponentType } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import theme from '@/theme'

export const IconButton = ({ onPress, accessibilityLabel, Icon, style }: {
  onPress: () => void
  accessibilityLabel: string
  Icon: ComponentType<{ color: string }>
  style?: ReturnType<typeof StyleSheet.create>
}) => {
  return (
    <Pressable
      hitSlop={40}
      onPress={onPress}
      accessibilityLabel={accessibilityLabel}
      style={[{ marginHorizontal: 16 }, style]}
    >
      {({ pressed }) => <Icon color={pressed ? theme.colors.secondary : theme.colors.text} />}
    </Pressable>
  )
}
