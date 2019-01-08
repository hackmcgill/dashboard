import { Box, Flex } from '@rebass/grid';
import * as React from 'react';

import fileDownload from 'js-file-download';
import { Hacker, Search } from '../api';
import {
  IHacker,
  ISearchParameter,
  IStats,
  isValidSearchParameter,
  UserType,
} from '../config';
import { Button } from '../shared/Elements';
import ValidationErrorGenerator from '../shared/Form/validationErrorGenerator';
import WithToasterContainer from '../shared/HOC/withToaster';
import { getNestedAttr, getValueFromQuery } from '../util';
import { FilterComponent } from './Filters';
import { ResultsTable } from './ResultsTable';
import { StatsComponent } from './Stats/Stats';

enum SearchMode {
  TABLE,
  STATS,
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
      loading: false,
    };
    this.onFilterChange = this.onFilterChange.bind(this);
    this.triggerSearch = this.triggerSearch.bind(this);
    this.downloadData = this.downloadData.bind(this);
    this.switchSearchMode = this.switchSearchMode.bind(this);
    this.onResetForm = this.onResetForm.bind(this);
  }
  public render() {
    const { loading, mode } = this.state;
    return (
      <Flex>
        <Box width={1 / 6} mx={'20px'}>
          <FilterComponent
            initFilters={this.state.query}
            onChange={this.onFilterChange}
            onResetForm={this.onResetForm}
            loading={loading}
          />
        </Box>
        <Box width={5 / 6}>
          <Flex justifyContent={'space-between'}>
            <Box>
              <Flex justifyContent={'space-between'}>
                <Box>
                  <Button
                    secondary={mode !== SearchMode.TABLE}
                    onClick={this.switchSearchMode(SearchMode.TABLE)}
                    isLoading={loading}
                    disabled={loading}
                  >
                    Table
                  </Button>
                </Box>
                <Box>
                  <Button
                    secondary={mode !== SearchMode.STATS}
                    onClick={this.switchSearchMode(SearchMode.STATS)}
                    isLoading={loading}
                    disabled={loading}
                  >
                    Stats
                  </Button>
                </Box>
              </Flex>
            </Box>
            <Box mr={'10px'}>
              <Button>Update Status</Button>
              <Button onClick={this.downloadData}>Export Hackers</Button>
            </Box>
          </Flex>
          {mode === SearchMode.TABLE ? (
            <ResultsTable
              results={this.state.dataTableResults}
              loading={loading}
              userType={UserType.STAFF}
            />
          ) : (
            <StatsComponent
              stats={this.state.statsResults}
              loading={this.state.loading}
              onFilterChange={this.onFilterChange}
            />
          )}
        </Box>
      </Flex>
    );
  }
  public componentDidMount() {
    if (this.state.query.length > 0) {
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
  private switchSearchMode(
    mode: SearchMode
  ): (e: React.MouseEvent<HTMLButtonElement>) => void {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      this.setState({ mode }, this.triggerSearch);
    };
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
  private onFilterChange(newFilters: ISearchParameter[]) {
    this.updateQueryURL(newFilters);
    this.setState(
      {
        query: newFilters,
      },
      this.triggerSearch
    );
  }
  private onResetForm() {
    this.updateQueryURL([]);
    this.setState({ query: [] }, this.triggerSearch);
  }

  private updateQueryURL(newFilters: ISearchParameter[]) {
    const newSearch = `?q=${encodeURIComponent(JSON.stringify(newFilters))}`;
    window.history.replaceState(
      null,
      '',
      window.location.href.split('?')[0] + newSearch
    );
  }

  private downloadData() {
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
    this.state.dataTableResults.forEach((result) => {
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
}

export default WithToasterContainer(SearchContainer);
