import React from 'react';
import { Card, Item } from 'semantic-ui-react';

function VCard() {
  const url = 'https://image.freepik.com/free-vector/blank-circus-border_1308-28544.jpg';

  return (
    <Card link className='asd'>
      <div className="content" style={{ padding: 0 }}>
        <Item.Group>
          <Item>
            <div className="content" style={{ padding: '1rem' }}>
              <a className="header">Ajolähtö</a>
              <div className="meta">
                <span className="cinema">12.4.2021</span>
              </div>
              <div className="description">
                <p>Epic adventure of people whose car is shite</p>
              </div>
              <div className="extra">
                <div className="ui label">Child 15€</div>
                <div className="ui label">Adult 20€</div>
                <div className="ui label">Clan 500€</div>
                <div className="ui label">Ghosts FREE</div>
              </div>
            </div>
            <div className='ui image medium'>
              <img src={url} className='grad' style={{ borderRadius: 3 }} />
            </div>
          </Item>
        </Item.Group>
      </div>
    </Card>
  );
}

export default VCard;