import Svg, { Path, SvgProps } from 'react-native-svg';

export const CloseIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg width="11" height="12" viewBox="0 0 11 12" fill="none" {...props}>
      <Path
        d="M1.20001 10.55L10.3 1.44995"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.3 10.55L1.19999 1.44995"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
