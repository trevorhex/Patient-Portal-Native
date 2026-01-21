import { useLayoutEffect } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { IssueForm } from '@/components/issues/IssueForm'
import theme from '@/theme'

export default function IssueFormScreen() {
  const navigation = useNavigation()
  const { id, mode } = useLocalSearchParams<{ id?: string, mode?: 'create' | 'edit'}>()

  useLayoutEffect(() => {
    navigation.setOptions({
      title: mode === 'edit' ? 'Edit Issue' : 'Create Issue'
    })
  }, [mode, navigation])

  return (
    <KeyboardAwareScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid
      showsVerticalScrollIndicator={false}
    >
      <IssueForm issueId={id} mode={mode || 'create'} />
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
