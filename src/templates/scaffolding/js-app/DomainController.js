<%
def uncapitalize(s) { s[0].toLowerCase() + s[1..-1]}
classNameLowerCase = uncapitalize(className)
projectName = project.toLowerCase()
%>
(function (define) {
define(function (require, exports, module) {

    module.exports = ${className}sController;

    var csst, when, form, update, map, qs, qsa;
    
    csst = require('csst');
    when = require('when');
    form = require('cola/dom/form');
    update = csst.lift(csst.toggle('hidden'));
    map = Array.prototype.map;
    qs = document.querySelector;
    qsa = document.querySelectorAll

    function ${className}sController() {
    }

    ${className}sController.prototype.displayView = function() {
        this._form.reset();
        changeView('.${classNameLowerCase}-display', 'add');
    };

    ${className}sController.prototype.displayController = function() {
        changeView('.controller-section');
    };

    ${className}sController.prototype.display = function(item) {
        this._form.reset();
        this._updateForm(this._form, item);
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
        var self = this;
        when(this._aerogear.add(form.getValues(self._form))).then(function(item){
            self._model.add(item);
        });
        changeView('.${classNameLowerCase}s-list', 'list');
    };

    ${className}sController.prototype.update = function() {
        var self = this;
        when(this._aerogear.update(form.getValues(this._form))).then(function(item){
            self._model.update(item);
        });
        changeView('.${classNameLowerCase}s-list', 'list');
    };

    ${className}sController.prototype.remove = function() {
        var item = form.getValues(this._form);
        var self = this;
        when(this._aerogear.remove(item)).then(function(){
            self._model.remove(item);
        });
        changeView('.${classNameLowerCase}s-list', 'list');
    };

    ${className}sController.prototype.cancel = function() {
        changeView('.${classNameLowerCase}s-list', 'list');
    };

    function changeView(view, action) {
        map.call(qsa('section:not(.hidden),form:not(.hidden)'), update(true));
        update(false, qs(view));
        action != null && updateButton(action);
    }

    function updateButton(action) {
        update(false, qs('.${classNameLowerCase}s-section'));
        update(qs('.${classNameLowerCase}s-list:not(.hidden)') != null, qs('.${classNameLowerCase}s-element-cancel'));
        var isDisplay = qs('.${classNameLowerCase}-display:not(.hidden)') != null;
        update(isDisplay, qs('.${classNameLowerCase}s-element-displaylist'));
        update(action != 'add' || !isDisplay, qs('.${classNameLowerCase}s-element-add'));
        map.call(qsa('.${classNameLowerCase}s-element-update'),update(action != 'update' || !isDisplay));
    }
})
}(
    typeof define == 'function' && define.amd
    ? define
    : function (factory) { module.exports = factory(require, exports, module); }
));