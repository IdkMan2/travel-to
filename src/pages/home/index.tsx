import {IWithProtectedAccessProps, withProtectedAccess} from '@ad-hocs/withProtectedAccess';
import {Typography} from '@material-ui/core';
import React, {memo} from 'react';

type HomeProps = IWithProtectedAccessProps;

function Home(_props: HomeProps) {
  return (
    <div>
      <Typography variant={'h2'}>Home</Typography>
    </div>
  );
}

export default memo(withProtectedAccess(Home));
