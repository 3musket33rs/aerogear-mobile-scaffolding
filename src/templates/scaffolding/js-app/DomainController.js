<%
def uncapitalize(s) { s[0].toLowerCase() + s[1..-1]}
classNameLowerCase = uncapitalize(className)
projectName = project.toLowerCase()
%>
(function (define) {
define(function (require, exports, module) {

    module.exports = ${className}sController;

    var csst = require('csst');
    var when = require('when');
    var form = require('cola/dom/form');
    var slice = Array.prototype.slice;
    var update = csst.lift(csst.toggle('hidden'));
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

    ${className}sController.prototype.load = function() {
        var self = this;
        when(this._aerogear.load()).then(function(items){
            items.forEach(function(item) {
                self._model.add(item);
            });
        });
    };

    ${className}sController.prototype.add = function() {
        var ${classNameLowerCase} = form.getValues(this._form);
        var self = this;
        when(this._aerogear.add(${classNameLowerCase})).then(function(item){
            self._model.add(item);
        });
        changeView('.${classNameLowerCase}s-list', 'list');
        return ${classNameLowerCase};
    };

    ${className}sController.prototype.update = function() {
        var ${classNameLowerCase} = form.getValues(this._form);
        var self = this;
        when(this._aerogear.update(${classNameLowerCase})).then(function(item){
            self._model.update(item);
        });
        changeView('.${classNameLowerCase}s-list', 'list');
        return ${classNameLowerCase};
    };

    ${className}sController.prototype.remove = function() {
        var ${classNameLowerCase} = form.getValues(this._form);
        var self = this;
        when(this._aerogear.remove(${classNameLowerCase})).then(function(){
            self._model.remove(${classNameLowerCase});
        });
        changeView('.${classNameLowerCase}s-list', 'list');
        return ${classNameLowerCase};
    };

    ${className}sController.prototype.cancel = function(${classNameLowerCase}s, ${classNameLowerCase}) {
        changeView('.${classNameLowerCase}s-list', 'list');
    };

    function changeView(view, action) {
        slice.call(document.querySelectorAll('section:not(.hidden),form:not(.hidden)'), 0).forEach(function(node) {
            update(true, node);
        });
        update(false, document.querySelector(view));
        update(false, document.querySelector('.${classNameLowerCase}s-section'));
        update(document.querySelector('.${classNameLowerCase}s-element-cancel:not(.hidden)') != null, document.querySelector('.${classNameLowerCase}s-element-cancel'));
        update(document.querySelector('.${classNameLowerCase}s-element-displaylist:not(.hidden)') != null, document.querySelector('.${classNameLowerCase}s-element-displaylist'));
        
        if(action === 'add' || (action === 'list' && stateAdd)) {
            update(document.querySelector('.${classNameLowerCase}s-element-add:not(.hidden)') != null, document.querySelector('.${classNameLowerCase}s-element-add'));
            stateAdd = !stateAdd;
        }

        if(action === 'update' || (action === 'list' && stateUpdate) ) {
            var buttonsElementUpdate = document.querySelectorAll('.${classNameLowerCase}s-element-update');
            slice.call(buttonsElementUpdate, 0).forEach(function(node){
                update(stateUpdate, node);
            });
            stateUpdate = !stateUpdate;
        }
    }
})
}(
    typeof define == 'function' && define.amd
    ? define
    : function (factory) { module.exports = factory(require, exports, module); }
));