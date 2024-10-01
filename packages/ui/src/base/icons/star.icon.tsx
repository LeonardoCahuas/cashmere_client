import Svg, { Path, SvgProps } from 'react-native-svg'

export const StarIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg width="9" height="9" viewBox="0 0 9 9" fill="none" {...props}>
      <Path
        d="M4.5597 0L5.99893 2.77714L8.89623 3.39304L6.88842 5.7253L7.23983 8.88308L4.5597 7.54736L1.87958 8.88308L2.23098 5.7253L0.223168 3.39304L3.12047 2.77714L4.5597 0Z"
        fill="currentColor"
      />
    </Svg>
  )
}
