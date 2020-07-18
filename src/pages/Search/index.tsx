import { Box, Flex } from '@rebass/grid';
import fileDownload from 'js-file-download';
import React, { useState, useEffect } from 'react';
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
import * as CONSTANTS from '../../config/constants';
import { Button, H1 } from '../../shared/Elements';
import { Input } from '../../shared/Form';
import ValidationErrorGenerator from '../../shared/Form/validationErrorGenerator';
import WithToasterContainer from '../../shared/HOC/withToaster';
import theme from '../../shared/Styles/theme';
import { getNestedAttr, getValueFromQuery, isSponsor } from '../../util';

import withContext from '../../shared/HOC/withContext';
import { FilterComponent } from '../../features/Search/Filters';
import { ResultsTable } from '../../features/Search/ResultsTable';

interface IResult {
  /**
   * For now, we aren't exposing 'selected' attribute. We set it default equal to true.
   * This is used for batch operations for changing hacker data.
   */
  selected: boolean;
  hacker: IHacker;
}

const SearchContainer: React.FC = () => {
  const [model] = useState<string>('hacker');
  const [query, setQuery] = useState<ISearchParameter[]>([]);
  const [results, setResults] = useState<IResult[]>([]);
  const [searchBar, setSearchBar] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [viewSaved, setViewSaved] = useState<boolean>(false);
  const [account, setAccount] = useState<IAccount | null>(null);
  const [sponsor, setSponsor] = useState<ISponsor | null>(null);

  useEffect(() => {
    (async () => {
      setQuery(getSearchFromQuery());
      setSearchBar(getSearchBarFromQuery());
      const account = (await Account.getSelf()).data.data;
      setAccount(account);

      if (isSponsor(account)) {
        const sponsor = (await Sponsor.getSelf()).data.data;
        setSponsor(sponsor);
      }
      await triggerSearch();
    })();
  }, []);

  const getSearchFromQuery = () => {
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
  };

  const getSearchBarFromQuery = () => {
    const search = getValueFromQuery('searchBar');
    return search ? decodeURIComponent(search) : '';
  };

  const downloadData = () => {
    const headers = [
      { label: CONSTANTS.FIRST_NAME_LABEL, key: 'accountId.firstName' },
      { label: CONSTANTS.LAST_NAME_LABEL, key: 'accountId.lastName' },
      { label: CONSTANTS.EMAIL_LABEL, key: 'accountId.email' },
      { label: CONSTANTS.SCHOOL_LABEL, key: 'application.general.school' },
      {
        label: CONSTANTS.FIELD_OF_STUDY_LABEL,
        key: 'application.general.fieldOfStudy',
      },
      {
        label: CONSTANTS.GRADUATION_YEAR_LABEL,
        key: 'application.general.graduationYear',
      },
      { label: CONSTANTS.DEGREE_LABEL, key: 'application.general.degree' },
      {
        label: CONSTANTS.JOBINTEREST_LABEL,
        key: 'application.general.jobInterest',
      },
    ];
    // Return all fields for admin, and only subset for sponsors
    if (account && account.accountType === UserType.STAFF) {
      headers.push({ label: 'Resume', key: 'application.general.URL.resume' });
      headers.push({ label: 'Github', key: 'application.general.URL.github' });
      headers.push({
        label: CONSTANTS.DRIBBBLE_LINK_LABEL,
        key: 'application.general.URL.dribbble',
      });
      headers.push({
        label: CONSTANTS.PERSONAL_LABEL,
        key: 'application.general.URL.personal',
      });
      headers.push({
        label: CONSTANTS.LINKEDIN_LINK_LABEL,
        key: 'application.general.URL.linkedin',
      });
      headers.push({
        label: CONSTANTS.OTHER_LINK_LABEL,
        key: 'application.general.URL.other',
      });
      headers.push({
        label: CONSTANTS.SKILLS_LABEL,
        key: 'application.shortAnswer.skills',
      });
      headers.push({
        label: CONSTANTS.COMMENTS_LABEL,
        key: 'application.shortAnswer.comments',
      });
      headers.push({
        label: CONSTANTS.QUESTION1_REQUEST_LABEL,
        key: 'application.shortAnswer.question1',
      });
      headers.push({
        label: CONSTANTS.QUESTION2_REQUEST_LABEL,
        key: 'application.shortAnswer.question2',
      });
      headers.push({
        label: CONSTANTS.SHIRT_SIZE_LABEL,
        key: 'application.accommodation.shirtSize',
      });
      headers.push({
        label: CONSTANTS.IMPAIRMENTS_LABEL,
        key: 'application.accommodation.impairments',
      });
      headers.push({
        label: CONSTANTS.BARRIERS_LABEL,
        key: 'application.accommodation.barriers',
      });
      headers.push({
        label: CONSTANTS.TRAVEL_LABEL,
        key: 'application.accommodation.travel',
      });
      headers.push({
        label: CONSTANTS.ETHNICITY_LABEL,
        key: 'application.other.ethnicity',
      });
      headers.push({ label: CONSTANTS.GENDER_LABEL, key: 'accountId.gender' });
      headers.push({
        label: CONSTANTS.PRONOUN_LABEL,
        key: 'accountId.pronoun',
      });
    }
    const tempHeaders: string[] = [];
    headers.forEach((header) => {
      tempHeaders.push(header.label);
    });
    const csvData: string[] = [tempHeaders.join('\t')];
    filter().forEach((result) => {
      if (result.selected) {
        const row: string[] = [];
        headers.forEach((header) => {
          let value;
          if (header.key.indexOf('.') >= 0) {
            const nestedAttr = header.key.split('.');
            value = getNestedAttr(result.hacker, nestedAttr);
          } else {
            value = result.hacker[header.key];
          }
          row.push(value);
        });
        csvData.push(row.join('\t'));
      }
    });
    fileDownload(csvData.join('\n'), 'hackerData.tsv', 'text/tsv');
  };

  const triggerSearch = async (): Promise<void> => {
    setLoading(true);
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
      setResults(tableData);
      setLoading(false);
    } catch (e) {
      ValidationErrorGenerator(e.data);
      setLoading(false);
    }
  };
  const onResetForm = () => {
    setQuery([]);
    updateQueryURL([], searchBar);
  };

  const onFilterChange = (newFilters: ISearchParameter[]) => {
    setQuery(newFilters);
    updateQueryURL(newFilters, searchBar);
    triggerSearch();
  };

  const onSearchBarChanged = (e: any) => {
    const searchBar = e.target.value;
    setSearchBar(searchBar);
    updateQueryURL(query, searchBar);
  };

  const updateQueryURL = (filters: ISearchParameter[], searchBar: string) => {
    const newSearch = `?q=${encodeURIComponent(
      JSON.stringify(filters)
    )}&searchBar=${encodeURIComponent(searchBar)}`;
    window.history.replaceState(
      null,
      '',
      window.location.href.split('?')[0] + newSearch
    );
  };

  const filter = () => {
    const currSearchBar = searchBar.toLowerCase();
    return results.filter(({ hacker }) => {
      const { accountId } = hacker;
      let foundAcct;
      if (typeof accountId !== 'string') {
        const account = accountId as IAccount;
        const fullName = `${account.firstName} ${
          account.lastName
        }`.toLowerCase();
        foundAcct =
          fullName.includes(currSearchBar) ||
          account.email.toLowerCase().includes(currSearchBar) ||
          account.phoneNumber.toString().includes(currSearchBar) ||
          account.gender.toLowerCase().includes(currSearchBar) ||
          (account._id && account._id.includes(currSearchBar));
      } else {
        foundAcct = accountId.includes(currSearchBar);
      }
      const foundHacker =
        hacker.id.includes(currSearchBar) ||
        hacker.application.general.school.includes(currSearchBar) ||
        hacker.application.general.degree.includes(currSearchBar) ||
        hacker.application.general.fieldOfStudy.includes(currSearchBar) ||
        hacker.application.general.graduationYear
          .toString()
          .includes(currSearchBar) ||
        hacker.application.general.jobInterest.includes(currSearchBar) ||
        hacker.status.includes(currSearchBar) ||
        hacker.application.shortAnswer.question1.includes(currSearchBar) ||
        hacker.application.shortAnswer.question2.includes(currSearchBar) ||
        hacker.application.accommodation.shirtSize.includes(currSearchBar) ||
        (hacker.application.shortAnswer.skills &&
          hacker.application.shortAnswer.skills
            .toString()
            .includes(currSearchBar));

      const isSavedBySponsorIfToggled =
        !viewSaved ||
        (sponsor && sponsor.nominees.some((n) => n === hacker.id));

      return (foundAcct || foundHacker) && isSavedBySponsorIfToggled;
    });
  };

  const toggleSaved = async () => {
    // Resets the sponsor if they made changes to their saved hackers
    const sponsor = (await Sponsor.getSelf()).data.data;
    if (sponsor) {
      // this.setState({ sponsor, viewSaved: !viewSaved });
      setSponsor(sponsor);
      setViewSaved(!viewSaved);
    }
  };

  return (
    <Flex flexDirection={'column'}>
      <Helmet>
        <title> Search | {HACKATHON_NAME}</title>
      </Helmet>
      <Box width={1}>
        <Flex
          flexDirection={'column'}
          style={{ marginTop: '1em' }}
          alignItems={'center'}
        >
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
                  onChange={onSearchBarChanged}
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
                  <Button onClick={toggleSaved}>
                    View {viewSaved ? 'All' : 'Saved'}
                  </Button>
                )}
                <Button onClick={downloadData}>Export Hackers</Button>
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
              onChange={onFilterChange}
              onResetForm={onResetForm}
              loading={loading}
            />
          </Box>
          <Box width={5 / 6} m={2}>
            <ResultsTable
              results={filter()}
              loading={loading}
              userType={account ? account.accountType : UserType.UNKNOWN}
              filter={searchBar}
            />
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default withContext(WithToasterContainer(SearchContainer));
