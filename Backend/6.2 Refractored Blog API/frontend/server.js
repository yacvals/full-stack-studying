import http from "http";
import fs from "fs/promises";
import path from "path";
import urlLib from "url";
import { fileURLToPath } from "url";
import querystring from "querystring";

import { ApiAdapter } from "./adapters/ApiAdapter.js";
import { ViewDataFactory } from "./factories/ViewDataFactory.js";
import {
  GetAllPostsCommand,
  GetPostByIdCommand,
  CreatePostCommand,
  UpdatePostCommand,
  DeletePostCommand
} from "./commands/index.js";
import { RequestHandler } from "./handlers/RequestHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, "public");
const viewsDir = path.join(__dirname, "views");

const adapter = new ApiAdapter("http://localhost:4000");
const handler = new RequestHandler();

function renderTemplate(filename, data = {}) {
  return fs.readFile(path.join(viewsDir, filename), "utf8").then(template => {
    return Object.entries(data).reduce((str, [key, value]) => {
      return str.replace(new RegExp(`<%=\\s*${key}\\s*>`, "g"), value ?? "");
    }, template);
  });
}

function serveStatic(req, res, pathname) {
  const filePath = path.join(publicDir, pathname);
  return fs.readFile(filePath).then(data => {
    res.writeHead(200);
    res.end(data);
  }).catch(() => false);
}

const server = http.createServer(async (req, res) => {
  const { pathname } = urlLib.parse(req.url);
  let body = "";
  req.on("data", chunk => body += chunk);
  await new Promise(resolve => req.on("end", resolve));
  const parsedBody = querystring.parse(body);

  if (pathname.startsWith("/public/")) {
    const served = await serveStatic(req, res, pathname.replace("/public", ""));
    if (!served) {
      res.writeHead(404);
      res.end("File not found");
    }
    return;
  }

  await handler.handleRequest(req, res, async () => {
    if (req.method === "GET" && pathname === "/") {
      const cmd = new GetAllPostsCommand(adapter);
      const result = await cmd.execute();
      const html = await renderTemplate("index.ejs", result.viewData);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(html);
      return { success: true };
    }

    if (req.method === "GET" && pathname === "/new") {
      const html = await renderTemplate("modify.ejs", ViewDataFactory.createPostFormView("New Post", "Create Post"));
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(html);
      return { success: true };
    }

    const editMatch = pathname.match(/^\/edit\/(\d+)$/);
    if (req.method === "GET" && editMatch) {
      const cmd = new GetPostByIdCommand(adapter, editMatch[1]);
      const result = await cmd.execute();
      if (result.success) {
        const html = await renderTemplate("modify.ejs", result.viewData);
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(html);
        return { success: true };
      }
      return result;
    }

    if (req.method === "POST" && pathname === "/api/posts") {
      const cmd = new CreatePostCommand(adapter, parsedBody);
      return await cmd.execute();
    }

    const updateMatch = pathname.match(/^\/api\/posts\/(\d+)$/);
    if (req.method === "POST" && updateMatch) {
      const cmd = new UpdatePostCommand(adapter, updateMatch[1], parsedBody);
      return await cmd.execute();
    }

    const deleteMatch = pathname.match(/^\/api\/posts\/delete\/(\d+)$/);
    if (req.method === "GET" && deleteMatch) {
      const cmd = new DeletePostCommand(adapter, deleteMatch[1]);
      return await cmd.execute();
    }

    return { success: false, statusCode: 404, error: "Not Found" };
  });
});

server.listen(3000, () => {
  console.log("Frontend running at http://localhost:3000");
});