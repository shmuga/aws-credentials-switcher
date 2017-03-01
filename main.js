var menubar = require('menubar');
var electron = require('electron');
var Menu = electron.Menu;
var creds = require('./credentials');

var mb = menubar();

function onSelect(element, list) {
  var newElem = Object.assign({}, element);
  newElem.default = true;
  list.push(newElem);
  var newFile = creds.generateString(list);
  creds.writeFile(newFile);
  refresh(mb.tray);
}


function refresh(tray) {
  var file = creds.getFile();
  var config = creds.parseFile(file);
  var menu = [{
    label: 'AWS credentials',
    type: 'normal',
  }, {
    type: 'separator'
  }]

  menu = menu.concat(config.map(function(c) {
    return {
      label: c.type,
      type: 'radio',
      checked: c.isDefault,
      click: onSelect.bind(null, c, config)
    };
  }));

  menu.push({
    type: 'separator',
  });

  menu.push({
    label: 'Quit',
    type: 'normal',
    click: function() { process.exit(0) }
  });

  var contextMenu = Menu.buildFromTemplate(menu);
  tray.setToolTip('Choose AWS credentials.');
  tray.on('click', function() { refresh(tray) } );
  tray.setContextMenu(contextMenu);
}

mb.on('ready', function() {
  var tray = mb.tray;
  refresh(tray);

  mb.on('show', function() {
    refresh(tray);
  });

  console.log('app is ready')
});
