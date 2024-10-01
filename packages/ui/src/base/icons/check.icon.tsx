import Svg, { Path, SvgProps } from 'react-native-svg'

export const CheckmarkIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg width="13" height="9" viewBox="0 0 13 9" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.1941 0.369475C12.5775 0.752898 12.5775 1.37455 12.1941 1.75798L5.82142 8.13067C5.438 8.51409 4.81635 8.5141 4.43292 8.13067L0.996556 4.69435C0.61313 4.31093 0.613127 3.68927 0.996548 3.30585C1.37997 2.92242 2.00162 2.92242 2.38505 3.30584L5.12716 6.04792L10.8056 0.369479C11.189 -0.0139459 11.8106 -0.0139477 12.1941 0.369475Z"
        fill="currentColor"
      />
    </Svg>
  )
}
