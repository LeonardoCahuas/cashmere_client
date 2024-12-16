import { getPosting } from '@/lib/queries'

export default async function PostingDetails({ params }: { params: { id: string } }) {
  const posting = await getPosting(params.id)
  return (
    <div className="bg-gray-100 h-screen w-screen">
      <></>
    </div>
  )
}
