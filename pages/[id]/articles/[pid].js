import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dbConnect from '../../../utils/dbConnect'
import Article from '../../../models/Article'

/* Allows you to view article card info and delete article card*/
const ArticlePage = ({ article }) => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const handleDelete = async () => {
    const articleID = router.query.pid

    try {
      await fetch(`/api/articles/${articleID}`, {
        method: 'Delete',
      })
      router.push('/')
    } catch (error) {
      setMessage('Failed to delete the article.')
    }
  }

  return (
    <div key={article._id}>
      <div className="card">
        
        <h5 className="article-title">{article.title}</h5>
        <div className="main-content">
          <p className="article-title">{article.title}</p>
          <p className="url">Url: {article.url}</p>

          <div className="btn-container">
            <Link href="/[id]/edit" as={`/${article._id}/edit`}>
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

  
  const result = await Article.find({})
  const paths = result.map((doc) => {
    return { params: { id: doc.searchId.toString(), pid: doc._id.toString() }  }
  })
  // const util = require('util')
  // console.log(util.inspect(paths, {showHidden: false, depth: null}))

  return { paths, fallback: false }
}

// export async function getServerSideProps({ params }) {
export async function getStaticProps({ params }) {
  await dbConnect()

  const article = await Article.findById(params.pid).lean()
  article._id = article._id.toString()
  article.searchId = article.searchId.toString()
  article.createdAt = article.createdAt.toString()
  article.updatedAt = article.updatedAt.toString()
  // console.log("Article: " + JSON.stringify(article))
  return { props: { article } }
}

export default ArticlePage
