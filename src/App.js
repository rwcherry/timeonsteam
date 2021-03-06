import { CssBaseline, Grid } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import SearchField from './SearchField.js';
import theme from './theme.js'
import ReactGA from 'react-ga';

const trackingId = "UA-192123823-1";

function App() {

  ReactGA.initialize(trackingId);
  ReactGA.pageview("index");
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={12}>
          <h1>Time on Steam</h1>
          <SearchField />
        </Grid>   
      </Grid> 
    </ThemeProvider >
  );
}

export default App;
