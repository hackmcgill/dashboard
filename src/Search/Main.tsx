import { Box, Flex } from '@rebass/grid';
import * as React from 'react';
import Helmet from 'react-helmet';

import fileDownload from 'js-file-download';
import { Hacker, Search } from '../api';
import {
  IHacker,
  ISearchParameter,
  IStats,
  isValidSearchParameter,
  UserType,
} from '../config';
import { Button, H1 } from '../shared/Elements';
import { Input, StyledSelect } from '../shared/Form';
import ValidationErrorGenerator from '../shared/Form/validationErrorGenerator';
import WithToasterContainer from '../shared/HOC/withToaster';
import theme from '../shared/Styles/theme';
import { getNestedAttr, getOptionsFromEnum, getValueFromQuery } from '../util';
import { FilterComponent } from './Filters';
import { ResultsTable } from './ResultsTable';
import { StatsComponent } from './Stats/Stats';

enum SearchMode {
  STATS = 'Hacker Stats',
  TABLE = 'Hacker Table',
}

interface ISearchState {
  model: string;
  mode: SearchMode;
  query: ISearchParameter[];
  dataTableResults: Array<{
    /**
     * For now, we aren't exposing 'selected' attribute. We set it default equal to true.
     * This is used for batch operations for changing hacker data.
     */
    selected: boolean;
    hacker: IHacker;
  }>;
  statsResults: IStats | null;
  searchBar: string;
  loading: boolean;
}

class SearchContainer extends React.Component<{}, ISearchState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      model: 'hacker',
      mode: SearchMode.TABLE,
      query: this.getSearchFromQuery(),
      dataTableResults: [],
      statsResults: null,
      searchBar: this.getSearchBarFromQuery(),
      loading: false,
    };
    this.onFilterChange = this.onFilterChange.bind(this);
    this.triggerSearch = this.triggerSearch.bind(this);
    this.downloadData = this.downloadData.bind(this);
    this.onResetForm = this.onResetForm.bind(this);
    this.onSearchBarChanged = this.onSearchBarChanged.bind(this);
    this.handleSearchModeChanged = this.handleSearchModeChanged.bind(this);
  }
  public render() {
    const { loading, mode } = this.state;
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
                <Box width={7 / 8}>
                  <Flex justifyContent={'flex-start'}>
                    <Box alignSelf={'center'} mx={1}>
                      <H1 color={theme.colors.primary} fontSize={'30px'}>
                        Hackers
                      </H1>
                    </Box>
                    <Box alignSelf={'flex-start'} width={0.2} mx={1}>
                      <StyledSelect
                        className="react-select-container"
                        classNamePrefix="react-select"
                        options={getOptionsFromEnum(SearchMode)}
                        onChange={this.handleSearchModeChanged}
                        marginTop={'5px'}
                        value={{
                          label: this.state.mode,
                          value: this.state.mode,
                        }}
                        isDisabled={this.state.loading}
                      />
                    </Box>
                    <Box alignSelf={'flex-start'} width={0.5} mx={1}>
                      <Input
                        onChange={this.onSearchBarChanged}
                        placeholder={'Refine your search...'}
                        style={{ marginTop: 5 }}
                        value={this.state.searchBar}
                      />
                    </Box>
                  </Flex>
                </Box>
                <Box mr={'10px'}>
                  <Button>Update Status</Button>
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
                initFilters={this.state.query}
                onChange={this.onFilterChange}
                onResetForm={this.onResetForm}
                loading={this.state.loading}
              />
            </Box>
            <Box width={5 / 6} m={2}>
              {mode === SearchMode.TABLE ? (
                <ResultsTable
                  results={this.filter(
                    this.state.dataTableResults,
                    this.state.searchBar
                  )}
                  loading={loading}
                  userType={UserType.STAFF}
                />
              ) : (
                <StatsComponent
                  stats={this.state.statsResults}
                  loading={this.state.loading}
                  onFilterChange={this.onFilterChange}
                  existingFilters={this.state.query}
                />
              )}
            </Box>
          </Flex>
        </Box>
      </Flex>
    );
  }
  public componentDidMount() {
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

  private handleSearchModeChanged({ value }: any) {
    this.setState({ mode: value }, this.triggerSearch);
  }

  private async triggerStatsSearch(): Promise<void> {
    try {
      this.setState({ loading: true });
      const statsResponse = await Hacker.getStats(this.state.query);
      const stats: IStats | null = getNestedAttr(statsResponse, [
        'data',
        'data',
        'stats',
      ]);
      this.setState({ statsResults: stats, loading: false });
    } catch (e) {
      ValidationErrorGenerator(e.data);
      this.setState({ loading: false });
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
    this.filter(this.state.dataTableResults, this.state.searchBar).forEach(
      (result) => {
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
      }
    );
    fileDownload(csvData.join('\n'), 'hackerData.tsv', 'text/tsv');
  }

  private async triggerTableSearch(): Promise<void> {
    const { model, query } = this.state;
    try {
      this.setState({ loading: true });
      const response = await Search.search(model, query, {
        expand: true,
        limit: 1000,
      });
      const isArray = Array.isArray(response.data.data);
      const tableData = isArray
        ? response.data.data.map((v) => ({
            selected: true,
            hacker: v,
          }))
        : [];
      this.setState({ dataTableResults: tableData, loading: false });
    } catch (e) {
      ValidationErrorGenerator(e.data);
      this.setState({ loading: false });
    }
  }
  private async triggerSearch(): Promise<void> {
    const { mode } = this.state;
    switch (mode) {
      case SearchMode.STATS:
        return this.triggerStatsSearch();
      case SearchMode.TABLE:
        return this.triggerTableSearch();
    }
  }

  private onResetForm() {
    this.updateQueryURL([], this.state.searchBar);
    this.setState({ query: [] }, this.triggerSearch);
  }

  private onFilterChange(newFilters: ISearchParameter[]) {
    this.updateQueryURL(newFilters, this.state.searchBar);
    this.setState(
      {
        query: newFilters,
      },
      this.triggerSearch
    );
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

  private filter(
    results: Array<{
      selected: boolean;
      hacker: IHacker;
    }>,
    search: string
  ): Array<{
    selected: boolean;
    hacker: IHacker;
  }> {
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

      return (
        foundAcct ||
        hacker.id.includes(search) ||
        hacker.major.includes(search) ||
        hacker.school.includes(search) ||
        hacker.status.includes(search) ||
        String(hacker.graduationYear).includes(search)
      );
    });
  }
}

export default WithToasterContainer(SearchContainer);
