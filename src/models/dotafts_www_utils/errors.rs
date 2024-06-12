use std::fmt;
use std::error::Error;

#[derive(Debug)]
pub struct MarkdownLoaderFileLoadError;

const MD_LOAD_ERROR_MESSAGE: &'static str = "Failed to load markdown file.";

impl fmt::Display for MarkdownLoaderFileLoadError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{MD_LOAD_ERROR_MESSAGE}")
    }
}

impl Error for MarkdownLoaderFileLoadError {
    fn description(&self) -> &str {
        &MD_LOAD_ERROR_MESSAGE
    }
}

#[derive(Debug)]
pub struct HTMLBlogPageMissingBlogIdException;

const HTML_BLOG_MISSING_ID_MESSAGE: &'static str = "[HTMLBuilder::build_static_page()] blog_id resolved to None. This indicates you might have forgotten to set a blog id for a runtime chunk page.";

impl fmt::Display for HTMLBlogPageMissingBlogIdException {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{HTML_BLOG_MISSING_ID_MESSAGE}")
    }
}

impl Error for HTMLBlogPageMissingBlogIdException {
    fn description(&self) -> &str {
        &HTML_BLOG_MISSING_ID_MESSAGE
    }
}

#[derive(Debug)]
pub struct HTMLBlogPageMissingBlogJSONException;

const HTML_BLOG_MISSING_JSON_MESSAGE: &'static str = "[HTMLBuilder::build_static_page()] blog_json resolved to None.";

impl fmt::Display for HTMLBlogPageMissingBlogJSONException {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{HTML_BLOG_MISSING_JSON_MESSAGE}")
    }
}

impl Error for HTMLBlogPageMissingBlogJSONException {
    fn description(&self) -> &str {
        &HTML_BLOG_MISSING_JSON_MESSAGE
    }
}