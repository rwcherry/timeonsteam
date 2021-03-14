import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';

import comparisonThings from "./data/time_comparisons.json"

const useStyles = (theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    minWidth: 650,
  },
  table: {
    minWidth: 650,
  },
});

class SearchField extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
       value: '',
       timeplayed: null,
       row_data: [{name: "Days", time_in_minutes:1440}, {name:"Hours", time_in_minutes:60}]
      }

    this.handleChange = this.handleChange.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  keyPress(e) {
    // 13 is Enter
    if (e.keyCode === 13) {

      this.setState({
        row_data: this.state.row_data.concat(comparisonThings)
      })

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ steamid: e.target.value })
      };

      if (isNaN(e.target.value)) {
        let pieces = e.target.value.split('/')
        if (pieces.length == 0)
        {
          return
        }

        let vanityName = pieces[pieces.length - 1]
        if (vanityName === "")
        {
          vanityName = pieces[pieces.length - 2]
        }
        requestOptions.body = JSON.stringify({ vanity: vanityName });
      }

      fetch('http://timeonsteam.com:2889/profileInfo', requestOptions)
        .then(response => response.json())
        .then(data => this.setState({ timeplayed: data.total_played }));
    }
  }

  render() {
    const {classes} = this.props
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
        <Paper>
          <h2>You've played an insane {this.state.timeplayed} minutes on steam!</h2>
          <p>In that time you could've... </p>
          <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Done This</TableCell>
                <TableCell align="right">This Many Times</TableCell>
              </TableRow>
            </TableHead>
              <TableBody>
                {this.state.row_data.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{(this.state.timeplayed / row.time_in_minutes).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )
    }
  }
}

export default withStyles(useStyles)(SearchField);
