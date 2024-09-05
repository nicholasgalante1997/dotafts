use actix_files::{self as fs};
use actix_web::{web, HttpResponse, dev::{fn_service, ServiceRequest, ServiceResponse}};

use log::error;

pub fn configure_static_file_service(cfg: &mut web::ServiceConfig) {
    cfg.service(
        fs::Files::new("", "./public")
        .use_last_modified(true)
        .use_etag(true)
        .prefer_utf8(true)
        .mime_override(move |_| {
            "text/markdown".into()
        })
        .default_handler(fn_service(|req: ServiceRequest| async {
            error!("File not found!");
            let (req, _) = req.into_parts();
            let res = HttpResponse::InternalServerError().finish();
            Ok(ServiceResponse::new(req, res))
        })),
    );
}
