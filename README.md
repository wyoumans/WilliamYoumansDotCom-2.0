# WilliamYoumans.com

Built with Node.JS, Pug (formerly Jade), Zurb Fundation, and Compass


## Getting Started

Get the local config variables from the developer (not in git for security)

Install Dependencies
```
bundle install
bower install
npm install
```

Populate the database
```
make populate
```

Compile the assets
```
make build
```

Start the server
```
make run
```

## Helpful Scripts

Empty the database
```
make empty
```

Seed the database or fetch latest last.fm and instagram data
```
make populate
```

Start the server
```
make run
```

Start the server (forever)
```
make run-forever
```

Compiles CSS
```
make compass
```

Compiles CSS and JS assets and minifies them for deployment
```
make build
```

Watch and compile css
```
compass watch
```

## License

[MIT License](http://wy.mit-license.org/)  Copyright © 2012-2016 William Youmans
