import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchTournament } from '../../actions';

class WallChart extends React.Component {
  componentDidMount = () => {
    this.props.fetchTournament(this.props.match.params.id);
  }

  renderRoundNumbers() {
    const arr = [];

    for (let i = 0; i < this.props.tournament.numRounds; i++) {
      arr.push(<th>Rd. {i+1}</th>);
    }

    return arr;
  }

  renderHead = () => {
    return(
      <thead>
        <tr>
          <th>Name</th>
          {this.renderRoundNumbers()}
          <th>Score</th>
        </tr>
      </thead>
    )
  }

  renderGameResults = (row) => {
    const tourn = this.props.tournament;
    var arr = [];
    var numRounds = tourn.numRounds;
    var player = this.props.tournament.players[row];
    var color = 'not found';
    var score;
    var game;
    var opponentId;

    for (let round = 0; round < numRounds; round++) {
      if (round < tourn.games.length) {
        for (let i = 0; i < tourn.games[round].length; i++) {
          game = tourn.games[round][i];
          opponentId = 'R';
          if (game.white === player.uscfId) {
            color = 'W';
            for (let j = 0; j < tourn.players.length; j++){
              if (game.black === tourn.players[j].uscfId) {
                opponentId = j + 1;
              }
            }
            if (game.played) {
              score = game.score;
            }
            else {
              score = "pending";
            }
            if (opponentId === 'R') {
              arr.push(<td>Bye<br></br>0</td>);
            }
            else {
              arr.push(
                <td>
                  {color} {opponentId}<br></br> 
                  {score}<br></br> 
                </td>
              )
              }
          }

          else if (game.black === player.uscfId) {
            color = 'B';
            for (let j = 0; j < tourn.players.length; j++){
              if (game.white === tourn.players[j].uscfId) {
                opponentId = j + 1;
              }
            }
            if (game.played) {
              score = ((game.score - 1) * -1);
            }
            else {
              score = "pending";
            }
            arr.push(
              <td>
                {color} {opponentId}<br></br> 
                {score}<br></br> 
              </td>
            )
          }
        }
      }
      else {
        arr.push(<td>pending</td>)
      }
    } 
    return arr;
  }

  renderRows = () => {
    const arr = [];
    var player;
    for (let i = 0; i < this.props.tournament.players.length; i++) {
      player = this.props.tournament.players[i];
      arr.push(
        <tr>
          <td>
            {i+1}. {player.playerLastName}, {player.playerFirstName}<br></br>
            {player.uscfRating}
          </td>
          {this.renderGameResults(i)}
          <td>{player.score}</td>
        </tr>
      )
    }
    return arr;    
  }

  renderBody = () => {
    return(
      <tbody>
        {this.renderRows()}
      </tbody>
    );
  }

  renderButtons = () => {
    return (
      <Fragment>
        <Link 
          to={`/tournaments/results/${this.props.tournament.id}`} 
          className="ui button">
            Enter Results
        </Link>
        <Link 
          to={`/tournaments/manage/${this.props.tournament.id}`} 
          className="ui button">
            Return
        </Link>
      </Fragment>
    )
  }

  renderInitial = () => {
    if (!this.props.tournament) {
      return (<div>Loading...</div>)
    }
    else if(!this.props.tournament.players || this.props.tournament.players.length === 0){
      return (
        <Fragment>
          <div>
            No players currently in tournament
          </div>
          <Link 
          to={`/tournaments/manage/${this.props.tournament.id}`} 
          className="ui button">
            Return
          </Link>
        </Fragment>
      )
    }    
    else {
      return (
        <Fragment>
          <div>
            <table className="ui collapsing table">
              {this.renderHead()}
              {this.renderBody()}
            </table>
          </div>
          {this.renderButtons()}           
        </Fragment>
      )
    }
  }

  render () {
    return (
      <div>
       <h3>Wall Chart</h3>
        {this.renderInitial()}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {tournament: state.tournaments[ownProps.match.params.id]}
}

export default connect(mapStateToProps, { fetchTournament })(WallChart);