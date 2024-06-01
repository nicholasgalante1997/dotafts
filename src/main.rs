use actix_files::{self as fs};
use actix_web::{middleware::{self,Logger}, web, App, HttpServer};
use env_logger::Env;

mod config;
mod models;
mod util;
mod routes;

use routes as AppRoutes;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init_from_env(Env::default().default_filter_or("info"));
    HttpServer::new(|| {
        App::new()
            // .wrap(Logger::default())
            .wrap(middleware::DefaultHeaders::new().add(("X-DA-API-Version", "0.1")))
            // .wrap(middleware::Compress::default())
            .route("/x/api/info", web::get().to(AppRoutes::get_service_info))
            .route("/x/app/data/app.json", web::get().to(AppRoutes::get_app_config_json))
            .service(
                fs::Files::new("/dist", "./dotafts-www/dist")
                  .use_last_modified(true)
                  .use_etag(true)
                  .prefer_utf8(true)
                  .show_files_listing()
            )
            .service(
                fs::Files::new("/css", "./dotafts-www/css")
                  .use_last_modified(true)
                  .use_etag(true)
                  .prefer_utf8(true)
                  .show_files_listing()
            )
            .service(
                fs::Files::new("/assets", "./dotafts-www/assets")
                  .use_last_modified(true)
                  .use_etag(true)
                  .show_files_listing()
            )
            .service(
                fs::Files::new("/fonts", "./dotafts-www/fonts")
                  .use_last_modified(true)
                  .use_etag(true)
                  .show_files_listing()
            )
            .route("/index.html", web::get().to(AppRoutes::get_splash_page))
            .route("/index", web::get().to(AppRoutes::get_splash_page))
            .route("/", web::get().to(AppRoutes::get_splash_page))
        })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
