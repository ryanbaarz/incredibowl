webpackJsonp([1,4],{

/***/ 302:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Model_pin_model__ = __webpack_require__(458);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pinMap__ = __webpack_require__(459);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lodash__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LaneComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LaneComponent = (function () {
    function LaneComponent() {
        this.startingY = 225;
        this.startingX = 125;
        this.pinWidth = 80;
        this.pinHeight = 60;
        this.pinRows = [2, 4, 7]; // these are the pins where new rows start in a traditional bowling layout
    }
    LaneComponent.prototype.ngOnInit = function () {
        this.setPins();
    };
    /**
     * Generates and sets pins with X and Y values to position them in a Pyramid layout
     */
    LaneComponent.prototype.setPins = function () {
        var _this = this;
        var currentX = this.startingX, currentY = this.startingY, probabilities = __WEBPACK_IMPORTED_MODULE_2__pinMap__["a" /* PinMap */].returnMap();
        this.pins = [];
        __WEBPACK_IMPORTED_MODULE_3_lodash__["times"](10, function (n) {
            var pinRowIndex = __WEBPACK_IMPORTED_MODULE_3_lodash__["indexOf"](_this.pinRows, n + 1);
            if (pinRowIndex > -1) {
                currentY -= _this.pinHeight;
                currentX = _this.startingX - ((_this.pinWidth / 2) * (pinRowIndex + 1));
            }
            else if (n !== 0) {
                currentX = currentX += _this.pinWidth;
            }
            _this.pins.push(new __WEBPACK_IMPORTED_MODULE_1__Model_pin_model__["a" /* Pin */]('pin_ ' + (n + 1), currentX, currentY, probabilities[n]));
        });
    };
    /**
     * ballIn is a Number between 1 and 10 that will influence how the pins are knocked down based on the
     * horizontal position of the ball. 1 is left 10 is right 5 and 6 are right in the middle.
     * @param {number} ballIn
     */
    LaneComponent.prototype.knockPinsDown = function (ballIn) {
        var pinsDown = 0;
        __WEBPACK_IMPORTED_MODULE_3_lodash__["each"](this.pins, function (pin) {
            pinsDown += pin.bowlToPin(ballIn);
        });
        return pinsDown;
    };
    LaneComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Component */])({
            selector: 'app-lane',
            template: __webpack_require__(621),
            styles: [__webpack_require__(618)]
        }),
        __metadata("design:paramtypes", [])
    ], LaneComponent);
    return LaneComponent;
}());

//# sourceMappingURL=/Users/rbaarz/home/tmp/incredibowl/incredibowlApp/src/lane.component.js.map

/***/ }),

/***/ 303:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Frame; });

var Frame = (function () {
    function Frame(id, score1, score2, runningTotal) {
        this.id = '';
        this.score1 = '';
        this.score2 = '';
        this.runningTotal = null;
        this.extraBalls = 0;
        this.frameTotal = 0;
        this.frameDone = false;
        this.isLastFrame = false;
        this.id = id;
        this.score1 = score1;
        this.score2 = score2;
        this.runningTotal = runningTotal;
    }
    /**
     * based on which scores have already been recorded on the frame we find out where to
     * record the pinsDown. It also updates the running total for the frame
     *
     * @param {number} pinsDown
     */
    Frame.prototype.addPinsToFrame = function (pinsDown) {
        // This block is to catch any situations where our total goes above 10 for some reason we will fake it in the players favor.
        if (this.frameTotal + pinsDown > 10) {
            pinsDown = 10 - this.frameTotal;
        }
        this.frameTotal += pinsDown;
        if (__WEBPACK_IMPORTED_MODULE_0_lodash__["isEmpty"](this.score1) && pinsDown !== 10) {
            this.score1 = this.getMark(pinsDown, false); // convert pinsDown to string
        }
        else if (__WEBPACK_IMPORTED_MODULE_0_lodash__["isEmpty"](this.score2)) {
            this.score2 = this.getMark(pinsDown, true);
            if (!this.isLastFrame) {
                this.frameDone = true;
            }
        }
    };
    /**
     * returns the pretty value for the number of pins Rolled. It also discovers if a frame
     * has had a X or / and should get extra balls on the frame.
     *
     * @param {number} pins
     * @param {boolean} canBeSpare
     * @returns {string}
     */
    Frame.prototype.getMark = function (pins, canBeSpare) {
        var retVal = pins + '';
        if (pins === 10 && this.score1 !== '-') {
            this.extraBalls = 2;
            retVal = 'X';
        }
        else if (canBeSpare && ((Number(this.score1) + pins) === 10 || pins === 10)) {
            this.extraBalls = 1;
            retVal = '/';
        }
        else if (pins === 0) {
            retVal = '-';
        }
        return retVal;
    };
    /**
     * returns weather or not the total should be shown in the case of X or / the frame should
     * be blank until extra points are added later.
     * @returns {boolean}
     */
    Frame.prototype.showTotal = function () {
        return (this.score2 !== 'X' && this.score2 !== '/');
    };
    return Frame;
}());

