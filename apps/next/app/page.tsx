'use client'
import { useGetMessages } from '@siva/api'
import { Row, Text } from '@siva/ui'

function Home() {
  const { isLoading, data } = useGetMessages('7452a439-624a-4108-902d-11dda2312238')

  if (isLoading) {
    return <Text>Loading...</Text>
  }

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ width: '360px', height: 'fit-content', paddingTop: '8rem' }}>
        {!isLoading &&
          data &&
          data.map((msg) => <Row key={msg.id} type={msg.type} content={msg.content} />)}
      </div>
    </div>
  )
}

export default Home
