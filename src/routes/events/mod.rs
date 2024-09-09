use actix_web::{web, HttpResponse};
use log::{error, info};
use serde_json::json;
use sqlx::{PgPool, Row};

use crate::models::events::CreateEvent;

pub async fn post_event(event: web::Json<CreateEvent>, pool: web::Data<PgPool>) -> HttpResponse {
    let res = sqlx::query(
        r#"
        INSERT INTO events (event_type, event_data)
        VALUES ($1, $2)
        RETURNING *
        "#,
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
        }
        Err(e) => {
            error!("{e}");
            HttpResponse::InternalServerError().json(json!({ "error": "DbWriteFail" }))
        }
    }
}
