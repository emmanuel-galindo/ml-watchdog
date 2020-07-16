import dbConnect from '../../../../../utils/dbConnect'
import Article from '../../../../../models/Article'

export default async function handler(req, res) {
  const {
    query: { pid },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const article = await Article.findById(pid)
          .populate('search')
        if (!article) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: article })
      } catch (error) {
        res.status(400).json({ success: false, error: error })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      try {
        const article = await Article.findByIdAndUpdate(pid, req.body, {
          new: true,
          runValidators: true,
        })
        if (!article) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: article })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedArticle = await Article.deleteOne({ _id: pid })
        if (!deletedArticle) {
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
