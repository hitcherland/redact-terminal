import React from 'react';

class Terminal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            time: new Date().toLocaleString(),
            'text': `


                  _____ ______________________  ____     ____ 
                 / ___// ____/ ____/_  __/ __ \\/ __ \\   ( __ )
                 \\__ \\/ __/ / /     / / / / / / /_/ /  / __  |
                ___/ / /___/ /___  / / / /_/ / _, _/  / /_/ / 
               /____/_____/\\____/ /_/  \\____/_/ |_|   \\____/  
                                                          
                                    __    _                                   
                               _wr""        "-q__                             
                            _dP                 9m_     
                          _#P                     9#_                         
                         d#@                       9#m                        
                        d##                         ###                       
                       J###                         ###L                      
                       {###K                       J###K                      
                       ]####K      ___aaa___      J####F                      
                   __gmM######_  w#P""   ""9#m  _d#####Mmw__                  
                _g##############mZ_         __g##############m_               
              _d####M@PPPP@@M#######Mmp gm#########@@PPP9@M####m_             
             a###""          ,Z"#####@" '######"\\g          ""M##m            
            J#@"             0L  "*##     ##@"  J#              *#K           
            #"               '#    "_gmwgm_~    dF               '#_          
           7F                 "#_   ]#####F   _dK                 JE          
           ]                    *m__ ##### __g@"                   F          
                                  "PJ#####LP"                                 
            '                       0######_                      '           
                                  _0########_                                   
                .               _d#####^#####m__              ,              
                 "*w_________am#####P"   ~9#####mw_________w*"                  
                     ""9@#####@M""           ""P@#####@M""         
           
                 __    ____  ___    ____  _____   ________             
                / /   / __ \\/   |  / __ \\/  _/ | / / ____/             
               / /   / / / / /| | / / / // //  |/ / / __               
              / /___/ /_/ / ___ |/ /_/ // // /|  / /_/ /  _    _    _  
             /_____/\\____/_/  |_/_____/___/_/ |_/\\____/  (_)  (_)  (_) 
`,
        }
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
                .then(text => this.setState({
                    'text': text
                }));
        }, 1000);

        this.intervalID = window.setInterval(() => {
            var t = new Date()
            this.setState({
                'time': t.toLocaleString(),
                //'flash': t % 1000 > 100,
            });
        }, 10);
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

        return <pre className='terminal'>
            <output>
                {text}
            </output>
        </pre>;
    }
}

export default Terminal
