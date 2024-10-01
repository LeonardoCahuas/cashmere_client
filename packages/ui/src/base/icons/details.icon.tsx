import { ClipPath, Defs, G, Path, Rect, Svg, SvgProps } from 'react-native-svg'

const DetailsIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <G clipPath="url(#clip0_1094_6461)">
        <Path
          d="M2.5 0C1.12 0 0 1.12 0 2.5V17.5C0 18.88 1.12 20 2.5 20H17.5C18.88 20 20 18.88 20 17.5V2.5C20 1.12 18.88 0 17.5 0H2.5ZM2.5 1.5H17.5C17.78 1.5 18 1.72 18 2V17C18 17.28 17.78 17.5 17.5 17.5H2.5C2.22 17.5 2 17.28 2 17V2C2 1.72 2.22 1.5 2.5 1.5ZM5 4H15V6H5V4ZM5 8H15V10H5V8ZM5 12H15V14H5V12ZM5 16H15V18H5V16Z"
          fill="currentColor"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1094_6461">
          <Rect width="20" height="20" fill="currentColor" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default DetailsIcon
