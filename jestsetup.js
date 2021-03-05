/* eslint-disable import/no-extraneous-dependencies */
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
/* eslint-enable import/no-extraneous-dependencies */

Enzyme.configure({ adapter: new Adapter() });

global.shallow = shallow;
global.render = render;
global.mount = mount;
window.matchMedia = () => {};

const htmlTag = document.getElementsByTagName('html')[0];
htmlTag.setAttribute('dir', 'ltr');
