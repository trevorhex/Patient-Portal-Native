import { StyleSheet } from 'react-native'
import { colors, fontSizes, spacing } from './styles'

export default {
  colors,
  fontSizes,
  spacing,
  ...StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'stretch',
      padding: spacing.small,
      backgroundColor: colors.backgroundDark
    },
    title: {
      fontSize: fontSizes.large,
      fontWeight: 'bold',
      color: colors.text,
      textAlign: 'center'
    },
    input: {
      minHeight: 50,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 6,
      paddingHorizontal: spacing.small,
      paddingVertical: 10,
      color: colors.text,
      fontSize: fontSizes.medium,
      backgroundColor: colors.background800
    },
    textarea: {
      minHeight: 136
    },
    focusedInput: {
      borderColor: colors.secondary,
      borderWidth: 2
    },
    inputLabel: {
      color: colors.text,
      fontWeight: 'bold',
      marginBottom: 8,
      fontSize: fontSizes.medium
    },
    inputError: {
      borderColor: colors.error,
      borderWidth: 2
    },
    button: {
      backgroundColor: colors.primary,
      height: 50,
      borderRadius: 6,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 16
    },
    buttonSecondary: {
      backgroundColor: colors.secondary
    },
    buttonOutlined: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: colors.text
    },
    buttonDisabled: {
      backgroundColor: colors.gray
    },
    buttonText: {
      color: colors.text,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: 1,
      fontSize: fontSizes.small
    },
    card: {
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.border700,
      borderRadius: 8,
      padding: spacing.small
    }
  })
}
