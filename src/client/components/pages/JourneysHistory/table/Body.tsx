import TableBody from '@material-ui/core/TableBody';
import IJourneyResource from '@server/interfaces/resources/IJourneyResource';
import React, {memo} from 'react';

import Row from './Row';

export interface IBodyProps {
  journeys: IJourneyResource[];
}

function Body(props: IBodyProps) {
  const {journeys} = props;

  return (
    <TableBody>
      {journeys.map((journey: IJourneyResource, index: number) => (
        <Row key={journey._id} journey={journey} index={index} />
      ))}
    </TableBody>
  );
}

export default memo(Body);
