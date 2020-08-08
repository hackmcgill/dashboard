import React, { useState, useContext } from 'react';
import { Sponsor } from '../../api';
import { Checkbox } from '../../shared/Form';
import NomineeContext from './Context';

interface IProps {
  hackerId: string;
}

// push the selected hacker to the list of selected hacker for the search
const HackerSelect: React.FC<IProps> = (props) => {
  // react state.context is assigned to the variable "contet"
  const context = useContext(NomineeContext);

  // state to only change one hacker selection state at a time
  const [isChanging, setIsChanging] = useState<boolean>(false);

  // function to push selected hacker to the search list
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    const { hackerId } = props;

    if (isChanging) {
      return;
    }

    if (context) {
      // push them to the selected list
      if (isChecked) {
        context.nominees.push(hackerId);
      } else {
        // remove selected hacker from list
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
