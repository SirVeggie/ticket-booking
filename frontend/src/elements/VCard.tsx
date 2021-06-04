import React from 'react';
import { Card, Image, Header, Item, Label } from 'semantic-ui-react';

function VCard() {
  const url = 'https://image.freepik.com/free-vector/blank-circus-border_1308-28544.jpg';

  return (
    <Card link style={card}>
      <Card.Content style={{ padding: 0 }}>
        <Item.Group>
          <Item>
            <Item.Content style={{ padding: '1rem' }}>
              <Header>Ajolähtö</Header>
              <Item.Meta>12.4.2021</Item.Meta>
              <Item.Description>
                <p>Epic adventure of people whose car is shite</p>
              </Item.Description>
              <Item.Extra>
                <Label>Child 15€</Label>
                <Label>Adult 20€</Label>
              </Item.Extra>
            </Item.Content>
            <Image size='medium' src={url} style={image} />
          </Item>
        </Item.Group>
      </Card.Content>
    </Card>
  );
}

const card: React.CSSProperties = {
  minWidth: '100%',
  maxWidth: '100%'
};

const image: React.CSSProperties = {
  WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0))',
  maskImage: 'linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0))',
  borderRadius: 3
};

export default VCard;