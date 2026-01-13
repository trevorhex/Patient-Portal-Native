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
      padding: 8,
      backgroundColor: colors.background
    },
    title: {
      fontSize: fontSizes.large,
      fontWeight: 'bold',
      color: colors.text,
      textAlign: 'center'
    },
    input: {
      height: 50,
      borderColor: colors.gray,
      borderWidth: 1,
      borderRadius: 6,
      paddingHorizontal: spacing.small,
      marginBottom: spacing.small,
      color: colors.text,
      backgroundColor: colors.backgroundLight
    },
    button: {
      backgroundColor: colors.primary,
      padding: 15,
      borderRadius: 6,
      alignItems: 'center'
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
    }
  })
}
