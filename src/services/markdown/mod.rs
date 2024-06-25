use actix_files::{self as fs, };
use actix_web::{web, HttpResponse, dev::{fn_service, ServiceRequest, ServiceResponse}};

pub fn configure_static_markdown_service(cfg: &mut web::ServiceConfig) {
    cfg.service(
        fs::Files::new("", "./markdown")
        .use_last_modified(true)
        .use_etag(true)
        .prefer_utf8(true)
        .mime_override(move |_| {
            "text/markdown".into()
        })
        .default_handler(fn_service(|req: ServiceRequest| async {
            let (req, _) = req.into_parts();
            let res = HttpResponse::InternalServerError().finish();
            Ok(ServiceResponse::new(req, res))
        })),
    );
}
