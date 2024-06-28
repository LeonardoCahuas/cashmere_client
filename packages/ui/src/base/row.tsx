import { Text, YStack, styled } from 'tamagui'

const Cell = styled(YStack, {
  width: 'auto',
  backgroundColor: '#ededed',
  borderRadius: 8,
  display: 'flex',
  justifyContent: 'flex-start',
  borderColor: '#555',
  borderWidth: 1,
  padding: 8,
})

interface RowProps {
  type: string
  content: string
}
export const Row = ({ type, content }: RowProps) => {
  return (
    <Cell>
      <Text fontSize={'$5'}>{content}</Text>
      <Text fontSize={'$3'}>type: {type}</Text>
    </Cell>
  )
}
