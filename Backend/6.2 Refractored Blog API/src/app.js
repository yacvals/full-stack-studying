import express from "express";
import bodyParser from "body-parser";

import { InMemoryPostRepository } from './repositories/InMemoryPostRepository.js';
import { BasicPostValidation, StrictPostValidation } from './validation/PostValidationStrategy.js';
import { PostService } from './services/PostService.js';

const app = express();
const port = 4000;


const repository = new InMemoryPostRepository();

const postService = new PostService(
    repository, 
    new BasicPostValidation()
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// jump to strict mode
app.use('/posts/strict', (req, res, next) => {
    postService.setValidationStrategy(new StrictPostValidation());
    next();
});


app.get("/posts", (req, res) => {
    const result = postService.getAllPosts();
    res.json(result);
});

app.get("/posts/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const result = postService.getPostById(id);
    
    if (!result.success && result.statusCode === 404) {
        return res.status(404).json(result);
    }
    
    res.json(result);
});

app.post("/posts", (req, res) => {
    const result = postService.createPost(req.body);
    
    if (!result.success) {
        return res.status(result.statusCode).json(result);
    }
    
    res.status(201).json(result);
});

// strict route
app.post("/posts/strict", (req, res) => {
    const result = postService.createPost(req.body);
    
    if (!result.success) {
        return res.status(result.statusCode).json(result);
    }
    
    res.status(201).json(result);
});

app.patch("/posts/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const result = postService.updatePost(id, req.body);
    
    if (!result.success) {
        return res.status(result.statusCode).json(result);
    }
    
    res.json(result);
});

app.delete("/posts/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const result = postService.deletePost(id);
    
    if (!result.success) {
        return res.status(result.statusCode).json(result);
    }
    
    res.status(200).json(result);
});

app.listen(port, () => {
    console.log(`API is running at http://localhost:${port}`);
});

export default app;