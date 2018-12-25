import { Box, Flex } from '@rebass/grid';
import * as React from 'react';

import { Search } from '../api';
import { IHacker, ISearchParameter } from '../config';
import WithToasterContainer from '../shared/HOC/withToaster';
import { FilterComponent } from './Filters';
import { ResultsTable } from './ResultsTable';

interface ISearchState {
  model: string;
  query: ISearchParameter[];
  results: IHacker[];
  loading: boolean;
}

class SearchContainer extends React.Component<{}, ISearchState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      model: 'hacker',
      query: [],
      results: [],
      loading: false,
    };
    this.onFilterChange = this.onFilterChange.bind(this);
    this.triggerSearch = this.triggerSearch.bind(this);
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
          <ResultsTable
            results={this.state.results}
            loading={this.state.loading}
          />
        </Box>
      </Flex>
    );
  }

  private async triggerSearch(): Promise<void> {
    const { model, query } = this.state;
    const response = await Search.search(model, query, { expand: true });
    console.log(response.data.data);
    this.setState({ results: response.data.data, loading: false });
  }
  private onFilterChange(newFilters: ISearchParameter[]) {
    console.log(JSON.stringify(newFilters));
    this.setState({
      query: newFilters,
      loading: true,
    });
    this.triggerSearch();
  }
}

export default WithToasterContainer(SearchContainer);
