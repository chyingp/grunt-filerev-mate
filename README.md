# grunt-filerev-mate

A grunt plugin run after grunt-filerev, which will replace image urls in css files with  reved ones.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

	npm install grunt-filerev-mate --save-dev

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

	grunt.loadNpmTasks('grunt-filerev-mate');

## The "grunt-filerev-mate" task

### Overview

Run the task with `grunt filerev_mate` command. Of course, you need to have `grunt-filerev` install and run as well. For example:

```
filerev: {
    dist: {
        options: {
            algorithm: 'sha1',
            length: 5
        },
        src: ['src/**/*.{png,jpg,jpeg,gif}']
    }
},
filerev_mate: {
    dist: {
        src: ['src/**/*.css']
    }
}
```

register default command

```
grunt.registerTask('default', ['filerev', 'filerev_mate']);
```

then run `grunt`, and you will see the result.

@TODO  DEMO


### Options

No options by now.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* None by now
