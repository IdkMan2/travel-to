import React, {memo} from 'react';
import {Typography} from '@material-ui/core';

function Home() {

  return (
    <div>
      <Typography variant={'h2'}>Home</Typography>
    </div>
  );
}

export default memo(Home);
