import React, { useState } from 'react';
import { Image, Placeholder } from 'semantic-ui-react';
import curves from '../tools/curves';
import gradient from '../tools/gradient';

function Banner({ src }: { src: string; }) {
  const [loading, setLoading] = useState(true);
  const load = () => setLoading(false);
  
  return (
    <div>
      <Placeholder fluid style={{ ...banner, display: (loading ? '' : 'none') }}>
        <Placeholder.Image style={{ minHeight: '50vw' }} />
      </Placeholder>
      <Image src={src} style={{ ...banner, display: (loading ? 'none' : '') }} onLoad={load} />
    </div>
  );
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