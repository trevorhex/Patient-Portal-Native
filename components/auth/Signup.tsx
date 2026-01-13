import { StyleSheet, View, Text, TextInput, Alert } from 'react-native'  
import { useState } from 'react'
import { saveToStorage } from '@/lib/storage'
import { Button } from '@/components/Button'
import theme from '@/theme'

export interface LoginProps {
  onAuthSuccess?: () => void
}

export const Signup = ({ onAuthSuccess }: LoginProps) => {
  const [{ email, password, passwordConfirm, isPending }, setFormState] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    isPending: false
  })
  const setState = (key: string, value: string | boolean) => setFormState(state => ({ ...state, [key]: value }))

  const handleSignup = async () => {
    if (!email || !password || !passwordConfirm) {
      Alert.alert('Error', 'Please fill in all fields')
      return
    }

    if (password !== passwordConfirm) {
      Alert.alert('Error', 'Passwords do not match')
      return
    }

    setState('isPending', true)
    try {
      const response = await fetch('', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      
      const data = await response.json()
      
      if (response.ok && data.token) {
        await saveToStorage('authToken', data.token)
        onAuthSuccess?.()
      } else {
        Alert.alert('Error', 'Invalid credentials')
      }
    } catch {
      Alert.alert('Error', 'Login failed')
    } finally {
      setState('isPending', false)
    }
  }

  return (
    <View>
      <Text style={styles.title}>Create a new account</Text>
      <View style={styles.form}>
        <TextInput
          style={theme.input}
          placeholder="Email"
          value={email}
          onChangeText={val => setState('email', val)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={theme.input}
          placeholder="Password"
          value={password}
          onChangeText={val => setState('password', val)}
          secureTextEntry
        />
        <TextInput
          style={theme.input}
          placeholder="Confirm Password"
          value={password}
          onChangeText={val => setState('passwordConfirm', val)}
          secureTextEntry
        />
        <Button
          title={isPending ? 'Signing up...' : 'Sign Up'}
          onPress={handleSignup}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    ...theme.title,
    fontSize: theme.fontSizes.medium
  },
  form: {
    marginTop: theme.spacing.medium,
  }
})
