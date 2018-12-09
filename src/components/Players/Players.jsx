import React from 'react';
import CircularLoader from '../../BasicComponent/CircularLoader';
import TextInput from '../../BasicComponent/TextInput';
import Service from '../../Service/Service';
import Button from '@material-ui/core/Button'

export default class Players extends React.Component {
  constructor(props) {
    super(props);
    /* Declear all states here */
    this.state = {
      firstName: "",
      lastName: "",
      rating: "",
      handedness: "right",
      isLoading: false,
      errorMsg: "",
      playerInfo: "",
      errors: {
        errorFirstNameText: "",
      },
      userToken: "",
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

  handleSubmit = () => {

    let input = {
      "first_name": this.state.firstName,
      "last_name": this.state.lastName,
      "rating": this.state.rating,
      "handedness": this.state.handedness
    };

    this.showLoading();
    this.setState({ errorMsg: "" });
    this.api.createPlayer(input).then((result) => {
      if (result.error && result.error.message) {
        this.setState({ errorMsg: result.error.message }, () => this.hideLoading())
      } else if (result.success) {
        this.setState({ playerInfo: result.player });
        this.props.history.push('/roster')
      }
    }).catch((er) => {
      this.setState({ errorMsg: JSON.stringify(er) }, () => this.hideLoading())
    });
  };

  handleChange = event => {
    this.setState({ handedness: event.target.value });
  };

  render() {
    return (
      <div style={styles.formContainer} className="Reg-form-wrapper">
        {this.state.isLoading == true &&
          <CircularLoader />
        }

        <form >
          <div style={styles.formWraper} className="reg-form-input-wrapper">
            <div className="reg-form-input">
              <span>Create Player </span>
            </div>
            <div>
              <div className="reg-form-input">
                <TextInput
                  id="firstName"
                  hintText="First Name"
                  type="Text"
                  underlineShow={true}
                  onChange={(val) => this.onChangeGeneric(val, "firstName")}
                  errorText={this.state.errors.errorNameText}
                />
              </div>
              <div className="reg-form-input">
                <TextInput
                  id="lastName"
                  hintText="Last Name"
                  type="Text"
                  value={this.state.lastName}
                  underlineShow={true}
                  onChange={(val) => this.onChangeGeneric(val, "lastName")}
                  errorText={this.state.errors.errorFirstNameText}
                />
              </div>
              <div className="reg-form-input">
                <TextInput
                  id="rating"
                  hintText="Rating "
                  type="Text"
                  value={this.state.rating}
                  underlineShow={true}
                  onChange={(val) => this.onChangeGeneric(val, "rating")}
                  errorText={this.state.errors.errorFirstNameText}
                />
              </div>

              <div className="reg-form-input">
                <div>Handedness </div>

                <select id="handedness"
                  onChange={this.handleChange} className="spacer">
                  <option value="right"> Right </option>
                  <option value="left"> Left </option>
                </select>
              </div>
              <div style={styles.submitBtn} className="reg-form-input">
                <Button
                  variant="contained" color="primary"
                  onClick={this.handleSubmit}
                  id="create"
                >
                  Create
                </Button>
              </div>

              <div lassName="reg-form-input">
                {this.state.errorMsg &&
                  <div style={styles.errorMsg}>
                    {this.state.errorMsg}
                  </div>
                }
              </div>

            </div>
          </div>
        </form>
      </div>
    )
  }

}

const styles = {
  button: {
    margin: 0,
    width: '100%',
    color: '#FFFFFF',
  },
  labelStyle: {
    'font-weight': 'bold'
  },
  style: {
    borderRadius: 4
  },
  radioButton: {
    marginBottom: 2,
    width: '25%',
    float: 'left',
    fontSize: 14,
  },
  radioinputStyle: {
    padding: 0,
    margin: 0
  },
  radiolabelStyle: {
    padding: 0,
    margin: 0
  },
  checkbox: {
    marginRight: 20,
    width: 'auto',
    float: 'left',
    fontSize: 12

  },
  inputStyle: {
    marginRight: 0,
  },
  labelStyle: {
    marginRight: 0,
    width: 'auto',
    lineHeight: '18px'
  },
  formWraper: {
    minHeight: 410,
    display: "inline-block"
  },
  errorMsg: {
    textAlign: "center",
    color: "red"
  },
  formContainer: {
    minHeight: 415,
  }
}