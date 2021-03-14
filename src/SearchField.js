import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React from 'react';


class SearchField extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
       value: '',
       timeplayed: null
      }

    this.handleChange = this.handleChange.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  keyPress(e) {
    if (e.keyCode == 13) {

      console.log('value', e.target.value);
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vanity: e.target.value })
      };
      fetch('http://timeonsteam.com:2889/profileInfo', requestOptions)
        .then(response => response.json())
        .then(data => console.log(data));
    }
  }

  render() {
    const classes = makeStyles((theme) => ({
      App: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
      },
    }));
    if (this.state.)
    return (
      <TextField
        label="SteamId or vanity url"
        id="margin-normal"
        defaultValue="https://steamcommunity.com/id/archerry/"
        className={classes.textField}
        helperText="Your steam user id or vanity url"
        margin="normal"
        variant="filled"
        onKeyDown={this.keyPress}
        onChange={this.handleChange}
      />
    );
  }
}

export default SearchField;
