import { Box, Flex } from '@rebass/grid';
import fileDownload from 'js-file-download';
import * as React from 'react';
import Helmet from 'react-helmet';

import { Account, Search, Sponsor } from '../api';
import {
  IAccount,
  IHacker,
  ISearchParameter,
  ISponsor,
  isValidSearchParameter,
  UserType,
} from '../config';
import { Button, H1 } from '../shared/Elements';
import { Input } from '../shared/Form';
import ValidationErrorGenerator from '../shared/Form/validationErrorGenerator';
import WithToasterContainer from '../shared/HOC/withToaster';
import theme from '../shared/Styles/theme';
import { getNestedAttr, getValueFromQuery, isSponsor } from '../util';

import MyContext from './Context';
import { FilterComponent } from './Filters';
import { ResultsTable } from './ResultsTable';

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
  query: ISearchParameter[];
  results: IResult[];
  searchBar: string;
  loading: boolean;
  viewSaved: boolean;
  account?: IAccount;
  sponsor?: ISponsor;
}

class SearchContainer extends React.Component<{}, ISearchState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      model: 'hacker',
      query: this.getSearchFromQuery(),
      results: [],
      searchBar: this.getSearchBarFromQuery(),
      loading: false,
      viewSaved: false,
    };

    this.onFilterChange = this.onFilterChange.bind(this);
    this.triggerSearch = this.triggerSearch.bind(this);
    this.downloadData = this.downloadData.bind(this);
    this.onResetForm = this.onResetForm.bind(this);
    this.onSearchBarChanged = this.onSearchBarChanged.bind(this);
  }

  public render() {
    const {
      searchBar,
      account,
      query,
      results,
      loading,
      viewSaved,
    } = this.state;
    return (
      <Flex flexDirection={'column'}>
        <Helmet>
          <title>Admin Search | McHacks 6</title>
        </Helmet>
        <Box width={1}>
          <Flex>
            <Box alignSelf={'center'} width={1 / 6}>
              <H1 color={theme.colors.primary} fontSize={'30px'}>
                Search
              </H1>
            </Box>
            <Box width={5 / 6}>
              <Flex justifyContent={'space-between'}>
                <Box alignSelf={'center'}>
                  <H1 color={theme.colors.primary} fontSize={'30px'}>
                    Hackers
                  </H1>
                </Box>
                <Box alignSelf={'flex-start'} width={0.5}>
                  <Input
                    onChange={this.onSearchBarChanged}
                    placeholder={'Refine your search...'}
                    style={{ marginTop: 5 }}
                    value={searchBar}
                  />
                </Box>
                <Box mr={'10px'}>
                  {account && account.accountType === UserType.STAFF && (
                    <Button>Update Status</Button>
                  )}
                  {account && isSponsor(account) && (
                    <Button onClick={this.toggleSaved}>
                      View {viewSaved ? 'All' : 'Saved'}
                    </Button>
                  )}
                  <Button onClick={this.downloadData}>Export Hackers</Button>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </Box>
        <Box width={1}>
          <Flex>
            <Box width={1 / 6} m={2}>
              <FilterComponent
                initFilters={query}
                onChange={this.onFilterChange}
                onResetForm={this.onResetForm}
                loading={loading}
              />
            </Box>
            <Box width={5 / 6} m={2}>
              <MyContext.Provider value={this.state.sponsor}>
                <ResultsTable
                  results={this.filter(results, searchBar)}
                  loading={loading}
                  userType={account ? account.accountType : UserType.UNKNOWN}
                  filter={searchBar}
                />
              </MyContext.Provider>
            </Box>
          </Flex>
        </Box>
      </Flex>
    );
  }
  public async componentDidMount() {
    const account = (await Account.getSelf()).data.data;
    this.setState({ account });

    if (isSponsor(account)) {
      const sponsor = (await Sponsor.getSelf()).data.data;
      this.setState({ sponsor });
    }

    if (this.state.query.length > 0 || this.state.searchBar.length > 0) {
      this.triggerSearch();
    }
  }
  private getSearchFromQuery(): ISearchParameter[] {
    const search = getValueFromQuery('q');
    if (!search) {
      return [];
    }
    try {
      const searchParam = JSON.parse(search);
      if (!Array.isArray(searchParam)) {
        return [];
      }
      const isValidSearch =
        searchParam
          .map(
            (value: any): boolean => {
              return isValidSearchParameter(value);
            }
          )
          .indexOf(false) === -1;
      return isValidSearch ? searchParam : [];
    } catch (e) {
      return [];
    }
  }

  private getSearchBarFromQuery(): string {
    const search = getValueFromQuery('searchBar');
    return search ? decodeURIComponent(search) : '';
  }

  private downloadData(): void {
    const headers = [
      '_id',
      'accountId.firstName',
      'accountId.lastName',
      'accountId.email',
      'needsBus',
      'major',
      'school',
      'graduationYear',
      'degree',
      'gender',
      'needsBus',
    ];
    const csvData: string[] = [headers.join('\t')];
    this.filter(this.state.results, this.state.searchBar).forEach((result) => {
      if (result.selected) {
        const row: string[] = [];
        headers.forEach((header) => {
          let value;
          if (header.indexOf('.') >= 0) {
            const nestedAttr = header.split('.');
            value = getNestedAttr(result.hacker, nestedAttr);
          } else {
            value = result.hacker[header];
          }
          row.push(value);
        });
        csvData.push(row.join('\t'));
      }
    });
    fileDownload(csvData.join('\n'), 'hackerData.tsv', 'text/tsv');
  }

  private async triggerSearch(): Promise<void> {
    this.setState({ loading: true });
    const { model, query } = this.state;
    try {
      const response = await Search.search(model, query, {
        expand: true,
      });
      const isArray = Array.isArray(response.data.data);
      const tableData = isArray
        ? response.data.data.map((v) => ({
            selected: true,
            hacker: v,
          }))
        : [];
      this.setState({ results: tableData, loading: false });
    } catch (e) {
      ValidationErrorGenerator(e.data);
      this.setState({ loading: false });
    }
  }
  private onResetForm() {
    this.setState({ query: [] });
    this.updateQueryURL([], this.state.searchBar);
  }

  private onFilterChange(newFilters: ISearchParameter[]) {
    this.setState({
      query: newFilters,
    });
    this.updateQueryURL(newFilters, this.state.searchBar);
    this.triggerSearch();
  }

  private onSearchBarChanged(e: any) {
    const searchBar = e.target.value;
    this.setState({ searchBar });
    this.updateQueryURL(this.state.query, searchBar);
  }

  private updateQueryURL(filters: ISearchParameter[], searchBar: string) {
    const newSearch = `?q=${encodeURIComponent(
      JSON.stringify(filters)
    )}&searchBar=${encodeURIComponent(searchBar)}`;
    window.history.replaceState(
      null,
      '',
      window.location.href.split('?')[0] + newSearch
    );
  }

  private filter(results: IResult[], search: string): IResult[] {
    const { sponsor, viewSaved } = this.state;

    return results.filter(({ hacker }) => {
      const { accountId } = hacker;
      const foundAcct =
        typeof accountId !== 'string'
          ? `${accountId.firstName} ${accountId.lastName}`.includes(search) ||
            accountId.email.includes(search) ||
            String(accountId.phoneNumber).includes(search) ||
            accountId.shirtSize.includes(search) ||
            (accountId._id && accountId._id.includes(search))
          : false;

      const foundHacker =
        hacker.id.includes(search) ||
        hacker.major.includes(search) ||
        hacker.school.includes(search) ||
        hacker.status.includes(search) ||
        String(hacker.graduationYear).includes(search);

      const isSavedBySponsorIfToggled =
        !viewSaved ||
        (sponsor && sponsor.nominees.some((n) => n === hacker.id));

      console.log(isSavedBySponsorIfToggled);

      return (foundAcct || foundHacker) && isSavedBySponsorIfToggled;
    });
  }

  private toggleSaved = () => {
    const { sponsor, viewSaved } = this.state;
    if (sponsor) {
      this.setState({ viewSaved: !viewSaved });
    }
  };
}

export default WithToasterContainer(SearchContainer);
