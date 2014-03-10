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

module.exports = fluent(function(config) {
    return config
        // >>> BEGIN ${className}
        .add('${classNameLowerCase}s@controller', ${className}sController)
        .add('${classNameLowerCase}s@model', function() {
            return new Rest('http://localhost:8080/${projectName}/${classNameLowerCase}s');
        })
        .add('${classNameLowerCase}s@view', ['render','insert','qs'], function(render, insert, qs) {
            var view = render(${classNameLowerCase}sListTemplate);
            qs('section').appendChild(view);
            return view;
        })
        // >>> END ${className}
        ;
});