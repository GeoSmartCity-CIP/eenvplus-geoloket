/*! gsc - v0.1.7 - 2016-05-06
* https://github.com/GeoSmartCity-CIP/gsc-client
* Copyright (c) 2016; Licensed  EUPL-1.1 */
'use strict';

/**
 * @namespace gsc
 */
var gsc = (function() {

  /**
   * Version number
   *
   * @type {String}
   * @private
   * @requires OpenLayers-3.13.1
   */
  var _version = '0.1.0';

  /**
   * URL of the GSC Datacatalog instance the API is working against
   * @type {String}
   * @private
   */
  var _dcUrl = 'http://hub.geosmartcity.eu/' +
    'gsc-datacatalogue/datacatalogservlet';

  /**
   * 'gsc' is the root object of the gsc.js library and the only variable to
   * be introduced into the global namespace.
   *
   * @exports gsc
   * @memberof gsc
   */
  var mod = {};

  /**
   * Version number of the s4a.js library
   * @type {Number}
   */
  mod.version = _version;

  /**
   * Get or set GSC Datacatalog URL. If a parameter is supplied,
   * it is assumed to be a valid URL to the web service end-point of
   * a GSC Datacatalogue instance.
   *
   * If no parameter is provided, the function will return the currently
   * configured URL.
   *
   * @param {String} [dcUrl] URL to working instance of GSC Datacatalogue
   * @return {String} URL of GSC Datacatalogue instance web service end-point
   */
  mod.dcUrl = function(dcUrl) {
    if (dcUrl !== undefined) {
      _dcUrl = dcUrl;
    }
    return _dcUrl;
  };

  /**
   * Execute a HTTP post request and return the resulting promise
   *
   * @param {String} actionName Name of action to invoke
   * @param {Object} requestData  A JSON object with the parameters to send to the web service
   * @return {Promise.<Object>} a jQuery promise object
   */
  mod.doPost = function(actionName,
    requestData) {
    return jQuery.post(gsc.dcUrl(), {
      actionName: actionName,
      request: JSON.stringify(requestData)
    }, null, 'json');
  };

  return mod;

}());

'use strict';

gsc.cs = (function() {
  /**
   *
   * @exports gsc/cs
   */
  var mod = {};

  mod._csUrl = 'http://geo.mapshakers.com:8080/CrowdSourcing';

  /**
   * Get or set GSC CrowdSourcing URL. If a parameter is supplied,.
   *
   * If no parameter is provided, the function will return the currently
   * configured URL.
   *
   * @param {String} [csUrl] URL to working instance of GSC CrowdSourcing Servlet
   * @return {String} URL of GSC CrowdSourcing instance web service end-point
   */
  mod.csUrl =  function(csUrl) {
    if (csUrl !== undefined) {
      mod._csUrl = csUrl;
    }
    return mod._csUrl;
  };

  /**
   * Receive a config file
   *
   * @return {Promise.<Object>} a jQuery promise object
   */
  mod.getConfig = function() {
    return this.doPost_('/config', null);
  };

  /**
   * Login to cs API
   *
   * @param {JSON} data (Username and Password)
   * @return {Promise.<Object>} a jQuery promise object
   */
  mod.login = function(data) {
    return this.doPost_('/login', data);
  };

  /**
   * Create a comment
   *
   * @param {JSON} data The JSON data object
   * @param {String} uuid Identification string of event
   * @return {Promise.<Object>} a jQuery promise object
   */
  mod.eventComment =  function(data, uuid) {
    return this.doPost_('/event/comment/' + uuid, data);
  };

  /**
   * Update an event
   *
   * @param {JSON} data The JSON data object
   * @return {Promise.<Object>} a jQuery promise object
   */
  mod.eventUpdate =  function(data) {
    return this.doPost_('/event/change', data);
  };

  /**
   * Create an event
   *
   * @param {FormData} formdata The FormData object (JSON + attachment)
   * @return {Promise.<Object>} a jQuery promise object
   */
  mod.eventCreate =  function(formdata) {
    return this.doPostFormData_('/event/create', formdata);
  };

  /**
   * Filter list
   **
   * @param {JSON} data The JSON data object
   * @return {Promise.<Object>} a jQuery promise object
   */
  mod.eventListFilter =  function(data) {
    return this.doPost_('/event/list', data);
  };

  /**
   * send POST requests
   *
   * @private
   * @param {String} urlPart - Service url.
   * @param {Object} data The JSON data object
   * @return {Promise.<Object>} a jQuery promise object
   *
   */
  mod.doPost_ =  function(urlPart, data) {
    return $.ajax({
      url: mod._csUrl + '/' + urlPart ,
      type: 'POST',
      data: JSON.stringify(data),
      dataType: 'json'
    });
  };

  /**
   * send POST formdata requests
   *
   * @private
   * @param {String} urlPart - Service url.
   * @param {FormData} formData The JSON data object
   * @return {Promise.<Object>} a jQuery promise object
   *
   */
  mod.doPostFormData_ =  function(urlPart, formData) {
    return $.ajax({
      url: mod._csUrl + '/' + urlPart ,
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false
    });
  };

  return mod;

}());

