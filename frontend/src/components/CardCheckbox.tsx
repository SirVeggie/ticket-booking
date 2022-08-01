import { createUseStyles } from 'react-jss';

export default function CardCheckbox(props: { checked: boolean, update: (value: boolean) => void; }) {
  const styles = useStyles();
  
  return (
    <input type='checkbox' className={styles.check} checked={props.checked} onChange={() => props.update(!props.checked)} onClick={e => e.stopPropagation()} />
  );
}

const useStyles = createUseStyles({
  check: {
    appearance: 'none',
    WebkitAppearance: 'none',
    position: 'absolute',
    width: 40,
    height: 40,
    backgroundColor: 'white',
    right: 0,
    top: 0,
    cursor: 'pointer',
    color: '#000a',
    outline: 'none',
    
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
    margin: 5,
    border: 'solid 1px #0002',
    borderRadius: 3,
    
    '&:hover, &:focus': {
      border: 'solid 1px #0003',
      boxShadow: 'inset 0 0 5px -1px #0004'
    },
    
    '&:active': {
      backgroundColor: '#f0f0f0'
    },
    
    '&::after': {
      content: '"\\f00c"',
      fontFamily: '"Font Awesome 5 Free"',
      fontWeight: 900,
      display: 'block',
      textRendering: 'auto',
      fontSize: 30,
      opacity: 0,
      
      transition: 'opacity 100ms ease-out'
    },
    
    '&:checked::after': {
      opacity: '100%'
    }
  }
});