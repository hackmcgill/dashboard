import { Box, Flex } from '@rebass/grid';
import * as React from 'react';

import { Hacker, Search } from '../api';
import { IHacker, ISearchParameter, IStats, UserType } from '../config';
import ValidationErrorGenerator from '../shared/Form/validationErrorGenerator';
import WithToasterContainer from '../shared/HOC/withToaster';
import { getNestedAttr } from '../util';
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
      mode: SearchMode.STATS,
      query: [],
      dataTableResults: [],
      loading: false,
      statsResults: null,
    };
    this.onFilterChange = this.onFilterChange.bind(this);
    this.triggerSearch = this.triggerSearch.bind(this);
    this.triggerSearch();
  }
  public render() {
    return (
      <Flex>
        <Box width={1 / 6} mx={'20px'}>
          <FilterComponent
            onChange={this.onFilterChange}
            loading={this.state.loading}
          />
        </Box>
        <Box width={5 / 6}>
          {this.state.mode === SearchMode.TABLE ? (
            <ResultsTable
              results={this.state.dataTableResults}
              loading={this.state.loading}
              userType={UserType.STAFF}
            />
          ) : (
            <StatsComponent
              stats={this.state.statsResults}
              loading={this.state.loading}
            />
          )}
        </Box>
      </Flex>
    );
  }
  private async triggerStatsSearch(): Promise<void> {
    try {
      const statsResponse = await Hacker.getStats(this.state.query);
      const stats: IStats | null = getNestedAttr(statsResponse, [
        'data',
        'data',
        'stats',
      ]);
      this.setState({ statsResults: stats, loading: false });
    } catch (e) {
      console.log('Error while getting stats', e);
      this.setState({ loading: false });
    }
  }

  private async triggerTableSearch(): Promise<void> {
    const { model, query } = this.state;
    try {
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
    this.setState({
      query: newFilters,
      loading: true,
    });
    this.triggerSearch();
  }
}

export default WithToasterContainer(SearchContainer);
