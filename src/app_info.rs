use std::{fmt, error::Error, fs::File, io::Read};

use log::{warn, error};

use serde::{Deserialize, Serialize};
use serde_json::Value;

const APP_CONFIG_BUILD_ERROR_MSG: &'static str = "Failed to create an AppConfig instance.";

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct AppConfigBuildError {
    pub message: &'static str
}

impl AppConfigBuildError {
    pub fn new() -> Self {
        Self {
            message: APP_CONFIG_BUILD_ERROR_MSG,
        }
    }
}

impl fmt::Display for AppConfigBuildError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{APP_CONFIG_BUILD_ERROR_MSG}")
    }
}

impl Error for AppConfigBuildError {
    fn description(&self) -> &str {
        &self.message
    }
}

#[derive(Clone, Debug, Deserialize, Serialize)]
struct BlogConfigItemSourceFile {
    file: Vec<String>
}

#[derive(Clone, Debug, Deserialize, Serialize)]
struct BlogConfigItem {
    _key: String,
    _source: BlogConfigItemSourceFile,

}

#[derive(Clone, Debug, Deserialize, Serialize)]
struct AppConfigContentDirItemJSON {
    pub key: String,
    pub ref_data: String
}

#[derive(Clone, Debug, Deserialize, Serialize)]
struct AppConfigContentJSON {
    _type: String,
    _id: String,
    pub directory: Vec<AppConfigContentDirItemJSON>
}

#[derive(Clone, Debug, Deserialize, Serialize)]
struct AppConfigJson {
    pub version: String,
    pub content: AppConfigContentJSON
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct AppConfig {
    config: AppConfigJson
}

impl AppConfig {
    pub fn new() -> Result<AppConfig, Box<dyn Error>> {
        let mut file = File::open("data/app.json")?;
        let mut contents = String::new();
        let written_b = file.read_to_string(&mut contents)?;
        if written_b > 0 {
            let config: AppConfig = serde_json::from_str(&contents)?;
            return Ok(config)
        }
        Err(Box::new(AppConfigBuildError::new()))
    }
}

impl AppConfig {
    pub fn get_content_data(& self, key: String) -> Option<Value> {
        let clone = self.clone();
        let dir_iter = clone.config.content.directory.iter();
        let matches: Vec<_> = dir_iter.filter(|x| x.key == key).collect();
        if matches.len() < 1 {
            None
        } else {
            let first = matches.get(0)?;
            let blog_json_path = first.ref_data.clone();
            let mut base_path = String::from("data/blogs/");
            base_path.push_str(&blog_json_path);
            let mut file = match File::open(&base_path) {
                Ok(file) => file,
                Err(e) => {
                    warn!("Warning! Missing blog json at file path {}", base_path);
                    error!("Cannot create dynamic blog page.");
                    error!("{}", e);
                    return None;
                }
            };

            let mut json_as_string = String::new();
            let written_bytes = file.read_to_string(&mut json_as_string);
            match written_bytes {
                Ok(bytes) => {
                    if bytes > 0 {
                        let json_result = serde_json::from_str(&json_as_string);
                        match json_result {
                            Ok(json) => {
                                Some(json)
                            },
                            Err(e) => {
                                warn!("Failed to parse JSON from buffered file");
                                error!("Cannot create dynamic blog page.");
                                error!("{}", e);
                                return None;
                            }
                        }
                    } else {
                        warn!("Failed to write JSON from buffered file");
                        error!("Cannot create dynamic blog page.");
                        None
                    }
                },
                Err(e) => {
                    warn!("Failed to write JSON from buffered file");
                    error!("Cannot create dynamic blog page.");
                    error!("{}", e);
                    None
                }
            }
        }
    }
}