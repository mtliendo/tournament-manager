import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchTournament } from '../../actions';
import PlayerList from './players/PlayerList';

class TournamentShow extends React.Component {
  componentDidMount() {
    const {id} = this.props.match.params;

    this.props.fetchTournament(id);
  }

  renderPairingMethod = () => {
    let pairingMethod = this.props.tournament.pairingMethod;
    if (pairingMethod === 'roundRobin') {
      pairingMethod = 'Round Robin'
    }
    
    return (
      <h3>Pairing Method: {pairingMethod}</h3>
    )
  }

  renderManagementButtons = () => {
    if (this.props.currentUser !== this.props.tournament.userId){
      return (
        <Link 
        to={`/`} 
        className="ui button">
          Return to all tournaments
        </Link>
      );
    }

    var pairButton = "Pair Next Round";
    if (this.props.tournament.pairingMethod === 'roundRobin'){
      pairButton = "Pair Tournament";
    }

    return (
      <div>
        <div>
          <Link 
          to={`/tournaments/edit/${this.props.match.params.id}`} 
          className="ui primary button">
            Edit Tournament Information
          </Link>
   
          <Link
          to={`/players/manage/${this.props.match.params.id}`}
          className="ui primary button">
            Manage Players
          </Link>

          <Link
          to={`/tournaments/wallchart/${this.props.match.params.id}`}
          className="ui primary button">
            Display Wall Chart
          </Link>
        </div>
        <div className="ui horizontal divider"></div>
        <div>
          <Link 
          to={`/tournaments/pair/${this.props.tournament.id}`} 
          className="ui primary button">
            {pairButton}
          </Link>

          <Link 
          to={`/tournaments/results/${this.props.tournament.id}`} 
          className="ui primary button">
            Enter results
          </Link>

          <Link 
          to={`/tournaments/delete/${this.props.match.params.id}`} 
          className="ui negative button">
            Delete Tournament
          </Link>
        </div>
        <div className="ui horizontal divider"></div>
        <div>
          <Link 
          to={`/`} 
          className="ui button">
            Return to all tournaments
          </Link>
        </div>
      </div>
    )
  }

  /*
  <div class="ui grid">
        <div class="six wide column">
          <Link 
          to={`/tournaments/manage/${this.props.match.params.id}`} 
          className="ui primary button">
            Edit Tournament Information
          </Link>
        </div>

        <div class="six wide column">
          <Link
          to={`/players/manage/${this.props.match.params.id}`}
          className="ui primary button">
            Manage Players
          </Link>
        </div>

        <div class="four wide column">
          <Link
          to={`/tournaments/wallchart/${this.props.match.params.id}`}
          className="ui primary button">
            Display Wall Chart
          </Link>
        </div>

        <div class="six wide column">
          <Link 
          to={`/tournaments/pair/${this.props.tournament.id}`} 
          className="ui primary button">
            {pairButton}
          </Link>
        </div>

        <div class="six wide column">
          <Link 
          to={`/tournaments/results/${this.props.tournament.id}`} 
          className="ui primary button">
            Enter results
          </Link>
        </div>

        <div class="four wide column">
          <Link 
          to={`/tournaments/delete/${this.props.match.params.id}`} 
          className="ui negative button">
            Delete Tournament
          </Link>
        </div>

        <div class="four wide column">
          <Link 
          to={`/`} 
          className="ui button">
            Return to all tournaments
          </Link>
        </div>
      </div>
  */

  renderTournamentInfo() {
    return (
      <div>
        <h1>Tournament Name: {this.props.tournament.tournamentName}</h1>
        <h3>Date: {this.props.tournament.tournamentDate}</h3>
        {this.renderPairingMethod()}
        <PlayerList uneditable={true} match={this.props.match}/>
        <div className="ui horizontal divider"></div>
        {this.renderManagementButtons()}
      </div>
    );
  }

  render() {
    if (!this.props.tournament) {
      return <div>Loading...</div>
    }

    return (
      <div>
        {this.renderTournamentInfo()}
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps)=> {
  return {
    tournament: state.tournaments[ownProps.match.params.id],
    currentUser: state.auth.userId
  };
}

export default connect(mapStateToProps, { fetchTournament })(TournamentShow);