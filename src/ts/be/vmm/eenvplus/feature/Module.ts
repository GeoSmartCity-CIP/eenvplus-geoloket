module be.vmm.eenvplus.feature {
    'use strict';

    export var MODULE:string = PREFIX + '_feature';

    export var EVENT = {
        discardModification : 'discardModification',
        selected: 'featuresSelected'
    };

    goog.provide(MODULE);

    angular.module(MODULE, []);

}
