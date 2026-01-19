import { View, ScrollView, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { useGetIssue } from '@/services/issues'
import { Chip } from '@/components/issues/Chip'
import theme from '@/theme'

export default function IssueDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { data, isLoading, error } = useGetIssue(id!)

  if (isLoading) {
    return (
      <View style={theme.container}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  if (error || !data?.issue) {
    return (
      <View style={theme.container}>
        <Text style={theme.title}>Issue not found</Text>
      </View>
    )
  }

  const { issue } = data

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.backgroundDark }}
      contentContainerStyle={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>{issue.title}</Text>
        <Text style={styles.description}>{issue.description}</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.chipRow}>
          <Text style={styles.label}>Status:</Text>
          <Chip status={issue.status}>{issue.status.replace('_', ' ')}</Chip>
        </View>
        <View style={styles.chipRow}>
          <Text style={styles.label}>Priority:</Text>
          <Chip priority={issue.priority}>{issue.priority}</Chip>
        </View>
        <View style={styles.dateRow}>
          <Text style={styles.label}>Created:</Text>
          <Text style={styles.date}>{new Date(issue.createdAt).toLocaleDateString()}</Text>
        </View>
        <View style={styles.dateRow}>
          <Text style={styles.label}>Updated:</Text>
          <Text style={styles.date}>{new Date(issue.updatedAt).toLocaleDateString()}</Text>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    ...theme.container,
    gap: theme.spacing.medium,
    justifyContent: 'flex-start',
    paddingTop: theme.spacing.medium
  },
  content: {
    gap: theme.spacing.small
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.large,
    fontWeight: 'bold',
    marginBottom: theme.spacing.xsmall
  },
  description: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.medium,
    lineHeight: 24,
    marginBottom: theme.spacing.small
  },
  card: {
    ...theme.card,
    gap: theme.spacing.small
  },
  chipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  label: {
    color: theme.colors.text,
    fontWeight: 'bold',
    fontSize: theme.fontSizes.medium
  },
  date: {
    color: theme.colors.gray300,
    fontSize: theme.fontSizes.medium
  }
})
