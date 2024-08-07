import { SvgProps } from 'react-native-svg'
import { CarIcon } from './car.icon'
import { CardPaymentIcon } from './card-payment.icon'
import { ClockIcon } from './clock.icon'
import { DistanceIcon } from './distance.icon'
import { HeartFilledIcon } from './heart-filled.icon'
import { LightningIcon } from './lightning.icon'
import { LocationIcon } from './location.icon'
import { MotorBikeIcon } from './motorbike.icon'
import { ShareIcon } from './share.icon'
import { ChatIcon } from './tab-bar/chat.icon'
import { HeartIcon } from './tab-bar/heart.icon'
import { ProfileIcon } from './tab-bar/profile.icon'
import { SearchIcon as TabSearchIcon } from './tab-bar/search.icon'
import { TruckIcon } from './truck.icon'
import { VerifiedCheckIcon } from './verified-check.icon'
import { View } from 'react-native'
import ChatBadge from '../../ChatBadge'
export enum Icons {
  car = 'car',
  motorbike = 'motorbike',
  search = 'search',
  truck = 'truck',
  tab_search = 'tab_search',
  tab_heart = 'tab_heart',
  tab_chat = 'tab_chat',
  tab_profile = 'tab_profile',
  distance = 'distance',
  location = 'location',
  share = 'share',
  heart_filled = 'heart_filled',
  card_payment = 'card_payment',
  verified_check = 'verified_check',
  clock = 'clock',
  lightning = 'lightning',
}

export type IconName = `${Icons}`

type IconProps = SvgProps & { name: IconName, messages?: number }

export const Icon = ({ ...props }: IconProps) => {
  const { fill = '#000000', messages } = props
  const p = { ...props, fill }
  switch (props.name) {
    case 'car':
      return <CarIcon {...p} />
    case 'motorbike':
      return <MotorBikeIcon {...p} />
    case 'search':
      return <TabSearchIcon {...p} />
    case 'truck':
      return <TruckIcon {...p} />
    case 'tab_heart':
      return <HeartIcon {...p} />
    case 'tab_search':
      return <TabSearchIcon {...p} />
    case 'tab_chat':
      return (
        <View>
          <ChatBadge messages={messages || 0}/>
          <ChatIcon {...p} />
        </View>
        )
    case 'tab_profile':
      return <ProfileIcon {...p} />
    case 'distance':
      return <DistanceIcon {...p} />
    case 'location':
      return <LocationIcon {...p} />
    case 'share':
      return <ShareIcon {...p} />
    case 'heart_filled':
      return <HeartFilledIcon {...p} />
    case 'card_payment':
      return <CardPaymentIcon {...p} />
    case 'verified_check':
      return <VerifiedCheckIcon {...p} />
    case 'clock':
      return <ClockIcon {...p} />
    case 'lightning':
      return <LightningIcon {...p} />
    default:
      return <></>
  }
}
