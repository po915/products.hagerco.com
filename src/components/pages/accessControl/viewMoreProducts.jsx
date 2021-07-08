import React from 'react';
import {Collapse, Button, CardBody, Card } from 'reactstrap';

export default function ViewMoreProducts({show, setCollapseDisplay}){
    return(
        <div className="view-more">
            <Button className="view-more-toggle" aria-expanded={show} onClick={() => setCollapseDisplay(functions, !show)}>View Product Line<img className="view-more-cross" src="/public/images/viewmore-cross.svg"/></Button>
            <Collapse id="functions" isOpen={show}>
                <Card>
                    <CardBody>
                        <div className="row">
                            <div className="col-sm-6">
                                <img src="/public/images/knob-5.jpg" className="view-more-img" alt="..." />
                                <p><strong><a href="#">HS4 Wide Body Escutcheon Mortise HB38</a></strong></p>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Collapse>
        </div>
    );
}