import { Box, Flex } from '@rebass/grid';
import { FastField, Formik, FormikProps, FormikValues } from 'formik';
import * as React from 'react';

import {
  Degrees,
  HackerStatus,
  ISearchParameter,
  JobInterest,
  SchoolsLVpair,
  Skills,
  StringOperations,
  reviewers
} from '../../config';
import { GradYears } from '../../config';
import Button, { ButtonVariant } from '../../shared/Elements/Button';
import { Form } from '../../shared/Form';
import * as FormikElements from '../../shared/Form/FormikElements';
import { getOptionsFromEnum } from '../../util';
import { cut } from 'clipboard';

interface IFilterProps {
  initFilters: ISearchParameter[];
  onChange: (newFilters: ISearchParameter[], reviewStatus?: number[], reviewScore?: number[]) => void;
  onResetForm: () => void;
  loading: boolean;
  reviewerModeOpen: boolean;
}

class FilterComponent extends React.Component<IFilterProps, {}> {
  constructor(props: IFilterProps) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderFormik = this.renderFormik.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }
  public render() {
    return (
      <Box>
        <Formik
          enableReinitialize={true}
          initialValues={this.parseInitialValues(this.props.initFilters)}
          onSubmit={this.handleSubmit}
        >
          {this.renderFormik}
        </Formik>
      </Box>
    );
  }
  private parseInitialValues(initFilters: ISearchParameter[]) {
    const initVals = {
      school: this.searchParam2List('application.general.school', initFilters),
      gradYear: this.searchParam2List(
        'application.general.graduationYear',
        initFilters
      ),
      degree: this.searchParam2List('application.general.degree', initFilters),
      status: this.searchParam2List('status', initFilters),
      reviewStatus: this.searchParam2List('reviewStatus', initFilters),
      skills: this.searchParam2List(
        'application.shortAnswer.skills',
        initFilters
      ),
      jobInterest: this.searchParam2List(
        'application.general.jobInterest',
        initFilters
      ),
      reviewer1: this.searchParam2List('reviewerName', initFilters),
      reviewer2: this.searchParam2List('reviewerName2', initFilters),
    };
    return initVals;
  }

  private renderFormik(fp: FormikProps<any>) {
    return (
      <Form onSubmit={fp.handleSubmit}>
        <FastField
          name={'school'}
          options={SchoolsLVpair}
          isMulti={true}
          creatable={true}
          component={FormikElements.Select}
          label={'School'}
          placeholder={'School...'}
          value={fp.values.school}
        />
        <FastField
          name={'gradYear'}
          options={GradYears}
          isMulti={true}
          creatable={true}
          component={FormikElements.Select}
          label={'Graduation Year'}
          placeholder={'Grad Year...'}
          value={fp.values.gradYear}
        />
        <FastField
          name={'degree'}
          label={'Degree'}
          placeholder={'Degrees...'}
          isMulti={true}
          creatable={true}
          options={getOptionsFromEnum(Degrees)}
          component={FormikElements.Select}
          value={fp.values.degree}
        />
        <FastField
          name={'status'}
          label={'Status'}
          placeholder={'Statuses...'}
          isMulti={true}
          creatable={true}
          options={getOptionsFromEnum(HackerStatus)}
          component={FormikElements.Select}
          value={fp.values.status}
        />
        {(this.props.reviewerModeOpen && (
          <>
          <FastField
            name={'reviewStatus'}
            label={'Review Status'}
            placeholder={'Review Statuses...'}
            isMulti={true}
            creatable={true}
            options={[
              { label: '0', value: 0 },
              { label: '1', value: 1 },
              { label: '2', value: 2 },
            ]}
            component={FormikElements.Select}
            value={fp.values.reviewStatus}
          />
          <FastField
            name={'reviewScore'}
            label={'Review Score'}
            placeholder={'Review Scores...'}
            isMulti={true}
            creatable={true}
            options={[
              { label: '-1', value: -1 }, // both none
              { label: '0', value: 0 },
              { label: '1', value: 1 },
              { label: '2', value: 2 },
              { label: '3', value: 3 },
              { label: '4', value: 4 },
              { label: '5', value: 5 }, // whitelist
            ]}
            component={FormikElements.Select}
            value={fp.values.reviewScore}
          />
          </>
        ))}
        <FastField
          name={'skills'}
          label={'Skills'}
          placeholder={'Skills...'}
          isMulti={true}
          creatable={true}
          options={getOptionsFromEnum(Skills)}
          component={FormikElements.Select}
          value={fp.values.skills}
        />
        <FastField
          name={'jobInterest'}
          label={'Job Interest'}
          placeholder={'Search...'}
          isMulti={true}
          options={getOptionsFromEnum(JobInterest)}
          component={FormikElements.Select}
          value={fp.values.jobInterest}
        />
        {(this.props.reviewerModeOpen && (
          <>
          <FastField
            name={'reviewer1'}
            label={'Reviewer 1'}
            placeholder={'Reviewer 1...'}
            isMulti={true}
            component={FormikElements.Select}
            options={getOptionsFromEnum(reviewers)}
            value={fp.values.reviewer1}
          />
          <FastField
            name={'reviewer2'}
            label={'Reviewer 2'}
            placeholder={'Reviewer 2...'}
            isMulti={true}
            component={FormikElements.Select}
            options={getOptionsFromEnum(reviewers)}
            value={fp.values.reviewer2}
          />
          <FastField
            name={'reviewStatus'}
            label={'Review Status'}
            placeholder={'Review Statuses...'}
            isMulti={true}
            creatable={true}
            options={[
              { label: '0', value: 0 },
              { label: '1', value: 1 },
              { label: '2', value: 2 },
            ]}
            component={FormikElements.Select}
            value={fp.values.reviewStatus}
          />
          {/* <FastField
            name={'cutoffTime'}
            label={'Cutoff Time'}
            placeholder={'2025-11-17T23:59:59.000Z'}
            component={FormikElements.Input}
          /> */}
          </>
        ))}
        <Flex justifyContent={'center'}>
          <Box mr={'10px'}>
            <Button
              onClick={this.resetForm(fp)}
              type="button"
              variant={ButtonVariant.Secondary}
              isOutlined={true}
            >
              Reset
            </Button>
          </Box>
          <Box>
            <Button
              type="submit"
              isLoading={this.props.loading}
              disabled={this.props.loading}
              variant={ButtonVariant.Primary}
            >
              Submit
            </Button>
          </Box>
        </Flex>
        <div style={{ height: '20px' }}></div> {/* add space under filter */}
      </Form>
    );
  }
  private resetForm(fp: FormikProps<any>): () => void {
    return () => {
      fp.resetForm();
      this.props.onResetForm();
    };
  }
  /**
   * Converts the formik values into a search parameter list, and calls onChange hook.
   * @param values Formik values
   */
  private handleSubmit(values: FormikValues) {
    const schoolSearchParam = this.list2SearchParam(
      'application.general.school',
      values.school
    );
    const gradYearParam = this.list2SearchParam(
      'application.general.graduationYear',
      values.gradYear
    );
    const degreeParam = this.list2SearchParam(
      'application.general.degree',
      values.degree
    );
    const statusParam = this.list2SearchParam('status', values.status);
    const skillsParam = this.list2SearchParam(
      'application.shortAnswer.skills',
      values.skills
    );
    const jobInterestParam = this.list2SearchParam(
      'application.general.jobInterest',
      values.jobInterest
    );
    const reviewer1Param = this.list2SearchParam(
      'reviewerName',
      values.reviewer1
    );
    const reviewer2Param = this.list2SearchParam(
      'reviewerName2',
      values.reviewer2
    );
    // const cutoffObjectId = new ObjectId(Math.floor((new Date(values.cutoffTime)).getTime() / 1000).toString(16) + "0000000000000000");
    // const cutoffTimeParam = values.cutoffTime
    //   ? [
    //       {
    //         raw: {
    //           _id: { $lte: cutoffObjectId}
    //         }
    //       },
    //     ]
    //   : [];
    let search: ISearchParameter[] = [];
    search = search.concat(
      schoolSearchParam,
      gradYearParam,
      degreeParam,
      statusParam,
      skillsParam,
      jobInterestParam,
      reviewer1Param,
      reviewer2Param,
      // cutoffTimeParam
    );
    // this.props.onChange(search);
    // this.props.onChange(search, values.reviewStatus);
    this.props.onChange(search, values.reviewStatus, values.reviewScore);
  }

  /**
   * Converts formik value to SearchParameter list.
   * @param param the location in the schema that these values must be in.
   * @param values the formik values.
   */
  private list2SearchParam(
    param: string,
    values: string[]
  ): ISearchParameter[] {
    return values.length > 0
      ? [
          {
            param,
            operation: StringOperations.IN,
            value: values,
          },
        ]
      : [];
  }
  private searchParam2List(
    param: string,
    searchParamList: ISearchParameter[]
  ): Array<string | number | boolean> {
    let searches: Array<string | number | boolean> = [];
    searchParamList.forEach((searchParam) => {
      if (searchParam.param === param) {
        if (Array.isArray(searchParam.value)) {
          searches = searches.concat(searchParam.value);
        } else {
          searches.push(searchParam.value);
        }
      }
    });
    return searches;
  }
}

export { FilterComponent };
