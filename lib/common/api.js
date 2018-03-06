const express = require("express");
const bodyParser = require("body-parser");

export function createApi(middlewares, repository) {
  // Create an express API instance
  const api = express();
  api.use();

  // Apply additional middlewares on express API instance
  middlewares.forEach(m => {
    api.use(m);
  });

  // Create handler
  api.post("/api", async (req, res) => {
    const item = {
      userId: req.userId,
      content: req.body.content
    };

    const created = await repository.create(item);
    res.send(201, JSON.stringify(created));
  });

  // Get item handler
  api.get("/api/:id", async (req, res) => {
    const found = await repository.get(req.userId, req.params.id);

    if (found.Item) {
      res.send(200, JSON.stringify(found.Item));
    } else {
      res.send(404);
    }
  });

  // List handler
  api.get("/api", async (req, res) => {
    const result = await repository.list(req.userId);

    if (result.Items) {
      res.send(200, JSON.stringify(result.Items));
    } else {
      res.send(200);
    }
  });

  // Update handler
  api.put("/api/:id", async (req, res) => {
    const found = await repository.get(req.userId, req.params.id);

    if (!found.Item) {
      res.send(404);
      return;
    }

    const newData = {
      content: req.body.content
    };

    const updated = await repository.update(req.userId, req.params.id, newData);
    res.send(200, JSON.stringify(updated));
  });

  // Delete handler
  api.delete("/api/:id", async (req, res) => {
    const destroyed = await repository.destroy(req.userId, req.params.id);
    res.send(204, JSON.stringify(destroyed));
  });

  return api;
}
