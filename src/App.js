import React from 'react';
import Terminal from './terminal';
import './App.css';
import sample_file from './sample.txt';

class App extends React.Component {
    render() {
        return (
        <div className="App">
          <Terminal termWidth={80} termHeight={43} content={sample_file} />
        </div>
        );
    }
}

export default App;
