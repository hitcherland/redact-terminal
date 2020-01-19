import React from 'react';
import Terminal from "./terminal"

class FileSystem extends Terminal {
    constructor(props) {
        super(props)
        this.state = {
            ...this.state,
            stack: [this.props.data],
            path: [this.props.data['name']],
            selected: 0,
        }
        this.terminal = React.createRef();
        this.default_layout = this.props.data.settings.default
    }

    pushStack(index) {
        var stack = this.state.stack;
        var path = this.state.path;

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
        }, () => {this.renderTerminal()})
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
        }, () => {this.renderTerminal()})
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
        }, () => {this.renderTerminal()})
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
        }, () => {this.renderTerminal()})
    }

    componentDidMount() {
        this.transition(this.props.data.settings.logo, 1500);
        window.setTimeout(() => {
            this.renderTerminal();
        }, 2500);

        this.listener = window.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'Enter':
                    this.pushStack(this.state.selected);
                    break
                case 'Backspace':
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

    renderTerminal() {
        var item = this.state.stack[0];
        var text = item.content;
        var controls = ''
        if(text === undefined) {
            controls = '↑/↓/Enter - Up/Down/Select'
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

        if(this.state.stack.length > 1) {
            if(this.state.stack[1].children.length > 1) {
                controls += ', ←/→ - Prev/Next'
            }
            
            controls += ', BkSp - Back'
        }

        var text = this.fixSize(text, this.termWidth - 2, this.termHeight - 6);

        var output = this.default_layout;
        for(let line of text.split('\n')) {
            console.log(line);
            output = output.replace(new RegExp(`X{${line.length}}`), line);
        }

        var offset = controls.length - 10;
        var controls_regex = new RegExp(`{controls}.{${offset}}`)
        output = output.replace(controls_regex, controls) 

        this.transition(output, 1500); 
    }
}

export default FileSystem
