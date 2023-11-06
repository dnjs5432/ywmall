import Product from '../schemas/productSchema.js';
import express from 'express';

const router = express.Router();

// 상품 등록
router.post('/product', async (req, res) => {
  try {
    const { Id, title, content, author, password } = req.body;

    if (!Id || !title || !content || !author || !password) {
      return res.status(400).json({ errorMessage: '값이 유효하지 않습니다.' });
    }

    // db 저장
    const product = await Product.create({ Id, title, content, author, password });

    return res.json({ message: '상품 등록에 성공했습니다.', productId: product._id });
  } catch (error) {
    return res.status(400).json({ errorMessage: '상품 등록에 실패했습니다.' });
  }
});

// 목록 조회
router.get('/product', async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    const responseData = products.map((product) => {
      return {
        productId: product._id,
        Id: product.Id,
        title: product.title,
        content: product.content,
        status: product.status,
        author: product.author,
        createdAt: product.createdAt,
      };
    });
    res.status(200).json({ data: responseData });
  } catch (error) {
    res.status(500).json({ errorMessage: '오류가 발생했습니다.' });
  }
});

// 상세 정보 조회
router.get('/product/:productId', async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findOne({ Id: productId });
    if (!product) {
      return res.status(404).json({ errorMessage: '상품을 찾을 수 없습니다.' });
    }
    const { title, content, author, status, createdAt } = product;
    res.json({ title, content, author, status, createdAt });
  } catch (error) {
    res.status(400).json({ errorMessage: '상품 조회에 실패했습니다.' });
  }
});

// 상품 정보 수정
router.put('/product/:Id', async (req, res) => {
  const { Id } = req.params;
  const { title, content, author, password, status } = req.body;
  try {
    const product = await Product.findOne({ Id });
    if (!product) {
      return res.status(404).json({ errorMessage: '상품을 찾을 수 없습니다.' });
    }
    if (product.password !== password) {
      return res.status(401).json({ errorMessage: '비밀번호가 틀렸습니다.' });
    }

    product.title = title;
    product.content = content;
    product.author = author;
    product.status = status;

    await product.save();

    return res.json(product);
  } catch (error) {
    return res.status(400).json({ errorMessage: '상품 조회에 실패했습니다.' });
  }
});

// 상품 삭제
router.delete('/product/:Id', async (req, res) => {
  const { Id } = req.params;
  const { password } = req.body;

  try {
    const product = await Product.findOne({ Id });
    if (!product) {
      return res.status(404).json({ errorMessage: '상품을 찾을 수 없습니다.' });
    }
    if (product.password !== password) {
      return res.status(401).json({ errorMessage: '비밀번호가 틀렸습니다.' });
    }
    await product.deleteOne({ Id });
    return res.json({ message: '상품 삭제에 성공했습니다.' });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ errorMessage: '상품 삭제에 실패했습니다.' });
  }
});

export default router;
