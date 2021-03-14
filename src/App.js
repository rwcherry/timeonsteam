import './App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import SearchField from './SearchField.js';

function App() {

  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
    <div className="App">
      <header className="App-header">
        <h1>Time on Steam</h1> 
        <SearchField />
      </header>
    </div>
    </ThemeProvider>
  );
}

export default App;
