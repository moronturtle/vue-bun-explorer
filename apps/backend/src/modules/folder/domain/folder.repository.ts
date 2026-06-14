import type { FolderNode, FolderChildren } from "./folder.entity";

export interface IFolderRepository {
  findAll(): Promise<FolderNode[]>;
  findChildren(folderId: string): Promise<FolderChildren>;
  search(query: string): Promise<FolderNode[]>;
}
