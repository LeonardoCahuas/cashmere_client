import { ReactNode } from 'react'
import { ModalInput, ModalInputProps } from './ModalInput'

export type SectionComponentProps =
  | {
      type: 'wildcard'
      content: ReactNode
    }
  | {
      type: 'modal'
      content: Array<Omit<ModalInputProps, 'index' | 'mapKey'>>
    }

export const SectionComponent = ({ type, content }: SectionComponentProps) => {
  if (type === 'wildcard') {
    return content
  }
  return <ModalInput title={''} mapKey={''} index={0} type={'single'} {...content} />
}

/* 

state: {
      title: 'Stato veicolo',
      subtitile: 'Comunica lo stato del veicolo*',
      icon: 'status',
      inputs: [],
    },

*/
