import * as React from 'react';

interface IStatComponentProps {
  statName: string;
  stat: { [key: string]: number };
}

const SingleStatComponent: React.StatelessComponent<IStatComponentProps> = (
  props: IStatComponentProps
) => {
  console.log(props);
  const list = Object.keys(props.stat).map((k: string, index) => {
    return (
      <li key={index}>
        {k}: {props.stat[k]}
      </li>
    );
  });
  return (
    <ul>
      {props.statName}: {list}
    </ul>
  );
};

export { SingleStatComponent };
