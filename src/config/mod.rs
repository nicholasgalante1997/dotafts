pub mod api;

pub mod dotaftswww_config {
    use core::fmt;
    use std::{error::Error, path::PathBuf};
    use glob::glob;

    const GET_APP_CONFIG_JSON_PATH_ERROR: &'static str = "GLOB FAILED TO PARSE JSON BLOB";

    #[derive(Debug)]
    struct GetJsonPathError;

    impl fmt::Display for GetJsonPathError {
        fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
            write!(f, "{GET_APP_CONFIG_JSON_PATH_ERROR}")
        }
    }

    impl Error for GetJsonPathError {
        fn description(&self) -> &str {
            &GET_APP_CONFIG_JSON_PATH_ERROR
        }
    }

    pub fn get_json_path() -> Result<PathBuf, Box<dyn Error>> {
        let app_config_json_path_matches: Vec<_> = glob("./data/app.json")?.collect();
        if app_config_json_path_matches.len() == 0 {
            return Err(Box::new(GetJsonPathError));
        }

        let f_match = app_config_json_path_matches.get(0);

        match f_match {
            Some(path_buf_result_ref) => {
                match path_buf_result_ref {
                    Ok(path_buf) => Ok(path_buf.clone()),
                    Err(glob_error) => {
                        eprintln!("{:#?}", glob_error);
                        Err(Box::new(GetJsonPathError))
                    }
                }
            },
            None => Err(Box::new(GetJsonPathError))
        }
    }
}