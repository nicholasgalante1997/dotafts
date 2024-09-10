use std::error::Error;
use std::fmt::Display;

use crate::util::res::convert_to_json_body;
use actix_web::body::BoxBody;
use actix_web::{HttpResponse, Responder};
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Clone)]
pub struct FilesByCategoryHandlerQueryInfo {
    pub category: String,
}

#[derive(Deserialize, Serialize)]
pub struct FilesByCategoryResponseBody {
    pub data: Vec<String>,
}

impl Responder for FilesByCategoryResponseBody {
    type Body = BoxBody;
    fn respond_to(self, _req: &actix_web::HttpRequest) -> HttpResponse<Self::Body> {
        convert_to_json_body(&self)
    }
}

#[derive(Debug)]
pub struct FilesByCategoryError;

impl Display for FilesByCategoryError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "[GET] FILES by CATEGORY threw an error.")
    }
}

impl Error for FilesByCategoryError {}
