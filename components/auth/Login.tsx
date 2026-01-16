import { router } from 'expo-router'
import { StyleSheet, View, Text, TextInput, Alert } from 'react-native'
import { useState } from 'react'
import { Button } from '@/components/Button'
import { useLogin } from '@/services/session'
import { ROUTES } from '@/config/routes'
import theme from '@/theme'

type StateValue = string | null | Record<string, string[]>

export const Login = () => {
  const [{ email, password, focusedInput, errors }, setFormState] = useState({
    email: '',
    password: '',
    focusedInput: null as null | 'email' | 'password',
    errors: null as null | Record<string, string[]>
  })
  const setState = (key: string, value: StateValue) => setFormState(state => ({ ...state, [key]: value }))
  const loginMutation = useLogin()

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields')
      return
    }

    try {
      const result = await loginMutation.mutateAsync({ email, password })
      
      if (result.success) {
        router.replace(ROUTES.dashboard)
      } else {
        result.errors && setState('errors', result.errors)
      }
    } catch {
      Alert.alert('Error', 'Login failed')
    }
  }

  return (
    <View>
      <Text style={styles.title}>Log in to your account</Text>
      <View style={styles.form}>
        {!!errors && (
          <View style={styles.error}>
            {[...new Set(Object.values(errors).map(msgs => msgs[0]))].map((message, index) => (
              <Text key={index} style={{ color: theme.colors.error }}>{message}</Text>
            ))}
          </View>
        )}
        <TextInput
          style={[
            theme.input,
            focusedInput === 'email' && theme.focusedInput,
            errors?.email && theme.inputError
          ]}
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
          style={[
            theme.input,
            focusedInput === 'password' && theme.focusedInput,
            errors?.password && theme.inputError
          ]}
          placeholderTextColor={theme.colors.gray}
          placeholder="Password"
          onFocus={() => setState('focusedInput', 'password')}
          onBlur={() => setState('focusedInput', null)}
          value={password}
          onChangeText={val => setState('password', val)}
          secureTextEntry
        />
        <Button
          title={loginMutation.isPending ? 'Logging in...' : 'Log In'}
          onPress={handleLogin}
          disabled={loginMutation.isPending}
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
  },
  error: {
    color: theme.colors.error,
    marginBottom: theme.spacing.small,
    alignItems: 'center'
  }
})
