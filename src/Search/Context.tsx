import { ISponsor } from '@hackmcgill/hackerapi-client-ts';
import * as React from 'react';

const NomineeContext = React.createContext({} as ISponsor | undefined);

export default NomineeContext;
