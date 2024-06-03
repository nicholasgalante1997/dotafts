use std::io::Read;
use std::path::PathBuf;
use std::error::Error;
use std::fs::{self,File};

pub struct HTMLTemplateLoader;

impl HTMLTemplateLoader {
    pub fn get_template() -> Result<String, Box<dyn Error>> {
        let template_file_path = PathBuf::from("./dotafts-www/public/htm/Template.html");
        let canonical_path = fs::canonicalize(&template_file_path)?;
        let mut t_file = File::open(canonical_path)?;
        let mut t_file_contents = String::new();
        t_file.read_to_string(&mut t_file_contents)?;
        Ok(t_file_contents)
    }
}