'use strict';

gsc.dataset = (function() {
  /**
   * @exports gsc/dataset
   */
  var mod = {};

  /**
   * Delete a data source
   *
   * @param {Number} dataSetId - Id of dataset
   * @return {Promise} Response
   */
  mod.delete = function(dataSetId) {

    return gsc.doPost('deletedataset', {
      iddataset: dataSetId
    });

  };

  /**
   * List/search for data sets
   *
   * @param {Number} [dataSourceId] - Id of data source to retrieve data sets for
   * @param {Number} [dataSetId] - Id of data set to retrieve
   * @param {String} [dataSetName] - Name or part of data set name to search for
   * @return {Promise} Data set response
   */
  mod.list = function(dataSourceId,
          dataSetId,
          dataSetName) {

    var params = {};

    if (dataSourceId !== undefined) {
      params.iddatasource = dataSourceId;
    }

    if (dataSetId !== undefined) {
      params.iddataset = dataSetId;
    }

    if (dataSetName !== undefined) {
      params.datasetname = dataSetName;
    }

    return gsc.doPost('listdataset', params);

  };

  /**
   * Create a new data set
   *
   * @param {String} dataSetName - Name of data set
   * @param {String} realName - Real name, i.e. file name of data set
   * @param {Number} dataSourceId - Id of data source that data set is based on
   * @param {String} description - Description of data set
   * @param {Boolean} [toBeIngested=false] - To be ingested
   * @param {Number} [refreshInterval=-1] - Refresh interval in minutes
   * @param {String} [url=null] - URL
   * @return {Promise.<Object>} Data set response
   */
  mod.create = function(dataSetName,
          realName,
          dataSourceId,
          description,
          toBeIngested,
          refreshInterval,
          url
          ) {
    if (toBeIngested === undefined) {
      toBeIngested = false;
    }

    if (refreshInterval === undefined) {
      refreshInterval = -1;
    }

    if (url === undefined) {
      url = '';
    }

    var params = {
      datasetname: dataSetName,
      realname: realName,
      iddatasource: dataSourceId,
      description: description,
      tobeingested: toBeIngested,
      refreshinterval: refreshInterval,
      url: url
    };

    return gsc.doPost('createdataset', params);

  };

  /**
   * Update a data set
   *
   * @param {Number} dataSetId - Id of data set to update
   * @param {String} dataSetName - Name of data set
   * @param {String} realName - Real name of data set
   * @param {Number} dataSourceId - Data source the data set is based on
   * @param {String} description - Description of data set
   * @param {Boolean} [toBeIngested=false] - Flag indicating whether data set is to be ingested
   * @param {Number} [refreshInterval=-1] - Refresh interval in minutes
   * @param {String} [url=null] - URL
   * @return {Promise.<Object>} Update data set response
   */
  mod.update = function(
          dataSetId,
          dataSetName,
          realName,
          dataSourceId,
          description,
          toBeIngested,
          refreshInterval,
          url
          ) {

    if (toBeIngested === undefined) {
      toBeIngested = false;
    }

    if (refreshInterval === undefined) {
      refreshInterval = -1;
    }

    if (url === undefined) {
      url = '';
    }

    var params = {
      iddataset: dataSetId,
      datasetname: dataSetName,
      realname: realName,
      iddatasource: dataSourceId,
      description: description,
      tobeingested: toBeIngested,
      refreshinterval: refreshInterval,
      url: url
    };

    return gsc.doPost('updatedataset', params);

  };

  /**
   * List columns of data set
   *
   * @param {Number} dataSetId - Identifier of dataset
   * @return {Promise.<Object>} Data set response
   */
  mod.listCols = function(dataSetId) {
    return gsc.doPost('listcols', {
      iddataset: dataSetId
    });
  };

  /**
   * Update column metadata
   *
   * @param {Number} dataSetId - Identifier of data set to update column metadata for
   * @param {Object[]} columnList - List of column objects
   * @returns {Promise.<Object>}
   */
  mod.updateCols = function(dataSetId, columnList) {
    return gsc.doPost('updcolsmetadata', {
      iddataset: dataSetId,
      columns: columnList
    });
  };

  mod.createCron = function(dataSetId) {
    return gsc.doPost('createcron', {
    });
  };

  return mod;
}());

