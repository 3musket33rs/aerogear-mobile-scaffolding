<%
def uncapitalize(s) { s[0].toLowerCase() + s[1..-1]}
classNameLowerCase = uncapitalize(className)
projectName = project.toLowerCase()
%>
// >>> BEGIN VARIABLE ${className}
var ${className}sController = require('./app/${classNameLowerCase}/${className}sController');
var ${classNameLowerCase}sListTemplate = require('./app/${classNameLowerCase}/${classNameLowerCase}ListTemplate.html');
// >>> END VARIABLE ${className}

var Rest = require('cola/data/Rest');
var fluent = require('wire/config/fluent');
var pushNotification = require('./js/mk/push/aerogear/pushNotification');

module.exports = fluent(function(config) {

    // to be added at startup
    var pushConfig = {
        // >>> PUSH
        pushServerURL: "${pushServerURL}",
        variantID: "${variantID}",
        variantSecret: "${variantSecret}",
        // >>> PUSH END
        successHandler: function(result) {
            console.log(result);
            alert(result);
        },
        errorHandler: function (error) {
            console.log(error);
            alert(error);
        },

        onNotification: function (e) {
            alert(e.alert);
        }
    };
    pushNotification(pushConfig);

    return config
        // >>> BEGIN ${className}
        .add('${classNameLowerCase}s@controller', ${className}sController)
        .add('${classNameLowerCase}s@model', function() {
            return new Rest('http://localhost:8080/${project}/${classNameLowerCase}s');
        })
        .add('${classNameLowerCase}s@view', ['render','insert','qs'], function(render, insert, qs) {
            var view = render(${classNameLowerCase}sListTemplate);
            qs('section').appendChild(view);
            return view;
        })
        // >>> END ${className}
        ;
});