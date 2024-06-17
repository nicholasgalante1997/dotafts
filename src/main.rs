use actix_files::{self as fs};
use actix_web::{
    dev::{fn_service, ServiceRequest, ServiceResponse},
    middleware::{self, Logger},
    web, App, HttpServer,
};
use env_logger::Env;

mod config;
mod routes;

use routes as AppRoutes;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init_from_env(Env::default().default_filter_or("info"));
    HttpServer::new(|| {
        App::new()
            .wrap(Logger::default())
            .wrap(middleware::DefaultHeaders::new().add(("X-Dotafts-Server-API-Version", "0.1")))
            .wrap(middleware::DefaultHeaders::new().add(("Cache-Control", "max-age=3600, public")))
            .wrap(middleware::Compress::default())
            .route("/api/service/info", web::get().to(AppRoutes::get_service_info))
            .route(
                "/api/app/config",
                web::get().to(AppRoutes::get_app_config_json),
            )
            .route(
                "/api/posts/all", 
                web::get().to(AppRoutes::get_all_posts_json)
            )
            .service(
                fs::Files::new("/", "./www/public")
                    .use_last_modified(true)
                    .use_etag(true)
                    .prefer_utf8(true)
                    .index_file("index.html")
                    .default_handler(fn_service(|req: ServiceRequest| async {
                        let (req, _) = req.into_parts();
                        let file = fs::NamedFile::open_async("./www/public/404.html").await?;
                        let res = file.into_response(&req);
                        Ok(ServiceResponse::new(req, res))
                    })),
            )
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
