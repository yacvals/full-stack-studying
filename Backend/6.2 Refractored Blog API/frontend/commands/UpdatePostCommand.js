import { Command } from './Command.js';

class UpdatePostCommand extends Command {
    constructor(apiAdapter, postId, postData) {
        super();
        this.apiAdapter = apiAdapter;
        this.postId = postId;
        this.postData = postData;
    }

    async execute() {
        const result = await this.apiAdapter.updatePost(this.postId, this.postData);
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
