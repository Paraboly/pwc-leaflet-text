# pwc-custom-control-form



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type  | Default     |
| -------- | --------- | ----------- | ----- | ----------- |
| `form`   | `form`    |             | `any` | `undefined` |


## Events

| Event         | Description | Type               |
| ------------- | ----------- | ------------------ |
| `formActions` |             | `CustomEvent<any>` |


## Methods

### `initialize(shape: any) => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [pwc-map-controls](../..)

### Depends on

- pwc-ibox
- pwc-ibox-title
- pwc-ibox-content
- pwc-ibox-footer

### Graph
```mermaid
graph TD;
  pwc-custom-control-form --> pwc-ibox
  pwc-custom-control-form --> pwc-ibox-title
  pwc-custom-control-form --> pwc-ibox-content
  pwc-custom-control-form --> pwc-ibox-footer
  pwc-map-controls --> pwc-custom-control-form
  style pwc-custom-control-form fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
