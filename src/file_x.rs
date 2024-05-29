use std::path::{Path, PathBuf};

use glob::glob;

const GET_APP_CONFIG_JSON_PATH_ERROR: &'static str = "GLOB FAILED TO PARSE JSON BLOB";

pub struct FileX;

impl FileX {
    pub fn get_app_config_json_file_path_buf() -> PathBuf {
        let default_path_buf = Path::new("data/app.json").to_owned();
        let app_config_json_path_matches_result = glob("./data/app.json");
        match app_config_json_path_matches_result {
            Ok(mut path_bufs) => {
                let path_buf_option = path_bufs.next();
                match path_buf_option {
                    Some(path_result) => {
                        match path_result {
                            Ok(path_buf) => path_buf,
                            Err(err) => {
                                eprintln!("{GET_APP_CONFIG_JSON_PATH_ERROR}");
                                eprintln!("{:#?}", err);
                                default_path_buf
                            }
                        }
                    },
                    None => {
                        eprintln!("{GET_APP_CONFIG_JSON_PATH_ERROR}");
                        default_path_buf
                    }
                }
            }
            Err(err) => {
                eprintln!("{GET_APP_CONFIG_JSON_PATH_ERROR}");
                default_path_buf
            }
        }
    }
}