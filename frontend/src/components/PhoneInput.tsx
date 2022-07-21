import React, { useEffect, useState } from 'react';
import { Dropdown, Input, Label } from 'semantic-ui-react';
import { Phonenumber } from 'shared';
import countryData from '../resources/countries.json';

function PhoneInput({ data, setData, error }: { data: Phonenumber, setData: (data: Phonenumber) => void, error?: string }) {
  const [code, setCode] = useState('+358');
  const [number, setNumber] = useState('');
  
  const codeChange = (event: any, dropdata: any) => {
    setCode(dropdata.value);
    setData({ ...data, code: dropdata.value });
  };
  
  const numberChange = (event: any) => {
    const value: string = event.target.value;
    if (value.match(/\D/))
      return;
    setNumber(value);
    setData({ ...data, number: value });
  };
  
  const search = (items: any[], value: string) => items.filter((x: any) => {
    return x.name.toLowerCase().includes(value.toLowerCase()) || x.text?.toString().includes(value);
  });
  
  const hasFlag = (iso: string) => {
    const missingFlags = ['ss', 'sx', 'mf', 'bl', 'xk', 'je', 'im', 'gg', 'ac', 'aq'];
    return !missingFlags.includes(iso.toLowerCase());
  };
  
  const countryOptions = countryData.map(x => ({
    key: x.isoCode,
    text: x.dialCode,
    value: x.dialCode,
    flag: hasFlag(x.isoCode) ? x.isoCode.toLowerCase() : undefined,
    image: hasFlag(x.isoCode) || x.isoCode !== 'ac' ? undefined : { src: x.flag },
    name: x.name
  }));

  useEffect(() => {
    setData({ ...data, code: code });
  }, []);
  
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ paddingBottom: 5, fontSize: 15 }}>
        <b>Puhelinnumero</b> - koronatilanteen vuoksi
      </div>
      <Dropdown
        selection
        compact
        search={search}
        style={{ width: 130 }}
        options={countryOptions}
        onChange={codeChange}
        value={code}
      />
      <div style={{ display: 'inline-block', width: 10 }} />
      <Input size='small' style={{ width: 160 }} value={number} onChange={numberChange} />
      {error ? <Label basic pointing='left' color='red' style={{ marginLeft: 20 }} content={error} /> : ''}
    </div>
  );
}

export default PhoneInput;