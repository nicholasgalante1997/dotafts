use actix_files::NamedFile;
use actix_web::http::header::{CacheControl, CacheDirective};
use actix_web::{web, HttpRequest};
use actix_web::{http::header::ContentType,Error,HttpResponse,Responder};

use crate::config::api::info::ServiceInfo;
use crate::config::dotaftswww_config::{self as DotaftsWWWConfig};
use crate::models::dotafts_www_utils::htm_builder::HTMLBuilder;
use crate::models::view::RegisteredView;

pub async fn get_service_info() -> impl Responder {
    ServiceInfo::new()
}

pub async fn get_app_config_json() -> actix_web::Result<NamedFile> {
    Ok(NamedFile::open(DotaftsWWWConfig::get_json_path()?)?)
}

pub async fn get_splash_page() -> Result<HttpResponse, Error> {
    let mut html_builder = HTMLBuilder::new()?;
    let html = html_builder.build_static_page(RegisteredView::Splash)?;
    Ok(
        HttpResponse::Ok()
        .content_type(ContentType::html())
        .insert_header(("X-DA-Static-Asset-Version", "0.1"))
        .insert_header(CacheControl(vec![CacheDirective::NoCache]))
        .body(html)
    )
}

pub async fn get_blog_page(req: HttpRequest) -> Result<HttpResponse, Error> {
    let id = req.match_info().get("id").unwrap();
    let mut html_builder = HTMLBuilder::new()?;
    let html = html_builder.build_static_page(RegisteredView::Blog)?;

    Ok(
        HttpResponse::Ok()
         .content_type(ContentType::html())
         .insert_header(("X-DA-Static-Asset-Version", "0.1"))
         .insert_header(CacheControl(vec![CacheDirective::NoCache]))
         .body(html)
    )
}