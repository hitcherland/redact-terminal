import React from 'react';
import './monitor.css';

function hashString(string) {
  var hash = 0, i, chr;
  if (string.length === 0) return hash;
  for (i = 0; i < string.length; i++) {
    chr   = string.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

class Monitor extends React.Component {
    constructor(props) {
        super(props)
        this.monitor = React.createRef();
        this.canvas = React.createRef();
        this.overlay = React.createRef();
    }

    componentDidMount() {
        this.renderDisplay();
        this.resizeListenerID = window.addEventListener('resize', () => {
            this.forceUpdate();
            this.renderDisplay();
        });

        this.flicker();
        this.corrupt();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeListenerID);
        window.clearInterval(this.overlayClock);
    } 

    wiggle(c) {
        var count = 65; //400 * this.props.corruptStrength;
        return String.fromCharCode(
            c.charCodeAt(0) + Math.floor(Math.random() * 2 * count - count )
        )
    }

    trueRandom() {
        return String.fromCharCode(10000 * Math.random());
    }

    yieldText = function*() {
        while(true) {
            for(let c of this.props.corruptText) {
                yield c;
            }
        }
    }


    flicker() {
        var f = this.props.flickerStrength;
        var opacity = (1 - f) + f * Math.random();
        this.canvas.current.style.opacity = opacity
        this.monitor.current.style.opacity = opacity;

        var nextFlicker = this.props.flickerTimeoutDuration * (0.5 + Math.random());
        window.setTimeout(() => {
            this.flicker();
        }, nextFlicker);
    }

    corrupt() {
        var nextCorrupt = this.props.corruptTimeoutDuration * (0.5 + Math.random());
        this.renderDisplay();
        window.setTimeout(() => {
            this.corrupt();
        }, nextCorrupt);
    }

    renderDisplay(input) {
        if(this.canvas === null || this.canvas.current === null)
            return;

        var canvas = this.canvas.current;
        var ctx = canvas.getContext('2d');
        var text = canvas.children[0].innerHTML;

        canvas.width = canvas.width * 1.0;

        var terminal = this.props.terminal;
        var character = {
            width: this.width / terminal.width,
            height: this.height / terminal.height
        };
        var fontSize = character.height;

        ctx.font = `${fontSize}px monospace`
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)"

        var corruptFunc;
        switch(this.props.corruptType) {
            case "wiggle":
                corruptFunc = this.wiggle;
                break
            case "random":
                corruptFunc = this.trueRandom;
                break
            case "text":
                var x = this.yieldText()
                corruptFunc = () => x.next().value;
                break

            default:
                corruptFunc = this.wiggle;
        }

        text.split('\n').forEach((line, i) => {
            line.split("").forEach((c, j) => {
                var hash = hashString(`${i},${j},${new Date()}`)
                if(hash % Math.floor(1 / this.props.corruptStrength) === 0) {
                    c = corruptFunc.call(this, c);
                }
                var offset = (character.width - ctx.measureText(c).width) / 2;
                ctx.fillText(c, j * character.width + offset,
                             (i + 1) * character.height);
            })
        })

    }

    render() {
        var width, height;
        if(window.innerWidth * this.props.aspectRatio >= window.innerHeight) {
            width = Math.floor(window.innerHeight * this.props.aspectRatio);
            height = window.innerHeight;
        } else {
            width = window.innerWidth;
            height = Math.floor(window.innerWidth / this.props.aspectRatio);
        }

        var vMargin = (window.innerHeight - height) / 2;
        var hMargin = (window.innerWidth - width) / 2;
        this.width = width;
        this.height = height;

        var style = {
            width: width + "px",
            height: height + "px",
            margin: vMargin + "px " + hMargin + "px",
        };

        this.renderDisplay();

        var monitorClass = `monitor bg-${this.props.bg} fg-${this.props.fg}`;
        var displayClass = "display";
        var overlayClass = "overlay"
        return (<div ref={this.monitor} style={style} className={monitorClass}>
            <canvas className={displayClass}
                    ref={this.canvas}
                    width={width}
                    height={height}>
                {React.cloneElement(this.props.children, {
                    render: this.renderDisplay.bind(this),
                    transitionDuration: this.props.transitionDuration,

                })}
            </canvas>
            <div className={overlayClass}/>
        </div>)
    }
}

Monitor.defaultProps = {
    fg: "green",
    bg: "black",
    aspectRatio: 20 / 20,
    terminal: {
        width: 80,
        height: 43,
        lineHeight: 1.6,
    },
    flickerStrength: 0.1,
    flickerTimeoutDuration: 200, // flicker between 0.5 and 1.5 of this 
    corruptType: "wiggle",
    corruptStrength: 0.001,
    corruptText: "help me  ",
    corruptTimeoutDuration: 800, // corrupt between 0.5 and 1.5 of this 
    transitionDuration: 500,
}

export default Monitor 
