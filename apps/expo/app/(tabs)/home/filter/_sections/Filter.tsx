import { FontAwesome } from '@expo/vector-icons'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import { Button, Colors, Icon, IconName } from '@siva/ui'
import { ModalSheetProvider, useModalSheetRef } from 'apps/expo/app/components/ModalSheet'
import {
  ModalPage,
  MultiStepModalSheet,
} from 'apps/expo/app/components/ModalSheet/MultiStepModalSheet'
import * as Haptics from 'expo-haptics'
import { useLocalSearchParams } from 'expo-router'
import { useReducer, useState } from 'react'
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import FilterComponent from './components/FilterComponent'
import FilterComponentModal from './components/FilterComponentWithModal'
import VehicleTypeButton from './components/VehicleTypeButton'
import { __RESET_KEY__, initialSearchParams, reducer } from './initialSearchParams'

const tabs: Array<TabItem> = [
  {
    label: 'Auto',
    icon: 'car',
    name: 'car',
  },
  {
    label: 'Moto',
    icon: 'motorbike',
    name: 'motorcycle',
  },
  {
    label: 'Furgone',
    icon: 'truck',
    name: 'van',
  },
]

const colors = [
  {
    name: 'Bianco',
    hex: '#FFFFFF',
  },
  {
    name: 'Blu',
    hex: '#0000ff',
  },
  {
    name: 'Rosso',
    hex: '#ff0000',
  },
  {
    name: 'Giallo',
    hex: '#ffff00',
  },
  {
    name: 'Verde',
    hex: '#00ff00',
  },
]

const traction = [
  { label: '4x4', value: 'full-wheel' },
  { label: 'Anteriore', value: 'front-wheel' },
  { label: 'Posteriore', value: 'rear-wheel' },
]

const emission = [
  { label: 'Euro 1', value: 'Euro 1' },
  { label: 'Euro 2', value: 'Euro 2' },
  { label: 'Euro 3', value: 'Euro 3' },
  { label: 'Euro 4', value: 'Euro 4' },
  { label: 'Euro 5', value: 'Euro 5' },
  { label: 'Euro 6', value: 'Euro 6' },
  { label: 'Altro', value: 'other' },
]

const optionals = [
  { label: 'Optional1', value: 'optional1' },
  { label: 'Optional2', value: 'optional2' },
  { label: 'Optional3', value: 'optional3' },
  { label: 'Optional4', value: 'optional4' },
  { label: 'Optional5', value: 'optional5' },
  { label: 'Optional6', value: 'optional6' },
  { label: 'Optional7', value: 'optional7' },
  { label: 'Optional8', value: 'optional8' },
  { label: 'Optional9', value: 'optional9' },
]

const internalMaterials = [
  { label: 'Stoffa', value: 'stoffa' },
  { label: 'Alcantara', value: 'alcantara' },
  { label: 'Pelle Totale', value: 'full leather' },
  { label: 'Pelle Parziale', value: 'partial leather' },
  { label: 'Pelle Scamosciata', value: 'suede leather' },
  { label: 'Altro', value: 'other' },
]

const maintenance = [
  { label: 'Manutenzione ordinaria', value: 'ordinary maintenance' },
  { label: 'Manutenzione straordinaria', value: 'extraordinary maintenance' },
]

const insurances = [
  { label: 'RCA', value: 'RCA' },
  { label: 'Infortunio conducente', value: 'driver injury' },
  { label: 'Furto e incendio', value: 'theft and fire' },
  { label: 'Cristalli', value: 'glass' },
  { label: 'Atti vandalici', value: 'vadalism' },
  { label: 'Assistenza nelle pratiche burocratiche', value: 'bureaucratic assistance' },
  { label: 'Assistenza stradale H24', value: 'H24 traffic assistance' },
]

const otherServices = [
  { label: 'Kasko', value: 'kasko' },
  { label: 'Mini kasko', value: 'mini kasko' },
]

type buttonProps = {
  name: string
  icon: IconName
}

const fuels: Array<buttonProps> = [
  {
    name: 'Benzina',
    icon: 'drop',
  },
  {
    name: 'Diesel',
    icon: 'drop',
  },
  {
    name: 'Elettrico',
    icon: 'flash',
  },
  {
    name: 'Elettrico/Benzina',
    icon: 'dropflash',
  },
  {
    name: 'Elettrico/Diesel',
    icon: 'dropflash',
  },
  {
    name: 'Metano',
    icon: 'fire',
  },
  {
    name: 'GPL',
    icon: 'fire',
  },
  {
    name: 'Altro',
    icon: 'other',
  },
]

const transmissions: Array<buttonProps> = [
  {
    name: 'Automatico',
    icon: 'automatic',
  },
  {
    name: 'Manual',
    icon: 'manual',
  },
  {
    name: 'Semi Automatic',
    icon: 'semi_automatic',
  },
  {
    name: 'Altro',
    icon: 'other',
  },
]

const bodies: Array<buttonProps> = [
  {
    name: 'Cabrio',
    icon: 'cabrio',
  },
  {
    name: 'City Car',
    icon: 'citycar',
  },
  {
    name: 'Coupe',
    icon: 'coupe',
  },
  {
    name: 'Berlina',
    icon: 'sedan',
  },
  {
    name: 'Station Wagon',
    icon: 'station_wagon',
  },
  {
    name: 'SUV',
    icon: 'suv',
  },
  {
    name: 'Altro',
    icon: 'other',
  },
]

