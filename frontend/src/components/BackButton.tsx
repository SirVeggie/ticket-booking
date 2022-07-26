import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';

type Props = {
  text?: string;
  location?: string;
};

export function BackButton(p: Props) {
  const history = useHistory();

  const goLocation = () => {
    if (p.location)
      history.push(p.location);
    else
      history.goBack();
  };

  return (
    <div className='ui container' style={{ marginBottom: 30 }}>
      <Button icon labelPosition='left' onClick={goLocation}>
        <Icon name='chevron left' />
        {p.text ?? 'Takaisin'}
      </Button>
    </div>
  );
}