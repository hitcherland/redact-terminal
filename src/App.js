import React from 'react';
import FileSystem from './filesystem';
import './App.css';
import harddrive_noise from './audio/harddrive.mp3';
//import sample_file from './sample.txt';
import sessions from './sessions.json';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.audio = React.createRef();
        this.state = {
            active: false,
            stack: [sessions],
        }
    }

    componentDidMount() {
        this.listener = window.addEventListener('click', () => {
            this.audio.current.play();
            this.audio.current.volume = 0.2;
            this.setState({'active': true});
            window.removeEventListener('click', this.listener);
        });
    }
    
    render() {
        if(this.state.active) {
            return (
            <div className="App">
              <audio ref={this.audio} src={harddrive_noise} preload="auto" autoPlay loop></audio>
              <FileSystem data={sessions}/>
            </div>
            );
        } else {
            return <div className="App">
              <audio ref={this.audio} src={harddrive_noise} preload="auto" autoPlay loop></audio>
              <div className='terminal'><div style={{transform: 'translate(-50%, -50%)', margin: 0, position: 'absolute', 'left': '50%', top: '50%'}}>click to login</div></div>
            </div>
        }
    }
}
//<Terminal termWidth={80} termHeight={43} content={sample_file} />

export default App;
