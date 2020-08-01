import React, { useState, useContext } from 'react';
import { Sponsor } from '../../api';
import { Checkbox } from '../../shared/Form';
import NomineeContext from './Context';

interface IProps {
  hackerId: string;
}

const HackerSelect: React.FC<IProps> = (props) => {
  const context = useContext(NomineeContext);

  const [isChanging, setIsChanging] = useState<boolean>(false);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    const { hackerId } = props;

    if (isChanging) {
      return;
    }

    if (context) {
      if (isChecked) {
        context.nominees.push(hackerId);
      } else {
        context.nominees = context.nominees.filter(
          (n: string) => n !== hackerId
        );
      }
    }

    setIsChanging(true);
    if (context) {
      await Sponsor.update(context);
    }
    setIsChanging(false);
  };

  const { hackerId } = props;
  if (!context || !context.nominees) {
    return <div />;
  }
  let isChecked: boolean = false;
  if (context) {
    isChecked = context.nominees.indexOf(hackerId) > -1;
  }
  return (
    <div>
      <Checkbox checked={isChecked} onChange={handleChange} />
    </div>
  );
};

export default HackerSelect;
