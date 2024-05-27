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
    return new MarkdownClient(contentData.content.filepath);
}

function render(markdownClient) {
    markdownClient.mountToDOMTree();
}

async function app() {
    await loadAppConfig();
    
    const blogId = getBlogId();
    
    if (blogId === null) {
        // redirect("/404.html");
        return;
    }

    const cData = getContentDataFromCId(blogId);

    console.log(cData);
    
    if (cData == null) { // if data is null redirect
    //   redirect("/404.html");
      return
    }
        
    const markdownClient = createMarkdownClient(cData);
    await markdownClient.loadMarkdown();
    render(markdownClient);
}

await app();