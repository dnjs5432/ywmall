import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  Id: {
    type: Number,
    require: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  password: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: 'FOR_SALE',
  },
});
productSchema.set('timestamps', { createdAt: true, updatedAt: false });

const Product = mongoose.model('Product', productSchema);
export default Product;
