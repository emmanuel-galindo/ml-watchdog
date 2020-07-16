import dbConnect from '../../../../../utils/dbConnect'
import Article from '../../../../../models/Article'

export default async function handler(req, res) {
  const { 
    query: { id },
    method } = req

  console.log("id: " + id)
  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const articles = await Article.find({searchId: id}) /* find all the data in our database */
        res.status(200).json({ success: true, data: articles })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const article = await Article.create(
          req.body
        ) /* create a new model in the database */
        res.status(201).json({ success: true, data: article })
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
