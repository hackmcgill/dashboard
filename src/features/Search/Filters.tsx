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
} from '../../config';
import { GradYears } from '../../config';
import Button, { ButtonVariant } from '../../shared/Elements/Button';
import { Form } from '../../shared/Form';
import * as FormikElements from '../../shared/Form/FormikElements';
import { getOptionsFromEnum } from '../../util';

interface IFilterProps {
  initFilters: ISearchParameter[];
  onChange: (newFilters: ISearchParameter[]) => void;
  onResetForm: () => void;
  loading: boolean;
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
          render={this.renderFormik}
        />
      </Box>
    );
  }
  private parseInitialValues(initFilters: ISearchParameter[]) {
    const initVals = {
      school: this.searchParam2List(
        "jsonb_extract_path_text(application,'general','school')",
        initFilters
      ),
      gradYear: this.searchParam2List(
        "jsonb_extract_path_text(application,'general','graduationYear')",
        initFilters
      ),
      degree: this.searchParam2List(
        "jsonb_extract_path_text(application,'general','degree')",
        initFilters
      ),
      status: this.searchParam2List('status', initFilters),
      skills: this.searchParam2List(
        "jsonb_extract_path_text(application,'shortAnswer','skills')",
        initFilters
      ),
      jobInterest: this.searchParam2List(
        "jsonb_extract_path_text(application,'general','jobInterest')",
        initFilters
      ),
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
      "ARRAY[jsonb_extract_path_text(application,'general','school')]",
      values.school
    );
    const gradYearParam = this.list2SearchParam(
      "ARRAY[jsonb_extract_path_text(application,'general','graduationYear')]",
      values.gradYear
    );
    const degreeParam = this.list2SearchParam(
      "ARRAY[jsonb_extract_path_text(application,'general','degree')]",
      values.degree
    );
    const statusParam = this.list2SearchParam('status', values.status);
    const skillsParam = this.list2SearchParam(
      "ARRAY[jsonb_extract_path_text(application,'shortAnswer','skills')]",
      values.skills
    );
    const jobInterestParam = this.list2SearchParam(
      "ARRAY[jsonb_extract_path_text(application,'general','jobInterest')]",
      values.jobInterest
    );
    let search: ISearchParameter[] = [];
    search = search.concat(
      schoolSearchParam,
      gradYearParam,
      degreeParam,
      statusParam,
      skillsParam,
      jobInterestParam
    );
    this.props.onChange(search);
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
            operation: StringOperations.EQUALS,
            value: values,
          },
        ]
      : [];
  }
  private searchParam2List(
    param: string,
    searchParamList: ISearchParameter[]
  ): string {
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
    // We go from Array to String to allow SQL query to execute.
    return `ARRAY[${searches}]`;
  }
}

export { FilterComponent };
