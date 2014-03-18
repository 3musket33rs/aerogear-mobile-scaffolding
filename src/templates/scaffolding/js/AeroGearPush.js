(function(global, define) {
    define(function(require) {


    function pushNotification(pushConfig) {
        document.addEventListener('deviceready', onDeviceReady, true);
        function onDeviceReady() {
            try {
                window.onNotification = pushConfig.onNotification;
                push.register(pushConfig.successHandler, pushConfig.errorHandler, {"badge": "true", "sound": "true",
                    "ecb": "onNotification", pushConfig: pushConfig});
            } catch (err) {
                txt = "There was an error on this page.";
                txt += "Error description: " + err.message;
                alert(txt);
            }
        }
    }

    return pushNotification;

});
})(this.window || global,
        typeof define == 'function'
            ? define
            : function(factory) { module.exports = factory(require); }
    );
