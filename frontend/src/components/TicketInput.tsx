import { Dropdown, Icon, Label, Popup } from 'semantic-ui-react';

const ticketOptions: any = [];
for (let index = 0; index < 50; index++) {
  ticketOptions.push({ key: index, text: index, value: index });
}

function TicketSelector({ name, price, hint, data, setData }: { name: string, price: number, hint: string, error?: string, data: number, setData: (data: number) => void }) {
  return (
    <div style={{ display: 'inline-block', marginRight: 20, marginBottom: 10 }}>
      <div style={{ paddingBottom: 5, fontSize: 15 }}>
        <b style={{ marginRight: 5 }}>{name}</b>
        <div style={{ display: 'inline', marginRight: 10 }}>
          <Label basic style={{ padding: 4 }}>{price}€</Label>
        </div>
        {!hint ? '' : <div style={{ position: 'relative', top: -1, display: 'inline' }}>
          <Popup
            trigger={<Icon name='question' color='black' size='small' circular />}
            content={hint}
            position='top left'
          />
        </div>}
      </div>
      <Dropdown
        selection
        options={ticketOptions}
        value={data}
        onChange={(event, data) => setData(Number(data.value))}
      />
    </div>
  );
}

export default TicketSelector;