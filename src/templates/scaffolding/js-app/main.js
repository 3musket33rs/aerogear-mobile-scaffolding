<%
def uncapitalize(s) { s[0].toLowerCase() + s[1..-1]}
classNameLowerCase = uncapitalize(className)
projectName = project.toLowerCase()
%>
define({
    theme: { modules: [
        {module:'theme/topcoat-mobile-light.css'},
        {module:'theme/custom.css'}
    ]},
    controllerView: {
        render: {
            template: { module: 'text!app/controller/template.html' }
        },
        insert: { at: 'dom.first!body' }
    },
    // BeginController ${className}
    ${classNameLowerCase}s: { create: 'cola/Collection' },
    ${classNameLowerCase}SectionView: {
        render: {
            template: { module: 'text!app/${classNameLowerCase}/${className}Section.html' }
        },
        insert: { after: 'controllerView' },
        bind: {
            to: { \$ref: '${classNameLowerCase}s' },
            bindings : {
                ${props[0].name}: ".${props[0].name}"
            }
        }
    },
    ${classNameLowerCase}sForm: {
        element: { \$ref: 'dom.first!form', at: '${classNameLowerCase}SectionView' }
    },
    ${classNameLowerCase}Controller: {
        create: 'app/${classNameLowerCase}/${className}Controller',
        properties: {
            _form: { \$ref: "${classNameLowerCase}sForm"},
            _updateForm: { \$ref: 'form.setValues' },
            _model:{ \$ref: '${classNameLowerCase}s'},
            _aerogear:{ \$ref: '${classNameLowerCase}Store'}
        },
        on: {
            ${classNameLowerCase}SectionView: {
                'click:.display': '${classNameLowerCase}s.edit',
                'click:.displayAdd': 'displayView',
                'click:.cancel': 'cancel',
                'click:.add': 'add',
                'click:.update': 'update',
                'click:.remove': 'remove'
            },
            controllerView: {
                'click:.${classNameLowerCase}': 'cancel'
            }
        },
        connect :{
            '${classNameLowerCase}s.onEdit': "display"
        },
        ready: 'load'
    },
    ${classNameLowerCase}Store: {
        create: {
            module: '../AeroGearCore',
            args: ['http://localhost:8080/${project}/', '${classNameLowerCase}s', {type:'SessionLocal', settings :{storageType:'localStorage'}}, { \$ref: '${classNameLowerCase}s' }, '${projectName}.${className}']
        }
    },
    // EndController ${className}
    form: { module: 'cola/dom/form' },
            aeroGearPush: {
            create: {
                module: '../AeroGearPush',
                args: [{
                    // BeginPush
                    pushServerURL: "${pushServerURL}",
                    variantID: "${variantID}",
                    variantSecret: "${variantSecret}",
                    // EndPush
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
                }]
            }

        },
    // Wire.js plugins
    \$plugins: [
		{ module: 'wire/dom', classes: { init: 'loading' } },
        { module: 'wire/dom/render' }, { module: 'wire/on' },
        { module: 'wire/connect' }, { module: 'wire/aop' },
        { module: 'cola' }
    ]
});
