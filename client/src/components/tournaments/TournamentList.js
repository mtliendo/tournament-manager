import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchTournaments } from '../../actions';
 
class TournamentList extends React.Component {
  componentDidMount() {
    this.props.fetchTournaments();
  }

  renderAdmin(tournament) {
    if (tournament.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/tournaments/manage/${tournament.id}`} className="ui button primary">
            Manage 
          </Link>
          <Link to={`/tournaments/delete/${tournament.id}`} className="ui button negative">
            Delete
          </Link>
        </div>
      );
    };
  }

  renderList() {
    return this.props.tournaments.map(tournament => {
      return (
        <div className="item" key={tournament.id}>
          {this.renderAdmin(tournament)}
          <i className="large middle aligned chess icon" />
          <div className="content">
            <Link to={`/tournaments/show/${tournament.id}`}>
              {tournament.tournamentName}
            </Link>
            <div className="description">
              {tournament.tournamentDate}
            </div>
          </div>
        </div>
      );
    });
  }

  renderCreate(){
    if (this.props.isSignedIn) {
      return(
        <Link to="/tournaments/create/" className="ui button primary">
          Create New Tournament
        </Link> 
      );
    } 
  }

  render() {
    return (
      <div>
        <h3>Tournament List</h3>
        <div className="ui celled list">
          {this.renderList()}
        </div> 
        {this.renderCreate()} 
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    tournaments: Object.values(state.tournaments),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  }
}
 
export default connect(mapStateToProps, { fetchTournaments })(TournamentList);