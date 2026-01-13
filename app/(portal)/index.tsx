import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import theme from '@/theme'

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Dashboard</Text>
      <StatusBar style="light" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: theme.container,
  text: theme.title
})
