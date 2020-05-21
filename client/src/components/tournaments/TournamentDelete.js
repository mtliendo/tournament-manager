import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Modal from '../Modal';
import history from '../../history';
import { fetchTournament, deleteTournament } from '../../actions';

class TournamentDelete extends React.Component {
  componentDidMount() {
    this.props.fetchTournament(this.props.match.params.id);
  }

  renderActions() {
    const { id } = this.props.match.params;

    return (
      <>
        <button className="ui button negative" onClick={() => this.props.deleteTournament(id)}>
          Delete
        </button>
        <Link className="ui button" to="/">Cancel</Link>
      </>
    );
  }

  renderContent() {
    if (!this.props.tournament) {
      return '';
    }

    return `Are you sure you want to delete the tournament with title: ${this.props.tournament.tournamentName}`;
  }

  render() {
    if (!this.props.tournament) {
      return <div>Loading...</div>;
    }
    if (this.props.currentId !== this.props.tournament.userId) {
      return <div>You must be signed in as the tournament's creator to delete the tournament</div>;
    }
    return (
      <Modal
        title="Delete Tournament"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
      />
    );
  }
}

const mapStateToProps = (state = {}, ownProps) => ({
  tournament: state.tournaments[ownProps.match.params.id],
  currentId: state.auth.userId,
});

export default connect(mapStateToProps, { fetchTournament, deleteTournament })(TournamentDelete);
