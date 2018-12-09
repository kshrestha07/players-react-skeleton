import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  'border-radius': '0px'
};
const backgroundColor = '#fcaf17'
const labelColor = "#FFFFFF"

class Button extends React.Component {

  render() {
    let label = this.props.Label;
    
    return (
      <MuiThemeProvider>
        <RaisedButton
          id={this.props.id}
          label={label}
          labelColor={labelColor}
          buttonStyle={style}
          backgroundColor={backgroundColor} />
      </MuiThemeProvider>
    )
  }
}

export default Button;
