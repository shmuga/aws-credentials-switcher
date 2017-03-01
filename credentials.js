var fs = require('fs');
var homedir = require('homedir');
var path = require('path');

var AWS = path.join(homedir(), '.aws/credentials');

function getFile() {
  return fs.readFileSync(AWS).toString();
}

function parseFile(file) {
  var configs = [];
  var defaultName = '';
  file.split('[').slice(1).forEach(function(config) {
    if ( config === "") {
      return;
    }

    config = config.split(']\n');
    name = config[0];
    config = config[1];

    var conf = { name, isDefault: name === 'default' };
    config.split('\n').map(function(line) {
      if (line === "") {
        return;
      }
      var l = line.replace(/\s/g, '').split('=');
      var key = l[0];
      var value = l[1];

      if (name === 'default' && key === 'type') {
        defaultName = value
      }
      conf[key] = value;
    });

    if (!configs.some(function(c) { return conf.type === c.type })) {
      configs.push(conf);
    }
  });

  return configs.map(function(c) {
    if (c.type === defaultName) {
      c.isDefault = true;
    }
    return c;
  });
}


function generateString(configs) {
  var res = [];
  configs.forEach(function(config) {
    res.push(`[${(config.default) ? 'default' : config.type}]`);
    Object.keys(config).map(function(key) {
      if (key === 'isDefault' || key === 'default' || key === 'name') {
        return;
      }

      var value = config[key];
      res.push(`${key} = ${value}`);
    });
    res.push('');
  });

  return res.join('\n');
}

function writeFile(string) {
  fs.writeFileSync(AWS, string);
}

module.exports = {
  parseFile,
  generateString,
  getFile,
  writeFile,
};
