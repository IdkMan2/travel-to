import React, {memo} from 'react';
import {Typography} from '@material-ui/core';

function Intro() {

  return (
    <div>
      <Typography variant={'h2'}>Intro</Typography>
    </div>
  );
}

export default memo(Intro);
