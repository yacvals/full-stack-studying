import { Command } from './Command.js';

class GetAllPostsCommand extends Command {
    constructor(apiAdapter) {
        super();
        this.apiAdapter = apiAdapter;
    }

    async execute() {
        const result = await this.apiAdapter.getAllPosts();
        if (result.success) {
            return {
                success: true,
                viewData: ViewDataFactory.createPostListView(result.data)
            };
        } else {
            return {
                success: true, // Все ж таки показуємо сторінку
                viewData: ViewDataFactory.createPostListView([], result.error)
            };
        }
    }
}
