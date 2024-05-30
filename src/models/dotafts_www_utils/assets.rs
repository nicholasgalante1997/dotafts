use std::path::PathBuf;
use crate::models::asset::StaticAsset;

pub fn get_asset_path(file: PathBuf, asset_type: StaticAsset) -> String {
    let mut dir_path_str = match asset_type {
        StaticAsset::CSS => String::from("dotafts-www/css/"),
        StaticAsset::FONT => String::from("dotafts-www/fonts/"),
        StaticAsset::HTML => String::from("dotafts-www/html.out/"),
        StaticAsset::JS => String::from("dotafts-www/dist/"),
        StaticAsset::MEDIA => String::from("dotafts-www/assets/")
    };
    dir_path_str.push_str(file.to_string_lossy().to_string().as_str());
    dir_path_str
}