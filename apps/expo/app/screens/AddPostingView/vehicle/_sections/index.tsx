import { ModalSheetProvider, useModalSheetRef } from 'apps/expo/app/components/ModalSheet'
import { ModalSheet } from 'apps/expo/app/components/ModalSheet/ModalSheet'
import { MultiStepModalSheet } from 'apps/expo/app/components/ModalSheet/MultiStepModalSheet'
import { router } from 'expo-router'
import { ComponentProps, useState } from 'react'
import { Text, View } from 'react-native'
import { DynamicModalProps } from '../../_components/DynamicModal'
import { InputObject, ModalInput, ModalInputProps } from '../../_components/ModalInput'
import { Section } from '../../_components/Section'
import { VehiclePageLayout } from './VehiclePageLayout'

interface SectionProps extends ComponentProps<typeof Section> {
  inputs: Array<Omit<ModalInputProps, 'index' | 'mapKey'> & DynamicModalProps>
}

interface SectionData {
  index: number
  inputs: Array<Omit<ModalInputProps, 'index' | 'mapKey'> & DynamicModalProps>
}

const Vehicle = () => {
  const ref = useModalSheetRef()
  const ref2 = useModalSheetRef()
  const [input, setInput] = useState(0)
  const [key, setKey] = useState<string>('main_details')
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

  const sections: Record<string, SectionProps> = {
    main_details: {
      title: 'Dati principali',
      subtitle: 'Inserisci i dati principali del veicolo*',
      icon: 'coupe',
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
    },
  }

  const main_details: SectionData = {
    index: 0,
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
    index: 1,
    inputs: [
      {
        title: 'Anno di immatricolazione',
        placeholder: 'Anno di immatricolazione del veicolo',
        note: 'Seleziona l’area geografica in cui vuoi noleggiare il tuo veicolo.',
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
            <ModalInput key={input.title} {...input} index={main_details.index + i} mapKey={key} />
          ))}
        </Section>

        <Section title="Stato veicolo" subtitle="Comunica lo stato del veicolo*" icon="status">
          {vehicle_state.inputs.map((input, i) => (
            <ModalInput key={input.title} {...input} index={vehicle_state.index + i} mapKey={key} />
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
