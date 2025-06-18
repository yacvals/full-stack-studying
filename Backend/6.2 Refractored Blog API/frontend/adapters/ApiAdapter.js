export class ApiAdapter {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(method, path, body) {
    const res = await fetch(this.baseURL + path, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined
    });
    const data = await res.json();
    return res.ok
      ? { success: true, data: data.data || data }
      : { success: false, error: data.message, validationErrors: data.errors, statusCode: res.status };
  }

  getAllPosts() { return this.request("GET", "/posts"); }
  getPostById(id) { return this.request("GET", `/posts/${id}`); }
  createPost(postData) { return this.request("POST", "/posts", postData); }
  updatePost(id, postData) { return this.request("PATCH", `/posts/${id}`, postData); }
  deletePost(id) { return this.request("DELETE", `/posts/${id}`); }
}
