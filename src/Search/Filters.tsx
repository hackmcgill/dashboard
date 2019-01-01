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
} from '../config';
import { GradYears } from '../config';
import { Button, H1 } from '../shared/Elements';
import { Form } from '../shared/Form';
import * as FormikElements from '../shared/Form/FormikElements';
import theme from '../shared/Styles/theme';
import { getOptionsFromEnum } from '../util';

interface IFilterProps {
  onChange: (newFilters: ISearchParameter[]) => void;
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
      <Box m={'auto'}>
        <H1
          color={theme.colors.primary}
          fontSize={'30px'}
          textAlign={'left'}
          marginTop={'0px'}
          marginBottom={'20px'}
        >
          Filters
        </H1>
        <Formik
          initialValues={{
            school: [],
            gradYear: [],
            degree: [],
            status: [],
            skills: [],
            jobInterest: [],
          }}
          onSubmit={this.handleSubmit}
          render={this.renderFormik}
        />
      </Box>
    );
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
          label={'Job Search'}
          placeholder={'Search...'}
          isMulti={true}
          options={getOptionsFromEnum(JobInterest)}
          component={FormikElements.Select}
          value={fp.values.jobInterest}
        />
        <Flex justifyContent={'center'}>
          <Box>
            <Button
              type="submit"
              isLoading={this.props.loading}
              disabled={this.props.loading}
            >
              Submit
            </Button>
          </Box>
          <Box>
            <Button onClick={this.resetForm(fp)} type="button" secondary={true}>
              Reset
            </Button>
          </Box>
        </Flex>
      </Form>
    );
  }
  private resetForm(fp: FormikProps<any>): () => void {
    return () => {
      fp.resetForm();
    };
  }
  /**
   * Converts the formik values into a search parameter list, and calls onChange hook.
   * @param values Formik values
   */
  private handleSubmit(values: FormikValues) {
    const schoolSearchParam = this.list2SearchParam('school', values.school);
    const gradYearParam = this.list2SearchParam(
      'graduationYear',
      values.gradYear
    );
    const degreeParam = this.list2SearchParam('degree', values.degree);
    const statusParam = this.list2SearchParam('status', values.status);
    const skillsParam = this.list2SearchParam(
      'application.skills',
      values.skills
    );
    const jobInterestParam = this.list2SearchParam(
      'application.jobInterest',
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
            operation: StringOperations.IN,
            value: values,
          },
        ]
      : [];
  }
}

export { FilterComponent };
