import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardHeader } from '@material-ui/core';

import { oauthLogin } from '../state/user';
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
  },
  loginBrand: {
    height: '18px',
    width: '18px',
    marginRight: '15px'
  },
  loginBrandText: {
    fontSize: '1.2em',
    width: '100%',
    textTransform: 'none',
    textAlign: 'left'
  }
};

class OauthLogin extends Component {
  async componentDidMount() {
    console.log('oauthlogin', this.props);
    await this.props.oauthLogin(this.props.routeParams.token);
    setTimeout(() => {
      this.props.router.push('/app');
    }, 100);
  }

  render() {
    let errorMsg = '';
    return (
      <div style={styles.container} >
        <Card style={styles.loginBox}>
          <CardHeader title="Signing in..." />
          <div style={styles.errorText}>{errorMsg}</div>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;
  return { user };
}

export default connect(mapStateToProps, { oauthLogin })(OauthLogin);
