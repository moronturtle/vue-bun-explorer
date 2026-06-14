export interface FolderFile {
  id: string;
  name: string;
  size: number;
  mimeType: string;
  folderId: string;
  createdAt: Date;
}

export interface FolderNode {
  id: string;
  name: string;
  parentId: string | null;
  createdAt: Date;
  children?: FolderNode[];
}

export interface FolderChildren {
  folders: FolderNode[];
  files: FolderFile[];
}
