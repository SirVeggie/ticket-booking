import React from 'react';
import { createUseStyles } from 'react-jss';
import Toggle from './Toggle';
import cx from 'classnames';

export type ConfirmationModalProps = {
  open: boolean;
  onInput: (value: boolean) => void;
  title?: string;
  message?: string;
  warning?: boolean;
  children?: React.ReactNode;
  noButtons?: boolean;
};

export function ConfirmationModal(p: ConfirmationModalProps) {
  const s = useStyles();

  const title = p.title ?? 'Are you sure?';
  const message = p.message ?? '';

  const parentClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget)
      p.onInput(false);
  };

  return (
    <Toggle enabled={p.open}>
      <div className={s.modal} onClick={parentClick}>
        <div className={cx(s.content, p.warning && 'warning')}>
          <h2>{title}</h2>
          {message && <p>{message}</p>}

          <Toggle enabled={!!p.children}>
            <div className={s.custom}>
              {p.children}
            </div>
          </Toggle>

          <Toggle enabled={!p.noButtons}>
            <div className={s.buttons}>
              <button className={s.button} onClick={() => p.onInput(true)}>Ok</button>
              <button className={cx(s.button, 'cancel')} onClick={() => p.onInput(false)}>Cancel</button>
            </div>
          </Toggle>

        </div>
      </div>
    </Toggle>
  );
}

const useStyles = createUseStyles({
  '@keyframes dropIn': {
    from: { transform: 'translateY(-1rem)' },
    to: { transform: 'translateY(0)' },
  },

  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'start',
    zIndex: 2000,
    animation: 'fadeIn 350ms ease',
  },

  content: {
    position: 'relative',
    top: '20%',
    pointerEvents: 'auto',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '5px',
    minWidth: '400px',
    maxWidth: '80%',
    maxHeight: '80%',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundOrigin: 'border-box',
    animation: '$dropIn 350ms ease',

    '&.warning': {
      border: '2px solid #ffe640',
    },
  },

  custom: {
    // width: '100%',
  },

  buttons: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },

  button: {
    padding: '10px',
    color: '#777',
    borderRadius: '5px',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    cursor: 'pointer',
    width: '100px',

    '&.cancel': {
      backgroundColor: '#fff',
      borderColor: '#faa',
      color: '#faa',
    },

    '&:hover': {
      backgroundColor: '#eee',
    },

    '&:active': {
      backgroundColor: '#ddd',
    }
  }
});