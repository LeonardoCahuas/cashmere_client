import Svg, { Path, SvgProps } from 'react-native-svg'

export const IncreasingIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg width="26" height="17" viewBox="0 0 26 17" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 1.66001C0 0.886811 0.626801 0.26001 1.4 0.26001H12.6C13.3732 0.26001 14 0.886811 14 1.66001V5.86001C14 6.63321 13.3732 7.26001 12.6 7.26001H1.4C0.626801 7.26001 0 6.63321 0 5.86001V1.66001ZM1.4 1.66001H12.6V5.86001H1.4L1.4 1.66001Z"
        fill="currentColor"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 11.4601C0 10.6869 0.626801 10.0601 1.4 10.0601H23.8C24.5732 10.0601 25.2 10.6869 25.2 11.4601V15.6601C25.2 16.4333 24.5732 17.0601 23.8 17.0601H1.4C0.626801 17.0601 0 16.4333 0 15.6601V11.4601ZM1.4 15.6601L1.4 11.4601H23.8V15.6601H1.4Z"
        fill="currentColor"
      />
    </Svg>
  )
}
