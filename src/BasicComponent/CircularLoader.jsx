import React from 'react';
//import '../App.css';
import '../index'
export default class CircularLoader extends React.Component {

  render() {
    return (
      <div>
        <div className="over_lay">
          <div className="outerDiv">
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
          </div>
        </div>
      </div>
    );
  }
}