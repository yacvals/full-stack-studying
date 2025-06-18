import http from "http";
import { PostService } from "./services/PostService.js";
import { InMemoryPostRepository } from "./repositories/InMemoryPostRepository.js";
import { BasicPostValidation, StrictPostValidation } from "./validation/index.js";
import { Logger } from "./utils/Logger.js";

const repository = new InMemoryPostRepository();
const postService = new PostService(repository, new BasicPostValidation());
postService.publisher.addObserver(Logger); // якщо є спостерігач

const server = http.createServer(async (req, res) => {
  const { url, method } = req;

  let body = "";
  req.on("data", chunk => body += chunk);
  await new Promise(r => req.on("end", r));

  try {
    if (method === "GET" && url === "/posts") {
      const result = postService.getAllPosts();
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(result));
    }

    const idMatch = url.match(/^\/posts\/(\d+)$/);
    if (method === "GET" && idMatch) {
      const result = postService.getPostById(+idMatch[1]);
      return res.writeHead(result.success ? 200 : 404, { "Content-Type": "application/json" }) && res.end(JSON.stringify(result));
    }

    if (method === "POST" && url === "/posts") {
      const data = JSON.parse(body);
      const result = postService.createPost(data);
      return res.writeHead(result.success ? 201 : result.statusCode, { "Content-Type": "application/json" }) && res.end(JSON.stringify(result));
    }

    if (method === "PATCH" && idMatch) {
      const data = JSON.parse(body);
      const result = postService.updatePost(+idMatch[1], data);
      return res.writeHead(result.success ? 200 : result.statusCode, { "Content-Type": "application/json" }) && res.end(JSON.stringify(result));
    }

    if (method === "DELETE" && idMatch) {
      const result = postService.deletePost(+idMatch[1]);
      return res.writeHead(result.success ? 200 : result.statusCode, { "Content-Type": "application/json" }) && res.end(JSON.stringify(result));
    }

    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ success: false, message: "Not Found" }));

  } catch (err) {
    console.error(err);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ success: false, message: "Internal Server Error" }));
  }
});

server.listen(4000, () => console.log("Backend running on http://localhost:4000"));