use std::error::Error;
use std::fs;
use std::path::{Path, PathBuf};

pub enum FileCategory {
    Fiction,
    Media,
    Tech,
}

pub fn get_all_files_in_category(category: FileCategory) -> Result<Vec<String>, Box<dyn Error>> {
    let base_path = "public/"; // Base path for files
    let category_path = match category {
        FileCategory::Fiction => "couch",
        FileCategory::Media => "tv",
        FileCategory::Tech => "tech",
    };

    let full_path = Path::new(base_path).join(category_path);
    let mut files = Vec::new();

    let entries = fs::read_dir(full_path)?;
    for entry in entries {
        let entry = entry?;
        let path = entry.path();
        if path.is_file() {
            handle_dir_ent_is_file(path, &mut files)
        } else if path.is_dir() {
            handle_dir_ent_is_dir(path, &mut files)?;
        }
    }

    Ok(files)
}

pub fn handle_dir_ent_is_dir(
    dir_ent: PathBuf,
    files: &mut Vec<String>,
) -> Result<(), Box<dyn Error>> {
    let sub_dir_ents = fs::read_dir(dir_ent)?;

    for dir_ent in sub_dir_ents {
        let ent = dir_ent?;
        let path = ent.path();
        if path.is_file() {
            handle_dir_ent_is_file(path, files);
        } else if path.is_dir() {
            let _ = handle_dir_ent_is_dir(path, files);
        }
    }

    Ok(())
}

pub fn handle_dir_ent_is_file(dir_ent: PathBuf, files: &mut Vec<String>) {
    files.push(dir_ent.to_string_lossy().into_owned());
}

// dir_ent.file_name().unwrap().to_string_lossy().into_owned()