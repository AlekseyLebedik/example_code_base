import { createContext } from 'react';
import ConnectedPlayerAssets from './container';

export const SelectedUserContext = createContext({ id: null });

export default ConnectedPlayerAssets;
