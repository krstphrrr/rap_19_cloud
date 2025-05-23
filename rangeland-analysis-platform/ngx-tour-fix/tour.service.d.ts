import { Router } from '@angular/router';
import * as ɵngcc0 from '@angular/core';
import { UrlSegment } from '@angular/router';
import { TourAnchorDirective } from './tour-anchor.directive';
import { Subject, Observable } from 'rxjs';
export interface IStepOption {
    stepId?: string;
    anchorId?: string;
    title?: string;
    content?: string;
    route?: string | UrlSegment[];
    nextStep?: number | string;
    prevStep?: number | string;
    placement?: any;
    preventScrolling?: boolean;
    prevBtnTitle?: string;
    nextBtnTitle?: string;
    endBtnTitle?: string;
}
export declare enum TourState {
    OFF = 0,
    ON = 1,
    PAUSED = 2
}
export declare class TourService<T extends IStepOption = IStepOption> {
    private router;
    stepShow$: Subject<T>;
    stepHide$: Subject<T>;
    initialize$: Subject<T[]>;
    start$: Subject<T>;
    end$: Subject<any>;
    pause$: Subject<T>;
    resume$: Subject<T>;
    anchorRegister$: Subject<string>;
    anchorUnregister$: Subject<string>;
    events$: Observable<{
        name: string;
        value: any;
    }>;
    steps: T[];
    currentStep: T;
    anchors: {
        [anchorId: string]: TourAnchorDirective;
    };
    private status;
    private isHotKeysEnabled;
    constructor(router: Router);
    initialize(steps: T[], stepDefaults?: T): void;
    disableHotkeys(): void;
    enableHotkeys(): void;
    start(): void;
    startAt(stepId: number | string): void;
    end(): void;
    pause(): void;
    resume(): void;
    toggle(pause?: boolean): void;
    next(): void;
    hasNext(step: T): boolean;
    prev(): void;
    hasPrev(step: T): boolean;
    goto(stepId: number | string): void;
    register(anchorId: string, anchor: TourAnchorDirective): void;
    unregister(anchorId: string): void;
    getStatus(): TourState;
    isHotkeysEnabled(): boolean;
    private goToStep;
    private loadStep;
    private setCurrentStep;
    private showStep;
    private hideStep;
    static ngInjectableDef: ɵngcc0.ɵɵInjectableDef<TourService<any>>;
}

//# sourceMappingURL=tour.service.d.ts.map