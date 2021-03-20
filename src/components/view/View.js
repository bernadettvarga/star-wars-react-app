import { useState, useEffect } from 'react'

import swapi from '../../api/swapi'
import Title from '../common/Title'

export default function View (props) {
  const {
    endpoint,
    entity,
    error,
    setError,
    loading,
    setLoading
  } = props

  const [result, setResult] = useState({})

  useEffect(function setResultsOnLocationChange () {
    async function callSwapi () {
      try {
        setLoading(true)
        const { data } = await swapi.get(`/${endpoint}`)
        setResult(data)
        setError(false)
      } catch (err) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    if (endpoint) {
      callSwapi()
    }
  }, [endpoint])

  return (
    <div>
      {(loading) && <p>Loading...</p>}
      {(!loading && error) && <p>Oops, an error occured.</p>}
      {(!loading && !error) &&
        <div>
          <Title name={result.name || result.title} />
          {renderDetails()}
        </div>}
    </div>
  )

  // ***********************

  function renderDetails () {
    const config = {
      planets: [
        'rotation_period',
        'orbital_period',
        'diameter',
        'climate',
        'gravity',
        'terrain',
        'surface_water',
        'population'
      ],
      starships: [
        'model',
        'manufacturer',
        'cost_in_credits',
        'length',
        'max_atmosphering_speed',
        'crew',
        'passengers',
        'cargo_capacity',
        'consumables',
        'hyperdrive_rating',
        'MGLT',
        'starship_class'
      ],
      vehicles: [
        'model',
        'manufacturer',
        'cost_in_credits',
        'length',
        'max_atmosphering_speed',
        'crew',
        'passengers',
        'cargo_capacity',
        'consumables',
        'vehicle_class'
      ],
      people: [
        'height',
        'mass',
        'hair_color',
        'skin_color',
        'eye_color',
        'birth_year',
        'gender'
      ],
      films: [
        'episode_id',
        'opening_crawl',
        'director',
        'producer',
        'release_date'
      ],
      species: [
        'classification',
        'designation',
        'average_height',
        'average_lifespan',
        'hair_colors',
        'skin_colors',
        'eye_colors',
        'language'
      ]
    }

    return config[entity].map((item) => render(item))

    // *********************************

    function render (item) {
      return <p>{item}: {result[item]}</p>
    }
  }
}
