import * as React from 'react';

// import { Flex } from '@rebass/grid';

import { IHacker } from '../config';
import { MaxWidthBox } from '../shared/Elements';

interface IHackerViewProps {
  hacker: IHacker;
}

class SingleHackerView extends React.Component<IHackerViewProps, {}> {
  public render() {
    return (
      <article>
        <MaxWidthBox>
          <span>{JSON.stringify(this.props.hacker)}</span>
        </MaxWidthBox>
      </article>
    );
  }
}

export default SingleHackerView;
