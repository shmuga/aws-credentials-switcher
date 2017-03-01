# AWS Credentials Switcher  <img src="http://i.imgur.com/SR63kq7.png?1" title="source: imgur.com" />

#### Notice: app is in alpha, use this app at one's own risk. Dump credentials before usage.

GUI tool for switching between different aws credentials.

Download app for [macOS](https://github.com/shmuga/aws-credentials-switcher/releases/download/0.1.0/AWS.Credentials.Switcher.macOS.zip)

# Instructions

Please provide next information to `~/.aws/credentials` file.

<img src="http://i.imgur.com/18JG4N2.png" title="source: imgur.com" />

Notice that `type` field is also required and should be unique for all credentials.

Than just start the app and use the tray icon to choose required settings.

<img src="http://i.imgur.com/E32d8Xe.png" title="source: imgur.com" />

## Build

- run `npm install`
- run `npm run build` to make Example.app
- run `npm start` to run app from CLI without building Example.app

## TODO
- create dump file of credentials before usage and return it before exit.
- autostart.
