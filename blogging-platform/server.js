// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// MongoDB connection
mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ... (rest of your code)


app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Define BlogPost model
const BlogPost = mongoose.model('BlogPost', {
  title: String,
  content: String,
  author: String,
  date: { type: Date, default: Date.now },
});

// Define routes

// ...

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// ...

// Create a new blog post
app.post('/api/blog-posts', async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const blogPost = new BlogPost({ title, content, author });
    await blogPost.save();
    res.json(blogPost);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all blog posts
app.get('/api/blog-posts', async (req, res) => {
  try {
    const blogPosts = await BlogPost.find().sort({ date: -1 });
    res.json(blogPosts);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ...

// Update a blog post
app.put('/api/blog-posts/:id', async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const updatedBlogPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      { title, content, author },
      { new: true }
    );
    res.json(updatedBlogPost);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a blog post
app.delete('/api/blog-posts/:id', async (req, res) => {
  try {
    const deletedBlogPost = await BlogPost.findByIdAndDelete(req.params.id);
    res.json(deletedBlogPost);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ...
