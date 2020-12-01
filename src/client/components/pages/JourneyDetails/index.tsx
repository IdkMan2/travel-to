import Dashboard, {IDashboardProps} from '@client/components/layouts/Dashboard';
import JourneyDetailsList from '@client/components/organisms/JourneyDetailsList';
import {IComponentWithLayout} from '@client/interfaces/ILayout';
import Grid from '@material-ui/core/Grid';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import IJourneyResource from '@server/interfaces/resources/IJourneyResource';
import {NextPage} from 'next';
import {useRouter} from 'next/router';
import React from 'react';

interface ILocalProps {
  journey?: IJourneyResource;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gridBox: {
      maxWidth: 500,
    },
    paper: {
      padding: theme.spacing(2, 3),
    },
    details: {
      margin: theme.spacing(2, 'auto'),
      [theme.breakpoints.up('md')]: {
        margin: theme.spacing(4, 'auto'),
      },
    },
  })
);

const Page: NextPage<ILocalProps> & IComponentWithLayout<IDashboardProps> = function JourneyDetails(
  props: ILocalProps
) {
  const {journey} = props;
  const router = useRouter();
  const classes = useStyles();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback || journey === undefined) {
    return <div>Loading...</div>;
  } else {
    return (
      <Grid container justify={'center'}>
        <Grid item xs={12} lg={6} className={classes.gridBox}>
          <JourneyDetailsList journey={journey} className={classes.details} />
        </Grid>
      </Grid>
    );
  }
};

Page.layout = Dashboard;

export default Page;
