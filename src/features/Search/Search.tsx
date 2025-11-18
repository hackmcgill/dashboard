import { Box, Flex } from '@rebass/grid';
import fileDownload from 'js-file-download';
import * as React from 'react';
import Helmet from 'react-helmet';
import HackerReviewerStatus from '../../config/hackerReviewerStatus';
import { toast } from 'react-toastify';
import Hacker from '../../api/hacker';
import { Textarea } from '../../shared/Elements';

import { Account, Search, Sponsor, Emails } from '../../api';
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
import { Button, ButtonVariant, H1, H2 } from '../../shared/Elements';
import { Input } from '../../shared/Form';
import ValidationErrorGenerator from '../../shared/Form/validationErrorGenerator';
import WithToasterContainer from '../../shared/HOC/withToaster';
import theme from '../../shared/Styles/theme';
import { getNestedAttr, getValueFromQuery, isSponsor } from '../../util';

import withContext from '../../shared/HOC/withContext';
import { FilterComponent } from './Filters';
import { ResultsTable } from './ResultsTable';
import { LongTextInput } from '../../shared/Form/FormikElements';
import { FastField } from 'formik';
import * as FormikElements from '../../shared/Form/FormikElements';

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
  reviewerNames: string;
  loading: boolean;
  viewSaved: boolean;
  account?: IAccount;
  sponsor?: ISponsor;
  reviewStatusFilter: number[];
  reviewScoreFilter: number[];
  emailModalOpen: boolean;
  reviewerModalOpen: boolean;
  emailSending: boolean;
  emailStatus: string;
  emailConfirming: boolean;
  emailCount: number | null;
  emailResult: null | {
    ok: boolean;
    success: number;
    failed: number;
    statusLabel: string;
    errorMessage?: string;
  };
}

