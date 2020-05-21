import React from 'react';
import { connect } from 'react-redux';

import { fetchTournament, manageTournament } from '../../actions';
import TournamentForm from './TournamentForm';

class TournamentEdit extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id;

    this.props.fetchTournament(id);
  }

  onSubmit = formValues => {
    if ((formValues.pairingMethod === 'roundRobin') && (this.props.tournament.players)) {
      let numPlayers = this.props.tournament.players.length;

      if (numPlayers % 2 === 1) {
        numPlayers += 1;
      }

      formValues.numRounds = numPlayers - 1;
    }

    this.props.manageTournament(this.props.tournament.id, formValues);
  }

  renderInitial() {
    if (!this.props.tournament){
      return (
        <div>
          Loading...
        </div>
      )
    }
    else if (this.props.currentId !== this.props.tournament.userId){
      return (
        <div>You must be logged in as this touranment's creator to edit this tournament's information</div>
      )
    }
    else {
      return (
        <div>
          <TournamentForm onSubmit={this.onSubmit} initialValues={this.props.tournament}/>
        </div>
      );
    } 
  }

  render() {
    return (
      <div>
        <h3>Edit Tournament Info</h3>
        {this.renderInitial()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    tournament: state.tournaments[ownProps.match.params.id],
    currentId: state.auth.userId
  };
}

export default connect(mapStateToProps, { fetchTournament, manageTournament })(TournamentEdit);