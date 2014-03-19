(function(global, define) {
    define(function (require) {
        var when;

        when = require('when');
        require('aerogear');
        var ms = require('mathsync');

        function AeroGearCore(client, namespace, config, model, className) {
            this._rest = AeroGear.Pipeline({
                baseURL: client
            }).add(namespace).pipes[namespace];

            this._syncrest = AeroGear.Pipeline({
                baseURL: client
            }).add('sync').pipes['sync'];

            var dataManager = AeroGear.DataManager();
            if (config != null) {
                config.name = namespace
            }

            this._model = model;
            this._className = className;

            config ? dataManager.add(config) : dataManager.add(namespace);
            this._dataManager = dataManager.stores[namespace];
            if(config.type === "IndexedDB" || config.type === "WebSQL" ) {
                // TODO Is there something to do in fact ?
                this._dataManager.open({
                    success: function(e) {
                        console.log("DB is open" + e);
                        var a =1;
                    },
                    error: function(e) {
                        console.log("open is getting an exception" + e);
                        var a =1;
                    }
                });
            }
            var self = this;
            this._online = navigator.onLine;
            this._offlineAction = [];
            window.addEventListener('online',  function() {
                self._online = true;
                self._push();
                self._sync();
            });
            window.addEventListener('offline', function(){
                self._online = false;
            });
        }

        AeroGearCore.prototype = {
            provide: false,
            load: function() {
                //this._sync();
                if (this._online) {
                    var self = this;
                    return this._rest.read({
                        success: function(data) {
                            data.forEach(function(item) {
                                item.id = parseInt(item.id);
                            });
                            self._dataManager.remove();
                            self._dataManager.save(data);
                            return data
                        },
                        error: function(error) {
                            console.log("Error in load");
                            return error;
                        }
                    });
                } else {
                    return this._dataManager.read();
                }
            },
            add: function(item) {
                console.log("add in AeroGearCore");
                var self = this;
                if (this._online) {
                    return this._rest.save(item, {
                        success: function(data) {
                            data.id = parseInt(data.id);
                            self._dataManager.save(data);
                            return data;
                        },
                        error: function(error) {
                            console.log("Error in add send");
                            return error;
                        }
                    });
                } else {
                    this._offlineAction.push({action: 'add', item: item});
                }
            },
            remove: function(item) {
                console.log("remove in AeroGearCore");
                item.id = parseInt(item.id);
                var self = this;
                if (this._online) {
                    return this._rest.remove(item, {
                        success: function() {
                            self._dataManager.remove(item);
                            return item;
                        },
                        error: function(error) {
                            console.log("Error in remove send");
                            return error;
                        }
                    });
                } else {
                    this._offlineAction.push({action: 'remove', item: item});
                }
            },
            update: function(item) {
                console.log("update in AeroGearCore");
                item.id = parseInt(item.id);
                var self = this;
                if (this._online) {
                    return this._rest.save(item, {
                        success: function(data) {
                            self._dataManager.save(data);
                            return data;
                        },
                        error: function(error) {
                            console.log("Error in remove send");
                            return error;
                        }
                    });
                } else {
                    this._offlineAction.push({action: 'update', item: item});
                }
            },
            clear: function() {
                console.log("clear in AeroGearCore");
            },
            _push: function() {
                var self = this;
                this._offlineAction.forEach(function(data, index) {
                    self[data.action].apply(self, [data.item]);
                });
            },
            _sync: function() {
                var self = this;
                this._dataManager.read().then(function(data) {
                    var local = ms.summarizer.fromItems(data, ms.serialize.fromString(JSON.stringify));
                    function fetchSummary(level) {
                        return self._syncrest.read({id: '{level:' + level + ', "className":"' + self._className + '"}',
                            success: function(summary) {
                                console.log('Success ' + summary);
                                return summary;
                            },
                            error: function(error) {
                                console.log('Unable to sync');
                            }
                        });
                    }
                    var remote = ms.summarizer.fromJSON(fetchSummary);
                    var resolveDiff = ms.resolver.fromSummarizers(local, remote, ms.serialize.toString());
                    resolveDiff().then(function (difference) {
                        if(difference.added.length != 0 || difference.removed.length != 0) {
                            difference.added.forEach(function(data, i){
                                difference.added[i] = JSON.parse(data);
                            });
                            difference.removed.forEach(function(data, i){
                                difference.removed[i] = JSON.parse(data);
                            });
                            difference.updated = [];
                            var i,j;
                            for (i = 0; i <  difference.added.length; i++) {
                                for (j = 0; j < difference.removed.length; j++) {
                                    if(difference.added[i].id === difference.removed[j].id) {
                                        difference.removed.splice(j, 1);
                                        difference.updated.push(difference.added.splice(i, 1)[0]);
                                        i--; j--;
                                        break;
                                    }
                                }
                            }
                            difference.added.forEach(function(data){
                                data.id = parseInt(data.id);
                                self._model.add(data);
                                self._dataManager.save(data);
                            });
                            difference.removed.forEach(function(data){
                                data.id = parseInt(data.id);
                                self._model.remove(data);
                                self._dataManager.remove(data);
                            });
                            difference.updated.forEach(function(data){
                                data.id = parseInt(data.id);
                                self._model.update(data);
                                self._dataManager.update(data);
                            });
                        }
                    });
                });
            }
        };

        return AeroGearCore;

    });
})(this.window || global,
        typeof define == 'function'
            ? define
            : function(factory) { module.exports = factory(require); }
    );
