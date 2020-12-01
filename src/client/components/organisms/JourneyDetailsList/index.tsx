import useMergeClasses from '@client/hooks/useMergeClasses';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import CalendarIcon from '@material-ui/icons/CalendarTodayOutlined';
import RunIcon from '@material-ui/icons/DirectionsRunOutlined';
import MapIcon from '@material-ui/icons/MapOutlined';
import PinIcon from '@material-ui/icons/RoomOutlined';
import IJourneyResource from '@server/interfaces/resources/IJourneyResource';
import {unixTimestampToDateFormat} from '@utils/dates-utils';
import classNames from 'classnames';
import React, {memo} from 'react';

export interface IJourneyDetailsListProps {
  journey: IJourneyResource;
  className?: string;
  classes?:
    | Partial<ReturnType<typeof useStyles>>
    | ((classes: ReturnType<typeof useStyles>) => Partial<ReturnType<typeof useStyles>>);
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {},
    dates: {
      padding: 0,
      flexDirection: 'column',
      [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
      },
    },
  })
);

function JourneyDetailsList(props: IJourneyDetailsListProps) {
  const {journey, className} = props;
  const classes = useMergeClasses(useStyles(), props.classes);

  return (
    <Paper className={classNames(classes.paper, className)}>
      <List>
        <ListItem className={classes.dates}>
          <ListItem component={'span'}>
            <ListItemIcon>
              <CalendarIcon />
            </ListItemIcon>
            <ListItemText primary='Start day' secondary={unixTimestampToDateFormat(journey.startDate)} />
          </ListItem>

          <ListItem component={'span'}>
            <ListItemIcon>
              <CalendarIcon />
            </ListItemIcon>
            <ListItemText primary='End day' secondary={unixTimestampToDateFormat(journey.endDate)} />
          </ListItem>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <MapIcon />
          </ListItemIcon>
          <ListItemText primary='Start point' secondary={journey.startPoint} />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <PinIcon />
          </ListItemIcon>
          <ListItemText primary='End point' secondary={journey.endPoint} />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <RunIcon />
          </ListItemIcon>
          <ListItemText primary='Kilometers traveled' secondary={journey.kilometersTraveled} />
        </ListItem>
      </List>
    </Paper>
  );
}

export default memo(JourneyDetailsList);
