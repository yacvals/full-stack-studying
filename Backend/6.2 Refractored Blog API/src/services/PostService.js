import { ResponseFactory } from '../factories/ResponseFactory.js';
import { Logger } from '../utils/Logger.js';

export class PostService {
    constructor(repository, validationStrategy) {
        this.repository = repository;
        this.validationStrategy = validationStrategy;
    }

    getAllPosts() {
        const posts = this.repository.getAllPosts();
        return ResponseFactory.createSuccessResponse(posts, "Posts retrieved successfully");
    }

    getPostById(id) {
        const post = this.repository.getPostById(id);
        if (!post) {
            return ResponseFactory.createNotFoundResponse("Post");
        }
        return ResponseFactory.createSuccessResponse(post, "Post retrieved successfully");
    }

    createPost(postData) {
        // Валідація
        const validation = this.validationStrategy.validate(postData);
        if (!validation.isValid) {
            return ResponseFactory.createValidationErrorResponse(validation.errors);
        }

        // Створення посту
        const newPost = this.repository.createPost(postData);
        
        // Простий лог
        Logger.log("POST_CREATED", newPost);
        
        return ResponseFactory.createSuccessResponse(newPost, "Post created successfully");
    }

    updatePost(id, updateData) {
        // Перевірка існування посту
        const existingPost = this.repository.getPostById(id);
        if (!existingPost) {
            return ResponseFactory.createNotFoundResponse("Post");
        }

        // Валідація оновлених даних
        const dataToValidate = { ...existingPost, ...updateData };
        const validation = this.validationStrategy.validate(dataToValidate);
        if (!validation.isValid) {
            return ResponseFactory.createValidationErrorResponse(validation.errors);
        }

        // Оновлення
        const updatedPost = this.repository.updatePost(id, updateData);
        
        // Простий лог
        Logger.log("POST_UPDATED", updatedPost);
        
        return ResponseFactory.createSuccessResponse(updatedPost, "Post updated successfully");
    }

    deletePost(id) {
        const existingPost = this.repository.getPostById(id);
        if (!existingPost) {
            return ResponseFactory.createNotFoundResponse("Post");
        }

        const deleted = this.repository.deletePost(id);
        if (deleted) {
            // Простий лог
            Logger.log("POST_DELETED", existingPost);
            return ResponseFactory.createSuccessResponse(null, "Post deleted successfully");
        }
        
        return ResponseFactory.createErrorResponse("Failed to delete post");
    }

    // Метод для зміни стратегії валідації
    setValidationStrategy(strategy) {
        this.validationStrategy = strategy;
    }
}