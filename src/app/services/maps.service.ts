import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class MapsService {
    center = { lat: 0, lng: 0 };
    constructor() {}

    /* getCurrentPosition() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (resp) => {
                    resolve({
                        lat: resp.coords.latitude,
                        lng: resp.coords.longitude,
                    });
                },
                (err) => {
                    reject(err);
                }
            );
        });
    } */
    getCurrentPosition() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.center = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
        });
    }
}
