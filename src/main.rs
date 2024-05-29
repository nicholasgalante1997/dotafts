use actix_files as fs;
use actix_web::{web, App, HttpServer, Responder};

mod service_info;
use service_info::ServiceInfo;

async fn service_info() -> impl Responder {
    ServiceInfo::new()
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .route("/x/app/info", web::get().to(service_info))
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
