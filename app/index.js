var generator = require('yeoman-generator');
var yosay = require('yosay');
var path= require('path');

module.exports  = generator.Base.extend({
  constructor: function() {
    generator.Base.apply(this, arguments);

    this.option('skip-welcome-message', {
      desc: 'skip the welcome message',
      type: Boolean
    });
  },

  prompting: function() {
    var done = this.async();
    if (!this.options['skip-welcome-message']) {
      this.log(yosay('Your tiny (html/css/javascript*) boilerplate.'));
    }

    var prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: path.basename(this.destinationPath()),
      },
      {
        type: 'input',
        name: 'title',
        message: 'Your Web page title',
        default: this.appname,
      },
      {
        type: 'input',
        name: 'version',
        message: 'Your project version',
        default: '1.0.0',
      }
    ];

    this.prompt(prompts).then(
      function(answers) {
        this.projectName = answers.name;
        this.projectTitle = answers.title;
        done();
      }.bind(this));
  },

  writing: {
    packageJSON: function() {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'), {
          'name': this.projectName
        }
      );
    },

    postCcss: function() {
      this.fs.copyTpl(
        this.templatePath('postcss.json'),
        this.destinationPath('postcss.json')
      );
    },

    makefile: function() {
      this.fs.copyTpl(
        this.templatePath('Makefile'),
        this.destinationPath('Makefile')
      );
    },

    gitignore: function() {
      this.fs.copyTpl(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
    },

    projectile: function() {
      this.fs.copyTpl(
        this.templatePath('projectile'),
        this.destinationPath('.projectile')
      );
    },

    tern: function() {
      this.fs.copyTpl(
        this.templatePath('tern-project'),
        this.destinationPath('.tern-project')
      );
    },

    html: function() {
      this.fs.copyTpl(
        this.templatePath('index.html'),
        this.destinationPath('index.html'), {
          'title': this.projectTitle
        }
      );
    },

    script: function() {
      this.fs.copyTpl(
        this.templatePath('script.js'),
        this.destinationPath('script.js'), {
          'title': this.projectTitle
        }
      );
    },

    style: function() {
      this.fs.copyTpl(
        this.templatePath('style.css'),
        this.destinationPath('style.css')
      );
    },
  },

  install: function() {
    var dependencies = [
      'browser-sync', 'onchange', 'npm-run-all', 'browserify',
      'postcss-cli', 'autoprefixer', 'postcss-simple-vars', 
      'postcss-mixins', 'postcss-nested'
    ];

    this.npmInstall(
      dependencies,
      {
        'progress': false,
        'save-dev': true
      }
    );
  }
});
