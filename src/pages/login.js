import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, CardHeader, CircularProgress } from '@material-ui/core';
import { get } from 'lodash';

import config from '../config';
import { oauthStart } from '../state/user';
import { colors } from '../lib/styles';


const styles = {
  container: {
    backgroundAttachment: 'scroll',
    backgroundRepeat: 'repeat',
    height: '100%',
    minHeight: '900px',
    padding: '10px',
  },
  loginBox: {
    margin: '0 auto 100px',
    textAlign: 'center',
    width: '500px',
  },
  errorText: {
    color: colors.secondaryAccent,
    height: '18px',
    paddingTop: '18px',
    margin: '10px'
  },
  form: {
    margin: 'auto',
    padding: '35px 50px 50px',
  },
  loginBrand: {
    fontSize: '22px',
    marginRight: '15px'
  },
  loginBrandText: {
    fontSize: '1.2em',
    width: '100%',
    textTransform: 'none',
    textAlign: 'left'
  }
};

class Login extends Component {

  componentDidMount() {
    this.props.oauthStart();
  }

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleOauth = async(providerId) => {
    document.location.href = `${config.API_URL}/users/oauth_redir/${providerId}`;
  }

  render() {
    const { user } = this.props;
    const propErrors = {};
    let errorMsg = '';
    if (user.authError && user.authError.details) {
      user.authError.details.forEach((detail) => {
        propErrors[detail.path] = detail.message;
      });
    } else if (user.authError || user.oauthError) {
      const err = user.authError || user.oauthError;
      // eslint-disable-next-line
      errorMsg = get(err, 'content.message') || get(err, 'content.error') || err.message;
    }
    return (
      <div style={styles.container} >
        {user.oauthStart ? (
            <Card style={styles.loginBox}>
            <CardHeader title="Sign In" />
            <div style={styles.errorText}>{errorMsg}</div>
            <div style={styles.form}>

            {get(user, 'oauthStart.providers.google') ? (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => document.location.href = user.oauthStart.providers.google.url}
                style={{margin: '10px', width: '220px', color: 'black', backgroundColor: '#FFF'}}
              >
                <span style={{...styles.loginBrand, color: '#4285F4'}}>
                  <i className="fab fa-google"></i>
                </span>
                <span style={styles.loginBrandText}>Sign in with Google</span>
              </Button>
              <br/>
            </>
            ) : ''}

            {get(user, 'oauthStart.providers.github') ? (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => document.location.href = user.oauthStart.providers.github.url}
                style={{margin: '10px', width: '220px', color: '#FFF', backgroundColor: '#333'}}
              >
                <span style={styles.loginBrand}>
                  <i className="fab fa-github"></i>
                </span>
                <span style={styles.loginBrandText}>Sign in with Github</span>
              </Button>
              <br/>
            </>
            ) : ''}

            {get(user, 'oauthStart.providers.facebook') ? (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => document.location.href = user.oauthStart.providers.facebook.url}
                style={{margin: '10px', width: '220px', color: '#FFF', backgroundColor: '#3b5998'}}
              >
                <span style={styles.loginBrand}>
                  <i className="fab fa-facebook"></i>
                </span>
                <span style={styles.loginBrandText}>Sign in with Facebook</span>
              </Button>
              <br/>
            </>
            ) : ''}

            {get(user, 'oauthStart.providers.amazon') ? (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => document.location.href = user.oauthStart.providers.amazon.url}
                style={{margin: '10px', width: '220px', color: '#040707', backgroundColor: '#FF9900'}}
              >
                <span style={styles.loginBrand}>
                  <i className="fab fa-amazon"></i>
                </span>
                <span style={styles.loginBrandText}>Sign in with Amazon</span></Button>
              <br/>
            </>
            ) : ''}

            {get(user, 'oauthStart.providers.microsoft') ? (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => document.location.href = user.oauthStart.providers.microsoft.url}
                style={{margin: '10px', width: '220px', color: '#FFF', backgroundColor: '#2f2f2f'}}
              ><span style={{...styles.loginBrand, color: '#00a2ed'}}>
                <i className="fab fa-windows"></i>
              </span>
              <span style={styles.loginBrandText}>Sign in with Microsoft</span></Button>
            </>
            ) : ''}
            
            </div>
           
            
          </Card>  
        ) : (<CircularProgress/>)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;
  return { user };
}

export default connect(mapStateToProps, { oauthStart })(Login);