'use strict';

gsc.datasource = (function() {

  /**
   * @exports gsc/datasource
   */
  var mod = {};

  /**
   * Datasource type enumeration
   * @readonly
   * @enum {string}
   */
  mod.DatasourceType = {
    /**
     * Oracle database
     * @type {String}
     */
    ORACLE: 'Oracle',
    /**
     * ESRI Shapefile
     * @type {String}
     */
    SHAPE: 'Shape',
    /**
     * PostgreSQL+PostGIS database
     * @type {String}
     */
    POSTGIS: 'PostGIS'
  };

  /**
   * Datasource object
   *
   * @property {string} datasourcename - Indicates whether the Courage component is present.
   * @property {number} organization - Indicates whether the Power component is present.
   * @property {gsc.datasource.DatasourceType} type - Indicates whether the Wisdom component is present.
   * @property {string} description - A description of the data source
   * @property {string} updated - Time and date when the source was updated
   * @property {string} [url] - URL of remote datasource
   * @property {string} [username] - Username for database
   * @property {string} [password] - Password for database
   * @property {string} [ipaddress] - IP address of local database connection
   * @property {number} [port] - Port number of database connection
   * @property {string} [path] - Path to local datasource directory, name of database
   * @class
   */
  mod.Datasource = function() {

  };

  /**
   * Create datasource
   *
   * @param {String} datasourcename [description]
   * @param {String} organization [description]
   * @param {gsc.datasource.DatasourceType} type [description]
   * @param {String} description [description]
   * @param {String} updated [description]
   * @param {String} url [description]
   * @param {String} username [description]
   * @param {String} password [description]
   * @param {String} ipaddress [description]
   * @param {String} schema [description]
   * @param {String} port [description]
   * @param {String} path [description]
   * @return {Promise.<gsc.datasource.DataSource>} [description]
   * @public
   */
  mod.create = function(datasourcename,
    organization,
    type,
    description,
    updated,
    url,
    username,
    password,
    ipaddress,
    schema,
    port,
    path) {

    return gsc.doPost('createdatasrc', {
      datasourcename: datasourcename,
      organization: organization,
      type: type,
      description: description,
      updated: updated,
      url: url,
      username: username,
      password: password,
      ipaddress: ipaddress,
      schema: schema,
      port: port,
      path: path
    });

  };

  /**
   * List datasources - one of datasourceId or organization must be specified.
   * Organization may be combined with (partial) datasourceName queries
   *
   * @param {Number} [datasourceId=null] Identifier of datasource to be retrieved
   * @param {Number} [organization=null] Whether to include details
   * @param {String} [datasourceName=null] Name or partial name of datasource
   * @param {Boolean} [includeDetail=false] Whether to include details
   * @return {Promise.<Object>} A list of datasource objects
   */
  mod.list = function(
    datasourceId,
    organization,
    datasourceName,
    includeDetail) {

    var params = {};

    if (includeDetail === undefined) {
      includeDetail = false;
    }

    params.detail = includeDetail;

    if (!gsc.util.isNull(datasourceId)) {
      params.iddatasource = datasourceId;
    }

    if (!gsc.util.isNull(datasourceName)) {
      params.datasourcename = datasourceName;
    }

    if (!gsc.util.isNull(organization)) {
      params.organization = organization;
    }

    if (params.iddatasource === undefined &&
      params.organization === undefined) {
      return gsc.util.errorPromise(
        'Parameter datasourceId or organization must be present in request');
    }

    return gsc.doPost('listdatasrc', params);
  };

  /**
   * Delete datasource
   *
   * @param {number} datasourceId - Identifier of datasource to be deleted
   * @return {Promise.<Object>} The deleted datasource
   */
  mod.delete = function(datasourceId) {
    return gsc.doPost('deletedatasrc', {
      iddatasource: datasourceId
    });
  };

  /**
   * Update datasource
   *
   * @param {number} datasourceId [description]
   * @param {String} datasourcename [description]
   * @param {String} organization [description]
   * @param {gsc.datasource.DatasourceType} type [description]
   * @param {String} description [description]
   * @param {String} updated [description]
   * @param {String} url [description]
   * @param {String} username [description]
   * @param {String} password [description]
   * @param {String} ipaddress [description]
   * @param {String} schema [description]
   * @param {String} port [description]
   * @param {String} path [description]
   * @return {Promise.<Response>} [description]
   */
  mod.update = function(datasourceId,
    datasourcename,
    organization,
    type,
    description,
    updated,
    url,
    username,
    password,
    ipaddress,
    schema,
    port,
    path) {
    return gsc.doPost('updatedatasrc', {
      iddatasource: datasourceId,
      datasourcename: datasourcename,
      organization: organization,
      type: type,
      description: description,
      updated: updated,
      url: url,
      username: username,
      password: password,
      ipaddress: ipaddress,
      schema: schema,
      port: port,
      path: path
    });
  };

  /**
   * List data source origin?
   *
   * @param {number} datasourceId The id of the data source to list origin for
   * @return {Promise.<Response>} A response object
   */
  mod.listDataOrigin = function(datasourceId) {

    return gsc.doPost('listdataorigin', {
      iddatasource: datasourceId
    });

  };

  return mod;

}());

