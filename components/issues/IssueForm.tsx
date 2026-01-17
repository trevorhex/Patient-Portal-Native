import { StyleSheet, TextInput, Text, View } from 'react-native'
import theme from '@/theme'

export const IssueForm = () => {
  return (
    <View style={styles.form}>
      <View>
        <Text style={theme.inputLabel}>Title</Text>
        <TextInput
          placeholder="Issue Title"
          style={[
            theme.input
          ]}
        />
      </View>
      <View>
        <Text style={theme.inputLabel}>Description</Text>
        <TextInput
          placeholder="Issue Description"
          multiline
          numberOfLines={5}
          style={[
            theme.input,
            theme.textarea
          ]}
          placeholderTextColor={theme.colors.gray}
        />  
      </View>
      <View>
        <View></View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  form: {
    gap: theme.spacing.small
  }
})
