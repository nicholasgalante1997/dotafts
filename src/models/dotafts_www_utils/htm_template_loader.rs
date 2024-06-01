use std::io::Read;
use std::path::{Path, PathBuf};
use std::error::Error;
use std::fs::{self,File};

use log::{info, trace, warn};

pub struct HTMLTemplateLoader;

impl HTMLTemplateLoader {
    pub fn get_template() -> Result<String, Box<dyn Error>> {

        let template_file_path = PathBuf::from("./dotafts-www/markup/Template.html");
        let canonical_path = fs::canonicalize(&template_file_path)?;

        info!("Canonical Path is {:?}", canonical_path);

        info!("HTMLTemplateLoader:::get_template() invoked");
        let mut t_file = File::open(canonical_path)?;
        info!("t_file is {:#?}", t_file);
        let mut t_file_contents = String::new();
        info!("t_file_contents is {t_file_contents}");
        t_file.read_to_string(&mut t_file_contents)?;
        info!("t_file_contents is {t_file_contents}");
        Ok(t_file_contents)
    }
}