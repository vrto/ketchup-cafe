/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    initialize: function() {
        this.bindEvents();

        var self = this;

        self.centerY = 500;
        self.centerX = 500;
        self.ketchup = {
            y: self.centerY,
            x: self.centerX
        };
        self.highYboundary = 1000;
        self.lowYboundary = 0;
        self.speed = 10;
        self.shift = 10;
        self.oldCoordinates = {};

        window.setInterval(function() {
            var accelerometerError = function() {
                console.log('Daebalo sa to');
            };

            var accelerometerSuccess = function(acceleration) {
                var newCoordinates = {
                    x: acceleration.x,
                    y: acceleration.y,
                    z: acceleration.z
                };
                //self.accelerometerSuccess(self.oldCoordinates, newCoordinates);
                var info = 'X: ' + acceleration.x + ' Y: ' + acceleration.y + ' Z: ' + acceleration.z;
                $('#debug-info').val(info);
                self.oldCoordinates = newCoordinates;
            };

            console.log('calling accelerometer');
            navigator.accelerometer.getCurrentAcceleration(accelerometerSuccess, accelerometerError);
        }, 100);
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    },
    accelerometerSuccess: function(oldCoordinates, newCoordinates) {
        var deltaY = abs(oldCoordinates.y - newCoordinates.y);

        var y = 0;
        var small = 100;

        if (deltaY < small) {
            if (self.ketchup.y > self.centerY) {
                //TODO smooth animation yo
                self.ketchup.y = self.centerY;
            } else {
                self.ketchup.y = self.centerY;
            }
        } else {

            if( !(self.ketchup.y > self.highYboundary) && !(self.ketchup.y > self.lowYboundary) ){

                if( oldCoordinates.y < newCoordinates.y) {
                    self.ketchup.y += deltaY / self.speed * self.shift;
                } else {
                    self.ketchup.y -= deltaY / self.speed * self.shift;
                }
            }

        }

        console.log('x: ' + self.ketchup.x);
        console.log('y: ' + self.ketchup.y);
        $('#ketchup').css('transform', 'translate(' + self.ketchup.x + 'px, ' + self.ketchup.y + 'px)');

    }
};

app.initialize();