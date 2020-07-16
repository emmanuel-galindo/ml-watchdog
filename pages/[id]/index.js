import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dbConnect from '../../utils/dbConnect'
import Search from '../../models/Search'

/* Allows you to view search card info and delete search card*/
const SearchPage = ({ search }) => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const handleDelete = async () => {
    const searchID = router.query.id

    try {
      await fetch(`/api/searches/${searchID}`, {
        method: 'Delete',
      })
      router.push('/')
    } catch (error) {
      setMessage('Failed to delete the search.')
    }
  }

  return (
    <div key={search._id}>
      <div className="card">
        
        <h5 className="search-name">{search.name}</h5>
        <div className="main-content">
          <p className="search-name">{search.name}</p>
          <p className="url">Url: {search.url}</p>

          {/* Extra Search Info: Likes and Dislikes 
          <div className="likes info">
            <p className="label">Likes</p>
            <ul>
              {search.likes.map((data, index) => (
                <li key={index}>{data} </li>
              ))}
            </ul>
          </div>
          <div className="dislikes info">
            <p className="label">Dislikes</p>
            <ul>
              {search.dislikes.map((data, index) => (
                <li key={index}>{data} </li>
              ))}
            </ul>
          </div>
              */}
          

          <div className="btn-container">
            <Link href="/[id]/edit" as={`/${search._id}/edit`}>
              <button className="btn edit">Edit</button>
            </Link>
            <button className="btn delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
      {message && <p>{message}</p>}
    </div>
  )
}

export async function getStaticPaths() {
  await dbConnect()

  const result = await Search.find({})
  const paths = result.map((doc) => ({ params: { id: doc._id.toString() } }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  await dbConnect()

  const search = await Search.findById(params.id).lean()
  search._id = search._id.toString()

  return { props: { search } }
}

export default SearchPage
