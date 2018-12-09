import React from 'react';
import { Link } from 'react-router-dom';
import Service from '../../Service/Service';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.api = new Service();
  }

  componentDidMount() {
    const tokenValue = this.api.getCookie('token');
    if (tokenValue !== null && tokenValue !== undefined) {
      this.props.history.push('/roster');
    }
  }

  render() {
    return (
      <div>
        <div>
          <ul style={{ width: '15%', margin: '0 auto'}}>
            <li style={{ padding: 10, border: '1px solid black',cursor:'pointer', marginBottom: '.5em' }}> <Link to="/login">Login</Link> </li>
            <li style={{ padding: 10,  border: '1px solid black',cursor:'pointer' }}> <Link to="/register">Register</Link> </li>
          </ul>
        </div>
      </div>
    );
  }
}
export default Home;
