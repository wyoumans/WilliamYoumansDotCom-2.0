# WilliamYoumans.com 2.0

## Built with gumby

Make sure you have `claymate` and `bower` installed globally from NPM

## Build

```
claymate build --addons bower_components/gumby-parallax/gumby.parallax.js,scripts/custom.js --modules retina,fixed,navbar
```

## Helpful Scripts

Fetch latest last.fm and instagram data
```
make update
```

Start the server
```
make run
```

Compiles JS
```
make browserify
```

Compiles CSS
```
make compass
```

Compiles CSS and JS assets and minifies them for deployment
```
make build
```
