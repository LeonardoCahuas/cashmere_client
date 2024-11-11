import { Posting } from '@siva/entities'
import ChatView, { ChatViewProps } from './sections'
import { MessageProps } from './sections/components/Message'

export interface UserProps {
  id: string
  image?: string
  name: string
}

export default function Screen() {
  const users: UserProps[] = [
    {
      id: '1',
      name: 'Mario Rossi',
    },
    {
      id: '2',
      name: 'Giovanni Bianchi',
    },
  ]

  const messages: MessageProps[] = [
    {
      created_at: '2024-09-16T12:39:00.000Z',
      type: 'text',
      sender_id: '1',
      content: 'Ciao, quanto viene la Aventador per 3 giorni?',
    },
    {
      created_at: '2024-09-16T14:30:00.000Z',
      type: 'text',
      sender_id: '2',
      content: '800 euro al giorno quindi 2400 per 3 giorni',
    },
    {
      created_at: '2024-09-16T15:09:00.000Z',
      type: 'text',
      sender_id: '1',
      content: 'E invece la Huracan?',
    },
    {
      created_at: '2024-09-17T16:34:00.000Z',
      type: 'text',
      sender_id: '2',
      content: 'Costa molto di piu sono 1200 al giorno quindi 3600 per 3 giorni',
    },
    {
      created_at: '2024-09-17T17:39:00.000Z',
      type: 'text',
      sender_id: '1',
      content:
        'Allora prendo la aventador per 7 giorni, riesci a scendere a 5000 per una settimana?',
    },
    {
      created_at: '2024-09-17T18:30:00.000Z',
      type: 'text',
      sender_id: '2',
      content: 'Va bene dai per questa volta si può fare',
    },
    {
      created_at: '2024-09-17T19:09:00.000Z',
      type: 'text',
      sender_id: '1',
      content: 'Passo domani mattina a recuperarla',
    },
    {
      created_at: '2024-09-17T20:34:00.000Z',
      type: 'text',
      sender_id: '2',
      content: 'Ok troverai il mio collega Jeff in ufficio dalle 9.',
    },
  ]

  const posting: Posting = {
    id: 'b89e5b72-9d28-474d-ace3-44ca21437d97',
    created_at: '',
    posting_id: '',
    duration: 'GIORNALIERO',
    subtitle: null,
    dropoff_location_plain: '',
    pickup_location_plain: '',
    deposit: '',
    price: 1400,
    age_required: 0,
    distance_limit_in_km: '',
    taxes_included: false,
    vehicle_id: '',
    brand: 'Lamborghini',
    model: 'Huracan',
    fuel_type: '',
    year: 0,
    interior_material: null,
    interior_color: null,
    exterior_color: null,
    transmission_type: null,
    vehicle_images: [
      'https://mkvfjhboywoocbqdzilx.supabase.co/storage/v1/object/public/images/kia-sorento-2024-frontal-lateral.369513.webp?t=2024-09-25T16%3A15%3A47.703Z',
    ],
    renter_name: null,
    bookmarked: false,
  }

  const chat: ChatViewProps = {
    id: 'abc123',
    users: users,
    posting: posting,
    messages: messages,
  }
  return <ChatView chat={chat} currentUser="1" />
}
