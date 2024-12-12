import { css, cva } from '../../styled-system/css'

export enum Variant {
  neutral = 'neutral',
  success = 'success',
  danger = 'danger',
}

export enum Fill {
  solid = 'solid',
  outline = 'outline',
  none = 'none',
}

interface PillButtonProps {
  label?: string | JSX.Element
  icon?: JSX.Element
  variant: Variant
  fill?: Fill
  onClick?: () => void
}

const button = cva({
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingX: '4',
    paddingY: '2',
    borderWidth: '1px',
    borderRadius: 'full',
    color: 'main-text',
    cursor: 'pointer',
    gap: '2',
  },
  variants: {
    variant: {
      success: {
        background: 'primary-green',
        color: 'white',
        fill: 'white',
      },
      neutral: {
        background: 'main-text',
        color: 'white',
        fill: 'white',
      },
      danger: {},
    },
    fill: {
      solid: {
        borderStyle: 'solid',
      },
      outline: {
        borderStyle: 'solid',
      },
      none: {
        borderStyle: 'none',
      },
    },
  },
  compoundVariants: [
    {
      variant: 'success',
      fill: 'solid',
      css: {},
    },
    {
      variant: 'success',
      fill: 'outline',
      css: {
        background: 'light-green',
        color: 'primary-green',
        fill: 'primary-green',
        borderColor: 'primary-green',
      },
    },
    {
      variant: 'success',
      fill: 'none',
      css: { background: 'light-green', color: 'primary-green', fill: 'primary-green' },
    },
    {
      variant: 'neutral',
      fill: 'solid',
      css: {},
    },
    {
      variant: 'neutral',
      fill: 'outline',
      css: {
        background: 'white',
        color: 'main-text',
        fill: 'main-text',
        borderColor: 'dark-gray',
      },
    },
    {
      variant: 'neutral',
      fill: 'none',
      css: {},
    },
  ],
})

export const PillButton = ({
  label,
  icon,
  variant,
  fill = Fill.none,
  onClick,
}: PillButtonProps) => {
  return (
    <button className={button({ variant, fill })} onClick={onClick}>
      <div className={css({ fill: 'inherit' })}>{icon}</div>
      {typeof label === 'string' && (
        <p className={css({ fontSize: 'sm', fontWeight: 'medium', color: 'inherit' })}>{label}</p>
      )}
      {typeof label !== 'string' && label}
    </button>
  )
}
