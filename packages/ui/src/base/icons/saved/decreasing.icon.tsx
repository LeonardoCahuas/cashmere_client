import Svg, { Path, SvgProps } from 'react-native-svg'

export const DecreasingIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg width="26" height="17" viewBox="0 0 26 17" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 1.46006C0 0.68686 0.626801 0.0600586 1.4 0.0600586H23.8C24.5732 0.0600586 25.2 0.68686 25.2 1.46006V5.66006C25.2 6.43326 24.5732 7.06006 23.8 7.06006H1.4C0.626801 7.06006 0 6.43326 0 5.66006V1.46006ZM1.4 1.46006H23.8V5.66006H1.4L1.4 1.46006Z"
        fill="currentColor"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 11.2601C0 10.4869 0.626801 9.86011 1.4 9.86011H12.6C13.3732 9.86011 14 10.4869 14 11.2601V15.4601C14 16.2333 13.3732 16.8601 12.6 16.8601H1.4C0.626801 16.8601 0 16.2333 0 15.4601V11.2601ZM1.4 11.2601H12.6V15.4601H1.4L1.4 11.2601Z"
        fill="currentColor"
      />
    </Svg>
  )
}
