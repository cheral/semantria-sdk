var runApiRequest = require('./api-request').runApiRequest;

/**
 * @var {Function} emptyFn
 *
 */
function emptyFn() {}

/**
 * @param {String} string
 * @param {Object} config
 * @returns {String}
 */
function tpl(string, config) {
	return string.replace(/{([^{]*)}/g, function(fm, im) {
		return config[im];
	});
}

/**
 * @callback SemantriaApiCallback
 * @param {*} apiResponse
 */


/**
 * initializes the API
 *
 * @param {Object} config
 * @returns {undefined}
 */
function Session(consumerKey, consumerSecret, applicationName, format) {
	this.eventHandlers = {};
	this.consumerKey = consumerKey;
	this.consumerSecret = consumerSecret;
	this.format = format || "json";
	this.applicationName = applicationName ? (applicationName + "/") : "";

	if(!this.consumerKey || !this.consumerSecret) {
		throw "ConsumerKey and ConsumerSecret should be specified in order to use SDK";
	}

	this.applicationName += tpl("NodeJs/{SDK_VERSION}/{format}", {
		SDK_VERSION: this.SDK_VERSION,
		format: this.format
	});
};

Session.prototype = {

	/**
	 * @var {String} SDK_VERSION
	 * @constant
	 */
	SDK_VERSION: require('./package').version,

	/**
	 * @var {String} HOST
	 * @constant
	 */
	API_HOST: "https://api.semantria.com",

	/**
	 * @var {Object} eventHandlers
	 */
	eventHandlers: null,

	/**
	 * Function will be called before each request
	 * @returns {undefiend}
	 */
	onRequest: emptyFn,

	/**
	 * Function will be called after each response
	 * @returns {undefiend}
	 */
	onResponse: emptyFn,

	/**
	 * Function will be called if some errors occured
	 * @returns {undefiend}
	 */
	onError: emptyFn,

	/**
	 * @returns {undefiend}
	 */
	onAfterResponse: emptyFn,

	/**
	 * @param {(boolean|SemantriaApiCallback)} [false] callback
	 *    false - synchronous call; retutn Object
	 *    true  - asynchronous call; retutn Promise
	 *    SemantriaApiCallback - asynchronous call
	 * @returns {Object|Promise|null}
	 */
	getStatus: function(callback) {
		return runApiRequest(this, {
			path: 'status',
			callback: callback
		});
	},

	/**
	 * @param {string}language
	 * @param {(boolean|SemantriaApiCallback)} [false] callback
	 *    false - synchronous call; retutn Array of Objects
	 *    true  - asynchronous call; retutn Promise
	 *    SemantriaApiCallback - asynchronous call
	 * @returns {Object[]|Promise|null}
	 */
	getSupportedFeatures: function(language, callback) {
		return runApiRequest(this, {
			path: 'features',
			getParams: {
				language: language
			},
			callback: callback
		});
	},

	/**
	 * @param {(boolean|SemantriaApiCallback)} [false] callback
	 *    false - synchronous call; retutn Object
	 *    true  - asynchronous call; retutn Promise
	 *    SemantriaApiCallback - asynchronous call
	 * @returns {Object|Promise|null}
	 */
	getSubscription: function(callback) {
		return runApiRequest(this, {
			path: 'subscription',
			callback: callback
		});
	},

	/**
	 * @param {(boolean|SemantriaApiCallback)} [false] callback
	 *    false - synchronous call; retutn Array of Objects
	 *    true  - asynchronous call; retutn Promise
	 *    SemantriaApiCallback - asynchronous call
	 * @returns {Object[]|Promise|null}
	 */
	getStatistics: function(callback) {
		return runApiRequest(this, {
			path: 'statistics',
			callback: callback
		});
	},

	/**
	 * @param {(boolean|SemantriaApiCallback)} [false] callback
	 *    false - synchronous call; retutn Array of Objects
	 *    true  - asynchronous call; retutn Promise
	 *    SemantriaApiCallback - asynchronous call
	 * @returns {Object[]|Promise|null}
	 */
	getConfigurations: function(callback) {
		return runApiRequest(this, {
			path: 'configurations',
			callback: callback
		});
	},

	/**
	 * @param {Object[]} params
	 * @param {(boolean|SemantriaApiCallback)} [false] callback
	 *    false - synchronous call; retutn api response
	 *    true  - asynchronous call; retutn Promise
	 *    SemantriaApiCallback - asynchronous call
	 * @returns {*}
	 */
	addConfigurations: function(params, callback) {
		return runApiRequest(this, {
			method: 'POST',
			path: 'configurations',
			postParams: params,
			callback: callback
		});
	},

	/**
	 * @param {Object[]} params
	 * @param {(boolean|SemantriaApiCallback)} [false] callback
	 *    false - synchronous call; retutn api response
	 *    true  - asynchronous call; retutn Promise
	 *    SemantriaApiCallback - asynchronous call
	 * @returns {*}
	 */
	updateConfigurations: function(params, callback) {
		return runApiRequest(this, {
			method: 'POST',
			path: 'configurations',
			postParams: params,
			callback: callback
		});
	},

	/**
	 * @param {string[]} params
	 * @param {(boolean|SemantriaApiCallback)} [false] callback
	 *    false - synchronous call; retutn api response
	 *    true  - asynchronous call; retutn Promise
	 *    SemantriaApiCallback - asynchronous call
	 * @returns {*}
	 */
	removeConfigurations: function(params, callback) {
		return runApiRequest(this, {
			method: 'DELETE',
			path: 'configurations',
			postParams: params,
			callback: callback
		});
	},

	/**
	 * @param {string|null} [null] configId  - null default configuration
	 * @param {(boolean|SemantriaApiCallback)} [false] callback
	 *    false - synchronous call; retutn api response
	 *    true  - asynchronous call; retutn Promise
	 *    SemantriaApiCallback - asynchronous call
	 * @returns {*}
	 */
	getBlacklist: function(configId, callback) {
		return runApiRequest(this, {
			path: 'blacklist',
			getParams: { config_id: configId },
			callback: callback
		});
	},

	/**
	 * @param {Object[]} params
	 * @param {string|null} [null] configId  - null default configuration
	 * @param {(boolean|SemantriaApiCallback)} [false] callback
	 *    false - synchronous call; retutn api response
	 *    true  - asynchronous call; retutn Promise
	 *    SemantriaApiCallback - asynchronous call
	 * @returns {*}
	 */
	addBlacklist: function(params, configId, callback) {
		return runApiRequest(this, {
			method: 'POST',
			path: 'blacklist',
			getParams: { config_id: configId },
			postParams: params,
			callback: callback
		});
	},

	/**
	 * @param {string[]} params
	 * @param {string|null} [null] configId  - null default configuration
	 * @param {(boolean|SemantriaApiCallback)} [false] callback
	 *    false - synchronous call; retutn api response
	 *    true  - asynchronous call; retutn Promise
	 *    SemantriaApiCallback - asynchronous call
	 * @returns {*}
	 */
	removeBlacklist: function(params, configId, callback) {
		return runApiRequest(this, {
			method: 'DELETE',
			path: 'blacklist',
			getParams: { config_id: configId },
			postParams: params,
			callback: callback
		});
	},

	/**
	 * @param {string|null} [null] configId  - null default configuration
	 * @param {(boolean|SemantriaApiCallback)} [false] callback
	 *    false - synchronous call; retutn api response
	 *    true  - asynchronous call; retutn Promise
	 *    SemantriaApiCallback - asynchronous call
	 * @returns {*}
	 */
	getCategories: function(configId, callback) {
		return runApiRequest(this, {
			path: 'categories',
			getParams: { config_id: configId },
			callback: callback
		});
	},

	/**
	 * @param {Object[]} params
	 * @param {string|null} [null] configId  - null default configuration
	 * @param {(boolean|SemantriaApiCallback)} [false] callback
	 *    false - synchronous call; retutn api response
	 *    true  - asynchronous call; retutn Promise
	 *    SemantriaApiCallback - asynchronous call
	 * @returns {*}
	 */
	addCategories: function(params, configId, callback) {
		return runApiRequest(this, {
			method: 'POST',
			path: 'categories',
			getParams: { config_id: configId },
			postParams: params,
			callback: callback
		});
	},

	/**
	 * @param {Object[]} params
	 * @param {string|null} [null] configId  - null default configuration
	 * @param {(boolean|SemantriaApiCallback)} [false] callback
	 *    false - synchronous call; retutn api response
	 *    true  - asynchronous call; retutn Promise
	 *    SemantriaApiCallback - asynchronous call
	 * @returns {*}
	 */
	updateCategories: function(params, configId, callback) {
		return runApiRequest(this, {
			method: 'POST',
			path: 'categories',
			getParams: { config_id: configId },
			postParams: params,
			callback: callback
		});
	},

	/**
	 * @param {string[]} params
	 * @param {string|null} [null] configId  - null default configuration
	 * @param {(boolean|SemantriaApiCallback)} [false] callback
	 *    false - synchronous call; retutn api response
	 *    true  - asynchronous call; retutn Promise
	 *    SemantriaApiCallback - asynchronous call
	 * @returns {*}
	 */
	removeCategories: function(params, configId, callback) {
		return runApiRequest(this, {
			method: 'DELETE',
			path: 'categories',
			getParams: { config_id: configId },
			postParams: params,
			callback: callback
		});
	},

	/**
	 * @param {string|null} [null] configId  - null default configuration
	 * @param {(boolean|SemantriaApiCallback)} [false] callback
	 *    false - synchronous call; retutn api response
	 *    true  - asynchronous call; retutn Promise
	 *    SemantriaApiCallback - asynchronous call
	 * @returns {*}
	 */
	getQueries: function(configId, callback) {
		return runApiRequest(this, {
			path: 'queries',
			getParams: { config_id: configId },
			callback: callback
		});
	},

	/**
	 * @param {Object[]} params
	 * @param {string|null} [null] configId  - null default configuration
	 * @param {(boolean|SemantriaApiCallback)} [false] callback
	 *    false - synchronous call; retutn api response
	 *    true  - asynchronous call; retutn Promise
	 *    SemantriaApiCallback - asynchronous call
	 * @returns {*}
	 */
	addQueries: function(params, configId, callback) {
		return runApiRequest(this, {
			method: 'POST',
			path: 'queries',
			getParams: { config_id: configId },
			postParams: params,
			callback: callback
		});
	},

	/**
	 * @param {Object[]} params
	 * @param {string|null} [null] configId  - null default configuration
	 * @param {(boolean|SemantriaApiCallback)} [false] callback
	 *    false - synchronous call; retutn api response
	 *    true  - asynchronous call; retutn Promise
	 *    SemantriaApiCallback - asynchronous call
	 * @returns {*}
	 */
	updateQueries: function(params, configId, callback) {
		return runApiRequest(this, {
			method: 'POST',
			path: 'queries',
			getParams: { config_id: configId },
			postParams: params,
			callback: callback
		});
	},

	/**
	 * @param {string[]} params
	 * @param {string|null} [null] configId  - null default configuration
	 * @param {(boolean|SemantriaApiCallback)} [false] callback
	 *    false - synchronous call; retutn api response
	 *    true  - asynchronous call; retutn Promise
	 *    SemantriaApiCallback - asynchronous call
	 * @returns {*}
	 */
	removeQueries: function(params, configId, callback) {
		return runApiRequest(this, {
			method: 'DELETE',
			path: 'queries',
			getParams: { config_id: configId },
			postParams: params,
			callback: callback
		});
	},

	/**
	 * @param {string|null} [null] configId  - null default configuration
	 * @param {(boolean|SemantriaApiCallback)} [false] callback
	 *    false - synchronous call; retutn api response
	 *    true  - asynchronous call; retutn Promise
	 *    SemantriaApiCallback - asynchronous call
	 * @returns {*}
	 */
	getEntities: function(configId, callback) {
		return runApiRequest(this, {
			path: 'entities',
			getParams: { config_id: configId },
			callback: callback
		});
	},

	/**
	 * @param {Object[]} params
	 * @param {string|null} [null] configId  - null default configuration
	 * @param {(boolean|SemantriaApiCallback)} [false] callback
	 *    false - synchronous call; retutn api response
	 *    true  - asynchronous call; retutn Promise
	 *    SemantriaApiCallback - asynchronous call
	 * @returns {*}
	 */
	addEntities: function(params, configId, callback) {
		return runApiRequest(this, {
			method: 'POST',
			path: 'entities',
			getParams: { config_id: configId },
			postParams: params,
			callback: callback
		});
	},

	/**
	 * @param {Object[]} params
	 * @param {string|null} [null] configId  - null default configuration
	 * @param {(boolean|SemantriaApiCallback)} [false] callback
	 *    false - synchronous call; retutn api response
	 *    true  - asynchronous call; retutn Promise
	 *    SemantriaApiCallback - asynchronous call
	 * @returns {*}
	 */
	updateEntities: function(params, configId, callback) {
		return runApiRequest(this, {
			method: 'POST',
			path: 'entities',
			getParams: { config_id: configId },
			postParams: params,
			callback: callback
		});
	},

	/**
	 * @param {string[]} params
	 * @param {string|null} [null] configId  - null default configuration
	 * @param {(boolean|SemantriaApiCallback)} [false] callback
	 *    false - synchronous call; retutn api response
	 *    true  - asynchronous call; retutn Promise
	 *    SemantriaApiCallback - asynchronous call
	 * @returns {*}
	 */
	removeEntities: function(params, configId, callback) {
		return runApiRequest(this, {
			method: 'DELETE',
			path: 'entities',
			getParams: { config_id: configId },
			postParams: params,
			callback: callback
		});
	},

	/**
	 * @param {string|null} [null] configId  - null default configuration
	 * @param {(boolean|SemantriaApiCallback)} [false] callback
	 *    false - synchronous call; retutn api response
	 *    true  - asynchronous call; retutn Promise
	 *    SemantriaApiCallback - asynchronous call
	 * @returns {*}
	 */
	getPhrases: function(configId, callback) {
		return runApiRequest(this, {
			path: 'phrases',
			getParams: { config_id: configId },
			callback: callback
		});
	},

	/**
	 * @param {Object[]} params
	 * @param {string|null} [null] configId  - null default configuration
	 * @param {(boolean|SemantriaApiCallback)} [false] callback
	 *    false - synchronous call; retutn api response
	 *    true  - asynchronous call; retutn Promise
	 *    SemantriaApiCallback - asynchronous call
	 * @returns {*}
	 */
	addPhrases: function(params, configId, callback) {
		return runApiRequest(this, {
			method: 'POST',
			path: 'phrases',
			getParams: { config_id: configId },
			postParams: params,
			callback: callback
		});
	},

	/**
	 * @param {Object[]} params
	 * @param {string|null} [null] configId  - null default configuration
	 * @param {(boolean|SemantriaApiCallback)} [false] callback
	 *    false - synchronous call; retutn api response
	 *    true  - asynchronous call; retutn Promise
	 *    SemantriaApiCallback - asynchronous call
	 * @returns {*}
	 */
	updatePhrases: function(params, configId, callback) {
		return runApiRequest(this, {
			method: 'POST',
			path: 'phrases',
			getParams: { config_id: configId },
			postParams: params,
			callback: callback
		});
	},

	/**
	 * @param {string[]} params
	 * @param {string|null} [null] configId  - null default configuration
	 * @param {(boolean|SemantriaApiCallback)} [false] callback
	 *    false - synchronous call; retutn api response
	 *    true  - asynchronous call; retutn Promise
	 *    SemantriaApiCallback - asynchronous call
	 * @returns {*}
	 */
	removePhrases: function(params, configId, callback) {
		return runApiRequest(this, {
			method: 'DELETE',
			path: 'phrases',
			getParams: { config_id: configId },
			postParams: params,
			callback: callback
		});
	},

	/**
	 * @param {Object} doc
	 * @param {string|null} [null] configId  - null default configuration
	 * @param {(boolean|SemantriaApiCallback)} [false] callback
	 *    false - synchronous call; retutn api response
	 *    true  - asynchronous call; retutn Promise
	 *    SemantriaApiCallback - asynchronous call
	 * @returns {*}
	 */
	queueDocument: function(doc, configId, callback) {
		return runApiRequest(this, {
			method: 'POST',
			path: 'document',
			getParams: { config_id: configId },
			postParams: doc,
			callAfterResponseHook: true,
			callback: callback
		});
	},

	/**
	 * @param {Object[]} batch
	 * @param {string|null} [null] configId  - null default configuration
	 * @param {(boolean|SemantriaApiCallback)} [false] callback
	 *    false - synchronous call; retutn api response
	 *    true  - asynchronous call; retutn Promise
	 *    SemantriaApiCallback - asynchronous call
	 * @returns {*}
	 */
	queueBatchOfDocuments: function(batch, configId, callback) {
		return runApiRequest(this, {
			method: 'POST',
			path: 'document/batch',
			getParams: { config_id: configId },
			postParams: batch,
			callAfterResponseHook: true,
			callback: callback
		});
	},

	/**
	 * @param {Object} collection
	 * @param {string|null} [null] configId  - null default configuration
	 * @param {(boolean|SemantriaApiCallback)} [false] callback
	 *    false - synchronous call; retutn api response
	 *    true  - asynchronous call; retutn Promise
	 *    SemantriaApiCallback - asynchronous call
	 * @returns {*}
	 */
	queueCollection: function(collection, configId, callback) {
		return runApiRequest(this, {
			method: 'POST',
			path: 'collection',
			getParams: { config_id: configId },
			postParams: collection,
			callAfterResponseHook: true,
			callback: callback
		});
	},

	/**
	 * @param {string} id
	 * @param {string|null} [null] configId  - null default configuration
	 * @param {(boolean|SemantriaApiCallback)} [false] callback
	 *    false - synchronous call; retutn api response
	 *    true  - asynchronous call; retutn Promise
	 *    SemantriaApiCallback - asynchronous call
	 * @returns {*}
	 */
	getDocument: function(id, configId, callback) {
		if(!id) {
			throw "Specified document's ID is empty";
		}

		return runApiRequest(this, {
			path: 'document/' + id,
			getParams: { config_id: configId },
			callAfterResponseHook: true,
			callback: callback
		});
	},

	/**
	 * @param {string} id
	 * @param {string|null} [null] configId  - null default configuration
	 * @param {(boolean|SemantriaApiCallback)} [false] callback
	 *    false - synchronous call; retutn api response
	 *    true  - asynchronous call; retutn Promise
	 *    SemantriaApiCallback - asynchronous call
	 * @returns {*}
	 */
	getCollection: function(id, configId, callback) {
		if(!id) {
			throw "Specified document's ID is empty";
		}

		return runApiRequest(this, {
			path: 'collection/' + id,
			getParams: { config_id: configId },
			callback: callback
		});
	},

	/**
	 * @param {string} id
	 * @param {string|null} [null] configId  - null default configuration
	 * @param {(boolean|SemantriaApiCallback)} [false] callback
	 *    false - synchronous call; retutn api response
	 *    true  - asynchronous call; retutn Promise
	 *    SemantriaApiCallback - asynchronous call
	 * @returns {*}
	 */
	cancelDocument: function(id, configId, callback) {
		if (!id) {
			throw "Specified document's ID is empty";
		}

		return runApiRequest(this, {
			method: 'DELETE',
			path: 'document/' + id,
			getParams: { config_id: configId },
			callback: callback
		});
	},

	/**
	 * @param {string} id
	 * @param {string|null} [null] configId  - null default configuration
	 * @param {(boolean|SemantriaApiCallback)} [false] callback
	 *    false - synchronous call; retutn api response
	 *    true  - asynchronous call; retutn Promise
	 *    SemantriaApiCallback - asynchronous call
	 * @returns {*}
	 */
	cancelCollection: function(id, configId, callback) {
		if (!id) {
			throw "Specified document's ID is empty";
		}

		return runApiRequest(this, {
			method: 'DELETE',
			path: 'collection/' + id,
			getParams: { config_id: configId },
			callback: callback
		});
	},

	/**
	 * @param {string|null} [null] configId  - null default configuration
	 * @param {(boolean|SemantriaApiCallback)} [false] callback
	 *    false - synchronous call; retutn api response
	 *    true  - asynchronous call; retutn Promise
	 *    SemantriaApiCallback - asynchronous call
	 * @returns {*}
	 */
	getProcessedDocuments: function(configId, callback) {
		return runApiRequest(this, {
			path: 'document/processed',
			getParams: { config_id: configId },
			callback: callback
		});
	},

	/**
	 * @param jobId
	 * @param {(boolean|SemantriaApiCallback)} [false] callback
	 *    false - synchronous call; retutn api response
	 *    true  - asynchronous call; retutn Promise
	 *    SemantriaApiCallback - asynchronous call
	 * @returns {*}
	 */
	getProcessedDocumentsByJobId: function(jobId, callback) {
		return runApiRequest(this, {
			path: 'document/processed',
			getParams: { job_id: jobId },
			callback: callback
		});
	},

	/**
	 * @param configId
	 * @param {(boolean|SemantriaApiCallback)} [false] callback
	 *    false - synchronous call; retutn api response
	 *    true  - asynchronous call; retutn Promise
	 *    SemantriaApiCallback - asynchronous call
	 * @returns {*}
	 */
	getProcessedCollections: function(configId, callback) {
		return runApiRequest(this, {
			path: 'collection/processed',
			getParams: { config_id: configId },
			callback: callback
		});
	},

	/**
	 * @param jobId
	 * @param {(boolean|SemantriaApiCallback)} [false] callback
	 *    false - synchronous call; retutn api response
	 *    true  - asynchronous call; retutn Promise
	 *    SemantriaApiCallback - asynchronous call
	 * @returns {*}
	 */
	getProcessedCollectionsByJobId: function(jobId, callback) {
		return runApiRequest(this, {
			path: 'collection/processed',
			getParams: { job_id: jobId },
			callback: callback
		});
	}
}

exports.Session = Session;
