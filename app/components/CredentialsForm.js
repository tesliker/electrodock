import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './CredentialsForm.css';

class CredentialsForm extends Component {
  props: {
    host: () => void,
    port: () => void,
    username: () => void,
    password: () => void,
  };

  render() {
    const { host, port, username, password } = this.props;
    return (
      <div>
      	<input type="text" value={host} />
      </div>
    );
  }
}

export default CredentialsForm;