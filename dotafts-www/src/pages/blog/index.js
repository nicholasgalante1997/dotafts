/**
 * @xng
 *
 * Scripting Entrypoint for Blog ("/blog/:id") Page Route
 */

/**
 * Put all client side JS that needs to run on the Splash Page here
 */

import { Log } from 'sleepydogs';

import appConfig from '../../clients/AppConfig.js';
import MarkdownClient from '../../clients/Markdown.js';
import QueryParamParser from '../../clients/Query.js';
import redirect from '../../lib/redirect.js';

async function loadAppConfig() {
  await appConfig.bootConfig();
}

function getBlogId() {
  return new QueryParamParser().getParam('cidr');
}

function getContentDataFromCId(blogId) {
  if (blogId === null) return null;
  return appConfig.findContentByKey(blogId);
}

function createMarkdownClient(contentData) {
  return new MarkdownClient(contentData);
}

function render(markdownClient) {
  markdownClient.mountToDOMTree();
}

async function app() {
  await loadAppConfig();

  const blogId = getBlogId();

  if (blogId === null) {
    redirect('/404.html');
    return;
  }

  const cData = getContentDataFromCId(blogId);

  if (cData == null) {
    redirect('/404.html');
    return;
  }

  const markdownClient = createMarkdownClient(cData);
  await markdownClient.loadMarkdown();
  render(markdownClient);
}

Log.factory({ level: 'info', service: 'x-dotafts-blog-ui', version: '1.0' }).info('App Started.');
await app();
