import eu.mais_h.mathsync.Summarizer
import eu.mais_h.mathsync.SummarizerFromItems
import grails.converters.JSON

class SyncController {
    static allowedMethods = [sync:'GET']

    def sync(String id) {
        def information = JSON.parse(id)
        def content = Class.forName(information['className']).findAll();
        final Summarizer summarizer = SummarizerFromItems.simple(new HashSet(content), new MySerializer());
        render summarizer.summarize(information['level']).toJSON()
    }
}
