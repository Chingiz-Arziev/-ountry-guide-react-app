import {useState, useEffect} from "react";

import styled from "styled-components";
import axios from "axios";

import {searchByCode} from "../services";

const Wrapper = styled.div`
  margin-top: 3rem;
  width: 100%;
  display: grid;
  grid-template-columns: 100%;
  gap: 2rem;
  
  @media (min-width: 767px) {
    grid-template-columns: minmax(100px, 400px) 1fr;
    align-items: center;
    gap: 5;
  }

  @media (min-width: 1024px) {
    grid-template-columns: minmax(100px, 400px) 1fr;
  }
`

const InfoImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const InfoTittle = styled.h1`
  margin: 0;
  font-weight: var(--fw-normal);
`

const ListGroup = styled.div`
  display: flex;
  flex-direction: column;
  
  gap: 2rem;
  
  @media (min-width: 1024px) {
    flex-direction: row;
    gap: 4rem;    
  }
`

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const ListItem = styled.li`
  line-height: 1.8;
  
  & > b {
    font-weight: var(--fw-bold);
  }
`

const Meta = styled.div`
  margin-top: 3rem;
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
  align-items: flex-start;

  & > b {
    font-weight: var(--fw-bold);
  }
  
  @media (min-width: 767px) {
    flex-direction: row;
    align-items: center;
  }
`

const TagGroupe = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`

const Tag = styled.span`
  padding: 0 1rem;
  background-color: var(--colors-ui-base);
  box-shadow: var(--shadow);
  line-height: 1.5;
  cursor: pointer;
`

export const Info = (props) => {
  const {
    name,
    nativeName,
    flag,
    capital,
    population,
    region,
    subregion,
    topLevelDomain,
    currency = [],
    languages = [],
    borders = [],
    push
  } = props

  const [neighbors, setNeighbors] = useState([])

  useEffect(() => {
    axios.get(searchByCode(borders))
      .then(({data}) => setNeighbors(data.map(country => country.name)))
  },[borders])

  return (
    <Wrapper>
      <InfoImage src={flag} alt={name}/>

      <div>
        <InfoTittle>{name}</InfoTittle>
        <ListGroup>
          <List>
            <ListItem>
              <b>Native name:</b> {nativeName}
            </ListItem>
            <ListItem>
              <b>Population:</b> {population}
            </ListItem>
            <ListItem>
              <b>Region:</b> {region}
            </ListItem>
            <ListItem>
              <b>Sub region:</b> {subregion}
            </ListItem>
            <ListItem>
              <b>Capital:</b> {capital}
            </ListItem>
          </List>

          <List>
            <ListItem>
              <b>Top Level Domain</b>{' '}
              {topLevelDomain.map(domain => (
                  <span key={domain}>{domain}</span>
                ))}
            </ListItem>
            <ListItem>
              <b>Currencies</b>{' '}
              {currency.map(currency => (
                <span key={currency.code}>{currency.name} </span>
              ))}
            </ListItem>
            <ListItem>
              <b>Languages</b>{' '}
              {languages.map(language => (
                <span key={language.name}>{language.name}</span>
              ))}
            </ListItem>
          </List>
        </ListGroup>

        <Meta>
          <b>Border Countries</b>
          {!borders.length ? (
            <span>There is no border countries</span>
          ) : (
            <TagGroupe>
              {neighbors.map(borders => (
                <Tag key={borders} onClick={() => push(`/country/${borders}`)}>{borders}</Tag>
              ))}
            </TagGroupe>
          )}
        </Meta>

      </div>
    </Wrapper>
  )
}