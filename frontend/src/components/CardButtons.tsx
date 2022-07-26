import React from 'react';
import { createUseStyles } from 'react-jss';
import cx from 'classnames';
import Toggle from './Toggle';

type Props = {
  aEdit?: () => void,
  aHide?: () => void,
  aDelete?: () => void;
  eyeSlash?: boolean;
};

export default function CardButtons(p: Props) {
  const styles = useStyles();

  const preventProp = (action: () => void) => {
    return (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      action();
    };
  };

  return (
    <div className={styles.buttons}>
      <Toggle enabled={!!p.aEdit}>
        <button className='edit' onClick={preventProp(p.aEdit!)}>
          <i className='fas fa-edit' />
          <Tooltip text='Edit' />
        </button>
      </Toggle>

      <Toggle enabled={!!p.aHide}>
        <button className='hide' onClick={preventProp(p.aHide!)}>
          <i className={cx('fas', `fa-eye${p.eyeSlash ? '-slash' : ''}`)} />
          <Tooltip text={p.eyeSlash ? 'Show' : 'Hide'} />
        </button>
      </Toggle>

      <Toggle enabled={!!p.aDelete}>
        <button className='delete' onClick={preventProp(p.aDelete!)}>
          <i className='fas fa-trash-alt' />
          <Tooltip text={'Delete'} />
        </button>
      </Toggle>
    </div>
  );
}

function Tooltip({ text }: { text: string; }) {
  const s = useStyles();

  return (
    <div className={s.tooltip}>
      {text}
    </div>
  );
}

const useStyles = createUseStyles({
  buttons: {
    position: 'absolute',
    top: 0,
    right: 0,
    display: 'flex',

    '& > button': {
      position: 'relative',
      width: 50,
      height: 40,
      borderStyle: 'none none solid none',
      borderWidth: 1,
      borderColor: '#0002',
      backgroundColor: 'white',
      fontSize: 20,
      color: '#000a',
      cursor: 'pointer',
      backgroundClip: 'padding-box',

      transition: 'background-color 100ms, box-shadow 100ms, color 100ms',

      '@supports selector(:focus-visible)': {
        outline: 'none'
      }
    },

    '& > button:hover, & > button:focus-visible': {
      backgroundColor: '#e9e9e9'
    },

    '& > button:active': {
      boxShadow: 'inset 0 0 5px -1px #0004',
      backgroundColor: '#d9d9d9',
      color: '#000b'
    },

    '& > button:first-child': {
      borderStyle: 'none none solid solid',
      borderBottomLeftRadius: 5
    },

    '& > .delete:hover, & > .delete:focus-visible': {
      backgroundColor: 'hsl(0, 50%, 50%)',
      color: '#f0f0f0'
    },

    '& > .delete:active': {
      backgroundColor: 'hsl(0, 45%, 45%)',
      boxShadow: 'inset 0 0 5px, -1px #000b'
    },
  },

  tooltip: {
    position: 'absolute',
    top: 45,
    right: 5,
    padding: '0.5em',
    backgroundColor: '#dddd',
    color: '#000d',
    fontSize: 12,
    borderRadius: 5,
    boxShadow: '0 0 5px #0004',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'opacity 100ms ease',
    zIndex: 1,
    pointerEvents: 'none',
    opacity: 0,

    'button:hover > &': {
      opacity: 1
    }
  }
});