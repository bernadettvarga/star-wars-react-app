import { useState } from 'react'
import { Form, FormControl, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

export default function Search ({ entity }) {
  const history = useHistory()

  const [query, setQuery] = useState('')

  return (
    <Form inline>
      <FormControl
        type='text'
        placeholder={`Search for ${entity}`}
        className='mr-sm-2 search__input'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(e) => handlePressingEnter(e)}
      />
      <Button variant='outline-success' onClick={() => search()} className='search__btn'>
        <i class="bi-search"></i>
      </Button>
    </Form>
  )

  // *******************

  function search () {
    if (query) {
      history.push(`/listing/${entity}/?search=${query}`)
      setQuery('')
    }
  }

  function handlePressingEnter (e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      search()
    }
  }
}
