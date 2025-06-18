import { Command } from './Command.js';

class GetPostByIdCommand extends Command {
    constructor(apiAdapter, postId) {
        super();
        this.apiAdapter = apiAdapter;
        this.postId = postId;
    }

    async execute() {
        const result = await this.apiAdapter.getPostById(this.postId);
        if (result.success) {
            return {
                success: true,
                viewData: ViewDataFactory.createPostFormView(
                    "Edit Post",
                    "Update Post",
                    result.data
                )
            };
        } else {
            return {
                success: false,
                error: result.error,
                statusCode: result.statusCode
            };
        }
    }
}