function reducerOLD(
  state: SearchParametersOLD,
  action:
    | { type: 'set_vehicle_type'; payload: VehicleType }
    | { type: 'set_min_price'; payload: number }
    | { type: 'set_max_price'; payload: number }
    | { type: 'set_brand_model'; payload: BrandModels }
    | { type: 'set_min_year'; payload: number }
    | { type: 'set_max_year'; payload: number }
    | { type: 'set_min_mileage'; payload: number }
    | { type: 'set_max_mileage'; payload: number }
    | { type: 'set_min_power'; payload: number }
    | { type: 'set_max_power'; payload: number }
    | { type: 'set_transmission'; payload: string }
    | { type: 'set_body_type'; payload: string }
    | { type: 'set_color'; payload: string }
    | { type: 'set_doors'; payload: number }
    | { type: 'set_seats'; payload: number }
    | { type: 'set_gears'; payload: number }
    | { type: 'set_radius'; payload: number }
    | { type: 'set_price_range'; payload: number[] }
    | { type: 'set_cap'; payload: number }
    | { type: 'set_min_months'; payload: number }
    | { type: 'set_max_months'; payload: number }
    | { type: 'set_only_verified'; payload: boolean }
    | { type: 'set_max_advance'; payload: number }
    | { type: 'set_min_age'; payload: number }
    | { type: 'set_is_new'; payload: boolean }
    | { type: 'set_no_security_deposit'; payload: boolean }
    | { type: 'set_no_advance_payment'; payload: boolean }
    | { type: 'set_no_age_limit'; payload: boolean }
    | { type: 'set_no_annual_limit'; payload: boolean }
    | { type: 'set_annual_limit'; payload: number }
    | { type: 'set_fuels'; payload: string }
    | { type: 'set_with_driver'; payload: boolean }
    | { type: 'set_optionals'; payload: string }
    | { type: 'clean_optionals'; payload: null }
    | { type: 'clean_services'; payload: null }
    | { type: 'set_maintenance'; payload: string }
    | { type: 'set_insurances'; payload: string }
    | { type: 'set_other_services'; payload: string }
    | { type: 'set_internal_colors'; payload: string }
    | { type: 'set_external_colors'; payload: string }
    | { type: 'set_materials'; payload: string }
    | { type: 'set_traction'; payload: string }
    | { type: 'set_emission'; payload: string }
    | { type: 'clean_internal_colors'; payload: null }
    | { type: 'clean_external_colors'; payload: null }
    | { type: 'clean_materials'; payload: null }
    | { type: 'clean_traction'; payload: null }
    | { type: 'clean_emission'; payload: null }
    | { type: 'add_brand'; payload: string }
    | { type: 'set_brands_model'; payload: BrandModel }
    | { type: 'remove_brand'; payload: string }
): SearchParametersOLD {
  switch (action.type) {
    case 'set_vehicle_type':
      return { ...state, vehicleType: action.payload }
    case 'set_min_price':
      return { ...state, minPrice: action.payload }
    case 'set_max_price':
      return { ...state, maxPrice: action.payload }
    case 'set_doors':
      return { ...state, doors: action.payload }
    case 'set_seats':
      return { ...state, seats: action.payload }
    case 'set_radius':
      return { ...state, radius: action.payload }
    case 'set_cap':
      return { ...state, cap: action.payload }
    case 'set_price_range':
      return { ...state, minPrice: action.payload[0], maxPrice: action.payload[1] }
    case 'set_min_months':
      return { ...state, minMonths: action.payload }
    case 'set_max_months':
      return { ...state, maxMonths: action.payload }
    case 'set_only_verified':
      return { ...state, onlyVerified: action.payload }
    case 'set_max_advance':
      return { ...state, maxAdvance: action.payload }
    case 'set_min_age':
      return { ...state, minAge: action.payload }
    case 'set_is_new':
      return { ...state, isNew: action.payload }
    case 'set_no_security_deposit':
      return { ...state, noSecurityDeposit: action.payload }
    case 'set_no_advance_payment':
      return { ...state, noAdvancePayment: action.payload }
    case 'set_no_age_limit':
      return { ...state, noAgeLimit: action.payload }
    case 'set_no_annual_limit':
      return { ...state, noAnnualLimit: action.payload }
    case 'set_annual_limit':
      return { ...state, annualLimit: action.payload }
    case 'set_fuels':
      return {
        ...state,
        fuels: state.fuels.includes(action.payload)
          ? state.fuels.filter((f) => f != action.payload)
          : [...state.fuels, action.payload],
      }
    case 'set_transmission':
      return {
        ...state,
        transmissions: state.transmissions.includes(action.payload)
          ? state.transmissions.filter((f) => f != action.payload)
          : [...state.transmissions, action.payload],
      }
    case 'set_body_type':
      return {
        ...state,
        bodies: state.bodies.includes(action.payload)
          ? state.bodies.filter((f) => f != action.payload)
          : [...state.bodies, action.payload],
      }
    case 'set_seats':
      return { ...state, seats: action.payload }
    case 'set_doors':
      return { ...state, doors: action.payload }
    case 'set_gears':
      return { ...state, gears: action.payload }
    case 'set_with_driver':
      return { ...state, withDriver: action.payload }
    case 'set_optionals':
      return {
        ...state,
        optionals: state.optionals.includes(action.payload)
          ? state.optionals.filter((f) => f != action.payload)
          : [...state.optionals, action.payload],
      }
    case 'clean_optionals':
      return { ...state, optionals: [] }
    case 'clean_services':
      return { ...state, maintenance: [], insurances: [], otherServices: [] }
    case 'set_maintenance':
      return {
        ...state,
        maintenance: state.maintenance.includes(action.payload)
          ? state.maintenance.filter((f) => f != action.payload)
          : [...state.maintenance, action.payload],
      }
    case 'set_insurances':
      return {
        ...state,
        insurances: state.insurances.includes(action.payload)
          ? state.insurances.filter((f) => f != action.payload)
          : [...state.insurances, action.payload],
      }
    case 'set_other_services':
      return {
        ...state,
        otherServices: state.otherServices.includes(action.payload)
          ? state.otherServices.filter((f) => f != action.payload)
          : [...state.otherServices, action.payload],
      }
    case 'set_min_power':
      return { ...state, minPower: action.payload }
    case 'set_max_power':
      return { ...state, maxPower: action.payload }
    case 'set_internal_colors':
      return {
        ...state,
        internalColors: state.internalColors.includes(action.payload)
          ? state.internalColors.filter((f) => f != action.payload)
          : [...state.internalColors, action.payload],
      }
    case 'set_external_colors':
      return {
        ...state,
        externalColors: state.externalColors.includes(action.payload)
          ? state.externalColors.filter((f) => f != action.payload)
          : [...state.externalColors, action.payload],
      }
    case 'set_materials':
      return {
        ...state,
        internalMaterials: state.internalMaterials.includes(action.payload)
          ? state.internalMaterials.filter((f) => f != action.payload)
          : [...state.internalMaterials, action.payload],
      }
    case 'set_traction':
      return {
        ...state,
        traction: state.traction.includes(action.payload)
          ? state.traction.filter((f) => f != action.payload)
          : [...state.traction, action.payload],
      }
    case 'set_emission':
      return {
        ...state,
        emission: state.emission.includes(action.payload)
          ? state.emission.filter((f) => f != action.payload)
          : [...state.emission, action.payload],
      }
    case 'clean_internal_colors':
      return { ...state, internalColors: [] }
    case 'clean_external_colors':
      return { ...state, externalColors: [] }
    case 'clean_materials':
      return { ...state, internalMaterials: [] }
    case 'clean_traction':
      return { ...state, traction: [] }
    case 'add_brand':
      return { ...state, brandModel: [...state.brandModel, { brand: action.payload, models: [] }] }
    case 'set_brands_model':
      return {
        ...state,
        brandModel: state.brandModel.map((item) =>
          item.brand === action.payload.brand
            ? {
                ...item,
                models: item.models.includes(action.payload.models)
                  ? item.models.filter((m) => m != action.payload.models)
                  : [...item.models, action.payload.models],
              }
            : item
        ),
      }
    case 'remove_brand':
      return { ...state, brandModel: state.brandModel.filter((bm) => bm.brand != action.payload) }
    default:
      return state
  }
}

type NumberActionType =
  | 'set_min_price'
  | 'set_max_price'
  | 'set_radius'
  | 'set_cap'
  | 'set_max_advance'
  | 'set_min_age'
  | 'set_annual_limit'
  | 'set_min_power'
  | 'set_max_power'
  | 'set_min_months'
  | 'set_max_months'

