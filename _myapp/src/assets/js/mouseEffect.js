export const MouseEffect = function() {
	const win = window;
	const winWidth = win.innerWidth;
	const winHeight = win.innerHeight;
	let gx = 0;
	let gy = 0;
	let size = 30;
	return {
		MouseMove: function() {
			$('body').prepend('<div class="an" style="width: 3px; height: 3px;"></div>');
			$('body').prepend('<span class="dt" style="width: ' + size + 'px; height: ' + size + 'px;"></span>');
			let $tn = $('a');
			let $target = $('.an');
			let $target_s = $('.dt');
			$(win).on('mousemove', event => {
				let x = event.pageX;
				let y = event.pageY;
				gx = x;
				gy = y;
				$target.stop().animate({
					'left': x,
					'top': y,
					'margin-left': -$target.width() / 2,
					'margin-top': -$target.width() / 2
				}, {
					duration: 0,
					complete() {
						$target_s.stop().animate({
							'left': x,
							'top': y,
							'margin-left': -$target_s.width() / 2,
							'margin-top': -$target_s.width() / 2
						}, 100);
					}
				});
			});
		},
		MouseRouterEffect: function($el) {
			return;
			window.canvas = 'canvas';
			! function a(b, c, d) {
	            function e(g, h) {
	                if (!c[g]) {
	                    if (!b[g]) {
	                        var i = "function" == typeof require && require;
	                        if (!h && i) return i(g, !0);
	                        if (f) return f(g, !0);
	                        var j = new Error("Cannot find module '" + g + "'");
	                        throw j.code = "MODULE_NOT_FOUND", j
	                    }
	                    var k = c[g] = {
	                        exports: {}
	                    };
	                    b[g][0].call(k.exports, function(a) {
	                        var c = b[g][1][a];
	                        return e(c ? c : a)
	                    }, k, k.exports, a, b, c, d)
	                }
	                return c[g].exports
	            }
	            for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]);
	            return e
	        }({
	            1: [function(a, b, c) {
	                "use strict";
	                Object.defineProperty(c, "__esModule", {
	                    value: !0
	                });
	                var d = function() {
	                    this._duration = 1200, this._startTime, this._handlers = [], this._easingFunc = null, this._rafID = null, this.duration = function(a) {
	                        return this._duration = a, this
	                    }, this.easing = function(a) {
	                        return this._easingFunc = a, this
	                    }, this.play = function(a) {
	                        var b = this;
	                        return this._startTime || this._setStartTime(function() {
	                            b._run(b._startTime, a)
	                        }), this
	                    }, this.reverse = function() {
	                        return this.play(!0), this
	                    }, this.stop = function() {
	                        return cancelAnimationFrame(this._rafID), this
	                    }, this.bounce = function(a) {
	                        var b = this,
	                            c = 0;
	                        return this.play(), this.on("finish", function() {
	                            setTimeout(function() {
	                                c % 2 === 0 ? b.reverse() : b.play(), c++
	                            }, a)
	                        }), this
	                    }, this._run = function(a, b) {
	                        var c = this,
	                            a = a || (new Date).getTime(),
	                            d = a - this._startTime,
	                            e = d / this._duration;
	                        return e = Math.min(e, 1), b && (e = 1 - e), null !== this._easingFunc && (e = this._easingFunc(e)), this.trigger("tick", e), d <= this._duration ? this._rafID = requestAnimationFrame(function(a) {
	                            c._run(a, b)
	                        }) : (this._startTime = void 0, this.trigger("finish")), this
	                    }, this.trigger = function(a, b) {
	                        for (var c = 0; c < this._handlers.length; c++) this._handlers[c].event === a && this._handlers[c].cb(b)
	                    }, this.on = function(a, b) {
	                        return this._handlers.push({
	                            event: a,
	                            cb: b
	                        }), this
	                    }, this._setStartTime = function(a) {
	                        var b = this;
	                        requestAnimationFrame(function(c) {
	                            b._startTime = c || (new Date).getTime(), a(c)
	                        })
	                    }, this.log = function() {
	                        return console.log(this), this
	                    }
	                };
	                c.default = d
	            }, {}],
	            2: [function(a, b, c) {
	                "use strict";
	
	                function f(a) {
	                    return a && a.__esModule ? a : {
	                        default: a
	                    }
	                }
	
	                function h(a, b, c, d) {
	                    this.x = b, this.y = c, this.t = d, this.controlX = b, this.controlY = c, this.previousY = c, this.canvas = a
	                }
	
	                function i(a) {
	                    this.config = Object.assign({
	                        showIndicators: !1,
	                        showConsoleLogs: !1,
	                        width: window.innerWidth,
	                        height: window.innerHeight,
	                        totalPoints: 20,
	                        maxRange: 200,
	                        timing: .01,
	                        yOffset: window.innerHeight / 2,
	                        color: "#ff3737",
	                        background: "#27313e"
	                    }, a), this.rafID = null, this.points = []
	                }
	
	                function j(a, b) {
	                    return Math.floor(Math.random() * (b - a + 1)) + a
	                }
	
	                function k(a, b, c, d, e) {
	                    return d + (e - d) * (a - b) / (c - b)
	                }
	                Object.defineProperty(c, "__esModule", {
	                    value: !0
	                });
	                var d = a("./simpleNoise"),
	                    e = f(d),
	                    g = new e.default;
	                i.prototype.init = function() {
	                    if (!this.config.el) return console.error("No canvas element was defined, pass one through with `el: 'canvasID'`");
	                    this.canvas = document.getElementById(this.config.el);
						 this.ctx = this.canvas.getContext("2d"), this.canvas.width = this.config.width, this.canvas.height = this.config.height;
	                    var a = this.canvas.width / (this.config.totalPoints - 1),
	                        b = this.canvas.height / 2;
	                    this.points = [];
	                    for (var c = 0; c < this.config.totalPoints; c++) this.points.push(new h(this.canvas, a * c, b + j(-this.config.maxRange, this.config.maxRange), j(0, 100)));
	                    this.config.showConsoleLogs && console.log("init()", this), this.step()
	                }, i.prototype.resize = function(a, b) {
	                    this.config.width = a, this.config.height = b, cancelAnimationFrame(this.rafID), this.init()
	                }, i.prototype.step = function() {
	                    for (var a = this, b = 0; b < this.points.length; b++) {
	                        var c = g.getVal(this.points[b].t),
	                            d = k(c, 0, 1, -this.config.maxRange, this.config.maxRange);
	                        this.points[b].y = this.config.yOffset + d, this.points[b].t += k(g.getVal(this.points[b].t + .75 * b), 0, 1, 0, this.config.timing)
	                    }
	                    for (var b = 0; b < this.points.length; b++) {
	                        var e = this.points[b];
	                        void 0 != this.points[b + 1] ? (e.controlX = (e.x + this.points[b + 1].x) / 2, e.controlY = (e.y + this.points[b + 1].y) / 2) : (e.controlX = e.x, e.controlY = e.y)
	                    }
	                    this.draw(), this.rafID = window.requestAnimationFrame(function() {
	                        a.step()
	                    })
	                }, i.prototype.draw = function() {
	                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height), this.ctx.fillStyle = this.config.color, this.ctx.strokeStyle = this.config.color, this.ctx.lineWidth = 1, this.ctx.beginPath();
	                    for (var a = 0; a < this.points.length; a++) {
	                        var b = this.points[a];
	                        this.ctx.bezierCurveTo(b.x, b.y, b.controlX, b.controlY, b.controlX, b.controlY)
	                    }
	                    this.ctx.lineTo(this.canvas.width, this.config.yOffset), this.ctx.lineTo(this.canvas.width, 0), this.ctx.lineTo(0, 0), this.ctx.closePath(), this.ctx.fill(), this.config.showIndicators && this.showDebug()
	                }, i.prototype.showDebug = function() {
	                    this.ctx.fillStyle = "#000", this.ctx.beginPath();
	                    for (var a = 0; a <= this.config.totalPoints - 1; a++) {
	                        var b = this.points[a];
	                        this.ctx.rect(b.x - 2, b.y - 2, 4, 4)
	                    }
	                    this.ctx.fill(), this.ctx.fillStyle = "#fff", this.ctx.beginPath();
	                    for (var a = 0; a <= this.config.totalPoints - 1; a++) {
	                        var b = this.points[a];
	                        this.ctx.rect(b.controlX - 1, b.controlY - 1, 2, 2)
	                    }
	                    this.ctx.fill(), this.ctx.strokeStyle = "blue", this.ctx.beginPath(), this.ctx.moveTo(0, this.config.yOffset - this.config.maxRange), this.ctx.lineTo(this.canvas.width, this.config.yOffset - this.config.maxRange),
	                        this.ctx.moveTo(0, this.config.yOffset), this.ctx.lineTo(this.canvas.width, this.config.yOffset), this.ctx.moveTo(0, this.config.yOffset + this.config.maxRange), this.ctx.lineTo(this.canvas.width, this.config.yOffset +
	                            this.config.maxRange), this.ctx.stroke(), this.ctx.closePath()
	                }, c.default = i
	            }, {
	                "./simpleNoise": 4
	            }],
	            3: [function(a, b, c) {
	                "use strict";
	
	                function h(a) {
	                    return a && a.__esModule ? a : {
	                        default: a
	                    }
	                }
	
	                function l(a) {
	                    return 0 === a ? 0 : 1 === a ? 1 : (a /= .5) < 1 ? .5 * Math.pow(2, 10 * (a - 1)) : .5 * (-Math.pow(2, -10 * --a) + 2)
	                }
	
	                function m(a, b, c, d, e) {
	                    return d + (e - d) * (a - b) / (c - b)
	                }
	                var d = a("./gooeyLine"),
	                    e = h(d),
	                    f = a("./animation"),
	                    g = h(f),
	                    i = document.getElementById("top"),
	                    j = new e.default({
	                        el: window.canvas,
	                        yOffset: 0,
	                        maxRange: 0
	                    }),
	                    k = (new g.default).duration(1200).easing(function(a) {
	                        return l(a)
	                    }).on("tick", function(a) {
	                        var b = m(a, 0, 1, 0, window.innerHeight);
	                        j.config.yOffset = b, i.style.height = b - j.config.maxRange / 8 + "px", a < .5 && (j.config.maxRange = m(a, 0, .5, 0, 200)), a > .65 && (j.config.maxRange = m(a, .65, 1, 200, 0))
	                    });
	                window.onload = function() {
	                    j.init(), k.bounce(200)
	                }, window.addEventListener("resize", function(a) {
	                    j.resize(window.innerWidth, window.innerHeight)
	                })
	            }, {
	                "./animation": 1,
	                "./gooeyLine": 2
	            }],
	            4: [function(a, b, c) {
	                "use strict";
	                Object.defineProperty(c, "__esModule", {
	                    value: !0
	                });
	                var d = function() {
	                    for (var b = 256, c = b - 1, d = 1, e = 1, f = [], g = 0; g < b; ++g) f.push(Math.random());
	                    var h = function(b) {
	                            var g = b * e,
	                                h = Math.floor(g),
	                                j = g - h,
	                                k = j * j * (3 - 2 * j),
	                                l = h & c,
	                                m = l + 1 & c,
	                                n = i(f[l], f[m], k);
	                            return n * d
	                        },
	                        i = function(b, c, d) {
	                            return b * (1 - d) + c * d
	                        };
	                    return {
	                        getVal: h,
	                        setAmplitude: function(b) {
	                            d = b
	                        },
	                        setScale: function(b) {
	                            e = b
	                        }
	                    }
	                };
	                c.default = d
	            }, {}]
	        }, {}, [3]);
		}
	};
}