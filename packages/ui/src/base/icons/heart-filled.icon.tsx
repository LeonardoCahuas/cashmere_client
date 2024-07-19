import Svg, { Path, SvgProps } from 'react-native-svg'

export const HeartFilledIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg width="22" height="22" viewBox="0 0 22 22" fill="none" {...props}>
      <Path
        d="M22 6.19209C22 10.8519 16.8945 15.619 11.0021 22C5.10554 15.619 0 10.8519 0 6.19209C0 2.18997 2.8414 0 5.75977 0C7.77376 0 9.82196 1.04484 11.0021 3.24881C12.1759 1.05184 14.2305 0.0116612 16.2488 0.0116612C19.1607 0.00932895 22 2.18064 22 6.19209Z"
        fill="currentColor"
      />
    </Svg>
  )
}
