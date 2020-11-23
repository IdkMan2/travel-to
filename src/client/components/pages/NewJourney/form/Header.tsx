import FullWidthFormLayout from '@client/components/atoms/FullWidthFormLayout';
import Typography from '@material-ui/core/Typography';
import React, {memo} from 'react';

function Header() {
  return (
    <FullWidthFormLayout>
      <Typography variant={'h6'}>Add new journey</Typography>
    </FullWidthFormLayout>
  );
}

export default memo(Header);
