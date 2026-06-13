export interface FileSystemItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size?: number;
  createdAt: Date;
  updatedAt: Date;
  path: string;
}

export interface Folder extends FileSystemItem {
  type: 'folder';
  children?: FileSystemItem[];
}

export interface File extends FileSystemItem {
  type: 'file';
  size: number;
  extension?: string;
}
