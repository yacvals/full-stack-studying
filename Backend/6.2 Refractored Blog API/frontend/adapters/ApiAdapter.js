import axios from "axios";

class ApiAdapter {
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.client = axios.create({
            baseURL: this.baseURL,
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    async getAllPosts() {
        try {
            const response = await this.client.get('/posts');
            return {
                success: true,
                data: response.data.data || response.data // Підтримка обох форматів
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    async getPostById(id) {
        try {
            const response = await this.client.get(`/posts/${id}`);
            return {
                success: true,
                data: response.data.data || response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                statusCode: error.response?.status
            };
        }
    }

    async createPost(postData) {
        try {
            const response = await this.client.post('/posts', postData);
            return {
                success: true,
                data: response.data.data || response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || error.message,
                validationErrors: error.response?.data?.errors || []
            };
        }
    }

    async updatePost(id, postData) {
        try {
            const response = await this.client.patch(`/posts/${id}`, postData);
            return {
                success: true,
                data: response.data.data || response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || error.message,
                validationErrors: error.response?.data?.errors || []
            };
        }
    }

    async deletePost(id) {
        try {
            await this.client.delete(`/posts/${id}`);
            return {
                success: true
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || error.message
            };
        }
    }
}