const Emittery = require('emittery');
const path = require('path');
const fs = require('fs');

module.exports = function (sails) {

    let emitter;

    return {
        emit: _emit,
        initialize: function () {
            sails.log.info('Initializing hook (`sails-hook-custom-events`)');
            _initObservers();
        }
    }

    function _getEmitter() {
        if (!emitter) {
            emitter = new Emittery();
        }
        return emitter;
    }

    function _emit(eventName, eventData) {
        return _getEmitter().emit(eventName, eventData);
    }

    function _observe(eventName, listener) {
        return _getEmitter().on(eventName, listener);
    }

    function _initObservers() {
        let normalizedPath = path.join(sails.config.appPath + '/api/', 'observers');
        if (!fs.existsSync(normalizedPath)) {
            return;
        }
        fs.readdirSync(normalizedPath).forEach(eventName => {
            sails.log.info('Initializing custom event `'+eventName+'`');
            _observe(eventName, data => {
                fs.readdirSync(normalizedPath + '/' + eventName).forEach(event => {
                    require(normalizedPath + '/' + eventName + '/' + event)(data);
                });
            });
        });
    }


}
