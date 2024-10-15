interface SearchParams {
  vehicleType: 'car' | 'van' | 'motorcycle'
  vehicles: { brand: string; model: string }[]
  position: { address: string; radius: number }
  price: number[]
  monthsDuration: number[]
  verifiedOnly: boolean
  deposit: number | null
  state: 'new' | 'used'
  kmLimit: number | null
  details: {
    fuel: string[]
    transmission: string[]
    body: string[]
    seats: number
    doors: number
    gears: number
  }
  includedServices: string[]
  interiorColor: string
  externalColor: string
  internalMaterials: string[]
  equipment: string[]
  engine: { power: 'HP' | 'kw'; range: number[]; traction: string[]; emissionClass: string[] }
}

export const initialSearchParams: SearchParams = {
  vehicleType: 'car',
  vehicles: [],
  position: { address: '', radius: 0 },
  price: [0, 1000],
  monthsDuration: [],
  verifiedOnly: false,
  deposit: null,
  state: 'new',
  kmLimit: null,
  details: {
    fuel: [],
    transmission: [],
    body: [],
    seats: 0,
    doors: 0,
    gears: 0,
  },
  includedServices: [],
  interiorColor: '',
  externalColor: '',
  internalMaterials: [],
  equipment: [],
  engine: { power: 'HP', range: [0, 1000], traction: [], emissionClass: [] },
}

export const __RESET_KEY__ = '__reset__'

