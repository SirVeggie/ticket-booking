import { Divider } from 'semantic-ui-react';

function Footer() {
  return (
    <div>
      <div className='ui container'>
        <Divider style={{ margin: 0 }} />
      </div>
      <div style={{ height: '50px', paddingTop: 50, paddingBottom: 50 }}>
        <div className='ui container' style={{ height: '100%', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '50%', transform: 'translate(0, -50%)', width: '100%' }}>
            <p style={{ textAlign: 'center' }}>
              <span>Kysy apua sähköpostilla</span>
              <span style={{ margin: 10 }}>|</span>
              <span>Ask for assistance at</span><br />
              <b>ArcticEnsembleLiput@gmail.com</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;