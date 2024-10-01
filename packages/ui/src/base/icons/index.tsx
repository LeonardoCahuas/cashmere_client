import { View } from 'react-native'
import { SvgProps } from 'react-native-svg'
import ChatBadge from '../../ChatBadge'
import { BodyIcon } from './body.icon'
import { CarIcon } from './car.icon'
import { CardPaymentIcon } from './card-payment.icon'
import { CheckmarkIcon } from './check.icon'
import { ChevronRightIcon } from './chevron-right.icon'
import { ClockIcon } from './clock.icon'
import { CloseIcon } from './close.icon'
import ConditionIcon from './condition.icon'
import DescriptionIcon from './description.icon'
import DetailsIcon from './details.icon'
import { DistanceIcon } from './distance.icon'
import DoorIcon from './door.icon'
import DurationIcon from './duration.icon'
import EngineIcon from './engine.icon'
import { FilterIcon } from './filter.icon'
import FuelIcon from './fuel.icon'
import { HeartFilledIcon } from './heart-filled.icon'
import { LightningIcon } from './lightning.icon'
import { LocationIcon } from './location.icon'
import { MotorBikeIcon } from './motorbike.icon'
import PhoneIcon from './phone.icon'
import { DecreasingIcon } from './saved/decreasing.icon'
import { IncreasingIcon } from './saved/increasing.icon'
import { SortingMinus } from './saved/minus.icon'
import { PercentageIcon } from './saved/percentage.icon'
import { SortingPlus } from './saved/plus.icon'
import { UpDownArrows } from './saved/updownarrows.icon'
import SeatsIcon from './seats.icon'
import ServicesIcon from './services.icon'
import { ShareIcon } from './share.icon'
import { ShortTermArrowIcon } from './short-term-arrow.icon'
import { StarIcon } from './star.icon'
import { ChatIcon } from './tab-bar/chat.icon'
import { HeartIcon } from './tab-bar/heart.icon'
import { TabPlusIcon } from './tab-bar/plus.icon'
import { ProfileIcon } from './tab-bar/profile.icon'
import { SearchIcon as TabSearchIcon } from './tab-bar/search.icon'
import TransmissionIcon from './transmission.icon'
import { TruckIcon } from './truck.icon'
import { VerifiedCheckIcon } from './verified-check.icon'
import WheelIcon from './wheel.icon'

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
  close = 'close',
  filter = 'filter',
  up_down_arrows = 'up_down_arrows',
  percentage = 'percentage',
  increasing_value = 'increasing_value',
  decreasing_value = 'decreasing_value',
  sorting_plus = 'sorting_plus',
  sorting_minus = 'sorting_minus',
  body = 'body',
  condition = 'condition',
  description = 'description',
  details = 'details',
  engine = 'engine',
  door = 'door',
  duration = 'duration',
  services = 'services',
  seats = 'seats',
  fuel = 'fuel',
  trasmission = 'trasmission',
  wheel = 'wheel',
  phone = 'phone',
  chevron_right = 'chevron-right',
  check = 'check',
  star = 'star',
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
    case 'filter':
      return <FilterIcon {...p} />
    case 'up_down_arrows':
      return <UpDownArrows {...p} />
    case 'percentage':
      return <PercentageIcon {...p} />
    case 'increasing_value':
      return <IncreasingIcon {...p} />
    case 'decreasing_value':
      return <DecreasingIcon {...p} />
    case 'sorting_plus':
      return <SortingPlus {...p} />
    case 'sorting_minus':
      return <SortingMinus {...p} />
    case 'body':
      return <BodyIcon {...p} />
    case 'condition':
      return <ConditionIcon {...p} />
    case 'description':
      return <DescriptionIcon {...p} />
    case 'details':
      return <DetailsIcon {...p} />
    case 'door':
      return <DoorIcon {...p} />
    case 'duration':
      return <DurationIcon {...p} />
    case 'engine':
      return <EngineIcon {...p} />
    case 'fuel':
      return <FuelIcon {...p} />
    case 'seats':
      return <SeatsIcon {...p} />
    case 'services':
      return <ServicesIcon {...p} />
    case 'trasmission':
      return <TransmissionIcon {...p} />
    case 'wheel':
      return <WheelIcon {...p} />
    case 'phone':
      return <PhoneIcon {...p} />
    case 'chevron-right':
      return <ChevronRightIcon {...p} />
    case 'check':
      return <CheckmarkIcon {...p} />
    case 'star':
      return <StarIcon {...p} />
    default:
      return <></>
  }
}
