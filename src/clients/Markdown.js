import { Option, OptionCache } from 'sleepydogs';
import { marked } from 'marked';

const OPTION_CACHE = new OptionCache();

class MarkdownClient {
  /**
   * @private
   */
  #filepath;

  /**
   * @private
   */
  #markup = null;

  constructor(filepath) {
    this.#filepath = filepath;
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
    if (this.#markup) {
        const latchpoint = document.getElementById('blog-content-lp');
        latchpoint.innerHTML = this.#markup;
    }
  }
}

export default MarkdownClient;
