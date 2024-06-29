import ExecEnv from './ExecEnv';

class Href {
  get BlogDirectoryPage() {
    return ExecEnv.NodeEnv === 'production' ? '/blog/directory.html' : '/blog/directory';
  }

  get BlogPageRootPage() {
    return `/blog/post${ExecEnv.NodeEnv === 'production' ? '.html' : ''}`;
  }

  get Home() {
    return ExecEnv.NodeEnv === 'production' ? '/index.html' : '/';
  }

  get Join() {
    return ExecEnv.NodeEnv === 'production' ? '/join.html' : '/join';
  }

}

export default new Href();
