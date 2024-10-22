import { ModalSheetProvider, useModalSheetRef } from 'apps/expo/app/components/ModalSheet'
import { ModalSheet } from 'apps/expo/app/components/ModalSheet/ModalSheet'
import { MultiStepModalSheet } from 'apps/expo/app/components/ModalSheet/MultiStepModalSheet'
import { useAppStore } from 'apps/expo/app/setup/store'
import { router } from 'expo-router'
import { useState } from 'react'
import { Text, View } from 'react-native'
import { DynamicModalProps } from '../../_components/DynamicModal'
import { AddModalKey, InputObject, ModalInput, ModalInputProps } from '../../_components/ModalInput'
import { Section } from '../../_components/Section'
import { TextInput } from '../../_components/TextInput'
import { StateButtons } from './StateButton'
import { VehiclePageLayout } from './VehiclePageLayout'

interface SectionData {
  inputs: Array<Omit<ModalInputProps, 'index' | 'mapKey'> & DynamicModalProps>
  key: AddModalKey
  [key: string]: any
}

const Vehicle = () => {
  const { posting, setPosting, setVehicle } = useAppStore((s) => s.add)
  const ref = useModalSheetRef()
  const ref2 = useModalSheetRef()
  const [input, setInput] = useState(0)
  const [key, setKey] = useState<AddModalKey>('main_details')
  const [type, setType] = useState<'single' | 'multi'>('single')

  const openModal = ({ mapKey, type, index }: InputObject) => {
    setKey(mapKey)
    setType(type)
    setInput(index)
    if (type === 'single') {
      ref2.current?.close()
      ref.current?.expand()
    } else {
      ref.current?.close()
      setTimeout(() => ref2.current?.expand(), 65)
    }
  }

  const closeModal = () => {
    ref.current?.close()
  }

  const main_details: SectionData = {
    key: 'main_details',
    inputs: [
      {
        title: 'Marca e modello',
        placeholder: 'Seleziona marca e modello',
        onPress: (n) => {
          openModal(n)
        },
        type: 'multi',
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
                    <Text>{item.label}</Text>
                  ))}
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
        content: {
          title: 'Posizione',
          options: [
            {
              label: 'Abarth',
              action: () => {
                console.log('abarth')
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
        onPress: (n) => {
          openModal(n)
        },
        type: 'single',
        content: {
          title: 'Anno di immatricolazione',
          options: [
            {
              label: '2024',
              action: () => {
                console.log('2024')
                closeModal()
              },
            },
          ],
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
        content: {
          title: 'Carrozzeria',
          options: [
            { label: 'City Car', value: 'city_car' },
            { label: 'Berlina', value: 'sedan' },
            { label: 'Station Wagon', value: 'station_wagon' },
            { label: 'Coupe', value: 'coupe' },
            { label: 'Cabrio', value: 'cabrio' },
          ].map(({ label, value }) => ({
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
              setVehicle({ seats: value })
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
        content: {
          title: 'Colore esterni',
          options: [
            { label: 'Bianco', value: 'white' },
            { label: 'Grigrio', value: 'grey' },
            { label: 'Nero', value: 'black' },
            { label: 'Giallo', value: 'yellow' },
            { label: 'Verde', value: 'green' },
          ].map(({ label, value }) => ({
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
        content: {
          title: 'Colore interni',
          options: [
            { label: 'Bianco', value: 'white' },
            { label: 'Grigrio', value: 'grey' },
            { label: 'Nero', value: 'black' },
            { label: 'Giallo', value: 'yellow' },
            { label: 'Verde', value: 'green' },
          ].map(({ label, value }) => ({
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
        content: {
          title: 'Materiale interni',
          options: [
            { label: 'Stoffa', value: 'cloth' },
            { label: 'Alcantara', value: 'alcantara' },
            { label: 'Pelle Totale', value: 'full leather' },
            { label: 'Pelle Parziale', value: 'partial leather' },
            { label: 'Pelle Scamosciata', value: 'suede leather' },
            { label: 'Altro', value: 'other' },
          ].map(({ label, value }) => ({
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

  const sections: Record<AddModalKey, SectionData> = {
    main_details,
    vehicle_state,
    vehicle_features,
  }

  return (
    <ModalSheetProvider>
      <VehiclePageLayout onButtonPress={() => router.push('screens/AddPostingView/services')}>
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
            value=""
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
      </VehiclePageLayout>
      <ModalSheet ref={ref} {...sections[key].inputs[input].content} />
      {type === 'multi' && (
        // @ts-ignore
        <MultiStepModalSheet ref={ref2} {...sections[key].inputs[input].content} />
      )}
    </ModalSheetProvider>
  )
}

export default Vehicle
