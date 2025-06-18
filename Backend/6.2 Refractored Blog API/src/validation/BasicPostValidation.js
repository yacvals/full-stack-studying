import { PostValidationStrategy } from './PostValidationStrategy.js';

export class BasicPostValidation extends PostValidationStrategy {
    validate(post) {
        const errors = [];
        
        if (!post.title || post.title.trim().length === 0) {
            errors.push("Title is required");
        }
        
        if (!post.content || post.content.trim().length === 0) {
            errors.push("Content is required");
        }
        
        if (!post.author || post.author.trim().length === 0) {
            errors.push("Author is required");
        }
        
        return {
            isValid: errors.length === 0,
            errors
        };
    }
}