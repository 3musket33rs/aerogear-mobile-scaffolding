aerogear-mobile-scaffolding
========================

aerogear-mobile-scaffolding is a plugin to scaffold CRUD for a mobile first application. Header, footer, list with responsive UI powered by lightweight topcoat CSS. MVC is powed by [cujo.js](http://cujojs.com/), mobile plumbing with [AeroGear](http://aerogear.org).
This scaffolding plugin scaffold client views, it requires that your controller has been generated using generate-restful-controller.


Install it
===========

Add a dependency to BuildConfig.groovy:

    plugins {
        compile ":aerogear-mobile-scaffolding:0.0.1"
        ...
    }



To test it
===========
    (pre-requisite)
    grails generate-restful-controller org.myproject.MyDomainClass
    (aerogear-mobile-scaffolding)
	grails html-generate-views org.myproject.MyDomainClass
	cd web-app
	bower install
	grails run-app

Available Targets
=================

	html-generate-views [domainClass] [optional viewName]


Give it a trial and send us feedback!
====================================

3muskete33rs on twitter @3musket33rs 
- Athos is Corinne Krych (@corinnekrych)
- Aramis is Sebastien Blanc (@sebi2706)
- Porthos is Fabrice Matrat (@fabricematrat)
- D'Artagnan is Mathieu Bruyen (@mathbruyen)
