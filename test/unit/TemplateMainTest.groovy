import org.junit.Test

/**
 * Created by corinne on 10/03/14.
 */
class TemplateMainTest {
    String templateResolved = """

var TodosController = require('./app/todo/TodosController');
var Rest = require('cola/data/Rest');
var todosListTemplate = require('./app/todo/todosListTemplate.html');
var fluent = require('wire/config/fluent');

module.exports = fluent(function(config) {
    return config
        // >>> BEGIN Todo
        .add('todos@controller', TodosController)
        .add('todos@model', function() {
            return new Rest('http://localhost:8080/mytodo/todos');
        })
        .add('todos@view', ['render','insert','qs'], function(render, insert, qs) {
            var view = render(todosListTemplate);
            qs('section').appendChild(view);
            return view;
        })
    // >>> END Todo
    // end file
    ;
});
"""

    String content = """

var TodosController = require('./app/todo/TodosController');
var Rest = require('cola/data/Rest');
var todosListTemplate = require('./app/todo/todosListTemplate.html');
var fluent = require('wire/config/fluent');

module.exports = fluent(function(config) {
    return config
        // >>> BEGIN Todo
        .add('todos@controller', TodosController)
        .add('todos@model', function() {
            return new Rest('http://localhost:8080/mytodo/todos');
        })
        .add('todos@view', ['render','insert','qs'], function(render, insert, qs) {
            var view = render(todosListTemplate);
            qs('section').appendChild(view);
            return view;
        })
        // >>> END Todo
        ;
});
"""

     @Test
    void runTest()  {
         String result = templateResolved.getAt(templateResolved.indexOf("// >>> BEGIN Todo") + "// >>> BEGIN Todo".length() .. templateResolved.indexOf("// >>> END Todo") -1)
         //println result)
     }

    @Test
    void configReplace() {
         content = content.replace(";\n});", "Variable" + "\n\t\t;\n});")
         //println content
    }
}
