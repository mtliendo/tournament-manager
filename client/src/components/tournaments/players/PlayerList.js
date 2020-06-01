import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchTournament } from '../../../actions';

class PlayerList extends React.Component {
  componentDidMount = () => {
    const id = this.props.match.params.id;
    this.props.fetchTournament(id);
  }

  renderAdmin = (playerId) => {
    if (!this.props.editable) {
      return;
    }

    return (
      <div className="right floated content">
        <Link 
        to={`/players/edit/${this.props.tournament.id}/${playerId}`} 
        className="ui button primary">
          Edit Player Info
        </Link>
        <Link 
        to={`/players/delete/${this.props.tournament.id}/${playerId}`} 
        className="ui button negative">
          Delete
        </Link>
      </div>
    );
  }

  renderPlayers = () => {
    if (!this.props.tournament) {
      return <div>Loading...</div>
    }
    else if ((!this.props.tournament.players)||(this.props.tournament.players.length === 0)){
      return <div>No players have been added to this tournament</div>;
    }
    return this.props.tournament.players.map((player, index) => {
      return (
        <div className="item" key={this.props.tournament.players[index].uscfId}>
          {this.renderAdmin(index)}
          <div className="content">
            {player.playerFirstName} {player.playerLastName}
          </div>          
          <div className="description">
            ID: {player.uscfId} Rating: {player.uscfRating}
          </div>
        </div>
      );
    });
  }

  renderBottomButtons = () => {
    if (!this.props.editable || !this.props.tournament) {
      return;
    }

    return (
      <Fragment>
        <Link
        to={`/players/create/${this.props.tournament.id}`} 
        className="ui button primary">
          Add Player
        </Link>
        <Link 
        to={`/tournaments/manage/${this.props.tournament.id}`}
        className="ui button">
          Return to Tournament
        </Link>
      </Fragment>
    );
  }
  
  render() {
    return (
      <div>
        <h3>Players:</h3>
        <div className="ui celled list">
          {this.renderPlayers()}
        </div>
        {this.renderBottomButtons()}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const uneditable = ownProps.uneditable ? true : false;
  return { 
    editable: !uneditable,
    tournament: state.tournaments[ownProps.match.params.id],
    currentId: state.auth.userId
   };
}

export default connect(mapStateToProps, { fetchTournament })(PlayerList); 