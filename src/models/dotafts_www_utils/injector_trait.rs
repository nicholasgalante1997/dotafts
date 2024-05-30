pub trait MarkupInjector {
    fn inject(&self, markup: &mut String, injected: &str) -> ();
}