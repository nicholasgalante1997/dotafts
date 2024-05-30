use actix_files::{self as fs, NamedFile};
use actix_web::{web, App, HttpServer, Responder};

mod models;
mod config;

use config::dotaftswww_config;
use config::api::info;

async fn service_info() -> impl Responder {
    info::ServiceInfo::new()
}

async fn app_config_json() -> actix_web::Result<NamedFile> {
    Ok(NamedFile::open(dotaftswww_config::get_json_path()?)?)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .route("/x/api/info", web::get().to(service_info))
            .route("/x/app/data/app.json", web::get().to(app_config_json))
            .service(
                fs::Files::new("/dist", "./dotafts-www/dist")
                  .use_last_modified(true)
                  .use_etag(true)
                  .prefer_utf8(true)
            )
            .service(
                fs::Files::new("/css", "./dotafts-www/css")
                  .use_last_modified(true)
                  .use_etag(true)
                  .prefer_utf8(true)
            )
            .service(
                fs::Files::new("/assets", "./dotafts-www/assets")
                  .use_last_modified(true)
                  .use_etag(true)
            )
            .service(
                fs::Files::new("/fonts", "./dotafts-www/fonts")
                  .use_last_modified(true)
                  .use_etag(true)
            )
        })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
