import {Route, Switch} from 'react-router-dom'

import {Header} from "./components/Header";
import {Main} from "./components/Main";

import {HomePage} from "./pages/HomePage";
import {DetailsPage} from "./pages/DetailsPage";
import {NotFoundPage} from "./pages/NotFoundPage";
import {useState} from "react";

function App() {
  const [countries, setCountries] = useState([])

  return (
    <div className="App">
      <Header/>
      <Main>
        <Switch>
          <Route exact path="/">
            <HomePage countries={countries} setCountries={setCountries}/>
          </Route>
          <Route path="/country/:name" component={DetailsPage}/>
          <Route component={NotFoundPage}/>
        </Switch>
      </Main>
    </div>
  );
}

export default App;
