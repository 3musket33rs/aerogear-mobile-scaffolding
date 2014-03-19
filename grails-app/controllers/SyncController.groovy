import eu.mais_h.mathsync.Summarizer
import eu.mais_h.mathsync.SummarizerFromItems
import grails.converters.JSON
import groovy.json.JsonBuilder

//import grails.converters.JSON

class SyncController {
    static allowedMethods = [sync:'GET']

    def sync(String id) {
        println "LevelInfo" + id
        def information = JSON.parse(id)
        def clazz = Class.forName(information['className'])
        def content = clazz.findAll();
        def level = information['level']

        final Summarizer summarizer = SummarizerFromItems.simple(new HashSet(content), new MySerializer());
        println "Level==" + level

        def toto = summarizer.summarize(level)
        //println toto as JSON
        //println new JsonBuilder(toto).toString()
        render toto as JSON
    }
}
