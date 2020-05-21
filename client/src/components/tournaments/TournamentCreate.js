import React from 'react';
import { connect } from 'react-redux';

import { createTournament } from '../../actions';
import TournamentForm from './TournamentForm';


class TournamentCreate extends React.Component {
  onSubmit = values => {
    if (!this.props.isSignedIn) {
      window.alert("You must sign in to create a tournament");
    }
    else {
      this.props.createTournament({...values, numRounds: 0, games: []});
    }
  }

  render() {
    return (
        <div>
          <h3>Create a Touranment</h3>
          <TournamentForm onSubmit={this.onSubmit}/>
        </div>
      )
  }
}; 

const mapStateToProps = (state) => {
  return {isSignedIn: state.auth.isSignedIn}
}

export default connect(mapStateToProps, { createTournament })(TournamentCreate);