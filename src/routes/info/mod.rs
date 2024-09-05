use actix_files::NamedFile;
use actix_web::Responder;

use crate::config::api::info::ServiceInfo;

pub async fn get_service_info() -> impl Responder {
    ServiceInfo::new()
}

pub async fn get_app_config_json() -> actix_web::Result<NamedFile> {
    Ok(NamedFile::open("data/config.json")?)
}
