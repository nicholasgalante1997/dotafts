use std::env;
use actix_web::{
    body::BoxBody, http::header::ContentType, HttpRequest, HttpResponse, Responder,
};
use dotenv::dotenv;
use serde_json;
use serde::Serialize;
use serde::Deserialize;

#[derive(Clone, Serialize, Deserialize)]
pub struct ServiceInfo {
    application_name: String,
    application_version: String,
    commit_hash: String,
    xsi_signature: String
}

impl ServiceInfo {
    pub fn new() -> Self {
        dotenv().ok();
        let missing_env_var_text = String::from("Unknown");
        Self {
            application_name: env::var("X_APPLICATION_NAME").unwrap_or(missing_env_var_text.clone()),
            application_version: env::var("X_APPLICATION_VERSION").unwrap_or(missing_env_var_text.clone()),
            commit_hash: env::var("X_APPLICATION_COMMIT_HASH").unwrap_or(missing_env_var_text.clone()),
            xsi_signature: env::var("X_APPLICATION_XSI_SIGNATURE").unwrap_or(missing_env_var_text.clone())
        }
    }
}

// Responder
impl Responder for ServiceInfo {
    type Body = BoxBody;

    fn respond_to(self, _req: &HttpRequest) -> HttpResponse<Self::Body> {
        let body = serde_json::to_string(&self).unwrap();

        // Create response and set content type
        HttpResponse::Ok()
            .content_type(ContentType::json())
            .body(body)
    }
}

// SECTION 
// see documentation:
// - https://actix.rs/docs/handlers 
// - https://docs.rs/crate/serde_json/latest
// - https://crates.io/crates/serde
// !SECTION