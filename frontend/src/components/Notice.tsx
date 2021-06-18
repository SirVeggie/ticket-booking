import React from 'react';
import { Form, Message } from 'semantic-ui-react';

function Notice({ data, setData, children, error }: { data: boolean, setData: (data: boolean) => void, children: string, error?: string; }) {
  return (
    <Message color='yellow'>
      <Message.Header>Huomio</Message.Header>
      <Message.Content>{children}</Message.Content>
      <div style={{ marginTop: 10 }}>
        <Form.Checkbox
          label='Ymmärrän'
          checked={data}
          onChange={(event, data) => setData(data.checked ?? false)}
          error={error ? { content: error, pointing: 'left' } : undefined}
        />
      </div>
    </Message>
  );
}

export default Notice;