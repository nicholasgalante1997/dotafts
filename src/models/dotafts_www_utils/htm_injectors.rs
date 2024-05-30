use super::injector_trait::MarkupInjector;

pub struct HTMLTemplateTitleTagInjector;

impl MarkupInjector for HTMLTemplateTitleTagInjector {
    fn inject(&self, markup: &mut String, injected: &str) -> () {
        let tag = "<!-- @xda-title -->";
        // https://users.rust-lang.org/t/modify-string-in-place/51305
        let markup_memv = std::mem::take(markup);
        *markup = markup_memv.replace(tag, injected);
    }
}

pub struct HTMLTemplateMetaTagInjector;

impl MarkupInjector for HTMLTemplateMetaTagInjector {
    fn inject(&self, markup: &mut String, injected: &str) -> () {
        let tag = "<!-- @xda-description -->";
        let markup_memv = std::mem::take(markup);
        *markup = markup_memv.replace(tag, injected);
    }
}

pub struct HTMLTemplateSEOInjector;

impl MarkupInjector for HTMLTemplateSEOInjector {
    fn inject(&self, markup: &mut String, injected: &str) -> () {
        let tag = "<!-- @xda-google-seo -->";
        let markup_memv = std::mem::take(markup);
        *markup = markup_memv.replace(tag, injected);
    }
}

pub struct HTMLTemplateCSSInjector;

impl MarkupInjector for HTMLTemplateCSSInjector {
    fn inject(&self, markup: &mut String, injected: &str) -> () {
        let tag = "<!-- @xda-css -->";
        let markup_memv = std::mem::take(markup);
        *markup = markup_memv.replace(tag, injected);
    }
}

pub struct HTMLTemplatePreloadScriptsInjector;

impl MarkupInjector for HTMLTemplatePreloadScriptsInjector {
    fn inject(&self, markup: &mut String, injected: &str) -> () {
        let tag = "<!-- @xda-preloaded-scripts -->";
        let markup_memv = std::mem::take(markup);
        *markup = markup_memv.replace(tag, injected);
    }
}

pub struct HTMLTemplateImportMapsScriptInjector;

impl MarkupInjector for HTMLTemplateImportMapsScriptInjector {
    fn inject(&self, markup: &mut String, injected: &str) -> () {
        let tag = "<!-- @xda-es6-import-map -->";
        let markup_memv = std::mem::take(markup);
        *markup = markup_memv.replace(tag, injected);
    }
}

pub struct HTMLTemplateJSAnalyticsScriptInjector;

impl MarkupInjector for HTMLTemplateJSAnalyticsScriptInjector {
    fn inject(&self, markup: &mut String, injected: &str) -> () {
        let tag = "<!-- @xda-analytics -->";
        let markup_memv = std::mem::take(markup);
        *markup = markup_memv.replace(tag, injected);
    }
}

pub struct HTMLTemplateContentInjectorPlus;
pub struct HTMLTemplateJSAppScriptInjector;
