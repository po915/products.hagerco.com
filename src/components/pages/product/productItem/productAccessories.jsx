import React from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';

export default function ProductAccessories({ accessories, show, setCollapseDisplay }) {
  return (
    <div className="view-more">
      <Button className="view-more-toggle" onClick={() => setCollapseDisplay('accessories', !show)}>Accessories</Button>
      <Collapse id="accessories" isOpen={show}>
        <Card>
          <CardBody>
            Not putting code here to save file size.
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
}