type ModalKey =
  | 'brand'
  | 'model'
  | 'equipment'
  | 'services'
  | 'engine'
  | 'colors'
  | 'internal'
  | 'external'
  | 'materials'
  | 'traction'
  | 'emission'

const sliderWidth = Dimensions.get('window').width - 48

type PageKey = 'brands' | 'interiors' | 'services' | 'equipment' | 'engine'

const FilterSection = () => {
  const { duration } = useLocalSearchParams()
  const [searchOLD, dispatchOLD] = useReducer(reducerOLD, initialSearchParameters)
  const [search, dispatch] = useReducer(reducer, initialSearchParams)
  const ref = useModalSheetRef()
  const [modalKey, setModalKey] = useState<ModalKey | null>(null)

  const handleNumberInput = (action: NumberActionType, payload: string) => {
    const numericText = payload.replace(/[^0-9]/g, '')
    dispatchOLD({ type: action, payload: numericText ? Number(numericText) : 0 })
  }

  const [page, setPage] = useState('brands')
  const [step, setStep] = useState('initial')

  const normarlizeKey = (s: string) => s.toLowerCase().replaceAll(' ', '_')

  const powerLabel = { HP: 'Cv', kw: 'kW' }

  const pages: { [main: string]: ModalPage } = {
    brands: {
      initial: {
        key: 'initial',
        title: 'Seleziona marca',
        content: (
          <View>
            {['Abarth', 'Alfa'].map((k) => (
              <TouchableOpacity key={k} onPress={() => setStep(normarlizeKey(k))}>
                <Text>{k}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ),
      },
      abarth: {
        key: 'Abarth',
        title: 'Seleziona modello',
        doneButton: true,
        content: (
          <View>
            {[
              { label: '500', value: '500' },
              { label: '600', value: '600' },
            ].map((item) => (
              <SelectableRow
                checked={false}
                item={item}
                onPress={() => {
                  dispatch({ type: 'set_vehicle', payload: { brand: 'Abarth', model: item.value } })
                  ref.current?.close()
                  setStep('initial')
                }}
              />
            ))}
          </View>
        ),
      },
    },
    services: {
      initial: {
        key: 'initial',
        title: 'Servizi inclusi nel noleggio',
        doneButton: true,
        content: (
          <View style={{ width: '100%' }}>
            <View style={servicesStyles.titleContainer}>
              <Text style={servicesStyles.sectionTitle}>Manutenzione</Text>
              <Text style={servicesStyles.sectionSubTitle}>
                La macchina riceve la manutenzione.
              </Text>
            </View>
            <View style={servicesStyles.listContainer}>
              {maintenance.map((item) => {
                const checked = search.includedServices.includes(item.value)
                return (
                  <SelectableRow
                    checked={checked}
                    item={item}
                    onPress={() => dispatch({ type: 'set_included_services', payload: item.value })}
                  />
                )
              })}
            </View>
            {/* Insurance */}
            <View style={{ width: '100%', marginTop: 24 }}>
              <View style={servicesStyles.titleContainer}>
                <Text style={servicesStyles.sectionTitle}>Copertura assicurativa</Text>
                <Text style={servicesStyles.sectionSubTitle}>
                  Tipo di polizza che il veicolo possiede.
                </Text>
              </View>
              <View style={servicesStyles.listContainer}>
                {insurances.map((item) => {
                  const checked = search.includedServices.includes(item.value)
                  return (
                    <SelectableRow
                      checked={checked}
                      item={item}
                      onPress={() =>
                        dispatch({ type: 'set_included_services', payload: item.value })
                      }
                    />
                  )
                })}
              </View>
            </View>
            {/* Other services */}
            <View style={{ width: '100%', marginTop: 24 }}>
              <View style={servicesStyles.titleContainer}>
                <Text style={servicesStyles.sectionTitle}>Altri servizi</Text>
              </View>
              <View style={servicesStyles.listContainer}>
                {otherServices.map((item) => {
                  const checked = search.includedServices.includes(item.value)
                  return (
                    <SelectableRow
                      checked={checked}
                      item={item}
                      onPress={() =>
                        dispatch({ type: 'set_included_services', payload: item.value })
                      }
                    />
                  )
                })}
              </View>
            </View>
            <View style={{ opacity: 0, width: '100%', height: 200 }}></View>
          </View>
        ),
        onReset: () => dispatch({ type: 'set_included_services', payload: __RESET_KEY__ }),
        scrollable: true,
      },
    },
    interiors: {
      initial: {
        key: 'initial',
        title: 'Colore e interni',
        content: (
          <View style={interiorStyles.container}>
            {[
              { label: 'Colore esterno', value: 'external color' },
              { label: 'Colore interni', value: 'internal color' },
              { label: 'Materiale interni', value: 'internal material' },
            ].map(({ label, value }, i) => (
              <TouchableOpacity
                key={value}
                style={i == 0 ? { ...interiorStyles.item, paddingTop: 0 } : interiorStyles.item}
                onPress={() => setStep(normarlizeKey(value))}
              >
                <Text style={interiorStyles.itemText}>{label}</Text>
                <Icon name="chevron-right" color={Colors.greenPrimary} />
              </TouchableOpacity>
            ))}
          </View>
        ),
        containerStyle: { paddingHorizontal: 0 },
      },
      external_color: {
        key: 'external_color',
        title: 'Colore Esterni',
        content: (
          <View style={interiorStyles.listContainer}>
            {colors.map(({ hex, name }) => (
              <SelectableRow
                key={hex}
                item={{ label: name, value: hex }}
                checked={search.externalColor === hex}
                onPress={() => dispatch({ type: 'set_external_color', payload: hex })}
              >
                <View style={interiorStyles.itemContainer}>
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      backgroundColor: hex,
                      borderRadius: 24,
                      borderWidth: 1,
                      borderColor: Colors.lightGray,
                    }}
                  />
                  <Text>{name}</Text>
                </View>
              </SelectableRow>
            ))}
          </View>
        ),
      },
      internal_color: {
        key: 'internal_color',
        title: 'Colore Interni',
        content: (
          <View style={interiorStyles.listContainer}>
            {colors.map(({ hex, name }) => (
              <SelectableRow
                key={hex}
                item={{ label: name, value: hex }}
                checked={search.externalColor === hex}
                onPress={() => dispatch({ type: 'set_internal_color', payload: hex })}
              >
                <View style={interiorStyles.itemContainer}>
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      backgroundColor: hex,
                      borderRadius: 24,
                      borderWidth: 1,
                      borderColor: Colors.lightGray,
                    }}
                  />
                  <Text>{name}</Text>
                </View>
              </SelectableRow>
            ))}
          </View>
        ),
      },
      internal_material: {
        key: 'internal_material',
        title: 'Materiale Interni',
        content: (
          <View style={interiorStyles.listContainer}>
            {internalMaterials.map(({ label, value }) => (
              <SelectableRow
                key={value}
                item={{ label, value }}
                checked={search.internalMaterials.includes(value)}
                onPress={() => dispatch({ type: 'set_internal_material', payload: value })}
              />
            ))}
          </View>
        ),
        onReset: () => dispatch({ type: 'set_internal_material', payload: __RESET_KEY__ }),
      },
    },
    equipment: {
      initial: {
        key: 'equipment',
        title: 'Equipaggiamento',
        doneButton: true,
        content: (
          <View style={{ width: '100%' }}>
            <View style={servicesStyles.listContainerEquiment}>
              {optionals.map((item) => {
                const checked = search.equipment.includes(item.value)
                return (
                  <SelectableRow
                    checked={checked}
                    item={item}
                    onPress={() => dispatch({ type: 'set_equipment', payload: item.value })}
                  />
                )
              })}
            </View>
            <View style={{ opacity: 0, width: '100%', height: 200 }}></View>
          </View>
        ),
        onReset: () => dispatch({ type: 'set_equipment', payload: __RESET_KEY__ }),
        scrollable: true,
      },
    },
    engine: {
      initial: {
        key: 'engine',
        title: 'Motore',
        doneButton: true,
        content: (
          <View style={{ width: '100%' }}>
            <View style={engineStyles.topContainer}>
              <Text style={engineStyles.itemText}>Potenza</Text>
              <View style={engineStyles.powerRow}>
                {[
                  { value: 'HP', label: 'Cv' },
                  { value: 'kw', label: 'kW' },
                ].map(({ value, label }) => (
                  <TouchableOpacity
                    key={value}
                    style={{
                      ...engineStyles.powerButton,
                      borderColor:
                        search.engine.power == value ? Colors.greenPrimary : Colors.greySecondary,
                      backgroundColor:
                        search.engine.power == value ? Colors.greenSelection : 'white',
                    }}
                    onPress={() => {
                      dispatch({ type: 'set_engine_power', payload: value as 'HP' | 'kw' })
                      Haptics.selectionAsync()
                    }}
                  >
                    <Text>{label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={engineStyles.row}>
                <View style={engineStyles.column}>
                  <Text style={engineStyles.inputTitle}>Minimo</Text>
                  <TextInput
                    style={engineStyles.input}
                    value={`${search.engine.range[0].toString()} ${powerLabel[search.engine.power]}`}
                    onChangeText={(text) =>
                      dispatch({
                        type: 'set_engine_range',
                        payload: [Number(text), search.engine.range[1]],
                      })
                    }
                  />
                </View>
                <View style={engineStyles.column}>
                  <Text style={engineStyles.inputTitle}>Massimo</Text>
                  <TextInput
                    style={engineStyles.input}
                    value={`${search.engine.range[1].toString()} ${powerLabel[search.engine.power]}`}
                    onChangeText={(text) =>
                      dispatch({
                        type: 'set_engine_range',
                        payload: [search.engine.range[0], Number(text)],
                      })
                    }
                  />
                </View>
              </View>
              <View style={engineStyles.sliderContainer}>
                <MultiSlider
                  values={search.engine.range}
                  sliderLength={sliderWidth}
                  onValuesChange={(values) =>
                    dispatch({ type: 'set_engine_range', payload: values })
                  }
                  min={0}
                  max={1000}
                  step={5}
                  allowOverlap={false}
                  snapped
                  trackStyle={styles.track}
                  selectedStyle={styles.selectedTrack}
                  unselectedStyle={styles.unselectedTrack}
                  markerStyle={styles.marker}
                  enabledTwo
                />
              </View>
            </View>
            <View style={engineStyles.container}>
              {[
                { label: 'Trazione', value: 'traction' },
                { label: 'Classe emissioni', value: 'emissions class' },
              ].map(({ label, value }, i) => (
                <TouchableOpacity
                  key={value}
                  style={engineStyles.item}
                  onPress={() => setStep(normarlizeKey(value))}
                >
                  <Text style={interiorStyles.itemText}>{label}</Text>
                  <Icon name="chevron-right" color={Colors.greenPrimary} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ),
        containerStyle: { paddingHorizontal: 0 },
      },
      traction: {
        key: 'traction',
        title: 'Trazione',
        doneButton: true,
        content: (
          <View style={{ width: '100%' }}>
            <View style={engineStyles.listContainer}>
              {traction.map((item) => {
                const checked = search.engine.traction.includes(item.value)
                return (
                  <SelectableRow
                    checked={checked}
                    item={item}
                    onPress={() => dispatch({ type: 'set_engine_traction', payload: item.value })}
                  />
                )
              })}
            </View>
            <View style={{ opacity: 0, width: '100%', height: 200 }}></View>
          </View>
        ),
        onReset: () => dispatch({ type: 'set_engine_traction', payload: __RESET_KEY__ }),
      },
      emissions_class: {
        key: 'emissions_class',
        title: 'Classe emissioni',
        doneButton: true,
        scrollable: true,
        content: (
          <View style={{ width: '100%' }}>
            <View style={engineStyles.listContainer}>
              {emission.map((item) => {
                const checked = search.engine.emissionClass.includes(item.value)
                return (
                  <SelectableRow
                    checked={checked}
                    item={item}
                    onPress={() =>
                      dispatch({ type: 'set_engine_emissionClass', payload: item.value })
                    }
                  />
                )
              })}
            </View>
            <View style={{ opacity: 0, width: '100%', height: 200 }}></View>
          </View>
        ),
        onReset: () => dispatch({ type: 'set_engine_emissionClass', payload: __RESET_KEY__ }),
      },
    },
  }

  const openStepModal = (page: PageKey) => {
    ref.current?.expand()
    setPage(page)
  }

  return (
    <ModalSheetProvider>
      <View>
        <ScrollView horizontal={false} style={{ marginBottom: 150 }}>
          <View style={styles.container}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.tabContainer}
            >
              {tabs.map(({ label, icon, name }, i) => (
                <VehicleTypeButton
                  key={label}
                  icon={
                    <Icon
                      name={icon}
                      color={search.vehicleType == name ? 'black' : Colors.greyPrimary}
                    />
                  }
                  label={label}
                  active={search.vehicleType == name}
                  onClick={() => dispatch({ type: 'set_vehicle_type', payload: name })}
                />
              ))}
            </ScrollView>
          </View>
          <View style={{ paddingBottom: 140 }}>
            <FilterComponent title="Marca e modello" icon="search">
              <Button style={styles.buttonStyle} onPress={() => openStepModal('brands')}>
                Seleziona marca e modello
              </Button>
              {search.vehicles.length > 0 &&
                search.vehicles.map((item) => (
                  <View style={styles.brandModel} key={item.brand}>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                      <Text style={{ color: 'black' }}>{item.brand}</Text>
                      <Text style={{ color: Colors.greyPrimary }}>{item.model}</Text>
                    </View>
                    <View style={styles.closeContainer}>
                      <Icon
                        name="close"
                        color="white"
                        width={13}
                        onPress={() =>
                          dispatch({
                            type: 'remove_vehicle',
                            payload: { brand: item.brand, model: item.model },
                          })
                        }
                      />
                    </View>
                  </View>
                ))}

              <TouchableOpacity
                style={styles.addBrandModel}
                onPress={() => openStepModal('brands')}
              >
                <Text style={{ color: Colors.bluePrimary, fontSize: 20 }}>+</Text>
                <Text style={{ color: Colors.bluePrimary, fontSize: 14 }}>
                  Aggiungi altre marche e modelli
                </Text>
              </TouchableOpacity>
            </FilterComponent>

            <FilterComponent
              title="Posizione"
              icon="location"
              description="Indica il luogo in cui vuoi cercare il veicolo"
            >
              <View style={styles.brandModel}>
                <TextInput
                  placeholder="Digita città o CAP"
                  onChangeText={(text) => {
                    dispatch({ type: 'set_position_address', payload: text })
                  }}
                  style={{ flex: 1 }}
                  value={search.position.address}
                />
              </View>

              <Text style={{ color: Colors.bluePrimary, fontSize: 14 }}>
                Utilizza la mia posizione
              </Text>
              <View style={styles.radiusCont}>
                <Text>Raggio</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <TextInput
                    style={styles.input}
                    placeholder="Inserisci raggio massimo"
                    keyboardType="numeric"
                    onChangeText={(text) => {
                      const n = Number(text)
                      if (n < 0 || n > 100) return
                      dispatch({ type: 'set_position_radius', payload: n })
                    }}
                    value={search.position.radius.toString()}
                  />
                  <Text>Km</Text>
                </View>
                <MultiSlider
                  values={[search.position.radius]}
                  sliderLength={sliderWidth}
                  onValuesChange={(values) =>
                    dispatch({ type: 'set_position_radius', payload: values[0] })
                  }
                  min={0}
                  max={100}
                  step={5}
                  allowOverlap={false}
                  snapped
                  trackStyle={styles.track}
                  selectedStyle={styles.selectedTrack}
                  unselectedStyle={styles.unselectedTrack}
                  markerStyle={styles.marker}
                />
              </View>
            </FilterComponent>
            <FilterComponent
              title={duration == 'short' ? 'Prezzo giornaliero' : 'Prezzo mensile'}
              icon="plate"
              description={`Indicazione del prezzo per ${duration == 'short' ? 'giorno' : 'mese'} di noleggio`}
            >
              <View style={styles.priceInputContainer}>
                <View style={styles.priceCont}>
                  <Text style={styles.labelPrice}>Minimo</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Inserisci prezzo minimo"
                    keyboardType="numeric"
                    onChangeText={(text) => {
                      dispatch({ type: 'set_price', payload: [Number(text), search.price[1]] })
                    }}
                    value={search.price[0].toString()}
                  />
                </View>
                <View style={styles.priceContEnd}>
                  <Text style={styles.labelPrice}>Massimo</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Inserisci prezzo massimo"
                    keyboardType="numeric"
                    onChangeText={(text) => {
                      dispatch({ type: 'set_price', payload: [search.price[0], Number(text)] })
                    }}
                    value={search.price[1].toString()}
                  />
                </View>
              </View>
              <View style={styles.sliderContainer}>
                <MultiSlider
                  values={[search.price[0], search.price[1]]}
                  sliderLength={sliderWidth - 24}
                  onValuesChange={(values) => dispatch({ type: 'set_price', payload: values })}
                  min={0}
                  max={1000}
                  step={1}
                  allowOverlap={false}
                  snapped
                  trackStyle={styles.track}
                  selectedStyle={styles.selectedTrack}
                  unselectedStyle={styles.unselectedTrack}
                  markerStyle={styles.marker}
                />
              </View>
            </FilterComponent>

            {duration == 'long' && (
              <FilterComponent
                title="Durata noleggio"
                icon="clock"
                description="Indicazione della durata del noleggio"
              >
                <View style={styles.priceInputContainer}>
                  <View style={styles.priceCont}>
                    <Text style={styles.labelPrice}>Da</Text>
                    <View style={styles.inputDurationCont}>
                      <Text style={styles.durationLabel}>Mesi</Text>
                      <TextInput
                        style={styles.inputDuration}
                        placeholder="Qualsiasi"
                        keyboardType="numeric"
                        onChangeText={(text) => handleNumberInput('set_min_months', text)}
                        value={searchOLD.minMonths.toString()}
                      />
                    </View>
                  </View>
                  <View style={styles.priceCont}>
                    <Text style={styles.labelPrice}>A</Text>
                    <View style={styles.inputDurationCont}>
                      <Text style={styles.durationLabel}>Mesi</Text>
                      <TextInput
                        style={styles.inputDuration}
                        placeholder="Qualsiasi"
                        keyboardType="numeric"
                        onChangeText={(text) => handleNumberInput('set_max_months', text)}
                        value={searchOLD.maxMonths.toString()}
                      />
                    </View>
                  </View>
                </View>
              </FilterComponent>
            )}

            <FilterComponent
              title="Noleggiatori verificati"
              icon="verified_check"
              description="Mostra solo annunci da noleggiatori verificati, in modo da avere la sicurezza di noleggiare da professionisti qualificati."
            >
              <TouchableOpacity
                style={[
                  styles.onlyVerifiedCont,
                  search.verifiedOnly ? styles.onlyVerifiedContActive : {},
                ]}
                activeOpacity={1}
                onPress={() =>
                  dispatch({ type: 'set_verified_only', payload: !search.verifiedOnly })
                }
              >
                <Text>Mostra solo annunci verificati</Text>
                <View
                  style={[
                    styles.verifiedCheck,
                    search.verifiedOnly ? styles.verifiedCheckActive : {},
                  ]}
                >
                  {search.verifiedOnly && <FontAwesome name="check" color="white" />}
                </View>
              </TouchableOpacity>
            </FilterComponent>

            <FilterComponent
              title={duration == 'short' ? 'Deposito cauzionario' : 'Anticipo'}
              icon="card_payment"
              description={
                duration == 'short'
                  ? 'Importo temporaneo trattenuto come garanzia.'
                  : 'Pagamento iniziale richiesto per noleggi a lungo termine.'
              }
            >
              <TouchableOpacity
                style={[
                  styles.onlyVerifiedCont,
                  search.deposit != null ? styles.onlyVerifiedContActive : {},
                ]}
                activeOpacity={1}
                onPress={() =>
                  dispatch({ type: 'set_deposit', payload: search.deposit != null ? null : 0 })
                }
              >
                <Text>
                  {duration == 'short'
                    ? 'Mostra solo veicoli senza cauzione'
                    : 'Mostra solo veicoli senza anticipo'}
                </Text>
                <View
                  style={[
                    styles.verifiedCheck,
                    search.deposit != null ? styles.verifiedCheckActive : {},
                  ]}
                >
                  {search.deposit != null && <FontAwesome name="check" color="white" />}
                </View>
              </TouchableOpacity>

              {search.deposit != null && (
                <View style={styles.advanceCont}>
                  <Text style={styles.labelPrice}>Cifra massima</Text>
                  <View style={styles.anvanceInputCont}>
                    <Text style={{ paddingHorizontal: 10 }}>€</Text>
                    <TextInput
                      style={styles.anvanceInput}
                      placeholder={'Inserisci deposito massimo'}
                      keyboardType="numeric"
                      onChangeText={(text) =>
                        dispatch({ type: 'set_deposit', payload: Number(text) })
                      }
                      value={search.deposit.toString()}
                    />
                  </View>
                </View>
              )}
            </FilterComponent>

            {duration == 'short' && (
              <FilterComponent
                title="Limite di età"
                icon="seats"
                description="Età minima richiesta per il noleggio."
              >
                <TouchableOpacity
                  style={[
                    styles.onlyVerifiedCont,
                    search.ageRequirement != null ? styles.onlyVerifiedContActive : {},
                  ]}
                  activeOpacity={1}
                  onPress={() =>
                    dispatch({
                      type: 'set_age_requirement',
                      payload: search.ageRequirement != null ? null : 0,
                    })
                  }
                >
                  <Text>Mostra solo veicoli senza limite di età</Text>
                  <View
                    style={[
                      styles.verifiedCheck,
                      search.ageRequirement != null ? styles.verifiedCheckActive : {},
                    ]}
                  >
                    {search.ageRequirement != null && <FontAwesome name="check" color="white" />}
                  </View>
                </TouchableOpacity>
                {search.ageRequirement != null && (
                  <View style={styles.advanceCont}>
                    <Text style={styles.labelPrice}>Età minima</Text>

                    <View style={styles.anvanceInputCont}>
                      <Text style={{ paddingHorizontal: 10 }}>Anni</Text>
                      <TextInput
                        style={styles.anvanceInput}
                        placeholder="Età"
                        keyboardType="numeric"
                        onChangeText={(text) =>
                          dispatch({ type: 'set_age_requirement', payload: Number(text) })
                        }
                        value={search.ageRequirement.toString()}
                      />
                    </View>
                  </View>
                )}
              </FilterComponent>
            )}

            <FilterComponent
              title="Stato veicolo"
              icon="status"
              description="Stato del veicolo al momento del noleggio."
            >
              {(
                [
                  { label: 'Nuovo', value: 'new' },
                  { label: 'Usato', value: 'used' },
                ] as Array<{ label: string; value: 'new' | 'used' }>
              ).map((item) => (
                <>
                  <TouchableOpacity
                    style={[
                      styles.onlyVerifiedCont,
                      search.state == item.value ? styles.onlyVerifiedContActive : {},
                    ]}
                    activeOpacity={1}
                    onPress={() =>
                      dispatch({
                        type: 'set_state',
                        payload: item.value,
                      })
                    }
                  >
                    <Text>{item.label}</Text>
                    <View
                      style={[
                        styles.verifiedCheck,
                        search.state == item.value ? styles.verifiedCheckActive : {},
                      ]}
                    >
                      {search.state == item.value && <FontAwesome name="check" color="white" />}
                    </View>
                  </TouchableOpacity>
                </>
              ))}
            </FilterComponent>

            <FilterComponent
              title="Percorrenza annuale"
              icon="distance"
              description="Limite di chilometri inclusi nel noleggio."
            >
              <TouchableOpacity
                style={[
                  styles.onlyVerifiedCont,
                  search.kmLimit != null ? styles.onlyVerifiedContActive : {},
                ]}
                activeOpacity={1}
                onPress={() =>
                  dispatch({ type: 'set_km_limit', payload: search.kmLimit != null ? null : 0 })
                }
              >
                <Text>Mostra solo veicoli senza limite km</Text>
                <View
                  style={[
                    styles.verifiedCheck,
                    search.kmLimit != null ? styles.verifiedCheckActive : {},
                  ]}
                >
                  {search.kmLimit != null && <FontAwesome name="check" color="white" />}
                </View>
              </TouchableOpacity>
              {search.kmLimit != null && (
                <View style={styles.advanceCont}>
                  <Text style={styles.labelPrice}>Percorrenza massima</Text>

                  <View style={styles.anvanceInputCont}>
                    <Text style={{ paddingHorizontal: 10 }}>Km</Text>
                    <TextInput
                      style={styles.anvanceInput}
                      placeholder="Massimo km"
                      keyboardType="numeric"
                      onChangeText={(text) =>
                        dispatch({ type: 'set_km_limit', payload: Number(text) })
                      }
                      value={search.kmLimit.toString()}
                    />
                  </View>
                </View>
              )}
            </FilterComponent>

            <FilterComponent
              title="Dati di base"
              description="Caratteristiche principali del veicolo."
            >
              <Text style={{ marginTop: 15 }}>Alimentazione</Text>
              <View style={styles.buttonsContainer}>
                {fuels.map((f) => {
                  return (
                    <TouchableOpacity
                      style={[
                        styles.listButton,
                        search.details.fuel.includes(f.name) ? styles.listButtonActive : {},
                      ]}
                      activeOpacity={1}
                      onPress={() => {
                        dispatch({ type: 'set_details_fuel', payload: f.name })
                        Haptics.selectionAsync()
                      }}
                    >
                      <Icon name={f.icon} color="black" />
                      <Text style={styles.listButtonText}>{f.name}</Text>
                    </TouchableOpacity>
                  )
                })}
              </View>

              <Text style={{ marginTop: 25 }}>Cambio</Text>
              <View style={styles.buttonsContainer}>
                {transmissions.map((f) => {
                  return (
                    <TouchableOpacity
                      style={[
                        styles.listButton,
                        search.details.transmission.includes(f.name) ? styles.listButtonActive : {},
                      ]}
                      activeOpacity={1}
                      onPress={() =>
                        dispatch({ type: 'set_details_transmission', payload: f.name })
                      }
                    >
                      <Icon name={f.icon} color="black" />
                      <Text style={styles.listButtonText}>{f.name}</Text>
                    </TouchableOpacity>
                  )
                })}
              </View>

              <Text style={{ marginTop: 25 }}>Carrozzeria</Text>
              <View style={styles.buttonsContainer}>
                {bodies.map((f) => {
                  return (
                    <TouchableOpacity
                      style={[
                        styles.listButton,
                        search.details.body.includes(f.name) ? styles.listButtonActive : {},
                      ]}
                      activeOpacity={1}
                      onPress={() => dispatch({ type: 'set_details_body', payload: f.name })}
                    >
                      <Icon name={f.icon} color="black" />
                      <Text style={styles.listButtonText}>{f.name}</Text>
                    </TouchableOpacity>
                  )
                })}
              </View>

              <Text style={{ marginTop: 25 }}>Altri dati</Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  marginVertical: 5,
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                  <Icon name="clock" color="black" width={20} height={20} />
                  <Text style={styles.dataTitle}>Posti</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 13 }}>
                  <TouchableOpacity
                    style={styles.quantityIconCont}
                    onPress={() =>
                      dispatch({
                        type: 'set_details_seats',
                        payload: search.details.seats > 0 ? search.details.seats - 1 : 0,
                      })
                    }
                  >
                    <Text style={styles.quantityIcon}>-</Text>
                  </TouchableOpacity>
                  <Text style={{ width: 30, textAlign: 'center' }}>{search.details.seats}</Text>
                  <TouchableOpacity
                    style={styles.quantityIconCont}
                    onPress={() =>
                      dispatch({
                        type: 'set_details_seats',
                        payload: search.details.seats < 8 ? search.details.seats + 1 : 0,
                      })
                    }
                  >
                    <Text style={styles.quantityIcon}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  marginVertical: 5,
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                  <Icon name="clock" color="black" width={20} height={20} />
                  <Text style={styles.dataTitle}>Porte</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 13 }}>
                  <TouchableOpacity
                    style={styles.quantityIconCont}
                    onPress={() =>
                      dispatch({
                        type: 'set_details_doors',
                        payload: search.details.doors > 2 ? search.details.doors - 1 : 2,
                      })
                    }
                  >
                    <Text style={styles.quantityIcon}>-</Text>
                  </TouchableOpacity>
                  <Text style={{ width: 30, textAlign: 'center' }}>{search.details.doors}+</Text>
                  <TouchableOpacity
                    style={styles.quantityIconCont}
                    onPress={() =>
                      dispatch({
                        type: 'set_details_doors',
                        payload: search.details.doors < 6 ? search.details.doors + 1 : 2,
                      })
                    }
                  >
                    <Text style={styles.quantityIcon}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  marginVertical: 5,
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                  <Icon name="clock" color="black" width={20} height={20} />
                  <Text style={styles.dataTitle}>Marce</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 13 }}>
                  <TouchableOpacity
                    style={styles.quantityIconCont}
                    onPress={() =>
                      dispatch({
                        type: 'set_details_gears',
                        payload: search.details.gears > 1 ? search.details.gears - 1 : 1,
                      })
                    }
                  >
                    <Text style={styles.quantityIcon}>-</Text>
                  </TouchableOpacity>
                  <Text style={{ width: 30, textAlign: 'center' }}>{search.details.gears}+</Text>
                  <TouchableOpacity
                    style={styles.quantityIconCont}
                    onPress={() =>
                      dispatch({
                        type: 'set_details_gears',
                        payload: search.details.gears < 8 ? search.details.gears + 1 : 1,
                      })
                    }
                  >
                    <Text style={styles.quantityIcon}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </FilterComponent>

            <FilterComponent
              title="Veicoli con conducente"
              icon="distance"
              description="Servizio di noleggio con conducente incluso."
            >
              <TouchableOpacity
                style={[
                  styles.onlyVerifiedCont,
                  search.withDriver ? styles.onlyVerifiedContActive : {},
                ]}
                activeOpacity={1}
                onPress={() => dispatch({ type: 'set_with_driver', payload: !search.withDriver })}
              >
                <Text>Mostra solo veicoli con conducente</Text>
                <View
                  style={[
                    styles.verifiedCheck,
                    search.withDriver ? styles.verifiedCheckActive : {},
                  ]}
                >
                  {search.withDriver && <FontAwesome name="check" color="white" />}
                </View>
              </TouchableOpacity>
            </FilterComponent>
            <FilterComponentModal
              title={'Equipaggiamento'}
              icon="wheel"
              onClick={() => openStepModal('equipment')}
            />
            <FilterComponentModal
              title={'Servizi inclusi con il noleggio'}
              icon="services"
              onClick={() => openStepModal('services')}
            />
            <FilterComponentModal
              title={'Colore e interni'}
              icon="colors"
              onClick={() => openStepModal('interiors')}
            />
            <FilterComponentModal
              title={'Motore'}
              icon="engine"
              onClick={() => openStepModal('engine')}
            />
          </View>
        </ScrollView>

        <View style={[styles.fixedButtonsContainer]}>
          <TouchableOpacity style={styles.button} activeOpacity={0.95}>
            <Text style={styles.buttonText}>
              {modalKey == null ? 'Mostra risultati' : 'Conferma'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <MultiStepModalSheet
        ref={ref}
        pages={pages[page]}
        step={step}
        setStep={setStep}
        onClose={() => setStep('initial')}
      />
    </ModalSheetProvider>
  )
}

