use actix_files::NamedFile;
use actix_web::{http::header::ContentType,Error,HttpResponse,Responder};

use log::{info, trace, warn};

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

    info!("Received req for path '/'");
    warn!("Attempting to build html file...");

    let mut html_builder = HTMLBuilder::new()?;

    info!("Created html builder struct");

    let html = html_builder.build_static_page(RegisteredView::Splash)?;

    info!("Created html from splash page template.");
    info!("{html}");

    Ok(
        HttpResponse::Ok()
        .content_type(ContentType::html())
        .insert_header(("X-DA-Static-Asset-Version", "0.1"))
        .body(html)
    )
}
