use sqlx::postgres::PgPoolOptions;
use std::env;

use log::info;

pub async fn establish_connection() -> sqlx::Result<sqlx::PgPool> {
    info!("Setting DB Env variables...");
    dotenv::dotenv().ok();
    info!("DB Env vars set!");

    info!("Retrieving DB URL...");
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    info!("Database URL: {}", &database_url);

    info!("Creating connections pool...");

    let pool = PgPoolOptions::new()
        .max_connections(2)
        .connect(&database_url)
        .await?;

    info!("Created pool! Returning pool to calling scope...");

    Ok(pool)
}