class SearchContainer extends React.Component<{}, ISearchState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      model: 'hacker',
      query: this.getSearchFromQuery(),
      results: [],
      searchBar: this.getSearchBarFromQuery(),
      reviewerNames: '',
      loading: false,
      viewSaved: false,
      reviewStatusFilter: [],
      reviewScoreFilter: [],
      emailModalOpen: false,
      reviewerModalOpen: false,
      emailSending: false,
      emailStatus: '',
      emailConfirming: false,
      emailCount: null,
      emailResult: null,
    };

    this.onFilterChange = this.onFilterChange.bind(this);
    this.triggerSearch = this.triggerSearch.bind(this);
    this.downloadData = this.downloadData.bind(this);
    this.onResetForm = this.onResetForm.bind(this);
    this.onSearchBarChanged = this.onSearchBarChanged.bind(this);
    this.onReviewerChanged = this.onReviewerChanged.bind(this);
    this.openEmailModal = this.openEmailModal.bind(this);
    this.closeEmailModal = this.closeEmailModal.bind(this);
    this.openReviewerModal = this.openReviewerModal.bind(this);
    this.closeReviewerModal = this.closeReviewerModal.bind(this);
    this.startEmailConfirmation = this.startEmailConfirmation.bind(this);
    this.backFromEmailConfirmation = this.backFromEmailConfirmation.bind(this);
    this.confirmSendEmails = this.confirmSendEmails.bind(this);
    this.closeEmailResult = this.closeEmailResult.bind(this);
    this.state = {
      ...this.state,
      emailModalOpen: false,
      reviewerModalOpen: false,
      emailSending: false,
      emailStatus: '',
      emailConfirming: false,
      emailCount: null,
      emailResult: null,
    };
  }
  openEmailModal() {
    this.setState({ emailModalOpen: true });
  }
  closeEmailModal() {
    this.setState({
      emailModalOpen: false,
      emailStatus: '',
      emailConfirming: false,
      emailCount: null,
      emailSending: false,
      emailResult: null,
    });
  }

  openReviewerModal() {
    this.setState({ reviewerModalOpen: true });
  }
  closeReviewerModal() {
    this.setState({ reviewerModalOpen: false });
  }

  async startEmailConfirmation(status: string) {
    try {
      // Fetch the count of emails to be sent
      const countResp = await Emails.getStatusCount(status);
      const count = countResp.data.data.count;
      this.setState({
        emailStatus: status,
        emailConfirming: true,
        emailCount: typeof count === 'number' ? count : 0,
      });
    } catch (err: any) {
      const message = err?.data?.message || err?.message || err;
      alert(
        `Failed to retrieve ${status.toLowerCase()} email count: ${message}`
      );
    }
  }

  backFromEmailConfirmation() {
    this.setState({
      emailConfirming: false,
      emailCount: null,
      emailStatus: '',
    });
  }

  async confirmSendEmails() {
    const { emailStatus } = this.state;
    if (!emailStatus) return;
    try {
      this.setState({ emailSending: true });
      const resp = await Emails.sendAutomatedStatus(emailStatus);
      const { success, failed } = resp.data.data;
      this.setState({
        emailResult: {
          ok: true,
          success,
          failed,
          statusLabel: emailStatus,
        },
      });
    } catch (err: any) {
      const message = err?.data?.message || err?.message || err;
      this.setState({
        emailResult: {
          ok: false,
          success: 0,
          failed: 0,
          statusLabel: emailStatus,
          errorMessage: String(message),
        },
      });
    } finally {
      this.setState({
        emailSending: false,
        emailConfirming: false,
      });
    }
  }

  private closeEmailResult() {
    this.setState({
      emailResult: null,
      emailModalOpen: false,
      emailStatus: '',
      emailConfirming: false,
      emailCount: null,
      emailSending: false,
    });
  }

  public render() {
    const { searchBar, account, query, loading, viewSaved, reviewerNames } = this.state;
    const isStaffAccount =
      account && account.accountType === UserType.STAFF ? true : false;
    return (
      <Flex flexDirection={'column'}>
        <Helmet>
          <title> Search | {HACKATHON_NAME}</title>
        </Helmet>
        <Box width={1 / 6} alignSelf={'center'}>
          <H1 color={theme.colors.red} fontSize={'30px'}>
            Search Hackers
          </H1>
        </Box>
        <Box width={1}>
          <Flex>
            <Box width={1 / 6} mx={2}>
              <H2>Filters</H2>
              <h4>{this.state.results.length} results</h4>
              <FilterComponent
                initFilters={query}
                onChange={this.onFilterChange}
                onResetForm={this.onResetForm}
                loading={loading}
              />
            </Box>
            <Box width={5 / 6} mx={2}>
              <Flex flexDirection={'column'}>
                <Box width={6 / 6}>
                  <Flex justifyContent={'space-between'}>
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
                        <Button
                          style={{ marginRight: '10px' }}
                          variant={ButtonVariant.Secondary}
                          isOutlined={true}
                          // onClick={this.handleReviewerAssignment}
                          onClick={this.openReviewerModal}
                        >
                          Assign Reviewers
                        </Button>
                      )}
                      {account && isSponsor(account) && (
                        <Button
                          onClick={this.toggleSaved}
                          style={{ marginRight: '10px' }}
                          variant={ButtonVariant.Secondary}
                          isOutlined={true}
                        >
                          View {viewSaved ? 'All' : 'Saved'}
                        </Button>
                      )}
                      <Button
                        onClick={this.downloadData}
                        variant={ButtonVariant.Secondary}
                        isOutlined={true}
                      >
                        Export Hackers
                      </Button>
                      {account && account.accountType === UserType.STAFF && (
                        <Button
                          onClick={this.openEmailModal}
                          variant={ButtonVariant.Secondary}
                          isOutlined={true}
                          style={{ marginLeft: '10px' }}
                        >
                          Send Emails
                        </Button>
                      )}
                    </Box>
                  </Flex>
                </Box>
                <ResultsTable
                  results={this.filter()}
                  loading={loading}
                  userType={account ? account.accountType : UserType.UNKNOWN}
                  filter={searchBar}
                  canEditAllStatuses={isStaffAccount}
                  triggerUpdate={this.triggerSearch}
                />
              </Flex>
            </Box>
          </Flex>
        </Box>
        {/* Email Modal */}
        {this.state.emailModalOpen && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0,0,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
            }}
            onClick={this.closeEmailModal}
          >
            <div
              style={{
                background: 'white',
                padding: '16px 32px 32px',
                borderRadius: 8,
                minWidth: 320,
                boxShadow: '0 2px 16px rgba(0,0,0,0.2)',
                position: 'relative',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {this.state.emailResult ? (
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
                >
                  <h2>
                    {this.state.emailResult.ok ? 'Emails Sent' : 'Send Failed'}
                  </h2>
                  {this.state.emailResult.ok ? (
                    <p style={{ marginTop: 4 }}>
                      Successfully sent{' '}
                      <strong>{this.state.emailResult.success}</strong>{' '}
                      {this.state.emailResult.statusLabel.toLowerCase()} email
                      {this.state.emailResult.success === 1 ? '' : 's'}
                      {this.state.emailResult.failed > 0
                        ? ` (${this.state.emailResult.failed} failed)`
                        : ''}
                      .
                    </p>
                  ) : (
                    <>
                      <p style={{ marginTop: 4 }}>
                        Failed to send{' '}
                        {this.state.emailResult.statusLabel.toLowerCase()}{' '}
                        emails.
                      </p>
                      <p
                        style={{
                          color: theme.colors.black60,
                          whiteSpace: 'pre-wrap',
                        }}
                      >
                        {this.state.emailResult.errorMessage}
                      </p>
                    </>
                  )}
                  <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                    <Button onClick={this.closeEmailResult}>Done</Button>
                  </div>
                </div>
              ) : this.state.emailConfirming ? (
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
                >
                  <h2>Confirm Send</h2>
                  <p style={{ marginTop: 4 }}>
                    You are about to send{' '}
                    <strong>{this.state.emailCount ?? 0}</strong>{' '}
                    {this.state.emailStatus.toLowerCase()} email
                    {this.state.emailCount === 1 ? '' : 's'}.
                  </p>
                  <p style={{ color: theme.colors.black60, marginTop: 0 }}>
                    This will email all hackers currently marked as{' '}
                    <strong>{this.state.emailStatus}</strong>.
                  </p>
                  <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                    <Button
                      disabled={
                        this.state.emailSending ||
                        (this.state.emailCount ?? 0) === 0
                      }
                      onClick={this.confirmSendEmails}
                      variant={ButtonVariant.Primary}
                    >
                      {this.state.emailSending ? 'Sending…' : 'Confirm Send'}
                    </Button>
                    <Button
                      onClick={this.backFromEmailConfirmation}
                      variant={ButtonVariant.Secondary}
                      isOutlined={true}
                      disabled={this.state.emailSending}
                    >
                      Back
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <h2>Send Decision Emails</h2>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 12,
                    }}
                  >
                    <Button
                      disabled={this.state.emailSending}
                      onClick={() => this.startEmailConfirmation('Accepted')}
                      variant={ButtonVariant.Secondary}
                      isOutlined={true}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          theme.colors.black5;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          theme.colors.white;
                      }}
                    >
                      Send All Acceptance Emails
                    </Button>
                    <Button
                      disabled={this.state.emailSending}
                      onClick={() => this.startEmailConfirmation('Declined')}
                      variant={ButtonVariant.Secondary}
                      isOutlined={true}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          theme.colors.black5;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          theme.colors.white;
                      }}
                    >
                      Send All Declined Emails
                    </Button>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginTop: 24,
                    }}
                  >
                    <Button
                      onClick={this.closeEmailModal}
                      variant={ButtonVariant.Primary}
                      disabled={this.state.emailSending}
                    >
                      Cancel
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
        {/* Reviewer Modal */}

                      {/* {
                        this.state.reviewerModalOpen && (
                          <AssignReviewerModal
                            onSubmit={this.handleReviewerAssignment}
                            onClose={this.closeReviewerModal}
                          />
                        )
                      } */}
        {this.state.reviewerModalOpen && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0,0,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
            }}
            onClick={this.closeReviewerModal}
          >
            <div
              style={{
                background: 'white',
                padding: '16px 32px 32px',
                borderRadius: 8,
                minWidth: 320,
                boxShadow: '0 2px 16px rgba(0,0,0,0.2)',
                position: 'relative',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <>
                <h2>Assign Reviewers</h2>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                  }}
                >
                  <Textarea
                    onChange={this.onReviewerChanged}
                    placeholder={'Reviewer names...'}
                    style={{ marginBottom: '8px' }}
                    value={this.state.reviewerNames}
                  />
                  <Button
                    onClick={() => this.handleReviewerAssignment(reviewerNames)}
                    variant={ButtonVariant.Secondary}
                    isOutlined={true}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        theme.colors.black5;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        theme.colors.white;
                    }}
                  >
                    Submit
                  </Button>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 24,
                  }}
                >
                  <Button
                    onClick={this.closeReviewerModal}
                    variant={ButtonVariant.Primary}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            </div>
          </div>
        )}
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
          .map((value: any): boolean => {
            return isValidSearchParameter(value);
          })
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
    if (
      this.state.account &&
      (this.state.account.accountType === UserType.STAFF ||
        this.state.account.accountType === UserType.HACKBOARD)
    ) {
      headers.push({ label: CONSTANTS.AGE_LABEL, key: 'accountId.age' });
      headers.push({
        label: CONSTANTS.PHONE_NUMBER_LABEL,
        key: 'accountId.phoneNumber',
      });
      headers.push({ label: 'Resume', key: 'application.general.URL.resume' });
      headers.push({ label: 'Github', key: 'application.general.URL.github' });
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
        label: 'Number of previous hackathons',
        key: 'application.shortAnswer.previousHackathons',
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
      // headers.push({
      //   label: CONSTANTS.ATTENDENCE_OPTION_PREFERENCE_LABEL,
      //   key: 'application.accommodation.attendancePreference',
      // });
      headers.push({
        label: CONSTANTS.IMPAIRMENTS_LABEL,
        key: 'application.accommodation.impairments',
      });
      headers.push({
        label: CONSTANTS.BARRIERS_LABEL,
        key: 'application.accommodation.barriers',
      });
      // headers.push({
      //   label: CONSTANTS.TRAVEL_LABEL,
      //   key: 'application.accommodation.travel',
      // });
      headers.push({
        label: CONSTANTS.ETHNICITY_LABEL,
        key: 'application.other.ethnicity',
      });
      headers.push({
        label: CONSTANTS.COUNTRY_LABEL,
        key: 'application.other.country',
      });
      headers.push({ label: CONSTANTS.GENDER_LABEL, key: 'accountId.gender' });
      headers.push({
        label: CONSTANTS.PRONOUN_LABEL,
        key: 'accountId.pronoun',
      });
      headers.push({
        label: CONSTANTS.DIETARY_RESTRICTIONS_LABEL,
        key: 'accountId.dietaryRestrictions',
      });
      headers.push({
        label: 'Authorize MLH to send emails',
        key: 'application.other.sendEmail',
      });
    }
    // Build header row
    const headerLabels = headers.map((h) => h.label);
    const csvRows: string[] = [headerLabels.join(',')];

    // Build each data row with proper escaping
    this.filter().forEach((result) => {
      if (!result.selected) return;
      const row: string[] = [];
      headers.forEach((header) => {
        let value: any = '';
        if (header.key.indexOf('.') >= 0) {
          const nestedAttr = header.key.split('.');
          value = getNestedAttr(result.hacker, nestedAttr);
        } else {
          value = (result.hacker as any)[header.key];
        }

        // Handle null/undefined, arrays, and coerce to string
        if (value == null) {
          value = '';
        } else if (Array.isArray(value)) {
          value = value.join('; ');
        } else {
          value = String(value);
        }

        // Escape double quotes and wrap if needed
        if (/[",\n]/.test(value)) {
          value = `"${value.replace(/"/g, '""')}"`;
        }

        row.push(value);
      });

      csvRows.push(row.join(','));
    });

    fileDownload(
      csvRows.join('\n'),
      'hackerData.csv',
      'text/csv;charset=utf-8'
    );
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
    } catch (e: any) {
      ValidationErrorGenerator(e.data);
      this.setState({ loading: false });
    }
  }
  private onResetForm() {
    this.setState({ query: [] });
    this.updateQueryURL([], this.state.searchBar);
  }

  private onFilterChange(newFilters: ISearchParameter[], reviewStatus: number[], reviewScore: number[]) {
    this.setState({
      query: newFilters,
      reviewStatusFilter: reviewStatus || [],
      reviewScoreFilter: reviewScore || [],
    }, () => {
      this.updateQueryURL(newFilters, this.state.searchBar);
      this.triggerSearch();
    });
  }

  private onSearchBarChanged(e: any) {
    const searchBar = e.target.value;
    this.setState({ searchBar });
    this.updateQueryURL(this.state.query, searchBar);
  }

  private onReviewerChanged(e: any) {
    const reviewerNames = e.target.value;
    this.setState({ reviewerNames });
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

  private handleReviewerAssignment = async (names: string) => {
    try {
      const reviewerNames = names.split(',').map((name) => name.trim()).filter((name) => name.length > 0);
      const resp = await Hacker.assignReviewers(reviewerNames);
      const result = resp.data;
      const assignedCount = result.assignedCount;
      const hackersAssigned = result.hackersAssigned;
      const assignments = result.assignments;

      toast.success(`Successfully assigned  ${result.data.reviewers} reviewers to ${result.data.assigned} hackers.`);
      await this.triggerSearch();
      this.closeReviewerModal();
      this.setState({ reviewerNames: '' });
    }
    catch (e: any) {
      toast.error(
        e.response?.data?.error || 'Failed to assign reviewers'
      );
    }
    

  }

  private calculateReviewStatusCount(hacker: IHacker): number {
    if (hacker.reviewerStatus != HackerReviewerStatus.HACKER_REVIEWER_STATUS_NONE && hacker.reviewerStatus2 != HackerReviewerStatus.HACKER_REVIEWER_STATUS_NONE) {
      return 2;
    } else if (hacker.reviewerStatus != HackerReviewerStatus.HACKER_REVIEWER_STATUS_NONE || hacker.reviewerStatus2 != HackerReviewerStatus.HACKER_REVIEWER_STATUS_NONE) {
      return 1;
    } else {
      return 0;
    }
  }

  private calculateReviewScoreCount(hacker: IHacker): number {
    const arr = [hacker.reviewerStatus, hacker.reviewerStatus2];
    if (arr[0]==HackerReviewerStatus.HACKER_REVIEWER_STATUS_NONE && arr[1]==HackerReviewerStatus.HACKER_REVIEWER_STATUS_NONE) {
      return -1;
    } else if (arr[0]==HackerReviewerStatus.HACKER_REVIEWER_STATUS_WHITELIST || arr[1]==HackerReviewerStatus.HACKER_REVIEWER_STATUS_WHITELIST) {
      return 5;
    } else {
      let score = 0;
      let numberOfReviews = 0;
      arr.forEach((val) => {
        if (val!=HackerReviewerStatus.HACKER_REVIEWER_STATUS_NONE && val!=HackerReviewerStatus.HACKER_REVIEWER_STATUS_WHITELIST) {
          numberOfReviews += 1;
          // Poor=0, Weak=1, Average=2, Strong=3, Outstanding=4
          if (val==HackerReviewerStatus.HACKER_REVIEWER_STATUS_WEAK) score += 1;
          else if (val==HackerReviewerStatus.HACKER_REVIEWER_STATUS_AVERAGE) score += 2;
          else if (val==HackerReviewerStatus.HACKER_REVIEWER_STATUS_STRONG) score += 3;
          else if (val==HackerReviewerStatus.HACKER_REVIEWER_STATUS_OUTSTANDING) score += 4;
        }
      });
      return score/numberOfReviews;
    } 
  }

  private filter() {
    const { sponsor, viewSaved, results } = this.state;
    const searchBar = this.state.searchBar.toLowerCase();
    return results.filter(({ hacker }) => {
      const { accountId } = hacker;
      let foundAcct;
      if (typeof accountId !== 'string') {
        const account = accountId as IAccount;
        if (account) {
          const fullName =
            `${account.firstName} ${account.lastName}`.toLowerCase();
          foundAcct =
            fullName.includes(searchBar) ||
            account.email.toLowerCase().includes(searchBar) ||
            (account.phoneNumber?.toString() || 'N/A').includes(searchBar) ||
            account.gender.toLowerCase().includes(searchBar) ||
            (account._id && account._id.includes(searchBar));
        }
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
        hacker.application.accommodation.attendancePreference.includes(
          searchBar
        ) ||
        (hacker.application.shortAnswer.skills &&
          hacker.application.shortAnswer.skills.toString().includes(searchBar));

      const passReviewStatusFilter = this.state.reviewStatusFilter.length === 0 || this.state.reviewStatusFilter.includes(this.calculateReviewStatusCount(hacker));
      const passReviewScoreFilter = this.state.reviewScoreFilter.length === 0 || this.state.reviewScoreFilter.includes(Math.round(this.calculateReviewScoreCount(hacker)));
      
      const isSavedBySponsorIfToggled =
        !viewSaved ||
        (sponsor && sponsor.nominees.some((n) => n === hacker.id));

      return (foundAcct || foundHacker) && isSavedBySponsorIfToggled && passReviewStatusFilter && passReviewScoreFilter;
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
