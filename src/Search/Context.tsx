import * as React from 'react';
import { ISponsor } from '../config';

const NomineeContext = React.createContext({} as ISponsor | undefined);

export default NomineeContext;
