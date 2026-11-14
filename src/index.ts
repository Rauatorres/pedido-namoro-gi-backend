import Fastify from "fastify";
import niveisController from "./niveis/niveis.controller";
import cors from "@fastify/cors";

const port = 3000;

const fastify = Fastify({
  logger: true,
});

fastify.register(cors, {
  origin: ["*"],
});

fastify.get("/", () => {
  // console.log(__dirname + "");
  return { msg: "testando" };
});

fastify.register(niveisController);

fastify.listen({ port: port }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log("Server listening on " + `http://localhost:` + port);
});
