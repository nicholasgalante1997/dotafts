use std::mem;

pub fn swap_in_place(source: &mut String, pattern: &str, new: &str) {
    let temp = mem::take(source);
    *source = temp.replace(pattern, new);
}