export default FilterSection

const styles = StyleSheet.create({
  tabContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 8,
    padding: 20,
    backgroundColor: 'white',
    width: '100%',
    height: 'auto',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: Colors.greySecondary,
    marginBottom: 5,
  },
  buttonStyle: {
    width: '100%',
    backgroundColor: 'black',
    color: 'white',
  },
  brandModel: {
    borderColor: Colors.greySecondary,
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  closeContainer: {
    padding: 3,
    borderRadius: 50,
    backgroundColor: Colors.greySecondary,
  },
  addBrandModel: {
    borderColor: Colors.greySecondary,
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  brandsModal: {
    flexDirection: 'column',
    gap: 5,
  },
  brandModelButton: {
    borderColor: 'white',
    borderWidth: 1,
    width: '100%',
    backgroundColor: 'white',
    padding: 10,
  },
  brandModelButtonActive: {
    borderColor: Colors.greenPrimary,
    borderWidth: 1,
    borderRadius: 10,
    color: Colors.greenPrimary,
  },
  radiusCont: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 5,
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.greySecondary,
    marginBottom: 10,
    padding: 5,
    borderRadius: 10,
    width: 100,
    paddingVertical: 10,
  },
  sliderContainer: {
    width: '100%',
    alignItems: 'center',
  },
  track: {
    backgroundColor: 'yellow',
  },
  selectedTrack: {
    backgroundColor: Colors.greenPrimary,
  },
  unselectedTrack: {
    backgroundColor: Colors.greySecondary,
  },
  marker: {
    height: 30,
    width: 30,
    backgroundColor: 'white',
    borderRadius: 30,
    borderWidth: 0.3,
    borderColor: Colors.greyPrimary,
  },
  priceInputContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceCont: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '40%',
  },
  priceContEnd: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: '40%',
  },
  labelPrice: {
    fontSize: 12,
    color: 'black',
  },
  inputDuration: {
    padding: 5,
    flex: 1,
    paddingVertical: 10,
    borderLeftWidth: 1,
    borderLeftColor: Colors.greySecondary,
    textAlign: 'right',
  },
  inputDurationCont: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: Colors.greySecondary,
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationLabel: {
    paddingRight: 12,
  },
  picker: {
    height: 50,
    width: 150,
  },
  onlyVerifiedCont: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.lightGray,
    padding: 10,
    paddingVertical: 14,
    borderRadius: 10,
  },
  onlyVerifiedContActive: {
    backgroundColor: 'rgba(0, 193, 92, 0.2)',
    borderColor: Colors.greenPrimary,
  },
  verifiedCheck: {
    width: 25,
    height: 25,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedCheckActive: {
    backgroundColor: Colors.greenPrimary,
  },
  advanceCont: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
  },
  anvanceInputCont: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.greySecondary,
    padding: 5,
    borderRadius: 10,
    width: '100%',
    paddingVertical: 10,
  },
  anvanceInput: {
    flex: 1,
    borderLeftColor: Colors.greyPrimary,
    borderLeftWidth: 1,
    textAlign: 'right',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  listButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderColor: Colors.greySecondary,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    gap: 10,
  },
  listButtonActive: {
    borderColor: Colors.greenPrimary,
    backgroundColor: 'rgba(0, 193, 92, 0.1)',
  },
  listButtonText: {
    fontWeight: '300',
    fontSize: 13,
  },
  quantityIcon: {
    fontSize: 20,
  },
  quantityIconCont: {
    height: 30,
    width: 30,
    borderWidth: 1,
    borderColor: Colors.greySecondary,
    borderRadius: 30,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dataTitle: {
    fontSize: 14,
  },
  fixedButtonsContainer: {
    position: 'absolute',
    bottom: 90,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 18,
    zIndex: 1,
    gap: 8,
  },
  button: {
    backgroundColor: 'rgba(0, 193, 92, 0.98)',
    padding: 12,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: '400',
  },
  optionalInput: {
    backgroundColor: Colors.lightGray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 10,
    borderRadius: 8,
  },
  option: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 1,
    height: 50,
  },
  optionsList: {
    paddingBottom: 170,
  },
  modalButtonsContainer: {
    position: 'absolute',
    bottom: 120,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    zIndex: 1,
    gap: 8,
  },
  modalButtonsContainer2: {
    position: 'absolute',
    bottom: -50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    zIndex: 1,
    gap: 8,
  },
  powerCont: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.lightGray,
    padding: 10,
    paddingVertical: 14,
    borderRadius: 10,
  },
  modalRowValue: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.blackPrimary,
  },
})

