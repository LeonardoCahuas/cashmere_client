import { ModalSheetProvider, useModalSheetRef } from 'apps/expo/app/components/ModalSheet'
import { ModalSheet } from 'apps/expo/app/components/ModalSheet/ModalSheet'
import { MultiStepModalSheet } from 'apps/expo/app/components/ModalSheet/MultiStepModalSheet'
import { useAppStore } from 'apps/expo/app/setup/store'
import { router } from 'expo-router'
import { useState } from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { DynamicModalProps } from '../../_components/DynamicModal'
import { AddModalKey, InputObject, ModalInput, ModalInputProps } from '../../_components/ModalInput'
import { Section } from '../../_components/Section'
import { TextInput } from '../../_components/TextInput'
import { StateButtons } from './StateButton'
import { VehiclePageLayout } from './VehiclePageLayout'

const bodyTypes = [
  { label: 'City Car', value: 'city_car' },
  { label: 'Berlina', value: 'sedan' },
  { label: 'Station Wagon', value: 'station_wagon' },
  { label: 'Coupe', value: 'coupe' },
  { label: 'Cabrio', value: 'cabrio' },
]

const bodyTypeValueMap = bodyTypes.reduce((acc, curr) => ({ ...acc, [curr.value]: curr.label }), {})

const colors = [
  { label: 'Bianco', value: 'white' },
  { label: 'Grigrio', value: 'grey' },
  { label: 'Nero', value: 'black' },
  { label: 'Giallo', value: 'yellow' },
  { label: 'Verde', value: 'green' },
]

const colorValueMap = colors.reduce((acc, curr) => ({ ...acc, [curr.value]: curr.label }), {})

const materials = [
  { label: 'Stoffa', value: 'cloth' },
  { label: 'Alcantara', value: 'alcantara' },
  { label: 'Pelle Totale', value: 'full leather' },
  { label: 'Pelle Parziale', value: 'partial leather' },
  { label: 'Pelle Scamosciata', value: 'suede leather' },
  { label: 'Altro', value: 'other' },
]

const materialsMap = materials.reduce((acc, curr) => ({ ...acc, [curr.value]: curr.label }), {})

const fuelTypes = [
  { label: 'Benzina', value: 'petrol' },
  { label: 'Diesel', value: 'diesel' },
  { label: 'Elettrico', value: 'electric' },
  { label: 'GPL', value: 'lpg' },
  { label: 'Metano', value: 'methane' },
  { label: 'Idrogeno', value: 'hydrogen' },
  { label: 'Ibrida', value: 'hybrid' },
  { label: 'Ibrida Diesel/Elettrico', value: 'hybrid-diesel/electric' },
  { label: 'Altro', value: 'other' },
]

const fuelTypeMap = fuelTypes.reduce((acc, curr) => ({ ...acc, [curr.value]: curr.label }), {})

const pollutionClasses = [
  { label: 'Euro 1', value: 'euro_1' },
  { label: 'Euro 2', value: 'euro_2' },
  { label: 'Euro 3', value: 'euro_3' },
  { label: 'Euro 4', value: 'euro_4' },
  { label: 'Euro 5', value: 'euro_5' },
  { label: 'Euro 6', value: 'euro_6' },
  { label: 'Altro', value: 'other' },
]

const pollutionClassesMap = pollutionClasses.reduce(
  (acc, curr) => ({ ...acc, [curr.value]: curr.label }),
  {}
)

const traction = [
  { label: '4x4', value: 'full-wheel' },
  { label: 'Anteriore', value: 'front-wheel' },
  { label: 'Posteriore', value: 'rear-wheel' },
]

const tractionMap = traction.reduce((acc, curr) => ({ ...acc, [curr.value]: curr.label }), {})

const transmissionTypes = [
  { label: 'Automatico', value: 'automatic' },
  { label: 'Manuale', value: 'manual' },
  { label: 'Semi Automatico', value: 'semi-automatic' },
  { label: 'Altro', value: 'other' },
]

