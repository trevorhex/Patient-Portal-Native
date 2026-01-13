import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { Login } from '@/components/auth/Login'
import { Signup } from '@/components/auth/Signup'
import theme from '@/theme'

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true)
  return (
    <View style={theme.container}>
      <Text style={styles.title}>Patient Portal</Text>
      {isLogin ? <Login /> : <Signup />}
      <View style={styles.card}>
        <Text style={{ color: theme.colors.text }}>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
        </Text>
        <TouchableOpacity activeOpacity={0.7} onPress={() => setIsLogin(val => !val)}>
          <Text style={styles.link}>{isLogin ? 'Sign Up' : 'Log In'}</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="inverted" />
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    ...theme.title,
    fontSize: theme.fontSizes.xlarge,
    marginBottom: theme.spacing.small
  },
  card: {
    ...theme.card,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.spacing.medium,
    gap: 4
  },
  link: {
    color: theme.colors.text,
    fontWeight: 'bold'
  }
})
