import * as React from 'react';
import { Pronouns } from '../config';
import { Label, StyledCreatableSelect } from '../shared';
import LabelTextComponent from './LabelTextComponent';

interface IPronounInputProp {
    value?: Pronouns | string;
    onPronounChanged: (selectedOptions: string) => void;
    label?: string;
    required?: boolean;
    placeholder: string;
}

const PronounInput: React.StatelessComponent<IPronounInputProp> = (props) => {
    const options: Array<{ label: string, value: string }> = [
        { label: Pronouns.SheHer, value: Pronouns.SheHer },
        { label: Pronouns.HeHim, value: Pronouns.HeHim },
        { label: Pronouns.TheyThem, value: Pronouns.TheyThem },
        { label: Pronouns.ZeHir, value: Pronouns.ZeHir },
        { label: Pronouns.ZeZir, value: Pronouns.ZeZir },
        { label: Pronouns.XeyXem, value: Pronouns.XeyXem },
        { label: Pronouns.AeAer, value: Pronouns.AeAer },
        { label: Pronouns.EEm, value: Pronouns.EEm },
        { label: Pronouns.EyEm, value: Pronouns.EyEm },
        { label: Pronouns.FaeFaer, value: Pronouns.FaeFaer },
        { label: Pronouns.FeyFem, value: Pronouns.FeyFem },
        { label: Pronouns.HuHum, value: Pronouns.HuHum },
        { label: Pronouns.ItIt, value: Pronouns.ItIt },
        { label: Pronouns.JeeJem, value: Pronouns.JeeJem },
        { label: Pronouns.KitKit, value: Pronouns.KitKit },
        { label: Pronouns.NeNem, value: Pronouns.NeNem },
        { label: Pronouns.PehPehm, value: Pronouns.PehPehm },
        { label: Pronouns.PerPer, value: Pronouns.PerPer },
        { label: Pronouns.SieHir, value: Pronouns.SieHir },
        { label: Pronouns.SeSim, value: Pronouns.SeSim },
        { label: Pronouns.ShiHir, value: Pronouns.ShiHir },
        { label: Pronouns.SiHyr, value: Pronouns.SiHyr },
        { label: Pronouns.TheyThem, value: Pronouns.TheyThem },
        { label: Pronouns.ThonThon, value: Pronouns.ThonThon },
        { label: Pronouns.VeVer, value: Pronouns.VeVer },
        { label: Pronouns.VeVem, value: Pronouns.VeVem },
        { label: Pronouns.ViVer, value: Pronouns.ViVer },
        { label: Pronouns.ViVim, value: Pronouns.ViVim },
        { label: Pronouns.XieXer, value: Pronouns.XieXer },
        { label: Pronouns.XeXem, value: Pronouns.XeXem },
        { label: Pronouns.XeyXem, value: Pronouns.XeyXem },
        { label: Pronouns.YoYo, value: Pronouns.YoYo },
        { label: Pronouns.ZeZem, value: Pronouns.ZeZem },
        { label: Pronouns.ZeMer, value: Pronouns.ZeMer },
        { label: Pronouns.ZeeZed, value: Pronouns.ZeeZed },
        { label: Pronouns.ZieZir, value: Pronouns.ZieZir },
        { label: Pronouns.ZieZem, value: Pronouns.ZieZem },
        { label: Pronouns.ZieHir, value: Pronouns.ZieHir },
        { label: Pronouns.ZmeZmyr, value: Pronouns.ZmeZmyr },
    ]
    return (
        <Label>
            <LabelTextComponent label={props.label} required={props.required} />
            <StyledCreatableSelect
                value={{ label: props.value, value: props.value }}
                id={'pronoun-selector'}
                inputId={'pronoun-selector-input'}
                className='react-select-container'
                classNamePrefix='react-select'
                onChange={handleChange(props)}
                options={options}
                allowCreateWhileLoading={true}
                createOptionPosition={'first'}
            />
        </Label>
    );
}

function handleChange(props: IPronounInputProp): (newValue: { label: string, value: string }) => void {
    return (newValue: { label: string, value: string }) => props.onPronounChanged(String(newValue.value || ''));
}

export default PronounInput;
