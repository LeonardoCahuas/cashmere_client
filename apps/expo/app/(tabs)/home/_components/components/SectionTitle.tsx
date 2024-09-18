import { Text } from 'react-native'

export const SectionTitle = ({ children }: { children: any }) => {
  return <Text style={{ fontSize: 18, fontWeight: '600', marginLeft: 16 }}>{children}</Text>
}
