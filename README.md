# ui-builder

The general idea is to have a UI builder which can use any CSS framework. Bootstrap or Foundation or similar reminds me of Lego tiny parts that you can use to build something complex. The only thing needed is a certain description of components of framework you want to use.

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Run options

* `NODE_ENV` - `production` || `development`
* `UIB_SRV_HOST` - node app host name. Default: `http://localhost`
* `UIB_SRV_PORT` - node app port name. Default: `3000`
* `UIB_WEBSOCKET_PORT` - webSockets port. Default: `3001`
* `UIB_MNG_HOST` - MongoDB host (for example, `123.123.123.312`). Default: `localhost`
* `UIB_RDS_HOST` - Redis host. Default: `127.0.0.1`
* `UIB_RDS_PORT` - Redis port. Default: `6379`

## Repository items structure

### Tree root

```json
{
  "componentsTree": {
    "name": "Your repo name",
    "subNodes": [<Category | Item>]
  }
}
```

### Category

```json
{
  "name": "Category name",
  "subNodes": [<Item | Behaviour>]
}
```

### Item

```json
{
  "name": "<Element'sName>",         // Grid column
  "type": "component",
  "tagName": "<TagName>",           // div
  "children": [],                   // Set this if the element may have children (like `div` or `section`)
  "attributes": [
    { "class": "ys-ui-wrapper" }    // key-value
  ],
  "parameters": [<Parameter>]
}
```

### ItemParameter

```json
{
  "name": "Text alignment",
  "attribute": "class",
  "type": "<ParameterType>",
  "options": [<ParameterOption>],   // Only make sense when "Type" is "select"
  "value": "text-to-left"           // Initial/default value
}
```

### ItemParameterType

* `select`. For example,

```json
{
  "name": "Layout",
  "attribute": "layout-style",
  "type": "select",
  "value": "horizontal",
  "options": [
    { "label": "Horizontal", "value": "horizontal" },
    { "label": "Vertical", "value": "vertical" }
  ]
}
```

* `free-text`. For example,

```json
{
  "name": "Data model",
  "attribute": "ng-model",
  "type": "free-text",
  "value": "myCtrl.value"
}
```

### ItemParameterOption

```json
{
  "label": "Text is aligned to center",
  "value": "text-to-center"
}
```

### Behavior

```json
{
  "name": "Scrollability",
  "type": "behavior",
  "attr": "class",
  "value": "scrollable-vertically",
  "optionsType": "<BehaviorOptionType>",
  "optionLabel": "Small description...",    // Only when "optionsType" is set to "free-text"
  "options": [<BehaviorOption>]
}
```

### BehaviorOptionType

* `select`
* `free-text`

### BehaviorOption

```json
{
  "label": "Vertically",
  "value": "scrollable-vertically"
}
```
