import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchTournament, manageTournament, pairTournament } from '../../actions';
import TournamentForm from './TournamentForm';
import PlayerList from './players/PlayerList';
import { pairRoundRobin } from '../../pairings/roundRobin.js';

class TournamentManage extends React.Component {
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

  //IS THIS BEING USED AT ALL?
  nextPairings = () => {
    console.log('hello');
    if (this.props.tournament.pairingMethod === 'roundRobin') {
      this.props.pairTournament(this.props.tournament.id, pairRoundRobin(this.props.tournament.players));
    }
    else {
      console.log("NOT IMPLEMENTED YET!");
    }
  }

  renderTouranmentInfo = () => {}

  renderPlayerButtons = () => {
    if ((!this.props.tournament) || (this.props.currentId !== this.props.tournament.userId)) {
      return;
    }

    var pairButton = "Pair Next Round";
    if (this.props.tournament.pairingMethod === 'roundRobin'){
      pairButton = "Pair Tournament";
    }

    return (
      <div>
        <Link 
        to={`/players/manage/${this.props.tournament.id}`} 
        className="ui primary button">
          Manage Players
        </Link>
      
        <Link 
        to={`/tournaments/wallchart/${this.props.tournament.id}`} 
        className="ui primary button">
          Wall Chart
        </Link>

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
      </div>
    )
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
        <div>You must be logged in as this touranment's creator to manage this tournament</div>
      )
    }
    else {
      return (
        <div>
          <TournamentForm onSubmit={this.onSubmit} initialValues={this.props.tournament}/>
          <PlayerList uneditable={true} match={this.props.match}/>
          {this.renderPlayerButtons()}
        </div>
      );
    } 
  }

  render() {
    return (
      <div>
        <h3>Manage Tournament</h3>
        {this.renderInitial()}
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

export default connect(mapStateToProps, { manageTournament, fetchTournament, pairTournament })(TournamentManage);