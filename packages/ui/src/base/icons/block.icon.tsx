
import Svg, {  Path, SvgProps } from 'react-native-svg'

export const BlockIcon = ({ ...props }: SvgProps) => {
    return (
        <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props} >
            <Path d="M9.8 0C4.4 0 0 4.4 0 9.8C0 15.2 4.4 19.6 9.8 19.6C15.2 19.6 19.6 15.2 19.6 9.8C19.6 4.4 15.2 0 9.8 0ZM9.8 18C5.3 18 1.6 14.3 1.6 9.8C1.6 7.8 2.3 6 3.5 4.5L15.1 16.1C13.6 17.3 11.8 18 9.8 18ZM16.1 15.1L4.5 3.5C6 2.3 7.8 1.6 9.8 1.6C14.3 1.6 18 5.3 18 9.8C18 11.8 17.3 13.6 16.1 15.1Z" fill="currentColor" />
        </Svg >
    )
}
