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

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ steamid: e.target.value })
      };

      if (isNaN(e.target.value)) {
        requestOptions.body = JSON.stringify({ vanity: e.target.value });
      }

      fetch('http://timeonsteam.com:2889/profileInfo', requestOptions)
        .then(response => response.json())
        .then(data => this.setState({ timeplayed: data.total_played }));
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
    if (this.state.timeplayed == null)
    {
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
    else
    {
      return (
        <h2>You've played an insane {this.state.timeplayed} minutes on steam!</h2>
      )
    }
  }
}

export default SearchField;
