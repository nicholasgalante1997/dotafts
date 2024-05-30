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