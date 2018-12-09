import React from 'react';
import CircularLoader from '../../BasicComponent/CircularLoader';
import Service from '../../Service/Service';
import List from '@material-ui/core/List';


export default class Roster extends React.Component {
  constructor(props) {
    super(props);
    /* Declear all states here */
    this.state = {
      Players: [],
      isLoading: false,
      errorMsg: "",
      userToken: "",
      user: {}
    };
    this.api = new Service();
  };

  showLoading() {
    this.setState({ isLoading: true });
  }

  hideLoading() {
    this.setState({ isLoading: false });
  }

  onChangeGeneric = (value, propertyName) => {
    var stateObject = {};
    stateObject[propertyName] = value;
    this.setState(stateObject);
  }

  componentDidMount() {
    let token = this.api.getCookie("token");
    if(token===null || token=="" || token===undefined){
      this.props.history.push('/');
    }
    this.showLoading();
    this.api.players("").then((result) => {
      if (result.success) {
        this.setState({ Players: result.players });
      }
      this.hideLoading();
    }).catch((er) => {
      this.setState({ errorMsg: JSON.stringify(er) }, () => this.hideLoading())
    });

  }


  render() {
    return (
      <div style={styles.formContainer} className="Reg-form-wrapper">
        {this.state.isLoading == true &&
          <CircularLoader />
        }
        <h2> My Player Roster </h2>
         <div>
        </div>

        <List dense={false}>
        {this.state.Players.map((Player, index) => {
          return (
            <div key={index} style={{ border: "1px solid",padding: "10px"}}>
                <div> <a style={{ color:"#3f51b5"}} href="#"> {Player.first_name +"  "+ Player.last_name } </a></div>
                <div style={{marginTop:"10"}}> {"Handedness : " +Player.handedness + " , Rating : " + Player.rating}</div>
            </div>
          )
        })
        }
        </List>
      </div>
    )
  }

}

const styles = {
  errorMsg: {
    textAlign: "center",
    color: "red"
  },
  createPlayer :{
     display :"inline-block",
     float:"right"
  }
}