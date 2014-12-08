///ts:ref=Mask
/// <reference path="./Mask.ts"/> ///ts:ref:generated
///ts:ref=Module
/// <reference path="../../Module.ts"/> ///ts:ref:generated

module be.vmm.eenvplus.editor.area.featureLayers {
    'use strict';

    export var NAME:string = PREFIX + 'FeatureLayers';

    function configure():ng.IDirective {
        return {
            restrict: 'A',
            controller: FeatureLayersController
        };
    }

    FeatureLayersController.$inject = ['$scope', 'epFeatureManager', 'epFeatureLayerFactory'];

    export function FeatureLayersController(scope:ApplicationScope,
                                            manager:feature.FeatureManager,
                                            featureLayer:feature.FeatureLayerFactory):void {

        /* ------------------ */
        /* --- properties --- */
        /* ------------------ */

        var map:ol.Map = scope.map,
            addLayer = map.addLayer.bind(map),
            removeLayer = map.removeLayer.bind(map),
            featureLayers:ol.layer.Layer[],
            unRegisterModeChange:Function;


        /* -------------------- */
        /* --- construction --- */
        /* -------------------- */

        scope.$on(mask.EVENT.selected, handle(init));
        manager.signal.load.add(createLayers);
        manager.signal.remove.add(removeFromLayer);

        function init(extent:ol.Extent):void {
            manager.load(extent);
            unRegisterModeChange = scope.$on(applicationState.EVENT.modeChange, handle(handleModeChange));
        }


        /* ----------------- */
        /* --- behaviour --- */
        /* ----------------- */

        function createLayers():void {
            featureLayers = _(map.getLayers().getArray())
                .invoke(ol.layer.Base.prototype.get, 'bodId')
                .filter(feature.isEditable)
                .map(feature.toType)
                .map(featureLayer.createLayer)
                .value();
            featureLayers.forEach(addLayer);
        }

        function removeFromLayer(json:feature.model.FeatureJSON):void {
            var layer:ol.layer.Vector = _.where(featureLayers, {values_: {layerBodId: json.layerBodId}})[0],
                feature = _.find(layer.getSource().getFeatures(), {key: json.key});
            layer.getSource().removeFeature(feature);
        }

        function clear():void {
            unRegisterModeChange();
            featureLayers.forEach(removeLayer);
            featureLayers = [];
        }


        /* ---------------------- */
        /* --- event handlers --- */
        /* ---------------------- */

        function handleModeChange(editMode:applicationState.State):void {
            if (editMode === applicationState.State.VIEW) clear();
        }

    }

    angular
        .module(MODULE)
        .directive(NAME, configure);

}
