use std::io::Read;
use std::path::Path;
use std::error::Error;
use std::fs::File;

pub struct HTMLTemplateLoader;

impl HTMLTemplateLoader {
    pub fn get_template() -> Result<String, Box<dyn Error>> {
        let mut t_file = File::open(Path::new("dotafts-www/html/Template.html"))?;
        let mut t_file_contents = String::new();
        t_file.read_to_string(&mut t_file_contents);
        Ok(t_file_contents)
    }
}