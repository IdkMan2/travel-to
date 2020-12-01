import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IJourneyResource from '@server/interfaces/resources/IJourneyResource';
import {unixTimestampToDateFormat} from '@utils/dates-utils';
import {useRouter} from 'next/router';
import React, {memo, useCallback, useMemo} from 'react';

export interface IRowProps {
  journey: IJourneyResource;
  index: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tr: {
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
);

function Row({journey, index}: IRowProps) {
  const router = useRouter();
  const classes = useStyles();
  const [startDay, endDay]: [string, string] = useMemo(() => {
    return [unixTimestampToDateFormat(journey.startDate), unixTimestampToDateFormat(journey.endDate)];
  }, [journey]);

  const handleClick = useCallback(() => {
    router.push('/home/journeys/' + journey.id);
  }, [router, journey]);

  return (
    <TableRow className={classes.tr} onClick={handleClick}>
      <TableCell align={'left'}>{index + 1}</TableCell>
      <TableCell align={'right'}>{startDay}</TableCell>
      <TableCell align={'right'}>{endDay}</TableCell>
      <TableCell align={'right'}>{journey.kilometersTraveled}</TableCell>
    </TableRow>
  );
}

export default memo(Row);
