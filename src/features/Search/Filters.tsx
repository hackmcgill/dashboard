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

const FilterComponent: React.FC<IFilterProps> = (props) => {
  const parseInitialValues = (initFilters: ISearchParameter[]) => {
    const initVals = {
      school: searchParam2List('application.general.school', initFilters),
      gradYear: searchParam2List(
        'application.general.graduationYear',
        initFilters
      ),
      degree: searchParam2List('application.general.degree', initFilters),
      status: searchParam2List('status', initFilters),
      skills: searchParam2List('application.shortAnswer.skills', initFilters),
      jobInterest: searchParam2List(
        'application.general.jobInterest',
        initFilters
      ),
    };
    return initVals;
  };

  const renderFormik = (fp: FormikProps<any>) => {
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
          <Box>
            <Button
              type="submit"
              isLoading={props.loading}
              disabled={props.loading}
            >
              Submit
            </Button>
          </Box>
          <Box>
            <Button
              onClick={resetForm(fp)}
              type="button"
              variant={ButtonVariant.Secondary}
            >
              Reset
            </Button>
          </Box>
        </Flex>
      </Form>
    );
  };
  const resetForm = (fp: FormikProps<any>): (() => void) => {
    return () => {
      fp.resetForm();
      props.onResetForm();
    };
  };
  /**
   * Converts the formik values into a search parameter list, and calls onChange hook.
   * @param values Formik values
   */
  const handleSubmit = (values: FormikValues) => {
    const schoolSearchParam = list2SearchParam(
      'application.general.school',
      values.school
    );
    const gradYearParam = list2SearchParam(
      'application.general.graduationYear',
      values.gradYear
    );
    const degreeParam = list2SearchParam(
      'application.general.degree',
      values.degree
    );
    const statusParam = list2SearchParam('status', values.status);
    const skillsParam = list2SearchParam(
      'application.shortAnswer.skills',
      values.skills
    );
    const jobInterestParam = list2SearchParam(
      'application.general.jobInterest',
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
    props.onChange(search);
  };

  /**
   * Converts formik value to SearchParameter list.
   * @param param the location in the schema that these values must be in.
   * @param values the formik values.
   */
  const list2SearchParam = (
    param: string,
    values: string[]
  ): ISearchParameter[] => {
    return values.length > 0
      ? [
          {
            param,
            operation: StringOperations.IN,
            value: values,
          },
        ]
      : [];
  };
  const searchParam2List = (
    param: string,
    searchParamList: ISearchParameter[]
  ): Array<string | number | boolean> => {
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
  };

  return (
    <Box>
      <Formik
        enableReinitialize={true}
        initialValues={parseInitialValues(props.initFilters)}
        onSubmit={handleSubmit}
        render={renderFormik}
      />
    </Box>
  );
};

export { FilterComponent };
