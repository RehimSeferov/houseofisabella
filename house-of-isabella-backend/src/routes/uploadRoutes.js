const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');

router.post('/', upload.single('image'), (req, res) => {
  try {
    
    res.send({
        success: true,
        imageUrl: `/${req.file.path.replace(/\\/g, "/")}` 
    });
  } catch (error) {
    res.status(400).send({ message: 'Şəkil yüklənmədi' });
  }
});

module.exports = router;