import PageRegister from '@/pages/Register';
import StaticPageBuilder from './lib/StaticRender';

async function createStaticMarkup() {
  const pages = [
    {
      ref: '@dotafts/home' as const,
      out: 'public/index.html',
      scripts: ['/dist/js/home.bundle.js']
    }
  ];

  const promises = [];
  for (const page of pages) {
    const Component = PageRegister.get(page.ref);
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

await createStaticMarkup();
