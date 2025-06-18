export class ResponseFactory {
    static createSuccessResponse(data, message = "Success") {
        return {
            success: true,
            message,
            data,
            timestamp: new Date().toISOString()
        };
    }

    static createErrorResponse(message, statusCode = 500, errors = []) {
        return {
            success: false,
            message,
            statusCode,
            errors,
            timestamp: new Date().toISOString()
        };
    }

    static createNotFoundResponse(resource = "Resource") {
        return this.createErrorResponse(`${resource} not found`, 404);
    }

    static createValidationErrorResponse(errors) {
        return this.createErrorResponse("Validation failed", 400, errors);
    }
}