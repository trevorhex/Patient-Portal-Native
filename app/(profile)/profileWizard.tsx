import { StatusBar } from 'expo-status-bar'
import { View, Text, StyleSheet } from 'react-native'
import theme from '@/theme'

export default function ProfileWizardScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Wizard</Text>
      <StatusBar style="light" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: theme.container,
  text: theme.title
})
