import { CssBaseline, Grid } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import SearchField from './SearchField.js';
import theme from './theme.js'

function App() {

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
