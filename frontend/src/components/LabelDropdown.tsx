import { Dropdown } from 'semantic-ui-react';

interface LabelDropdown<Item> {
  label: string;
  items: Item[];
  mapName: (item: Item) => string;
  update: (item: Item) => void;
  value?: (x: Item) => boolean;
  width?: number;
  style?: React.CSSProperties;
}

export default function LabelDropdown<Item>(p: LabelDropdown<Item>) {
  const options = p.items.map((x, i) => ({ key: i, value: i, text: p.mapName(x) }));
  const value = !p.value ? undefined : p.items.findIndex(p.value);

  return (
    <div style={p.style ? p.style : { margin: '0 10px 10px 0' }}>
      <label>{p.label}</label><br />
      <Dropdown
        search
        selection
        value={value}
        compact={!!p.width}
        options={options}
        onChange={(event, dropdata) => p.update(p.items[Number(dropdata.value)])}
        style={{ width: p.width ? p.width : undefined }}
      />
    </div>
  );
}