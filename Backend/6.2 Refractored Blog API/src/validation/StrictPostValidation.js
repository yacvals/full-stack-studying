
import { PostValidationStrategy } from './PostValidationStrategy.js';

export class StrictPostValidation extends PostValidationStrategy {
    validate(post) {
        const errors = [];
        
        if (!post.title || post.title.trim().length < 5) {
            errors.push("Title must be at least 5 characters long");
        }
        
        if (!post.content || post.content.trim().length < 50) {
            errors.push("Content must be at least 50 characters long");
        }
        
        if (!post.author || post.author.trim().length < 2) {
            errors.push("Author name must be at least 2 characters long");
        }
        
        // Перевірка на заборонені слова :)
        const forbiddenWords = ['wtf', 'fake', 'scam'];
        const text = (post.title + ' ' + post.content).toLowerCase();
        const hasForbiddenWords = forbiddenWords.some(word => text.includes(word));
        
        if (hasForbiddenWords) {
            errors.push("Post contains forbidden words");
        }
        
        return {
            isValid: errors.length === 0,
            errors
        };
    }
}