//# sourceMappingURL=/Users/rbaarz/home/tmp/incredibowl/incredibowlApp/src/frame.model.js.map

/***/ }),

/***/ 304:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Model_frame_model__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Model_lastFrame_model__ = __webpack_require__(460);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lodash__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScoreboxComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ScoreboxComponent = (function () {
    function ScoreboxComponent() {
    }
    ScoreboxComponent.prototype.ngOnInit = function () {
        this.currentScore = 0;
        this.currentFrameIndex = 0;
        this.initializeFrames();
    };
    /**
     * creates an Array of 10 Frames where then final Frame is a LastFrame
     */
    ScoreboxComponent.prototype.initializeFrames = function () {
        var _this = this;
        this.frames = [];
        __WEBPACK_IMPORTED_MODULE_3_lodash__["times"](9, function (n) {
            _this.frames.push(new __WEBPACK_IMPORTED_MODULE_1__Model_frame_model__["a" /* Frame */]('frame' + (n + 1), '', '', null));
        });
        this.frames.push(new __WEBPACK_IMPORTED_MODULE_2__Model_lastFrame_model__["a" /* LastFrame */]('frame10', '', '', '', null));
    };
    ScoreboxComponent.prototype.testClick = function () {
        /*
          this is a good little function for testing I can just click to run record bowl with a pinCount
          this.recordBowl (3);
         */
    };
    /**
     * Send the number of Pins down in and we will go through and add the pins to any frames that are still
     * awaiting extra pins because they were spares or strikes, Then we add the pins to Frame that is currently
     * being played. From that interaction the Frame will know weather or not the Frame is done or if it needs to
     * reset the pins like in the last frame when you mark on ball 1 or 2.
     *
     * It returns weather or not the pins should be reset.
     *
     * If the frame is done it advances the scorebox to the next frame.
     * @param {number} pinsDown
     * @returns {boolean}
     */
    ScoreboxComponent.prototype.recordBowl = function (pinsDown) {
        if (this.currentFrameIndex > 9) {
            this.ngOnInit();
        }
        this.updatePendingFrames(pinsDown);
        var currentFrame = this.frames[this.currentFrameIndex];
        currentFrame.addPinsToFrame(pinsDown);
        if (currentFrame.frameDone) {
            this.currentFrameIndex += 1;
            if (currentFrame.showTotal()) {
                this.currentScore += currentFrame.frameTotal;
                currentFrame.runningTotal = this.currentScore;
            }
        }
        return (currentFrame.frameDone || currentFrame.resetPins);
    };
    /**
     * Goes through each of the frames searching for frames that are awaiting extra points because
     * the frame had a strike or a spare. Adds extra points and if there are no more extra points to
     * wait for it displays the running score.
     * @param {number} pinsDown
     */
    ScoreboxComponent.prototype.updatePendingFrames = function (pinsDown) {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_3_lodash__["each"](this.frames, function (frameIn) {
            if (!frameIn.isLastFrame) {
                if (frameIn.extraBalls > 0) {
                    frameIn.frameTotal += pinsDown;
                }
                frameIn.extraBalls -= 1;
                if (frameIn.extraBalls === 0) {
                    _this.currentScore += frameIn.frameTotal;
                    frameIn.runningTotal = _this.currentScore;
                }
            }
        });
    };
    ScoreboxComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Component */])({
            selector: 'app-scorebox',
            template: __webpack_require__(622),
            styles: [__webpack_require__(619)]
        }),
        __metadata("design:paramtypes", [])
    ], ScoreboxComponent);
    return ScoreboxComponent;
}());

