import React, { Suspense } from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
const Ingredients = React.lazy(() => import('./components/Ingredients'));

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <nav className='App-Header__nav'>Store</nav>
        </header>
        <main className='App__content'>
          <Suspense fallback={<span>Loading...</span>}>
            <Switch>
              <Route path='/home' exact component={Home} />
              <Route path='/ingredients' exact component={Ingredients} />
              <Route path='/' exact component={Home} />
            </Switch>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;