const transmissionMap = transmissionTypes.reduce(
  (acc, curr) => ({ ...acc, [curr.value]: curr.label }),
  {}
)

const gears = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '7', value: '7' },
]

const gearsMap = gears.reduce((acc, curr) => ({ ...acc, [curr.value]: curr.label }), {})

interface SectionData {
  inputs: Array<Omit<ModalInputProps, 'index' | 'mapKey'> & DynamicModalProps>
  key: AddModalKey
  [key: string]: any
}

const Vehicle = () => {
  const { posting, setPosting, setVehicle } = useAppStore((s) => s.add)
  const ref = useModalSheetRef()
  const [step, setStep] = useState('initial')
  const [config, setConfig] = useState<{
    key: AddModalKey
    type: 'single' | 'multi'
    input: number
  }>({
    key: 'main_details',
    type: 'multi',
    input: 0,
  })

  const openModal = ({ mapKey, type, index }: InputObject) => {
    setConfig({ key: mapKey, type, input: index })
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ref.current?.expand()
      })
    })
  }

  const closeModal = () => {
    ref.current?.close()
    setTimeout(() => setStep('initial'), 100)
  }

  const main_details: SectionData = {
    key: 'main_details',
    inputs: [
      {
        title: 'Marca e modello',
        placeholder: 'Seleziona marca e modello',
        onPress: (n) => openModal(n),
        type: 'multi',
        value: `${posting?.brand && posting?.model ? posting?.brand + ' ' + posting?.model : ''}`,
        content: {
          pages: {
            initial: {
              key: 'initial',
              title: 'Seleziona marca e modello',
              content: (
                <View>
                  {[
                    { label: 'Abarth', value: 'abarth', icon: 'car' },
                    { label: 'Alfa Romeo', value: 'alfa_romeo', icon: 'car' },
                    { label: 'Altro', value: 'altro', icon: 'car' },
                  ].map((item) => (
                    <TouchableOpacity
                      key={item.value}
                      onPress={() => {
                        setPosting({ brand: item.value })
                        setStep(item.value)
                      }}
                    >
                      <Text>{item.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ),
            },
            abarth: {
              key: 'abarth',
              title: 'Abarth',
              content: (
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      setPosting({ model: '500' })
                      closeModal()
                    }}
                  >
                    <Text>{'Abarth'}</Text>
                  </TouchableOpacity>
                </View>
              ),
            },
          },
          step: 'initial',
          setStep: (s) => {
            console.log(s)
          },
        },
      },
      {
        title: 'Posizione',
        placeholder: 'Seleziona marca e modello',
        note: 'Seleziona l’area geografica in cui vuoi noleggiare il tuo veicolo.',
        onPress: (n) => {
          openModal(n)
        },
        type: 'single',
        value: posting?.pickup_location_plain,
        content: {
          title: 'Posizione',
          options: [
            {
              label: 'Milano',
              action: () => {
                console.log('Milano')
                closeModal()
              },
            },
          ],
        },
      },
    ],
  }

  const vehicle_state: SectionData = {
    key: 'vehicle_state',
    inputs: [
      {
        title: 'Anno di immatricolazione',
        placeholder: 'Anno di immatricolazione del veicolo',
        onPress: (n) => openModal(n),
        type: 'single',
        value: posting?.vehicle?.year,
        content: {
          title: 'Anno di immatricolazione',
          options: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'].map(
            (year) => ({
              label: year,
              action: () => {
                setVehicle({ year })
                closeModal()
              },
            })
          ),
        },
      },
    ],
    states: [
      { label: 'Nuovo', value: 'new' },
      { label: 'Usato', value: 'used' },
    ],
  }

  const vehicle_features: SectionData = {
    key: 'vehicle_features',
    inputs: [
      {
        title: 'Carrozzeria',
        placeholder: 'Tipo di carrozzeria del veicolo',
        onPress: (n) => openModal(n),
        type: 'single',
        value: posting?.vehicle?.body_type ? bodyTypeValueMap[posting?.vehicle?.body_type] : '',
        content: {
          title: 'Carrozzeria',
          options: bodyTypes.map(({ label, value }) => ({
            label,
            action: () => {
              setVehicle({ body_type: value })
              closeModal()
            },
          })),
        },
      },
      {
        title: 'Posti',
        placeholder: 'Numero di posti',
        onPress: (n) => openModal(n),
        type: 'single',
        value: posting?.vehicle?.seats,
        content: {
          title: 'Posti',
          options: [
            { label: '2', value: 2 },
            { label: '3', value: 3 },
            { label: '4', value: 4 },
            { label: '5', value: 5 },
            { label: '6', value: 6 },
            { label: '7', value: 7 },
            { label: '8', value: 8 },
            { label: '9', value: 9 },
            { label: '10', value: 10 },
          ].map(({ label, value }) => ({
            label,
            action: () => {
              setVehicle({ seats: value.toString() })
              closeModal()
            },
          })),
        },
      },
      {
        title: 'Porte',
        placeholder: 'Numero di porte',
        onPress: (n) => openModal(n),
        type: 'single',
        value: posting?.vehicle?.doors,
        content: {
          title: 'Porte',
          options: [
            { label: '2/3', value: '2/3' },
            { label: '4/5', value: '4/5' },
            { label: '6/7', value: '6/7' },
            { label: '8/9', value: '8/9' },
          ].map(({ label, value }) => ({
            label,
            action: () => {
              setVehicle({ doors: value })
              closeModal()
            },
          })),
        },
      },
      {
        title: 'Colore esterni',
        placeholder: 'Colore degli esterni',
        onPress: (n) => openModal(n),
        type: 'single',
        value: posting?.vehicle?.exterior_color
          ? colorValueMap[posting?.vehicle?.exterior_color]
          : '',
        content: {
          title: 'Colore esterni',
          options: [].map(({ label, value }) => ({
            label,
            action: () => {
              setVehicle({ exterior_color: value })
              closeModal()
            },
          })),
        },
      },
      {
        title: 'Colore interni',
        placeholder: 'Colore degli interni',
        onPress: (n) => openModal(n),
        type: 'single',
        value: posting?.vehicle?.interior_color
          ? colorValueMap[posting?.vehicle?.interior_color]
          : '',
        content: {
          title: 'Colore interni',
          options: colors.map(({ label, value }) => ({
            label,
            action: () => {
              setVehicle({ interior_color: value })
              closeModal()
            },
          })),
        },
      },
      {
        title: 'Materiale interni',
        placeholder: 'Materiale interni',
        onPress: (n) => openModal(n),
        type: 'single',
        value: posting?.vehicle?.interior_material
          ? materialsMap[posting?.vehicle?.interior_material]
          : '',
        content: {
          title: 'Materiale interni',
          options: materials.map(({ label, value }) => ({
            label,
            action: () => {
              setVehicle({ interior_material: value })
              closeModal()
            },
          })),
        },
      },
    ],
  }

  const engine: SectionData = {
    key: 'engine',
    inputs: [
      {
        title: 'Alimentazione',
        placeholder: 'Tipo di motore',
        onPress: (n) => openModal(n),
        type: 'single',
        value: posting?.fuel_type ? fuelTypeMap[posting?.fuel_type] : '',
        content: {
          title: 'Alimentazione',
          options: fuelTypes.map(({ label, value }) => ({
            label,
            action: () => {
              setPosting({ fuel_type: value })
              closeModal()
            },
          })),
        },
      },
      {
        title: 'Classe inquinamento',
        placeholder: 'Classe ambientale del veicolo',
        note: 'Indica la classe ambientale del veicolo (Categoria Euro)',
        onPress: (n) => openModal(n),
        type: 'single',
        value: posting?.vehicle?.pollution_class
          ? pollutionClassesMap[posting?.vehicle?.pollution_class]
          : '',
        content: {
          title: 'Classe inquinamento',
          options: pollutionClasses.map(({ label, value }) => ({
            label,
            action: () => {
              setVehicle({ pollution_class: value })
              closeModal()
            },
          })),
        },
      },
      {
        title: 'Trazione',
        placeholder: 'Tipologia di trazione',
        onPress: (n) => openModal(n),
        type: 'single',
        value: posting?.vehicle?.traction ? tractionMap[posting?.vehicle?.traction] : '',
        content: {
          title: 'Trazione',
          options: traction.map(({ label, value }) => ({
            label,
            action: () => {
              setVehicle({ traction: value })
              closeModal()
            },
          })),
        },
      },
      {
        title: 'Cambio',
        placeholder: 'Tipo di cambio',
        onPress: (n) => openModal(n),
        type: 'single',
        value: posting.vehicle?.transmission_type
          ? transmissionMap[posting?.vehicle?.transmission_type]
          : '',
        content: {
          title: 'Cambio',
          options: transmissionTypes.map(({ label, value }) => ({
            label,
            action: () => {
              setVehicle({ transmission_type: value })
              closeModal()
            },
          })),
        },
      },
      {
        title: 'Marce',
        placeholder: 'Numero marce',
        onPress: (n) => openModal(n),
        type: 'single',
        value: posting?.vehicle?.gears ? gearsMap[posting?.vehicle?.gears] : '',
        content: {
          title: 'Marce',
          options: transmissionTypes.map(({ label, value }) => ({
            label,
            action: () => {
              setVehicle({ gears: value })
              closeModal()
            },
          })),
        },
      },
    ],
  }

  const equipment: SectionData = {
    key: 'equipment',
    inputs: [],
  }

  const sections: Record<AddModalKey, SectionData> = {
    main_details,
    vehicle_state,
    vehicle_features,
    engine,
    equipment,
  }

  return (
    <ModalSheetProvider>
      <VehiclePageLayout onButtonPress={() => router.push('screens/AddPostingView/services')}>
        <TouchableOpacity
          style={{ width: '100%', height: 40, backgroundColor: '#ededed' }}
          onPress={() => {
            console.log(posting)
          }}
        ></TouchableOpacity>
        <Section
          title="Dati principali"
          subtitle="Inserisci i dati principali del veicolo*"
          icon="coupe"
        >
          {main_details.inputs.map((input, i) => (
            <ModalInput key={input.title} {...input} index={i} mapKey={main_details.key} />
          ))}
        </Section>

        <Section title="Stato veicolo" subtitle="Comunica lo stato del veicolo*" icon="status">
          <StateButtons
            selected={posting?.state}
            items={vehicle_state.states}
            onPress={(state) => setPosting({ ...posting, state })}
          />
          {vehicle_state.inputs.map((input, i) => (
            <ModalInput key={input.title} {...input} index={i} mapKey={vehicle_state.key} />
          ))}
          <TextInput
            value={posting?.distance_limit_in_km ?? ''}
            onChange={(km) => setPosting({ distance_limit_in_km: km })}
            title="Kilometraggio"
            placeholder="Inserisci kilometraggio"
            note="Inserisci il numero di kilometri percorsi del veicolo, assicurandoti che siano autentici."
          />
        </Section>

        <Section
          title="Caratteristiche"
          subtitle="Inserisci le varie caratteristiche del veicolo"
          icon="door"
        >
          {vehicle_features.inputs.map((input, i) => (
            <ModalInput key={input.title} {...input} index={i} mapKey={vehicle_features.key} />
          ))}
        </Section>

        <Section title="Motore" subtitle="Indica i dettagli sul motore del veicolo" icon="engine">
          {engine.inputs.map((input, i) => (
            <ModalInput key={input.title} {...input} index={i} mapKey={engine.key} />
          ))}
        </Section>
      </VehiclePageLayout>
      {config.type === 'single' && (
        <ModalSheet ref={ref} {...sections[config.key].inputs[config.input].content} />
      )}
      {config.type === 'multi' && (
        // @ts-ignore
        <MultiStepModalSheet
          ref={ref}
          {...sections[config.key].inputs[config.input].content}
          step={step}
          setStep={setStep}
        />
      )}
    </ModalSheetProvider>
  )
}

export default Vehicle