interface TabItem {
  label: string
  icon: IconName
  name: VehicleType
}

interface SearchParametersOLD {
  vehicleType: VehicleType
  brandModel: BrandModels[]
  minPrice: number
  maxPrice: number
  minMonths: number
  maxMonths: number
  cap: number
  radius: number
  onlyVerified: boolean
  noAdvancePayment: boolean
  noSecurityDeposit: boolean
  maxAdvance: number
  isNew: boolean
  noAnnualLimit: boolean
  annualLimit: number
  fuels: string[]
  transmissions: string[]
  bodies: string[]
  seats: number
  doors: number
  gears: number
  withDriver: boolean
  noAgeLimit: boolean
  minAge: number
  optionals: string[]
  maintenance: string[]
  insurances: string[]
  otherServices: string[]
  internalColors: string[]
  externalColors: string[]
  internalMaterials: string[]
  minPower: number
  maxPower: number
  traction: string[]
  emission: string[]
}

const initialSearchParameters: SearchParametersOLD = {
  vehicleType: 'car',
  brandModel: [],
  minPrice: 0,
  maxPrice: 1000,
  minMonths: 0,
  maxMonths: 24,
  radius: 1000,
  cap: 0,
  onlyVerified: false,
  noAdvancePayment: false,
  noSecurityDeposit: false,
  maxAdvance: 0,
  isNew: false,
  noAnnualLimit: false,
  annualLimit: 0,
  fuels: [] as Array<string>,
  transmissions: [] as Array<string>,
  bodies: [] as Array<string>,
  seats: 0,
  doors: 0,
  gears: 0,
  withDriver: false,
  noAgeLimit: false,
  minAge: 0,
  optionals: [] as string[],
  maintenance: [] as string[],
  insurances: [] as string[],
  otherServices: [] as string[],
  internalColors: [] as string[],
  externalColors: [] as string[],
  internalMaterials: [] as string[],
  minPower: 0,
  maxPower: 1000,
  traction: [] as string[],
  emission: [] as string[],
}

