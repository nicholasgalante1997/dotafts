import path from 'node:path';
import fs from 'node:fs';

export function getEntrypoints() {
    const clientScriptsDirRoot = path.resolve(process.cwd(), 'src', 'browser');
    const dirEnts = fs.readdirSync(clientScriptsDirRoot, { encoding: 'utf-8', withFileTypes: true });
    let entryObject = {};
    for (const dirEnt of dirEnts) {
      const { parentPath, name } = dirEnt;
      const [file,] = name.split('.');
      Object.assign(entryObject, { [file.toLowerCase()]: path.resolve(parentPath, name) });
    }
    return entryObject;
}