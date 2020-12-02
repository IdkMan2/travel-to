import TableBody from '@material-ui/core/TableBody';
import IJourneyResource from '@server/interfaces/resources/IJourneyResource';
import React, {memo} from 'react';

import Row from './Row';

export interface IBodyProps {
  journeys: Omit<IJourneyResource, 'images'>[];
}

function Body(props: IBodyProps) {
  const {journeys} = props;

  return (
    <TableBody>
      {journeys.map((journey: IBodyProps['journeys'][number], index: number) => (
        <Row key={journey._id} journey={journey} index={index} />
      ))}
    </TableBody>
  );
}

export default memo(Body);
