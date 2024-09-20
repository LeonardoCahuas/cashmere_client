import Svg, { Path, SvgProps } from 'react-native-svg'

export const IncreasingIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg width="26" height="17" viewBox="0 0 26 17" fill="none" {...props}>
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0 1.4C0 0.626801 0.626801 0 1.4 0H12.6C13.3732 0 14 0.626801 14 1.4V5.6C14 6.3732 13.3732 7 12.6 7H1.4C0.626801 7 0 6.3732 0 5.6V1.4ZM1.4 1.4H12.6V5.6H1.4L1.4 1.4Z"
        fill="currentColor"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0 11.2C0 10.4269 0.626801 9.80005 1.4 9.80005H23.8C24.5732 9.80005 25.2 10.4269 25.2 11.2V15.4C25.2 16.1732 24.5732 16.8 23.8 16.8H1.4C0.626801 16.8 0 16.1732 0 15.4V11.2ZM1.4 15.4L1.4 11.2H23.8V15.4H1.4Z"
        fill="currentColor"
      />
    </Svg>
  )
}
