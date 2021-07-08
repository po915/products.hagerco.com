import { JSDOM } from 'jsdom';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

const doc = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://www.hagerco.com',
});
const { window } = doc;
const { document } = window;

global.window = window;
global.document = document;
global.navigator = window.navigator;
global.sessionStorage = window.sessionStorage;

chai.use(chaiImmutable);
