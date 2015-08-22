# ui-builder

The general idea is to have a UI builder which can use any CSS framework. Bootstrap or Foundation or similar reminds me of Lego tiny parts that you can use to build something complex. The only thing needed is a certain description of components of framework you want to use.

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Run options

* `UIB_SRV_HOST` - node app host name. Default: `http://localhost`
* `UIB_SRV_PORT` - node app port name. Default: `3000`
* `UIB_WEBSOCKET_PORT` - webSockets port. Default: `3001`
* `UIB_MNG_HOST` - MongoDB host (for example, `123.123.123.312`). Default: `localhost`
* `UIB_RDS_HOST` - Redis host. Default: `127.0.0.1`
* `UIB_RDS_PORT` - Redis port. Default: `6379`
* `NODE_ENV` - `production` || `development`
