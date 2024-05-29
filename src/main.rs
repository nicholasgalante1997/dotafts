use actix_files::{self as fs, NamedFile};
use actix_web::{web, App, HttpServer, Responder};

mod service_info;
use service_info::ServiceInfo;

mod app_info;

mod file_x;
use file_x::FileX;

async fn service_info() -> impl Responder {
    ServiceInfo::new()
}

async fn app_config_json() -> actix_web::Result<NamedFile> {
    Ok(NamedFile::open(FileX::get_app_config_json_file_path_buf())?)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .route("/x/api/info", web::get().to(service_info))
            .route("/x/app/data/app.json", web::get().to(app_config_json))
            .service(
                fs::Files::new("/", "./dotafts-www")
                  .show_files_listing()
                  .use_last_modified(true)
                  .use_etag(true)
                  .prefer_utf8(true)
                  .index_file("./dotafts-www/index.html")
            )
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
