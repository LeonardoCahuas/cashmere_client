import Svg, { Path, SvgProps } from 'react-native-svg'

export const ChevronRightIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg width="8" height="12" viewBox="0 0 8 12" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.25636 0.331044C-0.113099 0.741554 -0.0798206 1.37384 0.330689 1.7433L4.62234 5.60579L0.330689 9.46828C-0.0798206 9.83774 -0.113099 10.47 0.25636 10.8805C0.625819 11.291 1.25811 11.3243 1.66862 10.9549L6.78615 6.34908C6.99687 6.15944 7.11719 5.88928 7.11719 5.60579C7.11719 5.3223 6.99687 5.05214 6.78615 4.8625L1.66862 0.256714C1.25811 -0.112745 0.625819 -0.0794662 0.25636 0.331044Z"
        fill="currentColor"
      />
    </Svg>
  )
}
