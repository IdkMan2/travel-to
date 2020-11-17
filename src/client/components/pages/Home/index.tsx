import {withProtectedAccess} from '@client/ad-hocs/withProtectedAccess';
import StartView from '@client/components/organisms/StartView';
import Dashboard from '@client/components/templates/Dashboard';
import React, {memo} from 'react';

function Home() {
  return (
    <Dashboard>
      <StartView />
    </Dashboard>
  );
}

export default memo(withProtectedAccess(Home));
