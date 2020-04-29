import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Toolbar, AppBar, Avatar} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { reset } from 'cooldux';

import { logout } from '../state/user';

import { colors } from '../lib/styles';

const baseStyles = {
  header: {
    backgroundColor: colors.darkAccent,
    padding: '25px',
  },
  headerText: {
    color: colors.highlightBright,
    fontWeight: 100,
    paddingLeft: '10px',
  },
  icon: {
    color: colors.white,
  },
  logo: {
    height: '40px',
    padding: '5px 5px 5px 10px',
    marginRight: '10px',
  },
};

function getAvatar(user) {
  if(user && user.options && user.options.providers && user.options.providers[user.options.ll] && user.options.providers[user.options.ll].avatar) {
    return user.options.providers[user.options.ll].avatar;
  }
  return null;
}


class Header extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout = async () => {
    await this.props.logout();
    this.props.reset();
    setTimeout(() => {
      document.location.replace('/app');
    }, 100);
  }

  render() {
    const { user } = this.props;
    const avatar = getAvatar(user.auth);
    let btn = (
      <Link to="/app">
        <Button
          variant="contained"
          color="primary"
        >Login</Button>
      </Link>
    );

    if (user.auth) {
      btn = (
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleLogout}
        >Logout</Button>
      );
    } else if (user.verifyPending || user.authPending) {
      btn = '';
    }
    return (
      <AppBar position="static">
        <Toolbar style={baseStyles.header}>

            {avatar ? (
              <Avatar src={avatar} style={{marginRight: '15px'}}/>
            ) : ''}

            {btn}
        </Toolbar>
      </AppBar>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;
  return { user };
}


export default connect(mapStateToProps, { logout, reset })(Header);
