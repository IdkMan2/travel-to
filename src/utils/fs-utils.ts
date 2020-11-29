import fs from 'fs';

export function mkdir(dirPath: string) {
  return new Promise<string>((resolve, reject) => {
    fs.mkdir(dirPath, {}, (err: NodeJS.ErrnoException | null, path?: string) => {
      if (err) reject(err);
      else resolve(path);
    });
  });
}
