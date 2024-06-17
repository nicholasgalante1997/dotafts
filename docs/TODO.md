# Todos

## Rust Web Server Migration

1. Stood up Rust app crate ✅
2. Set up actix_web, actix_files basic web server ✅
3. Moved afts.web to ./dotafts-www ✅
4. Set up static directory serving ✅
5. Pulled out web-vitals (module code deferred consistently, also issues w preloading code being blocked by brave (weird), can retry later w vendor pattern) ✅
6. Set up html file routes
   1. Determine what static assets need to be served and how we want to match them
      1. JS comes from dotafts-www/dist
      2. CSS comes from dotafts-www/css
      3. Assets come from dotafts-www/assets
      4. Fonts come from dotafts-www/fonts
   2. Move AppConfig + Data up a directory to the rust project
   3. Set up a app/data.json route
   4. Set up an AppConfig struct
   5. Set up TemplateParser struct
      1. This will load the html layout/template shared across pages
      2. This will inject the content body into the template
      3. This will inject head tags + import map
         1. Set up Import Map Builder Struct
   6. Set up static index route (/, /index, /index.html)
   7. Set up static blog route (/blog/browse, /blog/browse.html)
   8. Set up dynamic blog route (/blogs/:id)

---

Notes 6/1 On Rust Migration.

Love rust. Love it so much every time.  

Todos

- Client Side JS Bundles are missing from the on-the-fly created markup in the html server handlers
- SEO Missing
- Analytics Missing

We're moving to React 6/12/2024

## Rust + React Web Server Migration!

Todos:

1. RS Remove old vanilla js app static routes
2. RS Remove old vanilla js dynamic routes
3. RS Clean up rust codebase
4. RS Serve API Routes
5. React Add Routes
   1. Auth
   2. Blog
      1. Dir
      2. Post
   3. Contact
6. 