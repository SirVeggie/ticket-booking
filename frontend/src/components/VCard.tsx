import React from 'react';
import { Card, Image, Header, Item, Label } from 'semantic-ui-react';
import gradient from '../tools/gradient';
import curves from '../tools/curves';
import Toggle from './Toggle';
import Align from './Align';

function VCard({ data, onClick }: { data: CardInfo, onClick: (card: CardInfo) => void; }) {
  const customCard = {
    ...card,
    backgroundColor: data.color,
    height: data.height ? data.height : 200,
    filter: data.disabled ? 'contrast(0.7) grayscale(0.7)' : undefined
  };

  return (
    <Card style={customCard} onClick={data.disabled ? undefined : () => onClick(data)}>
      <Image size='medium' src={data.imageUrl} style={image} />
      <Card.Content style={{ padding: 0 }}>
        <Item.Group>
          <Item>
            <Item.Content style={content}>
              <Header>{data.title}</Header>
              <Item.Meta>{data.meta}</Item.Meta>
              <Item.Description><p>{data.description}</p></Item.Description>
              <Tags data={data.tags} />
            </Item.Content>
          </Item>
        </Item.Group>
      </Card.Content>
      <Toggle enabled={!!data.disabled && !!data.disabledMsg}>
        <Align style={{ position: 'absolute' }}>
          <div style={disableStyle}>{data.disabledMsg}</div>
        </Align>
      </Toggle>
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

const grad = gradient('to left', '#000000ff', '#00000000', curves.easeInOutSine);

const card: React.CSSProperties = {
  minWidth: '100%',
  maxWidth: '100%',
  position: 'relative',
  overflow: 'hidden'
};

const image: React.CSSProperties = {
  WebkitMaskImage: grad,
  maskImage: grad,
  position: 'absolute',
  top: 0,
  right: 0,
  height: '100%',
  objectFit: 'cover'
};

const content: React.CSSProperties = {
  padding: '1rem',
  position: 'absolute',
  top: 0
};

const disableStyle: React.CSSProperties = {
  fontSize: 23,
  padding: 10,
  color: 'white',
  backgroundColor: '#00000040',
  filter: 'drop-shadow(0px 0px 2px #000000)',
  borderRadius: 5
};

export default VCard;