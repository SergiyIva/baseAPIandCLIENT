import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import "dotenv/config";
import fs from "fs";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import depthLimit from "graphql-depth-limit";
import complexity from "graphql-validation-complexity";

import resolvers from "./resolvers/index.js";
interface ServerContext {
  //  models: Models;
  // user?: JwtPayload;
}
const host = process.env.HOST;
const port = process.env.PORT || 3000;
const typeDefs = fs.readFileSync("./src/typeDefs.graphql", "utf-8");
const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer<ServerContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  validationRules: [depthLimit(15), complexity.createComplexityLimitRule(1000)]
});

process.on("uncaughtException", async (err) => {
  console.error("НЕПЕРЕХВАЧЕННОЕ ИСКЛЮЧЕНИЕ\n", err.stack);
 // await db.close();
  process.exit(1);
});
await server.start();
app.use(
  "/graphql",
  cors<cors.CorsRequest>({
    origin: "*"
  }),
  bodyParser.json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token })
  })
);

app.get("/", (req, res) => {
  res.send("Hello from Apollo 4!!!");
});

await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
console.log(`🚀 Server ready at http://${host}:${port}/graphql`);
