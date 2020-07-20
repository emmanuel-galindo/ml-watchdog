import dbConnect from '../../utils/dbConnect'
import Search from '../../models/Search'
import Article from '../../models/Article'


export default async function handler(req, res) {
  const { method } = req

  await dbConnect()
  
  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const result = await Search.find({})
        const searches = result.map((doc) => {
          // console.log("Search :" + doc)
          const search = doc.toObject()
          search._id = search._id.toString()
          const reso = saveArticles(search._id, search.url)
          // console.log(JSON.stringify(reso))
          // console.log(util.inspect(reso, {depth: null}))

          return search
        })
      
        if (!searches) {
          return res.status(400).json({ success: false })
        }
        // res.status(200).json({ success: true })
        res.status(200).json({ success: true, data: searches })
      } catch (error) {
        console.error(console.error());
        res.status(400).json({ success: false, error: error })
      }
      break

      default:
        res.status(400).json({ success: false })
        break
    }
  }

  async function saveArticles(searchId, url) {
    // console.log('search id: ' + searchId )
    let offset = 0
    let total = -1 // allow first pass

    while (offset < total || total == -1) {
      if (offset > 0) {
        if (url.match('offset')) { 
          url = url.replace(/offset=(\w+)/, 'offset='+offset ) 
        } else { 
          url += '&offset='+offset  
        }
      }
      console.log("Calling URL: " + url)

      const json = await fetch(url)
        .then((res) => res.json())
        .catch(err => console.log("error fetching articles => " + err))
      // const json = await res.json();
      // console.log("JSON: " + JSON.stringify(json))

      // Pagination
      total = json.paging.total
      offset += json.paging.limit

      // Prepare 
      const art = json.results.map(  function (result) {
        const deltaResult = {
          meliId: result.id,
          searchId: searchId,
          title: result.title,
          url: result.permalink,
          thumbnail: result.thumbnail,
          price: result.price
        }
        // console.log("Row: " + deltaResult.search)
        return deltaResult      
      })
      try {
        //const article = await Article.create( art )
        console.log("Inserting " + art.length + " articles")
        Article.insertMany(art,{ ordered: false })
          .catch(err => console.log('Error insertMany: ' + err))
          // console.log("insertMany. Inserted articles: " + docs.length)
          // console.log("Error insertMany: " + error )
      } catch (error) {
        console.error(error)
        return false
      }
    }

    return true

  }