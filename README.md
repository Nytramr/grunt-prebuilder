# grunt-prebuilder

> Grunt plugin that performs as a C precompiler does.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-prebuilder --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-prebuilder');
```

## The "prebuilder" task

### Overview
In your project's Gruntfile, add a section named `prebuilder` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  prebuilder: {
    options: {
      // Task-specific options go here.
      separator: '',
      definitions: {}
    },
    files: [
      // Target-specific file lists and/or options go here.
      {dest:'dist/scrips' src:['app/js/src/testing.js']}
    ]
  },
});
```

### Options

#### options.separator
Type: `String`
Default value: `'\n'`

A string to add after each directive.

#### options.definitions
Type: `Object`
Default value: `{}`

An Object as a dictionary with all the definition you want to take in account. Any other @define directive will be added to this dictionary.

### Prebuilder directives

#### @define
The `@define` directive is used to defining identifiers that can be used with `@ifdef` and `@ifndef` directives.
```js
//@define identifier [token]
```
Where the *identifier* is mandatory and will be associated with the *token* in a key/value dictionary.

#### @ifdef @ifndef @else @endif
The `@ifdef` and `@ifndef` directives are used to include or exclude a certain part of the code regarding to the existence of a defined identifier.

```js
//@ifndef identifier
    Some code
//@endif

//@ifdef identifier
    More Code
//@else
    Another Code
//@endif
```
If the *identifier* of the `@ifdef` was defined (or if it wasn't in the `@ifndef`case) earlier the followed code would be added, otherwise if a `@else` directive exists, that code will be added. Both directives can include an `@else` directive and they can be "nested" one inside another.

#### @include
The `@include` directive is used to add the content of a external file.
```js
//@include path_to_the_file
```
Where the *path_to_the_file* is the path to the file to be included inside the resulting processed file (I stronggly recommend to use relative paths).

### Usage Examples

#### Default Options
In this example, the `app/js/src/testing.js` file will be processed and its result will be placed in the `dist/script` folder.

```js
grunt.initConfig({
  prebuilder: {
    options: {},
    files: [
      {dest:'dist/scrips' src:['app/js/src/testing.js']}
    ]
  },
});
```

#### Custom Options
In this example, the `app/js/src/testing.js` file will be processed, using a predefined `debug` directive and using a space separator instead the default carrige return character between each directive. The resulting file will be placed in the `dist/script` folder.

```js
grunt.initConfig({
  prebuilder: {
    options: {
      separator: ' ',
      definitions: {
        debug: true
      },
    },
    files: [
      {dest:'dist/scrips' src:['app/js/src/testing.js']}
    ]
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* 2014-09-17    0.2.0    Changing the configuration object in order to stop using a deprecated files format
* 2014-09-01    0.1.0    Initial Release
