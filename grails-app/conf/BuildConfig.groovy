grails.servlet.version = "2.5" // Change depending on target container compliance (2.5 or 3.0)
grails.project.class.dir = "target/classes"
grails.project.test.class.dir = "target/test-classes"
grails.project.test.reports.dir = "target/test-reports"
grails.project.target.level = 1.6
grails.project.source.level = 1.6
grails.tomcat.nio=true

grails.project.dependency.resolution = {
    // inherit Grails' default dependencies
    inherits("global") {
    }
    log "error" // log level of Ivy resolver, either 'error', 'warn', 'info', 'debug' or 'verbose'
    checksums true // Whether to verify checksums on resolve

    repositories {
        inherits true // Whether to inherit repository definitions from plugins
        grailsPlugins()
        grailsHome()
        grailsCentral()
        mavenCentral()
        mavenRepo "http://maven.springframework.org/milestone/"

        //mavenRepo "https://oss.sonatype.org/content/repositories/snapshots"
    }
    dependencies {
        compile 'eu.mais-h.mathsync:core:0.3.0'
    }

    plugins {

        compile ":scaffolding:2.0.2"
        build ':release:3.0.1', ':rest-client-builder:1.0.3', {
          export = false
        }
    }
}
