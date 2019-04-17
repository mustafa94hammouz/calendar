import React, { Component } from 'react';
import Calendar from './components/calendar/index';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
            <Calendar/>
        </header>
      </div>
    );
  }
}

export default App;
