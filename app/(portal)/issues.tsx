import { StatusBar } from 'expo-status-bar'
import { View, StyleSheet } from 'react-native'
import { IssueList } from '@/components/issues/IssueList'
import theme from '@/theme'

export default function IssuesScreen() {
  return (
    <View style={styles.container}>
      <IssueList />
      <StatusBar style="light" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: theme.container,
  text: theme.title
})
