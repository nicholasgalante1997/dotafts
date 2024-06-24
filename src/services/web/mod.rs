use actix_files::{self as fs, };
use actix_web::{web, dev::{fn_service, ServiceRequest, ServiceResponse}};

pub fn configure_web_service(cfg: &mut web::ServiceConfig) {
    cfg.service(
        fs::Files::new("/", "./www/public")
        .use_last_modified(true)
        .use_etag(true)
        .prefer_utf8(true)
        .index_file("index.html")
        .default_handler(fn_service(|req: ServiceRequest| async {
            let (req, _) = req.into_parts();
            let file = fs::NamedFile::open_async("./www/public/404.html").await?;
            let res = file.into_response(&req);
            Ok(ServiceResponse::new(req, res))
        })),
    );
}
