import React from 'react';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { Link } from 'react-router-dom';

import { fetchTournament, enterResults, editPlayer } from '../../actions';
import { sortByScore } from '../../pairings/sortByScore';

class EnterResults extends React.Component {
  componentDidMount() {
    this.props.fetchTournament(this.props.match.params.id);
  }

  onRoundSubmit = (formValues) => {
    const { round, games } = formValues;
    const tournamentGames = this.props.tournament.games;
    var players = this.props.tournament.players;

    if (!games) {
      alert("No results changed");
    }
    else {
      var roundNum = parseInt(round);
      for (let i = 0; i < games[roundNum].length; i++) {
        if (games[roundNum][i]) {
          tournamentGames[roundNum][i].played = true;
          tournamentGames[roundNum][i].score = Number(games[roundNum][i]);
          for (let j = 0; j < players.length; j++) {
            if (tournamentGames[roundNum][i].white === players[j].uscfId) {
              players[j].score += tournamentGames[roundNum][i].score;
            }
            else if (tournamentGames[roundNum][i].black === players[j].uscfId) {
              players[j].score += (tournamentGames[roundNum][i].score - 1) * -1;
            }
          }
        }
      }
      
      players = sortByScore(this.props.tournament.players);
      console.log(players);
      this.props.enterResults(this.props.tournament.id, tournamentGames, players);
    }
  }

  renderButtons = () => {
    return (
      <div>
        <button type="submit" className="ui primary button">Submit</button>
        <Link to={`/tournaments/manage/${this.props.tournament.id}`} className="ui button">Cancel</Link>
      </div>
    );
  }

  renderGames(values) {
    if(!values.round){
      return;
    }

    var roundNumber = parseInt(values.round);

    if (isNaN(roundNumber)) {
      return;
    }

    var games = this.props.tournament.games[roundNumber];
    var gameFields = [];

    for (let i = 0; i < games.length; i++) {
      if (!games[i].played){
        gameFields.push(
          <div>
            <label>{games[i].white} vs {games[i].black}</label>
            <Field name={`games.${roundNumber}.${i}`} component="select">
              <option value="-1">Pending</option>
              <option value="1">White wins</option>
              <option value="0.5">Draw</option>
              <option value="0">Black wins</option>
            </Field>
          </div>
        )
        }
    }
    return gameFields;
  }

  renderRoundFields() {
    const fields = [];
    const numRounds = this.props.tournament.numRounds;

    for (let i = 0; i < numRounds; i++) {
      var value = (i).toString();

      fields.push(
        <label>
          <Field
            name="round"
            component="input"
            type="radio"
            value={value}
          />{' '}
          {i+1}
        </label>
      )
    }

    return fields;
  }

  render() {
    if (!this.props.tournament) {
      return <div>Loading...</div>
    }

    if (this.props.currentId !== this.props.tournament.userId) {
      return <div>You must be signed in as the tournament's creator to enter results</div>
    }

    return (
      <div>
        <Form
          onSubmit={ this.onRoundSubmit }
          render={({ handleSubmit, form, values }) => (
            <form onSubmit={ handleSubmit }>
              <div>
              <label>Round Number</label>
                <div>
                  {this.renderRoundFields()}
                </div>
              </div>
              {this.renderGames(values)}
              {this.renderButtons()}
            </form>
          )}
        />
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

export default connect(mapStateToProps, { fetchTournament, enterResults, editPlayer })(EnterResults);