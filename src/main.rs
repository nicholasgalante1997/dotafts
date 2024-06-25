use actix_web::{
    middleware::{self, Logger},
    web, App, HttpServer,
};

use env_logger::Env;

mod config;
mod database;
mod routes;
mod services;

use database as Database;
use routes as AppRoutes;
use services as AppServices;

// Creating an Actix Web Tcp Server
//
// The move keyword is necessary here because the HttpServer::new method expects a closure,
// and this closure captures the pool variable from its surrounding scope.
//
// Closures and Capturing
// Rust closures can capture variables from their environment in three ways:
//
// 1. By reference (&T): Borrowing the variable.
// 2. By mutable reference (&mut T): Borrowing the variable mutably.
// 3. By value (T): Taking ownership of the variable.
//
// The move keyword forces the closure to take ownership of the variables it captures,
// instead of borrowing them. This is important in this context for a few reasons:
//
// Lifetime and Ownership:
//
// - The pool variable is created in the main function.
// - The HttpServer::new method takes a closure that will be executed when the server is running.
// - If the closure only borrowed pool by reference, there would be a lifetime issue
//      because pool would go out of scope at the end of the main function.
//      Rust would not allow this as it would result in a dangling reference.
//
// Concurrency:
//
// - Actix Web and many other async frameworks in Rust are highly concurrent.
// - The closure you pass to HttpServer::new needs to be 'static,
//      meaning it must be valid for the entire duration of the program.
//      This ensures that the closure can be safely sent to different threads.
// - By moving pool into the closure, you ensure that pool is owned by the closure
//       and lives as long as the server does.

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init_from_env(Env::default().default_filter_or("info"));
    let pool = Database::establish_connection()
        .await
        .expect("Failed to create DB Connection Pool. Closing application...");

    HttpServer::new(move || {
        App::new()
            .wrap(Logger::default())
            .wrap(middleware::DefaultHeaders::new().add(("X-Dotafts-Server-API-Version", "0.1")))
            .wrap(middleware::DefaultHeaders::new().add(("Cache-Control", "max-age=3600, public")))
            .wrap(middleware::Compress::default())
            .app_data(web::Data::new(pool.clone()))
            .service(web::scope("/api").configure(|cfg| {
                AppServices::service_configurations::api::configure_api_service(cfg)
            }))
            .configure(|cfg| AppServices::service_configurations::web::configure_web_service(cfg))
    })
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}
