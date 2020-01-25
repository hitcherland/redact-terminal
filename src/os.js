import React from 'react';

class Fallback extends React.Component {
    constructor(props) {
        super(props)
        this.text = "";
    }

    render() {
        var regexes = this.props.regexes;
        var text = this.props.children;
        for(var regex of regexes) {
            var matches = text.matchAll(new RegExp(regex, 'g'));
            for(var matchset of matches) {
                for(var match of matchset) {
                    text = text.replace(match, '█'.repeat(match.length));
                }
            }
        } 
        this.text = text;

        return <pre>{text}</pre>
    }
}

Fallback.defaultProps = {
    regexes: []
}

class OS extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            old_text: "",
            new_text: "",
            text: this.props.data.settings.logo,
            stack: [this.props.data],
            path: [this.props.data['name']],
            selected: 0,
        }
        this.fallback = React.createRef();
        this.default_layout = this.props.data.settings.default
    }

    getRegexes() {
        var regexes = [];
        for(let s of this.state.stack) {
            if(s.settings !== undefined && s.settings.regex !== undefined) {
                regexes = regexes.concat(s.settings.regex.split('\n'))
            }
        }
        return regexes;
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

    pushStack(index) {
        var stack = this.state.stack;
        var path = this.state.path;
        if(stack[0].children === undefined)
            return

        var new_stack_item = stack[0].children[index];
        var new_selected = undefined;
        if(new_stack_item.children !== undefined) {
            new_selected = 0;
        }

        stack.splice(0, 0, new_stack_item);
        path.push(new_stack_item.name);
        this.setState({
            stack: stack,
            path: path,
            selected: new_selected,
        }, () => this.transition())
    }

    popStack() {
        var stack = this.state.stack;
        var path = this.state.path;

        if(stack.length === 1)
            return;

        var new_selected = 0;
        stack.shift()
        path.pop();
        this.setState({
            stack: stack,
            path: path,
            selected: new_selected,
        }, () => this.transition())
    }

    horizontalStack(direction) {
        var stack = this.state.stack; 
        var path = this.state.path; 

        var stack_item = stack[0];
        var parent_item = stack[1];
        if(parent_item === undefined || parent_item.children.length === 1)
            return;

        var index = (parent_item.children || []).findIndex(X => X === stack_item);
        var l = parent_item.children.length;
        index = (index + direction + l) % l;

        var new_stack_item = parent_item.children[index];
        var new_selected = undefined;
        if(new_stack_item.children !== undefined) {
            new_selected = 0;
        }

        stack.splice(0, 1, new_stack_item);
        path.splice(-1, 1, new_stack_item.name);

        this.setState({
            stack: stack,
            path: path,
            selected: new_selected,
        }, () => this.transition())
    }

    adjustSelection(direction) {
        var selected = this.state.selected;
        var active = this.state.stack[0];
        if(active.children === undefined)
            return

        var l = active.children.length;
        var new_selected = (selected + direction + l) % l;

        this.setState({
            selected: new_selected,
        }, () => this.transition())
    }

    componentDidMount() {
        this.transition(1500);

        this.listener = window.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'Enter':
                    this.pushStack(this.state.selected);
                    break
                case 'Escape':
                    this.popStack();
                    break; 
                case 'ArrowUp':
                    this.adjustSelection(-1);
                    break; 
                case 'ArrowLeft':
                    this.horizontalStack(-1);
                    break; 
                case 'ArrowRight':
                    this.horizontalStack(+1);
                    break; 
                case 'ArrowDown':
                    this.adjustSelection(+1);
                    break; 
                default:
                    break;
            }
        });
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.listener);
    }

    applyControls(text) {
        var item = this.state.stack[0];
        var controls = []
        if(item.content === undefined) {
            controls.push('↑/↓/Enter - Up/Down/Select')
        }

        if(this.state.stack.length > 1) {
            if(this.state.stack[1].children.length > 1) {
                controls.push('←/→ - Prev/Next')
            }
            
            controls.push('Esc - Back')
        }

        controls = controls.join(', ')
        var offset = controls.length - 10;
        var controls_regex = new RegExp(`{controls}.{${offset}}`)
        text = text.replace(controls_regex, controls) 
        return text;
    }

    applyTime(text) {
        var time = new Date().toLocaleString()
        var offset = time.length - 12; 
        var time_regex = new RegExp(`.{${offset}}{local_time}`)
        text = text.replace(time_regex, time) 
        return text;
    }

    applyLayout(text) {
        var layout = this.default_layout
        text.split('\n').forEach((line) => {
            let l = line.length;
            let matches = layout.match(/\u007F{4,}/m); 
            if(matches === null)
                return;

            let match = matches[0];
            if(match.length > l) {
                line += " ".repeat(match.length - l)
                l = match.length;
            }

            layout = layout.replace(new RegExp(`\u007F{${l}}`), line);
        });

        var matches = layout.match(/X{4,}/m);
        while(matches !== null) {
            let match = matches[0];
            layout = layout.replace(match, " ".repeat(match.length));
            matches = layout.match(/X{4,}/m);
        }
        return layout;
    }

    applyRegex(text) {
        var regexes = this.getRegexes()
        for(var regex of regexes) {
            var matches = text.matchAll(new RegExp(regex, 'g'));
            for(var matchset of matches) {
                for(var match of matchset) {
                    text = text.replace(match, '█'.repeat(match.length));
                }
            }
        } 
        return text;
    }

    transition() {
        var item = this.state.stack[0];
        var text = item.content;

        if(text === undefined) {
            text = `\n  Directory Listing: ${this.state.path.join('/')}\n\n`;
            for(let i=0; i<item.children.length; i++) {
                let child = item.children[i];
                if(this.state.selected === i) {
                    text += '    [*] ' + child.name + '\n';
                } else {
                    text += '     *  ' + child.name + '\n';
                }
            }
        }

        text = this.applyRegex(text)
        text = this.applyLayout(text);
        text = this.applyControls(text);
        text = this.applyTime(text);

        this.setState({
            'old_text': this.state.text,
            'new_text': text,
        })

        var l = Math.max(this.state.text.length, text.length)
        var order = [];

        for(let i=0; i<l; i++) {
            let key = i * this.props.transitionDuration / l;
            if(this.state.old_text[i] === '\n' || this.state.new_text[i] === '\n') {
                key = 0
            }
            order.push(key)
        }

        this.durationTime = 0;
        var tSpeed = 10;
        this.transitionID = window.setInterval(() => {
            this.durationTime += tSpeed;
            if(this.durationTime > this.props.transitionDuration) {
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
            
            this.setState({text: text}, () => {this.props.render()});
        }, tSpeed);

    }

    render() {
        return <Fallback ref={this.fallback}>
            {this.state.text}
        </Fallback>;
    }
}

OS.defaultProps = {
    transitionDuration: 500,
    render: () => {},
}

export default OS
