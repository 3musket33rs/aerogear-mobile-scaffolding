<%
def uncapitalize(s) { s[0].toLowerCase() + s[1..-1]}
classNameLowerCase = uncapitalize(className)
projectName = project.toLowerCase()
%>
(function (define) {
    define(function (require, exports, module) {

        module.exports = ${className}sController;

        var csst = require('csst');
        var form = require('cola/dom/form');
        var slice = Array.prototype.slice;
        var update = csst.lift(csst.toggle('hidden'));
        var state = false;
        var stateAdd = false;
        var stateUpdate = false;

        function ${className}sController() {
        }

${className}sController.prototype.displayView = function() {
    this._form.reset();
    changeView('.${classNameLowerCase}-display', 'add');
    };

${className}sController.prototype.display = function(${classNameLowerCase}) {
    this._form.reset();
    this._updateForm(this._form, ${classNameLowerCase});
    changeView('.${classNameLowerCase}-display', 'update');
    };

${className}sController.prototype.save = ${className}sController.prototype.delete = function() {
    var ${classNameLowerCase} = form.getValues(this._form);
    ${classNameLowerCase}.id = parseInt(${classNameLowerCase}.id);
    changeView('.${classNameLowerCase}s-list', 'list');
    return ${classNameLowerCase};
    };

${className}sController.prototype.cancel = function(${classNameLowerCase}s, ${classNameLowerCase}) {
    changeView('.${classNameLowerCase}s-list', 'list');
    };

function changeView(view, action) {
    var buttonsElement = document.querySelectorAll('.${classNameLowerCase}s-element');
    var buttonsElementUpdate = document.querySelectorAll('.${classNameLowerCase}s-element-update');
    var buttonsElementAdd = document.querySelectorAll('.${classNameLowerCase}s-element-add');
    var buttonsList = document.querySelectorAll('.${classNameLowerCase}s-list');
    slice.call(buttonsElement, 0).forEach(function(node){
    update(state, node);
    });
if(action === 'update' || (action === 'list' && stateUpdate) ) {
    slice.call(buttonsElementUpdate, 0).forEach(function(node){
        update(stateUpdate, node);
    });
stateUpdate = !stateUpdate;
}
if(action === 'add' || (action === 'list' && stateAdd)) {
    slice.call(buttonsElementAdd, 0).forEach(function(node){
        update(stateAdd, node);
    });
stateAdd = !stateAdd;
}
slice.call(buttonsList, 0).forEach(function(node){
    update(!state, node);
    });
slice.call(document.querySelectorAll('section.${classNameLowerCase}s-section section:not(.hidden),form:not(.hidden)'), 0).forEach(function(node) {
    update(true, node);
    });
update(false, document.querySelector(view));
state = !state;
}
})
}(
typeof define == 'function' && define.amd
? define
: function (factory) { module.exports = factory(require, exports, module); }
));