interface BrandModels {
  brand: string
  models: string[]
}

interface BrandModel {
  brand: string
  models: string
}

type VehicleType = 'car' | 'van' | 'motorcycle'

const servicesStyles = StyleSheet.create({
  titleContainer: { display: 'flex', gap: 2 },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  sectionSubTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.greyPrimary,
  },
  listContainer: {
    display: 'flex',
    width: '100%',
    paddingTop: 16,
  },
  listContainerEquiment: {
    display: 'flex',
    width: '100%',
  },
})

const interiorStyles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
  },
  item: {
    width: '100%',
    paddingVertical: 32,
    borderBottomWidth: 5,
    borderBottomColor: Colors.lightGray,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 16,
    fontWeight: '600',
  },
  listContainer: {
    width: '100%',
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 8,
  },
})

const engineStyles = StyleSheet.create({
  topContainer: {
    width: '100%',
    display: 'flex',
    gap: 16,
    paddingBottom: 32,
  },
  row: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  container: {
    display: 'flex',
    width: '100%',
    borderTopWidth: 5,
    borderTopColor: Colors.lightGray,
  },
  item: {
    width: '100%',
    paddingVertical: 32,
    borderBottomWidth: 5,
    borderBottomColor: Colors.lightGray,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  powerButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: Colors.greySecondary,
    flexGrow: 1,
    borderRadius: 8,
  },
  powerRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 8,
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    alignItems: 'flex-start',
    paddingTop: 8,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '600',
    paddingLeft: 24,
  },
  inputTitle: {
    fontSize: 14,
    fontWeight: '400',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.greySecondary,
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 8,
    width: 80,
    fontSize: 16,
  },
  sliderContainer: {
    width: '100%',
    alignItems: 'center',
  },
  listContainer: {
    display: 'flex',
    width: '100%',
  },
})

interface SelectableRowProps {
  checked: boolean
  onPress: () => void
  item: { label: string; value: string }
  children?: JSX.Element
}

const SelectableRow = ({ checked, item, children, onPress }: SelectableRowProps) => {
  return (
    <TouchableOpacity
      key={item.value}
      style={selectableRowStyle.actionContainer}
      onPress={() => {
        onPress()
        Haptics.selectionAsync()
      }}
    >
      {!!children ? children : <Text>{item.label}</Text>}
      {checked ? (
        <View style={selectableRowStyle.checkContainerFull}>
          <Icon name="check" color="#fff" />
        </View>
      ) : (
        <View style={selectableRowStyle.checkContainerEmpty}></View>
      )}
    </TouchableOpacity>
  )
}

const selectableRowStyle = StyleSheet.create({
  actionContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.tertiaryGray,
    paddingVertical: 12,
  },
  checkContainerFull: {
    width: 24,
    height: 24,
    borderRadius: 24,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.greenPrimary,
  },
  checkContainerEmpty: {
    width: 24,
    height: 24,
    borderRadius: 24,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.greySecondary,
  },
})
