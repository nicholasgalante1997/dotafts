import { Option, OptionCache } from 'sleepydogs';
import { marked } from 'marked';
import eventRegistry from '../events/index.js';

const OPTION_CACHE = new OptionCache();

class MarkdownClient {
  /**
   * @private
   */
  #filepath;

  /**
   * @private
   */
  #content;

  /**
   * @private
   */
  #markup = null;

  constructor(contentData) {
    this.#filepath = contentData.content.filepath;
    this.#content = contentData.content;
  }

  async loadMarkdown() {
    if (this.#markup !== null) return;

    const callback = async () => {
      const fetchOptions = { method: 'GET', mode: 'same-origin' };
      const response = await fetch(this.#filepath, fetchOptions);
      const file = await response.text();
      const parsed = await marked.parse(file);
      const sanitized = DOMPurify.sanitize(parsed, { USE_PROFILES: { html: true }});
      return sanitized;
    };

    const optionConfig = {
      cache: {
        indexingKey: this.#filepath,
        optionCache: OPTION_CACHE,
        stale: 36000
      }
    };

    const dynamicMarkupOption = new Option(callback, optionConfig);

    const { data, state, error } = await dynamicMarkupOption.resolve();

    if (data == null || error || state === 'rejected') {
      error && console.error(error);
      throw new Error(error ?? 'MarkdownParsingFailed');
    }

    this.#markup = data;

    return data;
  }

  mountToDOMTree() {

    const img = document.querySelector("img.blog-image");
    if (img instanceof HTMLImageElement) {
      img.src = this.#content.metadata.image.src;
      img.alt = this.#content.metadata.image.alt;
      img.style.aspectRatio = this.#content.metadata.image.aspectRatio;
    }

    const title = document.querySelector('h1.blog-title');
    if (title instanceof HTMLHeadingElement) {
      title.innerText = this.#content.metadata.title;
    }

    const infoSpanShow = document.querySelector('span.blog-info-item.bii-show');
    const infoSpanSeason = document.querySelector('span.blog-info-item.bii-season');
    const infoSpanEp = document.querySelector('span.blog-info-item.bii-episode');

    if (infoSpanShow) {
      infoSpanShow.textContent = this.#content.metadata.source.show;
      if (this.#content.ui?.styleOverrides?.blogInfo?.show) {
        infoSpanShow.style = this.#content.ui.styleOverrides.blogInfo.show;
      }
    }

    if (this.#markup) {
        const latchpoint = document.getElementById('blog-content-lp');
        latchpoint.innerHTML = this.#markup;
    }

    const actions = this.#content.ui?.actions || [];
    for (const action of actions) {
      const el = document.querySelector(action.selector);
      const handler = eventRegistry.get(action.handlerRef);
      if (el && handler) {
        el.addEventListener(action.event, handler);
      }
    }
  }
}

export default MarkdownClient;
