import React from 'react';
import curves from '../tools/curves';
import gradient from '../tools/gradient';

function Banner({ src }: { src: string; }) {
  return <img src={src} style={banner} />;
}

const grad = gradient('to bottom', '#000000ff', '#00000000', curves.combine(() => 0, curves.easeInOutSine));
// const grad = gradient('to bottom', '#000000ff', '#00000000', t => t);
const banner: React.CSSProperties = {
  WebkitMaskImage: grad,
  maskImage: grad,
  display: 'block',
  width: '100%',
  marginBottom: 30
  // height: '300px',
  // objectFit: 'cover',
  // objectPosition: '50% 20%'
};

export default Banner;