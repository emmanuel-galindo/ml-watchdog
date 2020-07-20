import mongoose from 'mongoose'


/* Searcheschema will correspond to a collection in your MongoDB database. */
const SearchSchema = new mongoose.Schema({
  name: {
    /* The name of this search */

    type: String,
    required: [true, 'Please provide a name for this search.'],
    maxlength: [20, 'Name cannot be more than 60 characters'],
  },
  url: {
    /* Url to search */

    required: [true, 'Please provide an url for this search.'],
    type: String,
  },
}
, { toJSON: { virtuals: true } } 
)

SearchSchema.virtual('articles', {
  ref: 'Article',
  localField: '_id',
  foreignField: 'searchId',
  justOne: false // set true for one-to-one relationship
})

SearchSchema.pre("deleteOne", { document: true }, function(next) {
  console.log('PRE!')
  let id = this._id;
  console.log('id: ' + id)
  mongoose.model("Article").deleteMany({ searchId: id }, function(err, result) {
    if (err) {
      next(err);
    } else {
      next();
    }
  });
});

export default mongoose.models.Search || mongoose.model('Search', SearchSchema)