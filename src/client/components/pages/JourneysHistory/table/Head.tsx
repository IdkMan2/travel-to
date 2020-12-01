import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, {memo} from 'react';

function Head() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>No</TableCell>
        <TableCell align='right'>Start day</TableCell>
        <TableCell align='right'>End day</TableCell>
        <TableCell align='right'>Kilometers</TableCell>
      </TableRow>
    </TableHead>
  );
}

export default memo(Head);