'use strict';

var gsc = gsc || {};

gsc.geocode = gsc.geocode || {};

/**
 * Get a list of coordinates for a name
 *
 * @param {String[]} geonames An array of one or more geonames
 */
gsc.geocode.geocode = function(geonames) {

  // pseudo code
  // lookup coordinate based on name

  return [{
    name: 'Brussels',
    lon: 1,
    lat: 2,
    match: 50 // percent
  }];

};

/**
 * Get a list of names for a coordinate
 *
 * @param {Number} lat Latitude
 * @param {Number} lon Longitude
 * @param {Number} srs Spatial reference system code (EPSG)
 */
gsc.geocode.reverseGeocode = function(lat, lon, srs) {

  // pseudo code
  // lookup name based on location

  return [{
    name: 'Brussels',
    lon: 1,
    lat: 2,
    distance: 100 // meters
  }];

};

'use strict';

var gsc = gsc || {};

/**
 * Response object
 *
 * @param {string} [status] [description]
 * @param {string} [description] [description]
 *
 * @property {string} status - Whether the request was successful (done) or failed (error)
 * @property {string} description - Any error or status message
 * @property {Object} request - The request object
 * @property {number} [id] - Identifier of inserted object, only available on create statements
 * @class
 * @memberof gsc
 */
gsc.Response = function(status, description) {

  if (status === undefined) {
    status = 'error';
  }

  if (description === undefined) {
    description = '';
  }

  return {
    status: status,
    description: description
  };

};

