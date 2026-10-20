import type { IFolderRepository } from "../domain/folder.repository";
import type { FolderNode, FolderChildren } from "../domain/folder.entity";
import { HttpError } from "../../../shared/errors/http.error";

export class FolderService {
  constructor(private readonly repository: IFolderRepository) { }

  async getTree(): Promise<FolderNode[]> {
    const b = await this.repository.findAll();
    console.log('bonney kumay', JSON.stringify(b, null, 2))
    return this.repository.findAll();
  }
  async getChildren(folderId: string): Promise<FolderChildren> {
    if (!folderId) throw new HttpError(400, "Folder ID is required");
    return this.repository.findChildren(folderId);
  }

  async search(query: string): Promise<FolderNode[]> {
    if (!query || query.trim().length === 0) {
      throw new HttpError(400, "Search query is required");
    }
    return this.repository.search(query.trim());
  }
}
