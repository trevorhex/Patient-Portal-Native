import { Text, View } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import theme from '@/theme'

export interface SelectProps {
  value: string
  options: { label: string; value: string }[]
  label?: string
  focused?: boolean
  error?: boolean
  onChange?: (value: string) => void
}

export const Select = ({ value, options, label, focused, error, onChange }: SelectProps) => {
  return (
    <View>
      {label && <Text style={theme.inputLabel}>{label}</Text>}
      <Picker
        selectedValue={value}
        onValueChange={onChange}
        style={[
          focused && theme.focusedInput,
          error && theme.inputError
        ]}
        itemStyle={{ color: theme.colors.text }}
      >
        {options.map((option) => <Picker.Item key={option.value} {...option} />)}
      </Picker>
    </View>
  )
}