'use strict';

gsc.layer = (function() {

  /**
   * @exports gsc/layer
   */
  var mod = {};

  /**
   * Create a new layer
   *
   * @param {String} layerName - The name of the layer
   * @param {Number} dataSetId - The identifier of the data set the layer is based on
   * @param {String} description - A description of the layer
   * @param {String} metadataFile - Metadata XML
   * @param {String} sld - SLD XML
   * @returns {Promise.<Object>}
   */
  mod.create = function(layerName,
      dataSetId,
      description,
      metadataFile,
      sld) {

    return gsc.doPost('createlyr', {
      layername: layerName,
      iddataset: dataSetId,
      description: description,
      metadatafile: metadataFile,
      sld: sld
    });

  };

  /**
   * Update a layer new layer
   *
   * @param {type} layerId - The identifier of the layer to update
   * @param {String} layerName - The name of the layer
   * @param {Number} dataSetId - The identifier of the data set the layer is based on
   * @param {String} description - A description of the layer
   * @param {String} metadataFile - Metadata XML
   * @param {String} sld - SLD XML
   * @returns {Promise.<Object>}
   */
  mod.update = function(layerId,
      layerName,
      dataSetId,
      description,
      metadataFile,
      sld) {

    return gsc.doPost('updatelyr', {
      idlayer: layerId,
      layername: layerName,
      iddataset: dataSetId,
      description: description,
      metadatafile: metadataFile,
      sld: sld
    });

  };

  /**
   * Delete a layer
   *
   * @param {Number} layerId - The identifier of the layer to delete
   * @returns {Promise.<Object>}
   */
  mod.delete = function(layerId) {
    return gsc.doPost('deletelyr', {
      idlayer: layerId
    });
  };

  /**
   * Search for layers
   *
   * @param {Number} [dataSetId=null] - The identifier of the data set for which layers should be retrieved
   * @param {type} [layerId=null] - The identifier of the layer that should be retrieved
   * @param {type} [layerName=null] - The name or partial name of layers to be retrieved
   * @returns {jqXHR|!jQuery.jqXHR|Promise.<Object>}
   */
  mod.list = function(dataSetId,
      layerId,
      layerName) {

    var param = {};

    if (dataSetId !== undefined && dataSetId !== null) {
      param.iddataset = dataSetId;
    }

    if (layerId !== undefined && layerId !== null) {
      param.idlayer = layerId;
    }

    if (layerName !== undefined && layerName !== null) {
      param.layername = layerName;
    }

    return gsc.doPost('listlyr', param);

  };

  return mod;

}());

'use strict';

gsc.map = gsc.map || {};

/**
 * Create a map with standard functions (pan,zoom, view layers) and
 * other optional  specific functionality as info on feature and filter
 * on attributes
 *
 * @param {divObject} divObject is the map div
 * @param {mapOptions} mapOptions are the map options
 * @constructor
 */
