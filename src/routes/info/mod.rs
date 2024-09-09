use actix_files::NamedFile;
use actix_web::{web, Responder};
use std::error::Error;

use crate::models::public;

use crate::config::api::info::ServiceInfo;
use crate::models::res::{
    FilesByCategoryError, FilesByCategoryHandlerQueryInfo, FilesByCategoryResponseBody,
};

pub async fn get_service_info() -> impl Responder {
    ServiceInfo::new()
}

pub async fn get_app_config_json() -> actix_web::Result<NamedFile> {
    Ok(NamedFile::open("data/config.json")?)
}

pub async fn get_all_files_in_category(
    query: web::Query<FilesByCategoryHandlerQueryInfo>,
) -> Result<impl Responder, Box<dyn Error>> {
    let category = query.category.clone();

    let mut category_enum_option: Option<public::FileCategory> = None;

    if category.to_lowercase() == String::from("fiction") {
        category_enum_option = Some(public::FileCategory::Fiction);
    } else if category.to_lowercase() == String::from("tech") {
        category_enum_option = Some(public::FileCategory::Tech);
    } else if category.to_lowercase() == String::from("media") {
        category_enum_option = Some(public::FileCategory::Media);
    }

    let res = match category_enum_option {
        Some(category_enum) => Ok(public::get_all_files_in_category(category_enum)?),
        None => Err(Box::new(FilesByCategoryError)),
    };

    let files = res?;

    Ok(FilesByCategoryResponseBody { data: files })
}
