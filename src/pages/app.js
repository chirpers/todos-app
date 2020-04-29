import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/header';
import { browseTodos, addTodo, delTodo, editTodo } from '../state/todos';
import { map } from 'lodash';
import { Button, TextField, Card, CircularProgress } from '@material-ui/core'
import DoneIcon from '@material-ui/icons/Done';

import { colors } from '../lib/styles';

const styles = {
  container: {
    backgroundColor: colors.primaryHighlight,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    textAlign: 'center',
  },
  mainBody: {
    display: 'flex',
    height: '100%',
  },
  todo: {
    // backgroundColor: 'lightgreen',
    margin: '0 15px 10px 15px',
    // borderRadius: '5px',
    padding: '5px',
    // float: 'right',
  },
  hello: {
    display: 'flex',
    float: 'left',
    margin: '10px'
  }
};

class App extends Component {

  state = {
    text: ''
  }
  componentDidMount() {
    if(this.props.user.auth) {
      this.props.browseTodos();
    }
  }

  handleChange = (evt) => {
    this.setState({text: evt.target.value});
  }

  handleAdd = async () => {
    await this.props.addTodo({text: this.state.text, date: new Date()});
    this.setState({text: ''});
  }

  handleDelete = async (_id) => {
    await this.props.delTodo(_id);
  }

  handleCompleted = async (_id) => {
    await this.props.editTodo(_id, {completed: true, completed_at: new Date()});
    this.props.browseTodos();
  }

  render() {
    const { user, todos } = this.props;
    return (
      <div style={styles.container}>
        <Header {...this.props} />
        <div style={styles.hello}>hello, {user.auth ? user.auth.name : ''}</div>
        {user.auth ? (
          <div>
            <h2>My Todo list</h2>
            
            {todos.browseTodos ? (
              <div>
                <div>
                {map(todos.browseTodos, (t) => {
                  return (
                  <Card style={styles.todo} key={t._id}>
                    {t.completed ? (
                      <DoneIcon style={{float: 'left', color: 'green'}}/>
                    ) : (
                      <Button onClick={() => this.handleCompleted(t._id)} variant="contained" color="primary" style={{float: 'left'}} disabled={todos.editTodoPending}>complete</Button>
                    )}
                    {t.text}
                    <Button onClick={() => this.handleDelete(t._id)} variant="contained" color="primary" style={{float: 'right'}} disabled={todos.delTodoPending}>delete</Button>
                  </Card>)
                })}
                {(!todos.browseTodos || !todos.browseTodos.length) && !todos.browseTodosPending ? (
                  <h3>Add your first todo:</h3>
                ) : ''}
                </div>

                <div>
                  <TextField type="text" onChange={this.handleChange} value={this.state.text} style={{marginRight: '10px'}}/>
                  <Button onClick={this.handleAdd} disabled={!this.state.text || todos.addTodoPending}  variant="contained" color="primary">
                    add
                  </Button>
                </div>
              </div>
            ) : (
            <CircularProgress/>
            )}
          </div>
        ) : <CircularProgress/>}
      </div>
    );
  }
}


function mapStateToProps(state) {
  const { user, todos } = state;
  return { user, todos };
}


export default connect(mapStateToProps, {browseTodos, addTodo, delTodo, editTodo})(App);
