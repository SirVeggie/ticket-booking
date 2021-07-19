import React from 'react';
import { createUseStyles } from 'react-jss';
import curves from '../tools/curves';
import gradient from '../tools/gradient';
import { Label } from 'semantic-ui-react';
import Toggle from './Toggle';

function Card({ data, onClick }: { data: CardInfo, onClick?: (card: CardInfo) => void; }) {
  const styles = useStyles();

  const inline: React.CSSProperties = {
    background: data.color,
    height: data.height ? data.height : undefined
  };

  return (
    <div className={styles.card + (data.disabled ? ' disable' : '')} style={inline} onClick={data.disabled || !onClick ? undefined : () => onClick(data)}>
      <header>{data.title}</header>
      <div className='meta' style={{ ...hideEmpty(data.meta), whiteSpace: 'pre-wrap' }}>{data.meta}</div>
      <div className='content' style={{ ...hideEmpty(data.description), whiteSpace: 'pre-wrap' }}>{data.description}</div>
      <img src={data.imageUrl} style={hideEmpty(data.imageUrl)} />
      <Tags data={data.tags} />

      <Toggle enabled={!!data.disabled && !!data.disabledMsg}>
        <div className={styles.disabled}>{data.disabledMsg}</div>
      </Toggle>
    </div>
  );
}

function Tags({ data }: Prop<string[] | undefined>) {
  if (!data)
    return <></>;
  return (
    <div style={{ marginTop: '0.5em' }}>
      {data.map(tag => <Label key={tag} style={{ marginRight: '0.5em' }}>{tag}</Label>)}
    </div>
  );
}

function hideEmpty(content: any): React.CSSProperties | undefined {
  if (!content)
    return { display: 'none' };
  return undefined;
}

const grad = gradient('to left', '#000f', '#0000', curves.easeInOutSine);

const useStyles = createUseStyles({
  card: {
    background: 'linear-gradient(to right, #fff 25%, #eee)',
    width: '100%',
    position: 'relative',
    padding: '0.8em',
    overflow: 'hidden',
    isolation: 'isolate',
    borderRadius: '5px',
    border: 'solid 1px #0002',
    backgroundClip: 'padding-box',
    // filter: 'drop-shadow(0 2px 2px #0002)',
    boxShadow: '0 1px 5px #0002',
    marginBottom: '10px',

    transition: 'transform 100ms, box-shadow 100ms, border 100ms',
    
    '&:not(.disable)': {
      cursor: 'pointer'
    },
    
    '&:not(.disable):hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 2px 4px #0004',
      // filter: 'drop-shadow(0 3px 3px #0004)',
      border: 'solid 1px #0004'
    },
    
    '&.disable': {
      pointerEvents: 'none',
      filter: 'contrast(0.7) grayscale(0.7)'
    },

    '& > header': {
      fontSize: '1.3rem',
      fontWeight: 900
    },

    '& > .meta': {
      opacity: '75%',
      margin: '0.4em 0 0.7em'
    },

    '& > .content': {
      margin: '0.7em 0 1em'
    },

    '& > img': {
      position: 'absolute',
      top: 0,
      right: 0,
      height: '100%',
      zIndex: -1,

      maskImage: grad,
      WebkitMaskImage: grad
    }
  },

  disabled: {
    fontSize: 23,
    padding: 10,
    color: 'white',
    backgroundColor: '#0004',
    filter: 'drop-shadow(0 0 2px #000)',
    borderRadius: 5,
    position: 'absolute',
    margin: 'auto auto',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
});

export default Card;