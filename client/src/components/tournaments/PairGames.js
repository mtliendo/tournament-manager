import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Modal from '../Modal';
import { fetchTournament, pairTournament } from '../../actions';
import history from '../../history';
import { pairRoundRobin } from '../../pairings/roundRobin';

class PairGames extends React.Component {
  componentDidMount() {
    this.props.fetchTournament(this.props.match.params.id);
  }

  readyToPair() {
    console.log(this.props.tournament.pairingMethod);
    switch (this.props.tournament.pairingMethod) {
      case 'roundRobin':
        if (this.props.tournament.games.length > 0) {
          return ({ pairingReady: false, reason: 'Tournament already paired' });
        }

        return { pairingReady: true };


      case 'swiss':
        return ({ pairingReady: false, reason: 'Not implemented' });

      case 'adjacent':
        return ({ pairingReady: false, reason: 'Not implemented' });

      default:
        return ({ pairingReady: false, reason: 'unknown error' });
    }
  }

  renderContent(pairingReady, reason) {
    let filler = 'next round';
    if (this.props.tournament.pairingMethod === 'roundRobin') {
      filler = 'tournament';
    }

    if (pairingReady) {
      return `Are you sure you are ready to pair the ${filler}?`;
    }

    return `Cannot pair ${filler}: ${reason}`;
  }

  renderActions(pairingReady) {
    if (!pairingReady) {
      return;
    }

    const { id } = this.props.match.params;
    let games = [];
    if (this.props.tournament.pairingMethod) {
      games = pairRoundRobin(this.props.tournament.players);
      console.log(games);
    }

    return (
      <>
        <button className="ui button primary" onClick={() => this.props.pairTournament(id, games)}>
          Pair
        </button>
        <Link className="ui button" to={`/tournaments/manage/${this.props.tournament.id}`}>Cancel</Link>
      </>
    );
  }

  render() {
    if (!this.props.tournament) {
      return <div>Loading...</div>;
    }

    if (this.props.currentId !== this.props.tournament.userId) {
      return <div>You must be signed in as the tournament's creator to pair this tournament</div>;
    }

    const { pairingReady, reason } = this.readyToPair();
    console.log(pairingReady, reason);
    const filler = (this.props.tournament.pairingMethod === 'roundRobin') ? 'tournament' : 'next round';

    return (
      <Modal
        title={`Pair ${filler}`}
        content={this.renderContent(pairingReady, reason)}
        actions={this.renderActions(pairingReady)}
        onDismiss={() => history.push(`/tournaments/manage/${this.props.tournament.id}`)}
      />
    );
  }
}

const mapStateToProps = (state = {}, ownProps) => ({
  tournament: state.tournaments[ownProps.match.params.id],
  currentId: state.auth.userId,
});

export default connect(mapStateToProps, { fetchTournament, pairTournament })(PairGames);
