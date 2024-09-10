use actix_web::{
    middleware::{self, Logger},
    web::{self, ServiceConfig},
};
use shuttle_actix_web::ShuttleActixWeb;
use sqlx::PgPool;

mod config;
mod database;
mod models;
mod routes;
mod services;
mod util;

use routes as AppRoutes;
use services as AppServices;

#[shuttle_runtime::main]
async fn main(
    #[shuttle_shared_db::Postgres] pool: PgPool,
) -> ShuttleActixWeb<impl FnOnce(&mut ServiceConfig) + Send + Clone + 'static> {
    sqlx::migrate!()
        .run(&pool)
        .await
        .expect("Failed to run migrations");

    let config = move |cfg: &mut ServiceConfig| {
        cfg.app_data(web::Data::new(pool.clone()));
        cfg.service(
            web::scope("/api")
                .wrap(Logger::default())
                .wrap(
                    middleware::DefaultHeaders::new().add(("X-Dotafts-Server-API-Version", "0.1")),
                )
                .wrap(middleware::DefaultHeaders::new().add(("X-Dotafts-Markdown-Version", "0.1")))
                .wrap(middleware::Compress::default())
                .configure(|scoped_cfg| {
                    AppServices::service_configurations::api::configure_api_service(scoped_cfg)
                }),
        );
        cfg.service(
            web::scope("")
                .wrap(Logger::default())
                .wrap(
                    middleware::DefaultHeaders::new().add(("X-Dotafts-Server-API-Version", "0.1")),
                )
                .wrap(middleware::DefaultHeaders::new().add(("X-Dotafts-Markdown-Version", "0.1")))
                .wrap(middleware::Compress::default())
                .configure(|scoped_cfg| {
                    AppServices::service_configurations::file::configure_static_file_service(
                        scoped_cfg,
                    )
                }),
        );
    };

    Ok(config.into())
}
