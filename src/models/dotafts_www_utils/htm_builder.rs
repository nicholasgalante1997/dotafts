use std::error::Error;
use std::fmt;
use std::path::PathBuf;

use crate::app_info::AppConfig;

use crate::models::dotafts_www_utils::dependency_map::js_dependency::DependencyManager;
use crate::models::dotafts_www_utils::htm_template_loader;
use crate::models::view::RegisteredView;

use crate::models::dotafts_www_utils::htm_injectors::*;

use super::injector_trait::MarkupInjector;
use super::markdown_loader::MarkdownLoader;

use super::errors::{HTMLBlogPageMissingBlogIdException,HTMLBlogPageMissingBlogJSONException};

pub struct HTMLBuilder {
    template: String,
    blog_id: Option<String>
}

impl HTMLBuilder {
    pub fn new() -> Result<Self, Box<dyn Error>> {
        let template = htm_template_loader::HTMLTemplateLoader::get_template()?;
        Ok(
            Self { 
                template,
                blog_id: None
            }
        )
    }

    pub fn set_blog_id(&mut self, id: &str) -> &mut Self {
        self.blog_id = Some(String::from(id));
        self
    }

    pub fn build_static_page(&mut self, page: RegisteredView) -> Result<String, Box<dyn Error>> {
        match page {
            RegisteredView::Splash => {
                self.build_splash_page()
            },
            RegisteredView::Blog => {
                self.build_blog_page()
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

        let import_map_option = DependencyManager::new().get_import_map_for_dependencies(vec!["sleepydogs", "lottie-web", "gsap"]);
        
        let import_map = match import_map_option {
            Some(i_m) => i_m,
            None => String::new()
        };

        HTMLTemplateImportMapsScriptInjector::inject(
            &mut self.template,
            &import_map
        );

        HTMLTemplateContentInjectorPlus::render_page_to_markup(&mut self.template, RegisteredView::Splash)?;

        HTMLTemplateJSAppScriptInjector::inject(
            &mut self.template, 
            &HTMLTemplateJSAppScriptInjector::get_scripts_for_page_as_string(RegisteredView::Splash)
        );
    
        Ok(self.template.clone())
    }

    pub fn build_blog_page(&mut self) -> Result<String, Box<dyn Error>> {
        let id = match self.blog_id {
            Some(id) => id,
            None => return Err(Box::new(HTMLBlogPageMissingBlogIdException))
        };

        let stripped_id = &id.replace("DA-", "");
        let mut path_to_markdown = PathBuf::from(".daa");
        path_to_markdown.push(stripped_id);

        let abs_path = path_to_markdown.canonicalize()?;
        let mut md = MarkdownLoader::load_file(&abs_path.into_os_string().to_string_lossy().to_string())?;

        let app_config = AppConfig::new()?;
        let blog_json_option = app_config.get_content_data(id);
        let blog_json = match blog_json_option {
            Some(json) => json,
            None => return Err(Box::new(HTMLBlogPageMissingBlogJSONException))
        };

        let blog_title = match blog_json["data"]["ui"]["core"]["title"] {
            serde_json::Value::String(title) => title,
            _ => String::from("")
        };

        HTMLTemplateTitleTagInjector::inject(&mut self.template, &format!("<title>Dotafter Blog {}</title>", blog_title));
        HTMLTemplateMetaTagInjector::inject(&mut self.template, r#"<meta name="description" content="A hub for content." />"#);
        HTMLTemplateCSSInjector::inject(
            &mut self.template, 
            r#"
                <link rel="preload" as="style" href="/css/blog.css" />
                <link rel="stylesheet" href="/css/blog.css" type="text/css" />
            "#
        );

        let preload_scripts_option = DependencyManager::get_all_preload_scripts_as_string(RegisteredView::Blog);

        let preload_scripts = match preload_scripts_option {
            Some(p_s) => p_s,
            None => String::new()
        };

        HTMLTemplatePreloadScriptsInjector::inject(
            &mut self.template, 
            &preload_scripts
        );

        let import_map_option = DependencyManager::new().get_import_map_for_dependencies(vec!["sleepydogs"]);
        
        let import_map = match import_map_option {
            Some(i_m) => i_m,
            None => String::new()
        };

        HTMLTemplateImportMapsScriptInjector::inject(
            &mut self.template,
            &import_map
        );

        HTMLTemplateContentInjectorPlus::render_page_to_markup(&mut self.template, RegisteredView::Blog)?;

        // HTMLTemplateJSAppScriptInjector::inject(
        //     &mut self.template, 
        //     &HTMLTemplateJSAppScriptInjector::get_scripts_for_page_as_string(RegisteredView::Splash)
        // );
    
        // Ok(self.template.clone())
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