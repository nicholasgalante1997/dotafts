import { PagesConfigArray as pages } from '@/config';
import PageRegister from '@/pages/Register';
import { StaticRenderer as StaticPageBuilder } from '@/server/lib/models/React';

async function createStaticMarkup() {
  const promises = [];
  for (const page of pages) {
    const Component = PageRegister.get(page.ref as any);
    if (!Component) {
      throw new Error('UnknownPageException');
    }

    const config = {
      Component,
      outpath: page.out,
      clientJs: page.scripts,
      clobber: true
    };

    promises.push(new StaticPageBuilder(config).writeToFile());
  }

  await Promise.all(promises)
    .then(() => console.log('Wrote static html output'))
    .catch((e) => {
      console.error(e);
      throw e;
    });
}

export default createStaticMarkup;