//# sourceMappingURL=/Users/rbaarz/home/tmp/incredibowl/incredibowlApp/src/scorebox.component.js.map

/***/ }),

/***/ 347:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 347;


/***/ }),

/***/ 348:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(436);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(461);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__(457);




if (__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=/Users/rbaarz/home/tmp/incredibowl/incredibowlApp/src/main.js.map

/***/ }),

/***/ 456:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_scorebox_scorebox_component__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_lane_lane_component__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jquery__ = __webpack_require__(615);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_jquery__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppComponent = (function () {
    function AppComponent() {
        this.showClickToBowl = true;
        this.ballWidth = 320;
        this.ballSpeed = 1000;
    }
    /**
     * Not Ideal to use Jquery inside of angular but it was a quick way to get animation of
     * the ball going back and forth that I was familiar with.
     */
    AppComponent.prototype.ngAfterViewInit = function () {
        this.animateBall(__WEBPACK_IMPORTED_MODULE_3_jquery__('.bowling-ball'), this.ballSpeed);
    };
    /**
     * Animate ball takes a target Element that should be a JQuery Object and  the duration
     * of the animation one way, so the higher the duration the slower it goes.
     * It will go back and forth moving the distance in pixels of the ballWidth
     * @param targetElement
     * @param duration
     */
    AppComponent.prototype.animateBall = function (targetElement, duration) {
        var self = this;
        targetElement.animate({ marginLeft: '+=' + self.ballWidth + 'px' }, {
            duration: duration,
            complete: function () {
                targetElement.animate({ marginLeft: '-=' + self.ballWidth + 'px' }, {
                    duration: duration,
                    complete: function () {
                        self.animateBall(targetElement, duration);
                    }
                });
            }
        });
    };
    ;
    /**
     * Uses the position of the bowling ball to get a number between 1 and 10
     * Then it uses that number as a seed to get the knocked Down pins from the Lane
     * The lane returns how many pins have been knocked down and that is sent to the scorebox
     * The score box lets us know if the pins need to be reset based on information in the frame.
     */
    AppComponent.prototype.generateRoll = function () {
        var _this = this;
        var randIn = this.getLuckyNumber(), pinsDown = this.lane.knockPinsDown(randIn), resetPins = this.scorebox.recordBowl(pinsDown);
        this.toggleClickToBowl(null);
        if (resetPins) {
            setTimeout(function () {
                _this.lane.setPins();
            }, 1000); // give the user a chance to see the pins knocked down
        }
    };
    /**
     * returns a number between 1 and 10 based on where the ball is when the ball container is clicked
     * It signifies the horizontal position of the ball when bowled.
     * @returns {number}
     */
    AppComponent.prototype.getLuckyNumber = function () {
        var seed = Number(__WEBPACK_IMPORTED_MODULE_3_jquery__('.bowling-ball').css('marginLeft').replace('px', '')), ratio = seed / this.ballWidth;
        return Math.ceil(ratio * 10);
    };
    /**
     * Shows the Click to Bowl button which is also a mask for the ball controller.
     * @param event
     */
    AppComponent.prototype.toggleClickToBowl = function (event) {
        if (event) {
            event.stopPropagation();
        }
        this.showClickToBowl = !this.showClickToBowl;
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1__components_scorebox_scorebox_component__["a" /* ScoreboxComponent */]),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__components_scorebox_scorebox_component__["a" /* ScoreboxComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__components_scorebox_scorebox_component__["a" /* ScoreboxComponent */]) === "function" && _a || Object)
    ], AppComponent.prototype, "scorebox", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_2__components_lane_lane_component__["a" /* LaneComponent */]),
        __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__components_lane_lane_component__["a" /* LaneComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__components_lane_lane_component__["a" /* LaneComponent */]) === "function" && _b || Object)
    ], AppComponent.prototype, "lane", void 0);
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(620),
            styles: [__webpack_require__(617)]
        }),
        __metadata("design:paramtypes", [])
    ], AppComponent);
    return AppComponent;
    var _a, _b;
}());

