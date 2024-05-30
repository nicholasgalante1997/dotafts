use std::fs::File;
use std::io::Read;
use std::error::Error;
use std::path::Path;
use pulldown_cmark;
use crate::models::dotafts_www_utils::errors::MarkdownLoaderFileLoadError;

#[derive(Debug)]
pub struct MarkdownLoader;

impl MarkdownLoader {
    pub fn load_file(&self, filepath: &str) -> Result<String, Box<dyn Error>> {
        let mut file = File::open(Path::new(filepath).to_path_buf())?;
        let mut contents = String::new();
        let b_written = file.read_to_string(&mut contents)?;
        if b_written == 0 {
            return Err(Box::new(MarkdownLoaderFileLoadError));
        }
        let parser = pulldown_cmark::Parser::new(&contents);
        let mut html_output = String::new();
        pulldown_cmark::html::push_html(&mut html_output, parser);
        Ok(html_output)
    }
}