import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import lightTheme from '../assets/theme/light';

function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={lightTheme}>
        <div>
          Test
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
