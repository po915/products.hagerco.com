import React from 'react';

export default function MenuLoading({ mouseOverItem, mouseLeaveItem }) {
  return (
    <div
      className="megamenu-wrapper"
      onPointerEnter={mouseOverItem}
      onPointerLeave={mouseLeaveItem}
    >
      <div className="container-fluid">
        <div className="megamenu">
          <div className="row no-gutters">
            <div className="col">
              <div className="megamenu-inner">
                <div className="display-2 text-primary mb-4">Loading...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
