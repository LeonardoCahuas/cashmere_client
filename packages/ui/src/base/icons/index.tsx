import { View } from 'react-native'
import { SvgProps } from 'react-native-svg'
import ChatBadge from '../../ChatBadge'
import { CarIcon } from './car.icon'
import { CardPaymentIcon } from './card-payment.icon'
import { ClockIcon } from './clock.icon'
import { DistanceIcon } from './distance.icon'
import { HeartFilledIcon } from './heart-filled.icon'
import { LightningIcon } from './lightning.icon'
import { LocationIcon } from './location.icon'
import { MotorBikeIcon } from './motorbike.icon'
import { ShareIcon } from './share.icon'
import { ShortTermArrowIcon } from './short-term-arrow.icon'
import { ChatIcon } from './tab-bar/chat.icon'
import { HeartIcon } from './tab-bar/heart.icon'
import { TabPlusIcon } from './tab-bar/plus.icon'
import { ProfileIcon } from './tab-bar/profile.icon'
import { SearchIcon as TabSearchIcon } from './tab-bar/search.icon'
import { TruckIcon } from './truck.icon'
import { VerifiedCheckIcon } from './verified-check.icon'
import { CloseIcon } from './close.icon'

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
  tab_plus = 'tab_plus',
  short_term_arrow_icon = 'short_term_arrow_icon',
  close = 'close'
}

export type IconName = `${Icons}`

type IconProps = SvgProps & { name: IconName; data?: Record<string, any> }

export const Icon = ({ ...props }: IconProps) => {
  const { fill = '#000000', data } = props
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
          <ChatBadge messages={data?.messages} />
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
    case 'tab_plus':
      return <TabPlusIcon {...p} />
    case 'short_term_arrow_icon':
      return <ShortTermArrowIcon {...p} />
    case 'close':
      return <CloseIcon {...p} />
    default:
      return <></>
  }
}
