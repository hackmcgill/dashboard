import { Box, Flex } from '@rebass/grid';
import fileDownload from 'js-file-download';
import * as React from 'react';
import Helmet from 'react-helmet';

import { Account, Search, Sponsor } from '../../api';
import {
  HACKATHON_NAME,
  IAccount,
  IHacker,
  ISearchParameter,
  ISponsor,
  isValidSearchParameter,
  UserType,
} from '../../config';
import { Button, H1 } from '../../shared/Elements';
import { Input } from '../../shared/Form';
import ValidationErrorGenerator from '../../shared/Form/validationErrorGenerator';
import WithToasterContainer from '../../shared/HOC/withToaster';
import theme from '../../shared/Styles/theme';
import { getNestedAttr, getValueFromQuery, isSponsor } from '../../util';

import withContext from '../../shared/HOC/withContext';
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
    const { searchBar, account, query, loading, viewSaved } = this.state;
    const accountType = account ? account.accountType : UserType.STAFF;
    return (
      <Flex flexDirection={'column'}>
        <Helmet>
          <title>
            {' '}
            {accountType} Search | {HACKATHON_NAME}
          </title>
        </Helmet>
        <Box width={1}>
          <Flex>
            <Box alignSelf={'center'} width={1 / 6}>
              <H1 color={theme.colors.red} fontSize={'30px'}>
                Search
              </H1>
            </Box>
            <Box width={5 / 6}>
              <Flex justifyContent={'space-between'}>
                <Box alignSelf={'center'}>
                  <H1 color={theme.colors.red} fontSize={'30px'}>
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
              <ResultsTable
                results={this.filter()}
                loading={loading}
                userType={account ? account.accountType : UserType.UNKNOWN}
                filter={searchBar}
              />
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
    await this.triggerSearch();
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
      'accountId.firstName',
      'accountId.lastName',
      'application.general.school',
      'application.general.fieldOfStudy',
      'application.general.graduationYear',
      'application.general.degree',
      'application.general.jobInterest',
    ];
    // Return all fields for admin, and only subset for sponsors
    if (
      this.state.account &&
      this.state.account.accountType === UserType.STAFF
    ) {
      headers.push('application.general.URL.resume');
      headers.push('application.general.URL.resume');
      headers.push('application.general.URL.github');
      headers.push('application.general.URL.dribbble');
      headers.push('application.general.URL.personal');
      headers.push('application.general.URL.linkedin');
      headers.push('application.general.URL.other');
      headers.push('application.shortAnswer.skills');
      headers.push('application.shortAnswer.comments');
      headers.push('application.shortAnswer.question1');
      headers.push('application.shortAnswer.question2');
      headers.push('accountId.email');
      headers.push('application.accommodation.shirtSize');
      headers.push('application.accommodation.impairments');
      headers.push('application.accommodation.barriers');
      headers.push('application.accommodation.travel');
      headers.push('application.other.ethnicity');
      headers.push('accountId.gender');
    }
    /*

    */
    const csvData: string[] = [headers.join('\t')];
    this.filter().forEach((result) => {
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

  private filter() {
    const { sponsor, viewSaved, results } = this.state;
    const searchBar = this.state.searchBar.toLowerCase();
    return results.filter(({ hacker }) => {
      const { accountId } = hacker;
      let foundAcct;
      if (typeof accountId !== 'string') {
        const account = accountId as IAccount;
        const fullName = `${account.firstName} ${
          account.lastName
        }`.toLowerCase();
        foundAcct =
          fullName.includes(searchBar) ||
          account.email.toLowerCase().includes(searchBar) ||
          account.phoneNumber.toString().includes(searchBar) ||
          account.gender.toLowerCase().includes(searchBar) ||
          (account._id && account._id.includes(searchBar));
      } else {
        foundAcct = accountId.includes(searchBar);
      }
      const foundHacker =
        hacker.id.includes(searchBar) ||
        hacker.application.general.school.includes(searchBar) ||
        hacker.application.general.degree.includes(searchBar) ||
        hacker.application.general.fieldOfStudy.includes(searchBar) ||
        hacker.application.general.graduationYear
          .toString()
          .includes(searchBar) ||
        hacker.application.general.jobInterest.includes(searchBar) ||
        hacker.status.includes(searchBar) ||
        hacker.application.shortAnswer.question1.includes(searchBar) ||
        hacker.application.shortAnswer.question2.includes(searchBar) ||
        hacker.application.accommodation.shirtSize.includes(searchBar) ||
        (hacker.application.shortAnswer.skills &&
          hacker.application.shortAnswer.skills.toString().includes(searchBar));

      const isSavedBySponsorIfToggled =
        !viewSaved ||
        (sponsor && sponsor.nominees.some((n) => n === hacker.id));

      return (foundAcct || foundHacker) && isSavedBySponsorIfToggled;
    });
  }

  private toggleSaved = async () => {
    // Resets the sponsor if they made changes to their saved hackers
    const sponsor = (await Sponsor.getSelf()).data.data;
    const { viewSaved } = this.state;
    if (sponsor) {
      this.setState({ sponsor, viewSaved: !viewSaved });
    }
  };
}

export default withContext(WithToasterContainer(SearchContainer));