//# sourceMappingURL=/Users/rbaarz/home/tmp/incredibowl/incredibowlApp/src/app.component.js.map

/***/ }),

/***/ 457:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(426);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(432);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(456);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_scorebox_scorebox_component__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_lane_lane_component__ = __webpack_require__(302);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_5__components_scorebox_scorebox_component__["a" /* ScoreboxComponent */],
                __WEBPACK_IMPORTED_MODULE_6__components_lane_lane_component__["a" /* LaneComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */]
            ],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=/Users/rbaarz/home/tmp/incredibowl/incredibowlApp/src/app.module.js.map

/***/ }),

/***/ 458:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Pin; });
var Pin = (function () {
    function Pin(id, x, y, probabilities) {
        this.isDown = false;
        this.id = id;
        this.x = x;
        this.y = y;
        this.probabilities = probabilities;
    }
    /**
     * Generates a random number betwen 1 and 10 to introduce luck
     * that number is then compared to a map of probabilties that the pin will be knocked down
     * based on the horzontal position in. the higher the probability in the map the more liekely it
     * will be knocked down.
     *
     * @param {number} ballIn number between 1 and 10
     * @returns {number} 1 if the ball in caused the ball to be knocked down 0 if it is still standing.
     */
    Pin.prototype.bowlToPin = function (ballIn) {
        var rand = Math.floor(Math.random() * 10) + 1, retVal = 0;
        if (this.probabilities[ballIn] >= rand && !this.isDown) {
            this.isDown = true;
            retVal = 1;
        }
        return retVal;
    };
    return Pin;
}());

//# sourceMappingURL=/Users/rbaarz/home/tmp/incredibowl/incredibowlApp/src/pin.model.js.map

/***/ }),

/***/ 459:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PinMap; });
var PinMap = (function () {
    function PinMap() {
    }
    /**
     * I pulled this out of thin air just my best guess the numbers 1-10 represent a ball position
     * 1 is left most 5 6 are center 10 is rightMost, the values for the keys are a probability
     * that the pin will be knocked down by ball in that position.
     * @returns Array
     */
    PinMap.returnMap = function () {
        return [
            {
                1: 0,
                2: 0,
                3: 3,
                4: 8,
                5: 10,
                6: 10,
                7: 8,
                8: 3,
                9: 0,
                10: 0
            },
            {
                1: 0,
                2: 3,
                3: 7,
                4: 10,
                5: 9,
                6: 9,
                7: 5,
                8: 3,
                9: 1,
                10: 0
            }, {
                1: 0,
                2: 1,
                3: 3,
                4: 5,
                5: 9,
                6: 9,
                7: 10,
                8: 7,
                9: 3,
                10: 0
            }, {
                1: 0,
                2: 8,
                3: 10,
                4: 8,
                5: 8,
                6: 8,
                7: 3,
                8: 2,
                9: 1,
                10: 0
            }, {
                1: 0,
                2: 2,
                3: 5,
                4: 7,
                5: 9,
                6: 9,
                7: 7,
                8: 5,
                9: 2,
                10: 0
            }, {
                1: 0,
                2: 1,
                3: 2,
                4: 3,
                5: 8,
                6: 8,
                7: 8,
                8: 10,
                9: 8,
                10: 0
            }, {
                1: 0,
                2: 10,
                3: 8,
                4: 5,
                5: 7,
                6: 7,
                7: 4,
                8: 3,
                9: 1,
                10: 0
            }, {
                1: 0,
                2: 7,
                3: 9,
                4: 7,
                5: 8,
                6: 8,
                7: 5,
                8: 3,
                9: 1,
                10: 0
            }, {
                1: 0,
                2: 1,
                3: 3,
                4: 5,
                5: 8,
                6: 8,
                7: 7,
                8: 9,
                9: 7,
                10: 0
            }, {
                1: 0,
                2: 1,
                3: 3,
                4: 4,
                5: 7,
                6: 7,
                7: 5,
                8: 8,
                9: 10,
                10: 0
            }
        ];
    };
    return PinMap;
}());

