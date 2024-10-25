import Svg, { Circle, SvgProps } from 'react-native-svg'

export const HorizontalDotsIcon = ({ ...props }: SvgProps) => {
    return (
        <Svg width="15" height="3" viewBox="0 0 15 3" fill="none" {...props}>
            <Circle cx="1.5" cy="1.5" r="1.5" fill="currentColor" />
            <Circle cx="7.5" cy="1.5" r="1.5" fill="currentColor" />
            <Circle cx="13.5" cy="1.5" r="1.5" fill="currentColor" />
        </Svg>
    )
}