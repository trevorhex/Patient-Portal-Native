import { useRouter } from 'expo-router'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Issue } from '@/types/issue'
import { Chip } from './Chip'
import { ROUTES } from '@/config/routes'
import theme from '@/theme'

export interface IssueListItemProps {
  item: Issue
}

export const IssueListItem = ({ item }: IssueListItemProps) => {
  const router = useRouter()
  const handlePress = () => router.push(ROUTES.issues.view(item.id))
  return (
    <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={0.7}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <View style={styles.chips}>
        <View style={styles.chipContainer}>
          <Text style={styles.label}>Status:</Text>
          <Chip status={item.status}>{item.status.replace('_', ' ')}</Chip>
        </View>
        <View style={styles.chipContainer}>
          <Text style={styles.label}>Priority:</Text>
          <Chip priority={item.priority}>{item.priority}</Chip>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    ...theme.card,
    flexDirection: 'row',
    gap: 4,
    marginBottom: theme.spacing.xsmall
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.medium,
    fontWeight: 'bold',
    marginBottom: theme.spacing.xsmall
  },
  description: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.small
  },
  chips: {
    gap: theme.spacing.small,
    width: '35%'
  },
  chipContainer: {
    alignItems: 'center',
    gap: 6
  },
  label: {
    color: theme.colors.text,
    fontWeight: 'bold'
  }
})
