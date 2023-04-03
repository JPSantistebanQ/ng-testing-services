import { TestBed } from '@angular/core/testing';

import { MapsService } from './maps.service';

describe('MapsService', () => {
    let service: MapsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [MapsService],
        });
        service = TestBed.inject(MapsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('Test for getCurrentPosition', () => {
        it('should save the center', () => {
            spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake(
                (success) => {
                    const position = {
                        coords: {
                            latitude: 10,
                            longitude: 20,
                            accuracy: 30,
                            altitude: 40,
                            altitudeAccuracy: 50,
                            heading: 60,
                            speed: 70,
                        },
                        timestamp: 70,
                    };
                    success(position);
                }
            );

            service.getCurrentPosition();
            expect(
                navigator.geolocation.getCurrentPosition
            ).toHaveBeenCalledTimes(1);
            expect(service.center.lat).toEqual(10);
            expect(service.center.lng).toEqual(20);
            expect(service.center).toEqual({ lat: 10, lng: 20 });
        });
    });
});
