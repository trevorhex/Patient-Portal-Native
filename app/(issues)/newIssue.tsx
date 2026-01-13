import { StatusBar } from 'expo-status-bar'
import { View, Text, StyleSheet } from 'react-native'
import theme from '@/theme'

export default function NewIssueScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>New Issue</Text>
      <StatusBar style="light" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: theme.container,
  text: theme.title
})
