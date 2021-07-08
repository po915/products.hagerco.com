import React from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';

export default function ProductFunctions({ functions, show, setCollapseDisplay }) {
  return (
    <div className="view-more">
      <Button className="view-more-toggle" onClick={() => setCollapseDisplay('functions', !show)}>Functions<img className="view-more-cross" src="/public/images/viewmore-cross.svg"/></Button>
      <Collapse id="functions" isOpen={show}>
        <Card>
          <CardBody>
            <div className="row view-more-labels">
              <div className="col-sm-6"><strong>Function:</strong></div>
              <div className="col-sm-6"><strong>Description:</strong></div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <img src="/public/images/knob-5.jpg" className="view-more-img" alt="..." />
                <p><strong><a href="#">HS4 Wide Body Escutcheon Mortise HB38</a></strong></p>
              </div>
              <div className="col-sm-6">
                Grade 1 HS4 Wide Body<br />
                Escutcheon Mortise<br />
                HB38 - Passage
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <img src="/public/images/knob-5.jpg" className="view-more-img" alt="..." />
                <p><strong><a href="#">HS4 Wide Body Escutcheon Mortise HB38</a></strong></p>
              </div>
              <div className="col-sm-6">
                Grade 1 HS4 Wide Body<br />
                Escutcheon Mortise<br />
                HB38 - Passage
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <img src="/public/images/knob-5.jpg" className="view-more-img" alt="..." />
                <p><strong><a href="#">HS4 Wide Body Escutcheon Mortise HB38</a></strong></p>
              </div>
              <div className="col-sm-6">
                Grade 1 HS4 Wide Body<br />
                Escutcheon Mortise<br />
                HB38 - Passage
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <img src="/public/images/knob-5.jpg" className="view-more-img" alt="..." />
                <p><strong><a href="#">HS4 Wide Body Escutcheon Mortise HB38</a></strong></p>
              </div>
              <div className="col-sm-6">
                Grade 1 HS4 Wide Body<br />
                Escutcheon Mortise<br />
                HB38 - Passage
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <img src="/public/images/knob-5.jpg" className="view-more-img" alt="..." />
                <p><strong><a href="#">HS4 Wide Body Escutcheon Mortise HB38</a></strong></p>
              </div>
              <div className="col-sm-6">
                Grade 1 HS4 Wide Body<br />
                Escutcheon Mortise<br />
                HB38 - Passage
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <img src="/public/images/knob-5.jpg" className="view-more-img" alt="..." />
                <p><strong><a href="#">HS4 Wide Body Escutcheon Mortise HB38</a></strong></p>
              </div>
              <div className="col-sm-6">
                Grade 1 HS4 Wide Body<br />
                Escutcheon Mortise<br />
                HB38 - Passage
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <img src="/public/images/knob-5.jpg" className="view-more-img" alt="..." />
                <p><strong><a href="#">HS4 Wide Body Escutcheon Mortise HB38</a></strong></p>
              </div>
              <div className="col-sm-6">
                Grade 1 HS4 Wide Body<br />
                Escutcheon Mortise<br />
                HB38 - Passage
              </div>
            </div>
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
}
