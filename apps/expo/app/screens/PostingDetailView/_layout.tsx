import { Colors, Icon } from '@siva/ui'
import { Stack, useRouter } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'
import { queryClient } from '../../setup/Provider'
import { useAddBookmark, useGetPosting, useRemoveBookmark } from '../../setup/query/hooks'
import { useAppStore } from '../../setup/store'

const StackLayout = () => {
  const { posting: localPosting } = useAppStore((s) => s.detailView)
  const { data: posting } = useGetPosting(localPosting?.id || '')
  const router = useRouter()
  const user = { session: 'd5f0bcb0-2563-403b-9e8c-50d7292ec83a' }
  const { mutate: addBookmark } = useAddBookmark(user.session)
  const { mutate: removeBookmark } = useRemoveBookmark(user.session)

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: `${posting?.brand || localPosting?.brand} ${posting?.model || localPosting?.model}`,
        headerTintColor: '#000',
        headerRight: () => {
          return (
            <View style={{ display: 'flex', flexDirection: 'row', gap: 12 }}>
              <TouchableOpacity
                onPress={() => {
                  const queryCache = queryClient.getQueryCache()
                  console.log('Query Cache:', queryCache.getAll())
                }}
              >
                <Icon name="share" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (!posting || !user) return
                  const { id: postingId, bookmarked } = posting
                  if (!bookmarked) {
                    addBookmark({ postingId, sessionId: user.session })
                  } else {
                    removeBookmark({ bookmarkId: posting?.bookmark_id, postingId })
                  }
                }}
              >
                <Icon
                  name="heart_filled"
                  color={!!posting?.bookmarked ? Colors.greenPrimary : Colors.blackPrimary}
                />
              </TouchableOpacity>
            </View>
          )
        },
        headerBackVisible: true,
        headerBackTitle: 'Indietro',
        headerLeft: () => {
          return (
            <View>
              <TouchableOpacity
                onPress={() => {
                  router.back()
                }}
              >
                <Text>back</Text>
              </TouchableOpacity>
            </View>
          )
        },
      }}
    ></Stack>
  )
}

export default StackLayout
