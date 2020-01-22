import React from 'react';

class Terminal extends React.Component {
    constructor(props) {
        super(props)
        this.termWidth = this.props.termWidth || 80;
        this.termHeight = this.props.termHeight || 43;
        this.state = {
            time: new Date().toLocaleString(),
            'old_text': '',
            'new_text': '',
            'text': this.props.children || "",
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

        this.intervalID = window.setInterval(() => {
            var t = new Date()
            this.setState({
                'time': t.toLocaleString(),
            });
        }, 600);
    }

    fixSize(string, width, height) {
        function toLength(string, length) {
            if(string.length < length) {
                return string + ' '.repeat(length - string.length);
            } else {
                return string.substr(0, length);
            }
        }


        var lines = string.split('\n');
        if(lines.length < height) {
            for(let i=lines.length; i<height; i++) {
                lines.push('')
            }
        }

        return lines.map(x => toLength(x, width)).join('\n');
    }



    transition(text, duration) {
        text = this.fixSize(text, this.termWidth, this.termHeight);
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

            let text = '';
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

        var rect;
        if(this.output.current !== null) {
            rect = this.output.current.getBoundingClientRect();
        } else {
            rect = {'width': `${this.termWidth}ex`, height: `${this.termHeight}em`}
        }

        rect = {'width': `${this.termWidth}ex`, height: `${this.termHeight}ex`}

        var style = {
            opacity: Math.random() * 0.1 + 0.8,
            //width: rect.width + 'px',
            //height: rect.height + 'px',
            position: 'relative',
        }
    
        text = this.fixSize(text, this.termWidth, this.termHeight);
        var lines = text.split('\n')
        var rowStyle = {
            position: "absolute",
            left: "0px",
        }
        var cellStyle = {
            position: "absolute",
            width: "1ex",
            height: "1.6ex",
            textAlign: "center"
        }

        var output = text.split('\n').map((line, i) => {
            let cells=line.split("").map((c, j) => {
                let s = {...cellStyle, left: j + "ex"}
                return (<div key={j} className="cell" style={s}>{c}</div>)
            })
            let s = {...rowStyle, "top": 1.6 * i + "ex"}
            return (<div key={i} style={s}>{cells}</div>)
        })


        return <div className='terminal' style={style}>
            {output}
        </div>

        return <pre className='terminal' style={style}>
            <output ref={this.output}>
                {text}
            </output>
        </pre>;
    }
}

export default Terminal
