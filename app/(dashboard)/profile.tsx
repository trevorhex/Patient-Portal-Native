import { StatusBar } from 'expo-status-bar'
import { View, Text, StyleSheet } from 'react-native'
import theme from '@/theme'

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Profile screen</Text>
      <StatusBar style="inverted" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: theme.container,
  text: theme.title
})
