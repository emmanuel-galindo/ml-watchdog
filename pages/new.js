import Form from '../components/Form'

const NewSearch = () => {
  const searchForm = {
    name: '',
    url: '',
    /*
    species: '',
    age: 0,
    poddy_trained: false,
    diet: [],
    image_url: '',
    likes: [],
    dislikes: [],
    */
  }

  return <Form formId="add-search-form" searchForm={searchForm} />
}

export default NewSearch