gsc.map.Map = function(divObject, mapOptions) {
  var _self = this;

  this.layers_ = mapOptions.layers || [];

  var projection = new ol.proj.Projection({
    code: mapOptions.epsg,
    units: mapOptions.units
  });

  var olMap = new ol.Map({
    controls: ol.control.defaults({
          attribution: false
        }),
    layers: _self.layers_,
    target: divObject,
    view: new ol.View({
      projection: projection
    })
  });

  _self.addLayer = function(layer) {
    olMap.addLayer(layer);
    _self.layers_.push(layer);
  };

  _self.getDomElement = function() {
    return $(olMap.getViewport());
  };

  _self.getOlMap = function() {
    return olMap;
  };

  _self.redraw = function() {
    olMap.getLayers().forEach(function(lyr) {
      lyr.redraw();
    });
  };

  _self.removeLayer = function(layer) {
    olMap.removeLayer(layer);
    _self.layers_ = _self.layers_.filter(function(value) {
      return value !== layer;
    });
  };

  _self.fit = function(bounds) {
    olMap.getView().fit(bounds, olMap.getSize());
  };

  _self.addMousePositionControl = function(location) {
    var mousePositionControl = new ol.control.MousePosition({
        className: 'custom-mouse-position',
        target: document.getElementById(location),
        coordinateFormat: ol.coordinate.createStringXY(5),
        undefinedHTML: '&nbsp;'
      });
    olMap.addControl(mousePositionControl);
  };

  _self.addScaleBarControl = function(scalediv) {
    olMap.getView().on('change:resolution', function(evt) {
      var resolution = evt.target.get('resolution');
      var units = olMap.getView().getProjection().getUnits();
      var dpi = 25.4 / 0.28;
      var mpu = ol.proj.METERS_PER_UNIT[units];
      var scale = resolution * mpu * 39.37 * dpi;
      if (scale >= 9500 && scale <= 950000) {
        scale = Math.round(scale / 1000) + 'K';
      } else if (scale >= 950000) {
        scale = Math.round(scale / 1000000) + 'M';
      } else {
        scale = Math.round(scale);
      }
      document.getElementById(scalediv).innerHTML = 'Scale = 1 : ' + scale;
    });
    //fire change resolution event and restore previous configuration
    olMap.getView().setZoom(olMap.getView().getZoom() + 1);
    olMap.getView().setZoom(olMap.getView().getZoom() - 1);
  };

  _self.infoOnFeatureEvent = function(evt) {
    document.getElementById(this.nodelist).innerHTML = 'Loading... please ' +
    'wait...';
    var view = olMap.getView();
    var viewResolution = view.getResolution();
    var source = this.layer.getSource();
    var url = source.getGetFeatureInfoUrl(
      evt.coordinate, viewResolution, view.getProjection(),
      {'INFO_FORMAT': 'text/html',
             'FEATURE_COUNT': this.maxFeaturesNumber
      });
    if (url) {
      document.getElementById(this.nodelist).innerHTML = '<iframe seamless ' +
      'src="' + url + '"></iframe>';
    }
  };

  _self.addInfoOnFeatureEvent = function(nodelist, maxFeaturesNumber, layer) {
    var opts = {
      nodelist: nodelist,
      maxFeaturesNumber: maxFeaturesNumber,
      layer: layer
    };
    olMap.on('singleclick', _self.infoOnFeatureEvent, opts);
  };

  _self.removeInfoOnFeatureEvent = function() {
    olMap.on('singleclick', _self.infoOnFeatureEvent);
  };

  if (mapOptions.bounds) {
    olMap.getView().fit(mapOptions.bounds, olMap.getSize());
  }

  _self.filterOnAttributes = function(filterType, filter) {

    // by default, reset all filters
    var filterParams = {
          'FILTER': null,
          'CQL_FILTER': null,
          'FEATUREID': null
        };
    if (filter.replace(/^\s\s*/, '').replace(/\s\s*$/, '') !== '') {
      if (filterType === 'cql') {
        filterParams.CQL_FILTER = filter;
      }
      if (filterType === 'ogc') {
        filterParams.FILTER = filter;
      }
      if (filterType === 'fid') {
        filterParams.FEATUREID = filter;
      }
    }
    // merge the new filter definitions
    olMap.getLayers().forEach(function(lyr) {
            lyr.getSource().updateParams(filterParams);
          });
  };

  _self.resetFilter = function() {
    _self.filterOnAttributes('cql','');
  };

  return _self;
};

