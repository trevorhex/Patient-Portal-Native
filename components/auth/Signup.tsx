import { router } from 'expo-router'
import { StyleSheet, View, Text, Alert } from 'react-native'  
import { useState } from 'react'
import { Input } from '@/components/form/Input'
import { Button } from '@/components/Button'
import { useSignup } from '@/services/session'
import { ROUTES } from '@/config/routes'
import theme from '@/theme'

type StateValue = string | null | Record<string, string[]>

export const Signup = () => {
  const [{ email, password, passwordConfirm, focusedInput, errors }, setFormState] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    focusedInput: null as null | 'email' | 'password' | 'passwordConfirm',
    errors: null as null | Record<string, string[]>
  })
  const setState = (key: string, value: StateValue) => setFormState(state => ({ ...state, [key]: value }))
  const signupMutation = useSignup()

  const handleSignup = async () => {
    setState('errors', null)

    if (!email || !password || !passwordConfirm) {
      Alert.alert('Error', 'Please fill in all fields')
      return
    }

    if (password !== passwordConfirm) {
      setState('errors', {
        password: ['Passwords do not match'],
        passwordConfirm: ['Passwords do not match']
      })
      return
    }

    try {
      const result = await signupMutation.mutateAsync({ email, password })
      
      if (result.success) {
        router.replace(ROUTES.dashboard)
      } else {
        result.errors && setState('errors', result.errors)
      }
    } catch {
      Alert.alert('Error', 'Signup failed')
    }
  }

  return (
    <View>
      <Text style={styles.title}>Create a new account</Text>
      <View style={styles.form}>
        {!!errors && (
          <View style={styles.error}>
            {[...new Set(Object.values(errors).map(msgs => msgs[0]))].map((message, index) => (
              <Text key={index} style={{ color: theme.colors.error }}>{message}</Text>
            ))}
          </View>
        )}
        <Input
          label="Email"
          placeholder="Email"
          value={email}
          error={!!errors?.email}
          onChangeText={(val) => setState('email', val)}
          onFocus={() => setState('focusedInput', 'email')}
          onBlur={() => setState('focusedInput', null)}
          focused={focusedInput === 'email'}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input
          label="Password"
          placeholder="Password"
          value={password}
          error={!!errors?.password}
          onChangeText={(val) => setState('password', val)}
          onFocus={() => setState('focusedInput', 'password')}
          onBlur={() => setState('focusedInput', null)}
          focused={focusedInput === 'password'}
          secureTextEntry
        />
        <Input
          label="Confirm Password"
          placeholder="Confirm Password"
          value={passwordConfirm}
          error={!!errors?.passwordConfirm}
          onChangeText={(val) => setState('passwordConfirm', val)}
          onFocus={() => setState('focusedInput', 'passwordConfirm')}
          onBlur={() => setState('focusedInput', null)}
          focused={focusedInput === 'passwordConfirm'}
          secureTextEntry
        />
        <Button
          title={signupMutation.isPending ? 'Signing up...' : 'Sign Up'}
          onPress={handleSignup}
          disabled={signupMutation.isPending}
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
    gap: theme.spacing.small
  },
  error: {
    color: theme.colors.error,
    marginBottom: theme.spacing.small,
    alignItems: 'center'
  }
})
