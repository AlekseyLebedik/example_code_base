import { createContext } from 'react';

const BookmarksContext = createContext();

const SuiteContext = createContext();

if (!global.NavbarChildrenContext)
  global.NavbarChildrenContext = createContext({
    navBarChildrenContainer: null,
    setNavbarChildrenContainer: null,
  });

const { NavbarChildrenContext } = global;

export { BookmarksContext, SuiteContext, NavbarChildrenContext };
