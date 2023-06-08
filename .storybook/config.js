import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import withDevzone from 'stories/helpers/devzoneDecorator';

addDecorator(withDevzone);
addDecorator(withKnobs);

const req = require.context('../src/stories', true, /\.js$/);
function loadStories() {
  require('../src/stories');
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
