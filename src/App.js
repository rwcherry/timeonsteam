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
        <p>Time on Steam</p> 
        <SearchField />
      </header>
    </div>
    </ThemeProvider>
  );
}

export default App;
