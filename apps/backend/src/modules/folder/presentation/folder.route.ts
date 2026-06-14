import { Elysia, t } from "elysia";
import { FolderService } from "../application/folder.service";
import { HttpError } from "../../../shared/errors/http.error";

export function folderRoute(service: FolderService) {
  return new Elysia({ prefix: "/api/v1/folders" })
    .onError(({ error, set }) => {
      if (error instanceof HttpError) {
        set.status = error.statusCode;
        return { error: error.message };
      }
    })
    .get("/", () => service.getTree())
    .get("/search", ({ query }) => service.search(query.q), {
      query: t.Object({ q: t.String() }),
    })
    .get("/:id/children", ({ params }) => service.getChildren(params.id));
}
