import React from 'react';

function Footer() {
  return (
    <div style={{ height: '50px', paddingTop: 50, paddingBottom: 50 }}>
      <div className='ui container' style={{ height: '100%', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '50%', transform: 'translate(0, -50%)', width: '100%' }}>
          <p style={{ textAlign: 'center' }}>
            Having trouble? Ask for help at<br />
            <b>ArcticEnsembleLiput@gmail.com</b>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;