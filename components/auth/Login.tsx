import { StyleSheet, View, Text, TextInput, Alert } from 'react-native'  
import { useState } from 'react'
import { saveToStorage } from '@/lib/storage'
import { Button } from '@/components/Button'
// import { useUserStore } from '@/stores/user'
import theme from '@/theme'

export interface LoginProps {
  onAuthSuccess?: () => void
}

export const Login = ({ onAuthSuccess }: LoginProps) => {
  // const authToken = useUserStore(state => state.authToken)
  const [{ email, password, isPending, focusedInput }, setFormState] = useState({
    email: '',
    password: '',
    isPending: false,
    focusedInput: null as null | 'email' | 'password'
  })
  const setState = (key: string, value: string | boolean | null) => setFormState(state => ({ ...state, [key]: value }))

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields')
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
      <Text style={styles.title}>Log in to your account</Text>
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
          onFocus={() => setState('focusedInput', 'password')}
          onBlur={() => setState('focusedInput', null)}
          value={password}
          onChangeText={val => setState('password', val)}
          secureTextEntry
        />
        <Button
          title={isPending ? 'Logging in...' : 'Log In'}
          onPress={handleLogin}
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
