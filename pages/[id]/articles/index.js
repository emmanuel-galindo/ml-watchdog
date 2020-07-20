import Link from 'next/link'
import dbConnect from '../../../utils/dbConnect'
import Article from '../../../models/Article'
import Search from '../../../models/Search'
import { useRouter } from 'next/router'

const ArticleIndex = ({ articles }) => (
  <>
    <ul className="article-list">
    {/* <table>
      <tr>
      <th>title</th>
      <th></th>
      </tr> */}
    {/*
      articles.map((article) => (
      // <div key={article._id}>
        <tr>
          <td><img src={article.thumbnail} /></td>
          <td><a href={article.url}>{article.title}</a></td>
          <td></td>
          <td>
            <Link href="/[id]/articles/[pid]" as={`/${article.searchId}/articles/${article._id}`}>
              <button className="btn view">View</button>
            </Link>
          </td>
        </tr>

      // </div>
      ))
      */}
      {
      articles.map((article) => (
      <li className="article-item">
      <div key={article._id}>
        <div className="card">
          <h5 className="article-name">{article.title}</h5>
          <img className="article-thumbnail" src={article.thumbnail} />
          <div className="main-content">
            <p className="article-name">{article.title}</p>
            <p className="url">Url: {article.url}</p>
              <Link href="/[id]/articles/[pid]" as={`/${article.searchId}/articles/${article._id}`}>
                <button className="btn view">View</button>
              </Link>
          </div>
        </div>
      </div>
      </li>
      ))}
    
    {/* </table> */}
    </ul>
  </>
)

/*
Error: getStaticPaths is required for dynamic SSG pages and is missing for '/[id]/articles'.
*/
export async function getStaticPaths() {
  await dbConnect()

  const result = await Search.find({})
  const paths = result.map((doc) => ({ params: { id: doc._id.toString() } }))
  // console.log(" debug!1 " + paths)
  // const util = require('util')
  // console.log(util.inspect(paths, {showHidden: false, depth: null}))

  return { paths, fallback: false }
}

/* Retrieves search(s) data from mongodb database */
export async function getStaticProps({params}) {
  await dbConnect()

  /* find all the data in our database */
  const result = await Article.find({searchId: params.id})
    // .sort('-createdAt')
  const articles = result.map((doc) => {
    const article = doc.toObject()
    article._id = article._id.toString()
    article.searchId = article.searchId.toString()
    article.createdAt = article.createdAt.toString()
    article.updatedAt = article.updatedAt.toString()
    return article
  })

  return { props: { articles: articles } }
}



export default ArticleIndex
