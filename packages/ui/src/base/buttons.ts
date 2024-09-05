import { Platform } from 'react-native'
import { Button as BaseButton, styled } from 'tamagui'

export const PrimaryButton = styled(BaseButton, {
  width: "100%",
  height: 48,
  color: 'white',
  backgroundColor: '#00C15C',
  borderRadius: 8,
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 16,
  fontSize: 16,
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
