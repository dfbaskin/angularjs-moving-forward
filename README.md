# AngularJS Moving Forward

Presentation for CodeStock 2015.

## Prerequisites

- Running the Presentation
    - [NodeJS](https://nodejs.org/)
    - [JSPM](https://github.com/jspm/jspm-cli/wiki/Getting-Started)
- Running the Tests
    - [Protractor](http://www.protractortest.org/)

## Running this Presentation

```
npm install
jspm install
node server.js
```

Then navigate to `http://localhost:3000/`

## Running tests

Unit Tests using [Karma](http://karma-runner.github.io/0.12/intro/installation.html)

```
node_modules\.bin\karma start karma.conf.js
```

Integration Tests using [Protractor](http://www.protractortest.org/)

```
webdriver-manager start
node server.js
protractor protractor.conf.js
```

Performance Tests using [Benchpress](https://github.com/angular/angular/blob/master/modules/benchpress/README.js.md)
 
```
node server.js
protractor benchpress.conf.js
```

## Technical Details

This project uses the following libraries:

- [JSPM](http://jspm.io/) - For using ES6 and dynamically loading source.
- [Bespoke.js](https://github.com/markdalgleish/bespoke.js) - Presentation components.
- [Zurb Foundation](http://foundation.zurb.com/) - for styles.
- [libsass](http://libsass.org/) - for compiling SASS to CSS.
- [Express](http://expressjs.com/) - to run the presentation web application.
- [highlight.js](https://highlightjs.org/) - for code syntax highlighting.
- [Google Fonts](https://www.google.com/fonts) - for presentation fonts.
- [animate.css](https://daneden.github.io/animate.css/) - for presentation animations.
