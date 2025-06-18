class ViewDataFactory {
    static createPostListView(posts, error = null) {
        return {
            posts: posts || [],
            error,
            hasError: !!error
        };
    }

    static createPostFormView(heading, submit, post = null, errors = []) {
        return {
            heading,
            submit,
            post,
            errors,
            hasErrors: errors.length > 0,
            isEdit: !!post
        };
    }

    static createErrorView(message) {
        return {
            error: message,
            hasError: true
        };
    }
}