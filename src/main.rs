use actix_web::{
    middleware::{self, Logger},
    web::{self, ServiceConfig}
};

use shuttle_actix_web::ShuttleActixWeb;

mod config;
mod database;
mod routes;
mod services;

use database as Database;
use routes as AppRoutes;
use services as AppServices;

#[shuttle_runtime::main]
async fn main() -> ShuttleActixWeb<impl FnOnce(&mut ServiceConfig) + Send + Clone + 'static> {
    // env_logger::init_from_env(Env::default().default_filter_or("info"));
    let pool = Database::establish_connection()
        .await
        .expect("Failed to create DB Connection Pool. Closing application...");

    let config = move |cfg: &mut ServiceConfig| {
        cfg.app_data(web::Data::new(pool.clone()));
        cfg.service(
            web::scope("/api")
                .wrap(Logger::default())
                .wrap(middleware::DefaultHeaders::new().add(("X-Dotafts-Server-API-Version", "0.1")))
                .wrap(middleware::Compress::default())
                .configure(|scoped_cfg| 
                    AppServices::service_configurations::api::configure_api_service(scoped_cfg)
                )
        );
        cfg.service(
            web::scope("")
                .wrap(Logger::default())
                .wrap(middleware::DefaultHeaders::new().add(("X-Dotafts-Server-API-Version", "0.1")))
                .wrap(middleware::DefaultHeaders::new().add(("Cache-Control", "max-age=3600, public")))
                .wrap(middleware::Compress::default()) 
                .configure(|web_scoped_cfg| 
                    AppServices::service_configurations::web::configure_web_service(web_scoped_cfg)
                )
        );
    }; 

    Ok(config.into())
}
