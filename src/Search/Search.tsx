import { Box, Flex } from '@rebass/grid';
import fileDownload from 'js-file-download';
import * as React from 'react';

import { Search } from '../api';
import { IHacker, ISearchParameter, UserType } from '../config';
import { Button, H1 } from '../shared/Elements';
import ValidationErrorGenerator from '../shared/Form/validationErrorGenerator';
import WithToasterContainer from '../shared/HOC/withToaster';
import theme from '../shared/Styles/theme';
import { getNestedAttr } from '../util';
import { FilterComponent } from './Filters';
import { ResultsTable } from './ResultsTable';
interface ISearchState {
  model: string;
  query: ISearchParameter[];
  results: Array<{
    /**
     * For now, we aren't exposing 'selected' attribute. We set it default equal to true.
     * This is used for batch operations for changing hacker data.
     */
    selected: boolean;
    hacker: IHacker;
  }>;
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
    this.downloadData = this.downloadData.bind(this);
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
          <Flex justifyContent={'space-between'}>
            <Box>
              <H1
                color={theme.colors.primary}
                fontSize={'30px'}
                textAlign={'left'}
                marginTop={'0px'}
                marginBottom={'20px'}
              >
                Hackers
              </H1>
            </Box>
            <Box mr={'10px'}>
              <Button>Update Status</Button>
              <Button onClick={this.downloadData}>Export Hackers</Button>
            </Box>
          </Flex>
          <ResultsTable
            results={this.state.results}
            loading={this.state.loading}
            userType={UserType.STAFF}
          />
        </Box>
      </Flex>
    );
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
    this.state.results.forEach((result) => {
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
      this.setState({ results: tableData, loading: false });
    } catch (e) {
      ValidationErrorGenerator(e.data);
      this.setState({ loading: false });
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
