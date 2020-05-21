import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Modal from '../../Modal';
import history from '../../../history';
import { fetchTournament, deletePlayer } from '../../../actions';

class PlayerDelete extends React.Component {
  componentDidMount() {
    this.props.fetchTournament(this.props.match.params.id);
  }

  renderActions() {
    const { id, playerId } = this.props.match.params;
    const { players, numRounds, pairingMethod } = this.props.tournament;
    console.log('players', players);
    console.log('numRounds', numRounds);
    console.log('pairingMethod', pairingMethod);

    return (
      <>
        <button className="ui button negative" onClick={() => this.props.deletePlayer(id, playerId, players, numRounds, pairingMethod)}>
          Delete
        </button>
        <Link className="ui button" to={`/players/manage/${this.props.tournament.id}`}>Cancel</Link>
      </>
    );
  }

  renderContent() {
    if (!this.props.tournament) {
      return '';
    }

    const { playerFirstName, playerLastName } = this.props.tournament.players[this.props.match.params.playerId];

    return `Are you sure you want to delete ${playerFirstName} ${playerLastName} from the tournament?`;
  }

  render() {
    if (!this.props.tournament) {
      return <div>Loading...</div>;
    }
    if (this.props.currentId !== this.props.tournament.userId) {
      return <div>You must be signed in as the tournament's creator to delete players</div>;
    }
    return (
      <Modal
        title="Delete Player"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push(`/players/manage/${this.props.tournament.id}`)}
      />
    );
  }
}

const mapStateToProps = (state = {}, ownProps) => ({
  tournament: state.tournaments[ownProps.match.params.id],
  currentId: state.auth.userId,
});

export default connect(mapStateToProps, { fetchTournament, deletePlayer })(PlayerDelete);
