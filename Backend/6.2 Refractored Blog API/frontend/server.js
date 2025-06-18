import express from "express";
import bodyParser from "body-parser";

import { apiAdapter } from './adapters/apiAdapter.js';
import { requestHandler } from './handlers/requestHandler.js';

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";

const apiAdapter = new ApiAdapter(API_URL);
const requestHandler = new RequestHandler();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", async (req, res) => {
    const command = new GetAllPostsCommand(apiAdapter);
    await requestHandler.handleRequest(req, res, async () => {
        const result = await command.execute();
        if (result.success) {
            res.render("index.ejs", result.viewData);
            return { success: true };
        }
        return result;
    });
});

app.get("/new", (req, res) => {
    const viewData = ViewDataFactory.createPostFormView("New Post", "Create Post");
    res.render("modify.ejs", viewData);
});

app.get("/edit/:id", async (req, res) => {
    const command = new GetPostByIdCommand(apiAdapter, req.params.id);
    await requestHandler.handleRequest(req, res, async () => {
        const result = await command.execute();
        if (result.success) {
            res.render("modify.ejs", result.viewData);
            return { success: true };
        }
        return result;
    });
});

app.post("/api/posts", async (req, res) => {
    const command = new CreatePostCommand(apiAdapter, req.body);
    await requestHandler.handleRequest(req, res, () => command.execute());
});

app.post("/api/posts/:id", async (req, res) => {
    const command = new UpdatePostCommand(apiAdapter, req.params.id, req.body);
    await requestHandler.handleRequest(req, res, () => command.execute());
});

app.get("/api/posts/delete/:id", async (req, res) => {
    const command = new DeletePostCommand(apiAdapter, req.params.id);
    await requestHandler.handleRequest(req, res, () => command.execute());
});

app.use((req, res) => {
    res.status(404).render("error.ejs", ViewDataFactory.createErrorView("Page not found"));
});

app.use((error, req, res, next) => {
    console.error('Global error handler:', error);
    res.status(500).render("error.ejs", ViewDataFactory.createErrorView("Internal server error"));
});

app.listen(port, () => {
    console.log(`Frontend server is running on http://localhost:${port}`);
});

// for FUTURE testing
export { ApiAdapter, RequestHandler, ViewDataFactory };