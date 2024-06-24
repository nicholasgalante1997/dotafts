use crate::AppRoutes;
use actix_web::{web, HttpResponse};

pub fn configure_api_service(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::resource("/service/info")
            .route(web::get().to(AppRoutes::get_service_info))
            .route(web::post().to(HttpResponse::MethodNotAllowed))
            .route(web::put().to(HttpResponse::MethodNotAllowed))
            .route(web::patch().to(HttpResponse::MethodNotAllowed))
            .route(web::delete().to(HttpResponse::MethodNotAllowed)),
    );
    cfg.service(
        web::resource("/app/config")
            .route(web::get().to(AppRoutes::get_app_config_json))
            .route(web::post().to(HttpResponse::MethodNotAllowed))
            .route(web::put().to(HttpResponse::MethodNotAllowed))
            .route(web::patch().to(HttpResponse::MethodNotAllowed))
            .route(web::delete().to(HttpResponse::MethodNotAllowed)),
    );
    cfg.service(
        web::resource("/posts/all")
        .route(web::get().to(AppRoutes::get_all_posts_json))
        .route(web::post().to(HttpResponse::MethodNotAllowed))
        .route(web::put().to(HttpResponse::MethodNotAllowed))
        .route(web::patch().to(HttpResponse::MethodNotAllowed))
        .route(web::delete().to(HttpResponse::MethodNotAllowed)),
    );
}
