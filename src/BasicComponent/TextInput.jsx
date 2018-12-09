import React from 'react';
import TextField from 'material-ui/TextField';
import { orange500, blue500 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const styles = {
    errorStyle: {
        color: orange500,
    },
    underlineStyle: {
        borderColor: '#3f51b5',
        color: '#3f51b5',
    },
    floatingLabelStyle: {
        color: orange500,
    },
    floatingLabelFocusStyle: {
        color: '#3f51b5',
    },
    inputStyle: {
        width: '100%',
        height: 35,
        paddingLeft: 12
    },
    rootElemetStyle: {
        'width': 'calc(100% - 35px)',
        height: 35,
        float: 'left'
    },
    hintStyle: {
        paddingLeft: 10,
        fontStyle: 'italic',
        fontSize: '16px',
        lineHeight: '16px',
        color: '#ccc'
    },

    underlineFocusStyle: {
        color: '#3f51b5',
        borderColor: '#3f51b5',
    }
};

export default class TextInput extends React.Component {

    constructor(props) {
        super(props);
        
    }

    handleChange = (event) => {
        this.props.onChange(event.target.value);
    }

    render() {

        let hintText = this.props.hintText;
        let id = this.props.id;
        let underlineShow = this.props.underlineShow;
        let errorText = this.props.errorText;

        return (
            <MuiThemeProvider>
            <div>
                <TextField
                    id={id}
                    // value={this.props.value}
                    hintText={hintText}
                    onChange={this.handleChange}
                    inputStyle={styles.inputStyle}
                    style={styles.rootElemetStyle}
                    errorText={errorText}
                    underlineShow={underlineShow}
                    hintStyle={styles.hintStyle}
                    underlineStyle={styles.underlineStyle}
                    underlineFocusStyle={styles.underlineFocusStyle}
                    type ={this.props.type}
                />
            </div>
            </MuiThemeProvider>
        );
    }
}

// TextInput.childContextTypes = {
//     muiTheme: React.PropTypes.isRequired,
// };