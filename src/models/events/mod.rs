use serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct CreateEvent {
    pub event_type: String,
    pub event_data: Value,
}

#[derive(Clone, Debug, Serialize, Deserialize, sqlx::FromRow)]
pub struct Event {
    event_id: i32,
    event_type: String,
    event_data: Value,
}