//# sourceMappingURL=/Users/rbaarz/home/tmp/incredibowl/incredibowlApp/src/pinMap.js.map

/***/ }),

/***/ 460:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__frame_model__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LastFrame; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var LastFrame = (function (_super) {
    __extends(LastFrame, _super);
    function LastFrame(id, score1, score2, score3, runningTotal) {
        var _this = _super.call(this, id, score1, score2, runningTotal) || this;
        _this.score3 = '';
        _this.isLastFrame = true;
        _this.resetPins = false;
        _this.score3 = score3;
        return _this;
    }
    /**
     * Overload the addPinsToFrame function from the Parent because he's  a little bit special
     * Since there can be 3 balls thrown in the last Frame and any ball can be a Mark, we have to be able to
     * record if a reset is needed. We set resetPins=false every time. Int the last frame it works out that every
     * ball just counts as its own score and does not get extra points so the frame total is just the total of
     * all 3 scores.
     * @param {number} pinsDown
     */
    LastFrame.prototype.addPinsToFrame = function (pinsDown) {
        this.frameTotal += pinsDown;
        this.resetPins = false;
        if (__WEBPACK_IMPORTED_MODULE_1_lodash__["isEmpty"](this.score1)) {
            this.score1 = this.getMark(pinsDown, false);
            if (this.score1 === 'X') {
                this.resetPins = true;
            }
        }
        else if (__WEBPACK_IMPORTED_MODULE_1_lodash__["isEmpty"](this.score2)) {
            this.score2 = this.getMark(pinsDown, true);
            // the frame is not done if we start with a strike or there is a mark int he second frame
            if (this.score1 !== 'X' && this.score2 !== 'X' && this.score2 !== '/') {
                this.frameDone = true;
            }
            else if (this.score2 === 'X' || this.score2 === '/') {
                this.resetPins = true;
            }
        }
        else {
            this.score3 = this.getMark(pinsDown, false);
            this.frameDone = true;
        }
    };
    /**
     * always show total on the last frame
     * @returns {boolean}
     */
    LastFrame.prototype.showTotal = function () {
        return true;
    };
    return LastFrame;
}(__WEBPACK_IMPORTED_MODULE_0__frame_model__["a" /* Frame */]));

//# sourceMappingURL=/Users/rbaarz/home/tmp/incredibowl/incredibowlApp/src/lastFrame.model.js.map

/***/ }),

/***/ 461:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=/Users/rbaarz/home/tmp/incredibowl/incredibowlApp/src/environment.js.map

/***/ }),

/***/ 617:
/***/ (function(module, exports) {

module.exports = ".incredibowl-layout{\n  width:1020px;\n  margin:auto;\n}\n.scorebox-layout{\n  width: 100%;\n  height: 100px;\n}\n\n.lane-layout{\n  width: 100%;\n  height: 300px;\n  margin-top:16px;\n}\n\n.ball-control-layout{\n  width: 100%;\n  height: 100px;\n}\n\n.ball-controller-cont{\n  width:1000px;\n  height:100px;\n}\n\n.ball-controller-panel{\n  width:400px;\n  height: 80px;\n  background-color: #EEEEEE;\n  margin: auto;\n  position:relative;\n  padding-top: 16px;\n  padding-bottom: 16px;\n}\n\n.bowling-ball {\n  height:80px;\n  width: 80px;\n  border-radius: 40px;\n  background-color: #ff8200;\n}\n\n.callToAction{\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: #444444;\n  color: white;\n  text-align: center;\n  line-height:116px;\n  font-size: 30px;\n  cursor: pointer\n}\n"

/***/ }),

