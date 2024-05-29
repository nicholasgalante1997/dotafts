use std::{fmt, error::Error, fs::File, io::Read};

use serde::{Deserialize, Serialize};

const APP_CONFIG_BUILD_ERROR_MSG: &'static str = "";

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
struct AppConfigContentDirItemJSON {
    pub key: String,
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