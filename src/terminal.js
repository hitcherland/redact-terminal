import React from 'react';

class Terminal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            time: new Date().toLocaleString(),
            'old_text': '',
            'new_text': '',
            'text': ` .d8888b.  8888888888 .d8888b. 88888888888 .d88888b.  8888888b.        .d8888b. 
d88P  Y88b 888       d88P  Y88b    888    d88P" "Y88b 888   Y88b      d88P  Y88b
Y88b.      888       888    888    888    888     888 888    888      Y88b. d88P
 "Y888b.   8888888   888           888    888     888 888   d88P       "Y88888" 
    "Y88b. 888       888           888    888     888 8888888P"       .d8P""Y8b.
      "888 888       888    888    888    888     888 888 T88b        888    888
Y88b  d88P 888       Y88b  d88P    888    Y88b. .d88P 888  T88b       Y88b  d88P
 "Y8888P"  8888888888 "Y8888P"     888     "Y88888P"  888   T88b       "Y8888P" 
                                                                                
▒▒▒▒▒▒▒▒▒▒▒█▓▓█████████████████████████████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█▒░░░░░ 
▒▒▒▒▒▒▒▒▒▒▒██████████████████████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░ 
▒▒▒▒▒▒▒▒▒▒▓█████▓▓███████████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░░░░░ 
▒▒▒▒▒▒▒▒▒▒█████▓▓▓▓██████████▓▓▓▓▓▒▓▓▓▓▓▓▓▓▒▓▓▓▓▓▓▓▓▓▒▓▓▓▒▓▓▓▓▒▓▓▓▓▓▒▓▓▓▓▒░░░░░ 
▒▒▒▒▒▒▒▒▒▒█████▓▓▓▓█████▓█████████████▓▒▓▓▓▓▒▓▓▓▓▓▓▓▓▒▓▓▓▒▒▓▓▓▒▒▓▓▓▒▒▓▓▓▓▒░░░░░ 
▒▒▒▒▓▒▓▓█▓███████▓▓▓██▓▓▓▓██▓██▓▓▓▓███▓▒▒▓▓▓▒▓▓▓▓▓▓▓▓▒▓▓▓▒▒▓▓▓▒▒▓▓▓▒▒▓▓▓▓▒░░░░░ 
▒▒▒▒▒░░░░█▓█▓▓▓▒▓▓▓▓▓▓▓▓▓▓██▓▓▒▒▓▓▓▓▓▓▓▓▒▓▓▓▒▒▓▓▓▓▓▓▓▒▒▓▓▒▒▓▓▓▒▒▓▓▓▒▓▓▓▓▓▒▒░░░░ 
▓▒▓▒▓▓▓▓██▓█▓█▓▓▓▓▓▒▓▓▓▓▓▓▓▓▓▒▒▒▒▓▓▓▒▓▓▓▒▒▒▒▒▒▒▓▓▓▓▓▓▒▒▓▓▒▒▒▒▒▒▒▒▓▓▒▓▓▓▓▒░░░░░░ 
▒▒▓▓▓█████▓▓▓▓▒▒▒▒▓▒▓▓▓▓▓▓▓▓▒▒░▒▒▒▓▓▓▒▓▓▓▒▒▒▒▒▒▒▓▓▓▓▓▒▒▓▒▒▒▒▒▒▒▒▒▓▒▒▓▓▓▓▓▓▓▓▓▓▒ 
▒▒▓█▓████▓▓▓▓▓▒▓▒▓▒▒▒▓▓▓▓▓▓▒▒▒▒▒▒▒▓▓▓▒▒▓▓▒▒▒▒▒▒▒▓▓▓▓▓▓░▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▒▒▒▒▒ 
▒▒▒▓▓▓███▓▓▓▓▓▓█▓▓▓▒▓▓▓▓▓▓▒█▓▓▒▒▒▓▒▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓██▓▓▓▓▓ 
▒▓▒▒▓▓▓▓█▓▓▓▓▓▓▓▓▓▒▓▒▓▓▓▓▓▒▓▓▓▒▒▒▓▓▒▓▓▒▒▓██▓▒▒▒▒▒▒▓▓▓▓▒▒▒▒▒▓▓▒▒▒▒▒▒▒▓▓▓████▓▓▓▓ 
▒▓▓▓▓▓▓▓█▓▓▓▓▓▓▓▓▓▓▓▓▓░▓▓▓▓▓▒▓▒▓▓▓▓▓▒▓▓▒▒▒▓▓▓▒▒▒▒▓▓▓▓▓▒▒▒▒▓██▓▒▒▒▒▒▒▓▓▓███████▓ 
▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▓▒▓▓▓▓▓▓▓▓▓▓▓▒░░▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▒▒▒▓▓▒▒▒▒▒▒▒▒▓▓▓███████▓ 
▓▓▓▓▓▓▓▓▓▓███████████▓▓▓▓▓▓▓▓▓▓▓▒▒▒░▒▒▒░▒▒▒░░▒░░░▒▒▒▒▒░▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓█▓▓▓▓▓ 
▓▓▓▓▓▓▓▓▓▓█████████████████████████▓▓▓▒▒▒▒▒▒▒▒▒▒▒▓▓▒▒▒░▒▒▒░░░░▒▒▒▓▒░░▒▓▓▒▓▒▓▓▓▓ 
▓▓▓▓▓▓▓▓▓▓▓███████████████████████████████████████▓▓▓▓▒▒▒▒░▒▒▒░▒▒▒▒▒▒█▓▓▒▒▓▒▒▒▒ 
▓▓▓▓▓▓▓▓▓▓▓███▓▓▓▓▓▓▓▓████████████████▓▓▓██████████▓▓▓▓▓▓▓███████████▓▓▒▒▒▓▓▓▓▒ 
▓▓▓▓▓▓▓▓▓▓▓▓██▓▓▓▓▓▓▓▓▓█▓▓▓▓▓▓▓▓▓▓▓▓▓▓████████████████▓▓▓▓▓█████████▓▓▓▒▒▒▒▓▓▓▒ 
▓▓▓▓▓▓▓▓▓▓▓█████████████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓███████████████▓▓▓▓▓▓▓▓▓▓▓▒▓ 
▓▓▓▓▓▓▓▓▓▓▓▓███▓███▓█▓██████▓▓▓▓█▓██▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓████▓▓▓▓▓▓▓▓▓▓▓ 
▓▓▓▓▓▓▓▓▓▓▓▓███████▓▓▓█████████▓█▓▓▓▓▓████▓█▓▓█▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓███▓▓▓▓▓▓▓▓▓▓▓ 
▓▓▓▓▓▓▓▓▓▓▓▓███▓▓▓▓██████▓▓██▓███████▓██▓▓█▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓███▓▓▓▓▓▓▓▓▓▓▓ 
▓▓▓▓▓▓▓▓▓█████████████████████████████████▓██▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓███▓▓▓▓▓▓▓▓▓▓▓ 
▓▓▓▓▓▓▓▓█████████████████████████████████████████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓███▓▓▓▓▓▓▓▓▓▓▓ 
                                                                                
   888      .d88888b.        d8888 8888888b. 8888888 888b    888  .d8888b.      
   888     d88P" "Y88b      d88888 888  "Y88b  888   8888b   888 d88P  Y88b     
   888     888     888     d88P888 888    888  888   88888b  888 888    888     
   888     888     888    d88P 888 888    888  888   888Y88b 888 888            
   888     888     888   d88P  888 888    888  888   888 Y88b888 888  88888     
   888     888     888  d88P   888 888    888  888   888  Y88888 888    888     
   888     Y88b. .d88P d8888888888 888  .d88P  888   888   Y8888 Y88b  d88P     
   88888888 "Y88888P" d88P     888 8888888P" 8888888 888    Y888  "Y8888P88     `,
        }
        this.output = React.createRef();
    }

    componentWillUnmount() {
        window.removeEventListener(this.resizeListenerID);
        window.removeEventListener(this.intervalID);
    } 

    componentDidMount() {
        this.resizeListenerID = window.addEventListener('resize', () => {
            this.forceUpdate();
        });

        window.setTimeout(() => {
            fetch(this.props.content)
                .then((r) => r.text())
                .then(text => {
                    this.transition(text, 1500);
                });
        }, 2000);

        this.intervalID = window.setInterval(() => {
            var t = new Date()
            this.setState({
                'time': t.toLocaleString(),
            });
        }, 600);
    }

    transition(text, duration) {
        this.setState({
            'old_text': this.state.text,
            'new_text': text,
        })
        var l = Math.max(this.state.text.length, text.length)
        var order = [];

        for(let i=0; i<l; i++) {
            let key = i * duration / l;
            //let key = Math.random() * duration;
            if(this.state.old_text[i] === '\n' || this.state.new_text[i] === '\n') {
                key = 0
            }
            order.push(key)
        }

        this.durationTime = 0;
        this.transitionID = window.setInterval(() => {
            this.durationTime += 100;
            if(this.durationTime > duration) {
                window.clearInterval(this.transitionID);
            }

            var text = '';
            for(var i=0; i<l; i++) {
                var old_char = this.state.old_text[i] !== undefined ? this.state.old_text[i] : " ";
                var new_char = this.state.new_text[i] !== undefined ? this.state.new_text[i] : " ";

                if(order[i] <= this.durationTime) {
                    text += new_char;
                } else {
                    text += old_char;
                }
            }
            
            this.setState({text: text});
        }, 100);

    }

    render() {
        var text = this.state.text;

        var regexes = [
            '\\S+ PLAYER',
            'Foxtrot',
            'loss of contact',
            'wooden chairs',
            'MULTIPLICATION',
            'MITOSIS',
            'VISUAL',
            '020',
            'LOSS OF LIFE',
            'ANALYZE VIABILITY FOR WEAPONIZATION',
            'WITNESS TESTIMONY',
            'subject has',
            'multiplied further'
        ];

        for(var regex of regexes) {
            var matches = text.matchAll(new RegExp(regex, 'g'));
            for(var matchset of matches) {
                for(var match of matchset) {
                    text = text.replace(match, '█'.repeat(match.length));
                }
            }
        } 

        var time = this.state.time;
        var offset = time.length - 12; 
        var time_regex = new RegExp(`.{${offset}}{local_time}`)
        text = text.replace(time_regex, time) 

        if(this.output.current !== null) {
            var rect = this.output.current.getBoundingClientRect();
        } else {
            var rect = {'width': '80ex', height: '43em'}
        }
        var style = {
            opacity: Math.random() * 0.1 + 0.8,
            width: rect.width + 'px',
            height: rect.height + 'px',
        }

        console.log(this.output.current);

        return <pre className='terminal' style={style}>
            <output ref={this.output}>
                {text}
            </output>
        </pre>;
    }
}

export default Terminal
