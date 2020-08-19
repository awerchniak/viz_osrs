import React from 'react';
import logo from './logo.svg';
import './App.css';
import { render } from 'react-dom';

class App extends React.Component {
  constructor() {
    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    var mysql = require('mysql');

    var con = mysql.createConnection({
      host: 'osrs-stats-dev.c2zrk3luyt1v.us-east-1.rds.amazonaws.com',
      user: 'admin',
      password: 'eYOuP5XRw2RxqP7MlzFx',
      port: '1433',
      database: 'mysql',
    });

    con.connect((error) => {
      if (error) {
        throw error;
      }
      con.query(sql, (error, result) => {
        if (error) {
          throw err;
        }
        this.setState({ data: result });
      });
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Here's some data: `{this.state.data}`</p>
          <a
            className="App-link"
            href="https://https://github.com/awerchniak/viz_osrs.org"
            target="_blank"
            rel="noopener noreferrer">
            Check out our repo!
          </a>
        </header>
      </div>
    );
  }
}

export default App;
