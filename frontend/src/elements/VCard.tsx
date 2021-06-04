import React from 'react';
import { Card, Image, Header, Item, Label } from 'semantic-ui-react';

function VCard({ data, action }: { data: CardInfo, action: any }) {
  return (
    <Card link style={card} onClick={action}>
      <Card.Content style={{ padding: 0 }}>
        <Item.Group>
          <Item>
            <Item.Content style={{ padding: '1rem' }}>
              <Header>{data.title}</Header>
              <Item.Meta>{data.meta}</Item.Meta>
              <Item.Description><p>{data.description}</p></Item.Description>
              <Tags data={data.tags} />
            </Item.Content>
            <Image size='medium' src={data.imageUrl} style={image} />
          </Item>
        </Item.Group>
      </Card.Content>
    </Card>
  );
}

function Tags({ data }: Prop<string[] | undefined>) {
  if (!data)
    return <></>;
  return (
    <Item.Extra>
      {data.map(tag => <Label key={tag}>{tag}</Label>)}
    </Item.Extra>
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