# pwc-custom-control-form



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type  | Default     |
| -------- | --------- | ----------- | ----- | ----------- |
| `form`   | `form`    |             | `any` | `undefined` |
| `shape`  | `shape`   |             | `any` | `undefined` |


## Events

| Event           | Description | Type               |
| --------------- | ----------- | ------------------ |
| `formCanceled`  |             | `CustomEvent<any>` |
| `formSubmitted` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [pwc-text-control](../../../../pwc-custom-controls/text-control)

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
  pwc-text-control --> pwc-custom-control-form
  style pwc-custom-control-form fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
