import { LazySingleton, Attempt } from 'sleepydogs';

class AppConfig {
  /**
   * @private
   * @readonly
   */
  #url = '/data/app.json';

  /**
   * @private
   */
  #config;

  /**
   * @public
   * @returns {Promise<void>}
   */
  async bootConfig() {
    if (typeof this.config === 'object') return;

    const fetchAndSetConfig = async () => {
      const opts = { method: 'GET', mode: 'same-origin' };
      const response = await fetch(this.#url, opts);
      this.#config = await response.json();
    };

    const attemptConfig = {
      callback: fetchAndSetConfig,
      retries: 3,
      onError: console.error
    };

    return await new Attempt(attemptConfig).run();
  }

  /**
   * @readonly
   * */
  get config() {
    return this.#config;
  }

  findContentByKey(id) {
    if (this.#config) {
      const contentDirectory = this.#config?.content?.directory || [];
      return contentDirectory.find(
        (contentDirEnt) => contentDirEnt.key.toLowerCase() === id.toLowerCase()
      );
    }
    return null;
  }
}

const appConfigSingletonManager = LazySingleton(AppConfig);

export default appConfigSingletonManager.getInstance();
