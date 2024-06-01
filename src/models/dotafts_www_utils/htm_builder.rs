use std::error::Error;
use std::fmt;

use crate::models::dotafts_www_utils::dependency_map::js_dependency::DependencyManager;
use crate::models::dotafts_www_utils::htm_template_loader;
use crate::models::view::RegisteredView;

use crate::models::dotafts_www_utils::htm_injectors::*;

use super::injector_trait::MarkupInjector;

pub struct HTMLBuilder {
    template: String,
}

impl HTMLBuilder {
    pub fn new() -> Result<Self, Box<dyn Error>> {
        let template = htm_template_loader::HTMLTemplateLoader::get_template()?;
        Ok(Self { template })
    }

    pub fn build_static_page(&mut self, page: RegisteredView) -> Result<String, Box<dyn Error>> {
        match page {
            RegisteredView::Splash => {
                self.build_splash_page()
            },
            _ => {
                Err(Box::new(StaticPageBuildError))
            }
        }
    }

    pub fn build_splash_page(&mut self) -> Result<String, Box<dyn Error>> {
        HTMLTemplateTitleTagInjector::inject(&mut self.template, "<title>Dotaftr Content - Home</title>");
        HTMLTemplateMetaTagInjector::inject(&mut self.template, r#"<meta name="description" content="A hub for content." />"#);
        HTMLTemplateCSSInjector::inject(
            &mut self.template, 
            r#"
                <link rel="preload" as="style" href="/css/splash.css" />
                <link rel="stylesheet" href="/css/splash.css" type="text/css" />
            "#
        );

        let preload_scripts_option = DependencyManager::get_all_preload_scripts_as_string(RegisteredView::Splash);

        let preload_scripts = match preload_scripts_option {
            Some(p_s) => p_s,
            None => String::new()
        };

        HTMLTemplatePreloadScriptsInjector::inject(
            &mut self.template, 
            &preload_scripts
        );

        let import_map_option = DependencyManager::new().get_import_map_for_dependencies(vec!["sleepydogs", "lottie-web"]);
        
        let import_map = match import_map_option {
            Some(i_m) => i_m,
            None => String::new()
        };

        HTMLTemplateImportMapsScriptInjector::inject(
            &mut self.template,
            &import_map
        );

        HTMLTemplateContentInjectorPlus::render_page_to_markup(&mut self.template, RegisteredView::Splash)?;
    
        Ok(self.template.clone())
    }
}

const STATIC_PAGE_BUILD_ERROR_MSG: &'static str = "";

#[derive(Debug)]
struct StaticPageBuildError;

impl fmt::Display for StaticPageBuildError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}", &STATIC_PAGE_BUILD_ERROR_MSG)
    }
}

impl Error for StaticPageBuildError {
    fn description(&self) -> &str {
        &STATIC_PAGE_BUILD_ERROR_MSG
    }
}