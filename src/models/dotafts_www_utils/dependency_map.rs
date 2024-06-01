pub mod js_dependency {
    use std::collections::HashMap;

    use crate::models::view::RegisteredView;

    /// ## Dependency Manager
    /// 
    /// Keeps track of where production dependencies in the browser are loaded from
    /// This is useful when we create page by page import maps
    /// 
    /// `registered_dependencies` takes the following shape where
    /// 
    /// ```
    ///     key = dependency name
    ///     value = (
    ///         0 = dependency name,
    ///         1 = dependency source url for prefetching
    ///         2 = dependency module url
    ///     )
    /// ```
    pub struct DependencyManager {
        registered_dependencies: HashMap<String, (String, String, String)>
    }

    impl DependencyManager {
        pub fn new () -> Self {
            let mut registered_dependencies = HashMap::new();

            registered_dependencies.insert(
                String::from("sleepydogs"),
                (
                    String::from("sleepydogs"),
                    String::from("https://www.unpkg.com/sleepydogs@1.0.7"),
                    String::from("https://www.unpkg.com/sleepydogs@1.0.7/dist/src/index.js")
                )
            );


            registered_dependencies.insert(
                String::from("lottie-web"), 
                (
                    String::from("lottie-web"),
                    String::from("https://cdn.jsdelivr.net/npm/lottie-web@5.12.2/+esm"),
                    String::from("https://cdn.jsdelivr.net/npm/lottie-web@5.12.2/+esm")
                )
            );

            Self {
                registered_dependencies
            }
        }

        pub fn get_preload_script_for_dependency(&self, dependency: &str) -> Option<String> {
            let registered_dep = self.registered_dependencies.get(dependency);
            let (_dep_name, dep_preload_url, _dep_esm_module_url) = registered_dep?;
            Some(format!(r#"<link rel="preload" crossorigin="anonymous" as="script" href="{}">"#, dep_preload_url))
        }

        pub fn get_all_preload_scripts_as_string(page: RegisteredView)-> Option<String> {
            let deps = match page {
                RegisteredView::Splash => vec!["sleepydogs", "lottie-web"],
                _ => vec![]
            };

            let mut preload_scripts_as_string = String::new();
            let dep_manager = Self::new();
            for dep in deps {
                let preload_script = dep_manager.get_preload_script_for_dependency(dep)?;
                preload_scripts_as_string.push_str(&preload_script);
                preload_scripts_as_string.push_str("\n");
            };

            Some(preload_scripts_as_string)
        }

        pub fn get_import_map_for_dependencies(&self, dependencies: Vec<&str>) -> Option<String> {
            let mut import_map_as_string = String::new();
            
            import_map_as_string.push_str(r#"
              <script type="importmap">
                {"imports":{
            "#);

            for dep in dependencies {
                let (dep_name, _dep_preload_url, dep_esm_url) = self.registered_dependencies.get(dep)?;
                import_map_as_string.push_str(&format!(r#""{}":"{}","#, dep_name, dep_esm_url));
            };

            import_map_as_string.pop()?;
            import_map_as_string.push_str("}}\n");
            import_map_as_string.push_str("</script>");

            Some(import_map_as_string)
        }
    }

}