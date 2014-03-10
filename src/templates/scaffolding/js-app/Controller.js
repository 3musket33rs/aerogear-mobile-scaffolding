<%
def uncapitalize(s) { s[0].toLowerCase() + s[1..-1]}
classNameLowerCase = uncapitalize(className)
projectName = project.toLowerCase()
%>
module.exports = ${className}sController;

function ${className}sController() {}

${className}sController.prototype.add = function(${classNameLowerCase}s, ${classNameLowerCase}) {
    ${classNameLowerCase}s.push(${classNameLowerCase});
};