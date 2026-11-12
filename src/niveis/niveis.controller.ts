import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fs from "fs/promises";
import path from "path";

export default function niveisController(fastify: FastifyInstance) {
  const niveisJsonPath = path.join(__dirname, "../../data/json", "niveis.json");

  fastify.get("/nivel_atual", async () => {
    const niveisJsonString = await fs.readFile(niveisJsonPath, "utf-8");
    const niveisJson = JSON.parse(niveisJsonString);
    // console.log(niveisJson.nivelAtual);

    return niveisJson.nivelAtual;
  });

  fastify.patch(
    "/nivel_atual",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const req = request.body as { novoNivel: number };

      if (!req.novoNivel) {
        throw new Error("'novoNivel' param is missing");
      }

      if (typeof req.novoNivel != "number") {
        throw new Error("'novoNivel' param is not a number");
      }

      const niveisJsonAtualizado = { nivelAtual: req.novoNivel };
      const niveisJsonAtualizadoString = JSON.stringify(niveisJsonAtualizado);
      const res = await fs.writeFile(
        niveisJsonPath,
        niveisJsonAtualizadoString,
      );

      return "Sucessfully changed nivelAtual to " + req.novoNivel;
    },
  );
}
