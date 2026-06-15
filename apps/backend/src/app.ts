import { Elysia } from "elysia";
import { rateLimit } from "elysia-rate-limit";
import { FolderRepository } from "./modules/folder/infrastructure/folder.repository";
import { FolderService } from "./modules/folder/application/folder.service";
import { folderRoute } from "./modules/folder/presentation/folder.route";

const repository = new FolderRepository();
const service = new FolderService(repository);

export const app = new Elysia()
  .use(rateLimit({
    duration: 60000,
    max: 100,
    generator: (request) => request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip") ?? "unknown"
  }))
  .onRequest(({ set }) => {
    set.headers["Access-Control-Allow-Origin"] = "http://localhost:5173";
    set.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS";
    set.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization";
  })
  .use(folderRoute(service));
