interface SearchParams {
  includedServices: string[]
  interiorColor: string
  externalColor: string
  internalMaterials: string[]
  traction: string[]
  emission: string[]
}

export const initialSearchParams: SearchParams = {
  includedServices: [],
  interiorColor: '',
  externalColor: '',
  internalMaterials: [],
  traction: [],
  emission: [],
}

export const __RESET_KEY__ = '__reset__'

export function reducer(
  state: SearchParams,
  {
    type,
    payload,
  }:
    | { type: 'set_included_services'; payload: string }
    | { type: 'set_external_color'; payload: string }
    | { type: 'set_internal_color'; payload: string }
    | { type: 'set_internal_material'; payload: string }
): SearchParams {
  switch (type) {
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
    default:
      return state
  }
}
