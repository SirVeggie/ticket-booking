import React from 'react';
import NotFound from '../views/NotFound';

function CondNotFound(props: { children: React.ReactElement; }) {
  return (
    <div>
      {props.children ? props.children : <NotFound />}
    </div>
  );
}

export default CondNotFound;