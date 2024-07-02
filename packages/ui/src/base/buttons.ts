import { Platform } from 'react-native'
import { Button as BaseButton, styled } from 'tamagui'

export const PrimaryButton = styled(BaseButton, {
  width: 240,
  height: 48,
  color: 'white',
  backgroundColor: '#',
  borderRadius: 8,
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 16,
  fontSize: Platform.OS === 'web' ? 16 : 20,
})

export const SecondaryButton = styled(BaseButton, {
  width: "100%",
  color: 'white',
  backgroundColor: '#',
  borderRadius: 8,
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 16,
  fontSize: Platform.OS === 'web' ? 16 : 20,
})
