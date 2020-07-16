import mongoose from 'mongoose'

/* Article schema will correspond to a collection in your MongoDB database. */
const ArticleSchema = new mongoose.Schema({
  searchId: { 
    type: mongoose.Schema.Types.ObjectId, 
    // ref: 'Search'
    required: [true, 'Please provide a Search ID for this article.'],
    maxlength: [60, 'Search ID cannot be more than 60 characters'],
  },
  meliId: {
    /* The meliId of this article */

    type: String,
    required: [true, 'Please provide a meliId for this article.'],
    maxlength: [20, 'meliId cannot be more than 20 characters'],
    unique : true, dropDups: true 
  },
  title: {
    /* The name of this article */

    type: String,
    required: [true, 'Please provide a title for this article.'],
    maxlength: [255, 'Title cannot be more than 255 characters'],
  },
  url: {
    /* Url to article */

    required: [true, 'Please provide an url for this article.'],
    type: String,
  }
},{ timestamps: true })

export default mongoose.models.Article || mongoose.model('Article', ArticleSchema)