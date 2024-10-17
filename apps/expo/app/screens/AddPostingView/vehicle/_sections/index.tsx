import { ModalSheetProvider, useModalSheetRef } from 'apps/expo/app/components/ModalSheet'
import { router } from 'expo-router'
import { ComponentProps, useState } from 'react'
import { DynamicModal, DynamicModalProps } from '../../_components/DynamicModal'
import { ModalInput, ModalInputProps } from '../../_components/ModalInput'
import { PageLayout } from '../../_components/PageLayout'
import { Section } from '../../_components/Section'

interface SectionPropsBase extends ComponentProps<typeof Section> {
  inputs: Array<ModalInputProps>
}

type SectionProps = SectionPropsBase & DynamicModalProps

const Vehicle = () => {
  const ref = useModalSheetRef()
  const [sel, setSel] = useState<SectionProps | null>(null)

  const sections: Array<SectionProps> = [
    {
      title: 'Dati principali',
      subtitile: 'Inserisci i dati principali del veicolo*',
      icon: 'coupe',
      inputs: [
        {
          title: 'Marca e modello',
          placeholder: 'Seleziona marca e modello',
          note: 'Seleziona l’area geografica in cui vuoi noleggiare il tuo veicolo.',
          onPress: () => {},
        },
      ],
      type: 'single',
      content: {
        title: 'Dettaglio veicolo',
        options: [],
      },
    },
  ]

  return (
    <ModalSheetProvider>
      <PageLayout onButtonPress={() => router.push('screens/AddPostingView/services')}>
        {sections.map((section) => (
          <Section key={section.title} {...section}>
            {section.inputs.map((input) => (
              <ModalInput key={input.title} {...input} />
            ))}
          </Section>
        ))}
      </PageLayout>
      <DynamicModal ref={ref} type="single" content={{ title: 'Dettaglio veicolo' }} />
    </ModalSheetProvider>
  )
}

export default Vehicle
