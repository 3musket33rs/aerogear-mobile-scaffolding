/** Copyright 2014 the original author or authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

/**
*
* @author <a href='mailto:th33musk3t33rs@gmail.com'>3.musket33rs</a>
*
* @since 0.1
*/

includeTargets << grailsScript("_GrailsInit")

target(htmlMobileCopyTemplates: "generate HTML5 mobile view with different section for CRUD") {
  depends checkVersion, parseArguments

//    def targetPaths = [controller: "$basedir/src/templates/scaffolding"]
//
    def overwrite = true
//
//    if (targetPaths.any { new File(it.value).exists() }) {
//      if (!isInteractive || confirmInput('Overwrite existing templates?', 'overwrite.templates')) {
//        overwrite = true
//      }
//    }
//
//    targetPaths.each { sourcePath, targetDir ->
//    def sourceDir = "$aeroGearMobileScaffoldingPluginDir/src/templates/scaffolding/$sourcePath"
//      ant.mkdir dir: targetDir
//      ant.copy(todir: targetDir, overwrite: overwrite) {
//        fileset dir: sourceDir
//      }
//    }

    def source = "$aeroGearMobileScaffoldingPluginDir/src/templates/scaffolding/"
    def destination = "$basedir/src/templates/scaffolding/"

    ant.mkdir dir: destination + "controller"
    ant.copy( todir:destination + "controller", overwrite: overwrite) {
        fileset( dir: source + "controller/")
    }


    ant.mkdir dir: destination + "js-app"
    ant.copy( todir:destination + "js-app", overwrite: overwrite) {
        fileset( dir: source + "js-app/")
    }

    ant.mkdir dir: destination + "js"
    ant.copy( todir:destination + "js", overwrite: overwrite) {
        fileset( dir: source + "js/" )
    }

    ant.mkdir dir: destination + "cordova"
    ant.copy( todir:destination + "cordova", overwrite: overwrite) {
        fileset( dir: source + "cordova/" )
    }

    ant.mkdir dir: destination + "bower"
    ant.copy( todir:destination+ "bower", overwrite: overwrite) {
        fileset( dir: source + "bower/" )
    }

    ant.mkdir dir: destination + "theme"
    ant.copy( todir:destination + "theme/" , overwrite: overwrite) {
        fileset( dir: source + "theme/" )
    }

    ant.mkdir dir: destination + "img"
    ant.copy( todir:destination + "img" , overwrite: overwrite) {
        fileset( dir: source + "img/" )
    }

    ant.mkdir dir: destination + "font"
    ant.copy( todir:destination + "font/" , overwrite: overwrite) {
        fileset( dir: source + "font/" )
    }

    event "StatusUpdate", ["html-mobile-templates installed successfully"]

}


