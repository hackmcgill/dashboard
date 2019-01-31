import * as React from 'react';
import { ISponsor } from '../config';

const MyContext = React.createContext({} as ISponsor | undefined);

export default MyContext;
