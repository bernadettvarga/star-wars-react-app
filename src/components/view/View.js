import { Jumbotron, Container } from 'react-bootstrap'
import Header from '../common/Header'
import SpinnerContainer from '../common/SpinnerContainer'

export default function View (props) {
  const {
    data,
    entity,
    error,
    loading
  } = props

  return (
    <div>
      <Header entity={entity} />
      {(loading) && <SpinnerContainer />}
      {(!loading && error) && <p>Oops, an error occured.</p>}
      {(!loading && !error) &&
        <Container>
          <Jumbotron>
            {renderDetails()}
          </Jumbotron>
        </Container>}
    </div>
  )

  // ***********************

  function renderDetails () {
    const config = {
      planets: [
        'name',
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
        'name',
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
        'name',
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
        'name',
        'height',
        'mass',
        'hair_color',
        'skin_color',
        'eye_color',
        'birth_year',
        'gender'
      ],
      films: [
        'title',
        'episode_id',
        'opening_crawl',
        'director',
        'producer',
        'release_date'
      ],
      species: [
        'name',
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
      return <p key={item}>{item.replaceAll('_', ' ')}:<br />{data[item]}</p>
    }
  }
}
