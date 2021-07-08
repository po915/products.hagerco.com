import React from 'react';
import XmlRenderer from 'xml-renderer';

class ContentRenderer {
  constructor() {
    this.xr = new XmlRenderer();

    // block
    this.xr.register('text', r => r.traverse());
    this.xr.register('self::title', r => <h1 key={r.key()}>{r.travserse()}</h1>);
    this.xr.register('self::subheadline-1', r => <h2 key={r.key()}>{r.traverse()}</h2>);
    this.xr.register('self::subheadline-2', r => <h3 key={r.key()}>{r.traverse()}</h3>);
    this.xr.register('self::subheadline-3', r => <h4 key={r.key()}>{r.traverse()}</h4>);
    this.xr.register('self::enumeration', r => <ol key={r.key()}>{r.traverse()}</ol>);
    this.xr.register('self::bullet-list', r => <ul key={r.key()}>{r.traverse()}</ul>);
    this.xr.register('self::item', r => <li key={r.key()}>{r.traverse()}</li>);
    this.xr.register('self::paragraph', r => <p key={r.key()}>{r.traverse()}</p>);


    this.xr.register('self::table', r => <table key={r.key()}>{r.traverse()}</table>);
    this.xr.register('self::row', r => <tr key={r.key()}>{r.traverse()}</tr>);
    this.xr.register('self::cell', r => <td key={r.key()}>{r.traverse()}</td>);
    this.xr.register('self::hdivider', () => <hr />);

    this.xr.register('self::intro', r => (
      <div className="intro" key={r.key()}>
        <p>{r.traverse()}</p>
      </div>
    ));

    // Key visual elements
    this.xr.register('key-visual', r => r.traverse());
    this.xr.register('self::image', r => (
      <img
        key={r.key()}
        src={r.node().attributes['xlink:href'].nodeValue}
        alt={r.node().attributes['alt-text'].nodeValue}
      />
    ));

    // inline
    this.xr.register('self::bold', r => <b>{r.traverse()}</b>);
    this.xr.register('self::italic', r => <i>{r.traverse()}</i>);
    this.xr.register('self::bold-italic', r => <b><i>{r.traverse()}</i></b>);
    this.xr.register('self::link', (r) => {
      if (r.node().attributes.url) {
        return <a key={r.key()} href={r.node().attributes.url.nodeValue}>{r.traverse()}</a>;
      } else if (r.node().attributes['xlink:href']) {
        return <a key={r.key()} href={r.node().attributes['xlink:href'].nodeValue}>{r.traverse()}</a>;
      }
      return r.traverse();
    });

    // text
    this.xr.register('self::text()', r => r.node().nodeValue);

    // element fall back
    this.xr.register('self::*', r => r.traverse());
  }

  render(xmlStr) {
    try {
      const node = new DOMParser().parseFromString(xmlStr, 'application/xml');
      return this.xr.render(node);
    } catch (e) {
      return (<div />);
    }
  }
}

const contentRenderer = new ContentRenderer();
export default contentRenderer;
