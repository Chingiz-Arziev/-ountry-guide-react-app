import React, {useState, useEffect} from "react";

import axios from "axios";
import {ALL_COUNTRIES} from './services'

import {Header} from "./components/Header";
import {Controls} from "./components/Controls";
import {Main} from "./components/Main";
import {List} from './components/List'
import {Card} from './components/Card'



function App() {
  const [countries, setCountries] = useState([])


  console.log(countries)
  useEffect(() => {
    axios.get(ALL_COUNTRIES)
      .then(({data}) => setCountries(data))
  }, [])

  return (
    <div className="App">
      <Header/>
      <Main>
        <Controls/>
        <List>
          {countries.map((country) => {
            const countryInfo = {
              img: country.flags.png,
              name: country.name,
              info: [
                  {
                    title: 'Region',
                    description: country.region
                  },
                  {
                    title: 'Population',
                    description: country.population
                  },
                  {
                    title: 'Capital',
                    description: country.capital
                  }
                ]
              }
              return <Card key={country.name} {...countryInfo}/>
            })
          }
        </List>
      </Main>
    </div>
  );
}

export default App;
