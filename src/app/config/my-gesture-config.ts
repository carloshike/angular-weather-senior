import { Injectable } from '@angular/core';
import { GestureConfig } from '@angular/material';

@Injectable()
export class MyGestureConfig extends GestureConfig {
    buildHammer(element: HTMLElement) {
        let mc = <any>super.buildHammer(element);
        
	mc.set({ touchAction: "pan-y" });

        mc.get('swipe').set({ velocity: 0.3, threshold: 10 });

        return mc;
    }
}