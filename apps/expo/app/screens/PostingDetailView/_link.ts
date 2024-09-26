import { Posting } from '@siva/entities'
import { router } from 'expo-router'

export const linkToDetail = (item: Posting) => {
  router.push({
    pathname: `screens/PostingDetailView/${item.posting_id}`,
  })
}
