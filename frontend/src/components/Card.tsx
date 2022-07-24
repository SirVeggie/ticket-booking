import React from 'react';
import { createUseStyles } from 'react-jss';
import curves from '../tools/curves';
import gradient from '../tools/gradient';
import { Label } from 'semantic-ui-react';
import Toggle from './Toggle';

function Card({ data, onClick, children, style }: { data: CardInfo, onClick?: (card: CardInfo) => void, children?: any, style?: React.CSSProperties; }) {
  const styles = useStyles();

  const inline: React.CSSProperties = {
    background: (data.color?.length ?? 0) >= 4 ? data.color : undefined,
    height: data.height ? data.height : undefined
  };
  
  const click = data.disabled || !onClick ? undefined : () => onClick(data);

  return (
    <div className={styles.container} style={style}>
      <button className={styles.button} onClick={click} />
      <div className={styles.card + (data.disabled ? ' disable' : '')} style={inline} onClick={click}>
        <header>{data.title}</header>
        <div className='meta' style={{ ...hideEmpty(data.meta), whiteSpace: 'pre-wrap' }}>{data.meta}</div>
        <div className='content' style={{ ...hideEmpty(data.description), whiteSpace: 'pre-wrap' }}>{data.description}</div>
        <img className='preview' src={data.imageUrl} style={hideEmpty(data.imageUrl)} />
        <Tags data={data.tags} />

        {children}

        <Toggle enabled={!!data.disabled && !!data.disabledMsg}>
          <div className={styles.disabled}>{data.disabledMsg}</div>
        </Toggle>
      </div>
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

const hover: React.CSSProperties = {
  transform: 'translateY(-4px)',
  boxShadow: '0 2px 4px #0004',
  border: 'solid 1px #0004'
};

const useStyles = createUseStyles({
  container: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    
    '& > button:focus ~ div': hover
  },

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
    boxShadow: '0 1px 5px #0002',

    transition: 'transform 100ms, box-shadow 100ms, border 100ms',

    '&:not(.disable)': {
      cursor: 'pointer'
    },

    '&:not(.disable):hover': hover,

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

    '& > .preview': {
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
  },

  button: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    opacity: 0
  }
});

export default Card;