import Link from 'next/link'
import dbConnect from '../utils/dbConnect'
import Search from '../models/Search'

const Index = ({ searches }) => (
  <>
    {/* Create a card for each search */}
    {searches.map((search) => (
      <div key={search._id}>
        <div className="card">
          {/*<img src={search.image_url} />*/}
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
              <Link href="/[id]/articles" as={`/${search._id}/articles`}>
                <button className="btn list">Articles</button>
              </Link>
              <Link href="/[id]/edit" as={`/${search._id}/edit`}>
                <button className="btn edit">Edit</button>
              </Link>
              <Link href="/[id]" as={`/${search._id}`}>
                <button className="btn view">View</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    ))}
  </>
)

/* Retrieves search(s) data from mongodb database */
export async function getStaticProps() {
  await dbConnect()

  /* find all the data in our database */
  const result = await Search.find({})
  const searches = result.map((doc) => {
    const search = doc.toObject()
    search._id = search._id.toString()
    return search
  })

  return { props: { searches: searches } }
}

export default Index
