pub mod api;
pub mod markdown;
pub mod web;

pub mod service_configurations {
    pub use crate::services::api;
    pub use crate::services::markdown;
    pub use crate::services::web;
}
