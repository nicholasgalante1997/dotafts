import { minify } from 'terser';
import { glob } from 'glob';

import { Option, Log, Timer } from 'sleepydogs';

import path from 'node:path';
import { readFile } from 'node:fs/promises';
import { existsSync, mkdirSync, rmSync } from 'node:fs';
import { Attempt } from 'sleepydogs';

const OUT = path.resolve(process.cwd(), 'dist');

const daml = Log.factory({
  level: 'info',
  service: 'xng-dotaftr',
  version: '1.0.0'
});

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
  return `********************************************************************************
            source-path: "${source}" 
            generated on "${new Intl.DateTimeFormat('en-US', intlOptions).format(new Date())}"
        ********************************************************************************\n`;
}

function exitOnError(e) {
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
    minCodeArr.push(await minifyJs(jsObj));
  }

}

await build();
