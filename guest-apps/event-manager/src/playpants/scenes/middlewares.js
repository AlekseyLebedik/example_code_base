import eventMiddleware from './Event/middleware';
import templateMiddleware from './Templates/middleware';
import groupStoriesMiddleware from './GroupStories/middleware';
import timewarpMiddlewares from './Timewarp/middlewares';

export default [
  eventMiddleware,
  templateMiddleware,
  groupStoriesMiddleware,
  ...timewarpMiddlewares,
];
