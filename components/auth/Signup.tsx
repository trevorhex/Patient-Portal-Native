import { StyleSheet, View, Text, TextInput, Alert } from 'react-native'  
import { useState } from 'react'
import { saveToStorage } from '@/lib/storage'
import { Button } from '@/components/Button'
import theme from '@/theme'

export interface LoginProps {
  onAuthSuccess?: () => void
}

export const Signup = ({ onAuthSuccess }: LoginProps) => {
  const [{ email, password, passwordConfirm, isPending, focusedInput }, setFormState] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    isPending: false,
    focusedInput: null as null | 'email' | 'password' | 'passwordConfirm'
  })
  const setState = (key: string, value: string | boolean | null) => setFormState(state => ({ ...state, [key]: value }))

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
          style={[theme.input, focusedInput === 'email' && theme.focusedInput]}
          placeholderTextColor={theme.colors.gray}
          placeholder="Email"
          value={email}
          onChangeText={val => setState('email', val)}
          onFocus={() => setState('focusedInput', 'email')}
          onBlur={() => setState('focusedInput', null)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={[theme.input, focusedInput === 'password' && theme.focusedInput]}
          placeholderTextColor={theme.colors.gray}
          placeholder="Password"
          value={password}
          onChangeText={val => setState('password', val)}
          onFocus={() => setState('focusedInput', 'password')}
          onBlur={() => setState('focusedInput', null)}
          secureTextEntry
        />
        <TextInput
          style={[theme.input, focusedInput === 'passwordConfirm' && theme.focusedInput]}
          placeholderTextColor={theme.colors.gray}
          placeholder="Confirm Password"
          value={password}
          onChangeText={val => setState('passwordConfirm', val)}
          onFocus={() => setState('focusedInput', 'passwordConfirm')}
          onBlur={() => setState('focusedInput', null)}
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
