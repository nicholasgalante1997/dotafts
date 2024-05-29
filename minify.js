import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync, mkdirSync, rmSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { glob } from 'glob';
import { Attempt, Option, Log, Timer } from 'sleepydogs';
import { minify } from 'terser';

const OUT = path.resolve(process.cwd(), 'dist');

const daml = Log.factory({
  level: 'info',
  service: 'xng-dotaftr',
  version: '1.0.0'
});

/**
 * Asynchronously writes the param `code` to the provided `minPath`
 * @param {string} minPath 
 * @param {string} code 
 */
async function writeMinJsFile(minPath, code) {
  const writeAttempt = new Attempt({
    callback: async () => await writeFile(minPath, code, { encoding: "utf8" }),
    onError: exitOnError,
    retries: 5
  });
  await writeAttempt.run();
}

/**
 * Creates a file's root (immediate parent) directory using the provided sourcePath.
 * @param {string} sourcePath 
 */
async function createParentDirectory(sourcePath) {
  const delimiter = getOS() === 'win32' ? '\\' : '/';
  const dirPath = sourcePath.split(delimiter).slice(0, -1).join(delimiter);
  await mkdir(dirPath, { recursive: true });
}

/**
 * Creates a minPath from a sourcePath
 * @param {string} sourcePath
 * @param {boolean} sourceMap 
 */
function getMinPath(sourcePath, sourceMap = false) {
  const delimiter = getOS() === 'win32' ? '\\' : '/';
  const splitPath = sourcePath.split(delimiter);
  const srcIndex = splitPath.indexOf("src");

  if (srcIndex === -1) {
    daml.error("FileNotSrcException");
    daml.error(path);
    exitOnError();
  }

  const localPathArr = splitPath.slice(srcIndex + 1);
  const filename = localPathArr[localPathArr.length - 1];

  const minFileName = filename.repeat(1).replace('.js', sourceMap ? '.map.json' : '.js');
  localPathArr[localPathArr.length - 1] = minFileName;

  return path.resolve(OUT, ...localPathArr);
}

/**
 * @returns {NodeJS.Platform}
 */
function getOS() {
  return os.platform();
}

/**
 * Uses `glob` to get all js files in src
 * @returns string[]
 */
async function getAllJsFilePaths() {
  const globOption = new Option(
    async () => await glob('src/**/*.js', { ignore: /node_modules|([\d\w])*\.min\.js/g }),
    { retries: 5 }
  );
  const { data, error } = await globOption.resolve();
  if (data == null || error) {
    exitOnError(error);
  }
  return data.map((relPath) => path.resolve(process.cwd(), relPath)) || [];
}

async function getAllJsCodeObjects() {
  const jsCodeObjects = [];
  const jsFiles = await getAllJsFilePaths();
  for (const filepath of jsFiles) {
    const code = await readFile(filepath, { encoding: 'utf8' });
    jsCodeObjects.push({
      source: filepath,
      code
    });
  }
  return jsCodeObjects;
}

async function minifyJs(js) {
  const minifyOption = new Option(
    async () =>
      await minify(js.code, {
        ecma: 2020,
        keep_classnames: true,
        keep_fnames: true,
        module: true,
        format: {
          preamble: getPreamble(js.source)
        },
        sourceMap: true
      }),
    { retries: 5 }
  );

  const { data, error } = await minifyOption.resolve();

  if (data == null || error) {
    exitOnError(error);
  }

  return data;
}

function getPreamble(source) {
  let intlOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
    timeZone: 'America/Denver'
  };
  return (
    `/* ********************************************************************************
  * source-path: "${source}" 
  * source-map: "${getMinPath(source, true)}"
  * generated on "${new Intl.DateTimeFormat('en-US', intlOptions).format(new Date())}"
  ******************************************************************************** */\n`
  );
}

function exitOnError(e = null) {
  daml.error(e);
  cleanDist();
  process.exit(1);
}

function cleanDist() {
  if (existsSync(OUT)) {
    new Attempt({
      callback: () => rmSync(OUT, { force: true, recursive: true }),
      immediate: true,
      retries: 5
    });
  }
}

function makeDist() {
  if (existsSync(OUT)) {
    cleanDist();
  }

  mkdirSync(OUT, { recursive: true });
}

async function build() {
  const timer = new Timer();
  timer.start();

  daml.log('Starting build process.....');

  makeDist();

  const sourceCode = await getAllJsCodeObjects();

  let minCodeArr = [];

  for (let jsObj of sourceCode) {
    const minJs = await minifyJs(jsObj);
    minCodeArr.push({ source: jsObj.source, ...minJs });
  }

  for (const { source, code, map } of minCodeArr) {
    const minCodePath = getMinPath(source);
    const minSourceMapPath = getMinPath(source, true);
    await createParentDirectory(minCodePath);
    await Promise.all([writeMinJsFile(minCodePath, code), writeMinJsFile(minSourceMapPath, map)]);
  }

  timer.stop();
  daml.log('Done.')
  daml.log(`Run took ${timer.elapsed()}ms`);
}

await build();