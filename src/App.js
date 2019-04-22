import React, { Component } from 'react';
import Calendar from './components/calendar/index';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
            <div className='container animation-target'>
            <Calendar/>
            </div>
        </header>
      </div>
    );
  }
}

export default App;
