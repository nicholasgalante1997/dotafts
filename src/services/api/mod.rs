use crate::AppRoutes;
use actix_web::{web, HttpResponse};

pub fn configure_api_service(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::resource("/service/info")
            .route(web::get().to(AppRoutes::info::get_service_info))
            .route(web::post().to(HttpResponse::MethodNotAllowed))
            .route(web::put().to(HttpResponse::MethodNotAllowed))
            .route(web::patch().to(HttpResponse::MethodNotAllowed))
            .route(web::delete().to(HttpResponse::MethodNotAllowed)),
    );
    cfg.service(
        web::resource("/app/config")
            .route(web::get().to(AppRoutes::info::get_app_config_json))
            .route(web::post().to(HttpResponse::MethodNotAllowed))
            .route(web::put().to(HttpResponse::MethodNotAllowed))
            .route(web::patch().to(HttpResponse::MethodNotAllowed))
            .route(web::delete().to(HttpResponse::MethodNotAllowed)),
    );
    cfg.service(
        web::resource("/events/write")
            .route(web::post().to(AppRoutes::events::post_event))
            .route(web::get().to(HttpResponse::MethodNotAllowed))
            .route(web::put().to(HttpResponse::MethodNotAllowed))
            .route(web::patch().to(HttpResponse::MethodNotAllowed))
            .route(web::delete().to(HttpResponse::MethodNotAllowed)),
    );
    cfg.service(
        web::resource("/files/category")
            .route(web::get().to(AppRoutes::info::get_all_files_in_category))
            .route(web::post().to(HttpResponse::MethodNotAllowed))
            .route(web::put().to(HttpResponse::MethodNotAllowed))
            .route(web::patch().to(HttpResponse::MethodNotAllowed))
            .route(web::delete().to(HttpResponse::MethodNotAllowed)),
    );
}
