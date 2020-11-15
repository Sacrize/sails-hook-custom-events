# Sails Hook Custom Events
Simple asynchronous emitter and event observer thanks to the `emittery` library.

## Getting Started
Install it via npm:
```bash
npm install sails-hook-custom-events --save
```
Create a directory structure:

    .
    ├── api/
    │   ├── ...
    │   ├── observers/
    │   │   ├── event-name-1/
    │   │   │   ├── observer-name-1.js
    │   │   │   ├── observer-name-2.js
    │   │   │   └── ... 
    │   │   ├── event-name-2/
    │   │   └── ... 
    |   └── ... 
    └── ...
    
Events and observers are automatically discovered based on the directory structure. Their names can be anything.

The observer must return the function:
```javascript
module.exports = function (sails, data) {

};
```
Emitting an event:
```javascript
sails.hooks.events.emit('event-name-1');
```
## License

[MIT](./LICENSE)
