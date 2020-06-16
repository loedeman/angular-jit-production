# AngularJitProduction

This project is a minimal reproduction for [Angular issue 37559](https://github.com/angular/angular/issues/37559). This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will show the dynamic template component.

## Production server

Run `ng serve --prod` for a production build on the dev server. Navigate to `http://localhost:4200/`. The app will result in a console error (see below) and the dynamic template component won't show.

```
main.516b126b455584fc78f8.js:1 ERROR Error: Angular JIT compilation failed: '@angular/compiler' not loaded!
  - JIT compilation is discouraged for production use-cases! Consider AOT mode instead.
  - Did you bootstrap using '@angular/platform-browser-dynamic' or '@angular/platform-server'?
  - Alternatively provide the compiler with 'import "@angular/compiler";' before bootstrapping.
    at Te (main.516b126b455584fc78f8.js:1)
    at Function.get (main.516b126b455584fc78f8.js:1)
    at Ot (main.516b126b455584fc78f8.js:1)
    at new Eh (main.516b126b455584fc78f8.js:1)
    at af (main.516b126b455584fc78f8.js:1)
    at uf (main.516b126b455584fc78f8.js:1)
    at e.df [as compileModuleAndAllComponentsAsync] (main.516b126b455584fc78f8.js:1)
    at e.ngOnChanges (main.516b126b455584fc78f8.js:1)
    at e.Dc.e.type.ngOnChanges.e.onChanges (main.516b126b455584fc78f8.js:1)
    at Fn (main.516b126b455584fc78f8.js:1)
```
