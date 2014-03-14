(function(global, define) {
define(function (require) {
	var when;

	when = require('when');
	require('aerogear');

	function AeroGearCore(client, namespace, config) {
		this._rest = AeroGear.Pipeline({
			baseURL: client
		}).add(namespace).pipes[namespace];
		
		var dataManager = AeroGear.DataManager();
		if (config != null) {
			config.name = namespace
		}
		
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
		this._rest.read({
			success: function(data) {
				self._data = [];
				data.forEach(function(item) {
					item.id = parseInt(item.id);
					self._data.push(item);
				});
				self._dataManager.remove();
				self._dataManager.save(data);
			},
			error: function(error) {
				self._data = self._dataManager.read();
			}
		});
		this._online = true;
		this._offlineAction = [];
		window.addEventListener('online',  function() {
			self._online = true;
			self._push();
		});
		window.addEventListener('offline', function(){
			self._online = false;
		});
	}

	AeroGearCore.prototype = {
		provide: true,
		forEach: function(lambda) {
			console.log("forEach in AeroGearCore");
			this._data.forEach(function(data) {
				lambda(data);
			});
		},
		add: function(item) {
			console.log("add in AeroGearCore");
			var self = this;
			if (this._online) {
				this._rest.save(item, {
					success: function(data) {
						item.id = parseInt(data.id);
						self._dataManager.save(data);
					},
					error: function(error) {
						console.log("Error in remove send");
					}
				});
			} else {
				this._offlineAction.push({action: 'add', item: data});
			}
		},
		remove: function(item) {
			console.log("remove in AeroGearCore");
			var self = this;
			if (this._online) {
				this._rest.remove(item, {
					success: function(data) {
						self._dataManager.remove(item);
					},
					error: function(error) {
						console.log("Error in remove send");
					}
				});
			} else {
				this._offlineAction.push({action: 'remove', item: data});
			}
		},
		update: function(item) {
			console.log("update in AeroGearCore");
			var deferred = when.defer();
			var self = this;
			if (this._online) {
				this._rest.save(item, {
					success: function(data) {
						item.id = parseInt(data.id);
						self._dataManager.save(item);
					},
					error: function(error) {
						console.log("Error in remove send");
					}
				});
			} else {
				this._offlineAction.push({action: 'update', item: data});
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
		}
	};

	return AeroGearCore;

});
})(this.window || global,
	typeof define == 'function'
		? define
		: function(factory) { module.exports = factory(require); }
);