'use strict';
gsc.organization = (function() {

  /**
   * @exports gsc/organization
   */
  var mod = {};

  /**
   * Create a new organization
   *
   * @param {type} organizationname
   * @param {type} description
   * @returns {Promise.<Object>}
   */
  mod.create = function(organizationname, description) {
    return gsc.doPost('createorg', {
      organizationname: organizationname,
      description: description
    });
  };

  /**
   * List/search for organizations
   *
   * @param {type} [organizationname] - Optionally name of organization
   * @returns {Promise.<Object>}
   */
  mod.list = function(organizationname) {
    var param = {};
    if (organizationname !== null && organizationname !== undefined) {
      param.organizationname = organizationname;
    }
    return gsc.doPost('listorg', param);
  };

  /**
   * Delete organization
   *
   * @param {type} organizationId
   * @returns {Promise.<Object>}
   */
  mod.delete = function(organizationId) {
    return gsc.doPost('deleteorg', {
      idorganization: organizationId
    });
  };

  /**
   * Updatea an organization object
   *
   * @param {type} organizationId
   * @param {type} organizationname
   * @param {type} description
   * @returns {jqXHR|!jQuery.jqXHR|Promise.<Object>}
   */
  mod.update = function(organizationId, organizationname, description) {
    return gsc.doPost('updateorg', {
      idorganization: organizationId,
      organizationname: organizationname,
      description: description
    });
  };

  return mod;

}());

'use strict';

gsc.user = (function() {

  /**
   *
   * @exports gsc/user
   */
  var mod = {};

  /**
   * Register a new user
   *
   * @param {String} email [description]
   * @param {String} username [description]
   * @param {String} password [description]
   * @param {String} confirmpassword [description]
   * @param {Object[]} organizations [description]
   * @return {Promise.<Object>} [description]
   */
  mod.register = function(email,
    username,
    password,
    confirmpassword,
    organizations) {

    return gsc.doPost('reguser', {
      email: email,
      username: username,
      password: password,
      confirmpassword: confirmpassword,
      organizations: organizations
    });

  };

  /**
   * Authenticate a user
   *
   * @param {string} username - Username
   * @param {string} password - Password
   * @return {Promise.<Response.<User>>} User object
   */
  mod.login = function(username, password) {
    return gsc.doPost('login', {
      username: username,
      password: password
    });
  };

  /**
   * Delete a user
   *
   * @param {String} username User name
   * @param {String} password Password
   * @return {Promise.<Object>}
   */
  mod.delete = function(username, password) {
    return gsc.doPost('unreguser', {
      username: username,
      password: password
    });
  };

  /**
   * Get a password reminder
   * If both arguments are supplied, email takes presedent
   *
   * @param {string} email - E-mail of user to get reminder for
   * @param {string} username - Username of user to get reminder for
   * @return {Promise} [description]
   */
  mod.remindPassword = function(email, username) {

    var params = {};

    if (email !== undefined && email !== null) {
      params.email = email;
    } else if (username !== undefined && username !== null) {
      params.username = username;
    }

    return gsc.doPost('remindpwd', params);

  };

  /**
   * Change password for user
   *
   * @param {string} username [description]
   * @param {string} oldpassword [description]
   * @param {string} newpassword [description]
   * @param {string} confirmnewpassword [description]
   * @return {Promise} [description]
   */
  mod.changePassword = function(username,
    oldpassword,
    newpassword,
    confirmnewpassword) {

    return gsc.doPost('changepwd', {
      username: username,
      oldpassword: oldpassword,
      newpassword: newpassword,
      confirmnewpassword: confirmnewpassword
    });

  };

  /**
   * Update user
   *
   * @param {number} userId Id of user to update
   * @return {Promise.<Object>} Updated user object
   */
  mod.update = function(userId, email, username, organizations) {

    return gsc.doPost('updateuser', {
      id: userId,
      email: email,
      username: username,
      organizations: organizations
    });

  };

  /**
   * Lock user
   *
   * @param {string} username Username
   * @param {boolean} [lock=true] Boolean flag to lock user
   * @return {Promise.<Object>}
   */
  mod.lock = function(username, lock) {

    if (lock === undefined) {
      lock = true;
    }

    return gsc.doPost('lockuser', {
      username: username,
      lock: lock
    });

  };

  /**
   * Verify registered email
   *
   * @param {number} verificationId Id to confirm - sent to registerred email
   * @return {Promise.<Object>}
   */
  mod.verifyEmail = function(verificationId) {

    return gsc.doPost('verifymail', {
      id: verificationId
    });

  };

  return mod;

}());

