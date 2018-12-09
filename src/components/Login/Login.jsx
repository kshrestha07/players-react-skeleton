import React from 'react';
import CircularLoader from '../../BasicComponent/CircularLoader';
import TextInput from '../../BasicComponent/TextInput';
import Service from '../../Service/Service';
import Button from '@material-ui/core/Button'


export default class Login extends React.Component {
  constructor(props) {
    super(props);
    /* Declear all states here */
    this.state = {
      password: "",
      email: "",
      isLoading: false,
      errorMsg: "",
      errors: {
        errorNameText: "",
        errorPasswordText: "",
      }
    };
    this.api = new Service();
  };

  showLoading() {
    this.setState({ isLoading: true });
  }

  hideLoading() {
    this.setState({ isLoading: false });
  }

  handleEmailIdChange = (value) => {
    value = value.trim();
    this.setState({
      email: value
    });
  }

  handlePasswordChange = (value) => {
    this.setState({
      password: value
    });
  }

  componentDidMount() {
    let tokenValue = this.api.getCookie("token")
    if (tokenValue !== null & tokenValue !== undefined) {
      this.props.history.push('/roster')
    }
  }

  handleSubmit = () => {
    let input = { "email": this.state.email, "password": this.state.password };
    this.showLoading();
    this.setState({ errorMsg: "" });
    this.api.login(input).then((result) => {
      if (result.error && result.error.message) {
        this.setState({ errorMsg: result.error.message }, () => this.hideLoading())
      } else {
        this.api.setCookie("token", result.token);
        this.props.history.push('/roster');
      }
    }).catch((er) => {
      this.hideLoading()
    });
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
              <span>Login </span>
            </div>
            <div>
              <div className="reg-form-input">
                <TextInput
                  id="email"
                  hintText="Email ID"
                  type="Text"
                  underlineShow={true}
                  onChange={this.handleEmailIdChange}
                  errorText={this.state.errors.errorNameText}
                />
              </div>
              <div className="reg-form-input">
                <TextInput
                  id="password"
                  hintText="Password"
                  type="password"
                  value={this.state.password}
                  underlineShow={true}
                  onChange={this.handlePasswordChange}
                  errorText={this.state.errors.errorPasswordText}
                />
              </div>
              <div style={styles.submitBtn} className="reg-form-input">
                <Button
                  variant="contained" color="primary"
                  onClick={this.handleSubmit}
                  id="login"
                >
                  Login
                </Button>
              </div>

              <div className="reg-form-input">
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