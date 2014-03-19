

import eu.mais_h.mathsync.serialize.Serializer
import grails.converters.JSON

/**
 * Created by corinne on 18/03/14.
 */
class MySerializer implements Serializer {

    @Override
    byte[] serialize(Object o) {
        def json = o as JSON
        json.toString().getBytes("UTF-8")
    }
}


