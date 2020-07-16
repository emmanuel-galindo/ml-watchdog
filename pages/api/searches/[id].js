import dbConnect from '../../../utils/dbConnect'
import Search from '../../../models/Search'
import Article from '../../../models/Article'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const search = await Search.findById(id) /* find all the data in our database */
        res.status(200).json({ success: true, data: search })
      } catch (error) {
        console.log('Error getting search id ' + id + ': ' + error)
        res.status(400).json({ success: false })
      }
      // try {
      //   const search = Search.findById(id)
      //     // .populate('articles')
      //     // .exec(function (err, search) {
      //     //   if (err) { return res.status(400).json({ success: false, error: err.toString() }) }
      //     //   // if (!err) { return res.status(200).json({ search, items: search.articles }) }
      //     //   if (!err) { 
      //     //     // console.log('search => ' + search)
      //     //     return search
      //     //     // return res.status(200).json({ search: search.articles }) 
      //     //   }
      //     // })
      //   // console.log('search => ' + search)
      //   // Search.findById(id, function (err, search) {
      //   //   // error checks
      //   //   if (err) { console.log('error ==>' + err) } 
      //   //   if (!search) { console.log('not found') }
      //   //   // populate the document, return it
      //   //   Search.populate('articles', function(err, course){
      //   //     return res.status(200).json(search);
      //   //   });
      //   // })//.populate(search, { path:"articles", model:"Articles" })

      //   // const search = await Search.findById(id)
      //   //   .populate('articles')
      //   //   .exec()
      //     // .populate({
      //     //   path:"weeks",
      //     //   model:"Week"
      //     // })
      //     // .exec(function (err, search) {
      //       // if (err) return handleError(err);
      //       // console.log('The author is %s', search);
      //       // prints "The author is Ian Fleming"
      //     // });
      //     // .catch(err => console.log("error fetching searches => " + err))
      //   // if (!search) {
      //   //   return res.status(400).json({ success: false })
      //   // }
      //   res.status(200).json({ success: true, data: search })
      // } catch (error) {
      //   console.log('error => ' + error)
      //   res.status(400).json({ success: false })
      // }
      break

    case 'PUT' /* Edit a model by its ID */:
      try {
        const search = await Search.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!search) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: search })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedSearch = await Search.deleteOne({ _id: id })
        if (!deletedSearch) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
