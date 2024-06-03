import { existsSync, mkdirSync, rmSync, rmdirSync } from 'node:fs';
import { resolve as pathResolve} from 'node:path';
import { promisify } from 'node:util';

import { glob } from 'glob'
import ncp from 'ncp';
import { Log } from 'sleepydogs';

let outpath = pathResolve(process.cwd(), 'dist', 'vendor');
let ncpa = promisify(ncp.ncp);

makeDistVendorDir();

let promises =  [];

for (const file of await glob("src/vendor/**/*.js")) {
    promises.push(ncpa(file, toOutfilePath(file), { clobber: true }));
}

await Promise.all(promises)
    .then(logCopied)
    .catch(exitOnError);

/**
 * @param {string} file 
 * @returns {string}
 */
function toOutfilePath(file) {
    return file.replace('src', 'dist');
}

function makeDistVendorDir() {
    if (existsSync(outpath)) {
        rmSync(outpath)
    }
    mkdirSync(outpath, { recursive: true });
}

function logCopied() {
    Log.factory({ service: 'xrs-www-vendor-copy', version: '1.0' }).info('Copied src/vendor to dist/vendor');
}

function exitOnError() {
    rmdirSync(outpath, { maxRetries: 3 });
}