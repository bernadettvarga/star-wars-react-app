import { Jumbotron, Container } from 'react-bootstrap'
import Title from '../common/Title'

export default function View (props) {
  const {
    data,
    entity,
    error,
    loading
  } = props

  return (
    <div>
      {(loading) && <p>Loading...</p>}
      {(!loading && error) && <p>Oops, an error occured.</p>}
      {(!loading && !error) &&
        <div>
          <Container>
            <Title name={data.name || data.title} />
            <Jumbotron>
              {renderDetails()}
            </Jumbotron>
          </Container>
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
      return <p key={item}>{item.replaceAll('_', ' ')}:<br />{data[item]}</p>
    }
  }
}
