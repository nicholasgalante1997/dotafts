use actix_files::NamedFile;
use actix_web::{self, web, HttpResponse, Responder};
use log::{error, info};
use serde_json::json;
use sqlx::{Row,PgPool};

use crate::config::api::info::ServiceInfo;
use crate::models::structs::events::CreateEvent;

pub async fn get_service_info() -> impl Responder {
    ServiceInfo::new()
}

pub async fn get_app_config_json() -> actix_web::Result<NamedFile> {
    Ok(NamedFile::open("data/app.json")?)
}

pub async fn get_all_posts_json() -> actix_web::Result<NamedFile> {
    Ok(NamedFile::open("data/posts/all.json")?)
}

pub async fn post_event(event: web::Json<CreateEvent>, pool: web::Data<PgPool>) -> HttpResponse {
    let res = sqlx::query(
        r#"
        INSERT INTO events (event_type, event_data)
        VALUES ($1, $2)
        RETURNING *
        "#
    )
    .bind(&event.event_type)
    .bind(&event.event_data)
    .fetch_one(&**pool)
    .await;

    match res {
        Ok(row) => {
            let event_id: i32 = row.get("event_id");
            info!("Wrote event {event_id} to db");
        
            HttpResponse::Ok().finish()
        },
        Err(e) => {
            error!("{e}");
            HttpResponse::InternalServerError().json(json!({ "error": "DbWriteFail" }))
        }
    }
}