import { Command } from './Command.js';

class CreatePostCommand extends Command {
    constructor(apiAdapter, postData) {
        super();
        this.apiAdapter = apiAdapter;
        this.postData = postData;
    }

    async execute() {
        const result = await this.apiAdapter.createPost(this.postData);
        if (result.success) {
            return {
                success: true,
                redirect: "/"
            };
        } else {
            return {
                success: false,
                error: result.error,
                validationErrors: result.validationErrors
            };
        }
    }
}