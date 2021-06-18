import React from 'react';
import { Input, Label } from 'semantic-ui-react';

function TextInput({ label, extra, data, setData, error }: { label: string, extra?: string, data: string, setData: (data: string) => void, error?: string }) {
  const change = (event: any) => {
    setData(event.target.value);
  };
  
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ paddingBottom: 5, fontSize: 15 }}>
        <b>{label}</b> {extra}
      </div>
      <Input size='small' style={{ width: 300 }} value={data} onChange={change} />
      {error ? <Label basic color='red' pointing='left' style={{ marginLeft: 20 }} content={error} /> : ''}
    </div>
  );
}

export default TextInput;