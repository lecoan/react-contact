import React from 'react';
import {withStyles} from 'material-ui/styles';
import PropTypes from 'prop-types';
import Settings from '../presentational/SettingGroup';
import Table from 'VIEW/presentational/ContactTable';
import InputForm from '../presentational/InputForm';
import Result from '../presentational/SearchResult';
import Grid from 'material-ui/Grid';
import Slide from 'material-ui/transitions/Slide';

const styles = theme => ({
  root: {
    position: 'relative',
    height: '100%'
  },
  backgroud: {
    height: '30%',
    background: 'blue'
  },
  container: {
    position: 'relative',
    marginTop: -35,
    height: '70%'
  },
  table: {
    
  },
  settings: {

  }
});

class HomeView extends React.Component {

  state = {
    openForm: false,
    type: 'add',
    formContact: {}
  };

  openForm = (type, contact) => {
    this.setState({
      openForm: true,
      formContact: contact,
      type
    })
  };

  render() {
    const {
      classes,
      handlePost,
      handleDelete,
      handleSearch,
      handleLogout,
      contacts,
      searchResult,
      openSearch,
      handleClose
    } = this.props;
    const {
      type,
      formContact,
      openForm
    } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.backgroud}/>
        <Grid 
          container 
          className={classes.container}
          alignContent="space-around"
          justify="space-around"
          >
          <div></div>
          <Slide in={true} mountOnEnter unmountOnExit direction="up" >
            <Table
              className={classes.table}
              contacts={contacts? contacts: []}
              handleModify={this.openForm}
              handleDelete={handleDelete}
            />   
          </Slide>      
          <Settings 
            className={classes.settings}
            handleSearch={handleSearch}
            handleLogout={handleLogout}
            handleAdd={() => this.openForm('add', {})}
          />
          <div></div>
        </Grid>
      <InputForm
        open={openForm}
        type={type}
        contact={formContact}
        handleCancel={() => this.setState({openForm: false})}
        handlePost={(type, contact) => {
          handlePost(type, contact);
          this.setState({openForm: false})
        }}
      />
      <Result
        open={openSearch}
        searchResult={searchResult}
        handleModify={handlePost}
        handleDelete={handleDelete}
        handleClose={handleClose}
      />
      </div>
    );
  }

  static propTypes = {
    handlePost: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleSearch:PropTypes.func.isRequired,
    handleLogout: PropTypes.func.isRequired,
    contacts: PropTypes.array.isRequired,
    searchResult: PropTypes.array.isRequired,
    openSearch: PropTypes.bool.isRequired
  }
}

export default withStyles(styles)(HomeView);

