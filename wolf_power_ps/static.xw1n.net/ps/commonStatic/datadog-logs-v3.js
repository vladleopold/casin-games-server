! function() {
    "use strict";
    var e = function() {
        return (e = Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++)
                for (var i in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            return e
        }).apply(this, arguments)
    };

    function t(e, t) {
        var n, r, i, o, s = {
            label: 0,
            sent: function() {
                if (1 & i[0]) throw i[1];
                return i[1]
            },
            trys: [],
            ops: []
        };
        return o = {
            next: u(0),
            throw: u(1),
            return: u(2)
        }, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
            return this
        }), o;

        function u(o) {
            return function(u) {
                return function(o) {
                    if (n) throw new TypeError("Generator is already executing.");
                    for (; s;) try {
                        if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done) return i;
                        switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                            case 0:
                            case 1:
                                i = o;
                                break;
                            case 4:
                                return s.label++, {
                                    value: o[1],
                                    done: !1
                                };
                            case 5:
                                s.label++, r = o[1], o = [0];
                                continue;
                            case 7:
                                o = s.ops.pop(), s.trys.pop();
                                continue;
                            default:
                                if (!(i = s.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                    s = 0;
                                    continue
                                }
                                if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                    s.label = o[1];
                                    break
                                }
                                if (6 === o[0] && s.label < i[1]) {
                                    s.label = i[1], i = o;
                                    break
                                }
                                if (i && s.label < i[2]) {
                                    s.label = i[2], s.ops.push(o);
                                    break
                                }
                                i[2] && s.ops.pop(), s.trys.pop();
                                continue
                        }
                        o = t.call(e, s)
                    } catch (e) {
                        o = [6, e], r = 0
                    } finally {
                        n = i = 0
                    }
                    if (5 & o[0]) throw o[1];
                    return {
                        value: o[0] ? o[1] : void 0,
                        done: !0
                    }
                }([o, u])
            }
        }
    }

    function n() {
        for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
        var r = Array(e),
            i = 0;
        for (t = 0; t < n; t++)
            for (var o = arguments[t], s = 0, u = o.length; s < u; s++, i++) r[i] = o[s];
        return r
    }
    var r = {
            log: console.log.bind(console),
            warn: console.warn.bind(console),
            error: console.error.bind(console)
        },
        i = "?";

    function o(e, t) {
        var n, r = void 0 === t ? 0 : +t;
        try {
            if (n = function(e) {
                    var t = a(e, "stacktrace");
                    if (!t) return;
                    for (var n, r = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i, o = / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^)]+))\((.*)\))? in (.*):\s*$/i, s = t.split("\n"), u = [], c = 0; c < s.length; c += 2) {
                        var f = void 0;
                        r.exec(s[c]) ? f = {
                            args: [],
                            column: void 0,
                            func: (n = r.exec(s[c]))[3],
                            line: +n[1],
                            url: n[2]
                        } : o.exec(s[c]) && (f = {
                            args: (n = o.exec(s[c]))[5] ? n[5].split(",") : [],
                            column: +n[2],
                            func: n[3] || n[4],
                            line: +n[1],
                            url: n[6]
                        }), f && (!f.func && f.line && (f.func = i), f.context = [s[c + 1]], u.push(f))
                    }
                    if (!u.length) return;
                    return {
                        stack: u,
                        message: a(e, "message"),
                        name: a(e, "name")
                    }
                }(e)) return n
        } catch (e) {
            if (s) throw e
        }
        try {
            if (n = function(e) {
                    var t = a(e, "stack");
                    if (!t) return;
                    for (var n, r, o, s, u = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, c = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|capacitor|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i, l = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i, d = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i, p = /\((\S*)(?::(\d+))(?::(\d+))\)/, h = t.split("\n"), v = [], g = 0, m = h.length; g < m; g += 1) {
                        if (u.exec(h[g])) {
                            var y = (o = u.exec(h[g]))[2] && 0 === o[2].indexOf("native");
                            n = o[2] && 0 === o[2].indexOf("eval"), r = p.exec(o[2]), n && r && (o[2] = r[1], o[3] = r[2], o[4] = r[3]), s = {
                                args: y ? [o[2]] : [],
                                column: o[4] ? +o[4] : void 0,
                                func: o[1] || i,
                                line: o[3] ? +o[3] : void 0,
                                url: y ? void 0 : o[2]
                            }
                        } else if (l.exec(h[g])) s = {
                            args: [],
                            column: (o = l.exec(h[g]))[4] ? +o[4] : void 0,
                            func: o[1] || i,
                            line: +o[3],
                            url: o[2]
                        };
                        else {
                            if (!c.exec(h[g])) continue;
                            n = (o = c.exec(h[g]))[3] && o[3].indexOf(" > eval") > -1, r = d.exec(o[3]), n && r ? (o[3] = r[1], o[4] = r[2], o[5] = void 0) : 0 !== g || o[5] || f(e.columnNumber) || (v[0].column = e.columnNumber + 1), s = {
                                args: o[2] ? o[2].split(",") : [],
                                column: o[5] ? +o[5] : void 0,
                                func: o[1] || i,
                                line: o[4] ? +o[4] : void 0,
                                url: o[3]
                            }
                        }!s.func && s.line && (s.func = i), v.push(s)
                    }
                    if (!v.length) return;
                    return {
                        stack: v,
                        message: a(e, "message"),
                        name: a(e, "name")
                    }
                }(e)) return n
        } catch (e) {
            if (s) throw e
        }
        try {
            if (n = function(e) {
                    var t = a(e, "message");
                    if (!t) return;
                    var n = t.split("\n");
                    if (n.length < 4) return;
                    var r, o = /^\s*Line (\d+) of linked script ((?:file|https?|blob)\S+)(?:: in function (\S+))?\s*$/i,
                        s = /^\s*Line (\d+) of inline#(\d+) script in ((?:file|https?|blob)\S+)(?:: in function (\S+))?\s*$/i,
                        u = /^\s*Line (\d+) of function script\s*$/i,
                        f = [],
                        l = window && window.document && window.document.getElementsByTagName("script"),
                        d = [];
                    for (var p in l) c(l, p) && !l[p].src && d.push(l[p]);
                    for (var h = 2; h < n.length; h += 2) {
                        var v = void 0;
                        if (o.exec(n[h])) v = {
                            args: [],
                            column: void 0,
                            func: (r = o.exec(n[h]))[3],
                            line: +r[1],
                            url: r[2]
                        };
                        else if (s.exec(n[h])) v = {
                            args: [],
                            column: void 0,
                            func: (r = s.exec(n[h]))[4],
                            line: +r[1],
                            url: r[3]
                        };
                        else if (u.exec(n[h])) {
                            r = u.exec(n[h]), v = {
                                url: window.location.href.replace(/#.*$/, ""),
                                args: [],
                                column: void 0,
                                func: "",
                                line: +r[1]
                            }
                        }
                        v && (v.func || (v.func = i), v.context = [n[h + 1]], f.push(v))
                    }
                    if (!f.length) return;
                    return {
                        stack: f,
                        message: n[0],
                        name: a(e, "name")
                    }
                }(e)) return n
        } catch (e) {
            if (s) throw e
        }
        try {
            if (n = u(e, r + 1)) return n
        } catch (e) {
            if (s) throw e
        }
        return {
            message: a(e, "message"),
            name: a(e, "name"),
            stack: []
        }
    }
    var s = !1;

    function u(e, t) {
        for (var n, r, s = /function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i, c = [], f = {}, l = !1, d = u.caller; d && !l; d = d.caller) d !== o && (r = {
            args: [],
            column: void 0,
            func: i,
            line: void 0,
            url: void 0
        }, n = s.exec(d.toString()), d.name ? r.func = d.name : n && (r.func = n[1]), void 0 === r.func && (r.func = n ? n.input.substring(0, n.input.indexOf("{")) : void 0), f[d.toString()] ? l = !0 : f[d.toString()] = !0, c.push(r));
        t && c.splice(0, t);
        var p = {
            stack: c,
            message: a(e, "message"),
            name: a(e, "name")
        };
        return function(e, t, n) {
            var r = {
                url: t,
                line: n ? +n : void 0
            };
            if (r.url && r.line) {
                e.incomplete = !1;
                var i = e.stack;
                if (i.length > 0 && i[0].url === r.url) {
                    if (i[0].line === r.line) return !1;
                    if (!i[0].line && i[0].func === r.func) return i[0].line = r.line, i[0].context = r.context, !1
                }
                return i.unshift(r), e.partial = !0, !0
            }
            e.incomplete = !0
        }(p, a(e, "sourceURL") || a(e, "fileName"), a(e, "line") || a(e, "lineNumber")), p
    }

    function a(e, t) {
        if ("object" == typeof e && e && t in e) {
            var n = e[t];
            return "string" == typeof n ? n : void 0
        }
    }

    function c(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }

    function f(e) {
        return void 0 === e
    }
    var l, d, p = 1e3,
        h = 6e4;

    function v(e, t, n) {
        var r, i, o = !n || void 0 === n.leading || n.leading,
            s = !n || void 0 === n.trailing || n.trailing,
            u = !1;
        return {
            throttled: function() {
                for (var n = [], a = 0; a < arguments.length; a++) n[a] = arguments[a];
                u ? r = n : (o ? e.apply(void 0, n) : r = n, u = !0, i = setTimeout((function() {
                    s && r && e.apply(void 0, r), u = !1, r = void 0
                }), t))
            },
            cancel: function() {
                clearTimeout(i), u = !1, r = void 0
            }
        }
    }

    function g(e) {
        return e ? (parseInt(e, 10) ^ 16 * Math.random() >> parseInt(e, 10) / 4).toString(16) : "10000000-1000-4000-8000-100000000000".replace(/[018]/g, g)
    }

    function m() {}

    function y(e, t, n) {
        if (null == e) return JSON.stringify(e);
        var r = [!1, void 0];
        b(e) && (r = [!0, e.toJSON], delete e.toJSON);
        var i, o, s = [!1, void 0];
        "object" == typeof e && b(i = Object.getPrototypeOf(e)) && (s = [!0, i.toJSON], delete i.toJSON);
        try {
            o = JSON.stringify(e, t, n)
        } catch (e) {
            o = "<error: unable to serialize object>"
        } finally {
            r[0] && (e.toJSON = r[1]), s[0] && (i.toJSON = s[1])
        }
        return o
    }

    function b(e) {
        return "object" == typeof e && null !== e && Object.prototype.hasOwnProperty.call(e, "toJSON")
    }

    function w(e, t) {
        return -1 !== e.indexOf(t)
    }

    function x(e) {
        return Object.keys(e).map((function(t) {
            return e[t]
        }))
    }

    function S(e, t, n, r) {
        return E(e, [t], n, r)
    }

    function E(e, t, n, r) {
        var i = void 0 === r ? {} : r,
            o = i.once,
            s = i.capture,
            u = i.passive,
            a = V(o ? function(e) {
                f(), n(e)
            } : n),
            c = u ? {
                capture: s,
                passive: u
            } : s;
        t.forEach((function(t) {
            return e.addEventListener(t, a, c)
        }));
        var f = function() {
            return t.forEach((function(t) {
                return e.removeEventListener(t, a, c)
            }))
        };
        return {
            stop: f
        }
    }

    function k(e, t, n) {
        if (void 0 === n && (n = function() {
                if ("undefined" != typeof WeakSet) {
                    var e = new WeakSet;
                    return {
                        hasAlreadyBeenSeen: function(t) {
                            var n = e.has(t);
                            return n || e.add(t), n
                        }
                    }
                }
                var t = [];
                return {
                    hasAlreadyBeenSeen: function(e) {
                        var n = t.indexOf(e) >= 0;
                        return n || t.push(e), n
                    }
                }
            }()), void 0 === t) return e;
        if ("object" != typeof t || null === t) return t;
        if (t instanceof Date) return new Date(t.getTime());
        if (t instanceof RegExp) {
            var r = t.flags || [t.global ? "g" : "", t.ignoreCase ? "i" : "", t.multiline ? "m" : "", t.sticky ? "y" : "", t.unicode ? "u" : ""].join("");
            return new RegExp(t.source, r)
        }
        if (!n.hasAlreadyBeenSeen(t)) {
            if (Array.isArray(t)) {
                for (var i = Array.isArray(e) ? e : [], o = 0; o < t.length; ++o) i[o] = k(i[o], t[o], n);
                return i
            }
            var s, u = "object" == (null === (s = e) ? "null" : Array.isArray(s) ? "array" : typeof s) ? e : {};
            for (var a in t) Object.prototype.hasOwnProperty.call(t, a) && (u[a] = k(u[a], t[a], n));
            return u
        }
    }

    function T() {
        for (var e, t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
        for (var r = 0, i = t; r < i.length; r++) {
            var o = i[r];
            null != o && (e = k(e, o))
        }
        return e
    }! function(e) {
        e.DOCUMENT = "document", e.XHR = "xhr", e.BEACON = "beacon", e.FETCH = "fetch", e.CSS = "css", e.JS = "js", e.IMAGE = "image", e.FONT = "font", e.MEDIA = "media", e.OTHER = "other"
    }(l || (l = {})),
    function(e) {
        e.FETCH = "fetch", e.XHR = "xhr"
    }(d || (d = {}));
    var O, C, R = "agent",
        M = "console",
        L = "logger",
        B = "network",
        A = "source";

    function _(e) {
        var t = I(e);
        return e.stack.forEach((function(e) {
            var n = "?" === e.func ? "<anonymous>" : e.func,
                r = e.args && e.args.length > 0 ? "(" + e.args.join(", ") + ")" : "",
                i = e.line ? ":" + e.line : "",
                o = e.line && e.column ? ":" + e.column : "";
            t += "\n  at " + n + r + " @ " + e.url + i + o
        })), t
    }

    function I(e) {
        return (e.name || "Error") + ": " + e.message
    }

    function N() {
        var e, t = new Error;
        if (!t.stack) try {
            throw t
        } catch (e) {}
        return W((function() {
            var n = o(t);
            n.stack = n.stack.slice(2), e = _(n)
        })), e
    }

    function D() {
        var e, t = (e = "event-bridge", C && C.has(e) ? window.DatadogEventBridge : null);
        if (t) return {
            getAllowedWebViewHosts: function() {
                return JSON.parse(t.getAllowedWebViewHosts())
            },
            send: function(e, n) {
                t.send(JSON.stringify({
                    eventType: e,
                    event: n
                }))
            }
        }
    }

    function j() {
        var e = D();
        return !!e && w(e.getAllowedWebViewHosts(), window.location.hostname)
    }! function(e) {
        e.HANDLED = "handled", e.UNHANDLED = "unhandled"
    }(O || (O = {}));
    var z, P = /[^\u0000-\u007F]/,
        U = function() {
            function e(e, t, n, r, i, o) {
                void 0 === o && (o = m), this.request = e, this.maxSize = t, this.bytesLimit = n, this.maxMessageSize = r, this.flushTimeout = i, this.beforeUnloadCallback = o, this.pushOnlyBuffer = [], this.upsertBuffer = {}, this.bufferBytesSize = 0, this.bufferMessageCount = 0, this.flushOnVisibilityHidden(), this.flushPeriodically()
            }
            return e.prototype.add = function(e) {
                this.addOrUpdate(e)
            }, e.prototype.upsert = function(e, t) {
                this.addOrUpdate(e, t)
            }, e.prototype.flush = function(e) {
                if (0 !== this.bufferMessageCount) {
                    var t = n(this.pushOnlyBuffer, x(this.upsertBuffer));
                    this.request.send(t.join("\n"), this.bufferBytesSize, e), this.pushOnlyBuffer = [], this.upsertBuffer = {}, this.bufferBytesSize = 0, this.bufferMessageCount = 0
                }
            }, e.prototype.sizeInBytes = function(e) {
                return P.test(e) ? void 0 !== window.TextEncoder ? (new TextEncoder).encode(e).length : new Blob([e]).size : e.length
            }, e.prototype.addOrUpdate = function(e, t) {
                var n = this.process(e),
                    i = n.processedMessage,
                    o = n.messageBytesSize;
                o >= this.maxMessageSize ? r.warn("Discarded a message whose size was bigger than the maximum allowed size " + this.maxMessageSize + "KB.") : (this.hasMessageFor(t) && this.remove(t), this.willReachedBytesLimitWith(o) && this.flush("willReachedBytesLimitWith"), this.push(i, o, t), this.isFull() && this.flush("isFull"))
            }, e.prototype.process = function(e) {
                var t = y(e);
                return {
                    processedMessage: t,
                    messageBytesSize: this.sizeInBytes(t)
                }
            }, e.prototype.push = function(e, t, n) {
                this.bufferMessageCount > 0 && (this.bufferBytesSize += 1), void 0 !== n ? this.upsertBuffer[n] = e : this.pushOnlyBuffer.push(e), this.bufferBytesSize += t, this.bufferMessageCount += 1
            }, e.prototype.remove = function(e) {
                var t = this.upsertBuffer[e];
                delete this.upsertBuffer[e];
                var n = this.sizeInBytes(t);
                this.bufferBytesSize -= n, this.bufferMessageCount -= 1, this.bufferMessageCount > 0 && (this.bufferBytesSize -= 1)
            }, e.prototype.hasMessageFor = function(e) {
                return void 0 !== e && void 0 !== this.upsertBuffer[e]
            }, e.prototype.willReachedBytesLimitWith = function(e) {
                return this.bufferBytesSize + e + 1 >= this.bytesLimit
            }, e.prototype.isFull = function() {
                return this.bufferMessageCount === this.maxSize || this.bufferBytesSize >= this.bytesLimit
            }, e.prototype.flushPeriodically = function() {
                var e = this;
                setTimeout(V((function() {
                    e.flush("flushPeriodically"), e.flushPeriodically()
                })), this.flushTimeout)
            }, e.prototype.flushOnVisibilityHidden = function() {
                var e = this;
                navigator.sendBeacon && (S(window, "before1unload", this.beforeUnloadCallback), S(document, "visibilitychange", (function() {
                    "hidden" === document.visibilityState && e.flush("visibilitychange")
                })), S(window, "before1unload", (function() {
                    return e.flush("before1unload")
                })))
            }, e
        }(),
        H = !1,
        F = function() {
            function e(e, t) {
                this.endpointBuilder = e, this.bytesLimit = t
            }
            return e.prototype.send = function(e, t, n) {
                var r = this.endpointBuilder.build(),
                    i = !!navigator.sendBeacon && t < this.bytesLimit;
                if (i) try {
                    if (navigator.sendBeacon(r, e)) return
                } catch (e) {
                    ! function(e) {
                        q || (q = !0, Z(e))
                    }(e)
                }
                var o = new XMLHttpRequest;
                o.addEventListener("loadend", V((function(e) {
                    return function(e) {
                        var o = null == e ? void 0 : e.currentTarget;
                        o.status >= 200 && o.status < 300 || H || (H = !0, Y("XHR fallback failed", {
                            on_line: navigator.onLine,
                            size: t,
                            url: r,
                            try_beacon: i,
                            flush_reason: n,
                            event: {
                                is_trusted: e.isTrusted,
                                total: e.total,
                                loaded: e.loaded
                            },
                            request: {
                                status: o.status,
                                ready_state: o.readyState,
                                response_text: o.responseText.slice(0, 512)
                            }
                        }))
                    }(e)
                }))), o.open("POST", r, !0), o.send(e)
            }, e
        }(),
        q = !1;
    ! function(e) {
        e.info = "info", e.error = "error"
    }(z || (z = {}));
    var G, $, K = {
        maxMessagesPerPage: 0,
        sentMessageCount: 0
    };

    function J(e) {
        var t;
        if (j()) {
            var n = D();
            G = function(e) {
                return n.send("internal_log", i(e))
            }
        } else if (e.internalMonitoringEndpointBuilder) {
            var r = function(e) {
                var t, n = r(e.internalMonitoringEndpointBuilder);

                function r(t) {
                    return new U(new F(t, e.batchBytesLimit), e.maxBatchSize, e.batchBytesLimit, e.maxMessageSize, e.flushTimeout)
                }
                return void 0 !== e.replica && (t = r(e.replica.internalMonitoringEndpointBuilder)), {
                    add: function(e) {
                        n.add(e), t && t.add(e)
                    }
                }
            }(e);
            G = function(e) {
                return r.add(i(e))
            }
        }

        function i(e) {
            return T({
                date: (new Date).getTime()
            }, void 0 !== t ? t() : {}, e)
        }
        return function(e) {
            for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
            t.forEach((function(t) {
                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
            }))
        }(K, {
            maxMessagesPerPage: e.maxInternalMonitoringMessagesPerPage,
            sentMessageCount: 0
        }), {
            setExternalContextProvider: function(e) {
                t = e
            }
        }
    }

    function X(e, t, n) {
        var r = n.value;
        n.value = function() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            var n = G ? V(r) : r;
            return n.apply(this, e)
        }
    }

    function V(e) {
        return function() {
            return W(e, this, arguments)
        }
    }

    function W(e, t, n) {
        try {
            return e.apply(t, n)
        } catch (e) {
            te(e);
            try {
                Z(e)
            } catch (e) {
                te(e)
            }
        }
    }

    function Y(t, n) {
        ! function(e, t) {
            K.debugMode && r.log("[MONITORING MESSAGE]", e, t)
        }(t, n), Q(e(e({
            message: t
        }, n), {
            status: z.info
        }))
    }

    function Z(t) {
        Q(e(e({}, function(e) {
            if (e instanceof Error) {
                var t = o(e);
                return {
                    error: {
                        kind: t.name,
                        stack: _(t)
                    },
                    message: t.message
                }
            }
            return {
                error: {
                    stack: "Not an instance of error"
                },
                message: "Uncaught " + y(e)
            }
        }(t)), {
            status: z.error
        }))
    }

    function Q(e) {
        G && K.sentMessageCount < K.maxMessagesPerPage && (K.sentMessageCount += 1, G(e))
    }

    function ee(e) {
        K.debugMode = e
    }

    function te(e) {
        K.debugMode && r.error("[INTERNAL ERROR]", e)
    }

    function ne(e, t) {
        return function() {
            for (var n = [], i = 0; i < arguments.length; i++) n[i] = arguments[i];
            try {
                return e.apply(void 0, n)
            } catch (e) {
                r.error(t, e)
            }
        }
    }

    function re() {
        var e = {};
        return {
            get: function() {
                return e
            },
            add: function(t, n) {
                e[t] = n
            },
            remove: function(t) {
                delete e[t]
            },
            set: function(t) {
                e = t
            }
        }
    }! function(e) {
        e.RELEASE = "release", e.STAGING = "staging", e.CANARY = "canary", e.E2E_TEST = "e2e-test"
    }($ || ($ = {}));
    var ie, oe, se, ue = function() {
        function e(e) {
            void 0 === e && (e = 1e4), this.limit = e, this.buffer = []
        }
        return e.prototype.add = function(e) {
            this.buffer.push(e) > this.limit && this.buffer.splice(0, 1)
        }, e.prototype.drain = function() {
            this.buffer.forEach((function(e) {
                return e()
            })), this.buffer.length = 0
        }, e
    }();

    function ae(e, t, n, r) {
        var i = new Date;
        i.setTime(i.getTime() + n);
        var o = "expires=" + i.toUTCString(),
            s = r && r.crossSite ? "none" : "strict",
            u = r && r.domain ? ";domain=" + r.domain : "",
            a = r && r.secure ? ";secure" : "";
        document.cookie = e + "=" + t + ";" + o + ";path=/;samesite=" + s + u + a
    }

    function ce(e) {
        return function(e, t) {
            var n = new RegExp("(?:^|;)\\s*" + t + "\\s*=\\s*([^;]+)").exec(e);
            return n ? n[1] : void 0
        }(document.cookie, e)
    }

    function fe(e, t) {
        ae(e, "", 0, t)
    }

    function le() {
        return Date.now()
    }

    function de() {
        return performance.now()
    }

    function pe() {
        return {
            relative: de(),
            timeStamp: le()
        }
    }

    function he(e, t) {
        return t - e
    }

    function ve() {
        return void 0 === oe && (oe = performance.timing.navigationStart), oe
    }

    function ge(e) {
        return me(e, function(e) {
            if (e.origin) return e.origin;
            var t = e.host.replace(/(:80|:443)$/, "");
            return e.protocol + "//" + t
        }(window.location)).href
    }

    function me(e, t) {
        if (function() {
                if (void 0 !== se) return se;
                try {
                    var e = new URL("http://test/path");
                    return se = "http://test/path" === e.href
                } catch (e) {
                    se = !1
                }
                return se
            }()) return void 0 !== t ? new URL(e, t) : new URL(e);
        if (void 0 === t && !/:/.test(e)) throw new Error("Invalid URL: '" + e + "'");
        var n = document,
            r = n.createElement("a");
        if (void 0 !== t) {
            var i = (n = document.implementation.createHTMLDocument("")).createElement("base");
            i.href = t, n.head.appendChild(i), n.body.appendChild(r)
        }
        return r.href = e, r
    }
    var ye = {
            alternate: {
                logs: "logs",
                rum: "rum",
                sessionReplay: "session-replay"
            },
            classic: {
                logs: "browser",
                rum: "rum",
                sessionReplay: void 0
            }
        },
        be = {
            logs: "logs",
            rum: "rum",
            sessionReplay: "replay"
        },
        we = "datadoghq.com",
        xe = "datadoghq.eu",
        Se = [we, xe],
        Ee = [we, "us3.datadoghq.com", xe, "ddog-gov.com"];

    function ke(e, t, n, r) {
        var i = t.sdkVersion,
            o = e.proxyUrl && ge(e.proxyUrl),
            s = e.site,
            u = void 0 === s ? we : s,
            a = e.clientToken,
            c = e.env,
            f = e.proxyHost,
            l = e.service,
            d = e.version,
            p = e.intakeApiVersion,
            h = e.useAlternateIntakeDomains,
            v = function(e) {
                if (function(e) {
                        return h || !w(Se, u) || "sessionReplay" === e
                    }(e)) {
                    var t = ye.alternate[e],
                        n = u.split("."),
                        r = n.pop(),
                        i = n.join("-") + "." + r;
                    return t + ".browser-intake-" + i
                }
                return ye.classic[e] + "-http-intake.logs." + u
            }(n),
            m = function(e) {
                return b(e) ? "/api/v2/" + be[e] : "/v1/input/" + a
            }(n);

        function y() {
            var e = function(e, t) {
                    var n = "ddsource=" + (t || "browser") + "&ddtags=" + encodeURIComponent("sdk_version:" + i + (c ? ",env:" + c : "") + (l ? ",service:" + l : "") + (d ? ",version:" + d : ""));
                    b(e) && (n += "&dd-api-key=" + a + "&dd-evp-origin-version=" + encodeURIComponent(i) + "&dd-evp-origin=browser&dd-request-id=" + g());
                    "rum" === e && (n += "&batch_time=" + le());
                    return n
                }(n, r),
                t = "https://" + v + m + "?" + e;
            return o ? o + "?ddforward=" + encodeURIComponent(t) : f ? "https://" + f + m + "?ddhost=" + v + "&" + e : t
        }

        function b(e) {
            return 2 === p || !w(Ee, u) || "sessionReplay" === e
        }
        return {
            build: y,
            buildIntakeUrl: function() {
                if (o) return o + "?ddforward";
                var e = y();
                return e.slice(0, e.indexOf("?"))
            }
        }
    }

    function Te(t, n) {
        var r = function(t, n) {
                if (n.buildMode === $.E2E_TEST) {
                    var r = function(e) {
                        return {
                            build: function() {
                                return e
                            },
                            buildIntakeUrl: function() {
                                return e
                            }
                        }
                    };
                    return {
                        logsEndpointBuilder: r("<<< E2E LOGS ENDPOINT >>>"),
                        rumEndpointBuilder: r("<<< E2E RUM ENDPOINT >>>"),
                        sessionReplayEndpointBuilder: r("<<< E2E SESSION REPLAY ENDPOINT >>>"),
                        internalMonitoringEndpointBuilder: r("<<< E2E INTERNAL MONITORING ENDPOINT >>>")
                    }
                }
                var i = {
                    logsEndpointBuilder: ke(t, n, "logs"),
                    rumEndpointBuilder: ke(t, n, "rum"),
                    sessionReplayEndpointBuilder: ke(t, n, "sessionReplay")
                };
                if (t.internalMonitoringApiKey) return e(e({}, i), {
                    internalMonitoringEndpointBuilder: ke(e(e({}, t), {
                        clientToken: t.internalMonitoringApiKey
                    }), n, "logs", "browser-agent-internal-monitoring")
                });
                return i
            }(t, n),
            i = x(r).map((function(e) {
                return e.buildIntakeUrl()
            })),
            o = function(t, n, r) {
                if (n.buildMode !== $.STAGING || void 0 === t.replica) return;
                var i = e(e({}, t), {
                        site: we,
                        applicationId: t.replica.applicationId,
                        clientToken: t.replica.clientToken,
                        useAlternateIntakeDomains: !0,
                        intakeApiVersion: 2
                    }),
                    o = {
                        logsEndpointBuilder: ke(i, n, "logs"),
                        rumEndpointBuilder: ke(i, n, "rum"),
                        internalMonitoringEndpointBuilder: ke(i, n, "logs", "browser-agent-internal-monitoring")
                    };
                return r.push.apply(r, x(o).map((function(e) {
                    return e.buildIntakeUrl()
                }))), e({
                    applicationId: t.replica.applicationId
                }, o)
            }(t, n, i);
        return e(e({
            isIntakeUrl: function(e) {
                return i.some((function(t) {
                    return 0 === e.indexOf(t)
                }))
            }
        }, r), {
            replica: o
        })
    }

    function Oe(t, n) {
        var i;
        if (t && t.clientToken) {
            var o, s;
            if (void 0 === t.sampleRate || function(e) {
                    return "number" == typeof e
                }(o = t.sampleRate) && o >= 0 && o <= 100) return s = t.enableExperimentalFeatures, Array.isArray(s) && (C || (C = new Set(s)), s.filter((function(e) {
                return "string" == typeof e
            })).forEach((function(e) {
                C.add(e)
            }))), e(e({}, Te(t, n)), {
                beforeSend: t.beforeSend && ne(t.beforeSend, "beforeSend threw an error:"),
                cookieOptions: Ce(t),
                sampleRate: null !== (i = t.sampleRate) && void 0 !== i ? i : 100,
                service: t.service,
                silentMultipleInit: !!t.silentMultipleInit,
                batchBytesLimit: 16384,
                maxErrorsPerMinute: 3e3,
                maxInternalMonitoringMessagesPerPage: 15,
                requestErrorResponseLengthLimit: 32768,
                flushTimeout: 3e4,
                maxBatchSize: 50,
                maxMessageSize: 262144
            });
            r.error("Sample Rate should be a number between 0 and 100")
        } else r.error("Client Token is not configured, we will not send any data.")
    }

    function Ce(e) {
        var t = {};
        return t.secure = function(e) {
            return !!e.useSecureSessionCookie || !!e.useCrossSiteSessionCookie
        }(e), t.crossSite = !!e.useCrossSiteSessionCookie, e.trackSessionAcrossSubdomains && (t.domain = function() {
            if (void 0 === ie) {
                for (var e = "dd_site_test_" + g(), t = window.location.hostname.split("."), n = t.pop(); t.length && !ce(e);) n = t.pop() + "." + n, ae(e, "test", p, {
                    domain: n
                });
                fe(e, {
                    domain: n
                }), ie = n
            }
            return ie
        }()), t
    }
    var Re, Me = {
        buildMode: "release",
        sdkVersion: "3.11.0"
    };
    var Le = {
            debug: "debug",
            error: "error",
            info: "info",
            warn: "warn"
        },
        Be = ((Re = {})[Le.debug] = 0, Re[Le.info] = 1, Re[Le.warn] = 2, Re[Le.error] = 3, Re),
        Ae = (Object.keys(Le), "console"),
        _e = "http",
        Ie = function() {
            function t(e, t, n, r) {
                void 0 === t && (t = _e), void 0 === n && (n = Le.debug), void 0 === r && (r = {}), this.sendLog = e, this.handlerType = t, this.level = n, this.contextManager = re(), this.contextManager.set(r)
            }
            return t.prototype.log = function(t, n, i) {
                    if (void 0 === i && (i = Le.info), Be[i] >= Be[this.level]) {
                        var o = Array.isArray(this.handlerType) ? this.handlerType : [this.handlerType];
                        w(o, _e) && this.sendLog(e({
                            message: t,
                            status: i
                        }, T(this.contextManager.get(), n))), w(o, Ae) && r.log(i + ": " + t, T(this.contextManager.get(), n))
                    }
                }, t.prototype.debug = function(e, t) {
                    this.log(e, t, Le.debug)
                }, t.prototype.info = function(e, t) {
                    this.log(e, t, Le.info)
                }, t.prototype.warn = function(e, t) {
                    this.log(e, t, Le.warn)
                }, t.prototype.error = function(e, t) {
                    var n = {
                        error: {
                            origin: L
                        }
                    };
                    this.log(e, T(n, t), Le.error)
                }, t.prototype.setContext = function(e) {
                    this.contextManager.set(e)
                }, t.prototype.addContext = function(e, t) {
                    this.contextManager.add(e, t)
                }, t.prototype.removeContext = function(e) {
                    this.contextManager.remove(e)
                }, t.prototype.setHandler = function(e) {
                    this.handlerType = e
                }, t.prototype.setLevel = function(e) {
                    this.level = e
                },
                function(e, t, n, r) {
                    var i, o = arguments.length,
                        s = o < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
                    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, r);
                    else
                        for (var u = e.length - 1; u >= 0; u--)(i = e[u]) && (s = (o < 3 ? i(s) : o > 3 ? i(t, n, s) : i(t, n)) || s);
                    o > 3 && s && Object.defineProperty(t, n, s)
                }([X], t.prototype, "log", null), t
        }();
    var Ne, De, je = function() {
        function e(e) {
            this.onFirstSubscribe = e, this.observers = []
        }
        return e.prototype.subscribe = function(e) {
            var t = this;
            return !this.observers.length && this.onFirstSubscribe && (this.onLastUnsubscribe = this.onFirstSubscribe() || void 0), this.observers.push(e), {
                unsubscribe: function() {
                    t.observers = t.observers.filter((function(t) {
                        return e !== t
                    })), !t.observers.length && t.onLastUnsubscribe && t.onLastUnsubscribe()
                }
            }
        }, e.prototype.notify = function(e) {
            this.observers.forEach((function(t) {
                return t(e)
            }))
        }, e
    }();

    function ze(t) {
        (function() {
            De || (De = new je, Ne = console.error, console.error = function() {
                for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                var r = N();
                W((function() {
                    Ne.apply(console, t);
                    var n = e(e({}, Pe(t, r)), {
                        source: M,
                        startClocks: pe(),
                        handling: O.HANDLED
                    });
                    De.notify(n)
                }))
            });
            return De
        })().subscribe((function(e) {
            return t.notify(e)
        }))
    }

    function Pe(e, t) {
        var r = function(e, t) {
            for (var n = 0; n < e.length; n += 1) {
                var r = e[n];
                if (t(r, n, e)) return r
            }
        }(e, (function(e) {
            return e instanceof Error
        }));
        return {
            message: n(["console error:"], e).map((function(e) {
                return function(e) {
                    if ("string" == typeof e) return e;
                    if (e instanceof Error) return I(o(e));
                    return y(e, void 0, 2)
                }(e)
            })).join(" "),
            stack: r ? _(o(r)) : void 0,
            handlingStack: t
        }
    }

    function Ue(e, t, n) {
        var r = e[t],
            i = n(r),
            o = function() {
                return i.apply(this, arguments)
            };
        return e[t] = o, {
            stop: function() {
                e[t] === o ? e[t] = r : i = r
            }
        }
    }

    function He(e, t, n) {
        var r = n.before,
            i = n.after;
        return Ue(e, t, (function(e) {
            return function() {
                var t, n = arguments;
                return r && W(r, this, n), "function" == typeof e && (t = e.apply(this, n)), i && W(i, this, n), t
            }
        }))
    }
    var Fe, qe, Ge = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/;

    function $e(e) {
        var t = function(e) {
                return He(window, "onerror", {
                    before: function(t, n, r, i, s) {
                        var u;
                        if (s) u = o(s), e(u, s);
                        else {
                            var a, c = {
                                    url: n,
                                    column: i,
                                    line: r
                                },
                                f = t;
                            if ("[object String]" === {}.toString.call(t)) {
                                var l = Ge.exec(f);
                                l && (a = l[1], f = l[2])
                            }
                            e(u = {
                                name: a,
                                message: "string" == typeof f ? f : void 0,
                                stack: [c]
                            }, t)
                        }
                    }
                })
            }(e).stop,
            n = function(e) {
                return He(window, "onunhandledrejection", {
                    before: function(t) {
                        var n = t.reason || "Empty reason",
                            r = o(n);
                        e(r, n)
                    }
                })
            }(e).stop;
        return {
            stop: function() {
                t(), n()
            }
        }
    }

    function Ke(e) {
        return $e((function(t, n) {
            var r = function(e, t, n, r) {
                    return e && (void 0 !== e.message || t instanceof Error) ? {
                        message: e.message || "Empty message",
                        stack: _(e),
                        handlingStack: r,
                        type: e.name
                    } : {
                        message: n + " " + y(t),
                        stack: "No stack, consider using an instance of Error",
                        handlingStack: r,
                        type: e && e.name
                    }
                }(t, n, "Uncaught"),
                i = r.stack,
                o = r.message,
                s = r.type;
            e.notify({
                message: o,
                stack: i,
                type: s,
                source: A,
                startClocks: pe(),
                originalError: n,
                handling: O.UNHANDLED
            })
        }))
    }

    function Je() {
        var e;
        return Fe || (e = new je((function() {
            var t = He(XMLHttpRequest.prototype, "open", {
                    before: Xe
                }).stop,
                n = He(XMLHttpRequest.prototype, "send", {
                    before: function() {
                        Ve.call(this, e)
                    }
                }).stop,
                r = He(XMLHttpRequest.prototype, "abort", {
                    before: We
                }).stop;
            return function() {
                t(), n(), r()
            }
        })), Fe = e), Fe
    }

    function Xe(e, t) {
        this._datadog_xhr = {
            state: "open",
            method: e,
            url: ge(t)
        }
    }

    function Ve(t) {
        var n = this;
        if (this._datadog_xhr) {
            var r = this._datadog_xhr;
            r.state = "start", r.startTime = de(), r.startClocks = pe(), r.isAborted = !1, r.xhr = this;
            var i = !1,
                o = He(this, "onreadystatechange", {
                    before: function() {
                        this.readyState === XMLHttpRequest.DONE && s()
                    }
                }).stop,
                s = V((function() {
                    if (n.removeEventListener("loadend", s), o(), !i) {
                        i = !0;
                        var u = n._datadog_xhr;
                        u.state = "complete", u.duration = he(r.startClocks.timeStamp, le()), u.responseText = n.response, u.status = n.status, t.notify(e({}, u))
                    }
                }));
            this.addEventListener("loadend", s), t.notify(r)
        }
    }

    function We() {
        this._datadog_xhr && (this._datadog_xhr.isAborted = !0)
    }

    function Ye() {
        var e;
        return qe || (e = new je((function() {
            if (window.fetch) return Ue(window, "fetch", (function(t) {
                return function(n, r) {
                    var i, o = W(Ze, null, [e, n, r]);
                    return o ? (i = t.call(this, o.input, o.init), W(Qe, null, [e, i, o])) : i = t.call(this, n, r), i
                }
            })).stop
        })), qe = e), qe
    }

    function Ze(e, t, n) {
        var r = n && n.method || "object" == typeof t && t.method || "GET",
            i = ge("object" == typeof t && t.url || t),
            o = {
                state: "start",
                init: n,
                input: t,
                method: r,
                startClocks: pe(),
                url: i
            };
        return e.notify(o), o
    }

    function Qe(e, n, r) {
        var i = this,
            s = function(n) {
                return s = i, u = void 0, c = function() {
                    var i, s, u;
                    return t(this, (function(t) {
                        switch (t.label) {
                            case 0:
                                return (i = r).state = "complete", i.duration = he(i.startClocks.timeStamp, le()), "stack" in n || n instanceof Error ? (i.status = 0, i.responseText = _(o(n)), i.isAborted = n instanceof DOMException && n.code === DOMException.ABORT_ERR, i.error = n, e.notify(i), [3, 6]) : [3, 1];
                            case 1:
                                if (!("status" in n)) return [3, 6];
                                s = void 0, t.label = 2;
                            case 2:
                                return t.trys.push([2, 4, , 5]), [4, n.clone().text()];
                            case 3:
                                return s = t.sent(), [3, 5];
                            case 4:
                                return u = t.sent(), s = "Unable to retrieve response: " + u, [3, 5];
                            case 5:
                                i.response = n, i.responseText = s, i.responseType = n.type, i.status = n.status, i.isAborted = !1, e.notify(i), t.label = 6;
                            case 6:
                                return [2]
                        }
                    }))
                }, new((a = void 0) || (a = Promise))((function(e, t) {
                    function n(e) {
                        try {
                            i(c.next(e))
                        } catch (e) {
                            t(e)
                        }
                    }

                    function r(e) {
                        try {
                            i(c.throw(e))
                        } catch (e) {
                            t(e)
                        }
                    }

                    function i(t) {
                        t.done ? e(t.value) : new a((function(e) {
                            e(t.value)
                        })).then(n, r)
                    }
                    i((c = c.apply(s, u || [])).next())
                }));
                var s, u, a, c
            };
        n.then(V(s), V(s))
    }

    function et(e, t) {
        return e && e.length > t.requestErrorResponseLengthLimit ? e.substring(0, t.requestErrorResponseLengthLimit) + "..." : e
    }

    function tt(e) {
        return d.XHR === e ? "XHR" : "Fetch"
    }
    var nt = function() {
            function e(e) {
                var t = this;
                this.expireDelay = e, this.previousContexts = [], this.clearOldContextsInterval = setInterval((function() {
                    return t.clearOldContexts()
                }), 6e4)
            }
            return e.prototype.find = function(e) {
                if (void 0 === e || void 0 !== this.current && void 0 !== this.currentStart && e >= this.currentStart) return this.current;
                for (var t = 0, n = this.previousContexts; t < n.length; t++) {
                    var r = n[t];
                    if (e > r.endTime) break;
                    if (e >= r.startTime) return r.context
                }
            }, e.prototype.setCurrent = function(e, t) {
                this.current = e, this.currentStart = t
            }, e.prototype.getCurrent = function() {
                return this.current
            }, e.prototype.clearCurrent = function() {
                this.current = void 0, this.currentStart = void 0
            }, e.prototype.closeCurrent = function(e) {
                void 0 !== this.current && void 0 !== this.currentStart && (this.previousContexts.unshift({
                    endTime: e,
                    context: this.current,
                    startTime: this.currentStart
                }), this.clearCurrent())
            }, e.prototype.clearOldContexts = function() {
                for (var e = de() - this.expireDelay; this.previousContexts.length > 0 && this.previousContexts[this.previousContexts.length - 1].startTime < e;) this.previousContexts.pop()
            }, e.prototype.reset = function() {
                this.clearCurrent(), this.previousContexts = []
            }, e.prototype.stop = function() {
                clearInterval(this.clearOldContextsInterval)
            }, e
        }(),
        rt = "_dd_s",
        it = 9e5,
        ot = 144e5,
        st = /^([a-z]+)=([a-z0-9-]+)$/,
        ut = "&";

    function at(e, t, n) {
        var r = new je,
            i = new je,
            o = setInterval(V(u), 1e3),
            s = ct(e);

        function u() {
            var n = ct(e);
            return a() && (! function(e) {
                if (s.id !== e.id) return e.id && ft(s) && c(e, "different id"), !0;
                if (s[t] !== e[t]) return c(e, "different tracking type"), !0;
                return !1
            }(n) ? s = n : (s = {}, i.notify())), n
        }

        function a() {
            return void 0 !== s[t]
        }

        function c(e, n) {
            Y("Session inconsistencies detected", {
                debug: {
                    productKey: t,
                    sessionCache: s,
                    cookieSession: e,
                    cause: n
                }
            })
        }
        return {
            expandOrRenewSession: v(V((function() {
                var i = u();
                (function(r) {
                    var i = n(r[t]),
                        o = i.trackingType,
                        s = i.isTracked;
                    r[t] = o, s && !r.id && (r.id = g(), r.created = String(Date.now()));
                    return lt(r, e), s
                })(i) && !a() && function(e) {
                    s = e, r.notify()
                }(i), s = i
            })), 1e3).throttled,
            expandSession: function() {
                var t = u();
                a() && lt(t, e)
            },
            getSession: function() {
                return s
            },
            renewObservable: r,
            expireObservable: i,
            stop: function() {
                clearInterval(o)
            }
        }
    }

    function ct(e) {
        var t = function() {
            var e = ce(rt),
                t = {};
            (function(e) {
                return void 0 !== e && (-1 !== e.indexOf("&") || st.test(e))
            })(e) && e.split(ut).forEach((function(e) {
                var n = st.exec(e);
                if (null !== n) {
                    var r = n[1],
                        i = n[2];
                    t[r] = i
                }
            }));
            return t
        }();
        return ft(t) ? t : (dt(e), {})
    }

    function ft(e) {
        return (void 0 === e.created || Date.now() - Number(e.created) < ot) && (void 0 === e.expire || Date.now() < Number(e.expire))
    }

    function lt(e, t) {
        if (n = e, 0 !== Object.keys(n).length) {
            var n;
            e.expire = String(Date.now() + it);
            var r = function(e) {
                return Object.keys(e).map((function(t) {
                    return [t, e[t]]
                }))
            }(e).map((function(e) {
                return e[0] + "=" + e[1]
            })).join(ut);
            ae(rt, r, it, t)
        } else dt(t)
    }

    function dt(e) {
        ae(rt, "", 0, e)
    }
    var pt = [];

    function ht(e, t, n) {
        ! function(e) {
            var t = ce(rt),
                n = ce("_dd"),
                r = ce("_dd_r"),
                i = ce("_dd_l");
            if (!t) {
                var o = {};
                n && (o.id = n), i && /^[01]$/.test(i) && (o.logs = i), r && /^[012]$/.test(r) && (o.rum = r), lt(o, e)
            }
        }(e);
        var r = at(e, t, n);
        pt.push((function() {
            return r.stop()
        }));
        var i, o = new nt(144e5);

        function s() {
            return {
                id: r.getSession().id,
                trackingType: r.getSession()[t]
            }
        }
        return pt.push((function() {
                return o.stop()
            })), r.renewObservable.subscribe((function() {
                o.setCurrent(s(), de())
            })), r.expireObservable.subscribe((function() {
                o.closeCurrent(de())
            })), r.expandOrRenewSession(), o.setCurrent(s(), [0, ve()][0]), i = E(window, ["click", "touchstart", "keydown", "scroll"], (function() {
                return r.expandOrRenewSession()
            }), {
                capture: !0,
                passive: !0
            }).stop, pt.push(i),
            function(e) {
                var t = V((function() {
                        "visible" === document.visibilityState && e()
                    })),
                    n = S(document, "visibilitychange", t).stop;
                pt.push(n);
                var r = setInterval(t, 6e4);
                pt.push((function() {
                    clearInterval(r)
                }))
            }((function() {
                return r.expandSession()
            })), {
                findActiveSession: function(e) {
                    return o.find(e)
                },
                renewObservable: r.renewObservable,
                expireObservable: r.expireObservable
            }
    }
    var vt;

    function gt(e) {
        var t = ht(e.cookieOptions, "logs", (function(t) {
            return function(e, t) {
                var n = function(e) {
                    return e === vt.NOT_TRACKED || e === vt.TRACKED
                }(t) ? t : mt(e);
                return {
                    trackingType: n,
                    isTracked: n === vt.TRACKED
                }
            }(e, t)
        }));
        return {
            findTrackedSession: function(e) {
                var n = t.findActiveSession(e);
                return n && n.trackingType === vt.TRACKED ? {
                    id: n.id
                } : void 0
            }
        }
    }

    function mt(e) {
        return 0 !== (t = e.sampleRate) && 100 * Math.random() <= t ? vt.TRACKED : vt.NOT_TRACKED;
        var t
    }

    function yt(e) {
        var t = window.DD_RUM;
        return t && t.getInternalContext ? t.getInternalContext(e) : void 0
    }! function(e) {
        e.NOT_TRACKED = "0", e.TRACKED = "1"
    }(vt || (vt = {}));
    var bt, wt, xt, St, Et = function(t) {
        var n, i, o = !1,
            s = re(),
            u = {},
            a = new ue,
            c = function(e, t) {
                a.add((function() {
                    return c(e, t)
                }))
            },
            f = function() {},
            l = new Ie(d);
        return n = {
            logger: l,
            init: V((function(n) {
                if (j() && (n = function(t) {
                        return e(e({}, t), {
                            clientToken: "empty"
                        })
                    }(n)), function(e) {
                        return !o || (e.silentMultipleInit || r.error("DD_LOGS is already initialized."), !1)
                    }(n)) {
                    var i = function(t) {
                        var n = Oe(t, Me);
                        if (n) return e(e({}, n), {
                            forwardErrorsToLogs: !!t.forwardErrorsToLogs
                        })
                    }(n);
                    i && (c = t(i, l), f = function() {
                        return k(void 0, n)
                    }, a.drain(), o = !0)
                }
            })),
            getLoggerGlobalContext: V(s.get),
            setLoggerGlobalContext: V(s.set),
            addLoggerGlobalContext: V(s.add),
            removeLoggerGlobalContext: V(s.remove),
            createLogger: V((function(t, n) {
                return void 0 === n && (n = {}), u[t] = new Ie(d, n.handler, n.level, e(e({}, n.context), {
                    logger: {
                        name: t
                    }
                })), u[t]
            })),
            getLogger: V((function(e) {
                return u[e]
            })),
            getInitConfiguration: V((function() {
                return f()
            }))
        }, i = e(e({}, n), {
            onReady: function(e) {
                e()
            }
        }), Object.defineProperty(i, "_setDebug", {
            get: function() {
                return ee
            },
            enumerable: !1
        }), i;

        function d(e) {
            c(e, T({
                date: Date.now(),
                view: {
                    referrer: document.referrer,
                    url: window.location.href
                }
            }, s.get()))
        }
    }((function(e, t) {
        var n = J(e),
            i = new je;
        return e.forwardErrorsToLogs && (ze(i), Ke(i), function(e, t) {
                var n = Je().subscribe((function(e) {
                        "complete" === e.state && i(d.XHR, e)
                    })),
                    r = Ye().subscribe((function(e) {
                        "complete" === e.state && i(d.FETCH, e)
                    }));

                function i(n, r) {
                    e.isIntakeUrl(r.url) || ! function(e) {
                        return 0 === e.status && "opaque" !== e.responseType
                    }(r) && ! function(e) {
                        return e.status >= 500
                    }(r) || t.notify({
                        message: tt(n) + " error " + r.method + " " + r.url,
                        resource: {
                            method: r.method,
                            statusCode: r.status,
                            url: r.url
                        },
                        source: B,
                        stack: et(r.responseText, e) || "Failed to load",
                        startClocks: r.startClocks
                    })
                }
            }(e, i)),
            function(e, t, n, r, i) {
                n.setExternalContextProvider((function() {
                    var e;
                    return T({
                        session_id: null === (e = r.findTrackedSession()) || void 0 === e ? void 0 : e.id
                    }, yt(), {
                        view: {
                            name: null,
                            url: null,
                            referrer: null
                        }
                    })
                }));
                var o, s = function(e, t, n) {
                    var r = (i = Le.error, o = t.maxErrorsPerMinute, s = n, u = 0, a = !1, {
                        isLimitReached: function() {
                            if (0 === u && setTimeout((function() {
                                    u = 0
                                }), h), (u += 1) <= o || a) return a = !1, !1;
                            if (u === o + 1) {
                                a = !0;
                                try {
                                    s({
                                        message: "Reached max number of " + i + "s by minute: " + o,
                                        source: R,
                                        startClocks: pe()
                                    })
                                } finally {
                                    a = !1
                                }
                            }
                            return !0
                        }
                    });
                    var i, o, s, u, a;
                    return function(n, i) {
                        var o = n.date ? n.date - ve() : void 0,
                            s = e.findTrackedSession(o);
                        if (s) {
                            var u = T({
                                service: t.service,
                                session_id: s.id
                            }, i, yt(o), n);
                            if (!(t.beforeSend && !1 === t.beforeSend(u) || u.status === Le.error && r.isLimitReached())) return u
                        }
                    }
                }(r, e, c);
                if (j()) {
                    var u = D();
                    o = function(e) {
                        return u.send("log", e)
                    }
                } else {
                    var a = function(e) {
                        var t, n = r(e.logsEndpointBuilder);

                        function r(t) {
                            return new U(new F(t, e.batchBytesLimit), e.maxBatchSize, e.batchBytesLimit, e.maxMessageSize, e.flushTimeout)
                        }
                        return void 0 !== e.replica && (t = r(e.replica.logsEndpointBuilder)), {
                            add: function(e) {
                                n.add(e), t && t.add(e)
                            }
                        }
                    }(e);
                    o = function(e) {
                        return a.add(e)
                    }
                }

                function c(e) {
                    i.error(e.message, T({
                        date: e.startClocks.timeStamp,
                        error: {
                            kind: e.type,
                            origin: e.source,
                            stack: e.stack
                        }
                    }, e.resource ? {
                        http: {
                            method: e.resource.method,
                            status_code: e.resource.statusCode,
                            url: e.resource.url
                        }
                    } : void 0))
                }
                return t.subscribe(c),
                    function(e, t) {
                        var n = s(e, t);
                        n && o(n)
                    }
            }(e, i, n, function(e) {
                if (void 0 === document.cookie || null === document.cookie) return !1;
                try {
                    var t = "dd_cookie_test_" + g(),
                        n = "test";
                    ae(t, n, p, e);
                    var i = ce(t) === n;
                    return fe(t, e), i
                } catch (e) {
                    return r.error(e), !1
                }
            }(e.cookieOptions) && !j() ? gt(e) : function(e) {
                var t = mt(e) === vt.TRACKED ? {} : void 0;
                return {
                    findTrackedSession: function() {
                        return t
                    }
                }
            }(e), t)
    }));
    bt = function() {
        if ("object" == typeof globalThis) return globalThis;
        Object.defineProperty(Object.prototype, "_dd_temp_", {
            get: function() {
                return this
            },
            configurable: !0
        });
        var e = _dd_temp_;
        return delete Object.prototype._dd_temp_, "object" != typeof e && (e = "object" == typeof self ? self : "object" == typeof window ? window : {}), e
    }(), xt = Et, St = bt[wt = "DD_LOGS"], bt[wt] = xt, St && St.q && St.q.forEach((function(e) {
        return ne(e, "onReady callback threw an error:")()
    }))
}();