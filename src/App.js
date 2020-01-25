import React from 'react';
import './App.css';
import harddrive_noise from './audio/harddrive.mp3';
import sessions from './sessions.json';
import Monitor from './monitor';
import OS from './os';

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
        var listen_func = () => {
            if(this.audio === null || this.audio.current === null)
                return;

            this.audio.current.play();
            this.audio.current.volume = 0.2;
            this.setState({'active': true});
            for(var key of Object.keys(this.listeners)) {
                window.removeEventListener(key, this.listeners[key]);
            }
        }

        this.listeners = {
            'click': window.addEventListener('click', listen_func),
            'keydown': window.addEventListener('keydown', listen_func),
        }
    }
    
    render() {
        return (
        <div className="App">
            <audio ref={this.audio} src={harddrive_noise} preload="auto" loop></audio>
            <Monitor fg="green" bg="black">
                <OS data={sessions}/>
            </Monitor>
        </div>
        );
    }
}

            /*
          <div className="overlay">
              <FileSystem data={sessions}/>
          </div>
          */


//<Monitor aspectRatio={4/3} terminal={{width: 80, height: 43}}>
//  <OS type="simple"/>
//      <Filesystem data={sessions}/>
//  </OS
//</Monitor>

//<Terminal termWidth={80} termHeight={43} content={sample_file} />

export default App;
