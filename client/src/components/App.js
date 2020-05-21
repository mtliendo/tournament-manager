import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import TournamentList from './tournaments/TournamentList';
import TournamentCreate from './tournaments/TournamentCreate';
import TournamentShow from './tournaments/TournamentShow';
import TournamentManage from './tournaments/TournamentManage';
import TournamentDelete from './tournaments/TournamentDelete';
import PlayerList from './tournaments/players/PlayerList';
import PlayerCreate from './tournaments/players/PlayerCreate';
import PlayerEdit from './tournaments/players/PlayerEdit';
import PlayerDelete from './tournaments/players/PlayerDelete';
import WallChart from './tournaments/WallChart';
import PairGames from './tournaments/PairGames';
import EnterResults from './tournaments/EnterResults';
import TournamentEdit from './tournaments/TournamentEdit';
import Header from './Header';
import history from '../history';
 
const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={TournamentList} />
            <Route path="/tournaments/create" component={TournamentCreate} />
            <Route path="/tournaments/show/:id" component={TournamentShow} />
            <Route path="/tournaments/manage/:id" component={TournamentShow} />
            <Route path="/tournaments/edit/:id" component={TournamentEdit} />
            <Route path="/tournaments/delete/:id" component={TournamentDelete} />
            <Route path="/players/manage/:id" component={PlayerList} />
            <Route path="/players/create/:id" component={PlayerCreate} />
            <Route path="/players/edit/:id/:playerId" component={PlayerEdit} />
            <Route path="/players/delete/:id/:playerId" component={PlayerDelete} />
            <Route path="/tournaments/wallchart/:id" component={WallChart} />
            <Route path="/tournaments/pair/:id" component={PairGames} />
            <Route path="/tournaments/results/:id" component={EnterResults} />
          </Switch>
        </div>
      </Router>
    </div>
  )
};
 
export default App;