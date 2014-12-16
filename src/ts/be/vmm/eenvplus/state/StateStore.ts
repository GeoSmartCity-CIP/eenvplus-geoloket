///ts:ref=Module
/// <reference path="../Module.ts"/> ///ts:ref:generated

import State = be.vmm.eenvplus.applicationState.State;

module be.vmm.eenvplus {
    'use strict';

    export interface StateStore {
        current:State[];
        currentMode:State;
        currentLevel:State;
        featureSelected:State;
        modeChanged:Trasys.Signals.ITypeSignal<State>;
        levelChanged:Trasys.Signals.ITypeSignal<State>;
    }

    export module StateStore {
        export var NAME:string = PREFIX + 'StateStore';

        var currentMode = State.VIEW,
            currentLevel = State.OVERVIEW,
            store = {
                get current():State[] {
                    return [currentMode, currentLevel, store.featureSelected];
                },
                get currentMode():State {
                    return currentMode;
                },
                set currentMode(value:State) {
                    if (value === currentMode) return;
                    currentMode = value;
                    store.modeChanged.fire(value);
                },
                get currentLevel():State {
                    return currentLevel;
                },
                set currentLevel(value:State) {
                    if (value === currentLevel) return;
                    currentLevel = value;
                    store.levelChanged.fire(value);
                },
                featureSelected: State,
                modeChanged: new Trasys.Signals.TypeSignal(),
                levelChanged: new Trasys.Signals.TypeSignal()
            };

        angular
            .module(MODULE)
            .factory(NAME, factory(store));
    }

}
