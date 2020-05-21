import React from 'react';
import { connect } from 'react-redux';

import PlayerForm from './PlayerForm';
import { addPlayer, fetchTournament } from '../../../actions';

class PlayerCreate extends React.Component {
  componentDidMount = () => {
    const id = this.props.match.params.id;

    this.props.fetchTournament(id);
  }

  onSubmit = (formValues) => {
    var players = [];
    var numRounds = this.props.tournament.numRounds;
    formValues = {...formValues, score: 0};

    if(this.props.tournament.players) {
      players = this.props.tournament.players
    }
    
    players.push(formValues);

    if (this.props.tournament.pairingMethod === 'roundRobin') {
      if (players.length % 2 === 0) {
        numRounds = players.length - 1;
      }
      else {
        numRounds = players.length;
      }
    }
    
    this.props.addPlayer(this.props.match.params.id, players, numRounds);
  }

  render() {
    if (!this.props.tournament) {
      return <div>Loading...</div>
    }
    if (this.props.currentId !== this.props.tournament.userId) {
      return <div>You must be signed in as the tournament's creator to add players</div>
    }
    return (
      <div>
          <h3>Add a player</h3>
          <PlayerForm onSubmit={this.onSubmit} id={this.props.tournament.id}/>
        </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    tournament: state.tournaments[ownProps.match.params.id],
    currentId: state.auth.userId
  };
}

export default connect(mapStateToProps, { addPlayer, fetchTournament })(PlayerCreate);