///ts:ref=Module
/// <reference path="../Module.ts"/> ///ts:ref:generated

module be.vmm.eenvplus.config {
    'use strict';

    export var keycloak = {
        url: location.protocol + '${auth_url}',
        realm: 'gsc',
        clientId: 'gsc-geoloket'
    };

}
