import { Box, Flex } from '@rebass/grid';
import * as React from 'react';

import { Search } from '../api';
import { IHacker, ISearchParameter } from '../config';
import WithToasterContainer from '../shared/HOC/withToaster';
import { FilterComponent } from './Filters';

interface ISearchState {
  model: string;
  query: ISearchParameter[];
  results: IHacker[];
}

class SearchContainer extends React.Component<{}, ISearchState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      model: 'hacker',
      query: [],
      results: [],
    };
    this.onFilterChange = this.onFilterChange.bind(this);
    this.triggerSearch = this.triggerSearch.bind(this);
  }
  public render() {
    return (
      <Flex>
        <Box width={1 / 6}>
          <FilterComponent onChange={this.onFilterChange} />
        </Box>
        <Box width={5 / 6}>
          <div>HELLO</div>
        </Box>
      </Flex>
    );
  }

  private async triggerSearch(): Promise<void> {
    const { model, query } = this.state;
    const response = await Search.search(model, query, { expand: true });
    console.log(response.data.data);
    this.setState({ results: response.data.data });
  }
  private onFilterChange(newFilters: ISearchParameter[]) {
    console.log(JSON.stringify(newFilters));
    this.setState({
      query: newFilters,
    });
    this.triggerSearch();
  }
}

export default WithToasterContainer(SearchContainer);
