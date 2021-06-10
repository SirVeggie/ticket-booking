import React from 'react';
import curves from '../tools/curves';
import gradient from '../tools/gradient';

function Banner({ src }: { src: string; }) {
  return <img src={src} style={banner} />;
}

const grad = gradient('to bottom', '#000000ff', '#00000000', curves.combine(() => 0, curves.easeInOutSine));
const banner: React.CSSProperties = {
  WebkitMaskImage: grad,
  maskImage: grad,
  display: 'block',
  width: '100%',
  marginBottom: 30
};

export default Banner;