'use strict';

var gsc = gsc || {};

gsc.usrdat = gsc.usrdat || {};

/**
 * Store a location to the user profile
 *
 * @param {gsc.usrdat.Location} location A location to store
 * @return {gsc.usrdat.Location} The inserted location
 */
gsc.usrdat.storeLocation = function(location) {

  return {

  };
};

gsc.usrdat.storeRoute = function(route) {

};

'use strict';

gsc.util = gsc.util || {};

/**
 * Returns a resolved promise object
 *
 * @param {string} message [description]
 * @return {Promise.<gsc.Response>} [description]
 * @memberof gsc.util
 */
gsc.util.errorPromise = function(message) {
  var p = jQuery.Deferred();
  p.resolve(new gsc.Response('error', message));
  return p;
};

'use strict';

gsc.util = gsc.util || {};

/**
 * Checks if a variable is an array and contains at least one element
 *
 * @param {Array|Object|null|undefined} arrayCandidate
 * @returns {Boolean} True if array with >= 1 entry, false otherwise
 */
gsc.util.isArrayWithContent = function(arrayCandidate) {
  if (arrayCandidate !== undefined &&
          jQuery.isArray(arrayCandidate) &&
          arrayCandidate.length > 0) {
    return true;
  } else {
    return false;
  }
};

/**
 * Clears an existing array and adds all elements from another array into it.
 * Modifies the targetArray.
 *
 * @param {Object[]} targetArray
 * @param {Object[]} sourceArray
 */
gsc.util.clearExtendArray = function(targetArray, sourceArray) {
  targetArray.length = 0;
  jQuery.extend(targetArray, sourceArray);
};

/**
 * Clears all the properties of the target object and copies the properties
 * from the source object onto the target. Modifies the target object.
 *
 * @param {type} targetObject
 * @param {type} sourceObject
 */
gsc.util.clearExtendObject = function(targetObject, sourceObject) {
  jQuery.each(targetObject, function(key, value) {
    targetObject[key] = undefined;
  });
  jQuery.extend(targetObject, sourceObject);
};

'use strict';
/**
 * @namespace gsc.util
 */

gsc.util = gsc.util || {};

/**
 * Checks whether a response is an error or not
 *
 * @param {Object} response The variable to test
 * @return {Boolean} True if response status is 'error',
 * false if response status is not 'error' or missing
 * @memberof gsc.util
 */
gsc.util.isError = function(response) {

  if (response.status !== undefined && response.status === 'error') {
    return true;
  }

  return false;

};

'use strict';

gsc.util = gsc.util || {};

/**
 * Checks whether a variable is undefined or null
 *
 * @param {Mixed} mvar The variable to test
 * @return {Boolean} True if null, false if non-null
 * @memberof gsc.util
 */
gsc.util.isNull = function(mvar) {

  if (mvar !== undefined && mvar !== null) {
    return false;
  } else {
    return true;
  }

};
