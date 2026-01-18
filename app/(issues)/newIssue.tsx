import { StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { IssueForm } from '@/components/issues/IssueForm'
import theme from '@/theme'

export default function NewIssueScreen() {
  return (
    <KeyboardAwareScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid
      showsVerticalScrollIndicator={false}
    >
      <IssueForm />
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: theme.colors.backgroundDark
  },
  container: {
    flexGrow: 1,
    padding: theme.spacing.small,
    paddingVertical: 100
  }
})