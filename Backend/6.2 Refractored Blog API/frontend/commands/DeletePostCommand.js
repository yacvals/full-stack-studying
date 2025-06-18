import { Command } from './Command.js';

class DeletePostCommand extends Command {
    constructor(apiAdapter, postId) {
        super();
        this.apiAdapter = apiAdapter;
        this.postId = postId;
    }

    async execute() {
        const result = await this.apiAdapter.deletePost(this.postId);
        if (result.success) {
            return {
                success: true,
                redirect: "/"
            };
        } else {
            return {
                success: false,
                error: result.error
            };
        }
    }
}
