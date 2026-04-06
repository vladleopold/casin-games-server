var Pf = (e, t, n) => {
    if (!t.has(e)) throw TypeError("Cannot " + n)
};
var x = (e, t, n) => (Pf(e, t, "read from private field"), n ? n.call(e) : t.get(e)),
    U = (e, t, n) => {
        if (t.has(e)) throw TypeError("Cannot add the same private member more than once");
        t instanceof WeakSet ? t.add(e) : t.set(e, n)
    },
    $ = (e, t, n, r) => (Pf(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n);
var Du = (e, t, n, r) => ({
        set _(i) {
            $(e, t, i, n)
        },
        get _() {
            return x(e, t, r)
        }
    }),
    K = (e, t, n) => (Pf(e, t, "access private method"), n);

function Oc(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
}
var o1 = {
        exports: {}
    },
    bc = {},
    s1 = {
        exports: {}
    },
    Z = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var yu = Symbol.for("react.element"),
    qT = Symbol.for("react.portal"),
    XT = Symbol.for("react.fragment"),
    QT = Symbol.for("react.strict_mode"),
    KT = Symbol.for("react.profiler"),
    YT = Symbol.for("react.provider"),
    ZT = Symbol.for("react.context"),
    JT = Symbol.for("react.forward_ref"),
    eO = Symbol.for("react.suspense"),
    tO = Symbol.for("react.memo"),
    nO = Symbol.for("react.lazy"),
    Ev = Symbol.iterator;

function rO(e) {
    return e === null || typeof e != "object" ? null : (e = Ev && e[Ev] || e["@@iterator"], typeof e == "function" ? e : null)
}
var a1 = {
        isMounted: function() {
            return !1
        },
        enqueueForceUpdate: function() {},
        enqueueReplaceState: function() {},
        enqueueSetState: function() {}
    },
    u1 = Object.assign,
    l1 = {};

function $s(e, t, n) {
    this.props = e, this.context = t, this.refs = l1, this.updater = n || a1
}
$s.prototype.isReactComponent = {};
$s.prototype.setState = function(e, t) {
    if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, e, t, "setState")
};
$s.prototype.forceUpdate = function(e) {
    this.updater.enqueueForceUpdate(this, e, "forceUpdate")
};

function c1() {}
c1.prototype = $s.prototype;

function Vp(e, t, n) {
    this.props = e, this.context = t, this.refs = l1, this.updater = n || a1
}
var Wp = Vp.prototype = new c1;
Wp.constructor = Vp;
u1(Wp, $s.prototype);
Wp.isPureReactComponent = !0;
var Sv = Array.isArray,
    f1 = Object.prototype.hasOwnProperty,
    qp = {
        current: null
    },
    h1 = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
    };

function d1(e, t, n) {
    var r, i = {},
        o = null,
        s = null;
    if (t != null)
        for (r in t.ref !== void 0 && (s = t.ref), t.key !== void 0 && (o = "" + t.key), t) f1.call(t, r) && !h1.hasOwnProperty(r) && (i[r] = t[r]);
    var a = arguments.length - 2;
    if (a === 1) i.children = n;
    else if (1 < a) {
        for (var u = Array(a), l = 0; l < a; l++) u[l] = arguments[l + 2];
        i.children = u
    }
    if (e && e.defaultProps)
        for (r in a = e.defaultProps, a) i[r] === void 0 && (i[r] = a[r]);
    return {
        $$typeof: yu,
        type: e,
        key: o,
        ref: s,
        props: i,
        _owner: qp.current
    }
}

function iO(e, t) {
    return {
        $$typeof: yu,
        type: e.type,
        key: t,
        ref: e.ref,
        props: e.props,
        _owner: e._owner
    }
}

function Xp(e) {
    return typeof e == "object" && e !== null && e.$$typeof === yu
}

function oO(e) {
    var t = {
        "=": "=0",
        ":": "=2"
    };
    return "$" + e.replace(/[=:]/g, function(n) {
        return t[n]
    })
}
var wv = /\/+/g;

function Cf(e, t) {
    return typeof e == "object" && e !== null && e.key != null ? oO("" + e.key) : t.toString(36)
}

function pl(e, t, n, r, i) {
    var o = typeof e;
    (o === "undefined" || o === "boolean") && (e = null);
    var s = !1;
    if (e === null) s = !0;
    else switch (o) {
        case "string":
        case "number":
            s = !0;
            break;
        case "object":
            switch (e.$$typeof) {
                case yu:
                case qT:
                    s = !0
            }
    }
    if (s) return s = e, i = i(s), e = r === "" ? "." + Cf(s, 0) : r, Sv(i) ? (n = "", e != null && (n = e.replace(wv, "$&/") + "/"), pl(i, t, n, "", function(l) {
        return l
    })) : i != null && (Xp(i) && (i = iO(i, n + (!i.key || s && s.key === i.key ? "" : ("" + i.key).replace(wv, "$&/") + "/") + e)), t.push(i)), 1;
    if (s = 0, r = r === "" ? "." : r + ":", Sv(e))
        for (var a = 0; a < e.length; a++) {
            o = e[a];
            var u = r + Cf(o, a);
            s += pl(o, t, n, u, i)
        } else if (u = rO(e), typeof u == "function")
            for (e = u.call(e), a = 0; !(o = e.next()).done;) o = o.value, u = r + Cf(o, a++), s += pl(o, t, n, u, i);
        else if (o === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
    return s
}

function Fu(e, t, n) {
    if (e == null) return e;
    var r = [],
        i = 0;
    return pl(e, r, "", "", function(o) {
        return t.call(n, o, i++)
    }), r
}

function sO(e) {
    if (e._status === -1) {
        var t = e._result;
        t = t(), t.then(function(n) {
            (e._status === 0 || e._status === -1) && (e._status = 1, e._result = n)
        }, function(n) {
            (e._status === 0 || e._status === -1) && (e._status = 2, e._result = n)
        }), e._status === -1 && (e._status = 0, e._result = t)
    }
    if (e._status === 1) return e._result.default;
    throw e._result
}
var vt = {
        current: null
    },
    ml = {
        transition: null
    },
    aO = {
        ReactCurrentDispatcher: vt,
        ReactCurrentBatchConfig: ml,
        ReactCurrentOwner: qp
    };
Z.Children = {
    map: Fu,
    forEach: function(e, t, n) {
        Fu(e, function() {
            t.apply(this, arguments)
        }, n)
    },
    count: function(e) {
        var t = 0;
        return Fu(e, function() {
            t++
        }), t
    },
    toArray: function(e) {
        return Fu(e, function(t) {
            return t
        }) || []
    },
    only: function(e) {
        if (!Xp(e)) throw Error("React.Children.only expected to receive a single React element child.");
        return e
    }
};
Z.Component = $s;
Z.Fragment = XT;
Z.Profiler = KT;
Z.PureComponent = Vp;
Z.StrictMode = QT;
Z.Suspense = eO;
Z.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = aO;
Z.cloneElement = function(e, t, n) {
    if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
    var r = u1({}, e.props),
        i = e.key,
        o = e.ref,
        s = e._owner;
    if (t != null) {
        if (t.ref !== void 0 && (o = t.ref, s = qp.current), t.key !== void 0 && (i = "" + t.key), e.type && e.type.defaultProps) var a = e.type.defaultProps;
        for (u in t) f1.call(t, u) && !h1.hasOwnProperty(u) && (r[u] = t[u] === void 0 && a !== void 0 ? a[u] : t[u])
    }
    var u = arguments.length - 2;
    if (u === 1) r.children = n;
    else if (1 < u) {
        a = Array(u);
        for (var l = 0; l < u; l++) a[l] = arguments[l + 2];
        r.children = a
    }
    return {
        $$typeof: yu,
        type: e.type,
        key: i,
        ref: o,
        props: r,
        _owner: s
    }
};
Z.createContext = function(e) {
    return e = {
        $$typeof: ZT,
        _currentValue: e,
        _currentValue2: e,
        _threadCount: 0,
        Provider: null,
        Consumer: null,
        _defaultValue: null,
        _globalName: null
    }, e.Provider = {
        $$typeof: YT,
        _context: e
    }, e.Consumer = e
};
Z.createElement = d1;
Z.createFactory = function(e) {
    var t = d1.bind(null, e);
    return t.type = e, t
};
Z.createRef = function() {
    return {
        current: null
    }
};
Z.forwardRef = function(e) {
    return {
        $$typeof: JT,
        render: e
    }
};
Z.isValidElement = Xp;
Z.lazy = function(e) {
    return {
        $$typeof: nO,
        _payload: {
            _status: -1,
            _result: e
        },
        _init: sO
    }
};
Z.memo = function(e, t) {
    return {
        $$typeof: tO,
        type: e,
        compare: t === void 0 ? null : t
    }
};
Z.startTransition = function(e) {
    var t = ml.transition;
    ml.transition = {};
    try {
        e()
    } finally {
        ml.transition = t
    }
};
Z.unstable_act = function() {
    throw Error("act(...) is not supported in production builds of React.")
};
Z.useCallback = function(e, t) {
    return vt.current.useCallback(e, t)
};
Z.useContext = function(e) {
    return vt.current.useContext(e)
};
Z.useDebugValue = function() {};
Z.useDeferredValue = function(e) {
    return vt.current.useDeferredValue(e)
};
Z.useEffect = function(e, t) {
    return vt.current.useEffect(e, t)
};
Z.useId = function() {
    return vt.current.useId()
};
Z.useImperativeHandle = function(e, t, n) {
    return vt.current.useImperativeHandle(e, t, n)
};
Z.useInsertionEffect = function(e, t) {
    return vt.current.useInsertionEffect(e, t)
};
Z.useLayoutEffect = function(e, t) {
    return vt.current.useLayoutEffect(e, t)
};
Z.useMemo = function(e, t) {
    return vt.current.useMemo(e, t)
};
Z.useReducer = function(e, t, n) {
    return vt.current.useReducer(e, t, n)
};
Z.useRef = function(e) {
    return vt.current.useRef(e)
};
Z.useState = function(e) {
    return vt.current.useState(e)
};
Z.useSyncExternalStore = function(e, t, n) {
    return vt.current.useSyncExternalStore(e, t, n)
};
Z.useTransition = function() {
    return vt.current.useTransition()
};
Z.version = "18.2.0";
s1.exports = Z;
var L = s1.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var uO = L,
    lO = Symbol.for("react.element"),
    cO = Symbol.for("react.fragment"),
    fO = Object.prototype.hasOwnProperty,
    hO = uO.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    dO = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
    };

function p1(e, t, n) {
    var r, i = {},
        o = null,
        s = null;
    n !== void 0 && (o = "" + n), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (s = t.ref);
    for (r in t) fO.call(t, r) && !dO.hasOwnProperty(r) && (i[r] = t[r]);
    if (e && e.defaultProps)
        for (r in t = e.defaultProps, t) i[r] === void 0 && (i[r] = t[r]);
    return {
        $$typeof: lO,
        type: e,
        key: o,
        ref: s,
        props: i,
        _owner: hO.current
    }
}
bc.Fragment = cO;
bc.jsx = p1;
bc.jsxs = p1;
o1.exports = bc;
var Q = o1.exports,
    m1 = {
        exports: {}
    },
    Yt = {},
    v1 = {
        exports: {}
    },
    g1 = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(e) {
    function t(M, C) {
        var P = M.length;
        M.push(C);
        e: for (; 0 < P;) {
            var R = P - 1 >>> 1,
                k = M[R];
            if (0 < i(k, C)) M[R] = C, M[P] = k, P = R;
            else break e
        }
    }

    function n(M) {
        return M.length === 0 ? null : M[0]
    }

    function r(M) {
        if (M.length === 0) return null;
        var C = M[0],
            P = M.pop();
        if (P !== C) {
            M[0] = P;
            e: for (var R = 0, k = M.length, B = k >>> 1; R < B;) {
                var F = 2 * (R + 1) - 1,
                    q = M[F],
                    re = F + 1,
                    Se = M[re];
                if (0 > i(q, P)) re < k && 0 > i(Se, q) ? (M[R] = Se, M[re] = P, R = re) : (M[R] = q, M[F] = P, R = F);
                else if (re < k && 0 > i(Se, P)) M[R] = Se, M[re] = P, R = re;
                else break e
            }
        }
        return C
    }

    function i(M, C) {
        var P = M.sortIndex - C.sortIndex;
        return P !== 0 ? P : M.id - C.id
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
        var o = performance;
        e.unstable_now = function() {
            return o.now()
        }
    } else {
        var s = Date,
            a = s.now();
        e.unstable_now = function() {
            return s.now() - a
        }
    }
    var u = [],
        l = [],
        c = 1,
        f = null,
        h = 3,
        p = !1,
        y = !1,
        m = !1,
        _ = typeof setTimeout == "function" ? setTimeout : null,
        g = typeof clearTimeout == "function" ? clearTimeout : null,
        d = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);

    function v(M) {
        for (var C = n(l); C !== null;) {
            if (C.callback === null) r(l);
            else if (C.startTime <= M) r(l), C.sortIndex = C.expirationTime, t(u, C);
            else break;
            C = n(l)
        }
    }

    function E(M) {
        if (m = !1, v(M), !y)
            if (n(u) !== null) y = !0, V(S);
            else {
                var C = n(l);
                C !== null && Y(E, C.startTime - M)
            }
    }

    function S(M, C) {
        y = !1, m && (m = !1, g(O), O = -1), p = !0;
        var P = h;
        try {
            for (v(C), f = n(u); f !== null && (!(f.expirationTime > C) || M && !N());) {
                var R = f.callback;
                if (typeof R == "function") {
                    f.callback = null, h = f.priorityLevel;
                    var k = R(f.expirationTime <= C);
                    C = e.unstable_now(), typeof k == "function" ? f.callback = k : f === n(u) && r(u), v(C)
                } else r(u);
                f = n(u)
            }
            if (f !== null) var B = !0;
            else {
                var F = n(l);
                F !== null && Y(E, F.startTime - C), B = !1
            }
            return B
        } finally {
            f = null, h = P, p = !1
        }
    }
    var w = !1,
        T = null,
        O = -1,
        b = 5,
        I = -1;

    function N() {
        return !(e.unstable_now() - I < b)
    }

    function D() {
        if (T !== null) {
            var M = e.unstable_now();
            I = M;
            var C = !0;
            try {
                C = T(!0, M)
            } finally {
                C ? G() : (w = !1, T = null)
            }
        } else w = !1
    }
    var G;
    if (typeof d == "function") G = function() {
        d(D)
    };
    else if (typeof MessageChannel < "u") {
        var H = new MessageChannel,
            W = H.port2;
        H.port1.onmessage = D, G = function() {
            W.postMessage(null)
        }
    } else G = function() {
        _(D, 0)
    };

    function V(M) {
        T = M, w || (w = !0, G())
    }

    function Y(M, C) {
        O = _(function() {
            M(e.unstable_now())
        }, C)
    }
    e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(M) {
        M.callback = null
    }, e.unstable_continueExecution = function() {
        y || p || (y = !0, V(S))
    }, e.unstable_forceFrameRate = function(M) {
        0 > M || 125 < M ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : b = 0 < M ? Math.floor(1e3 / M) : 5
    }, e.unstable_getCurrentPriorityLevel = function() {
        return h
    }, e.unstable_getFirstCallbackNode = function() {
        return n(u)
    }, e.unstable_next = function(M) {
        switch (h) {
            case 1:
            case 2:
            case 3:
                var C = 3;
                break;
            default:
                C = h
        }
        var P = h;
        h = C;
        try {
            return M()
        } finally {
            h = P
        }
    }, e.unstable_pauseExecution = function() {}, e.unstable_requestPaint = function() {}, e.unstable_runWithPriority = function(M, C) {
        switch (M) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            default:
                M = 3
        }
        var P = h;
        h = M;
        try {
            return C()
        } finally {
            h = P
        }
    }, e.unstable_scheduleCallback = function(M, C, P) {
        var R = e.unstable_now();
        switch (typeof P == "object" && P !== null ? (P = P.delay, P = typeof P == "number" && 0 < P ? R + P : R) : P = R, M) {
            case 1:
                var k = -1;
                break;
            case 2:
                k = 250;
                break;
            case 5:
                k = 1073741823;
                break;
            case 4:
                k = 1e4;
                break;
            default:
                k = 5e3
        }
        return k = P + k, M = {
            id: c++,
            callback: C,
            priorityLevel: M,
            startTime: P,
            expirationTime: k,
            sortIndex: -1
        }, P > R ? (M.sortIndex = P, t(l, M), n(u) === null && M === n(l) && (m ? (g(O), O = -1) : m = !0, Y(E, P - R))) : (M.sortIndex = k, t(u, M), y || p || (y = !0, V(S))), M
    }, e.unstable_shouldYield = N, e.unstable_wrapCallback = function(M) {
        var C = h;
        return function() {
            var P = h;
            h = C;
            try {
                return M.apply(this, arguments)
            } finally {
                h = P
            }
        }
    }
})(g1);
v1.exports = g1;
var pO = v1.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var y1 = L,
    Qt = pO;

function A(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
}
var _1 = new Set,
    Ma = {};

function ao(e, t) {
    ps(e, t), ps(e + "Capture", t)
}

function ps(e, t) {
    for (Ma[e] = t, e = 0; e < t.length; e++) _1.add(t[e])
}
var pr = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"),
    Wh = Object.prototype.hasOwnProperty,
    mO = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    xv = {},
    Tv = {};

function vO(e) {
    return Wh.call(Tv, e) ? !0 : Wh.call(xv, e) ? !1 : mO.test(e) ? Tv[e] = !0 : (xv[e] = !0, !1)
}

function gO(e, t, n, r) {
    if (n !== null && n.type === 0) return !1;
    switch (typeof t) {
        case "function":
        case "symbol":
            return !0;
        case "boolean":
            return r ? !1 : n !== null ? !n.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
        default:
            return !1
    }
}

function yO(e, t, n, r) {
    if (t === null || typeof t > "u" || gO(e, t, n, r)) return !0;
    if (r) return !1;
    if (n !== null) switch (n.type) {
        case 3:
            return !t;
        case 4:
            return t === !1;
        case 5:
            return isNaN(t);
        case 6:
            return isNaN(t) || 1 > t
    }
    return !1
}

function gt(e, t, n, r, i, o, s) {
    this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = i, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = s
}
var Ze = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
    Ze[e] = new gt(e, 0, !1, e, null, !1, !1)
});
[
    ["acceptCharset", "accept-charset"],
    ["className", "class"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"]
].forEach(function(e) {
    var t = e[0];
    Ze[t] = new gt(t, 1, !1, e[1], null, !1, !1)
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    Ze[e] = new gt(e, 2, !1, e.toLowerCase(), null, !1, !1)
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    Ze[e] = new gt(e, 2, !1, e, null, !1, !1)
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
    Ze[e] = new gt(e, 3, !1, e.toLowerCase(), null, !1, !1)
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
    Ze[e] = new gt(e, 3, !0, e, null, !1, !1)
});
["capture", "download"].forEach(function(e) {
    Ze[e] = new gt(e, 4, !1, e, null, !1, !1)
});
["cols", "rows", "size", "span"].forEach(function(e) {
    Ze[e] = new gt(e, 6, !1, e, null, !1, !1)
});
["rowSpan", "start"].forEach(function(e) {
    Ze[e] = new gt(e, 5, !1, e.toLowerCase(), null, !1, !1)
});
var Qp = /[\-:]([a-z])/g;

function Kp(e) {
    return e[1].toUpperCase()
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var t = e.replace(Qp, Kp);
    Ze[t] = new gt(t, 1, !1, e, null, !1, !1)
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace(Qp, Kp);
    Ze[t] = new gt(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1)
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace(Qp, Kp);
    Ze[t] = new gt(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1)
});
["tabIndex", "crossOrigin"].forEach(function(e) {
    Ze[e] = new gt(e, 1, !1, e.toLowerCase(), null, !1, !1)
});
Ze.xlinkHref = new gt("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
    Ze[e] = new gt(e, 1, !1, e.toLowerCase(), null, !0, !0)
});

function Yp(e, t, n, r) {
    var i = Ze.hasOwnProperty(t) ? Ze[t] : null;
    (i !== null ? i.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (yO(t, n, i, r) && (n = null), r || i === null ? vO(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : i.mustUseProperty ? e[i.propertyName] = n === null ? i.type === 3 ? !1 : "" : n : (t = i.attributeName, r = i.attributeNamespace, n === null ? e.removeAttribute(t) : (i = i.type, n = i === 3 || i === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))))
}
var Er = y1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    $u = Symbol.for("react.element"),
    Po = Symbol.for("react.portal"),
    Co = Symbol.for("react.fragment"),
    Zp = Symbol.for("react.strict_mode"),
    qh = Symbol.for("react.profiler"),
    E1 = Symbol.for("react.provider"),
    S1 = Symbol.for("react.context"),
    Jp = Symbol.for("react.forward_ref"),
    Xh = Symbol.for("react.suspense"),
    Qh = Symbol.for("react.suspense_list"),
    em = Symbol.for("react.memo"),
    Mr = Symbol.for("react.lazy"),
    w1 = Symbol.for("react.offscreen"),
    Ov = Symbol.iterator;

function Qs(e) {
    return e === null || typeof e != "object" ? null : (e = Ov && e[Ov] || e["@@iterator"], typeof e == "function" ? e : null)
}
var Ce = Object.assign,
    Rf;

function ua(e) {
    if (Rf === void 0) try {
        throw Error()
    } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        Rf = t && t[1] || ""
    }
    return `
` + Rf + e
}
var kf = !1;

function Mf(e, t) {
    if (!e || kf) return "";
    kf = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
        if (t)
            if (t = function() {
                    throw Error()
                }, Object.defineProperty(t.prototype, "props", {
                    set: function() {
                        throw Error()
                    }
                }), typeof Reflect == "object" && Reflect.construct) {
                try {
                    Reflect.construct(t, [])
                } catch (l) {
                    var r = l
                }
                Reflect.construct(e, [], t)
            } else {
                try {
                    t.call()
                } catch (l) {
                    r = l
                }
                e.call(t.prototype)
            }
        else {
            try {
                throw Error()
            } catch (l) {
                r = l
            }
            e()
        }
    } catch (l) {
        if (l && r && typeof l.stack == "string") {
            for (var i = l.stack.split(`
`), o = r.stack.split(`
`), s = i.length - 1, a = o.length - 1; 1 <= s && 0 <= a && i[s] !== o[a];) a--;
            for (; 1 <= s && 0 <= a; s--, a--)
                if (i[s] !== o[a]) {
                    if (s !== 1 || a !== 1)
                        do
                            if (s--, a--, 0 > a || i[s] !== o[a]) {
                                var u = `
` + i[s].replace(" at new ", " at ");
                                return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u
                            }
                    while (1 <= s && 0 <= a);
                    break
                }
        }
    } finally {
        kf = !1, Error.prepareStackTrace = n
    }
    return (e = e ? e.displayName || e.name : "") ? ua(e) : ""
}

function _O(e) {
    switch (e.tag) {
        case 5:
            return ua(e.type);
        case 16:
            return ua("Lazy");
        case 13:
            return ua("Suspense");
        case 19:
            return ua("SuspenseList");
        case 0:
        case 2:
        case 15:
            return e = Mf(e.type, !1), e;
        case 11:
            return e = Mf(e.type.render, !1), e;
        case 1:
            return e = Mf(e.type, !0), e;
        default:
            return ""
    }
}

function Kh(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
        case Co:
            return "Fragment";
        case Po:
            return "Portal";
        case qh:
            return "Profiler";
        case Zp:
            return "StrictMode";
        case Xh:
            return "Suspense";
        case Qh:
            return "SuspenseList"
    }
    if (typeof e == "object") switch (e.$$typeof) {
        case S1:
            return (e.displayName || "Context") + ".Consumer";
        case E1:
            return (e._context.displayName || "Context") + ".Provider";
        case Jp:
            var t = e.render;
            return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case em:
            return t = e.displayName || null, t !== null ? t : Kh(e.type) || "Memo";
        case Mr:
            t = e._payload, e = e._init;
            try {
                return Kh(e(t))
            } catch {}
    }
    return null
}

function EO(e) {
    var t = e.type;
    switch (e.tag) {
        case 24:
            return "Cache";
        case 9:
            return (t.displayName || "Context") + ".Consumer";
        case 10:
            return (t._context.displayName || "Context") + ".Provider";
        case 18:
            return "DehydratedFragment";
        case 11:
            return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
        case 7:
            return "Fragment";
        case 5:
            return t;
        case 4:
            return "Portal";
        case 3:
            return "Root";
        case 6:
            return "Text";
        case 16:
            return Kh(t);
        case 8:
            return t === Zp ? "StrictMode" : "Mode";
        case 22:
            return "Offscreen";
        case 12:
            return "Profiler";
        case 21:
            return "Scope";
        case 13:
            return "Suspense";
        case 19:
            return "SuspenseList";
        case 25:
            return "TracingMarker";
        case 1:
        case 0:
        case 17:
        case 2:
        case 14:
        case 15:
            if (typeof t == "function") return t.displayName || t.name || null;
            if (typeof t == "string") return t
    }
    return null
}

function ai(e) {
    switch (typeof e) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
            return e;
        case "object":
            return e;
        default:
            return ""
    }
}

function x1(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio")
}

function SO(e) {
    var t = x1(e) ? "checked" : "value",
        n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
        r = "" + e[t];
    if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
        var i = n.get,
            o = n.set;
        return Object.defineProperty(e, t, {
            configurable: !0,
            get: function() {
                return i.call(this)
            },
            set: function(s) {
                r = "" + s, o.call(this, s)
            }
        }), Object.defineProperty(e, t, {
            enumerable: n.enumerable
        }), {
            getValue: function() {
                return r
            },
            setValue: function(s) {
                r = "" + s
            },
            stopTracking: function() {
                e._valueTracker = null, delete e[t]
            }
        }
    }
}

function Bu(e) {
    e._valueTracker || (e._valueTracker = SO(e))
}

function T1(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(),
        r = "";
    return e && (r = x1(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1
}

function Dl(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
        return e.activeElement || e.body
    } catch {
        return e.body
    }
}

function Yh(e, t) {
    var n = t.checked;
    return Ce({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: n ? ? e._wrapperState.initialChecked
    })
}

function bv(e, t) {
    var n = t.defaultValue == null ? "" : t.defaultValue,
        r = t.checked != null ? t.checked : t.defaultChecked;
    n = ai(t.value != null ? t.value : n), e._wrapperState = {
        initialChecked: r,
        initialValue: n,
        controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null
    }
}

function O1(e, t) {
    t = t.checked, t != null && Yp(e, "checked", t, !1)
}

function Zh(e, t) {
    O1(e, t);
    var n = ai(t.value),
        r = t.type;
    if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
    else if (r === "submit" || r === "reset") {
        e.removeAttribute("value");
        return
    }
    t.hasOwnProperty("value") ? Jh(e, t.type, n) : t.hasOwnProperty("defaultValue") && Jh(e, t.type, ai(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked)
}

function Pv(e, t, n) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var r = t.type;
        if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
        t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t
    }
    n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n)
}

function Jh(e, t, n) {
    (t !== "number" || Dl(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n))
}
var la = Array.isArray;

function Uo(e, t, n, r) {
    if (e = e.options, t) {
        t = {};
        for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
        for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0)
    } else {
        for (n = "" + ai(n), t = null, i = 0; i < e.length; i++) {
            if (e[i].value === n) {
                e[i].selected = !0, r && (e[i].defaultSelected = !0);
                return
            }
            t !== null || e[i].disabled || (t = e[i])
        }
        t !== null && (t.selected = !0)
    }
}

function ed(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(A(91));
    return Ce({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: "" + e._wrapperState.initialValue
    })
}

function Cv(e, t) {
    var n = t.value;
    if (n == null) {
        if (n = t.children, t = t.defaultValue, n != null) {
            if (t != null) throw Error(A(92));
            if (la(n)) {
                if (1 < n.length) throw Error(A(93));
                n = n[0]
            }
            t = n
        }
        t == null && (t = ""), n = t
    }
    e._wrapperState = {
        initialValue: ai(n)
    }
}

function b1(e, t) {
    var n = ai(t.value),
        r = ai(t.defaultValue);
    n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r)
}

function Rv(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t)
}

function P1(e) {
    switch (e) {
        case "svg":
            return "http://www.w3.org/2000/svg";
        case "math":
            return "http://www.w3.org/1998/Math/MathML";
        default:
            return "http://www.w3.org/1999/xhtml"
    }
}

function td(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml" ? P1(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e
}
var ju, C1 = function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, i) {
        MSApp.execUnsafeLocalFunction(function() {
            return e(t, n, r, i)
        })
    } : e
}(function(e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
    else {
        for (ju = ju || document.createElement("div"), ju.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = ju.firstChild; e.firstChild;) e.removeChild(e.firstChild);
        for (; t.firstChild;) e.appendChild(t.firstChild)
    }
});

function Ia(e, t) {
    if (t) {
        var n = e.firstChild;
        if (n && n === e.lastChild && n.nodeType === 3) {
            n.nodeValue = t;
            return
        }
    }
    e.textContent = t
}
var ya = {
        animationIterationCount: !0,
        aspectRatio: !0,
        borderImageOutset: !0,
        borderImageSlice: !0,
        borderImageWidth: !0,
        boxFlex: !0,
        boxFlexGroup: !0,
        boxOrdinalGroup: !0,
        columnCount: !0,
        columns: !0,
        flex: !0,
        flexGrow: !0,
        flexPositive: !0,
        flexShrink: !0,
        flexNegative: !0,
        flexOrder: !0,
        gridArea: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowSpan: !0,
        gridRowStart: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnSpan: !0,
        gridColumnStart: !0,
        fontWeight: !0,
        lineClamp: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        tabSize: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
        fillOpacity: !0,
        floodOpacity: !0,
        stopOpacity: !0,
        strokeDasharray: !0,
        strokeDashoffset: !0,
        strokeMiterlimit: !0,
        strokeOpacity: !0,
        strokeWidth: !0
    },
    wO = ["Webkit", "ms", "Moz", "O"];
Object.keys(ya).forEach(function(e) {
    wO.forEach(function(t) {
        t = t + e.charAt(0).toUpperCase() + e.substring(1), ya[t] = ya[e]
    })
});

function R1(e, t, n) {
    return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || ya.hasOwnProperty(e) && ya[e] ? ("" + t).trim() : t + "px"
}

function k1(e, t) {
    e = e.style;
    for (var n in t)
        if (t.hasOwnProperty(n)) {
            var r = n.indexOf("--") === 0,
                i = R1(n, t[n], r);
            n === "float" && (n = "cssFloat"), r ? e.setProperty(n, i) : e[n] = i
        }
}
var xO = Ce({
    menuitem: !0
}, {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0
});

function nd(e, t) {
    if (t) {
        if (xO[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(A(137, e));
        if (t.dangerouslySetInnerHTML != null) {
            if (t.children != null) throw Error(A(60));
            if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(A(61))
        }
        if (t.style != null && typeof t.style != "object") throw Error(A(62))
    }
}

function rd(e, t) {
    if (e.indexOf("-") === -1) return typeof t.is == "string";
    switch (e) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
            return !1;
        default:
            return !0
    }
}
var id = null;

function tm(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e
}
var od = null,
    zo = null,
    Go = null;

function kv(e) {
    if (e = Su(e)) {
        if (typeof od != "function") throw Error(A(280));
        var t = e.stateNode;
        t && (t = Mc(t), od(e.stateNode, e.type, t))
    }
}

function M1(e) {
    zo ? Go ? Go.push(e) : Go = [e] : zo = e
}

function I1() {
    if (zo) {
        var e = zo,
            t = Go;
        if (Go = zo = null, kv(e), t)
            for (e = 0; e < t.length; e++) kv(t[e])
    }
}

function L1(e, t) {
    return e(t)
}

function A1() {}
var If = !1;

function N1(e, t, n) {
    if (If) return e(t, n);
    If = !0;
    try {
        return L1(e, t, n)
    } finally {
        If = !1, (zo !== null || Go !== null) && (A1(), I1())
    }
}

function La(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var r = Mc(n);
    if (r === null) return null;
    n = r[t];
    e: switch (t) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
            (r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
            break e;
        default:
            e = !1
    }
    if (e) return null;
    if (n && typeof n != "function") throw Error(A(231, t, typeof n));
    return n
}
var sd = !1;
if (pr) try {
    var Ks = {};
    Object.defineProperty(Ks, "passive", {
        get: function() {
            sd = !0
        }
    }), window.addEventListener("test", Ks, Ks), window.removeEventListener("test", Ks, Ks)
} catch {
    sd = !1
}

function TO(e, t, n, r, i, o, s, a, u) {
    var l = Array.prototype.slice.call(arguments, 3);
    try {
        t.apply(n, l)
    } catch (c) {
        this.onError(c)
    }
}
var _a = !1,
    Fl = null,
    $l = !1,
    ad = null,
    OO = {
        onError: function(e) {
            _a = !0, Fl = e
        }
    };

function bO(e, t, n, r, i, o, s, a, u) {
    _a = !1, Fl = null, TO.apply(OO, arguments)
}

function PO(e, t, n, r, i, o, s, a, u) {
    if (bO.apply(this, arguments), _a) {
        if (_a) {
            var l = Fl;
            _a = !1, Fl = null
        } else throw Error(A(198));
        $l || ($l = !0, ad = l)
    }
}

function uo(e) {
    var t = e,
        n = e;
    if (e.alternate)
        for (; t.return;) t = t.return;
    else {
        e = t;
        do t = e, t.flags & 4098 && (n = t.return), e = t.return; while (e)
    }
    return t.tag === 3 ? n : null
}

function D1(e) {
    if (e.tag === 13) {
        var t = e.memoizedState;
        if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated
    }
    return null
}

function Mv(e) {
    if (uo(e) !== e) throw Error(A(188))
}

function CO(e) {
    var t = e.alternate;
    if (!t) {
        if (t = uo(e), t === null) throw Error(A(188));
        return t !== e ? null : e
    }
    for (var n = e, r = t;;) {
        var i = n.return;
        if (i === null) break;
        var o = i.alternate;
        if (o === null) {
            if (r = i.return, r !== null) {
                n = r;
                continue
            }
            break
        }
        if (i.child === o.child) {
            for (o = i.child; o;) {
                if (o === n) return Mv(i), e;
                if (o === r) return Mv(i), t;
                o = o.sibling
            }
            throw Error(A(188))
        }
        if (n.return !== r.return) n = i, r = o;
        else {
            for (var s = !1, a = i.child; a;) {
                if (a === n) {
                    s = !0, n = i, r = o;
                    break
                }
                if (a === r) {
                    s = !0, r = i, n = o;
                    break
                }
                a = a.sibling
            }
            if (!s) {
                for (a = o.child; a;) {
                    if (a === n) {
                        s = !0, n = o, r = i;
                        break
                    }
                    if (a === r) {
                        s = !0, r = o, n = i;
                        break
                    }
                    a = a.sibling
                }
                if (!s) throw Error(A(189))
            }
        }
        if (n.alternate !== r) throw Error(A(190))
    }
    if (n.tag !== 3) throw Error(A(188));
    return n.stateNode.current === n ? e : t
}

function F1(e) {
    return e = CO(e), e !== null ? $1(e) : null
}

function $1(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null;) {
        var t = $1(e);
        if (t !== null) return t;
        e = e.sibling
    }
    return null
}
var B1 = Qt.unstable_scheduleCallback,
    Iv = Qt.unstable_cancelCallback,
    RO = Qt.unstable_shouldYield,
    kO = Qt.unstable_requestPaint,
    Ae = Qt.unstable_now,
    MO = Qt.unstable_getCurrentPriorityLevel,
    nm = Qt.unstable_ImmediatePriority,
    j1 = Qt.unstable_UserBlockingPriority,
    Bl = Qt.unstable_NormalPriority,
    IO = Qt.unstable_LowPriority,
    H1 = Qt.unstable_IdlePriority,
    Pc = null,
    Kn = null;

function LO(e) {
    if (Kn && typeof Kn.onCommitFiberRoot == "function") try {
        Kn.onCommitFiberRoot(Pc, e, void 0, (e.current.flags & 128) === 128)
    } catch {}
}
var Rn = Math.clz32 ? Math.clz32 : DO,
    AO = Math.log,
    NO = Math.LN2;

function DO(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (AO(e) / NO | 0) | 0
}
var Hu = 64,
    Uu = 4194304;

function ca(e) {
    switch (e & -e) {
        case 1:
            return 1;
        case 2:
            return 2;
        case 4:
            return 4;
        case 8:
            return 8;
        case 16:
            return 16;
        case 32:
            return 32;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
            return e & 4194240;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
            return e & 130023424;
        case 134217728:
            return 134217728;
        case 268435456:
            return 268435456;
        case 536870912:
            return 536870912;
        case 1073741824:
            return 1073741824;
        default:
            return e
    }
}

function jl(e, t) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var r = 0,
        i = e.suspendedLanes,
        o = e.pingedLanes,
        s = n & 268435455;
    if (s !== 0) {
        var a = s & ~i;
        a !== 0 ? r = ca(a) : (o &= s, o !== 0 && (r = ca(o)))
    } else s = n & ~i, s !== 0 ? r = ca(s) : o !== 0 && (r = ca(o));
    if (r === 0) return 0;
    if (t !== 0 && t !== r && !(t & i) && (i = r & -r, o = t & -t, i >= o || i === 16 && (o & 4194240) !== 0)) return t;
    if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0)
        for (e = e.entanglements, t &= r; 0 < t;) n = 31 - Rn(t), i = 1 << n, r |= e[n], t &= ~i;
    return r
}

function FO(e, t) {
    switch (e) {
        case 1:
        case 2:
        case 4:
            return t + 250;
        case 8:
        case 16:
        case 32:
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
            return t + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
            return -1;
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
            return -1;
        default:
            return -1
    }
}

function $O(e, t) {
    for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, o = e.pendingLanes; 0 < o;) {
        var s = 31 - Rn(o),
            a = 1 << s,
            u = i[s];
        u === -1 ? (!(a & n) || a & r) && (i[s] = FO(a, t)) : u <= t && (e.expiredLanes |= a), o &= ~a
    }
}

function ud(e) {
    return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
}

function U1() {
    var e = Hu;
    return Hu <<= 1, !(Hu & 4194240) && (Hu = 64), e
}

function Lf(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t
}

function _u(e, t, n) {
    e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Rn(t), e[t] = n
}

function BO(e, t) {
    var n = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
    var r = e.eventTimes;
    for (e = e.expirationTimes; 0 < n;) {
        var i = 31 - Rn(n),
            o = 1 << i;
        t[i] = 0, r[i] = -1, e[i] = -1, n &= ~o
    }
}

function rm(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n;) {
        var r = 31 - Rn(n),
            i = 1 << r;
        i & t | e[r] & t && (e[r] |= t), n &= ~i
    }
}
var ue = 0;

function z1(e) {
    return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1
}
var G1, im, V1, W1, q1, ld = !1,
    zu = [],
    Qr = null,
    Kr = null,
    Yr = null,
    Aa = new Map,
    Na = new Map,
    Ar = [],
    jO = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");

function Lv(e, t) {
    switch (e) {
        case "focusin":
        case "focusout":
            Qr = null;
            break;
        case "dragenter":
        case "dragleave":
            Kr = null;
            break;
        case "mouseover":
        case "mouseout":
            Yr = null;
            break;
        case "pointerover":
        case "pointerout":
            Aa.delete(t.pointerId);
            break;
        case "gotpointercapture":
        case "lostpointercapture":
            Na.delete(t.pointerId)
    }
}

function Ys(e, t, n, r, i, o) {
    return e === null || e.nativeEvent !== o ? (e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: o,
        targetContainers: [i]
    }, t !== null && (t = Su(t), t !== null && im(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e)
}

function HO(e, t, n, r, i) {
    switch (t) {
        case "focusin":
            return Qr = Ys(Qr, e, t, n, r, i), !0;
        case "dragenter":
            return Kr = Ys(Kr, e, t, n, r, i), !0;
        case "mouseover":
            return Yr = Ys(Yr, e, t, n, r, i), !0;
        case "pointerover":
            var o = i.pointerId;
            return Aa.set(o, Ys(Aa.get(o) || null, e, t, n, r, i)), !0;
        case "gotpointercapture":
            return o = i.pointerId, Na.set(o, Ys(Na.get(o) || null, e, t, n, r, i)), !0
    }
    return !1
}

function X1(e) {
    var t = Pi(e.target);
    if (t !== null) {
        var n = uo(t);
        if (n !== null) {
            if (t = n.tag, t === 13) {
                if (t = D1(n), t !== null) {
                    e.blockedOn = t, q1(e.priority, function() {
                        V1(n)
                    });
                    return
                }
            } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
                e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
                return
            }
        }
    }
    e.blockedOn = null
}

function vl(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length;) {
        var n = cd(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
        if (n === null) {
            n = e.nativeEvent;
            var r = new n.constructor(n.type, n);
            id = r, n.target.dispatchEvent(r), id = null
        } else return t = Su(n), t !== null && im(t), e.blockedOn = n, !1;
        t.shift()
    }
    return !0
}

function Av(e, t, n) {
    vl(e) && n.delete(t)
}

function UO() {
    ld = !1, Qr !== null && vl(Qr) && (Qr = null), Kr !== null && vl(Kr) && (Kr = null), Yr !== null && vl(Yr) && (Yr = null), Aa.forEach(Av), Na.forEach(Av)
}

function Zs(e, t) {
    e.blockedOn === t && (e.blockedOn = null, ld || (ld = !0, Qt.unstable_scheduleCallback(Qt.unstable_NormalPriority, UO)))
}

function Da(e) {
    function t(i) {
        return Zs(i, e)
    }
    if (0 < zu.length) {
        Zs(zu[0], e);
        for (var n = 1; n < zu.length; n++) {
            var r = zu[n];
            r.blockedOn === e && (r.blockedOn = null)
        }
    }
    for (Qr !== null && Zs(Qr, e), Kr !== null && Zs(Kr, e), Yr !== null && Zs(Yr, e), Aa.forEach(t), Na.forEach(t), n = 0; n < Ar.length; n++) r = Ar[n], r.blockedOn === e && (r.blockedOn = null);
    for (; 0 < Ar.length && (n = Ar[0], n.blockedOn === null);) X1(n), n.blockedOn === null && Ar.shift()
}
var Vo = Er.ReactCurrentBatchConfig,
    Hl = !0;

function zO(e, t, n, r) {
    var i = ue,
        o = Vo.transition;
    Vo.transition = null;
    try {
        ue = 1, om(e, t, n, r)
    } finally {
        ue = i, Vo.transition = o
    }
}

function GO(e, t, n, r) {
    var i = ue,
        o = Vo.transition;
    Vo.transition = null;
    try {
        ue = 4, om(e, t, n, r)
    } finally {
        ue = i, Vo.transition = o
    }
}

function om(e, t, n, r) {
    if (Hl) {
        var i = cd(e, t, n, r);
        if (i === null) zf(e, t, r, Ul, n), Lv(e, r);
        else if (HO(i, e, t, n, r)) r.stopPropagation();
        else if (Lv(e, r), t & 4 && -1 < jO.indexOf(e)) {
            for (; i !== null;) {
                var o = Su(i);
                if (o !== null && G1(o), o = cd(e, t, n, r), o === null && zf(e, t, r, Ul, n), o === i) break;
                i = o
            }
            i !== null && r.stopPropagation()
        } else zf(e, t, r, null, n)
    }
}
var Ul = null;

function cd(e, t, n, r) {
    if (Ul = null, e = tm(r), e = Pi(e), e !== null)
        if (t = uo(e), t === null) e = null;
        else if (n = t.tag, n === 13) {
        if (e = D1(t), e !== null) return e;
        e = null
    } else if (n === 3) {
        if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
        e = null
    } else t !== e && (e = null);
    return Ul = e, null
}

function Q1(e) {
    switch (e) {
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
            return 1;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "toggle":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
            return 4;
        case "message":
            switch (MO()) {
                case nm:
                    return 1;
                case j1:
                    return 4;
                case Bl:
                case IO:
                    return 16;
                case H1:
                    return 536870912;
                default:
                    return 16
            }
        default:
            return 16
    }
}
var Gr = null,
    sm = null,
    gl = null;

function K1() {
    if (gl) return gl;
    var e, t = sm,
        n = t.length,
        r, i = "value" in Gr ? Gr.value : Gr.textContent,
        o = i.length;
    for (e = 0; e < n && t[e] === i[e]; e++);
    var s = n - e;
    for (r = 1; r <= s && t[n - r] === i[o - r]; r++);
    return gl = i.slice(e, 1 < r ? 1 - r : void 0)
}

function yl(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0
}

function Gu() {
    return !0
}

function Nv() {
    return !1
}

function Zt(e) {
    function t(n, r, i, o, s) {
        this._reactName = n, this._targetInst = i, this.type = r, this.nativeEvent = o, this.target = s, this.currentTarget = null;
        for (var a in e) e.hasOwnProperty(a) && (n = e[a], this[a] = n ? n(o) : o[a]);
        return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? Gu : Nv, this.isPropagationStopped = Nv, this
    }
    return Ce(t.prototype, {
        preventDefault: function() {
            this.defaultPrevented = !0;
            var n = this.nativeEvent;
            n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Gu)
        },
        stopPropagation: function() {
            var n = this.nativeEvent;
            n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Gu)
        },
        persist: function() {},
        isPersistent: Gu
    }), t
}
var Bs = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function(e) {
            return e.timeStamp || Date.now()
        },
        defaultPrevented: 0,
        isTrusted: 0
    },
    am = Zt(Bs),
    Eu = Ce({}, Bs, {
        view: 0,
        detail: 0
    }),
    VO = Zt(Eu),
    Af, Nf, Js, Cc = Ce({}, Eu, {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        getModifierState: um,
        button: 0,
        buttons: 0,
        relatedTarget: function(e) {
            return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget
        },
        movementX: function(e) {
            return "movementX" in e ? e.movementX : (e !== Js && (Js && e.type === "mousemove" ? (Af = e.screenX - Js.screenX, Nf = e.screenY - Js.screenY) : Nf = Af = 0, Js = e), Af)
        },
        movementY: function(e) {
            return "movementY" in e ? e.movementY : Nf
        }
    }),
    Dv = Zt(Cc),
    WO = Ce({}, Cc, {
        dataTransfer: 0
    }),
    qO = Zt(WO),
    XO = Ce({}, Eu, {
        relatedTarget: 0
    }),
    Df = Zt(XO),
    QO = Ce({}, Bs, {
        animationName: 0,
        elapsedTime: 0,
        pseudoElement: 0
    }),
    KO = Zt(QO),
    YO = Ce({}, Bs, {
        clipboardData: function(e) {
            return "clipboardData" in e ? e.clipboardData : window.clipboardData
        }
    }),
    ZO = Zt(YO),
    JO = Ce({}, Bs, {
        data: 0
    }),
    Fv = Zt(JO),
    eb = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified"
    },
    tb = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta"
    },
    nb = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey"
    };

function rb(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = nb[e]) ? !!t[e] : !1
}

function um() {
    return rb
}
var ib = Ce({}, Eu, {
        key: function(e) {
            if (e.key) {
                var t = eb[e.key] || e.key;
                if (t !== "Unidentified") return t
            }
            return e.type === "keypress" ? (e = yl(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? tb[e.keyCode] || "Unidentified" : ""
        },
        code: 0,
        location: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        repeat: 0,
        locale: 0,
        getModifierState: um,
        charCode: function(e) {
            return e.type === "keypress" ? yl(e) : 0
        },
        keyCode: function(e) {
            return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
        },
        which: function(e) {
            return e.type === "keypress" ? yl(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
        }
    }),
    ob = Zt(ib),
    sb = Ce({}, Cc, {
        pointerId: 0,
        width: 0,
        height: 0,
        pressure: 0,
        tangentialPressure: 0,
        tiltX: 0,
        tiltY: 0,
        twist: 0,
        pointerType: 0,
        isPrimary: 0
    }),
    $v = Zt(sb),
    ab = Ce({}, Eu, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: um
    }),
    ub = Zt(ab),
    lb = Ce({}, Bs, {
        propertyName: 0,
        elapsedTime: 0,
        pseudoElement: 0
    }),
    cb = Zt(lb),
    fb = Ce({}, Cc, {
        deltaX: function(e) {
            return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0
        },
        deltaY: function(e) {
            return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0
        },
        deltaZ: 0,
        deltaMode: 0
    }),
    hb = Zt(fb),
    db = [9, 13, 27, 32],
    lm = pr && "CompositionEvent" in window,
    Ea = null;
pr && "documentMode" in document && (Ea = document.documentMode);
var pb = pr && "TextEvent" in window && !Ea,
    Y1 = pr && (!lm || Ea && 8 < Ea && 11 >= Ea),
    Bv = " ",
    jv = !1;

function Z1(e, t) {
    switch (e) {
        case "keyup":
            return db.indexOf(t.keyCode) !== -1;
        case "keydown":
            return t.keyCode !== 229;
        case "keypress":
        case "mousedown":
        case "focusout":
            return !0;
        default:
            return !1
    }
}

function J1(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null
}
var Ro = !1;

function mb(e, t) {
    switch (e) {
        case "compositionend":
            return J1(t);
        case "keypress":
            return t.which !== 32 ? null : (jv = !0, Bv);
        case "textInput":
            return e = t.data, e === Bv && jv ? null : e;
        default:
            return null
    }
}

function vb(e, t) {
    if (Ro) return e === "compositionend" || !lm && Z1(e, t) ? (e = K1(), gl = sm = Gr = null, Ro = !1, e) : null;
    switch (e) {
        case "paste":
            return null;
        case "keypress":
            if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
                if (t.char && 1 < t.char.length) return t.char;
                if (t.which) return String.fromCharCode(t.which)
            }
            return null;
        case "compositionend":
            return Y1 && t.locale !== "ko" ? null : t.data;
        default:
            return null
    }
}
var gb = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
};

function Hv(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!gb[e.type] : t === "textarea"
}

function eE(e, t, n, r) {
    M1(r), t = zl(t, "onChange"), 0 < t.length && (n = new am("onChange", "change", null, n, r), e.push({
        event: n,
        listeners: t
    }))
}
var Sa = null,
    Fa = null;

function yb(e) {
    fE(e, 0)
}

function Rc(e) {
    var t = Io(e);
    if (T1(t)) return e
}

function _b(e, t) {
    if (e === "change") return t
}
var tE = !1;
if (pr) {
    var Ff;
    if (pr) {
        var $f = "oninput" in document;
        if (!$f) {
            var Uv = document.createElement("div");
            Uv.setAttribute("oninput", "return;"), $f = typeof Uv.oninput == "function"
        }
        Ff = $f
    } else Ff = !1;
    tE = Ff && (!document.documentMode || 9 < document.documentMode)
}

function zv() {
    Sa && (Sa.detachEvent("onpropertychange", nE), Fa = Sa = null)
}

function nE(e) {
    if (e.propertyName === "value" && Rc(Fa)) {
        var t = [];
        eE(t, Fa, e, tm(e)), N1(yb, t)
    }
}

function Eb(e, t, n) {
    e === "focusin" ? (zv(), Sa = t, Fa = n, Sa.attachEvent("onpropertychange", nE)) : e === "focusout" && zv()
}

function Sb(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown") return Rc(Fa)
}

function wb(e, t) {
    if (e === "click") return Rc(t)
}

function xb(e, t) {
    if (e === "input" || e === "change") return Rc(t)
}

function Tb(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t
}
var In = typeof Object.is == "function" ? Object.is : Tb;

function $a(e, t) {
    if (In(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
    var n = Object.keys(e),
        r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (r = 0; r < n.length; r++) {
        var i = n[r];
        if (!Wh.call(t, i) || !In(e[i], t[i])) return !1
    }
    return !0
}

function Gv(e) {
    for (; e && e.firstChild;) e = e.firstChild;
    return e
}

function Vv(e, t) {
    var n = Gv(e);
    e = 0;
    for (var r; n;) {
        if (n.nodeType === 3) {
            if (r = e + n.textContent.length, e <= t && r >= t) return {
                node: n,
                offset: t - e
            };
            e = r
        }
        e: {
            for (; n;) {
                if (n.nextSibling) {
                    n = n.nextSibling;
                    break e
                }
                n = n.parentNode
            }
            n = void 0
        }
        n = Gv(n)
    }
}

function rE(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? rE(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1
}

function iE() {
    for (var e = window, t = Dl(); t instanceof e.HTMLIFrameElement;) {
        try {
            var n = typeof t.contentWindow.location.href == "string"
        } catch {
            n = !1
        }
        if (n) e = t.contentWindow;
        else break;
        t = Dl(e.document)
    }
    return t
}

function cm(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true")
}

function Ob(e) {
    var t = iE(),
        n = e.focusedElem,
        r = e.selectionRange;
    if (t !== n && n && n.ownerDocument && rE(n.ownerDocument.documentElement, n)) {
        if (r !== null && cm(n)) {
            if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
            else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
                e = e.getSelection();
                var i = n.textContent.length,
                    o = Math.min(r.start, i);
                r = r.end === void 0 ? o : Math.min(r.end, i), !e.extend && o > r && (i = r, r = o, o = i), i = Vv(n, o);
                var s = Vv(n, r);
                i && s && (e.rangeCount !== 1 || e.anchorNode !== i.node || e.anchorOffset !== i.offset || e.focusNode !== s.node || e.focusOffset !== s.offset) && (t = t.createRange(), t.setStart(i.node, i.offset), e.removeAllRanges(), o > r ? (e.addRange(t), e.extend(s.node, s.offset)) : (t.setEnd(s.node, s.offset), e.addRange(t)))
            }
        }
        for (t = [], e = n; e = e.parentNode;) e.nodeType === 1 && t.push({
            element: e,
            left: e.scrollLeft,
            top: e.scrollTop
        });
        for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top
    }
}
var bb = pr && "documentMode" in document && 11 >= document.documentMode,
    ko = null,
    fd = null,
    wa = null,
    hd = !1;

function Wv(e, t, n) {
    var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    hd || ko == null || ko !== Dl(r) || (r = ko, "selectionStart" in r && cm(r) ? r = {
        start: r.selectionStart,
        end: r.selectionEnd
    } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
        anchorNode: r.anchorNode,
        anchorOffset: r.anchorOffset,
        focusNode: r.focusNode,
        focusOffset: r.focusOffset
    }), wa && $a(wa, r) || (wa = r, r = zl(fd, "onSelect"), 0 < r.length && (t = new am("onSelect", "select", null, t, n), e.push({
        event: t,
        listeners: r
    }), t.target = ko)))
}

function Vu(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n
}
var Mo = {
        animationend: Vu("Animation", "AnimationEnd"),
        animationiteration: Vu("Animation", "AnimationIteration"),
        animationstart: Vu("Animation", "AnimationStart"),
        transitionend: Vu("Transition", "TransitionEnd")
    },
    Bf = {},
    oE = {};
pr && (oE = document.createElement("div").style, "AnimationEvent" in window || (delete Mo.animationend.animation, delete Mo.animationiteration.animation, delete Mo.animationstart.animation), "TransitionEvent" in window || delete Mo.transitionend.transition);

function kc(e) {
    if (Bf[e]) return Bf[e];
    if (!Mo[e]) return e;
    var t = Mo[e],
        n;
    for (n in t)
        if (t.hasOwnProperty(n) && n in oE) return Bf[e] = t[n];
    return e
}
var sE = kc("animationend"),
    aE = kc("animationiteration"),
    uE = kc("animationstart"),
    lE = kc("transitionend"),
    cE = new Map,
    qv = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");

function di(e, t) {
    cE.set(e, t), ao(t, [e])
}
for (var jf = 0; jf < qv.length; jf++) {
    var Hf = qv[jf],
        Pb = Hf.toLowerCase(),
        Cb = Hf[0].toUpperCase() + Hf.slice(1);
    di(Pb, "on" + Cb)
}
di(sE, "onAnimationEnd");
di(aE, "onAnimationIteration");
di(uE, "onAnimationStart");
di("dblclick", "onDoubleClick");
di("focusin", "onFocus");
di("focusout", "onBlur");
di(lE, "onTransitionEnd");
ps("onMouseEnter", ["mouseout", "mouseover"]);
ps("onMouseLeave", ["mouseout", "mouseover"]);
ps("onPointerEnter", ["pointerout", "pointerover"]);
ps("onPointerLeave", ["pointerout", "pointerover"]);
ao("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
ao("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
ao("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
ao("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
ao("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
ao("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var fa = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),
    Rb = new Set("cancel close invalid load scroll toggle".split(" ").concat(fa));

function Xv(e, t, n) {
    var r = e.type || "unknown-event";
    e.currentTarget = n, PO(r, t, void 0, e), e.currentTarget = null
}

function fE(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
        var r = e[n],
            i = r.event;
        r = r.listeners;
        e: {
            var o = void 0;
            if (t)
                for (var s = r.length - 1; 0 <= s; s--) {
                    var a = r[s],
                        u = a.instance,
                        l = a.currentTarget;
                    if (a = a.listener, u !== o && i.isPropagationStopped()) break e;
                    Xv(i, a, l), o = u
                } else
                    for (s = 0; s < r.length; s++) {
                        if (a = r[s], u = a.instance, l = a.currentTarget, a = a.listener, u !== o && i.isPropagationStopped()) break e;
                        Xv(i, a, l), o = u
                    }
        }
    }
    if ($l) throw e = ad, $l = !1, ad = null, e
}

function ve(e, t) {
    var n = t[gd];
    n === void 0 && (n = t[gd] = new Set);
    var r = e + "__bubble";
    n.has(r) || (hE(t, e, 2, !1), n.add(r))
}

function Uf(e, t, n) {
    var r = 0;
    t && (r |= 4), hE(n, e, r, t)
}
var Wu = "_reactListening" + Math.random().toString(36).slice(2);

function Ba(e) {
    if (!e[Wu]) {
        e[Wu] = !0, _1.forEach(function(n) {
            n !== "selectionchange" && (Rb.has(n) || Uf(n, !1, e), Uf(n, !0, e))
        });
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[Wu] || (t[Wu] = !0, Uf("selectionchange", !1, t))
    }
}

function hE(e, t, n, r) {
    switch (Q1(t)) {
        case 1:
            var i = zO;
            break;
        case 4:
            i = GO;
            break;
        default:
            i = om
    }
    n = i.bind(null, t, n, e), i = void 0, !sd || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i !== void 0 ? e.addEventListener(t, n, {
        capture: !0,
        passive: i
    }) : e.addEventListener(t, n, !0) : i !== void 0 ? e.addEventListener(t, n, {
        passive: i
    }) : e.addEventListener(t, n, !1)
}

function zf(e, t, n, r, i) {
    var o = r;
    if (!(t & 1) && !(t & 2) && r !== null) e: for (;;) {
        if (r === null) return;
        var s = r.tag;
        if (s === 3 || s === 4) {
            var a = r.stateNode.containerInfo;
            if (a === i || a.nodeType === 8 && a.parentNode === i) break;
            if (s === 4)
                for (s = r.return; s !== null;) {
                    var u = s.tag;
                    if ((u === 3 || u === 4) && (u = s.stateNode.containerInfo, u === i || u.nodeType === 8 && u.parentNode === i)) return;
                    s = s.return
                }
            for (; a !== null;) {
                if (s = Pi(a), s === null) return;
                if (u = s.tag, u === 5 || u === 6) {
                    r = o = s;
                    continue e
                }
                a = a.parentNode
            }
        }
        r = r.return
    }
    N1(function() {
        var l = o,
            c = tm(n),
            f = [];
        e: {
            var h = cE.get(e);
            if (h !== void 0) {
                var p = am,
                    y = e;
                switch (e) {
                    case "keypress":
                        if (yl(n) === 0) break e;
                    case "keydown":
                    case "keyup":
                        p = ob;
                        break;
                    case "focusin":
                        y = "focus", p = Df;
                        break;
                    case "focusout":
                        y = "blur", p = Df;
                        break;
                    case "beforeblur":
                    case "afterblur":
                        p = Df;
                        break;
                    case "click":
                        if (n.button === 2) break e;
                    case "auxclick":
                    case "dblclick":
                    case "mousedown":
                    case "mousemove":
                    case "mouseup":
                    case "mouseout":
                    case "mouseover":
                    case "contextmenu":
                        p = Dv;
                        break;
                    case "drag":
                    case "dragend":
                    case "dragenter":
                    case "dragexit":
                    case "dragleave":
                    case "dragover":
                    case "dragstart":
                    case "drop":
                        p = qO;
                        break;
                    case "touchcancel":
                    case "touchend":
                    case "touchmove":
                    case "touchstart":
                        p = ub;
                        break;
                    case sE:
                    case aE:
                    case uE:
                        p = KO;
                        break;
                    case lE:
                        p = cb;
                        break;
                    case "scroll":
                        p = VO;
                        break;
                    case "wheel":
                        p = hb;
                        break;
                    case "copy":
                    case "cut":
                    case "paste":
                        p = ZO;
                        break;
                    case "gotpointercapture":
                    case "lostpointercapture":
                    case "pointercancel":
                    case "pointerdown":
                    case "pointermove":
                    case "pointerout":
                    case "pointerover":
                    case "pointerup":
                        p = $v
                }
                var m = (t & 4) !== 0,
                    _ = !m && e === "scroll",
                    g = m ? h !== null ? h + "Capture" : null : h;
                m = [];
                for (var d = l, v; d !== null;) {
                    v = d;
                    var E = v.stateNode;
                    if (v.tag === 5 && E !== null && (v = E, g !== null && (E = La(d, g), E != null && m.push(ja(d, E, v)))), _) break;
                    d = d.return
                }
                0 < m.length && (h = new p(h, y, null, n, c), f.push({
                    event: h,
                    listeners: m
                }))
            }
        }
        if (!(t & 7)) {
            e: {
                if (h = e === "mouseover" || e === "pointerover", p = e === "mouseout" || e === "pointerout", h && n !== id && (y = n.relatedTarget || n.fromElement) && (Pi(y) || y[mr])) break e;
                if ((p || h) && (h = c.window === c ? c : (h = c.ownerDocument) ? h.defaultView || h.parentWindow : window, p ? (y = n.relatedTarget || n.toElement, p = l, y = y ? Pi(y) : null, y !== null && (_ = uo(y), y !== _ || y.tag !== 5 && y.tag !== 6) && (y = null)) : (p = null, y = l), p !== y)) {
                    if (m = Dv, E = "onMouseLeave", g = "onMouseEnter", d = "mouse", (e === "pointerout" || e === "pointerover") && (m = $v, E = "onPointerLeave", g = "onPointerEnter", d = "pointer"), _ = p == null ? h : Io(p), v = y == null ? h : Io(y), h = new m(E, d + "leave", p, n, c), h.target = _, h.relatedTarget = v, E = null, Pi(c) === l && (m = new m(g, d + "enter", y, n, c), m.target = v, m.relatedTarget = _, E = m), _ = E, p && y) t: {
                        for (m = p, g = y, d = 0, v = m; v; v = _o(v)) d++;
                        for (v = 0, E = g; E; E = _o(E)) v++;
                        for (; 0 < d - v;) m = _o(m),
                        d--;
                        for (; 0 < v - d;) g = _o(g),
                        v--;
                        for (; d--;) {
                            if (m === g || g !== null && m === g.alternate) break t;
                            m = _o(m), g = _o(g)
                        }
                        m = null
                    }
                    else m = null;
                    p !== null && Qv(f, h, p, m, !1), y !== null && _ !== null && Qv(f, _, y, m, !0)
                }
            }
            e: {
                if (h = l ? Io(l) : window, p = h.nodeName && h.nodeName.toLowerCase(), p === "select" || p === "input" && h.type === "file") var S = _b;
                else if (Hv(h))
                    if (tE) S = xb;
                    else {
                        S = Sb;
                        var w = Eb
                    }
                else(p = h.nodeName) && p.toLowerCase() === "input" && (h.type === "checkbox" || h.type === "radio") && (S = wb);
                if (S && (S = S(e, l))) {
                    eE(f, S, n, c);
                    break e
                }
                w && w(e, h, l),
                e === "focusout" && (w = h._wrapperState) && w.controlled && h.type === "number" && Jh(h, "number", h.value)
            }
            switch (w = l ? Io(l) : window, e) {
                case "focusin":
                    (Hv(w) || w.contentEditable === "true") && (ko = w, fd = l, wa = null);
                    break;
                case "focusout":
                    wa = fd = ko = null;
                    break;
                case "mousedown":
                    hd = !0;
                    break;
                case "contextmenu":
                case "mouseup":
                case "dragend":
                    hd = !1, Wv(f, n, c);
                    break;
                case "selectionchange":
                    if (bb) break;
                case "keydown":
                case "keyup":
                    Wv(f, n, c)
            }
            var T;
            if (lm) e: {
                switch (e) {
                    case "compositionstart":
                        var O = "onCompositionStart";
                        break e;
                    case "compositionend":
                        O = "onCompositionEnd";
                        break e;
                    case "compositionupdate":
                        O = "onCompositionUpdate";
                        break e
                }
                O = void 0
            }
            else Ro ? Z1(e, n) && (O = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (O = "onCompositionStart");O && (Y1 && n.locale !== "ko" && (Ro || O !== "onCompositionStart" ? O === "onCompositionEnd" && Ro && (T = K1()) : (Gr = c, sm = "value" in Gr ? Gr.value : Gr.textContent, Ro = !0)), w = zl(l, O), 0 < w.length && (O = new Fv(O, e, null, n, c), f.push({
                event: O,
                listeners: w
            }), T ? O.data = T : (T = J1(n), T !== null && (O.data = T)))),
            (T = pb ? mb(e, n) : vb(e, n)) && (l = zl(l, "onBeforeInput"), 0 < l.length && (c = new Fv("onBeforeInput", "beforeinput", null, n, c), f.push({
                event: c,
                listeners: l
            }), c.data = T))
        }
        fE(f, t)
    })
}

function ja(e, t, n) {
    return {
        instance: e,
        listener: t,
        currentTarget: n
    }
}

function zl(e, t) {
    for (var n = t + "Capture", r = []; e !== null;) {
        var i = e,
            o = i.stateNode;
        i.tag === 5 && o !== null && (i = o, o = La(e, n), o != null && r.unshift(ja(e, o, i)), o = La(e, t), o != null && r.push(ja(e, o, i))), e = e.return
    }
    return r
}

function _o(e) {
    if (e === null) return null;
    do e = e.return; while (e && e.tag !== 5);
    return e || null
}

function Qv(e, t, n, r, i) {
    for (var o = t._reactName, s = []; n !== null && n !== r;) {
        var a = n,
            u = a.alternate,
            l = a.stateNode;
        if (u !== null && u === r) break;
        a.tag === 5 && l !== null && (a = l, i ? (u = La(n, o), u != null && s.unshift(ja(n, u, a))) : i || (u = La(n, o), u != null && s.push(ja(n, u, a)))), n = n.return
    }
    s.length !== 0 && e.push({
        event: t,
        listeners: s
    })
}
var kb = /\r\n?/g,
    Mb = /\u0000|\uFFFD/g;

function Kv(e) {
    return (typeof e == "string" ? e : "" + e).replace(kb, `
`).replace(Mb, "")
}

function qu(e, t, n) {
    if (t = Kv(t), Kv(e) !== t && n) throw Error(A(425))
}

function Gl() {}
var dd = null,
    pd = null;

function md(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null
}
var vd = typeof setTimeout == "function" ? setTimeout : void 0,
    Ib = typeof clearTimeout == "function" ? clearTimeout : void 0,
    Yv = typeof Promise == "function" ? Promise : void 0,
    Lb = typeof queueMicrotask == "function" ? queueMicrotask : typeof Yv < "u" ? function(e) {
        return Yv.resolve(null).then(e).catch(Ab)
    } : vd;

function Ab(e) {
    setTimeout(function() {
        throw e
    })
}

function Gf(e, t) {
    var n = t,
        r = 0;
    do {
        var i = n.nextSibling;
        if (e.removeChild(n), i && i.nodeType === 8)
            if (n = i.data, n === "/$") {
                if (r === 0) {
                    e.removeChild(i), Da(t);
                    return
                }
                r--
            } else n !== "$" && n !== "$?" && n !== "$!" || r++;
        n = i
    } while (n);
    Da(t)
}

function Zr(e) {
    for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === 1 || t === 3) break;
        if (t === 8) {
            if (t = e.data, t === "$" || t === "$!" || t === "$?") break;
            if (t === "/$") return null
        }
    }
    return e
}

function Zv(e) {
    e = e.previousSibling;
    for (var t = 0; e;) {
        if (e.nodeType === 8) {
            var n = e.data;
            if (n === "$" || n === "$!" || n === "$?") {
                if (t === 0) return e;
                t--
            } else n === "/$" && t++
        }
        e = e.previousSibling
    }
    return null
}
var js = Math.random().toString(36).slice(2),
    Vn = "__reactFiber$" + js,
    Ha = "__reactProps$" + js,
    mr = "__reactContainer$" + js,
    gd = "__reactEvents$" + js,
    Nb = "__reactListeners$" + js,
    Db = "__reactHandles$" + js;

function Pi(e) {
    var t = e[Vn];
    if (t) return t;
    for (var n = e.parentNode; n;) {
        if (t = n[mr] || n[Vn]) {
            if (n = t.alternate, t.child !== null || n !== null && n.child !== null)
                for (e = Zv(e); e !== null;) {
                    if (n = e[Vn]) return n;
                    e = Zv(e)
                }
            return t
        }
        e = n, n = e.parentNode
    }
    return null
}

function Su(e) {
    return e = e[Vn] || e[mr], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e
}

function Io(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(A(33))
}

function Mc(e) {
    return e[Ha] || null
}
var yd = [],
    Lo = -1;

function pi(e) {
    return {
        current: e
    }
}

function _e(e) {
    0 > Lo || (e.current = yd[Lo], yd[Lo] = null, Lo--)
}

function pe(e, t) {
    Lo++, yd[Lo] = e.current, e.current = t
}
var ui = {},
    st = pi(ui),
    bt = pi(!1),
    Xi = ui;

function ms(e, t) {
    var n = e.type.contextTypes;
    if (!n) return ui;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
    var i = {},
        o;
    for (o in n) i[o] = t[o];
    return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = i), i
}

function Pt(e) {
    return e = e.childContextTypes, e != null
}

function Vl() {
    _e(bt), _e(st)
}

function Jv(e, t, n) {
    if (st.current !== ui) throw Error(A(168));
    pe(st, t), pe(bt, n)
}

function dE(e, t, n) {
    var r = e.stateNode;
    if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
    r = r.getChildContext();
    for (var i in r)
        if (!(i in t)) throw Error(A(108, EO(e) || "Unknown", i));
    return Ce({}, n, r)
}

function Wl(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || ui, Xi = st.current, pe(st, e), pe(bt, bt.current), !0
}

function eg(e, t, n) {
    var r = e.stateNode;
    if (!r) throw Error(A(169));
    n ? (e = dE(e, t, Xi), r.__reactInternalMemoizedMergedChildContext = e, _e(bt), _e(st), pe(st, e)) : _e(bt), pe(bt, n)
}
var or = null,
    Ic = !1,
    Vf = !1;

function pE(e) {
    or === null ? or = [e] : or.push(e)
}

function Fb(e) {
    Ic = !0, pE(e)
}

function mi() {
    if (!Vf && or !== null) {
        Vf = !0;
        var e = 0,
            t = ue;
        try {
            var n = or;
            for (ue = 1; e < n.length; e++) {
                var r = n[e];
                do r = r(!0); while (r !== null)
            }
            or = null, Ic = !1
        } catch (i) {
            throw or !== null && (or = or.slice(e + 1)), B1(nm, mi), i
        } finally {
            ue = t, Vf = !1
        }
    }
    return null
}
var Ao = [],
    No = 0,
    ql = null,
    Xl = 0,
    sn = [],
    an = 0,
    Qi = null,
    ur = 1,
    lr = "";

function wi(e, t) {
    Ao[No++] = Xl, Ao[No++] = ql, ql = e, Xl = t
}

function mE(e, t, n) {
    sn[an++] = ur, sn[an++] = lr, sn[an++] = Qi, Qi = e;
    var r = ur;
    e = lr;
    var i = 32 - Rn(r) - 1;
    r &= ~(1 << i), n += 1;
    var o = 32 - Rn(t) + i;
    if (30 < o) {
        var s = i - i % 5;
        o = (r & (1 << s) - 1).toString(32), r >>= s, i -= s, ur = 1 << 32 - Rn(t) + i | n << i | r, lr = o + e
    } else ur = 1 << o | n << i | r, lr = e
}

function fm(e) {
    e.return !== null && (wi(e, 1), mE(e, 1, 0))
}

function hm(e) {
    for (; e === ql;) ql = Ao[--No], Ao[No] = null, Xl = Ao[--No], Ao[No] = null;
    for (; e === Qi;) Qi = sn[--an], sn[an] = null, lr = sn[--an], sn[an] = null, ur = sn[--an], sn[an] = null
}
var qt = null,
    Vt = null,
    we = !1,
    Pn = null;

function vE(e, t) {
    var n = cn(5, null, null, 0);
    n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n)
}

function tg(e, t) {
    switch (e.tag) {
        case 5:
            var n = e.type;
            return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, qt = e, Vt = Zr(t.firstChild), !0) : !1;
        case 6:
            return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, qt = e, Vt = null, !0) : !1;
        case 13:
            return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Qi !== null ? {
                id: ur,
                overflow: lr
            } : null, e.memoizedState = {
                dehydrated: t,
                treeContext: n,
                retryLane: 1073741824
            }, n = cn(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, qt = e, Vt = null, !0) : !1;
        default:
            return !1
    }
}

function _d(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0
}

function Ed(e) {
    if (we) {
        var t = Vt;
        if (t) {
            var n = t;
            if (!tg(e, t)) {
                if (_d(e)) throw Error(A(418));
                t = Zr(n.nextSibling);
                var r = qt;
                t && tg(e, t) ? vE(r, n) : (e.flags = e.flags & -4097 | 2, we = !1, qt = e)
            }
        } else {
            if (_d(e)) throw Error(A(418));
            e.flags = e.flags & -4097 | 2, we = !1, qt = e
        }
    }
}

function ng(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;) e = e.return;
    qt = e
}

function Xu(e) {
    if (e !== qt) return !1;
    if (!we) return ng(e), we = !0, !1;
    var t;
    if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !md(e.type, e.memoizedProps)), t && (t = Vt)) {
        if (_d(e)) throw gE(), Error(A(418));
        for (; t;) vE(e, t), t = Zr(t.nextSibling)
    }
    if (ng(e), e.tag === 13) {
        if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(A(317));
        e: {
            for (e = e.nextSibling, t = 0; e;) {
                if (e.nodeType === 8) {
                    var n = e.data;
                    if (n === "/$") {
                        if (t === 0) {
                            Vt = Zr(e.nextSibling);
                            break e
                        }
                        t--
                    } else n !== "$" && n !== "$!" && n !== "$?" || t++
                }
                e = e.nextSibling
            }
            Vt = null
        }
    } else Vt = qt ? Zr(e.stateNode.nextSibling) : null;
    return !0
}

function gE() {
    for (var e = Vt; e;) e = Zr(e.nextSibling)
}

function vs() {
    Vt = qt = null, we = !1
}

function dm(e) {
    Pn === null ? Pn = [e] : Pn.push(e)
}
var $b = Er.ReactCurrentBatchConfig;

function xn(e, t) {
    if (e && e.defaultProps) {
        t = Ce({}, t), e = e.defaultProps;
        for (var n in e) t[n] === void 0 && (t[n] = e[n]);
        return t
    }
    return t
}
var Ql = pi(null),
    Kl = null,
    Do = null,
    pm = null;

function mm() {
    pm = Do = Kl = null
}

function vm(e) {
    var t = Ql.current;
    _e(Ql), e._currentValue = t
}

function Sd(e, t, n) {
    for (; e !== null;) {
        var r = e.alternate;
        if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
        e = e.return
    }
}

function Wo(e, t) {
    Kl = e, pm = Do = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (Ot = !0), e.firstContext = null)
}

function vn(e) {
    var t = e._currentValue;
    if (pm !== e)
        if (e = {
                context: e,
                memoizedValue: t,
                next: null
            }, Do === null) {
            if (Kl === null) throw Error(A(308));
            Do = e, Kl.dependencies = {
                lanes: 0,
                firstContext: e
            }
        } else Do = Do.next = e;
    return t
}
var Ci = null;

function gm(e) {
    Ci === null ? Ci = [e] : Ci.push(e)
}

function yE(e, t, n, r) {
    var i = t.interleaved;
    return i === null ? (n.next = n, gm(t)) : (n.next = i.next, i.next = n), t.interleaved = n, vr(e, r)
}

function vr(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null;) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
    return n.tag === 3 ? n.stateNode : null
}
var Ir = !1;

function ym(e) {
    e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
            pending: null,
            interleaved: null,
            lanes: 0
        },
        effects: null
    }
}

function _E(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects
    })
}

function cr(e, t) {
    return {
        eventTime: e,
        lane: t,
        tag: 0,
        payload: null,
        callback: null,
        next: null
    }
}

function Jr(e, t, n) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (r = r.shared, ie & 2) {
        var i = r.pending;
        return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, vr(e, n)
    }
    return i = r.interleaved, i === null ? (t.next = t, gm(r)) : (t.next = i.next, i.next = t), r.interleaved = t, vr(e, n)
}

function _l(e, t, n) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
        var r = t.lanes;
        r &= e.pendingLanes, n |= r, t.lanes = n, rm(e, n)
    }
}

function rg(e, t) {
    var n = e.updateQueue,
        r = e.alternate;
    if (r !== null && (r = r.updateQueue, n === r)) {
        var i = null,
            o = null;
        if (n = n.firstBaseUpdate, n !== null) {
            do {
                var s = {
                    eventTime: n.eventTime,
                    lane: n.lane,
                    tag: n.tag,
                    payload: n.payload,
                    callback: n.callback,
                    next: null
                };
                o === null ? i = o = s : o = o.next = s, n = n.next
            } while (n !== null);
            o === null ? i = o = t : o = o.next = t
        } else i = o = t;
        n = {
            baseState: r.baseState,
            firstBaseUpdate: i,
            lastBaseUpdate: o,
            shared: r.shared,
            effects: r.effects
        }, e.updateQueue = n;
        return
    }
    e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t
}

function Yl(e, t, n, r) {
    var i = e.updateQueue;
    Ir = !1;
    var o = i.firstBaseUpdate,
        s = i.lastBaseUpdate,
        a = i.shared.pending;
    if (a !== null) {
        i.shared.pending = null;
        var u = a,
            l = u.next;
        u.next = null, s === null ? o = l : s.next = l, s = u;
        var c = e.alternate;
        c !== null && (c = c.updateQueue, a = c.lastBaseUpdate, a !== s && (a === null ? c.firstBaseUpdate = l : a.next = l, c.lastBaseUpdate = u))
    }
    if (o !== null) {
        var f = i.baseState;
        s = 0, c = l = u = null, a = o;
        do {
            var h = a.lane,
                p = a.eventTime;
            if ((r & h) === h) {
                c !== null && (c = c.next = {
                    eventTime: p,
                    lane: 0,
                    tag: a.tag,
                    payload: a.payload,
                    callback: a.callback,
                    next: null
                });
                e: {
                    var y = e,
                        m = a;
                    switch (h = t, p = n, m.tag) {
                        case 1:
                            if (y = m.payload, typeof y == "function") {
                                f = y.call(p, f, h);
                                break e
                            }
                            f = y;
                            break e;
                        case 3:
                            y.flags = y.flags & -65537 | 128;
                        case 0:
                            if (y = m.payload, h = typeof y == "function" ? y.call(p, f, h) : y, h == null) break e;
                            f = Ce({}, f, h);
                            break e;
                        case 2:
                            Ir = !0
                    }
                }
                a.callback !== null && a.lane !== 0 && (e.flags |= 64, h = i.effects, h === null ? i.effects = [a] : h.push(a))
            } else p = {
                eventTime: p,
                lane: h,
                tag: a.tag,
                payload: a.payload,
                callback: a.callback,
                next: null
            }, c === null ? (l = c = p, u = f) : c = c.next = p, s |= h;
            if (a = a.next, a === null) {
                if (a = i.shared.pending, a === null) break;
                h = a, a = h.next, h.next = null, i.lastBaseUpdate = h, i.shared.pending = null
            }
        } while (!0);
        if (c === null && (u = f), i.baseState = u, i.firstBaseUpdate = l, i.lastBaseUpdate = c, t = i.shared.interleaved, t !== null) {
            i = t;
            do s |= i.lane, i = i.next; while (i !== t)
        } else o === null && (i.shared.lanes = 0);
        Yi |= s, e.lanes = s, e.memoizedState = f
    }
}

function ig(e, t, n) {
    if (e = t.effects, t.effects = null, e !== null)
        for (t = 0; t < e.length; t++) {
            var r = e[t],
                i = r.callback;
            if (i !== null) {
                if (r.callback = null, r = n, typeof i != "function") throw Error(A(191, i));
                i.call(r)
            }
        }
}
var EE = new y1.Component().refs;

function wd(e, t, n, r) {
    t = e.memoizedState, n = n(r, t), n = n == null ? t : Ce({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n)
}
var Lc = {
    isMounted: function(e) {
        return (e = e._reactInternals) ? uo(e) === e : !1
    },
    enqueueSetState: function(e, t, n) {
        e = e._reactInternals;
        var r = mt(),
            i = ti(e),
            o = cr(r, i);
        o.payload = t, n != null && (o.callback = n), t = Jr(e, o, i), t !== null && (kn(t, e, i, r), _l(t, e, i))
    },
    enqueueReplaceState: function(e, t, n) {
        e = e._reactInternals;
        var r = mt(),
            i = ti(e),
            o = cr(r, i);
        o.tag = 1, o.payload = t, n != null && (o.callback = n), t = Jr(e, o, i), t !== null && (kn(t, e, i, r), _l(t, e, i))
    },
    enqueueForceUpdate: function(e, t) {
        e = e._reactInternals;
        var n = mt(),
            r = ti(e),
            i = cr(n, r);
        i.tag = 2, t != null && (i.callback = t), t = Jr(e, i, r), t !== null && (kn(t, e, r, n), _l(t, e, r))
    }
};

function og(e, t, n, r, i, o, s) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, s) : t.prototype && t.prototype.isPureReactComponent ? !$a(n, r) || !$a(i, o) : !0
}

function SE(e, t, n) {
    var r = !1,
        i = ui,
        o = t.contextType;
    return typeof o == "object" && o !== null ? o = vn(o) : (i = Pt(t) ? Xi : st.current, r = t.contextTypes, o = (r = r != null) ? ms(e, i) : ui), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = Lc, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = i, e.__reactInternalMemoizedMaskedChildContext = o), t
}

function sg(e, t, n, r) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Lc.enqueueReplaceState(t, t.state, null)
}

function xd(e, t, n, r) {
    var i = e.stateNode;
    i.props = n, i.state = e.memoizedState, i.refs = EE, ym(e);
    var o = t.contextType;
    typeof o == "object" && o !== null ? i.context = vn(o) : (o = Pt(t) ? Xi : st.current, i.context = ms(e, o)), i.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (wd(e, t, o, n), i.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof i.getSnapshotBeforeUpdate == "function" || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (t = i.state, typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(), t !== i.state && Lc.enqueueReplaceState(i, i.state, null), Yl(e, n, i, r), i.state = e.memoizedState), typeof i.componentDidMount == "function" && (e.flags |= 4194308)
}

function ea(e, t, n) {
    if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
        if (n._owner) {
            if (n = n._owner, n) {
                if (n.tag !== 1) throw Error(A(309));
                var r = n.stateNode
            }
            if (!r) throw Error(A(147, e));
            var i = r,
                o = "" + e;
            return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(s) {
                var a = i.refs;
                a === EE && (a = i.refs = {}), s === null ? delete a[o] : a[o] = s
            }, t._stringRef = o, t)
        }
        if (typeof e != "string") throw Error(A(284));
        if (!n._owner) throw Error(A(290, e))
    }
    return e
}

function Qu(e, t) {
    throw e = Object.prototype.toString.call(t), Error(A(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e))
}

function ag(e) {
    var t = e._init;
    return t(e._payload)
}

function wE(e) {
    function t(g, d) {
        if (e) {
            var v = g.deletions;
            v === null ? (g.deletions = [d], g.flags |= 16) : v.push(d)
        }
    }

    function n(g, d) {
        if (!e) return null;
        for (; d !== null;) t(g, d), d = d.sibling;
        return null
    }

    function r(g, d) {
        for (g = new Map; d !== null;) d.key !== null ? g.set(d.key, d) : g.set(d.index, d), d = d.sibling;
        return g
    }

    function i(g, d) {
        return g = ni(g, d), g.index = 0, g.sibling = null, g
    }

    function o(g, d, v) {
        return g.index = v, e ? (v = g.alternate, v !== null ? (v = v.index, v < d ? (g.flags |= 2, d) : v) : (g.flags |= 2, d)) : (g.flags |= 1048576, d)
    }

    function s(g) {
        return e && g.alternate === null && (g.flags |= 2), g
    }

    function a(g, d, v, E) {
        return d === null || d.tag !== 6 ? (d = Zf(v, g.mode, E), d.return = g, d) : (d = i(d, v), d.return = g, d)
    }

    function u(g, d, v, E) {
        var S = v.type;
        return S === Co ? c(g, d, v.props.children, E, v.key) : d !== null && (d.elementType === S || typeof S == "object" && S !== null && S.$$typeof === Mr && ag(S) === d.type) ? (E = i(d, v.props), E.ref = ea(g, d, v), E.return = g, E) : (E = Ol(v.type, v.key, v.props, null, g.mode, E), E.ref = ea(g, d, v), E.return = g, E)
    }

    function l(g, d, v, E) {
        return d === null || d.tag !== 4 || d.stateNode.containerInfo !== v.containerInfo || d.stateNode.implementation !== v.implementation ? (d = Jf(v, g.mode, E), d.return = g, d) : (d = i(d, v.children || []), d.return = g, d)
    }

    function c(g, d, v, E, S) {
        return d === null || d.tag !== 7 ? (d = Hi(v, g.mode, E, S), d.return = g, d) : (d = i(d, v), d.return = g, d)
    }

    function f(g, d, v) {
        if (typeof d == "string" && d !== "" || typeof d == "number") return d = Zf("" + d, g.mode, v), d.return = g, d;
        if (typeof d == "object" && d !== null) {
            switch (d.$$typeof) {
                case $u:
                    return v = Ol(d.type, d.key, d.props, null, g.mode, v), v.ref = ea(g, null, d), v.return = g, v;
                case Po:
                    return d = Jf(d, g.mode, v), d.return = g, d;
                case Mr:
                    var E = d._init;
                    return f(g, E(d._payload), v)
            }
            if (la(d) || Qs(d)) return d = Hi(d, g.mode, v, null), d.return = g, d;
            Qu(g, d)
        }
        return null
    }

    function h(g, d, v, E) {
        var S = d !== null ? d.key : null;
        if (typeof v == "string" && v !== "" || typeof v == "number") return S !== null ? null : a(g, d, "" + v, E);
        if (typeof v == "object" && v !== null) {
            switch (v.$$typeof) {
                case $u:
                    return v.key === S ? u(g, d, v, E) : null;
                case Po:
                    return v.key === S ? l(g, d, v, E) : null;
                case Mr:
                    return S = v._init, h(g, d, S(v._payload), E)
            }
            if (la(v) || Qs(v)) return S !== null ? null : c(g, d, v, E, null);
            Qu(g, v)
        }
        return null
    }

    function p(g, d, v, E, S) {
        if (typeof E == "string" && E !== "" || typeof E == "number") return g = g.get(v) || null, a(d, g, "" + E, S);
        if (typeof E == "object" && E !== null) {
            switch (E.$$typeof) {
                case $u:
                    return g = g.get(E.key === null ? v : E.key) || null, u(d, g, E, S);
                case Po:
                    return g = g.get(E.key === null ? v : E.key) || null, l(d, g, E, S);
                case Mr:
                    var w = E._init;
                    return p(g, d, v, w(E._payload), S)
            }
            if (la(E) || Qs(E)) return g = g.get(v) || null, c(d, g, E, S, null);
            Qu(d, E)
        }
        return null
    }

    function y(g, d, v, E) {
        for (var S = null, w = null, T = d, O = d = 0, b = null; T !== null && O < v.length; O++) {
            T.index > O ? (b = T, T = null) : b = T.sibling;
            var I = h(g, T, v[O], E);
            if (I === null) {
                T === null && (T = b);
                break
            }
            e && T && I.alternate === null && t(g, T), d = o(I, d, O), w === null ? S = I : w.sibling = I, w = I, T = b
        }
        if (O === v.length) return n(g, T), we && wi(g, O), S;
        if (T === null) {
            for (; O < v.length; O++) T = f(g, v[O], E), T !== null && (d = o(T, d, O), w === null ? S = T : w.sibling = T, w = T);
            return we && wi(g, O), S
        }
        for (T = r(g, T); O < v.length; O++) b = p(T, g, O, v[O], E), b !== null && (e && b.alternate !== null && T.delete(b.key === null ? O : b.key), d = o(b, d, O), w === null ? S = b : w.sibling = b, w = b);
        return e && T.forEach(function(N) {
            return t(g, N)
        }), we && wi(g, O), S
    }

    function m(g, d, v, E) {
        var S = Qs(v);
        if (typeof S != "function") throw Error(A(150));
        if (v = S.call(v), v == null) throw Error(A(151));
        for (var w = S = null, T = d, O = d = 0, b = null, I = v.next(); T !== null && !I.done; O++, I = v.next()) {
            T.index > O ? (b = T, T = null) : b = T.sibling;
            var N = h(g, T, I.value, E);
            if (N === null) {
                T === null && (T = b);
                break
            }
            e && T && N.alternate === null && t(g, T), d = o(N, d, O), w === null ? S = N : w.sibling = N, w = N, T = b
        }
        if (I.done) return n(g, T), we && wi(g, O), S;
        if (T === null) {
            for (; !I.done; O++, I = v.next()) I = f(g, I.value, E), I !== null && (d = o(I, d, O), w === null ? S = I : w.sibling = I, w = I);
            return we && wi(g, O), S
        }
        for (T = r(g, T); !I.done; O++, I = v.next()) I = p(T, g, O, I.value, E), I !== null && (e && I.alternate !== null && T.delete(I.key === null ? O : I.key), d = o(I, d, O), w === null ? S = I : w.sibling = I, w = I);
        return e && T.forEach(function(D) {
            return t(g, D)
        }), we && wi(g, O), S
    }

    function _(g, d, v, E) {
        if (typeof v == "object" && v !== null && v.type === Co && v.key === null && (v = v.props.children), typeof v == "object" && v !== null) {
            switch (v.$$typeof) {
                case $u:
                    e: {
                        for (var S = v.key, w = d; w !== null;) {
                            if (w.key === S) {
                                if (S = v.type, S === Co) {
                                    if (w.tag === 7) {
                                        n(g, w.sibling), d = i(w, v.props.children), d.return = g, g = d;
                                        break e
                                    }
                                } else if (w.elementType === S || typeof S == "object" && S !== null && S.$$typeof === Mr && ag(S) === w.type) {
                                    n(g, w.sibling), d = i(w, v.props), d.ref = ea(g, w, v), d.return = g, g = d;
                                    break e
                                }
                                n(g, w);
                                break
                            } else t(g, w);
                            w = w.sibling
                        }
                        v.type === Co ? (d = Hi(v.props.children, g.mode, E, v.key), d.return = g, g = d) : (E = Ol(v.type, v.key, v.props, null, g.mode, E), E.ref = ea(g, d, v), E.return = g, g = E)
                    }
                    return s(g);
                case Po:
                    e: {
                        for (w = v.key; d !== null;) {
                            if (d.key === w)
                                if (d.tag === 4 && d.stateNode.containerInfo === v.containerInfo && d.stateNode.implementation === v.implementation) {
                                    n(g, d.sibling), d = i(d, v.children || []), d.return = g, g = d;
                                    break e
                                } else {
                                    n(g, d);
                                    break
                                }
                            else t(g, d);
                            d = d.sibling
                        }
                        d = Jf(v, g.mode, E),
                        d.return = g,
                        g = d
                    }
                    return s(g);
                case Mr:
                    return w = v._init, _(g, d, w(v._payload), E)
            }
            if (la(v)) return y(g, d, v, E);
            if (Qs(v)) return m(g, d, v, E);
            Qu(g, v)
        }
        return typeof v == "string" && v !== "" || typeof v == "number" ? (v = "" + v, d !== null && d.tag === 6 ? (n(g, d.sibling), d = i(d, v), d.return = g, g = d) : (n(g, d), d = Zf(v, g.mode, E), d.return = g, g = d), s(g)) : n(g, d)
    }
    return _
}
var gs = wE(!0),
    xE = wE(!1),
    wu = {},
    Yn = pi(wu),
    Ua = pi(wu),
    za = pi(wu);

function Ri(e) {
    if (e === wu) throw Error(A(174));
    return e
}

function _m(e, t) {
    switch (pe(za, t), pe(Ua, e), pe(Yn, wu), e = t.nodeType, e) {
        case 9:
        case 11:
            t = (t = t.documentElement) ? t.namespaceURI : td(null, "");
            break;
        default:
            e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = td(t, e)
    }
    _e(Yn), pe(Yn, t)
}

function ys() {
    _e(Yn), _e(Ua), _e(za)
}

function TE(e) {
    Ri(za.current);
    var t = Ri(Yn.current),
        n = td(t, e.type);
    t !== n && (pe(Ua, e), pe(Yn, n))
}

function Em(e) {
    Ua.current === e && (_e(Yn), _e(Ua))
}
var Te = pi(0);

function Zl(e) {
    for (var t = e; t !== null;) {
        if (t.tag === 13) {
            var n = t.memoizedState;
            if (n !== null && (n = n.dehydrated, n === null || n.data === "$?" || n.data === "$!")) return t
        } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
            if (t.flags & 128) return t
        } else if (t.child !== null) {
            t.child.return = t, t = t.child;
            continue
        }
        if (t === e) break;
        for (; t.sibling === null;) {
            if (t.return === null || t.return === e) return null;
            t = t.return
        }
        t.sibling.return = t.return, t = t.sibling
    }
    return null
}
var Wf = [];

function Sm() {
    for (var e = 0; e < Wf.length; e++) Wf[e]._workInProgressVersionPrimary = null;
    Wf.length = 0
}
var El = Er.ReactCurrentDispatcher,
    qf = Er.ReactCurrentBatchConfig,
    Ki = 0,
    Pe = null,
    Fe = null,
    Ue = null,
    Jl = !1,
    xa = !1,
    Ga = 0,
    Bb = 0;

function Je() {
    throw Error(A(321))
}

function wm(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
        if (!In(e[n], t[n])) return !1;
    return !0
}

function xm(e, t, n, r, i, o) {
    if (Ki = o, Pe = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, El.current = e === null || e.memoizedState === null ? zb : Gb, e = n(r, i), xa) {
        o = 0;
        do {
            if (xa = !1, Ga = 0, 25 <= o) throw Error(A(301));
            o += 1, Ue = Fe = null, t.updateQueue = null, El.current = Vb, e = n(r, i)
        } while (xa)
    }
    if (El.current = ec, t = Fe !== null && Fe.next !== null, Ki = 0, Ue = Fe = Pe = null, Jl = !1, t) throw Error(A(300));
    return e
}

function Tm() {
    var e = Ga !== 0;
    return Ga = 0, e
}

function Dn() {
    var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
    };
    return Ue === null ? Pe.memoizedState = Ue = e : Ue = Ue.next = e, Ue
}

function gn() {
    if (Fe === null) {
        var e = Pe.alternate;
        e = e !== null ? e.memoizedState : null
    } else e = Fe.next;
    var t = Ue === null ? Pe.memoizedState : Ue.next;
    if (t !== null) Ue = t, Fe = e;
    else {
        if (e === null) throw Error(A(310));
        Fe = e, e = {
            memoizedState: Fe.memoizedState,
            baseState: Fe.baseState,
            baseQueue: Fe.baseQueue,
            queue: Fe.queue,
            next: null
        }, Ue === null ? Pe.memoizedState = Ue = e : Ue = Ue.next = e
    }
    return Ue
}

function Va(e, t) {
    return typeof t == "function" ? t(e) : t
}

function Xf(e) {
    var t = gn(),
        n = t.queue;
    if (n === null) throw Error(A(311));
    n.lastRenderedReducer = e;
    var r = Fe,
        i = r.baseQueue,
        o = n.pending;
    if (o !== null) {
        if (i !== null) {
            var s = i.next;
            i.next = o.next, o.next = s
        }
        r.baseQueue = i = o, n.pending = null
    }
    if (i !== null) {
        o = i.next, r = r.baseState;
        var a = s = null,
            u = null,
            l = o;
        do {
            var c = l.lane;
            if ((Ki & c) === c) u !== null && (u = u.next = {
                lane: 0,
                action: l.action,
                hasEagerState: l.hasEagerState,
                eagerState: l.eagerState,
                next: null
            }), r = l.hasEagerState ? l.eagerState : e(r, l.action);
            else {
                var f = {
                    lane: c,
                    action: l.action,
                    hasEagerState: l.hasEagerState,
                    eagerState: l.eagerState,
                    next: null
                };
                u === null ? (a = u = f, s = r) : u = u.next = f, Pe.lanes |= c, Yi |= c
            }
            l = l.next
        } while (l !== null && l !== o);
        u === null ? s = r : u.next = a, In(r, t.memoizedState) || (Ot = !0), t.memoizedState = r, t.baseState = s, t.baseQueue = u, n.lastRenderedState = r
    }
    if (e = n.interleaved, e !== null) {
        i = e;
        do o = i.lane, Pe.lanes |= o, Yi |= o, i = i.next; while (i !== e)
    } else i === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch]
}

function Qf(e) {
    var t = gn(),
        n = t.queue;
    if (n === null) throw Error(A(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch,
        i = n.pending,
        o = t.memoizedState;
    if (i !== null) {
        n.pending = null;
        var s = i = i.next;
        do o = e(o, s.action), s = s.next; while (s !== i);
        In(o, t.memoizedState) || (Ot = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o
    }
    return [o, r]
}

function OE() {}

function bE(e, t) {
    var n = Pe,
        r = gn(),
        i = t(),
        o = !In(r.memoizedState, i);
    if (o && (r.memoizedState = i, Ot = !0), r = r.queue, Om(RE.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || Ue !== null && Ue.memoizedState.tag & 1) {
        if (n.flags |= 2048, Wa(9, CE.bind(null, n, r, i, t), void 0, null), Ge === null) throw Error(A(349));
        Ki & 30 || PE(n, t, i)
    }
    return i
}

function PE(e, t, n) {
    e.flags |= 16384, e = {
        getSnapshot: t,
        value: n
    }, t = Pe.updateQueue, t === null ? (t = {
        lastEffect: null,
        stores: null
    }, Pe.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e))
}

function CE(e, t, n, r) {
    t.value = n, t.getSnapshot = r, kE(t) && ME(e)
}

function RE(e, t, n) {
    return n(function() {
        kE(t) && ME(e)
    })
}

function kE(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
        var n = t();
        return !In(e, n)
    } catch {
        return !0
    }
}

function ME(e) {
    var t = vr(e, 1);
    t !== null && kn(t, e, 1, -1)
}

function ug(e) {
    var t = Dn();
    return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Va,
        lastRenderedState: e
    }, t.queue = e, e = e.dispatch = Ub.bind(null, Pe, e), [t.memoizedState, e]
}

function Wa(e, t, n, r) {
    return e = {
        tag: e,
        create: t,
        destroy: n,
        deps: r,
        next: null
    }, t = Pe.updateQueue, t === null ? (t = {
        lastEffect: null,
        stores: null
    }, Pe.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e
}

function IE() {
    return gn().memoizedState
}

function Sl(e, t, n, r) {
    var i = Dn();
    Pe.flags |= e, i.memoizedState = Wa(1 | t, n, void 0, r === void 0 ? null : r)
}

function Ac(e, t, n, r) {
    var i = gn();
    r = r === void 0 ? null : r;
    var o = void 0;
    if (Fe !== null) {
        var s = Fe.memoizedState;
        if (o = s.destroy, r !== null && wm(r, s.deps)) {
            i.memoizedState = Wa(t, n, o, r);
            return
        }
    }
    Pe.flags |= e, i.memoizedState = Wa(1 | t, n, o, r)
}

function lg(e, t) {
    return Sl(8390656, 8, e, t)
}

function Om(e, t) {
    return Ac(2048, 8, e, t)
}

function LE(e, t) {
    return Ac(4, 2, e, t)
}

function AE(e, t) {
    return Ac(4, 4, e, t)
}

function NE(e, t) {
    if (typeof t == "function") return e = e(), t(e),
        function() {
            t(null)
        };
    if (t != null) return e = e(), t.current = e,
        function() {
            t.current = null
        }
}

function DE(e, t, n) {
    return n = n != null ? n.concat([e]) : null, Ac(4, 4, NE.bind(null, t, e), n)
}

function bm() {}

function FE(e, t) {
    var n = gn();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && wm(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e)
}

function $E(e, t) {
    var n = gn();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && wm(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e)
}

function BE(e, t, n) {
    return Ki & 21 ? (In(n, t) || (n = U1(), Pe.lanes |= n, Yi |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, Ot = !0), e.memoizedState = n)
}

function jb(e, t) {
    var n = ue;
    ue = n !== 0 && 4 > n ? n : 4, e(!0);
    var r = qf.transition;
    qf.transition = {};
    try {
        e(!1), t()
    } finally {
        ue = n, qf.transition = r
    }
}

function jE() {
    return gn().memoizedState
}

function Hb(e, t, n) {
    var r = ti(e);
    if (n = {
            lane: r,
            action: n,
            hasEagerState: !1,
            eagerState: null,
            next: null
        }, HE(e)) UE(t, n);
    else if (n = yE(e, t, n, r), n !== null) {
        var i = mt();
        kn(n, e, r, i), zE(n, t, r)
    }
}

function Ub(e, t, n) {
    var r = ti(e),
        i = {
            lane: r,
            action: n,
            hasEagerState: !1,
            eagerState: null,
            next: null
        };
    if (HE(e)) UE(t, i);
    else {
        var o = e.alternate;
        if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
            var s = t.lastRenderedState,
                a = o(s, n);
            if (i.hasEagerState = !0, i.eagerState = a, In(a, s)) {
                var u = t.interleaved;
                u === null ? (i.next = i, gm(t)) : (i.next = u.next, u.next = i), t.interleaved = i;
                return
            }
        } catch {} finally {}
        n = yE(e, t, i, r), n !== null && (i = mt(), kn(n, e, r, i), zE(n, t, r))
    }
}

function HE(e) {
    var t = e.alternate;
    return e === Pe || t !== null && t === Pe
}

function UE(e, t) {
    xa = Jl = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t
}

function zE(e, t, n) {
    if (n & 4194240) {
        var r = t.lanes;
        r &= e.pendingLanes, n |= r, t.lanes = n, rm(e, n)
    }
}
var ec = {
        readContext: vn,
        useCallback: Je,
        useContext: Je,
        useEffect: Je,
        useImperativeHandle: Je,
        useInsertionEffect: Je,
        useLayoutEffect: Je,
        useMemo: Je,
        useReducer: Je,
        useRef: Je,
        useState: Je,
        useDebugValue: Je,
        useDeferredValue: Je,
        useTransition: Je,
        useMutableSource: Je,
        useSyncExternalStore: Je,
        useId: Je,
        unstable_isNewReconciler: !1
    },
    zb = {
        readContext: vn,
        useCallback: function(e, t) {
            return Dn().memoizedState = [e, t === void 0 ? null : t], e
        },
        useContext: vn,
        useEffect: lg,
        useImperativeHandle: function(e, t, n) {
            return n = n != null ? n.concat([e]) : null, Sl(4194308, 4, NE.bind(null, t, e), n)
        },
        useLayoutEffect: function(e, t) {
            return Sl(4194308, 4, e, t)
        },
        useInsertionEffect: function(e, t) {
            return Sl(4, 2, e, t)
        },
        useMemo: function(e, t) {
            var n = Dn();
            return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e
        },
        useReducer: function(e, t, n) {
            var r = Dn();
            return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = {
                pending: null,
                interleaved: null,
                lanes: 0,
                dispatch: null,
                lastRenderedReducer: e,
                lastRenderedState: t
            }, r.queue = e, e = e.dispatch = Hb.bind(null, Pe, e), [r.memoizedState, e]
        },
        useRef: function(e) {
            var t = Dn();
            return e = {
                current: e
            }, t.memoizedState = e
        },
        useState: ug,
        useDebugValue: bm,
        useDeferredValue: function(e) {
            return Dn().memoizedState = e
        },
        useTransition: function() {
            var e = ug(!1),
                t = e[0];
            return e = jb.bind(null, e[1]), Dn().memoizedState = e, [t, e]
        },
        useMutableSource: function() {},
        useSyncExternalStore: function(e, t, n) {
            var r = Pe,
                i = Dn();
            if (we) {
                if (n === void 0) throw Error(A(407));
                n = n()
            } else {
                if (n = t(), Ge === null) throw Error(A(349));
                Ki & 30 || PE(r, t, n)
            }
            i.memoizedState = n;
            var o = {
                value: n,
                getSnapshot: t
            };
            return i.queue = o, lg(RE.bind(null, r, o, e), [e]), r.flags |= 2048, Wa(9, CE.bind(null, r, o, n, t), void 0, null), n
        },
        useId: function() {
            var e = Dn(),
                t = Ge.identifierPrefix;
            if (we) {
                var n = lr,
                    r = ur;
                n = (r & ~(1 << 32 - Rn(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = Ga++, 0 < n && (t += "H" + n.toString(32)), t += ":"
            } else n = Bb++, t = ":" + t + "r" + n.toString(32) + ":";
            return e.memoizedState = t
        },
        unstable_isNewReconciler: !1
    },
    Gb = {
        readContext: vn,
        useCallback: FE,
        useContext: vn,
        useEffect: Om,
        useImperativeHandle: DE,
        useInsertionEffect: LE,
        useLayoutEffect: AE,
        useMemo: $E,
        useReducer: Xf,
        useRef: IE,
        useState: function() {
            return Xf(Va)
        },
        useDebugValue: bm,
        useDeferredValue: function(e) {
            var t = gn();
            return BE(t, Fe.memoizedState, e)
        },
        useTransition: function() {
            var e = Xf(Va)[0],
                t = gn().memoizedState;
            return [e, t]
        },
        useMutableSource: OE,
        useSyncExternalStore: bE,
        useId: jE,
        unstable_isNewReconciler: !1
    },
    Vb = {
        readContext: vn,
        useCallback: FE,
        useContext: vn,
        useEffect: Om,
        useImperativeHandle: DE,
        useInsertionEffect: LE,
        useLayoutEffect: AE,
        useMemo: $E,
        useReducer: Qf,
        useRef: IE,
        useState: function() {
            return Qf(Va)
        },
        useDebugValue: bm,
        useDeferredValue: function(e) {
            var t = gn();
            return Fe === null ? t.memoizedState = e : BE(t, Fe.memoizedState, e)
        },
        useTransition: function() {
            var e = Qf(Va)[0],
                t = gn().memoizedState;
            return [e, t]
        },
        useMutableSource: OE,
        useSyncExternalStore: bE,
        useId: jE,
        unstable_isNewReconciler: !1
    };

function _s(e, t) {
    try {
        var n = "",
            r = t;
        do n += _O(r), r = r.return; while (r);
        var i = n
    } catch (o) {
        i = `
Error generating stack: ` + o.message + `
` + o.stack
    }
    return {
        value: e,
        source: t,
        stack: i,
        digest: null
    }
}

function Kf(e, t, n) {
    return {
        value: e,
        source: null,
        stack: n ? ? null,
        digest: t ? ? null
    }
}

function Td(e, t) {
    try {
        console.error(t.value)
    } catch (n) {
        setTimeout(function() {
            throw n
        })
    }
}
var Wb = typeof WeakMap == "function" ? WeakMap : Map;

function GE(e, t, n) {
    n = cr(-1, n), n.tag = 3, n.payload = {
        element: null
    };
    var r = t.value;
    return n.callback = function() {
        nc || (nc = !0, Ad = r), Td(e, t)
    }, n
}

function VE(e, t, n) {
    n = cr(-1, n), n.tag = 3;
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
        var i = t.value;
        n.payload = function() {
            return r(i)
        }, n.callback = function() {
            Td(e, t)
        }
    }
    var o = e.stateNode;
    return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
        Td(e, t), typeof r != "function" && (ei === null ? ei = new Set([this]) : ei.add(this));
        var s = t.stack;
        this.componentDidCatch(t.value, {
            componentStack: s !== null ? s : ""
        })
    }), n
}

function cg(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
        r = e.pingCache = new Wb;
        var i = new Set;
        r.set(t, i)
    } else i = r.get(t), i === void 0 && (i = new Set, r.set(t, i));
    i.has(n) || (i.add(n), e = sP.bind(null, e, t, n), t.then(e, e))
}

function fg(e) {
    do {
        var t;
        if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
        e = e.return
    } while (e !== null);
    return null
}

function hg(e, t, n, r, i) {
    return e.mode & 1 ? (e.flags |= 65536, e.lanes = i, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = cr(-1, 1), t.tag = 2, Jr(n, t, 1))), n.lanes |= 1), e)
}
var qb = Er.ReactCurrentOwner,
    Ot = !1;

function dt(e, t, n, r) {
    t.child = e === null ? xE(t, null, n, r) : gs(t, e.child, n, r)
}

function dg(e, t, n, r, i) {
    n = n.render;
    var o = t.ref;
    return Wo(t, i), r = xm(e, t, n, r, o, i), n = Tm(), e !== null && !Ot ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i, gr(e, t, i)) : (we && n && fm(t), t.flags |= 1, dt(e, t, r, i), t.child)
}

function pg(e, t, n, r, i) {
    if (e === null) {
        var o = n.type;
        return typeof o == "function" && !Am(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, WE(e, t, o, r, i)) : (e = Ol(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e)
    }
    if (o = e.child, !(e.lanes & i)) {
        var s = o.memoizedProps;
        if (n = n.compare, n = n !== null ? n : $a, n(s, r) && e.ref === t.ref) return gr(e, t, i)
    }
    return t.flags |= 1, e = ni(o, r), e.ref = t.ref, e.return = t, t.child = e
}

function WE(e, t, n, r, i) {
    if (e !== null) {
        var o = e.memoizedProps;
        if ($a(o, r) && e.ref === t.ref)
            if (Ot = !1, t.pendingProps = r = o, (e.lanes & i) !== 0) e.flags & 131072 && (Ot = !0);
            else return t.lanes = e.lanes, gr(e, t, i)
    }
    return Od(e, t, n, r, i)
}

function qE(e, t, n) {
    var r = t.pendingProps,
        i = r.children,
        o = e !== null ? e.memoizedState : null;
    if (r.mode === "hidden")
        if (!(t.mode & 1)) t.memoizedState = {
            baseLanes: 0,
            cachePool: null,
            transitions: null
        }, pe($o, Bt), Bt |= n;
        else {
            if (!(n & 1073741824)) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = {
                baseLanes: e,
                cachePool: null,
                transitions: null
            }, t.updateQueue = null, pe($o, Bt), Bt |= e, null;
            t.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null
            }, r = o !== null ? o.baseLanes : n, pe($o, Bt), Bt |= r
        }
    else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, pe($o, Bt), Bt |= r;
    return dt(e, t, i, n), t.child
}

function XE(e, t) {
    var n = t.ref;
    (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152)
}

function Od(e, t, n, r, i) {
    var o = Pt(n) ? Xi : st.current;
    return o = ms(t, o), Wo(t, i), n = xm(e, t, n, r, o, i), r = Tm(), e !== null && !Ot ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i, gr(e, t, i)) : (we && r && fm(t), t.flags |= 1, dt(e, t, n, i), t.child)
}

function mg(e, t, n, r, i) {
    if (Pt(n)) {
        var o = !0;
        Wl(t)
    } else o = !1;
    if (Wo(t, i), t.stateNode === null) wl(e, t), SE(t, n, r), xd(t, n, r, i), r = !0;
    else if (e === null) {
        var s = t.stateNode,
            a = t.memoizedProps;
        s.props = a;
        var u = s.context,
            l = n.contextType;
        typeof l == "object" && l !== null ? l = vn(l) : (l = Pt(n) ? Xi : st.current, l = ms(t, l));
        var c = n.getDerivedStateFromProps,
            f = typeof c == "function" || typeof s.getSnapshotBeforeUpdate == "function";
        f || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (a !== r || u !== l) && sg(t, s, r, l), Ir = !1;
        var h = t.memoizedState;
        s.state = h, Yl(t, r, s, i), u = t.memoizedState, a !== r || h !== u || bt.current || Ir ? (typeof c == "function" && (wd(t, n, c, r), u = t.memoizedState), (a = Ir || og(t, n, a, r, h, u, l)) ? (f || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount()), typeof s.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = u), s.props = r, s.state = u, s.context = l, r = a) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), r = !1)
    } else {
        s = t.stateNode, _E(e, t), a = t.memoizedProps, l = t.type === t.elementType ? a : xn(t.type, a), s.props = l, f = t.pendingProps, h = s.context, u = n.contextType, typeof u == "object" && u !== null ? u = vn(u) : (u = Pt(n) ? Xi : st.current, u = ms(t, u));
        var p = n.getDerivedStateFromProps;
        (c = typeof p == "function" || typeof s.getSnapshotBeforeUpdate == "function") || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (a !== f || h !== u) && sg(t, s, r, u), Ir = !1, h = t.memoizedState, s.state = h, Yl(t, r, s, i);
        var y = t.memoizedState;
        a !== f || h !== y || bt.current || Ir ? (typeof p == "function" && (wd(t, n, p, r), y = t.memoizedState), (l = Ir || og(t, n, l, r, h, y, u) || !1) ? (c || typeof s.UNSAFE_componentWillUpdate != "function" && typeof s.componentWillUpdate != "function" || (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(r, y, u), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(r, y, u)), typeof s.componentDidUpdate == "function" && (t.flags |= 4), typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof s.componentDidUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = y), s.props = r, s.state = y, s.context = u, r = l) : (typeof s.componentDidUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), r = !1)
    }
    return bd(e, t, n, r, o, i)
}

function bd(e, t, n, r, i, o) {
    XE(e, t);
    var s = (t.flags & 128) !== 0;
    if (!r && !s) return i && eg(t, n, !1), gr(e, t, o);
    r = t.stateNode, qb.current = t;
    var a = s && typeof n.getDerivedStateFromError != "function" ? null : r.render();
    return t.flags |= 1, e !== null && s ? (t.child = gs(t, e.child, null, o), t.child = gs(t, null, a, o)) : dt(e, t, a, o), t.memoizedState = r.state, i && eg(t, n, !0), t.child
}

function QE(e) {
    var t = e.stateNode;
    t.pendingContext ? Jv(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Jv(e, t.context, !1), _m(e, t.containerInfo)
}

function vg(e, t, n, r, i) {
    return vs(), dm(i), t.flags |= 256, dt(e, t, n, r), t.child
}
var Pd = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0
};

function Cd(e) {
    return {
        baseLanes: e,
        cachePool: null,
        transitions: null
    }
}

function KE(e, t, n) {
    var r = t.pendingProps,
        i = Te.current,
        o = !1,
        s = (t.flags & 128) !== 0,
        a;
    if ((a = s) || (a = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0), a ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (i |= 1), pe(Te, i & 1), e === null) return Ed(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (s = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, s = {
        mode: "hidden",
        children: s
    }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = s) : o = Fc(s, r, 0, null), e = Hi(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = Cd(n), t.memoizedState = Pd, e) : Pm(t, s));
    if (i = e.memoizedState, i !== null && (a = i.dehydrated, a !== null)) return Xb(e, t, s, r, a, i, n);
    if (o) {
        o = r.fallback, s = t.mode, i = e.child, a = i.sibling;
        var u = {
            mode: "hidden",
            children: r.children
        };
        return !(s & 1) && t.child !== i ? (r = t.child, r.childLanes = 0, r.pendingProps = u, t.deletions = null) : (r = ni(i, u), r.subtreeFlags = i.subtreeFlags & 14680064), a !== null ? o = ni(a, o) : (o = Hi(o, s, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, s = e.child.memoizedState, s = s === null ? Cd(n) : {
            baseLanes: s.baseLanes | n,
            cachePool: null,
            transitions: s.transitions
        }, o.memoizedState = s, o.childLanes = e.childLanes & ~n, t.memoizedState = Pd, r
    }
    return o = e.child, e = o.sibling, r = ni(o, {
        mode: "visible",
        children: r.children
    }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r
}

function Pm(e, t) {
    return t = Fc({
        mode: "visible",
        children: t
    }, e.mode, 0, null), t.return = e, e.child = t
}

function Ku(e, t, n, r) {
    return r !== null && dm(r), gs(t, e.child, null, n), e = Pm(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e
}

function Xb(e, t, n, r, i, o, s) {
    if (n) return t.flags & 256 ? (t.flags &= -257, r = Kf(Error(A(422))), Ku(e, t, s, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, i = t.mode, r = Fc({
        mode: "visible",
        children: r.children
    }, i, 0, null), o = Hi(o, i, s, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, t.mode & 1 && gs(t, e.child, null, s), t.child.memoizedState = Cd(s), t.memoizedState = Pd, o);
    if (!(t.mode & 1)) return Ku(e, t, s, null);
    if (i.data === "$!") {
        if (r = i.nextSibling && i.nextSibling.dataset, r) var a = r.dgst;
        return r = a, o = Error(A(419)), r = Kf(o, r, void 0), Ku(e, t, s, r)
    }
    if (a = (s & e.childLanes) !== 0, Ot || a) {
        if (r = Ge, r !== null) {
            switch (s & -s) {
                case 4:
                    i = 2;
                    break;
                case 16:
                    i = 8;
                    break;
                case 64:
                case 128:
                case 256:
                case 512:
                case 1024:
                case 2048:
                case 4096:
                case 8192:
                case 16384:
                case 32768:
                case 65536:
                case 131072:
                case 262144:
                case 524288:
                case 1048576:
                case 2097152:
                case 4194304:
                case 8388608:
                case 16777216:
                case 33554432:
                case 67108864:
                    i = 32;
                    break;
                case 536870912:
                    i = 268435456;
                    break;
                default:
                    i = 0
            }
            i = i & (r.suspendedLanes | s) ? 0 : i, i !== 0 && i !== o.retryLane && (o.retryLane = i, vr(e, i), kn(r, e, i, -1))
        }
        return Lm(), r = Kf(Error(A(421))), Ku(e, t, s, r)
    }
    return i.data === "$?" ? (t.flags |= 128, t.child = e.child, t = aP.bind(null, e), i._reactRetry = t, null) : (e = o.treeContext, Vt = Zr(i.nextSibling), qt = t, we = !0, Pn = null, e !== null && (sn[an++] = ur, sn[an++] = lr, sn[an++] = Qi, ur = e.id, lr = e.overflow, Qi = t), t = Pm(t, r.children), t.flags |= 4096, t)
}

function gg(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t), Sd(e.return, t, n)
}

function Yf(e, t, n, r, i) {
    var o = e.memoizedState;
    o === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: i
    } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i)
}

function YE(e, t, n) {
    var r = t.pendingProps,
        i = r.revealOrder,
        o = r.tail;
    if (dt(e, t, r.children, n), r = Te.current, r & 2) r = r & 1 | 2, t.flags |= 128;
    else {
        if (e !== null && e.flags & 128) e: for (e = t.child; e !== null;) {
            if (e.tag === 13) e.memoizedState !== null && gg(e, n, t);
            else if (e.tag === 19) gg(e, n, t);
            else if (e.child !== null) {
                e.child.return = e, e = e.child;
                continue
            }
            if (e === t) break e;
            for (; e.sibling === null;) {
                if (e.return === null || e.return === t) break e;
                e = e.return
            }
            e.sibling.return = e.return, e = e.sibling
        }
        r &= 1
    }
    if (pe(Te, r), !(t.mode & 1)) t.memoizedState = null;
    else switch (i) {
        case "forwards":
            for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && Zl(e) === null && (i = n), n = n.sibling;
            n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), Yf(t, !1, i, n, o);
            break;
        case "backwards":
            for (n = null, i = t.child, t.child = null; i !== null;) {
                if (e = i.alternate, e !== null && Zl(e) === null) {
                    t.child = i;
                    break
                }
                e = i.sibling, i.sibling = n, n = i, i = e
            }
            Yf(t, !0, n, null, o);
            break;
        case "together":
            Yf(t, !1, null, null, void 0);
            break;
        default:
            t.memoizedState = null
    }
    return t.child
}

function wl(e, t) {
    !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2)
}

function gr(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies), Yi |= t.lanes, !(n & t.childLanes)) return null;
    if (e !== null && t.child !== e.child) throw Error(A(153));
    if (t.child !== null) {
        for (e = t.child, n = ni(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = ni(e, e.pendingProps), n.return = t;
        n.sibling = null
    }
    return t.child
}

function Qb(e, t, n) {
    switch (t.tag) {
        case 3:
            QE(t), vs();
            break;
        case 5:
            TE(t);
            break;
        case 1:
            Pt(t.type) && Wl(t);
            break;
        case 4:
            _m(t, t.stateNode.containerInfo);
            break;
        case 10:
            var r = t.type._context,
                i = t.memoizedProps.value;
            pe(Ql, r._currentValue), r._currentValue = i;
            break;
        case 13:
            if (r = t.memoizedState, r !== null) return r.dehydrated !== null ? (pe(Te, Te.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? KE(e, t, n) : (pe(Te, Te.current & 1), e = gr(e, t, n), e !== null ? e.sibling : null);
            pe(Te, Te.current & 1);
            break;
        case 19:
            if (r = (n & t.childLanes) !== 0, e.flags & 128) {
                if (r) return YE(e, t, n);
                t.flags |= 128
            }
            if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), pe(Te, Te.current), r) break;
            return null;
        case 22:
        case 23:
            return t.lanes = 0, qE(e, t, n)
    }
    return gr(e, t, n)
}
var ZE, Rd, JE, eS;
ZE = function(e, t) {
    for (var n = t.child; n !== null;) {
        if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
        else if (n.tag !== 4 && n.child !== null) {
            n.child.return = n, n = n.child;
            continue
        }
        if (n === t) break;
        for (; n.sibling === null;) {
            if (n.return === null || n.return === t) return;
            n = n.return
        }
        n.sibling.return = n.return, n = n.sibling
    }
};
Rd = function() {};
JE = function(e, t, n, r) {
    var i = e.memoizedProps;
    if (i !== r) {
        e = t.stateNode, Ri(Yn.current);
        var o = null;
        switch (n) {
            case "input":
                i = Yh(e, i), r = Yh(e, r), o = [];
                break;
            case "select":
                i = Ce({}, i, {
                    value: void 0
                }), r = Ce({}, r, {
                    value: void 0
                }), o = [];
                break;
            case "textarea":
                i = ed(e, i), r = ed(e, r), o = [];
                break;
            default:
                typeof i.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Gl)
        }
        nd(n, r);
        var s;
        n = null;
        for (l in i)
            if (!r.hasOwnProperty(l) && i.hasOwnProperty(l) && i[l] != null)
                if (l === "style") {
                    var a = i[l];
                    for (s in a) a.hasOwnProperty(s) && (n || (n = {}), n[s] = "")
                } else l !== "dangerouslySetInnerHTML" && l !== "children" && l !== "suppressContentEditableWarning" && l !== "suppressHydrationWarning" && l !== "autoFocus" && (Ma.hasOwnProperty(l) ? o || (o = []) : (o = o || []).push(l, null));
        for (l in r) {
            var u = r[l];
            if (a = i != null ? i[l] : void 0, r.hasOwnProperty(l) && u !== a && (u != null || a != null))
                if (l === "style")
                    if (a) {
                        for (s in a) !a.hasOwnProperty(s) || u && u.hasOwnProperty(s) || (n || (n = {}), n[s] = "");
                        for (s in u) u.hasOwnProperty(s) && a[s] !== u[s] && (n || (n = {}), n[s] = u[s])
                    } else n || (o || (o = []), o.push(l, n)), n = u;
            else l === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, a = a ? a.__html : void 0, u != null && a !== u && (o = o || []).push(l, u)) : l === "children" ? typeof u != "string" && typeof u != "number" || (o = o || []).push(l, "" + u) : l !== "suppressContentEditableWarning" && l !== "suppressHydrationWarning" && (Ma.hasOwnProperty(l) ? (u != null && l === "onScroll" && ve("scroll", e), o || a === u || (o = [])) : (o = o || []).push(l, u))
        }
        n && (o = o || []).push("style", n);
        var l = o;
        (t.updateQueue = l) && (t.flags |= 4)
    }
};
eS = function(e, t, n, r) {
    n !== r && (t.flags |= 4)
};

function ta(e, t) {
    if (!we) switch (e.tailMode) {
        case "hidden":
            t = e.tail;
            for (var n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
            n === null ? e.tail = null : n.sibling = null;
            break;
        case "collapsed":
            n = e.tail;
            for (var r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
            r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null
    }
}

function et(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
        n = 0,
        r = 0;
    if (t)
        for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 14680064, r |= i.flags & 14680064, i.return = e, i = i.sibling;
    else
        for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
    return e.subtreeFlags |= r, e.childLanes = n, t
}

function Kb(e, t, n) {
    var r = t.pendingProps;
    switch (hm(t), t.tag) {
        case 2:
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
            return et(t), null;
        case 1:
            return Pt(t.type) && Vl(), et(t), null;
        case 3:
            return r = t.stateNode, ys(), _e(bt), _e(st), Sm(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (Xu(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Pn !== null && (Fd(Pn), Pn = null))), Rd(e, t), et(t), null;
        case 5:
            Em(t);
            var i = Ri(za.current);
            if (n = t.type, e !== null && t.stateNode != null) JE(e, t, n, r, i), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
            else {
                if (!r) {
                    if (t.stateNode === null) throw Error(A(166));
                    return et(t), null
                }
                if (e = Ri(Yn.current), Xu(t)) {
                    r = t.stateNode, n = t.type;
                    var o = t.memoizedProps;
                    switch (r[Vn] = t, r[Ha] = o, e = (t.mode & 1) !== 0, n) {
                        case "dialog":
                            ve("cancel", r), ve("close", r);
                            break;
                        case "iframe":
                        case "object":
                        case "embed":
                            ve("load", r);
                            break;
                        case "video":
                        case "audio":
                            for (i = 0; i < fa.length; i++) ve(fa[i], r);
                            break;
                        case "source":
                            ve("error", r);
                            break;
                        case "img":
                        case "image":
                        case "link":
                            ve("error", r), ve("load", r);
                            break;
                        case "details":
                            ve("toggle", r);
                            break;
                        case "input":
                            bv(r, o), ve("invalid", r);
                            break;
                        case "select":
                            r._wrapperState = {
                                wasMultiple: !!o.multiple
                            }, ve("invalid", r);
                            break;
                        case "textarea":
                            Cv(r, o), ve("invalid", r)
                    }
                    nd(n, o), i = null;
                    for (var s in o)
                        if (o.hasOwnProperty(s)) {
                            var a = o[s];
                            s === "children" ? typeof a == "string" ? r.textContent !== a && (o.suppressHydrationWarning !== !0 && qu(r.textContent, a, e), i = ["children", a]) : typeof a == "number" && r.textContent !== "" + a && (o.suppressHydrationWarning !== !0 && qu(r.textContent, a, e), i = ["children", "" + a]) : Ma.hasOwnProperty(s) && a != null && s === "onScroll" && ve("scroll", r)
                        }
                    switch (n) {
                        case "input":
                            Bu(r), Pv(r, o, !0);
                            break;
                        case "textarea":
                            Bu(r), Rv(r);
                            break;
                        case "select":
                        case "option":
                            break;
                        default:
                            typeof o.onClick == "function" && (r.onclick = Gl)
                    }
                    r = i, t.updateQueue = r, r !== null && (t.flags |= 4)
                } else {
                    s = i.nodeType === 9 ? i : i.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = P1(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = s.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = s.createElement(n, {
                        is: r.is
                    }) : (e = s.createElement(n), n === "select" && (s = e, r.multiple ? s.multiple = !0 : r.size && (s.size = r.size))) : e = s.createElementNS(e, n), e[Vn] = t, e[Ha] = r, ZE(e, t, !1, !1), t.stateNode = e;
                    e: {
                        switch (s = rd(n, r), n) {
                            case "dialog":
                                ve("cancel", e), ve("close", e), i = r;
                                break;
                            case "iframe":
                            case "object":
                            case "embed":
                                ve("load", e), i = r;
                                break;
                            case "video":
                            case "audio":
                                for (i = 0; i < fa.length; i++) ve(fa[i], e);
                                i = r;
                                break;
                            case "source":
                                ve("error", e), i = r;
                                break;
                            case "img":
                            case "image":
                            case "link":
                                ve("error", e), ve("load", e), i = r;
                                break;
                            case "details":
                                ve("toggle", e), i = r;
                                break;
                            case "input":
                                bv(e, r), i = Yh(e, r), ve("invalid", e);
                                break;
                            case "option":
                                i = r;
                                break;
                            case "select":
                                e._wrapperState = {
                                    wasMultiple: !!r.multiple
                                }, i = Ce({}, r, {
                                    value: void 0
                                }), ve("invalid", e);
                                break;
                            case "textarea":
                                Cv(e, r), i = ed(e, r), ve("invalid", e);
                                break;
                            default:
                                i = r
                        }
                        nd(n, i),
                        a = i;
                        for (o in a)
                            if (a.hasOwnProperty(o)) {
                                var u = a[o];
                                o === "style" ? k1(e, u) : o === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, u != null && C1(e, u)) : o === "children" ? typeof u == "string" ? (n !== "textarea" || u !== "") && Ia(e, u) : typeof u == "number" && Ia(e, "" + u) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (Ma.hasOwnProperty(o) ? u != null && o === "onScroll" && ve("scroll", e) : u != null && Yp(e, o, u, s))
                            }
                        switch (n) {
                            case "input":
                                Bu(e), Pv(e, r, !1);
                                break;
                            case "textarea":
                                Bu(e), Rv(e);
                                break;
                            case "option":
                                r.value != null && e.setAttribute("value", "" + ai(r.value));
                                break;
                            case "select":
                                e.multiple = !!r.multiple, o = r.value, o != null ? Uo(e, !!r.multiple, o, !1) : r.defaultValue != null && Uo(e, !!r.multiple, r.defaultValue, !0);
                                break;
                            default:
                                typeof i.onClick == "function" && (e.onclick = Gl)
                        }
                        switch (n) {
                            case "button":
                            case "input":
                            case "select":
                            case "textarea":
                                r = !!r.autoFocus;
                                break e;
                            case "img":
                                r = !0;
                                break e;
                            default:
                                r = !1
                        }
                    }
                    r && (t.flags |= 4)
                }
                t.ref !== null && (t.flags |= 512, t.flags |= 2097152)
            }
            return et(t), null;
        case 6:
            if (e && t.stateNode != null) eS(e, t, e.memoizedProps, r);
            else {
                if (typeof r != "string" && t.stateNode === null) throw Error(A(166));
                if (n = Ri(za.current), Ri(Yn.current), Xu(t)) {
                    if (r = t.stateNode, n = t.memoizedProps, r[Vn] = t, (o = r.nodeValue !== n) && (e = qt, e !== null)) switch (e.tag) {
                        case 3:
                            qu(r.nodeValue, n, (e.mode & 1) !== 0);
                            break;
                        case 5:
                            e.memoizedProps.suppressHydrationWarning !== !0 && qu(r.nodeValue, n, (e.mode & 1) !== 0)
                    }
                    o && (t.flags |= 4)
                } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Vn] = t, t.stateNode = r
            }
            return et(t), null;
        case 13:
            if (_e(Te), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
                if (we && Vt !== null && t.mode & 1 && !(t.flags & 128)) gE(), vs(), t.flags |= 98560, o = !1;
                else if (o = Xu(t), r !== null && r.dehydrated !== null) {
                    if (e === null) {
                        if (!o) throw Error(A(318));
                        if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(A(317));
                        o[Vn] = t
                    } else vs(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
                    et(t), o = !1
                } else Pn !== null && (Fd(Pn), Pn = null), o = !0;
                if (!o) return t.flags & 65536 ? t : null
            }
            return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || Te.current & 1 ? Be === 0 && (Be = 3) : Lm())), t.updateQueue !== null && (t.flags |= 4), et(t), null);
        case 4:
            return ys(), Rd(e, t), e === null && Ba(t.stateNode.containerInfo), et(t), null;
        case 10:
            return vm(t.type._context), et(t), null;
        case 17:
            return Pt(t.type) && Vl(), et(t), null;
        case 19:
            if (_e(Te), o = t.memoizedState, o === null) return et(t), null;
            if (r = (t.flags & 128) !== 0, s = o.rendering, s === null)
                if (r) ta(o, !1);
                else {
                    if (Be !== 0 || e !== null && e.flags & 128)
                        for (e = t.child; e !== null;) {
                            if (s = Zl(e), s !== null) {
                                for (t.flags |= 128, ta(o, !1), r = s.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null;) o = n, e = r, o.flags &= 14680066, s = o.alternate, s === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = s.childLanes, o.lanes = s.lanes, o.child = s.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = s.memoizedProps, o.memoizedState = s.memoizedState, o.updateQueue = s.updateQueue, o.type = s.type, e = s.dependencies, o.dependencies = e === null ? null : {
                                    lanes: e.lanes,
                                    firstContext: e.firstContext
                                }), n = n.sibling;
                                return pe(Te, Te.current & 1 | 2), t.child
                            }
                            e = e.sibling
                        }
                    o.tail !== null && Ae() > Es && (t.flags |= 128, r = !0, ta(o, !1), t.lanes = 4194304)
                }
            else {
                if (!r)
                    if (e = Zl(s), e !== null) {
                        if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), ta(o, !0), o.tail === null && o.tailMode === "hidden" && !s.alternate && !we) return et(t), null
                    } else 2 * Ae() - o.renderingStartTime > Es && n !== 1073741824 && (t.flags |= 128, r = !0, ta(o, !1), t.lanes = 4194304);
                o.isBackwards ? (s.sibling = t.child, t.child = s) : (n = o.last, n !== null ? n.sibling = s : t.child = s, o.last = s)
            }
            return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = Ae(), t.sibling = null, n = Te.current, pe(Te, r ? n & 1 | 2 : n & 1), t) : (et(t), null);
        case 22:
        case 23:
            return Im(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? Bt & 1073741824 && (et(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : et(t), null;
        case 24:
            return null;
        case 25:
            return null
    }
    throw Error(A(156, t.tag))
}

function Yb(e, t) {
    switch (hm(t), t.tag) {
        case 1:
            return Pt(t.type) && Vl(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
        case 3:
            return ys(), _e(bt), _e(st), Sm(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
        case 5:
            return Em(t), null;
        case 13:
            if (_e(Te), e = t.memoizedState, e !== null && e.dehydrated !== null) {
                if (t.alternate === null) throw Error(A(340));
                vs()
            }
            return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
        case 19:
            return _e(Te), null;
        case 4:
            return ys(), null;
        case 10:
            return vm(t.type._context), null;
        case 22:
        case 23:
            return Im(), null;
        case 24:
            return null;
        default:
            return null
    }
}
var Yu = !1,
    tt = !1,
    Zb = typeof WeakSet == "function" ? WeakSet : Set,
    j = null;

function Fo(e, t) {
    var n = e.ref;
    if (n !== null)
        if (typeof n == "function") try {
            n(null)
        } catch (r) {
            ke(e, t, r)
        } else n.current = null
}

function kd(e, t, n) {
    try {
        n()
    } catch (r) {
        ke(e, t, r)
    }
}
var yg = !1;

function Jb(e, t) {
    if (dd = Hl, e = iE(), cm(e)) {
        if ("selectionStart" in e) var n = {
            start: e.selectionStart,
            end: e.selectionEnd
        };
        else e: {
            n = (n = e.ownerDocument) && n.defaultView || window;
            var r = n.getSelection && n.getSelection();
            if (r && r.rangeCount !== 0) {
                n = r.anchorNode;
                var i = r.anchorOffset,
                    o = r.focusNode;
                r = r.focusOffset;
                try {
                    n.nodeType, o.nodeType
                } catch {
                    n = null;
                    break e
                }
                var s = 0,
                    a = -1,
                    u = -1,
                    l = 0,
                    c = 0,
                    f = e,
                    h = null;
                t: for (;;) {
                    for (var p; f !== n || i !== 0 && f.nodeType !== 3 || (a = s + i), f !== o || r !== 0 && f.nodeType !== 3 || (u = s + r), f.nodeType === 3 && (s += f.nodeValue.length), (p = f.firstChild) !== null;) h = f, f = p;
                    for (;;) {
                        if (f === e) break t;
                        if (h === n && ++l === i && (a = s), h === o && ++c === r && (u = s), (p = f.nextSibling) !== null) break;
                        f = h, h = f.parentNode
                    }
                    f = p
                }
                n = a === -1 || u === -1 ? null : {
                    start: a,
                    end: u
                }
            } else n = null
        }
        n = n || {
            start: 0,
            end: 0
        }
    } else n = null;
    for (pd = {
            focusedElem: e,
            selectionRange: n
        }, Hl = !1, j = t; j !== null;)
        if (t = j, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, j = e;
        else
            for (; j !== null;) {
                t = j;
                try {
                    var y = t.alternate;
                    if (t.flags & 1024) switch (t.tag) {
                        case 0:
                        case 11:
                        case 15:
                            break;
                        case 1:
                            if (y !== null) {
                                var m = y.memoizedProps,
                                    _ = y.memoizedState,
                                    g = t.stateNode,
                                    d = g.getSnapshotBeforeUpdate(t.elementType === t.type ? m : xn(t.type, m), _);
                                g.__reactInternalSnapshotBeforeUpdate = d
                            }
                            break;
                        case 3:
                            var v = t.stateNode.containerInfo;
                            v.nodeType === 1 ? v.textContent = "" : v.nodeType === 9 && v.documentElement && v.removeChild(v.documentElement);
                            break;
                        case 5:
                        case 6:
                        case 4:
                        case 17:
                            break;
                        default:
                            throw Error(A(163))
                    }
                } catch (E) {
                    ke(t, t.return, E)
                }
                if (e = t.sibling, e !== null) {
                    e.return = t.return, j = e;
                    break
                }
                j = t.return
            }
    return y = yg, yg = !1, y
}

function Ta(e, t, n) {
    var r = t.updateQueue;
    if (r = r !== null ? r.lastEffect : null, r !== null) {
        var i = r = r.next;
        do {
            if ((i.tag & e) === e) {
                var o = i.destroy;
                i.destroy = void 0, o !== void 0 && kd(t, n, o)
            }
            i = i.next
        } while (i !== r)
    }
}

function Nc(e, t) {
    if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
        var n = t = t.next;
        do {
            if ((n.tag & e) === e) {
                var r = n.create;
                n.destroy = r()
            }
            n = n.next
        } while (n !== t)
    }
}

function Md(e) {
    var t = e.ref;
    if (t !== null) {
        var n = e.stateNode;
        switch (e.tag) {
            case 5:
                e = n;
                break;
            default:
                e = n
        }
        typeof t == "function" ? t(e) : t.current = e
    }
}

function tS(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, tS(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Vn], delete t[Ha], delete t[gd], delete t[Nb], delete t[Db])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null
}

function nS(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4
}

function _g(e) {
    e: for (;;) {
        for (; e.sibling === null;) {
            if (e.return === null || nS(e.return)) return null;
            e = e.return
        }
        for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
            if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
            e.child.return = e, e = e.child
        }
        if (!(e.flags & 2)) return e.stateNode
    }
}

function Id(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Gl));
    else if (r !== 4 && (e = e.child, e !== null))
        for (Id(e, t, n), e = e.sibling; e !== null;) Id(e, t, n), e = e.sibling
}

function Ld(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (r !== 4 && (e = e.child, e !== null))
        for (Ld(e, t, n), e = e.sibling; e !== null;) Ld(e, t, n), e = e.sibling
}
var qe = null,
    On = !1;

function Or(e, t, n) {
    for (n = n.child; n !== null;) rS(e, t, n), n = n.sibling
}

function rS(e, t, n) {
    if (Kn && typeof Kn.onCommitFiberUnmount == "function") try {
        Kn.onCommitFiberUnmount(Pc, n)
    } catch {}
    switch (n.tag) {
        case 5:
            tt || Fo(n, t);
        case 6:
            var r = qe,
                i = On;
            qe = null, Or(e, t, n), qe = r, On = i, qe !== null && (On ? (e = qe, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : qe.removeChild(n.stateNode));
            break;
        case 18:
            qe !== null && (On ? (e = qe, n = n.stateNode, e.nodeType === 8 ? Gf(e.parentNode, n) : e.nodeType === 1 && Gf(e, n), Da(e)) : Gf(qe, n.stateNode));
            break;
        case 4:
            r = qe, i = On, qe = n.stateNode.containerInfo, On = !0, Or(e, t, n), qe = r, On = i;
            break;
        case 0:
        case 11:
        case 14:
        case 15:
            if (!tt && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
                i = r = r.next;
                do {
                    var o = i,
                        s = o.destroy;
                    o = o.tag, s !== void 0 && (o & 2 || o & 4) && kd(n, t, s), i = i.next
                } while (i !== r)
            }
            Or(e, t, n);
            break;
        case 1:
            if (!tt && (Fo(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
                r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount()
            } catch (a) {
                ke(n, t, a)
            }
            Or(e, t, n);
            break;
        case 21:
            Or(e, t, n);
            break;
        case 22:
            n.mode & 1 ? (tt = (r = tt) || n.memoizedState !== null, Or(e, t, n), tt = r) : Or(e, t, n);
            break;
        default:
            Or(e, t, n)
    }
}

function Eg(e) {
    var t = e.updateQueue;
    if (t !== null) {
        e.updateQueue = null;
        var n = e.stateNode;
        n === null && (n = e.stateNode = new Zb), t.forEach(function(r) {
            var i = uP.bind(null, e, r);
            n.has(r) || (n.add(r), r.then(i, i))
        })
    }
}

function wn(e, t) {
    var n = t.deletions;
    if (n !== null)
        for (var r = 0; r < n.length; r++) {
            var i = n[r];
            try {
                var o = e,
                    s = t,
                    a = s;
                e: for (; a !== null;) {
                    switch (a.tag) {
                        case 5:
                            qe = a.stateNode, On = !1;
                            break e;
                        case 3:
                            qe = a.stateNode.containerInfo, On = !0;
                            break e;
                        case 4:
                            qe = a.stateNode.containerInfo, On = !0;
                            break e
                    }
                    a = a.return
                }
                if (qe === null) throw Error(A(160));
                rS(o, s, i), qe = null, On = !1;
                var u = i.alternate;
                u !== null && (u.return = null), i.return = null
            } catch (l) {
                ke(i, t, l)
            }
        }
    if (t.subtreeFlags & 12854)
        for (t = t.child; t !== null;) iS(t, e), t = t.sibling
}

function iS(e, t) {
    var n = e.alternate,
        r = e.flags;
    switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
            if (wn(t, e), Ln(e), r & 4) {
                try {
                    Ta(3, e, e.return), Nc(3, e)
                } catch (m) {
                    ke(e, e.return, m)
                }
                try {
                    Ta(5, e, e.return)
                } catch (m) {
                    ke(e, e.return, m)
                }
            }
            break;
        case 1:
            wn(t, e), Ln(e), r & 512 && n !== null && Fo(n, n.return);
            break;
        case 5:
            if (wn(t, e), Ln(e), r & 512 && n !== null && Fo(n, n.return), e.flags & 32) {
                var i = e.stateNode;
                try {
                    Ia(i, "")
                } catch (m) {
                    ke(e, e.return, m)
                }
            }
            if (r & 4 && (i = e.stateNode, i != null)) {
                var o = e.memoizedProps,
                    s = n !== null ? n.memoizedProps : o,
                    a = e.type,
                    u = e.updateQueue;
                if (e.updateQueue = null, u !== null) try {
                    a === "input" && o.type === "radio" && o.name != null && O1(i, o), rd(a, s);
                    var l = rd(a, o);
                    for (s = 0; s < u.length; s += 2) {
                        var c = u[s],
                            f = u[s + 1];
                        c === "style" ? k1(i, f) : c === "dangerouslySetInnerHTML" ? C1(i, f) : c === "children" ? Ia(i, f) : Yp(i, c, f, l)
                    }
                    switch (a) {
                        case "input":
                            Zh(i, o);
                            break;
                        case "textarea":
                            b1(i, o);
                            break;
                        case "select":
                            var h = i._wrapperState.wasMultiple;
                            i._wrapperState.wasMultiple = !!o.multiple;
                            var p = o.value;
                            p != null ? Uo(i, !!o.multiple, p, !1) : h !== !!o.multiple && (o.defaultValue != null ? Uo(i, !!o.multiple, o.defaultValue, !0) : Uo(i, !!o.multiple, o.multiple ? [] : "", !1))
                    }
                    i[Ha] = o
                } catch (m) {
                    ke(e, e.return, m)
                }
            }
            break;
        case 6:
            if (wn(t, e), Ln(e), r & 4) {
                if (e.stateNode === null) throw Error(A(162));
                i = e.stateNode, o = e.memoizedProps;
                try {
                    i.nodeValue = o
                } catch (m) {
                    ke(e, e.return, m)
                }
            }
            break;
        case 3:
            if (wn(t, e), Ln(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
                Da(t.containerInfo)
            } catch (m) {
                ke(e, e.return, m)
            }
            break;
        case 4:
            wn(t, e), Ln(e);
            break;
        case 13:
            wn(t, e), Ln(e), i = e.child, i.flags & 8192 && (o = i.memoizedState !== null, i.stateNode.isHidden = o, !o || i.alternate !== null && i.alternate.memoizedState !== null || (km = Ae())), r & 4 && Eg(e);
            break;
        case 22:
            if (c = n !== null && n.memoizedState !== null, e.mode & 1 ? (tt = (l = tt) || c, wn(t, e), tt = l) : wn(t, e), Ln(e), r & 8192) {
                if (l = e.memoizedState !== null, (e.stateNode.isHidden = l) && !c && e.mode & 1)
                    for (j = e, c = e.child; c !== null;) {
                        for (f = j = c; j !== null;) {
                            switch (h = j, p = h.child, h.tag) {
                                case 0:
                                case 11:
                                case 14:
                                case 15:
                                    Ta(4, h, h.return);
                                    break;
                                case 1:
                                    Fo(h, h.return);
                                    var y = h.stateNode;
                                    if (typeof y.componentWillUnmount == "function") {
                                        r = h, n = h.return;
                                        try {
                                            t = r, y.props = t.memoizedProps, y.state = t.memoizedState, y.componentWillUnmount()
                                        } catch (m) {
                                            ke(r, n, m)
                                        }
                                    }
                                    break;
                                case 5:
                                    Fo(h, h.return);
                                    break;
                                case 22:
                                    if (h.memoizedState !== null) {
                                        wg(f);
                                        continue
                                    }
                            }
                            p !== null ? (p.return = h, j = p) : wg(f)
                        }
                        c = c.sibling
                    }
                e: for (c = null, f = e;;) {
                    if (f.tag === 5) {
                        if (c === null) {
                            c = f;
                            try {
                                i = f.stateNode, l ? (o = i.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (a = f.stateNode, u = f.memoizedProps.style, s = u != null && u.hasOwnProperty("display") ? u.display : null, a.style.display = R1("display", s))
                            } catch (m) {
                                ke(e, e.return, m)
                            }
                        }
                    } else if (f.tag === 6) {
                        if (c === null) try {
                            f.stateNode.nodeValue = l ? "" : f.memoizedProps
                        } catch (m) {
                            ke(e, e.return, m)
                        }
                    } else if ((f.tag !== 22 && f.tag !== 23 || f.memoizedState === null || f === e) && f.child !== null) {
                        f.child.return = f, f = f.child;
                        continue
                    }
                    if (f === e) break e;
                    for (; f.sibling === null;) {
                        if (f.return === null || f.return === e) break e;
                        c === f && (c = null), f = f.return
                    }
                    c === f && (c = null), f.sibling.return = f.return, f = f.sibling
                }
            }
            break;
        case 19:
            wn(t, e), Ln(e), r & 4 && Eg(e);
            break;
        case 21:
            break;
        default:
            wn(t, e), Ln(e)
    }
}

function Ln(e) {
    var t = e.flags;
    if (t & 2) {
        try {
            e: {
                for (var n = e.return; n !== null;) {
                    if (nS(n)) {
                        var r = n;
                        break e
                    }
                    n = n.return
                }
                throw Error(A(160))
            }
            switch (r.tag) {
                case 5:
                    var i = r.stateNode;
                    r.flags & 32 && (Ia(i, ""), r.flags &= -33);
                    var o = _g(e);
                    Ld(e, o, i);
                    break;
                case 3:
                case 4:
                    var s = r.stateNode.containerInfo,
                        a = _g(e);
                    Id(e, a, s);
                    break;
                default:
                    throw Error(A(161))
            }
        }
        catch (u) {
            ke(e, e.return, u)
        }
        e.flags &= -3
    }
    t & 4096 && (e.flags &= -4097)
}

function eP(e, t, n) {
    j = e, oS(e)
}

function oS(e, t, n) {
    for (var r = (e.mode & 1) !== 0; j !== null;) {
        var i = j,
            o = i.child;
        if (i.tag === 22 && r) {
            var s = i.memoizedState !== null || Yu;
            if (!s) {
                var a = i.alternate,
                    u = a !== null && a.memoizedState !== null || tt;
                a = Yu;
                var l = tt;
                if (Yu = s, (tt = u) && !l)
                    for (j = i; j !== null;) s = j, u = s.child, s.tag === 22 && s.memoizedState !== null ? xg(i) : u !== null ? (u.return = s, j = u) : xg(i);
                for (; o !== null;) j = o, oS(o), o = o.sibling;
                j = i, Yu = a, tt = l
            }
            Sg(e)
        } else i.subtreeFlags & 8772 && o !== null ? (o.return = i, j = o) : Sg(e)
    }
}

function Sg(e) {
    for (; j !== null;) {
        var t = j;
        if (t.flags & 8772) {
            var n = t.alternate;
            try {
                if (t.flags & 8772) switch (t.tag) {
                    case 0:
                    case 11:
                    case 15:
                        tt || Nc(5, t);
                        break;
                    case 1:
                        var r = t.stateNode;
                        if (t.flags & 4 && !tt)
                            if (n === null) r.componentDidMount();
                            else {
                                var i = t.elementType === t.type ? n.memoizedProps : xn(t.type, n.memoizedProps);
                                r.componentDidUpdate(i, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate)
                            }
                        var o = t.updateQueue;
                        o !== null && ig(t, o, r);
                        break;
                    case 3:
                        var s = t.updateQueue;
                        if (s !== null) {
                            if (n = null, t.child !== null) switch (t.child.tag) {
                                case 5:
                                    n = t.child.stateNode;
                                    break;
                                case 1:
                                    n = t.child.stateNode
                            }
                            ig(t, s, n)
                        }
                        break;
                    case 5:
                        var a = t.stateNode;
                        if (n === null && t.flags & 4) {
                            n = a;
                            var u = t.memoizedProps;
                            switch (t.type) {
                                case "button":
                                case "input":
                                case "select":
                                case "textarea":
                                    u.autoFocus && n.focus();
                                    break;
                                case "img":
                                    u.src && (n.src = u.src)
                            }
                        }
                        break;
                    case 6:
                        break;
                    case 4:
                        break;
                    case 12:
                        break;
                    case 13:
                        if (t.memoizedState === null) {
                            var l = t.alternate;
                            if (l !== null) {
                                var c = l.memoizedState;
                                if (c !== null) {
                                    var f = c.dehydrated;
                                    f !== null && Da(f)
                                }
                            }
                        }
                        break;
                    case 19:
                    case 17:
                    case 21:
                    case 22:
                    case 23:
                    case 25:
                        break;
                    default:
                        throw Error(A(163))
                }
                tt || t.flags & 512 && Md(t)
            } catch (h) {
                ke(t, t.return, h)
            }
        }
        if (t === e) {
            j = null;
            break
        }
        if (n = t.sibling, n !== null) {
            n.return = t.return, j = n;
            break
        }
        j = t.return
    }
}

function wg(e) {
    for (; j !== null;) {
        var t = j;
        if (t === e) {
            j = null;
            break
        }
        var n = t.sibling;
        if (n !== null) {
            n.return = t.return, j = n;
            break
        }
        j = t.return
    }
}

function xg(e) {
    for (; j !== null;) {
        var t = j;
        try {
            switch (t.tag) {
                case 0:
                case 11:
                case 15:
                    var n = t.return;
                    try {
                        Nc(4, t)
                    } catch (u) {
                        ke(t, n, u)
                    }
                    break;
                case 1:
                    var r = t.stateNode;
                    if (typeof r.componentDidMount == "function") {
                        var i = t.return;
                        try {
                            r.componentDidMount()
                        } catch (u) {
                            ke(t, i, u)
                        }
                    }
                    var o = t.return;
                    try {
                        Md(t)
                    } catch (u) {
                        ke(t, o, u)
                    }
                    break;
                case 5:
                    var s = t.return;
                    try {
                        Md(t)
                    } catch (u) {
                        ke(t, s, u)
                    }
            }
        } catch (u) {
            ke(t, t.return, u)
        }
        if (t === e) {
            j = null;
            break
        }
        var a = t.sibling;
        if (a !== null) {
            a.return = t.return, j = a;
            break
        }
        j = t.return
    }
}
var tP = Math.ceil,
    tc = Er.ReactCurrentDispatcher,
    Cm = Er.ReactCurrentOwner,
    pn = Er.ReactCurrentBatchConfig,
    ie = 0,
    Ge = null,
    De = null,
    Ye = 0,
    Bt = 0,
    $o = pi(0),
    Be = 0,
    qa = null,
    Yi = 0,
    Dc = 0,
    Rm = 0,
    Oa = null,
    wt = null,
    km = 0,
    Es = 1 / 0,
    nr = null,
    nc = !1,
    Ad = null,
    ei = null,
    Zu = !1,
    Vr = null,
    rc = 0,
    ba = 0,
    Nd = null,
    xl = -1,
    Tl = 0;

function mt() {
    return ie & 6 ? Ae() : xl !== -1 ? xl : xl = Ae()
}

function ti(e) {
    return e.mode & 1 ? ie & 2 && Ye !== 0 ? Ye & -Ye : $b.transition !== null ? (Tl === 0 && (Tl = U1()), Tl) : (e = ue, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Q1(e.type)), e) : 1
}

function kn(e, t, n, r) {
    if (50 < ba) throw ba = 0, Nd = null, Error(A(185));
    _u(e, n, r), (!(ie & 2) || e !== Ge) && (e === Ge && (!(ie & 2) && (Dc |= n), Be === 4 && Nr(e, Ye)), Ct(e, r), n === 1 && ie === 0 && !(t.mode & 1) && (Es = Ae() + 500, Ic && mi()))
}

function Ct(e, t) {
    var n = e.callbackNode;
    $O(e, t);
    var r = jl(e, e === Ge ? Ye : 0);
    if (r === 0) n !== null && Iv(n), e.callbackNode = null, e.callbackPriority = 0;
    else if (t = r & -r, e.callbackPriority !== t) {
        if (n != null && Iv(n), t === 1) e.tag === 0 ? Fb(Tg.bind(null, e)) : pE(Tg.bind(null, e)), Lb(function() {
            !(ie & 6) && mi()
        }), n = null;
        else {
            switch (z1(r)) {
                case 1:
                    n = nm;
                    break;
                case 4:
                    n = j1;
                    break;
                case 16:
                    n = Bl;
                    break;
                case 536870912:
                    n = H1;
                    break;
                default:
                    n = Bl
            }
            n = dS(n, sS.bind(null, e))
        }
        e.callbackPriority = t, e.callbackNode = n
    }
}

function sS(e, t) {
    if (xl = -1, Tl = 0, ie & 6) throw Error(A(327));
    var n = e.callbackNode;
    if (qo() && e.callbackNode !== n) return null;
    var r = jl(e, e === Ge ? Ye : 0);
    if (r === 0) return null;
    if (r & 30 || r & e.expiredLanes || t) t = ic(e, r);
    else {
        t = r;
        var i = ie;
        ie |= 2;
        var o = uS();
        (Ge !== e || Ye !== t) && (nr = null, Es = Ae() + 500, ji(e, t));
        do try {
            iP();
            break
        } catch (a) {
            aS(e, a)
        }
        while (!0);
        mm(), tc.current = o, ie = i, De !== null ? t = 0 : (Ge = null, Ye = 0, t = Be)
    }
    if (t !== 0) {
        if (t === 2 && (i = ud(e), i !== 0 && (r = i, t = Dd(e, i))), t === 1) throw n = qa, ji(e, 0), Nr(e, r), Ct(e, Ae()), n;
        if (t === 6) Nr(e, r);
        else {
            if (i = e.current.alternate, !(r & 30) && !nP(i) && (t = ic(e, r), t === 2 && (o = ud(e), o !== 0 && (r = o, t = Dd(e, o))), t === 1)) throw n = qa, ji(e, 0), Nr(e, r), Ct(e, Ae()), n;
            switch (e.finishedWork = i, e.finishedLanes = r, t) {
                case 0:
                case 1:
                    throw Error(A(345));
                case 2:
                    xi(e, wt, nr);
                    break;
                case 3:
                    if (Nr(e, r), (r & 130023424) === r && (t = km + 500 - Ae(), 10 < t)) {
                        if (jl(e, 0) !== 0) break;
                        if (i = e.suspendedLanes, (i & r) !== r) {
                            mt(), e.pingedLanes |= e.suspendedLanes & i;
                            break
                        }
                        e.timeoutHandle = vd(xi.bind(null, e, wt, nr), t);
                        break
                    }
                    xi(e, wt, nr);
                    break;
                case 4:
                    if (Nr(e, r), (r & 4194240) === r) break;
                    for (t = e.eventTimes, i = -1; 0 < r;) {
                        var s = 31 - Rn(r);
                        o = 1 << s, s = t[s], s > i && (i = s), r &= ~o
                    }
                    if (r = i, r = Ae() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * tP(r / 1960)) - r, 10 < r) {
                        e.timeoutHandle = vd(xi.bind(null, e, wt, nr), r);
                        break
                    }
                    xi(e, wt, nr);
                    break;
                case 5:
                    xi(e, wt, nr);
                    break;
                default:
                    throw Error(A(329))
            }
        }
    }
    return Ct(e, Ae()), e.callbackNode === n ? sS.bind(null, e) : null
}

function Dd(e, t) {
    var n = Oa;
    return e.current.memoizedState.isDehydrated && (ji(e, t).flags |= 256), e = ic(e, t), e !== 2 && (t = wt, wt = n, t !== null && Fd(t)), e
}

function Fd(e) {
    wt === null ? wt = e : wt.push.apply(wt, e)
}

function nP(e) {
    for (var t = e;;) {
        if (t.flags & 16384) {
            var n = t.updateQueue;
            if (n !== null && (n = n.stores, n !== null))
                for (var r = 0; r < n.length; r++) {
                    var i = n[r],
                        o = i.getSnapshot;
                    i = i.value;
                    try {
                        if (!In(o(), i)) return !1
                    } catch {
                        return !1
                    }
                }
        }
        if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
        else {
            if (t === e) break;
            for (; t.sibling === null;) {
                if (t.return === null || t.return === e) return !0;
                t = t.return
            }
            t.sibling.return = t.return, t = t.sibling
        }
    }
    return !0
}

function Nr(e, t) {
    for (t &= ~Rm, t &= ~Dc, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t;) {
        var n = 31 - Rn(t),
            r = 1 << n;
        e[n] = -1, t &= ~r
    }
}

function Tg(e) {
    if (ie & 6) throw Error(A(327));
    qo();
    var t = jl(e, 0);
    if (!(t & 1)) return Ct(e, Ae()), null;
    var n = ic(e, t);
    if (e.tag !== 0 && n === 2) {
        var r = ud(e);
        r !== 0 && (t = r, n = Dd(e, r))
    }
    if (n === 1) throw n = qa, ji(e, 0), Nr(e, t), Ct(e, Ae()), n;
    if (n === 6) throw Error(A(345));
    return e.finishedWork = e.current.alternate, e.finishedLanes = t, xi(e, wt, nr), Ct(e, Ae()), null
}

function Mm(e, t) {
    var n = ie;
    ie |= 1;
    try {
        return e(t)
    } finally {
        ie = n, ie === 0 && (Es = Ae() + 500, Ic && mi())
    }
}

function Zi(e) {
    Vr !== null && Vr.tag === 0 && !(ie & 6) && qo();
    var t = ie;
    ie |= 1;
    var n = pn.transition,
        r = ue;
    try {
        if (pn.transition = null, ue = 1, e) return e()
    } finally {
        ue = r, pn.transition = n, ie = t, !(ie & 6) && mi()
    }
}

function Im() {
    Bt = $o.current, _e($o)
}

function ji(e, t) {
    e.finishedWork = null, e.finishedLanes = 0;
    var n = e.timeoutHandle;
    if (n !== -1 && (e.timeoutHandle = -1, Ib(n)), De !== null)
        for (n = De.return; n !== null;) {
            var r = n;
            switch (hm(r), r.tag) {
                case 1:
                    r = r.type.childContextTypes, r != null && Vl();
                    break;
                case 3:
                    ys(), _e(bt), _e(st), Sm();
                    break;
                case 5:
                    Em(r);
                    break;
                case 4:
                    ys();
                    break;
                case 13:
                    _e(Te);
                    break;
                case 19:
                    _e(Te);
                    break;
                case 10:
                    vm(r.type._context);
                    break;
                case 22:
                case 23:
                    Im()
            }
            n = n.return
        }
    if (Ge = e, De = e = ni(e.current, null), Ye = Bt = t, Be = 0, qa = null, Rm = Dc = Yi = 0, wt = Oa = null, Ci !== null) {
        for (t = 0; t < Ci.length; t++)
            if (n = Ci[t], r = n.interleaved, r !== null) {
                n.interleaved = null;
                var i = r.next,
                    o = n.pending;
                if (o !== null) {
                    var s = o.next;
                    o.next = i, r.next = s
                }
                n.pending = r
            }
        Ci = null
    }
    return e
}

function aS(e, t) {
    do {
        var n = De;
        try {
            if (mm(), El.current = ec, Jl) {
                for (var r = Pe.memoizedState; r !== null;) {
                    var i = r.queue;
                    i !== null && (i.pending = null), r = r.next
                }
                Jl = !1
            }
            if (Ki = 0, Ue = Fe = Pe = null, xa = !1, Ga = 0, Cm.current = null, n === null || n.return === null) {
                Be = 1, qa = t, De = null;
                break
            }
            e: {
                var o = e,
                    s = n.return,
                    a = n,
                    u = t;
                if (t = Ye, a.flags |= 32768, u !== null && typeof u == "object" && typeof u.then == "function") {
                    var l = u,
                        c = a,
                        f = c.tag;
                    if (!(c.mode & 1) && (f === 0 || f === 11 || f === 15)) {
                        var h = c.alternate;
                        h ? (c.updateQueue = h.updateQueue, c.memoizedState = h.memoizedState, c.lanes = h.lanes) : (c.updateQueue = null, c.memoizedState = null)
                    }
                    var p = fg(s);
                    if (p !== null) {
                        p.flags &= -257, hg(p, s, a, o, t), p.mode & 1 && cg(o, l, t), t = p, u = l;
                        var y = t.updateQueue;
                        if (y === null) {
                            var m = new Set;
                            m.add(u), t.updateQueue = m
                        } else y.add(u);
                        break e
                    } else {
                        if (!(t & 1)) {
                            cg(o, l, t), Lm();
                            break e
                        }
                        u = Error(A(426))
                    }
                } else if (we && a.mode & 1) {
                    var _ = fg(s);
                    if (_ !== null) {
                        !(_.flags & 65536) && (_.flags |= 256), hg(_, s, a, o, t), dm(_s(u, a));
                        break e
                    }
                }
                o = u = _s(u, a),
                Be !== 4 && (Be = 2),
                Oa === null ? Oa = [o] : Oa.push(o),
                o = s;do {
                    switch (o.tag) {
                        case 3:
                            o.flags |= 65536, t &= -t, o.lanes |= t;
                            var g = GE(o, u, t);
                            rg(o, g);
                            break e;
                        case 1:
                            a = u;
                            var d = o.type,
                                v = o.stateNode;
                            if (!(o.flags & 128) && (typeof d.getDerivedStateFromError == "function" || v !== null && typeof v.componentDidCatch == "function" && (ei === null || !ei.has(v)))) {
                                o.flags |= 65536, t &= -t, o.lanes |= t;
                                var E = VE(o, a, t);
                                rg(o, E);
                                break e
                            }
                    }
                    o = o.return
                } while (o !== null)
            }
            cS(n)
        } catch (S) {
            t = S, De === n && n !== null && (De = n = n.return);
            continue
        }
        break
    } while (!0)
}

function uS() {
    var e = tc.current;
    return tc.current = ec, e === null ? ec : e
}

function Lm() {
    (Be === 0 || Be === 3 || Be === 2) && (Be = 4), Ge === null || !(Yi & 268435455) && !(Dc & 268435455) || Nr(Ge, Ye)
}

function ic(e, t) {
    var n = ie;
    ie |= 2;
    var r = uS();
    (Ge !== e || Ye !== t) && (nr = null, ji(e, t));
    do try {
        rP();
        break
    } catch (i) {
        aS(e, i)
    }
    while (!0);
    if (mm(), ie = n, tc.current = r, De !== null) throw Error(A(261));
    return Ge = null, Ye = 0, Be
}

function rP() {
    for (; De !== null;) lS(De)
}

function iP() {
    for (; De !== null && !RO();) lS(De)
}

function lS(e) {
    var t = hS(e.alternate, e, Bt);
    e.memoizedProps = e.pendingProps, t === null ? cS(e) : De = t, Cm.current = null
}

function cS(e) {
    var t = e;
    do {
        var n = t.alternate;
        if (e = t.return, t.flags & 32768) {
            if (n = Yb(n, t), n !== null) {
                n.flags &= 32767, De = n;
                return
            }
            if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
            else {
                Be = 6, De = null;
                return
            }
        } else if (n = Kb(n, t, Bt), n !== null) {
            De = n;
            return
        }
        if (t = t.sibling, t !== null) {
            De = t;
            return
        }
        De = t = e
    } while (t !== null);
    Be === 0 && (Be = 5)
}

function xi(e, t, n) {
    var r = ue,
        i = pn.transition;
    try {
        pn.transition = null, ue = 1, oP(e, t, n, r)
    } finally {
        pn.transition = i, ue = r
    }
    return null
}

function oP(e, t, n, r) {
    do qo(); while (Vr !== null);
    if (ie & 6) throw Error(A(327));
    n = e.finishedWork;
    var i = e.finishedLanes;
    if (n === null) return null;
    if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(A(177));
    e.callbackNode = null, e.callbackPriority = 0;
    var o = n.lanes | n.childLanes;
    if (BO(e, o), e === Ge && (De = Ge = null, Ye = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Zu || (Zu = !0, dS(Bl, function() {
            return qo(), null
        })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
        o = pn.transition, pn.transition = null;
        var s = ue;
        ue = 1;
        var a = ie;
        ie |= 4, Cm.current = null, Jb(e, n), iS(n, e), Ob(pd), Hl = !!dd, pd = dd = null, e.current = n, eP(n), kO(), ie = a, ue = s, pn.transition = o
    } else e.current = n;
    if (Zu && (Zu = !1, Vr = e, rc = i), o = e.pendingLanes, o === 0 && (ei = null), LO(n.stateNode), Ct(e, Ae()), t !== null)
        for (r = e.onRecoverableError, n = 0; n < t.length; n++) i = t[n], r(i.value, {
            componentStack: i.stack,
            digest: i.digest
        });
    if (nc) throw nc = !1, e = Ad, Ad = null, e;
    return rc & 1 && e.tag !== 0 && qo(), o = e.pendingLanes, o & 1 ? e === Nd ? ba++ : (ba = 0, Nd = e) : ba = 0, mi(), null
}

function qo() {
    if (Vr !== null) {
        var e = z1(rc),
            t = pn.transition,
            n = ue;
        try {
            if (pn.transition = null, ue = 16 > e ? 16 : e, Vr === null) var r = !1;
            else {
                if (e = Vr, Vr = null, rc = 0, ie & 6) throw Error(A(331));
                var i = ie;
                for (ie |= 4, j = e.current; j !== null;) {
                    var o = j,
                        s = o.child;
                    if (j.flags & 16) {
                        var a = o.deletions;
                        if (a !== null) {
                            for (var u = 0; u < a.length; u++) {
                                var l = a[u];
                                for (j = l; j !== null;) {
                                    var c = j;
                                    switch (c.tag) {
                                        case 0:
                                        case 11:
                                        case 15:
                                            Ta(8, c, o)
                                    }
                                    var f = c.child;
                                    if (f !== null) f.return = c, j = f;
                                    else
                                        for (; j !== null;) {
                                            c = j;
                                            var h = c.sibling,
                                                p = c.return;
                                            if (tS(c), c === l) {
                                                j = null;
                                                break
                                            }
                                            if (h !== null) {
                                                h.return = p, j = h;
                                                break
                                            }
                                            j = p
                                        }
                                }
                            }
                            var y = o.alternate;
                            if (y !== null) {
                                var m = y.child;
                                if (m !== null) {
                                    y.child = null;
                                    do {
                                        var _ = m.sibling;
                                        m.sibling = null, m = _
                                    } while (m !== null)
                                }
                            }
                            j = o
                        }
                    }
                    if (o.subtreeFlags & 2064 && s !== null) s.return = o, j = s;
                    else e: for (; j !== null;) {
                        if (o = j, o.flags & 2048) switch (o.tag) {
                            case 0:
                            case 11:
                            case 15:
                                Ta(9, o, o.return)
                        }
                        var g = o.sibling;
                        if (g !== null) {
                            g.return = o.return, j = g;
                            break e
                        }
                        j = o.return
                    }
                }
                var d = e.current;
                for (j = d; j !== null;) {
                    s = j;
                    var v = s.child;
                    if (s.subtreeFlags & 2064 && v !== null) v.return = s, j = v;
                    else e: for (s = d; j !== null;) {
                        if (a = j, a.flags & 2048) try {
                            switch (a.tag) {
                                case 0:
                                case 11:
                                case 15:
                                    Nc(9, a)
                            }
                        } catch (S) {
                            ke(a, a.return, S)
                        }
                        if (a === s) {
                            j = null;
                            break e
                        }
                        var E = a.sibling;
                        if (E !== null) {
                            E.return = a.return, j = E;
                            break e
                        }
                        j = a.return
                    }
                }
                if (ie = i, mi(), Kn && typeof Kn.onPostCommitFiberRoot == "function") try {
                    Kn.onPostCommitFiberRoot(Pc, e)
                } catch {}
                r = !0
            }
            return r
        } finally {
            ue = n, pn.transition = t
        }
    }
    return !1
}

function Og(e, t, n) {
    t = _s(n, t), t = GE(e, t, 1), e = Jr(e, t, 1), t = mt(), e !== null && (_u(e, 1, t), Ct(e, t))
}

function ke(e, t, n) {
    if (e.tag === 3) Og(e, e, n);
    else
        for (; t !== null;) {
            if (t.tag === 3) {
                Og(t, e, n);
                break
            } else if (t.tag === 1) {
                var r = t.stateNode;
                if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (ei === null || !ei.has(r))) {
                    e = _s(n, e), e = VE(t, e, 1), t = Jr(t, e, 1), e = mt(), t !== null && (_u(t, 1, e), Ct(t, e));
                    break
                }
            }
            t = t.return
        }
}

function sP(e, t, n) {
    var r = e.pingCache;
    r !== null && r.delete(t), t = mt(), e.pingedLanes |= e.suspendedLanes & n, Ge === e && (Ye & n) === n && (Be === 4 || Be === 3 && (Ye & 130023424) === Ye && 500 > Ae() - km ? ji(e, 0) : Rm |= n), Ct(e, t)
}

function fS(e, t) {
    t === 0 && (e.mode & 1 ? (t = Uu, Uu <<= 1, !(Uu & 130023424) && (Uu = 4194304)) : t = 1);
    var n = mt();
    e = vr(e, t), e !== null && (_u(e, t, n), Ct(e, n))
}

function aP(e) {
    var t = e.memoizedState,
        n = 0;
    t !== null && (n = t.retryLane), fS(e, n)
}

function uP(e, t) {
    var n = 0;
    switch (e.tag) {
        case 13:
            var r = e.stateNode,
                i = e.memoizedState;
            i !== null && (n = i.retryLane);
            break;
        case 19:
            r = e.stateNode;
            break;
        default:
            throw Error(A(314))
    }
    r !== null && r.delete(t), fS(e, n)
}
var hS;
hS = function(e, t, n) {
    if (e !== null)
        if (e.memoizedProps !== t.pendingProps || bt.current) Ot = !0;
        else {
            if (!(e.lanes & n) && !(t.flags & 128)) return Ot = !1, Qb(e, t, n);
            Ot = !!(e.flags & 131072)
        }
    else Ot = !1, we && t.flags & 1048576 && mE(t, Xl, t.index);
    switch (t.lanes = 0, t.tag) {
        case 2:
            var r = t.type;
            wl(e, t), e = t.pendingProps;
            var i = ms(t, st.current);
            Wo(t, n), i = xm(null, t, r, e, i, n);
            var o = Tm();
            return t.flags |= 1, typeof i == "object" && i !== null && typeof i.render == "function" && i.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Pt(r) ? (o = !0, Wl(t)) : o = !1, t.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null, ym(t), i.updater = Lc, t.stateNode = i, i._reactInternals = t, xd(t, r, e, n), t = bd(null, t, r, !0, o, n)) : (t.tag = 0, we && o && fm(t), dt(null, t, i, n), t = t.child), t;
        case 16:
            r = t.elementType;
            e: {
                switch (wl(e, t), e = t.pendingProps, i = r._init, r = i(r._payload), t.type = r, i = t.tag = cP(r), e = xn(r, e), i) {
                    case 0:
                        t = Od(null, t, r, e, n);
                        break e;
                    case 1:
                        t = mg(null, t, r, e, n);
                        break e;
                    case 11:
                        t = dg(null, t, r, e, n);
                        break e;
                    case 14:
                        t = pg(null, t, r, xn(r.type, e), n);
                        break e
                }
                throw Error(A(306, r, ""))
            }
            return t;
        case 0:
            return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : xn(r, i), Od(e, t, r, i, n);
        case 1:
            return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : xn(r, i), mg(e, t, r, i, n);
        case 3:
            e: {
                if (QE(t), e === null) throw Error(A(387));r = t.pendingProps,
                o = t.memoizedState,
                i = o.element,
                _E(e, t),
                Yl(t, r, null, n);
                var s = t.memoizedState;
                if (r = s.element, o.isDehydrated)
                    if (o = {
                            element: r,
                            isDehydrated: !1,
                            cache: s.cache,
                            pendingSuspenseBoundaries: s.pendingSuspenseBoundaries,
                            transitions: s.transitions
                        }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
                        i = _s(Error(A(423)), t), t = vg(e, t, r, n, i);
                        break e
                    } else if (r !== i) {
                    i = _s(Error(A(424)), t), t = vg(e, t, r, n, i);
                    break e
                } else
                    for (Vt = Zr(t.stateNode.containerInfo.firstChild), qt = t, we = !0, Pn = null, n = xE(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
                else {
                    if (vs(), r === i) {
                        t = gr(e, t, n);
                        break e
                    }
                    dt(e, t, r, n)
                }
                t = t.child
            }
            return t;
        case 5:
            return TE(t), e === null && Ed(t), r = t.type, i = t.pendingProps, o = e !== null ? e.memoizedProps : null, s = i.children, md(r, i) ? s = null : o !== null && md(r, o) && (t.flags |= 32), XE(e, t), dt(e, t, s, n), t.child;
        case 6:
            return e === null && Ed(t), null;
        case 13:
            return KE(e, t, n);
        case 4:
            return _m(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = gs(t, null, r, n) : dt(e, t, r, n), t.child;
        case 11:
            return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : xn(r, i), dg(e, t, r, i, n);
        case 7:
            return dt(e, t, t.pendingProps, n), t.child;
        case 8:
            return dt(e, t, t.pendingProps.children, n), t.child;
        case 12:
            return dt(e, t, t.pendingProps.children, n), t.child;
        case 10:
            e: {
                if (r = t.type._context, i = t.pendingProps, o = t.memoizedProps, s = i.value, pe(Ql, r._currentValue), r._currentValue = s, o !== null)
                    if (In(o.value, s)) {
                        if (o.children === i.children && !bt.current) {
                            t = gr(e, t, n);
                            break e
                        }
                    } else
                        for (o = t.child, o !== null && (o.return = t); o !== null;) {
                            var a = o.dependencies;
                            if (a !== null) {
                                s = o.child;
                                for (var u = a.firstContext; u !== null;) {
                                    if (u.context === r) {
                                        if (o.tag === 1) {
                                            u = cr(-1, n & -n), u.tag = 2;
                                            var l = o.updateQueue;
                                            if (l !== null) {
                                                l = l.shared;
                                                var c = l.pending;
                                                c === null ? u.next = u : (u.next = c.next, c.next = u), l.pending = u
                                            }
                                        }
                                        o.lanes |= n, u = o.alternate, u !== null && (u.lanes |= n), Sd(o.return, n, t), a.lanes |= n;
                                        break
                                    }
                                    u = u.next
                                }
                            } else if (o.tag === 10) s = o.type === t.type ? null : o.child;
                            else if (o.tag === 18) {
                                if (s = o.return, s === null) throw Error(A(341));
                                s.lanes |= n, a = s.alternate, a !== null && (a.lanes |= n), Sd(s, n, t), s = o.sibling
                            } else s = o.child;
                            if (s !== null) s.return = o;
                            else
                                for (s = o; s !== null;) {
                                    if (s === t) {
                                        s = null;
                                        break
                                    }
                                    if (o = s.sibling, o !== null) {
                                        o.return = s.return, s = o;
                                        break
                                    }
                                    s = s.return
                                }
                            o = s
                        }
                dt(e, t, i.children, n),
                t = t.child
            }
            return t;
        case 9:
            return i = t.type, r = t.pendingProps.children, Wo(t, n), i = vn(i), r = r(i), t.flags |= 1, dt(e, t, r, n), t.child;
        case 14:
            return r = t.type, i = xn(r, t.pendingProps), i = xn(r.type, i), pg(e, t, r, i, n);
        case 15:
            return WE(e, t, t.type, t.pendingProps, n);
        case 17:
            return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : xn(r, i), wl(e, t), t.tag = 1, Pt(r) ? (e = !0, Wl(t)) : e = !1, Wo(t, n), SE(t, r, i), xd(t, r, i, n), bd(null, t, r, !0, e, n);
        case 19:
            return YE(e, t, n);
        case 22:
            return qE(e, t, n)
    }
    throw Error(A(156, t.tag))
};

function dS(e, t) {
    return B1(e, t)
}

function lP(e, t, n, r) {
    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null
}

function cn(e, t, n, r) {
    return new lP(e, t, n, r)
}

function Am(e) {
    return e = e.prototype, !(!e || !e.isReactComponent)
}

function cP(e) {
    if (typeof e == "function") return Am(e) ? 1 : 0;
    if (e != null) {
        if (e = e.$$typeof, e === Jp) return 11;
        if (e === em) return 14
    }
    return 2
}

function ni(e, t) {
    var n = e.alternate;
    return n === null ? (n = cn(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
        lanes: t.lanes,
        firstContext: t.firstContext
    }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n
}

function Ol(e, t, n, r, i, o) {
    var s = 2;
    if (r = e, typeof e == "function") Am(e) && (s = 1);
    else if (typeof e == "string") s = 5;
    else e: switch (e) {
        case Co:
            return Hi(n.children, i, o, t);
        case Zp:
            s = 8, i |= 8;
            break;
        case qh:
            return e = cn(12, n, t, i | 2), e.elementType = qh, e.lanes = o, e;
        case Xh:
            return e = cn(13, n, t, i), e.elementType = Xh, e.lanes = o, e;
        case Qh:
            return e = cn(19, n, t, i), e.elementType = Qh, e.lanes = o, e;
        case w1:
            return Fc(n, i, o, t);
        default:
            if (typeof e == "object" && e !== null) switch (e.$$typeof) {
                case E1:
                    s = 10;
                    break e;
                case S1:
                    s = 9;
                    break e;
                case Jp:
                    s = 11;
                    break e;
                case em:
                    s = 14;
                    break e;
                case Mr:
                    s = 16, r = null;
                    break e
            }
            throw Error(A(130, e == null ? e : typeof e, ""))
    }
    return t = cn(s, n, t, i), t.elementType = e, t.type = r, t.lanes = o, t
}

function Hi(e, t, n, r) {
    return e = cn(7, e, r, t), e.lanes = n, e
}

function Fc(e, t, n, r) {
    return e = cn(22, e, r, t), e.elementType = w1, e.lanes = n, e.stateNode = {
        isHidden: !1
    }, e
}

function Zf(e, t, n) {
    return e = cn(6, e, null, t), e.lanes = n, e
}

function Jf(e, t, n) {
    return t = cn(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation
    }, t
}

function fP(e, t, n, r, i) {
    this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Lf(0), this.expirationTimes = Lf(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Lf(0), this.identifierPrefix = r, this.onRecoverableError = i, this.mutableSourceEagerHydrationData = null
}

function Nm(e, t, n, r, i, o, s, a, u) {
    return e = new fP(e, t, n, a, u), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = cn(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = {
        element: r,
        isDehydrated: n,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null
    }, ym(o), e
}

function hP(e, t, n) {
    var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
        $$typeof: Po,
        key: r == null ? null : "" + r,
        children: e,
        containerInfo: t,
        implementation: n
    }
}

function pS(e) {
    if (!e) return ui;
    e = e._reactInternals;
    e: {
        if (uo(e) !== e || e.tag !== 1) throw Error(A(170));
        var t = e;do {
            switch (t.tag) {
                case 3:
                    t = t.stateNode.context;
                    break e;
                case 1:
                    if (Pt(t.type)) {
                        t = t.stateNode.__reactInternalMemoizedMergedChildContext;
                        break e
                    }
            }
            t = t.return
        } while (t !== null);
        throw Error(A(171))
    }
    if (e.tag === 1) {
        var n = e.type;
        if (Pt(n)) return dE(e, n, t)
    }
    return t
}

function mS(e, t, n, r, i, o, s, a, u) {
    return e = Nm(n, r, !0, e, i, o, s, a, u), e.context = pS(null), n = e.current, r = mt(), i = ti(n), o = cr(r, i), o.callback = t ? ? null, Jr(n, o, i), e.current.lanes = i, _u(e, i, r), Ct(e, r), e
}

function $c(e, t, n, r) {
    var i = t.current,
        o = mt(),
        s = ti(i);
    return n = pS(n), t.context === null ? t.context = n : t.pendingContext = n, t = cr(o, s), t.payload = {
        element: e
    }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = Jr(i, t, s), e !== null && (kn(e, i, s, o), _l(e, i, s)), s
}

function oc(e) {
    if (e = e.current, !e.child) return null;
    switch (e.child.tag) {
        case 5:
            return e.child.stateNode;
        default:
            return e.child.stateNode
    }
}

function bg(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
        var n = e.retryLane;
        e.retryLane = n !== 0 && n < t ? n : t
    }
}

function Dm(e, t) {
    bg(e, t), (e = e.alternate) && bg(e, t)
}

function dP() {
    return null
}
var vS = typeof reportError == "function" ? reportError : function(e) {
    console.error(e)
};

function Fm(e) {
    this._internalRoot = e
}
Bc.prototype.render = Fm.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(A(409));
    $c(e, t, null, null)
};
Bc.prototype.unmount = Fm.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        Zi(function() {
            $c(null, e, null, null)
        }), t[mr] = null
    }
};

function Bc(e) {
    this._internalRoot = e
}
Bc.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
        var t = W1();
        e = {
            blockedOn: null,
            target: e,
            priority: t
        };
        for (var n = 0; n < Ar.length && t !== 0 && t < Ar[n].priority; n++);
        Ar.splice(n, 0, e), n === 0 && X1(e)
    }
};

function $m(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
}

function jc(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
}

function Pg() {}

function pP(e, t, n, r, i) {
    if (i) {
        if (typeof r == "function") {
            var o = r;
            r = function() {
                var l = oc(s);
                o.call(l)
            }
        }
        var s = mS(t, r, e, 0, null, !1, !1, "", Pg);
        return e._reactRootContainer = s, e[mr] = s.current, Ba(e.nodeType === 8 ? e.parentNode : e), Zi(), s
    }
    for (; i = e.lastChild;) e.removeChild(i);
    if (typeof r == "function") {
        var a = r;
        r = function() {
            var l = oc(u);
            a.call(l)
        }
    }
    var u = Nm(e, 0, !1, null, null, !1, !1, "", Pg);
    return e._reactRootContainer = u, e[mr] = u.current, Ba(e.nodeType === 8 ? e.parentNode : e), Zi(function() {
        $c(t, u, n, r)
    }), u
}

function Hc(e, t, n, r, i) {
    var o = n._reactRootContainer;
    if (o) {
        var s = o;
        if (typeof i == "function") {
            var a = i;
            i = function() {
                var u = oc(s);
                a.call(u)
            }
        }
        $c(t, s, e, i)
    } else s = pP(n, t, e, i, r);
    return oc(s)
}
G1 = function(e) {
    switch (e.tag) {
        case 3:
            var t = e.stateNode;
            if (t.current.memoizedState.isDehydrated) {
                var n = ca(t.pendingLanes);
                n !== 0 && (rm(t, n | 1), Ct(t, Ae()), !(ie & 6) && (Es = Ae() + 500, mi()))
            }
            break;
        case 13:
            Zi(function() {
                var r = vr(e, 1);
                if (r !== null) {
                    var i = mt();
                    kn(r, e, 1, i)
                }
            }), Dm(e, 1)
    }
};
im = function(e) {
    if (e.tag === 13) {
        var t = vr(e, 134217728);
        if (t !== null) {
            var n = mt();
            kn(t, e, 134217728, n)
        }
        Dm(e, 134217728)
    }
};
V1 = function(e) {
    if (e.tag === 13) {
        var t = ti(e),
            n = vr(e, t);
        if (n !== null) {
            var r = mt();
            kn(n, e, t, r)
        }
        Dm(e, t)
    }
};
W1 = function() {
    return ue
};
q1 = function(e, t) {
    var n = ue;
    try {
        return ue = e, t()
    } finally {
        ue = n
    }
};
od = function(e, t, n) {
    switch (t) {
        case "input":
            if (Zh(e, n), t = n.name, n.type === "radio" && t != null) {
                for (n = e; n.parentNode;) n = n.parentNode;
                for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
                    var r = n[t];
                    if (r !== e && r.form === e.form) {
                        var i = Mc(r);
                        if (!i) throw Error(A(90));
                        T1(r), Zh(r, i)
                    }
                }
            }
            break;
        case "textarea":
            b1(e, n);
            break;
        case "select":
            t = n.value, t != null && Uo(e, !!n.multiple, t, !1)
    }
};
L1 = Mm;
A1 = Zi;
var mP = {
        usingClientEntryPoint: !1,
        Events: [Su, Io, Mc, M1, I1, Mm]
    },
    na = {
        findFiberByHostInstance: Pi,
        bundleType: 0,
        version: "18.2.0",
        rendererPackageName: "react-dom"
    },
    vP = {
        bundleType: na.bundleType,
        version: na.version,
        rendererPackageName: na.rendererPackageName,
        rendererConfig: na.rendererConfig,
        overrideHookState: null,
        overrideHookStateDeletePath: null,
        overrideHookStateRenamePath: null,
        overrideProps: null,
        overridePropsDeletePath: null,
        overridePropsRenamePath: null,
        setErrorHandler: null,
        setSuspenseHandler: null,
        scheduleUpdate: null,
        currentDispatcherRef: Er.ReactCurrentDispatcher,
        findHostInstanceByFiber: function(e) {
            return e = F1(e), e === null ? null : e.stateNode
        },
        findFiberByHostInstance: na.findFiberByHostInstance || dP,
        findHostInstancesForRefresh: null,
        scheduleRefresh: null,
        scheduleRoot: null,
        setRefreshHandler: null,
        getCurrentFiber: null,
        reconcilerVersion: "18.2.0-next-9e3b772b8-20220608"
    };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Ju = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ju.isDisabled && Ju.supportsFiber) try {
        Pc = Ju.inject(vP), Kn = Ju
    } catch {}
}
Yt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = mP;
Yt.createPortal = function(e, t) {
    var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!$m(t)) throw Error(A(200));
    return hP(e, t, null, n)
};
Yt.createRoot = function(e, t) {
    if (!$m(e)) throw Error(A(299));
    var n = !1,
        r = "",
        i = vS;
    return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (i = t.onRecoverableError)), t = Nm(e, 1, !1, null, null, n, !1, r, i), e[mr] = t.current, Ba(e.nodeType === 8 ? e.parentNode : e), new Fm(t)
};
Yt.findDOMNode = function(e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var t = e._reactInternals;
    if (t === void 0) throw typeof e.render == "function" ? Error(A(188)) : (e = Object.keys(e).join(","), Error(A(268, e)));
    return e = F1(t), e = e === null ? null : e.stateNode, e
};
Yt.flushSync = function(e) {
    return Zi(e)
};
Yt.hydrate = function(e, t, n) {
    if (!jc(t)) throw Error(A(200));
    return Hc(null, e, t, !0, n)
};
Yt.hydrateRoot = function(e, t, n) {
    if (!$m(e)) throw Error(A(405));
    var r = n != null && n.hydratedSources || null,
        i = !1,
        o = "",
        s = vS;
    if (n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (s = n.onRecoverableError)), t = mS(t, null, e, 1, n ? ? null, i, !1, o, s), e[mr] = t.current, Ba(e), r)
        for (e = 0; e < r.length; e++) n = r[e], i = n._getVersion, i = i(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, i] : t.mutableSourceEagerHydrationData.push(n, i);
    return new Bc(t)
};
Yt.render = function(e, t, n) {
    if (!jc(t)) throw Error(A(200));
    return Hc(null, e, t, !1, n)
};
Yt.unmountComponentAtNode = function(e) {
    if (!jc(e)) throw Error(A(40));
    return e._reactRootContainer ? (Zi(function() {
        Hc(null, null, e, !1, function() {
            e._reactRootContainer = null, e[mr] = null
        })
    }), !0) : !1
};
Yt.unstable_batchedUpdates = Mm;
Yt.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
    if (!jc(n)) throw Error(A(200));
    if (e == null || e._reactInternals === void 0) throw Error(A(38));
    return Hc(e, t, n, !1, r)
};
Yt.version = "18.2.0-next-9e3b772b8-20220608";

function gS() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(gS)
    } catch (e) {
        console.error(e)
    }
}
gS(), m1.exports = Yt;
var Bm = m1.exports,
    gP, Cg = Bm;
gP = Cg.createRoot, Cg.hydrateRoot;
const Rg = "pushstate",
    kg = "popstate",
    yS = "beforeunload",
    _S = e => (e.preventDefault(), e.returnValue = ""),
    yP = () => {
        removeEventListener(yS, _S, {
            capture: !0
        })
    };

function ES(e) {
    let t = e.getLocation();
    const n = new Set;
    let r = [];
    const i = () => {
            t = e.getLocation(), n.forEach(s => s({
                location: t
            }))
        },
        o = async (s, a) => {
            var u;
            if (!((a == null ? void 0 : a.ignoreBlocker) ? ? !1) && typeof document < "u" && r.length) {
                for (const c of r)
                    if (!await c()) {
                        (u = e.onBlocked) == null || u.call(e, i);
                        return
                    }
            }
            s()
        };
    return {
        get location() {
            return t
        },
        get length() {
            return e.getLength()
        },
        subscribers: n,
        subscribe: s => (n.add(s), () => {
            n.delete(s)
        }),
        push: (s, a, u) => {
            a = Mg(a), o(() => {
                e.pushState(s, a), i()
            }, u)
        },
        replace: (s, a, u) => {
            a = Mg(a), o(() => {
                e.replaceState(s, a), i()
            }, u)
        },
        go: (s, a) => {
            o(() => {
                e.go(s), i()
            }, a)
        },
        back: s => {
            o(() => {
                e.back(), i()
            }, s)
        },
        forward: s => {
            o(() => {
                e.forward(), i()
            }, s)
        },
        createHref: s => e.createHref(s),
        block: s => (r.push(s), r.length === 1 && addEventListener(yS, _S, {
            capture: !0
        }), () => {
            r = r.filter(a => a !== s), r.length || yP()
        }),
        flush: () => {
            var s;
            return (s = e.flush) == null ? void 0 : s.call(e)
        },
        destroy: () => {
            var s;
            return (s = e.destroy) == null ? void 0 : s.call(e)
        },
        notify: i
    }
}

function Mg(e) {
    return e || (e = {}), { ...e,
        key: SP()
    }
}

function _P(e) {
    const t = (e == null ? void 0 : e.window) ? ? (typeof document < "u" ? window : void 0),
        n = t.history.pushState,
        r = t.history.replaceState,
        i = (e == null ? void 0 : e.createHref) ? ? (m => m),
        o = (e == null ? void 0 : e.parseLocation) ? ? (() => sc(`${t.location.pathname}${t.location.search}${t.location.hash}`, t.history.state));
    let s = o(),
        a;
    const u = () => s;
    let l, c;
    const f = () => {
            l && (y._ignoreSubscribers = !0, (l.isPush ? t.history.pushState : t.history.replaceState)(l.state, "", l.href), y._ignoreSubscribers = !1, l = void 0, c = void 0, a = void 0)
        },
        h = (m, _, g) => {
            const d = i(_);
            c || (a = s), s = sc(_, g), l = {
                href: d,
                state: g,
                isPush: (l == null ? void 0 : l.isPush) || m === "push"
            }, c || (c = Promise.resolve().then(() => f()))
        },
        p = () => {
            s = o(), y.notify()
        },
        y = ES({
            getLocation: u,
            getLength: () => t.history.length,
            pushState: (m, _) => h("push", m, _),
            replaceState: (m, _) => h("replace", m, _),
            back: () => t.history.back(),
            forward: () => t.history.forward(),
            go: m => t.history.go(m),
            createHref: m => i(m),
            flush: f,
            destroy: () => {
                t.history.pushState = n, t.history.replaceState = r, t.removeEventListener(Rg, p), t.removeEventListener(kg, p)
            },
            onBlocked: m => {
                a && s !== a && (s = a, m())
            }
        });
    return t.addEventListener(Rg, p), t.addEventListener(kg, p), t.history.pushState = function(...m) {
        const _ = n.apply(t.history, m);
        return y._ignoreSubscribers || p(), _
    }, t.history.replaceState = function(...m) {
        const _ = r.apply(t.history, m);
        return y._ignoreSubscribers || p(), _
    }, y
}

function EP(e = {
    initialEntries: ["/"]
}) {
    const t = e.initialEntries;
    let n = e.initialIndex ? ? t.length - 1;
    const r = t.map(() => ({}));
    return ES({
        getLocation: () => sc(t[n], r[n]),
        getLength: () => t.length,
        pushState: (o, s) => {
            n < t.length - 1 && (t.splice(n + 1), r.splice(n + 1)), r.push(s), t.push(o), n = Math.max(t.length - 1, 0)
        },
        replaceState: (o, s) => {
            r[n] = s, t[n] = o
        },
        back: () => {
            n = Math.max(n - 1, 0)
        },
        forward: () => {
            n = Math.min(n + 1, t.length - 1)
        },
        go: o => {
            n = Math.min(Math.max(n + o, 0), t.length - 1)
        },
        createHref: o => o
    })
}

function sc(e, t) {
    const n = e.indexOf("#"),
        r = e.indexOf("?");
    return {
        href: e,
        pathname: e.substring(0, n > 0 ? r > 0 ? Math.min(n, r) : n : r > 0 ? r : e.length),
        hash: n > -1 ? e.substring(n) : "",
        search: r > -1 ? e.slice(r, n === -1 ? void 0 : n) : "",
        state: t || {}
    }
}

function SP() {
    return (Math.random() + 1).toString(36).substring(7)
}
var wP = "Invariant failed";

function St(e, t) {
    if (!e) throw new Error(wP)
}
var xP = !0;

function Ss(e, t) {
    if (!xP) {
        if (e) return;
        var n = "Warning: " + t;
        typeof console < "u" && console.warn(n);
        try {
            throw Error(n)
        } catch {}
    }
}
const eh = L.createContext(null);

function SS() {
    return typeof document > "u" ? eh : window.__TSR_ROUTER_CONTEXT__ ? window.__TSR_ROUTER_CONTEXT__ : (window.__TSR_ROUTER_CONTEXT__ = eh, eh)
}

function Sr(e) {
    const t = L.useContext(SS());
    return Ss(!(((e == null ? void 0 : e.warn) ? ? !0) && !t), "useRouter must be used inside a <RouterProvider> component!"), t
}
var wS = {
        exports: {}
    },
    xS = {},
    TS = {
        exports: {}
    },
    OS = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ws = L;

function TP(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t
}
var OP = typeof Object.is == "function" ? Object.is : TP,
    bP = ws.useState,
    PP = ws.useEffect,
    CP = ws.useLayoutEffect,
    RP = ws.useDebugValue;

function kP(e, t) {
    var n = t(),
        r = bP({
            inst: {
                value: n,
                getSnapshot: t
            }
        }),
        i = r[0].inst,
        o = r[1];
    return CP(function() {
        i.value = n, i.getSnapshot = t, th(i) && o({
            inst: i
        })
    }, [e, n, t]), PP(function() {
        return th(i) && o({
            inst: i
        }), e(function() {
            th(i) && o({
                inst: i
            })
        })
    }, [e]), RP(n), n
}

function th(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
        var n = t();
        return !OP(e, n)
    } catch {
        return !0
    }
}

function MP(e, t) {
    return t()
}
var IP = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? MP : kP;
OS.useSyncExternalStore = ws.useSyncExternalStore !== void 0 ? ws.useSyncExternalStore : IP;
TS.exports = OS;
var LP = TS.exports;
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Uc = L,
    AP = LP;

function NP(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t
}
var DP = typeof Object.is == "function" ? Object.is : NP,
    FP = AP.useSyncExternalStore,
    $P = Uc.useRef,
    BP = Uc.useEffect,
    jP = Uc.useMemo,
    HP = Uc.useDebugValue;
xS.useSyncExternalStoreWithSelector = function(e, t, n, r, i) {
    var o = $P(null);
    if (o.current === null) {
        var s = {
            hasValue: !1,
            value: null
        };
        o.current = s
    } else s = o.current;
    o = jP(function() {
        function u(p) {
            if (!l) {
                if (l = !0, c = p, p = r(p), i !== void 0 && s.hasValue) {
                    var y = s.value;
                    if (i(y, p)) return f = y
                }
                return f = p
            }
            if (y = f, DP(c, p)) return y;
            var m = r(p);
            return i !== void 0 && i(y, m) ? (c = p, y) : (c = p, f = m)
        }
        var l = !1,
            c, f, h = n === void 0 ? null : n;
        return [function() {
            return u(t())
        }, h === null ? void 0 : function() {
            return u(h())
        }]
    }, [t, n, r, i]);
    var a = FP(e, o[0], o[1]);
    return BP(function() {
        s.hasValue = !0, s.value = a
    }, [a]), HP(a), a
};
wS.exports = xS;
var UP = wS.exports;
class zP {
    constructor(t, n) {
        this.listeners = new Set, this._batching = !1, this._flushing = 0, this.subscribe = r => {
            var i, o;
            this.listeners.add(r);
            const s = (o = (i = this.options) == null ? void 0 : i.onSubscribe) == null ? void 0 : o.call(i, r, this);
            return () => {
                this.listeners.delete(r), s == null || s()
            }
        }, this.setState = r => {
            var i, o, s;
            const a = this.state;
            this.state = (i = this.options) != null && i.updateFn ? this.options.updateFn(a)(r) : r(a), (s = (o = this.options) == null ? void 0 : o.onUpdate) == null || s.call(o), this._flush()
        }, this._flush = () => {
            if (this._batching) return;
            const r = ++this._flushing;
            this.listeners.forEach(i => {
                this._flushing === r && i()
            })
        }, this.batch = r => {
            if (this._batching) return r();
            this._batching = !0, r(), this._batching = !1, this._flush()
        }, this.state = t, this.options = n
    }
}

function GP(e, t = n => n) {
    return UP.useSyncExternalStoreWithSelector(e.subscribe, () => e.state, () => e.state, t, VP)
}

function VP(e, t) {
    if (Object.is(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
    if (e instanceof Map && t instanceof Map) {
        if (e.size !== t.size) return !1;
        for (const [r, i] of e)
            if (!t.has(r) || !Object.is(i, t.get(r))) return !1;
        return !0
    }
    if (e instanceof Set && t instanceof Set) {
        if (e.size !== t.size) return !1;
        for (const r of e)
            if (!t.has(r)) return !1;
        return !0
    }
    const n = Object.keys(e);
    if (n.length !== Object.keys(t).length) return !1;
    for (let r = 0; r < n.length; r++)
        if (!Object.prototype.hasOwnProperty.call(t, n[r]) || !Object.is(e[n[r]], t[n[r]])) return !1;
    return !0
}
const jt = "__root__";

function WP(e, t) {
    let n, r, i, o = "";
    for (n in e)
        if ((i = e[n]) !== void 0)
            if (Array.isArray(i))
                for (r = 0; r < i.length; r++) o && (o += "&"), o += encodeURIComponent(n) + "=" + encodeURIComponent(i[r]);
            else o && (o += "&"), o += encodeURIComponent(n) + "=" + encodeURIComponent(i);
    return (t || "") + o
}

function Ig(e) {
    if (!e) return "";
    const t = decodeURIComponent(e);
    return t === "false" ? !1 : t === "true" ? !0 : +t * 0 === 0 && +t + "" === t ? +t : t
}

function qP(e, t) {
    let n, r;
    const i = {},
        o = (t ? e.substr(t.length) : e).split("&");
    for (; n = o.shift();) {
        const s = n.indexOf("=");
        if (s !== -1) {
            r = n.slice(0, s), r = decodeURIComponent(r);
            const a = n.slice(s + 1);
            i[r] !== void 0 ? i[r] = [].concat(i[r], Ig(a)) : i[r] = Ig(a)
        } else r = n, r = decodeURIComponent(r), i[r] = ""
    }
    return i
}
const XP = KP(JSON.parse),
    QP = YP(JSON.stringify, JSON.parse);

function KP(e) {
    return t => {
        t.substring(0, 1) === "?" && (t = t.substring(1));
        const n = qP(t);
        for (const r in n) {
            const i = n[r];
            if (typeof i == "string") try {
                n[r] = e(i)
            } catch {}
        }
        return n
    }
}

function YP(e, t) {
    function n(r) {
        if (typeof r == "object" && r !== null) try {
            return e(r)
        } catch {} else if (typeof r == "string" && typeof t == "function") try {
            return t(r), e(r)
        } catch {}
        return r
    }
    return r => {
        r = { ...r
        }, Object.keys(r).forEach(o => {
            const s = r[o];
            typeof s > "u" || s === void 0 ? delete r[o] : r[o] = n(s)
        });
        const i = WP(r).toString();
        return i ? `?${i}` : ""
    }
}

function Pa(e) {
    return e[e.length - 1]
}

function ZP(e) {
    return typeof e == "function"
}

function Bo(e, t) {
    return ZP(e) ? e(t) : e
}

function bl(e, t) {
    return t.reduce((n, r) => (n[r] = e[r], n), {})
}

function en(e, t) {
    if (e === t) return e;
    const n = t,
        r = Ag(e) && Ag(n);
    if (r || xs(e) && xs(n)) {
        const i = r ? e : Object.keys(e),
            o = i.length,
            s = r ? n : Object.keys(n),
            a = s.length,
            u = r ? [] : {};
        let l = 0;
        for (let c = 0; c < a; c++) {
            const f = r ? c : s[c];
            (!r && i.includes(f) || r) && e[f] === void 0 && n[f] === void 0 ? (u[f] = void 0, l++) : (u[f] = en(e[f], n[f]), u[f] === e[f] && e[f] !== void 0 && l++)
        }
        return o === a && l === o ? e : u
    }
    return n
}

function xs(e) {
    if (!Lg(e)) return !1;
    const t = e.constructor;
    if (typeof t > "u") return !0;
    const n = t.prototype;
    return !(!Lg(n) || !n.hasOwnProperty("isPrototypeOf"))
}

function Lg(e) {
    return Object.prototype.toString.call(e) === "[object Object]"
}

function Ag(e) {
    return Array.isArray(e) && e.length === Object.keys(e).length
}

function Ng(e, t) {
    let n = Object.keys(e);
    return t && (n = n.filter(r => e[r] !== void 0)), n
}

function Xo(e, t, n) {
    if (e === t) return !0;
    if (typeof e != typeof t) return !1;
    if (xs(e) && xs(t)) {
        const r = (n == null ? void 0 : n.ignoreUndefined) ? ? !0,
            i = Ng(e, r),
            o = Ng(t, r);
        return !(n != null && n.partial) && i.length !== o.length ? !1 : o.every(s => Xo(e[s], t[s], n))
    }
    return Array.isArray(e) && Array.isArray(t) ? e.length !== t.length ? !1 : !e.some((r, i) => !Xo(r, t[i], n)) : !1
}
const ha = typeof window < "u" ? L.useLayoutEffect : L.useEffect;

function bo(e) {
    let t, n;
    const r = new Promise((i, o) => {
        t = i, n = o
    });
    return r.status = "pending", r.resolve = i => {
        r.status = "resolved", r.value = i, t(i), e == null || e(i)
    }, r.reject = i => {
        r.status = "rejected", n(i)
    }, r
}

function nh(e) {
    const t = L.useRef({
            value: e,
            prev: null
        }),
        n = t.current.value;
    return e !== n && (t.current = {
        value: e,
        prev: n
    }), t.current.prev
}

function JP(e, t, n = {}, r = {}) {
    const i = L.useRef(typeof IntersectionObserver == "function"),
        o = L.useRef(null);
    return L.useEffect(() => {
        if (!(!e.current || !i.current || r.disabled)) return o.current = new IntersectionObserver(([s]) => {
            t(s)
        }, n), o.current.observe(e.current), () => {
            var s;
            (s = o.current) == null || s.disconnect()
        }
    }, [t, n, r.disabled, e]), o.current
}

function eC(e) {
    const t = L.useRef(null);
    return L.useEffect(() => {
        e && (typeof e == "function" ? e(t.current) : e.current = t.current)
    }), t
}

function fr(e) {
    return zc(e.filter(t => t !== void 0).join("/"))
}

function zc(e) {
    return e.replace(/\/{2,}/g, "/")
}

function jm(e) {
    return e === "/" ? e : e.replace(/^\/{1,}/, "")
}

function ki(e) {
    return e === "/" ? e : e.replace(/\/{1,}$/, "")
}

function tC(e) {
    return ki(jm(e))
}

function ac(e, t) {
    return e.endsWith("/") && e !== "/" && e !== `${t}/` ? e.slice(0, -1) : e
}

function nC(e, t, n) {
    return ac(e, n) === ac(t, n)
}

function rC({
    basepath: e,
    base: t,
    to: n,
    trailingSlash: r = "never",
    caseSensitive: i
}) {
    var o, s;
    t = uc(e, t, i), n = uc(e, n, i);
    let a = Ts(t);
    const u = Ts(n);
    a.length > 1 && ((o = Pa(a)) == null ? void 0 : o.value) === "/" && a.pop(), u.forEach((c, f) => {
        c.value === "/" ? f ? f === u.length - 1 && a.push(c) : a = [c] : c.value === ".." ? a.pop() : c.value === "." || a.push(c)
    }), a.length > 1 && (((s = Pa(a)) == null ? void 0 : s.value) === "/" ? r === "never" && a.pop() : r === "always" && a.push({
        type: "pathname",
        value: "/"
    }));
    const l = fr([e, ...a.map(c => c.value)]);
    return zc(l)
}

function Ts(e) {
    if (!e) return [];
    e = zc(e);
    const t = [];
    if (e.slice(0, 1) === "/" && (e = e.substring(1), t.push({
            type: "pathname",
            value: "/"
        })), !e) return t;
    const n = e.split("/").filter(Boolean);
    return t.push(...n.map(r => r === "$" || r === "*" ? {
        type: "wildcard",
        value: r
    } : r.charAt(0) === "$" ? {
        type: "param",
        value: r
    } : {
        type: "pathname",
        value: decodeURI(r)
    })), e.slice(-1) === "/" && (e = e.substring(1), t.push({
        type: "pathname",
        value: "/"
    })), t
}

function el({
    path: e,
    params: t,
    leaveWildcards: n,
    leaveParams: r,
    decodeCharMap: i
}) {
    const o = Ts(e),
        s = {};
    for (const [a, u] of Object.entries(t)) {
        const l = typeof u == "string";
        ["*", "_splat"].includes(a) ? s[a] = l ? encodeURI(u) : u : s[a] = l ? iC(u, i) : u
    }
    return fr(o.map(a => {
        if (a.type === "wildcard") {
            const u = s._splat;
            return n ? `${a.value}${u??""}` : u
        }
        if (a.type === "param") {
            if (r) {
                const u = s[a.value];
                return `${a.value}${u??""}`
            }
            return s[a.value.substring(1)] ? ? "undefined"
        }
        return a.value
    }))
}

function iC(e, t) {
    let n = encodeURIComponent(e);
    if (t)
        for (const [r, i] of t) n = n.replaceAll(r, i);
    return n
}

function tl(e, t, n) {
    const r = oC(e, t, n);
    if (!(n.to && !r)) return r ? ? {}
}

function uc(e, t, n = !1) {
    const r = n ? e : e.toLowerCase(),
        i = n ? t : t.toLowerCase();
    switch (!0) {
        case r === "/":
            return t;
        case i === r:
            return "";
        case t.length < e.length:
            return t;
        case i[r.length] !== "/":
            return t;
        case i.startsWith(r):
            return t.slice(e.length);
        default:
            return t
    }
}

function oC(e, t, n) {
    if (e !== "/" && !t.startsWith(e)) return;
    t = uc(e, t, n.caseSensitive);
    const r = uc(e, `${n.to??"$"}`, n.caseSensitive),
        i = Ts(t),
        o = Ts(r);
    t.startsWith("/") || i.unshift({
        type: "pathname",
        value: "/"
    }), r.startsWith("/") || o.unshift({
        type: "pathname",
        value: "/"
    });
    const s = {};
    return (() => {
        for (let u = 0; u < Math.max(i.length, o.length); u++) {
            const l = i[u],
                c = o[u],
                f = u >= i.length - 1,
                h = u >= o.length - 1;
            if (c) {
                if (c.type === "wildcard") {
                    const p = decodeURI(fr(i.slice(u).map(y => y.value)));
                    return s["*"] = p, s._splat = p, !0
                }
                if (c.type === "pathname") {
                    if (c.value === "/" && !(l != null && l.value)) return !0;
                    if (l) {
                        if (n.caseSensitive) {
                            if (c.value !== l.value) return !1
                        } else if (c.value.toLowerCase() !== l.value.toLowerCase()) return !1
                    }
                }
                if (!l) return !1;
                if (c.type === "param") {
                    if (l.value === "/") return !1;
                    l.value.charAt(0) !== "$" && (s[c.value.substring(1)] = decodeURIComponent(l.value))
                }
            }
            if (!f && h) return s["**"] = fr(i.slice(u + 1).map(p => p.value)), !!n.fuzzy && (c == null ? void 0 : c.value) !== "/"
        }
        return !0
    })() ? s : void 0
}

function _H(e) {
    if (e.isRedirect = !0, e.statusCode = e.statusCode || e.code || 307, e.headers = e.headers || {}, e.throw) throw e;
    return e
}

function Ti(e) {
    return !!(e != null && e.isRedirect)
}

function rh(e) {
    return !!(e != null && e.isRedirect) && e.href
}

function Hm(e) {
    const t = e.errorComponent ? ? Gc;
    return Q.jsx(sC, {
        getResetKey: e.getResetKey,
        onCatch: e.onCatch,
        children: ({
            error: n,
            reset: r
        }) => n ? L.createElement(t, {
            error: n,
            reset: r
        }) : e.children
    })
}
class sC extends L.Component {
    constructor() {
        super(...arguments), this.state = {
            error: null
        }
    }
    static getDerivedStateFromProps(t) {
        return {
            resetKey: t.getResetKey()
        }
    }
    static getDerivedStateFromError(t) {
        return {
            error: t
        }
    }
    reset() {
        this.setState({
            error: null
        })
    }
    componentDidUpdate(t, n) {
        n.error && n.resetKey !== this.state.resetKey && this.reset()
    }
    componentDidCatch(t, n) {
        this.props.onCatch && this.props.onCatch(t, n)
    }
    render() {
        return this.props.children({
            error: this.state.resetKey !== this.props.getResetKey() ? null : this.state.error,
            reset: () => {
                this.reset()
            }
        })
    }
}

function Gc({
    error: e
}) {
    const [t, n] = L.useState(!1);
    return Q.jsxs("div", {
        style: {
            padding: ".5rem",
            maxWidth: "100%"
        },
        children: [Q.jsxs("div", {
            style: {
                display: "flex",
                alignItems: "center",
                gap: ".5rem"
            },
            children: [Q.jsx("strong", {
                style: {
                    fontSize: "1rem"
                },
                children: "Something went wrong!"
            }), Q.jsx("button", {
                style: {
                    appearance: "none",
                    fontSize: ".6em",
                    border: "1px solid currentColor",
                    padding: ".1rem .2rem",
                    fontWeight: "bold",
                    borderRadius: ".25rem"
                },
                onClick: () => n(r => !r),
                children: t ? "Hide Error" : "Show Error"
            })]
        }), Q.jsx("div", {
            style: {
                height: ".25rem"
            }
        }), t ? Q.jsx("div", {
            children: Q.jsx("pre", {
                style: {
                    fontSize: ".7em",
                    border: "1px solid red",
                    borderRadius: ".25rem",
                    padding: ".3rem",
                    color: "red",
                    overflow: "auto"
                },
                children: e.message ? Q.jsx("code", {
                    children: e.message
                }) : null
            })
        }) : null]
    })
}

function Rt(e) {
    const t = Sr({
            warn: (e == null ? void 0 : e.router) === void 0
        }),
        n = (e == null ? void 0 : e.router) || t,
        r = L.useRef();
    return GP(n.__store, i => {
        if (e != null && e.select) {
            if (e.structuralSharing ? ? n.options.defaultStructuralSharing) {
                const o = en(r.current, e.select(i));
                return r.current = o, o
            }
            return e.select(i)
        }
        return i
    })
}

function bn(e) {
    return !!(e != null && e.isNotFound)
}

function aC(e) {
    const t = Rt({
        select: n => `not-found-${n.location.pathname}-${n.status}`
    });
    return Q.jsx(Hm, {
        getResetKey: () => t,
        onCatch: (n, r) => {
            var i;
            if (bn(n))(i = e.onCatch) == null || i.call(e, n, r);
            else throw n
        },
        errorComponent: ({
            error: n
        }) => {
            var r;
            if (bn(n)) return (r = e.fallback) == null ? void 0 : r.call(e, n);
            throw n
        },
        children: e.children
    })
}

function uC() {
    return Q.jsx("p", {
        children: "Not Found"
    })
}
const lC = {
        stringify: e => JSON.stringify(e, function(n, r) {
            const i = this[n],
                o = Dg.find(s => s.stringifyCondition(i));
            return o ? o.stringify(i) : r
        }),
        parse: e => JSON.parse(e, function(n, r) {
            const i = this[n],
                o = Dg.find(s => s.parseCondition(i));
            return o ? o.parse(i) : r
        })
    },
    Dg = [{
        stringifyCondition: e => e instanceof Date,
        stringify: e => ({
            $date: e.toISOString()
        }),
        parseCondition: e => xs(e) && e.$date,
        parse: e => new Date(e.$date)
    }, {
        stringifyCondition: e => e === void 0,
        stringify: () => ({
            $undefined: ""
        }),
        parseCondition: e => xs(e) && e.$undefined === "",
        parse: () => {}
    }],
    bS = ["component", "errorComponent", "pendingComponent", "notFoundComponent"];

function cC(e) {
    var t;
    for (const n of bS)
        if ((t = e.options[n]) != null && t.preload) return !0;
    return !1
}

function ih(e, t) {
    if (e == null) return {};
    if ("~standard" in e) {
        const n = e["~standard"].validate(t);
        if (n instanceof Promise) throw new $d("Async validation not supported");
        if (n.issues) throw new $d(JSON.stringify(n.issues, void 0, 2));
        return n.value
    }
    return "parse" in e ? e.parse(t) : typeof e == "function" ? e(t) : {}
}

function EH(e) {
    return new fC(e)
}
class fC {
    constructor(t) {
        this.tempLocationKey = `${Math.round(Math.random()*1e7)}`, this.resetNextScroll = !0, this.shouldViewTransition = void 0, this.isViewTransitionTypesSupported = void 0, this.subscribers = new Set, this.startReactTransition = n => n(), this.update = n => {
            n.notFoundRoute && console.warn("The notFoundRoute API is deprecated and will be removed in the next major version. See https://tanstack.com/router/v1/docs/guide/not-found-errors#migrating-from-notfoundroute for more info.");
            const r = this.options;
            this.options = { ...this.options,
                ...n
            }, this.isServer = this.options.isServer ? ? typeof document > "u", this.pathParamsDecodeCharMap = this.options.pathParamsAllowedCharacters ? new Map(this.options.pathParamsAllowedCharacters.map(i => [encodeURIComponent(i), i])) : void 0, (!this.basepath || n.basepath && n.basepath !== r.basepath) && (n.basepath === void 0 || n.basepath === "" || n.basepath === "/" ? this.basepath = "/" : this.basepath = `/${tC(n.basepath)}`), (!this.history || this.options.history && this.options.history !== this.history) && (this.history = this.options.history ? ? (this.isServer ? EP({
                initialEntries: [this.basepath || "/"]
            }) : _P()), this.latestLocation = this.parseLocation()), this.options.routeTree !== this.routeTree && (this.routeTree = this.options.routeTree, this.buildRouteTree()), this.__store || (this.__store = new zP(dC(this.latestLocation), {
                onUpdate: () => {
                    this.__store.state = { ...this.state,
                        cachedMatches: this.state.cachedMatches.filter(i => !["redirected"].includes(i.status))
                    }
                }
            })), typeof window < "u" && "CSS" in window && typeof window.CSS.supports == "function" && (this.isViewTransitionTypesSupported = window.CSS.supports("selector(:active-view-transition-type(a)"))
        }, this.buildRouteTree = () => {
            this.routesById = {}, this.routesByPath = {};
            const n = this.options.notFoundRoute;
            n && (n.init({
                originalIndex: 99999999999,
                defaultSsr: this.options.defaultSsr
            }), this.routesById[n.id] = n);
            const r = s => {
                s.forEach((a, u) => {
                    a.init({
                        originalIndex: u,
                        defaultSsr: this.options.defaultSsr
                    });
                    const l = this.routesById[a.id];
                    if (St(!l, `Duplicate routes found with id: ${String(a.id)}`), this.routesById[a.id] = a, !a.isRoot && a.path) {
                        const f = ki(a.fullPath);
                        (!this.routesByPath[f] || a.fullPath.endsWith("/")) && (this.routesByPath[f] = a)
                    }
                    const c = a.children;
                    c != null && c.length && r(c)
                })
            };
            r([this.routeTree]);
            const i = [];
            Object.values(this.routesById).forEach((s, a) => {
                var u;
                if (s.isRoot || !s.path) return;
                const l = jm(s.fullPath),
                    c = Ts(l);
                for (; c.length > 1 && ((u = c[0]) == null ? void 0 : u.value) === "/";) c.shift();
                const f = c.map(h => h.value === "/" ? .75 : h.type === "param" ? .5 : h.type === "wildcard" ? .25 : 1);
                i.push({
                    child: s,
                    trimmed: l,
                    parsed: c,
                    index: a,
                    scores: f
                })
            }), this.flatRoutes = i.sort((s, a) => {
                const u = Math.min(s.scores.length, a.scores.length);
                for (let l = 0; l < u; l++)
                    if (s.scores[l] !== a.scores[l]) return a.scores[l] - s.scores[l];
                if (s.scores.length !== a.scores.length) return a.scores.length - s.scores.length;
                for (let l = 0; l < u; l++)
                    if (s.parsed[l].value !== a.parsed[l].value) return s.parsed[l].value > a.parsed[l].value ? 1 : -1;
                return s.index - a.index
            }).map((s, a) => (s.child.rank = a, s.child))
        }, this.subscribe = (n, r) => {
            const i = {
                eventType: n,
                fn: r
            };
            return this.subscribers.add(i), () => {
                this.subscribers.delete(i)
            }
        }, this.emit = n => {
            this.subscribers.forEach(r => {
                r.eventType === n.type && r.fn(n)
            })
        }, this.parseLocation = n => {
            const r = ({
                    pathname: a,
                    search: u,
                    hash: l,
                    state: c
                }) => {
                    const f = this.options.parseSearch(u),
                        h = this.options.stringifySearch(f);
                    return {
                        pathname: a,
                        searchStr: h,
                        search: en(n == null ? void 0 : n.search, f),
                        hash: l.split("#").reverse()[0] ? ? "",
                        href: `${a}${h}${l}`,
                        state: en(n == null ? void 0 : n.state, c)
                    }
                },
                i = r(this.history.location),
                {
                    __tempLocation: o,
                    __tempKey: s
                } = i.state;
            if (o && (!s || s === this.tempLocationKey)) {
                const a = r(o);
                return a.state.key = i.state.key, delete a.state.__tempLocation, { ...a,
                    maskedLocation: i
                }
            }
            return i
        }, this.resolvePathWithBase = (n, r) => rC({
            basepath: this.basepath,
            base: n,
            to: zc(r),
            trailingSlash: this.options.trailingSlash,
            caseSensitive: this.options.caseSensitive
        }), this.getMatchedRoutes = (n, r) => {
            let i = {};
            const o = ki(n.pathname),
                s = c => tl(this.basepath, o, {
                    to: c.fullPath,
                    caseSensitive: c.options.caseSensitive ? ? this.options.caseSensitive,
                    fuzzy: !0
                });
            let a = (r == null ? void 0 : r.to) !== void 0 ? this.routesByPath[r.to] : void 0;
            a ? i = s(a) : a = this.flatRoutes.find(c => {
                const f = s(c);
                return f ? (i = f, !0) : !1
            });
            let u = a || this.routesById[jt];
            const l = [u];
            for (; u.parentRoute;) u = u.parentRoute, l.unshift(u);
            return {
                matchedRoutes: l,
                routeParams: i,
                foundRoute: a
            }
        }, this.cancelMatch = n => {
            const r = this.getMatch(n);
            r && (r.abortController.abort(), clearTimeout(r.pendingTimeout))
        }, this.cancelMatches = () => {
            var n;
            (n = this.state.pendingMatches) == null || n.forEach(r => {
                this.cancelMatch(r.id)
            })
        }, this.buildLocation = n => {
            const r = (o = {}, s) => {
                    var a, u, l, c, f, h;
                    const p = o._fromLocation ? this.matchRoutes(o._fromLocation, {
                            _buildLocation: !0
                        }) : this.state.matches,
                        y = o.from != null ? p.find(N => tl(this.basepath, ki(N.pathname), {
                            to: o.from,
                            caseSensitive: !1,
                            fuzzy: !1
                        })) : void 0,
                        m = (y == null ? void 0 : y.pathname) || this.latestLocation.pathname;
                    St(o.from == null || y != null, "Could not find match for from: " + o.from);
                    const _ = (a = this.state.pendingMatches) != null && a.length ? (u = Pa(this.state.pendingMatches)) == null ? void 0 : u.search : ((l = Pa(p)) == null ? void 0 : l.search) || this.latestLocation.search,
                        g = s == null ? void 0 : s.matchedRoutes.filter(N => p.find(D => D.routeId === N.id));
                    let d;
                    if (o.to) d = this.resolvePathWithBase(m, `${o.to}`);
                    else {
                        const N = this.routesById[(c = g == null ? void 0 : g.find(D => {
                            const G = el({
                                path: D.fullPath,
                                params: (s == null ? void 0 : s.routeParams) ? ? {},
                                decodeCharMap: this.pathParamsDecodeCharMap
                            });
                            return fr([this.basepath, G]) === m
                        })) == null ? void 0 : c.id];
                        d = this.resolvePathWithBase(m, (N == null ? void 0 : N.to) ? ? m)
                    }
                    const v = { ...(f = Pa(p)) == null ? void 0 : f.params
                    };
                    let E = (o.params ? ? !0) === !0 ? v : { ...v,
                        ...Bo(o.params, v)
                    };
                    Object.keys(E).length > 0 && (s == null || s.matchedRoutes.map(N => {
                        var D;
                        return ((D = N.options.params) == null ? void 0 : D.stringify) ? ? N.options.stringifyParams
                    }).filter(Boolean).forEach(N => {
                        E = { ...E,
                            ...N(E)
                        }
                    })), d = el({
                        path: d,
                        params: E ? ? {},
                        leaveWildcards: !1,
                        leaveParams: n.leaveParams,
                        decodeCharMap: this.pathParamsDecodeCharMap
                    });
                    let S = _;
                    if (n._includeValidateSearch && ((h = this.options.search) != null && h.strict)) {
                        let N = {};
                        s == null || s.matchedRoutes.forEach(D => {
                            try {
                                D.options.validateSearch && (N = { ...N,
                                    ...ih(D.options.validateSearch, { ...N,
                                        ...S
                                    }) ? ? {}
                                })
                            } catch {}
                        }), S = N
                    }
                    S = (N => {
                        const D = (s == null ? void 0 : s.matchedRoutes.reduce((W, V) => {
                                var Y;
                                const M = [];
                                if ("search" in V.options)(Y = V.options.search) != null && Y.middlewares && M.push(...V.options.search.middlewares);
                                else if (V.options.preSearchFilters || V.options.postSearchFilters) {
                                    const C = ({
                                        search: P,
                                        next: R
                                    }) => {
                                        let k = P;
                                        "preSearchFilters" in V.options && V.options.preSearchFilters && (k = V.options.preSearchFilters.reduce((F, q) => q(F), P));
                                        const B = R(k);
                                        return "postSearchFilters" in V.options && V.options.postSearchFilters ? V.options.postSearchFilters.reduce((F, q) => q(F), B) : B
                                    };
                                    M.push(C)
                                }
                                if (n._includeValidateSearch && V.options.validateSearch) {
                                    const C = ({
                                        search: P,
                                        next: R
                                    }) => {
                                        try {
                                            const k = R(P);
                                            return { ...k,
                                                ...ih(V.options.validateSearch, k) ? ? {}
                                            }
                                        } catch {}
                                    };
                                    M.push(C)
                                }
                                return W.concat(M)
                            }, [])) ? ? [],
                            G = ({
                                search: W
                            }) => o.search ? o.search === !0 ? W : Bo(o.search, W) : {};
                        D.push(G);
                        const H = (W, V) => {
                            if (W >= D.length) return V;
                            const Y = D[W];
                            return Y({
                                search: V,
                                next: C => H(W + 1, C)
                            })
                        };
                        return H(0, N)
                    })(S), S = en(_, S);
                    const T = this.options.stringifySearch(S),
                        O = o.hash === !0 ? this.latestLocation.hash : o.hash ? Bo(o.hash, this.latestLocation.hash) : void 0,
                        b = O ? `#${O}` : "";
                    let I = o.state === !0 ? this.latestLocation.state : o.state ? Bo(o.state, this.latestLocation.state) : {};
                    return I = en(this.latestLocation.state, I), {
                        pathname: d,
                        search: S,
                        searchStr: T,
                        state: I,
                        hash: O ? ? "",
                        href: `${d}${T}${b}`,
                        unmaskOnReload: o.unmaskOnReload
                    }
                },
                i = (o = {}, s) => {
                    var a;
                    const u = r(o);
                    let l = s ? r(s) : void 0;
                    if (!l) {
                        let h = {};
                        const p = (a = this.options.routeMasks) == null ? void 0 : a.find(y => {
                            const m = tl(this.basepath, u.pathname, {
                                to: y.from,
                                caseSensitive: !1,
                                fuzzy: !1
                            });
                            return m ? (h = m, !0) : !1
                        });
                        if (p) {
                            const {
                                from: y,
                                ...m
                            } = p;
                            s = { ...bl(n, ["from"]),
                                ...m,
                                params: h
                            }, l = r(s)
                        }
                    }
                    const c = this.getMatchedRoutes(u, o),
                        f = r(o, c);
                    if (l) {
                        const h = this.getMatchedRoutes(l, s),
                            p = r(s, h);
                        f.maskedLocation = p
                    }
                    return f
                };
            return n.mask ? i(n, { ...bl(n, ["from"]),
                ...n.mask
            }) : i(n)
        }, this.commitLocation = ({
            viewTransition: n,
            ignoreBlocker: r,
            ...i
        }) => {
            const o = () => {
                    i.state.key = this.latestLocation.state.key;
                    const u = Xo(i.state, this.latestLocation.state);
                    return delete i.state.key, u
                },
                s = this.latestLocation.href === i.href,
                a = this.commitLocationPromise;
            if (this.commitLocationPromise = bo(() => {
                    a == null || a.resolve()
                }), s && o()) this.load();
            else {
                let {
                    maskedLocation: u,
                    ...l
                } = i;
                u && (l = { ...u,
                    state: { ...u.state,
                        __tempKey: void 0,
                        __tempLocation: { ...l,
                            search: l.searchStr,
                            state: { ...l.state,
                                __tempKey: void 0,
                                __tempLocation: void 0,
                                key: void 0
                            }
                        }
                    }
                }, (l.unmaskOnReload ? ? this.options.unmaskOnReload ? ? !1) && (l.state.__tempKey = this.tempLocationKey)), this.shouldViewTransition = n, this.history[i.replace ? "replace" : "push"](l.href, l.state, {
                    ignoreBlocker: r
                })
            }
            return this.resetNextScroll = i.resetScroll ? ? !0, this.history.subscribers.size || this.load(), this.commitLocationPromise
        }, this.buildAndCommitLocation = ({
            replace: n,
            resetScroll: r,
            viewTransition: i,
            ignoreBlocker: o,
            ...s
        } = {}) => {
            const a = s.href;
            if (a) {
                const l = sc(a, {});
                s.to = l.pathname, s.search = this.options.parseSearch(l.search), s.hash = l.hash.slice(1)
            }
            const u = this.buildLocation({ ...s,
                _includeValidateSearch: !0
            });
            return this.commitLocation({ ...u,
                viewTransition: i,
                replace: n,
                resetScroll: r,
                ignoreBlocker: o
            })
        }, this.navigate = ({
            to: n,
            ...r
        }) => {
            const i = String(n);
            let o;
            try {
                new URL(`${i}`), o = !0
            } catch {}
            return St(!o), this.buildAndCommitLocation({ ...r,
                to: n
            })
        }, this.load = async () => {
            this.latestLocation = this.parseLocation(this.latestLocation);
            let n, r, i;
            for (i = new Promise(o => {
                    this.startReactTransition(async () => {
                        var s;
                        try {
                            const a = this.latestLocation,
                                u = this.state.resolvedLocation,
                                l = u.href !== a.href;
                            this.cancelMatches();
                            let c;
                            this.__store.batch(() => {
                                c = this.matchRoutes(a), this.__store.setState(f => ({ ...f,
                                    status: "pending",
                                    isLoading: !0,
                                    location: a,
                                    pendingMatches: c,
                                    cachedMatches: f.cachedMatches.filter(h => !c.find(p => p.id === h.id))
                                }))
                            }), this.state.redirect || this.emit({
                                type: "onBeforeNavigate",
                                fromLocation: u,
                                toLocation: a,
                                pathChanged: l
                            }), this.emit({
                                type: "onBeforeLoad",
                                fromLocation: u,
                                toLocation: a,
                                pathChanged: l
                            }), await this.loadMatches({
                                matches: c,
                                location: a,
                                onReady: async () => {
                                    this.startViewTransition(async () => {
                                        let f, h, p;
                                        this.__store.batch(() => {
                                            this.__store.setState(y => {
                                                const m = y.matches,
                                                    _ = y.pendingMatches || y.matches;
                                                return f = m.filter(g => !_.find(d => d.id === g.id)), h = _.filter(g => !m.find(d => d.id === g.id)), p = m.filter(g => _.find(d => d.id === g.id)), { ...y,
                                                    isLoading: !1,
                                                    loadedAt: Date.now(),
                                                    matches: _,
                                                    pendingMatches: void 0,
                                                    cachedMatches: [...y.cachedMatches, ...f.filter(g => g.status !== "error")]
                                                }
                                            }), this.clearExpiredCache()
                                        }), [
                                            [f, "onLeave"],
                                            [h, "onEnter"],
                                            [p, "onStay"]
                                        ].forEach(([y, m]) => {
                                            y.forEach(_ => {
                                                var g, d;
                                                (d = (g = this.looseRoutesById[_.routeId].options)[m]) == null || d.call(g, _)
                                            })
                                        })
                                    })
                                }
                            })
                        } catch (a) {
                            rh(a) ? (n = a, this.isServer || this.navigate({ ...a,
                                replace: !0,
                                ignoreBlocker: !0
                            })) : bn(a) && (r = a), this.__store.setState(u => ({ ...u,
                                statusCode: n ? n.statusCode : r ? 404 : u.matches.some(l => l.status === "error") ? 500 : 200,
                                redirect: n
                            }))
                        }
                        this.latestLoadPromise === i && ((s = this.commitLocationPromise) == null || s.resolve(), this.latestLoadPromise = void 0, this.commitLocationPromise = void 0), o()
                    })
                }), this.latestLoadPromise = i, await i; this.latestLoadPromise && i !== this.latestLoadPromise;) await this.latestLoadPromise
        }, this.startViewTransition = n => {
            const r = this.shouldViewTransition ? ? this.options.defaultViewTransition;
            if (delete this.shouldViewTransition, r && typeof document < "u" && "startViewTransition" in document && typeof document.startViewTransition == "function") {
                let i;
                typeof r == "object" && this.isViewTransitionTypesSupported ? i = {
                    update: n,
                    types: r.types
                } : i = n, document.startViewTransition(i)
            } else n()
        }, this.updateMatch = (n, r) => {
            var i;
            let o;
            const s = (i = this.state.pendingMatches) == null ? void 0 : i.find(l => l.id === n),
                a = this.state.matches.find(l => l.id === n),
                u = s ? "pendingMatches" : a ? "matches" : "cachedMatches";
            return this.__store.setState(l => {
                var c;
                return { ...l,
                    [u]: (c = l[u]) == null ? void 0 : c.map(f => f.id === n ? o = r(f) : f)
                }
            }), o
        }, this.getMatch = n => [...this.state.cachedMatches, ...this.state.pendingMatches ? ? [], ...this.state.matches].find(r => r.id === n), this.loadMatches = async ({
            location: n,
            matches: r,
            preload: i,
            onReady: o,
            updateMatch: s = this.updateMatch
        }) => {
            let a, u = !1;
            const l = async () => {
                u || (u = !0, await (o == null ? void 0 : o()))
            };
            !this.isServer && !this.state.matches.length && l();
            const c = (f, h) => {
                var p, y, m;
                if (rh(h)) throw h;
                if (Ti(h) || bn(h)) {
                    if (s(f.id, _ => ({ ..._,
                            status: Ti(h) ? "redirected" : bn(h) ? "notFound" : "error",
                            isFetching: !1,
                            error: h,
                            beforeLoadPromise: void 0,
                            loaderPromise: void 0
                        })), h.routeId || (h.routeId = f.routeId), (p = f.beforeLoadPromise) == null || p.resolve(), (y = f.loaderPromise) == null || y.resolve(), (m = f.loadPromise) == null || m.resolve(), Ti(h)) throw u = !0, h = this.resolveRedirect({ ...h,
                        _fromLocation: n
                    }), h;
                    if (bn(h)) throw this._handleNotFound(r, h, {
                        updateMatch: s
                    }), h
                }
            };
            try {
                await new Promise((f, h) => {
                    (async () => {
                        var p, y, m;
                        try {
                            const _ = (v, E, S) => {
                                var w, T;
                                const {
                                    id: O,
                                    routeId: b
                                } = r[v], I = this.looseRoutesById[b];
                                if (E instanceof Promise) throw E;
                                E.routerCode = S, a = a ? ? v, c(this.getMatch(O), E);
                                try {
                                    (T = (w = I.options).onError) == null || T.call(w, E)
                                } catch (N) {
                                    E = N, c(this.getMatch(O), E)
                                }
                                s(O, N => {
                                    var D, G;
                                    return (D = N.beforeLoadPromise) == null || D.resolve(), (G = N.loadPromise) == null || G.resolve(), { ...N,
                                        error: E,
                                        status: "error",
                                        isFetching: !1,
                                        updatedAt: Date.now(),
                                        abortController: new AbortController,
                                        beforeLoadPromise: void 0
                                    }
                                })
                            };
                            for (const [v, {
                                    id: E,
                                    routeId: S
                                }] of r.entries()) {
                                const w = this.getMatch(E),
                                    T = (p = r[v - 1]) == null ? void 0 : p.id,
                                    O = this.looseRoutesById[S],
                                    b = O.options.pendingMs ? ? this.options.defaultPendingMs,
                                    I = !!(o && !this.isServer && !i && (O.options.loader || O.options.beforeLoad) && typeof b == "number" && b !== 1 / 0 && (O.options.pendingComponent ? ? this.options.defaultPendingComponent));
                                if (w.beforeLoadPromise || w.loaderPromise) I && setTimeout(() => {
                                    try {
                                        l()
                                    } catch {}
                                }, b), await w.beforeLoadPromise;
                                else {
                                    try {
                                        s(E, k => ({ ...k,
                                            loadPromise: bo(() => {
                                                var B;
                                                (B = k.loadPromise) == null || B.resolve()
                                            }),
                                            beforeLoadPromise: bo()
                                        }));
                                        const N = new AbortController;
                                        let D;
                                        I && (D = setTimeout(() => {
                                            try {
                                                l()
                                            } catch {}
                                        }, b));
                                        const {
                                            paramsError: G,
                                            searchError: H
                                        } = this.getMatch(E);
                                        G && _(v, G, "PARSE_PARAMS"), H && _(v, H, "VALIDATE_SEARCH");
                                        const W = () => T ? this.getMatch(T).context : this.options.context ? ? {};
                                        s(E, k => ({ ...k,
                                            isFetching: "beforeLoad",
                                            fetchCount: k.fetchCount + 1,
                                            abortController: N,
                                            pendingTimeout: D,
                                            context: { ...W(),
                                                ...k.__routeContext,
                                                ...k.__beforeLoadContext
                                            }
                                        }));
                                        const {
                                            search: V,
                                            params: Y,
                                            context: M,
                                            cause: C
                                        } = this.getMatch(E), P = {
                                            search: V,
                                            abortController: N,
                                            params: Y,
                                            preload: !!i,
                                            context: M,
                                            location: n,
                                            navigate: k => this.navigate({ ...k,
                                                _fromLocation: n
                                            }),
                                            buildLocation: this.buildLocation,
                                            cause: i ? "preload" : C,
                                            matches: r
                                        };
                                        let R = await ((m = (y = O.options).beforeLoad) == null ? void 0 : m.call(y, P)) ? ? {};
                                        this.serializeLoaderData && (R = this.serializeLoaderData("__beforeLoadContext", R, {
                                            router: this,
                                            match: this.getMatch(E)
                                        })), (Ti(R) || bn(R)) && _(v, R, "BEFORE_LOAD"), s(E, k => ({ ...k,
                                            __beforeLoadContext: R,
                                            context: { ...W(),
                                                ...k.__routeContext,
                                                ...R
                                            },
                                            abortController: N
                                        }))
                                    } catch (N) {
                                        _(v, N, "BEFORE_LOAD")
                                    }
                                    s(E, N => {
                                        var D;
                                        return (D = N.beforeLoadPromise) == null || D.resolve(), { ...N,
                                            beforeLoadPromise: void 0,
                                            isFetching: !1
                                        }
                                    })
                                }
                            }
                            const g = r.slice(0, a),
                                d = [];
                            g.forEach(({
                                id: v,
                                routeId: E
                            }, S) => {
                                d.push((async () => {
                                    const {
                                        loaderPromise: w
                                    } = this.getMatch(v);
                                    let T = !1;
                                    if (w) await w;
                                    else {
                                        const O = d[S - 1],
                                            b = this.looseRoutesById[E],
                                            I = () => {
                                                const {
                                                    params: P,
                                                    loaderDeps: R,
                                                    abortController: k,
                                                    context: B,
                                                    cause: F
                                                } = this.getMatch(v);
                                                return {
                                                    params: P,
                                                    deps: R,
                                                    preload: !!i,
                                                    parentMatchPromise: O,
                                                    abortController: k,
                                                    context: B,
                                                    location: n,
                                                    navigate: q => this.navigate({ ...q,
                                                        _fromLocation: n
                                                    }),
                                                    cause: i ? "preload" : F,
                                                    route: b
                                                }
                                            },
                                            N = Date.now() - this.getMatch(v).updatedAt,
                                            D = i ? b.options.preloadStaleTime ? ? this.options.defaultPreloadStaleTime ? ? 3e4 : b.options.staleTime ? ? this.options.defaultStaleTime ? ? 0,
                                            G = b.options.shouldReload,
                                            H = typeof G == "function" ? G(I()) : G;
                                        s(v, P => ({ ...P,
                                            loaderPromise: bo(),
                                            preload: !!i && !this.state.matches.find(R => R.id === v)
                                        }));
                                        const W = async () => {
                                                var P, R, k, B, F, q, re, Se;
                                                try {
                                                    const yt = async () => {
                                                        const ce = this.getMatch(v);
                                                        ce.minPendingPromise && await ce.minPendingPromise
                                                    };
                                                    try {
                                                        b._lazyPromise === void 0 && (b.lazyFn ? b._lazyPromise = b.lazyFn().then(Dt => {
                                                            const {
                                                                id: Tr,
                                                                ...Xs
                                                            } = Dt.options;
                                                            Object.assign(b.options, Xs)
                                                        }) : b._lazyPromise = Promise.resolve()), b._componentsPromise === void 0 && (b._componentsPromise = b._lazyPromise.then(() => Promise.all(bS.map(async Dt => {
                                                            const Tr = b.options[Dt];
                                                            Tr != null && Tr.preload && await Tr.preload()
                                                        })))), s(v, Dt => ({ ...Dt,
                                                            isFetching: "loader"
                                                        }));
                                                        let ce = await ((R = (P = b.options).loader) == null ? void 0 : R.call(P, I()));
                                                        this.serializeLoaderData && (ce = this.serializeLoaderData("loaderData", ce, {
                                                            router: this,
                                                            match: this.getMatch(v)
                                                        })), c(this.getMatch(v), ce), await b._lazyPromise, await yt();
                                                        const ut = (B = (k = b.options).head) == null ? void 0 : B.call(k, {
                                                                matches: r,
                                                                match: this.getMatch(v),
                                                                params: this.getMatch(v).params,
                                                                loaderData: ce
                                                            }),
                                                            xr = ut == null ? void 0 : ut.meta,
                                                            Of = (q = (F = b.options).headers) == null ? void 0 : q.call(F, {
                                                                loaderData: ce
                                                            });
                                                        s(v, Dt => ({ ...Dt,
                                                            error: void 0,
                                                            status: "success",
                                                            isFetching: !1,
                                                            updatedAt: Date.now(),
                                                            loaderData: ce,
                                                            meta: xr,
                                                            headers: Of
                                                        }))
                                                    } catch (ce) {
                                                        let ut = ce;
                                                        await yt(), c(this.getMatch(v), ce);
                                                        try {
                                                            (Se = (re = b.options).onError) == null || Se.call(re, ce)
                                                        } catch (xr) {
                                                            ut = xr, c(this.getMatch(v), xr)
                                                        }
                                                        s(v, xr => ({ ...xr,
                                                            error: ut,
                                                            status: "error",
                                                            isFetching: !1
                                                        }))
                                                    }
                                                    await b._componentsPromise
                                                } catch (yt) {
                                                    s(v, ce => ({ ...ce,
                                                        loaderPromise: void 0
                                                    })), c(this.getMatch(v), yt)
                                                }
                                            },
                                            {
                                                status: V,
                                                invalid: Y
                                            } = this.getMatch(v);
                                        T = V === "success" && (Y || (H ? ? N > D)), i && b.options.preload === !1 || (T ? (async () => {
                                            try {
                                                await W()
                                            } catch (P) {
                                                rh(P) && await this.navigate(P)
                                            }
                                        })() : V !== "success" && await W());
                                        const {
                                            loaderPromise: M,
                                            loadPromise: C
                                        } = this.getMatch(v);
                                        M == null || M.resolve(), C == null || C.resolve()
                                    }
                                    return s(v, O => ({ ...O,
                                        isFetching: T ? O.isFetching : !1,
                                        loaderPromise: void 0,
                                        invalid: !1
                                    })), this.getMatch(v)
                                })())
                            }), await Promise.all(d), f()
                        } catch (_) {
                            h(_)
                        }
                    })()
                }), await l()
            } catch (f) {
                if (Ti(f) || bn(f)) throw bn(f) && !i && await l(), f
            }
            return r
        }, this.invalidate = n => {
            const r = i => {
                var o;
                return ((o = n == null ? void 0 : n.filter) == null ? void 0 : o.call(n, i)) ? ? !0 ? { ...i,
                    invalid: !0,
                    ...i.status === "error" ? {
                        status: "pending",
                        error: void 0
                    } : {}
                } : i
            };
            return this.__store.setState(i => {
                var o;
                return { ...i,
                    matches: i.matches.map(r),
                    cachedMatches: i.cachedMatches.map(r),
                    pendingMatches: (o = i.pendingMatches) == null ? void 0 : o.map(r)
                }
            }), this.load()
        }, this.resolveRedirect = n => {
            const r = n;
            return r.href || (r.href = this.buildLocation(r).href), r
        }, this.clearCache = n => {
            const r = n == null ? void 0 : n.filter;
            r !== void 0 ? this.__store.setState(i => ({ ...i,
                cachedMatches: i.cachedMatches.filter(o => !r(o))
            })) : this.__store.setState(i => ({ ...i,
                cachedMatches: []
            }))
        }, this.clearExpiredCache = () => {
            const n = r => {
                const i = this.looseRoutesById[r.routeId];
                if (!i.options.loader) return !0;
                const o = (r.preload ? i.options.preloadGcTime ? ? this.options.defaultPreloadGcTime : i.options.gcTime ? ? this.options.defaultGcTime) ? ? 5 * 60 * 1e3;
                return !(r.status !== "error" && Date.now() - r.updatedAt < o)
            };
            this.clearCache({
                filter: n
            })
        }, this.preloadRoute = async n => {
            const r = this.buildLocation(n);
            let i = this.matchRoutes(r, {
                throwOnError: !0,
                preload: !0,
                dest: n
            });
            const o = Object.fromEntries([...this.state.matches, ...this.state.pendingMatches ? ? [], ...this.state.cachedMatches].map(a => [a.id, !0]));
            this.__store.batch(() => {
                i.forEach(a => {
                    o[a.id] || this.__store.setState(u => ({ ...u,
                        cachedMatches: [...u.cachedMatches, a]
                    }))
                })
            });
            const s = new Set([...this.state.matches, ...this.state.pendingMatches ? ? []].map(a => a.id));
            try {
                return i = await this.loadMatches({
                    matches: i,
                    location: r,
                    preload: !0,
                    updateMatch: (a, u) => {
                        s.has(a) ? i = i.map(l => l.id === a ? u(l) : l) : this.updateMatch(a, u)
                    }
                }), i
            } catch (a) {
                if (Ti(a)) return await this.preloadRoute({ ...a,
                    _fromLocation: r
                });
                console.error(a);
                return
            }
        }, this.matchRoute = (n, r) => {
            const i = { ...n,
                    to: n.to ? this.resolvePathWithBase(n.from || "", n.to) : void 0,
                    params: n.params || {},
                    leaveParams: !0
                },
                o = this.buildLocation(i);
            if (r != null && r.pending && this.state.status !== "pending") return !1;
            const a = ((r == null ? void 0 : r.pending) === void 0 ? !this.state.isLoading : r.pending) ? this.latestLocation : this.state.resolvedLocation,
                u = tl(this.basepath, a.pathname, { ...r,
                    to: o.pathname
                });
            return !u || n.params && !Xo(u, n.params, {
                partial: !0
            }) ? !1 : u && ((r == null ? void 0 : r.includeSearch) ? ? !0) ? Xo(a.search, o.search, {
                partial: !0
            }) ? u : !1 : u
        }, this.dehydrate = () => {
            var n;
            const r = ((n = this.options.errorSerializer) == null ? void 0 : n.serialize) ? ? pC;
            return {
                state: {
                    dehydratedMatches: this.state.matches.map(i => ({ ...bl(i, ["id", "status", "updatedAt"]),
                        error: i.error ? {
                            data: r(i.error),
                            __isServerError: !0
                        } : void 0
                    }))
                },
                manifest: this.manifest
            }
        }, this.hydrate = () => {
            var n, r, i;
            let o;
            typeof document < "u" && (o = this.options.transformer.parse((n = window.__TSR__) == null ? void 0 : n.dehydrated)), St(o), this.dehydratedData = o.payload, (i = (r = this.options).hydrate) == null || i.call(r, o.payload);
            const s = o.router.state,
                a = this.matchRoutes(this.state.location).map(u => {
                    const l = s.dehydratedMatches.find(c => c.id === u.id);
                    return St(l, `Could not find a client-side match for dehydrated match with id: ${u.id}!`), { ...u,
                        ...l
                    }
                });
            this.__store.setState(u => ({ ...u,
                matches: a
            })), this.manifest = o.router.manifest
        }, this.injectedHtml = [], this.injectHtml = n => {
            const r = () => (this.injectedHtml = this.injectedHtml.filter(i => i !== r), n);
            this.injectedHtml.push(r)
        }, this.injectScript = (n, r) => {
            this.injectHtml(`<script class='tsr-once'>${n}; __TSR__.cleanScripts()<\/script>`)
        }, this.streamedKeys = new Set, this.getStreamedValue = n => {
            var r;
            if (this.isServer) return;
            const i = (r = window.__TSR__) == null ? void 0 : r.streamedValues[n];
            if (i) return i.parsed || (i.parsed = this.options.transformer.parse(i.value)), i.parsed
        }, this.streamValue = (n, r) => {
            var i;
            Ss(!this.streamedKeys.has(n), "Key has already been streamed: " + n), this.streamedKeys.add(n), this.injectScript(`__TSR__.streamedValues['${n}'] = { value: ${(i=this.serializer)==null?void 0:i.call(this,this.options.transformer.stringify(r))}}`)
        }, this._handleNotFound = (n, r, {
            updateMatch: i = this.updateMatch
        } = {}) => {
            const o = Object.fromEntries(n.map(u => [u.routeId, u]));
            let s = (r.global ? this.looseRoutesById[jt] : this.looseRoutesById[r.routeId]) || this.looseRoutesById[jt];
            for (; !s.options.notFoundComponent && !this.options.defaultNotFoundComponent && s.id !== jt;) s = s.parentRoute, St(s);
            const a = o[s.id];
            St(a, "Could not find match for route: " + s.id), i(a.id, u => ({ ...u,
                status: "notFound",
                error: r,
                isFetching: !1
            })), r.routerCode === "BEFORE_LOAD" && s.parentRoute && (r.routeId = s.parentRoute.id, this._handleNotFound(n, r, {
                updateMatch: i
            }))
        }, this.hasNotFoundMatch = () => this.__store.state.matches.some(n => n.status === "notFound" || n.globalNotFound), this.update({
            defaultPreloadDelay: 50,
            defaultPendingMs: 1e3,
            defaultPendingMinMs: 500,
            context: void 0,
            ...t,
            caseSensitive: t.caseSensitive ? ? !1,
            notFoundMode: t.notFoundMode ? ? "fuzzy",
            stringifySearch: t.stringifySearch ? ? QP,
            parseSearch: t.parseSearch ? ? XP,
            transformer: t.transformer ? ? lC
        }), typeof document < "u" && (window.__TSR__ROUTER__ = this)
    }
    get state() {
        return this.__store.state
    }
    get looseRoutesById() {
        return this.routesById
    }
    matchRoutes(t, n, r) {
        return typeof t == "string" ? this.matchRoutesInternal({
            pathname: t,
            search: n
        }, r) : this.matchRoutesInternal(t, n)
    }
    matchRoutesInternal(t, n) {
        const {
            foundRoute: r,
            matchedRoutes: i,
            routeParams: o
        } = this.getMatchedRoutes(t, n == null ? void 0 : n.dest);
        let s = !1;
        (r ? r.path !== "/" && o["**"] : ki(t.pathname)) && (this.options.notFoundRoute ? i.push(this.options.notFoundRoute) : s = !0);
        const a = (() => {
                if (s) {
                    if (this.options.notFoundMode !== "root")
                        for (let c = i.length - 1; c >= 0; c--) {
                            const f = i[c];
                            if (f.children) return f.id
                        }
                    return jt
                }
            })(),
            u = i.map(c => {
                var f;
                let h;
                const p = ((f = c.options.params) == null ? void 0 : f.parse) ? ? c.options.parseParams;
                if (p) try {
                    const y = p(o);
                    Object.assign(o, y)
                } catch (y) {
                    if (h = new hC(y.message, {
                            cause: y
                        }), n != null && n.throwOnError) throw h;
                    return h
                }
            }),
            l = [];
        return i.forEach((c, f) => {
            var h, p, y, m, _, g, d, v;
            const E = l[f - 1],
                [S, w] = (() => {
                    const M = (E == null ? void 0 : E.search) ? ? t.search;
                    try {
                        const C = ih(c.options.validateSearch, M) ? ? {};
                        return [{ ...M,
                            ...C
                        }, void 0]
                    } catch (C) {
                        const P = new $d(C.message, {
                            cause: C
                        });
                        if (n != null && n.throwOnError) throw P;
                        return [M, P]
                    }
                })(),
                T = ((p = (h = c.options).loaderDeps) == null ? void 0 : p.call(h, {
                    search: S
                })) ? ? "",
                O = T ? JSON.stringify(T) : "",
                b = el({
                    path: c.fullPath,
                    params: o,
                    decodeCharMap: this.pathParamsDecodeCharMap
                }),
                I = el({
                    path: c.id,
                    params: o,
                    leaveWildcards: !0,
                    decodeCharMap: this.pathParamsDecodeCharMap
                }) + O,
                N = this.getMatch(I),
                D = this.state.matches.find(M => M.routeId === c.id),
                G = D ? "stay" : "enter";
            let H;
            if (N) H = { ...N,
                cause: G,
                params: D ? en(D.params, o) : o,
                search: en(D ? D.search : N.search, S)
            };
            else {
                const M = c.options.loader || c.options.beforeLoad || c.lazyFn || cC(c) ? "pending" : "success";
                H = {
                    id: I,
                    index: f,
                    routeId: c.id,
                    params: D ? en(D.params, o) : o,
                    pathname: fr([this.basepath, b]),
                    updatedAt: Date.now(),
                    search: D ? en(D.search, S) : S,
                    searchError: void 0,
                    status: M,
                    isFetching: !1,
                    error: void 0,
                    paramsError: u[f],
                    __routeContext: {},
                    __beforeLoadContext: {},
                    context: {},
                    abortController: new AbortController,
                    fetchCount: 0,
                    cause: G,
                    loaderDeps: D ? en(D.loaderDeps, T) : T,
                    invalid: !1,
                    preload: !1,
                    links: void 0,
                    scripts: void 0,
                    meta: void 0,
                    staticData: c.options.staticData || {},
                    loadPromise: bo(),
                    fullPath: c.fullPath
                }
            }
            const W = (m = (y = c.options).head) == null ? void 0 : m.call(y, {
                matches: l,
                match: H,
                params: H.params,
                loaderData: H.loaderData ? ? void 0
            });
            H.links = W == null ? void 0 : W.links, H.scripts = W == null ? void 0 : W.scripts, H.meta = W == null ? void 0 : W.meta, H.status === "success" && (H.headers = (g = (_ = c.options).headers) == null ? void 0 : g.call(_, {
                loaderData: H.loaderData
            })), n != null && n.preload || (H.globalNotFound = a === c.id), H.searchError = w;
            const Y = (E == null ? void 0 : E.id) ? E.context ? ? this.options.context ? ? {} : this.options.context ? ? {};
            if (H.context = { ...Y,
                    ...H.__routeContext,
                    ...H.__beforeLoadContext
                }, !N && (n == null ? void 0 : n._buildLocation) !== !0) {
                const M = {
                    deps: T,
                    params: H.params,
                    context: H.context,
                    location: t,
                    navigate: C => this.navigate({ ...C,
                        _fromLocation: t
                    }),
                    buildLocation: this.buildLocation,
                    cause: H.cause,
                    abortController: H.abortController,
                    preload: !!H.preload,
                    matches: l
                };
                H.__routeContext = ((v = (d = c.options).context) == null ? void 0 : v.call(d, M)) ? ? {}, H.context = { ...Y,
                    ...H.__routeContext,
                    ...H.__beforeLoadContext
                }
            }
            l.push(H)
        }), l
    }
}
class $d extends Error {}
class hC extends Error {}

function dC(e) {
    return {
        loadedAt: 0,
        isLoading: !1,
        isTransitioning: !1,
        status: "idle",
        resolvedLocation: { ...e
        },
        location: e,
        matches: [],
        pendingMatches: [],
        cachedMatches: [],
        statusCode: 200
    }
}

function pC(e) {
    return e instanceof Error ? {
        name: e.name,
        message: e.message
    } : {
        data: e
    }
}

function Fg(e) {
    return !(typeof e == "object" && e && "data" in e) || !("__isServerError" in e && e.__isServerError) || !(typeof e.data == "object" && e.data) ? !1 : e.__isServerError === !0
}

function $g(e) {
    if ("name" in e && "message" in e) {
        const t = new Error(e.message);
        return t.name = e.name, t
    }
    return e.data
}
const Vc = L.createContext(void 0),
    mC = L.createContext(void 0);

function Ji(e) {
    const t = L.useContext(e.from ? mC : Vc);
    return Rt({
        select: r => {
            const i = r.matches.find(o => e.from ? e.from === o.routeId : o.id === t);
            if (St(!((e.shouldThrow ? ? !0) && !i), `Could not find ${e.from?`an active match from "${e.from}"`:"a nearest match!"}`), i !== void 0) return e.select ? e.select(i) : i
        },
        structuralSharing: e.structuralSharing
    })
}

function vC(e) {
    return Ji({
        from: e.from,
        strict: e.strict,
        structuralSharing: e.structuralSharing,
        select: t => e.select ? e.select(t.loaderData) : t.loaderData
    })
}

function gC(e) {
    const {
        select: t,
        ...n
    } = e;
    return Ji({ ...n,
        select: r => t ? t(r.loaderDeps) : r.loaderDeps
    })
}

function yC(e) {
    return Ji({
        from: e.from,
        strict: e.strict,
        structuralSharing: e.structuralSharing,
        select: t => e.select ? e.select(t.params) : t.params
    })
}

function _C(e) {
    return Ji({
        from: e.from,
        strict: e.strict,
        structuralSharing: e.structuralSharing,
        select: t => e.select ? e.select(t.search) : t.search
    })
}

function EC(e) {
    const {
        navigate: t
    } = Sr();
    return L.useCallback(n => t({ ...n
    }), [t])
}

function SH(e) {
    const {
        navigate: t
    } = Sr();
    return L.useEffect(() => {
        t({ ...e
        })
    }, []), null
}
class PS {
    constructor(t) {
        this.init = n => {
            var r, i;
            this.originalIndex = n.originalIndex;
            const o = this.options,
                s = !(o != null && o.path) && !(o != null && o.id);
            this.parentRoute = (i = (r = this.options).getParentRoute) == null ? void 0 : i.call(r), s ? this._path = jt : St(this.parentRoute);
            let a = s ? jt : o.path;
            a && a !== "/" && (a = jm(a));
            const u = (o == null ? void 0 : o.id) || a;
            let l = s ? jt : fr([this.parentRoute.id === jt ? "" : this.parentRoute.id, u]);
            a === jt && (a = "/"), l !== jt && (l = fr(["/", l]));
            const c = l === jt ? "/" : fr([this.parentRoute.fullPath, a]);
            this._path = a, this._id = l, this._fullPath = c, this._to = c, this._ssr = (o == null ? void 0 : o.ssr) ? ? n.defaultSsr ? ? !0
        }, this.updateLoader = n => (Object.assign(this.options, n), this), this.update = n => (Object.assign(this.options, n), this), this.lazy = n => (this.lazyFn = n, this), this.useMatch = n => Ji({
            select: n == null ? void 0 : n.select,
            from: this.id,
            structuralSharing: n == null ? void 0 : n.structuralSharing
        }), this.useRouteContext = n => Ji({ ...n,
            from: this.id,
            select: r => n != null && n.select ? n.select(r.context) : r.context
        }), this.useSearch = n => _C({
            select: n == null ? void 0 : n.select,
            structuralSharing: n == null ? void 0 : n.structuralSharing,
            from: this.id
        }), this.useParams = n => yC({
            select: n == null ? void 0 : n.select,
            structuralSharing: n == null ? void 0 : n.structuralSharing,
            from: this.id
        }), this.useLoaderDeps = n => gC({ ...n,
            from: this.id
        }), this.useLoaderData = n => vC({ ...n,
            from: this.id
        }), this.useNavigate = () => EC({
            from: this.id
        }), this.options = t || {}, this.isRoot = !(t != null && t.getParentRoute), St(!(t != null && t.id && (t != null && t.path))), this.$$typeof = Symbol.for("react.memo")
    }
    get to() {
        return this._to
    }
    get id() {
        return this._id
    }
    get path() {
        return this._path
    }
    get fullPath() {
        return this._fullPath
    }
    get ssr() {
        return this._ssr
    }
    addChildren(t) {
        return this._addFileChildren(t)
    }
    _addFileChildren(t) {
        return Array.isArray(t) && (this.children = t), typeof t == "object" && t !== null && (this.children = Object.values(t)), this
    }
}

function SC(e) {
    return new PS(e)
}

function wH() {
    return e => xC(e)
}
class wC extends PS {
    constructor(t) {
        super(t)
    }
    addChildren(t) {
        return super.addChildren(t), this
    }
    _addFileChildren(t) {
        return super._addFileChildren(t), this
    }
    _addFileTypes() {
        return this
    }
}

function xC(e) {
    return new wC(e)
}

function xH(e) {
    return new TC(e, {
        silent: !0
    }).createRoute
}
class TC {
    constructor(t, n) {
        this.path = t, this.createRoute = r => {
            Ss(this.silent, "FileRoute is deprecated and will be removed in the next major version. Use the createFileRoute(path)(options) function instead.");
            const i = SC(r);
            return i.isRoot = !1, i
        }, this.silent = n == null ? void 0 : n.silent
    }
}

function Pl(e) {
    return Q.jsx(Q.Fragment, {
        children: e.children
    })
}

function CS(e, t, n) {
    return t.options.notFoundComponent ? Q.jsx(t.options.notFoundComponent, {
        data: n
    }) : e.options.defaultNotFoundComponent ? Q.jsx(e.options.defaultNotFoundComponent, {
        data: n
    }) : Q.jsx(uC, {})
}
const RS = L.memo(function({
        matchId: t
    }) {
        var n, r;
        const i = Sr(),
            o = Rt({
                select: _ => {
                    var g;
                    return (g = _.matches.find(d => d.id === t)) == null ? void 0 : g.routeId
                }
            });
        St(o);
        const s = i.routesById[o],
            a = s.options.pendingComponent ? ? i.options.defaultPendingComponent,
            u = a ? Q.jsx(a, {}) : null,
            l = s.options.errorComponent ? ? i.options.defaultErrorComponent,
            c = s.options.onCatch ? ? i.options.defaultOnCatch,
            f = s.isRoot ? s.options.notFoundComponent ? ? ((n = i.options.notFoundRoute) == null ? void 0 : n.options.component) : s.options.notFoundComponent,
            h = (!s.isRoot || s.options.wrapInSuspense) && (s.options.wrapInSuspense ? ? a ? ? ((r = s.options.errorComponent) == null ? void 0 : r.preload)) ? L.Suspense : Pl,
            p = l ? Hm : Pl,
            y = f ? aC : Pl,
            m = Rt({
                select: _ => _.loadedAt
            });
        return Q.jsx(Vc.Provider, {
            value: t,
            children: Q.jsx(h, {
                fallback: u,
                children: Q.jsx(p, {
                    getResetKey: () => m,
                    errorComponent: l || Gc,
                    onCatch: (_, g) => {
                        if (bn(_)) throw _;
                        Ss(!1, `Error in route match: ${t}`), c == null || c(_, g)
                    },
                    children: Q.jsx(y, {
                        fallback: _ => {
                            if (!f || _.routeId && _.routeId !== o || !_.routeId && !s.isRoot) throw _;
                            return L.createElement(f, _)
                        },
                        children: Q.jsx(OC, {
                            matchId: t
                        })
                    })
                })
            })
        })
    }),
    OC = L.memo(function({
        matchId: t
    }) {
        var n, r, i, o, s;
        const a = Sr(),
            {
                match: u,
                matchIndex: l,
                routeId: c
            } = Rt({
                select: y => {
                    const m = y.matches.findIndex(d => d.id === t),
                        _ = y.matches[m];
                    return {
                        routeId: _.routeId,
                        matchIndex: m,
                        match: bl(_, ["id", "status", "error"])
                    }
                },
                structuralSharing: !0
            }),
            f = a.routesById[c],
            h = L.useMemo(() => {
                const y = f.options.component ? ? a.options.defaultComponent;
                return y ? Q.jsx(y, {}) : Q.jsx(bC, {})
            }, [f.options.component, a.options.defaultComponent]),
            p = (f.options.errorComponent ? ? a.options.defaultErrorComponent) || Gc;
        if (u.status === "notFound") {
            let y;
            return Fg(u.error) ? y = (((n = a.options.errorSerializer) == null ? void 0 : n.deserialize) ? ? $g)(u.error.data) : y = u.error, St(bn(y)), CS(a, f, y)
        }
        if (u.status === "redirected") throw St(Ti(u.error)), (r = a.getMatch(u.id)) == null ? void 0 : r.loadPromise;
        if (u.status === "error") {
            if (a.isServer) return Q.jsx(p, {
                error: u.error,
                info: {
                    componentStack: ""
                }
            });
            throw Fg(u.error) ? (((i = a.options.errorSerializer) == null ? void 0 : i.deserialize) ? ? $g)(u.error.data) : u.error
        }
        if (u.status === "pending") {
            const y = f.options.pendingMinMs ? ? a.options.defaultPendingMinMs;
            if (y && !((o = a.getMatch(u.id)) != null && o.minPendingPromise) && !a.isServer) {
                const m = bo();
                Promise.resolve().then(() => {
                    a.updateMatch(u.id, _ => ({ ..._,
                        minPendingPromise: m
                    }))
                }), setTimeout(() => {
                    m.resolve(), a.updateMatch(u.id, _ => ({ ..._,
                        minPendingPromise: void 0
                    }))
                }, y)
            }
            throw (s = a.getMatch(u.id)) == null ? void 0 : s.loadPromise
        }
        return Q.jsxs(Q.Fragment, {
            children: [h, a.AfterEachMatch ? Q.jsx(a.AfterEachMatch, {
                match: u,
                matchIndex: l
            }) : null]
        })
    }),
    bC = L.memo(function() {
        const t = Sr(),
            n = L.useContext(Vc),
            r = Rt({
                select: l => {
                    var c;
                    return (c = l.matches.find(f => f.id === n)) == null ? void 0 : c.routeId
                }
            }),
            i = t.routesById[r],
            o = Rt({
                select: l => {
                    const f = l.matches.find(h => h.id === n);
                    return St(f), f.globalNotFound
                }
            }),
            s = Rt({
                select: l => {
                    var c;
                    const f = l.matches,
                        h = f.findIndex(p => p.id === n);
                    return (c = f[h + 1]) == null ? void 0 : c.id
                }
            });
        if (o) return CS(t, i, void 0);
        if (!s) return null;
        const a = Q.jsx(RS, {
                matchId: s
            }),
            u = t.options.defaultPendingComponent ? Q.jsx(t.options.defaultPendingComponent, {}) : null;
        return n === jt ? Q.jsx(L.Suspense, {
            fallback: u,
            children: a
        }) : a
    }),
    PC = "Error preloading route! ☝️";

function CC(e, t) {
    const n = Sr(),
        [r, i] = L.useState(!1),
        o = L.useRef(!1),
        s = eC(t),
        {
            activeProps: a = () => ({
                className: "active"
            }),
            inactiveProps: u = () => ({}),
            activeOptions: l,
            to: c,
            preload: f,
            preloadDelay: h,
            replace: p,
            startTransition: y,
            resetScroll: m,
            viewTransition: _,
            children: g,
            target: d,
            disabled: v,
            style: E,
            className: S,
            onClick: w,
            onFocus: T,
            onMouseEnter: O,
            onMouseLeave: b,
            onTouchStart: I,
            ignoreBlocker: N,
            ...D
        } = e,
        {
            params: G,
            search: H,
            hash: W,
            state: V,
            mask: Y,
            ...M
        } = D,
        C = L.useMemo(() => {
            try {
                return new URL(`${c}`), "external"
            } catch {}
            return "internal"
        }, [c]),
        P = Rt({
            select: me => me.location.search,
            structuralSharing: !0
        });
    e = {
        from: Ji({
            strict: !1,
            select: me => me.pathname
        }),
        ...e
    };
    const k = L.useMemo(() => n.buildLocation(e), [n, e, P]),
        B = L.useMemo(() => f ? ? n.options.defaultPreload, [n.options.defaultPreload, f]),
        F = h ? ? n.options.defaultPreloadDelay ? ? 0,
        q = Rt({
            select: me => {
                if (l != null && l.exact) {
                    if (!nC(me.location.pathname, k.pathname, n.basepath)) return !1
                } else {
                    const je = ac(me.location.pathname, n.basepath).split("/");
                    if (!ac(k.pathname, n.basepath).split("/").every((VT, WT) => VT === je[WT])) return !1
                }
                return ((l == null ? void 0 : l.includeSearch) ? ? !0) && !Xo(me.location.search, k.search, {
                    partial: !(l != null && l.exact),
                    ignoreUndefined: !(l != null && l.explicitUndefined)
                }) ? !1 : l != null && l.includeHash ? me.location.hash === k.hash : !0
            }
        }),
        re = L.useCallback(() => {
            n.preloadRoute(e).catch(me => {
                console.warn(me), console.warn(PC)
            })
        }, [e, n]),
        Se = L.useCallback(me => {
            me != null && me.isIntersecting && re()
        }, [re]);
    if (JP(s, Se, {
            rootMargin: "100px"
        }, {
            disabled: !!v || B !== "viewport"
        }), ha(() => {
            o.current || !v && B === "render" && (re(), o.current = !0)
        }, [v, re, B]), C === "external") return { ...M,
        ref: s,
        type: C,
        href: c,
        ...g && {
            children: g
        },
        ...d && {
            target: d
        },
        ...v && {
            disabled: v
        },
        ...E && {
            style: E
        },
        ...S && {
            className: S
        },
        ...w && {
            onClick: w
        },
        ...T && {
            onFocus: T
        },
        ...O && {
            onMouseEnter: O
        },
        ...b && {
            onMouseLeave: b
        },
        ...I && {
            onTouchStart: I
        }
    };
    const yt = me => {
            if (!v && !RC(me) && !me.defaultPrevented && (!d || d === "_self") && me.button === 0) {
                me.preventDefault(), Bm.flushSync(() => {
                    i(!0)
                });
                const je = n.subscribe("onResolved", () => {
                    je(), i(!1)
                });
                n.buildAndCommitLocation({ ...e,
                    replace: p,
                    resetScroll: m,
                    startTransition: y,
                    viewTransition: _,
                    ignoreBlocker: N
                })
            }
        },
        ce = me => {
            v || B && re()
        },
        ut = ce,
        xr = me => {
            if (v) return;
            const je = me.target || {};
            if (B) {
                if (je.preloadTimeout) return;
                je.preloadTimeout = setTimeout(() => {
                    je.preloadTimeout = null, re()
                }, F)
            }
        },
        Of = me => {
            if (v) return;
            const je = me.target || {};
            je.preloadTimeout && (clearTimeout(je.preloadTimeout), je.preloadTimeout = null)
        },
        Dt = me => je => {
            var bf;
            (bf = je.persist) == null || bf.call(je), me.filter(Boolean).forEach(_v => {
                je.defaultPrevented || _v(je)
            })
        },
        Tr = q ? Bo(a, {}) ? ? {} : {},
        Xs = q ? {} : Bo(u, {}),
        gv = [S, Tr.className, Xs.className].filter(Boolean).join(" "),
        yv = { ...E,
            ...Tr.style,
            ...Xs.style
        };
    return { ...M,
        ...Tr,
        ...Xs,
        href: v ? void 0 : k.maskedLocation ? n.history.createHref(k.maskedLocation.href) : n.history.createHref(k.href),
        ref: s,
        onClick: Dt([w, yt]),
        onFocus: Dt([T, ce]),
        onMouseEnter: Dt([O, xr]),
        onMouseLeave: Dt([b, Of]),
        onTouchStart: Dt([I, ut]),
        disabled: !!v,
        target: d,
        ...Object.keys(yv).length && {
            style: yv
        },
        ...gv && {
            className: gv
        },
        ...v && {
            role: "link",
            "aria-disabled": !0
        },
        ...q && {
            "data-status": "active",
            "aria-current": "page"
        },
        ...r && {
            "data-transitioning": "transitioning"
        }
    }
}
const TH = L.forwardRef((e, t) => {
    const {
        _asChild: n,
        ...r
    } = e, {
        type: i,
        ref: o,
        ...s
    } = CC(r, t), a = typeof r.children == "function" ? r.children({
        isActive: s["data-status"] === "active"
    }) : r.children;
    return typeof n > "u" && delete s.disabled, L.createElement(n || "a", { ...s,
        ref: o
    }, a)
});

function RC(e) {
    return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
}

function kC() {
    const e = Sr(),
        t = L.useRef({
            router: e,
            mounted: !1
        }),
        n = Rt({
            select: ({
                isLoading: f
            }) => f
        }),
        [r, i] = L.useTransition(),
        o = Rt({
            select: f => f.matches.some(h => h.status === "pending"),
            structuralSharing: !0
        }),
        s = nh(n),
        a = n || r || o,
        u = nh(a),
        l = n || o,
        c = nh(l);
    return e.isServer || (e.startReactTransition = i), L.useEffect(() => {
        const f = e.history.subscribe(e.load),
            h = e.buildLocation({
                to: e.latestLocation.pathname,
                search: !0,
                params: !0,
                hash: !0,
                state: !0,
                _includeValidateSearch: !0
            });
        return ki(e.latestLocation.href) !== ki(h.href) && e.commitLocation({ ...h,
            replace: !0
        }), () => {
            f()
        }
    }, [e, e.history]), ha(() => {
        var f;
        if (typeof window < "u" && ((f = window.__TSR__) != null && f.dehydrated) || t.current.router === e && t.current.mounted) return;
        t.current = {
            router: e,
            mounted: !0
        }, (async () => {
            try {
                await e.load()
            } catch (p) {
                console.error(p)
            }
        })()
    }, [e]), ha(() => {
        if (s && !n) {
            const f = e.state.location,
                h = e.state.resolvedLocation,
                p = h.pathname !== f.pathname;
            e.emit({
                type: "onLoad",
                fromLocation: h,
                toLocation: f,
                pathChanged: p
            })
        }
    }, [s, e, n]), ha(() => {
        if (c && !l) {
            const f = e.state.location,
                h = e.state.resolvedLocation,
                p = h.pathname !== f.pathname;
            e.emit({
                type: "onBeforeRouteMount",
                fromLocation: h,
                toLocation: f,
                pathChanged: p
            })
        }
    }, [l, c, e]), ha(() => {
        if (u && !a) {
            const f = e.state.location,
                h = e.state.resolvedLocation,
                p = h.pathname !== f.pathname;
            if (e.emit({
                    type: "onResolved",
                    fromLocation: h,
                    toLocation: f,
                    pathChanged: p
                }), e.__store.setState(y => ({ ...y,
                    status: "idle",
                    resolvedLocation: y.location
                })), typeof document < "u" && document.querySelector && e.state.location.hash !== "") {
                const y = document.getElementById(e.state.location.hash);
                y && y.scrollIntoView()
            }
        }
    }, [a, u, e]), null
}

function MC() {
    const e = Sr(),
        t = e.options.defaultPendingComponent ? Q.jsx(e.options.defaultPendingComponent, {}) : null,
        n = e.isServer || typeof document < "u" && window.__TSR__ ? Pl : L.Suspense,
        r = Q.jsxs(n, {
            fallback: t,
            children: [Q.jsx(kC, {}), Q.jsx(IC, {})]
        });
    return e.options.InnerWrap ? Q.jsx(e.options.InnerWrap, {
        children: r
    }) : r
}

function IC() {
    const e = Rt({
            select: n => {
                var r;
                return (r = n.matches[0]) == null ? void 0 : r.id
            }
        }),
        t = Rt({
            select: n => n.loadedAt
        });
    return Q.jsx(Vc.Provider, {
        value: e,
        children: Q.jsx(Hm, {
            getResetKey: () => t,
            errorComponent: Gc,
            onCatch: n => {
                Ss(!1, "The following error wasn't caught by any route! At the very least, consider setting an 'errorComponent' in your RootRoute!"), Ss(!1, n.message || n.toString())
            },
            children: e ? Q.jsx(RS, {
                matchId: e
            }) : null
        })
    })
}

function LC({
    router: e,
    children: t,
    ...n
}) {
    e.update({ ...e.options,
        ...n,
        context: { ...e.options.context,
            ...n.context
        }
    });
    const r = SS(),
        i = Q.jsx(r.Provider, {
            value: e,
            children: t
        });
    return e.options.Wrap ? Q.jsx(e.options.Wrap, {
        children: i
    }) : i
}

function OH({
    router: e,
    ...t
}) {
    return Q.jsx(LC, {
        router: e,
        ...t,
        children: Q.jsx(MC, {})
    })
}
var Hs = class {
        constructor() {
            this.listeners = new Set, this.subscribe = this.subscribe.bind(this)
        }
        subscribe(e) {
            return this.listeners.add(e), this.onSubscribe(), () => {
                this.listeners.delete(e), this.onUnsubscribe()
            }
        }
        hasListeners() {
            return this.listeners.size > 0
        }
        onSubscribe() {}
        onUnsubscribe() {}
    },
    Os = typeof window > "u" || "Deno" in globalThis;

function on() {}

function AC(e, t) {
    return typeof e == "function" ? e(t) : e
}

function Bd(e) {
    return typeof e == "number" && e >= 0 && e !== 1 / 0
}

function kS(e, t) {
    return Math.max(e + (t || 0) - Date.now(), 0)
}

function Bg(e, t) {
    const {
        type: n = "all",
        exact: r,
        fetchStatus: i,
        predicate: o,
        queryKey: s,
        stale: a
    } = e;
    if (s) {
        if (r) {
            if (t.queryHash !== Um(s, t.options)) return !1
        } else if (!Xa(t.queryKey, s)) return !1
    }
    if (n !== "all") {
        const u = t.isActive();
        if (n === "active" && !u || n === "inactive" && u) return !1
    }
    return !(typeof a == "boolean" && t.isStale() !== a || i && i !== t.state.fetchStatus || o && !o(t))
}

function jg(e, t) {
    const {
        exact: n,
        status: r,
        predicate: i,
        mutationKey: o
    } = e;
    if (o) {
        if (!t.options.mutationKey) return !1;
        if (n) {
            if (eo(t.options.mutationKey) !== eo(o)) return !1
        } else if (!Xa(t.options.mutationKey, o)) return !1
    }
    return !(r && t.state.status !== r || i && !i(t))
}

function Um(e, t) {
    return ((t == null ? void 0 : t.queryKeyHashFn) || eo)(e)
}

function eo(e) {
    return JSON.stringify(e, (t, n) => jd(n) ? Object.keys(n).sort().reduce((r, i) => (r[i] = n[i], r), {}) : n)
}

function Xa(e, t) {
    return e === t ? !0 : typeof e != typeof t ? !1 : e && t && typeof e == "object" && typeof t == "object" ? !Object.keys(t).some(n => !Xa(e[n], t[n])) : !1
}

function MS(e, t) {
    if (e === t) return e;
    const n = Hg(e) && Hg(t);
    if (n || jd(e) && jd(t)) {
        const r = n ? e : Object.keys(e),
            i = r.length,
            o = n ? t : Object.keys(t),
            s = o.length,
            a = n ? [] : {};
        let u = 0;
        for (let l = 0; l < s; l++) {
            const c = n ? l : o[l];
            !n && e[c] === void 0 && t[c] === void 0 && r.includes(c) ? (a[c] = void 0, u++) : (a[c] = MS(e[c], t[c]), a[c] === e[c] && e[c] !== void 0 && u++)
        }
        return i === s && u === i ? e : a
    }
    return t
}

function lc(e, t) {
    if (!t || Object.keys(e).length !== Object.keys(t).length) return !1;
    for (const n in e)
        if (e[n] !== t[n]) return !1;
    return !0
}

function Hg(e) {
    return Array.isArray(e) && e.length === Object.keys(e).length
}

function jd(e) {
    if (!Ug(e)) return !1;
    const t = e.constructor;
    if (t === void 0) return !0;
    const n = t.prototype;
    return !(!Ug(n) || !n.hasOwnProperty("isPrototypeOf"))
}

function Ug(e) {
    return Object.prototype.toString.call(e) === "[object Object]"
}

function NC(e) {
    return new Promise(t => {
        setTimeout(t, e)
    })
}

function Hd(e, t, n) {
    return typeof n.structuralSharing == "function" ? n.structuralSharing(e, t) : n.structuralSharing !== !1 ? MS(e, t) : t
}

function DC(e, t, n = 0) {
    const r = [...e, t];
    return n && r.length > n ? r.slice(1) : r
}

function FC(e, t, n = 0) {
    const r = [t, ...e];
    return n && r.length > n ? r.slice(0, -1) : r
}
var zm = Symbol(),
    Ii, Dr, Jo, Q_, $C = (Q_ = class extends Hs {
        constructor() {
            super();
            U(this, Ii, void 0);
            U(this, Dr, void 0);
            U(this, Jo, void 0);
            $(this, Jo, t => {
                if (!Os && window.addEventListener) {
                    const n = () => t();
                    return window.addEventListener("visibilitychange", n, !1), () => {
                        window.removeEventListener("visibilitychange", n)
                    }
                }
            })
        }
        onSubscribe() {
            x(this, Dr) || this.setEventListener(x(this, Jo))
        }
        onUnsubscribe() {
            var t;
            this.hasListeners() || ((t = x(this, Dr)) == null || t.call(this), $(this, Dr, void 0))
        }
        setEventListener(t) {
            var n;
            $(this, Jo, t), (n = x(this, Dr)) == null || n.call(this), $(this, Dr, t(r => {
                typeof r == "boolean" ? this.setFocused(r) : this.onFocus()
            }))
        }
        setFocused(t) {
            x(this, Ii) !== t && ($(this, Ii, t), this.onFocus())
        }
        onFocus() {
            const t = this.isFocused();
            this.listeners.forEach(n => {
                n(t)
            })
        }
        isFocused() {
            var t;
            return typeof x(this, Ii) == "boolean" ? x(this, Ii) : ((t = globalThis.document) == null ? void 0 : t.visibilityState) !== "hidden"
        }
    }, Ii = new WeakMap, Dr = new WeakMap, Jo = new WeakMap, Q_),
    Gm = new $C,
    es, Fr, ts, K_, BC = (K_ = class extends Hs {
        constructor() {
            super();
            U(this, es, !0);
            U(this, Fr, void 0);
            U(this, ts, void 0);
            $(this, ts, t => {
                if (!Os && window.addEventListener) {
                    const n = () => t(!0),
                        r = () => t(!1);
                    return window.addEventListener("online", n, !1), window.addEventListener("offline", r, !1), () => {
                        window.removeEventListener("online", n), window.removeEventListener("offline", r)
                    }
                }
            })
        }
        onSubscribe() {
            x(this, Fr) || this.setEventListener(x(this, ts))
        }
        onUnsubscribe() {
            var t;
            this.hasListeners() || ((t = x(this, Fr)) == null || t.call(this), $(this, Fr, void 0))
        }
        setEventListener(t) {
            var n;
            $(this, ts, t), (n = x(this, Fr)) == null || n.call(this), $(this, Fr, t(this.setOnline.bind(this)))
        }
        setOnline(t) {
            x(this, es) !== t && ($(this, es, t), this.listeners.forEach(r => {
                r(t)
            }))
        }
        isOnline() {
            return x(this, es)
        }
    }, es = new WeakMap, Fr = new WeakMap, ts = new WeakMap, K_),
    cc = new BC;

function jC(e) {
    return Math.min(1e3 * 2 ** e, 3e4)
}

function Vm(e) {
    return (e ? ? "online") === "online" ? cc.isOnline() : !0
}
var IS = class {
    constructor(e) {
        this.revert = e == null ? void 0 : e.revert, this.silent = e == null ? void 0 : e.silent
    }
};

function oh(e) {
    return e instanceof IS
}

function LS(e) {
    let t = !1,
        n = 0,
        r = !1,
        i, o, s;
    const a = new Promise((_, g) => {
            o = _, s = g
        }),
        u = _ => {
            var g;
            r || (p(new IS(_)), (g = e.abort) == null || g.call(e))
        },
        l = () => {
            t = !0
        },
        c = () => {
            t = !1
        },
        f = () => !Gm.isFocused() || e.networkMode !== "always" && !cc.isOnline(),
        h = _ => {
            var g;
            r || (r = !0, (g = e.onSuccess) == null || g.call(e, _), i == null || i(), o(_))
        },
        p = _ => {
            var g;
            r || (r = !0, (g = e.onError) == null || g.call(e, _), i == null || i(), s(_))
        },
        y = () => new Promise(_ => {
            var g;
            i = d => {
                const v = r || !f();
                return v && _(d), v
            }, (g = e.onPause) == null || g.call(e)
        }).then(() => {
            var _;
            i = void 0, r || (_ = e.onContinue) == null || _.call(e)
        }),
        m = () => {
            if (r) return;
            let _;
            try {
                _ = e.fn()
            } catch (g) {
                _ = Promise.reject(g)
            }
            Promise.resolve(_).then(h).catch(g => {
                var w;
                if (r) return;
                const d = e.retry ? ? (Os ? 0 : 3),
                    v = e.retryDelay ? ? jC,
                    E = typeof v == "function" ? v(n, g) : v,
                    S = d === !0 || typeof d == "number" && n < d || typeof d == "function" && d(n, g);
                if (t || !S) {
                    p(g);
                    return
                }
                n++, (w = e.onFail) == null || w.call(e, n, g), NC(E).then(() => {
                    if (f()) return y()
                }).then(() => {
                    t ? p(g) : m()
                })
            })
        };
    return Vm(e.networkMode) ? m() : y().then(m), {
        promise: a,
        cancel: u,
        continue: () => (i == null ? void 0 : i()) ? a : Promise.resolve(),
        cancelRetry: l,
        continueRetry: c
    }
}

function HC() {
    let e = [],
        t = 0,
        n = h => {
            h()
        },
        r = h => {
            h()
        },
        i = h => setTimeout(h, 0);
    const o = h => {
            i = h
        },
        s = h => {
            let p;
            t++;
            try {
                p = h()
            } finally {
                t--, t || l()
            }
            return p
        },
        a = h => {
            t ? e.push(h) : i(() => {
                n(h)
            })
        },
        u = h => (...p) => {
            a(() => {
                h(...p)
            })
        },
        l = () => {
            const h = e;
            e = [], h.length && i(() => {
                r(() => {
                    h.forEach(p => {
                        n(p)
                    })
                })
            })
        };
    return {
        batch: s,
        batchCalls: u,
        schedule: a,
        setNotifyFunction: h => {
            n = h
        },
        setBatchNotifyFunction: h => {
            r = h
        },
        setScheduler: o
    }
}
var $e = HC(),
    Li, Y_, AS = (Y_ = class {
        constructor() {
            U(this, Li, void 0)
        }
        destroy() {
            this.clearGcTimeout()
        }
        scheduleGc() {
            this.clearGcTimeout(), Bd(this.gcTime) && $(this, Li, setTimeout(() => {
                this.optionalRemove()
            }, this.gcTime))
        }
        updateGcTime(e) {
            this.gcTime = Math.max(this.gcTime || 0, e ? ? (Os ? 1 / 0 : 5 * 60 * 1e3))
        }
        clearGcTimeout() {
            x(this, Li) && (clearTimeout(x(this, Li)), $(this, Li, void 0))
        }
    }, Li = new WeakMap, Y_),
    ns, rs, nn, lt, He, ou, Ai, Tn, tr, Z_, UC = (Z_ = class extends AS {
        constructor(t) {
            super();
            U(this, Tn);
            U(this, ns, void 0);
            U(this, rs, void 0);
            U(this, nn, void 0);
            U(this, lt, void 0);
            U(this, He, void 0);
            U(this, ou, void 0);
            U(this, Ai, void 0);
            $(this, Ai, !1), $(this, ou, t.defaultOptions), this.setOptions(t.options), $(this, He, []), $(this, nn, t.cache), this.queryKey = t.queryKey, this.queryHash = t.queryHash, $(this, ns, t.state || zC(this.options)), this.state = x(this, ns), this.scheduleGc()
        }
        get meta() {
            return this.options.meta
        }
        setOptions(t) {
            this.options = { ...x(this, ou),
                ...t
            }, this.updateGcTime(this.options.gcTime)
        }
        optionalRemove() {
            !x(this, He).length && this.state.fetchStatus === "idle" && x(this, nn).remove(this)
        }
        setData(t, n) {
            const r = Hd(this.state.data, t, this.options);
            return K(this, Tn, tr).call(this, {
                data: r,
                type: "success",
                dataUpdatedAt: n == null ? void 0 : n.updatedAt,
                manual: n == null ? void 0 : n.manual
            }), r
        }
        setState(t, n) {
            K(this, Tn, tr).call(this, {
                type: "setState",
                state: t,
                setStateOptions: n
            })
        }
        cancel(t) {
            var r, i;
            const n = (r = x(this, lt)) == null ? void 0 : r.promise;
            return (i = x(this, lt)) == null || i.cancel(t), n ? n.then(on).catch(on) : Promise.resolve()
        }
        destroy() {
            super.destroy(), this.cancel({
                silent: !0
            })
        }
        reset() {
            this.destroy(), this.setState(x(this, ns))
        }
        isActive() {
            return x(this, He).some(t => t.options.enabled !== !1)
        }
        isDisabled() {
            return this.getObserversCount() > 0 && !this.isActive()
        }
        isStale() {
            return this.state.isInvalidated ? !0 : this.getObserversCount() > 0 ? x(this, He).some(t => t.getCurrentResult().isStale) : this.state.data === void 0
        }
        isStaleByTime(t = 0) {
            return this.state.isInvalidated || this.state.data === void 0 || !kS(this.state.dataUpdatedAt, t)
        }
        onFocus() {
            var n;
            const t = x(this, He).find(r => r.shouldFetchOnWindowFocus());
            t == null || t.refetch({
                cancelRefetch: !1
            }), (n = x(this, lt)) == null || n.continue()
        }
        onOnline() {
            var n;
            const t = x(this, He).find(r => r.shouldFetchOnReconnect());
            t == null || t.refetch({
                cancelRefetch: !1
            }), (n = x(this, lt)) == null || n.continue()
        }
        addObserver(t) {
            x(this, He).includes(t) || (x(this, He).push(t), this.clearGcTimeout(), x(this, nn).notify({
                type: "observerAdded",
                query: this,
                observer: t
            }))
        }
        removeObserver(t) {
            x(this, He).includes(t) && ($(this, He, x(this, He).filter(n => n !== t)), x(this, He).length || (x(this, lt) && (x(this, Ai) ? x(this, lt).cancel({
                revert: !0
            }) : x(this, lt).cancelRetry()), this.scheduleGc()), x(this, nn).notify({
                type: "observerRemoved",
                query: this,
                observer: t
            }))
        }
        getObserversCount() {
            return x(this, He).length
        }
        invalidate() {
            this.state.isInvalidated || K(this, Tn, tr).call(this, {
                type: "invalidate"
            })
        }
        fetch(t, n) {
            var l, c, f;
            if (this.state.fetchStatus !== "idle") {
                if (this.state.data !== void 0 && (n != null && n.cancelRefetch)) this.cancel({
                    silent: !0
                });
                else if (x(this, lt)) return x(this, lt).continueRetry(), x(this, lt).promise
            }
            if (t && this.setOptions(t), !this.options.queryFn) {
                const h = x(this, He).find(p => p.options.queryFn);
                h && this.setOptions(h.options)
            }
            const r = new AbortController,
                i = {
                    queryKey: this.queryKey,
                    meta: this.meta
                },
                o = h => {
                    Object.defineProperty(h, "signal", {
                        enumerable: !0,
                        get: () => ($(this, Ai, !0), r.signal)
                    })
                };
            o(i);
            const s = () => !this.options.queryFn || this.options.queryFn === zm ? Promise.reject(new Error(`Missing queryFn: '${this.options.queryHash}'`)) : ($(this, Ai, !1), this.options.persister ? this.options.persister(this.options.queryFn, i, this) : this.options.queryFn(i)),
                a = {
                    fetchOptions: n,
                    options: this.options,
                    queryKey: this.queryKey,
                    state: this.state,
                    fetchFn: s
                };
            o(a), (l = this.options.behavior) == null || l.onFetch(a, this), $(this, rs, this.state), (this.state.fetchStatus === "idle" || this.state.fetchMeta !== ((c = a.fetchOptions) == null ? void 0 : c.meta)) && K(this, Tn, tr).call(this, {
                type: "fetch",
                meta: (f = a.fetchOptions) == null ? void 0 : f.meta
            });
            const u = h => {
                var p, y, m, _;
                oh(h) && h.silent || K(this, Tn, tr).call(this, {
                    type: "error",
                    error: h
                }), oh(h) || ((y = (p = x(this, nn).config).onError) == null || y.call(p, h, this), (_ = (m = x(this, nn).config).onSettled) == null || _.call(m, this.state.data, h, this)), this.isFetchingOptimistic || this.scheduleGc(), this.isFetchingOptimistic = !1
            };
            return $(this, lt, LS({
                fn: a.fetchFn,
                abort: r.abort.bind(r),
                onSuccess: h => {
                    var p, y, m, _;
                    if (h === void 0) {
                        u(new Error(`${this.queryHash} data is undefined`));
                        return
                    }
                    this.setData(h), (y = (p = x(this, nn).config).onSuccess) == null || y.call(p, h, this), (_ = (m = x(this, nn).config).onSettled) == null || _.call(m, h, this.state.error, this), this.isFetchingOptimistic || this.scheduleGc(), this.isFetchingOptimistic = !1
                },
                onError: u,
                onFail: (h, p) => {
                    K(this, Tn, tr).call(this, {
                        type: "failed",
                        failureCount: h,
                        error: p
                    })
                },
                onPause: () => {
                    K(this, Tn, tr).call(this, {
                        type: "pause"
                    })
                },
                onContinue: () => {
                    K(this, Tn, tr).call(this, {
                        type: "continue"
                    })
                },
                retry: a.options.retry,
                retryDelay: a.options.retryDelay,
                networkMode: a.options.networkMode
            })), x(this, lt).promise
        }
    }, ns = new WeakMap, rs = new WeakMap, nn = new WeakMap, lt = new WeakMap, He = new WeakMap, ou = new WeakMap, Ai = new WeakMap, Tn = new WeakSet, tr = function(t) {
        const n = r => {
            switch (t.type) {
                case "failed":
                    return { ...r,
                        fetchFailureCount: t.failureCount,
                        fetchFailureReason: t.error
                    };
                case "pause":
                    return { ...r,
                        fetchStatus: "paused"
                    };
                case "continue":
                    return { ...r,
                        fetchStatus: "fetching"
                    };
                case "fetch":
                    return { ...r,
                        ...NS(r.data, this.options),
                        fetchMeta: t.meta ? ? null
                    };
                case "success":
                    return { ...r,
                        data: t.data,
                        dataUpdateCount: r.dataUpdateCount + 1,
                        dataUpdatedAt: t.dataUpdatedAt ? ? Date.now(),
                        error: null,
                        isInvalidated: !1,
                        status: "success",
                        ...!t.manual && {
                            fetchStatus: "idle",
                            fetchFailureCount: 0,
                            fetchFailureReason: null
                        }
                    };
                case "error":
                    const i = t.error;
                    return oh(i) && i.revert && x(this, rs) ? { ...x(this, rs),
                        fetchStatus: "idle"
                    } : { ...r,
                        error: i,
                        errorUpdateCount: r.errorUpdateCount + 1,
                        errorUpdatedAt: Date.now(),
                        fetchFailureCount: r.fetchFailureCount + 1,
                        fetchFailureReason: i,
                        fetchStatus: "idle",
                        status: "error"
                    };
                case "invalidate":
                    return { ...r,
                        isInvalidated: !0
                    };
                case "setState":
                    return { ...r,
                        ...t.state
                    }
            }
        };
        this.state = n(this.state), $e.batch(() => {
            x(this, He).forEach(r => {
                r.onQueryUpdate()
            }), x(this, nn).notify({
                query: this,
                type: "updated",
                action: t
            })
        })
    }, Z_);

function NS(e, t) {
    return {
        fetchFailureCount: 0,
        fetchFailureReason: null,
        fetchStatus: Vm(t.networkMode) ? "fetching" : "paused",
        ...e === void 0 && {
            error: null,
            status: "pending"
        }
    }
}

function zC(e) {
    const t = typeof e.initialData == "function" ? e.initialData() : e.initialData,
        n = t !== void 0,
        r = n ? typeof e.initialDataUpdatedAt == "function" ? e.initialDataUpdatedAt() : e.initialDataUpdatedAt : 0;
    return {
        data: t,
        dataUpdateCount: 0,
        dataUpdatedAt: n ? r ? ? Date.now() : 0,
        error: null,
        errorUpdateCount: 0,
        errorUpdatedAt: 0,
        fetchFailureCount: 0,
        fetchFailureReason: null,
        fetchMeta: null,
        isInvalidated: !1,
        status: n ? "success" : "pending",
        fetchStatus: "idle"
    }
}
var jn, J_, GC = (J_ = class extends Hs {
        constructor(t = {}) {
            super();
            U(this, jn, void 0);
            this.config = t, $(this, jn, new Map)
        }
        build(t, n, r) {
            const i = n.queryKey,
                o = n.queryHash ? ? Um(i, n);
            let s = this.get(o);
            return s || (s = new UC({
                cache: this,
                queryKey: i,
                queryHash: o,
                options: t.defaultQueryOptions(n),
                state: r,
                defaultOptions: t.getQueryDefaults(i)
            }), this.add(s)), s
        }
        add(t) {
            x(this, jn).has(t.queryHash) || (x(this, jn).set(t.queryHash, t), this.notify({
                type: "added",
                query: t
            }))
        }
        remove(t) {
            const n = x(this, jn).get(t.queryHash);
            n && (t.destroy(), n === t && x(this, jn).delete(t.queryHash), this.notify({
                type: "removed",
                query: t
            }))
        }
        clear() {
            $e.batch(() => {
                this.getAll().forEach(t => {
                    this.remove(t)
                })
            })
        }
        get(t) {
            return x(this, jn).get(t)
        }
        getAll() {
            return [...x(this, jn).values()]
        }
        find(t) {
            const n = {
                exact: !0,
                ...t
            };
            return this.getAll().find(r => Bg(n, r))
        }
        findAll(t = {}) {
            const n = this.getAll();
            return Object.keys(t).length > 0 ? n.filter(r => Bg(t, r)) : n
        }
        notify(t) {
            $e.batch(() => {
                this.listeners.forEach(n => {
                    n(t)
                })
            })
        }
        onFocus() {
            $e.batch(() => {
                this.getAll().forEach(t => {
                    t.onFocus()
                })
            })
        }
        onOnline() {
            $e.batch(() => {
                this.getAll().forEach(t => {
                    t.onOnline()
                })
            })
        }
    }, jn = new WeakMap, J_),
    Hn, su, $t, is, Un, br, e1, VC = (e1 = class extends AS {
        constructor(t) {
            super();
            U(this, Un);
            U(this, Hn, void 0);
            U(this, su, void 0);
            U(this, $t, void 0);
            U(this, is, void 0);
            this.mutationId = t.mutationId, $(this, su, t.defaultOptions), $(this, $t, t.mutationCache), $(this, Hn, []), this.state = t.state || DS(), this.setOptions(t.options), this.scheduleGc()
        }
        setOptions(t) {
            this.options = { ...x(this, su),
                ...t
            }, this.updateGcTime(this.options.gcTime)
        }
        get meta() {
            return this.options.meta
        }
        addObserver(t) {
            x(this, Hn).includes(t) || (x(this, Hn).push(t), this.clearGcTimeout(), x(this, $t).notify({
                type: "observerAdded",
                mutation: this,
                observer: t
            }))
        }
        removeObserver(t) {
            $(this, Hn, x(this, Hn).filter(n => n !== t)), this.scheduleGc(), x(this, $t).notify({
                type: "observerRemoved",
                mutation: this,
                observer: t
            })
        }
        optionalRemove() {
            x(this, Hn).length || (this.state.status === "pending" ? this.scheduleGc() : x(this, $t).remove(this))
        }
        continue () {
            var t;
            return ((t = x(this, is)) == null ? void 0 : t.continue()) ? ? this.execute(this.state.variables)
        }
        async execute(t) {
            var i, o, s, a, u, l, c, f, h, p, y, m, _, g, d, v, E, S, w, T;
            const n = () => ($(this, is, LS({
                    fn: () => this.options.mutationFn ? this.options.mutationFn(t) : Promise.reject(new Error("No mutationFn found")),
                    onFail: (O, b) => {
                        K(this, Un, br).call(this, {
                            type: "failed",
                            failureCount: O,
                            error: b
                        })
                    },
                    onPause: () => {
                        K(this, Un, br).call(this, {
                            type: "pause"
                        })
                    },
                    onContinue: () => {
                        K(this, Un, br).call(this, {
                            type: "continue"
                        })
                    },
                    retry: this.options.retry ? ? 0,
                    retryDelay: this.options.retryDelay,
                    networkMode: this.options.networkMode
                })), x(this, is).promise),
                r = this.state.status === "pending";
            try {
                if (!r) {
                    K(this, Un, br).call(this, {
                        type: "pending",
                        variables: t
                    }), await ((o = (i = x(this, $t).config).onMutate) == null ? void 0 : o.call(i, t, this));
                    const b = await ((a = (s = this.options).onMutate) == null ? void 0 : a.call(s, t));
                    b !== this.state.context && K(this, Un, br).call(this, {
                        type: "pending",
                        context: b,
                        variables: t
                    })
                }
                const O = await n();
                return await ((l = (u = x(this, $t).config).onSuccess) == null ? void 0 : l.call(u, O, t, this.state.context, this)), await ((f = (c = this.options).onSuccess) == null ? void 0 : f.call(c, O, t, this.state.context)), await ((p = (h = x(this, $t).config).onSettled) == null ? void 0 : p.call(h, O, null, this.state.variables, this.state.context, this)), await ((m = (y = this.options).onSettled) == null ? void 0 : m.call(y, O, null, t, this.state.context)), K(this, Un, br).call(this, {
                    type: "success",
                    data: O
                }), O
            } catch (O) {
                try {
                    throw await ((g = (_ = x(this, $t).config).onError) == null ? void 0 : g.call(_, O, t, this.state.context, this)), await ((v = (d = this.options).onError) == null ? void 0 : v.call(d, O, t, this.state.context)), await ((S = (E = x(this, $t).config).onSettled) == null ? void 0 : S.call(E, void 0, O, this.state.variables, this.state.context, this)), await ((T = (w = this.options).onSettled) == null ? void 0 : T.call(w, void 0, O, t, this.state.context)), O
                } finally {
                    K(this, Un, br).call(this, {
                        type: "error",
                        error: O
                    })
                }
            }
        }
    }, Hn = new WeakMap, su = new WeakMap, $t = new WeakMap, is = new WeakMap, Un = new WeakSet, br = function(t) {
        const n = r => {
            switch (t.type) {
                case "failed":
                    return { ...r,
                        failureCount: t.failureCount,
                        failureReason: t.error
                    };
                case "pause":
                    return { ...r,
                        isPaused: !0
                    };
                case "continue":
                    return { ...r,
                        isPaused: !1
                    };
                case "pending":
                    return { ...r,
                        context: t.context,
                        data: void 0,
                        failureCount: 0,
                        failureReason: null,
                        error: null,
                        isPaused: !Vm(this.options.networkMode),
                        status: "pending",
                        variables: t.variables,
                        submittedAt: Date.now()
                    };
                case "success":
                    return { ...r,
                        data: t.data,
                        failureCount: 0,
                        failureReason: null,
                        error: null,
                        status: "success",
                        isPaused: !1
                    };
                case "error":
                    return { ...r,
                        data: void 0,
                        error: t.error,
                        failureCount: r.failureCount + 1,
                        failureReason: t.error,
                        isPaused: !1,
                        status: "error"
                    }
            }
        };
        this.state = n(this.state), $e.batch(() => {
            x(this, Hn).forEach(r => {
                r.onMutationUpdate(t)
            }), x(this, $t).notify({
                mutation: this,
                type: "updated",
                action: t
            })
        })
    }, e1);

function DS() {
    return {
        context: void 0,
        data: void 0,
        error: null,
        failureCount: 0,
        failureReason: null,
        isPaused: !1,
        status: "idle",
        variables: void 0,
        submittedAt: 0
    }
}
var rn, au, Ni, t1, WC = (t1 = class extends Hs {
    constructor(t = {}) {
        super();
        U(this, rn, void 0);
        U(this, au, void 0);
        U(this, Ni, void 0);
        this.config = t, $(this, rn, []), $(this, au, 0)
    }
    build(t, n, r) {
        const i = new VC({
            mutationCache: this,
            mutationId: ++Du(this, au)._,
            options: t.defaultMutationOptions(n),
            state: r
        });
        return this.add(i), i
    }
    add(t) {
        x(this, rn).push(t), this.notify({
            type: "added",
            mutation: t
        })
    }
    remove(t) {
        $(this, rn, x(this, rn).filter(n => n !== t)), this.notify({
            type: "removed",
            mutation: t
        })
    }
    clear() {
        $e.batch(() => {
            x(this, rn).forEach(t => {
                this.remove(t)
            })
        })
    }
    getAll() {
        return x(this, rn)
    }
    find(t) {
        const n = {
            exact: !0,
            ...t
        };
        return x(this, rn).find(r => jg(n, r))
    }
    findAll(t = {}) {
        return x(this, rn).filter(n => jg(t, n))
    }
    notify(t) {
        $e.batch(() => {
            this.listeners.forEach(n => {
                n(t)
            })
        })
    }
    resumePausedMutations() {
        return $(this, Ni, (x(this, Ni) ? ? Promise.resolve()).then(() => {
            const t = x(this, rn).filter(n => n.state.isPaused);
            return $e.batch(() => t.reduce((n, r) => n.then(() => r.continue().catch(on)), Promise.resolve()))
        }).then(() => {
            $(this, Ni, void 0)
        })), x(this, Ni)
    }
}, rn = new WeakMap, au = new WeakMap, Ni = new WeakMap, t1);

function Ud(e) {
    return {
        onFetch: (t, n) => {
            const r = async () => {
                var y, m, _, g, d;
                const i = t.options,
                    o = (_ = (m = (y = t.fetchOptions) == null ? void 0 : y.meta) == null ? void 0 : m.fetchMore) == null ? void 0 : _.direction,
                    s = ((g = t.state.data) == null ? void 0 : g.pages) || [],
                    a = ((d = t.state.data) == null ? void 0 : d.pageParams) || [],
                    u = {
                        pages: [],
                        pageParams: []
                    };
                let l = !1;
                const c = v => {
                        Object.defineProperty(v, "signal", {
                            enumerable: !0,
                            get: () => (t.signal.aborted ? l = !0 : t.signal.addEventListener("abort", () => {
                                l = !0
                            }), t.signal)
                        })
                    },
                    f = t.options.queryFn && t.options.queryFn !== zm ? t.options.queryFn : () => Promise.reject(new Error(`Missing queryFn: '${t.options.queryHash}'`)),
                    h = async (v, E, S) => {
                        if (l) return Promise.reject();
                        if (E == null && v.pages.length) return Promise.resolve(v);
                        const w = {
                            queryKey: t.queryKey,
                            pageParam: E,
                            direction: S ? "backward" : "forward",
                            meta: t.options.meta
                        };
                        c(w);
                        const T = await f(w),
                            {
                                maxPages: O
                            } = t.options,
                            b = S ? FC : DC;
                        return {
                            pages: b(v.pages, T, O),
                            pageParams: b(v.pageParams, E, O)
                        }
                    };
                let p;
                if (o && s.length) {
                    const v = o === "backward",
                        E = v ? FS : zd,
                        S = {
                            pages: s,
                            pageParams: a
                        },
                        w = E(i, S);
                    p = await h(S, w, v)
                } else {
                    p = await h(u, a[0] ? ? i.initialPageParam);
                    const v = e ? ? s.length;
                    for (let E = 1; E < v; E++) {
                        const S = zd(i, p);
                        p = await h(p, S)
                    }
                }
                return p
            };
            t.options.persister ? t.fetchFn = () => {
                var i, o;
                return (o = (i = t.options).persister) == null ? void 0 : o.call(i, r, {
                    queryKey: t.queryKey,
                    meta: t.options.meta,
                    signal: t.signal
                }, n)
            } : t.fetchFn = r
        }
    }
}

function zd(e, {
    pages: t,
    pageParams: n
}) {
    const r = t.length - 1;
    return e.getNextPageParam(t[r], t, n[r], n)
}

function FS(e, {
    pages: t,
    pageParams: n
}) {
    var r;
    return (r = e.getPreviousPageParam) == null ? void 0 : r.call(e, t[0], t, n[0], n)
}

function qC(e, t) {
    return t ? zd(e, t) != null : !1
}

function XC(e, t) {
    return !t || !e.getPreviousPageParam ? !1 : FS(e, t) != null
}
var Re, $r, Br, os, ss, jr, as, us, n1, bH = (n1 = class {
        constructor(e = {}) {
            U(this, Re, void 0);
            U(this, $r, void 0);
            U(this, Br, void 0);
            U(this, os, void 0);
            U(this, ss, void 0);
            U(this, jr, void 0);
            U(this, as, void 0);
            U(this, us, void 0);
            $(this, Re, e.queryCache || new GC), $(this, $r, e.mutationCache || new WC), $(this, Br, e.defaultOptions || {}), $(this, os, new Map), $(this, ss, new Map), $(this, jr, 0)
        }
        mount() {
            Du(this, jr)._++, x(this, jr) === 1 && ($(this, as, Gm.subscribe(async e => {
                e && (await this.resumePausedMutations(), x(this, Re).onFocus())
            })), $(this, us, cc.subscribe(async e => {
                e && (await this.resumePausedMutations(), x(this, Re).onOnline())
            })))
        }
        unmount() {
            var e, t;
            Du(this, jr)._--, x(this, jr) === 0 && ((e = x(this, as)) == null || e.call(this), $(this, as, void 0), (t = x(this, us)) == null || t.call(this), $(this, us, void 0))
        }
        isFetching(e) {
            return x(this, Re).findAll({ ...e,
                fetchStatus: "fetching"
            }).length
        }
        isMutating(e) {
            return x(this, $r).findAll({ ...e,
                status: "pending"
            }).length
        }
        getQueryData(e) {
            var n;
            const t = this.defaultQueryOptions({
                queryKey: e
            });
            return (n = x(this, Re).get(t.queryHash)) == null ? void 0 : n.state.data
        }
        ensureQueryData(e) {
            const t = this.getQueryData(e.queryKey);
            if (t === void 0) return this.fetchQuery(e); {
                const n = this.defaultQueryOptions(e),
                    r = x(this, Re).build(this, n);
                return e.revalidateIfStale && r.isStaleByTime(n.staleTime) && this.prefetchQuery(n), Promise.resolve(t)
            }
        }
        getQueriesData(e) {
            return x(this, Re).findAll(e).map(({
                queryKey: t,
                state: n
            }) => {
                const r = n.data;
                return [t, r]
            })
        }
        setQueryData(e, t, n) {
            const r = this.defaultQueryOptions({
                    queryKey: e
                }),
                i = x(this, Re).get(r.queryHash),
                o = i == null ? void 0 : i.state.data,
                s = AC(t, o);
            if (s !== void 0) return x(this, Re).build(this, r).setData(s, { ...n,
                manual: !0
            })
        }
        setQueriesData(e, t, n) {
            return $e.batch(() => x(this, Re).findAll(e).map(({
                queryKey: r
            }) => [r, this.setQueryData(r, t, n)]))
        }
        getQueryState(e) {
            var n;
            const t = this.defaultQueryOptions({
                queryKey: e
            });
            return (n = x(this, Re).get(t.queryHash)) == null ? void 0 : n.state
        }
        removeQueries(e) {
            const t = x(this, Re);
            $e.batch(() => {
                t.findAll(e).forEach(n => {
                    t.remove(n)
                })
            })
        }
        resetQueries(e, t) {
            const n = x(this, Re),
                r = {
                    type: "active",
                    ...e
                };
            return $e.batch(() => (n.findAll(e).forEach(i => {
                i.reset()
            }), this.refetchQueries(r, t)))
        }
        cancelQueries(e = {}, t = {}) {
            const n = {
                    revert: !0,
                    ...t
                },
                r = $e.batch(() => x(this, Re).findAll(e).map(i => i.cancel(n)));
            return Promise.all(r).then(on).catch(on)
        }
        invalidateQueries(e = {}, t = {}) {
            return $e.batch(() => {
                if (x(this, Re).findAll(e).forEach(r => {
                        r.invalidate()
                    }), e.refetchType === "none") return Promise.resolve();
                const n = { ...e,
                    type: e.refetchType ? ? e.type ? ? "active"
                };
                return this.refetchQueries(n, t)
            })
        }
        refetchQueries(e = {}, t) {
            const n = { ...t,
                    cancelRefetch: (t == null ? void 0 : t.cancelRefetch) ? ? !0
                },
                r = $e.batch(() => x(this, Re).findAll(e).filter(i => !i.isDisabled()).map(i => {
                    let o = i.fetch(void 0, n);
                    return n.throwOnError || (o = o.catch(on)), i.state.fetchStatus === "paused" ? Promise.resolve() : o
                }));
            return Promise.all(r).then(on)
        }
        fetchQuery(e) {
            const t = this.defaultQueryOptions(e);
            t.retry === void 0 && (t.retry = !1);
            const n = x(this, Re).build(this, t);
            return n.isStaleByTime(t.staleTime) ? n.fetch(t) : Promise.resolve(n.state.data)
        }
        prefetchQuery(e) {
            return this.fetchQuery(e).then(on).catch(on)
        }
        fetchInfiniteQuery(e) {
            return e.behavior = Ud(e.pages), this.fetchQuery(e)
        }
        prefetchInfiniteQuery(e) {
            return this.fetchInfiniteQuery(e).then(on).catch(on)
        }
        resumePausedMutations() {
            return cc.isOnline() ? x(this, $r).resumePausedMutations() : Promise.resolve()
        }
        getQueryCache() {
            return x(this, Re)
        }
        getMutationCache() {
            return x(this, $r)
        }
        getDefaultOptions() {
            return x(this, Br)
        }
        setDefaultOptions(e) {
            $(this, Br, e)
        }
        setQueryDefaults(e, t) {
            x(this, os).set(eo(e), {
                queryKey: e,
                defaultOptions: t
            })
        }
        getQueryDefaults(e) {
            const t = [...x(this, os).values()];
            let n = {};
            return t.forEach(r => {
                Xa(e, r.queryKey) && (n = { ...n,
                    ...r.defaultOptions
                })
            }), n
        }
        setMutationDefaults(e, t) {
            x(this, ss).set(eo(e), {
                mutationKey: e,
                defaultOptions: t
            })
        }
        getMutationDefaults(e) {
            const t = [...x(this, ss).values()];
            let n = {};
            return t.forEach(r => {
                Xa(e, r.mutationKey) && (n = { ...n,
                    ...r.defaultOptions
                })
            }), n
        }
        defaultQueryOptions(e) {
            if (e._defaulted) return e;
            const t = { ...x(this, Br).queries,
                ...this.getQueryDefaults(e.queryKey),
                ...e,
                _defaulted: !0
            };
            return t.queryHash || (t.queryHash = Um(t.queryKey, t)), t.refetchOnReconnect === void 0 && (t.refetchOnReconnect = t.networkMode !== "always"), t.throwOnError === void 0 && (t.throwOnError = !!t.suspense), !t.networkMode && t.persister && (t.networkMode = "offlineFirst"), t.enabled !== !0 && t.queryFn === zm && (t.enabled = !1), t
        }
        defaultMutationOptions(e) {
            return e != null && e._defaulted ? e : { ...x(this, Br).mutations,
                ...(e == null ? void 0 : e.mutationKey) && this.getMutationDefaults(e.mutationKey),
                ...e,
                _defaulted: !0
            }
        }
        clear() {
            x(this, Re).clear(), x(this, $r).clear()
        }
    }, Re = new WeakMap, $r = new WeakMap, Br = new WeakMap, os = new WeakMap, ss = new WeakMap, jr = new WeakMap, as = new WeakMap, us = new WeakMap, n1),
    _t, he, uu, ct, Di, ls, zn, lu, cs, fs, Fi, $i, Hr, hs, Bi, da, cu, Gd, fu, Vd, hu, Wd, du, qd, pu, Xd, mu, Qd, vu, Kd, Tc, BS, r1, $S = (r1 = class extends Hs {
        constructor(t, n) {
            super();
            U(this, Bi);
            U(this, cu);
            U(this, fu);
            U(this, hu);
            U(this, du);
            U(this, pu);
            U(this, mu);
            U(this, vu);
            U(this, Tc);
            U(this, _t, void 0);
            U(this, he, void 0);
            U(this, uu, void 0);
            U(this, ct, void 0);
            U(this, Di, void 0);
            U(this, ls, void 0);
            U(this, zn, void 0);
            U(this, lu, void 0);
            U(this, cs, void 0);
            U(this, fs, void 0);
            U(this, Fi, void 0);
            U(this, $i, void 0);
            U(this, Hr, void 0);
            U(this, hs, new Set);
            this.options = n, $(this, _t, t), $(this, zn, null), this.bindMethods(), this.setOptions(n)
        }
        bindMethods() {
            this.refetch = this.refetch.bind(this)
        }
        onSubscribe() {
            this.listeners.size === 1 && (x(this, he).addObserver(this), zg(x(this, he), this.options) ? K(this, Bi, da).call(this) : this.updateResult(), K(this, du, qd).call(this))
        }
        onUnsubscribe() {
            this.hasListeners() || this.destroy()
        }
        shouldFetchOnReconnect() {
            return Yd(x(this, he), this.options, this.options.refetchOnReconnect)
        }
        shouldFetchOnWindowFocus() {
            return Yd(x(this, he), this.options, this.options.refetchOnWindowFocus)
        }
        destroy() {
            this.listeners = new Set, K(this, pu, Xd).call(this), K(this, mu, Qd).call(this), x(this, he).removeObserver(this)
        }
        setOptions(t, n) {
            const r = this.options,
                i = x(this, he);
            if (this.options = x(this, _t).defaultQueryOptions(t), this.options.enabled !== void 0 && typeof this.options.enabled != "boolean") throw new Error("Expected enabled to be a boolean");
            K(this, vu, Kd).call(this), x(this, he).setOptions(this.options), r._defaulted && !lc(this.options, r) && x(this, _t).getQueryCache().notify({
                type: "observerOptionsUpdated",
                query: x(this, he),
                observer: this
            });
            const o = this.hasListeners();
            o && Gg(x(this, he), i, this.options, r) && K(this, Bi, da).call(this), this.updateResult(n), o && (x(this, he) !== i || this.options.enabled !== r.enabled || this.options.staleTime !== r.staleTime) && K(this, cu, Gd).call(this);
            const s = K(this, fu, Vd).call(this);
            o && (x(this, he) !== i || this.options.enabled !== r.enabled || s !== x(this, Hr)) && K(this, hu, Wd).call(this, s)
        }
        getOptimisticResult(t) {
            const n = x(this, _t).getQueryCache().build(x(this, _t), t),
                r = this.createResult(n, t);
            return KC(this, r) && ($(this, ct, r), $(this, ls, this.options), $(this, Di, x(this, he).state)), r
        }
        getCurrentResult() {
            return x(this, ct)
        }
        trackResult(t, n) {
            const r = {};
            return Object.keys(t).forEach(i => {
                Object.defineProperty(r, i, {
                    configurable: !1,
                    enumerable: !0,
                    get: () => (this.trackProp(i), n == null || n(i), t[i])
                })
            }), r
        }
        trackProp(t) {
            x(this, hs).add(t)
        }
        getCurrentQuery() {
            return x(this, he)
        }
        refetch({ ...t
        } = {}) {
            return this.fetch({ ...t
            })
        }
        fetchOptimistic(t) {
            const n = x(this, _t).defaultQueryOptions(t),
                r = x(this, _t).getQueryCache().build(x(this, _t), n);
            return r.isFetchingOptimistic = !0, r.fetch().then(() => this.createResult(r, n))
        }
        fetch(t) {
            return K(this, Bi, da).call(this, { ...t,
                cancelRefetch: t.cancelRefetch ? ? !0
            }).then(() => (this.updateResult(), x(this, ct)))
        }
        createResult(t, n) {
            var T;
            const r = x(this, he),
                i = this.options,
                o = x(this, ct),
                s = x(this, Di),
                a = x(this, ls),
                l = t !== r ? t.state : x(this, uu),
                {
                    state: c
                } = t;
            let f = { ...c
                },
                h = !1,
                p;
            if (n._optimisticResults) {
                const O = this.hasListeners(),
                    b = !O && zg(t, n),
                    I = O && Gg(t, r, n, i);
                (b || I) && (f = { ...f,
                    ...NS(c.data, t.options)
                }), n._optimisticResults === "isRestoring" && (f.fetchStatus = "idle")
            }
            let {
                error: y,
                errorUpdatedAt: m,
                status: _
            } = f;
            if (n.select && f.data !== void 0)
                if (o && f.data === (s == null ? void 0 : s.data) && n.select === x(this, lu)) p = x(this, cs);
                else try {
                    $(this, lu, n.select), p = n.select(f.data), p = Hd(o == null ? void 0 : o.data, p, n), $(this, cs, p), $(this, zn, null)
                } catch (O) {
                    $(this, zn, O)
                } else p = f.data;
            if (n.placeholderData !== void 0 && p === void 0 && _ === "pending") {
                let O;
                if (o != null && o.isPlaceholderData && n.placeholderData === (a == null ? void 0 : a.placeholderData)) O = o.data;
                else if (O = typeof n.placeholderData == "function" ? n.placeholderData((T = x(this, fs)) == null ? void 0 : T.state.data, x(this, fs)) : n.placeholderData, n.select && O !== void 0) try {
                    O = n.select(O), $(this, zn, null)
                } catch (b) {
                    $(this, zn, b)
                }
                O !== void 0 && (_ = "success", p = Hd(o == null ? void 0 : o.data, O, n), h = !0)
            }
            x(this, zn) && (y = x(this, zn), p = x(this, cs), m = Date.now(), _ = "error");
            const g = f.fetchStatus === "fetching",
                d = _ === "pending",
                v = _ === "error",
                E = d && g,
                S = p !== void 0;
            return {
                status: _,
                fetchStatus: f.fetchStatus,
                isPending: d,
                isSuccess: _ === "success",
                isError: v,
                isInitialLoading: E,
                isLoading: E,
                data: p,
                dataUpdatedAt: f.dataUpdatedAt,
                error: y,
                errorUpdatedAt: m,
                failureCount: f.fetchFailureCount,
                failureReason: f.fetchFailureReason,
                errorUpdateCount: f.errorUpdateCount,
                isFetched: f.dataUpdateCount > 0 || f.errorUpdateCount > 0,
                isFetchedAfterMount: f.dataUpdateCount > l.dataUpdateCount || f.errorUpdateCount > l.errorUpdateCount,
                isFetching: g,
                isRefetching: g && !d,
                isLoadingError: v && !S,
                isPaused: f.fetchStatus === "paused",
                isPlaceholderData: h,
                isRefetchError: v && S,
                isStale: Wm(t, n),
                refetch: this.refetch
            }
        }
        updateResult(t) {
            const n = x(this, ct),
                r = this.createResult(x(this, he), this.options);
            if ($(this, Di, x(this, he).state), $(this, ls, this.options), x(this, Di).data !== void 0 && $(this, fs, x(this, he)), lc(r, n)) return;
            $(this, ct, r);
            const i = {},
                o = () => {
                    if (!n) return !0;
                    const {
                        notifyOnChangeProps: s
                    } = this.options, a = typeof s == "function" ? s() : s;
                    if (a === "all" || !a && !x(this, hs).size) return !0;
                    const u = new Set(a ? ? x(this, hs));
                    return this.options.throwOnError && u.add("error"), Object.keys(x(this, ct)).some(l => {
                        const c = l;
                        return x(this, ct)[c] !== n[c] && u.has(c)
                    })
                };
            (t == null ? void 0 : t.listeners) !== !1 && o() && (i.listeners = !0), K(this, Tc, BS).call(this, { ...i,
                ...t
            })
        }
        onQueryUpdate() {
            this.updateResult(), this.hasListeners() && K(this, du, qd).call(this)
        }
    }, _t = new WeakMap, he = new WeakMap, uu = new WeakMap, ct = new WeakMap, Di = new WeakMap, ls = new WeakMap, zn = new WeakMap, lu = new WeakMap, cs = new WeakMap, fs = new WeakMap, Fi = new WeakMap, $i = new WeakMap, Hr = new WeakMap, hs = new WeakMap, Bi = new WeakSet, da = function(t) {
        K(this, vu, Kd).call(this);
        let n = x(this, he).fetch(this.options, t);
        return t != null && t.throwOnError || (n = n.catch(on)), n
    }, cu = new WeakSet, Gd = function() {
        if (K(this, pu, Xd).call(this), Os || x(this, ct).isStale || !Bd(this.options.staleTime)) return;
        const n = kS(x(this, ct).dataUpdatedAt, this.options.staleTime) + 1;
        $(this, Fi, setTimeout(() => {
            x(this, ct).isStale || this.updateResult()
        }, n))
    }, fu = new WeakSet, Vd = function() {
        return (typeof this.options.refetchInterval == "function" ? this.options.refetchInterval(x(this, he)) : this.options.refetchInterval) ? ? !1
    }, hu = new WeakSet, Wd = function(t) {
        K(this, mu, Qd).call(this), $(this, Hr, t), !(Os || this.options.enabled === !1 || !Bd(x(this, Hr)) || x(this, Hr) === 0) && $(this, $i, setInterval(() => {
            (this.options.refetchIntervalInBackground || Gm.isFocused()) && K(this, Bi, da).call(this)
        }, x(this, Hr)))
    }, du = new WeakSet, qd = function() {
        K(this, cu, Gd).call(this), K(this, hu, Wd).call(this, K(this, fu, Vd).call(this))
    }, pu = new WeakSet, Xd = function() {
        x(this, Fi) && (clearTimeout(x(this, Fi)), $(this, Fi, void 0))
    }, mu = new WeakSet, Qd = function() {
        x(this, $i) && (clearInterval(x(this, $i)), $(this, $i, void 0))
    }, vu = new WeakSet, Kd = function() {
        const t = x(this, _t).getQueryCache().build(x(this, _t), this.options);
        if (t === x(this, he)) return;
        const n = x(this, he);
        $(this, he, t), $(this, uu, t.state), this.hasListeners() && (n == null || n.removeObserver(this), t.addObserver(this))
    }, Tc = new WeakSet, BS = function(t) {
        $e.batch(() => {
            t.listeners && this.listeners.forEach(n => {
                n(x(this, ct))
            }), x(this, _t).getQueryCache().notify({
                query: x(this, he),
                type: "observerResultsUpdated"
            })
        })
    }, r1);

function QC(e, t) {
    return t.enabled !== !1 && e.state.data === void 0 && !(e.state.status === "error" && t.retryOnMount === !1)
}

function zg(e, t) {
    return QC(e, t) || e.state.data !== void 0 && Yd(e, t, t.refetchOnMount)
}

function Yd(e, t, n) {
    if (t.enabled !== !1) {
        const r = typeof n == "function" ? n(e) : n;
        return r === "always" || r !== !1 && Wm(e, t)
    }
    return !1
}

function Gg(e, t, n, r) {
    return (e !== t || r.enabled === !1) && (!n.suspense || e.state.status !== "error") && Wm(e, n)
}

function Wm(e, t) {
    return t.enabled !== !1 && e.isStaleByTime(t.staleTime)
}

function KC(e, t) {
    return !lc(e.getCurrentResult(), t)
}
var YC = class extends $S {
        constructor(e, t) {
            super(e, t)
        }
        bindMethods() {
            super.bindMethods(), this.fetchNextPage = this.fetchNextPage.bind(this), this.fetchPreviousPage = this.fetchPreviousPage.bind(this)
        }
        setOptions(e, t) {
            super.setOptions({ ...e,
                behavior: Ud()
            }, t)
        }
        getOptimisticResult(e) {
            return e.behavior = Ud(), super.getOptimisticResult(e)
        }
        fetchNextPage(e) {
            return this.fetch({ ...e,
                meta: {
                    fetchMore: {
                        direction: "forward"
                    }
                }
            })
        }
        fetchPreviousPage(e) {
            return this.fetch({ ...e,
                meta: {
                    fetchMore: {
                        direction: "backward"
                    }
                }
            })
        }
        createResult(e, t) {
            var u, l, c, f;
            const {
                state: n
            } = e, r = super.createResult(e, t), {
                isFetching: i,
                isRefetching: o
            } = r, s = i && ((l = (u = n.fetchMeta) == null ? void 0 : u.fetchMore) == null ? void 0 : l.direction) === "forward", a = i && ((f = (c = n.fetchMeta) == null ? void 0 : c.fetchMore) == null ? void 0 : f.direction) === "backward";
            return { ...r,
                fetchNextPage: this.fetchNextPage,
                fetchPreviousPage: this.fetchPreviousPage,
                hasNextPage: qC(t, n.data),
                hasPreviousPage: XC(t, n.data),
                isFetchingNextPage: s,
                isFetchingPreviousPage: a,
                isRefetching: o && !s && !a
            }
        }
    },
    Ur, zr, Et, ar, ds, Cl, gu, Zd, i1, ZC = (i1 = class extends Hs {
        constructor(n, r) {
            super();
            U(this, ds);
            U(this, gu);
            U(this, Ur, void 0);
            U(this, zr, void 0);
            U(this, Et, void 0);
            U(this, ar, void 0);
            $(this, Ur, n), this.setOptions(r), this.bindMethods(), K(this, ds, Cl).call(this)
        }
        bindMethods() {
            this.mutate = this.mutate.bind(this), this.reset = this.reset.bind(this)
        }
        setOptions(n) {
            var i;
            const r = this.options;
            this.options = x(this, Ur).defaultMutationOptions(n), lc(this.options, r) || x(this, Ur).getMutationCache().notify({
                type: "observerOptionsUpdated",
                mutation: x(this, Et),
                observer: this
            }), r != null && r.mutationKey && this.options.mutationKey && eo(r.mutationKey) !== eo(this.options.mutationKey) ? this.reset() : ((i = x(this, Et)) == null ? void 0 : i.state.status) === "pending" && x(this, Et).setOptions(this.options)
        }
        onUnsubscribe() {
            var n;
            this.hasListeners() || (n = x(this, Et)) == null || n.removeObserver(this)
        }
        onMutationUpdate(n) {
            K(this, ds, Cl).call(this), K(this, gu, Zd).call(this, n)
        }
        getCurrentResult() {
            return x(this, zr)
        }
        reset() {
            var n;
            (n = x(this, Et)) == null || n.removeObserver(this), $(this, Et, void 0), K(this, ds, Cl).call(this), K(this, gu, Zd).call(this)
        }
        mutate(n, r) {
            var i;
            return $(this, ar, r), (i = x(this, Et)) == null || i.removeObserver(this), $(this, Et, x(this, Ur).getMutationCache().build(x(this, Ur), this.options)), x(this, Et).addObserver(this), x(this, Et).execute(n)
        }
    }, Ur = new WeakMap, zr = new WeakMap, Et = new WeakMap, ar = new WeakMap, ds = new WeakSet, Cl = function() {
        var r;
        const n = ((r = x(this, Et)) == null ? void 0 : r.state) ? ? DS();
        $(this, zr, { ...n,
            isPending: n.status === "pending",
            isSuccess: n.status === "success",
            isError: n.status === "error",
            isIdle: n.status === "idle",
            mutate: this.mutate,
            reset: this.reset
        })
    }, gu = new WeakSet, Zd = function(n) {
        $e.batch(() => {
            var r, i, o, s, a, u, l, c;
            if (x(this, ar) && this.hasListeners()) {
                const f = x(this, zr).variables,
                    h = x(this, zr).context;
                (n == null ? void 0 : n.type) === "success" ? ((i = (r = x(this, ar)).onSuccess) == null || i.call(r, n.data, f, h), (s = (o = x(this, ar)).onSettled) == null || s.call(o, n.data, null, f, h)) : (n == null ? void 0 : n.type) === "error" && ((u = (a = x(this, ar)).onError) == null || u.call(a, n.error, f, h), (c = (l = x(this, ar)).onSettled) == null || c.call(l, void 0, n.error, f, h))
            }
            this.listeners.forEach(f => {
                f(x(this, zr))
            })
        })
    }, i1),
    jS = L.createContext(void 0),
    HS = e => {
        const t = L.useContext(jS);
        if (e) return e;
        if (!t) throw new Error("No QueryClient set, use QueryClientProvider to set one");
        return t
    },
    CH = ({
        client: e,
        children: t
    }) => (L.useEffect(() => (e.mount(), () => {
        e.unmount()
    }), [e]), Q.jsx(jS.Provider, {
        value: e,
        children: t
    })),
    US = L.createContext(!1),
    JC = () => L.useContext(US);
US.Provider;

function eR() {
    let e = !1;
    return {
        clearReset: () => {
            e = !1
        },
        reset: () => {
            e = !0
        },
        isReset: () => e
    }
}
var tR = L.createContext(eR()),
    nR = () => L.useContext(tR);

function zS(e, t) {
    return typeof e == "function" ? e(...t) : !!e
}

function rR() {}
var iR = (e, t) => {
        (e.suspense || e.throwOnError) && (t.isReset() || (e.retryOnMount = !1))
    },
    oR = e => {
        L.useEffect(() => {
            e.clearReset()
        }, [e])
    },
    sR = ({
        result: e,
        errorResetBoundary: t,
        throwOnError: n,
        query: r
    }) => e.isError && !t.isReset() && !e.isFetching && r && zS(n, [e.error, r]),
    aR = e => {
        e.suspense && typeof e.staleTime != "number" && (e.staleTime = 1e3)
    },
    uR = (e, t) => (e == null ? void 0 : e.suspense) && t.isPending,
    lR = (e, t, n) => t.fetchOptimistic(e).catch(() => {
        n.clearReset()
    });

function GS(e, t, n) {
    const r = HS(n),
        i = JC(),
        o = nR(),
        s = r.defaultQueryOptions(e);
    s._optimisticResults = i ? "isRestoring" : "optimistic", aR(s), iR(s, o), oR(o);
    const [a] = L.useState(() => new t(r, s)), u = a.getOptimisticResult(s);
    if (L.useSyncExternalStore(L.useCallback(l => {
            const c = i ? () => {} : a.subscribe($e.batchCalls(l));
            return a.updateResult(), c
        }, [a, i]), () => a.getCurrentResult(), () => a.getCurrentResult()), L.useEffect(() => {
            a.setOptions(s, {
                listeners: !1
            })
        }, [s, a]), uR(s, u)) throw lR(s, a, o);
    if (sR({
            result: u,
            errorResetBoundary: o,
            throwOnError: s.throwOnError,
            query: r.getQueryCache().get(s.queryHash)
        })) throw u.error;
    return s.notifyOnChangeProps ? u : a.trackResult(u)
}

function RH(e, t) {
    return GS(e, $S, t)
}

function kH(e, t) {
    const n = HS(t),
        [r] = L.useState(() => new ZC(n, e));
    L.useEffect(() => {
        r.setOptions(e)
    }, [r, e]);
    const i = L.useSyncExternalStore(L.useCallback(s => r.subscribe($e.batchCalls(s)), [r]), () => r.getCurrentResult(), () => r.getCurrentResult()),
        o = L.useCallback((s, a) => {
            r.mutate(s, a).catch(rR)
        }, [r]);
    if (i.error && zS(r.options.throwOnError, [i.error])) throw i.error;
    return { ...i,
        mutate: o,
        mutateAsync: i.mutate
    }
}

function MH(e, t) {
    return GS(e, YC, t)
}
var Jd = function(e, t) {
    return Jd = Object.setPrototypeOf || {
        __proto__: []
    }
    instanceof Array && function(n, r) {
        n.__proto__ = r
    } || function(n, r) {
        for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (n[i] = r[i])
    }, Jd(e, t)
};

function _n(e, t) {
    if (typeof t != "function" && t !== null) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
    Jd(e, t);

    function n() {
        this.constructor = e
    }
    e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n)
}
var z = function() {
    return z = Object.assign || function(t) {
        for (var n, r = 1, i = arguments.length; r < i; r++) {
            n = arguments[r];
            for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o])
        }
        return t
    }, z.apply(this, arguments)
};

function Wc(e, t) {
    var n = {};
    for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
    if (e != null && typeof Object.getOwnPropertySymbols == "function")
        for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
    return n
}

function Gn(e, t, n) {
    if (n || arguments.length === 2)
        for (var r = 0, i = t.length, o; r < i; r++)(o || !(r in t)) && (o || (o = Array.prototype.slice.call(t, 0, r)), o[r] = t[r]);
    return e.concat(o || Array.prototype.slice.call(t))
}
var VS = {
        exports: {}
    },
    le = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var We = typeof Symbol == "function" && Symbol.for,
    qm = We ? Symbol.for("react.element") : 60103,
    Xm = We ? Symbol.for("react.portal") : 60106,
    qc = We ? Symbol.for("react.fragment") : 60107,
    Xc = We ? Symbol.for("react.strict_mode") : 60108,
    Qc = We ? Symbol.for("react.profiler") : 60114,
    Kc = We ? Symbol.for("react.provider") : 60109,
    Yc = We ? Symbol.for("react.context") : 60110,
    Qm = We ? Symbol.for("react.async_mode") : 60111,
    Zc = We ? Symbol.for("react.concurrent_mode") : 60111,
    Jc = We ? Symbol.for("react.forward_ref") : 60112,
    ef = We ? Symbol.for("react.suspense") : 60113,
    cR = We ? Symbol.for("react.suspense_list") : 60120,
    tf = We ? Symbol.for("react.memo") : 60115,
    nf = We ? Symbol.for("react.lazy") : 60116,
    fR = We ? Symbol.for("react.block") : 60121,
    hR = We ? Symbol.for("react.fundamental") : 60117,
    dR = We ? Symbol.for("react.responder") : 60118,
    pR = We ? Symbol.for("react.scope") : 60119;

function Jt(e) {
    if (typeof e == "object" && e !== null) {
        var t = e.$$typeof;
        switch (t) {
            case qm:
                switch (e = e.type, e) {
                    case Qm:
                    case Zc:
                    case qc:
                    case Qc:
                    case Xc:
                    case ef:
                        return e;
                    default:
                        switch (e = e && e.$$typeof, e) {
                            case Yc:
                            case Jc:
                            case nf:
                            case tf:
                            case Kc:
                                return e;
                            default:
                                return t
                        }
                }
            case Xm:
                return t
        }
    }
}

function WS(e) {
    return Jt(e) === Zc
}
le.AsyncMode = Qm;
le.ConcurrentMode = Zc;
le.ContextConsumer = Yc;
le.ContextProvider = Kc;
le.Element = qm;
le.ForwardRef = Jc;
le.Fragment = qc;
le.Lazy = nf;
le.Memo = tf;
le.Portal = Xm;
le.Profiler = Qc;
le.StrictMode = Xc;
le.Suspense = ef;
le.isAsyncMode = function(e) {
    return WS(e) || Jt(e) === Qm
};
le.isConcurrentMode = WS;
le.isContextConsumer = function(e) {
    return Jt(e) === Yc
};
le.isContextProvider = function(e) {
    return Jt(e) === Kc
};
le.isElement = function(e) {
    return typeof e == "object" && e !== null && e.$$typeof === qm
};
le.isForwardRef = function(e) {
    return Jt(e) === Jc
};
le.isFragment = function(e) {
    return Jt(e) === qc
};
le.isLazy = function(e) {
    return Jt(e) === nf
};
le.isMemo = function(e) {
    return Jt(e) === tf
};
le.isPortal = function(e) {
    return Jt(e) === Xm
};
le.isProfiler = function(e) {
    return Jt(e) === Qc
};
le.isStrictMode = function(e) {
    return Jt(e) === Xc
};
le.isSuspense = function(e) {
    return Jt(e) === ef
};
le.isValidElementType = function(e) {
    return typeof e == "string" || typeof e == "function" || e === qc || e === Zc || e === Qc || e === Xc || e === ef || e === cR || typeof e == "object" && e !== null && (e.$$typeof === nf || e.$$typeof === tf || e.$$typeof === Kc || e.$$typeof === Yc || e.$$typeof === Jc || e.$$typeof === hR || e.$$typeof === dR || e.$$typeof === pR || e.$$typeof === fR)
};
le.typeOf = Jt;
VS.exports = le;
var mR = VS.exports,
    Km = mR,
    vR = {
        childContextTypes: !0,
        contextType: !0,
        contextTypes: !0,
        defaultProps: !0,
        displayName: !0,
        getDefaultProps: !0,
        getDerivedStateFromError: !0,
        getDerivedStateFromProps: !0,
        mixins: !0,
        propTypes: !0,
        type: !0
    },
    gR = {
        name: !0,
        length: !0,
        prototype: !0,
        caller: !0,
        callee: !0,
        arguments: !0,
        arity: !0
    },
    yR = {
        $$typeof: !0,
        render: !0,
        defaultProps: !0,
        displayName: !0,
        propTypes: !0
    },
    qS = {
        $$typeof: !0,
        compare: !0,
        defaultProps: !0,
        displayName: !0,
        propTypes: !0,
        type: !0
    },
    Ym = {};
Ym[Km.ForwardRef] = yR;
Ym[Km.Memo] = qS;

function Vg(e) {
    return Km.isMemo(e) ? qS : Ym[e.$$typeof] || vR
}
var _R = Object.defineProperty,
    ER = Object.getOwnPropertyNames,
    Wg = Object.getOwnPropertySymbols,
    SR = Object.getOwnPropertyDescriptor,
    wR = Object.getPrototypeOf,
    qg = Object.prototype;

function XS(e, t, n) {
    if (typeof t != "string") {
        if (qg) {
            var r = wR(t);
            r && r !== qg && XS(e, r, n)
        }
        var i = ER(t);
        Wg && (i = i.concat(Wg(t)));
        for (var o = Vg(e), s = Vg(t), a = 0; a < i.length; ++a) {
            var u = i[a];
            if (!gR[u] && !(n && n[u]) && !(s && s[u]) && !(o && o[u])) {
                var l = SR(t, u);
                try {
                    _R(e, u, l)
                } catch {}
            }
        }
    }
    return e
}
var xR = XS;
const TR = Oc(xR);

function QS(e, t, n) {
    if (n === void 0 && (n = Error), !e) throw new n(t)
}
var J;
(function(e) {
    e[e.EXPECT_ARGUMENT_CLOSING_BRACE = 1] = "EXPECT_ARGUMENT_CLOSING_BRACE", e[e.EMPTY_ARGUMENT = 2] = "EMPTY_ARGUMENT", e[e.MALFORMED_ARGUMENT = 3] = "MALFORMED_ARGUMENT", e[e.EXPECT_ARGUMENT_TYPE = 4] = "EXPECT_ARGUMENT_TYPE", e[e.INVALID_ARGUMENT_TYPE = 5] = "INVALID_ARGUMENT_TYPE", e[e.EXPECT_ARGUMENT_STYLE = 6] = "EXPECT_ARGUMENT_STYLE", e[e.INVALID_NUMBER_SKELETON = 7] = "INVALID_NUMBER_SKELETON", e[e.INVALID_DATE_TIME_SKELETON = 8] = "INVALID_DATE_TIME_SKELETON", e[e.EXPECT_NUMBER_SKELETON = 9] = "EXPECT_NUMBER_SKELETON", e[e.EXPECT_DATE_TIME_SKELETON = 10] = "EXPECT_DATE_TIME_SKELETON", e[e.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE = 11] = "UNCLOSED_QUOTE_IN_ARGUMENT_STYLE", e[e.EXPECT_SELECT_ARGUMENT_OPTIONS = 12] = "EXPECT_SELECT_ARGUMENT_OPTIONS", e[e.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE = 13] = "EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE", e[e.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE = 14] = "INVALID_PLURAL_ARGUMENT_OFFSET_VALUE", e[e.EXPECT_SELECT_ARGUMENT_SELECTOR = 15] = "EXPECT_SELECT_ARGUMENT_SELECTOR", e[e.EXPECT_PLURAL_ARGUMENT_SELECTOR = 16] = "EXPECT_PLURAL_ARGUMENT_SELECTOR", e[e.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT = 17] = "EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT", e[e.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT = 18] = "EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT", e[e.INVALID_PLURAL_ARGUMENT_SELECTOR = 19] = "INVALID_PLURAL_ARGUMENT_SELECTOR", e[e.DUPLICATE_PLURAL_ARGUMENT_SELECTOR = 20] = "DUPLICATE_PLURAL_ARGUMENT_SELECTOR", e[e.DUPLICATE_SELECT_ARGUMENT_SELECTOR = 21] = "DUPLICATE_SELECT_ARGUMENT_SELECTOR", e[e.MISSING_OTHER_CLAUSE = 22] = "MISSING_OTHER_CLAUSE", e[e.INVALID_TAG = 23] = "INVALID_TAG", e[e.INVALID_TAG_NAME = 25] = "INVALID_TAG_NAME", e[e.UNMATCHED_CLOSING_TAG = 26] = "UNMATCHED_CLOSING_TAG", e[e.UNCLOSED_TAG = 27] = "UNCLOSED_TAG"
})(J || (J = {}));
var ge;
(function(e) {
    e[e.literal = 0] = "literal", e[e.argument = 1] = "argument", e[e.number = 2] = "number", e[e.date = 3] = "date", e[e.time = 4] = "time", e[e.select = 5] = "select", e[e.plural = 6] = "plural", e[e.pound = 7] = "pound", e[e.tag = 8] = "tag"
})(ge || (ge = {}));
var bs;
(function(e) {
    e[e.number = 0] = "number", e[e.dateTime = 1] = "dateTime"
})(bs || (bs = {}));

function Xg(e) {
    return e.type === ge.literal
}

function OR(e) {
    return e.type === ge.argument
}

function KS(e) {
    return e.type === ge.number
}

function YS(e) {
    return e.type === ge.date
}

function ZS(e) {
    return e.type === ge.time
}

function JS(e) {
    return e.type === ge.select
}

function ew(e) {
    return e.type === ge.plural
}

function bR(e) {
    return e.type === ge.pound
}

function tw(e) {
    return e.type === ge.tag
}

function nw(e) {
    return !!(e && typeof e == "object" && e.type === bs.number)
}

function ep(e) {
    return !!(e && typeof e == "object" && e.type === bs.dateTime)
}
var rw = /[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/,
    PR = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;

function CR(e) {
    var t = {};
    return e.replace(PR, function(n) {
        var r = n.length;
        switch (n[0]) {
            case "G":
                t.era = r === 4 ? "long" : r === 5 ? "narrow" : "short";
                break;
            case "y":
                t.year = r === 2 ? "2-digit" : "numeric";
                break;
            case "Y":
            case "u":
            case "U":
            case "r":
                throw new RangeError("`Y/u/U/r` (year) patterns are not supported, use `y` instead");
            case "q":
            case "Q":
                throw new RangeError("`q/Q` (quarter) patterns are not supported");
            case "M":
            case "L":
                t.month = ["numeric", "2-digit", "short", "long", "narrow"][r - 1];
                break;
            case "w":
            case "W":
                throw new RangeError("`w/W` (week) patterns are not supported");
            case "d":
                t.day = ["numeric", "2-digit"][r - 1];
                break;
            case "D":
            case "F":
            case "g":
                throw new RangeError("`D/F/g` (day) patterns are not supported, use `d` instead");
            case "E":
                t.weekday = r === 4 ? "long" : r === 5 ? "narrow" : "short";
                break;
            case "e":
                if (r < 4) throw new RangeError("`e..eee` (weekday) patterns are not supported");
                t.weekday = ["short", "long", "narrow", "short"][r - 4];
                break;
            case "c":
                if (r < 4) throw new RangeError("`c..ccc` (weekday) patterns are not supported");
                t.weekday = ["short", "long", "narrow", "short"][r - 4];
                break;
            case "a":
                t.hour12 = !0;
                break;
            case "b":
            case "B":
                throw new RangeError("`b/B` (period) patterns are not supported, use `a` instead");
            case "h":
                t.hourCycle = "h12", t.hour = ["numeric", "2-digit"][r - 1];
                break;
            case "H":
                t.hourCycle = "h23", t.hour = ["numeric", "2-digit"][r - 1];
                break;
            case "K":
                t.hourCycle = "h11", t.hour = ["numeric", "2-digit"][r - 1];
                break;
            case "k":
                t.hourCycle = "h24", t.hour = ["numeric", "2-digit"][r - 1];
                break;
            case "j":
            case "J":
            case "C":
                throw new RangeError("`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead");
            case "m":
                t.minute = ["numeric", "2-digit"][r - 1];
                break;
            case "s":
                t.second = ["numeric", "2-digit"][r - 1];
                break;
            case "S":
            case "A":
                throw new RangeError("`S/A` (second) patterns are not supported, use `s` instead");
            case "z":
                t.timeZoneName = r < 4 ? "short" : "long";
                break;
            case "Z":
            case "O":
            case "v":
            case "V":
            case "X":
            case "x":
                throw new RangeError("`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead")
        }
        return ""
    }), t
}
var RR = /[\t-\r \x85\u200E\u200F\u2028\u2029]/i;

function kR(e) {
    if (e.length === 0) throw new Error("Number skeleton cannot be empty");
    for (var t = e.split(RR).filter(function(h) {
            return h.length > 0
        }), n = [], r = 0, i = t; r < i.length; r++) {
        var o = i[r],
            s = o.split("/");
        if (s.length === 0) throw new Error("Invalid number skeleton");
        for (var a = s[0], u = s.slice(1), l = 0, c = u; l < c.length; l++) {
            var f = c[l];
            if (f.length === 0) throw new Error("Invalid number skeleton")
        }
        n.push({
            stem: a,
            options: u
        })
    }
    return n
}

function MR(e) {
    return e.replace(/^(.*?)-/, "")
}
var Qg = /^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g,
    iw = /^(@+)?(\+|#+)?[rs]?$/g,
    IR = /(\*)(0+)|(#+)(0+)|(0+)/g,
    ow = /^(0+)$/;

function Kg(e) {
    var t = {};
    return e[e.length - 1] === "r" ? t.roundingPriority = "morePrecision" : e[e.length - 1] === "s" && (t.roundingPriority = "lessPrecision"), e.replace(iw, function(n, r, i) {
        return typeof i != "string" ? (t.minimumSignificantDigits = r.length, t.maximumSignificantDigits = r.length) : i === "+" ? t.minimumSignificantDigits = r.length : r[0] === "#" ? t.maximumSignificantDigits = r.length : (t.minimumSignificantDigits = r.length, t.maximumSignificantDigits = r.length + (typeof i == "string" ? i.length : 0)), ""
    }), t
}

function sw(e) {
    switch (e) {
        case "sign-auto":
            return {
                signDisplay: "auto"
            };
        case "sign-accounting":
        case "()":
            return {
                currencySign: "accounting"
            };
        case "sign-always":
        case "+!":
            return {
                signDisplay: "always"
            };
        case "sign-accounting-always":
        case "()!":
            return {
                signDisplay: "always",
                currencySign: "accounting"
            };
        case "sign-except-zero":
        case "+?":
            return {
                signDisplay: "exceptZero"
            };
        case "sign-accounting-except-zero":
        case "()?":
            return {
                signDisplay: "exceptZero",
                currencySign: "accounting"
            };
        case "sign-never":
        case "+_":
            return {
                signDisplay: "never"
            }
    }
}

function LR(e) {
    var t;
    if (e[0] === "E" && e[1] === "E" ? (t = {
            notation: "engineering"
        }, e = e.slice(2)) : e[0] === "E" && (t = {
            notation: "scientific"
        }, e = e.slice(1)), t) {
        var n = e.slice(0, 2);
        if (n === "+!" ? (t.signDisplay = "always", e = e.slice(2)) : n === "+?" && (t.signDisplay = "exceptZero", e = e.slice(2)), !ow.test(e)) throw new Error("Malformed concise eng/scientific notation");
        t.minimumIntegerDigits = e.length
    }
    return t
}

function Yg(e) {
    var t = {},
        n = sw(e);
    return n || t
}

function AR(e) {
    for (var t = {}, n = 0, r = e; n < r.length; n++) {
        var i = r[n];
        switch (i.stem) {
            case "percent":
            case "%":
                t.style = "percent";
                continue;
            case "%x100":
                t.style = "percent", t.scale = 100;
                continue;
            case "currency":
                t.style = "currency", t.currency = i.options[0];
                continue;
            case "group-off":
            case ",_":
                t.useGrouping = !1;
                continue;
            case "precision-integer":
            case ".":
                t.maximumFractionDigits = 0;
                continue;
            case "measure-unit":
            case "unit":
                t.style = "unit", t.unit = MR(i.options[0]);
                continue;
            case "compact-short":
            case "K":
                t.notation = "compact", t.compactDisplay = "short";
                continue;
            case "compact-long":
            case "KK":
                t.notation = "compact", t.compactDisplay = "long";
                continue;
            case "scientific":
                t = z(z(z({}, t), {
                    notation: "scientific"
                }), i.options.reduce(function(u, l) {
                    return z(z({}, u), Yg(l))
                }, {}));
                continue;
            case "engineering":
                t = z(z(z({}, t), {
                    notation: "engineering"
                }), i.options.reduce(function(u, l) {
                    return z(z({}, u), Yg(l))
                }, {}));
                continue;
            case "notation-simple":
                t.notation = "standard";
                continue;
            case "unit-width-narrow":
                t.currencyDisplay = "narrowSymbol", t.unitDisplay = "narrow";
                continue;
            case "unit-width-short":
                t.currencyDisplay = "code", t.unitDisplay = "short";
                continue;
            case "unit-width-full-name":
                t.currencyDisplay = "name", t.unitDisplay = "long";
                continue;
            case "unit-width-iso-code":
                t.currencyDisplay = "symbol";
                continue;
            case "scale":
                t.scale = parseFloat(i.options[0]);
                continue;
            case "rounding-mode-floor":
                t.roundingMode = "floor";
                continue;
            case "rounding-mode-ceiling":
                t.roundingMode = "ceil";
                continue;
            case "rounding-mode-down":
                t.roundingMode = "trunc";
                continue;
            case "rounding-mode-up":
                t.roundingMode = "expand";
                continue;
            case "rounding-mode-half-even":
                t.roundingMode = "halfEven";
                continue;
            case "rounding-mode-half-down":
                t.roundingMode = "halfTrunc";
                continue;
            case "rounding-mode-half-up":
                t.roundingMode = "halfExpand";
                continue;
            case "integer-width":
                if (i.options.length > 1) throw new RangeError("integer-width stems only accept a single optional option");
                i.options[0].replace(IR, function(u, l, c, f, h, p) {
                    if (l) t.minimumIntegerDigits = c.length;
                    else {
                        if (f && h) throw new Error("We currently do not support maximum integer digits");
                        if (p) throw new Error("We currently do not support exact integer digits")
                    }
                    return ""
                });
                continue
        }
        if (ow.test(i.stem)) {
            t.minimumIntegerDigits = i.stem.length;
            continue
        }
        if (Qg.test(i.stem)) {
            if (i.options.length > 1) throw new RangeError("Fraction-precision stems only accept a single optional option");
            i.stem.replace(Qg, function(u, l, c, f, h, p) {
                return c === "*" ? t.minimumFractionDigits = l.length : f && f[0] === "#" ? t.maximumFractionDigits = f.length : h && p ? (t.minimumFractionDigits = h.length, t.maximumFractionDigits = h.length + p.length) : (t.minimumFractionDigits = l.length, t.maximumFractionDigits = l.length), ""
            });
            var o = i.options[0];
            o === "w" ? t = z(z({}, t), {
                trailingZeroDisplay: "stripIfInteger"
            }) : o && (t = z(z({}, t), Kg(o)));
            continue
        }
        if (iw.test(i.stem)) {
            t = z(z({}, t), Kg(i.stem));
            continue
        }
        var s = sw(i.stem);
        s && (t = z(z({}, t), s));
        var a = LR(i.stem);
        a && (t = z(z({}, t), a))
    }
    return t
}
var nl = {
    "001": ["H", "h"],
    AC: ["H", "h", "hb", "hB"],
    AD: ["H", "hB"],
    AE: ["h", "hB", "hb", "H"],
    AF: ["H", "hb", "hB", "h"],
    AG: ["h", "hb", "H", "hB"],
    AI: ["H", "h", "hb", "hB"],
    AL: ["h", "H", "hB"],
    AM: ["H", "hB"],
    AO: ["H", "hB"],
    AR: ["H", "h", "hB", "hb"],
    AS: ["h", "H"],
    AT: ["H", "hB"],
    AU: ["h", "hb", "H", "hB"],
    AW: ["H", "hB"],
    AX: ["H"],
    AZ: ["H", "hB", "h"],
    BA: ["H", "hB", "h"],
    BB: ["h", "hb", "H", "hB"],
    BD: ["h", "hB", "H"],
    BE: ["H", "hB"],
    BF: ["H", "hB"],
    BG: ["H", "hB", "h"],
    BH: ["h", "hB", "hb", "H"],
    BI: ["H", "h"],
    BJ: ["H", "hB"],
    BL: ["H", "hB"],
    BM: ["h", "hb", "H", "hB"],
    BN: ["hb", "hB", "h", "H"],
    BO: ["H", "hB", "h", "hb"],
    BQ: ["H"],
    BR: ["H", "hB"],
    BS: ["h", "hb", "H", "hB"],
    BT: ["h", "H"],
    BW: ["H", "h", "hb", "hB"],
    BY: ["H", "h"],
    BZ: ["H", "h", "hb", "hB"],
    CA: ["h", "hb", "H", "hB"],
    CC: ["H", "h", "hb", "hB"],
    CD: ["hB", "H"],
    CF: ["H", "h", "hB"],
    CG: ["H", "hB"],
    CH: ["H", "hB", "h"],
    CI: ["H", "hB"],
    CK: ["H", "h", "hb", "hB"],
    CL: ["H", "h", "hB", "hb"],
    CM: ["H", "h", "hB"],
    CN: ["H", "hB", "hb", "h"],
    CO: ["h", "H", "hB", "hb"],
    CP: ["H"],
    CR: ["H", "h", "hB", "hb"],
    CU: ["H", "h", "hB", "hb"],
    CV: ["H", "hB"],
    CW: ["H", "hB"],
    CX: ["H", "h", "hb", "hB"],
    CY: ["h", "H", "hb", "hB"],
    CZ: ["H"],
    DE: ["H", "hB"],
    DG: ["H", "h", "hb", "hB"],
    DJ: ["h", "H"],
    DK: ["H"],
    DM: ["h", "hb", "H", "hB"],
    DO: ["h", "H", "hB", "hb"],
    DZ: ["h", "hB", "hb", "H"],
    EA: ["H", "h", "hB", "hb"],
    EC: ["H", "hB", "h", "hb"],
    EE: ["H", "hB"],
    EG: ["h", "hB", "hb", "H"],
    EH: ["h", "hB", "hb", "H"],
    ER: ["h", "H"],
    ES: ["H", "hB", "h", "hb"],
    ET: ["hB", "hb", "h", "H"],
    FI: ["H"],
    FJ: ["h", "hb", "H", "hB"],
    FK: ["H", "h", "hb", "hB"],
    FM: ["h", "hb", "H", "hB"],
    FO: ["H", "h"],
    FR: ["H", "hB"],
    GA: ["H", "hB"],
    GB: ["H", "h", "hb", "hB"],
    GD: ["h", "hb", "H", "hB"],
    GE: ["H", "hB", "h"],
    GF: ["H", "hB"],
    GG: ["H", "h", "hb", "hB"],
    GH: ["h", "H"],
    GI: ["H", "h", "hb", "hB"],
    GL: ["H", "h"],
    GM: ["h", "hb", "H", "hB"],
    GN: ["H", "hB"],
    GP: ["H", "hB"],
    GQ: ["H", "hB", "h", "hb"],
    GR: ["h", "H", "hb", "hB"],
    GT: ["H", "h", "hB", "hb"],
    GU: ["h", "hb", "H", "hB"],
    GW: ["H", "hB"],
    GY: ["h", "hb", "H", "hB"],
    HK: ["h", "hB", "hb", "H"],
    HN: ["H", "h", "hB", "hb"],
    HR: ["H", "hB"],
    HU: ["H", "h"],
    IC: ["H", "h", "hB", "hb"],
    ID: ["H"],
    IE: ["H", "h", "hb", "hB"],
    IL: ["H", "hB"],
    IM: ["H", "h", "hb", "hB"],
    IN: ["h", "H"],
    IO: ["H", "h", "hb", "hB"],
    IQ: ["h", "hB", "hb", "H"],
    IR: ["hB", "H"],
    IS: ["H"],
    IT: ["H", "hB"],
    JE: ["H", "h", "hb", "hB"],
    JM: ["h", "hb", "H", "hB"],
    JO: ["h", "hB", "hb", "H"],
    JP: ["H", "K", "h"],
    KE: ["hB", "hb", "H", "h"],
    KG: ["H", "h", "hB", "hb"],
    KH: ["hB", "h", "H", "hb"],
    KI: ["h", "hb", "H", "hB"],
    KM: ["H", "h", "hB", "hb"],
    KN: ["h", "hb", "H", "hB"],
    KP: ["h", "H", "hB", "hb"],
    KR: ["h", "H", "hB", "hb"],
    KW: ["h", "hB", "hb", "H"],
    KY: ["h", "hb", "H", "hB"],
    KZ: ["H", "hB"],
    LA: ["H", "hb", "hB", "h"],
    LB: ["h", "hB", "hb", "H"],
    LC: ["h", "hb", "H", "hB"],
    LI: ["H", "hB", "h"],
    LK: ["H", "h", "hB", "hb"],
    LR: ["h", "hb", "H", "hB"],
    LS: ["h", "H"],
    LT: ["H", "h", "hb", "hB"],
    LU: ["H", "h", "hB"],
    LV: ["H", "hB", "hb", "h"],
    LY: ["h", "hB", "hb", "H"],
    MA: ["H", "h", "hB", "hb"],
    MC: ["H", "hB"],
    MD: ["H", "hB"],
    ME: ["H", "hB", "h"],
    MF: ["H", "hB"],
    MG: ["H", "h"],
    MH: ["h", "hb", "H", "hB"],
    MK: ["H", "h", "hb", "hB"],
    ML: ["H"],
    MM: ["hB", "hb", "H", "h"],
    MN: ["H", "h", "hb", "hB"],
    MO: ["h", "hB", "hb", "H"],
    MP: ["h", "hb", "H", "hB"],
    MQ: ["H", "hB"],
    MR: ["h", "hB", "hb", "H"],
    MS: ["H", "h", "hb", "hB"],
    MT: ["H", "h"],
    MU: ["H", "h"],
    MV: ["H", "h"],
    MW: ["h", "hb", "H", "hB"],
    MX: ["H", "h", "hB", "hb"],
    MY: ["hb", "hB", "h", "H"],
    MZ: ["H", "hB"],
    NA: ["h", "H", "hB", "hb"],
    NC: ["H", "hB"],
    NE: ["H"],
    NF: ["H", "h", "hb", "hB"],
    NG: ["H", "h", "hb", "hB"],
    NI: ["H", "h", "hB", "hb"],
    NL: ["H", "hB"],
    NO: ["H", "h"],
    NP: ["H", "h", "hB"],
    NR: ["H", "h", "hb", "hB"],
    NU: ["H", "h", "hb", "hB"],
    NZ: ["h", "hb", "H", "hB"],
    OM: ["h", "hB", "hb", "H"],
    PA: ["h", "H", "hB", "hb"],
    PE: ["H", "hB", "h", "hb"],
    PF: ["H", "h", "hB"],
    PG: ["h", "H"],
    PH: ["h", "hB", "hb", "H"],
    PK: ["h", "hB", "H"],
    PL: ["H", "h"],
    PM: ["H", "hB"],
    PN: ["H", "h", "hb", "hB"],
    PR: ["h", "H", "hB", "hb"],
    PS: ["h", "hB", "hb", "H"],
    PT: ["H", "hB"],
    PW: ["h", "H"],
    PY: ["H", "h", "hB", "hb"],
    QA: ["h", "hB", "hb", "H"],
    RE: ["H", "hB"],
    RO: ["H", "hB"],
    RS: ["H", "hB", "h"],
    RU: ["H"],
    RW: ["H", "h"],
    SA: ["h", "hB", "hb", "H"],
    SB: ["h", "hb", "H", "hB"],
    SC: ["H", "h", "hB"],
    SD: ["h", "hB", "hb", "H"],
    SE: ["H"],
    SG: ["h", "hb", "H", "hB"],
    SH: ["H", "h", "hb", "hB"],
    SI: ["H", "hB"],
    SJ: ["H"],
    SK: ["H"],
    SL: ["h", "hb", "H", "hB"],
    SM: ["H", "h", "hB"],
    SN: ["H", "h", "hB"],
    SO: ["h", "H"],
    SR: ["H", "hB"],
    SS: ["h", "hb", "H", "hB"],
    ST: ["H", "hB"],
    SV: ["H", "h", "hB", "hb"],
    SX: ["H", "h", "hb", "hB"],
    SY: ["h", "hB", "hb", "H"],
    SZ: ["h", "hb", "H", "hB"],
    TA: ["H", "h", "hb", "hB"],
    TC: ["h", "hb", "H", "hB"],
    TD: ["h", "H", "hB"],
    TF: ["H", "h", "hB"],
    TG: ["H", "hB"],
    TH: ["H", "h"],
    TJ: ["H", "h"],
    TL: ["H", "hB", "hb", "h"],
    TM: ["H", "h"],
    TN: ["h", "hB", "hb", "H"],
    TO: ["h", "H"],
    TR: ["H", "hB"],
    TT: ["h", "hb", "H", "hB"],
    TW: ["hB", "hb", "h", "H"],
    TZ: ["hB", "hb", "H", "h"],
    UA: ["H", "hB", "h"],
    UG: ["hB", "hb", "H", "h"],
    UM: ["h", "hb", "H", "hB"],
    US: ["h", "hb", "H", "hB"],
    UY: ["H", "h", "hB", "hb"],
    UZ: ["H", "hB", "h"],
    VA: ["H", "h", "hB"],
    VC: ["h", "hb", "H", "hB"],
    VE: ["h", "H", "hB", "hb"],
    VG: ["h", "hb", "H", "hB"],
    VI: ["h", "hb", "H", "hB"],
    VN: ["H", "h"],
    VU: ["h", "H"],
    WF: ["H", "hB"],
    WS: ["h", "H"],
    XK: ["H", "hB", "h"],
    YE: ["h", "hB", "hb", "H"],
    YT: ["H", "hB"],
    ZA: ["H", "h", "hb", "hB"],
    ZM: ["h", "hb", "H", "hB"],
    ZW: ["H", "h"],
    "af-ZA": ["H", "h", "hB", "hb"],
    "ar-001": ["h", "hB", "hb", "H"],
    "ca-ES": ["H", "h", "hB"],
    "en-001": ["h", "hb", "H", "hB"],
    "es-BO": ["H", "h", "hB", "hb"],
    "es-BR": ["H", "h", "hB", "hb"],
    "es-EC": ["H", "h", "hB", "hb"],
    "es-ES": ["H", "h", "hB", "hb"],
    "es-GQ": ["H", "h", "hB", "hb"],
    "es-PE": ["H", "h", "hB", "hb"],
    "fr-CA": ["H", "h", "hB"],
    "gl-ES": ["H", "h", "hB"],
    "gu-IN": ["hB", "hb", "h", "H"],
    "hi-IN": ["hB", "h", "H"],
    "it-CH": ["H", "h", "hB"],
    "it-IT": ["H", "h", "hB"],
    "kn-IN": ["hB", "h", "H"],
    "ml-IN": ["hB", "h", "H"],
    "mr-IN": ["hB", "hb", "h", "H"],
    "pa-IN": ["hB", "hb", "h", "H"],
    "ta-IN": ["hB", "h", "hb", "H"],
    "te-IN": ["hB", "h", "H"],
    "zu-ZA": ["H", "hB", "hb", "h"]
};

function NR(e, t) {
    for (var n = "", r = 0; r < e.length; r++) {
        var i = e.charAt(r);
        if (i === "j") {
            for (var o = 0; r + 1 < e.length && e.charAt(r + 1) === i;) o++, r++;
            var s = 1 + (o & 1),
                a = o < 2 ? 1 : 3 + (o >> 1),
                u = "a",
                l = DR(t);
            for ((l == "H" || l == "k") && (a = 0); a-- > 0;) n += u;
            for (; s-- > 0;) n = l + n
        } else i === "J" ? n += "H" : n += i
    }
    return n
}

function DR(e) {
    var t = e.hourCycle;
    if (t === void 0 && e.hourCycles && e.hourCycles.length && (t = e.hourCycles[0]), t) switch (t) {
        case "h24":
            return "k";
        case "h23":
            return "H";
        case "h12":
            return "h";
        case "h11":
            return "K";
        default:
            throw new Error("Invalid hourCycle")
    }
    var n = e.language,
        r;
    n !== "root" && (r = e.maximize().region);
    var i = nl[r || ""] || nl[n || ""] || nl["".concat(n, "-001")] || nl["001"];
    return i[0]
}
var sh, FR = new RegExp("^".concat(rw.source, "*")),
    $R = new RegExp("".concat(rw.source, "*$"));

function te(e, t) {
    return {
        start: e,
        end: t
    }
}
var BR = !!String.prototype.startsWith && "_a".startsWith("a", 1),
    jR = !!String.fromCodePoint,
    HR = !!Object.fromEntries,
    UR = !!String.prototype.codePointAt,
    zR = !!String.prototype.trimStart,
    GR = !!String.prototype.trimEnd,
    VR = !!Number.isSafeInteger,
    WR = VR ? Number.isSafeInteger : function(e) {
        return typeof e == "number" && isFinite(e) && Math.floor(e) === e && Math.abs(e) <= 9007199254740991
    },
    tp = !0;
try {
    var qR = uw("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu");
    tp = ((sh = qR.exec("a")) === null || sh === void 0 ? void 0 : sh[0]) === "a"
} catch {
    tp = !1
}
var Zg = BR ? function(t, n, r) {
        return t.startsWith(n, r)
    } : function(t, n, r) {
        return t.slice(r, r + n.length) === n
    },
    np = jR ? String.fromCodePoint : function() {
        for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
        for (var r = "", i = t.length, o = 0, s; i > o;) {
            if (s = t[o++], s > 1114111) throw RangeError(s + " is not a valid code point");
            r += s < 65536 ? String.fromCharCode(s) : String.fromCharCode(((s -= 65536) >> 10) + 55296, s % 1024 + 56320)
        }
        return r
    },
    Jg = HR ? Object.fromEntries : function(t) {
        for (var n = {}, r = 0, i = t; r < i.length; r++) {
            var o = i[r],
                s = o[0],
                a = o[1];
            n[s] = a
        }
        return n
    },
    aw = UR ? function(t, n) {
        return t.codePointAt(n)
    } : function(t, n) {
        var r = t.length;
        if (!(n < 0 || n >= r)) {
            var i = t.charCodeAt(n),
                o;
            return i < 55296 || i > 56319 || n + 1 === r || (o = t.charCodeAt(n + 1)) < 56320 || o > 57343 ? i : (i - 55296 << 10) + (o - 56320) + 65536
        }
    },
    XR = zR ? function(t) {
        return t.trimStart()
    } : function(t) {
        return t.replace(FR, "")
    },
    QR = GR ? function(t) {
        return t.trimEnd()
    } : function(t) {
        return t.replace($R, "")
    };

function uw(e, t) {
    return new RegExp(e, t)
}
var rp;
if (tp) {
    var ey = uw("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu");
    rp = function(t, n) {
        var r;
        ey.lastIndex = n;
        var i = ey.exec(t);
        return (r = i[1]) !== null && r !== void 0 ? r : ""
    }
} else rp = function(t, n) {
    for (var r = [];;) {
        var i = aw(t, n);
        if (i === void 0 || lw(i) || JR(i)) break;
        r.push(i), n += i >= 65536 ? 2 : 1
    }
    return np.apply(void 0, r)
};
var KR = function() {
    function e(t, n) {
        n === void 0 && (n = {}), this.message = t, this.position = {
            offset: 0,
            line: 1,
            column: 1
        }, this.ignoreTag = !!n.ignoreTag, this.locale = n.locale, this.requiresOtherClause = !!n.requiresOtherClause, this.shouldParseSkeletons = !!n.shouldParseSkeletons
    }
    return e.prototype.parse = function() {
        if (this.offset() !== 0) throw Error("parser can only be used once");
        return this.parseMessage(0, "", !1)
    }, e.prototype.parseMessage = function(t, n, r) {
        for (var i = []; !this.isEOF();) {
            var o = this.char();
            if (o === 123) {
                var s = this.parseArgument(t, r);
                if (s.err) return s;
                i.push(s.val)
            } else {
                if (o === 125 && t > 0) break;
                if (o === 35 && (n === "plural" || n === "selectordinal")) {
                    var a = this.clonePosition();
                    this.bump(), i.push({
                        type: ge.pound,
                        location: te(a, this.clonePosition())
                    })
                } else if (o === 60 && !this.ignoreTag && this.peek() === 47) {
                    if (r) break;
                    return this.error(J.UNMATCHED_CLOSING_TAG, te(this.clonePosition(), this.clonePosition()))
                } else if (o === 60 && !this.ignoreTag && ip(this.peek() || 0)) {
                    var s = this.parseTag(t, n);
                    if (s.err) return s;
                    i.push(s.val)
                } else {
                    var s = this.parseLiteral(t, n);
                    if (s.err) return s;
                    i.push(s.val)
                }
            }
        }
        return {
            val: i,
            err: null
        }
    }, e.prototype.parseTag = function(t, n) {
        var r = this.clonePosition();
        this.bump();
        var i = this.parseTagName();
        if (this.bumpSpace(), this.bumpIf("/>")) return {
            val: {
                type: ge.literal,
                value: "<".concat(i, "/>"),
                location: te(r, this.clonePosition())
            },
            err: null
        };
        if (this.bumpIf(">")) {
            var o = this.parseMessage(t + 1, n, !0);
            if (o.err) return o;
            var s = o.val,
                a = this.clonePosition();
            if (this.bumpIf("</")) {
                if (this.isEOF() || !ip(this.char())) return this.error(J.INVALID_TAG, te(a, this.clonePosition()));
                var u = this.clonePosition(),
                    l = this.parseTagName();
                return i !== l ? this.error(J.UNMATCHED_CLOSING_TAG, te(u, this.clonePosition())) : (this.bumpSpace(), this.bumpIf(">") ? {
                    val: {
                        type: ge.tag,
                        value: i,
                        children: s,
                        location: te(r, this.clonePosition())
                    },
                    err: null
                } : this.error(J.INVALID_TAG, te(a, this.clonePosition())))
            } else return this.error(J.UNCLOSED_TAG, te(r, this.clonePosition()))
        } else return this.error(J.INVALID_TAG, te(r, this.clonePosition()))
    }, e.prototype.parseTagName = function() {
        var t = this.offset();
        for (this.bump(); !this.isEOF() && ZR(this.char());) this.bump();
        return this.message.slice(t, this.offset())
    }, e.prototype.parseLiteral = function(t, n) {
        for (var r = this.clonePosition(), i = "";;) {
            var o = this.tryParseQuote(n);
            if (o) {
                i += o;
                continue
            }
            var s = this.tryParseUnquoted(t, n);
            if (s) {
                i += s;
                continue
            }
            var a = this.tryParseLeftAngleBracket();
            if (a) {
                i += a;
                continue
            }
            break
        }
        var u = te(r, this.clonePosition());
        return {
            val: {
                type: ge.literal,
                value: i,
                location: u
            },
            err: null
        }
    }, e.prototype.tryParseLeftAngleBracket = function() {
        return !this.isEOF() && this.char() === 60 && (this.ignoreTag || !YR(this.peek() || 0)) ? (this.bump(), "<") : null
    }, e.prototype.tryParseQuote = function(t) {
        if (this.isEOF() || this.char() !== 39) return null;
        switch (this.peek()) {
            case 39:
                return this.bump(), this.bump(), "'";
            case 123:
            case 60:
            case 62:
            case 125:
                break;
            case 35:
                if (t === "plural" || t === "selectordinal") break;
                return null;
            default:
                return null
        }
        this.bump();
        var n = [this.char()];
        for (this.bump(); !this.isEOF();) {
            var r = this.char();
            if (r === 39)
                if (this.peek() === 39) n.push(39), this.bump();
                else {
                    this.bump();
                    break
                }
            else n.push(r);
            this.bump()
        }
        return np.apply(void 0, n)
    }, e.prototype.tryParseUnquoted = function(t, n) {
        if (this.isEOF()) return null;
        var r = this.char();
        return r === 60 || r === 123 || r === 35 && (n === "plural" || n === "selectordinal") || r === 125 && t > 0 ? null : (this.bump(), np(r))
    }, e.prototype.parseArgument = function(t, n) {
        var r = this.clonePosition();
        if (this.bump(), this.bumpSpace(), this.isEOF()) return this.error(J.EXPECT_ARGUMENT_CLOSING_BRACE, te(r, this.clonePosition()));
        if (this.char() === 125) return this.bump(), this.error(J.EMPTY_ARGUMENT, te(r, this.clonePosition()));
        var i = this.parseIdentifierIfPossible().value;
        if (!i) return this.error(J.MALFORMED_ARGUMENT, te(r, this.clonePosition()));
        if (this.bumpSpace(), this.isEOF()) return this.error(J.EXPECT_ARGUMENT_CLOSING_BRACE, te(r, this.clonePosition()));
        switch (this.char()) {
            case 125:
                return this.bump(), {
                    val: {
                        type: ge.argument,
                        value: i,
                        location: te(r, this.clonePosition())
                    },
                    err: null
                };
            case 44:
                return this.bump(), this.bumpSpace(), this.isEOF() ? this.error(J.EXPECT_ARGUMENT_CLOSING_BRACE, te(r, this.clonePosition())) : this.parseArgumentOptions(t, n, i, r);
            default:
                return this.error(J.MALFORMED_ARGUMENT, te(r, this.clonePosition()))
        }
    }, e.prototype.parseIdentifierIfPossible = function() {
        var t = this.clonePosition(),
            n = this.offset(),
            r = rp(this.message, n),
            i = n + r.length;
        this.bumpTo(i);
        var o = this.clonePosition(),
            s = te(t, o);
        return {
            value: r,
            location: s
        }
    }, e.prototype.parseArgumentOptions = function(t, n, r, i) {
        var o, s = this.clonePosition(),
            a = this.parseIdentifierIfPossible().value,
            u = this.clonePosition();
        switch (a) {
            case "":
                return this.error(J.EXPECT_ARGUMENT_TYPE, te(s, u));
            case "number":
            case "date":
            case "time":
                {
                    this.bumpSpace();
                    var l = null;
                    if (this.bumpIf(",")) {
                        this.bumpSpace();
                        var c = this.clonePosition(),
                            f = this.parseSimpleArgStyleIfPossible();
                        if (f.err) return f;
                        var h = QR(f.val);
                        if (h.length === 0) return this.error(J.EXPECT_ARGUMENT_STYLE, te(this.clonePosition(), this.clonePosition()));
                        var p = te(c, this.clonePosition());
                        l = {
                            style: h,
                            styleLocation: p
                        }
                    }
                    var y = this.tryParseArgumentClose(i);
                    if (y.err) return y;
                    var m = te(i, this.clonePosition());
                    if (l && Zg(l == null ? void 0 : l.style, "::", 0)) {
                        var _ = XR(l.style.slice(2));
                        if (a === "number") {
                            var f = this.parseNumberSkeletonFromString(_, l.styleLocation);
                            return f.err ? f : {
                                val: {
                                    type: ge.number,
                                    value: r,
                                    location: m,
                                    style: f.val
                                },
                                err: null
                            }
                        } else {
                            if (_.length === 0) return this.error(J.EXPECT_DATE_TIME_SKELETON, m);
                            var g = _;
                            this.locale && (g = NR(_, this.locale));
                            var h = {
                                    type: bs.dateTime,
                                    pattern: g,
                                    location: l.styleLocation,
                                    parsedOptions: this.shouldParseSkeletons ? CR(g) : {}
                                },
                                d = a === "date" ? ge.date : ge.time;
                            return {
                                val: {
                                    type: d,
                                    value: r,
                                    location: m,
                                    style: h
                                },
                                err: null
                            }
                        }
                    }
                    return {
                        val: {
                            type: a === "number" ? ge.number : a === "date" ? ge.date : ge.time,
                            value: r,
                            location: m,
                            style: (o = l == null ? void 0 : l.style) !== null && o !== void 0 ? o : null
                        },
                        err: null
                    }
                }
            case "plural":
            case "selectordinal":
            case "select":
                {
                    var v = this.clonePosition();
                    if (this.bumpSpace(), !this.bumpIf(",")) return this.error(J.EXPECT_SELECT_ARGUMENT_OPTIONS, te(v, z({}, v)));this.bumpSpace();
                    var E = this.parseIdentifierIfPossible(),
                        S = 0;
                    if (a !== "select" && E.value === "offset") {
                        if (!this.bumpIf(":")) return this.error(J.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, te(this.clonePosition(), this.clonePosition()));
                        this.bumpSpace();
                        var f = this.tryParseDecimalInteger(J.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, J.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE);
                        if (f.err) return f;
                        this.bumpSpace(), E = this.parseIdentifierIfPossible(), S = f.val
                    }
                    var w = this.tryParsePluralOrSelectOptions(t, a, n, E);
                    if (w.err) return w;
                    var y = this.tryParseArgumentClose(i);
                    if (y.err) return y;
                    var T = te(i, this.clonePosition());
                    return a === "select" ? {
                        val: {
                            type: ge.select,
                            value: r,
                            options: Jg(w.val),
                            location: T
                        },
                        err: null
                    } : {
                        val: {
                            type: ge.plural,
                            value: r,
                            options: Jg(w.val),
                            offset: S,
                            pluralType: a === "plural" ? "cardinal" : "ordinal",
                            location: T
                        },
                        err: null
                    }
                }
            default:
                return this.error(J.INVALID_ARGUMENT_TYPE, te(s, u))
        }
    }, e.prototype.tryParseArgumentClose = function(t) {
        return this.isEOF() || this.char() !== 125 ? this.error(J.EXPECT_ARGUMENT_CLOSING_BRACE, te(t, this.clonePosition())) : (this.bump(), {
            val: !0,
            err: null
        })
    }, e.prototype.parseSimpleArgStyleIfPossible = function() {
        for (var t = 0, n = this.clonePosition(); !this.isEOF();) {
            var r = this.char();
            switch (r) {
                case 39:
                    {
                        this.bump();
                        var i = this.clonePosition();
                        if (!this.bumpUntil("'")) return this.error(J.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE, te(i, this.clonePosition()));this.bump();
                        break
                    }
                case 123:
                    {
                        t += 1,
                        this.bump();
                        break
                    }
                case 125:
                    {
                        if (t > 0) t -= 1;
                        else return {
                            val: this.message.slice(n.offset, this.offset()),
                            err: null
                        };
                        break
                    }
                default:
                    this.bump();
                    break
            }
        }
        return {
            val: this.message.slice(n.offset, this.offset()),
            err: null
        }
    }, e.prototype.parseNumberSkeletonFromString = function(t, n) {
        var r = [];
        try {
            r = kR(t)
        } catch {
            return this.error(J.INVALID_NUMBER_SKELETON, n)
        }
        return {
            val: {
                type: bs.number,
                tokens: r,
                location: n,
                parsedOptions: this.shouldParseSkeletons ? AR(r) : {}
            },
            err: null
        }
    }, e.prototype.tryParsePluralOrSelectOptions = function(t, n, r, i) {
        for (var o, s = !1, a = [], u = new Set, l = i.value, c = i.location;;) {
            if (l.length === 0) {
                var f = this.clonePosition();
                if (n !== "select" && this.bumpIf("=")) {
                    var h = this.tryParseDecimalInteger(J.EXPECT_PLURAL_ARGUMENT_SELECTOR, J.INVALID_PLURAL_ARGUMENT_SELECTOR);
                    if (h.err) return h;
                    c = te(f, this.clonePosition()), l = this.message.slice(f.offset, this.offset())
                } else break
            }
            if (u.has(l)) return this.error(n === "select" ? J.DUPLICATE_SELECT_ARGUMENT_SELECTOR : J.DUPLICATE_PLURAL_ARGUMENT_SELECTOR, c);
            l === "other" && (s = !0), this.bumpSpace();
            var p = this.clonePosition();
            if (!this.bumpIf("{")) return this.error(n === "select" ? J.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT : J.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT, te(this.clonePosition(), this.clonePosition()));
            var y = this.parseMessage(t + 1, n, r);
            if (y.err) return y;
            var m = this.tryParseArgumentClose(p);
            if (m.err) return m;
            a.push([l, {
                value: y.val,
                location: te(p, this.clonePosition())
            }]), u.add(l), this.bumpSpace(), o = this.parseIdentifierIfPossible(), l = o.value, c = o.location
        }
        return a.length === 0 ? this.error(n === "select" ? J.EXPECT_SELECT_ARGUMENT_SELECTOR : J.EXPECT_PLURAL_ARGUMENT_SELECTOR, te(this.clonePosition(), this.clonePosition())) : this.requiresOtherClause && !s ? this.error(J.MISSING_OTHER_CLAUSE, te(this.clonePosition(), this.clonePosition())) : {
            val: a,
            err: null
        }
    }, e.prototype.tryParseDecimalInteger = function(t, n) {
        var r = 1,
            i = this.clonePosition();
        this.bumpIf("+") || this.bumpIf("-") && (r = -1);
        for (var o = !1, s = 0; !this.isEOF();) {
            var a = this.char();
            if (a >= 48 && a <= 57) o = !0, s = s * 10 + (a - 48), this.bump();
            else break
        }
        var u = te(i, this.clonePosition());
        return o ? (s *= r, WR(s) ? {
            val: s,
            err: null
        } : this.error(n, u)) : this.error(t, u)
    }, e.prototype.offset = function() {
        return this.position.offset
    }, e.prototype.isEOF = function() {
        return this.offset() === this.message.length
    }, e.prototype.clonePosition = function() {
        return {
            offset: this.position.offset,
            line: this.position.line,
            column: this.position.column
        }
    }, e.prototype.char = function() {
        var t = this.position.offset;
        if (t >= this.message.length) throw Error("out of bound");
        var n = aw(this.message, t);
        if (n === void 0) throw Error("Offset ".concat(t, " is at invalid UTF-16 code unit boundary"));
        return n
    }, e.prototype.error = function(t, n) {
        return {
            val: null,
            err: {
                kind: t,
                message: this.message,
                location: n
            }
        }
    }, e.prototype.bump = function() {
        if (!this.isEOF()) {
            var t = this.char();
            t === 10 ? (this.position.line += 1, this.position.column = 1, this.position.offset += 1) : (this.position.column += 1, this.position.offset += t < 65536 ? 1 : 2)
        }
    }, e.prototype.bumpIf = function(t) {
        if (Zg(this.message, t, this.offset())) {
            for (var n = 0; n < t.length; n++) this.bump();
            return !0
        }
        return !1
    }, e.prototype.bumpUntil = function(t) {
        var n = this.offset(),
            r = this.message.indexOf(t, n);
        return r >= 0 ? (this.bumpTo(r), !0) : (this.bumpTo(this.message.length), !1)
    }, e.prototype.bumpTo = function(t) {
        if (this.offset() > t) throw Error("targetOffset ".concat(t, " must be greater than or equal to the current offset ").concat(this.offset()));
        for (t = Math.min(t, this.message.length);;) {
            var n = this.offset();
            if (n === t) break;
            if (n > t) throw Error("targetOffset ".concat(t, " is at invalid UTF-16 code unit boundary"));
            if (this.bump(), this.isEOF()) break
        }
    }, e.prototype.bumpSpace = function() {
        for (; !this.isEOF() && lw(this.char());) this.bump()
    }, e.prototype.peek = function() {
        if (this.isEOF()) return null;
        var t = this.char(),
            n = this.offset(),
            r = this.message.charCodeAt(n + (t >= 65536 ? 2 : 1));
        return r ? ? null
    }, e
}();

function ip(e) {
    return e >= 97 && e <= 122 || e >= 65 && e <= 90
}

function YR(e) {
    return ip(e) || e === 47
}

function ZR(e) {
    return e === 45 || e === 46 || e >= 48 && e <= 57 || e === 95 || e >= 97 && e <= 122 || e >= 65 && e <= 90 || e == 183 || e >= 192 && e <= 214 || e >= 216 && e <= 246 || e >= 248 && e <= 893 || e >= 895 && e <= 8191 || e >= 8204 && e <= 8205 || e >= 8255 && e <= 8256 || e >= 8304 && e <= 8591 || e >= 11264 && e <= 12271 || e >= 12289 && e <= 55295 || e >= 63744 && e <= 64975 || e >= 65008 && e <= 65533 || e >= 65536 && e <= 983039
}

function lw(e) {
    return e >= 9 && e <= 13 || e === 32 || e === 133 || e >= 8206 && e <= 8207 || e === 8232 || e === 8233
}

function JR(e) {
    return e >= 33 && e <= 35 || e === 36 || e >= 37 && e <= 39 || e === 40 || e === 41 || e === 42 || e === 43 || e === 44 || e === 45 || e >= 46 && e <= 47 || e >= 58 && e <= 59 || e >= 60 && e <= 62 || e >= 63 && e <= 64 || e === 91 || e === 92 || e === 93 || e === 94 || e === 96 || e === 123 || e === 124 || e === 125 || e === 126 || e === 161 || e >= 162 && e <= 165 || e === 166 || e === 167 || e === 169 || e === 171 || e === 172 || e === 174 || e === 176 || e === 177 || e === 182 || e === 187 || e === 191 || e === 215 || e === 247 || e >= 8208 && e <= 8213 || e >= 8214 && e <= 8215 || e === 8216 || e === 8217 || e === 8218 || e >= 8219 && e <= 8220 || e === 8221 || e === 8222 || e === 8223 || e >= 8224 && e <= 8231 || e >= 8240 && e <= 8248 || e === 8249 || e === 8250 || e >= 8251 && e <= 8254 || e >= 8257 && e <= 8259 || e === 8260 || e === 8261 || e === 8262 || e >= 8263 && e <= 8273 || e === 8274 || e === 8275 || e >= 8277 && e <= 8286 || e >= 8592 && e <= 8596 || e >= 8597 && e <= 8601 || e >= 8602 && e <= 8603 || e >= 8604 && e <= 8607 || e === 8608 || e >= 8609 && e <= 8610 || e === 8611 || e >= 8612 && e <= 8613 || e === 8614 || e >= 8615 && e <= 8621 || e === 8622 || e >= 8623 && e <= 8653 || e >= 8654 && e <= 8655 || e >= 8656 && e <= 8657 || e === 8658 || e === 8659 || e === 8660 || e >= 8661 && e <= 8691 || e >= 8692 && e <= 8959 || e >= 8960 && e <= 8967 || e === 8968 || e === 8969 || e === 8970 || e === 8971 || e >= 8972 && e <= 8991 || e >= 8992 && e <= 8993 || e >= 8994 && e <= 9e3 || e === 9001 || e === 9002 || e >= 9003 && e <= 9083 || e === 9084 || e >= 9085 && e <= 9114 || e >= 9115 && e <= 9139 || e >= 9140 && e <= 9179 || e >= 9180 && e <= 9185 || e >= 9186 && e <= 9254 || e >= 9255 && e <= 9279 || e >= 9280 && e <= 9290 || e >= 9291 && e <= 9311 || e >= 9472 && e <= 9654 || e === 9655 || e >= 9656 && e <= 9664 || e === 9665 || e >= 9666 && e <= 9719 || e >= 9720 && e <= 9727 || e >= 9728 && e <= 9838 || e === 9839 || e >= 9840 && e <= 10087 || e === 10088 || e === 10089 || e === 10090 || e === 10091 || e === 10092 || e === 10093 || e === 10094 || e === 10095 || e === 10096 || e === 10097 || e === 10098 || e === 10099 || e === 10100 || e === 10101 || e >= 10132 && e <= 10175 || e >= 10176 && e <= 10180 || e === 10181 || e === 10182 || e >= 10183 && e <= 10213 || e === 10214 || e === 10215 || e === 10216 || e === 10217 || e === 10218 || e === 10219 || e === 10220 || e === 10221 || e === 10222 || e === 10223 || e >= 10224 && e <= 10239 || e >= 10240 && e <= 10495 || e >= 10496 && e <= 10626 || e === 10627 || e === 10628 || e === 10629 || e === 10630 || e === 10631 || e === 10632 || e === 10633 || e === 10634 || e === 10635 || e === 10636 || e === 10637 || e === 10638 || e === 10639 || e === 10640 || e === 10641 || e === 10642 || e === 10643 || e === 10644 || e === 10645 || e === 10646 || e === 10647 || e === 10648 || e >= 10649 && e <= 10711 || e === 10712 || e === 10713 || e === 10714 || e === 10715 || e >= 10716 && e <= 10747 || e === 10748 || e === 10749 || e >= 10750 && e <= 11007 || e >= 11008 && e <= 11055 || e >= 11056 && e <= 11076 || e >= 11077 && e <= 11078 || e >= 11079 && e <= 11084 || e >= 11085 && e <= 11123 || e >= 11124 && e <= 11125 || e >= 11126 && e <= 11157 || e === 11158 || e >= 11159 && e <= 11263 || e >= 11776 && e <= 11777 || e === 11778 || e === 11779 || e === 11780 || e === 11781 || e >= 11782 && e <= 11784 || e === 11785 || e === 11786 || e === 11787 || e === 11788 || e === 11789 || e >= 11790 && e <= 11798 || e === 11799 || e >= 11800 && e <= 11801 || e === 11802 || e === 11803 || e === 11804 || e === 11805 || e >= 11806 && e <= 11807 || e === 11808 || e === 11809 || e === 11810 || e === 11811 || e === 11812 || e === 11813 || e === 11814 || e === 11815 || e === 11816 || e === 11817 || e >= 11818 && e <= 11822 || e === 11823 || e >= 11824 && e <= 11833 || e >= 11834 && e <= 11835 || e >= 11836 && e <= 11839 || e === 11840 || e === 11841 || e === 11842 || e >= 11843 && e <= 11855 || e >= 11856 && e <= 11857 || e === 11858 || e >= 11859 && e <= 11903 || e >= 12289 && e <= 12291 || e === 12296 || e === 12297 || e === 12298 || e === 12299 || e === 12300 || e === 12301 || e === 12302 || e === 12303 || e === 12304 || e === 12305 || e >= 12306 && e <= 12307 || e === 12308 || e === 12309 || e === 12310 || e === 12311 || e === 12312 || e === 12313 || e === 12314 || e === 12315 || e === 12316 || e === 12317 || e >= 12318 && e <= 12319 || e === 12320 || e === 12336 || e === 64830 || e === 64831 || e >= 65093 && e <= 65094
}

function op(e) {
    e.forEach(function(t) {
        if (delete t.location, JS(t) || ew(t))
            for (var n in t.options) delete t.options[n].location, op(t.options[n].value);
        else KS(t) && nw(t.style) || (YS(t) || ZS(t)) && ep(t.style) ? delete t.style.location : tw(t) && op(t.children)
    })
}

function ek(e, t) {
    t === void 0 && (t = {}), t = z({
        shouldParseSkeletons: !0,
        requiresOtherClause: !0
    }, t);
    var n = new KR(e, t).parse();
    if (n.err) {
        var r = SyntaxError(J[n.err.kind]);
        throw r.location = n.err.location, r.originalMessage = n.err.message, r
    }
    return t != null && t.captureLocation || op(n.val), n.val
}

function Fn(e, t) {
    var n = t && t.cache ? t.cache : sk,
        r = t && t.serializer ? t.serializer : ok,
        i = t && t.strategy ? t.strategy : nk;
    return i(e, {
        cache: n,
        serializer: r
    })
}

function tk(e) {
    return e == null || typeof e == "number" || typeof e == "boolean"
}

function cw(e, t, n, r) {
    var i = tk(r) ? r : n(r),
        o = t.get(i);
    return typeof o > "u" && (o = e.call(this, r), t.set(i, o)), o
}

function fw(e, t, n) {
    var r = Array.prototype.slice.call(arguments, 3),
        i = n(r),
        o = t.get(i);
    return typeof o > "u" && (o = e.apply(this, r), t.set(i, o)), o
}

function Zm(e, t, n, r, i) {
    return n.bind(t, e, r, i)
}

function nk(e, t) {
    var n = e.length === 1 ? cw : fw;
    return Zm(e, this, n, t.cache.create(), t.serializer)
}

function rk(e, t) {
    return Zm(e, this, fw, t.cache.create(), t.serializer)
}

function ik(e, t) {
    return Zm(e, this, cw, t.cache.create(), t.serializer)
}
var ok = function() {
    return JSON.stringify(arguments)
};

function Jm() {
    this.cache = Object.create(null)
}
Jm.prototype.get = function(e) {
    return this.cache[e]
};
Jm.prototype.set = function(e, t) {
    this.cache[e] = t
};
var sk = {
        create: function() {
            return new Jm
        }
    },
    $n = {
        variadic: rk,
        monadic: ik
    },
    Jn;
(function(e) {
    e.MISSING_VALUE = "MISSING_VALUE", e.INVALID_VALUE = "INVALID_VALUE", e.MISSING_INTL_API = "MISSING_INTL_API"
})(Jn || (Jn = {}));
var vi = function(e) {
        _n(t, e);

        function t(n, r, i) {
            var o = e.call(this, n) || this;
            return o.code = r, o.originalMessage = i, o
        }
        return t.prototype.toString = function() {
            return "[formatjs Error: ".concat(this.code, "] ").concat(this.message)
        }, t
    }(Error),
    ty = function(e) {
        _n(t, e);

        function t(n, r, i, o) {
            return e.call(this, 'Invalid values for "'.concat(n, '": "').concat(r, '". Options are "').concat(Object.keys(i).join('", "'), '"'), Jn.INVALID_VALUE, o) || this
        }
        return t
    }(vi),
    ak = function(e) {
        _n(t, e);

        function t(n, r, i) {
            return e.call(this, 'Value for "'.concat(n, '" must be of type ').concat(r), Jn.INVALID_VALUE, i) || this
        }
        return t
    }(vi),
    uk = function(e) {
        _n(t, e);

        function t(n, r) {
            return e.call(this, 'The intl string context variable "'.concat(n, '" was not provided to the string "').concat(r, '"'), Jn.MISSING_VALUE, r) || this
        }
        return t
    }(vi),
    ft;
(function(e) {
    e[e.literal = 0] = "literal", e[e.object = 1] = "object"
})(ft || (ft = {}));

function lk(e) {
    return e.length < 2 ? e : e.reduce(function(t, n) {
        var r = t[t.length - 1];
        return !r || r.type !== ft.literal || n.type !== ft.literal ? t.push(n) : r.value += n.value, t
    }, [])
}

function hw(e) {
    return typeof e == "function"
}

function Rl(e, t, n, r, i, o, s) {
    if (e.length === 1 && Xg(e[0])) return [{
        type: ft.literal,
        value: e[0].value
    }];
    for (var a = [], u = 0, l = e; u < l.length; u++) {
        var c = l[u];
        if (Xg(c)) {
            a.push({
                type: ft.literal,
                value: c.value
            });
            continue
        }
        if (bR(c)) {
            typeof o == "number" && a.push({
                type: ft.literal,
                value: n.getNumberFormat(t).format(o)
            });
            continue
        }
        var f = c.value;
        if (!(i && f in i)) throw new uk(f, s);
        var h = i[f];
        if (OR(c)) {
            (!h || typeof h == "string" || typeof h == "number") && (h = typeof h == "string" || typeof h == "number" ? String(h) : ""), a.push({
                type: typeof h == "string" ? ft.literal : ft.object,
                value: h
            });
            continue
        }
        if (YS(c)) {
            var p = typeof c.style == "string" ? r.date[c.style] : ep(c.style) ? c.style.parsedOptions : void 0;
            a.push({
                type: ft.literal,
                value: n.getDateTimeFormat(t, p).format(h)
            });
            continue
        }
        if (ZS(c)) {
            var p = typeof c.style == "string" ? r.time[c.style] : ep(c.style) ? c.style.parsedOptions : r.time.medium;
            a.push({
                type: ft.literal,
                value: n.getDateTimeFormat(t, p).format(h)
            });
            continue
        }
        if (KS(c)) {
            var p = typeof c.style == "string" ? r.number[c.style] : nw(c.style) ? c.style.parsedOptions : void 0;
            p && p.scale && (h = h * (p.scale || 1)), a.push({
                type: ft.literal,
                value: n.getNumberFormat(t, p).format(h)
            });
            continue
        }
        if (tw(c)) {
            var y = c.children,
                m = c.value,
                _ = i[m];
            if (!hw(_)) throw new ak(m, "function", s);
            var g = Rl(y, t, n, r, i, o),
                d = _(g.map(function(S) {
                    return S.value
                }));
            Array.isArray(d) || (d = [d]), a.push.apply(a, d.map(function(S) {
                return {
                    type: typeof S == "string" ? ft.literal : ft.object,
                    value: S
                }
            }))
        }
        if (JS(c)) {
            var v = c.options[h] || c.options.other;
            if (!v) throw new ty(c.value, h, Object.keys(c.options), s);
            a.push.apply(a, Rl(v.value, t, n, r, i));
            continue
        }
        if (ew(c)) {
            var v = c.options["=".concat(h)];
            if (!v) {
                if (!Intl.PluralRules) throw new vi(`Intl.PluralRules is not available in this environment.
Try polyfilling it using "@formatjs/intl-pluralrules"
`, Jn.MISSING_INTL_API, s);
                var E = n.getPluralRules(t, {
                    type: c.pluralType
                }).select(h - (c.offset || 0));
                v = c.options[E] || c.options.other
            }
            if (!v) throw new ty(c.value, h, Object.keys(c.options), s);
            a.push.apply(a, Rl(v.value, t, n, r, i, h - (c.offset || 0)));
            continue
        }
    }
    return lk(a)
}

function ck(e, t) {
    return t ? z(z(z({}, e || {}), t || {}), Object.keys(e).reduce(function(n, r) {
        return n[r] = z(z({}, e[r]), t[r] || {}), n
    }, {})) : e
}

function fk(e, t) {
    return t ? Object.keys(e).reduce(function(n, r) {
        return n[r] = ck(e[r], t[r]), n
    }, z({}, e)) : e
}

function ah(e) {
    return {
        create: function() {
            return {
                get: function(t) {
                    return e[t]
                },
                set: function(t, n) {
                    e[t] = n
                }
            }
        }
    }
}

function hk(e) {
    return e === void 0 && (e = {
        number: {},
        dateTime: {},
        pluralRules: {}
    }), {
        getNumberFormat: Fn(function() {
            for (var t, n = [], r = 0; r < arguments.length; r++) n[r] = arguments[r];
            return new((t = Intl.NumberFormat).bind.apply(t, Gn([void 0], n, !1)))
        }, {
            cache: ah(e.number),
            strategy: $n.variadic
        }),
        getDateTimeFormat: Fn(function() {
            for (var t, n = [], r = 0; r < arguments.length; r++) n[r] = arguments[r];
            return new((t = Intl.DateTimeFormat).bind.apply(t, Gn([void 0], n, !1)))
        }, {
            cache: ah(e.dateTime),
            strategy: $n.variadic
        }),
        getPluralRules: Fn(function() {
            for (var t, n = [], r = 0; r < arguments.length; r++) n[r] = arguments[r];
            return new((t = Intl.PluralRules).bind.apply(t, Gn([void 0], n, !1)))
        }, {
            cache: ah(e.pluralRules),
            strategy: $n.variadic
        })
    }
}
var dw = function() {
        function e(t, n, r, i) {
            var o = this;
            if (n === void 0 && (n = e.defaultLocale), this.formatterCache = {
                    number: {},
                    dateTime: {},
                    pluralRules: {}
                }, this.format = function(u) {
                    var l = o.formatToParts(u);
                    if (l.length === 1) return l[0].value;
                    var c = l.reduce(function(f, h) {
                        return !f.length || h.type !== ft.literal || typeof f[f.length - 1] != "string" ? f.push(h.value) : f[f.length - 1] += h.value, f
                    }, []);
                    return c.length <= 1 ? c[0] || "" : c
                }, this.formatToParts = function(u) {
                    return Rl(o.ast, o.locales, o.formatters, o.formats, u, void 0, o.message)
                }, this.resolvedOptions = function() {
                    var u;
                    return {
                        locale: ((u = o.resolvedLocale) === null || u === void 0 ? void 0 : u.toString()) || Intl.NumberFormat.supportedLocalesOf(o.locales)[0]
                    }
                }, this.getAst = function() {
                    return o.ast
                }, this.locales = n, this.resolvedLocale = e.resolveLocale(n), typeof t == "string") {
                if (this.message = t, !e.__parse) throw new TypeError("IntlMessageFormat.__parse must be set to process `message` of type `string`");
                var s = i || {};
                s.formatters;
                var a = Wc(s, ["formatters"]);
                this.ast = e.__parse(t, z(z({}, a), {
                    locale: this.resolvedLocale
                }))
            } else this.ast = t;
            if (!Array.isArray(this.ast)) throw new TypeError("A message must be provided as a String or AST.");
            this.formats = fk(e.formats, r), this.formatters = i && i.formatters || hk(this.formatterCache)
        }
        return Object.defineProperty(e, "defaultLocale", {
            get: function() {
                return e.memoizedDefaultLocale || (e.memoizedDefaultLocale = new Intl.NumberFormat().resolvedOptions().locale), e.memoizedDefaultLocale
            },
            enumerable: !1,
            configurable: !0
        }), e.memoizedDefaultLocale = null, e.resolveLocale = function(t) {
            if (!(typeof Intl.Locale > "u")) {
                var n = Intl.NumberFormat.supportedLocalesOf(t);
                return n.length > 0 ? new Intl.Locale(n[0]) : new Intl.Locale(typeof t == "string" ? t : t[0])
            }
        }, e.__parse = ek, e.formats = {
            number: {
                integer: {
                    maximumFractionDigits: 0
                },
                currency: {
                    style: "currency"
                },
                percent: {
                    style: "percent"
                }
            },
            date: {
                short: {
                    month: "numeric",
                    day: "numeric",
                    year: "2-digit"
                },
                medium: {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                },
                long: {
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                },
                full: {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                }
            },
            time: {
                short: {
                    hour: "numeric",
                    minute: "numeric"
                },
                medium: {
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric"
                },
                long: {
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    timeZoneName: "short"
                },
                full: {
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    timeZoneName: "short"
                }
            }
        }, e
    }(),
    to;
(function(e) {
    e.FORMAT_ERROR = "FORMAT_ERROR", e.UNSUPPORTED_FORMATTER = "UNSUPPORTED_FORMATTER", e.INVALID_CONFIG = "INVALID_CONFIG", e.MISSING_DATA = "MISSING_DATA", e.MISSING_TRANSLATION = "MISSING_TRANSLATION"
})(to || (to = {}));
var xu = function(e) {
        _n(t, e);

        function t(n, r, i) {
            var o = this,
                s = i ? i instanceof Error ? i : new Error(String(i)) : void 0;
            return o = e.call(this, "[@formatjs/intl Error ".concat(n, "] ").concat(r, `
`).concat(s ? `
`.concat(s.message, `
`).concat(s.stack) : "")) || this, o.code = n, typeof Error.captureStackTrace == "function" && Error.captureStackTrace(o, t), o
        }
        return t
    }(Error),
    dk = function(e) {
        _n(t, e);

        function t(n, r) {
            return e.call(this, to.UNSUPPORTED_FORMATTER, n, r) || this
        }
        return t
    }(xu),
    pk = function(e) {
        _n(t, e);

        function t(n, r) {
            return e.call(this, to.INVALID_CONFIG, n, r) || this
        }
        return t
    }(xu),
    ny = function(e) {
        _n(t, e);

        function t(n, r) {
            return e.call(this, to.MISSING_DATA, n, r) || this
        }
        return t
    }(xu),
    En = function(e) {
        _n(t, e);

        function t(n, r, i) {
            var o = e.call(this, to.FORMAT_ERROR, "".concat(n, `
Locale: `).concat(r, `
`), i) || this;
            return o.locale = r, o
        }
        return t
    }(xu),
    uh = function(e) {
        _n(t, e);

        function t(n, r, i, o) {
            var s = e.call(this, "".concat(n, `
MessageID: `).concat(i == null ? void 0 : i.id, `
Default Message: `).concat(i == null ? void 0 : i.defaultMessage, `
Description: `).concat(i == null ? void 0 : i.description, `
`), r, o) || this;
            return s.descriptor = i, s.locale = r, s
        }
        return t
    }(En),
    mk = function(e) {
        _n(t, e);

        function t(n, r) {
            var i = e.call(this, to.MISSING_TRANSLATION, 'Missing message: "'.concat(n.id, '" for locale "').concat(r, '", using ').concat(n.defaultMessage ? "default message (".concat(typeof n.defaultMessage == "string" ? n.defaultMessage : n.defaultMessage.map(function(o) {
                var s;
                return (s = o.value) !== null && s !== void 0 ? s : JSON.stringify(o)
            }).join(), ")") : "id", " as fallback.")) || this;
            return i.descriptor = n, i
        }
        return t
    }(xu);

function lo(e, t, n) {
    return n === void 0 && (n = {}), t.reduce(function(r, i) {
        return i in e ? r[i] = e[i] : i in n && (r[i] = n[i]), r
    }, {})
}
var vk = function(e) {},
    gk = function(e) {},
    pw = {
        formats: {},
        messages: {},
        timeZone: void 0,
        defaultLocale: "en",
        defaultFormats: {},
        fallbackOnEmptyString: !0,
        onError: vk,
        onWarn: gk
    };

function mw() {
    return {
        dateTime: {},
        number: {},
        message: {},
        relativeTime: {},
        pluralRules: {},
        list: {},
        displayNames: {}
    }
}

function _i(e) {
    return {
        create: function() {
            return {
                get: function(t) {
                    return e[t]
                },
                set: function(t, n) {
                    e[t] = n
                }
            }
        }
    }
}

function yk(e) {
    e === void 0 && (e = mw());
    var t = Intl.RelativeTimeFormat,
        n = Intl.ListFormat,
        r = Intl.DisplayNames,
        i = Fn(function() {
            for (var a, u = [], l = 0; l < arguments.length; l++) u[l] = arguments[l];
            return new((a = Intl.DateTimeFormat).bind.apply(a, Gn([void 0], u, !1)))
        }, {
            cache: _i(e.dateTime),
            strategy: $n.variadic
        }),
        o = Fn(function() {
            for (var a, u = [], l = 0; l < arguments.length; l++) u[l] = arguments[l];
            return new((a = Intl.NumberFormat).bind.apply(a, Gn([void 0], u, !1)))
        }, {
            cache: _i(e.number),
            strategy: $n.variadic
        }),
        s = Fn(function() {
            for (var a, u = [], l = 0; l < arguments.length; l++) u[l] = arguments[l];
            return new((a = Intl.PluralRules).bind.apply(a, Gn([void 0], u, !1)))
        }, {
            cache: _i(e.pluralRules),
            strategy: $n.variadic
        });
    return {
        getDateTimeFormat: i,
        getNumberFormat: o,
        getMessageFormat: Fn(function(a, u, l, c) {
            return new dw(a, u, l, z({
                formatters: {
                    getNumberFormat: o,
                    getDateTimeFormat: i,
                    getPluralRules: s
                }
            }, c || {}))
        }, {
            cache: _i(e.message),
            strategy: $n.variadic
        }),
        getRelativeTimeFormat: Fn(function() {
            for (var a = [], u = 0; u < arguments.length; u++) a[u] = arguments[u];
            return new(t.bind.apply(t, Gn([void 0], a, !1)))
        }, {
            cache: _i(e.relativeTime),
            strategy: $n.variadic
        }),
        getPluralRules: s,
        getListFormat: Fn(function() {
            for (var a = [], u = 0; u < arguments.length; u++) a[u] = arguments[u];
            return new(n.bind.apply(n, Gn([void 0], a, !1)))
        }, {
            cache: _i(e.list),
            strategy: $n.variadic
        }),
        getDisplayNames: Fn(function() {
            for (var a = [], u = 0; u < arguments.length; u++) a[u] = arguments[u];
            return new(r.bind.apply(r, Gn([void 0], a, !1)))
        }, {
            cache: _i(e.displayNames),
            strategy: $n.variadic
        })
    }
}

function e0(e, t, n, r) {
    var i = e && e[t],
        o;
    if (i && (o = i[n]), o) return o;
    r(new dk("No ".concat(t, " format named: ").concat(n)))
}

function rl(e, t) {
    return Object.keys(e).reduce(function(n, r) {
        return n[r] = z({
            timeZone: t
        }, e[r]), n
    }, {})
}

function ry(e, t) {
    var n = Object.keys(z(z({}, e), t));
    return n.reduce(function(r, i) {
        return r[i] = z(z({}, e[i] || {}), t[i] || {}), r
    }, {})
}

function iy(e, t) {
    if (!t) return e;
    var n = dw.formats;
    return z(z(z({}, n), e), {
        date: ry(rl(n.date, t), rl(e.date || {}, t)),
        time: ry(rl(n.time, t), rl(e.time || {}, t))
    })
}
var sp = function(e, t, n, r, i) {
        var o = e.locale,
            s = e.formats,
            a = e.messages,
            u = e.defaultLocale,
            l = e.defaultFormats,
            c = e.fallbackOnEmptyString,
            f = e.onError,
            h = e.timeZone,
            p = e.defaultRichTextElements;
        n === void 0 && (n = {
            id: ""
        });
        var y = n.id,
            m = n.defaultMessage;
        QS(!!y, "[@formatjs/intl] An `id` must be provided to format a message. You can either:\n1. Configure your build toolchain with [babel-plugin-formatjs](https://formatjs.io/docs/tooling/babel-plugin)\nor [@formatjs/ts-transformer](https://formatjs.io/docs/tooling/ts-transformer) OR\n2. Configure your `eslint` config to include [eslint-plugin-formatjs](https://formatjs.io/docs/tooling/linter#enforce-id)\nto autofix this issue");
        var _ = String(y),
            g = a && Object.prototype.hasOwnProperty.call(a, _) && a[_];
        if (Array.isArray(g) && g.length === 1 && g[0].type === ge.literal) return g[0].value;
        if (!r && g && typeof g == "string" && !p) return g.replace(/'\{(.*?)\}'/gi, "{$1}");
        if (r = z(z({}, p), r || {}), s = iy(s, h), l = iy(l, h), !g) {
            if (c === !1 && g === "") return g;
            if ((!m || o && o.toLowerCase() !== u.toLowerCase()) && f(new mk(n, o)), m) try {
                var d = t.getMessageFormat(m, u, l, i);
                return d.format(r)
            } catch (v) {
                return f(new uh('Error formatting default message for: "'.concat(_, '", rendering default message verbatim'), o, n, v)), typeof m == "string" ? m : _
            }
            return _
        }
        try {
            var d = t.getMessageFormat(g, o, s, z({
                formatters: t
            }, i || {}));
            return d.format(r)
        } catch (v) {
            f(new uh('Error formatting message: "'.concat(_, '", using ').concat(m ? "default message" : "id", " as fallback."), o, n, v))
        }
        if (m) try {
            var d = t.getMessageFormat(m, u, l, i);
            return d.format(r)
        } catch (v) {
            f(new uh('Error formatting the default message for: "'.concat(_, '", rendering message verbatim'), o, n, v))
        }
        return typeof g == "string" ? g : typeof m == "string" ? m : _
    },
    vw = ["formatMatcher", "timeZone", "hour12", "weekday", "era", "year", "month", "day", "hour", "minute", "second", "timeZoneName", "hourCycle", "dateStyle", "timeStyle", "calendar", "numberingSystem", "fractionalSecondDigits"];

function rf(e, t, n, r) {
    var i = e.locale,
        o = e.formats,
        s = e.onError,
        a = e.timeZone;
    r === void 0 && (r = {});
    var u = r.format,
        l = z(z({}, a && {
            timeZone: a
        }), u && e0(o, t, u, s)),
        c = lo(r, vw, l);
    return t === "time" && !c.hour && !c.minute && !c.second && !c.timeStyle && !c.dateStyle && (c = z(z({}, c), {
        hour: "numeric",
        minute: "numeric"
    })), n(i, c)
}

function _k(e, t) {
    for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
    var i = n[0],
        o = n[1],
        s = o === void 0 ? {} : o,
        a = typeof i == "string" ? new Date(i || 0) : i;
    try {
        return rf(e, "date", t, s).format(a)
    } catch (u) {
        e.onError(new En("Error formatting date.", e.locale, u))
    }
    return String(a)
}

function Ek(e, t) {
    for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
    var i = n[0],
        o = n[1],
        s = o === void 0 ? {} : o,
        a = typeof i == "string" ? new Date(i || 0) : i;
    try {
        return rf(e, "time", t, s).format(a)
    } catch (u) {
        e.onError(new En("Error formatting time.", e.locale, u))
    }
    return String(a)
}

function Sk(e, t) {
    for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
    var i = n[0],
        o = n[1],
        s = n[2],
        a = s === void 0 ? {} : s,
        u = e.timeZone,
        l = e.locale,
        c = e.onError,
        f = lo(a, vw, u ? {
            timeZone: u
        } : {});
    try {
        return t(l, f).formatRange(i, o)
    } catch (h) {
        c(new En("Error formatting date time range.", e.locale, h))
    }
    return String(i)
}

function wk(e, t) {
    for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
    var i = n[0],
        o = n[1],
        s = o === void 0 ? {} : o,
        a = typeof i == "string" ? new Date(i || 0) : i;
    try {
        return rf(e, "date", t, s).formatToParts(a)
    } catch (u) {
        e.onError(new En("Error formatting date.", e.locale, u))
    }
    return []
}

function xk(e, t) {
    for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
    var i = n[0],
        o = n[1],
        s = o === void 0 ? {} : o,
        a = typeof i == "string" ? new Date(i || 0) : i;
    try {
        return rf(e, "time", t, s).formatToParts(a)
    } catch (u) {
        e.onError(new En("Error formatting time.", e.locale, u))
    }
    return []
}
var Tk = ["style", "type", "fallback", "languageDisplay"];

function Ok(e, t, n, r) {
    var i = e.locale,
        o = e.onError,
        s = Intl.DisplayNames;
    s || o(new vi(`Intl.DisplayNames is not available in this environment.
Try polyfilling it using "@formatjs/intl-displaynames"
`, Jn.MISSING_INTL_API));
    var a = lo(r, Tk);
    try {
        return t(i, a).of(n)
    } catch (u) {
        o(new En("Error formatting display name.", i, u))
    }
}
var bk = ["type", "style"],
    oy = Date.now();

function Pk(e) {
    return "".concat(oy, "_").concat(e, "_").concat(oy)
}

function Ck(e, t, n, r) {
    r === void 0 && (r = {});
    var i = gw(e, t, n, r).reduce(function(o, s) {
        var a = s.value;
        return typeof a != "string" ? o.push(a) : typeof o[o.length - 1] == "string" ? o[o.length - 1] += a : o.push(a), o
    }, []);
    return i.length === 1 ? i[0] : i.length === 0 ? "" : i
}

function gw(e, t, n, r) {
    var i = e.locale,
        o = e.onError;
    r === void 0 && (r = {});
    var s = Intl.ListFormat;
    s || o(new vi(`Intl.ListFormat is not available in this environment.
Try polyfilling it using "@formatjs/intl-listformat"
`, Jn.MISSING_INTL_API));
    var a = lo(r, bk);
    try {
        var u = {},
            l = n.map(function(c, f) {
                if (typeof c == "object") {
                    var h = Pk(f);
                    return u[h] = c, h
                }
                return String(c)
            });
        return t(i, a).formatToParts(l).map(function(c) {
            return c.type === "literal" ? c : z(z({}, c), {
                value: u[c.value] || c.value
            })
        })
    } catch (c) {
        o(new En("Error formatting list.", i, c))
    }
    return n
}
var Rk = ["type"];

function kk(e, t, n, r) {
    var i = e.locale,
        o = e.onError;
    r === void 0 && (r = {}), Intl.PluralRules || o(new vi(`Intl.PluralRules is not available in this environment.
Try polyfilling it using "@formatjs/intl-pluralrules"
`, Jn.MISSING_INTL_API));
    var s = lo(r, Rk);
    try {
        return t(i, s).select(n)
    } catch (a) {
        o(new En("Error formatting plural.", i, a))
    }
    return "other"
}
var Mk = ["numeric", "style"];

function Ik(e, t, n) {
    var r = e.locale,
        i = e.formats,
        o = e.onError;
    n === void 0 && (n = {});
    var s = n.format,
        a = !!s && e0(i, "relative", s, o) || {},
        u = lo(n, Mk, a);
    return t(r, u)
}

function Lk(e, t, n, r, i) {
    i === void 0 && (i = {}), r || (r = "second");
    var o = Intl.RelativeTimeFormat;
    o || e.onError(new vi(`Intl.RelativeTimeFormat is not available in this environment.
Try polyfilling it using "@formatjs/intl-relativetimeformat"
`, Jn.MISSING_INTL_API));
    try {
        return Ik(e, t, i).format(n, r)
    } catch (s) {
        e.onError(new En("Error formatting relative time.", e.locale, s))
    }
    return String(n)
}
var Ak = ["style", "currency", "unit", "unitDisplay", "useGrouping", "minimumIntegerDigits", "minimumFractionDigits", "maximumFractionDigits", "minimumSignificantDigits", "maximumSignificantDigits", "compactDisplay", "currencyDisplay", "currencySign", "notation", "signDisplay", "unit", "unitDisplay", "numberingSystem", "trailingZeroDisplay", "roundingPriority", "roundingIncrement", "roundingMode"];

function yw(e, t, n) {
    var r = e.locale,
        i = e.formats,
        o = e.onError;
    n === void 0 && (n = {});
    var s = n.format,
        a = s && e0(i, "number", s, o) || {},
        u = lo(n, Ak, a);
    return t(r, u)
}

function Nk(e, t, n, r) {
    r === void 0 && (r = {});
    try {
        return yw(e, t, r).format(n)
    } catch (i) {
        e.onError(new En("Error formatting number.", e.locale, i))
    }
    return String(n)
}

function Dk(e, t, n, r) {
    r === void 0 && (r = {});
    try {
        return yw(e, t, r).formatToParts(n)
    } catch (i) {
        e.onError(new En("Error formatting number.", e.locale, i))
    }
    return []
}

function Fk(e) {
    var t = e ? e[Object.keys(e)[0]] : void 0;
    return typeof t == "string"
}

function $k(e) {
    e.onWarn && e.defaultRichTextElements && Fk(e.messages || {}) && e.onWarn(`[@formatjs/intl] "defaultRichTextElements" was specified but "message" was not pre-compiled. 
Please consider using "@formatjs/cli" to pre-compile your messages for performance.
For more details see https://formatjs.io/docs/getting-started/message-distribution`)
}

function Bk(e, t) {
    var n = yk(t),
        r = z(z({}, pw), e),
        i = r.locale,
        o = r.defaultLocale,
        s = r.onError;
    return i ? !Intl.NumberFormat.supportedLocalesOf(i).length && s ? s(new ny('Missing locale data for locale: "'.concat(i, '" in Intl.NumberFormat. Using default locale: "').concat(o, '" as fallback. See https://formatjs.io/docs/react-intl#runtime-requirements for more details'))) : !Intl.DateTimeFormat.supportedLocalesOf(i).length && s && s(new ny('Missing locale data for locale: "'.concat(i, '" in Intl.DateTimeFormat. Using default locale: "').concat(o, '" as fallback. See https://formatjs.io/docs/react-intl#runtime-requirements for more details'))) : (s && s(new pk('"locale" was not configured, using "'.concat(o, '" as fallback. See https://formatjs.io/docs/react-intl/api#intlshape for more details'))), r.locale = r.defaultLocale || "en"), $k(r), z(z({}, r), {
        formatters: n,
        formatNumber: Nk.bind(null, r, n.getNumberFormat),
        formatNumberToParts: Dk.bind(null, r, n.getNumberFormat),
        formatRelativeTime: Lk.bind(null, r, n.getRelativeTimeFormat),
        formatDate: _k.bind(null, r, n.getDateTimeFormat),
        formatDateToParts: wk.bind(null, r, n.getDateTimeFormat),
        formatTime: Ek.bind(null, r, n.getDateTimeFormat),
        formatDateTimeRange: Sk.bind(null, r, n.getDateTimeFormat),
        formatTimeToParts: xk.bind(null, r, n.getDateTimeFormat),
        formatPlural: kk.bind(null, r, n.getPluralRules),
        formatMessage: sp.bind(null, r, n),
        $t: sp.bind(null, r, n),
        formatList: Ck.bind(null, r, n.getListFormat),
        formatListToParts: gw.bind(null, r, n.getListFormat),
        formatDisplayName: Ok.bind(null, r, n.getDisplayNames)
    })
}

function _w(e) {
    QS(e, "[React Intl] Could not find required `intl` object. <IntlProvider> needs to exist in the component ancestry.")
}
var Ew = z(z({}, pw), {
    textComponent: L.Fragment
});

function jk(e) {
    return function(t) {
        return e(L.Children.toArray(t))
    }
}

function Hk(e, t) {
    if (e === t) return !0;
    if (!e || !t) return !1;
    var n = Object.keys(e),
        r = Object.keys(t),
        i = n.length;
    if (r.length !== i) return !1;
    for (var o = 0; o < i; o++) {
        var s = n[o];
        if (e[s] !== t[s] || !Object.prototype.hasOwnProperty.call(t, s)) return !1
    }
    return !0
}
var t0 = typeof window < "u" && !window.__REACT_INTL_BYPASS_GLOBAL_CONTEXT__ ? window.__REACT_INTL_CONTEXT__ || (window.__REACT_INTL_CONTEXT__ = L.createContext(null)) : L.createContext(null);
t0.Consumer;
var Uk = t0.Provider,
    zk = Uk,
    Gk = t0;

function Sw() {
    var e = L.useContext(Gk);
    return _w(e), e
}
var ap;
(function(e) {
    e.formatDate = "FormattedDate", e.formatTime = "FormattedTime", e.formatNumber = "FormattedNumber", e.formatList = "FormattedList", e.formatDisplayName = "FormattedDisplayName"
})(ap || (ap = {}));
var up;
(function(e) {
    e.formatDate = "FormattedDateParts", e.formatTime = "FormattedTimeParts", e.formatNumber = "FormattedNumberParts", e.formatList = "FormattedListParts"
})(up || (up = {}));

function ww(e) {
    var t = function(n) {
        var r = Sw(),
            i = n.value,
            o = n.children,
            s = Wc(n, ["value", "children"]),
            a = typeof i == "string" ? new Date(i || 0) : i,
            u = e === "formatDate" ? r.formatDateToParts(a, s) : r.formatTimeToParts(a, s);
        return o(u)
    };
    return t.displayName = up[e], t
}

function Tu(e) {
    var t = function(n) {
        var r = Sw(),
            i = n.value,
            o = n.children,
            s = Wc(n, ["value", "children"]),
            a = r[e](i, s);
        if (typeof o == "function") return o(a);
        var u = r.textComponent || L.Fragment;
        return L.createElement(u, null, a)
    };
    return t.displayName = ap[e], t
}

function xw(e) {
    return e && Object.keys(e).reduce(function(t, n) {
        var r = e[n];
        return t[n] = hw(r) ? jk(r) : r, t
    }, {})
}
var sy = function(e, t, n, r) {
        for (var i = [], o = 4; o < arguments.length; o++) i[o - 4] = arguments[o];
        var s = xw(r),
            a = sp.apply(void 0, Gn([e, t, n, s], i, !1));
        return Array.isArray(a) ? L.Children.toArray(a) : a
    },
    ay = function(e, t) {
        var n = e.defaultRichTextElements,
            r = Wc(e, ["defaultRichTextElements"]),
            i = xw(n),
            o = Bk(z(z(z({}, Ew), r), {
                defaultRichTextElements: i
            }), t),
            s = {
                locale: o.locale,
                timeZone: o.timeZone,
                fallbackOnEmptyString: o.fallbackOnEmptyString,
                formats: o.formats,
                defaultLocale: o.defaultLocale,
                defaultFormats: o.defaultFormats,
                messages: o.messages,
                onError: o.onError,
                defaultRichTextElements: i
            };
        return z(z({}, o), {
            formatMessage: sy.bind(null, s, o.formatters),
            $t: sy.bind(null, s, o.formatters)
        })
    };

function lh(e) {
    return {
        locale: e.locale,
        timeZone: e.timeZone,
        fallbackOnEmptyString: e.fallbackOnEmptyString,
        formats: e.formats,
        textComponent: e.textComponent,
        messages: e.messages,
        defaultLocale: e.defaultLocale,
        defaultFormats: e.defaultFormats,
        onError: e.onError,
        onWarn: e.onWarn,
        wrapRichTextChunksInFragment: e.wrapRichTextChunksInFragment,
        defaultRichTextElements: e.defaultRichTextElements
    }
}
var Vk = function(e) {
    _n(t, e);

    function t() {
        var n = e !== null && e.apply(this, arguments) || this;
        return n.cache = mw(), n.state = {
            cache: n.cache,
            intl: ay(lh(n.props), n.cache),
            prevConfig: lh(n.props)
        }, n
    }
    return t.getDerivedStateFromProps = function(n, r) {
        var i = r.prevConfig,
            o = r.cache,
            s = lh(n);
        return Hk(i, s) ? null : {
            intl: ay(s, o),
            prevConfig: s
        }
    }, t.prototype.render = function() {
        return _w(this.state.intl), L.createElement(zk, {
            value: this.state.intl
        }, this.props.children)
    }, t.displayName = "IntlProvider", t.defaultProps = Ew, t
}(L.PureComponent);
const IH = Vk;

function LH(e) {
    return e
}
Tu("formatDate");
Tu("formatTime");
Tu("formatNumber");
Tu("formatList");
Tu("formatDisplayName");
ww("formatDate");
ww("formatTime");
let AH = () => ({
    emit(e, ...t) {
        for (let n = 0, r = this.events[e] || [], i = r.length; n < i; n++) r[n](...t)
    },
    events: {},
    on(e, t) {
        var n;
        return ((n = this.events)[e] || (n[e] = [])).push(t), () => {
            var r;
            this.events[e] = (r = this.events[e]) == null ? void 0 : r.filter(i => t !== i)
        }
    }
});
var n0 = {},
    Tw = {
        exports: {}
    };
(function(e) {
    function t(n) {
        return n && n.__esModule ? n : {
            default: n
        }
    }
    e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports
})(Tw);
var of = Tw.exports, ch = {
    exports: {}
}, fh = {
    exports: {}
}, hh = {
    exports: {}
}, uy;

function Ou() {
    return uy || (uy = 1, function(e) {
        function t(n) {
            "@babel/helpers - typeof";
            return e.exports = t = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
                return typeof r
            } : function(r) {
                return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r
            }, e.exports.__esModule = !0, e.exports.default = e.exports, t(n)
        }
        e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports
    }(hh)), hh.exports
}
var dh = {
        exports: {}
    },
    ly;

function Wk() {
    return ly || (ly = 1, function(e) {
        var t = Ou().default;

        function n(r, i) {
            if (t(r) != "object" || !r) return r;
            var o = r[Symbol.toPrimitive];
            if (o !== void 0) {
                var s = o.call(r, i || "default");
                if (t(s) != "object") return s;
                throw new TypeError("@@toPrimitive must return a primitive value.")
            }
            return (i === "string" ? String : Number)(r)
        }
        e.exports = n, e.exports.__esModule = !0, e.exports.default = e.exports
    }(dh)), dh.exports
}
var cy;

function qk() {
    return cy || (cy = 1, function(e) {
        var t = Ou().default,
            n = Wk();

        function r(i) {
            var o = n(i, "string");
            return t(o) == "symbol" ? o : o + ""
        }
        e.exports = r, e.exports.__esModule = !0, e.exports.default = e.exports
    }(fh)), fh.exports
}
var fy;

function sf() {
    return fy || (fy = 1, function(e) {
        var t = qk();

        function n(i, o) {
            for (var s = 0; s < o.length; s++) {
                var a = o[s];
                a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(i, t(a.key), a)
            }
        }

        function r(i, o, s) {
            return o && n(i.prototype, o), s && n(i, s), Object.defineProperty(i, "prototype", {
                writable: !1
            }), i
        }
        e.exports = r, e.exports.__esModule = !0, e.exports.default = e.exports
    }(ch)), ch.exports
}
var ph = {
        exports: {}
    },
    hy;

function af() {
    return hy || (hy = 1, function(e) {
        function t(n, r) {
            if (!(n instanceof r)) throw new TypeError("Cannot call a class as a function")
        }
        e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports
    }(ph)), ph.exports
}
var mh = {
        exports: {}
    },
    vh = {
        exports: {}
    },
    dy;

function Xk() {
    return dy || (dy = 1, function(e) {
        function t(n) {
            if (n === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return n
        }
        e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports
    }(vh)), vh.exports
}
var py;

function r0() {
    return py || (py = 1, function(e) {
        var t = Ou().default,
            n = Xk();

        function r(i, o) {
            if (o && (t(o) === "object" || typeof o == "function")) return o;
            if (o !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
            return n(i)
        }
        e.exports = r, e.exports.__esModule = !0, e.exports.default = e.exports
    }(mh)), mh.exports
}
var gh = {
        exports: {}
    },
    my;

function i0() {
    return my || (my = 1, function(e) {
        function t(n) {
            return e.exports = t = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(i) {
                return i.__proto__ || Object.getPrototypeOf(i)
            }, e.exports.__esModule = !0, e.exports.default = e.exports, t(n)
        }
        e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports
    }(gh)), gh.exports
}
var yh = {
        exports: {}
    },
    _h = {
        exports: {}
    },
    vy;

function Qk() {
    return vy || (vy = 1, function(e) {
        function t(n, r) {
            return e.exports = t = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(o, s) {
                return o.__proto__ = s, o
            }, e.exports.__esModule = !0, e.exports.default = e.exports, t(n, r)
        }
        e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports
    }(_h)), _h.exports
}
var gy;

function o0() {
    return gy || (gy = 1, function(e) {
        var t = Qk();

        function n(r, i) {
            if (typeof i != "function" && i !== null) throw new TypeError("Super expression must either be null or a function");
            r.prototype = Object.create(i && i.prototype, {
                constructor: {
                    value: r,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(r, "prototype", {
                writable: !1
            }), i && t(r, i)
        }
        e.exports = n, e.exports.__esModule = !0, e.exports.default = e.exports
    }(yh)), yh.exports
}
var Eh = {},
    Sh = {
        exports: {}
    },
    yy;

function Ow() {
    return yy || (yy = 1, function(e) {
        var t = Object.prototype.hasOwnProperty,
            n = "~";

        function r() {}
        Object.create && (r.prototype = Object.create(null), new r().__proto__ || (n = !1));

        function i(u, l, c) {
            this.fn = u, this.context = l, this.once = c || !1
        }

        function o(u, l, c, f, h) {
            if (typeof c != "function") throw new TypeError("The listener must be a function");
            var p = new i(c, f || u, h),
                y = n ? n + l : l;
            return u._events[y] ? u._events[y].fn ? u._events[y] = [u._events[y], p] : u._events[y].push(p) : (u._events[y] = p, u._eventsCount++), u
        }

        function s(u, l) {
            --u._eventsCount === 0 ? u._events = new r : delete u._events[l]
        }

        function a() {
            this._events = new r, this._eventsCount = 0
        }
        a.prototype.eventNames = function() {
            var l = [],
                c, f;
            if (this._eventsCount === 0) return l;
            for (f in c = this._events) t.call(c, f) && l.push(n ? f.slice(1) : f);
            return Object.getOwnPropertySymbols ? l.concat(Object.getOwnPropertySymbols(c)) : l
        }, a.prototype.listeners = function(l) {
            var c = n ? n + l : l,
                f = this._events[c];
            if (!f) return [];
            if (f.fn) return [f.fn];
            for (var h = 0, p = f.length, y = new Array(p); h < p; h++) y[h] = f[h].fn;
            return y
        }, a.prototype.listenerCount = function(l) {
            var c = n ? n + l : l,
                f = this._events[c];
            return f ? f.fn ? 1 : f.length : 0
        }, a.prototype.emit = function(l, c, f, h, p, y) {
            var m = n ? n + l : l;
            if (!this._events[m]) return !1;
            var _ = this._events[m],
                g = arguments.length,
                d, v;
            if (_.fn) {
                switch (_.once && this.removeListener(l, _.fn, void 0, !0), g) {
                    case 1:
                        return _.fn.call(_.context), !0;
                    case 2:
                        return _.fn.call(_.context, c), !0;
                    case 3:
                        return _.fn.call(_.context, c, f), !0;
                    case 4:
                        return _.fn.call(_.context, c, f, h), !0;
                    case 5:
                        return _.fn.call(_.context, c, f, h, p), !0;
                    case 6:
                        return _.fn.call(_.context, c, f, h, p, y), !0
                }
                for (v = 1, d = new Array(g - 1); v < g; v++) d[v - 1] = arguments[v];
                _.fn.apply(_.context, d)
            } else {
                var E = _.length,
                    S;
                for (v = 0; v < E; v++) switch (_[v].once && this.removeListener(l, _[v].fn, void 0, !0), g) {
                    case 1:
                        _[v].fn.call(_[v].context);
                        break;
                    case 2:
                        _[v].fn.call(_[v].context, c);
                        break;
                    case 3:
                        _[v].fn.call(_[v].context, c, f);
                        break;
                    case 4:
                        _[v].fn.call(_[v].context, c, f, h);
                        break;
                    default:
                        if (!d)
                            for (S = 1, d = new Array(g - 1); S < g; S++) d[S - 1] = arguments[S];
                        _[v].fn.apply(_[v].context, d)
                }
            }
            return !0
        }, a.prototype.on = function(l, c, f) {
            return o(this, l, c, f, !1)
        }, a.prototype.once = function(l, c, f) {
            return o(this, l, c, f, !0)
        }, a.prototype.removeListener = function(l, c, f, h) {
            var p = n ? n + l : l;
            if (!this._events[p]) return this;
            if (!c) return s(this, p), this;
            var y = this._events[p];
            if (y.fn) y.fn === c && (!h || y.once) && (!f || y.context === f) && s(this, p);
            else {
                for (var m = 0, _ = [], g = y.length; m < g; m++)(y[m].fn !== c || h && !y[m].once || f && y[m].context !== f) && _.push(y[m]);
                _.length ? this._events[p] = _.length === 1 ? _[0] : _ : s(this, p)
            }
            return this
        }, a.prototype.removeAllListeners = function(l) {
            var c;
            return l ? (c = n ? n + l : l, this._events[c] && s(this, c)) : (this._events = new r, this._eventsCount = 0), this
        }, a.prototype.off = a.prototype.removeListener, a.prototype.addListener = a.prototype.on, a.prefixed = n, a.EventEmitter = a, e.exports = a
    }(Sh)), Sh.exports
}
var _y;

function Kk() {
    return _y || (_y = 1, function(e) {
        var t = of ;
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.default = f;
        var n = t(af()),
            r = t(sf()),
            i = t(r0()),
            o = t(i0()),
            s = t(o0()),
            a = Ow();

        function u(h, p, y) {
            return p = (0, o.default)(p), (0, i.default)(h, l() ? Reflect.construct(p, y || [], (0, o.default)(h).constructor) : p.apply(h, y))
        }

        function l() {
            try {
                var h = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
            } catch {}
            return (l = function() {
                return !!h
            })()
        }
        var c = function(h) {
            function p(y, m, _) {
                var g;
                return (0, n.default)(this, p), g = u(this, p), g.socket = new window.WebSocket(y, _), g.socket.onopen = function() {
                    return g.emit("open")
                }, g.socket.onmessage = function(d) {
                    return g.emit("message", d.data)
                }, g.socket.onerror = function(d) {
                    return g.emit("error", d)
                }, g.socket.onclose = function(d) {
                    g.emit("close", d.code, d.reason)
                }, g
            }
            return (0, s.default)(p, h), (0, r.default)(p, [{
                key: "send",
                value: function(m, _, g) {
                    var d = g || _;
                    try {
                        this.socket.send(m), d()
                    } catch (v) {
                        d(v)
                    }
                }
            }, {
                key: "close",
                value: function(m, _) {
                    this.socket.close(m, _)
                }
            }, {
                key: "addEventListener",
                value: function(m, _, g) {
                    this.socket.addEventListener(m, _, g)
                }
            }])
        }(a.EventEmitter);

        function f(h, p) {
            return new c(h, p)
        }
    }(Eh)), Eh
}
var wh = {},
    xh = {
        exports: {}
    },
    Ey;

function Yk() {
    return Ey || (Ey = 1, function(e) {
        var t = Ou().default;

        function n() {
            e.exports = n = function() {
                return i
            }, e.exports.__esModule = !0, e.exports.default = e.exports;
            var r, i = {},
                o = Object.prototype,
                s = o.hasOwnProperty,
                a = Object.defineProperty || function(C, P, R) {
                    C[P] = R.value
                },
                u = typeof Symbol == "function" ? Symbol : {},
                l = u.iterator || "@@iterator",
                c = u.asyncIterator || "@@asyncIterator",
                f = u.toStringTag || "@@toStringTag";

            function h(C, P, R) {
                return Object.defineProperty(C, P, {
                    value: R,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }), C[P]
            }
            try {
                h({}, "")
            } catch {
                h = function(R, k, B) {
                    return R[k] = B
                }
            }

            function p(C, P, R, k) {
                var B = P && P.prototype instanceof E ? P : E,
                    F = Object.create(B.prototype),
                    q = new Y(k || []);
                return a(F, "_invoke", {
                    value: G(C, R, q)
                }), F
            }

            function y(C, P, R) {
                try {
                    return {
                        type: "normal",
                        arg: C.call(P, R)
                    }
                } catch (k) {
                    return {
                        type: "throw",
                        arg: k
                    }
                }
            }
            i.wrap = p;
            var m = "suspendedStart",
                _ = "suspendedYield",
                g = "executing",
                d = "completed",
                v = {};

            function E() {}

            function S() {}

            function w() {}
            var T = {};
            h(T, l, function() {
                return this
            });
            var O = Object.getPrototypeOf,
                b = O && O(O(M([])));
            b && b !== o && s.call(b, l) && (T = b);
            var I = w.prototype = E.prototype = Object.create(T);

            function N(C) {
                ["next", "throw", "return"].forEach(function(P) {
                    h(C, P, function(R) {
                        return this._invoke(P, R)
                    })
                })
            }

            function D(C, P) {
                function R(B, F, q, re) {
                    var Se = y(C[B], C, F);
                    if (Se.type !== "throw") {
                        var yt = Se.arg,
                            ce = yt.value;
                        return ce && t(ce) == "object" && s.call(ce, "__await") ? P.resolve(ce.__await).then(function(ut) {
                            R("next", ut, q, re)
                        }, function(ut) {
                            R("throw", ut, q, re)
                        }) : P.resolve(ce).then(function(ut) {
                            yt.value = ut, q(yt)
                        }, function(ut) {
                            return R("throw", ut, q, re)
                        })
                    }
                    re(Se.arg)
                }
                var k;
                a(this, "_invoke", {
                    value: function(F, q) {
                        function re() {
                            return new P(function(Se, yt) {
                                R(F, q, Se, yt)
                            })
                        }
                        return k = k ? k.then(re, re) : re()
                    }
                })
            }

            function G(C, P, R) {
                var k = m;
                return function(B, F) {
                    if (k === g) throw Error("Generator is already running");
                    if (k === d) {
                        if (B === "throw") throw F;
                        return {
                            value: r,
                            done: !0
                        }
                    }
                    for (R.method = B, R.arg = F;;) {
                        var q = R.delegate;
                        if (q) {
                            var re = H(q, R);
                            if (re) {
                                if (re === v) continue;
                                return re
                            }
                        }
                        if (R.method === "next") R.sent = R._sent = R.arg;
                        else if (R.method === "throw") {
                            if (k === m) throw k = d, R.arg;
                            R.dispatchException(R.arg)
                        } else R.method === "return" && R.abrupt("return", R.arg);
                        k = g;
                        var Se = y(C, P, R);
                        if (Se.type === "normal") {
                            if (k = R.done ? d : _, Se.arg === v) continue;
                            return {
                                value: Se.arg,
                                done: R.done
                            }
                        }
                        Se.type === "throw" && (k = d, R.method = "throw", R.arg = Se.arg)
                    }
                }
            }

            function H(C, P) {
                var R = P.method,
                    k = C.iterator[R];
                if (k === r) return P.delegate = null, R === "throw" && C.iterator.return && (P.method = "return", P.arg = r, H(C, P), P.method === "throw") || R !== "return" && (P.method = "throw", P.arg = new TypeError("The iterator does not provide a '" + R + "' method")), v;
                var B = y(k, C.iterator, P.arg);
                if (B.type === "throw") return P.method = "throw", P.arg = B.arg, P.delegate = null, v;
                var F = B.arg;
                return F ? F.done ? (P[C.resultName] = F.value, P.next = C.nextLoc, P.method !== "return" && (P.method = "next", P.arg = r), P.delegate = null, v) : F : (P.method = "throw", P.arg = new TypeError("iterator result is not an object"), P.delegate = null, v)
            }

            function W(C) {
                var P = {
                    tryLoc: C[0]
                };
                1 in C && (P.catchLoc = C[1]), 2 in C && (P.finallyLoc = C[2], P.afterLoc = C[3]), this.tryEntries.push(P)
            }

            function V(C) {
                var P = C.completion || {};
                P.type = "normal", delete P.arg, C.completion = P
            }

            function Y(C) {
                this.tryEntries = [{
                    tryLoc: "root"
                }], C.forEach(W, this), this.reset(!0)
            }

            function M(C) {
                if (C || C === "") {
                    var P = C[l];
                    if (P) return P.call(C);
                    if (typeof C.next == "function") return C;
                    if (!isNaN(C.length)) {
                        var R = -1,
                            k = function B() {
                                for (; ++R < C.length;)
                                    if (s.call(C, R)) return B.value = C[R], B.done = !1, B;
                                return B.value = r, B.done = !0, B
                            };
                        return k.next = k
                    }
                }
                throw new TypeError(t(C) + " is not iterable")
            }
            return S.prototype = w, a(I, "constructor", {
                value: w,
                configurable: !0
            }), a(w, "constructor", {
                value: S,
                configurable: !0
            }), S.displayName = h(w, f, "GeneratorFunction"), i.isGeneratorFunction = function(C) {
                var P = typeof C == "function" && C.constructor;
                return !!P && (P === S || (P.displayName || P.name) === "GeneratorFunction")
            }, i.mark = function(C) {
                return Object.setPrototypeOf ? Object.setPrototypeOf(C, w) : (C.__proto__ = w, h(C, f, "GeneratorFunction")), C.prototype = Object.create(I), C
            }, i.awrap = function(C) {
                return {
                    __await: C
                }
            }, N(D.prototype), h(D.prototype, c, function() {
                return this
            }), i.AsyncIterator = D, i.async = function(C, P, R, k, B) {
                B === void 0 && (B = Promise);
                var F = new D(p(C, P, R, k), B);
                return i.isGeneratorFunction(P) ? F : F.next().then(function(q) {
                    return q.done ? q.value : F.next()
                })
            }, N(I), h(I, f, "Generator"), h(I, l, function() {
                return this
            }), h(I, "toString", function() {
                return "[object Generator]"
            }), i.keys = function(C) {
                var P = Object(C),
                    R = [];
                for (var k in P) R.push(k);
                return R.reverse(),
                    function B() {
                        for (; R.length;) {
                            var F = R.pop();
                            if (F in P) return B.value = F, B.done = !1, B
                        }
                        return B.done = !0, B
                    }
            }, i.values = M, Y.prototype = {
                constructor: Y,
                reset: function(P) {
                    if (this.prev = 0, this.next = 0, this.sent = this._sent = r, this.done = !1, this.delegate = null, this.method = "next", this.arg = r, this.tryEntries.forEach(V), !P)
                        for (var R in this) R.charAt(0) === "t" && s.call(this, R) && !isNaN(+R.slice(1)) && (this[R] = r)
                },
                stop: function() {
                    this.done = !0;
                    var P = this.tryEntries[0].completion;
                    if (P.type === "throw") throw P.arg;
                    return this.rval
                },
                dispatchException: function(P) {
                    if (this.done) throw P;
                    var R = this;

                    function k(yt, ce) {
                        return q.type = "throw", q.arg = P, R.next = yt, ce && (R.method = "next", R.arg = r), !!ce
                    }
                    for (var B = this.tryEntries.length - 1; B >= 0; --B) {
                        var F = this.tryEntries[B],
                            q = F.completion;
                        if (F.tryLoc === "root") return k("end");
                        if (F.tryLoc <= this.prev) {
                            var re = s.call(F, "catchLoc"),
                                Se = s.call(F, "finallyLoc");
                            if (re && Se) {
                                if (this.prev < F.catchLoc) return k(F.catchLoc, !0);
                                if (this.prev < F.finallyLoc) return k(F.finallyLoc)
                            } else if (re) {
                                if (this.prev < F.catchLoc) return k(F.catchLoc, !0)
                            } else {
                                if (!Se) throw Error("try statement without catch or finally");
                                if (this.prev < F.finallyLoc) return k(F.finallyLoc)
                            }
                        }
                    }
                },
                abrupt: function(P, R) {
                    for (var k = this.tryEntries.length - 1; k >= 0; --k) {
                        var B = this.tryEntries[k];
                        if (B.tryLoc <= this.prev && s.call(B, "finallyLoc") && this.prev < B.finallyLoc) {
                            var F = B;
                            break
                        }
                    }
                    F && (P === "break" || P === "continue") && F.tryLoc <= R && R <= F.finallyLoc && (F = null);
                    var q = F ? F.completion : {};
                    return q.type = P, q.arg = R, F ? (this.method = "next", this.next = F.finallyLoc, v) : this.complete(q)
                },
                complete: function(P, R) {
                    if (P.type === "throw") throw P.arg;
                    return P.type === "break" || P.type === "continue" ? this.next = P.arg : P.type === "return" ? (this.rval = this.arg = P.arg, this.method = "return", this.next = "end") : P.type === "normal" && R && (this.next = R), v
                },
                finish: function(P) {
                    for (var R = this.tryEntries.length - 1; R >= 0; --R) {
                        var k = this.tryEntries[R];
                        if (k.finallyLoc === P) return this.complete(k.completion, k.afterLoc), V(k), v
                    }
                },
                catch: function(P) {
                    for (var R = this.tryEntries.length - 1; R >= 0; --R) {
                        var k = this.tryEntries[R];
                        if (k.tryLoc === P) {
                            var B = k.completion;
                            if (B.type === "throw") {
                                var F = B.arg;
                                V(k)
                            }
                            return F
                        }
                    }
                    throw Error("illegal catch attempt")
                },
                delegateYield: function(P, R, k) {
                    return this.delegate = {
                        iterator: M(P),
                        resultName: R,
                        nextLoc: k
                    }, this.method === "next" && (this.arg = r), v
                }
            }, i
        }
        e.exports = n, e.exports.__esModule = !0, e.exports.default = e.exports
    }(xh)), xh.exports
}
var Th, Sy;

function Zk() {
    if (Sy) return Th;
    Sy = 1;
    var e = Yk()();
    Th = e;
    try {
        regeneratorRuntime = e
    } catch {
        typeof globalThis == "object" ? globalThis.regeneratorRuntime = e : Function("r", "regeneratorRuntime = r")(e)
    }
    return Th
}
var Oh = {
        exports: {}
    },
    wy;

function Jk() {
    return wy || (wy = 1, function(e) {
        function t(r, i, o, s, a, u, l) {
            try {
                var c = r[u](l),
                    f = c.value
            } catch (h) {
                o(h);
                return
            }
            c.done ? i(f) : Promise.resolve(f).then(s, a)
        }

        function n(r) {
            return function() {
                var i = this,
                    o = arguments;
                return new Promise(function(s, a) {
                    var u = r.apply(i, o);

                    function l(f) {
                        t(u, s, a, l, c, "next", f)
                    }

                    function c(f) {
                        t(u, s, a, l, c, "throw", f)
                    }
                    l(void 0)
                })
            }
        }
        e.exports = n, e.exports.__esModule = !0, e.exports.default = e.exports
    }(Oh)), Oh.exports
}
var Eo = {},
    xy;

function e2() {
    if (xy) return Eo;
    xy = 1;
    var e = of ;
    Object.defineProperty(Eo, "__esModule", {
        value: !0
    }), Eo.DefaultDataPack = void 0, Eo.createError = i;
    var t = e(af()),
        n = e(sf()),
        r = new Map([
            [-32e3, "Event not provided"],
            [-32600, "Invalid Request"],
            [-32601, "Method not found"],
            [-32602, "Invalid params"],
            [-32603, "Internal error"],
            [-32604, "Params not found"],
            [-32605, "Method forbidden"],
            [-32606, "Event forbidden"],
            [-32700, "Parse error"]
        ]);
    Eo.DefaultDataPack = function() {
        function o() {
            (0, t.default)(this, o)
        }
        return (0, n.default)(o, [{
            key: "encode",
            value: function(a) {
                return JSON.stringify(a)
            }
        }, {
            key: "decode",
            value: function(a) {
                return JSON.parse(a)
            }
        }])
    }();

    function i(o, s) {
        var a = {
            code: o,
            message: r.get(o) || "Internal Server Error"
        };
        return s && (a.data = s), a
    }
    return Eo
}
var Ty;

function t2() {
    return Ty || (Ty = 1, function(e) {
        var t = of ;
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.default = void 0;
        var n = t(Zk()),
            r = t(Jk()),
            i = t(Ou()),
            o = t(af()),
            s = t(sf()),
            a = t(r0()),
            u = t(i0()),
            l = t(o0()),
            c = Ow(),
            f = e2();

        function h(m, _, g) {
            return _ = (0, u.default)(_), (0, a.default)(m, p() ? Reflect.construct(_, g || [], (0, u.default)(m).constructor) : _.apply(m, g))
        }

        function p() {
            try {
                var m = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
            } catch {}
            return (p = function() {
                return !!m
            })()
        }
        var y = function(m, _) {
            var g = {};
            for (var d in m) Object.prototype.hasOwnProperty.call(m, d) && _.indexOf(d) < 0 && (g[d] = m[d]);
            if (m != null && typeof Object.getOwnPropertySymbols == "function")
                for (var v = 0, d = Object.getOwnPropertySymbols(m); v < d.length; v++) _.indexOf(d[v]) < 0 && Object.prototype.propertyIsEnumerable.call(m, d[v]) && (g[d[v]] = m[d[v]]);
            return g
        };
        e.default = function(m) {
            function _(g) {
                var d, v = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "ws://localhost:8080",
                    E = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
                    S = arguments.length > 3 ? arguments[3] : void 0,
                    w = arguments.length > 4 ? arguments[4] : void 0;
                (0, o.default)(this, _);
                var T = E.autoconnect,
                    O = T === void 0 ? !0 : T,
                    b = E.reconnect,
                    I = b === void 0 ? !0 : b,
                    N = E.reconnect_interval,
                    D = N === void 0 ? 1e3 : N,
                    G = E.max_reconnects,
                    H = G === void 0 ? 5 : G,
                    W = y(E, ["autoconnect", "reconnect", "reconnect_interval", "max_reconnects"]);
                return d = h(this, _), d.webSocketFactory = g, d.queue = {}, d.rpc_id = 0, d.address = v, d.autoconnect = O, d.ready = !1, d.reconnect = I, d.reconnect_timer_id = void 0, d.reconnect_interval = D, d.max_reconnects = H, d.rest_options = W, d.current_reconnects = 0, d.generate_request_id = S || function() {
                    return ++d.rpc_id
                }, w ? d.dataPack = w : d.dataPack = new f.DefaultDataPack, d.autoconnect && d._connect(d.address, Object.assign({
                    autoconnect: d.autoconnect,
                    reconnect: d.reconnect,
                    reconnect_interval: d.reconnect_interval,
                    max_reconnects: d.max_reconnects
                }, d.rest_options)), d
            }
            return (0, l.default)(_, m), (0, s.default)(_, [{
                key: "connect",
                value: function() {
                    this.socket || this._connect(this.address, Object.assign({
                        autoconnect: this.autoconnect,
                        reconnect: this.reconnect,
                        reconnect_interval: this.reconnect_interval,
                        max_reconnects: this.max_reconnects
                    }, this.rest_options))
                }
            }, {
                key: "call",
                value: function(d, v, E, S) {
                    var w = this;
                    return !S && (0, i.default)(E) === "object" && (S = E, E = null), new Promise(function(T, O) {
                        if (!w.ready) return O(new Error("socket not ready"));
                        var b = w.generate_request_id(d, v),
                            I = {
                                jsonrpc: "2.0",
                                method: d,
                                params: v || void 0,
                                id: b
                            };
                        w.socket.send(w.dataPack.encode(I), S, function(N) {
                            if (N) return O(N);
                            w.queue[b] = {
                                promise: [T, O]
                            }, E && (w.queue[b].timeout = setTimeout(function() {
                                delete w.queue[b], O(new Error("reply timeout"))
                            }, E))
                        })
                    })
                }
            }, {
                key: "login",
                value: function() {
                    var g = (0, r.default)(n.default.mark(function v(E) {
                        var S;
                        return n.default.wrap(function(T) {
                            for (;;) switch (T.prev = T.next) {
                                case 0:
                                    return T.next = 2, this.call("rpc.login", E);
                                case 2:
                                    if (S = T.sent, S) {
                                        T.next = 5;
                                        break
                                    }
                                    throw new Error("authentication failed");
                                case 5:
                                    return T.abrupt("return", S);
                                case 6:
                                case "end":
                                    return T.stop()
                            }
                        }, v, this)
                    }));

                    function d(v) {
                        return g.apply(this, arguments)
                    }
                    return d
                }()
            }, {
                key: "listMethods",
                value: function() {
                    var g = (0, r.default)(n.default.mark(function v() {
                        return n.default.wrap(function(S) {
                            for (;;) switch (S.prev = S.next) {
                                case 0:
                                    return S.next = 2, this.call("__listMethods");
                                case 2:
                                    return S.abrupt("return", S.sent);
                                case 3:
                                case "end":
                                    return S.stop()
                            }
                        }, v, this)
                    }));

                    function d() {
                        return g.apply(this, arguments)
                    }
                    return d
                }()
            }, {
                key: "notify",
                value: function(d, v) {
                    var E = this;
                    return new Promise(function(S, w) {
                        if (!E.ready) return w(new Error("socket not ready"));
                        var T = {
                            jsonrpc: "2.0",
                            method: d,
                            params: v
                        };
                        E.socket.send(E.dataPack.encode(T), function(O) {
                            if (O) return w(O);
                            S()
                        })
                    })
                }
            }, {
                key: "subscribe",
                value: function() {
                    var g = (0, r.default)(n.default.mark(function v(E) {
                        var S;
                        return n.default.wrap(function(T) {
                            for (;;) switch (T.prev = T.next) {
                                case 0:
                                    return typeof E == "string" && (E = [E]), T.next = 3, this.call("rpc.on", E);
                                case 3:
                                    if (S = T.sent, !(typeof E == "string" && S[E] !== "ok")) {
                                        T.next = 6;
                                        break
                                    }
                                    throw new Error("Failed subscribing to an event '" + E + "' with: " + S[E]);
                                case 6:
                                    return T.abrupt("return", S);
                                case 7:
                                case "end":
                                    return T.stop()
                            }
                        }, v, this)
                    }));

                    function d(v) {
                        return g.apply(this, arguments)
                    }
                    return d
                }()
            }, {
                key: "unsubscribe",
                value: function() {
                    var g = (0, r.default)(n.default.mark(function v(E) {
                        var S;
                        return n.default.wrap(function(T) {
                            for (;;) switch (T.prev = T.next) {
                                case 0:
                                    return typeof E == "string" && (E = [E]), T.next = 3, this.call("rpc.off", E);
                                case 3:
                                    if (S = T.sent, !(typeof E == "string" && S[E] !== "ok")) {
                                        T.next = 6;
                                        break
                                    }
                                    throw new Error("Failed unsubscribing from an event with: " + S);
                                case 6:
                                    return T.abrupt("return", S);
                                case 7:
                                case "end":
                                    return T.stop()
                            }
                        }, v, this)
                    }));

                    function d(v) {
                        return g.apply(this, arguments)
                    }
                    return d
                }()
            }, {
                key: "close",
                value: function(d, v) {
                    this.socket.close(d || 1e3, v)
                }
            }, {
                key: "setAutoReconnect",
                value: function(d) {
                    this.reconnect = d
                }
            }, {
                key: "setReconnectInterval",
                value: function(d) {
                    this.reconnect_interval = d
                }
            }, {
                key: "setMaxReconnects",
                value: function(d) {
                    this.max_reconnects = d
                }
            }, {
                key: "_connect",
                value: function(d, v) {
                    var E = this;
                    clearTimeout(this.reconnect_timer_id), this.socket = this.webSocketFactory(d, v), this.socket.addEventListener("open", function() {
                        E.ready = !0, E.emit("open"), E.current_reconnects = 0
                    }), this.socket.addEventListener("message", function(S) {
                        var w = S.data;
                        w instanceof ArrayBuffer && (w = Buffer.from(w).toString());
                        try {
                            w = E.dataPack.decode(w)
                        } catch {
                            return
                        }
                        if (w.notification && E.listeners(w.notification).length) {
                            if (!Object.keys(w.params).length) return E.emit(w.notification);
                            var T = [w.notification];
                            if (w.params.constructor === Object) T.push(w.params);
                            else
                                for (var O = 0; O < w.params.length; O++) T.push(w.params[O]);
                            return Promise.resolve().then(function() {
                                E.emit.apply(E, T)
                            })
                        }
                        if (!E.queue[w.id]) return w.method ? Promise.resolve().then(function() {
                            E.emit(w.method, w == null ? void 0 : w.params)
                        }) : void 0;
                        "error" in w == "result" in w && E.queue[w.id].promise[1](new Error('Server response malformed. Response must include either "result" or "error", but not both.')), E.queue[w.id].timeout && clearTimeout(E.queue[w.id].timeout), w.error ? E.queue[w.id].promise[1](w.error) : E.queue[w.id].promise[0](w.result), delete E.queue[w.id]
                    }), this.socket.addEventListener("error", function(S) {
                        return E.emit("error", S)
                    }), this.socket.addEventListener("close", function(S) {
                        var w = S.code,
                            T = S.reason;
                        E.ready && setTimeout(function() {
                            return E.emit("close", w, T)
                        }, 0), E.ready = !1, E.socket = void 0, w !== 1e3 && (E.current_reconnects++, E.reconnect && (E.max_reconnects > E.current_reconnects || E.max_reconnects === 0) && (E.reconnect_timer_id = setTimeout(function() {
                            return E._connect(d, v)
                        }, E.reconnect_interval)))
                    })
                }
            }])
        }(c.EventEmitter)
    }(wh)), wh
}
var co = of ;
Object.defineProperty(n0, "__esModule", {
    value: !0
});
var n2 = n0.Client = void 0,
    r2 = co(sf()),
    i2 = co(af()),
    o2 = co(r0()),
    Oy = co(i0()),
    s2 = co(o0()),
    a2 = co(Kk()),
    u2 = co(t2());

function l2(e, t, n) {
    return t = (0, Oy.default)(t), (0, o2.default)(e, bw() ? Reflect.construct(t, n || [], (0, Oy.default)(e).constructor) : t.apply(e, n))
}

function bw() {
    try {
        var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
    } catch {}
    return (bw = function() {
        return !!e
    })()
}
n2 = n0.Client = function(e) {
    function t() {
        var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "ws://localhost:8080",
            r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
            i = r.autoconnect,
            o = i === void 0 ? !0 : i,
            s = r.reconnect,
            a = s === void 0 ? !0 : s,
            u = r.reconnect_interval,
            l = u === void 0 ? 1e3 : u,
            c = r.max_reconnects,
            f = c === void 0 ? 5 : c,
            h = arguments.length > 2 ? arguments[2] : void 0;
        return (0, i2.default)(this, t), l2(this, t, [a2.default, n, {
            autoconnect: o,
            reconnect: a,
            reconnect_interval: l,
            max_reconnects: f
        }, h])
    }
    return (0, s2.default)(t, e), (0, r2.default)(t)
}(u2.default);
var s0 = {};
s0.match = m2;
s0.parse = Pw;
var c2 = /(?:(only|not)?\s*([^\s\(\)]+)(?:\s*and)?\s*)?(.+)?/i,
    f2 = /\(\s*([^\s\:\)]+)\s*(?:\:\s*([^\s\)]+))?\s*\)/,
    h2 = /^(?:(min|max)-)?(.+)/,
    d2 = /(em|rem|px|cm|mm|in|pt|pc)?$/,
    p2 = /(dpi|dpcm|dppx)?$/;

function m2(e, t) {
    return Pw(e).some(function(n) {
        var r = n.inverse,
            i = n.type === "all" || t.type === n.type;
        if (i && r || !(i || r)) return !1;
        var o = n.expressions.every(function(s) {
            var a = s.feature,
                u = s.modifier,
                l = s.value,
                c = t[a];
            if (!c) return !1;
            switch (a) {
                case "orientation":
                case "scan":
                    return c.toLowerCase() === l.toLowerCase();
                case "width":
                case "height":
                case "device-width":
                case "device-height":
                    l = Cy(l), c = Cy(c);
                    break;
                case "resolution":
                    l = Py(l), c = Py(c);
                    break;
                case "aspect-ratio":
                case "device-aspect-ratio":
                case "device-pixel-ratio":
                    l = by(l), c = by(c);
                    break;
                case "grid":
                case "color":
                case "color-index":
                case "monochrome":
                    l = parseInt(l, 10) || 1, c = parseInt(c, 10) || 0;
                    break
            }
            switch (u) {
                case "min":
                    return c >= l;
                case "max":
                    return c <= l;
                default:
                    return c === l
            }
        });
        return o && !r || !o && r
    })
}

function Pw(e) {
    return e.split(",").map(function(t) {
        t = t.trim();
        var n = t.match(c2),
            r = n[1],
            i = n[2],
            o = n[3] || "",
            s = {};
        return s.inverse = !!r && r.toLowerCase() === "not", s.type = i ? i.toLowerCase() : "all", o = o.match(/\([^\)]+\)/g) || [], s.expressions = o.map(function(a) {
            var u = a.match(f2),
                l = u[1].toLowerCase().match(h2);
            return {
                modifier: l[1],
                feature: l[2],
                value: u[2]
            }
        }), s
    })
}

function by(e) {
    var t = Number(e),
        n;
    return t || (n = e.match(/^(\d+)\s*\/\s*(\d+)$/), t = n[1] / n[2]), t
}

function Py(e) {
    var t = parseFloat(e),
        n = String(e).match(p2)[1];
    switch (n) {
        case "dpcm":
            return t / 2.54;
        case "dppx":
            return t * 96;
        default:
            return t
    }
}

function Cy(e) {
    var t = parseFloat(e),
        n = String(e).match(d2)[1];
    switch (n) {
        case "em":
            return t * 16;
        case "rem":
            return t * 16;
        case "cm":
            return t * 96 / 2.54;
        case "mm":
            return t * 96 / 2.54 / 10;
        case "in":
            return t * 96;
        case "pt":
            return t * 72;
        case "pc":
            return t * 72 / 12;
        default:
            return t
    }
}
var v2 = s0.match,
    Ry = typeof window < "u" ? window.matchMedia : null;

function g2(e, t, n) {
    var r = this,
        i;
    Ry && !n && (i = Ry.call(window, e)), i ? (this.matches = i.matches, this.media = i.media, i.addListener(a)) : (this.matches = v2(e, t), this.media = e), this.addListener = o, this.removeListener = s, this.dispose = u;

    function o(l) {
        i && i.addListener(l)
    }

    function s(l) {
        i && i.removeListener(l)
    }

    function a(l) {
        r.matches = l.matches, r.media = l.media
    }

    function u() {
        i && i.removeListener(a)
    }
}

function y2(e, t, n) {
    return new g2(e, t, n)
}
var _2 = y2;
const E2 = Oc(_2);
var S2 = /[A-Z]/g,
    w2 = /^ms-/,
    bh = {};

function x2(e) {
    return "-" + e.toLowerCase()
}

function Cw(e) {
    if (bh.hasOwnProperty(e)) return bh[e];
    var t = e.replace(S2, x2);
    return bh[e] = w2.test(t) ? "-" + t : t
}

function T2(e, t) {
    if (e === t) return !0;
    if (!e || !t) return !1;
    const n = Object.keys(e),
        r = Object.keys(t),
        i = n.length;
    if (r.length !== i) return !1;
    for (let o = 0; o < i; o++) {
        const s = n[o];
        if (e[s] !== t[s] || !Object.prototype.hasOwnProperty.call(t, s)) return !1
    }
    return !0
}
var Rw = {
        exports: {}
    },
    O2 = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",
    b2 = O2,
    P2 = b2;

function kw() {}

function Mw() {}
Mw.resetWarningCache = kw;
var C2 = function() {
    function e(r, i, o, s, a, u) {
        if (u !== P2) {
            var l = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
            throw l.name = "Invariant Violation", l
        }
    }
    e.isRequired = e;

    function t() {
        return e
    }
    var n = {
        array: e,
        bigint: e,
        bool: e,
        func: e,
        number: e,
        object: e,
        string: e,
        symbol: e,
        any: e,
        arrayOf: t,
        element: e,
        elementType: e,
        instanceOf: t,
        node: e,
        objectOf: t,
        oneOf: t,
        oneOfType: t,
        shape: t,
        exact: t,
        checkPropTypes: Mw,
        resetWarningCache: kw
    };
    return n.PropTypes = n, n
};
Rw.exports = C2();
var R2 = Rw.exports;
const se = Oc(R2),
    ht = se.oneOfType([se.string, se.number]),
    a0 = {
        all: se.bool,
        grid: se.bool,
        aural: se.bool,
        braille: se.bool,
        handheld: se.bool,
        print: se.bool,
        projection: se.bool,
        screen: se.bool,
        tty: se.bool,
        tv: se.bool,
        embossed: se.bool
    },
    Iw = {
        orientation: se.oneOf(["portrait", "landscape"]),
        scan: se.oneOf(["progressive", "interlace"]),
        aspectRatio: se.string,
        deviceAspectRatio: se.string,
        height: ht,
        deviceHeight: ht,
        width: ht,
        deviceWidth: ht,
        color: se.bool,
        colorIndex: se.bool,
        monochrome: se.bool,
        resolution: ht,
        type: Object.keys(a0)
    },
    {
        type: NH,
        ...k2
    } = Iw,
    Lw = {
        minAspectRatio: se.string,
        maxAspectRatio: se.string,
        minDeviceAspectRatio: se.string,
        maxDeviceAspectRatio: se.string,
        minHeight: ht,
        maxHeight: ht,
        minDeviceHeight: ht,
        maxDeviceHeight: ht,
        minWidth: ht,
        maxWidth: ht,
        minDeviceWidth: ht,
        maxDeviceWidth: ht,
        minColor: se.number,
        maxColor: se.number,
        minColorIndex: se.number,
        maxColorIndex: se.number,
        minMonochrome: se.number,
        maxMonochrome: se.number,
        minResolution: ht,
        maxResolution: ht,
        ...k2
    },
    M2 = { ...a0,
        ...Lw
    };
var I2 = {
    all: M2,
    types: a0,
    matchers: Iw,
    features: Lw
};
const L2 = e => `not ${e}`,
    A2 = (e, t) => {
        const n = Cw(e);
        return typeof t == "number" && (t = `${t}px`), t === !0 ? n : t === !1 ? L2(n) : `(${n}: ${t})`
    },
    N2 = e => e.join(" and "),
    D2 = e => {
        const t = [];
        return Object.keys(I2.all).forEach(n => {
            const r = e[n];
            r != null && t.push(A2(n, r))
        }), N2(t)
    },
    F2 = L.createContext(void 0),
    $2 = e => e.query || D2(e),
    ky = e => e ? Object.keys(e).reduce((n, r) => (n[Cw(r)] = e[r], n), {}) : void 0,
    Aw = () => {
        const e = L.useRef(!1);
        return L.useEffect(() => {
            e.current = !0
        }, []), e.current
    },
    B2 = e => {
        const t = L.useContext(F2),
            n = () => ky(e) || ky(t),
            [r, i] = L.useState(n);
        return L.useEffect(() => {
            const o = n();
            T2(r, o) || i(o)
        }, [e, t]), r
    },
    j2 = e => {
        const t = () => $2(e),
            [n, r] = L.useState(t);
        return L.useEffect(() => {
            const i = t();
            n !== i && r(i)
        }, [e]), n
    },
    H2 = (e, t) => {
        const n = () => E2(e, t || {}, !!t),
            [r, i] = L.useState(n),
            o = Aw();
        return L.useEffect(() => {
            if (o) {
                const s = n();
                return i(s), () => {
                    s && s.dispose()
                }
            }
        }, [e, t]), r
    },
    U2 = e => {
        const [t, n] = L.useState(e.matches);
        return L.useEffect(() => {
            const r = i => {
                n(i.matches)
            };
            return e.addListener(r), n(e.matches), () => {
                e.removeListener(r)
            }
        }, [e]), t
    },
    DH = (e, t, n) => {
        const r = B2(t),
            i = j2(e);
        if (!i) throw new Error("Invalid or missing MediaQuery!");
        const o = H2(i, r),
            s = U2(o),
            a = Aw();
        return L.useEffect(() => {
            a && n && n(s)
        }, [s]), L.useEffect(() => () => {
            o && o.dispose()
        }, []), s
    },
    z2 = "modulepreload",
    G2 = function(e) {
        return "/" + e
    },
    My = {},
    FH = function(t, n, r) {
        let i = Promise.resolve();
        if (n && n.length > 0) {
            const o = document.getElementsByTagName("link"),
                s = document.querySelector("meta[property=csp-nonce]"),
                a = (s == null ? void 0 : s.nonce) || (s == null ? void 0 : s.getAttribute("nonce"));
            i = Promise.all(n.map(u => {
                if (u = G2(u), u in My) return;
                My[u] = !0;
                const l = u.endsWith(".css"),
                    c = l ? '[rel="stylesheet"]' : "";
                if (!!r)
                    for (let p = o.length - 1; p >= 0; p--) {
                        const y = o[p];
                        if (y.href === u && (!l || y.rel === "stylesheet")) return
                    } else if (document.querySelector(`link[href="${u}"]${c}`)) return;
                const h = document.createElement("link");
                if (h.rel = l ? "stylesheet" : z2, l || (h.as = "script", h.crossOrigin = ""), h.href = u, a && h.setAttribute("nonce", a), document.head.appendChild(h), l) return new Promise((p, y) => {
                    h.addEventListener("load", p), h.addEventListener("error", () => y(new Error(`Unable to preload CSS for ${u}`)))
                })
            }))
        }
        return i.then(() => t()).catch(o => {
            const s = new Event("vite:preloadError", {
                cancelable: !0
            });
            if (s.payload = o, window.dispatchEvent(s), !s.defaultPrevented) throw o
        })
    };

function Nw(e) {
    var t, n, r = "";
    if (typeof e == "string" || typeof e == "number") r += e;
    else if (typeof e == "object")
        if (Array.isArray(e)) {
            var i = e.length;
            for (t = 0; t < i; t++) e[t] && (n = Nw(e[t])) && (r && (r += " "), r += n)
        } else
            for (n in e) e[n] && (r && (r += " "), r += n);
    return r
}

function $H() {
    for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++)(e = arguments[n]) && (t = Nw(e)) && (r && (r += " "), r += t);
    return r
}
const Dw = Object.prototype.toString;

function u0(e) {
    switch (Dw.call(e)) {
        case "[object Error]":
        case "[object Exception]":
        case "[object DOMException]":
            return !0;
        default:
            return no(e, Error)
    }
}

function Us(e, t) {
    return Dw.call(e) === `[object ${t}]`
}

function Fw(e) {
    return Us(e, "ErrorEvent")
}

function Iy(e) {
    return Us(e, "DOMError")
}

function V2(e) {
    return Us(e, "DOMException")
}

function ri(e) {
    return Us(e, "String")
}

function l0(e) {
    return typeof e == "object" && e !== null && "__sentry_template_string__" in e && "__sentry_template_values__" in e
}

function c0(e) {
    return e === null || l0(e) || typeof e != "object" && typeof e != "function"
}

function Ps(e) {
    return Us(e, "Object")
}

function uf(e) {
    return typeof Event < "u" && no(e, Event)
}

function W2(e) {
    return typeof Element < "u" && no(e, Element)
}

function q2(e) {
    return Us(e, "RegExp")
}

function lf(e) {
    return !!(e && e.then && typeof e.then == "function")
}

function X2(e) {
    return Ps(e) && "nativeEvent" in e && "preventDefault" in e && "stopPropagation" in e
}

function no(e, t) {
    try {
        return e instanceof t
    } catch {
        return !1
    }
}

function $w(e) {
    return !!(typeof e == "object" && e !== null && (e.__isVue || e._isVue))
}

function Qo(e, t = 0) {
    return typeof e != "string" || t === 0 || e.length <= t ? e : `${e.slice(0,t)}...`
}

function Ly(e, t) {
    if (!Array.isArray(e)) return "";
    const n = [];
    for (let r = 0; r < e.length; r++) {
        const i = e[r];
        try {
            $w(i) ? n.push("[VueViewModel]") : n.push(String(i))
        } catch {
            n.push("[value cannot be serialized]")
        }
    }
    return n.join(t)
}

function Q2(e, t, n = !1) {
    return ri(e) ? q2(t) ? t.test(e) : ri(t) ? n ? e === t : e.includes(t) : !1 : !1
}

function cf(e, t = [], n = !1) {
    return t.some(r => Q2(e, r, n))
}

function K2(e, t, n = 250, r, i, o, s) {
    if (!o.exception || !o.exception.values || !s || !no(s.originalException, Error)) return;
    const a = o.exception.values.length > 0 ? o.exception.values[o.exception.values.length - 1] : void 0;
    a && (o.exception.values = Y2(lp(e, t, i, s.originalException, r, o.exception.values, a, 0), n))
}

function lp(e, t, n, r, i, o, s, a) {
    if (o.length >= n + 1) return o;
    let u = [...o];
    if (no(r[i], Error)) {
        Ay(s, a);
        const l = e(t, r[i]),
            c = u.length;
        Ny(l, i, c, a), u = lp(e, t, n, r[i], i, [l, ...u], l, c)
    }
    return Array.isArray(r.errors) && r.errors.forEach((l, c) => {
        if (no(l, Error)) {
            Ay(s, a);
            const f = e(t, l),
                h = u.length;
            Ny(f, `errors[${c}]`, h, a), u = lp(e, t, n, l, i, [f, ...u], f, h)
        }
    }), u
}

function Ay(e, t) {
    e.mechanism = e.mechanism || {
        type: "generic",
        handled: !0
    }, e.mechanism = { ...e.mechanism,
        ...e.type === "AggregateError" && {
            is_exception_group: !0
        },
        exception_id: t
    }
}

function Ny(e, t, n, r) {
    e.mechanism = e.mechanism || {
        type: "generic",
        handled: !0
    }, e.mechanism = { ...e.mechanism,
        type: "chained",
        source: t,
        exception_id: n,
        parent_id: r
    }
}

function Y2(e, t) {
    return e.map(n => (n.value && (n.value = Qo(n.value, t)), n))
}
const Ui = "8.7.0",
    ae = globalThis;

function f0(e, t, n) {
    const r = n || ae,
        i = r.__SENTRY__ = r.__SENTRY__ || {},
        o = i[Ui] = i[Ui] || {};
    return o[e] || (o[e] = t())
}
const h0 = ae,
    Z2 = 80;

function Bw(e, t = {}) {
    if (!e) return "<unknown>";
    try {
        let n = e;
        const r = 5,
            i = [];
        let o = 0,
            s = 0;
        const a = " > ",
            u = a.length;
        let l;
        const c = Array.isArray(t) ? t : t.keyAttrs,
            f = !Array.isArray(t) && t.maxStringLength || Z2;
        for (; n && o++ < r && (l = J2(n, c), !(l === "html" || o > 1 && s + i.length * u + l.length >= f));) i.push(l), s += l.length, n = n.parentNode;
        return i.reverse().join(a)
    } catch {
        return "<unknown>"
    }
}

function J2(e, t) {
    const n = e,
        r = [];
    let i, o, s, a, u;
    if (!n || !n.tagName) return "";
    if (h0.HTMLElement && n instanceof HTMLElement && n.dataset) {
        if (n.dataset.sentryComponent) return n.dataset.sentryComponent;
        if (n.dataset.sentryElement) return n.dataset.sentryElement
    }
    r.push(n.tagName.toLowerCase());
    const l = t && t.length ? t.filter(f => n.getAttribute(f)).map(f => [f, n.getAttribute(f)]) : null;
    if (l && l.length) l.forEach(f => {
        r.push(`[${f[0]}="${f[1]}"]`)
    });
    else if (n.id && r.push(`#${n.id}`), i = n.className, i && ri(i))
        for (o = i.split(/\s+/), u = 0; u < o.length; u++) r.push(`.${o[u]}`);
    const c = ["aria-label", "type", "name", "title", "alt"];
    for (u = 0; u < c.length; u++) s = c[u], a = n.getAttribute(s), a && r.push(`[${s}="${a}"]`);
    return r.join("")
}

function eM() {
    try {
        return h0.document.location.href
    } catch {
        return ""
    }
}

function tM(e) {
    if (!h0.HTMLElement) return null;
    let t = e;
    const n = 5;
    for (let r = 0; r < n; r++) {
        if (!t) return null;
        if (t instanceof HTMLElement) {
            if (t.dataset.sentryComponent) return t.dataset.sentryComponent;
            if (t.dataset.sentryElement) return t.dataset.sentryElement
        }
        t = t.parentNode
    }
    return null
}
const bu = typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__,
    nM = "Sentry Logger ",
    cp = ["debug", "info", "warn", "error", "log", "assert", "trace"],
    fc = {};

function Pu(e) {
    if (!("console" in ae)) return e();
    const t = ae.console,
        n = {},
        r = Object.keys(fc);
    r.forEach(i => {
        const o = fc[i];
        n[i] = t[i], t[i] = o
    });
    try {
        return e()
    } finally {
        r.forEach(i => {
            t[i] = n[i]
        })
    }
}

function rM() {
    let e = !1;
    const t = {
        enable: () => {
            e = !0
        },
        disable: () => {
            e = !1
        },
        isEnabled: () => e
    };
    return bu ? cp.forEach(n => {
        t[n] = (...r) => {
            e && Pu(() => {
                ae.console[n](`${nM}[${n}]:`, ...r)
            })
        }
    }) : cp.forEach(n => {
        t[n] = () => {}
    }), t
}
const X = rM(),
    iM = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/;

function oM(e) {
    return e === "http" || e === "https"
}

function Cu(e, t = !1) {
    const {
        host: n,
        path: r,
        pass: i,
        port: o,
        projectId: s,
        protocol: a,
        publicKey: u
    } = e;
    return `${a}://${u}${t&&i?`:${i}`:""}@${n}${o?`:${o}`:""}/${r&&`${r}/`}${s}`
}

function sM(e) {
    const t = iM.exec(e);
    if (!t) {
        Pu(() => {
            console.error(`Invalid Sentry Dsn: ${e}`)
        });
        return
    }
    const [n, r, i = "", o, s = "", a] = t.slice(1);
    let u = "",
        l = a;
    const c = l.split("/");
    if (c.length > 1 && (u = c.slice(0, -1).join("/"), l = c.pop()), l) {
        const f = l.match(/^\d+/);
        f && (l = f[0])
    }
    return jw({
        host: o,
        pass: i,
        path: u,
        projectId: l,
        port: s,
        protocol: n,
        publicKey: r
    })
}

function jw(e) {
    return {
        protocol: e.protocol,
        publicKey: e.publicKey || "",
        pass: e.pass || "",
        host: e.host,
        port: e.port || "",
        path: e.path || "",
        projectId: e.projectId
    }
}

function aM(e) {
    if (!bu) return !0;
    const {
        port: t,
        projectId: n,
        protocol: r
    } = e;
    return ["protocol", "publicKey", "host", "projectId"].find(s => e[s] ? !1 : (X.error(`Invalid Sentry Dsn: ${s} missing`), !0)) ? !1 : n.match(/^\d+$/) ? oM(r) ? t && isNaN(parseInt(t, 10)) ? (X.error(`Invalid Sentry Dsn: Invalid port ${t}`), !1) : !0 : (X.error(`Invalid Sentry Dsn: Invalid protocol ${r}`), !1) : (X.error(`Invalid Sentry Dsn: Invalid projectId ${n}`), !1)
}

function Hw(e) {
    const t = typeof e == "string" ? sM(e) : jw(e);
    if (!(!t || !aM(t))) return t
}
class Wn extends Error {
    constructor(t, n = "warn") {
        super(t), this.message = t, this.name = new.target.prototype.constructor.name, Object.setPrototypeOf(this, new.target.prototype), this.logLevel = n
    }
}

function Ke(e, t, n) {
    if (!(t in e)) return;
    const r = e[t],
        i = n(r);
    typeof i == "function" && Uw(i, r), e[t] = i
}

function Cs(e, t, n) {
    try {
        Object.defineProperty(e, t, {
            value: n,
            writable: !0,
            configurable: !0
        })
    } catch {
        bu && X.log(`Failed to add non-enumerable property "${t}" to object`, e)
    }
}

function Uw(e, t) {
    try {
        const n = t.prototype || {};
        e.prototype = t.prototype = n, Cs(e, "__sentry_original__", t)
    } catch {}
}

function d0(e) {
    return e.__sentry_original__
}

function uM(e) {
    return Object.keys(e).map(t => `${encodeURIComponent(t)}=${encodeURIComponent(e[t])}`).join("&")
}

function zw(e) {
    if (u0(e)) return {
        message: e.message,
        name: e.name,
        stack: e.stack,
        ...Fy(e)
    };
    if (uf(e)) {
        const t = {
            type: e.type,
            target: Dy(e.target),
            currentTarget: Dy(e.currentTarget),
            ...Fy(e)
        };
        return typeof CustomEvent < "u" && no(e, CustomEvent) && (t.detail = e.detail), t
    } else return e
}

function Dy(e) {
    try {
        return W2(e) ? Bw(e) : Object.prototype.toString.call(e)
    } catch {
        return "<unknown>"
    }
}

function Fy(e) {
    if (typeof e == "object" && e !== null) {
        const t = {};
        for (const n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t
    } else return {}
}

function lM(e, t = 40) {
    const n = Object.keys(zw(e));
    if (n.sort(), !n.length) return "[object has no keys]";
    if (n[0].length >= t) return Qo(n[0], t);
    for (let r = n.length; r > 0; r--) {
        const i = n.slice(0, r).join(", ");
        if (!(i.length > t)) return r === n.length ? i : Qo(i, t)
    }
    return ""
}

function fn(e) {
    return fp(e, new Map)
}

function fp(e, t) {
    if (cM(e)) {
        const n = t.get(e);
        if (n !== void 0) return n;
        const r = {};
        t.set(e, r);
        for (const i of Object.keys(e)) typeof e[i] < "u" && (r[i] = fp(e[i], t));
        return r
    }
    if (Array.isArray(e)) {
        const n = t.get(e);
        if (n !== void 0) return n;
        const r = [];
        return t.set(e, r), e.forEach(i => {
            r.push(fp(i, t))
        }), r
    }
    return e
}

function cM(e) {
    if (!Ps(e)) return !1;
    try {
        const t = Object.getPrototypeOf(e).constructor.name;
        return !t || t === "Object"
    } catch {
        return !0
    }
}
const Gw = 50,
    zs = "?",
    $y = /\(error: (.*)\)/,
    By = /captureMessage|captureException/;

function Vw(...e) {
    const t = e.sort((n, r) => n[0] - r[0]).map(n => n[1]);
    return (n, r = 0, i = 0) => {
        const o = [],
            s = n.split(`
`);
        for (let a = r; a < s.length; a++) {
            const u = s[a];
            if (u.length > 1024) continue;
            const l = $y.test(u) ? u.replace($y, "$1") : u;
            if (!l.match(/\S*Error: /)) {
                for (const c of t) {
                    const f = c(l);
                    if (f) {
                        o.push(f);
                        break
                    }
                }
                if (o.length >= Gw + i) break
            }
        }
        return hM(o.slice(i))
    }
}

function fM(e) {
    return Array.isArray(e) ? Vw(...e) : e
}

function hM(e) {
    if (!e.length) return [];
    const t = Array.from(e);
    return /sentryWrapped/.test(t[t.length - 1].function || "") && t.pop(), t.reverse(), By.test(t[t.length - 1].function || "") && (t.pop(), By.test(t[t.length - 1].function || "") && t.pop()), t.slice(0, Gw).map(n => ({ ...n,
        filename: n.filename || t[t.length - 1].filename,
        function: n.function || zs
    }))
}
const Ph = "<anonymous>";

function li(e) {
    try {
        return !e || typeof e != "function" ? Ph : e.name || Ph
    } catch {
        return Ph
    }
}
const kl = {},
    jy = {};

function fo(e, t) {
    kl[e] = kl[e] || [], kl[e].push(t)
}

function ho(e, t) {
    jy[e] || (t(), jy[e] = !0)
}

function Mn(e, t) {
    const n = e && kl[e];
    if (n)
        for (const r of n) try {
            r(t)
        } catch (i) {
            bu && X.error(`Error while triggering instrumentation handler.
Type: ${e}
Name: ${li(r)}
Error:`, i)
        }
}

function dM(e) {
    const t = "console";
    fo(t, e), ho(t, pM)
}

function pM() {
    "console" in ae && cp.forEach(function(e) {
        e in ae.console && Ke(ae.console, e, function(t) {
            return fc[e] = t,
                function(...n) {
                    Mn("console", {
                        args: n,
                        level: e
                    });
                    const i = fc[e];
                    i && i.apply(ae.console, n)
                }
        })
    })
}
const hp = ae;

function Ww() {
    if (!("fetch" in hp)) return !1;
    try {
        return new Headers, new Request("http://www.example.com"), new Response, !0
    } catch {
        return !1
    }
}

function dp(e) {
    return e && /^function\s+\w+\(\)\s+\{\s+\[native code\]\s+\}$/.test(e.toString())
}

function mM() {
    if (typeof EdgeRuntime == "string") return !0;
    if (!Ww()) return !1;
    if (dp(hp.fetch)) return !0;
    let e = !1;
    const t = hp.document;
    if (t && typeof t.createElement == "function") try {
        const n = t.createElement("iframe");
        n.hidden = !0, t.head.appendChild(n), n.contentWindow && n.contentWindow.fetch && (e = dp(n.contentWindow.fetch)), t.head.removeChild(n)
    } catch (n) {
        bu && X.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ", n)
    }
    return e
}
const qw = 1e3;

function Ru() {
    return Date.now() / qw
}

function vM() {
    const {
        performance: e
    } = ae;
    if (!e || !e.now) return Ru;
    const t = Date.now() - e.now(),
        n = e.timeOrigin == null ? t : e.timeOrigin;
    return () => (n + e.now()) / qw
}
const hr = vM();
(() => {
    const {
        performance: e
    } = ae;
    if (!e || !e.now) return;
    const t = 3600 * 1e3,
        n = e.now(),
        r = Date.now(),
        i = e.timeOrigin ? Math.abs(e.timeOrigin + n - r) : t,
        o = i < t,
        s = e.timing && e.timing.navigationStart,
        u = typeof s == "number" ? Math.abs(s + n - r) : t,
        l = u < t;
    return o || l ? i <= u ? e.timeOrigin : s : r
})();

function gM(e) {
    const t = "fetch";
    fo(t, e), ho(t, yM)
}

function yM() {
    mM() && Ke(ae, "fetch", function(e) {
        return function(...t) {
            const {
                method: n,
                url: r
            } = _M(t), i = {
                args: t,
                fetchData: {
                    method: n,
                    url: r
                },
                startTimestamp: hr() * 1e3
            };
            return Mn("fetch", { ...i
            }), e.apply(ae, t).then(o => {
                const s = { ...i,
                    endTimestamp: hr() * 1e3,
                    response: o
                };
                return Mn("fetch", s), o
            }, o => {
                const s = { ...i,
                    endTimestamp: hr() * 1e3,
                    error: o
                };
                throw Mn("fetch", s), o
            })
        }
    })
}

function pp(e, t) {
    return !!e && typeof e == "object" && !!e[t]
}

function Hy(e) {
    return typeof e == "string" ? e : e ? pp(e, "url") ? e.url : e.toString ? e.toString() : "" : ""
}

function _M(e) {
    if (e.length === 0) return {
        method: "GET",
        url: ""
    };
    if (e.length === 2) {
        const [n, r] = e;
        return {
            url: Hy(n),
            method: pp(r, "method") ? String(r.method).toUpperCase() : "GET"
        }
    }
    const t = e[0];
    return {
        url: Hy(t),
        method: pp(t, "method") ? String(t.method).toUpperCase() : "GET"
    }
}
let il = null;

function EM(e) {
    const t = "error";
    fo(t, e), ho(t, SM)
}

function SM() {
    il = ae.onerror, ae.onerror = function(e, t, n, r, i) {
        return Mn("error", {
            column: r,
            error: i,
            line: n,
            msg: e,
            url: t
        }), il && !il.__SENTRY_LOADER__ ? il.apply(this, arguments) : !1
    }, ae.onerror.__SENTRY_INSTRUMENTED__ = !0
}
let ol = null;

function wM(e) {
    const t = "unhandledrejection";
    fo(t, e), ho(t, xM)
}

function xM() {
    ol = ae.onunhandledrejection, ae.onunhandledrejection = function(e) {
        return Mn("unhandledrejection", e), ol && !ol.__SENTRY_LOADER__ ? ol.apply(this, arguments) : !0
    }, ae.onunhandledrejection.__SENTRY_INSTRUMENTED__ = !0
}

function TM() {
    return "npm"
}

function OM() {
    const e = typeof WeakSet == "function",
        t = e ? new WeakSet : [];

    function n(i) {
        if (e) return t.has(i) ? !0 : (t.add(i), !1);
        for (let o = 0; o < t.length; o++)
            if (t[o] === i) return !0;
        return t.push(i), !1
    }

    function r(i) {
        if (e) t.delete(i);
        else
            for (let o = 0; o < t.length; o++)
                if (t[o] === i) {
                    t.splice(o, 1);
                    break
                }
    }
    return [n, r]
}

function mn() {
    const e = ae,
        t = e.crypto || e.msCrypto;
    let n = () => Math.random() * 16;
    try {
        if (t && t.randomUUID) return t.randomUUID().replace(/-/g, "");
        t && t.getRandomValues && (n = () => {
            const r = new Uint8Array(1);
            return t.getRandomValues(r), r[0]
        })
    } catch {}
    return ("10000000100040008000" + 1e11).replace(/[018]/g, r => (r ^ (n() & 15) >> r / 4).toString(16))
}

function Xw(e) {
    return e.exception && e.exception.values ? e.exception.values[0] : void 0
}

function bi(e) {
    const {
        message: t,
        event_id: n
    } = e;
    if (t) return t;
    const r = Xw(e);
    return r ? r.type && r.value ? `${r.type}: ${r.value}` : r.type || r.value || n || "<unknown>" : n || "<unknown>"
}

function mp(e, t, n) {
    const r = e.exception = e.exception || {},
        i = r.values = r.values || [],
        o = i[0] = i[0] || {};
    o.value || (o.value = t || ""), o.type || (o.type = n || "Error")
}

function Qa(e, t) {
    const n = Xw(e);
    if (!n) return;
    const r = {
            type: "generic",
            handled: !0
        },
        i = n.mechanism;
    if (n.mechanism = { ...r,
            ...i,
            ...t
        }, t && "data" in t) {
        const o = { ...i && i.data,
            ...t.data
        };
        n.mechanism.data = o
    }
}

function Uy(e) {
    if (e && e.__sentry_captured__) return !0;
    try {
        Cs(e, "__sentry_captured__", !0)
    } catch {}
    return !1
}

function Qw(e) {
    return Array.isArray(e) ? e : [e]
}

function Lr(e, t = 100, n = 1 / 0) {
    try {
        return vp("", e, t, n)
    } catch (r) {
        return {
            ERROR: `**non-serializable** (${r})`
        }
    }
}

function Kw(e, t = 3, n = 100 * 1024) {
    const r = Lr(e, t);
    return RM(r) > n ? Kw(e, t - 1, n) : r
}

function vp(e, t, n = 1 / 0, r = 1 / 0, i = OM()) {
    const [o, s] = i;
    if (t == null || ["number", "boolean", "string"].includes(typeof t) && !Number.isNaN(t)) return t;
    const a = bM(e, t);
    if (!a.startsWith("[object ")) return a;
    if (t.__sentry_skip_normalization__) return t;
    const u = typeof t.__sentry_override_normalization_depth__ == "number" ? t.__sentry_override_normalization_depth__ : n;
    if (u === 0) return a.replace("object ", "");
    if (o(t)) return "[Circular ~]";
    const l = t;
    if (l && typeof l.toJSON == "function") try {
        const p = l.toJSON();
        return vp("", p, u - 1, r, i)
    } catch {}
    const c = Array.isArray(t) ? [] : {};
    let f = 0;
    const h = zw(t);
    for (const p in h) {
        if (!Object.prototype.hasOwnProperty.call(h, p)) continue;
        if (f >= r) {
            c[p] = "[MaxProperties ~]";
            break
        }
        const y = h[p];
        c[p] = vp(p, y, u - 1, r, i), f++
    }
    return s(t), c
}

function bM(e, t) {
    try {
        if (e === "domain" && t && typeof t == "object" && t._events) return "[Domain]";
        if (e === "domainEmitter") return "[DomainEmitter]";
        if (typeof global < "u" && t === global) return "[Global]";
        if (typeof window < "u" && t === window) return "[Window]";
        if (typeof document < "u" && t === document) return "[Document]";
        if ($w(t)) return "[VueViewModel]";
        if (X2(t)) return "[SyntheticEvent]";
        if (typeof t == "number" && t !== t) return "[NaN]";
        if (typeof t == "function") return `[Function: ${li(t)}]`;
        if (typeof t == "symbol") return `[${String(t)}]`;
        if (typeof t == "bigint") return `[BigInt: ${String(t)}]`;
        const n = PM(t);
        return /^HTML(\w*)Element$/.test(n) ? `[HTMLElement: ${n}]` : `[object ${n}]`
    } catch (n) {
        return `**non-serializable** (${n})`
    }
}

function PM(e) {
    const t = Object.getPrototypeOf(e);
    return t ? t.constructor.name : "null prototype"
}

function CM(e) {
    return ~-encodeURI(e).split(/%..|./).length
}

function RM(e) {
    return CM(JSON.stringify(e))
}
var rr;
(function(e) {
    e[e.PENDING = 0] = "PENDING";
    const n = 1;
    e[e.RESOLVED = n] = "RESOLVED";
    const r = 2;
    e[e.REJECTED = r] = "REJECTED"
})(rr || (rr = {}));

function ro(e) {
    return new un(t => {
        t(e)
    })
}

function hc(e) {
    return new un((t, n) => {
        n(e)
    })
}
class un {
    constructor(t) {
        un.prototype.__init.call(this), un.prototype.__init2.call(this), un.prototype.__init3.call(this), un.prototype.__init4.call(this), this._state = rr.PENDING, this._handlers = [];
        try {
            t(this._resolve, this._reject)
        } catch (n) {
            this._reject(n)
        }
    }
    then(t, n) {
        return new un((r, i) => {
            this._handlers.push([!1, o => {
                if (!t) r(o);
                else try {
                    r(t(o))
                } catch (s) {
                    i(s)
                }
            }, o => {
                if (!n) i(o);
                else try {
                    r(n(o))
                } catch (s) {
                    i(s)
                }
            }]), this._executeHandlers()
        })
    } catch (t) {
        return this.then(n => n, t)
    } finally(t) {
        return new un((n, r) => {
            let i, o;
            return this.then(s => {
                o = !1, i = s, t && t()
            }, s => {
                o = !0, i = s, t && t()
            }).then(() => {
                if (o) {
                    r(i);
                    return
                }
                n(i)
            })
        })
    }
    __init() {
        this._resolve = t => {
            this._setResult(rr.RESOLVED, t)
        }
    }
    __init2() {
        this._reject = t => {
            this._setResult(rr.REJECTED, t)
        }
    }
    __init3() {
        this._setResult = (t, n) => {
            if (this._state === rr.PENDING) {
                if (lf(n)) {
                    n.then(this._resolve, this._reject);
                    return
                }
                this._state = t, this._value = n, this._executeHandlers()
            }
        }
    }
    __init4() {
        this._executeHandlers = () => {
            if (this._state === rr.PENDING) return;
            const t = this._handlers.slice();
            this._handlers = [], t.forEach(n => {
                n[0] || (this._state === rr.RESOLVED && n[1](this._value), this._state === rr.REJECTED && n[2](this._value), n[0] = !0)
            })
        }
    }
}

function kM(e) {
    const t = [];

    function n() {
        return e === void 0 || t.length < e
    }

    function r(s) {
        return t.splice(t.indexOf(s), 1)[0]
    }

    function i(s) {
        if (!n()) return hc(new Wn("Not adding Promise because buffer limit was reached."));
        const a = s();
        return t.indexOf(a) === -1 && t.push(a), a.then(() => r(a)).then(null, () => r(a).then(null, () => {})), a
    }

    function o(s) {
        return new un((a, u) => {
            let l = t.length;
            if (!l) return a(!0);
            const c = setTimeout(() => {
                s && s > 0 && a(!1)
            }, s);
            t.forEach(f => {
                ro(f).then(() => {
                    --l || (clearTimeout(c), a(!0))
                }, u)
            })
        })
    }
    return {
        $: t,
        add: i,
        drain: o
    }
}

function Ch(e) {
    if (!e) return {};
    const t = e.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
    if (!t) return {};
    const n = t[6] || "",
        r = t[8] || "";
    return {
        host: t[4],
        path: t[5],
        protocol: t[2],
        search: n,
        hash: r,
        relative: t[5] + n + r
    }
}
const MM = ["fatal", "error", "warning", "log", "info", "debug"];

function IM(e) {
    return e === "warn" ? "warning" : MM.includes(e) ? e : "log"
}

function ku(e, t = []) {
    return [e, t]
}

function LM(e, t) {
    const [n, r] = e;
    return [n, [...r, t]]
}

function zy(e, t) {
    const n = e[1];
    for (const r of n) {
        const i = r[0].type;
        if (t(r, i)) return !0
    }
    return !1
}

function gp(e) {
    return ae.__SENTRY__ && ae.__SENTRY__.encodePolyfill ? ae.__SENTRY__.encodePolyfill(e) : new TextEncoder().encode(e)
}

function AM(e) {
    const [t, n] = e;
    let r = JSON.stringify(t);

    function i(o) {
        typeof r == "string" ? r = typeof o == "string" ? r + o : [gp(r), o] : r.push(typeof o == "string" ? gp(o) : o)
    }
    for (const o of n) {
        const [s, a] = o;
        if (i(`
${JSON.stringify(s)}
`), typeof a == "string" || a instanceof Uint8Array) i(a);
        else {
            let u;
            try {
                u = JSON.stringify(a)
            } catch {
                u = JSON.stringify(Lr(a))
            }
            i(u)
        }
    }
    return typeof r == "string" ? r : NM(r)
}

function NM(e) {
    const t = e.reduce((i, o) => i + o.length, 0),
        n = new Uint8Array(t);
    let r = 0;
    for (const i of e) n.set(i, r), r += i.length;
    return n
}

function DM(e) {
    const t = typeof e.data == "string" ? gp(e.data) : e.data;
    return [fn({
        type: "attachment",
        length: t.length,
        filename: e.filename,
        content_type: e.contentType,
        attachment_type: e.attachmentType
    }), t]
}
const FM = {
    session: "session",
    sessions: "session",
    attachment: "attachment",
    transaction: "transaction",
    event: "error",
    client_report: "internal",
    user_report: "default",
    profile: "profile",
    replay_event: "replay",
    replay_recording: "replay",
    check_in: "monitor",
    feedback: "feedback",
    span: "span",
    statsd: "metric_bucket"
};

function Gy(e) {
    return FM[e]
}

function Yw(e) {
    if (!e || !e.sdk) return;
    const {
        name: t,
        version: n
    } = e.sdk;
    return {
        name: t,
        version: n
    }
}

function $M(e, t, n, r) {
    const i = e.sdkProcessingMetadata && e.sdkProcessingMetadata.dynamicSamplingContext;
    return {
        event_id: e.event_id,
        sent_at: new Date().toISOString(),
        ...t && {
            sdk: t
        },
        ...!!n && r && {
            dsn: Cu(r)
        },
        ...i && {
            trace: fn({ ...i
            })
        }
    }
}

function BM(e, t, n) {
    const r = [{
        type: "client_report"
    }, {
        timestamp: n || Ru(),
        discarded_events: e
    }];
    return ku(t ? {
        dsn: t
    } : {}, [r])
}
const jM = 60 * 1e3;

function HM(e, t = Date.now()) {
    const n = parseInt(`${e}`, 10);
    if (!isNaN(n)) return n * 1e3;
    const r = Date.parse(`${e}`);
    return isNaN(r) ? jM : r - t
}

function UM(e, t) {
    return e[t] || e.all || 0
}

function zM(e, t, n = Date.now()) {
    return UM(e, t) > n
}

function GM(e, {
    statusCode: t,
    headers: n
}, r = Date.now()) {
    const i = { ...e
        },
        o = n && n["x-sentry-rate-limits"],
        s = n && n["retry-after"];
    if (o)
        for (const a of o.trim().split(",")) {
            const [u, l, , , c] = a.split(":", 5), f = parseInt(u, 10), h = (isNaN(f) ? 60 : f) * 1e3;
            if (!l) i.all = r + h;
            else
                for (const p of l.split(";")) p === "metric_bucket" ? (!c || c.split(";").includes("custom")) && (i[p] = r + h) : i[p] = r + h
        } else s ? i.all = r + HM(s, r) : t === 429 && (i.all = r + 60 * 1e3);
    return i
}

function Vy() {
    return {
        traceId: mn(),
        spanId: mn().substring(16)
    }
}
const sl = ae;

function VM() {
    const e = sl.chrome,
        t = e && e.app && e.app.runtime,
        n = "history" in sl && !!sl.history.pushState && !!sl.history.replaceState;
    return !t && n
}
const Me = typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__;

function ff() {
    return p0(ae), ae
}

function p0(e) {
    const t = e.__SENTRY__ = e.__SENTRY__ || {};
    return t.version = t.version || Ui, t[Ui] = t[Ui] || {}
}

function WM(e) {
    const t = hr(),
        n = {
            sid: mn(),
            init: !0,
            timestamp: t,
            started: t,
            duration: 0,
            status: "ok",
            errors: 0,
            ignoreDuration: !1,
            toJSON: () => XM(n)
        };
    return e && Rs(n, e), n
}

function Rs(e, t = {}) {
    if (t.user && (!e.ipAddress && t.user.ip_address && (e.ipAddress = t.user.ip_address), !e.did && !t.did && (e.did = t.user.id || t.user.email || t.user.username)), e.timestamp = t.timestamp || hr(), t.abnormal_mechanism && (e.abnormal_mechanism = t.abnormal_mechanism), t.ignoreDuration && (e.ignoreDuration = t.ignoreDuration), t.sid && (e.sid = t.sid.length === 32 ? t.sid : mn()), t.init !== void 0 && (e.init = t.init), !e.did && t.did && (e.did = `${t.did}`), typeof t.started == "number" && (e.started = t.started), e.ignoreDuration) e.duration = void 0;
    else if (typeof t.duration == "number") e.duration = t.duration;
    else {
        const n = e.timestamp - e.started;
        e.duration = n >= 0 ? n : 0
    }
    t.release && (e.release = t.release), t.environment && (e.environment = t.environment), !e.ipAddress && t.ipAddress && (e.ipAddress = t.ipAddress), !e.userAgent && t.userAgent && (e.userAgent = t.userAgent), typeof t.errors == "number" && (e.errors = t.errors), t.status && (e.status = t.status)
}

function qM(e, t) {
    let n = {};
    t ? n = {
        status: t
    } : e.status === "ok" && (n = {
        status: "exited"
    }), Rs(e, n)
}

function XM(e) {
    return fn({
        sid: `${e.sid}`,
        init: e.init,
        started: new Date(e.started * 1e3).toISOString(),
        timestamp: new Date(e.timestamp * 1e3).toISOString(),
        status: e.status,
        errors: e.errors,
        did: typeof e.did == "number" || typeof e.did == "string" ? `${e.did}` : void 0,
        duration: e.duration,
        abnormal_mechanism: e.abnormal_mechanism,
        attrs: {
            release: e.release,
            environment: e.environment,
            ip_address: e.ipAddress,
            user_agent: e.userAgent
        }
    })
}
const yp = "_sentrySpan";

function Wy(e, t) {
    t ? Cs(e, yp, t) : delete e[yp]
}

function qy(e) {
    return e[yp]
}
const QM = 100;
class m0 {
    constructor() {
        this._notifyingListeners = !1, this._scopeListeners = [], this._eventProcessors = [], this._breadcrumbs = [], this._attachments = [], this._user = {}, this._tags = {}, this._extra = {}, this._contexts = {}, this._sdkProcessingMetadata = {}, this._propagationContext = Vy()
    }
    clone() {
        const t = new m0;
        return t._breadcrumbs = [...this._breadcrumbs], t._tags = { ...this._tags
        }, t._extra = { ...this._extra
        }, t._contexts = { ...this._contexts
        }, t._user = this._user, t._level = this._level, t._session = this._session, t._transactionName = this._transactionName, t._fingerprint = this._fingerprint, t._eventProcessors = [...this._eventProcessors], t._requestSession = this._requestSession, t._attachments = [...this._attachments], t._sdkProcessingMetadata = { ...this._sdkProcessingMetadata
        }, t._propagationContext = { ...this._propagationContext
        }, t._client = this._client, t._lastEventId = this._lastEventId, Wy(t, qy(this)), t
    }
    setClient(t) {
        this._client = t
    }
    setLastEventId(t) {
        this._lastEventId = t
    }
    getClient() {
        return this._client
    }
    lastEventId() {
        return this._lastEventId
    }
    addScopeListener(t) {
        this._scopeListeners.push(t)
    }
    addEventProcessor(t) {
        return this._eventProcessors.push(t), this
    }
    setUser(t) {
        return this._user = t || {
            email: void 0,
            id: void 0,
            ip_address: void 0,
            username: void 0
        }, this._session && Rs(this._session, {
            user: t
        }), this._notifyScopeListeners(), this
    }
    getUser() {
        return this._user
    }
    getRequestSession() {
        return this._requestSession
    }
    setRequestSession(t) {
        return this._requestSession = t, this
    }
    setTags(t) {
        return this._tags = { ...this._tags,
            ...t
        }, this._notifyScopeListeners(), this
    }
    setTag(t, n) {
        return this._tags = { ...this._tags,
            [t]: n
        }, this._notifyScopeListeners(), this
    }
    setExtras(t) {
        return this._extra = { ...this._extra,
            ...t
        }, this._notifyScopeListeners(), this
    }
    setExtra(t, n) {
        return this._extra = { ...this._extra,
            [t]: n
        }, this._notifyScopeListeners(), this
    }
    setFingerprint(t) {
        return this._fingerprint = t, this._notifyScopeListeners(), this
    }
    setLevel(t) {
        return this._level = t, this._notifyScopeListeners(), this
    }
    setTransactionName(t) {
        return this._transactionName = t, this._notifyScopeListeners(), this
    }
    setContext(t, n) {
        return n === null ? delete this._contexts[t] : this._contexts[t] = n, this._notifyScopeListeners(), this
    }
    setSession(t) {
        return t ? this._session = t : delete this._session, this._notifyScopeListeners(), this
    }
    getSession() {
        return this._session
    }
    update(t) {
        if (!t) return this;
        const n = typeof t == "function" ? t(this) : t,
            [r, i] = n instanceof ci ? [n.getScopeData(), n.getRequestSession()] : Ps(n) ? [t, t.requestSession] : [],
            {
                tags: o,
                extra: s,
                user: a,
                contexts: u,
                level: l,
                fingerprint: c = [],
                propagationContext: f
            } = r || {};
        return this._tags = { ...this._tags,
            ...o
        }, this._extra = { ...this._extra,
            ...s
        }, this._contexts = { ...this._contexts,
            ...u
        }, a && Object.keys(a).length && (this._user = a), l && (this._level = l), c.length && (this._fingerprint = c), f && (this._propagationContext = f), i && (this._requestSession = i), this
    }
    clear() {
        return this._breadcrumbs = [], this._tags = {}, this._extra = {}, this._user = {}, this._contexts = {}, this._level = void 0, this._transactionName = void 0, this._fingerprint = void 0, this._requestSession = void 0, this._session = void 0, Wy(this, void 0), this._attachments = [], this._propagationContext = Vy(), this._notifyScopeListeners(), this
    }
    addBreadcrumb(t, n) {
        const r = typeof n == "number" ? n : QM;
        if (r <= 0) return this;
        const i = {
                timestamp: Ru(),
                ...t
            },
            o = this._breadcrumbs;
        return o.push(i), this._breadcrumbs = o.length > r ? o.slice(-r) : o, this._notifyScopeListeners(), this
    }
    getLastBreadcrumb() {
        return this._breadcrumbs[this._breadcrumbs.length - 1]
    }
    clearBreadcrumbs() {
        return this._breadcrumbs = [], this._notifyScopeListeners(), this
    }
    addAttachment(t) {
        return this._attachments.push(t), this
    }
    clearAttachments() {
        return this._attachments = [], this
    }
    getScopeData() {
        return {
            breadcrumbs: this._breadcrumbs,
            attachments: this._attachments,
            contexts: this._contexts,
            tags: this._tags,
            extra: this._extra,
            user: this._user,
            level: this._level,
            fingerprint: this._fingerprint || [],
            eventProcessors: this._eventProcessors,
            propagationContext: this._propagationContext,
            sdkProcessingMetadata: this._sdkProcessingMetadata,
            transactionName: this._transactionName,
            span: qy(this)
        }
    }
    setSDKProcessingMetadata(t) {
        return this._sdkProcessingMetadata = { ...this._sdkProcessingMetadata,
            ...t
        }, this
    }
    setPropagationContext(t) {
        return this._propagationContext = t, this
    }
    getPropagationContext() {
        return this._propagationContext
    }
    captureException(t, n) {
        const r = n && n.event_id ? n.event_id : mn();
        if (!this._client) return X.warn("No client configured on scope - will not capture exception!"), r;
        const i = new Error("Sentry syntheticException");
        return this._client.captureException(t, {
            originalException: t,
            syntheticException: i,
            ...n,
            event_id: r
        }, this), r
    }
    captureMessage(t, n, r) {
        const i = r && r.event_id ? r.event_id : mn();
        if (!this._client) return X.warn("No client configured on scope - will not capture message!"), i;
        const o = new Error(t);
        return this._client.captureMessage(t, n, {
            originalException: t,
            syntheticException: o,
            ...r,
            event_id: i
        }, this), i
    }
    captureEvent(t, n) {
        const r = n && n.event_id ? n.event_id : mn();
        return this._client ? (this._client.captureEvent(t, { ...n,
            event_id: r
        }, this), r) : (X.warn("No client configured on scope - will not capture event!"), r)
    }
    _notifyScopeListeners() {
        this._notifyingListeners || (this._notifyingListeners = !0, this._scopeListeners.forEach(t => {
            t(this)
        }), this._notifyingListeners = !1)
    }
}
const ci = m0;

function KM() {
    return f0("defaultCurrentScope", () => new ci)
}

function YM() {
    return f0("defaultIsolationScope", () => new ci)
}
class ZM {
    constructor(t, n) {
        let r;
        t ? r = t : r = new ci;
        let i;
        n ? i = n : i = new ci, this._stack = [{
            scope: r
        }], this._isolationScope = i
    }
    withScope(t) {
        const n = this._pushScope();
        let r;
        try {
            r = t(n)
        } catch (i) {
            throw this._popScope(), i
        }
        return lf(r) ? r.then(i => (this._popScope(), i), i => {
            throw this._popScope(), i
        }) : (this._popScope(), r)
    }
    getClient() {
        return this.getStackTop().client
    }
    getScope() {
        return this.getStackTop().scope
    }
    getIsolationScope() {
        return this._isolationScope
    }
    getStack() {
        return this._stack
    }
    getStackTop() {
        return this._stack[this._stack.length - 1]
    }
    _pushScope() {
        const t = this.getScope().clone();
        return this.getStack().push({
            client: this.getClient(),
            scope: t
        }), t
    }
    _popScope() {
        return this.getStack().length <= 1 ? !1 : !!this.getStack().pop()
    }
}

function ks() {
    const e = ff(),
        t = p0(e);
    return t.stack = t.stack || new ZM(KM(), YM())
}

function JM(e) {
    return ks().withScope(e)
}

function eI(e, t) {
    const n = ks();
    return n.withScope(() => (n.getStackTop().scope = e, t(e)))
}

function Xy(e) {
    return ks().withScope(() => e(ks().getIsolationScope()))
}

function tI() {
    return {
        withIsolationScope: Xy,
        withScope: JM,
        withSetScope: eI,
        withSetIsolationScope: (e, t) => Xy(t),
        getCurrentScope: () => ks().getScope(),
        getIsolationScope: () => ks().getIsolationScope()
    }
}

function v0(e) {
    const t = p0(e);
    return t.acs ? t.acs : tI()
}

function wr() {
    const e = ff();
    return v0(e).getCurrentScope()
}

function po() {
    const e = ff();
    return v0(e).getIsolationScope()
}

function nI() {
    return f0("globalScope", () => new ci)
}

function Zw(...e) {
    const t = ff(),
        n = v0(t);
    if (e.length === 2) {
        const [r, i] = e;
        return r ? n.withSetScope(r, i) : n.withScope(i)
    }
    return n.withScope(e[0])
}

function at() {
    return wr().getClient()
}
const rI = "_sentryMetrics";

function iI(e) {
    const t = e[rI];
    if (!t) return;
    const n = {};
    for (const [, [r, i]] of t) n[r] || (n[r] = []), n[r].push(fn(i));
    return n
}
const oI = "sentry.source",
    sI = "sentry.sample_rate",
    aI = "sentry.op",
    uI = "sentry.origin",
    lI = 0,
    cI = 1,
    fI = 1;

function hI(e) {
    const {
        spanId: t,
        traceId: n
    } = e.spanContext(), {
        parent_span_id: r
    } = dc(e);
    return fn({
        parent_span_id: r,
        span_id: t,
        trace_id: n
    })
}

function Qy(e) {
    return typeof e == "number" ? Ky(e) : Array.isArray(e) ? e[0] + e[1] / 1e9 : e instanceof Date ? Ky(e.getTime()) : hr()
}

function Ky(e) {
    return e > 9999999999 ? e / 1e3 : e
}

function dc(e) {
    if (pI(e)) return e.getSpanJSON();
    try {
        const {
            spanId: t,
            traceId: n
        } = e.spanContext();
        if (dI(e)) {
            const {
                attributes: r,
                startTime: i,
                name: o,
                endTime: s,
                parentSpanId: a,
                status: u
            } = e;
            return fn({
                span_id: t,
                trace_id: n,
                data: r,
                description: o,
                parent_span_id: a,
                start_timestamp: Qy(i),
                timestamp: Qy(s) || void 0,
                status: vI(u),
                op: r[aI],
                origin: r[uI],
                _metrics_summary: iI(e)
            })
        }
        return {
            span_id: t,
            trace_id: n
        }
    } catch {
        return {}
    }
}

function dI(e) {
    const t = e;
    return !!t.attributes && !!t.startTime && !!t.name && !!t.endTime && !!t.status
}

function pI(e) {
    return typeof e.getSpanJSON == "function"
}

function mI(e) {
    const {
        traceFlags: t
    } = e.spanContext();
    return t === fI
}

function vI(e) {
    if (!(!e || e.code === lI)) return e.code === cI ? "ok" : e.message || "unknown_error"
}
const gI = "_sentryRootSpan";

function Jw(e) {
    return e[gI] || e
}
const g0 = "production",
    yI = "_frozenDsc";

function ex(e, t) {
    const n = t.getOptions(),
        {
            publicKey: r
        } = t.getDsn() || {},
        i = fn({
            environment: n.environment || g0,
            release: n.release,
            public_key: r,
            trace_id: e
        });
    return t.emit("createDsc", i), i
}

function _I(e) {
    const t = at();
    if (!t) return {};
    const n = ex(dc(e).trace_id || "", t),
        r = Jw(e);
    if (!r) return n;
    const i = r[yI];
    if (i) return i;
    const o = dc(r),
        s = o.data || {},
        a = s[sI];
    a != null && (n.sample_rate = `${a}`);
    const u = s[oI];
    return u && u !== "url" && (n.transaction = o.description), n.sampled = String(mI(r)), t.emit("createDsc", n), n
}

function EI(e) {
    if (typeof e == "boolean") return Number(e);
    const t = typeof e == "string" ? parseFloat(e) : e;
    if (typeof t != "number" || isNaN(t) || t < 0 || t > 1) {
        Me && X.warn(`[Tracing] Given sample rate is invalid. Sample rate must be a boolean or a number between 0 and 1. Got ${JSON.stringify(e)} of type ${JSON.stringify(typeof e)}.`);
        return
    }
    return t
}

function SI(e, t) {
    return t && (e.sdk = e.sdk || {}, e.sdk.name = e.sdk.name || t.name, e.sdk.version = e.sdk.version || t.version, e.sdk.integrations = [...e.sdk.integrations || [], ...t.integrations || []], e.sdk.packages = [...e.sdk.packages || [], ...t.packages || []]), e
}

function wI(e, t, n, r) {
    const i = Yw(n),
        o = {
            sent_at: new Date().toISOString(),
            ...i && {
                sdk: i
            },
            ...!!r && t && {
                dsn: Cu(t)
            }
        },
        s = "aggregates" in e ? [{
            type: "sessions"
        }, e] : [{
            type: "session"
        }, e.toJSON()];
    return ku(o, [s])
}

function xI(e, t, n, r) {
    const i = Yw(n),
        o = e.type && e.type !== "replay_event" ? e.type : "event";
    SI(e, n && n.sdk);
    const s = $M(e, i, r, t);
    return delete e.sdkProcessingMetadata, ku(s, [
        [{
            type: o
        }, e]
    ])
}

function _p(e, t, n, r = 0) {
    return new un((i, o) => {
        const s = e[r];
        if (t === null || typeof s != "function") i(t);
        else {
            const a = s({ ...t
            }, n);
            Me && s.id && a === null && X.log(`Event processor "${s.id}" dropped event`), lf(a) ? a.then(u => _p(e, u, n, r + 1).then(i)).then(null, o) : _p(e, a, n, r + 1).then(i).then(null, o)
        }
    })
}

function TI(e, t) {
    const {
        fingerprint: n,
        span: r,
        breadcrumbs: i,
        sdkProcessingMetadata: o
    } = t;
    OI(e, t), r && CI(e, r), RI(e, n), bI(e, i), PI(e, o)
}

function Yy(e, t) {
    const {
        extra: n,
        tags: r,
        user: i,
        contexts: o,
        level: s,
        sdkProcessingMetadata: a,
        breadcrumbs: u,
        fingerprint: l,
        eventProcessors: c,
        attachments: f,
        propagationContext: h,
        transactionName: p,
        span: y
    } = t;
    ra(e, "extra", n), ra(e, "tags", r), ra(e, "user", i), ra(e, "contexts", o), ra(e, "sdkProcessingMetadata", a), s && (e.level = s), p && (e.transactionName = p), y && (e.span = y), u.length && (e.breadcrumbs = [...e.breadcrumbs, ...u]), l.length && (e.fingerprint = [...e.fingerprint, ...l]), c.length && (e.eventProcessors = [...e.eventProcessors, ...c]), f.length && (e.attachments = [...e.attachments, ...f]), e.propagationContext = { ...e.propagationContext,
        ...h
    }
}

function ra(e, t, n) {
    if (n && Object.keys(n).length) {
        e[t] = { ...e[t]
        };
        for (const r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[t][r] = n[r])
    }
}

function OI(e, t) {
    const {
        extra: n,
        tags: r,
        user: i,
        contexts: o,
        level: s,
        transactionName: a
    } = t, u = fn(n);
    u && Object.keys(u).length && (e.extra = { ...u,
        ...e.extra
    });
    const l = fn(r);
    l && Object.keys(l).length && (e.tags = { ...l,
        ...e.tags
    });
    const c = fn(i);
    c && Object.keys(c).length && (e.user = { ...c,
        ...e.user
    });
    const f = fn(o);
    f && Object.keys(f).length && (e.contexts = { ...f,
        ...e.contexts
    }), s && (e.level = s), a && e.type !== "transaction" && (e.transaction = a)
}

function bI(e, t) {
    const n = [...e.breadcrumbs || [], ...t];
    e.breadcrumbs = n.length ? n : void 0
}

function PI(e, t) {
    e.sdkProcessingMetadata = { ...e.sdkProcessingMetadata,
        ...t
    }
}

function CI(e, t) {
    e.contexts = {
        trace: hI(t),
        ...e.contexts
    }, e.sdkProcessingMetadata = {
        dynamicSamplingContext: _I(t),
        ...e.sdkProcessingMetadata
    };
    const n = Jw(t),
        r = dc(n).description;
    r && !e.transaction && e.type === "transaction" && (e.transaction = r)
}

function RI(e, t) {
    e.fingerprint = e.fingerprint ? Qw(e.fingerprint) : [], t && (e.fingerprint = e.fingerprint.concat(t)), e.fingerprint && !e.fingerprint.length && delete e.fingerprint
}

function kI(e, t, n, r, i, o) {
    const {
        normalizeDepth: s = 3,
        normalizeMaxBreadth: a = 1e3
    } = e, u = { ...t,
        event_id: t.event_id || n.event_id || mn(),
        timestamp: t.timestamp || Ru()
    }, l = n.integrations || e.integrations.map(_ => _.name);
    MI(u, e), AI(u, l), t.type === void 0 && II(u, e.stackParser);
    const c = DI(r, n.captureContext);
    n.mechanism && Qa(u, n.mechanism);
    const f = i ? i.getEventProcessors() : [],
        h = nI().getScopeData();
    if (o) {
        const _ = o.getScopeData();
        Yy(h, _)
    }
    if (c) {
        const _ = c.getScopeData();
        Yy(h, _)
    }
    const p = [...n.attachments || [], ...h.attachments];
    p.length && (n.attachments = p), TI(u, h);
    const y = [...f, ...h.eventProcessors];
    return _p(y, u, n).then(_ => (_ && LI(_), typeof s == "number" && s > 0 ? NI(_, s, a) : _))
}

function MI(e, t) {
    const {
        environment: n,
        release: r,
        dist: i,
        maxValueLength: o = 250
    } = t;
    "environment" in e || (e.environment = "environment" in t ? n : g0), e.release === void 0 && r !== void 0 && (e.release = r), e.dist === void 0 && i !== void 0 && (e.dist = i), e.message && (e.message = Qo(e.message, o));
    const s = e.exception && e.exception.values && e.exception.values[0];
    s && s.value && (s.value = Qo(s.value, o));
    const a = e.request;
    a && a.url && (a.url = Qo(a.url, o))
}
const Zy = new WeakMap;

function II(e, t) {
    const n = ae._sentryDebugIds;
    if (!n) return;
    let r;
    const i = Zy.get(t);
    i ? r = i : (r = new Map, Zy.set(t, r));
    const o = Object.keys(n).reduce((s, a) => {
        let u;
        const l = r.get(a);
        l ? u = l : (u = t(a), r.set(a, u));
        for (let c = u.length - 1; c >= 0; c--) {
            const f = u[c];
            if (f.filename) {
                s[f.filename] = n[a];
                break
            }
        }
        return s
    }, {});
    try {
        e.exception.values.forEach(s => {
            s.stacktrace.frames.forEach(a => {
                a.filename && (a.debug_id = o[a.filename])
            })
        })
    } catch {}
}

function LI(e) {
    const t = {};
    try {
        e.exception.values.forEach(r => {
            r.stacktrace.frames.forEach(i => {
                i.debug_id && (i.abs_path ? t[i.abs_path] = i.debug_id : i.filename && (t[i.filename] = i.debug_id), delete i.debug_id)
            })
        })
    } catch {}
    if (Object.keys(t).length === 0) return;
    e.debug_meta = e.debug_meta || {}, e.debug_meta.images = e.debug_meta.images || [];
    const n = e.debug_meta.images;
    Object.keys(t).forEach(r => {
        n.push({
            type: "sourcemap",
            code_file: r,
            debug_id: t[r]
        })
    })
}

function AI(e, t) {
    t.length > 0 && (e.sdk = e.sdk || {}, e.sdk.integrations = [...e.sdk.integrations || [], ...t])
}

function NI(e, t, n) {
    if (!e) return null;
    const r = { ...e,
        ...e.breadcrumbs && {
            breadcrumbs: e.breadcrumbs.map(i => ({ ...i,
                ...i.data && {
                    data: Lr(i.data, t, n)
                }
            }))
        },
        ...e.user && {
            user: Lr(e.user, t, n)
        },
        ...e.contexts && {
            contexts: Lr(e.contexts, t, n)
        },
        ...e.extra && {
            extra: Lr(e.extra, t, n)
        }
    };
    return e.contexts && e.contexts.trace && r.contexts && (r.contexts.trace = e.contexts.trace, e.contexts.trace.data && (r.contexts.trace.data = Lr(e.contexts.trace.data, t, n))), e.spans && (r.spans = e.spans.map(i => ({ ...i,
        ...i.data && {
            data: Lr(i.data, t, n)
        }
    }))), r
}

function DI(e, t) {
    if (!t) return e;
    const n = e ? e.clone() : new ci;
    return n.update(t), n
}

function FI(e) {
    if (e) return $I(e) ? {
        captureContext: e
    } : jI(e) ? {
        captureContext: e
    } : e
}

function $I(e) {
    return e instanceof ci || typeof e == "function"
}
const BI = ["user", "level", "extra", "contexts", "tags", "fingerprint", "requestSession", "propagationContext"];

function jI(e) {
    return Object.keys(e).some(t => BI.includes(t))
}

function tx(e, t) {
    return wr().captureException(e, FI(t))
}

function nx(e, t) {
    return wr().captureEvent(e, t)
}

function BH(e, t) {
    po().setTag(e, t)
}

function HI() {
    return po().lastEventId()
}

function Jy(e) {
    const t = at(),
        n = po(),
        r = wr(),
        {
            release: i,
            environment: o = g0
        } = t && t.getOptions() || {},
        {
            userAgent: s
        } = ae.navigator || {},
        a = WM({
            release: i,
            environment: o,
            user: r.getUser() || n.getUser(),
            ...s && {
                userAgent: s
            },
            ...e
        }),
        u = n.getSession();
    return u && u.status === "ok" && Rs(u, {
        status: "exited"
    }), rx(), n.setSession(a), r.setSession(a), a
}

function rx() {
    const e = po(),
        t = wr(),
        n = t.getSession() || e.getSession();
    n && qM(n), ix(), e.setSession(), t.setSession()
}

function ix() {
    const e = po(),
        t = wr(),
        n = at(),
        r = t.getSession() || e.getSession();
    r && n && n.captureSession(r)
}

function e_(e = !1) {
    if (e) {
        rx();
        return
    }
    ix()
}
const UI = "7";

function ox(e) {
    const t = e.protocol ? `${e.protocol}:` : "",
        n = e.port ? `:${e.port}` : "";
    return `${t}//${e.host}${n}${e.path?`/${e.path}`:""}/api/`
}

function zI(e) {
    return `${ox(e)}${e.projectId}/envelope/`
}

function GI(e, t) {
    return uM({
        sentry_key: e.publicKey,
        sentry_version: UI,
        ...t && {
            sentry_client: `${t.name}/${t.version}`
        }
    })
}

function VI(e, t, n) {
    return t || `${zI(e)}?${GI(e,n)}`
}

function WI(e, t) {
    const n = Hw(e);
    if (!n) return "";
    const r = `${ox(n)}embed/error-page/`;
    let i = `dsn=${Cu(n)}`;
    for (const o in t)
        if (o !== "dsn" && o !== "onClose")
            if (o === "user") {
                const s = t.user;
                if (!s) continue;
                s.name && (i += `&name=${encodeURIComponent(s.name)}`), s.email && (i += `&email=${encodeURIComponent(s.email)}`)
            } else i += `&${encodeURIComponent(o)}=${encodeURIComponent(t[o])}`;
    return `${r}?${i}`
}
const t_ = [];

function qI(e) {
    const t = {};
    return e.forEach(n => {
        const {
            name: r
        } = n, i = t[r];
        i && !i.isDefaultInstance && n.isDefaultInstance || (t[r] = n)
    }), Object.keys(t).map(n => t[n])
}

function XI(e) {
    const t = e.defaultIntegrations || [],
        n = e.integrations;
    t.forEach(s => {
        s.isDefaultInstance = !0
    });
    let r;
    Array.isArray(n) ? r = [...t, ...n] : typeof n == "function" ? r = Qw(n(t)) : r = t;
    const i = qI(r),
        o = KI(i, s => s.name === "Debug");
    if (o !== -1) {
        const [s] = i.splice(o, 1);
        i.push(s)
    }
    return i
}

function QI(e, t) {
    const n = {};
    return t.forEach(r => {
        r && sx(e, r, n)
    }), n
}

function n_(e, t) {
    for (const n of t) n && n.afterAllSetup && n.afterAllSetup(e)
}

function sx(e, t, n) {
    if (n[t.name]) {
        Me && X.log(`Integration skipped because it was already installed: ${t.name}`);
        return
    }
    if (n[t.name] = t, t_.indexOf(t.name) === -1 && typeof t.setupOnce == "function" && (t.setupOnce(), t_.push(t.name)), t.setup && typeof t.setup == "function" && t.setup(e), typeof t.preprocessEvent == "function") {
        const r = t.preprocessEvent.bind(t);
        e.on("preprocessEvent", (i, o) => r(i, o, e))
    }
    if (typeof t.processEvent == "function") {
        const r = t.processEvent.bind(t),
            i = Object.assign((o, s) => r(o, s, e), {
                id: t.name
            });
        e.addEventProcessor(i)
    }
    Me && X.log(`Integration installed: ${t.name}`)
}

function KI(e, t) {
    for (let n = 0; n < e.length; n++)
        if (t(e[n]) === !0) return n;
    return -1
}
const r_ = "Not capturing exception because it's already been captured.";
class YI {
    constructor(t) {
        if (this._options = t, this._integrations = {}, this._numProcessing = 0, this._outcomes = {}, this._hooks = {}, this._eventProcessors = [], t.dsn ? this._dsn = Hw(t.dsn) : Me && X.warn("No DSN provided, client will not send events."), this._dsn) {
            const n = VI(this._dsn, t.tunnel, t._metadata ? t._metadata.sdk : void 0);
            this._transport = t.transport({
                tunnel: this._options.tunnel,
                recordDroppedEvent: this.recordDroppedEvent.bind(this),
                ...t.transportOptions,
                url: n
            })
        }
    }
    captureException(t, n, r) {
        const i = mn();
        if (Uy(t)) return Me && X.log(r_), i;
        const o = {
            event_id: i,
            ...n
        };
        return this._process(this.eventFromException(t, o).then(s => this._captureEvent(s, o, r))), o.event_id
    }
    captureMessage(t, n, r, i) {
        const o = {
                event_id: mn(),
                ...r
            },
            s = l0(t) ? t : String(t),
            a = c0(t) ? this.eventFromMessage(s, n, o) : this.eventFromException(t, o);
        return this._process(a.then(u => this._captureEvent(u, o, i))), o.event_id
    }
    captureEvent(t, n, r) {
        const i = mn();
        if (n && n.originalException && Uy(n.originalException)) return Me && X.log(r_), i;
        const o = {
                event_id: i,
                ...n
            },
            a = (t.sdkProcessingMetadata || {}).capturedSpanScope;
        return this._process(this._captureEvent(t, o, a || r)), o.event_id
    }
    captureSession(t) {
        typeof t.release != "string" ? Me && X.warn("Discarded session because of missing or non-string release") : (this.sendSession(t), Rs(t, {
            init: !1
        }))
    }
    getDsn() {
        return this._dsn
    }
    getOptions() {
        return this._options
    }
    getSdkMetadata() {
        return this._options._metadata
    }
    getTransport() {
        return this._transport
    }
    flush(t) {
        const n = this._transport;
        return n ? (this.emit("flush"), this._isClientDoneProcessing(t).then(r => n.flush(t).then(i => r && i))) : ro(!0)
    }
    close(t) {
        return this.flush(t).then(n => (this.getOptions().enabled = !1, this.emit("close"), n))
    }
    getEventProcessors() {
        return this._eventProcessors
    }
    addEventProcessor(t) {
        this._eventProcessors.push(t)
    }
    init() {
        this._isEnabled() && this._setupIntegrations()
    }
    getIntegrationByName(t) {
        return this._integrations[t]
    }
    addIntegration(t) {
        const n = this._integrations[t.name];
        sx(this, t, this._integrations), n || n_(this, [t])
    }
    sendEvent(t, n = {}) {
        this.emit("beforeSendEvent", t, n);
        let r = xI(t, this._dsn, this._options._metadata, this._options.tunnel);
        for (const o of n.attachments || []) r = LM(r, DM(o));
        const i = this.sendEnvelope(r);
        i && i.then(o => this.emit("afterSendEvent", t, o), null)
    }
    sendSession(t) {
        const n = wI(t, this._dsn, this._options._metadata, this._options.tunnel);
        this.sendEnvelope(n)
    }
    recordDroppedEvent(t, n, r) {
        if (this._options.sendClientReports) {
            const i = `${t}:${n}`;
            Me && X.log(`Adding outcome: "${i}"`), this._outcomes[i] = this._outcomes[i] + 1 || 1
        }
    }
    on(t, n) {
        this._hooks[t] || (this._hooks[t] = []), this._hooks[t].push(n)
    }
    emit(t, ...n) {
        this._hooks[t] && this._hooks[t].forEach(r => r(...n))
    }
    sendEnvelope(t) {
        return this.emit("beforeEnvelope", t), this._isEnabled() && this._transport ? this._transport.send(t).then(null, n => (Me && X.error("Error while sending event:", n), n)) : (Me && X.error("Transport disabled"), ro({}))
    }
    _setupIntegrations() {
        const {
            integrations: t
        } = this._options;
        this._integrations = QI(this, t), n_(this, t)
    }
    _updateSessionFromEvent(t, n) {
        let r = !1,
            i = !1;
        const o = n.exception && n.exception.values;
        if (o) {
            i = !0;
            for (const u of o) {
                const l = u.mechanism;
                if (l && l.handled === !1) {
                    r = !0;
                    break
                }
            }
        }
        const s = t.status === "ok";
        (s && t.errors === 0 || s && r) && (Rs(t, { ...r && {
                status: "crashed"
            },
            errors: t.errors || Number(i || r)
        }), this.captureSession(t))
    }
    _isClientDoneProcessing(t) {
        return new un(n => {
            let r = 0;
            const i = 1,
                o = setInterval(() => {
                    this._numProcessing == 0 ? (clearInterval(o), n(!0)) : (r += i, t && r >= t && (clearInterval(o), n(!1)))
                }, i)
        })
    }
    _isEnabled() {
        return this.getOptions().enabled !== !1 && this._transport !== void 0
    }
    _prepareEvent(t, n, r, i = po()) {
        const o = this.getOptions(),
            s = Object.keys(this._integrations);
        return !n.integrations && s.length > 0 && (n.integrations = s), this.emit("preprocessEvent", t, n), t.type || i.setLastEventId(t.event_id || n.event_id), kI(o, t, n, r, this, i).then(a => {
            if (a === null) return a;
            const u = { ...i.getPropagationContext(),
                ...r ? r.getPropagationContext() : void 0
            };
            if (!(a.contexts && a.contexts.trace) && u) {
                const {
                    traceId: c,
                    spanId: f,
                    parentSpanId: h,
                    dsc: p
                } = u;
                a.contexts = {
                    trace: fn({
                        trace_id: c,
                        span_id: f,
                        parent_span_id: h
                    }),
                    ...a.contexts
                };
                const y = p || ex(c, this);
                a.sdkProcessingMetadata = {
                    dynamicSamplingContext: y,
                    ...a.sdkProcessingMetadata
                }
            }
            return a
        })
    }
    _captureEvent(t, n = {}, r) {
        return this._processEvent(t, n, r).then(i => i.event_id, i => {
            if (Me) {
                const o = i;
                o.logLevel === "log" ? X.log(o.message) : X.warn(o)
            }
        })
    }
    _processEvent(t, n, r) {
        const i = this.getOptions(),
            {
                sampleRate: o
            } = i,
            s = ux(t),
            a = ax(t),
            u = t.type || "error",
            l = `before send for type \`${u}\``,
            c = typeof o > "u" ? void 0 : EI(o);
        if (a && typeof c == "number" && Math.random() > c) return this.recordDroppedEvent("sample_rate", "error", t), hc(new Wn(`Discarding event because it's not included in the random sample (sampling rate = ${o})`, "log"));
        const f = u === "replay_event" ? "replay" : u,
            p = (t.sdkProcessingMetadata || {}).capturedSpanIsolationScope;
        return this._prepareEvent(t, n, r, p).then(y => {
            if (y === null) throw this.recordDroppedEvent("event_processor", f, t), new Wn("An event processor returned `null`, will not send event.", "log");
            if (n.data && n.data.__sentry__ === !0) return y;
            const _ = JI(i, y, n);
            return ZI(_, l)
        }).then(y => {
            if (y === null) throw this.recordDroppedEvent("before_send", f, t), new Wn(`${l} returned \`null\`, will not send event.`, "log");
            const m = r && r.getSession();
            !s && m && this._updateSessionFromEvent(m, y);
            const _ = y.transaction_info;
            if (s && _ && y.transaction !== t.transaction) {
                const g = "custom";
                y.transaction_info = { ..._,
                    source: g
                }
            }
            return this.sendEvent(y, n), y
        }).then(null, y => {
            throw y instanceof Wn ? y : (this.captureException(y, {
                data: {
                    __sentry__: !0
                },
                originalException: y
            }), new Wn(`Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.
Reason: ${y}`))
        })
    }
    _process(t) {
        this._numProcessing++, t.then(n => (this._numProcessing--, n), n => (this._numProcessing--, n))
    }
    _clearOutcomes() {
        const t = this._outcomes;
        return this._outcomes = {}, Object.keys(t).map(n => {
            const [r, i] = n.split(":");
            return {
                reason: r,
                category: i,
                quantity: t[n]
            }
        })
    }
}

function ZI(e, t) {
    const n = `${t} must return \`null\` or a valid event.`;
    if (lf(e)) return e.then(r => {
        if (!Ps(r) && r !== null) throw new Wn(n);
        return r
    }, r => {
        throw new Wn(`${t} rejected with ${r}`)
    });
    if (!Ps(e) && e !== null) throw new Wn(n);
    return e
}

function JI(e, t, n) {
    const {
        beforeSend: r,
        beforeSendTransaction: i,
        beforeSendSpan: o
    } = e;
    if (ax(t) && r) return r(t, n);
    if (ux(t)) {
        if (t.spans && o) {
            const s = [];
            for (const a of t.spans) {
                const u = o(a);
                u && s.push(u)
            }
            t.spans = s
        }
        if (i) return i(t, n)
    }
    return t
}

function ax(e) {
    return e.type === void 0
}

function ux(e) {
    return e.type === "transaction"
}

function eL(e, t) {
    t.debug === !0 && (Me ? X.enable() : Pu(() => {
        console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.")
    })), wr().update(t.initialScope);
    const r = new e(t);
    tL(r), r.init()
}

function tL(e) {
    wr().setClient(e)
}
const nL = 64;

function rL(e, t, n = kM(e.bufferSize || nL)) {
    let r = {};
    const i = s => n.drain(s);

    function o(s) {
        const a = [];
        if (zy(s, (f, h) => {
                const p = Gy(h);
                if (zM(r, p)) {
                    const y = i_(f, h);
                    e.recordDroppedEvent("ratelimit_backoff", p, y)
                } else a.push(f)
            }), a.length === 0) return ro({});
        const u = ku(s[0], a),
            l = f => {
                zy(u, (h, p) => {
                    const y = i_(h, p);
                    e.recordDroppedEvent(f, Gy(p), y)
                })
            },
            c = () => t({
                body: AM(u)
            }).then(f => (f.statusCode !== void 0 && (f.statusCode < 200 || f.statusCode >= 300) && Me && X.warn(`Sentry responded with status code ${f.statusCode} to sent event.`), r = GM(r, f), f), f => {
                throw l("network_error"), f
            });
        return n.add(c).then(f => f, f => {
            if (f instanceof Wn) return Me && X.error("Skipped sending event because buffer is full."), l("queue_overflow"), ro({});
            throw f
        })
    }
    return {
        send: o,
        flush: i
    }
}

function i_(e, t) {
    if (!(t !== "event" && t !== "transaction")) return Array.isArray(e) ? e[1] : void 0
}

function lx(e, t, n = [t], r = "npm") {
    const i = e._metadata || {};
    i.sdk || (i.sdk = {
        name: `sentry.javascript.${t}`,
        packages: n.map(o => ({
            name: `${r}:@sentry/${o}`,
            version: Ui
        })),
        version: Ui
    }), e._metadata = i
}
const iL = 100;

function io(e, t) {
    const n = at(),
        r = po();
    if (!n) return;
    const {
        beforeBreadcrumb: i = null,
        maxBreadcrumbs: o = iL
    } = n.getOptions();
    if (o <= 0) return;
    const a = {
            timestamp: Ru(),
            ...e
        },
        u = i ? Pu(() => i(a, t)) : a;
    u !== null && (n.emit && n.emit("beforeAddBreadcrumb", u, t), r.addBreadcrumb(u, o))
}
let o_;
const oL = "FunctionToString",
    s_ = new WeakMap,
    sL = () => ({
        name: oL,
        setupOnce() {
            o_ = Function.prototype.toString;
            try {
                Function.prototype.toString = function(...e) {
                    const t = d0(this),
                        n = s_.has(at()) && t !== void 0 ? t : this;
                    return o_.apply(n, e)
                }
            } catch {}
        },
        setup(e) {
            s_.set(e, !0)
        }
    }),
    aL = sL,
    uL = [/^Script error\.?$/, /^Javascript error: Script error\.? on line 0$/, /^ResizeObserver loop completed with undelivered notifications.$/, /^Cannot redefine property: googletag$/],
    lL = "InboundFilters",
    cL = (e = {}) => ({
        name: lL,
        processEvent(t, n, r) {
            const i = r.getOptions(),
                o = hL(e, i);
            return dL(t, o) ? null : t
        }
    }),
    fL = cL;

function hL(e = {}, t = {}) {
    return {
        allowUrls: [...e.allowUrls || [], ...t.allowUrls || []],
        denyUrls: [...e.denyUrls || [], ...t.denyUrls || []],
        ignoreErrors: [...e.ignoreErrors || [], ...t.ignoreErrors || [], ...e.disableErrorDefaults ? [] : uL],
        ignoreTransactions: [...e.ignoreTransactions || [], ...t.ignoreTransactions || []],
        ignoreInternal: e.ignoreInternal !== void 0 ? e.ignoreInternal : !0
    }
}

function dL(e, t) {
    return t.ignoreInternal && _L(e) ? (Me && X.warn(`Event dropped due to being internal Sentry Error.
Event: ${bi(e)}`), !0) : pL(e, t.ignoreErrors) ? (Me && X.warn(`Event dropped due to being matched by \`ignoreErrors\` option.
Event: ${bi(e)}`), !0) : mL(e, t.ignoreTransactions) ? (Me && X.warn(`Event dropped due to being matched by \`ignoreTransactions\` option.
Event: ${bi(e)}`), !0) : vL(e, t.denyUrls) ? (Me && X.warn(`Event dropped due to being matched by \`denyUrls\` option.
Event: ${bi(e)}.
Url: ${pc(e)}`), !0) : gL(e, t.allowUrls) ? !1 : (Me && X.warn(`Event dropped due to not being matched by \`allowUrls\` option.
Event: ${bi(e)}.
Url: ${pc(e)}`), !0)
}

function pL(e, t) {
    return e.type || !t || !t.length ? !1 : yL(e).some(n => cf(n, t))
}

function mL(e, t) {
    if (e.type !== "transaction" || !t || !t.length) return !1;
    const n = e.transaction;
    return n ? cf(n, t) : !1
}

function vL(e, t) {
    if (!t || !t.length) return !1;
    const n = pc(e);
    return n ? cf(n, t) : !1
}

function gL(e, t) {
    if (!t || !t.length) return !0;
    const n = pc(e);
    return n ? cf(n, t) : !0
}

function yL(e) {
    const t = [];
    e.message && t.push(e.message);
    let n;
    try {
        n = e.exception.values[e.exception.values.length - 1]
    } catch {}
    return n && n.value && (t.push(n.value), n.type && t.push(`${n.type}: ${n.value}`)), t
}

function _L(e) {
    try {
        return e.exception.values[0].type === "SentryError"
    } catch {}
    return !1
}

function EL(e = []) {
    for (let t = e.length - 1; t >= 0; t--) {
        const n = e[t];
        if (n && n.filename !== "<anonymous>" && n.filename !== "[native code]") return n.filename || null
    }
    return null
}

function pc(e) {
    try {
        let t;
        try {
            t = e.exception.values[0].stacktrace.frames
        } catch {}
        return t ? EL(t) : null
    } catch {
        return Me && X.error(`Cannot extract url for event ${bi(e)}`), null
    }
}
const SL = "Dedupe",
    wL = () => {
        let e;
        return {
            name: SL,
            processEvent(t) {
                if (t.type) return t;
                try {
                    if (TL(t, e)) return Me && X.warn("Event dropped due to being a duplicate of previously captured event."), null
                } catch {}
                return e = t
            }
        }
    },
    xL = wL;

function TL(e, t) {
    return t ? !!(OL(e, t) || bL(e, t)) : !1
}

function OL(e, t) {
    const n = e.message,
        r = t.message;
    return !(!n && !r || n && !r || !n && r || n !== r || !fx(e, t) || !cx(e, t))
}

function bL(e, t) {
    const n = a_(t),
        r = a_(e);
    return !(!n || !r || n.type !== r.type || n.value !== r.value || !fx(e, t) || !cx(e, t))
}

function cx(e, t) {
    let n = u_(e),
        r = u_(t);
    if (!n && !r) return !0;
    if (n && !r || !n && r || (n = n, r = r, r.length !== n.length)) return !1;
    for (let i = 0; i < r.length; i++) {
        const o = r[i],
            s = n[i];
        if (o.filename !== s.filename || o.lineno !== s.lineno || o.colno !== s.colno || o.function !== s.function) return !1
    }
    return !0
}

function fx(e, t) {
    let n = e.fingerprint,
        r = t.fingerprint;
    if (!n && !r) return !0;
    if (n && !r || !n && r) return !1;
    n = n, r = r;
    try {
        return n.join("") === r.join("")
    } catch {
        return !1
    }
}

function a_(e) {
    return e.exception && e.exception.values && e.exception.values[0]
}

function u_(e) {
    const t = e.exception;
    if (t) try {
        return t.values[0].stacktrace.frames
    } catch {
        return
    }
}
const oe = ae;
let Ep = 0;

function hx() {
    return Ep > 0
}

function PL() {
    Ep++, setTimeout(() => {
        Ep--
    })
}

function Ms(e, t = {}, n) {
    if (typeof e != "function") return e;
    try {
        const i = e.__sentry_wrapped__;
        if (i) return i;
        if (d0(e)) return e
    } catch {
        return e
    }
    const r = function() {
        const i = Array.prototype.slice.call(arguments);
        try {
            n && typeof n == "function" && n.apply(this, arguments);
            const o = i.map(s => Ms(s, t));
            return e.apply(this, o)
        } catch (o) {
            throw PL(), Zw(s => {
                s.addEventProcessor(a => (t.mechanism && (mp(a, void 0, void 0), Qa(a, t.mechanism)), a.extra = { ...a.extra,
                    arguments: i
                }, a)), tx(o)
            }), o
        }
    };
    try {
        for (const i in e) Object.prototype.hasOwnProperty.call(e, i) && (r[i] = e[i])
    } catch {}
    Uw(r, e), Cs(e, "__sentry_wrapped__", r);
    try {
        Object.getOwnPropertyDescriptor(r, "name").configurable && Object.defineProperty(r, "name", {
            get() {
                return e.name
            }
        })
    } catch {}
    return r
}
const Cn = typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__;

function y0(e, t) {
    const n = _0(e, t),
        r = {
            type: t && t.name,
            value: IL(t)
        };
    return n.length && (r.stacktrace = {
        frames: n
    }), r.type === void 0 && r.value === "" && (r.value = "Unrecoverable error caught"), r
}

function CL(e, t, n, r) {
    const i = at(),
        o = i && i.getOptions().normalizeDepth,
        s = FL(t),
        a = {
            __serialized__: Kw(t, o)
        };
    if (s) return {
        exception: {
            values: [y0(e, s)]
        },
        extra: a
    };
    const u = {
        exception: {
            values: [{
                type: uf(t) ? t.constructor.name : r ? "UnhandledRejection" : "Error",
                value: NL(t, {
                    isUnhandledRejection: r
                })
            }]
        },
        extra: a
    };
    if (n) {
        const l = _0(e, n);
        l.length && (u.exception.values[0].stacktrace = {
            frames: l
        })
    }
    return u
}

function Rh(e, t) {
    return {
        exception: {
            values: [y0(e, t)]
        }
    }
}

function _0(e, t) {
    const n = t.stacktrace || t.stack || "",
        r = kL(t),
        i = ML(t);
    try {
        return e(n, r, i)
    } catch {}
    return []
}
const RL = /Minified React error #\d+;/i;

function kL(e) {
    return e && RL.test(e.message) ? 1 : 0
}

function ML(e) {
    return typeof e.framesToPop == "number" ? e.framesToPop : 0
}

function IL(e) {
    const t = e && e.message;
    return t ? t.error && typeof t.error.message == "string" ? t.error.message : t : "No error message"
}

function LL(e, t, n, r) {
    const i = n && n.syntheticException || void 0,
        o = E0(e, t, i, r);
    return Qa(o), o.level = "error", n && n.event_id && (o.event_id = n.event_id), ro(o)
}

function AL(e, t, n = "info", r, i) {
    const o = r && r.syntheticException || void 0,
        s = Sp(e, t, o, i);
    return s.level = n, r && r.event_id && (s.event_id = r.event_id), ro(s)
}

function E0(e, t, n, r, i) {
    let o;
    if (Fw(t) && t.error) return Rh(e, t.error);
    if (Iy(t) || V2(t)) {
        const s = t;
        if ("stack" in t) o = Rh(e, t);
        else {
            const a = s.name || (Iy(s) ? "DOMError" : "DOMException"),
                u = s.message ? `${a}: ${s.message}` : a;
            o = Sp(e, u, n, r), mp(o, u)
        }
        return "code" in s && (o.tags = { ...o.tags,
            "DOMException.code": `${s.code}`
        }), o
    }
    return u0(t) ? Rh(e, t) : Ps(t) || uf(t) ? (o = CL(e, t, n, i), Qa(o, {
        synthetic: !0
    }), o) : (o = Sp(e, t, n, r), mp(o, `${t}`, void 0), Qa(o, {
        synthetic: !0
    }), o)
}

function Sp(e, t, n, r) {
    const i = {};
    if (r && n) {
        const o = _0(e, n);
        o.length && (i.exception = {
            values: [{
                value: t,
                stacktrace: {
                    frames: o
                }
            }]
        })
    }
    if (l0(t)) {
        const {
            __sentry_template_string__: o,
            __sentry_template_values__: s
        } = t;
        return i.logentry = {
            message: o,
            params: s
        }, i
    }
    return i.message = t, i
}

function NL(e, {
    isUnhandledRejection: t
}) {
    const n = lM(e),
        r = t ? "promise rejection" : "exception";
    return Fw(e) ? `Event \`ErrorEvent\` captured as ${r} with message \`${e.message}\`` : uf(e) ? `Event \`${DL(e)}\` (type=${e.type}) captured as ${r}` : `Object captured as ${r} with keys: ${n}`
}

function DL(e) {
    try {
        const t = Object.getPrototypeOf(e);
        return t ? t.constructor.name : void 0
    } catch {}
}

function FL(e) {
    for (const t in e)
        if (Object.prototype.hasOwnProperty.call(e, t)) {
            const n = e[t];
            if (n instanceof Error) return n
        }
}

function $L(e, {
    metadata: t,
    tunnel: n,
    dsn: r
}) {
    const i = {
            event_id: e.event_id,
            sent_at: new Date().toISOString(),
            ...t && t.sdk && {
                sdk: {
                    name: t.sdk.name,
                    version: t.sdk.version
                }
            },
            ...!!n && !!r && {
                dsn: Cu(r)
            }
        },
        o = BL(e);
    return ku(i, [o])
}

function BL(e) {
    return [{
        type: "user_report"
    }, e]
}
class jL extends YI {
    constructor(t) {
        const n = {
                parentSpanIsAlwaysRootSpan: !0,
                ...t
            },
            r = oe.SENTRY_SDK_SOURCE || TM();
        lx(n, "browser", ["browser"], r), super(n), n.sendClientReports && oe.document && oe.document.addEventListener("visibilitychange", () => {
            oe.document.visibilityState === "hidden" && this._flushOutcomes()
        })
    }
    eventFromException(t, n) {
        return LL(this._options.stackParser, t, n, this._options.attachStacktrace)
    }
    eventFromMessage(t, n = "info", r) {
        return AL(this._options.stackParser, t, n, r, this._options.attachStacktrace)
    }
    captureUserFeedback(t) {
        if (!this._isEnabled()) {
            Cn && X.warn("SDK not enabled, will not capture user feedback.");
            return
        }
        const n = $L(t, {
            metadata: this.getSdkMetadata(),
            dsn: this.getDsn(),
            tunnel: this.getOptions().tunnel
        });
        this.sendEnvelope(n)
    }
    _prepareEvent(t, n, r) {
        return t.platform = t.platform || "javascript", super._prepareEvent(t, n, r)
    }
    _flushOutcomes() {
        const t = this._clearOutcomes();
        if (t.length === 0) {
            Cn && X.log("No outcomes to send");
            return
        }
        if (!this._dsn) {
            Cn && X.log("No dsn provided, will not send outcomes");
            return
        }
        Cn && X.log("Sending outcomes:", t);
        const n = BM(t, this._options.tunnel && Cu(this._dsn));
        this.sendEnvelope(n)
    }
}
const HL = typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__,
    nt = ae,
    UL = 1e3;
let l_, wp, xp;

function zL(e) {
    const t = "dom";
    fo(t, e), ho(t, GL)
}

function GL() {
    if (!nt.document) return;
    const e = Mn.bind(null, "dom"),
        t = c_(e, !0);
    nt.document.addEventListener("click", t, !1), nt.document.addEventListener("keypress", t, !1), ["EventTarget", "Node"].forEach(n => {
        const r = nt[n] && nt[n].prototype;
        !r || !r.hasOwnProperty || !r.hasOwnProperty("addEventListener") || (Ke(r, "addEventListener", function(i) {
            return function(o, s, a) {
                if (o === "click" || o == "keypress") try {
                    const u = this,
                        l = u.__sentry_instrumentation_handlers__ = u.__sentry_instrumentation_handlers__ || {},
                        c = l[o] = l[o] || {
                            refCount: 0
                        };
                    if (!c.handler) {
                        const f = c_(e);
                        c.handler = f, i.call(this, o, f, a)
                    }
                    c.refCount++
                } catch {}
                return i.call(this, o, s, a)
            }
        }), Ke(r, "removeEventListener", function(i) {
            return function(o, s, a) {
                if (o === "click" || o == "keypress") try {
                    const u = this,
                        l = u.__sentry_instrumentation_handlers__ || {},
                        c = l[o];
                    c && (c.refCount--, c.refCount <= 0 && (i.call(this, o, c.handler, a), c.handler = void 0, delete l[o]), Object.keys(l).length === 0 && delete u.__sentry_instrumentation_handlers__)
                } catch {}
                return i.call(this, o, s, a)
            }
        }))
    })
}

function VL(e) {
    if (e.type !== wp) return !1;
    try {
        if (!e.target || e.target._sentryId !== xp) return !1
    } catch {}
    return !0
}

function WL(e, t) {
    return e !== "keypress" ? !1 : !t || !t.tagName ? !0 : !(t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)
}

function c_(e, t = !1) {
    return n => {
        if (!n || n._sentryCaptured) return;
        const r = qL(n);
        if (WL(n.type, r)) return;
        Cs(n, "_sentryCaptured", !0), r && !r._sentryId && Cs(r, "_sentryId", mn());
        const i = n.type === "keypress" ? "input" : n.type;
        VL(n) || (e({
            event: n,
            name: i,
            global: t
        }), wp = n.type, xp = r ? r._sentryId : void 0), clearTimeout(l_), l_ = nt.setTimeout(() => {
            xp = void 0, wp = void 0
        }, UL)
    }
}

function qL(e) {
    try {
        return e.target
    } catch {
        return null
    }
}
let al;

function dx(e) {
    const t = "history";
    fo(t, e), ho(t, XL)
}

function XL() {
    if (!VM()) return;
    const e = nt.onpopstate;
    nt.onpopstate = function(...n) {
        const r = nt.location.href,
            i = al;
        if (al = r, Mn("history", {
                from: i,
                to: r
            }), e) try {
            return e.apply(this, n)
        } catch {}
    };

    function t(n) {
        return function(...r) {
            const i = r.length > 2 ? r[2] : void 0;
            if (i) {
                const o = al,
                    s = String(i);
                al = s, Mn("history", {
                    from: o,
                    to: s
                })
            }
            return n.apply(this, r)
        }
    }
    Ke(nt.history, "pushState", t), Ke(nt.history, "replaceState", t)
}
const Ml = {};

function QL(e) {
    const t = Ml[e];
    if (t) return t;
    let n = nt[e];
    if (dp(n)) return Ml[e] = n.bind(nt);
    const r = nt.document;
    if (r && typeof r.createElement == "function") try {
        const i = r.createElement("iframe");
        i.hidden = !0, r.head.appendChild(i);
        const o = i.contentWindow;
        o && o[e] && (n = o[e]), r.head.removeChild(i)
    } catch (i) {
        HL && X.warn(`Could not create sandbox iframe for ${e} check, bailing to window.${e}: `, i)
    }
    return n && (Ml[e] = n.bind(nt))
}

function f_(e) {
    Ml[e] = void 0
}
const pa = "__sentry_xhr_v3__";

function KL(e) {
    const t = "xhr";
    fo(t, e), ho(t, YL)
}

function YL() {
    if (!nt.XMLHttpRequest) return;
    const e = XMLHttpRequest.prototype;
    Ke(e, "open", function(t) {
        return function(...n) {
            const r = hr() * 1e3,
                i = ri(n[0]) ? n[0].toUpperCase() : void 0,
                o = ZL(n[1]);
            if (!i || !o) return t.apply(this, n);
            this[pa] = {
                method: i,
                url: o,
                request_headers: {}
            }, i === "POST" && o.match(/sentry_key/) && (this.__sentry_own_request__ = !0);
            const s = () => {
                const a = this[pa];
                if (a && this.readyState === 4) {
                    try {
                        a.status_code = this.status
                    } catch {}
                    const u = {
                        endTimestamp: hr() * 1e3,
                        startTimestamp: r,
                        xhr: this
                    };
                    Mn("xhr", u)
                }
            };
            return "onreadystatechange" in this && typeof this.onreadystatechange == "function" ? Ke(this, "onreadystatechange", function(a) {
                return function(...u) {
                    return s(), a.apply(this, u)
                }
            }) : this.addEventListener("readystatechange", s), Ke(this, "setRequestHeader", function(a) {
                return function(...u) {
                    const [l, c] = u, f = this[pa];
                    return f && ri(l) && ri(c) && (f.request_headers[l.toLowerCase()] = c), a.apply(this, u)
                }
            }), t.apply(this, n)
        }
    }), Ke(e, "send", function(t) {
        return function(...n) {
            const r = this[pa];
            if (!r) return t.apply(this, n);
            n[0] !== void 0 && (r.body = n[0]);
            const i = {
                startTimestamp: hr() * 1e3,
                xhr: this
            };
            return Mn("xhr", i), t.apply(this, n)
        }
    })
}

function ZL(e) {
    if (ri(e)) return e;
    try {
        return e.toString()
    } catch {}
}

function JL(e, t = QL("fetch")) {
    let n = 0,
        r = 0;

    function i(o) {
        const s = o.body.length;
        n += s, r++;
        const a = {
            body: o.body,
            method: "POST",
            referrerPolicy: "origin",
            headers: e.headers,
            keepalive: n <= 6e4 && r < 15,
            ...e.fetchOptions
        };
        if (!t) return f_("fetch"), hc("No fetch implementation available");
        try {
            return t(e.url, a).then(u => (n -= s, r--, {
                statusCode: u.status,
                headers: {
                    "x-sentry-rate-limits": u.headers.get("X-Sentry-Rate-Limits"),
                    "retry-after": u.headers.get("Retry-After")
                }
            }))
        } catch (u) {
            return f_("fetch"), n -= s, r--, hc(u)
        }
    }
    return rL(e, i)
}
const eA = 30,
    tA = 50;

function px(e, t, n, r) {
    const i = {
        filename: e,
        function: t === "<anonymous>" ? zs : t,
        in_app: !0
    };
    return n !== void 0 && (i.lineno = n), r !== void 0 && (i.colno = r), i
}
const nA = /^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,
    rA = /\((\S*)(?::(\d+))(?::(\d+))\)/,
    iA = e => {
        const t = nA.exec(e);
        if (t) {
            if (t[2] && t[2].indexOf("eval") === 0) {
                const o = rA.exec(t[2]);
                o && (t[2] = o[1], t[3] = o[2], t[4] = o[3])
            }
            const [r, i] = mx(t[1] || zs, t[2]);
            return px(i, r, t[3] ? +t[3] : void 0, t[4] ? +t[4] : void 0)
        }
    },
    oA = [eA, iA],
    sA = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i,
    aA = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i,
    uA = e => {
        const t = sA.exec(e);
        if (t) {
            if (t[3] && t[3].indexOf(" > eval") > -1) {
                const o = aA.exec(t[3]);
                o && (t[1] = t[1] || "eval", t[3] = o[1], t[4] = o[2], t[5] = "")
            }
            let r = t[3],
                i = t[1] || zs;
            return [i, r] = mx(i, r), px(r, i, t[4] ? +t[4] : void 0, t[5] ? +t[5] : void 0)
        }
    },
    lA = [tA, uA],
    cA = [oA, lA],
    fA = Vw(...cA),
    mx = (e, t) => {
        const n = e.indexOf("safari-extension") !== -1,
            r = e.indexOf("safari-web-extension") !== -1;
        return n || r ? [e.indexOf("@") !== -1 ? e.split("@")[0] : zs, n ? `safari-extension:${t}` : `safari-web-extension:${t}`] : [e, t]
    },
    ul = 1024,
    hA = "Breadcrumbs",
    dA = (e = {}) => {
        const t = {
            console: !0,
            dom: !0,
            fetch: !0,
            history: !0,
            sentry: !0,
            xhr: !0,
            ...e
        };
        return {
            name: hA,
            setup(n) {
                t.console && dM(gA(n)), t.dom && zL(vA(n, t.dom)), t.xhr && KL(yA(n)), t.fetch && gM(_A(n)), t.history && dx(EA(n)), t.sentry && n.on("beforeSendEvent", mA(n))
            }
        }
    },
    pA = dA;

function mA(e) {
    return function(n) {
        at() === e && io({
            category: `sentry.${n.type==="transaction"?"transaction":"event"}`,
            event_id: n.event_id,
            level: n.level,
            message: bi(n)
        }, {
            event: n
        })
    }
}

function vA(e, t) {
    return function(r) {
        if (at() !== e) return;
        let i, o, s = typeof t == "object" ? t.serializeAttribute : void 0,
            a = typeof t == "object" && typeof t.maxStringLength == "number" ? t.maxStringLength : void 0;
        a && a > ul && (Cn && X.warn(`\`dom.maxStringLength\` cannot exceed ${ul}, but a value of ${a} was configured. Sentry will use ${ul} instead.`), a = ul), typeof s == "string" && (s = [s]);
        try {
            const l = r.event,
                c = SA(l) ? l.target : l;
            i = Bw(c, {
                keyAttrs: s,
                maxStringLength: a
            }), o = tM(c)
        } catch {
            i = "<unknown>"
        }
        if (i.length === 0) return;
        const u = {
            category: `ui.${r.name}`,
            message: i
        };
        o && (u.data = {
            "ui.component_name": o
        }), io(u, {
            event: r.event,
            name: r.name,
            global: r.global
        })
    }
}

function gA(e) {
    return function(n) {
        if (at() !== e) return;
        const r = {
            category: "console",
            data: {
                arguments: n.args,
                logger: "console"
            },
            level: IM(n.level),
            message: Ly(n.args, " ")
        };
        if (n.level === "assert")
            if (n.args[0] === !1) r.message = `Assertion failed: ${Ly(n.args.slice(1)," ")||"console.assert"}`, r.data.arguments = n.args.slice(1);
            else return;
        io(r, {
            input: n.args,
            level: n.level
        })
    }
}

function yA(e) {
    return function(n) {
        if (at() !== e) return;
        const {
            startTimestamp: r,
            endTimestamp: i
        } = n, o = n.xhr[pa];
        if (!r || !i || !o) return;
        const {
            method: s,
            url: a,
            status_code: u,
            body: l
        } = o, c = {
            method: s,
            url: a,
            status_code: u
        }, f = {
            xhr: n.xhr,
            input: l,
            startTimestamp: r,
            endTimestamp: i
        };
        io({
            category: "xhr",
            data: c,
            type: "http"
        }, f)
    }
}

function _A(e) {
    return function(n) {
        if (at() !== e) return;
        const {
            startTimestamp: r,
            endTimestamp: i
        } = n;
        if (i && !(n.fetchData.url.match(/sentry_key/) && n.fetchData.method === "POST"))
            if (n.error) {
                const o = n.fetchData,
                    s = {
                        data: n.error,
                        input: n.args,
                        startTimestamp: r,
                        endTimestamp: i
                    };
                io({
                    category: "fetch",
                    data: o,
                    level: "error",
                    type: "http"
                }, s)
            } else {
                const o = n.response,
                    s = { ...n.fetchData,
                        status_code: o && o.status
                    },
                    a = {
                        input: n.args,
                        response: o,
                        startTimestamp: r,
                        endTimestamp: i
                    };
                io({
                    category: "fetch",
                    data: s,
                    type: "http"
                }, a)
            }
    }
}

function EA(e) {
    return function(n) {
        if (at() !== e) return;
        let r = n.from,
            i = n.to;
        const o = Ch(oe.location.href);
        let s = r ? Ch(r) : void 0;
        const a = Ch(i);
        (!s || !s.path) && (s = o), o.protocol === a.protocol && o.host === a.host && (i = a.relative), o.protocol === s.protocol && o.host === s.host && (r = s.relative), io({
            category: "navigation",
            data: {
                from: r,
                to: i
            }
        })
    }
}

function SA(e) {
    return !!e && !!e.target
}
const wA = ["EventTarget", "Window", "Node", "ApplicationCache", "AudioTrackList", "BroadcastChannel", "ChannelMergerNode", "CryptoOperation", "EventSource", "FileReader", "HTMLUnknownElement", "IDBDatabase", "IDBRequest", "IDBTransaction", "KeyOperation", "MediaController", "MessagePort", "ModalWindow", "Notification", "SVGElementInstance", "Screen", "SharedWorker", "TextTrack", "TextTrackCue", "TextTrackList", "WebSocket", "WebSocketWorker", "Worker", "XMLHttpRequest", "XMLHttpRequestEventTarget", "XMLHttpRequestUpload"],
    xA = "BrowserApiErrors",
    TA = (e = {}) => {
        const t = {
            XMLHttpRequest: !0,
            eventTarget: !0,
            requestAnimationFrame: !0,
            setInterval: !0,
            setTimeout: !0,
            ...e
        };
        return {
            name: xA,
            setupOnce() {
                t.setTimeout && Ke(oe, "setTimeout", h_), t.setInterval && Ke(oe, "setInterval", h_), t.requestAnimationFrame && Ke(oe, "requestAnimationFrame", bA), t.XMLHttpRequest && "XMLHttpRequest" in oe && Ke(XMLHttpRequest.prototype, "send", PA);
                const n = t.eventTarget;
                n && (Array.isArray(n) ? n : wA).forEach(CA)
            }
        }
    },
    OA = TA;

function h_(e) {
    return function(...t) {
        const n = t[0];
        return t[0] = Ms(n, {
            mechanism: {
                data: {
                    function: li(e)
                },
                handled: !1,
                type: "instrument"
            }
        }), e.apply(this, t)
    }
}

function bA(e) {
    return function(t) {
        return e.apply(this, [Ms(t, {
            mechanism: {
                data: {
                    function: "requestAnimationFrame",
                    handler: li(e)
                },
                handled: !1,
                type: "instrument"
            }
        })])
    }
}

function PA(e) {
    return function(...t) {
        const n = this;
        return ["onload", "onerror", "onprogress", "onreadystatechange"].forEach(i => {
            i in n && typeof n[i] == "function" && Ke(n, i, function(o) {
                const s = {
                        mechanism: {
                            data: {
                                function: i,
                                handler: li(o)
                            },
                            handled: !1,
                            type: "instrument"
                        }
                    },
                    a = d0(o);
                return a && (s.mechanism.data.handler = li(a)), Ms(o, s)
            })
        }), e.apply(this, t)
    }
}

function CA(e) {
    const t = oe,
        n = t[e] && t[e].prototype;
    !n || !n.hasOwnProperty || !n.hasOwnProperty("addEventListener") || (Ke(n, "addEventListener", function(r) {
        return function(i, o, s) {
            try {
                typeof o.handleEvent == "function" && (o.handleEvent = Ms(o.handleEvent, {
                    mechanism: {
                        data: {
                            function: "handleEvent",
                            handler: li(o),
                            target: e
                        },
                        handled: !1,
                        type: "instrument"
                    }
                }))
            } catch {}
            return r.apply(this, [i, Ms(o, {
                mechanism: {
                    data: {
                        function: "addEventListener",
                        handler: li(o),
                        target: e
                    },
                    handled: !1,
                    type: "instrument"
                }
            }), s])
        }
    }), Ke(n, "removeEventListener", function(r) {
        return function(i, o, s) {
            const a = o;
            try {
                const u = a && a.__sentry_wrapped__;
                u && r.call(this, i, u, s)
            } catch {}
            return r.call(this, i, a, s)
        }
    }))
}
const RA = "GlobalHandlers",
    kA = (e = {}) => {
        const t = {
            onerror: !0,
            onunhandledrejection: !0,
            ...e
        };
        return {
            name: RA,
            setupOnce() {
                Error.stackTraceLimit = 50
            },
            setup(n) {
                t.onerror && (IA(n), d_("onerror")), t.onunhandledrejection && (LA(n), d_("onunhandledrejection"))
            }
        }
    },
    MA = kA;

function IA(e) {
    EM(t => {
        const {
            stackParser: n,
            attachStacktrace: r
        } = vx();
        if (at() !== e || hx()) return;
        const {
            msg: i,
            url: o,
            line: s,
            column: a,
            error: u
        } = t, l = DA(E0(n, u || i, void 0, r, !1), o, s, a);
        l.level = "error", nx(l, {
            originalException: u,
            mechanism: {
                handled: !1,
                type: "onerror"
            }
        })
    })
}

function LA(e) {
    wM(t => {
        const {
            stackParser: n,
            attachStacktrace: r
        } = vx();
        if (at() !== e || hx()) return;
        const i = AA(t),
            o = c0(i) ? NA(i) : E0(n, i, void 0, r, !0);
        o.level = "error", nx(o, {
            originalException: i,
            mechanism: {
                handled: !1,
                type: "onunhandledrejection"
            }
        })
    })
}

function AA(e) {
    if (c0(e)) return e;
    try {
        if ("reason" in e) return e.reason;
        if ("detail" in e && "reason" in e.detail) return e.detail.reason
    } catch {}
    return e
}

function NA(e) {
    return {
        exception: {
            values: [{
                type: "UnhandledRejection",
                value: `Non-Error promise rejection captured with value: ${String(e)}`
            }]
        }
    }
}

function DA(e, t, n, r) {
    const i = e.exception = e.exception || {},
        o = i.values = i.values || [],
        s = o[0] = o[0] || {},
        a = s.stacktrace = s.stacktrace || {},
        u = a.frames = a.frames || [],
        l = isNaN(parseInt(r, 10)) ? void 0 : r,
        c = isNaN(parseInt(n, 10)) ? void 0 : n,
        f = ri(t) && t.length > 0 ? t : eM();
    return u.length === 0 && u.push({
        colno: l,
        filename: f,
        function: zs,
        in_app: !0,
        lineno: c
    }), e
}

function d_(e) {
    Cn && X.log(`Global Handler attached: ${e}`)
}

function vx() {
    const e = at();
    return e && e.getOptions() || {
        stackParser: () => [],
        attachStacktrace: !1
    }
}
const FA = () => ({
        name: "HttpContext",
        preprocessEvent(e) {
            if (!oe.navigator && !oe.location && !oe.document) return;
            const t = e.request && e.request.url || oe.location && oe.location.href,
                {
                    referrer: n
                } = oe.document || {},
                {
                    userAgent: r
                } = oe.navigator || {},
                i = { ...e.request && e.request.headers,
                    ...n && {
                        Referer: n
                    },
                    ...r && {
                        "User-Agent": r
                    }
                },
                o = { ...e.request,
                    ...t && {
                        url: t
                    },
                    headers: i
                };
            e.request = o
        }
    }),
    $A = "cause",
    BA = 5,
    jA = "LinkedErrors",
    HA = (e = {}) => {
        const t = e.limit || BA,
            n = e.key || $A;
        return {
            name: jA,
            preprocessEvent(r, i, o) {
                const s = o.getOptions();
                K2(y0, s.stackParser, s.maxValueLength, n, t, r, i)
            }
        }
    },
    UA = HA;

function zA(e) {
    return [fL(), aL(), OA(), pA(), MA(), UA(), xL(), FA()]
}

function GA(e = {}) {
    return { ...{
            defaultIntegrations: zA(),
            release: typeof __SENTRY_RELEASE__ == "string" ? __SENTRY_RELEASE__ : oe.SENTRY_RELEASE && oe.SENTRY_RELEASE.id ? oe.SENTRY_RELEASE.id : void 0,
            autoSessionTracking: !0,
            sendClientReports: !0
        },
        ...e
    }
}

function VA() {
    const e = oe,
        t = e.chrome ? "chrome" : "browser",
        n = e[t],
        r = n && n.runtime && n.runtime.id,
        i = oe.location && oe.location.href || "",
        o = ["chrome-extension:", "moz-extension:", "ms-browser-extension:"],
        s = !!r && oe === oe.top && o.some(a => i.startsWith(`${a}//`));
    return !!r && !s
}

function WA(e = {}) {
    const t = GA(e);
    if (VA()) {
        Pu(() => {
            console.error("[Sentry] You cannot run Sentry this way in a browser extension, check: https://docs.sentry.io/platforms/javascript/best-practices/browser-extensions/")
        });
        return
    }
    Cn && (Ww() || X.warn("No Fetch API detected. The Sentry SDK requires a Fetch API compatible environment to send events. Please add a Fetch API polyfill."));
    const n = { ...t,
        stackParser: fM(t.stackParser || fA),
        integrations: XI(t),
        transport: t.transport || JL
    };
    eL(jL, n), t.autoSessionTracking && qA()
}

function p_(e = {}) {
    if (!oe.document) {
        Cn && X.error("Global document not defined in showReportDialog call");
        return
    }
    const t = wr(),
        n = t.getClient(),
        r = n && n.getDsn();
    if (!r) {
        Cn && X.error("DSN not configured for showReportDialog call");
        return
    }
    if (t && (e.user = { ...t.getUser(),
            ...e.user
        }), !e.eventId) {
        const a = HI();
        a && (e.eventId = a)
    }
    const i = oe.document.createElement("script");
    i.async = !0, i.crossOrigin = "anonymous", i.src = WI(r, e), e.onLoad && (i.onload = e.onLoad);
    const {
        onClose: o
    } = e;
    if (o) {
        const a = u => {
            if (u.data === "__sentry_reportdialog_closed__") try {
                o()
            } finally {
                oe.removeEventListener("message", a)
            }
        };
        oe.addEventListener("message", a)
    }
    const s = oe.document.head || oe.document.body;
    s ? s.appendChild(i) : Cn && X.error("Not injecting report dialog. No injection point found in HTML")
}

function qA() {
    if (typeof oe.document > "u") {
        Cn && X.warn("Session tracking in non-browser environment with @sentry/browser is not supported.");
        return
    }
    Jy({
        ignoreDuration: !0
    }), e_(), dx(({
        from: e,
        to: t
    }) => {
        e !== void 0 && e !== t && (Jy({
            ignoreDuration: !0
        }), e_())
    })
}

function jH(e) {
    const t = { ...e
    };
    lx(t, "react"), WA(t)
}

function XA(e) {
    const t = e.match(/^([^.]+)/);
    return t !== null && parseInt(t[0]) >= 17
}

function QA(e, t) {
    const n = new WeakSet;

    function r(i, o) {
        if (!n.has(i)) {
            if (i.cause) return n.add(i), r(i.cause, o);
            i.cause = o
        }
    }
    r(e, t)
}

function KA(e, {
    componentStack: t
}, n) {
    if (XA(L.version) && u0(e) && t) {
        const r = new Error(e.message);
        r.name = `React ErrorBoundary ${e.name}`, r.stack = t, QA(e, r)
    }
    return tx(e, { ...n,
        captureContext: {
            contexts: {
                react: {
                    componentStack: t
                }
            }
        }
    })
}
const YA = typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__,
    ZA = "unknown",
    m_ = {
        componentStack: null,
        error: null,
        eventId: null
    };
class S0 extends L.Component {
    constructor(t) {
        super(t), S0.prototype.__init.call(this), this.state = m_, this._openFallbackReportDialog = !0;
        const n = at();
        n && t.showDialog && (this._openFallbackReportDialog = !1, n.on("afterSendEvent", r => {
            !r.type && this._lastEventId && r.event_id === this._lastEventId && p_({ ...t.dialogOptions,
                eventId: this._lastEventId
            })
        }))
    }
    componentDidCatch(t, n) {
        const {
            componentStack: r
        } = n, i = r ? ? void 0, {
            beforeCapture: o,
            onError: s,
            showDialog: a,
            dialogOptions: u
        } = this.props;
        Zw(l => {
            o && o(l, t, i);
            const c = KA(t, n, {
                mechanism: {
                    handled: !!this.props.fallback
                }
            });
            s && s(t, i, c), a && (this._lastEventId = c, this._openFallbackReportDialog && p_({ ...u,
                eventId: c
            })), this.setState({
                error: t,
                componentStack: r,
                eventId: c
            })
        })
    }
    componentDidMount() {
        const {
            onMount: t
        } = this.props;
        t && t()
    }
    componentWillUnmount() {
        const {
            error: t,
            componentStack: n,
            eventId: r
        } = this.state, {
            onUnmount: i
        } = this.props;
        i && i(t, n, r)
    }
    __init() {
        this.resetErrorBoundary = () => {
            const {
                onReset: t
            } = this.props, {
                error: n,
                componentStack: r,
                eventId: i
            } = this.state;
            t && t(n, r, i), this.setState(m_)
        }
    }
    render() {
        const {
            fallback: t,
            children: n
        } = this.props, r = this.state;
        if (r.error) {
            let i;
            return typeof t == "function" ? i = L.createElement(t, {
                error: r.error,
                componentStack: r.componentStack,
                resetError: this.resetErrorBoundary,
                eventId: r.eventId
            }) : i = t, L.isValidElement(i) ? i : (t && YA && X.warn("fallback did not produce a valid ReactElement"), null)
        }
        return typeof n == "function" ? n() : n
    }
}

function HH(e, t) {
    const n = e.displayName || e.name || ZA,
        r = i => Q.jsx(S0, { ...t,
            children: Q.jsx(e, { ...i
            })
        });
    return r.displayName = `errorBoundary(${n})`, TR(r, e), r
}

function So(e, t, n) {
    let r = n.initialDeps ? ? [],
        i;

    function o() {
        var s, a, u, l;
        let c;
        n.key && ((s = n.debug) != null && s.call(n)) && (c = Date.now());
        const f = e();
        if (!(f.length !== r.length || f.some((y, m) => r[m] !== y))) return i;
        r = f;
        let p;
        if (n.key && ((a = n.debug) != null && a.call(n)) && (p = Date.now()), i = t(...f), n.key && ((u = n.debug) != null && u.call(n))) {
            const y = Math.round((Date.now() - c) * 100) / 100,
                m = Math.round((Date.now() - p) * 100) / 100,
                _ = m / 16,
                g = (d, v) => {
                    for (d = String(d); d.length < v;) d = " " + d;
                    return d
                };
            console.info(`%c⏱ ${g(m,5)} /${g(y,5)} ms`, `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0,Math.min(120-120*_,120))}deg 100% 31%);`, n == null ? void 0 : n.key)
        }
        return (l = n == null ? void 0 : n.onChange) == null || l.call(n, i), i
    }
    return o.updateDeps = s => {
        r = s
    }, o
}

function kh(e, t) {
    if (e === void 0) throw new Error(`Unexpected undefined${t?`: ${t}`:""}`);
    return e
}
const JA = (e, t) => Math.abs(e - t) < 1,
    eN = (e, t, n) => {
        let r;
        return function(...i) {
            e.clearTimeout(r), r = e.setTimeout(() => t.apply(this, i), n)
        }
    },
    tN = e => e,
    nN = e => {
        const t = Math.max(e.startIndex - e.overscan, 0),
            n = Math.min(e.endIndex + e.overscan, e.count - 1),
            r = [];
        for (let i = t; i <= n; i++) r.push(i);
        return r
    },
    rN = (e, t) => {
        const n = e.scrollElement;
        if (!n) return;
        const r = e.targetWindow;
        if (!r) return;
        const i = s => {
            const {
                width: a,
                height: u
            } = s;
            t({
                width: Math.round(a),
                height: Math.round(u)
            })
        };
        if (i(n.getBoundingClientRect()), !r.ResizeObserver) return () => {};
        const o = new r.ResizeObserver(s => {
            const a = () => {
                const u = s[0];
                if (u != null && u.borderBoxSize) {
                    const l = u.borderBoxSize[0];
                    if (l) {
                        i({
                            width: l.inlineSize,
                            height: l.blockSize
                        });
                        return
                    }
                }
                i(n.getBoundingClientRect())
            };
            e.options.useAnimationFrameWithResizeObserver ? requestAnimationFrame(a) : a()
        });
        return o.observe(n, {
            box: "border-box"
        }), () => {
            o.unobserve(n)
        }
    },
    v_ = {
        passive: !0
    },
    g_ = typeof window > "u" ? !0 : "onscrollend" in window,
    iN = (e, t) => {
        const n = e.scrollElement;
        if (!n) return;
        const r = e.targetWindow;
        if (!r) return;
        let i = 0;
        const o = e.options.useScrollendEvent && g_ ? () => {} : eN(r, () => {
                t(i, !1)
            }, e.options.isScrollingResetDelay),
            s = c => () => {
                const {
                    horizontal: f,
                    isRtl: h
                } = e.options;
                i = f ? n.scrollLeft * (h && -1 || 1) : n.scrollTop, o(), t(i, c)
            },
            a = s(!0),
            u = s(!1);
        u(), n.addEventListener("scroll", a, v_);
        const l = e.options.useScrollendEvent && g_;
        return l && n.addEventListener("scrollend", u, v_), () => {
            n.removeEventListener("scroll", a), l && n.removeEventListener("scrollend", u)
        }
    },
    oN = (e, t, n) => {
        if (t != null && t.borderBoxSize) {
            const r = t.borderBoxSize[0];
            if (r) return Math.round(r[n.options.horizontal ? "inlineSize" : "blockSize"])
        }
        return Math.round(e.getBoundingClientRect()[n.options.horizontal ? "width" : "height"])
    },
    sN = (e, {
        adjustments: t = 0,
        behavior: n
    }, r) => {
        var i, o;
        const s = e + t;
        (o = (i = r.scrollElement) == null ? void 0 : i.scrollTo) == null || o.call(i, {
            [r.options.horizontal ? "left" : "top"]: s,
            behavior: n
        })
    };
class aN {
    constructor(t) {
        this.unsubs = [], this.scrollElement = null, this.targetWindow = null, this.isScrolling = !1, this.scrollToIndexTimeoutId = null, this.measurementsCache = [], this.itemSizeCache = new Map, this.pendingMeasuredCacheIndexes = [], this.scrollRect = null, this.scrollOffset = null, this.scrollDirection = null, this.scrollAdjustments = 0, this.elementsCache = new Map, this.observer = (() => {
            let n = null;
            const r = () => n || (!this.targetWindow || !this.targetWindow.ResizeObserver ? null : n = new this.targetWindow.ResizeObserver(i => {
                i.forEach(o => {
                    const s = () => {
                        this._measureElement(o.target, o)
                    };
                    this.options.useAnimationFrameWithResizeObserver ? requestAnimationFrame(s) : s()
                })
            }));
            return {
                disconnect: () => {
                    var i;
                    (i = r()) == null || i.disconnect(), n = null
                },
                observe: i => {
                    var o;
                    return (o = r()) == null ? void 0 : o.observe(i, {
                        box: "border-box"
                    })
                },
                unobserve: i => {
                    var o;
                    return (o = r()) == null ? void 0 : o.unobserve(i)
                }
            }
        })(), this.range = null, this.setOptions = n => {
            Object.entries(n).forEach(([r, i]) => {
                typeof i > "u" && delete n[r]
            }), this.options = {
                debug: !1,
                initialOffset: 0,
                overscan: 1,
                paddingStart: 0,
                paddingEnd: 0,
                scrollPaddingStart: 0,
                scrollPaddingEnd: 0,
                horizontal: !1,
                getItemKey: tN,
                rangeExtractor: nN,
                onChange: () => {},
                measureElement: oN,
                initialRect: {
                    width: 0,
                    height: 0
                },
                scrollMargin: 0,
                gap: 0,
                indexAttribute: "data-index",
                initialMeasurementsCache: [],
                lanes: 1,
                isScrollingResetDelay: 150,
                enabled: !0,
                isRtl: !1,
                useScrollendEvent: !1,
                useAnimationFrameWithResizeObserver: !1,
                ...n
            }
        }, this.notify = n => {
            var r, i;
            (i = (r = this.options).onChange) == null || i.call(r, this, n)
        }, this.maybeNotify = So(() => (this.calculateRange(), [this.isScrolling, this.range ? this.range.startIndex : null, this.range ? this.range.endIndex : null]), n => {
            this.notify(n)
        }, {
            key: !1,
            debug: () => this.options.debug,
            initialDeps: [this.isScrolling, this.range ? this.range.startIndex : null, this.range ? this.range.endIndex : null]
        }), this.cleanup = () => {
            this.unsubs.filter(Boolean).forEach(n => n()), this.unsubs = [], this.observer.disconnect(), this.scrollElement = null, this.targetWindow = null
        }, this._didMount = () => () => {
            this.cleanup()
        }, this._willUpdate = () => {
            var n;
            const r = this.options.enabled ? this.options.getScrollElement() : null;
            if (this.scrollElement !== r) {
                if (this.cleanup(), !r) {
                    this.maybeNotify();
                    return
                }
                this.scrollElement = r, this.scrollElement && "ownerDocument" in this.scrollElement ? this.targetWindow = this.scrollElement.ownerDocument.defaultView : this.targetWindow = ((n = this.scrollElement) == null ? void 0 : n.window) ? ? null, this.elementsCache.forEach(i => {
                    this.observer.observe(i)
                }), this._scrollToOffset(this.getScrollOffset(), {
                    adjustments: void 0,
                    behavior: void 0
                }), this.unsubs.push(this.options.observeElementRect(this, i => {
                    this.scrollRect = i, this.maybeNotify()
                })), this.unsubs.push(this.options.observeElementOffset(this, (i, o) => {
                    this.scrollAdjustments = 0, this.scrollDirection = o ? this.getScrollOffset() < i ? "forward" : "backward" : null, this.scrollOffset = i, this.isScrolling = o, this.maybeNotify()
                }))
            }
        }, this.getSize = () => this.options.enabled ? (this.scrollRect = this.scrollRect ? ? this.options.initialRect, this.scrollRect[this.options.horizontal ? "width" : "height"]) : (this.scrollRect = null, 0), this.getScrollOffset = () => this.options.enabled ? (this.scrollOffset = this.scrollOffset ? ? (typeof this.options.initialOffset == "function" ? this.options.initialOffset() : this.options.initialOffset), this.scrollOffset) : (this.scrollOffset = null, 0), this.getFurthestMeasurement = (n, r) => {
            const i = new Map,
                o = new Map;
            for (let s = r - 1; s >= 0; s--) {
                const a = n[s];
                if (i.has(a.lane)) continue;
                const u = o.get(a.lane);
                if (u == null || a.end > u.end ? o.set(a.lane, a) : a.end < u.end && i.set(a.lane, !0), i.size === this.options.lanes) break
            }
            return o.size === this.options.lanes ? Array.from(o.values()).sort((s, a) => s.end === a.end ? s.index - a.index : s.end - a.end)[0] : void 0
        }, this.getMeasurementOptions = So(() => [this.options.count, this.options.paddingStart, this.options.scrollMargin, this.options.getItemKey, this.options.enabled], (n, r, i, o, s) => (this.pendingMeasuredCacheIndexes = [], {
            count: n,
            paddingStart: r,
            scrollMargin: i,
            getItemKey: o,
            enabled: s
        }), {
            key: !1
        }), this.getMeasurements = So(() => [this.getMeasurementOptions(), this.itemSizeCache], ({
            count: n,
            paddingStart: r,
            scrollMargin: i,
            getItemKey: o,
            enabled: s
        }, a) => {
            if (!s) return this.measurementsCache = [], this.itemSizeCache.clear(), [];
            this.measurementsCache.length === 0 && (this.measurementsCache = this.options.initialMeasurementsCache, this.measurementsCache.forEach(c => {
                this.itemSizeCache.set(c.key, c.size)
            }));
            const u = this.pendingMeasuredCacheIndexes.length > 0 ? Math.min(...this.pendingMeasuredCacheIndexes) : 0;
            this.pendingMeasuredCacheIndexes = [];
            const l = this.measurementsCache.slice(0, u);
            for (let c = u; c < n; c++) {
                const f = o(c),
                    h = this.options.lanes === 1 ? l[c - 1] : this.getFurthestMeasurement(l, c),
                    p = h ? h.end + this.options.gap : r + i,
                    y = a.get(f),
                    m = typeof y == "number" ? y : this.options.estimateSize(c),
                    _ = p + m,
                    g = h ? h.lane : c % this.options.lanes;
                l[c] = {
                    index: c,
                    start: p,
                    size: m,
                    end: _,
                    key: f,
                    lane: g
                }
            }
            return this.measurementsCache = l, l
        }, {
            key: !1,
            debug: () => this.options.debug
        }), this.calculateRange = So(() => [this.getMeasurements(), this.getSize(), this.getScrollOffset(), this.options.lanes], (n, r, i, o) => this.range = n.length > 0 && r > 0 ? uN({
            measurements: n,
            outerSize: r,
            scrollOffset: i,
            lanes: o
        }) : null, {
            key: !1,
            debug: () => this.options.debug
        }), this.getVirtualIndexes = So(() => {
            let n = null,
                r = null;
            const i = this.calculateRange();
            return i && (n = i.startIndex, r = i.endIndex), this.maybeNotify.updateDeps([this.isScrolling, n, r]), [this.options.rangeExtractor, this.options.overscan, this.options.count, n, r]
        }, (n, r, i, o, s) => o === null || s === null ? [] : n({
            startIndex: o,
            endIndex: s,
            overscan: r,
            count: i
        }), {
            key: !1,
            debug: () => this.options.debug
        }), this.indexFromElement = n => {
            const r = this.options.indexAttribute,
                i = n.getAttribute(r);
            return i ? parseInt(i, 10) : (console.warn(`Missing attribute name '${r}={index}' on measured element.`), -1)
        }, this._measureElement = (n, r) => {
            const i = this.indexFromElement(n),
                o = this.measurementsCache[i];
            if (!o) return;
            const s = o.key,
                a = this.elementsCache.get(s);
            a !== n && (a && this.observer.unobserve(a), this.observer.observe(n), this.elementsCache.set(s, n)), n.isConnected && this.resizeItem(i, this.options.measureElement(n, r, this))
        }, this.resizeItem = (n, r) => {
            const i = this.measurementsCache[n];
            if (!i) return;
            const o = this.itemSizeCache.get(i.key) ? ? i.size,
                s = r - o;
            s !== 0 && ((this.shouldAdjustScrollPositionOnItemSizeChange !== void 0 ? this.shouldAdjustScrollPositionOnItemSizeChange(i, s, this) : i.start < this.getScrollOffset() + this.scrollAdjustments) && this._scrollToOffset(this.getScrollOffset(), {
                adjustments: this.scrollAdjustments += s,
                behavior: void 0
            }), this.pendingMeasuredCacheIndexes.push(i.index), this.itemSizeCache = new Map(this.itemSizeCache.set(i.key, r)), this.notify(!1))
        }, this.measureElement = n => {
            if (!n) {
                this.elementsCache.forEach((r, i) => {
                    r.isConnected || (this.observer.unobserve(r), this.elementsCache.delete(i))
                });
                return
            }
            this._measureElement(n, void 0)
        }, this.getVirtualItems = So(() => [this.getVirtualIndexes(), this.getMeasurements()], (n, r) => {
            const i = [];
            for (let o = 0, s = n.length; o < s; o++) {
                const a = n[o],
                    u = r[a];
                i.push(u)
            }
            return i
        }, {
            key: !1,
            debug: () => this.options.debug
        }), this.getVirtualItemForOffset = n => {
            const r = this.getMeasurements();
            if (r.length !== 0) return kh(r[gx(0, r.length - 1, i => kh(r[i]).start, n)])
        }, this.getOffsetForAlignment = (n, r, i = 0) => {
            const o = this.getSize(),
                s = this.getScrollOffset();
            r === "auto" && (r = n >= s + o ? "end" : "start"), r === "center" ? n += (i - o) / 2 : r === "end" && (n -= o);
            const a = this.options.horizontal ? "scrollWidth" : "scrollHeight",
                l = (this.scrollElement ? "document" in this.scrollElement ? this.scrollElement.document.documentElement[a] : this.scrollElement[a] : 0) - o;
            return Math.max(Math.min(l, n), 0)
        }, this.getOffsetForIndex = (n, r = "auto") => {
            n = Math.max(0, Math.min(n, this.options.count - 1));
            const i = this.measurementsCache[n];
            if (!i) return;
            const o = this.getSize(),
                s = this.getScrollOffset();
            if (r === "auto")
                if (i.end >= s + o - this.options.scrollPaddingEnd) r = "end";
                else if (i.start <= s + this.options.scrollPaddingStart) r = "start";
            else return [s, r];
            const a = r === "end" ? i.end + this.options.scrollPaddingEnd : i.start - this.options.scrollPaddingStart;
            return [this.getOffsetForAlignment(a, r, i.size), r]
        }, this.isDynamicMode = () => this.elementsCache.size > 0, this.cancelScrollToIndex = () => {
            this.scrollToIndexTimeoutId !== null && this.targetWindow && (this.targetWindow.clearTimeout(this.scrollToIndexTimeoutId), this.scrollToIndexTimeoutId = null)
        }, this.scrollToOffset = (n, {
            align: r = "start",
            behavior: i
        } = {}) => {
            this.cancelScrollToIndex(), i === "smooth" && this.isDynamicMode() && console.warn("The `smooth` scroll behavior is not fully supported with dynamic size."), this._scrollToOffset(this.getOffsetForAlignment(n, r), {
                adjustments: void 0,
                behavior: i
            })
        }, this.scrollToIndex = (n, {
            align: r = "auto",
            behavior: i
        } = {}) => {
            n = Math.max(0, Math.min(n, this.options.count - 1)), this.cancelScrollToIndex(), i === "smooth" && this.isDynamicMode() && console.warn("The `smooth` scroll behavior is not fully supported with dynamic size.");
            const o = this.getOffsetForIndex(n, r);
            if (!o) return;
            const [s, a] = o;
            this._scrollToOffset(s, {
                adjustments: void 0,
                behavior: i
            }), i !== "smooth" && this.isDynamicMode() && this.targetWindow && (this.scrollToIndexTimeoutId = this.targetWindow.setTimeout(() => {
                if (this.scrollToIndexTimeoutId = null, this.elementsCache.has(this.options.getItemKey(n))) {
                    const [l] = kh(this.getOffsetForIndex(n, a));
                    JA(l, this.getScrollOffset()) || this.scrollToIndex(n, {
                        align: a,
                        behavior: i
                    })
                } else this.scrollToIndex(n, {
                    align: a,
                    behavior: i
                })
            }))
        }, this.scrollBy = (n, {
            behavior: r
        } = {}) => {
            this.cancelScrollToIndex(), r === "smooth" && this.isDynamicMode() && console.warn("The `smooth` scroll behavior is not fully supported with dynamic size."), this._scrollToOffset(this.getScrollOffset() + n, {
                adjustments: void 0,
                behavior: r
            })
        }, this.getTotalSize = () => {
            var n;
            const r = this.getMeasurements();
            let i;
            if (r.length === 0) i = this.options.paddingStart;
            else if (this.options.lanes === 1) i = ((n = r[r.length - 1]) == null ? void 0 : n.end) ? ? 0;
            else {
                const o = Array(this.options.lanes).fill(null);
                let s = r.length - 1;
                for (; s >= 0 && o.some(a => a === null);) {
                    const a = r[s];
                    o[a.lane] === null && (o[a.lane] = a.end), s--
                }
                i = Math.max(...o.filter(a => a !== null))
            }
            return Math.max(i - this.options.scrollMargin + this.options.paddingEnd, 0)
        }, this._scrollToOffset = (n, {
            adjustments: r,
            behavior: i
        }) => {
            this.options.scrollToFn(n, {
                behavior: i,
                adjustments: r
            }, this)
        }, this.measure = () => {
            this.itemSizeCache = new Map, this.notify(!1)
        }, this.setOptions(t)
    }
}
const gx = (e, t, n, r) => {
    for (; e <= t;) {
        const i = (e + t) / 2 | 0,
            o = n(i);
        if (o < r) e = i + 1;
        else if (o > r) t = i - 1;
        else return i
    }
    return e > 0 ? e - 1 : 0
};

function uN({
    measurements: e,
    outerSize: t,
    scrollOffset: n,
    lanes: r
}) {
    const i = e.length - 1,
        o = u => e[u].start;
    if (e.length <= r) return {
        startIndex: 0,
        endIndex: i
    };
    let s = gx(0, i, o, n),
        a = s;
    if (r === 1)
        for (; a < i && e[a].end < n + t;) a++;
    else if (r > 1) {
        const u = Array(r).fill(0);
        for (; a < i && u.some(c => c < n + t);) {
            const c = e[a];
            u[c.lane] = c.end, a++
        }
        const l = Array(r).fill(n + t);
        for (; s >= 0 && l.some(c => c >= n);) {
            const c = e[s];
            l[c.lane] = c.start, s--
        }
        s = Math.max(0, s - s % r), a = Math.min(i, a + (r - 1 - a % r))
    }
    return {
        startIndex: s,
        endIndex: a
    }
}
const y_ = typeof document < "u" ? L.useLayoutEffect : L.useEffect;

function lN(e) {
    const t = L.useReducer(() => ({}), {})[1],
        n = { ...e,
            onChange: (i, o) => {
                var s;
                o ? Bm.flushSync(t) : t(), (s = e.onChange) == null || s.call(e, i, o)
            }
        },
        [r] = L.useState(() => new aN(n));
    return r.setOptions(n), y_(() => r._didMount(), []), y_(() => r._willUpdate()), r
}

function UH(e) {
    return lN({
        observeElementRect: rN,
        observeElementOffset: iN,
        scrollToFn: sN,
        ...e
    })
}
var w0 = {},
    hf = {},
    Nt = {};
Object.defineProperty(Nt, "__esModule", {
    value: !0
});

function cN(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}
var fN = function e(t, n) {
    cN(this, e), this.data = t, this.text = n.text || t, this.options = n
};
Nt.default = fN;
Object.defineProperty(hf, "__esModule", {
    value: !0
});
hf.CODE39 = void 0;
var hN = function() {
        function e(t, n) {
            for (var r = 0; r < n.length; r++) {
                var i = n[r];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
            }
        }
        return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
        }
    }(),
    dN = Nt,
    pN = mN(dN);

function mN(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}

function vN(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function gN(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t && (typeof t == "object" || typeof t == "function") ? t : e
}

function yN(e, t) {
    if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var _N = function(e) {
        yN(t, e);

        function t(n, r) {
            return vN(this, t), n = n.toUpperCase(), r.mod43 && (n += wN(xN(n))), gN(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, n, r))
        }
        return hN(t, [{
            key: "encode",
            value: function() {
                for (var r = Mh("*"), i = 0; i < this.data.length; i++) r += Mh(this.data[i]) + "0";
                return r += Mh("*"), {
                    data: r,
                    text: this.text
                }
            }
        }, {
            key: "valid",
            value: function() {
                return this.data.search(/^[0-9A-Z\-\.\ \$\/\+\%]+$/) !== -1
            }
        }]), t
    }(pN.default),
    yx = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "-", ".", " ", "$", "/", "+", "%", "*"],
    EN = [20957, 29783, 23639, 30485, 20951, 29813, 23669, 20855, 29789, 23645, 29975, 23831, 30533, 22295, 30149, 24005, 21623, 29981, 23837, 22301, 30023, 23879, 30545, 22343, 30161, 24017, 21959, 30065, 23921, 22385, 29015, 18263, 29141, 17879, 29045, 18293, 17783, 29021, 18269, 17477, 17489, 17681, 20753, 35770];

function Mh(e) {
    return SN(_x(e))
}

function SN(e) {
    return EN[e].toString(2)
}

function wN(e) {
    return yx[e]
}

function _x(e) {
    return yx.indexOf(e)
}

function xN(e) {
    for (var t = 0, n = 0; n < e.length; n++) t += _x(e[n]);
    return t = t % 43, t
}
hf.CODE39 = _N;
var Xn = {},
    x0 = {},
    Gs = {},
    Ee = {};
Object.defineProperty(Ee, "__esModule", {
    value: !0
});
var ia;

function Ih(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e
}
var Ex = Ee.SET_A = 0,
    Sx = Ee.SET_B = 1,
    wx = Ee.SET_C = 2;
Ee.SHIFT = 98;
var TN = Ee.START_A = 103,
    ON = Ee.START_B = 104,
    bN = Ee.START_C = 105;
Ee.MODULO = 103;
Ee.STOP = 106;
Ee.FNC1 = 207;
Ee.SET_BY_CODE = (ia = {}, Ih(ia, TN, Ex), Ih(ia, ON, Sx), Ih(ia, bN, wx), ia);
Ee.SWAP = {
    101: Ex,
    100: Sx,
    99: wx
};
Ee.A_START_CHAR = "Ð";
Ee.B_START_CHAR = "Ñ";
Ee.C_START_CHAR = "Ò";
Ee.A_CHARS = "[\0-_È-Ï]";
Ee.B_CHARS = "[ -È-Ï]";
Ee.C_CHARS = "(Ï*[0-9]{2}Ï*)";
Ee.BARS = [11011001100, 11001101100, 11001100110, 10010011e3, 10010001100, 10001001100, 10011001e3, 10011000100, 10001100100, 11001001e3, 11001000100, 11000100100, 10110011100, 10011011100, 10011001110, 10111001100, 10011101100, 10011100110, 11001110010, 11001011100, 11001001110, 11011100100, 11001110100, 11101101110, 11101001100, 11100101100, 11100100110, 11101100100, 11100110100, 11100110010, 11011011e3, 11011000110, 11000110110, 10100011e3, 10001011e3, 10001000110, 10110001e3, 10001101e3, 10001100010, 11010001e3, 11000101e3, 11000100010, 10110111e3, 10110001110, 10001101110, 10111011e3, 10111000110, 10001110110, 11101110110, 11010001110, 11000101110, 11011101e3, 11011100010, 11011101110, 11101011e3, 11101000110, 11100010110, 11101101e3, 11101100010, 11100011010, 11101111010, 11001000010, 11110001010, 1010011e4, 10100001100, 1001011e4, 10010000110, 10000101100, 10000100110, 1011001e4, 10110000100, 1001101e4, 10011000010, 10000110100, 10000110010, 11000010010, 1100101e4, 11110111010, 11000010100, 10001111010, 10100111100, 10010111100, 10010011110, 10111100100, 10011110100, 10011110010, 11110100100, 11110010100, 11110010010, 11011011110, 11011110110, 11110110110, 10101111e3, 10100011110, 10001011110, 10111101e3, 10111100010, 11110101e3, 11110100010, 10111011110, 10111101110, 11101011110, 11110101110, 11010000100, 1101001e4, 11010011100, 1100011101011];
Object.defineProperty(Gs, "__esModule", {
    value: !0
});
var PN = function() {
        function e(t, n) {
            for (var r = 0; r < n.length; r++) {
                var i = n[r];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
            }
        }
        return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
        }
    }(),
    CN = Nt,
    RN = kN(CN),
    Ft = Ee;

function kN(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}

function MN(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function IN(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t && (typeof t == "object" || typeof t == "function") ? t : e
}

function LN(e, t) {
    if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var AN = function(e) {
    LN(t, e);

    function t(n, r) {
        MN(this, t);
        var i = IN(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, n.substring(1), r));
        return i.bytes = n.split("").map(function(o) {
            return o.charCodeAt(0)
        }), i
    }
    return PN(t, [{
        key: "valid",
        value: function() {
            return /^[\x00-\x7F\xC8-\xD3]+$/.test(this.data)
        }
    }, {
        key: "encode",
        value: function() {
            var r = this.bytes,
                i = r.shift() - 105,
                o = Ft.SET_BY_CODE[i];
            if (o === void 0) throw new RangeError("The encoding does not start with a start character.");
            this.shouldEncodeAsEan128() === !0 && r.unshift(Ft.FNC1);
            var s = t.next(r, 1, o);
            return {
                text: this.text === this.data ? this.text.replace(/[^\x20-\x7E]/g, "") : this.text,
                data: t.getBar(i) + s.result + t.getBar((s.checksum + i) % Ft.MODULO) + t.getBar(Ft.STOP)
            }
        }
    }, {
        key: "shouldEncodeAsEan128",
        value: function() {
            var r = this.options.ean128 || !1;
            return typeof r == "string" && (r = r.toLowerCase() === "true"), r
        }
    }], [{
        key: "getBar",
        value: function(r) {
            return Ft.BARS[r] ? Ft.BARS[r].toString() : ""
        }
    }, {
        key: "correctIndex",
        value: function(r, i) {
            if (i === Ft.SET_A) {
                var o = r.shift();
                return o < 32 ? o + 64 : o - 32
            } else return i === Ft.SET_B ? r.shift() - 32 : (r.shift() - 48) * 10 + r.shift() - 48
        }
    }, {
        key: "next",
        value: function(r, i, o) {
            if (!r.length) return {
                result: "",
                checksum: 0
            };
            var s = void 0,
                a = void 0;
            if (r[0] >= 200) {
                a = r.shift() - 105;
                var u = Ft.SWAP[a];
                u !== void 0 ? s = t.next(r, i + 1, u) : ((o === Ft.SET_A || o === Ft.SET_B) && a === Ft.SHIFT && (r[0] = o === Ft.SET_A ? r[0] > 95 ? r[0] - 96 : r[0] : r[0] < 32 ? r[0] + 96 : r[0]), s = t.next(r, i + 1, o))
            } else a = t.correctIndex(r, o), s = t.next(r, i + 1, o);
            var l = t.getBar(a),
                c = a * i;
            return {
                result: l + s.result,
                checksum: c + s.checksum
            }
        }
    }]), t
}(RN.default);
Gs.default = AN;
var T0 = {};
Object.defineProperty(T0, "__esModule", {
    value: !0
});
var ii = Ee,
    xx = function(t) {
        return t.match(new RegExp("^" + ii.A_CHARS + "*"))[0].length
    },
    Tx = function(t) {
        return t.match(new RegExp("^" + ii.B_CHARS + "*"))[0].length
    },
    Ox = function(t) {
        return t.match(new RegExp("^" + ii.C_CHARS + "*"))[0]
    };

function O0(e, t) {
    var n = t ? ii.A_CHARS : ii.B_CHARS,
        r = e.match(new RegExp("^(" + n + "+?)(([0-9]{2}){2,})([^0-9]|$)"));
    if (r) return r[1] + "Ì" + bx(e.substring(r[1].length));
    var i = e.match(new RegExp("^" + n + "+"))[0];
    return i.length === e.length ? e : i + String.fromCharCode(t ? 205 : 206) + O0(e.substring(i.length), !t)
}

function bx(e) {
    var t = Ox(e),
        n = t.length;
    if (n === e.length) return e;
    e = e.substring(n);
    var r = xx(e) >= Tx(e);
    return t + String.fromCharCode(r ? 206 : 205) + O0(e, r)
}
T0.default = function(e) {
    var t = void 0,
        n = Ox(e).length;
    if (n >= 2) t = ii.C_START_CHAR + bx(e);
    else {
        var r = xx(e) > Tx(e);
        t = (r ? ii.A_START_CHAR : ii.B_START_CHAR) + O0(e, r)
    }
    return t.replace(/[\xCD\xCE]([^])[\xCD\xCE]/, function(i, o) {
        return "Ë" + o
    })
};
Object.defineProperty(x0, "__esModule", {
    value: !0
});
var NN = Gs,
    DN = Px(NN),
    FN = T0,
    $N = Px(FN);

function Px(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}

function BN(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function Lh(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t && (typeof t == "object" || typeof t == "function") ? t : e
}

function jN(e, t) {
    if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var HN = function(e) {
    jN(t, e);

    function t(n, r) {
        if (BN(this, t), /^[\x00-\x7F\xC8-\xD3]+$/.test(n)) var i = Lh(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, (0, $N.default)(n), r));
        else var i = Lh(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, n, r));
        return Lh(i)
    }
    return t
}(DN.default);
x0.default = HN;
var b0 = {};
Object.defineProperty(b0, "__esModule", {
    value: !0
});
var UN = function() {
        function e(t, n) {
            for (var r = 0; r < n.length; r++) {
                var i = n[r];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
            }
        }
        return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
        }
    }(),
    zN = Gs,
    GN = VN(zN),
    __ = Ee;

function VN(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}

function WN(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function qN(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t && (typeof t == "object" || typeof t == "function") ? t : e
}

function XN(e, t) {
    if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var QN = function(e) {
    XN(t, e);

    function t(n, r) {
        return WN(this, t), qN(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, __.A_START_CHAR + n, r))
    }
    return UN(t, [{
        key: "valid",
        value: function() {
            return new RegExp("^" + __.A_CHARS + "+$").test(this.data)
        }
    }]), t
}(GN.default);
b0.default = QN;
var P0 = {};
Object.defineProperty(P0, "__esModule", {
    value: !0
});
var KN = function() {
        function e(t, n) {
            for (var r = 0; r < n.length; r++) {
                var i = n[r];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
            }
        }
        return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
        }
    }(),
    YN = Gs,
    ZN = JN(YN),
    E_ = Ee;

function JN(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}

function eD(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function tD(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t && (typeof t == "object" || typeof t == "function") ? t : e
}

function nD(e, t) {
    if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var rD = function(e) {
    nD(t, e);

    function t(n, r) {
        return eD(this, t), tD(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, E_.B_START_CHAR + n, r))
    }
    return KN(t, [{
        key: "valid",
        value: function() {
            return new RegExp("^" + E_.B_CHARS + "+$").test(this.data)
        }
    }]), t
}(ZN.default);
P0.default = rD;
var C0 = {};
Object.defineProperty(C0, "__esModule", {
    value: !0
});
var iD = function() {
        function e(t, n) {
            for (var r = 0; r < n.length; r++) {
                var i = n[r];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
            }
        }
        return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
        }
    }(),
    oD = Gs,
    sD = aD(oD),
    S_ = Ee;

function aD(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}

function uD(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function lD(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t && (typeof t == "object" || typeof t == "function") ? t : e
}

function cD(e, t) {
    if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var fD = function(e) {
    cD(t, e);

    function t(n, r) {
        return uD(this, t), lD(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, S_.C_START_CHAR + n, r))
    }
    return iD(t, [{
        key: "valid",
        value: function() {
            return new RegExp("^" + S_.C_CHARS + "+$").test(this.data)
        }
    }]), t
}(sD.default);
C0.default = fD;
Object.defineProperty(Xn, "__esModule", {
    value: !0
});
Xn.CODE128C = Xn.CODE128B = Xn.CODE128A = Xn.CODE128 = void 0;
var hD = x0,
    dD = df(hD),
    pD = b0,
    mD = df(pD),
    vD = P0,
    gD = df(vD),
    yD = C0,
    _D = df(yD);

function df(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}
Xn.CODE128 = dD.default;
Xn.CODE128A = mD.default;
Xn.CODE128B = gD.default;
Xn.CODE128C = _D.default;
var xt = {},
    R0 = {},
    Sn = {};
Object.defineProperty(Sn, "__esModule", {
    value: !0
});
Sn.SIDE_BIN = "101";
Sn.MIDDLE_BIN = "01010";
Sn.BINARIES = {
    L: ["0001101", "0011001", "0010011", "0111101", "0100011", "0110001", "0101111", "0111011", "0110111", "0001011"],
    G: ["0100111", "0110011", "0011011", "0100001", "0011101", "0111001", "0000101", "0010001", "0001001", "0010111"],
    R: ["1110010", "1100110", "1101100", "1000010", "1011100", "1001110", "1010000", "1000100", "1001000", "1110100"],
    O: ["0001101", "0011001", "0010011", "0111101", "0100011", "0110001", "0101111", "0111011", "0110111", "0001011"],
    E: ["0100111", "0110011", "0011011", "0100001", "0011101", "0111001", "0000101", "0010001", "0001001", "0010111"]
};
Sn.EAN2_STRUCTURE = ["LL", "LG", "GL", "GG"];
Sn.EAN5_STRUCTURE = ["GGLLL", "GLGLL", "GLLGL", "GLLLG", "LGGLL", "LLGGL", "LLLGG", "LGLGL", "LGLLG", "LLGLG"];
Sn.EAN13_STRUCTURE = ["LLLLLL", "LLGLGG", "LLGGLG", "LLGGGL", "LGLLGG", "LGGLLG", "LGGGLL", "LGLGLG", "LGLGGL", "LGGLGL"];
var pf = {},
    mo = {};
Object.defineProperty(mo, "__esModule", {
    value: !0
});
var ED = Sn,
    SD = function(t, n, r) {
        var i = t.split("").map(function(s, a) {
            return ED.BINARIES[n[a]]
        }).map(function(s, a) {
            return s ? s[t[a]] : ""
        });
        if (r) {
            var o = t.length - 1;
            i = i.map(function(s, a) {
                return a < o ? s + r : s
            })
        }
        return i.join("")
    };
mo.default = SD;
Object.defineProperty(pf, "__esModule", {
    value: !0
});
var wD = function() {
        function e(t, n) {
            for (var r = 0; r < n.length; r++) {
                var i = n[r];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
            }
        }
        return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
        }
    }(),
    wo = Sn,
    xD = mo,
    w_ = Cx(xD),
    TD = Nt,
    OD = Cx(TD);

function Cx(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}

function bD(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function PD(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t && (typeof t == "object" || typeof t == "function") ? t : e
}

function CD(e, t) {
    if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var RD = function(e) {
    CD(t, e);

    function t(n, r) {
        bD(this, t);
        var i = PD(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, n, r));
        return i.fontSize = !r.flat && r.fontSize > r.width * 10 ? r.width * 10 : r.fontSize, i.guardHeight = r.height + i.fontSize / 2 + r.textMargin, i
    }
    return wD(t, [{
        key: "encode",
        value: function() {
            return this.options.flat ? this.encodeFlat() : this.encodeGuarded()
        }
    }, {
        key: "leftText",
        value: function(r, i) {
            return this.text.substr(r, i)
        }
    }, {
        key: "leftEncode",
        value: function(r, i) {
            return (0, w_.default)(r, i)
        }
    }, {
        key: "rightText",
        value: function(r, i) {
            return this.text.substr(r, i)
        }
    }, {
        key: "rightEncode",
        value: function(r, i) {
            return (0, w_.default)(r, i)
        }
    }, {
        key: "encodeGuarded",
        value: function() {
            var r = {
                    fontSize: this.fontSize
                },
                i = {
                    height: this.guardHeight
                };
            return [{
                data: wo.SIDE_BIN,
                options: i
            }, {
                data: this.leftEncode(),
                text: this.leftText(),
                options: r
            }, {
                data: wo.MIDDLE_BIN,
                options: i
            }, {
                data: this.rightEncode(),
                text: this.rightText(),
                options: r
            }, {
                data: wo.SIDE_BIN,
                options: i
            }]
        }
    }, {
        key: "encodeFlat",
        value: function() {
            var r = [wo.SIDE_BIN, this.leftEncode(), wo.MIDDLE_BIN, this.rightEncode(), wo.SIDE_BIN];
            return {
                data: r.join(""),
                text: this.text
            }
        }
    }]), t
}(OD.default);
pf.default = RD;
Object.defineProperty(R0, "__esModule", {
    value: !0
});
var kD = function() {
        function e(t, n) {
            for (var r = 0; r < n.length; r++) {
                var i = n[r];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
            }
        }
        return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
        }
    }(),
    oa = function e(t, n, r) {
        t === null && (t = Function.prototype);
        var i = Object.getOwnPropertyDescriptor(t, n);
        if (i === void 0) {
            var o = Object.getPrototypeOf(t);
            return o === null ? void 0 : e(o, n, r)
        } else {
            if ("value" in i) return i.value;
            var s = i.get;
            return s === void 0 ? void 0 : s.call(r)
        }
    },
    MD = Sn,
    ID = pf,
    LD = AD(ID);

function AD(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}

function ND(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function DD(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t && (typeof t == "object" || typeof t == "function") ? t : e
}

function FD(e, t) {
    if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var x_ = function(t) {
        var n = t.substr(0, 12).split("").map(function(r) {
            return +r
        }).reduce(function(r, i, o) {
            return o % 2 ? r + i * 3 : r + i
        }, 0);
        return (10 - n % 10) % 10
    },
    $D = function(e) {
        FD(t, e);

        function t(n, r) {
            ND(this, t), n.search(/^[0-9]{12}$/) !== -1 && (n += x_(n));
            var i = DD(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, n, r));
            return i.lastChar = r.lastChar, i
        }
        return kD(t, [{
            key: "valid",
            value: function() {
                return this.data.search(/^[0-9]{13}$/) !== -1 && +this.data[12] === x_(this.data)
            }
        }, {
            key: "leftText",
            value: function() {
                return oa(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "leftText", this).call(this, 1, 6)
            }
        }, {
            key: "leftEncode",
            value: function() {
                var r = this.data.substr(1, 6),
                    i = MD.EAN13_STRUCTURE[this.data[0]];
                return oa(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "leftEncode", this).call(this, r, i)
            }
        }, {
            key: "rightText",
            value: function() {
                return oa(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "rightText", this).call(this, 7, 6)
            }
        }, {
            key: "rightEncode",
            value: function() {
                var r = this.data.substr(7, 6);
                return oa(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "rightEncode", this).call(this, r, "RRRRRR")
            }
        }, {
            key: "encodeGuarded",
            value: function() {
                var r = oa(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "encodeGuarded", this).call(this);
                return this.options.displayValue && (r.unshift({
                    data: "000000000000",
                    text: this.text.substr(0, 1),
                    options: {
                        textAlign: "left",
                        fontSize: this.fontSize
                    }
                }), this.options.lastChar && (r.push({
                    data: "00"
                }), r.push({
                    data: "00000",
                    text: this.options.lastChar,
                    options: {
                        fontSize: this.fontSize
                    }
                }))), r
            }
        }]), t
    }(LD.default);
R0.default = $D;
var k0 = {};
Object.defineProperty(k0, "__esModule", {
    value: !0
});
var BD = function() {
        function e(t, n) {
            for (var r = 0; r < n.length; r++) {
                var i = n[r];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
            }
        }
        return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
        }
    }(),
    ll = function e(t, n, r) {
        t === null && (t = Function.prototype);
        var i = Object.getOwnPropertyDescriptor(t, n);
        if (i === void 0) {
            var o = Object.getPrototypeOf(t);
            return o === null ? void 0 : e(o, n, r)
        } else {
            if ("value" in i) return i.value;
            var s = i.get;
            return s === void 0 ? void 0 : s.call(r)
        }
    },
    jD = pf,
    HD = UD(jD);

function UD(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}

function zD(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function GD(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t && (typeof t == "object" || typeof t == "function") ? t : e
}

function VD(e, t) {
    if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var T_ = function(t) {
        var n = t.substr(0, 7).split("").map(function(r) {
            return +r
        }).reduce(function(r, i, o) {
            return o % 2 ? r + i : r + i * 3
        }, 0);
        return (10 - n % 10) % 10
    },
    WD = function(e) {
        VD(t, e);

        function t(n, r) {
            return zD(this, t), n.search(/^[0-9]{7}$/) !== -1 && (n += T_(n)), GD(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, n, r))
        }
        return BD(t, [{
            key: "valid",
            value: function() {
                return this.data.search(/^[0-9]{8}$/) !== -1 && +this.data[7] === T_(this.data)
            }
        }, {
            key: "leftText",
            value: function() {
                return ll(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "leftText", this).call(this, 0, 4)
            }
        }, {
            key: "leftEncode",
            value: function() {
                var r = this.data.substr(0, 4);
                return ll(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "leftEncode", this).call(this, r, "LLLL")
            }
        }, {
            key: "rightText",
            value: function() {
                return ll(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "rightText", this).call(this, 4, 4)
            }
        }, {
            key: "rightEncode",
            value: function() {
                var r = this.data.substr(4, 4);
                return ll(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "rightEncode", this).call(this, r, "RRRR")
            }
        }]), t
    }(HD.default);
k0.default = WD;
var M0 = {};
Object.defineProperty(M0, "__esModule", {
    value: !0
});
var qD = function() {
        function e(t, n) {
            for (var r = 0; r < n.length; r++) {
                var i = n[r];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
            }
        }
        return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
        }
    }(),
    XD = Sn,
    QD = mo,
    KD = Rx(QD),
    YD = Nt,
    ZD = Rx(YD);

function Rx(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}

function JD(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function eF(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t && (typeof t == "object" || typeof t == "function") ? t : e
}

function tF(e, t) {
    if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var nF = function(t) {
        var n = t.split("").map(function(r) {
            return +r
        }).reduce(function(r, i, o) {
            return o % 2 ? r + i * 9 : r + i * 3
        }, 0);
        return n % 10
    },
    rF = function(e) {
        tF(t, e);

        function t(n, r) {
            return JD(this, t), eF(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, n, r))
        }
        return qD(t, [{
            key: "valid",
            value: function() {
                return this.data.search(/^[0-9]{5}$/) !== -1
            }
        }, {
            key: "encode",
            value: function() {
                var r = XD.EAN5_STRUCTURE[nF(this.data)];
                return {
                    data: "1011" + (0, KD.default)(this.data, r, "01"),
                    text: this.text
                }
            }
        }]), t
    }(ZD.default);
M0.default = rF;
var I0 = {};
Object.defineProperty(I0, "__esModule", {
    value: !0
});
var iF = function() {
        function e(t, n) {
            for (var r = 0; r < n.length; r++) {
                var i = n[r];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
            }
        }
        return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
        }
    }(),
    oF = Sn,
    sF = mo,
    aF = kx(sF),
    uF = Nt,
    lF = kx(uF);

function kx(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}

function cF(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function fF(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t && (typeof t == "object" || typeof t == "function") ? t : e
}

function hF(e, t) {
    if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var dF = function(e) {
    hF(t, e);

    function t(n, r) {
        return cF(this, t), fF(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, n, r))
    }
    return iF(t, [{
        key: "valid",
        value: function() {
            return this.data.search(/^[0-9]{2}$/) !== -1
        }
    }, {
        key: "encode",
        value: function() {
            var r = oF.EAN2_STRUCTURE[parseInt(this.data) % 4];
            return {
                data: "1011" + (0, aF.default)(this.data, r, "01"),
                text: this.text
            }
        }
    }]), t
}(lF.default);
I0.default = dF;
var Mu = {};
Object.defineProperty(Mu, "__esModule", {
    value: !0
});
var pF = function() {
    function e(t, n) {
        for (var r = 0; r < n.length; r++) {
            var i = n[r];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t
    }
}();
Mu.checksum = Tp;
var mF = mo,
    xo = Mx(mF),
    vF = Nt,
    gF = Mx(vF);

function Mx(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}

function yF(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _F(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t && (typeof t == "object" || typeof t == "function") ? t : e
}

function EF(e, t) {
    if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var SF = function(e) {
    EF(t, e);

    function t(n, r) {
        yF(this, t), n.search(/^[0-9]{11}$/) !== -1 && (n += Tp(n));
        var i = _F(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, n, r));
        return i.displayValue = r.displayValue, r.fontSize > r.width * 10 ? i.fontSize = r.width * 10 : i.fontSize = r.fontSize, i.guardHeight = r.height + i.fontSize / 2 + r.textMargin, i
    }
    return pF(t, [{
        key: "valid",
        value: function() {
            return this.data.search(/^[0-9]{12}$/) !== -1 && this.data[11] == Tp(this.data)
        }
    }, {
        key: "encode",
        value: function() {
            return this.options.flat ? this.flatEncoding() : this.guardedEncoding()
        }
    }, {
        key: "flatEncoding",
        value: function() {
            var r = "";
            return r += "101", r += (0, xo.default)(this.data.substr(0, 6), "LLLLLL"), r += "01010", r += (0, xo.default)(this.data.substr(6, 6), "RRRRRR"), r += "101", {
                data: r,
                text: this.text
            }
        }
    }, {
        key: "guardedEncoding",
        value: function() {
            var r = [];
            return this.displayValue && r.push({
                data: "00000000",
                text: this.text.substr(0, 1),
                options: {
                    textAlign: "left",
                    fontSize: this.fontSize
                }
            }), r.push({
                data: "101" + (0, xo.default)(this.data[0], "L"),
                options: {
                    height: this.guardHeight
                }
            }), r.push({
                data: (0, xo.default)(this.data.substr(1, 5), "LLLLL"),
                text: this.text.substr(1, 5),
                options: {
                    fontSize: this.fontSize
                }
            }), r.push({
                data: "01010",
                options: {
                    height: this.guardHeight
                }
            }), r.push({
                data: (0, xo.default)(this.data.substr(6, 5), "RRRRR"),
                text: this.text.substr(6, 5),
                options: {
                    fontSize: this.fontSize
                }
            }), r.push({
                data: (0, xo.default)(this.data[11], "R") + "101",
                options: {
                    height: this.guardHeight
                }
            }), this.displayValue && r.push({
                data: "00000000",
                text: this.text.substr(11, 1),
                options: {
                    textAlign: "right",
                    fontSize: this.fontSize
                }
            }), r
        }
    }]), t
}(gF.default);

function Tp(e) {
    var t = 0,
        n;
    for (n = 1; n < 11; n += 2) t += parseInt(e[n]);
    for (n = 0; n < 11; n += 2) t += parseInt(e[n]) * 3;
    return (10 - t % 10) % 10
}
Mu.default = SF;
var L0 = {};
Object.defineProperty(L0, "__esModule", {
    value: !0
});
var wF = function() {
        function e(t, n) {
            for (var r = 0; r < n.length; r++) {
                var i = n[r];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
            }
        }
        return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
        }
    }(),
    xF = mo,
    TF = Ix(xF),
    OF = Nt,
    bF = Ix(OF),
    PF = Mu;

function Ix(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}

function CF(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function Ah(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t && (typeof t == "object" || typeof t == "function") ? t : e
}

function RF(e, t) {
    if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var kF = ["XX00000XXX", "XX10000XXX", "XX20000XXX", "XXX00000XX", "XXXX00000X", "XXXXX00005", "XXXXX00006", "XXXXX00007", "XXXXX00008", "XXXXX00009"],
    MF = [
        ["EEEOOO", "OOOEEE"],
        ["EEOEOO", "OOEOEE"],
        ["EEOOEO", "OOEEOE"],
        ["EEOOOE", "OOEEEO"],
        ["EOEEOO", "OEOOEE"],
        ["EOOEEO", "OEEOOE"],
        ["EOOOEE", "OEEEOO"],
        ["EOEOEO", "OEOEOE"],
        ["EOEOOE", "OEOEEO"],
        ["EOOEOE", "OEEOEO"]
    ],
    IF = function(e) {
        RF(t, e);

        function t(n, r) {
            CF(this, t);
            var i = Ah(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, n, r));
            if (i.isValid = !1, n.search(/^[0-9]{6}$/) !== -1) i.middleDigits = n, i.upcA = O_(n, "0"), i.text = r.text || "" + i.upcA[0] + n + i.upcA[i.upcA.length - 1], i.isValid = !0;
            else if (n.search(/^[01][0-9]{7}$/) !== -1)
                if (i.middleDigits = n.substring(1, n.length - 1), i.upcA = O_(i.middleDigits, n[0]), i.upcA[i.upcA.length - 1] === n[n.length - 1]) i.isValid = !0;
                else return Ah(i);
            else return Ah(i);
            return i.displayValue = r.displayValue, r.fontSize > r.width * 10 ? i.fontSize = r.width * 10 : i.fontSize = r.fontSize, i.guardHeight = r.height + i.fontSize / 2 + r.textMargin, i
        }
        return wF(t, [{
            key: "valid",
            value: function() {
                return this.isValid
            }
        }, {
            key: "encode",
            value: function() {
                return this.options.flat ? this.flatEncoding() : this.guardedEncoding()
            }
        }, {
            key: "flatEncoding",
            value: function() {
                var r = "";
                return r += "101", r += this.encodeMiddleDigits(), r += "010101", {
                    data: r,
                    text: this.text
                }
            }
        }, {
            key: "guardedEncoding",
            value: function() {
                var r = [];
                return this.displayValue && r.push({
                    data: "00000000",
                    text: this.text[0],
                    options: {
                        textAlign: "left",
                        fontSize: this.fontSize
                    }
                }), r.push({
                    data: "101",
                    options: {
                        height: this.guardHeight
                    }
                }), r.push({
                    data: this.encodeMiddleDigits(),
                    text: this.text.substring(1, 7),
                    options: {
                        fontSize: this.fontSize
                    }
                }), r.push({
                    data: "010101",
                    options: {
                        height: this.guardHeight
                    }
                }), this.displayValue && r.push({
                    data: "00000000",
                    text: this.text[7],
                    options: {
                        textAlign: "right",
                        fontSize: this.fontSize
                    }
                }), r
            }
        }, {
            key: "encodeMiddleDigits",
            value: function() {
                var r = this.upcA[0],
                    i = this.upcA[this.upcA.length - 1],
                    o = MF[parseInt(i)][parseInt(r)];
                return (0, TF.default)(this.middleDigits, o)
            }
        }]), t
    }(bF.default);

function O_(e, t) {
    for (var n = parseInt(e[e.length - 1]), r = kF[n], i = "", o = 0, s = 0; s < r.length; s++) {
        var a = r[s];
        a === "X" ? i += e[o++] : i += a
    }
    return i = "" + t + i, "" + i + (0, PF.checksum)(i)
}
L0.default = IF;
Object.defineProperty(xt, "__esModule", {
    value: !0
});
xt.UPCE = xt.UPC = xt.EAN2 = xt.EAN5 = xt.EAN8 = xt.EAN13 = void 0;
var LF = R0,
    AF = Vs(LF),
    NF = k0,
    DF = Vs(NF),
    FF = M0,
    $F = Vs(FF),
    BF = I0,
    jF = Vs(BF),
    HF = Mu,
    UF = Vs(HF),
    zF = L0,
    GF = Vs(zF);

function Vs(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}
xt.EAN13 = AF.default;
xt.EAN8 = DF.default;
xt.EAN5 = $F.default;
xt.EAN2 = jF.default;
xt.UPC = UF.default;
xt.UPCE = GF.default;
var Is = {},
    mf = {},
    Iu = {};
Object.defineProperty(Iu, "__esModule", {
    value: !0
});
Iu.START_BIN = "1010";
Iu.END_BIN = "11101";
Iu.BINARIES = ["00110", "10001", "01001", "11000", "00101", "10100", "01100", "00011", "10010", "01010"];
Object.defineProperty(mf, "__esModule", {
    value: !0
});
var VF = function() {
        function e(t, n) {
            for (var r = 0; r < n.length; r++) {
                var i = n[r];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
            }
        }
        return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
        }
    }(),
    cl = Iu,
    WF = Nt,
    qF = XF(WF);

function XF(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}

function QF(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function KF(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t && (typeof t == "object" || typeof t == "function") ? t : e
}

function YF(e, t) {
    if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var ZF = function(e) {
    YF(t, e);

    function t() {
        return QF(this, t), KF(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    }
    return VF(t, [{
        key: "valid",
        value: function() {
            return this.data.search(/^([0-9]{2})+$/) !== -1
        }
    }, {
        key: "encode",
        value: function() {
            var r = this,
                i = this.data.match(/.{2}/g).map(function(o) {
                    return r.encodePair(o)
                }).join("");
            return {
                data: cl.START_BIN + i + cl.END_BIN,
                text: this.text
            }
        }
    }, {
        key: "encodePair",
        value: function(r) {
            var i = cl.BINARIES[r[1]];
            return cl.BINARIES[r[0]].split("").map(function(o, s) {
                return (o === "1" ? "111" : "1") + (i[s] === "1" ? "000" : "0")
            }).join("")
        }
    }]), t
}(qF.default);
mf.default = ZF;
var A0 = {};
Object.defineProperty(A0, "__esModule", {
    value: !0
});
var JF = function() {
        function e(t, n) {
            for (var r = 0; r < n.length; r++) {
                var i = n[r];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
            }
        }
        return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
        }
    }(),
    e$ = mf,
    t$ = n$(e$);

function n$(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}

function r$(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function i$(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t && (typeof t == "object" || typeof t == "function") ? t : e
}

function o$(e, t) {
    if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var b_ = function(t) {
        var n = t.substr(0, 13).split("").map(function(r) {
            return parseInt(r, 10)
        }).reduce(function(r, i, o) {
            return r + i * (3 - o % 2 * 2)
        }, 0);
        return Math.ceil(n / 10) * 10 - n
    },
    s$ = function(e) {
        o$(t, e);

        function t(n, r) {
            return r$(this, t), n.search(/^[0-9]{13}$/) !== -1 && (n += b_(n)), i$(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, n, r))
        }
        return JF(t, [{
            key: "valid",
            value: function() {
                return this.data.search(/^[0-9]{14}$/) !== -1 && +this.data[13] === b_(this.data)
            }
        }]), t
    }(t$.default);
A0.default = s$;
Object.defineProperty(Is, "__esModule", {
    value: !0
});
Is.ITF14 = Is.ITF = void 0;
var a$ = mf,
    u$ = Lx(a$),
    l$ = A0,
    c$ = Lx(l$);

function Lx(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}
Is.ITF = u$.default;
Is.ITF14 = c$.default;
var ln = {},
    vo = {};
Object.defineProperty(vo, "__esModule", {
    value: !0
});
var f$ = function() {
        function e(t, n) {
            for (var r = 0; r < n.length; r++) {
                var i = n[r];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
            }
        }
        return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
        }
    }(),
    h$ = Nt,
    d$ = p$(h$);

function p$(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}

function m$(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function v$(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t && (typeof t == "object" || typeof t == "function") ? t : e
}

function g$(e, t) {
    if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var y$ = function(e) {
    g$(t, e);

    function t(n, r) {
        return m$(this, t), v$(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, n, r))
    }
    return f$(t, [{
        key: "encode",
        value: function() {
            for (var r = "110", i = 0; i < this.data.length; i++) {
                var o = parseInt(this.data[i]),
                    s = o.toString(2);
                s = _$(s, 4 - s.length);
                for (var a = 0; a < s.length; a++) r += s[a] == "0" ? "100" : "110"
            }
            return r += "1001", {
                data: r,
                text: this.text
            }
        }
    }, {
        key: "valid",
        value: function() {
            return this.data.search(/^[0-9]+$/) !== -1
        }
    }]), t
}(d$.default);

function _$(e, t) {
    for (var n = 0; n < t; n++) e = "0" + e;
    return e
}
vo.default = y$;
var N0 = {},
    go = {};
Object.defineProperty(go, "__esModule", {
    value: !0
});
go.mod10 = E$;
go.mod11 = S$;

function E$(e) {
    for (var t = 0, n = 0; n < e.length; n++) {
        var r = parseInt(e[n]);
        (n + e.length) % 2 === 0 ? t += r : t += r * 2 % 10 + Math.floor(r * 2 / 10)
    }
    return (10 - t % 10) % 10
}

function S$(e) {
    for (var t = 0, n = [2, 3, 4, 5, 6, 7], r = 0; r < e.length; r++) {
        var i = parseInt(e[e.length - 1 - r]);
        t += n[r % n.length] * i
    }
    return (11 - t % 11) % 11
}
Object.defineProperty(N0, "__esModule", {
    value: !0
});
var w$ = vo,
    x$ = O$(w$),
    T$ = go;

function O$(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}

function b$(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function P$(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t && (typeof t == "object" || typeof t == "function") ? t : e
}

function C$(e, t) {
    if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var R$ = function(e) {
    C$(t, e);

    function t(n, r) {
        return b$(this, t), P$(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, n + (0, T$.mod10)(n), r))
    }
    return t
}(x$.default);
N0.default = R$;
var D0 = {};
Object.defineProperty(D0, "__esModule", {
    value: !0
});
var k$ = vo,
    M$ = L$(k$),
    I$ = go;

function L$(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}

function A$(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function N$(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t && (typeof t == "object" || typeof t == "function") ? t : e
}

function D$(e, t) {
    if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var F$ = function(e) {
    D$(t, e);

    function t(n, r) {
        return A$(this, t), N$(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, n + (0, I$.mod11)(n), r))
    }
    return t
}(M$.default);
D0.default = F$;
var F0 = {};
Object.defineProperty(F0, "__esModule", {
    value: !0
});
var $$ = vo,
    B$ = j$($$),
    P_ = go;

function j$(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}

function H$(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function U$(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t && (typeof t == "object" || typeof t == "function") ? t : e
}

function z$(e, t) {
    if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var G$ = function(e) {
    z$(t, e);

    function t(n, r) {
        return H$(this, t), n += (0, P_.mod10)(n), n += (0, P_.mod10)(n), U$(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, n, r))
    }
    return t
}(B$.default);
F0.default = G$;
var $0 = {};
Object.defineProperty($0, "__esModule", {
    value: !0
});
var V$ = vo,
    W$ = q$(V$),
    C_ = go;

function q$(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}

function X$(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function Q$(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t && (typeof t == "object" || typeof t == "function") ? t : e
}

function K$(e, t) {
    if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var Y$ = function(e) {
    K$(t, e);

    function t(n, r) {
        return X$(this, t), n += (0, C_.mod11)(n), n += (0, C_.mod10)(n), Q$(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, n, r))
    }
    return t
}(W$.default);
$0.default = Y$;
Object.defineProperty(ln, "__esModule", {
    value: !0
});
ln.MSI1110 = ln.MSI1010 = ln.MSI11 = ln.MSI10 = ln.MSI = void 0;
var Z$ = vo,
    J$ = Lu(Z$),
    e3 = N0,
    t3 = Lu(e3),
    n3 = D0,
    r3 = Lu(n3),
    i3 = F0,
    o3 = Lu(i3),
    s3 = $0,
    a3 = Lu(s3);

function Lu(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}
ln.MSI = J$.default;
ln.MSI10 = t3.default;
ln.MSI11 = r3.default;
ln.MSI1010 = o3.default;
ln.MSI1110 = a3.default;
var vf = {};
Object.defineProperty(vf, "__esModule", {
    value: !0
});
vf.pharmacode = void 0;
var u3 = function() {
        function e(t, n) {
            for (var r = 0; r < n.length; r++) {
                var i = n[r];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
            }
        }
        return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
        }
    }(),
    l3 = Nt,
    c3 = f3(l3);

function f3(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}

function h3(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function d3(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t && (typeof t == "object" || typeof t == "function") ? t : e
}

function p3(e, t) {
    if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var m3 = function(e) {
    p3(t, e);

    function t(n, r) {
        h3(this, t);
        var i = d3(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, n, r));
        return i.number = parseInt(n, 10), i
    }
    return u3(t, [{
        key: "encode",
        value: function() {
            for (var r = this.number, i = ""; !isNaN(r) && r != 0;) r % 2 === 0 ? (i = "11100" + i, r = (r - 2) / 2) : (i = "100" + i, r = (r - 1) / 2);
            return i = i.slice(0, -2), {
                data: i,
                text: this.text
            }
        }
    }, {
        key: "valid",
        value: function() {
            return this.number >= 3 && this.number <= 131070
        }
    }]), t
}(c3.default);
vf.pharmacode = m3;
var gf = {};
Object.defineProperty(gf, "__esModule", {
    value: !0
});
gf.codabar = void 0;
var v3 = function() {
        function e(t, n) {
            for (var r = 0; r < n.length; r++) {
                var i = n[r];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
            }
        }
        return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
        }
    }(),
    g3 = Nt,
    y3 = _3(g3);

function _3(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}

function E3(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function S3(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t && (typeof t == "object" || typeof t == "function") ? t : e
}

function w3(e, t) {
    if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var x3 = function(e) {
    w3(t, e);

    function t(n, r) {
        E3(this, t), n.search(/^[0-9\-\$\:\.\+\/]+$/) === 0 && (n = "A" + n + "A");
        var i = S3(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, n.toUpperCase(), r));
        return i.text = i.options.text || i.text.replace(/[A-D]/g, ""), i
    }
    return v3(t, [{
        key: "valid",
        value: function() {
            return this.data.search(/^[A-D][0-9\-\$\:\.\+\/]+[A-D]$/) !== -1
        }
    }, {
        key: "encode",
        value: function() {
            for (var r = [], i = this.getEncodings(), o = 0; o < this.data.length; o++) r.push(i[this.data.charAt(o)]), o !== this.data.length - 1 && r.push("0");
            return {
                text: this.text,
                data: r.join("")
            }
        }
    }, {
        key: "getEncodings",
        value: function() {
            return {
                0: "101010011",
                1: "101011001",
                2: "101001011",
                3: "110010101",
                4: "101101001",
                5: "110101001",
                6: "100101011",
                7: "100101101",
                8: "100110101",
                9: "110100101",
                "-": "101001101",
                $: "101100101",
                ":": "1101011011",
                "/": "1101101011",
                ".": "1101101101",
                "+": "1011011011",
                A: "1011001001",
                B: "1001001011",
                C: "1010010011",
                D: "1010011001"
            }
        }
    }]), t
}(y3.default);
gf.codabar = x3;
var yf = {};
Object.defineProperty(yf, "__esModule", {
    value: !0
});
yf.GenericBarcode = void 0;
var T3 = function() {
        function e(t, n) {
            for (var r = 0; r < n.length; r++) {
                var i = n[r];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
            }
        }
        return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
        }
    }(),
    O3 = Nt,
    b3 = P3(O3);

function P3(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}

function C3(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function R3(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t && (typeof t == "object" || typeof t == "function") ? t : e
}

function k3(e, t) {
    if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var M3 = function(e) {
    k3(t, e);

    function t(n, r) {
        return C3(this, t), R3(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, n, r))
    }
    return T3(t, [{
        key: "encode",
        value: function() {
            return {
                data: "10101010101010101010101010101010101010101",
                text: this.text
            }
        }
    }, {
        key: "valid",
        value: function() {
            return !0
        }
    }]), t
}(b3.default);
yf.GenericBarcode = M3;
Object.defineProperty(w0, "__esModule", {
    value: !0
});
var I3 = hf,
    fl = Xn,
    To = xt,
    R_ = Is,
    sa = ln,
    L3 = vf,
    A3 = gf,
    N3 = yf;
w0.default = {
    CODE39: I3.CODE39,
    CODE128: fl.CODE128,
    CODE128A: fl.CODE128A,
    CODE128B: fl.CODE128B,
    CODE128C: fl.CODE128C,
    EAN13: To.EAN13,
    EAN8: To.EAN8,
    EAN5: To.EAN5,
    EAN2: To.EAN2,
    UPC: To.UPC,
    UPCE: To.UPCE,
    ITF14: R_.ITF14,
    ITF: R_.ITF,
    MSI: sa.MSI,
    MSI10: sa.MSI10,
    MSI11: sa.MSI11,
    MSI1010: sa.MSI1010,
    MSI1110: sa.MSI1110,
    pharmacode: L3.pharmacode,
    codabar: A3.codabar,
    GenericBarcode: N3.GenericBarcode
};
var Ws = {};
Object.defineProperty(Ws, "__esModule", {
    value: !0
});
var D3 = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
    }
    return e
};
Ws.default = function(e, t) {
    return D3({}, e, t)
};
var B0 = {};
Object.defineProperty(B0, "__esModule", {
    value: !0
});
B0.default = F3;

function F3(e) {
    var t = [];

    function n(r) {
        if (Array.isArray(r))
            for (var i = 0; i < r.length; i++) n(r[i]);
        else r.text = r.text || "", r.data = r.data || "", t.push(r)
    }
    return n(e), t
}
var j0 = {};
Object.defineProperty(j0, "__esModule", {
    value: !0
});
j0.default = $3;

function $3(e) {
    return e.marginTop = e.marginTop || e.margin, e.marginBottom = e.marginBottom || e.margin, e.marginRight = e.marginRight || e.margin, e.marginLeft = e.marginLeft || e.margin, e
}
var H0 = {},
    U0 = {},
    _f = {};
Object.defineProperty(_f, "__esModule", {
    value: !0
});
_f.default = B3;

function B3(e) {
    var t = ["width", "height", "textMargin", "fontSize", "margin", "marginTop", "marginBottom", "marginLeft", "marginRight"];
    for (var n in t) t.hasOwnProperty(n) && (n = t[n], typeof e[n] == "string" && (e[n] = parseInt(e[n], 10)));
    return typeof e.displayValue == "string" && (e.displayValue = e.displayValue != "false"), e
}
var Ef = {};
Object.defineProperty(Ef, "__esModule", {
    value: !0
});
var j3 = {
    width: 2,
    height: 100,
    format: "auto",
    displayValue: !0,
    fontOptions: "",
    font: "monospace",
    text: void 0,
    textAlign: "center",
    textPosition: "bottom",
    textMargin: 2,
    fontSize: 20,
    background: "#ffffff",
    lineColor: "#000000",
    margin: 10,
    marginTop: void 0,
    marginBottom: void 0,
    marginLeft: void 0,
    marginRight: void 0,
    valid: function() {}
};
Ef.default = j3;
Object.defineProperty(U0, "__esModule", {
    value: !0
});
var H3 = _f,
    U3 = Ax(H3),
    z3 = Ef,
    k_ = Ax(z3);

function Ax(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}

function G3(e) {
    var t = {};
    for (var n in k_.default) k_.default.hasOwnProperty(n) && (e.hasAttribute("jsbarcode-" + n.toLowerCase()) && (t[n] = e.getAttribute("jsbarcode-" + n.toLowerCase())), e.hasAttribute("data-" + n.toLowerCase()) && (t[n] = e.getAttribute("data-" + n.toLowerCase())));
    return t.value = e.getAttribute("jsbarcode-value") || e.getAttribute("data-value"), t = (0, U3.default)(t), t
}
U0.default = G3;
var z0 = {},
    G0 = {},
    Ut = {};
Object.defineProperty(Ut, "__esModule", {
    value: !0
});
Ut.getTotalWidthOfEncodings = Ut.calculateEncodingAttributes = Ut.getBarcodePadding = Ut.getEncodingHeight = Ut.getMaximumHeightOfEncodings = void 0;
var V3 = Ws,
    W3 = q3(V3);

function q3(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}

function Nx(e, t) {
    return t.height + (t.displayValue && e.text.length > 0 ? t.fontSize + t.textMargin : 0) + t.marginTop + t.marginBottom
}

function Dx(e, t, n) {
    if (n.displayValue && t < e) {
        if (n.textAlign == "center") return Math.floor((e - t) / 2);
        if (n.textAlign == "left") return 0;
        if (n.textAlign == "right") return Math.floor(e - t)
    }
    return 0
}

function X3(e, t, n) {
    for (var r = 0; r < e.length; r++) {
        var i = e[r],
            o = (0, W3.default)(t, i.options),
            s;
        o.displayValue ? s = Y3(i.text, o, n) : s = 0;
        var a = i.data.length * o.width;
        i.width = Math.ceil(Math.max(s, a)), i.height = Nx(i, o), i.barcodePadding = Dx(s, a, o)
    }
}

function Q3(e) {
    for (var t = 0, n = 0; n < e.length; n++) t += e[n].width;
    return t
}

function K3(e) {
    for (var t = 0, n = 0; n < e.length; n++) e[n].height > t && (t = e[n].height);
    return t
}

function Y3(e, t, n) {
    var r;
    if (n) r = n;
    else if (typeof document < "u") r = document.createElement("canvas").getContext("2d");
    else return 0;
    r.font = t.fontOptions + " " + t.fontSize + "px " + t.font;
    var i = r.measureText(e);
    if (!i) return 0;
    var o = i.width;
    return o
}
Ut.getMaximumHeightOfEncodings = K3;
Ut.getEncodingHeight = Nx;
Ut.getBarcodePadding = Dx;
Ut.calculateEncodingAttributes = X3;
Ut.getTotalWidthOfEncodings = Q3;
Object.defineProperty(G0, "__esModule", {
    value: !0
});
var Z3 = function() {
        function e(t, n) {
            for (var r = 0; r < n.length; r++) {
                var i = n[r];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
            }
        }
        return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
        }
    }(),
    J3 = Ws,
    eB = tB(J3),
    Nh = Ut;

function tB(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}

function nB(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}
var rB = function() {
    function e(t, n, r) {
        nB(this, e), this.canvas = t, this.encodings = n, this.options = r
    }
    return Z3(e, [{
        key: "render",
        value: function() {
            if (!this.canvas.getContext) throw new Error("The browser does not support canvas.");
            this.prepareCanvas();
            for (var n = 0; n < this.encodings.length; n++) {
                var r = (0, eB.default)(this.options, this.encodings[n].options);
                this.drawCanvasBarcode(r, this.encodings[n]), this.drawCanvasText(r, this.encodings[n]), this.moveCanvasDrawing(this.encodings[n])
            }
            this.restoreCanvas()
        }
    }, {
        key: "prepareCanvas",
        value: function() {
            var n = this.canvas.getContext("2d");
            n.save(), (0, Nh.calculateEncodingAttributes)(this.encodings, this.options, n);
            var r = (0, Nh.getTotalWidthOfEncodings)(this.encodings),
                i = (0, Nh.getMaximumHeightOfEncodings)(this.encodings);
            this.canvas.width = r + this.options.marginLeft + this.options.marginRight, this.canvas.height = i, n.clearRect(0, 0, this.canvas.width, this.canvas.height), this.options.background && (n.fillStyle = this.options.background, n.fillRect(0, 0, this.canvas.width, this.canvas.height)), n.translate(this.options.marginLeft, 0)
        }
    }, {
        key: "drawCanvasBarcode",
        value: function(n, r) {
            var i = this.canvas.getContext("2d"),
                o = r.data,
                s;
            n.textPosition == "top" ? s = n.marginTop + n.fontSize + n.textMargin : s = n.marginTop, i.fillStyle = n.lineColor;
            for (var a = 0; a < o.length; a++) {
                var u = a * n.width + r.barcodePadding;
                o[a] === "1" ? i.fillRect(u, s, n.width, n.height) : o[a] && i.fillRect(u, s, n.width, n.height * o[a])
            }
        }
    }, {
        key: "drawCanvasText",
        value: function(n, r) {
            var i = this.canvas.getContext("2d"),
                o = n.fontOptions + " " + n.fontSize + "px " + n.font;
            if (n.displayValue) {
                var s, a;
                n.textPosition == "top" ? a = n.marginTop + n.fontSize - n.textMargin : a = n.height + n.textMargin + n.marginTop + n.fontSize, i.font = o, n.textAlign == "left" || r.barcodePadding > 0 ? (s = 0, i.textAlign = "left") : n.textAlign == "right" ? (s = r.width - 1, i.textAlign = "right") : (s = r.width / 2, i.textAlign = "center"), i.fillText(r.text, s, a)
            }
        }
    }, {
        key: "moveCanvasDrawing",
        value: function(n) {
            var r = this.canvas.getContext("2d");
            r.translate(n.width, 0)
        }
    }, {
        key: "restoreCanvas",
        value: function() {
            var n = this.canvas.getContext("2d");
            n.restore()
        }
    }]), e
}();
G0.default = rB;
var V0 = {};
Object.defineProperty(V0, "__esModule", {
    value: !0
});
var iB = function() {
        function e(t, n) {
            for (var r = 0; r < n.length; r++) {
                var i = n[r];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
            }
        }
        return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
        }
    }(),
    oB = Ws,
    sB = aB(oB),
    Dh = Ut;

function aB(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}

function uB(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}
var hl = "http://www.w3.org/2000/svg",
    lB = function() {
        function e(t, n, r) {
            uB(this, e), this.svg = t, this.encodings = n, this.options = r, this.document = r.xmlDocument || document
        }
        return iB(e, [{
            key: "render",
            value: function() {
                var n = this.options.marginLeft;
                this.prepareSVG();
                for (var r = 0; r < this.encodings.length; r++) {
                    var i = this.encodings[r],
                        o = (0, sB.default)(this.options, i.options),
                        s = this.createGroup(n, o.marginTop, this.svg);
                    this.setGroupOptions(s, o), this.drawSvgBarcode(s, o, i), this.drawSVGText(s, o, i), n += i.width
                }
            }
        }, {
            key: "prepareSVG",
            value: function() {
                for (; this.svg.firstChild;) this.svg.removeChild(this.svg.firstChild);
                (0, Dh.calculateEncodingAttributes)(this.encodings, this.options);
                var n = (0, Dh.getTotalWidthOfEncodings)(this.encodings),
                    r = (0, Dh.getMaximumHeightOfEncodings)(this.encodings),
                    i = n + this.options.marginLeft + this.options.marginRight;
                this.setSvgAttributes(i, r), this.options.background && this.drawRect(0, 0, i, r, this.svg).setAttribute("style", "fill:" + this.options.background + ";")
            }
        }, {
            key: "drawSvgBarcode",
            value: function(n, r, i) {
                var o = i.data,
                    s;
                r.textPosition == "top" ? s = r.fontSize + r.textMargin : s = 0;
                for (var a = 0, u = 0, l = 0; l < o.length; l++) u = l * r.width + i.barcodePadding, o[l] === "1" ? a++ : a > 0 && (this.drawRect(u - r.width * a, s, r.width * a, r.height, n), a = 0);
                a > 0 && this.drawRect(u - r.width * (a - 1), s, r.width * a, r.height, n)
            }
        }, {
            key: "drawSVGText",
            value: function(n, r, i) {
                var o = this.document.createElementNS(hl, "text");
                if (r.displayValue) {
                    var s, a;
                    o.setAttribute("style", "font:" + r.fontOptions + " " + r.fontSize + "px " + r.font), r.textPosition == "top" ? a = r.fontSize - r.textMargin : a = r.height + r.textMargin + r.fontSize, r.textAlign == "left" || i.barcodePadding > 0 ? (s = 0, o.setAttribute("text-anchor", "start")) : r.textAlign == "right" ? (s = i.width - 1, o.setAttribute("text-anchor", "end")) : (s = i.width / 2, o.setAttribute("text-anchor", "middle")), o.setAttribute("x", s), o.setAttribute("y", a), o.appendChild(this.document.createTextNode(i.text)), n.appendChild(o)
                }
            }
        }, {
            key: "setSvgAttributes",
            value: function(n, r) {
                var i = this.svg;
                i.setAttribute("width", n + "px"), i.setAttribute("height", r + "px"), i.setAttribute("x", "0px"), i.setAttribute("y", "0px"), i.setAttribute("viewBox", "0 0 " + n + " " + r), i.setAttribute("xmlns", hl), i.setAttribute("version", "1.1"), i.setAttribute("style", "transform: translate(0,0)")
            }
        }, {
            key: "createGroup",
            value: function(n, r, i) {
                var o = this.document.createElementNS(hl, "g");
                return o.setAttribute("transform", "translate(" + n + ", " + r + ")"), i.appendChild(o), o
            }
        }, {
            key: "setGroupOptions",
            value: function(n, r) {
                n.setAttribute("style", "fill:" + r.lineColor + ";")
            }
        }, {
            key: "drawRect",
            value: function(n, r, i, o, s) {
                var a = this.document.createElementNS(hl, "rect");
                return a.setAttribute("x", n), a.setAttribute("y", r), a.setAttribute("width", i), a.setAttribute("height", o), s.appendChild(a), a
            }
        }]), e
    }();
V0.default = lB;
var W0 = {};
Object.defineProperty(W0, "__esModule", {
    value: !0
});
var cB = function() {
    function e(t, n) {
        for (var r = 0; r < n.length; r++) {
            var i = n[r];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t
    }
}();

function fB(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}
var hB = function() {
    function e(t, n, r) {
        fB(this, e), this.object = t, this.encodings = n, this.options = r
    }
    return cB(e, [{
        key: "render",
        value: function() {
            this.object.encodings = this.encodings
        }
    }]), e
}();
W0.default = hB;
Object.defineProperty(z0, "__esModule", {
    value: !0
});
var dB = G0,
    pB = q0(dB),
    mB = V0,
    vB = q0(mB),
    gB = W0,
    yB = q0(gB);

function q0(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}
z0.default = {
    CanvasRenderer: pB.default,
    SVGRenderer: vB.default,
    ObjectRenderer: yB.default
};
var qs = {};
Object.defineProperty(qs, "__esModule", {
    value: !0
});

function X0(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function Q0(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t && (typeof t == "object" || typeof t == "function") ? t : e
}

function K0(e, t) {
    if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var _B = function(e) {
        K0(t, e);

        function t(n, r) {
            X0(this, t);
            var i = Q0(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
            return i.name = "InvalidInputException", i.symbology = n, i.input = r, i.message = '"' + i.input + '" is not a valid input for ' + i.symbology, i
        }
        return t
    }(Error),
    EB = function(e) {
        K0(t, e);

        function t() {
            X0(this, t);
            var n = Q0(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
            return n.name = "InvalidElementException", n.message = "Not supported type to render on", n
        }
        return t
    }(Error),
    SB = function(e) {
        K0(t, e);

        function t() {
            X0(this, t);
            var n = Q0(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
            return n.name = "NoElementException", n.message = "No element to render on.", n
        }
        return t
    }(Error);
qs.InvalidInputException = _B;
qs.InvalidElementException = EB;
qs.NoElementException = SB;
Object.defineProperty(H0, "__esModule", {
    value: !0
});
var wB = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
        return typeof e
    } : function(e) {
        return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    },
    xB = U0,
    Op = Fx(xB),
    TB = z0,
    ma = Fx(TB),
    OB = qs;

function Fx(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}

function Y0(e) {
    if (typeof e == "string") return bB(e);
    if (Array.isArray(e)) {
        for (var t = [], n = 0; n < e.length; n++) t.push(Y0(e[n]));
        return t
    } else {
        if (typeof HTMLCanvasElement < "u" && e instanceof HTMLImageElement) return PB(e);
        if (e && e.nodeName && e.nodeName.toLowerCase() === "svg" || typeof SVGElement < "u" && e instanceof SVGElement) return {
            element: e,
            options: (0, Op.default)(e),
            renderer: ma.default.SVGRenderer
        };
        if (typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement) return {
            element: e,
            options: (0, Op.default)(e),
            renderer: ma.default.CanvasRenderer
        };
        if (e && e.getContext) return {
            element: e,
            renderer: ma.default.CanvasRenderer
        };
        if (e && (typeof e > "u" ? "undefined" : wB(e)) === "object" && !e.nodeName) return {
            element: e,
            renderer: ma.default.ObjectRenderer
        };
        throw new OB.InvalidElementException
    }
}

function bB(e) {
    var t = document.querySelectorAll(e);
    if (t.length !== 0) {
        for (var n = [], r = 0; r < t.length; r++) n.push(Y0(t[r]));
        return n
    }
}

function PB(e) {
    var t = document.createElement("canvas");
    return {
        element: t,
        options: (0, Op.default)(e),
        renderer: ma.default.CanvasRenderer,
        afterRender: function() {
            e.setAttribute("src", t.toDataURL())
        }
    }
}
H0.default = Y0;
var Z0 = {};
Object.defineProperty(Z0, "__esModule", {
    value: !0
});
var CB = function() {
    function e(t, n) {
        for (var r = 0; r < n.length; r++) {
            var i = n[r];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t
    }
}();

function RB(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}
var kB = function() {
    function e(t) {
        RB(this, e), this.api = t
    }
    return CB(e, [{
        key: "handleCatch",
        value: function(n) {
            if (n.name === "InvalidInputException")
                if (this.api._options.valid !== this.api._defaults.valid) this.api._options.valid(!1);
                else throw n.message;
            else throw n;
            this.api.render = function() {}
        }
    }, {
        key: "wrapBarcodeCall",
        value: function(n) {
            try {
                var r = n.apply(void 0, arguments);
                return this.api._options.valid(!0), r
            } catch (i) {
                return this.handleCatch(i), this.api
            }
        }
    }]), e
}();
Z0.default = kB;
var MB = w0,
    zi = gi(MB),
    IB = Ws,
    Au = gi(IB),
    LB = B0,
    $x = gi(LB),
    AB = j0,
    M_ = gi(AB),
    NB = H0,
    DB = gi(NB),
    FB = _f,
    $B = gi(FB),
    BB = Z0,
    jB = gi(BB),
    Bx = qs,
    HB = Ef,
    jx = gi(HB);

function gi(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}
var dr = function() {},
    Sf = function(t, n, r) {
        var i = new dr;
        if (typeof t > "u") throw Error("No element to render on was provided.");
        return i._renderProperties = (0, DB.default)(t), i._encodings = [], i._options = jx.default, i._errorHandler = new jB.default(i), typeof n < "u" && (r = r || {}, r.format || (r.format = Ux()), i.options(r)[r.format](n, r).render()), i
    };
Sf.getModule = function(e) {
    return zi.default[e]
};
for (var I_ in zi.default) zi.default.hasOwnProperty(I_) && UB(zi.default, I_);

function UB(e, t) {
    dr.prototype[t] = dr.prototype[t.toUpperCase()] = dr.prototype[t.toLowerCase()] = function(n, r) {
        var i = this;
        return i._errorHandler.wrapBarcodeCall(function() {
            r.text = typeof r.text > "u" ? void 0 : "" + r.text;
            var o = (0, Au.default)(i._options, r);
            o = (0, $B.default)(o);
            var s = e[t],
                a = Hx(n, s, o);
            return i._encodings.push(a), i
        })
    }
}

function Hx(e, t, n) {
    e = "" + e;
    var r = new t(e, n);
    if (!r.valid()) throw new Bx.InvalidInputException(r.constructor.name, e);
    var i = r.encode();
    i = (0, $x.default)(i);
    for (var o = 0; o < i.length; o++) i[o].options = (0, Au.default)(n, i[o].options);
    return i
}

function Ux() {
    return zi.default.CODE128 ? "CODE128" : Object.keys(zi.default)[0]
}
dr.prototype.options = function(e) {
    return this._options = (0, Au.default)(this._options, e), this
};
dr.prototype.blank = function(e) {
    var t = new Array(e + 1).join("0");
    return this._encodings.push({
        data: t
    }), this
};
dr.prototype.init = function() {
    if (this._renderProperties) {
        Array.isArray(this._renderProperties) || (this._renderProperties = [this._renderProperties]);
        var e;
        for (var t in this._renderProperties) {
            e = this._renderProperties[t];
            var n = (0, Au.default)(this._options, e.options);
            n.format == "auto" && (n.format = Ux()), this._errorHandler.wrapBarcodeCall(function() {
                var r = n.value,
                    i = zi.default[n.format.toUpperCase()],
                    o = Hx(r, i, n);
                bp(e, o, n)
            })
        }
    }
};
dr.prototype.render = function() {
    if (!this._renderProperties) throw new Bx.NoElementException;
    if (Array.isArray(this._renderProperties))
        for (var e = 0; e < this._renderProperties.length; e++) bp(this._renderProperties[e], this._encodings, this._options);
    else bp(this._renderProperties, this._encodings, this._options);
    return this
};
dr.prototype._defaults = jx.default;

function bp(e, t, n) {
    t = (0, $x.default)(t);
    for (var r = 0; r < t.length; r++) t[r].options = (0, Au.default)(n, t[r].options), (0, M_.default)(t[r].options);
    (0, M_.default)(n);
    var i = e.renderer,
        o = new i(e.element, t, n);
    o.render(), e.afterRender && e.afterRender()
}
typeof window < "u" && (window.JsBarcode = Sf);
typeof jQuery < "u" && (jQuery.fn.JsBarcode = function(e, t) {
    var n = [];
    return jQuery(this).each(function() {
        n.push(this)
    }), Sf(n, e, t)
});
var zB = Sf;
const zH = Oc(zB),
    Tt = Symbol.for("@ts-pattern/matcher"),
    zx = Symbol.for("@ts-pattern/isVariadic"),
    mc = "@ts-pattern/anonymous-select-key",
    Pp = e => !!(e && typeof e == "object"),
    Il = e => e && !!e[Tt],
    Xe = (e, t, n) => {
        if (Il(e)) {
            const r = e[Tt](),
                {
                    matched: i,
                    selections: o
                } = r.match(t);
            return i && o && Object.keys(o).forEach(s => n(s, o[s])), i
        }
        if (Pp(e)) {
            if (!Pp(t)) return !1;
            if (Array.isArray(e)) {
                if (!Array.isArray(t)) return !1;
                let r = [],
                    i = [],
                    o = [];
                for (const s of e.keys()) {
                    const a = e[s];
                    Il(a) && a[zx] ? o.push(a) : o.length ? i.push(a) : r.push(a)
                }
                if (o.length) {
                    if (o.length > 1) throw new Error("Pattern error: Using `...P.array(...)` several times in a single pattern is not allowed.");
                    if (t.length < r.length + i.length) return !1;
                    const s = t.slice(0, r.length),
                        a = i.length === 0 ? [] : t.slice(-i.length),
                        u = t.slice(r.length, i.length === 0 ? 1 / 0 : -i.length);
                    return r.every((l, c) => Xe(l, s[c], n)) && i.every((l, c) => Xe(l, a[c], n)) && (o.length === 0 || Xe(o[0], u, n))
                }
                return e.length === t.length && e.every((s, a) => Xe(s, t[a], n))
            }
            return Reflect.ownKeys(e).every(r => {
                const i = e[r];
                return (r in t || Il(o = i) && o[Tt]().matcherType === "optional") && Xe(i, t[r], n);
                var o
            })
        }
        return Object.is(t, e)
    },
    zt = e => {
        var t, n, r;
        return Pp(e) ? Il(e) ? (t = (n = (r = e[Tt]()).getSelectionKeys) == null ? void 0 : n.call(r)) != null ? t : [] : Array.isArray(e) ? Ka(e, zt) : Ka(Object.values(e), zt) : []
    },
    Ka = (e, t) => e.reduce((n, r) => n.concat(t(r)), []);

function GB(...e) {
    if (e.length === 1) {
        const [t] = e;
        return n => Xe(t, n, () => {})
    }
    if (e.length === 2) {
        const [t, n] = e;
        return Xe(t, n, () => {})
    }
    throw new Error(`isMatching wasn't given the right number of arguments: expected 1 or 2, received ${e.length}.`)
}

function Qe(e) {
    return Object.assign(e, {
        optional: () => J0(e),
        and: t => ye(e, t),
        or: t => Gx(e, t),
        select: t => t === void 0 ? Ya(e) : Ya(t, e)
    })
}

function Cp(e) {
    return Object.assign((t => Object.assign(t, {
        [Symbol.iterator]() {
            let n = 0;
            const r = [{
                value: Object.assign(t, {
                    [zx]: !0
                }),
                done: !1
            }, {
                done: !0,
                value: void 0
            }];
            return {
                next: () => {
                    var i;
                    return (i = r[n++]) != null ? i : r.at(-1)
                }
            }
        }
    }))(e), {
        optional: () => Cp(J0(e)),
        select: t => Cp(t === void 0 ? Ya(e) : Ya(t, e))
    })
}

function J0(e) {
    return Qe({
        [Tt]: () => ({
            match: t => {
                let n = {};
                const r = (i, o) => {
                    n[i] = o
                };
                return t === void 0 ? (zt(e).forEach(i => r(i, void 0)), {
                    matched: !0,
                    selections: n
                }) : {
                    matched: Xe(e, t, r),
                    selections: n
                }
            },
            getSelectionKeys: () => zt(e),
            matcherType: "optional"
        })
    })
}
const VB = (e, t) => {
        for (const n of e)
            if (!t(n)) return !1;
        return !0
    },
    WB = (e, t) => {
        for (const [n, r] of e.entries())
            if (!t(r, n)) return !1;
        return !0
    };

function ye(...e) {
    return Qe({
        [Tt]: () => ({
            match: t => {
                let n = {};
                const r = (i, o) => {
                    n[i] = o
                };
                return {
                    matched: e.every(i => Xe(i, t, r)),
                    selections: n
                }
            },
            getSelectionKeys: () => Ka(e, zt),
            matcherType: "and"
        })
    })
}

function Gx(...e) {
    return Qe({
        [Tt]: () => ({
            match: t => {
                let n = {};
                const r = (i, o) => {
                    n[i] = o
                };
                return Ka(e, zt).forEach(i => r(i, void 0)), {
                    matched: e.some(i => Xe(i, t, r)),
                    selections: n
                }
            },
            getSelectionKeys: () => Ka(e, zt),
            matcherType: "or"
        })
    })
}

function ne(e) {
    return {
        [Tt]: () => ({
            match: t => ({
                matched: !!e(t)
            })
        })
    }
}

function Ya(...e) {
    const t = typeof e[0] == "string" ? e[0] : void 0,
        n = e.length === 2 ? e[1] : typeof e[0] == "string" ? void 0 : e[0];
    return Qe({
        [Tt]: () => ({
            match: r => {
                let i = {
                    [t ? ? mc]: r
                };
                return {
                    matched: n === void 0 || Xe(n, r, (o, s) => {
                        i[o] = s
                    }),
                    selections: i
                }
            },
            getSelectionKeys: () => [t ? ? mc].concat(n === void 0 ? [] : zt(n))
        })
    })
}

function An(e) {
    return typeof e == "number"
}

function Pr(e) {
    return typeof e == "string"
}

function Cr(e) {
    return typeof e == "bigint"
}
const Vx = Qe(ne(function(e) {
        return !0
    })),
    qB = Vx,
    Rr = e => Object.assign(Qe(e), {
        startsWith: t => {
            return Rr(ye(e, (n = t, ne(r => Pr(r) && r.startsWith(n)))));
            var n
        },
        endsWith: t => {
            return Rr(ye(e, (n = t, ne(r => Pr(r) && r.endsWith(n)))));
            var n
        },
        minLength: t => Rr(ye(e, (n => ne(r => Pr(r) && r.length >= n))(t))),
        length: t => Rr(ye(e, (n => ne(r => Pr(r) && r.length === n))(t))),
        maxLength: t => Rr(ye(e, (n => ne(r => Pr(r) && r.length <= n))(t))),
        includes: t => {
            return Rr(ye(e, (n = t, ne(r => Pr(r) && r.includes(n)))));
            var n
        },
        regex: t => {
            return Rr(ye(e, (n = t, ne(r => Pr(r) && !!r.match(n)))));
            var n
        }
    }),
    XB = Rr(ne(Pr)),
    Nn = e => Object.assign(Qe(e), {
        between: (t, n) => Nn(ye(e, ((r, i) => ne(o => An(o) && r <= o && i >= o))(t, n))),
        lt: t => Nn(ye(e, (n => ne(r => An(r) && r < n))(t))),
        gt: t => Nn(ye(e, (n => ne(r => An(r) && r > n))(t))),
        lte: t => Nn(ye(e, (n => ne(r => An(r) && r <= n))(t))),
        gte: t => Nn(ye(e, (n => ne(r => An(r) && r >= n))(t))),
        int: () => Nn(ye(e, ne(t => An(t) && Number.isInteger(t)))),
        finite: () => Nn(ye(e, ne(t => An(t) && Number.isFinite(t)))),
        positive: () => Nn(ye(e, ne(t => An(t) && t > 0))),
        negative: () => Nn(ye(e, ne(t => An(t) && t < 0)))
    }),
    QB = Nn(ne(An)),
    kr = e => Object.assign(Qe(e), {
        between: (t, n) => kr(ye(e, ((r, i) => ne(o => Cr(o) && r <= o && i >= o))(t, n))),
        lt: t => kr(ye(e, (n => ne(r => Cr(r) && r < n))(t))),
        gt: t => kr(ye(e, (n => ne(r => Cr(r) && r > n))(t))),
        lte: t => kr(ye(e, (n => ne(r => Cr(r) && r <= n))(t))),
        gte: t => kr(ye(e, (n => ne(r => Cr(r) && r >= n))(t))),
        positive: () => kr(ye(e, ne(t => Cr(t) && t > 0))),
        negative: () => kr(ye(e, ne(t => Cr(t) && t < 0)))
    }),
    KB = kr(ne(Cr)),
    YB = Qe(ne(function(e) {
        return typeof e == "boolean"
    })),
    ZB = Qe(ne(function(e) {
        return typeof e == "symbol"
    })),
    JB = Qe(ne(function(e) {
        return e == null
    })),
    ej = Qe(ne(function(e) {
        return e != null
    }));
var GH = {
    __proto__: null,
    matcher: Tt,
    optional: J0,
    array: function(...e) {
        return Cp({
            [Tt]: () => ({
                match: t => {
                    if (!Array.isArray(t)) return {
                        matched: !1
                    };
                    if (e.length === 0) return {
                        matched: !0
                    };
                    const n = e[0];
                    let r = {};
                    if (t.length === 0) return zt(n).forEach(o => {
                        r[o] = []
                    }), {
                        matched: !0,
                        selections: r
                    };
                    const i = (o, s) => {
                        r[o] = (r[o] || []).concat([s])
                    };
                    return {
                        matched: t.every(o => Xe(n, o, i)),
                        selections: r
                    }
                },
                getSelectionKeys: () => e.length === 0 ? [] : zt(e[0])
            })
        })
    },
    set: function(...e) {
        return Qe({
            [Tt]: () => ({
                match: t => {
                    if (!(t instanceof Set)) return {
                        matched: !1
                    };
                    let n = {};
                    if (t.size === 0) return {
                        matched: !0,
                        selections: n
                    };
                    if (e.length === 0) return {
                        matched: !0
                    };
                    const r = (o, s) => {
                            n[o] = (n[o] || []).concat([s])
                        },
                        i = e[0];
                    return {
                        matched: VB(t, o => Xe(i, o, r)),
                        selections: n
                    }
                },
                getSelectionKeys: () => e.length === 0 ? [] : zt(e[0])
            })
        })
    },
    map: function(...e) {
        return Qe({
            [Tt]: () => ({
                match: t => {
                    if (!(t instanceof Map)) return {
                        matched: !1
                    };
                    let n = {};
                    if (t.size === 0) return {
                        matched: !0,
                        selections: n
                    };
                    const r = (a, u) => {
                        n[a] = (n[a] || []).concat([u])
                    };
                    if (e.length === 0) return {
                        matched: !0
                    };
                    var i;
                    if (e.length === 1) throw new Error(`\`P.map\` wasn't given enough arguments. Expected (key, value), received ${(i=e[0])==null?void 0:i.toString()}`);
                    const [o, s] = e;
                    return {
                        matched: WB(t, (a, u) => {
                            const l = Xe(o, u, r),
                                c = Xe(s, a, r);
                            return l && c
                        }),
                        selections: n
                    }
                },
                getSelectionKeys: () => e.length === 0 ? [] : [...zt(e[0]), ...zt(e[1])]
            })
        })
    },
    intersection: ye,
    union: Gx,
    not: function(e) {
        return Qe({
            [Tt]: () => ({
                match: t => ({
                    matched: !Xe(e, t, () => {})
                }),
                getSelectionKeys: () => [],
                matcherType: "not"
            })
        })
    },
    when: ne,
    select: Ya,
    any: Vx,
    _: qB,
    string: XB,
    number: QB,
    bigint: KB,
    boolean: YB,
    symbol: ZB,
    nullish: JB,
    nonNullable: ej,
    instanceOf: function(e) {
        return Qe(ne(function(t) {
            return n => n instanceof t
        }(e)))
    },
    shape: function(e) {
        return Qe(ne(GB(e)))
    }
};
class tj extends Error {
    constructor(t) {
        let n;
        try {
            n = JSON.stringify(t)
        } catch {
            n = t
        }
        super(`Pattern matching error: no pattern matches value ${n}`), this.input = void 0, this.input = t
    }
}
const Rp = {
    matched: !1,
    value: void 0
};

function VH(e) {
    return new vc(e, Rp)
}
class vc {
    constructor(t, n) {
        this.input = void 0, this.state = void 0, this.input = t, this.state = n
    }
    with(...t) {
        if (this.state.matched) return this;
        const n = t[t.length - 1],
            r = [t[0]];
        let i;
        t.length === 3 && typeof t[1] == "function" ? i = t[1] : t.length > 2 && r.push(...t.slice(1, t.length - 1));
        let o = !1,
            s = {};
        const a = (l, c) => {
                o = !0, s[l] = c
            },
            u = !r.some(l => Xe(l, this.input, a)) || i && !i(this.input) ? Rp : {
                matched: !0,
                value: n(o ? mc in s ? s[mc] : s : this.input, this.input)
            };
        return new vc(this.input, u)
    }
    when(t, n) {
        if (this.state.matched) return this;
        const r = !!t(this.input);
        return new vc(this.input, r ? {
            matched: !0,
            value: n(this.input, this.input)
        } : Rp)
    }
    otherwise(t) {
        return this.state.matched ? this.state.value : t(this.input)
    }
    exhaustive(t = nj) {
        return this.state.matched ? this.state.value : t(this.input)
    }
    run() {
        return this.exhaustive()
    }
    returnType() {
        return this
    }
}

function nj(e) {
    throw new tj(e)
}
var WH = function() {
    return null
};

function ir(e) {
    if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e
}

function Wx(e, t) {
    e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.__proto__ = t
}
/*!
 * GSAP 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */
var Xt = {
        autoSleep: 120,
        force3D: "auto",
        nullTargetWarn: 1,
        units: {
            lineHeight: ""
        }
    },
    Ls = {
        duration: .5,
        overwrite: !1,
        delay: 0
    },
    ev, it, xe, hn = 1e8,
    de = 1 / hn,
    kp = Math.PI * 2,
    rj = kp / 4,
    ij = 0,
    qx = Math.sqrt,
    oj = Math.cos,
    sj = Math.sin,
    Ve = function(t) {
        return typeof t == "string"
    },
    Ie = function(t) {
        return typeof t == "function"
    },
    yr = function(t) {
        return typeof t == "number"
    },
    tv = function(t) {
        return typeof t > "u"
    },
    er = function(t) {
        return typeof t == "object"
    },
    kt = function(t) {
        return t !== !1
    },
    nv = function() {
        return typeof window < "u"
    },
    dl = function(t) {
        return Ie(t) || Ve(t)
    },
    Xx = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {},
    ot = Array.isArray,
    Mp = /(?:-?\.?\d|\.)+/gi,
    Qx = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
    jo = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
    Fh = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
    Kx = /[+-]=-?[.\d]+/,
    Yx = /[^,'"\[\]\s]+/gi,
    aj = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
    Oe, Bn, Ip, rv, Kt = {},
    gc = {},
    Zx, Jx = function(t) {
        return (gc = oo(t, Kt)) && At
    },
    iv = function(t, n) {
        return console.warn("Invalid property", t, "set to", n, "Missing plugin? gsap.registerPlugin()")
    },
    Za = function(t, n) {
        return !n && console.warn(t)
    },
    eT = function(t, n) {
        return t && (Kt[t] = n) && gc && (gc[t] = n) || Kt
    },
    Ja = function() {
        return 0
    },
    uj = {
        suppressEvents: !0,
        isStart: !0,
        kill: !1
    },
    Ll = {
        suppressEvents: !0,
        kill: !1
    },
    lj = {
        suppressEvents: !0
    },
    ov = {},
    oi = [],
    Lp = {},
    tT, Ht = {},
    $h = {},
    L_ = 30,
    Al = [],
    sv = "",
    av = function(t) {
        var n = t[0],
            r, i;
        if (er(n) || Ie(n) || (t = [t]), !(r = (n._gsap || {}).harness)) {
            for (i = Al.length; i-- && !Al[i].targetTest(n););
            r = Al[i]
        }
        for (i = t.length; i--;) t[i] && (t[i]._gsap || (t[i]._gsap = new OT(t[i], r))) || t.splice(i, 1);
        return t
    },
    Gi = function(t) {
        return t._gsap || av(dn(t))[0]._gsap
    },
    nT = function(t, n, r) {
        return (r = t[n]) && Ie(r) ? t[n]() : tv(r) && t.getAttribute && t.getAttribute(n) || r
    },
    Mt = function(t, n) {
        return (t = t.split(",")).forEach(n) || t
    },
    Le = function(t) {
        return Math.round(t * 1e5) / 1e5 || 0
    },
    ze = function(t) {
        return Math.round(t * 1e7) / 1e7 || 0
    },
    Ko = function(t, n) {
        var r = n.charAt(0),
            i = parseFloat(n.substr(2));
        return t = parseFloat(t), r === "+" ? t + i : r === "-" ? t - i : r === "*" ? t * i : t / i
    },
    cj = function(t, n) {
        for (var r = n.length, i = 0; t.indexOf(n[i]) < 0 && ++i < r;);
        return i < r
    },
    yc = function() {
        var t = oi.length,
            n = oi.slice(0),
            r, i;
        for (Lp = {}, oi.length = 0, r = 0; r < t; r++) i = n[r], i && i._lazy && (i.render(i._lazy[0], i._lazy[1], !0)._lazy = 0)
    },
    rT = function(t, n, r, i) {
        oi.length && !it && yc(), t.render(n, r, i || it && n < 0 && (t._initted || t._startAt)), oi.length && !it && yc()
    },
    iT = function(t) {
        var n = parseFloat(t);
        return (n || n === 0) && (t + "").match(Yx).length < 2 ? n : Ve(t) ? t.trim() : t
    },
    oT = function(t) {
        return t
    },
    yn = function(t, n) {
        for (var r in n) r in t || (t[r] = n[r]);
        return t
    },
    fj = function(t) {
        return function(n, r) {
            for (var i in r) i in n || i === "duration" && t || i === "ease" || (n[i] = r[i])
        }
    },
    oo = function(t, n) {
        for (var r in n) t[r] = n[r];
        return t
    },
    A_ = function e(t, n) {
        for (var r in n) r !== "__proto__" && r !== "constructor" && r !== "prototype" && (t[r] = er(n[r]) ? e(t[r] || (t[r] = {}), n[r]) : n[r]);
        return t
    },
    _c = function(t, n) {
        var r = {},
            i;
        for (i in t) i in n || (r[i] = t[i]);
        return r
    },
    Ca = function(t) {
        var n = t.parent || Oe,
            r = t.keyframes ? fj(ot(t.keyframes)) : yn;
        if (kt(t.inherit))
            for (; n;) r(t, n.vars.defaults), n = n.parent || n._dp;
        return t
    },
    hj = function(t, n) {
        for (var r = t.length, i = r === n.length; i && r-- && t[r] === n[r];);
        return r < 0
    },
    sT = function(t, n, r, i, o) {
        r === void 0 && (r = "_first"), i === void 0 && (i = "_last");
        var s = t[i],
            a;
        if (o)
            for (a = n[o]; s && s[o] > a;) s = s._prev;
        return s ? (n._next = s._next, s._next = n) : (n._next = t[r], t[r] = n), n._next ? n._next._prev = n : t[i] = n, n._prev = s, n.parent = n._dp = t, n
    },
    wf = function(t, n, r, i) {
        r === void 0 && (r = "_first"), i === void 0 && (i = "_last");
        var o = n._prev,
            s = n._next;
        o ? o._next = s : t[r] === n && (t[r] = s), s ? s._prev = o : t[i] === n && (t[i] = o), n._next = n._prev = n.parent = null
    },
    fi = function(t, n) {
        t.parent && (!n || t.parent.autoRemoveChildren) && t.parent.remove && t.parent.remove(t), t._act = 0
    },
    Vi = function(t, n) {
        if (t && (!n || n._end > t._dur || n._start < 0))
            for (var r = t; r;) r._dirty = 1, r = r.parent;
        return t
    },
    dj = function(t) {
        for (var n = t.parent; n && n.parent;) n._dirty = 1, n.totalDuration(), n = n.parent;
        return t
    },
    Ap = function(t, n, r, i) {
        return t._startAt && (it ? t._startAt.revert(Ll) : t.vars.immediateRender && !t.vars.autoRevert || t._startAt.render(n, !0, i))
    },
    pj = function e(t) {
        return !t || t._ts && e(t.parent)
    },
    N_ = function(t) {
        return t._repeat ? As(t._tTime, t = t.duration() + t._rDelay) * t : 0
    },
    As = function(t, n) {
        var r = Math.floor(t /= n);
        return t && r === t ? r - 1 : r
    },
    Ec = function(t, n) {
        return (t - n._start) * n._ts + (n._ts >= 0 ? 0 : n._dirty ? n.totalDuration() : n._tDur)
    },
    xf = function(t) {
        return t._end = ze(t._start + (t._tDur / Math.abs(t._ts || t._rts || de) || 0))
    },
    Tf = function(t, n) {
        var r = t._dp;
        return r && r.smoothChildTiming && t._ts && (t._start = ze(r._time - (t._ts > 0 ? n / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - n) / -t._ts)), xf(t), r._dirty || Vi(r, t)), t
    },
    aT = function(t, n) {
        var r;
        if ((n._time || !n._dur && n._initted || n._start < t._time && (n._dur || !n.add)) && (r = Ec(t.rawTime(), n), (!n._dur || Nu(0, n.totalDuration(), r) - n._tTime > de) && n.render(r, !0)), Vi(t, n)._dp && t._initted && t._time >= t._dur && t._ts) {
            if (t._dur < t.duration())
                for (r = t; r._dp;) r.rawTime() >= 0 && r.totalTime(r._tTime), r = r._dp;
            t._zTime = -de
        }
    },
    qn = function(t, n, r, i) {
        return n.parent && fi(n), n._start = ze((yr(r) ? r : r || t !== Oe ? tn(t, r, n) : t._time) + n._delay), n._end = ze(n._start + (n.totalDuration() / Math.abs(n.timeScale()) || 0)), sT(t, n, "_first", "_last", t._sort ? "_start" : 0), Np(n) || (t._recent = n), i || aT(t, n), t._ts < 0 && Tf(t, t._tTime), t
    },
    uT = function(t, n) {
        return (Kt.ScrollTrigger || iv("scrollTrigger", n)) && Kt.ScrollTrigger.create(n, t)
    },
    lT = function(t, n, r, i, o) {
        if (lv(t, n, o), !t._initted) return 1;
        if (!r && t._pt && !it && (t._dur && t.vars.lazy !== !1 || !t._dur && t.vars.lazy) && tT !== Gt.frame) return oi.push(t), t._lazy = [o, i], 1
    },
    mj = function e(t) {
        var n = t.parent;
        return n && n._ts && n._initted && !n._lock && (n.rawTime() < 0 || e(n))
    },
    Np = function(t) {
        var n = t.data;
        return n === "isFromStart" || n === "isStart"
    },
    vj = function(t, n, r, i) {
        var o = t.ratio,
            s = n < 0 || !n && (!t._start && mj(t) && !(!t._initted && Np(t)) || (t._ts < 0 || t._dp._ts < 0) && !Np(t)) ? 0 : 1,
            a = t._rDelay,
            u = 0,
            l, c, f;
        if (a && t._repeat && (u = Nu(0, t._tDur, n), c = As(u, a), t._yoyo && c & 1 && (s = 1 - s), c !== As(t._tTime, a) && (o = 1 - s, t.vars.repeatRefresh && t._initted && t.invalidate())), s !== o || it || i || t._zTime === de || !n && t._zTime) {
            if (!t._initted && lT(t, n, i, r, u)) return;
            for (f = t._zTime, t._zTime = n || (r ? de : 0), r || (r = n && !f), t.ratio = s, t._from && (s = 1 - s), t._time = 0, t._tTime = u, l = t._pt; l;) l.r(s, l.d), l = l._next;
            n < 0 && Ap(t, n, r, !0), t._onUpdate && !r && Wt(t, "onUpdate"), u && t._repeat && !r && t.parent && Wt(t, "onRepeat"), (n >= t._tDur || n < 0) && t.ratio === s && (s && fi(t, 1), !r && !it && (Wt(t, s ? "onComplete" : "onReverseComplete", !0), t._prom && t._prom()))
        } else t._zTime || (t._zTime = n)
    },
    gj = function(t, n, r) {
        var i;
        if (r > n)
            for (i = t._first; i && i._start <= r;) {
                if (i.data === "isPause" && i._start > n) return i;
                i = i._next
            } else
                for (i = t._last; i && i._start >= r;) {
                    if (i.data === "isPause" && i._start < n) return i;
                    i = i._prev
                }
    },
    Ns = function(t, n, r, i) {
        var o = t._repeat,
            s = ze(n) || 0,
            a = t._tTime / t._tDur;
        return a && !i && (t._time *= s / t._dur), t._dur = s, t._tDur = o ? o < 0 ? 1e10 : ze(s * (o + 1) + t._rDelay * o) : s, a > 0 && !i && Tf(t, t._tTime = t._tDur * a), t.parent && xf(t), r || Vi(t.parent, t), t
    },
    D_ = function(t) {
        return t instanceof pt ? Vi(t) : Ns(t, t._dur)
    },
    yj = {
        _start: 0,
        endTime: Ja,
        totalDuration: Ja
    },
    tn = function e(t, n, r) {
        var i = t.labels,
            o = t._recent || yj,
            s = t.duration() >= hn ? o.endTime(!1) : t._dur,
            a, u, l;
        return Ve(n) && (isNaN(n) || n in i) ? (u = n.charAt(0), l = n.substr(-1) === "%", a = n.indexOf("="), u === "<" || u === ">" ? (a >= 0 && (n = n.replace(/=/, "")), (u === "<" ? o._start : o.endTime(o._repeat >= 0)) + (parseFloat(n.substr(1)) || 0) * (l ? (a < 0 ? o : r).totalDuration() / 100 : 1)) : a < 0 ? (n in i || (i[n] = s), i[n]) : (u = parseFloat(n.charAt(a - 1) + n.substr(a + 1)), l && r && (u = u / 100 * (ot(r) ? r[0] : r).totalDuration()), a > 1 ? e(t, n.substr(0, a - 1), r) + u : s + u)) : n == null ? s : +n
    },
    Ra = function(t, n, r) {
        var i = yr(n[1]),
            o = (i ? 2 : 1) + (t < 2 ? 0 : 1),
            s = n[o],
            a, u;
        if (i && (s.duration = n[1]), s.parent = r, t) {
            for (a = s, u = r; u && !("immediateRender" in a);) a = u.vars.defaults || {}, u = kt(u.vars.inherit) && u.parent;
            s.immediateRender = kt(a.immediateRender), t < 2 ? s.runBackwards = 1 : s.startAt = n[o - 1]
        }
        return new Ne(n[0], s, n[o + 1])
    },
    yi = function(t, n) {
        return t || t === 0 ? n(t) : n
    },
    Nu = function(t, n, r) {
        return r < t ? t : r > n ? n : r
    },
    rt = function(t, n) {
        return !Ve(t) || !(n = aj.exec(t)) ? "" : n[1]
    },
    _j = function(t, n, r) {
        return yi(r, function(i) {
            return Nu(t, n, i)
        })
    },
    Dp = [].slice,
    cT = function(t, n) {
        return t && er(t) && "length" in t && (!n && !t.length || t.length - 1 in t && er(t[0])) && !t.nodeType && t !== Bn
    },
    Ej = function(t, n, r) {
        return r === void 0 && (r = []), t.forEach(function(i) {
            var o;
            return Ve(i) && !n || cT(i, 1) ? (o = r).push.apply(o, dn(i)) : r.push(i)
        }) || r
    },
    dn = function(t, n, r) {
        return xe && !n && xe.selector ? xe.selector(t) : Ve(t) && !r && (Ip || !Ds()) ? Dp.call((n || rv).querySelectorAll(t), 0) : ot(t) ? Ej(t, r) : cT(t) ? Dp.call(t, 0) : t ? [t] : []
    },
    Fp = function(t) {
        return t = dn(t)[0] || Za("Invalid scope") || {},
            function(n) {
                var r = t.current || t.nativeElement || t;
                return dn(n, r.querySelectorAll ? r : r === t ? Za("Invalid scope") || rv.createElement("div") : t)
            }
    },
    fT = function(t) {
        return t.sort(function() {
            return .5 - Math.random()
        })
    },
    hT = function(t) {
        if (Ie(t)) return t;
        var n = er(t) ? t : {
                each: t
            },
            r = Wi(n.ease),
            i = n.from || 0,
            o = parseFloat(n.base) || 0,
            s = {},
            a = i > 0 && i < 1,
            u = isNaN(i) || a,
            l = n.axis,
            c = i,
            f = i;
        return Ve(i) ? c = f = {
                center: .5,
                edges: .5,
                end: 1
            }[i] || 0 : !a && u && (c = i[0], f = i[1]),
            function(h, p, y) {
                var m = (y || n).length,
                    _ = s[m],
                    g, d, v, E, S, w, T, O, b;
                if (!_) {
                    if (b = n.grid === "auto" ? 0 : (n.grid || [1, hn])[1], !b) {
                        for (T = -hn; T < (T = y[b++].getBoundingClientRect().left) && b < m;);
                        b < m && b--
                    }
                    for (_ = s[m] = [], g = u ? Math.min(b, m) * c - .5 : i % b, d = b === hn ? 0 : u ? m * f / b - .5 : i / b | 0, T = 0, O = hn, w = 0; w < m; w++) v = w % b - g, E = d - (w / b | 0), _[w] = S = l ? Math.abs(l === "y" ? E : v) : qx(v * v + E * E), S > T && (T = S), S < O && (O = S);
                    i === "random" && fT(_), _.max = T - O, _.min = O, _.v = m = (parseFloat(n.amount) || parseFloat(n.each) * (b > m ? m - 1 : l ? l === "y" ? m / b : b : Math.max(b, m / b)) || 0) * (i === "edges" ? -1 : 1), _.b = m < 0 ? o - m : o, _.u = rt(n.amount || n.each) || 0, r = r && m < 0 ? wT(r) : r
                }
                return m = (_[h] - _.min) / _.max || 0, ze(_.b + (r ? r(m) : m) * _.v) + _.u
            }
    },
    $p = function(t) {
        var n = Math.pow(10, ((t + "").split(".")[1] || "").length);
        return function(r) {
            var i = ze(Math.round(parseFloat(r) / t) * t * n);
            return (i - i % 1) / n + (yr(r) ? 0 : rt(r))
        }
    },
    dT = function(t, n) {
        var r = ot(t),
            i, o;
        return !r && er(t) && (i = r = t.radius || hn, t.values ? (t = dn(t.values), (o = !yr(t[0])) && (i *= i)) : t = $p(t.increment)), yi(n, r ? Ie(t) ? function(s) {
            return o = t(s), Math.abs(o - s) <= i ? o : s
        } : function(s) {
            for (var a = parseFloat(o ? s.x : s), u = parseFloat(o ? s.y : 0), l = hn, c = 0, f = t.length, h, p; f--;) o ? (h = t[f].x - a, p = t[f].y - u, h = h * h + p * p) : h = Math.abs(t[f] - a), h < l && (l = h, c = f);
            return c = !i || l <= i ? t[c] : s, o || c === s || yr(s) ? c : c + rt(s)
        } : $p(t))
    },
    pT = function(t, n, r, i) {
        return yi(ot(t) ? !n : r === !0 ? !!(r = 0) : !i, function() {
            return ot(t) ? t[~~(Math.random() * t.length)] : (r = r || 1e-5) && (i = r < 1 ? Math.pow(10, (r + "").length - 2) : 1) && Math.floor(Math.round((t - r / 2 + Math.random() * (n - t + r * .99)) / r) * r * i) / i
        })
    },
    Sj = function() {
        for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
        return function(i) {
            return n.reduce(function(o, s) {
                return s(o)
            }, i)
        }
    },
    wj = function(t, n) {
        return function(r) {
            return t(parseFloat(r)) + (n || rt(r))
        }
    },
    xj = function(t, n, r) {
        return vT(t, n, 0, 1, r)
    },
    mT = function(t, n, r) {
        return yi(r, function(i) {
            return t[~~n(i)]
        })
    },
    Tj = function e(t, n, r) {
        var i = n - t;
        return ot(t) ? mT(t, e(0, t.length), n) : yi(r, function(o) {
            return (i + (o - t) % i) % i + t
        })
    },
    Oj = function e(t, n, r) {
        var i = n - t,
            o = i * 2;
        return ot(t) ? mT(t, e(0, t.length - 1), n) : yi(r, function(s) {
            return s = (o + (s - t) % o) % o || 0, t + (s > i ? o - s : s)
        })
    },
    eu = function(t) {
        for (var n = 0, r = "", i, o, s, a; ~(i = t.indexOf("random(", n));) s = t.indexOf(")", i), a = t.charAt(i + 7) === "[", o = t.substr(i + 7, s - i - 7).match(a ? Yx : Mp), r += t.substr(n, i - n) + pT(a ? o : +o[0], a ? 0 : +o[1], +o[2] || 1e-5), n = s + 1;
        return r + t.substr(n, t.length - n)
    },
    vT = function(t, n, r, i, o) {
        var s = n - t,
            a = i - r;
        return yi(o, function(u) {
            return r + ((u - t) / s * a || 0)
        })
    },
    bj = function e(t, n, r, i) {
        var o = isNaN(t + n) ? 0 : function(p) {
            return (1 - p) * t + p * n
        };
        if (!o) {
            var s = Ve(t),
                a = {},
                u, l, c, f, h;
            if (r === !0 && (i = 1) && (r = null), s) t = {
                p: t
            }, n = {
                p: n
            };
            else if (ot(t) && !ot(n)) {
                for (c = [], f = t.length, h = f - 2, l = 1; l < f; l++) c.push(e(t[l - 1], t[l]));
                f--, o = function(y) {
                    y *= f;
                    var m = Math.min(h, ~~y);
                    return c[m](y - m)
                }, r = n
            } else i || (t = oo(ot(t) ? [] : {}, t));
            if (!c) {
                for (u in n) uv.call(a, t, u, "get", n[u]);
                o = function(y) {
                    return hv(y, a) || (s ? t.p : t)
                }
            }
        }
        return yi(r, o)
    },
    F_ = function(t, n, r) {
        var i = t.labels,
            o = hn,
            s, a, u;
        for (s in i) a = i[s] - n, a < 0 == !!r && a && o > (a = Math.abs(a)) && (u = s, o = a);
        return u
    },
    Wt = function(t, n, r) {
        var i = t.vars,
            o = i[n],
            s = xe,
            a = t._ctx,
            u, l, c;
        if (o) return u = i[n + "Params"], l = i.callbackScope || t, r && oi.length && yc(), a && (xe = a), c = u ? o.apply(l, u) : o.call(l), xe = s, c
    },
    va = function(t) {
        return fi(t), t.scrollTrigger && t.scrollTrigger.kill(!!it), t.progress() < 1 && Wt(t, "onInterrupt"), t
    },
    Ho, gT = [],
    yT = function(t) {
        if (t)
            if (t = !t.name && t.default || t, nv() || t.headless) {
                var n = t.name,
                    r = Ie(t),
                    i = n && !r && t.init ? function() {
                        this._props = []
                    } : t,
                    o = {
                        init: Ja,
                        render: hv,
                        add: uv,
                        kill: Uj,
                        modifier: Hj,
                        rawVars: 0
                    },
                    s = {
                        targetTest: 0,
                        get: 0,
                        getSetter: fv,
                        aliases: {},
                        register: 0
                    };
                if (Ds(), t !== i) {
                    if (Ht[n]) return;
                    yn(i, yn(_c(t, o), s)), oo(i.prototype, oo(o, _c(t, s))), Ht[i.prop = n] = i, t.targetTest && (Al.push(i), ov[n] = 1), n = (n === "css" ? "CSS" : n.charAt(0).toUpperCase() + n.substr(1)) + "Plugin"
                }
                eT(n, i), t.register && t.register(At, i, It)
            } else gT.push(t)
    },
    fe = 255,
    ga = {
        aqua: [0, fe, fe],
        lime: [0, fe, 0],
        silver: [192, 192, 192],
        black: [0, 0, 0],
        maroon: [128, 0, 0],
        teal: [0, 128, 128],
        blue: [0, 0, fe],
        navy: [0, 0, 128],
        white: [fe, fe, fe],
        olive: [128, 128, 0],
        yellow: [fe, fe, 0],
        orange: [fe, 165, 0],
        gray: [128, 128, 128],
        purple: [128, 0, 128],
        green: [0, 128, 0],
        red: [fe, 0, 0],
        pink: [fe, 192, 203],
        cyan: [0, fe, fe],
        transparent: [fe, fe, fe, 0]
    },
    Bh = function(t, n, r) {
        return t += t < 0 ? 1 : t > 1 ? -1 : 0, (t * 6 < 1 ? n + (r - n) * t * 6 : t < .5 ? r : t * 3 < 2 ? n + (r - n) * (2 / 3 - t) * 6 : n) * fe + .5 | 0
    },
    _T = function(t, n, r) {
        var i = t ? yr(t) ? [t >> 16, t >> 8 & fe, t & fe] : 0 : ga.black,
            o, s, a, u, l, c, f, h, p, y;
        if (!i) {
            if (t.substr(-1) === "," && (t = t.substr(0, t.length - 1)), ga[t]) i = ga[t];
            else if (t.charAt(0) === "#") {
                if (t.length < 6 && (o = t.charAt(1), s = t.charAt(2), a = t.charAt(3), t = "#" + o + o + s + s + a + a + (t.length === 5 ? t.charAt(4) + t.charAt(4) : "")), t.length === 9) return i = parseInt(t.substr(1, 6), 16), [i >> 16, i >> 8 & fe, i & fe, parseInt(t.substr(7), 16) / 255];
                t = parseInt(t.substr(1), 16), i = [t >> 16, t >> 8 & fe, t & fe]
            } else if (t.substr(0, 3) === "hsl") {
                if (i = y = t.match(Mp), !n) u = +i[0] % 360 / 360, l = +i[1] / 100, c = +i[2] / 100, s = c <= .5 ? c * (l + 1) : c + l - c * l, o = c * 2 - s, i.length > 3 && (i[3] *= 1), i[0] = Bh(u + 1 / 3, o, s), i[1] = Bh(u, o, s), i[2] = Bh(u - 1 / 3, o, s);
                else if (~t.indexOf("=")) return i = t.match(Qx), r && i.length < 4 && (i[3] = 1), i
            } else i = t.match(Mp) || ga.transparent;
            i = i.map(Number)
        }
        return n && !y && (o = i[0] / fe, s = i[1] / fe, a = i[2] / fe, f = Math.max(o, s, a), h = Math.min(o, s, a), c = (f + h) / 2, f === h ? u = l = 0 : (p = f - h, l = c > .5 ? p / (2 - f - h) : p / (f + h), u = f === o ? (s - a) / p + (s < a ? 6 : 0) : f === s ? (a - o) / p + 2 : (o - s) / p + 4, u *= 60), i[0] = ~~(u + .5), i[1] = ~~(l * 100 + .5), i[2] = ~~(c * 100 + .5)), r && i.length < 4 && (i[3] = 1), i
    },
    ET = function(t) {
        var n = [],
            r = [],
            i = -1;
        return t.split(si).forEach(function(o) {
            var s = o.match(jo) || [];
            n.push.apply(n, s), r.push(i += s.length + 1)
        }), n.c = r, n
    },
    $_ = function(t, n, r) {
        var i = "",
            o = (t + i).match(si),
            s = n ? "hsla(" : "rgba(",
            a = 0,
            u, l, c, f;
        if (!o) return t;
        if (o = o.map(function(h) {
                return (h = _T(h, n, 1)) && s + (n ? h[0] + "," + h[1] + "%," + h[2] + "%," + h[3] : h.join(",")) + ")"
            }), r && (c = ET(t), u = r.c, u.join(i) !== c.c.join(i)))
            for (l = t.replace(si, "1").split(jo), f = l.length - 1; a < f; a++) i += l[a] + (~u.indexOf(a) ? o.shift() || s + "0,0,0,0)" : (c.length ? c : o.length ? o : r).shift());
        if (!l)
            for (l = t.split(si), f = l.length - 1; a < f; a++) i += l[a] + o[a];
        return i + l[f]
    },
    si = function() {
        var e = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",
            t;
        for (t in ga) e += "|" + t + "\\b";
        return new RegExp(e + ")", "gi")
    }(),
    Pj = /hsl[a]?\(/,
    ST = function(t) {
        var n = t.join(" "),
            r;
        if (si.lastIndex = 0, si.test(n)) return r = Pj.test(n), t[1] = $_(t[1], r), t[0] = $_(t[0], r, ET(t[1])), !0
    },
    tu, Gt = function() {
        var e = Date.now,
            t = 500,
            n = 33,
            r = e(),
            i = r,
            o = 1e3 / 240,
            s = o,
            a = [],
            u, l, c, f, h, p, y = function m(_) {
                var g = e() - i,
                    d = _ === !0,
                    v, E, S, w;
                if ((g > t || g < 0) && (r += g - n), i += g, S = i - r, v = S - s, (v > 0 || d) && (w = ++f.frame, h = S - f.time * 1e3, f.time = S = S / 1e3, s += v + (v >= o ? 4 : o - v), E = 1), d || (u = l(m)), E)
                    for (p = 0; p < a.length; p++) a[p](S, h, w, _)
            };
        return f = {
            time: 0,
            frame: 0,
            tick: function() {
                y(!0)
            },
            deltaRatio: function(_) {
                return h / (1e3 / (_ || 60))
            },
            wake: function() {
                Zx && (!Ip && nv() && (Bn = Ip = window, rv = Bn.document || {}, Kt.gsap = At, (Bn.gsapVersions || (Bn.gsapVersions = [])).push(At.version), Jx(gc || Bn.GreenSockGlobals || !Bn.gsap && Bn || {}), gT.forEach(yT)), c = typeof requestAnimationFrame < "u" && requestAnimationFrame, u && f.sleep(), l = c || function(_) {
                    return setTimeout(_, s - f.time * 1e3 + 1 | 0)
                }, tu = 1, y(2))
            },
            sleep: function() {
                (c ? cancelAnimationFrame : clearTimeout)(u), tu = 0, l = Ja
            },
            lagSmoothing: function(_, g) {
                t = _ || 1 / 0, n = Math.min(g || 33, t)
            },
            fps: function(_) {
                o = 1e3 / (_ || 240), s = f.time * 1e3 + o
            },
            add: function(_, g, d) {
                var v = g ? function(E, S, w, T) {
                    _(E, S, w, T), f.remove(v)
                } : _;
                return f.remove(_), a[d ? "unshift" : "push"](v), Ds(), v
            },
            remove: function(_, g) {
                ~(g = a.indexOf(_)) && a.splice(g, 1) && p >= g && p--
            },
            _listeners: a
        }, f
    }(),
    Ds = function() {
        return !tu && Gt.wake()
    },
    ee = {},
    Cj = /^[\d.\-M][\d.\-,\s]/,
    Rj = /["']/g,
    kj = function(t) {
        for (var n = {}, r = t.substr(1, t.length - 3).split(":"), i = r[0], o = 1, s = r.length, a, u, l; o < s; o++) u = r[o], a = o !== s - 1 ? u.lastIndexOf(",") : u.length, l = u.substr(0, a), n[i] = isNaN(l) ? l.replace(Rj, "").trim() : +l, i = u.substr(a + 1).trim();
        return n
    },
    Mj = function(t) {
        var n = t.indexOf("(") + 1,
            r = t.indexOf(")"),
            i = t.indexOf("(", n);
        return t.substring(n, ~i && i < r ? t.indexOf(")", r + 1) : r)
    },
    Ij = function(t) {
        var n = (t + "").split("("),
            r = ee[n[0]];
        return r && n.length > 1 && r.config ? r.config.apply(null, ~t.indexOf("{") ? [kj(n[1])] : Mj(t).split(",").map(iT)) : ee._CE && Cj.test(t) ? ee._CE("", t) : r
    },
    wT = function(t) {
        return function(n) {
            return 1 - t(1 - n)
        }
    },
    xT = function e(t, n) {
        for (var r = t._first, i; r;) r instanceof pt ? e(r, n) : r.vars.yoyoEase && (!r._yoyo || !r._repeat) && r._yoyo !== n && (r.timeline ? e(r.timeline, n) : (i = r._ease, r._ease = r._yEase, r._yEase = i, r._yoyo = n)), r = r._next
    },
    Wi = function(t, n) {
        return t && (Ie(t) ? t : ee[t] || Ij(t)) || n
    },
    yo = function(t, n, r, i) {
        r === void 0 && (r = function(u) {
            return 1 - n(1 - u)
        }), i === void 0 && (i = function(u) {
            return u < .5 ? n(u * 2) / 2 : 1 - n((1 - u) * 2) / 2
        });
        var o = {
                easeIn: n,
                easeOut: r,
                easeInOut: i
            },
            s;
        return Mt(t, function(a) {
            ee[a] = Kt[a] = o, ee[s = a.toLowerCase()] = r;
            for (var u in o) ee[s + (u === "easeIn" ? ".in" : u === "easeOut" ? ".out" : ".inOut")] = ee[a + "." + u] = o[u]
        }), o
    },
    TT = function(t) {
        return function(n) {
            return n < .5 ? (1 - t(1 - n * 2)) / 2 : .5 + t((n - .5) * 2) / 2
        }
    },
    jh = function e(t, n, r) {
        var i = n >= 1 ? n : 1,
            o = (r || (t ? .3 : .45)) / (n < 1 ? n : 1),
            s = o / kp * (Math.asin(1 / i) || 0),
            a = function(c) {
                return c === 1 ? 1 : i * Math.pow(2, -10 * c) * sj((c - s) * o) + 1
            },
            u = t === "out" ? a : t === "in" ? function(l) {
                return 1 - a(1 - l)
            } : TT(a);
        return o = kp / o, u.config = function(l, c) {
            return e(t, l, c)
        }, u
    },
    Hh = function e(t, n) {
        n === void 0 && (n = 1.70158);
        var r = function(s) {
                return s ? --s * s * ((n + 1) * s + n) + 1 : 0
            },
            i = t === "out" ? r : t === "in" ? function(o) {
                return 1 - r(1 - o)
            } : TT(r);
        return i.config = function(o) {
            return e(t, o)
        }, i
    };
Mt("Linear,Quad,Cubic,Quart,Quint,Strong", function(e, t) {
    var n = t < 5 ? t + 1 : t;
    yo(e + ",Power" + (n - 1), t ? function(r) {
        return Math.pow(r, n)
    } : function(r) {
        return r
    }, function(r) {
        return 1 - Math.pow(1 - r, n)
    }, function(r) {
        return r < .5 ? Math.pow(r * 2, n) / 2 : 1 - Math.pow((1 - r) * 2, n) / 2
    })
});
ee.Linear.easeNone = ee.none = ee.Linear.easeIn;
yo("Elastic", jh("in"), jh("out"), jh());
(function(e, t) {
    var n = 1 / t,
        r = 2 * n,
        i = 2.5 * n,
        o = function(a) {
            return a < n ? e * a * a : a < r ? e * Math.pow(a - 1.5 / t, 2) + .75 : a < i ? e * (a -= 2.25 / t) * a + .9375 : e * Math.pow(a - 2.625 / t, 2) + .984375
        };
    yo("Bounce", function(s) {
        return 1 - o(1 - s)
    }, o)
})(7.5625, 2.75);
yo("Expo", function(e) {
    return e ? Math.pow(2, 10 * (e - 1)) : 0
});
yo("Circ", function(e) {
    return -(qx(1 - e * e) - 1)
});
yo("Sine", function(e) {
    return e === 1 ? 1 : -oj(e * rj) + 1
});
yo("Back", Hh("in"), Hh("out"), Hh());
ee.SteppedEase = ee.steps = Kt.SteppedEase = {
    config: function(t, n) {
        t === void 0 && (t = 1);
        var r = 1 / t,
            i = t + (n ? 0 : 1),
            o = n ? 1 : 0,
            s = 1 - de;
        return function(a) {
            return ((i * Nu(0, s, a) | 0) + o) * r
        }
    }
};
Ls.ease = ee["quad.out"];
Mt("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(e) {
    return sv += e + "," + e + "Params,"
});
var OT = function(t, n) {
        this.id = ij++, t._gsap = this, this.target = t, this.harness = n, this.get = n ? n.get : nT, this.set = n ? n.getSetter : fv
    },
    nu = function() {
        function e(n) {
            this.vars = n, this._delay = +n.delay || 0, (this._repeat = n.repeat === 1 / 0 ? -2 : n.repeat || 0) && (this._rDelay = n.repeatDelay || 0, this._yoyo = !!n.yoyo || !!n.yoyoEase), this._ts = 1, Ns(this, +n.duration, 1, 1), this.data = n.data, xe && (this._ctx = xe, xe.data.push(this)), tu || Gt.wake()
        }
        var t = e.prototype;
        return t.delay = function(r) {
            return r || r === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + r - this._delay), this._delay = r, this) : this._delay
        }, t.duration = function(r) {
            return arguments.length ? this.totalDuration(this._repeat > 0 ? r + (r + this._rDelay) * this._repeat : r) : this.totalDuration() && this._dur
        }, t.totalDuration = function(r) {
            return arguments.length ? (this._dirty = 0, Ns(this, this._repeat < 0 ? r : (r - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur
        }, t.totalTime = function(r, i) {
            if (Ds(), !arguments.length) return this._tTime;
            var o = this._dp;
            if (o && o.smoothChildTiming && this._ts) {
                for (Tf(this, r), !o._dp || o.parent || aT(o, this); o && o.parent;) o.parent._time !== o._start + (o._ts >= 0 ? o._tTime / o._ts : (o.totalDuration() - o._tTime) / -o._ts) && o.totalTime(o._tTime, !0), o = o.parent;
                !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && r < this._tDur || this._ts < 0 && r > 0 || !this._tDur && !r) && qn(this._dp, this, this._start - this._delay)
            }
            return (this._tTime !== r || !this._dur && !i || this._initted && Math.abs(this._zTime) === de || !r && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = r), rT(this, r, i)), this
        }, t.time = function(r, i) {
            return arguments.length ? this.totalTime(Math.min(this.totalDuration(), r + N_(this)) % (this._dur + this._rDelay) || (r ? this._dur : 0), i) : this._time
        }, t.totalProgress = function(r, i) {
            return arguments.length ? this.totalTime(this.totalDuration() * r, i) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() > 0 ? 1 : 0
        }, t.progress = function(r, i) {
            return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - r : r) + N_(this), i) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0
        }, t.iteration = function(r, i) {
            var o = this.duration() + this._rDelay;
            return arguments.length ? this.totalTime(this._time + (r - 1) * o, i) : this._repeat ? As(this._tTime, o) + 1 : 1
        }, t.timeScale = function(r, i) {
            if (!arguments.length) return this._rts === -de ? 0 : this._rts;
            if (this._rts === r) return this;
            var o = this.parent && this._ts ? Ec(this.parent._time, this) : this._tTime;
            return this._rts = +r || 0, this._ts = this._ps || r === -de ? 0 : this._rts, this.totalTime(Nu(-Math.abs(this._delay), this._tDur, o), i !== !1), xf(this), dj(this)
        }, t.paused = function(r) {
            return arguments.length ? (this._ps !== r && (this._ps = r, r ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (Ds(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== de && (this._tTime -= de)))), this) : this._ps
        }, t.startTime = function(r) {
            if (arguments.length) {
                this._start = r;
                var i = this.parent || this._dp;
                return i && (i._sort || !this.parent) && qn(i, this, r - this._delay), this
            }
            return this._start
        }, t.endTime = function(r) {
            return this._start + (kt(r) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1)
        }, t.rawTime = function(r) {
            var i = this.parent || this._dp;
            return i ? r && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? Ec(i.rawTime(r), this) : this._tTime : this._tTime
        }, t.revert = function(r) {
            r === void 0 && (r = lj);
            var i = it;
            return it = r, (this._initted || this._startAt) && (this.timeline && this.timeline.revert(r), this.totalTime(-.01, r.suppressEvents)), this.data !== "nested" && r.kill !== !1 && this.kill(), it = i, this
        }, t.globalTime = function(r) {
            for (var i = this, o = arguments.length ? r : i.rawTime(); i;) o = i._start + o / (Math.abs(i._ts) || 1), i = i._dp;
            return !this.parent && this._sat ? this._sat.globalTime(r) : o
        }, t.repeat = function(r) {
            return arguments.length ? (this._repeat = r === 1 / 0 ? -2 : r, D_(this)) : this._repeat === -2 ? 1 / 0 : this._repeat
        }, t.repeatDelay = function(r) {
            if (arguments.length) {
                var i = this._time;
                return this._rDelay = r, D_(this), i ? this.time(i) : this
            }
            return this._rDelay
        }, t.yoyo = function(r) {
            return arguments.length ? (this._yoyo = r, this) : this._yoyo
        }, t.seek = function(r, i) {
            return this.totalTime(tn(this, r), kt(i))
        }, t.restart = function(r, i) {
            return this.play().totalTime(r ? -this._delay : 0, kt(i))
        }, t.play = function(r, i) {
            return r != null && this.seek(r, i), this.reversed(!1).paused(!1)
        }, t.reverse = function(r, i) {
            return r != null && this.seek(r || this.totalDuration(), i), this.reversed(!0).paused(!1)
        }, t.pause = function(r, i) {
            return r != null && this.seek(r, i), this.paused(!0)
        }, t.resume = function() {
            return this.paused(!1)
        }, t.reversed = function(r) {
            return arguments.length ? (!!r !== this.reversed() && this.timeScale(-this._rts || (r ? -de : 0)), this) : this._rts < 0
        }, t.invalidate = function() {
            return this._initted = this._act = 0, this._zTime = -de, this
        }, t.isActive = function() {
            var r = this.parent || this._dp,
                i = this._start,
                o;
            return !!(!r || this._ts && this._initted && r.isActive() && (o = r.rawTime(!0)) >= i && o < this.endTime(!0) - de)
        }, t.eventCallback = function(r, i, o) {
            var s = this.vars;
            return arguments.length > 1 ? (i ? (s[r] = i, o && (s[r + "Params"] = o), r === "onUpdate" && (this._onUpdate = i)) : delete s[r], this) : s[r]
        }, t.then = function(r) {
            var i = this;
            return new Promise(function(o) {
                var s = Ie(r) ? r : oT,
                    a = function() {
                        var l = i.then;
                        i.then = null, Ie(s) && (s = s(i)) && (s.then || s === i) && (i.then = l), o(s), i.then = l
                    };
                i._initted && i.totalProgress() === 1 && i._ts >= 0 || !i._tTime && i._ts < 0 ? a() : i._prom = a
            })
        }, t.kill = function() {
            va(this)
        }, e
    }();
yn(nu.prototype, {
    _time: 0,
    _start: 0,
    _end: 0,
    _tTime: 0,
    _tDur: 0,
    _dirty: 0,
    _repeat: 0,
    _yoyo: !1,
    parent: null,
    _initted: !1,
    _rDelay: 0,
    _ts: 1,
    _dp: 0,
    ratio: 0,
    _zTime: -de,
    _prom: 0,
    _ps: !1,
    _rts: 1
});
var pt = function(e) {
    Wx(t, e);

    function t(r, i) {
        var o;
        return r === void 0 && (r = {}), o = e.call(this, r) || this, o.labels = {}, o.smoothChildTiming = !!r.smoothChildTiming, o.autoRemoveChildren = !!r.autoRemoveChildren, o._sort = kt(r.sortChildren), Oe && qn(r.parent || Oe, ir(o), i), r.reversed && o.reverse(), r.paused && o.paused(!0), r.scrollTrigger && uT(ir(o), r.scrollTrigger), o
    }
    var n = t.prototype;
    return n.to = function(i, o, s) {
        return Ra(0, arguments, this), this
    }, n.from = function(i, o, s) {
        return Ra(1, arguments, this), this
    }, n.fromTo = function(i, o, s, a) {
        return Ra(2, arguments, this), this
    }, n.set = function(i, o, s) {
        return o.duration = 0, o.parent = this, Ca(o).repeatDelay || (o.repeat = 0), o.immediateRender = !!o.immediateRender, new Ne(i, o, tn(this, s), 1), this
    }, n.call = function(i, o, s) {
        return qn(this, Ne.delayedCall(0, i, o), s)
    }, n.staggerTo = function(i, o, s, a, u, l, c) {
        return s.duration = o, s.stagger = s.stagger || a, s.onComplete = l, s.onCompleteParams = c, s.parent = this, new Ne(i, s, tn(this, u)), this
    }, n.staggerFrom = function(i, o, s, a, u, l, c) {
        return s.runBackwards = 1, Ca(s).immediateRender = kt(s.immediateRender), this.staggerTo(i, o, s, a, u, l, c)
    }, n.staggerFromTo = function(i, o, s, a, u, l, c, f) {
        return a.startAt = s, Ca(a).immediateRender = kt(a.immediateRender), this.staggerTo(i, o, a, u, l, c, f)
    }, n.render = function(i, o, s) {
        var a = this._time,
            u = this._dirty ? this.totalDuration() : this._tDur,
            l = this._dur,
            c = i <= 0 ? 0 : ze(i),
            f = this._zTime < 0 != i < 0 && (this._initted || !l),
            h, p, y, m, _, g, d, v, E, S, w, T;
        if (this !== Oe && c > u && i >= 0 && (c = u), c !== this._tTime || s || f) {
            if (a !== this._time && l && (c += this._time - a, i += this._time - a), h = c, E = this._start, v = this._ts, g = !v, f && (l || (a = this._zTime), (i || !o) && (this._zTime = i)), this._repeat) {
                if (w = this._yoyo, _ = l + this._rDelay, this._repeat < -1 && i < 0) return this.totalTime(_ * 100 + i, o, s);
                if (h = ze(c % _), c === u ? (m = this._repeat, h = l) : (m = ~~(c / _), m && m === c / _ && (h = l, m--), h > l && (h = l)), S = As(this._tTime, _), !a && this._tTime && S !== m && this._tTime - S * _ - this._dur <= 0 && (S = m), w && m & 1 && (h = l - h, T = 1), m !== S && !this._lock) {
                    var O = w && S & 1,
                        b = O === (w && m & 1);
                    if (m < S && (O = !O), a = O ? 0 : c % l ? l : c, this._lock = 1, this.render(a || (T ? 0 : ze(m * _)), o, !l)._lock = 0, this._tTime = c, !o && this.parent && Wt(this, "onRepeat"), this.vars.repeatRefresh && !T && (this.invalidate()._lock = 1), a && a !== this._time || g !== !this._ts || this.vars.onRepeat && !this.parent && !this._act) return this;
                    if (l = this._dur, u = this._tDur, b && (this._lock = 2, a = O ? l : -1e-4, this.render(a, !0), this.vars.repeatRefresh && !T && this.invalidate()), this._lock = 0, !this._ts && !g) return this;
                    xT(this, T)
                }
            }
            if (this._hasPause && !this._forcing && this._lock < 2 && (d = gj(this, ze(a), ze(h)), d && (c -= h - (h = d._start))), this._tTime = c, this._time = h, this._act = !v, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = i, a = 0), !a && h && !o && !m && (Wt(this, "onStart"), this._tTime !== c)) return this;
            if (h >= a && i >= 0)
                for (p = this._first; p;) {
                    if (y = p._next, (p._act || h >= p._start) && p._ts && d !== p) {
                        if (p.parent !== this) return this.render(i, o, s);
                        if (p.render(p._ts > 0 ? (h - p._start) * p._ts : (p._dirty ? p.totalDuration() : p._tDur) + (h - p._start) * p._ts, o, s), h !== this._time || !this._ts && !g) {
                            d = 0, y && (c += this._zTime = -de);
                            break
                        }
                    }
                    p = y
                } else {
                    p = this._last;
                    for (var I = i < 0 ? i : h; p;) {
                        if (y = p._prev, (p._act || I <= p._end) && p._ts && d !== p) {
                            if (p.parent !== this) return this.render(i, o, s);
                            if (p.render(p._ts > 0 ? (I - p._start) * p._ts : (p._dirty ? p.totalDuration() : p._tDur) + (I - p._start) * p._ts, o, s || it && (p._initted || p._startAt)), h !== this._time || !this._ts && !g) {
                                d = 0, y && (c += this._zTime = I ? -de : de);
                                break
                            }
                        }
                        p = y
                    }
                }
            if (d && !o && (this.pause(), d.render(h >= a ? 0 : -de)._zTime = h >= a ? 1 : -1, this._ts)) return this._start = E, xf(this), this.render(i, o, s);
            this._onUpdate && !o && Wt(this, "onUpdate", !0), (c === u && this._tTime >= this.totalDuration() || !c && a) && (E === this._start || Math.abs(v) !== Math.abs(this._ts)) && (this._lock || ((i || !l) && (c === u && this._ts > 0 || !c && this._ts < 0) && fi(this, 1), !o && !(i < 0 && !a) && (c || a || !u) && (Wt(this, c === u && i >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(c < u && this.timeScale() > 0) && this._prom())))
        }
        return this
    }, n.add = function(i, o) {
        var s = this;
        if (yr(o) || (o = tn(this, o, i)), !(i instanceof nu)) {
            if (ot(i)) return i.forEach(function(a) {
                return s.add(a, o)
            }), this;
            if (Ve(i)) return this.addLabel(i, o);
            if (Ie(i)) i = Ne.delayedCall(0, i);
            else return this
        }
        return this !== i ? qn(this, i, o) : this
    }, n.getChildren = function(i, o, s, a) {
        i === void 0 && (i = !0), o === void 0 && (o = !0), s === void 0 && (s = !0), a === void 0 && (a = -hn);
        for (var u = [], l = this._first; l;) l._start >= a && (l instanceof Ne ? o && u.push(l) : (s && u.push(l), i && u.push.apply(u, l.getChildren(!0, o, s)))), l = l._next;
        return u
    }, n.getById = function(i) {
        for (var o = this.getChildren(1, 1, 1), s = o.length; s--;)
            if (o[s].vars.id === i) return o[s]
    }, n.remove = function(i) {
        return Ve(i) ? this.removeLabel(i) : Ie(i) ? this.killTweensOf(i) : (wf(this, i), i === this._recent && (this._recent = this._last), Vi(this))
    }, n.totalTime = function(i, o) {
        return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = ze(Gt.time - (this._ts > 0 ? i / this._ts : (this.totalDuration() - i) / -this._ts))), e.prototype.totalTime.call(this, i, o), this._forcing = 0, this) : this._tTime
    }, n.addLabel = function(i, o) {
        return this.labels[i] = tn(this, o), this
    }, n.removeLabel = function(i) {
        return delete this.labels[i], this
    }, n.addPause = function(i, o, s) {
        var a = Ne.delayedCall(0, o || Ja, s);
        return a.data = "isPause", this._hasPause = 1, qn(this, a, tn(this, i))
    }, n.removePause = function(i) {
        var o = this._first;
        for (i = tn(this, i); o;) o._start === i && o.data === "isPause" && fi(o), o = o._next
    }, n.killTweensOf = function(i, o, s) {
        for (var a = this.getTweensOf(i, s), u = a.length; u--;) Wr !== a[u] && a[u].kill(i, o);
        return this
    }, n.getTweensOf = function(i, o) {
        for (var s = [], a = dn(i), u = this._first, l = yr(o), c; u;) u instanceof Ne ? cj(u._targets, a) && (l ? (!Wr || u._initted && u._ts) && u.globalTime(0) <= o && u.globalTime(u.totalDuration()) > o : !o || u.isActive()) && s.push(u) : (c = u.getTweensOf(a, o)).length && s.push.apply(s, c), u = u._next;
        return s
    }, n.tweenTo = function(i, o) {
        o = o || {};
        var s = this,
            a = tn(s, i),
            u = o,
            l = u.startAt,
            c = u.onStart,
            f = u.onStartParams,
            h = u.immediateRender,
            p, y = Ne.to(s, yn({
                ease: o.ease || "none",
                lazy: !1,
                immediateRender: !1,
                time: a,
                overwrite: "auto",
                duration: o.duration || Math.abs((a - (l && "time" in l ? l.time : s._time)) / s.timeScale()) || de,
                onStart: function() {
                    if (s.pause(), !p) {
                        var _ = o.duration || Math.abs((a - (l && "time" in l ? l.time : s._time)) / s.timeScale());
                        y._dur !== _ && Ns(y, _, 0, 1).render(y._time, !0, !0), p = 1
                    }
                    c && c.apply(y, f || [])
                }
            }, o));
        return h ? y.render(0) : y
    }, n.tweenFromTo = function(i, o, s) {
        return this.tweenTo(o, yn({
            startAt: {
                time: tn(this, i)
            }
        }, s))
    }, n.recent = function() {
        return this._recent
    }, n.nextLabel = function(i) {
        return i === void 0 && (i = this._time), F_(this, tn(this, i))
    }, n.previousLabel = function(i) {
        return i === void 0 && (i = this._time), F_(this, tn(this, i), 1)
    }, n.currentLabel = function(i) {
        return arguments.length ? this.seek(i, !0) : this.previousLabel(this._time + de)
    }, n.shiftChildren = function(i, o, s) {
        s === void 0 && (s = 0);
        for (var a = this._first, u = this.labels, l; a;) a._start >= s && (a._start += i, a._end += i), a = a._next;
        if (o)
            for (l in u) u[l] >= s && (u[l] += i);
        return Vi(this)
    }, n.invalidate = function(i) {
        var o = this._first;
        for (this._lock = 0; o;) o.invalidate(i), o = o._next;
        return e.prototype.invalidate.call(this, i)
    }, n.clear = function(i) {
        i === void 0 && (i = !0);
        for (var o = this._first, s; o;) s = o._next, this.remove(o), o = s;
        return this._dp && (this._time = this._tTime = this._pTime = 0), i && (this.labels = {}), Vi(this)
    }, n.totalDuration = function(i) {
        var o = 0,
            s = this,
            a = s._last,
            u = hn,
            l, c, f;
        if (arguments.length) return s.timeScale((s._repeat < 0 ? s.duration() : s.totalDuration()) / (s.reversed() ? -i : i));
        if (s._dirty) {
            for (f = s.parent; a;) l = a._prev, a._dirty && a.totalDuration(), c = a._start, c > u && s._sort && a._ts && !s._lock ? (s._lock = 1, qn(s, a, c - a._delay, 1)._lock = 0) : u = c, c < 0 && a._ts && (o -= c, (!f && !s._dp || f && f.smoothChildTiming) && (s._start += c / s._ts, s._time -= c, s._tTime -= c), s.shiftChildren(-c, !1, -1 / 0), u = 0), a._end > o && a._ts && (o = a._end), a = l;
            Ns(s, s === Oe && s._time > o ? s._time : o, 1, 1), s._dirty = 0
        }
        return s._tDur
    }, t.updateRoot = function(i) {
        if (Oe._ts && (rT(Oe, Ec(i, Oe)), tT = Gt.frame), Gt.frame >= L_) {
            L_ += Xt.autoSleep || 120;
            var o = Oe._first;
            if ((!o || !o._ts) && Xt.autoSleep && Gt._listeners.length < 2) {
                for (; o && !o._ts;) o = o._next;
                o || Gt.sleep()
            }
        }
    }, t
}(nu);
yn(pt.prototype, {
    _lock: 0,
    _hasPause: 0,
    _forcing: 0
});
var Lj = function(t, n, r, i, o, s, a) {
        var u = new It(this._pt, t, n, 0, 1, MT, null, o),
            l = 0,
            c = 0,
            f, h, p, y, m, _, g, d;
        for (u.b = r, u.e = i, r += "", i += "", (g = ~i.indexOf("random(")) && (i = eu(i)), s && (d = [r, i], s(d, t, n), r = d[0], i = d[1]), h = r.match(Fh) || []; f = Fh.exec(i);) y = f[0], m = i.substring(l, f.index), p ? p = (p + 1) % 5 : m.substr(-5) === "rgba(" && (p = 1), y !== h[c++] && (_ = parseFloat(h[c - 1]) || 0, u._pt = {
            _next: u._pt,
            p: m || c === 1 ? m : ",",
            s: _,
            c: y.charAt(1) === "=" ? Ko(_, y) - _ : parseFloat(y) - _,
            m: p && p < 4 ? Math.round : 0
        }, l = Fh.lastIndex);
        return u.c = l < i.length ? i.substring(l, i.length) : "", u.fp = a, (Kx.test(i) || g) && (u.e = 0), this._pt = u, u
    },
    uv = function(t, n, r, i, o, s, a, u, l, c) {
        Ie(i) && (i = i(o || 0, t, s));
        var f = t[n],
            h = r !== "get" ? r : Ie(f) ? l ? t[n.indexOf("set") || !Ie(t["get" + n.substr(3)]) ? n : "get" + n.substr(3)](l) : t[n]() : f,
            p = Ie(f) ? l ? $j : RT : cv,
            y;
        if (Ve(i) && (~i.indexOf("random(") && (i = eu(i)), i.charAt(1) === "=" && (y = Ko(h, i) + (rt(h) || 0), (y || y === 0) && (i = y))), !c || h !== i || Bp) return !isNaN(h * i) && i !== "" ? (y = new It(this._pt, t, n, +h || 0, i - (h || 0), typeof f == "boolean" ? jj : kT, 0, p), l && (y.fp = l), a && y.modifier(a, this, t), this._pt = y) : (!f && !(n in t) && iv(n, i), Lj.call(this, t, n, h, i, p, u || Xt.stringFilter, l))
    },
    Aj = function(t, n, r, i, o) {
        if (Ie(t) && (t = ka(t, o, n, r, i)), !er(t) || t.style && t.nodeType || ot(t) || Xx(t)) return Ve(t) ? ka(t, o, n, r, i) : t;
        var s = {},
            a;
        for (a in t) s[a] = ka(t[a], o, n, r, i);
        return s
    },
    bT = function(t, n, r, i, o, s) {
        var a, u, l, c;
        if (Ht[t] && (a = new Ht[t]).init(o, a.rawVars ? n[t] : Aj(n[t], i, o, s, r), r, i, s) !== !1 && (r._pt = u = new It(r._pt, o, t, 0, 1, a.render, a, 0, a.priority), r !== Ho))
            for (l = r._ptLookup[r._targets.indexOf(o)], c = a._props.length; c--;) l[a._props[c]] = u;
        return a
    },
    Wr, Bp, lv = function e(t, n, r) {
        var i = t.vars,
            o = i.ease,
            s = i.startAt,
            a = i.immediateRender,
            u = i.lazy,
            l = i.onUpdate,
            c = i.runBackwards,
            f = i.yoyoEase,
            h = i.keyframes,
            p = i.autoRevert,
            y = t._dur,
            m = t._startAt,
            _ = t._targets,
            g = t.parent,
            d = g && g.data === "nested" ? g.vars.targets : _,
            v = t._overwrite === "auto" && !ev,
            E = t.timeline,
            S, w, T, O, b, I, N, D, G, H, W, V, Y;
        if (E && (!h || !o) && (o = "none"), t._ease = Wi(o, Ls.ease), t._yEase = f ? wT(Wi(f === !0 ? o : f, Ls.ease)) : 0, f && t._yoyo && !t._repeat && (f = t._yEase, t._yEase = t._ease, t._ease = f), t._from = !E && !!i.runBackwards, !E || h && !i.stagger) {
            if (D = _[0] ? Gi(_[0]).harness : 0, V = D && i[D.prop], S = _c(i, ov), m && (m._zTime < 0 && m.progress(1), n < 0 && c && a && !p ? m.render(-1, !0) : m.revert(c && y ? Ll : uj), m._lazy = 0), s) {
                if (fi(t._startAt = Ne.set(_, yn({
                        data: "isStart",
                        overwrite: !1,
                        parent: g,
                        immediateRender: !0,
                        lazy: !m && kt(u),
                        startAt: null,
                        delay: 0,
                        onUpdate: l && function() {
                            return Wt(t, "onUpdate")
                        },
                        stagger: 0
                    }, s))), t._startAt._dp = 0, t._startAt._sat = t, n < 0 && (it || !a && !p) && t._startAt.revert(Ll), a && y && n <= 0 && r <= 0) {
                    n && (t._zTime = n);
                    return
                }
            } else if (c && y && !m) {
                if (n && (a = !1), T = yn({
                        overwrite: !1,
                        data: "isFromStart",
                        lazy: a && !m && kt(u),
                        immediateRender: a,
                        stagger: 0,
                        parent: g
                    }, S), V && (T[D.prop] = V), fi(t._startAt = Ne.set(_, T)), t._startAt._dp = 0, t._startAt._sat = t, n < 0 && (it ? t._startAt.revert(Ll) : t._startAt.render(-1, !0)), t._zTime = n, !a) e(t._startAt, de, de);
                else if (!n) return
            }
            for (t._pt = t._ptCache = 0, u = y && kt(u) || u && !y, w = 0; w < _.length; w++) {
                if (b = _[w], N = b._gsap || av(_)[w]._gsap, t._ptLookup[w] = H = {}, Lp[N.id] && oi.length && yc(), W = d === _ ? w : d.indexOf(b), D && (G = new D).init(b, V || S, t, W, d) !== !1 && (t._pt = O = new It(t._pt, b, G.name, 0, 1, G.render, G, 0, G.priority), G._props.forEach(function(M) {
                        H[M] = O
                    }), G.priority && (I = 1)), !D || V)
                    for (T in S) Ht[T] && (G = bT(T, S, t, W, b, d)) ? G.priority && (I = 1) : H[T] = O = uv.call(t, b, T, "get", S[T], W, d, 0, i.stringFilter);
                t._op && t._op[w] && t.kill(b, t._op[w]), v && t._pt && (Wr = t, Oe.killTweensOf(b, H, t.globalTime(n)), Y = !t.parent, Wr = 0), t._pt && u && (Lp[N.id] = 1)
            }
            I && IT(t), t._onInit && t._onInit(t)
        }
        t._onUpdate = l, t._initted = (!t._op || t._pt) && !Y, h && n <= 0 && E.render(hn, !0, !0)
    },
    Nj = function(t, n, r, i, o, s, a, u) {
        var l = (t._pt && t._ptCache || (t._ptCache = {}))[n],
            c, f, h, p;
        if (!l)
            for (l = t._ptCache[n] = [], h = t._ptLookup, p = t._targets.length; p--;) {
                if (c = h[p][n], c && c.d && c.d._pt)
                    for (c = c.d._pt; c && c.p !== n && c.fp !== n;) c = c._next;
                if (!c) return Bp = 1, t.vars[n] = "+=0", lv(t, a), Bp = 0, u ? Za(n + " not eligible for reset") : 1;
                l.push(c)
            }
        for (p = l.length; p--;) f = l[p], c = f._pt || f, c.s = (i || i === 0) && !o ? i : c.s + (i || 0) + s * c.c, c.c = r - c.s, f.e && (f.e = Le(r) + rt(f.e)), f.b && (f.b = c.s + rt(f.b))
    },
    Dj = function(t, n) {
        var r = t[0] ? Gi(t[0]).harness : 0,
            i = r && r.aliases,
            o, s, a, u;
        if (!i) return n;
        o = oo({}, n);
        for (s in i)
            if (s in o)
                for (u = i[s].split(","), a = u.length; a--;) o[u[a]] = o[s];
        return o
    },
    Fj = function(t, n, r, i) {
        var o = n.ease || i || "power1.inOut",
            s, a;
        if (ot(n)) a = r[t] || (r[t] = []), n.forEach(function(u, l) {
            return a.push({
                t: l / (n.length - 1) * 100,
                v: u,
                e: o
            })
        });
        else
            for (s in n) a = r[s] || (r[s] = []), s === "ease" || a.push({
                t: parseFloat(t),
                v: n[s],
                e: o
            })
    },
    ka = function(t, n, r, i, o) {
        return Ie(t) ? t.call(n, r, i, o) : Ve(t) && ~t.indexOf("random(") ? eu(t) : t
    },
    PT = sv + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",
    CT = {};
Mt(PT + ",id,stagger,delay,duration,paused,scrollTrigger", function(e) {
    return CT[e] = 1
});
var Ne = function(e) {
    Wx(t, e);

    function t(r, i, o, s) {
        var a;
        typeof i == "number" && (o.duration = i, i = o, o = null), a = e.call(this, s ? i : Ca(i)) || this;
        var u = a.vars,
            l = u.duration,
            c = u.delay,
            f = u.immediateRender,
            h = u.stagger,
            p = u.overwrite,
            y = u.keyframes,
            m = u.defaults,
            _ = u.scrollTrigger,
            g = u.yoyoEase,
            d = i.parent || Oe,
            v = (ot(r) || Xx(r) ? yr(r[0]) : "length" in i) ? [r] : dn(r),
            E, S, w, T, O, b, I, N;
        if (a._targets = v.length ? av(v) : Za("GSAP target " + r + " not found. https://gsap.com", !Xt.nullTargetWarn) || [], a._ptLookup = [], a._overwrite = p, y || h || dl(l) || dl(c)) {
            if (i = a.vars, E = a.timeline = new pt({
                    data: "nested",
                    defaults: m || {},
                    targets: d && d.data === "nested" ? d.vars.targets : v
                }), E.kill(), E.parent = E._dp = ir(a), E._start = 0, h || dl(l) || dl(c)) {
                if (T = v.length, I = h && hT(h), er(h))
                    for (O in h) ~PT.indexOf(O) && (N || (N = {}), N[O] = h[O]);
                for (S = 0; S < T; S++) w = _c(i, CT), w.stagger = 0, g && (w.yoyoEase = g), N && oo(w, N), b = v[S], w.duration = +ka(l, ir(a), S, b, v), w.delay = (+ka(c, ir(a), S, b, v) || 0) - a._delay, !h && T === 1 && w.delay && (a._delay = c = w.delay, a._start += c, w.delay = 0), E.to(b, w, I ? I(S, b, v) : 0), E._ease = ee.none;
                E.duration() ? l = c = 0 : a.timeline = 0
            } else if (y) {
                Ca(yn(E.vars.defaults, {
                    ease: "none"
                })), E._ease = Wi(y.ease || i.ease || "none");
                var D = 0,
                    G, H, W;
                if (ot(y)) y.forEach(function(V) {
                    return E.to(v, V, ">")
                }), E.duration();
                else {
                    w = {};
                    for (O in y) O === "ease" || O === "easeEach" || Fj(O, y[O], w, y.easeEach);
                    for (O in w)
                        for (G = w[O].sort(function(V, Y) {
                                return V.t - Y.t
                            }), D = 0, S = 0; S < G.length; S++) H = G[S], W = {
                            ease: H.e,
                            duration: (H.t - (S ? G[S - 1].t : 0)) / 100 * l
                        }, W[O] = H.v, E.to(v, W, D), D += W.duration;
                    E.duration() < l && E.to({}, {
                        duration: l - E.duration()
                    })
                }
            }
            l || a.duration(l = E.duration())
        } else a.timeline = 0;
        return p === !0 && !ev && (Wr = ir(a), Oe.killTweensOf(v), Wr = 0), qn(d, ir(a), o), i.reversed && a.reverse(), i.paused && a.paused(!0), (f || !l && !y && a._start === ze(d._time) && kt(f) && pj(ir(a)) && d.data !== "nested") && (a._tTime = -de, a.render(Math.max(0, -c) || 0)), _ && uT(ir(a), _), a
    }
    var n = t.prototype;
    return n.render = function(i, o, s) {
        var a = this._time,
            u = this._tDur,
            l = this._dur,
            c = i < 0,
            f = i > u - de && !c ? u : i < de ? 0 : i,
            h, p, y, m, _, g, d, v, E;
        if (!l) vj(this, i, o, s);
        else if (f !== this._tTime || !i || s || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== c) {
            if (h = f, v = this.timeline, this._repeat) {
                if (m = l + this._rDelay, this._repeat < -1 && c) return this.totalTime(m * 100 + i, o, s);
                if (h = ze(f % m), f === u ? (y = this._repeat, h = l) : (y = ~~(f / m), y && y === ze(f / m) && (h = l, y--), h > l && (h = l)), g = this._yoyo && y & 1, g && (E = this._yEase, h = l - h), _ = As(this._tTime, m), h === a && !s && this._initted && y === _) return this._tTime = f, this;
                y !== _ && (v && this._yEase && xT(v, g), this.vars.repeatRefresh && !g && !this._lock && this._time !== m && this._initted && (this._lock = s = 1, this.render(ze(m * y), !0).invalidate()._lock = 0))
            }
            if (!this._initted) {
                if (lT(this, c ? i : h, s, o, f)) return this._tTime = 0, this;
                if (a !== this._time && !(s && this.vars.repeatRefresh && y !== _)) return this;
                if (l !== this._dur) return this.render(i, o, s)
            }
            if (this._tTime = f, this._time = h, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = d = (E || this._ease)(h / l), this._from && (this.ratio = d = 1 - d), h && !a && !o && !y && (Wt(this, "onStart"), this._tTime !== f)) return this;
            for (p = this._pt; p;) p.r(d, p.d), p = p._next;
            v && v.render(i < 0 ? i : v._dur * v._ease(h / this._dur), o, s) || this._startAt && (this._zTime = i), this._onUpdate && !o && (c && Ap(this, i, o, s), Wt(this, "onUpdate")), this._repeat && y !== _ && this.vars.onRepeat && !o && this.parent && Wt(this, "onRepeat"), (f === this._tDur || !f) && this._tTime === f && (c && !this._onUpdate && Ap(this, i, !0, !0), (i || !l) && (f === this._tDur && this._ts > 0 || !f && this._ts < 0) && fi(this, 1), !o && !(c && !a) && (f || a || g) && (Wt(this, f === u ? "onComplete" : "onReverseComplete", !0), this._prom && !(f < u && this.timeScale() > 0) && this._prom()))
        }
        return this
    }, n.targets = function() {
        return this._targets
    }, n.invalidate = function(i) {
        return (!i || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(i), e.prototype.invalidate.call(this, i)
    }, n.resetTo = function(i, o, s, a, u) {
        tu || Gt.wake(), this._ts || this.play();
        var l = Math.min(this._dur, (this._dp._time - this._start) * this._ts),
            c;
        return this._initted || lv(this, l), c = this._ease(l / this._dur), Nj(this, i, o, s, a, c, l, u) ? this.resetTo(i, o, s, a, 1) : (Tf(this, 0), this.parent || sT(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0))
    }, n.kill = function(i, o) {
        if (o === void 0 && (o = "all"), !i && (!o || o === "all")) return this._lazy = this._pt = 0, this.parent ? va(this) : this;
        if (this.timeline) {
            var s = this.timeline.totalDuration();
            return this.timeline.killTweensOf(i, o, Wr && Wr.vars.overwrite !== !0)._first || va(this), this.parent && s !== this.timeline.totalDuration() && Ns(this, this._dur * this.timeline._tDur / s, 0, 1), this
        }
        var a = this._targets,
            u = i ? dn(i) : a,
            l = this._ptLookup,
            c = this._pt,
            f, h, p, y, m, _, g;
        if ((!o || o === "all") && hj(a, u)) return o === "all" && (this._pt = 0), va(this);
        for (f = this._op = this._op || [], o !== "all" && (Ve(o) && (m = {}, Mt(o, function(d) {
                return m[d] = 1
            }), o = m), o = Dj(a, o)), g = a.length; g--;)
            if (~u.indexOf(a[g])) {
                h = l[g], o === "all" ? (f[g] = o, y = h, p = {}) : (p = f[g] = f[g] || {}, y = o);
                for (m in y) _ = h && h[m], _ && ((!("kill" in _.d) || _.d.kill(m) === !0) && wf(this, _, "_pt"), delete h[m]), p !== "all" && (p[m] = 1)
            }
        return this._initted && !this._pt && c && va(this), this
    }, t.to = function(i, o) {
        return new t(i, o, arguments[2])
    }, t.from = function(i, o) {
        return Ra(1, arguments)
    }, t.delayedCall = function(i, o, s, a) {
        return new t(o, 0, {
            immediateRender: !1,
            lazy: !1,
            overwrite: !1,
            delay: i,
            onComplete: o,
            onReverseComplete: o,
            onCompleteParams: s,
            onReverseCompleteParams: s,
            callbackScope: a
        })
    }, t.fromTo = function(i, o, s) {
        return Ra(2, arguments)
    }, t.set = function(i, o) {
        return o.duration = 0, o.repeatDelay || (o.repeat = 0), new t(i, o)
    }, t.killTweensOf = function(i, o, s) {
        return Oe.killTweensOf(i, o, s)
    }, t
}(nu);
yn(Ne.prototype, {
    _targets: [],
    _lazy: 0,
    _startAt: 0,
    _op: 0,
    _onInit: 0
});
Mt("staggerTo,staggerFrom,staggerFromTo", function(e) {
    Ne[e] = function() {
        var t = new pt,
            n = Dp.call(arguments, 0);
        return n.splice(e === "staggerFromTo" ? 5 : 4, 0, 0), t[e].apply(t, n)
    }
});
var cv = function(t, n, r) {
        return t[n] = r
    },
    RT = function(t, n, r) {
        return t[n](r)
    },
    $j = function(t, n, r, i) {
        return t[n](i.fp, r)
    },
    Bj = function(t, n, r) {
        return t.setAttribute(n, r)
    },
    fv = function(t, n) {
        return Ie(t[n]) ? RT : tv(t[n]) && t.setAttribute ? Bj : cv
    },
    kT = function(t, n) {
        return n.set(n.t, n.p, Math.round((n.s + n.c * t) * 1e6) / 1e6, n)
    },
    jj = function(t, n) {
        return n.set(n.t, n.p, !!(n.s + n.c * t), n)
    },
    MT = function(t, n) {
        var r = n._pt,
            i = "";
        if (!t && n.b) i = n.b;
        else if (t === 1 && n.e) i = n.e;
        else {
            for (; r;) i = r.p + (r.m ? r.m(r.s + r.c * t) : Math.round((r.s + r.c * t) * 1e4) / 1e4) + i, r = r._next;
            i += n.c
        }
        n.set(n.t, n.p, i, n)
    },
    hv = function(t, n) {
        for (var r = n._pt; r;) r.r(t, r.d), r = r._next
    },
    Hj = function(t, n, r, i) {
        for (var o = this._pt, s; o;) s = o._next, o.p === i && o.modifier(t, n, r), o = s
    },
    Uj = function(t) {
        for (var n = this._pt, r, i; n;) i = n._next, n.p === t && !n.op || n.op === t ? wf(this, n, "_pt") : n.dep || (r = 1), n = i;
        return !r
    },
    zj = function(t, n, r, i) {
        i.mSet(t, n, i.m.call(i.tween, r, i.mt), i)
    },
    IT = function(t) {
        for (var n = t._pt, r, i, o, s; n;) {
            for (r = n._next, i = o; i && i.pr > n.pr;) i = i._next;
            (n._prev = i ? i._prev : s) ? n._prev._next = n: o = n, (n._next = i) ? i._prev = n : s = n, n = r
        }
        t._pt = o
    },
    It = function() {
        function e(n, r, i, o, s, a, u, l, c) {
            this.t = r, this.s = o, this.c = s, this.p = i, this.r = a || kT, this.d = u || this, this.set = l || cv, this.pr = c || 0, this._next = n, n && (n._prev = this)
        }
        var t = e.prototype;
        return t.modifier = function(r, i, o) {
            this.mSet = this.mSet || this.set, this.set = zj, this.m = r, this.mt = o, this.tween = i
        }, e
    }();
Mt(sv + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(e) {
    return ov[e] = 1
});
Kt.TweenMax = Kt.TweenLite = Ne;
Kt.TimelineLite = Kt.TimelineMax = pt;
Oe = new pt({
    sortChildren: !1,
    defaults: Ls,
    autoRemoveChildren: !0,
    id: "root",
    smoothChildTiming: !0
});
Xt.stringFilter = ST;
var qi = [],
    Nl = {},
    Gj = [],
    B_ = 0,
    Vj = 0,
    Uh = function(t) {
        return (Nl[t] || Gj).map(function(n) {
            return n()
        })
    },
    jp = function() {
        var t = Date.now(),
            n = [];
        t - B_ > 2 && (Uh("matchMediaInit"), qi.forEach(function(r) {
            var i = r.queries,
                o = r.conditions,
                s, a, u, l;
            for (a in i) s = Bn.matchMedia(i[a]).matches, s && (u = 1), s !== o[a] && (o[a] = s, l = 1);
            l && (r.revert(), u && n.push(r))
        }), Uh("matchMediaRevert"), n.forEach(function(r) {
            return r.onMatch(r, function(i) {
                return r.add(null, i)
            })
        }), B_ = t, Uh("matchMedia"))
    },
    LT = function() {
        function e(n, r) {
            this.selector = r && Fp(r), this.data = [], this._r = [], this.isReverted = !1, this.id = Vj++, n && this.add(n)
        }
        var t = e.prototype;
        return t.add = function(r, i, o) {
            Ie(r) && (o = i, i = r, r = Ie);
            var s = this,
                a = function() {
                    var l = xe,
                        c = s.selector,
                        f;
                    return l && l !== s && l.data.push(s), o && (s.selector = Fp(o)), xe = s, f = i.apply(s, arguments), Ie(f) && s._r.push(f), xe = l, s.selector = c, s.isReverted = !1, f
                };
            return s.last = a, r === Ie ? a(s, function(u) {
                return s.add(null, u)
            }) : r ? s[r] = a : a
        }, t.ignore = function(r) {
            var i = xe;
            xe = null, r(this), xe = i
        }, t.getTweens = function() {
            var r = [];
            return this.data.forEach(function(i) {
                return i instanceof e ? r.push.apply(r, i.getTweens()) : i instanceof Ne && !(i.parent && i.parent.data === "nested") && r.push(i)
            }), r
        }, t.clear = function() {
            this._r.length = this.data.length = 0
        }, t.kill = function(r, i) {
            var o = this;
            if (r ? function() {
                    for (var a = o.getTweens(), u = o.data.length, l; u--;) l = o.data[u], l.data === "isFlip" && (l.revert(), l.getChildren(!0, !0, !1).forEach(function(c) {
                        return a.splice(a.indexOf(c), 1)
                    }));
                    for (a.map(function(c) {
                            return {
                                g: c._dur || c._delay || c._sat && !c._sat.vars.immediateRender ? c.globalTime(0) : -1 / 0,
                                t: c
                            }
                        }).sort(function(c, f) {
                            return f.g - c.g || -1 / 0
                        }).forEach(function(c) {
                            return c.t.revert(r)
                        }), u = o.data.length; u--;) l = o.data[u], l instanceof pt ? l.data !== "nested" && (l.scrollTrigger && l.scrollTrigger.revert(), l.kill()) : !(l instanceof Ne) && l.revert && l.revert(r);
                    o._r.forEach(function(c) {
                        return c(r, o)
                    }), o.isReverted = !0
                }() : this.data.forEach(function(a) {
                    return a.kill && a.kill()
                }), this.clear(), i)
                for (var s = qi.length; s--;) qi[s].id === this.id && qi.splice(s, 1)
        }, t.revert = function(r) {
            this.kill(r || {})
        }, e
    }(),
    Wj = function() {
        function e(n) {
            this.contexts = [], this.scope = n, xe && xe.data.push(this)
        }
        var t = e.prototype;
        return t.add = function(r, i, o) {
            er(r) || (r = {
                matches: r
            });
            var s = new LT(0, o || this.scope),
                a = s.conditions = {},
                u, l, c;
            xe && !s.selector && (s.selector = xe.selector), this.contexts.push(s), i = s.add("onMatch", i), s.queries = r;
            for (l in r) l === "all" ? c = 1 : (u = Bn.matchMedia(r[l]), u && (qi.indexOf(s) < 0 && qi.push(s), (a[l] = u.matches) && (c = 1), u.addListener ? u.addListener(jp) : u.addEventListener("change", jp)));
            return c && i(s, function(f) {
                return s.add(null, f)
            }), this
        }, t.revert = function(r) {
            this.kill(r || {})
        }, t.kill = function(r) {
            this.contexts.forEach(function(i) {
                return i.kill(r, !0)
            })
        }, e
    }(),
    Sc = {
        registerPlugin: function() {
            for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
            n.forEach(function(i) {
                return yT(i)
            })
        },
        timeline: function(t) {
            return new pt(t)
        },
        getTweensOf: function(t, n) {
            return Oe.getTweensOf(t, n)
        },
        getProperty: function(t, n, r, i) {
            Ve(t) && (t = dn(t)[0]);
            var o = Gi(t || {}).get,
                s = r ? oT : iT;
            return r === "native" && (r = ""), t && (n ? s((Ht[n] && Ht[n].get || o)(t, n, r, i)) : function(a, u, l) {
                return s((Ht[a] && Ht[a].get || o)(t, a, u, l))
            })
        },
        quickSetter: function(t, n, r) {
            if (t = dn(t), t.length > 1) {
                var i = t.map(function(c) {
                        return At.quickSetter(c, n, r)
                    }),
                    o = i.length;
                return function(c) {
                    for (var f = o; f--;) i[f](c)
                }
            }
            t = t[0] || {};
            var s = Ht[n],
                a = Gi(t),
                u = a.harness && (a.harness.aliases || {})[n] || n,
                l = s ? function(c) {
                    var f = new s;
                    Ho._pt = 0, f.init(t, r ? c + r : c, Ho, 0, [t]), f.render(1, f), Ho._pt && hv(1, Ho)
                } : a.set(t, u);
            return s ? l : function(c) {
                return l(t, u, r ? c + r : c, a, 1)
            }
        },
        quickTo: function(t, n, r) {
            var i, o = At.to(t, oo((i = {}, i[n] = "+=0.1", i.paused = !0, i), r || {})),
                s = function(u, l, c) {
                    return o.resetTo(n, u, l, c)
                };
            return s.tween = o, s
        },
        isTweening: function(t) {
            return Oe.getTweensOf(t, !0).length > 0
        },
        defaults: function(t) {
            return t && t.ease && (t.ease = Wi(t.ease, Ls.ease)), A_(Ls, t || {})
        },
        config: function(t) {
            return A_(Xt, t || {})
        },
        registerEffect: function(t) {
            var n = t.name,
                r = t.effect,
                i = t.plugins,
                o = t.defaults,
                s = t.extendTimeline;
            (i || "").split(",").forEach(function(a) {
                return a && !Ht[a] && !Kt[a] && Za(n + " effect requires " + a + " plugin.")
            }), $h[n] = function(a, u, l) {
                return r(dn(a), yn(u || {}, o), l)
            }, s && (pt.prototype[n] = function(a, u, l) {
                return this.add($h[n](a, er(u) ? u : (l = u) && {}, this), l)
            })
        },
        registerEase: function(t, n) {
            ee[t] = Wi(n)
        },
        parseEase: function(t, n) {
            return arguments.length ? Wi(t, n) : ee
        },
        getById: function(t) {
            return Oe.getById(t)
        },
        exportRoot: function(t, n) {
            t === void 0 && (t = {});
            var r = new pt(t),
                i, o;
            for (r.smoothChildTiming = kt(t.smoothChildTiming), Oe.remove(r), r._dp = 0, r._time = r._tTime = Oe._time, i = Oe._first; i;) o = i._next, (n || !(!i._dur && i instanceof Ne && i.vars.onComplete === i._targets[0])) && qn(r, i, i._start - i._delay), i = o;
            return qn(Oe, r, 0), r
        },
        context: function(t, n) {
            return t ? new LT(t, n) : xe
        },
        matchMedia: function(t) {
            return new Wj(t)
        },
        matchMediaRefresh: function() {
            return qi.forEach(function(t) {
                var n = t.conditions,
                    r, i;
                for (i in n) n[i] && (n[i] = !1, r = 1);
                r && t.revert()
            }) || jp()
        },
        addEventListener: function(t, n) {
            var r = Nl[t] || (Nl[t] = []);
            ~r.indexOf(n) || r.push(n)
        },
        removeEventListener: function(t, n) {
            var r = Nl[t],
                i = r && r.indexOf(n);
            i >= 0 && r.splice(i, 1)
        },
        utils: {
            wrap: Tj,
            wrapYoyo: Oj,
            distribute: hT,
            random: pT,
            snap: dT,
            normalize: xj,
            getUnit: rt,
            clamp: _j,
            splitColor: _T,
            toArray: dn,
            selector: Fp,
            mapRange: vT,
            pipe: Sj,
            unitize: wj,
            interpolate: bj,
            shuffle: fT
        },
        install: Jx,
        effects: $h,
        ticker: Gt,
        updateRoot: pt.updateRoot,
        plugins: Ht,
        globalTimeline: Oe,
        core: {
            PropTween: It,
            globals: eT,
            Tween: Ne,
            Timeline: pt,
            Animation: nu,
            getCache: Gi,
            _removeLinkedListItem: wf,
            reverting: function() {
                return it
            },
            context: function(t) {
                return t && xe && (xe.data.push(t), t._ctx = xe), xe
            },
            suppressOverwrites: function(t) {
                return ev = t
            }
        }
    };
Mt("to,from,fromTo,delayedCall,set,killTweensOf", function(e) {
    return Sc[e] = Ne[e]
});
Gt.add(pt.updateRoot);
Ho = Sc.to({}, {
    duration: 0
});
var qj = function(t, n) {
        for (var r = t._pt; r && r.p !== n && r.op !== n && r.fp !== n;) r = r._next;
        return r
    },
    Xj = function(t, n) {
        var r = t._targets,
            i, o, s;
        for (i in n)
            for (o = r.length; o--;) s = t._ptLookup[o][i], s && (s = s.d) && (s._pt && (s = qj(s, i)), s && s.modifier && s.modifier(n[i], t, r[o], i))
    },
    zh = function(t, n) {
        return {
            name: t,
            rawVars: 1,
            init: function(i, o, s) {
                s._onInit = function(a) {
                    var u, l;
                    if (Ve(o) && (u = {}, Mt(o, function(c) {
                            return u[c] = 1
                        }), o = u), n) {
                        u = {};
                        for (l in o) u[l] = n(o[l]);
                        o = u
                    }
                    Xj(a, o)
                }
            }
        }
    },
    At = Sc.registerPlugin({
        name: "attr",
        init: function(t, n, r, i, o) {
            var s, a, u;
            this.tween = r;
            for (s in n) u = t.getAttribute(s) || "", a = this.add(t, "setAttribute", (u || 0) + "", n[s], i, o, 0, 0, s), a.op = s, a.b = u, this._props.push(s)
        },
        render: function(t, n) {
            for (var r = n._pt; r;) it ? r.set(r.t, r.p, r.b, r) : r.r(t, r.d), r = r._next
        }
    }, {
        name: "endArray",
        init: function(t, n) {
            for (var r = n.length; r--;) this.add(t, r, t[r] || 0, n[r], 0, 0, 0, 0, 0, 1)
        }
    }, zh("roundProps", $p), zh("modifiers"), zh("snap", dT)) || Sc;
Ne.version = pt.version = At.version = "3.12.5";
Zx = 1;
nv() && Ds();
ee.Power0;
ee.Power1;
ee.Power2;
ee.Power3;
ee.Power4;
ee.Linear;
ee.Quad;
ee.Cubic;
ee.Quart;
ee.Quint;
ee.Strong;
ee.Elastic;
ee.Back;
ee.SteppedEase;
ee.Bounce;
ee.Sine;
ee.Expo;
ee.Circ;
/*!
 * CSSPlugin 3.12.5
 * https://gsap.com
 *
 * Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */
var j_, qr, Yo, dv, Mi, H_, pv, Qj = function() {
        return typeof window < "u"
    },
    _r = {},
    Oi = 180 / Math.PI,
    Zo = Math.PI / 180,
    Oo = Math.atan2,
    U_ = 1e8,
    mv = /([A-Z])/g,
    Kj = /(left|right|width|margin|padding|x)/i,
    Yj = /[\s,\(]\S/,
    Qn = {
        autoAlpha: "opacity,visibility",
        scale: "scaleX,scaleY",
        alpha: "opacity"
    },
    Hp = function(t, n) {
        return n.set(n.t, n.p, Math.round((n.s + n.c * t) * 1e4) / 1e4 + n.u, n)
    },
    Zj = function(t, n) {
        return n.set(n.t, n.p, t === 1 ? n.e : Math.round((n.s + n.c * t) * 1e4) / 1e4 + n.u, n)
    },
    Jj = function(t, n) {
        return n.set(n.t, n.p, t ? Math.round((n.s + n.c * t) * 1e4) / 1e4 + n.u : n.b, n)
    },
    eH = function(t, n) {
        var r = n.s + n.c * t;
        n.set(n.t, n.p, ~~(r + (r < 0 ? -.5 : .5)) + n.u, n)
    },
    AT = function(t, n) {
        return n.set(n.t, n.p, t ? n.e : n.b, n)
    },
    NT = function(t, n) {
        return n.set(n.t, n.p, t !== 1 ? n.b : n.e, n)
    },
    tH = function(t, n, r) {
        return t.style[n] = r
    },
    nH = function(t, n, r) {
        return t.style.setProperty(n, r)
    },
    rH = function(t, n, r) {
        return t._gsap[n] = r
    },
    iH = function(t, n, r) {
        return t._gsap.scaleX = t._gsap.scaleY = r
    },
    oH = function(t, n, r, i, o) {
        var s = t._gsap;
        s.scaleX = s.scaleY = r, s.renderTransform(o, s)
    },
    sH = function(t, n, r, i, o) {
        var s = t._gsap;
        s[n] = r, s.renderTransform(o, s)
    },
    be = "transform",
    Lt = be + "Origin",
    aH = function e(t, n) {
        var r = this,
            i = this.target,
            o = i.style,
            s = i._gsap;
        if (t in _r && o) {
            if (this.tfm = this.tfm || {}, t !== "transform") t = Qn[t] || t, ~t.indexOf(",") ? t.split(",").forEach(function(a) {
                return r.tfm[a] = sr(i, a)
            }) : this.tfm[t] = s.x ? s[t] : sr(i, t), t === Lt && (this.tfm.zOrigin = s.zOrigin);
            else return Qn.transform.split(",").forEach(function(a) {
                return e.call(r, a, n)
            });
            if (this.props.indexOf(be) >= 0) return;
            s.svg && (this.svgo = i.getAttribute("data-svg-origin"), this.props.push(Lt, n, "")), t = be
        }(o || n) && this.props.push(t, n, o[t])
    },
    DT = function(t) {
        t.translate && (t.removeProperty("translate"), t.removeProperty("scale"), t.removeProperty("rotate"))
    },
    uH = function() {
        var t = this.props,
            n = this.target,
            r = n.style,
            i = n._gsap,
            o, s;
        for (o = 0; o < t.length; o += 3) t[o + 1] ? n[t[o]] = t[o + 2] : t[o + 2] ? r[t[o]] = t[o + 2] : r.removeProperty(t[o].substr(0, 2) === "--" ? t[o] : t[o].replace(mv, "-$1").toLowerCase());
        if (this.tfm) {
            for (s in this.tfm) i[s] = this.tfm[s];
            i.svg && (i.renderTransform(), n.setAttribute("data-svg-origin", this.svgo || "")), o = pv(), (!o || !o.isStart) && !r[be] && (DT(r), i.zOrigin && r[Lt] && (r[Lt] += " " + i.zOrigin + "px", i.zOrigin = 0, i.renderTransform()), i.uncache = 1)
        }
    },
    FT = function(t, n) {
        var r = {
            target: t,
            props: [],
            revert: uH,
            save: aH
        };
        return t._gsap || At.core.getCache(t), n && n.split(",").forEach(function(i) {
            return r.save(i)
        }), r
    },
    $T, Up = function(t, n) {
        var r = qr.createElementNS ? qr.createElementNS((n || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : qr.createElement(t);
        return r && r.style ? r : qr.createElement(t)
    },
    Zn = function e(t, n, r) {
        var i = getComputedStyle(t);
        return i[n] || i.getPropertyValue(n.replace(mv, "-$1").toLowerCase()) || i.getPropertyValue(n) || !r && e(t, Fs(n) || n, 1) || ""
    },
    z_ = "O,Moz,ms,Ms,Webkit".split(","),
    Fs = function(t, n, r) {
        var i = n || Mi,
            o = i.style,
            s = 5;
        if (t in o && !r) return t;
        for (t = t.charAt(0).toUpperCase() + t.substr(1); s-- && !(z_[s] + t in o););
        return s < 0 ? null : (s === 3 ? "ms" : s >= 0 ? z_[s] : "") + t
    },
    zp = function() {
        Qj() && window.document && (j_ = window, qr = j_.document, Yo = qr.documentElement, Mi = Up("div") || {
            style: {}
        }, Up("div"), be = Fs(be), Lt = be + "Origin", Mi.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", $T = !!Fs("perspective"), pv = At.core.reverting, dv = 1)
    },
    Gh = function e(t) {
        var n = Up("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
            r = this.parentNode,
            i = this.nextSibling,
            o = this.style.cssText,
            s;
        if (Yo.appendChild(n), n.appendChild(this), this.style.display = "block", t) try {
            s = this.getBBox(), this._gsapBBox = this.getBBox, this.getBBox = e
        } catch {} else this._gsapBBox && (s = this._gsapBBox());
        return r && (i ? r.insertBefore(this, i) : r.appendChild(this)), Yo.removeChild(n), this.style.cssText = o, s
    },
    G_ = function(t, n) {
        for (var r = n.length; r--;)
            if (t.hasAttribute(n[r])) return t.getAttribute(n[r])
    },
    BT = function(t) {
        var n;
        try {
            n = t.getBBox()
        } catch {
            n = Gh.call(t, !0)
        }
        return n && (n.width || n.height) || t.getBBox === Gh || (n = Gh.call(t, !0)), n && !n.width && !n.x && !n.y ? {
            x: +G_(t, ["x", "cx", "x1"]) || 0,
            y: +G_(t, ["y", "cy", "y1"]) || 0,
            width: 0,
            height: 0
        } : n
    },
    jT = function(t) {
        return !!(t.getCTM && (!t.parentNode || t.ownerSVGElement) && BT(t))
    },
    so = function(t, n) {
        if (n) {
            var r = t.style,
                i;
            n in _r && n !== Lt && (n = be), r.removeProperty ? (i = n.substr(0, 2), (i === "ms" || n.substr(0, 6) === "webkit") && (n = "-" + n), r.removeProperty(i === "--" ? n : n.replace(mv, "-$1").toLowerCase())) : r.removeAttribute(n)
        }
    },
    Xr = function(t, n, r, i, o, s) {
        var a = new It(t._pt, n, r, 0, 1, s ? NT : AT);
        return t._pt = a, a.b = i, a.e = o, t._props.push(r), a
    },
    V_ = {
        deg: 1,
        rad: 1,
        turn: 1
    },
    lH = {
        grid: 1,
        flex: 1
    },
    hi = function e(t, n, r, i) {
        var o = parseFloat(r) || 0,
            s = (r + "").trim().substr((o + "").length) || "px",
            a = Mi.style,
            u = Kj.test(n),
            l = t.tagName.toLowerCase() === "svg",
            c = (l ? "client" : "offset") + (u ? "Width" : "Height"),
            f = 100,
            h = i === "px",
            p = i === "%",
            y, m, _, g;
        if (i === s || !o || V_[i] || V_[s]) return o;
        if (s !== "px" && !h && (o = e(t, n, r, "px")), g = t.getCTM && jT(t), (p || s === "%") && (_r[n] || ~n.indexOf("adius"))) return y = g ? t.getBBox()[u ? "width" : "height"] : t[c], Le(p ? o / y * f : o / 100 * y);
        if (a[u ? "width" : "height"] = f + (h ? s : i), m = ~n.indexOf("adius") || i === "em" && t.appendChild && !l ? t : t.parentNode, g && (m = (t.ownerSVGElement || {}).parentNode), (!m || m === qr || !m.appendChild) && (m = qr.body), _ = m._gsap, _ && p && _.width && u && _.time === Gt.time && !_.uncache) return Le(o / _.width * f);
        if (p && (n === "height" || n === "width")) {
            var d = t.style[n];
            t.style[n] = f + i, y = t[c], d ? t.style[n] = d : so(t, n)
        } else(p || s === "%") && !lH[Zn(m, "display")] && (a.position = Zn(t, "position")), m === t && (a.position = "static"), m.appendChild(Mi), y = Mi[c], m.removeChild(Mi), a.position = "absolute";
        return u && p && (_ = Gi(m), _.time = Gt.time, _.width = m[c]), Le(h ? y * o / f : y && o ? f / y * o : 0)
    },
    sr = function(t, n, r, i) {
        var o;
        return dv || zp(), n in Qn && n !== "transform" && (n = Qn[n], ~n.indexOf(",") && (n = n.split(",")[0])), _r[n] && n !== "transform" ? (o = iu(t, i), o = n !== "transformOrigin" ? o[n] : o.svg ? o.origin : xc(Zn(t, Lt)) + " " + o.zOrigin + "px") : (o = t.style[n], (!o || o === "auto" || i || ~(o + "").indexOf("calc(")) && (o = wc[n] && wc[n](t, n, r) || Zn(t, n) || nT(t, n) || (n === "opacity" ? 1 : 0))), r && !~(o + "").trim().indexOf(" ") ? hi(t, n, o, r) + r : o
    },
    cH = function(t, n, r, i) {
        if (!r || r === "none") {
            var o = Fs(n, t, 1),
                s = o && Zn(t, o, 1);
            s && s !== r ? (n = o, r = s) : n === "borderColor" && (r = Zn(t, "borderTopColor"))
        }
        var a = new It(this._pt, t.style, n, 0, 1, MT),
            u = 0,
            l = 0,
            c, f, h, p, y, m, _, g, d, v, E, S;
        if (a.b = r, a.e = i, r += "", i += "", i === "auto" && (m = t.style[n], t.style[n] = i, i = Zn(t, n) || i, m ? t.style[n] = m : so(t, n)), c = [r, i], ST(c), r = c[0], i = c[1], h = r.match(jo) || [], S = i.match(jo) || [], S.length) {
            for (; f = jo.exec(i);) _ = f[0], d = i.substring(u, f.index), y ? y = (y + 1) % 5 : (d.substr(-5) === "rgba(" || d.substr(-5) === "hsla(") && (y = 1), _ !== (m = h[l++] || "") && (p = parseFloat(m) || 0, E = m.substr((p + "").length), _.charAt(1) === "=" && (_ = Ko(p, _) + E), g = parseFloat(_), v = _.substr((g + "").length), u = jo.lastIndex - v.length, v || (v = v || Xt.units[n] || E, u === i.length && (i += v, a.e += v)), E !== v && (p = hi(t, n, m, v) || 0), a._pt = {
                _next: a._pt,
                p: d || l === 1 ? d : ",",
                s: p,
                c: g - p,
                m: y && y < 4 || n === "zIndex" ? Math.round : 0
            });
            a.c = u < i.length ? i.substring(u, i.length) : ""
        } else a.r = n === "display" && i === "none" ? NT : AT;
        return Kx.test(i) && (a.e = 0), this._pt = a, a
    },
    W_ = {
        top: "0%",
        bottom: "100%",
        left: "0%",
        right: "100%",
        center: "50%"
    },
    fH = function(t) {
        var n = t.split(" "),
            r = n[0],
            i = n[1] || "50%";
        return (r === "top" || r === "bottom" || i === "left" || i === "right") && (t = r, r = i, i = t), n[0] = W_[r] || r, n[1] = W_[i] || i, n.join(" ")
    },
    hH = function(t, n) {
        if (n.tween && n.tween._time === n.tween._dur) {
            var r = n.t,
                i = r.style,
                o = n.u,
                s = r._gsap,
                a, u, l;
            if (o === "all" || o === !0) i.cssText = "", u = 1;
            else
                for (o = o.split(","), l = o.length; --l > -1;) a = o[l], _r[a] && (u = 1, a = a === "transformOrigin" ? Lt : be), so(r, a);
            u && (so(r, be), s && (s.svg && r.removeAttribute("transform"), iu(r, 1), s.uncache = 1, DT(i)))
        }
    },
    wc = {
        clearProps: function(t, n, r, i, o) {
            if (o.data !== "isFromStart") {
                var s = t._pt = new It(t._pt, n, r, 0, 0, hH);
                return s.u = i, s.pr = -10, s.tween = o, t._props.push(r), 1
            }
        }
    },
    ru = [1, 0, 0, 1, 0, 0],
    HT = {},
    UT = function(t) {
        return t === "matrix(1, 0, 0, 1, 0, 0)" || t === "none" || !t
    },
    q_ = function(t) {
        var n = Zn(t, be);
        return UT(n) ? ru : n.substr(7).match(Qx).map(Le)
    },
    vv = function(t, n) {
        var r = t._gsap || Gi(t),
            i = t.style,
            o = q_(t),
            s, a, u, l;
        return r.svg && t.getAttribute("transform") ? (u = t.transform.baseVal.consolidate().matrix, o = [u.a, u.b, u.c, u.d, u.e, u.f], o.join(",") === "1,0,0,1,0,0" ? ru : o) : (o === ru && !t.offsetParent && t !== Yo && !r.svg && (u = i.display, i.display = "block", s = t.parentNode, (!s || !t.offsetParent) && (l = 1, a = t.nextElementSibling, Yo.appendChild(t)), o = q_(t), u ? i.display = u : so(t, "display"), l && (a ? s.insertBefore(t, a) : s ? s.appendChild(t) : Yo.removeChild(t))), n && o.length > 6 ? [o[0], o[1], o[4], o[5], o[12], o[13]] : o)
    },
    Gp = function(t, n, r, i, o, s) {
        var a = t._gsap,
            u = o || vv(t, !0),
            l = a.xOrigin || 0,
            c = a.yOrigin || 0,
            f = a.xOffset || 0,
            h = a.yOffset || 0,
            p = u[0],
            y = u[1],
            m = u[2],
            _ = u[3],
            g = u[4],
            d = u[5],
            v = n.split(" "),
            E = parseFloat(v[0]) || 0,
            S = parseFloat(v[1]) || 0,
            w, T, O, b;
        r ? u !== ru && (T = p * _ - y * m) && (O = E * (_ / T) + S * (-m / T) + (m * d - _ * g) / T, b = E * (-y / T) + S * (p / T) - (p * d - y * g) / T, E = O, S = b) : (w = BT(t), E = w.x + (~v[0].indexOf("%") ? E / 100 * w.width : E), S = w.y + (~(v[1] || v[0]).indexOf("%") ? S / 100 * w.height : S)), i || i !== !1 && a.smooth ? (g = E - l, d = S - c, a.xOffset = f + (g * p + d * m) - g, a.yOffset = h + (g * y + d * _) - d) : a.xOffset = a.yOffset = 0, a.xOrigin = E, a.yOrigin = S, a.smooth = !!i, a.origin = n, a.originIsAbsolute = !!r, t.style[Lt] = "0px 0px", s && (Xr(s, a, "xOrigin", l, E), Xr(s, a, "yOrigin", c, S), Xr(s, a, "xOffset", f, a.xOffset), Xr(s, a, "yOffset", h, a.yOffset)), t.setAttribute("data-svg-origin", E + " " + S)
    },
    iu = function(t, n) {
        var r = t._gsap || new OT(t);
        if ("x" in r && !n && !r.uncache) return r;
        var i = t.style,
            o = r.scaleX < 0,
            s = "px",
            a = "deg",
            u = getComputedStyle(t),
            l = Zn(t, Lt) || "0",
            c, f, h, p, y, m, _, g, d, v, E, S, w, T, O, b, I, N, D, G, H, W, V, Y, M, C, P, R, k, B, F, q;
        return c = f = h = m = _ = g = d = v = E = 0, p = y = 1, r.svg = !!(t.getCTM && jT(t)), u.translate && ((u.translate !== "none" || u.scale !== "none" || u.rotate !== "none") && (i[be] = (u.translate !== "none" ? "translate3d(" + (u.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (u.rotate !== "none" ? "rotate(" + u.rotate + ") " : "") + (u.scale !== "none" ? "scale(" + u.scale.split(" ").join(",") + ") " : "") + (u[be] !== "none" ? u[be] : "")), i.scale = i.rotate = i.translate = "none"), T = vv(t, r.svg), r.svg && (r.uncache ? (M = t.getBBox(), l = r.xOrigin - M.x + "px " + (r.yOrigin - M.y) + "px", Y = "") : Y = !n && t.getAttribute("data-svg-origin"), Gp(t, Y || l, !!Y || r.originIsAbsolute, r.smooth !== !1, T)), S = r.xOrigin || 0, w = r.yOrigin || 0, T !== ru && (N = T[0], D = T[1], G = T[2], H = T[3], c = W = T[4], f = V = T[5], T.length === 6 ? (p = Math.sqrt(N * N + D * D), y = Math.sqrt(H * H + G * G), m = N || D ? Oo(D, N) * Oi : 0, d = G || H ? Oo(G, H) * Oi + m : 0, d && (y *= Math.abs(Math.cos(d * Zo))), r.svg && (c -= S - (S * N + w * G), f -= w - (S * D + w * H))) : (q = T[6], B = T[7], P = T[8], R = T[9], k = T[10], F = T[11], c = T[12], f = T[13], h = T[14], O = Oo(q, k), _ = O * Oi, O && (b = Math.cos(-O), I = Math.sin(-O), Y = W * b + P * I, M = V * b + R * I, C = q * b + k * I, P = W * -I + P * b, R = V * -I + R * b, k = q * -I + k * b, F = B * -I + F * b, W = Y, V = M, q = C), O = Oo(-G, k), g = O * Oi, O && (b = Math.cos(-O), I = Math.sin(-O), Y = N * b - P * I, M = D * b - R * I, C = G * b - k * I, F = H * I + F * b, N = Y, D = M, G = C), O = Oo(D, N), m = O * Oi, O && (b = Math.cos(O), I = Math.sin(O), Y = N * b + D * I, M = W * b + V * I, D = D * b - N * I, V = V * b - W * I, N = Y, W = M), _ && Math.abs(_) + Math.abs(m) > 359.9 && (_ = m = 0, g = 180 - g), p = Le(Math.sqrt(N * N + D * D + G * G)), y = Le(Math.sqrt(V * V + q * q)), O = Oo(W, V), d = Math.abs(O) > 2e-4 ? O * Oi : 0, E = F ? 1 / (F < 0 ? -F : F) : 0), r.svg && (Y = t.getAttribute("transform"), r.forceCSS = t.setAttribute("transform", "") || !UT(Zn(t, be)), Y && t.setAttribute("transform", Y))), Math.abs(d) > 90 && Math.abs(d) < 270 && (o ? (p *= -1, d += m <= 0 ? 180 : -180, m += m <= 0 ? 180 : -180) : (y *= -1, d += d <= 0 ? 180 : -180)), n = n || r.uncache, r.x = c - ((r.xPercent = c && (!n && r.xPercent || (Math.round(t.offsetWidth / 2) === Math.round(-c) ? -50 : 0))) ? t.offsetWidth * r.xPercent / 100 : 0) + s, r.y = f - ((r.yPercent = f && (!n && r.yPercent || (Math.round(t.offsetHeight / 2) === Math.round(-f) ? -50 : 0))) ? t.offsetHeight * r.yPercent / 100 : 0) + s, r.z = h + s, r.scaleX = Le(p), r.scaleY = Le(y), r.rotation = Le(m) + a, r.rotationX = Le(_) + a, r.rotationY = Le(g) + a, r.skewX = d + a, r.skewY = v + a, r.transformPerspective = E + s, (r.zOrigin = parseFloat(l.split(" ")[2]) || !n && r.zOrigin || 0) && (i[Lt] = xc(l)), r.xOffset = r.yOffset = 0, r.force3D = Xt.force3D, r.renderTransform = r.svg ? pH : $T ? zT : dH, r.uncache = 0, r
    },
    xc = function(t) {
        return (t = t.split(" "))[0] + " " + t[1]
    },
    Vh = function(t, n, r) {
        var i = rt(n);
        return Le(parseFloat(n) + parseFloat(hi(t, "x", r + "px", i))) + i
    },
    dH = function(t, n) {
        n.z = "0px", n.rotationY = n.rotationX = "0deg", n.force3D = 0, zT(t, n)
    },
    Ei = "0deg",
    aa = "0px",
    Si = ") ",
    zT = function(t, n) {
        var r = n || this,
            i = r.xPercent,
            o = r.yPercent,
            s = r.x,
            a = r.y,
            u = r.z,
            l = r.rotation,
            c = r.rotationY,
            f = r.rotationX,
            h = r.skewX,
            p = r.skewY,
            y = r.scaleX,
            m = r.scaleY,
            _ = r.transformPerspective,
            g = r.force3D,
            d = r.target,
            v = r.zOrigin,
            E = "",
            S = g === "auto" && t && t !== 1 || g === !0;
        if (v && (f !== Ei || c !== Ei)) {
            var w = parseFloat(c) * Zo,
                T = Math.sin(w),
                O = Math.cos(w),
                b;
            w = parseFloat(f) * Zo, b = Math.cos(w), s = Vh(d, s, T * b * -v), a = Vh(d, a, -Math.sin(w) * -v), u = Vh(d, u, O * b * -v + v)
        }
        _ !== aa && (E += "perspective(" + _ + Si), (i || o) && (E += "translate(" + i + "%, " + o + "%) "), (S || s !== aa || a !== aa || u !== aa) && (E += u !== aa || S ? "translate3d(" + s + ", " + a + ", " + u + ") " : "translate(" + s + ", " + a + Si), l !== Ei && (E += "rotate(" + l + Si), c !== Ei && (E += "rotateY(" + c + Si), f !== Ei && (E += "rotateX(" + f + Si), (h !== Ei || p !== Ei) && (E += "skew(" + h + ", " + p + Si), (y !== 1 || m !== 1) && (E += "scale(" + y + ", " + m + Si), d.style[be] = E || "translate(0, 0)"
    },
    pH = function(t, n) {
        var r = n || this,
            i = r.xPercent,
            o = r.yPercent,
            s = r.x,
            a = r.y,
            u = r.rotation,
            l = r.skewX,
            c = r.skewY,
            f = r.scaleX,
            h = r.scaleY,
            p = r.target,
            y = r.xOrigin,
            m = r.yOrigin,
            _ = r.xOffset,
            g = r.yOffset,
            d = r.forceCSS,
            v = parseFloat(s),
            E = parseFloat(a),
            S, w, T, O, b;
        u = parseFloat(u), l = parseFloat(l), c = parseFloat(c), c && (c = parseFloat(c), l += c, u += c), u || l ? (u *= Zo, l *= Zo, S = Math.cos(u) * f, w = Math.sin(u) * f, T = Math.sin(u - l) * -h, O = Math.cos(u - l) * h, l && (c *= Zo, b = Math.tan(l - c), b = Math.sqrt(1 + b * b), T *= b, O *= b, c && (b = Math.tan(c), b = Math.sqrt(1 + b * b), S *= b, w *= b)), S = Le(S), w = Le(w), T = Le(T), O = Le(O)) : (S = f, O = h, w = T = 0), (v && !~(s + "").indexOf("px") || E && !~(a + "").indexOf("px")) && (v = hi(p, "x", s, "px"), E = hi(p, "y", a, "px")), (y || m || _ || g) && (v = Le(v + y - (y * S + m * T) + _), E = Le(E + m - (y * w + m * O) + g)), (i || o) && (b = p.getBBox(), v = Le(v + i / 100 * b.width), E = Le(E + o / 100 * b.height)), b = "matrix(" + S + "," + w + "," + T + "," + O + "," + v + "," + E + ")", p.setAttribute("transform", b), d && (p.style[be] = b)
    },
    mH = function(t, n, r, i, o) {
        var s = 360,
            a = Ve(o),
            u = parseFloat(o) * (a && ~o.indexOf("rad") ? Oi : 1),
            l = u - i,
            c = i + l + "deg",
            f, h;
        return a && (f = o.split("_")[1], f === "short" && (l %= s, l !== l % (s / 2) && (l += l < 0 ? s : -s)), f === "cw" && l < 0 ? l = (l + s * U_) % s - ~~(l / s) * s : f === "ccw" && l > 0 && (l = (l - s * U_) % s - ~~(l / s) * s)), t._pt = h = new It(t._pt, n, r, i, l, Zj), h.e = c, h.u = "deg", t._props.push(r), h
    },
    X_ = function(t, n) {
        for (var r in n) t[r] = n[r];
        return t
    },
    vH = function(t, n, r) {
        var i = X_({}, r._gsap),
            o = "perspective,force3D,transformOrigin,svgOrigin",
            s = r.style,
            a, u, l, c, f, h, p, y;
        i.svg ? (l = r.getAttribute("transform"), r.setAttribute("transform", ""), s[be] = n, a = iu(r, 1), so(r, be), r.setAttribute("transform", l)) : (l = getComputedStyle(r)[be], s[be] = n, a = iu(r, 1), s[be] = l);
        for (u in _r) l = i[u], c = a[u], l !== c && o.indexOf(u) < 0 && (p = rt(l), y = rt(c), f = p !== y ? hi(r, u, l, y) : parseFloat(l), h = parseFloat(c), t._pt = new It(t._pt, a, u, f, h - f, Hp), t._pt.u = y || 0, t._props.push(u));
        X_(a, i)
    };
Mt("padding,margin,Width,Radius", function(e, t) {
    var n = "Top",
        r = "Right",
        i = "Bottom",
        o = "Left",
        s = (t < 3 ? [n, r, i, o] : [n + o, n + r, i + r, i + o]).map(function(a) {
            return t < 2 ? e + a : "border" + a + e
        });
    wc[t > 1 ? "border" + e : e] = function(a, u, l, c, f) {
        var h, p;
        if (arguments.length < 4) return h = s.map(function(y) {
            return sr(a, y, l)
        }), p = h.join(" "), p.split(h[0]).length === 5 ? h[0] : p;
        h = (c + "").split(" "), p = {}, s.forEach(function(y, m) {
            return p[y] = h[m] = h[m] || h[(m - 1) / 2 | 0]
        }), a.init(u, p, f)
    }
});
var GT = {
    name: "css",
    register: zp,
    targetTest: function(t) {
        return t.style && t.nodeType
    },
    init: function(t, n, r, i, o) {
        var s = this._props,
            a = t.style,
            u = r.vars.startAt,
            l, c, f, h, p, y, m, _, g, d, v, E, S, w, T, O;
        dv || zp(), this.styles = this.styles || FT(t), O = this.styles.props, this.tween = r;
        for (m in n)
            if (m !== "autoRound" && (c = n[m], !(Ht[m] && bT(m, n, r, i, t, o)))) {
                if (p = typeof c, y = wc[m], p === "function" && (c = c.call(r, i, t, o), p = typeof c), p === "string" && ~c.indexOf("random(") && (c = eu(c)), y) y(this, t, m, c, r) && (T = 1);
                else if (m.substr(0, 2) === "--") l = (getComputedStyle(t).getPropertyValue(m) + "").trim(), c += "", si.lastIndex = 0, si.test(l) || (_ = rt(l), g = rt(c)), g ? _ !== g && (l = hi(t, m, l, g) + g) : _ && (c += _), this.add(a, "setProperty", l, c, i, o, 0, 0, m), s.push(m), O.push(m, 0, a[m]);
                else if (p !== "undefined") {
                    if (u && m in u ? (l = typeof u[m] == "function" ? u[m].call(r, i, t, o) : u[m], Ve(l) && ~l.indexOf("random(") && (l = eu(l)), rt(l + "") || l === "auto" || (l += Xt.units[m] || rt(sr(t, m)) || ""), (l + "").charAt(1) === "=" && (l = sr(t, m))) : l = sr(t, m), h = parseFloat(l), d = p === "string" && c.charAt(1) === "=" && c.substr(0, 2), d && (c = c.substr(2)), f = parseFloat(c), m in Qn && (m === "autoAlpha" && (h === 1 && sr(t, "visibility") === "hidden" && f && (h = 0), O.push("visibility", 0, a.visibility), Xr(this, a, "visibility", h ? "inherit" : "hidden", f ? "inherit" : "hidden", !f)), m !== "scale" && m !== "transform" && (m = Qn[m], ~m.indexOf(",") && (m = m.split(",")[0]))), v = m in _r, v) {
                        if (this.styles.save(m), E || (S = t._gsap, S.renderTransform && !n.parseTransform || iu(t, n.parseTransform), w = n.smoothOrigin !== !1 && S.smooth, E = this._pt = new It(this._pt, a, be, 0, 1, S.renderTransform, S, 0, -1), E.dep = 1), m === "scale") this._pt = new It(this._pt, S, "scaleY", S.scaleY, (d ? Ko(S.scaleY, d + f) : f) - S.scaleY || 0, Hp), this._pt.u = 0, s.push("scaleY", m), m += "X";
                        else if (m === "transformOrigin") {
                            O.push(Lt, 0, a[Lt]), c = fH(c), S.svg ? Gp(t, c, 0, w, 0, this) : (g = parseFloat(c.split(" ")[2]) || 0, g !== S.zOrigin && Xr(this, S, "zOrigin", S.zOrigin, g), Xr(this, a, m, xc(l), xc(c)));
                            continue
                        } else if (m === "svgOrigin") {
                            Gp(t, c, 1, w, 0, this);
                            continue
                        } else if (m in HT) {
                            mH(this, S, m, h, d ? Ko(h, d + c) : c);
                            continue
                        } else if (m === "smoothOrigin") {
                            Xr(this, S, "smooth", S.smooth, c);
                            continue
                        } else if (m === "force3D") {
                            S[m] = c;
                            continue
                        } else if (m === "transform") {
                            vH(this, c, t);
                            continue
                        }
                    } else m in a || (m = Fs(m) || m);
                    if (v || (f || f === 0) && (h || h === 0) && !Yj.test(c) && m in a) _ = (l + "").substr((h + "").length), f || (f = 0), g = rt(c) || (m in Xt.units ? Xt.units[m] : _), _ !== g && (h = hi(t, m, l, g)), this._pt = new It(this._pt, v ? S : a, m, h, (d ? Ko(h, d + f) : f) - h, !v && (g === "px" || m === "zIndex") && n.autoRound !== !1 ? eH : Hp), this._pt.u = g || 0, _ !== g && g !== "%" && (this._pt.b = l, this._pt.r = Jj);
                    else if (m in a) cH.call(this, t, m, l, d ? d + c : c);
                    else if (m in t) this.add(t, m, l || t[m], d ? d + c : c, i, o);
                    else if (m !== "parseTransform") {
                        iv(m, c);
                        continue
                    }
                    v || (m in a ? O.push(m, 0, a[m]) : O.push(m, 1, l || t[m])), s.push(m)
                }
            }
        T && IT(this)
    },
    render: function(t, n) {
        if (n.tween._time || !pv())
            for (var r = n._pt; r;) r.r(t, r.d), r = r._next;
        else n.styles.revert()
    },
    get: sr,
    aliases: Qn,
    getSetter: function(t, n, r) {
        var i = Qn[n];
        return i && i.indexOf(",") < 0 && (n = i), n in _r && n !== Lt && (t._gsap.x || sr(t, "x")) ? r && H_ === r ? n === "scale" ? iH : rH : (H_ = r || {}) && (n === "scale" ? oH : sH) : t.style && !tv(t.style[n]) ? tH : ~n.indexOf("-") ? nH : fv(t, n)
    },
    core: {
        _removeProperty: so,
        _getMatrix: vv
    }
};
At.utils.checkPrefix = Fs;
At.core.getStyleSaver = FT;
(function(e, t, n, r) {
    var i = Mt(e + "," + t + "," + n, function(o) {
        _r[o] = 1
    });
    Mt(t, function(o) {
        Xt.units[o] = "deg", HT[o] = 1
    }), Qn[i[13]] = e + "," + t, Mt(r, function(o) {
        var s = o.split(":");
        Qn[s[1]] = i[s[0]]
    })
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
Mt("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(e) {
    Xt.units[e] = "px"
});
At.registerPlugin(GT);
var gH = At.registerPlugin(GT) || At;
gH.core.Tween;
export {
    EH as A, OH as B, n2 as C, jH as D, S0 as E, BH as F, gP as G, IH as I, zH as J, TH as L, GH as N, bC as O, bH as Q, WH as R, FH as _, HS as a, kH as b, AH as c, LH as d, MH as e, Sw as f, Sr as g, DH as h, EC as i, Q as j, $H as k, CH as l, _C as m, yC as n, cc as o, Bm as p, wH as q, L as r, SH as s, _H as t, RH as u, xH as v, HH as w, UH as x, gH as y, VH as z
};