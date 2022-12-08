import React, {useState, useEffect} from "react";
import {useHistory} from 'react-router-dom'

import axios from "axios";

import {ALL_COUNTRIES} from '../services'

import {Controls} from "../components/Controls";
import {List} from '../components/List'
import {Card} from '../components/Card'

export const HomePage = ({countries, setCountries}) => {
  const [filteredCountries, setFilteredCountries] = useState(countries)

  const {push} = useHistory()

  const handleSearch = (search, region) => {
    let data = [...countries]

    if(region) {
      data = data.filter(country => country.region.includes(region))
    }

    if(search) {
      data = data.filter(country => country.name.toLowerCase().includes(search.toLowerCase()))
    }

    setFilteredCountries(data)
  }

  useEffect(() => {
    if(!countries.length) {
      axios.get(ALL_COUNTRIES)
        .then(({data}) => setCountries(data))
    }
  }, [])

  useEffect(() => {
    handleSearch()
  }, [countries])

  return (
    <>
      <Controls onSearch={handleSearch}/>
      <List>
        {filteredCountries.map((country) => {
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
            return <Card key={country.name} {...countryInfo} onClick={() => push(`/country/${country.name}`)}/>
          })
        }
      </List>
    </>
  )
}