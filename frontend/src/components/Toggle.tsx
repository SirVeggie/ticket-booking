import React from 'react';

function Toggle({ enabled, children }: { enabled: boolean, children: any; }) {
  return <>{enabled ? children : ''}</>;
}

export default Toggle;