import { cva, VariantProps } from 'class-variance-authority'
import { JSX } from 'react'

export enum Variant {
  neutral = 'neutral',
  success = 'success',
  danger = 'danger',
}

export enum Level {
  primary = 'primary',
  secondary = 'secondary',
  tertiary = 'tertiary',
}

const button = cva(
  'flex justify-center items-center px-4 py-2 border rounded-full text-siva-main-text cursor-pointer gap-2',
  {
    variants: {
      variant: {
        success: '',
        neutral: 'bg-siva-main-text fill-white',
        danger: '',
      },
      level: {
        primary: 'border-solid',
        secondary: 'border-solid',
        tertiary: 'border-none',
      },
    },
    compoundVariants: [
      {
        variant: 'success',
        level: 'primary',
        class: 'bg-siva-primary-green border-siva-primary-green text-white fill-white',
      },
      {
        variant: 'success',
        level: 'secondary',
        class:
          'bg-siva-light-green border-siva-light-green text-siva-primary-green fill-siva-primary-green',
      },
      {
        variant: 'success',
        level: 'tertiary',
        class:
          'bg-siva-light-green border-siva-light-green text-siva-primary-green fill-siva-primary-green',
      },
      {
        variant: 'neutral',
        level: 'primary',
        class: 'text-white border-siva-main-text',
      },
      {
        variant: 'neutral',
        level: 'secondary',
        className: 'bg-white text-siva-main-text border-siva-dark-gray',
      },
      {
        variant: 'neutral',
        level: 'tertiary',
        class: '',
      },
    ],
  }
)

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>,
    VariantProps<typeof button> {}

interface PillButtonProps {
  label?: string | JSX.Element
  icon?: JSX.Element
  variant: Variant
  level?: Level
  onClick?: () => void
}

export const PillButton = ({
  label,
  icon,
  variant,
  level = Level.tertiary,
  onClick,
}: PillButtonProps) => {
  return (
    <button className={button({ variant, level })} onClick={onClick}>
      <div className="fill-inherit">{icon}</div>
      {typeof label === 'string' && <p className="text-sm font-medium text-inherit">{label}</p>}
      {typeof label !== 'string' && label}
    </button>
  )
}
