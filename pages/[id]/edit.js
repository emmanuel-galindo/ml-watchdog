import { useRouter } from 'next/router'
import useSWR from 'swr'
import Form from '../../components/Form'

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

const EditSearch = () => {
  const router = useRouter()
  const { id } = router.query
  const { data: search, error } = useSWR(id ? `/api/searches/${id}` : null, fetcher)

  if (error) return <p>Failed to load</p>
  if (!search) return <p>Loading...</p>

  const searchForm = {
    name: search.name,
    url: search.url,
    /*
    owner_name: search.owner_name,
    species: search.species,
    age: search.age,
    poddy_trained: search.poddy_trained,
    diet: search.diet,
    image_url: search.image_url,
    likes: search.likes,
    dislikes: search.dislikes,
    */
  }

  return <Form formId="edit-search-form" searchForm={searchForm} forNewSearch={false} />
}

export default EditSearch
