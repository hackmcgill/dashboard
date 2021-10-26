import * as React from 'react';
import WithToasterContainer from '../../shared/HOC/withToaster';
import theme from '../../shared/Styles/theme';
import { getNestedAttr, getValueFromQuery, isSponsor } from '../../util';
import {
    HACKATHON_NAME,
    IAccount,
    IHacker,
    ISearchParameter,
    ISponsor,
    isValidSearchParameter,
    UserType,
  } from '../../config';

import withContext from '../../shared/HOC/withContext';
interface IResult {
    /**
     * For now, we aren't exposing 'selected' attribute. We set it default equal to true.
     * This is used for batch operations for changing hacker data.
     */
    selected: boolean;
    hacker: IHacker;
  }

interface ISearchState {
    model: string;
   // query: ISearchParameter[];
    results: IResult[];
    //searchBar: string;
    loading: boolean;
    viewSaved: boolean;
    account?: IAccount;
    sponsor?: ISponsor;
  }

class StatsContainer extends React.Component<{}, ISearchState>{
    constructor(props: {}) {
        super(props);
        this.state = {
          model: 'hacker',
         // query: this.getSearchFromQuery(),
          results: [],
          //searchBar: this.getSearchBarFromQuery(),
          loading: false,
          viewSaved: false,
        };
    }

    public render() {
        //const { searchBar, account, query, loading, viewSaved } = this.state;
        const { account, loading, viewSaved } = this.state;
        return(
            <h1>Hi</h1> 
        );
    }
}
//export default withContext(WithToasterContainer(StatsContainer));
export  default withContext(WithToasterContainer(StatsContainer));