export function reducer(
  state: SearchParams,
  {
    type,
    payload,
  }:
    | { type: 'set_vehicle_type'; payload: 'car' | 'van' | 'motorcycle' | '__reset__' }
    | { type: 'set_vehicle'; payload: { brand: string; model: string } | '__reset__' }
    | { type: 'remove_vehicle'; payload: { brand: string; model: string } }
    | { type: 'set_position_address'; payload: string | '__reset__' }
    | { type: 'set_position_radius'; payload: number | '__reset__' }
    | { type: 'set_price'; payload: number[] | '__reset__' }
    | { type: 'set_months_duration'; payload: number[] | '__reset__' }
    | { type: 'set_verified_only'; payload: boolean }
    | { type: 'set_deposit'; payload: number | null | '__reset__' }
    | { type: 'set_state'; payload: 'new' | 'used' | '__reset__' }
    | { type: 'set_km_limit'; payload: number | null | '__reset__' }
    | { type: 'set_details'; payload: Partial<SearchParams['details']> | '__reset__' }
    | { type: 'set_included_services'; payload: string }
    | { type: 'set_external_color'; payload: string }
    | { type: 'set_internal_color'; payload: string }
    | { type: 'set_internal_material'; payload: string }
    | { type: 'set_equipment'; payload: string }
    | { type: 'set_engine_power'; payload: 'HP' | 'kw' | '__reset__' }
    | { type: 'set_engine_range'; payload: number[] | '__reset__' }
    | { type: 'set_engine_traction'; payload: string | '__reset__' }
    | { type: 'set_engine_emissionClass'; payload: string | '__reset__' }
): SearchParams {
  switch (type) {
    case 'set_vehicle_type':
      if (payload === __RESET_KEY__) return { ...state, vehicleType: 'car' }
      return { ...state, vehicleType: payload }

    case 'set_vehicle':
      if (payload === __RESET_KEY__) return { ...state, vehicles: [{ brand: '', model: '' }] }
      return { ...state, vehicles: [...state.vehicles, payload] }

    case 'remove_vehicle':
      return {
        ...state,
        vehicles: state.vehicles.filter(
          (s) => s.brand !== payload.brand && s.model !== payload.model
        ),
      }

    case 'set_position_address':
      if (payload === __RESET_KEY__) return { ...state, position: { address: '', radius: 0 } }
      return { ...state, position: { ...state.position, address: payload } }

    case 'set_position_radius':
      if (payload === __RESET_KEY__) return { ...state, position: { address: '', radius: 0 } }
      return { ...state, position: { ...state.position, radius: payload } }

    case 'set_price':
      if (payload === __RESET_KEY__) return { ...state, price: [] }
      return { ...state, price: payload }

    case 'set_months_duration':
      if (payload === __RESET_KEY__) return { ...state, monthsDuration: [] }
      return { ...state, monthsDuration: payload }

    case 'set_verified_only':
      return { ...state, verifiedOnly: payload }

    case 'set_deposit':
      if (payload === __RESET_KEY__) return { ...state, deposit: null }
      return { ...state, deposit: payload }

    case 'set_state':
      if (payload === __RESET_KEY__) return { ...state, state: 'new' }
      return { ...state, state: payload }

    case 'set_km_limit':
      if (payload === __RESET_KEY__) return { ...state, kmLimit: null }
      return { ...state, kmLimit: payload }

    case 'set_details':
      if (payload === __RESET_KEY__)
        return {
          ...state,
          details: {
            fuel: [],
            transmission: [],
            body: [],
            seats: 0,
            doors: 0,
            gears: 0,
          },
        }
      return { ...state, details: { ...state.details, ...payload } }

    case 'set_included_services':
      if (payload === __RESET_KEY__) return { ...state, includedServices: [] }
      if (state.includedServices.includes(payload))
        return { ...state, includedServices: state.includedServices.filter((s) => s !== payload) }
      return { ...state, includedServices: [...state.includedServices, payload] }
    case 'set_external_color':
      if (payload === __RESET_KEY__) return { ...state, externalColor: '' }
      return { ...state, externalColor: payload }
    case 'set_internal_color':
      if (payload === __RESET_KEY__) return { ...state, interiorColor: '' }
      return { ...state, interiorColor: payload }
    case 'set_internal_material':
      if (payload === __RESET_KEY__) return { ...state, internalMaterials: [] }
      if (state.internalMaterials.includes(payload))
        return {
          ...state,
          internalMaterials: state.internalMaterials.filter((s) => s !== payload),
        }
      return { ...state, internalMaterials: [...state.internalMaterials, payload] }
    case 'set_equipment':
      if (payload === __RESET_KEY__) return { ...state, equipment: [] }
      if (state.equipment.includes(payload))
        return {
          ...state,
          equipment: state.equipment.filter((s) => s !== payload),
        }
      return { ...state, equipment: [...state.equipment, payload] }
    case 'set_engine_power':
      if (payload === __RESET_KEY__)
        return {
          ...state,
          engine: { power: 'HP', range: [0, 1000], traction: [], emissionClass: [] },
        }
      return {
        ...state,
        engine: {
          ...state.engine,
          power: payload,
        },
      }
    case 'set_engine_range':
      if (payload === __RESET_KEY__)
        return {
          ...state,
          engine: { power: 'HP', range: [0, 1000], traction: [], emissionClass: [] },
        }
      return {
        ...state,
        engine: {
          ...state.engine,
          range: payload,
        },
      }
    case 'set_engine_traction':
      if (payload === __RESET_KEY__)
        return {
          ...state,
          engine: { power: 'HP', range: [0, 1000], traction: [], emissionClass: [] },
        }
      if (state.engine?.traction.includes(payload))
        return {
          ...state,
          engine: {
            ...state.engine,
            traction: state.engine?.traction.filter((s) => s !== payload),
          },
        }
      return {
        ...state,
        engine: {
          ...state.engine,
          traction: [...state.engine?.traction, payload],
        },
      }
    case 'set_engine_emissionClass':
      if (payload === __RESET_KEY__)
        return {
          ...state,
          engine: { power: 'HP', range: [0, 1000], traction: [], emissionClass: [] },
        }
      if (state.engine?.emissionClass.includes(payload))
        return {
          ...state,
          engine: {
            ...state.engine,
            emissionClass: state.engine?.emissionClass.filter((s) => s !== payload),
          },
        }
      return {
        ...state,
        engine: {
          ...state.engine,
          emissionClass: [...state.engine?.emissionClass, payload],
        },
      }
    default:
      return state
  }
}
