import { Text } from 'react-native'

export const SectionTitle = ({ children }: { children: any }) => {
  return <Text style={{ fontSize: 20, fontWeight: '600', marginLeft: 16 }}>{children}</Text>
}
