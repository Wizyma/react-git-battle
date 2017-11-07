import React from 'react';
import Popular from './Popular';
import * as ReactRouter from 'react-router-dom';
const Router = ReactRouter.BrowserRouter;
const Route = ReactRouter.Route;
const Switch = ReactRouter.Switch;
import Nav from './Nav';
import Home from './Home';
import Battle from './Battle';
import Results from './Results';

class App extends React.Component{
    render(){
        return (
            <Router>
              <div className='container'>
                  <Nav/>
                  <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/battle' component={Battle} />
                    <Route path='/battle/results' component={Results} />
                    <Route path='/popular' component={Popular} />
                    <Route render={() => <p>Not found</p>} />
                  </Switch>
              </div>
            </Router>
        )
    }
}

export default App;
