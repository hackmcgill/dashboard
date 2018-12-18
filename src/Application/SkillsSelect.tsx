import { FieldProps } from 'formik';
import * as React from 'react';
import { Skills } from '../config';
import { Label, LabelText, StyledCreatableSelect } from '../shared/Form';

/**
 * ISkillsComponent props
 */
export interface ISkillsComponentProps {
  label?: string;
  required?: boolean;
}

/**
 * SkillsComponent renders a dropdown for users to select their Skills, and
 * potentially create their own restrictions.
 */
const SkillsComponent: React.StatelessComponent<
  ISkillsComponentProps & FieldProps
> = (props) => {
  const options: Array<{ label: string; value: string }> = [
    { label: Skills.Android, value: Skills.Android },
    {
      label: Skills.ArtificialIntelligence,
      value: Skills.ArtificialIntelligence,
    },
    { label: Skills.BackEnd, value: Skills.BackEnd },
    { label: Skills.C, value: Skills.C },
    { label: Skills.CPlusPlus, value: Skills.CPlusPlus },
    { label: Skills.CSharp, value: Skills.CSharp },
    { label: Skills.CSS, value: Skills.CSS },
    { label: Skills.DataScience, value: Skills.DataScience },
    { label: Skills.DesktopApps, value: Skills.DesktopApps },
    { label: Skills.Django, value: Skills.Django },
    { label: Skills.Excel, value: Skills.Excel },
    { label: Skills.FPGA, value: Skills.FPGA },
    { label: Skills.FrontEnd, value: Skills.FrontEnd },
    { label: Skills.HTML, value: Skills.HTML },
    { label: Skills.iOS, value: Skills.iOS },
    { label: Skills.Java, value: Skills.Java },
    { label: Skills.Javascript, value: Skills.Javascript },
    { label: Skills.JS, value: Skills.JS },
    { label: Skills.MachineLearning, value: Skills.MachineLearning },
    { label: Skills.MobileApps, value: Skills.MobileApps },
    { label: Skills.MongoDB, value: Skills.MongoDB },
    {
      label: Skills.NaturalLanguageProcessing,
      value: Skills.NaturalLanguageProcessing,
    },
    { label: Skills.NeuralNets, value: Skills.NeuralNets },
    { label: Skills.NodeJS, value: Skills.NodeJS },
    { label: Skills.PHP, value: Skills.PHP },
    { label: Skills.ProductManagement, value: Skills.ProductManagement },
    { label: Skills.Python, value: Skills.Python },
    { label: Skills.React, value: Skills.React },
    { label: Skills.RNN, value: Skills.RNN },
    { label: Skills.Robotics, value: Skills.Robotics },
    { label: Skills.Ruby, value: Skills.Ruby },
    { label: Skills.RubyonRails, value: Skills.RubyonRails },
    { label: Skills.Swift, value: Skills.Swift },
    { label: Skills.TS, value: Skills.TS },
    { label: Skills.Typescript, value: Skills.Typescript },
    { label: Skills.UIDesign, value: Skills.UIDesign },
    { label: Skills.Unity, value: Skills.Unity },
    { label: Skills.UXDesign, value: Skills.UXDesign },
  ];
  return (
    <Label>
      <LabelText label={props.label} required={props.required} />
      <StyledCreatableSelect
        className="react-select-container"
        classNamePrefix="react-select"
        id="skills"
        isMulti={true}
        onChange={handleChange(props)}
        options={options}
      />
    </Label>
  );
};
/**
 * Function factory that generates function to handle changes in user's choice.
 * @param props The props passed into the Skills component.
 * @returns the function that handles changes to the choices provided by the user.
 */
function handleChange(
  props: FieldProps
): (newValue: [{ label: string; value: string }]) => void {
  return (newValue: [{ label: string; value: string }]) => {
    const field = props.field;
    const form = props.form;
    const skills = newValue.map((value) => value.value);
    form.setFieldValue(field.name, skills);
  };
}

export default SkillsComponent;
