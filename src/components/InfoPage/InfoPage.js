import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import Axios from 'axios';

const mapStateToProps = state => ({
  user: state.user,
});

class InfoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: {
        description: '',
        image_url: ''
      }
    }
  }
  
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  handleChange = (event) => {
    this.setState({
      newItem: {
        ...this.state.newItem,
        description: event.target.value }
    })
  }

  handleImageChange = (event) => {
    this.setState({
      
      newItem: {
        ...this.state.newItem,
        image_url: event.target.value,
      }
    })
  }

  addItem = (event) => {
    console.log('in addItem', this.state.newItem);
    event.preventDefault();
    Axios({
      method: 'POST',
      url: '/api/shelf',
      data: this.state.newItem
    }).then((reponse) => {
      //THIS IS WHERE THE GET FUNCTION WOULD BE CALLED
    }).catch((error) => {
      console.log('error in addItem', error);
    })
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>

          <h1>Add shelf items:</h1>
          <form onSubmit={this.addItem}>
            <div className="inputDiv">
              <input type="text" name="itemDescription" placeholder="description" onChange={this.handleChange} value={this.state.newItem.description} />
            </div>
            <div>
              <input type="text" name="itemImage" placeholder="image" onChange={this.handleImageChange} value={this.state.newItem.image_url} />
            </div>
            <div className="buttonDiv">
              <button>Submit</button>
            </div>
          </form>

        </div>
      );
    }

    return (
      <div>
        <Nav />
        {content}
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(InfoPage);
