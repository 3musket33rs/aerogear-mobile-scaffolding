(function(define) {
    define(function(require) {


        function pushNotification(pushConfig) {
            document.addEventListener('deviceready', onDeviceReady, true);
            function onDeviceReady() {
                try {
                    window.onNotification = pushConfig.onNotification;
                    push.register(pushConfig.successHandler, pushConfig.errorHandler, {"badge": "true", "sound": "true",
                        "ecb": "onNotification", pushConfig: pushConfig});
                } catch (err) {
                    txt = "There was an error on this page.\n\n";
                    txt += "Error description: " + err.message + "\n\n";
                    alert(txt);
                }
            }
        }

        return pushNotification;

    });
})(typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(require); });

