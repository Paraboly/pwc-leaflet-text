# pwc-map-controls



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type                               | Default     |
| -------- | --------- | ----------- | ---------------------------------- | ----------- |
| `config` | --        |             | `{ map: Map; controls?: Object; }` | `undefined` |


## Events

| Event     | Description | Type               |
| --------- | ----------- | ------------------ |
| `actions` |             | `CustomEvent<any>` |


## Methods

### `getControls() => Promise<any>`



#### Returns

Type: `Promise<any>`



### `initialize(config: { map: L.Map; controls?: {}; }, geometry: any) => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [pwc-custom-control-form](components/pwc-custom-control-form)

### Graph
```mermaid
graph TD;
  pwc-map-controls --> pwc-custom-control-form
  pwc-custom-control-form --> pwc-ibox
  pwc-custom-control-form --> pwc-ibox-title
  pwc-custom-control-form --> pwc-ibox-content
  pwc-custom-control-form --> pwc-ibox-footer
  style pwc-map-controls fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
