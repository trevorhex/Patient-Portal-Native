import AsyncStorage from '@react-native-async-storage/async-storage'

export const saveToStorage = async (key: string, value: object | string) => {
  try {
    await AsyncStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

export const getFromStorage = async (key: string) => {
  try {
    const data = await AsyncStorage.getItem(key)
    return data ? JSON.parse(data) : null
  } catch {
    return null
  }
}
