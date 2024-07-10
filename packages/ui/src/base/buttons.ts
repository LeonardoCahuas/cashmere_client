import { Platform } from 'react-native'
import { Button as BaseButton, styled } from 'tamagui'

export const PrimaryButton = styled(BaseButton, {
  width: "100%",
  height: 48,
  color: 'white',
  backgroundColor: '#1DAB61',
  borderRadius: 8,
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 16,
  fontSize: Platform.OS === 'web' ? 16 : 20,
})
