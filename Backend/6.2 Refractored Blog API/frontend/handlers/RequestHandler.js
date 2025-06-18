class RequestHandler {
    async handleRequest(req, res, operation) {
        try {
            const result = await operation();
            if (result.success) {
                return this.handleSuccess(res, result);
            } else {
                return this.handleError(res, result);
            }
        } catch (error) {
            return this.handleUnexpectedError(res, error);
        }
    }

    handleSuccess(res, result) {
        if (result.redirect) {
            return res.redirect(result.redirect);
        }
        return res.json(result);
    }

    handleError(res, result) {
        const statusCode = result.statusCode || 500;
        return res.status(statusCode).json({
            message: result.error,
            errors: result.validationErrors
        });
    }

    handleUnexpectedError(res, error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}
