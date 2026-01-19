import { View, FlatList, ActivityIndicator } from 'react-native'
import { NoIssues } from './NoIssues'
import { useGetIssues } from '@/services/issues'
import { IssueListItem } from './IssueListItem'
import theme from '@/theme'

export const IssueList = () => {
  const { data, isLoading } = useGetIssues()
  const issues = data?.issues

  if (isLoading) {
    return (
      <View style={theme.container}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  if (!issues?.length) return <NoIssues />

  return (
    <View style={theme.container}>
      <FlatList
        data={issues}
        keyExtractor={({ id }) => id}
        renderItem={IssueListItem}
      />
    </View>
  )
}
