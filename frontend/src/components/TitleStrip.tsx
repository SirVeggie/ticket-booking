import React from 'react';
import { Button } from 'semantic-ui-react';

function TitleStrip({ title, button, onClick }: { title: string, button: string, onClick: () => void}) {
  return (
    <div className='ui container'>
      <div style={{ position: 'relative', width: '100%', paddingTop: 10, paddingBottom: 10 }}>
        <div style={{ width: '75%' }}>
          <h1>{title}</h1>
        </div>
        <Button onClick={onClick} color='black' style={{ position: 'absolute', top: '50%', transform: 'translate(0, -50%)', right: 0 }}>{button}</Button>
      </div>
    </div>
  );
}

export default TitleStrip;