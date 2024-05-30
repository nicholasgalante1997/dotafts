use std::error::Error;
use crate::models::dotafts_www_utils::htm_template_loader;
pub struct HTMLBuilder {
    template: String
}

impl HTMLBuilder {
    pub fn new() -> Result<Self, Box<dyn Error>> {
        let template = htm_template_loader::HTMLTemplateLoader::get_template()?;
        Ok(Self { template })
    }
}