import React from 'react';
import { connect } from 'react-redux';

import { fetchTournament, editPlayer } from '../../../actions';
import PlayerForm from './PlayerForm';

class PlayerEdit extends React.Component {
  componentDidMount = () => {
    this.props.fetchTournament(this.props.match.params.id);
  }

  onSubmit = (formValues, playerId) => {
    let players = this.props.tournament.players;
    players[playerId] = formValues;

    this.props.editPlayer(this.props.match.params.id, players);
  }

  renderInitial = () => {
    if (!this.props.tournament){
      return <div>Loading...</div>
    }
    else if (this.props.currentId !== this.props.tournament.userId){
      return (
        <div>You must be logged in as this touranment's creator to edit this player</div>
      )
    }
    else {
      return (
        <div>
          <PlayerForm 
            onSubmit={this.onSubmit} 
            initialValues={this.props.tournament.players[this.props.match.params.playerId]}
            editPosition={this.props.match.params.playerId}
            id={this.props.tournament.id} />
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h3>Edit Player Info</h3>
        {this.renderInitial()}
      </div>
    )
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    tournament: state.tournaments[ownProps.match.params.id],
    currentId: state.auth.userId
  }
}

export default connect(mapStateToProps, { fetchTournament, editPlayer })(PlayerEdit);