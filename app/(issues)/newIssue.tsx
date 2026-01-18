import { StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { IssueForm } from '@/components/issues/IssueForm'
import theme from '@/theme'

export default function NewIssueScreen() {
  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: theme.colors.backgroundDark }}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <IssueForm />
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    ...theme.container,
    justifyContent: 'flex-start',
    paddingTop: 100
  }
})