/***/ 618:
/***/ (function(module, exports) {

module.exports = ".lane-container{\n  width:1000px;\n  height:300px;\n}\n.pins-container{\n  width:300px;\n  height:300px;\n  margin: auto;\n  position:relative;\n}\n\n.pin{\n  height:50px;\n  width:50px;\n  background-color: #444444;\n  border-radius :25px;\n  position: absolute;\n  box-sizing: border-box;\n}\n.pin.down{\n  background-color: white;\n  border: 4px solid #444444;\n\n}\n\n\n"

/***/ }),

/***/ 619:
/***/ (function(module, exports) {

module.exports = ".scorebox-cont{\n  line-height:50px;\n  text-align: center;\n}\n.frame-cont{\n  border : 1px solid #444444;\n  border-left-width:0;\n  width:100px;\n  height: 100px;\n  float : left;\n  position:relative;\n  font-size:20px;\n}\n.frame-cont:first-child{\n  border-left-width:1px;\n}\n.score1-box{\n  position:absolute;\n  top:0;\n  left:0;\n  bottom:50px;\n  right: 50px;\n\n}\n.score1-box.last{\n  right: 66px;\n  border-bottom:1px solid #444444;\n}\n.score2-box{\n  border : 1px solid #444444;\n  border-top-width: 0;\n  border-right-width: 0;\n  position:absolute;\n  top:0;\n  left:50px;\n  bottom:50px;\n  right: 0;\n}\n.score2-box.last{\n  left:33px;\n  right: 33px;\n  border-right-width : 1px;\n}\n.score3-box{\n  position:absolute;\n  top:0;\n  left:66px;\n  bottom:50px;\n  right: 0;\n  border-bottom:1px solid #444444;\n}\n.running-total{\n  position:absolute;\n  top:50px;\n  left:0;\n  bottom:0;\n  right: 0;\n}\n"

/***/ }),

/***/ 620:
/***/ (function(module, exports) {

module.exports = "<div class=\"incredibowl-layout\">\n  <div class=\"scorebox-layout\">\n    <app-scorebox></app-scorebox>\n  </div>\n  <div class=\"lane-layout\">\n    <app-lane></app-lane>\n  </div>\n  <div class=\"ball-control-layout\">\n    <div class=\"ball-controller-cont\">\n      <div class=\"ball-controller-panel\" (click)=\"generateRoll()\">\n        <div class=\"bowling-ball\"></div>\n        <div *ngIf=\"showClickToBowl\" class=\"callToAction\" (click) = \"toggleClickToBowl($event)\">\n          Click To Bowl\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 621:
/***/ (function(module, exports) {

module.exports = "<div class=\"lane-container\">\n  <div class=\"pins-container\">\n    <div class=\"pin\" *ngFor=\"let pin of pins\"\n         [style.left.px]=\"pin.x\"\n         [style.top.px]=\"pin.y\"\n         [ngClass] = \"(pin.isDown) ? 'down' : ''\"\n    ></div>\n  </div>\n</div>\n"

/***/ }),

/***/ 622:
/***/ (function(module, exports) {

module.exports = "<div class = \"scorebox-cont\" (click) = \"testClick()\">\n  <div class=\"frame-cont\"   *ngFor=\"let frame of frames\">\n    <div *ngIf=\"!frame.isLastFrame\">\n        <div class=\"score1-box\">{{frame.score1}}</div>\n        <div class=\"score2-box\">{{frame.score2}}</div>\n        <div class=\"running-total\">{{frame.runningTotal}}</div>\n    </div>\n\n    <div *ngIf=\"frame.isLastFrame\">\n      <div class=\"score1-box last\">{{frame.score1}}</div>\n      <div class=\"score2-box last\">{{frame.score2}}</div>\n      <div class=\"score3-box\">{{frame.score3}}</div>\n      <div class=\"running-total\">{{frame.runningTotal}}</div>\n    </div>\n\n  </div>\n</div>\n\n\n"

/***/ }),

/***/ 636:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(348);


/***/ })

},[636]);
//# sourceMappingURL=main.bundle.map