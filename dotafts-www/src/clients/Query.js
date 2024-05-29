class QueryParamParser {
  constructor() {
    const search = window.location.search;
    this.params = new window.URLSearchParams(search);
  }

  getParamsAsString() {
    return this.params.toString();
  }

  getAllParamsByKey(key) {
    return this.params.getAll(key);
  }

  getParam(key) {
    return this.params.get(key);
  }
}

export default QueryParamParser;
