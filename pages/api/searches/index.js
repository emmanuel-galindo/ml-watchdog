import dbConnect from '../../../utils/dbConnect'
import Search from '../../../models/Search'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const searches = await Search.find({}) /* find all the data in our database */
        res.status(200).json({ success: true, data: searches })
      } catch (error) {
        console.log('Error getting the searches: ' + error)
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const search = await Search.create(
          req.body
        ) /* create a new model in the database */
        res.status(201).json({ success: true, data: search })
      } catch (error) {
        console.error(error);
        
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
