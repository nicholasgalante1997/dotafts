pub trait MarkupInjector {
    fn inject(markup: &mut String, injected: &str) -> ();
}