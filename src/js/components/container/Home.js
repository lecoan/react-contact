import React from 'react';
import API from 'API';
import {modifyContact, deleteContact, syncContacts, addContact} from 'REDUX/action/index';
import {connect} from 'react-redux';
import {withRouter} from  'react-router-dom';
import HomeView from '../presentational/HomeView';

const mapActionToProps = state => {
  return {
    contacts: state.contact.contacts
  };
};

const mapDispatchToProps = dispatch => ({
  modify: contact => dispatch(modifyContact(contact)),
  delete: id => dispatch(deleteContact(id)),
  add: contact => dispatch(addContact(contact)),
  sync: (contacts) => dispatch(syncContacts(contacts))
});

class Home extends React.Component {

  state = {
    contacts: this.props.contacts,
    searchResult: [],
    openSearch: false
  };

  componentWillMount() {
    API.getContacts().then(res => {
      let {data} = res;
      this.props.sync(data);
      this.setState({contacts: data});
    }).catch(e => {
      alert(e.message);
      this.props.history.replace('/login')
    })
  }

  handleModify = (contact) => {
    API.modifyContact(contact).then(res => {
      this.props.modify(res.data);
      this.setState({contacts: this.props.contacts});
    }).catch(e => {
      console.log(e.message);
    })
  };

  handleDelete = (id) => {
    API.deleteContact(id).then(res => {
      this.props.delete(id);
      this.setState({contacts: this.props.contacts});
    }).catch(e => {
      alert(e.message);
    });
  };

  handleAdd = (contact) => {
    API.addContact(contact).then(res => {
      this.props.add(res.data);
      this.setState({contacts: this.props.contacts});
    }).catch(e => {
      alert(e.message);
    })
  };

  handlePost = (type, contact) => {
    this.setState({open: false});
    if(type === 'add') {
      this.handleAdd(contact);  
    } else {
      this.handleModify(contact);
    }
  };

  handleLogout = () => {
    API.logout().then(({data}) => {
      this.props.history.replace('/login');
    }).catch(({message}) => {
      alert(message);
    });
  };

  handleSearch = (name) => {
    let searchResult = this.state.contacts
      .filter(contact => contact.name.includes(name));
    this.setState({searchResult, openSearch: true});
  }

  render() {
    const {
      contacts,
      searchResult,
      openSearch
    } = this.state;
    return (
      <HomeView
        handlePost={this.handlePost}
        handleDelete={this.handleDelete}
        handleSearch={this.handleSearch}
        handleLogout={this.handleLogout}
        contacts={contacts}
        searchResult={searchResult}
        openSearch={openSearch}
        handleClose={()=>this.setState({openSearch: false})}
      />
    )
  }
}
export default withRouter(connect(mapActionToProps, mapDispatchToProps)(Home));