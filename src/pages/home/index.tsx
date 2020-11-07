import {Typography} from '@material-ui/core';
import React, {memo} from 'react';

function Home() {
  return (
    <div>
      <Typography variant={'h2'}>Home</Typography>
    </div>
  );
}

export default memo(Home);
