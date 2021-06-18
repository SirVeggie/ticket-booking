import React from 'react';
import { Button } from 'semantic-ui-react';

function TitleStrip({ title, button, onClick }: { title: string, button: string, onClick: () => void; }) {
  return (
    <div style={strip}>
      <div className='ui container' style={parent}>
        <div style={titleContainer}>
          <h1>{title}</h1>
        </div>
        <div style={buttonContainer}>
          <Button onClick={onClick} style={buttonStyle}>{button}</Button>
        </div>
      </div>
    </div>
  );
}

const strip: React.CSSProperties = {
  backgroundColor: '#232333',
  // background: 'radial-gradient(circle, #333343, #131323)',
  color: '#eeeeee',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  filter: 'drop-shadow(0px 0px 3px #00000099)'
};

const parent: React.CSSProperties = {
  display: 'flex',
  paddingTop: 15,
  paddingBottom: 15
};

const titleContainer: React.CSSProperties = {
  flexGrow: 1
};

const buttonContainer: React.CSSProperties = {
  marginLeft: 10
};

const buttonStyle: React.CSSProperties = {
  position: 'relative',
  top: '50%',
  transform: 'translate(0, -50%)',
  color: 'black'
};

export default TitleStrip;