use std::{error::Error, fs::File, io::Read, path::Path};

use crate::models::view::RegisteredView;
use crate::util::strings;

use super::injector_trait::MarkupInjector;

pub struct HTMLTemplateTitleTagInjector;

impl MarkupInjector for HTMLTemplateTitleTagInjector {
    fn inject(markup: &mut String, injected: &str) -> () {
        let tag = "<!-- @xda-title -->";
        strings::swap_in_place(markup, tag, injected);
    }
}

pub struct HTMLTemplateMetaTagInjector;

impl MarkupInjector for HTMLTemplateMetaTagInjector {
    fn inject(markup: &mut String, injected: &str) -> () {
        let tag = "<!-- @xda-description -->";
        strings::swap_in_place(markup, tag, injected);
    }
}

pub struct HTMLTemplateSEOInjector;

impl MarkupInjector for HTMLTemplateSEOInjector {
    fn inject(markup: &mut String, injected: &str) -> () {
        let tag = "<!-- @xda-google-seo -->";
        strings::swap_in_place(markup, tag, injected);
    }
}

pub struct HTMLTemplateCSSInjector;

impl MarkupInjector for HTMLTemplateCSSInjector {
    fn inject(markup: &mut String, injected: &str) -> () {
        let tag = "<!-- @xda-css -->";
        strings::swap_in_place(markup, tag, injected);
    }
}

pub struct HTMLTemplatePreloadScriptsInjector;

impl MarkupInjector for HTMLTemplatePreloadScriptsInjector {
    fn inject(markup: &mut String, injected: &str) -> () {
        let tag = "<!-- @xda-preloaded-scripts -->";
        strings::swap_in_place(markup, tag, injected);
    }
}

pub struct HTMLTemplateImportMapsScriptInjector;

impl MarkupInjector for HTMLTemplateImportMapsScriptInjector {
    fn inject(markup: &mut String, injected: &str) -> () {
        let tag = "<!-- @xda-es6-import-map -->";
        strings::swap_in_place(markup, tag, injected);
    }
}

pub struct HTMLTemplateJSAnalyticsScriptInjector;

impl MarkupInjector for HTMLTemplateJSAnalyticsScriptInjector {
    fn inject(markup: &mut String, injected: &str) -> () {
        let tag = "<!-- @xda-analytics -->";
        strings::swap_in_place(markup, tag, injected);
    }
}

pub struct HTMLTemplateContentInjectorPlus;

impl HTMLTemplateContentInjectorPlus {
    pub fn render_page_to_markup(markup: &mut String, page: RegisteredView) -> Result<(), Box<dyn Error>> {
        match page {
            RegisteredView::Splash => {
                Self::render_splash_page_to_markup(markup)?;
            },
            _ => {}
        };

        Ok(())
    }

    pub fn add_header_to_markup(markup: &mut String) -> Result<(), Box<dyn Error>> {
        let header_tag_ph = "<!-- @xda-ui-header -->";
        let header_html_string = Self::get_html_chunk("dotafts-www/markup/Header.html")?;
        strings::swap_in_place(markup, &header_tag_ph, &header_html_string);
        Ok(())
    }

    pub fn add_footer_to_markup(markup: &mut String) -> Result<(), Box<dyn Error>> {
        let footer_tag_ph = "<!-- @xda-ui-footer -->";
        let footer_html_string = Self::get_html_chunk("dotafts-www/markup/Footer.html")?;
        strings::swap_in_place(markup, &footer_tag_ph, &footer_html_string);
        Ok(())
    }

    pub fn render_splash_page_to_markup(markup: &mut String) -> Result<(), Box<dyn Error>> {
        HTMLTemplateContentInjectorPlus::add_header_to_markup(markup)?;
        HTMLTemplateContentInjectorPlus::add_footer_to_markup(markup)?;

        let content_tag_ph = "<!-- @xda-ui-content -->";
        let splash_page_html_string = Self::get_html_chunk("dotafts-www/markup/SplashPage.html")?;
        strings::swap_in_place(markup, &content_tag_ph, &splash_page_html_string);

        Ok(())
    }

    pub fn get_html_chunk(html_chunk_path: &str) -> Result<String, Box<dyn Error>> {
        let mut html_chunk_file = File::open(Path::new(html_chunk_path))?;
        let mut html_chunk_string = String::new();
        html_chunk_file.read_to_string(&mut html_chunk_string)?;
        Ok(html_chunk_string)
    }

}
pub struct HTMLTemplateJSAppScriptInjector;
