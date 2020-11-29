import {withProtectedAccess} from '@client/ad-hocs/withProtectedAccess';
import Dashboard from '@client/components/layouts/Dashboard';
import {Typography} from '@material-ui/core';
import React from 'react';

function MyAccount() {
  return <Typography>MyAccount</Typography>;
}

MyAccount.layout = Dashboard;

export default withProtectedAccess(MyAccount);
