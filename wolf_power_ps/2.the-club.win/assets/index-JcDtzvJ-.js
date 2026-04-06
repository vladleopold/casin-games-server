var ps = Object.defineProperty;
var fs = (t, s, o) => s in t ? ps(t, s, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: o
}) : t[s] = o;
var ue = (t, s, o) => (fs(t, typeof s != "symbol" ? s + "" : s, o), o);
import {
    Q as us,
    d as ms,
    c as i1,
    u as R,
    a as ie,
    b as X,
    e as at,
    r as l,
    j as e,
    I as hs,
    f as ht,
    C as xs,
    g as Ve,
    o as rt,
    h as gs,
    i as te,
    _ as Ne,
    k as x,
    E as oe,
    l as vs,
    z as Cs,
    N as et,
    m as q,
    n as c1,
    p as js,
    q as ys,
    s as ws,
    O as d1,
    R as _s,
    t as xe,
    v as we,
    w as p1,
    L as de,
    J as bs,
    x as f1,
    y as Re,
    A as Es,
    B as Ms,
    D as Ns,
    F as Fs,
    G as As
} from "./vendor-core-gWTCaXUA.js";
(function() {
    const s = document.createElement("link").relList;
    if (s && s.supports && s.supports("modulepreload")) return;
    for (const r of document.querySelectorAll('link[rel="modulepreload"]')) a(r);
    new MutationObserver(r => {
        for (const n of r)
            if (n.type === "childList")
                for (const i of n.addedNodes) i.tagName === "LINK" && i.rel === "modulepreload" && a(i)
    }).observe(document, {
        childList: !0,
        subtree: !0
    });

    function o(r) {
        const n = {};
        return r.integrity && (n.integrity = r.integrity), r.referrerPolicy && (n.referrerPolicy = r.referrerPolicy), r.crossOrigin === "use-credentials" ? n.credentials = "include" : r.crossOrigin === "anonymous" ? n.credentials = "omit" : n.credentials = "same-origin", n
    }

    function a(r) {
        if (r.ep) return;
        r.ep = !0;
        const n = o(r);
        fetch(r.href, n)
    }
})();
class He extends Error {
    constructor(s, o) {
        super(`[${s}]: ${o}`), this.code = s, this.text = o
    }
}
class Ss {
    constructor() {
        this.id = 1, this.lastUnauthorizedEvent = 0, this.UNAUTHORIZED_THROTTLE = 3e3
    }
    dispatchUnauthorizedEvent() {
        const s = Date.now();
        s - this.lastUnauthorizedEvent >= this.UNAUTHORIZED_THROTTLE && (window.dispatchEvent(new Event("api:unauthorized")), this.lastUnauthorizedEvent = s)
    }
    async send({
        endpoint: s,
        params: o,
        signal: a,
        headers: r
    }) {
        var i;
        const n = new Request("/rpc", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                ...r
            },
            body: JSON.stringify({
                jsonrpc: "2.0",
                id: this.id++,
                method: s,
                params: o
            }),
            signal: a
        });
        try {
            const c = await fetch(n);
            if (c.status === 500) throw window.location.pathname !== "/" && (window.location.href = "/"), new He(500, c.statusText);
            if (!c.ok) throw new He(c.status, c.statusText);
            const d = await c.json();
            return d.error && ((i = d.error) == null ? void 0 : i.code) === -32001 && this.dispatchUnauthorizedEvent(), d
        } catch (c) {
            throw c instanceof He ? c : (console.error("API Client Error:", c), new He(-1, "Unknown error"))
        }
    }
}
const E = new Ss,
    D = new us({
        defaultOptions: {
            queries: {
                retry: !1,
                refetchIntervalInBackground: !1,
                refetchOnMount: !0,
                refetchOnReconnect: !1,
                refetchOnWindowFocus: !1,
                staleTime: 1 / 0,
                gcTime: 1 / 0
            }
        }
    });

function Os() {
    return !1
}
class le extends Error {
    constructor(o, a, r) {
        var i;
        super(o, r);
        ue(this, "details");
        ue(this, "timestamp");
        this.details = a ? ? {
            code: -1
        }, this.timestamp = new Date;
        const n = (i = D.getQueryData(["Player.getCurrent"])) == null ? void 0 : i.result;
        n && (this.details = { ...this.details,
            playerId: n == null ? void 0 : n.id,
            hallId: n == null ? void 0 : n.hallId
        })
    }
}
const Zs = ms({
        NETWORK_OFF: {
            id: "client_errors/code_0",
            defaultMessage: [{
                type: 0,
                value: "It looks like you are not connected to the Internet. Check the connection and restart the page."
            }]
        },
        SAME_PASSWORD_ERROR: {
            id: "client_errors/code_1",
            defaultMessage: [{
                type: 0,
                value: "Old and new passwords must be different"
            }]
        }
    }),
    Bs = {
        NETWORK_OFF: 0
    },
    nt = {
        [Bs.NETWORK_OFF]: Zs.NETWORK_OFF
    };
class Ge {
    constructor(s, o) {
        ue(this, "messageId");
        ue(this, "message");
        ue(this, "details");
        ue(this, "timestamp");
        var r;
        this.message = s.defaultMessage, this.messageId = s.id, this.details = o ? ? {
            code: s.id
        }, this.timestamp = new Date;
        const a = (r = D.getQueryData(["Player.getCurrent"])) == null ? void 0 : r.result;
        a && (this.details = { ...this.details,
            playerId: a == null ? void 0 : a.id,
            hallId: a == null ? void 0 : a.hallId
        })
    }
}
const se = i1(),
    ks = 1023,
    ee = {
        searchResults: {
            id: "searchResults"
        },
        allGames: {
            id: "allGames",
            icon: "allGames"
        },
        favourites: {
            id: "favourites",
            icon: "heart"
        },
        recommended: {
            id: "recommended",
            icon: "recommended"
        },
        wagerableGames: {
            id: "wagerableGames"
        }
    },
    Ls = {
        favourites: "favourites",
        recommended: "recommended",
        allGames: "all games",
        searchResults: "search results",
        wagerableGames: "Wagerable Games"
    };

function xt(t) {
    return String(t) === ee.allGames.id
}

function u1(t) {
    return t === ee.favourites.id
}

function m1(t) {
    return t === ee.recommended.id
}

function h1(t) {
    return t === ee.wagerableGames.id
}

function Rs(t) {
    return String(t) === ee.searchResults.id
}

function x1(t) {
    return xt(t) || Rs(t) || u1(t) || m1(t) || h1(t)
}

function Hs(t) {
    return Ls[String(t)]
}
const zs = Object.values(ee);

function g1(t) {
    const s = zs.find(o => t === o.id);
    return s && "icon" in s && s.icon ? s.icon : "recommended"
}

function Us(t, s) {
    return `/media/game-provider/${t}/${s}.svg`
}

function Ds(t, s) {
    return `/media/game-category/${t}/${s}.svg`
}

function Ie(t) {
    return `/im/attachment/${t}`
}

function Vs(t) {
    return Array.isArray(t) ? t[t.length - 1] : void 0
}

function Gs(t, s, o) {
    return t.slice(0, s) + o + t.slice(s)
}

function Is(t) {
    return Array.isArray(t) && t.length === 0
}

function Ts(t) {
    return t == null
}
const ge = {
    useConversationList() {
        const {
            isAuth: t
        } = W();
        return R({
            staleTime: 3e4,
            refetchInterval: 3e4,
            enabled: t,
            queryKey: ["Conversation.getList"],
            queryFn: async () => {
                const s = await E.send({
                    endpoint: "Conversation.getList"
                });
                return s.error ? { ...s,
                    result: []
                } : s
            }
        })
    },
    useSendMessage() {
        const t = ie();
        return X({
            mutationKey: ["Conversation.sendMessage"],
            mutationFn: s => E.send({
                endpoint: "Conversation.sendMessage",
                params: s
            }),
            onSettled: async () => await t.invalidateQueries({
                queryKey: ["Conversation.getMessages"]
            })
        })
    },
    useUploadAttachment() {
        const t = ie();
        return X({
            mutationKey: ["Conversation.uploadAttachment"],
            mutationFn: async ({
                conversationId: s,
                file: o
            }) => {
                const a = o.type.startsWith("image/") ? "image" : "video",
                    r = await E.send({
                        endpoint: "Conversation.getAttachmentUpdLink",
                        params: {
                            conversationId: s,
                            type: a
                        }
                    });
                if (r.error) throw new Error(r.error.message);
                const n = r.result.url,
                    i = new FormData;
                i.append("file", o);
                const c = await fetch(n, {
                    method: "POST",
                    body: i
                });
                if (!c.ok) throw new Error(`Upload failed: ${c.statusText}`);
                return {
                    fileUrl: n.split("?")[0],
                    type: a
                }
            },
            onSettled: async () => await t.invalidateQueries({
                queryKey: ["Conversation.getMessages"]
            })
        })
    },
    useConversationHistory(t) {
        const {
            isAuth: s
        } = W();
        return at({
            staleTime: 3e4,
            refetchInterval: 3e4,
            initialPageParam: 0,
            enabled: s && t !== null,
            queryKey: ["Conversation.getMessages", t],
            queryFn: async ({
                pageParam: o
            }) => {
                const a = await E.send({
                    endpoint: "Conversation.getMessages",
                    params: {
                        conversationId: t,
                        startSeqNum: -o,
                        limit: 20
                    }
                });
                return a.error && (a.result = a.result ? ? []), a
            },
            getNextPageParam: (o, a, r) => {
                var c;
                const n = o.result,
                    i = (c = n[n.length - 1]) == null ? void 0 : c.seqNum;
                if (!(n.length === 0 || i === 0)) return i
            },
            getPreviousPageParam: (o, a, r) => {
                if (!(r <= 1)) return r - 1
            }
        })
    }
};

function Ps({
    children: t,
    locale: s,
    basePath: o = "/",
    version: a
}) {
    const [r, n] = l.useState({}), c = `${window.location.hostname.includes(".stage.")?"/":o}i18n/${s}.json?v=${a}`;
    return l.useEffect(() => {
        fetch(c, {
            headers: {
                "Content-Type": "Application/json"
            }
        }).then(d => d.json()).then(d => {
            n(d)
        })
    }, [s]), e.jsx(hs, {
        locale: s,
        messages: r,
        onWarn: d => console.warn(d),
        children: t
    })
}

function w() {
    return {
        $t: ht().formatMessage
    }
}

function pe() {
    return {
        intl: ht()
    }
}

function $s() {
    return ht().locale
}
const I = {
        useNoJackpotGames() {
            return R({
                queryKey: ["Game.getNoJackpotGames"],
                queryFn: () => E.send({
                    endpoint: "Game.getNoJackpotList"
                }),
                select: t => t.result
            })
        },
        useHeaderCategories() {
            const {
                data: t
            } = this.useCategoriesList();
            return (t == null ? void 0 : t.filter(({
                tag: s
            }) => s === "header")) || []
        },
        useNoWagerGames() {
            return R({
                queryKey: ["Game.getNoWagerGames"],
                queryFn: () => E.send({
                    endpoint: "Game.getNoWagerList"
                }),
                select: t => t.result
            })
        },
        useGameRun(t, s) {
            const {
                isAuth: o
            } = W();
            return R({ ...s,
                queryKey: ["Game.run", t, o],
                queryFn: () => E.send({
                    endpoint: "Game.run",
                    params: { ...t,
                        isDemo: !o && Os()
                    }
                }),
                staleTime: 0,
                gcTime: 0
            })
        },
        useCategoriesList() {
            const {
                intl: {
                    locale: t,
                    defaultLocale: s
                }
            } = pe(), o = t || s;
            return R({
                queryKey: ["Game.getCategoriesList", o],
                queryFn: () => E.send({
                    endpoint: "Game.getCategoriesList",
                    params: {
                        lang: o
                    }
                }),
                select: a => {
                    var r;
                    return ((r = a == null ? void 0 : a.result) == null ? void 0 : r.data) ? ? []
                }
            })
        },
        useCategoriesListQuery() {
            const {
                intl: {
                    locale: t,
                    defaultLocale: s
                }
            } = pe(), o = t || s;
            return R({
                queryKey: ["Game.getCategoriesList", o],
                queryFn: () => E.send({
                    endpoint: "Game.getCategoriesList",
                    params: {
                        lang: o
                    }
                })
            })
        },
        useList() {
            return R({
                queryKey: ["Game.getList"],
                queryFn: () => E.send({
                    endpoint: "Game.getList"
                }),
                select: t => {
                    var s;
                    return ((s = t.result) == null ? void 0 : s.data) ? ? []
                }
            })
        },
        useProvidersList() {
            return R({
                queryKey: ["Game.getProvidersList"],
                queryFn: async () => E.send({
                    endpoint: "Game.getProvidersList"
                })
            })
        },
        useRecommendedGames() {
            const {
                isAuth: t
            } = W();
            return R({
                enabled: t,
                queryKey: ["Game.getRecommendations"],
                queryFn: () => E.send({
                    endpoint: "Game.getRecommendations"
                }),
                select: o => o.result
            })
        },
        useRedeemProviderBalance() {
            return X({
                mutationKey: ["Game.redeemProviderBalance"],
                mutationFn: t => E.send({
                    endpoint: "Game.redeemProviderBalance",
                    params: t
                })
            })
        },
        useFavouriteSetter() {
            const t = ie();
            return X({
                mutationFn: s => E.send({
                    endpoint: "Game.updateFavouriteStatus",
                    params: s
                }),
                onSuccess: (s, o) => {
                    s.result === "success" && t.setQueryData(["Game.getList"], a => {
                        const r = a == null ? void 0 : a.result.data;
                        if (!r) return a;
                        const n = r.findIndex(i => i.id === (o == null ? void 0 : o.gameId));
                        if (n !== -1) {
                            const i = [...r];
                            return i[n] = { ...r[n],
                                isFavourite: !r[n].isFavourite
                            }, { ...a,
                                result: { ...a.result,
                                    data: i
                                }
                            }
                        } else return a
                    })
                }
            })
        },
        getGameByStringId(t) {
            var o, a;
            const s = D.getQueryData(["Game.getList"]);
            return (a = (o = s == null ? void 0 : s.result) == null ? void 0 : o.data) == null ? void 0 : a.find(r => r.stringId === t)
        },
        getCategoryNameById(t, s) {
            var a, r, n;
            const o = D.getQueryData(["Game.getCategoriesList", s]);
            return (n = (r = (a = o == null ? void 0 : o.result) == null ? void 0 : a.data) == null ? void 0 : r.find(i => i.id === Number(t))) == null ? void 0 : n.name
        },
        getProviderNameById(t) {
            var o, a, r;
            const s = D.getQueryData(["Game.getProvidersList"]);
            return (r = (a = (o = s == null ? void 0 : s.result) == null ? void 0 : o.data) == null ? void 0 : a.find(n => n.id === Number(t))) == null ? void 0 : r.name
        },
        extractTagHeaderCategory(t) {
            return t.filter(({
                tag: s
            }) => s === "header") || []
        },
        isCategorySportEnabled(t) {
            return this.extractTagHeaderCategory(t).some(({
                actionType: s
            }) => s === "sport_history")
        }
    },
    Ws = {
        useBetHistory() {
            const {
                isAuth: t
            } = W();
            return at({
                enabled: t,
                staleTime: 1e3 * 15,
                queryKey: ["History.getSessions"],
                queryFn: ({
                    pageParam: s
                }) => E.send({
                    endpoint: "History.getSessions",
                    params: {
                        limit: 30,
                        offset: s * 30
                    }
                }),
                initialPageParam: 0,
                getNextPageParam: (s, o, a) => {
                    var r;
                    if (((r = s.result) == null ? void 0 : r.data.length) !== 0) return a + 1
                },
                getPreviousPageParam: (s, o, a) => {
                    if (!(a <= 1)) return a - 1
                }
            })
        },
        useSportBetHistory(t) {
            const {
                isAuth: s
            } = W();
            return at({
                staleTime: 1e3 * 15,
                enabled: s,
                queryKey: ["History.getSport", t],
                queryFn: async ({
                    pageParam: o
                }) => {
                    const a = await E.send({
                        endpoint: "History.getSport",
                        params: {
                            limit: 10,
                            offset: o * 10,
                            status: t
                        }
                    });
                    return a.error ? { ...a,
                        result: {
                            total: 0,
                            data: []
                        }
                    } : a
                },
                initialPageParam: 0,
                getNextPageParam: (o, a, r) => {
                    var n;
                    if (((n = o.result) == null ? void 0 : n.data.length) !== 0) return r + 1
                },
                getPreviousPageParam: (o, a, r) => {
                    if (!(r <= 1)) return r - 1
                }
            })
        }
    },
    qs = {
        slots: null,
        wins: null,
        fetchWinAccept: () => null,
        error: null
    },
    v1 = l.createContext(qs),
    gt = () => {
        const t = l.useContext(v1);
        if (!t) throw new Error("maybe the application is not wrapped in JackpotsProvider Component");
        return t
    },
    Ot = "WEBSOCKET ERROR",
    Ks = "jp-ex",
    Qs = t => (Array.isArray(t == null ? void 0 : t.slots) && (t.slots = C1(t.slots)), Array.isArray(t == null ? void 0 : t.wins) && (t.wins = t.wins.map(j1)), t),
    C1 = t => t.filter(s => s.jackpot_id === Ks).map(Ys),
    Ys = ({
        is_community: t,
        jackpot_id: s,
        value: o,
        slot: a
    }) => ({
        isCommunity: t,
        jackpotId: s,
        value: o,
        slot: a
    }),
    j1 = ({
        jackpot_id: t,
        win_id: s,
        value: o,
        state: a,
        slot: r
    }) => ({
        jackpotId: t,
        value: o,
        state: a,
        slot: r,
        id: s
    }),
    Js = () => {
        const [t, s] = l.useState(null), [o, a] = l.useState(!1), [r, n] = l.useState(null), i = l.useCallback(async p => {
            if (!p) return;
            let f = "";
            const u = `/ws/?stream=${p}`;
            if (window.location.hostname === "localhost") f = "/" + u;
            else {
                const C = `${window.location.host}${u}`;
                f = window.location.protocol === "https:" ? `wss://${C}` : `ws://${C}`
            }
            const m = new xs(f);
            s(m);
            const h = () => {
                    a(!0)
                },
                v = () => {
                    a(!1)
                },
                j = C => {
                    a(!1), console.error(C.message)
                };
            m.on("open", h), m.on("close", v), m.on("error", j)
        }, []), c = async (p, f) => {
            if (!o || !t) throw new Error(Ot);
            return t.call(p, f)
        }, d = (p, f) => {
            if (!o || !t) throw new Error(Ot);
            t.on(p, f)
        };
        return {
            error: r,
            init: i,
            ws: t,
            isOpen: o,
            connect: () => new Promise((p, f) => {
                t == null || t.on("open", () => {
                    console.log("SOCKET OPEN"), a(!0), p()
                }), t == null || t.on("close", () => {
                    console.log("SOCKET CLOSE"), a(!1)
                }), t == null || t.on("error", u => {
                    console.log("SOCKET ERROR", u.message), a(!1), n(u == null ? void 0 : u.message), f(u)
                })
            }),
            handleGetSlotsAndWins: async () => {
                const p = await c("Jackpot.GetState");
                return Qs(p)
            },
            addSlotsListener: p => {
                d("Jackpot.UpdateSlots", f => {
                    p(C1(f == null ? void 0 : f.updates))
                })
            },
            addWinsListener: p => {
                d("Jackpot.WinStatus", f => {
                    p(j1(f == null ? void 0 : f.win))
                })
            },
            acceptWin: async p => {
                await c("Jackpot.AcceptWin", {
                    win_id: p
                })
            }
        }
    },
    y1 = ["mini", "major", "grand", "ultimate"],
    w1 = {
        theme: localStorage.getItem("theme") ? ? "dark",
        Logo: () => null,
        Loader: () => null,
        CloseBtn: void 0,
        Spinner: void 0
    },
    $e = l.createContext(w1);

function Xs({
    children: t,
    ...s
}) {
    const [o, a] = l.useState({ ...w1,
        ...s
    });
    return l.useEffect(() => {
        const r = se.on("THEME_CHANGED", n => {
            a(i => ({ ...i,
                theme: n
            })), localStorage.setItem("theme", n), document.documentElement.className = n
        });
        return () => r()
    }, []), e.jsx($e.Provider, {
        value: o,
        children: t
    })
}
const ae = {
        useLobby() {
            return R({
                queryKey: ["Lobby.getCurrent"],
                queryFn: () => E.send({
                    endpoint: "Lobby.getCurrent"
                }),
                select: t => t.result
            })
        },
        useBannerDesktop() {
            const {
                intl: {
                    locale: t,
                    defaultLocale: s
                }
            } = pe();
            return R({
                queryKey: ["Slider.getSimplified", t || s, "desktop"],
                queryFn: () => E.send({
                    endpoint: "Slider.getSimplified",
                    params: {
                        name: "test",
                        lang: t || s,
                        deviceType: "desktop"
                    }
                }),
                select: o => o.result
            })
        },
        useBannerMobile() {
            const {
                intl: {
                    locale: t,
                    defaultLocale: s
                }
            } = pe();
            return R({
                queryKey: ["Slider.getSimplified", t || s, "mobile"],
                queryFn: () => E.send({
                    endpoint: "Slider.getSimplified",
                    params: {
                        name: "test",
                        lang: t || s,
                        deviceType: "mobile"
                    }
                }),
                select: o => o.result
            })
        },
        useBanner() {
            const {
                intl: {
                    locale: t,
                    defaultLocale: s
                }
            } = pe(), a = me() ? "mobile" : "desktop";
            return R({
                queryKey: ["Slider.getSimplified", t || s, a],
                queryFn: () => E.send({
                    endpoint: "Slider.getSimplified",
                    params: {
                        name: "test",
                        lang: t || s,
                        deviceType: a
                    }
                }),
                select: r => r.result
            })
        }
    },
    _1 = {
        isBalanceVisible: localStorage.getItem("isBalanceVisible") !== "false"
    },
    e2 = l.createContext(_1);

function t2({
    children: t
}) {
    const [s, o] = l.useState(_1);
    return l.useEffect(() => {
        const a = se.on("PLAYER_BALANCE_VISIBILITY_CHANGED", r => {
            o(n => ({ ...n,
                isBalanceVisible: r
            })), localStorage.setItem("isBalanceVisible", String(r))
        });
        return () => a()
    }, []), e.jsx(e2.Provider, {
        value: s,
        children: t
    })
}
const V = {
    useLogIn() {
        const t = ie(),
            s = Ve();
        return X({
            mutationKey: ["Player.logIn"],
            mutationFn: o => E.send({
                endpoint: "Player.logIn",
                params: o
            }),
            onSuccess: async ({
                result: o
            }) => {
                o && (t.removeQueries({
                    type: "inactive"
                }), o.isTwoFactorAuthRequired ? await t.refetchQueries({
                    queryKey: ["Player.getCurrent"]
                }) : (window.dispatchEvent(new Event("player:login")), await t.refetchQueries({
                    type: "active"
                }), se.emit("PLAYER_LOGIN")), s.invalidate())
            }
        })
    },
    useLogOut() {
        const t = ie(),
            s = Ve();
        return X({
            mutationKey: ["Player.logOut"],
            mutationFn: () => E.send({
                endpoint: "Player.logOut"
            }),
            onSuccess: () => {
                t.setQueryData(["Player.getCurrent"], {}), s.invalidate(), window.dispatchEvent(new Event("player:logout"))
            }
        })
    },
    usePlayer() {
        return R({
            refetchInterval: 1e3 * 15,
            queryKey: ["Player.getCurrent"],
            queryFn: () => E.send({
                endpoint: "Player.getCurrent",
                params: {
                    isActive: "true"
                }
            }),
            select: t => t.result
        })
    },
    usePanic() {
        return R({
            refetchInterval: 1e3 * 15,
            queryKey: ["Player.getCurrent"],
            queryFn: () => E.send({
                endpoint: "Player.getCurrent",
                params: {
                    isActive: "true"
                }
            })
        })
    },
    useUpdatePlayer() {
        const t = ie();
        return X({
            mutationFn: s => E.send({
                endpoint: "Player.update",
                params: s
            }),
            onSuccess: s => {
                s.error && console.error(s.error), s.result === "success" && t.invalidateQueries({
                    queryKey: ["Player.getCurrent"]
                })
            }
        })
    },
    useBonusHistory() {
        const {
            isAuth: t
        } = W();
        return R({
            staleTime: 1e3 * 15,
            enabled: t,
            queryKey: ["Bonus.getHistory"],
            queryFn: async () => {
                const s = await E.send({
                    endpoint: "Bonus.getHistory"
                });
                return s.error && console.error(s.error), s
            },
            select: s => {
                var o;
                return (o = s == null ? void 0 : s.result) == null ? void 0 : o.data
            }
        })
    },
    useBonusDescription() {
        const {
            isAuth: t
        } = W();
        return R({
            staleTime: 1e3 * 15,
            enabled: t,
            queryKey: ["Bonus.getDescription"],
            queryFn: async () => {
                const s = await E.send({
                    endpoint: "Bonus.getDescription"
                });
                return s.error && console.error(s.error), s
            }
        })
    },
    useActivateBonus() {
        const t = ie();
        return X({
            networkMode: "always",
            mutationKey: ["Bonus.activate"],
            mutationFn: () => (rt.isOnline() || se.emit("ERROR", {
                error: new Ge(nt[0])
            }), E.send({
                endpoint: "Bonus.activate"
            })),
            onError: s => se.emit("ERROR", {
                error: new le(s.message)
            }),
            onSuccess: s => {
                if (s.error) {
                    const o = new le(s.error.message, {
                        code: s.error.code
                    });
                    se.emit("ERROR", {
                        error: o
                    })
                }
                t.invalidateQueries({
                    queryKey: ["Player.getCurrent"]
                }), t.invalidateQueries({
                    queryKey: ["Player.getBalancesEx"]
                }), t.invalidateQueries({
                    queryKey: ["Bonus.getHistory"]
                })
            }
        })
    },
    useBalances() {
        const {
            isAuth: t
        } = W();
        return R({
            refetchInterval: 1e3 * 15,
            staleTime: 1e3 * 15,
            enabled: t,
            queryKey: ["Player.getBalancesEx"],
            queryFn: async () => {
                const s = await E.send({
                    endpoint: "Player.getBalancesEx"
                });
                return s.error && console.error(s.error), s
            },
            select: s => s.result
        })
    },
    useQueryBalances() {
        const {
            isAuth: t
        } = W();
        return R({
            refetchInterval: 1e3 * 15,
            staleTime: 1e3 * 15,
            enabled: t,
            queryKey: ["Player.getBalancesEx"],
            queryFn: async () => await E.send({
                endpoint: "Player.getBalancesEx"
            })
        })
    },
    useChangePassword() {
        return X({
            mutationKey: ["Player.changePassword"],
            mutationFn: t => E.send({
                endpoint: "Player.changePassword",
                params: t
            }),
            onSuccess: t => {
                t.error && console.error(t.error)
            }
        })
    },
    useRegister() {
        return X({
            mutationKey: ["Player.register"],
            mutationFn: t => E.send({
                endpoint: "Player.register",
                params: t
            }),
            onSuccess: t => {
                t.error && console.error(t.error)
            }
        })
    },
    useResetPassword() {
        return X({
            mutationKey: ["Player.resetPassword"],
            mutationFn: t => E.send({
                endpoint: "Player.resetPassword",
                params: t
            }),
            onSuccess: t => {
                t.error && console.error(t.error)
            }
        })
    }
};
class s2 {
    static parseInteger(s) {
        if (typeof s == "number") return this.isSafeInteger(s) ? s : void 0;
        if (typeof s == "string" && /^-?\d+$/.test(s)) return this.parseInteger(Number.parseInt(s, 10))
    }
    static isFinite(s) {
        return Number.isFinite(s)
    }
    static isSafeInteger(s) {
        return Number.isSafeInteger(s)
    }
    static parseFloat(s) {
        if (typeof s == "number") return Number.isFinite(s) ? s : void 0;
        if (typeof s == "string") return Number.parseFloat(s)
    }
}

function l2() {
    function t(s, o = {}) {
        if (s == null) return "—";
        if (!s2.isFinite(s)) return "NaN";
        const a = o.currency ? {
            style: "currency",
            currencyDisplay: "code",
            ...o
        } : o;
        let r = "ru-RU";
        return document.documentElement.lang === "ar" && (r = "ar"), new Intl.NumberFormat(r, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
            trailingZeroDisplay: "stripIfInteger",
            ...a
        }).formatToParts(s / 100).map(i => i.type === "decimal" ? "." : i.value).join("")
    }
    return {
        formatMoney: t
    }
}
const Zt = {
    "c23stage.com": "stage",
    localhost: "local"
};

function o2() {
    const t = window.location.hostname;
    let s = "prod";
    for (const o in Zt) {
        const a = new RegExp(`^(.*?)\\.${o}$`);
        if (t.match(a) || t === o) {
            s = Zt[o];
            break
        }
    }
    return s
}
const re = ({
        withFormatter: t = !0
    } = {}) => {
        const {
            data: s
        } = V.usePlayer(), {
            formatMoney: o
        } = l2(), a = s != null && s.currency ? s == null ? void 0 : s.currency : void 0;
        return t ? (r, n = {}) => o(r, {
            currency: a,
            ...n
        }) : (r, n = {}) => o(r * 100, {
            currency: a,
            ...n
        })
    },
    ye = {
        useWheelSettings() {
            const {
                intl: {
                    locale: t,
                    defaultLocale: s
                }
            } = pe(), o = t || s;
            return R({
                refetchInterval: 1e3 * 15,
                queryKey: ["FortuneWheel.getSettings", o],
                queryFn: () => E.send({
                    params: {
                        lang: o
                    },
                    endpoint: "FortuneWheel.getSettings"
                })
            })
        },
        useWheelWinner() {
            return R({
                queryKey: ["FortuneWheel.getWin"],
                queryFn: () => E.send({
                    endpoint: "FortuneWheel.getWin"
                }),
                select: t => t.result
            })
        },
        useWheelSpin() {
            return X({
                mutationKey: ["FortuneWheel.getWin"],
                mutationFn: () => E.send({
                    endpoint: "FortuneWheel.getWin"
                })
            })
        },
        useIsWheelAvailable() {
            var s;
            const {
                data: t
            } = ae.useLobby();
            return !!((s = t == null ? void 0 : t.fortuneWheel) != null && s.isActive)
        }
    },
    Bt = {
        usePinGenerator() {
            return X({
                mutationKey: ["MemberCard.generatePin"],
                mutationFn: () => E.send({
                    endpoint: "MemberCard.generatePin"
                })
            })
        },
        useCurrent() {
            return R({
                queryKey: ["MemberCard.getCurrent"],
                queryFn: async () => {
                    const t = await E.send({
                        endpoint: "MemberCard.getCurrent"
                    });
                    return t.error && se.emit("ERROR", {
                        error: new le(t.error.message, {
                            code: t.error.code
                        })
                    }), t
                },
                select: t => t.result
            })
        }
    };

function W() {
    const {
        data: t,
        isFetching: s
    } = V.usePlayer();
    return {
        isAuth: !!t,
        isAuthInProgress: s
    }
}

function _e() {
    const {
        $t: t
    } = w();

    function s(o) {
        return o instanceof le ? t({
            id: `api_errors/code_${o.details.code}`,
            defaultMessage: o.message
        }) : o instanceof Ge ? t({
            id: o.messageId,
            defaultMessage: o.message
        }) : String(o)
    }
    return {
        formatMessage: s
    }
}

function We(t = 0) {
    const [s, o] = l.useState(0), a = l.useMemo(() => (t + 60) * 1e3, [t]);
    return l.useEffect(() => {
        if (!a) return;

        function r() {
            o(Math.max(a - Date.now(), 0))
        }
        const n = setInterval(r, 1e3);
        return r(), () => clearInterval(n)
    }, [a]), s
}

function a2(t, s) {
    const o = l.useRef(null);
    return l.useEffect(() => {
        var r;
        s && (o.current = s);
        const a = new AbortController;
        return (r = o.current) == null || r.addEventListener("scroll", n => {
            n.stopPropagation();
            const {
                scrollHeight: i,
                scrollTop: c,
                clientHeight: d
            } = n.currentTarget;
            Math.abs(i - d - c) < 1 && t()
        }, {
            signal: a.signal
        }), () => a.abort()
    }, [t, s]), o
}

function me(t = ks) {
    return gs({
        query: `(max-width: ${t}px)`
    })
}

function r2() {
    const t = te();
    return s => {
        const o = document.getElementById("navigate-category-anchor");
        o && document.documentElement.scrollTop > o.offsetTop && window.scrollTo({
            top: o.offsetTop - window.innerHeight / 2
        }), t({
            replace: !0,
            search: a => ({ ...a,
                game: void 0,
                pid: void 0,
                cid: xt(s) ? void 0 : s
            })
        })
    }
}

function Te(t) {
    const [s, o] = l.useState(!!t), a = l.useCallback(() => {
        o(r => !r)
    }, []);
    return [s, a, o]
}

function n2() {
    return l.useContext($e).Loader
}

function i2() {
    return l.useContext($e).Spinner
}

function b1() {
    return l.useContext($e).CloseBtn
}

function kt() {
    const t = window.document;
    return t.fullscreenElement || t.webkitFullscreenElement || t.mozFullScreenElement || t.msFullscreenElement
}
async function c2() {
    const t = window.document;
    return typeof t.exitFullscreen == "function" ? t.exitFullscreen() : typeof t.msExitFullscreen == "function" ? t.msExitFullscreen() : typeof t.webkitExitFullscreen == "function" ? t.webkitExitFullscreen() : typeof t.mozCancelFullScreen == "function" ? t.mozCancelFullScreen() : null
}
async function d2(t) {
    var o, a, r, n, i;
    const s = t;
    return ((o = s.requestFullscreen) == null ? void 0 : o.call(s)) || ((a = s.msRequestFullscreen) == null ? void 0 : a.call(s)) || ((r = s.webkitEnterFullscreen) == null ? void 0 : r.call(s)) || ((n = s.webkitRequestFullscreen) == null ? void 0 : n.call(s)) || ((i = s.mozRequestFullscreen) == null ? void 0 : i.call(s))
}
const Lt = ["", "webkit", "moz", "ms"];

function Rt(t, {
    onFullScreen: s,
    onError: o
}) {
    return Lt.forEach(a => {
        t.addEventListener(`${a}fullscreenchange`, s), t.addEventListener(`${a}fullscreenerror`, o)
    }), () => {
        Lt.forEach(a => {
            t.removeEventListener(`${a}fullscreenchange`, s), t.removeEventListener(`${a}fullscreenerror`, o)
        })
    }
}

function p2() {
    const [t, s] = l.useState(!1), o = l.useRef(), a = l.useCallback(c => {
        s(c.target === kt())
    }, [s]), r = l.useCallback(c => {
        s(!1), console.error(`[@mantine/hooks] use-fullscreen: Error attempting full-screen mode method: ${c} (${c.target})`)
    }, [s]), n = l.useCallback(async () => {
        kt() ? await c2() : await d2(o.current)
    }, []), i = l.useCallback(c => {
        c === null ? o.current = window.document.documentElement : o.current = c
    }, []);
    return l.useEffect(() => {
        if (!o.current && window.document) return o.current = window.document.documentElement, Rt(o.current, {
            onFullScreen: a,
            onError: r
        });
        if (o.current) return Rt(o.current, {
            onFullScreen: a,
            onError: r
        })
    }, []), {
        ref: i,
        toggle: n,
        fullscreen: t
    }
}
const vt = (t, s = 400) => {
    let o;
    return (...a) => {
        clearTimeout(o), o = setTimeout(() => t(...a), s)
    }
};

function Ct(t) {
    const s = t / 1e3,
        o = Math.floor(s / 3600),
        a = Math.floor(s % 3600 / 60),
        r = Math.floor(s % 60);
    return `${o.toString().padStart(2,"0")} : ${a.toString().padStart(2,"0")} : ${r.toString().padStart(2,"0")}`
}

function Ae(t) {
    return s => Array.from({
        length: t
    }, (o, a) => s(a))
}
const f2 = t => {
    const s = Number(t);
    return !Number.isNaN(s) && s > 0
};

function u2(t, s) {
    return t.match(new RegExp(".{1," + s + "}", "g"))
}
const m2 = {
    ar: {
        code: "ar",
        name: "العربية"
    },
    de: {
        code: "de",
        name: "Deutsch"
    },
    el: {
        code: "el",
        name: "Ελληνικά"
    },
    en: {
        code: "en",
        name: "English"
    },
    es: {
        code: "es",
        name: "Español"
    },
    fr: {
        code: "fr",
        name: "Français"
    },
    he: {
        code: "he",
        name: "עברית"
    },
    hr: {
        code: "hr",
        name: "Hrvatski"
    },
    pl: {
        code: "pl",
        name: "Polski"
    },
    pt: {
        code: "pt",
        name: "Português"
    },
    ro: {
        code: "ro",
        name: "Română"
    },
    ru: {
        code: "ru",
        name: "Русский"
    },
    sq: {
        code: "sq",
        name: "Shqip"
    },
    sr: {
        code: "sr",
        name: "Српски"
    },
    "sr-en": {
        code: "sr-en",
        name: "Serbian"
    },
    tr: {
        code: "tr",
        name: "Türkçe"
    },
    uk: {
        code: "uk",
        name: "Українська"
    },
    zh: {
        code: "zh",
        name: "中文"
    }
};
class h2 {
    constructor() {
        ue(this, "sounds", new Map);
        ue(this, "preloadPromise", null)
    }
    async play(s) {
        let o = this.sounds.get(s);
        if (!o) {
            const a = await this.importSound(s);
            o = new Audio(a), this.sounds.set(s, o)
        }
        o.currentTime = 0, o.play().catch(console.error)
    }
    stop(s) {
        const o = this.sounds.get(s);
        o && (o.pause(), o.currentTime = 0)
    }
    stopAll() {
        this.sounds.forEach(s => {
            s.pause(), s.currentTime = 0
        })
    }
    async preloadAll() {
        return this.preloadPromise ? this.preloadPromise : (this.preloadPromise = (async () => {
            const s = ["alert", "coin", "congratulations", "wheel", "wheel-stopped"];
            await Promise.all(s.map(async o => {
                if (!this.sounds.has(o)) {
                    const a = await this.importSound(o),
                        r = new Audio(a);
                    this.sounds.set(o, r)
                }
            }))
        })(), this.preloadPromise)
    }
    async importSound(s) {
        switch (s) {
            case "alert":
                return (await Ne(() =>
                    import ("./alert-CDsrOste.js"), [])).default;
            case "coin":
                return (await Ne(() =>
                    import ("./coin-Cn3MMCVS.js"), [])).default;
            case "congratulations":
                return (await Ne(() =>
                    import ("./congratulations-Q9yANWQX.js"), [])).default;
            case "wheel":
                return (await Ne(() =>
                    import ("./wheel-DmNRHO6Z.js"), [])).default;
            case "wheel-stopped":
                return (await Ne(() =>
                    import ("./wheel-stopped-BgA-Qh4M.js"), [])).default
        }
    }
}
const Ce = new h2;

function x2({
    message: t,
    description: s,
    type: o = "error",
    closable: a = !1,
    onClose: r,
    afterClose: n
}) {
    function i(c) {
        r == null || r(c);
        const d = c.currentTarget.parentElement;
        if (!d) return;
        const p = d.offsetHeight;
        d.style.maxHeight = p + "px", d.classList.add("alert-motion_leave", "alert-motion_leave-active"), d.addEventListener("transitionend", f => {
            f.propertyName === "opacity" && (n == null || n())
        })
    }
    return e.jsxs("div", {
        className: x(`alert alert-motion_show alert_type_${o}`, {
            "alert_with-description": !!s
        }),
        children: [e.jsxs("div", {
            className: "min-w-0 flex-1 space-y-2 text-black/90 dark:text-white/85",
            children: [e.jsx("div", {
                className: "alert__message",
                children: t
            }), s && e.jsx("div", {
                className: "alert__description",
                children: s
            })]
        }), a && e.jsx("button", {
            className: "ms-2",
            type: "button",
            onClick: i,
            children: e.jsx("span", {
                children: e.jsx("svg", {
                    viewBox: "64 64 896 896",
                    width: "1em",
                    height: "1em",
                    fill: "currentColor",
                    children: e.jsx("path", {
                        d: "M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"
                    })
                })
            })
        })]
    })
}
const g2 = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
        viewBox: "0 0 16 10",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "M0 1a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm6 0a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zM1 6a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1z"
    })),
    v2 = g2,
    C2 = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
        viewBox: "0 0 24 24",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24ZM9.69 2.06c1.52-.35 3.1-.35 4.62 0l-2.3 1.39-2.32-1.39Zm-2.2.79L11.1 5v2.63l-3.35 2.43-2.45-.85-.7-4.24c.83-.87 1.8-1.6 2.9-2.13ZM3.11 7l.43 2.59-1.72 1.71c.1-1.5.54-2.98 1.29-4.3Zm-1.16 6.73 2.79-2.8 2.45.85 1.3 4-1.17 1.89-3.95-.23c-.72-1.13-1.2-2.4-1.42-3.71Zm2.96 5.6 2.29.14.8 1.92a10.2 10.2 0 0 1-3.09-2.06Zm5.33 2.72-1.42-3.37 1.15-1.88h4.05l1.1 1.9-1.26 3.33c-1.2.22-2.42.23-3.62.02Zm5.8-.68.67-1.82 2 .13c-.8.7-1.7 1.27-2.68 1.7Zm4.23-3.4-3.63-.23-1.12-1.95 1.3-4.01 2.42-.83L22 13.97a10.15 10.15 0 0 1-1.74 4Zm1.92-6.47-1.73-1.88L20.9 7a10.14 10.14 0 0 1 1.29 4.5ZM19.4 5l-.7 4.24-2.46.84-3.35-2.43V5l3.6-2.16c1.1.53 2.07 1.26 2.9 2.14ZM8.96 11.42 12 9.21l3.05 2.21L13.88 15h-3.76l-1.16-3.58Z"
    })),
    j2 = C2,
    y2 = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
        viewBox: "0 0 8 10",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "M8 .53v8.53c0 .4-.39.69-.77.46L.26 5.26a.55.55 0 0 1 0-.92C.63 4.1 6.8.34 7.24.07c.33-.2.76.02.76.46Z"
    })),
    w2 = y2,
    _2 = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
        viewBox: "0 0 13 16",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "M6.19.6.17 2.43.14 7.1a8.48 8.48 0 0 0 4.11 7.32L6.2 15.6l1.94-1.17a8.48 8.48 0 0 0 4.1-7.32l-.02-4.67zM3.7 7.3a.28.28 0 0 1 .4 0l1.37 1.38c.11.11.3.11.4 0l3-3a.28.28 0 0 1 .4 0l.56.58c.11.1.11.29 0 .4l-4.16 4.16-2.54-2.55a.28.28 0 0 1 0-.4z"
    })),
    b2 = _2,
    E2 = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
        viewBox: "0 0 20 17",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "M11.584 2.17a6.234 6.234 0 1 1 0 12.469v1.781a8.015 8.015 0 1 0-8.016-8.015H5.35a6.234 6.234 0 0 1 6.234-6.235M4.459 13.748l3.085-5.343h-6.17zm8.397-6.878-.898-2.766-.9 2.766H8.152l2.353 1.71-.9 2.766 2.354-1.71 2.353 1.71-.9-2.766 2.354-1.71z"
    })),
    M2 = E2,
    N2 = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
        viewBox: "0 0 80 69",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "M79.93 33.13a2.38 2.38 0 0 1-2.43 2.34h-3.02v24.86a8.41 8.41 0 0 1-8.41 8.41H13.93a8.41 8.41 0 0 1-8.41-8.41V35.47H2.36A2.36 2.36 0 0 1 0 33.13L0 24.47a8.41 8.41 0 0 1 8.41-8.42h5.15V10.8c0-.6.22-1.22.67-1.67l5.38-5.38c.61-.6 1.44-.83 2.28-.6l8.87 2.19 1.82-3.65A2.34 2.34 0 0 1 34.7.33h10.78c.9 0 1.73.52 2.12 1.28l1.82 3.71 8.87-2.2c.83-.21 1.67 0 2.28.62l5.37 5.38c.46.45.68 1.06.68 1.66v5.27h4.97A8.41 8.41 0 0 1 80 24.47l-.07 8.66ZM69.45 60.36V35.47H50.62v28.47h15.24c1.99 0 3.59-1.6 3.59-3.58Zm-35.1 3.58h11.3V35.47h-11.3v28.47Zm0-33.13h11.3v-9.93h-11.3v9.93ZM10.27 60.36c0 1.98 1.6 3.58 3.58 3.58h15.52V35.47h-19.1v24.89Zm-2-39.48a3.58 3.58 0 0 0-3.59 3.59v6.34h24.69v-9.93H8.28Zm22.58-10.62-8.8-2.2-3.72 3.72v4.27h18.3l-5.78-5.79ZM43.97 5.1h-7.8l-1.29 2.5 5.16 5.16L45.2 7.6l-1.23-2.5Zm17.9 6.68-3.72-3.71-8.8 2.19-5.78 5.8h18.3v-4.28Zm13.16 12.69c0-1.99-1.6-3.59-3.58-3.59H50.62v9.93h24.41v-6.34Z"
    })),
    F2 = N2,
    A2 = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        className: "translate-x-[8%]",
        width: "100%",
        height: "100%",
        viewBox: "0 0 246 276",
        ...t
    }, l.createElement("mask", {
        id: "bonusStamp-b",
        fill: "#fff"
    }, l.createElement("path", {
        fillRule: "evenodd",
        d: "M32.78 245.7c-39.33-39.34-39.33-103.11 0-142.44 2.46-2.46 5-4.75 7.63-6.9A131.2 131.2 0 0 1 61.46 69.1c11.3-11.3 27.87-23.58 40.94-26.97.53-.14.82.48.45.9-4.31 4.96-6.33 10.92-6.43 14.95v.1c-.18 6.8-.27 10.25 1.15 15.88 1.03-.06 2.05-.11 3.08-.15 2.44-3.46 3.96-8.18 5.62-13.34l1.15-3.53c3.25-9.74 14.1-20.51 22.87-23.1l3.25-.93c2.28-.64 4.55-1.28 6.8-2.04 1.1-.38 2.32-.75 3.58-1.13 6.24-1.9 13.78-4.2 17.25-9.65.28-.43.93-.34 1 .14.62 4.73-.23 9.24-3.27 13.46-2.7 3.74-6.18 6.55-9.72 9.44-.73.59-1.47 1.18-2.2 1.79-7.45 6.18-9.5 15.23-9.03 24.3.04.56.8.62 1.06.09 5.27-10.56 15.6-19.16 26.93-20.86 2.3-.34 6.05-.7 9.66-1.03 3.01-.28 5.93-.55 7.84-.8C207.9 43.34 225.9 24.05 235 3.94c.23-.51.95-.5 1.04.03 3.88 22.8 2.59 46.48-10.51 67.44-4.53 7.24-9.83 11.76-14.7 15.91-9.16 7.82-16.76 14.3-14.66 35.13 5.83-5.6 14.75-8.16 22.9-8.71.72-.05 1.12.67.63 1.24-4.21 4.87-7.06 8.62-7.82 16.02-.37 3.6-.45 7.2-.53 10.8-.12 5.6-.24 11.2-1.45 16.77h-.02c-1.15 5.28-8.14 12.43-10.4 17.3-2 20.86-11.1 47.77-30.94 67.6-34.88 34.88-96.42 41.55-135.76 2.22Z",
        clipRule: "evenodd"
    })), l.createElement("path", {
        fill: "#FFB23F",
        fillRule: "evenodd",
        d: "M32.78 245.7c-39.33-39.34-39.33-103.11 0-142.44 2.46-2.46 5-4.75 7.63-6.9A131.2 131.2 0 0 1 61.46 69.1c11.3-11.3 27.87-23.58 40.94-26.97.53-.14.82.48.45.9-4.31 4.96-6.33 10.92-6.43 14.95v.1c-.18 6.8-.27 10.25 1.15 15.88 1.03-.06 2.05-.11 3.08-.15 2.44-3.46 3.96-8.18 5.62-13.34l1.15-3.53c3.25-9.74 14.1-20.51 22.87-23.1l3.25-.93c2.28-.64 4.55-1.28 6.8-2.04 1.1-.38 2.32-.75 3.58-1.13 6.24-1.9 13.78-4.2 17.25-9.65.28-.43.93-.34 1 .14.62 4.73-.23 9.24-3.27 13.46-2.7 3.74-6.18 6.55-9.72 9.44-.73.59-1.47 1.18-2.2 1.79-7.45 6.18-9.5 15.23-9.03 24.3.04.56.8.62 1.06.09 5.27-10.56 15.6-19.16 26.93-20.86 2.3-.34 6.05-.7 9.66-1.03 3.01-.28 5.93-.55 7.84-.8C207.9 43.34 225.9 24.05 235 3.94c.23-.51.95-.5 1.04.03 3.88 22.8 2.59 46.48-10.51 67.44-4.53 7.24-9.83 11.76-14.7 15.91-9.16 7.82-16.76 14.3-14.66 35.13 5.83-5.6 14.75-8.16 22.9-8.71.72-.05 1.12.67.63 1.24-4.21 4.87-7.06 8.62-7.82 16.02-.37 3.6-.45 7.2-.53 10.8-.12 5.6-.24 11.2-1.45 16.77h-.02c-1.15 5.28-8.14 12.43-10.4 17.3-2 20.86-11.1 47.77-30.94 67.6-34.88 34.88-96.42 41.55-135.76 2.22Z",
        clipRule: "evenodd"
    }), l.createElement("path", {
        fill: "url(#bonusStamp-a)",
        d: "m32.78 103.26 9.05 9.05zm7.63-6.9 11.1 6.38-1.18 2.05-1.83 1.48zM61.46 69.1l9.05 9.05zm40.94-26.97 3.22 12.38zm.45.9 9.67 8.39-.01.01zm-6.43 14.95-12.8-.33zm0 .1-12.8-.32zm1.15 15.88.81 12.77-10.62.68-2.6-10.33 12.4-3.12Zm3.08-.15 10.46 7.38-3.67 5.2-6.37.21zm5.62-13.34 12.18 3.92zm1.15-3.53L119.56 61l-12.14-4.05Zm22.87-23.1 3.63 12.28h-.01l-3.62-12.27Zm3.25-.93-3.48-12.3v-.01zm6.8-2.04-4.1-12.13h.01zm3.58-1.13-3.73-12.24zm17.25-9.65-10.8-6.87.03-.03.02-.03zm1 .14-12.7 1.68v-.01zM158.9 33.7l10.37 7.49v.01zm-9.72 9.44-8.07-9.94zm-2.2 1.79 8.18 9.84v.01zm-9.03 24.3-12.76.83-.01-.08v-.08zm1.06.09-11.46-5.7v-.01zm26.93-20.86-1.9-12.65zm9.66-1.03-1.19-12.74 1.2 12.74Zm7.84-.8 1.7 12.68h-.02zM235 3.94l-11.66-5.27v-.02zm1.04.03 12.61-2.17v.03l-12.6 2.14Zm-10.51 67.44 10.85 6.78zm-14.7 15.91 8.3 9.74zm-14.66 35.13 8.88 9.23-18.96 18.22-2.65-26.16 12.74-1.29Zm22.9-8.71.92 12.76h-.06zm.63 1.24 9.74 8.3-.03.04-.03.03zM211.88 131l12.73 1.3zm-.53 10.8 12.8.29-12.8-.28Zm-1.45 16.77 12.5 2.72-2.08 9.57-9.78.49zm-.02 0-12.5-2.72 2.08-9.57 9.78-.49zm-10.4 17.3-12.74-1.22.2-2.19.93-1.99 11.6 5.4ZM41.83 112.3a87.92 87.92 0 0 0 0 124.33l-18.1 18.1c-44.32-44.33-44.32-116.2 0-160.53zm6.67-6.04a89 89 0 0 0-6.67 6.04l-18.1-18.1c2.76-2.76 5.63-5.35 8.6-7.76zm22-28.12a118.4 118.4 0 0 0-19 24.6L29.32 89.96c6-10.42 13.68-20.5 23.1-29.92l18.09 18.1Zm35.11-23.63c-4.49 1.16-10.49 4.16-17.13 8.7A129.6 129.6 0 0 0 70.5 78.15l-18.1-18.1a155 155 0 0 1 21.64-17.97c7.74-5.28 16.55-10.11 25.14-12.34l6.42 24.78ZM93.2 34.64A12.2 12.2 0 0 0 91.47 48c2.5 5.1 8.34 8.02 14.16 6.51l-6.45-24.76a13.26 13.26 0 0 1 15.28 7 13.4 13.4 0 0 1-1.94 14.67L93.19 34.64Zm-9.57 23c.2-7.23 3.47-15.99 9.58-23l19.3 16.8a15.2 15.2 0 0 0-2.58 4.21 9 9 0 0 0-.71 2.67zm0 .12v-.1l25.59.65v.1zm1.54 19.32c-1.89-7.5-1.71-12.5-1.54-19.32l25.58.65c-.17 6.78-.17 8.66.78 12.43zm15.91 9.52c-.9.03-1.8.07-2.69.13L96.76 61.2c1.15-.07 2.31-.13 3.47-.17l.84 25.58Zm17.38-22.21c-1.47 4.57-3.54 11.4-7.34 16.8L90.19 66.44c1.08-1.53 2.05-4.14 3.9-9.88l24.36 7.83Zm1.1-3.4-1.1 3.4-24.36-7.83c.36-1.15.76-2.4 1.19-3.67zm14.36-14.87c-1.6.47-4.7 2.25-8.06 5.62-3.28 3.3-5.47 6.8-6.3 9.25l-24.27-8.1c2.43-7.28 7.29-14.04 12.44-19.21 5.07-5.1 11.77-10 18.95-12.1l7.23 24.54Zm3.12-.9-3.12.9-7.25-24.55 3.4-.97 6.97 24.63Zm7.4-2.23c-2.6.88-5.18 1.6-7.4 2.24l-6.97-24.63c2.32-.66 4.29-1.22 6.18-1.86l8.2 24.25Zm3.22-1.01c-1.3.4-2.33.7-3.22 1.01l-8.18-24.25c1.32-.45 2.72-.87 3.94-1.24zm24.32-15.01c-3.55 5.56-8.7 8.81-12.83 10.8-4.14 2-8.54 3.31-11.5 4.21L140.2 17.5c3.3-1 5.78-1.79 7.84-2.78 2.06-1 2.42-1.62 2.35-1.5zm-22.5-5.07c.82 6.22 5.8 9.93 10.5 10.6a12.2 12.2 0 0 0 11.95-5.47l-21.5-13.87c2.97-4.6 8.2-6.7 13.11-6.01 5.1.72 10.44 4.72 11.32 11.42l-25.37 3.33Zm-.95 4.3c.9-1.25 1.2-2.4.96-4.3l25.37-3.34c1 7.55-.4 15.43-5.58 22.62L148.52 26.2Zm-7.41 7c3.75-3.06 5.86-4.86 7.42-7l20.73 15c-3.85 5.32-8.67 9.14-12.02 11.86l-16.13-19.87Zm-2.3 1.87 2.3-1.88 16.13 19.87-2.08 1.7zM125.17 69.9c-.59-11.2 1.85-25.04 13.65-34.82l16.33 19.7c-3.11 2.58-4.78 6.83-4.42 13.77l-25.55 1.35Zm25.3 5.12a13.43 13.43 0 0 1-13.12 7.42 13.26 13.26 0 0 1-12.16-12.38l25.53-1.67a12.32 12.32 0 0 0-11.28-11.46 12.16 12.16 0 0 0-11.89 6.7L150.47 75Zm17.37-13.9c-6.47.97-13.62 6.37-17.38 13.91l-22.9-11.42c6.77-13.57 20.29-25.37 36.48-27.8l3.8 25.3Zm8.95-.95c-3.79.36-7.1.67-8.95.95l-3.8-25.31c2.75-.41 6.94-.8 10.38-1.12zm8.33-.86c-2.22.3-5.44.6-8.33.86l-2.38-25.48c3.13-.3 5.74-.54 7.35-.75zm61.54-50.09c-10.16 22.45-31.1 46.02-61.53 50.09l-3.39-25.37c18.53-2.48 33.56-17.48 41.6-35.26L246.66 9.2Zm-23.23-3.06a12.32 12.32 0 0 0 11.74 10.2c4.74.16 9.38-2.49 11.48-7.12l-23.3-10.58a13.4 13.4 0 0 1 12.63-7.87c5.5.17 11.47 4.02 12.67 11.02zm-8.75 58.48C225.53 47.26 227 27.1 223.43 6.12l25.23-4.29c4.18 24.58 3.06 51.8-12.28 76.36l-21.7-13.56Zm-12.15 12.95c4.86-4.14 8.77-7.55 12.15-12.95l21.7 13.56c-5.68 9.08-12.38 14.7-17.25 18.86l-16.6-19.48Zm-19.09 46.16c-1.22-12.12.23-21.7 4.55-29.77 4.1-7.67 10.24-12.72 14.54-16.39l16.6 19.48c-4.86 4.15-7.11 6.25-8.57 8.98-1.24 2.32-2.54 6.4-1.65 15.13zm36.49 2.77c-6.67.45-12.12 2.5-14.89 5.17l-17.73-18.45c8.88-8.54 21.26-11.6 30.9-12.26zm-9.97-19.83a12.05 12.05 0 0 0-1.45 13.4 12.02 12.02 0 0 0 11.48 6.42l-1.85-25.52a13.57 13.57 0 0 1 13.03 7.2 13.54 13.54 0 0 1-1.73 15.1zm-10.8 23.03c1.15-11.36 6.1-17.6 10.86-23.1l19.36 16.74c-2.09 2.41-3.02 3.65-3.63 4.77a10.4 10.4 0 0 0-1.14 4.18l-25.46-2.6Zm-.6 11.82c.08-3.52.16-7.63.6-11.83l25.45 2.6c-.3 3.01-.38 6.1-.46 9.79zm-1.17 14.32c.91-4.17 1.04-8.53 1.17-14.32l25.59.56c-.12 5.4-.23 12.22-1.75 19.2l-25-5.44Zm11.85-10.06h.02l1.28 25.56h-.02zm-21.37 24.69a41.4 41.4 0 0 1 3.5-5.9c1.03-1.5 2.44-3.4 3.3-4.62a45 45 0 0 0 2.31-3.5c.59-1.02.51-1.15.4-.61l25 5.44c-1.22 5.65-4.99 10.88-6.86 13.5-2.8 3.95-3.96 5.44-4.44 6.47l-23.2-10.78Zm-28.38 63.94c17.25-17.25 25.46-41.11 27.25-59.77l25.47 2.44c-2.2 23.06-12.2 53.01-34.62 75.42l-18.1-18.1Zm-117.66 2.22c33.59 33.59 86.99 28.45 117.67-2.22l18.1 18.1c-39.1 39.1-108.78 47.3-153.86 2.22l18.1-18.1Z",
        mask: "url(#bonusStamp-b)"
    }), l.createElement("mask", {
        id: "bonusStamp-e",
        fill: "#fff"
    }, l.createElement("path", {
        fillRule: "evenodd",
        d: "M99.68 272.5a67.8 67.8 0 0 0 19.3-14.27c1.88-2 5.7-10.56 5.7-10.56s14.51-5.51 21.16-12.57c8.7-9.23 17.72-22.99 19.32-34.17.07-.46-.5-.74-.84-.45-3.88 3.5-8.88 4.93-12.4 4.81h-.08c-5.93-.21-8.93-.32-14-1.85-.05-.88-.12-1.78-.2-2.67 2.78-1.94 6.75-3 11.08-4.18l2.97-.8c8.18-2.32 16.46-11.19 17.8-18.68.17-.92.33-1.84.48-2.77.33-1.95.66-3.9 1.09-5.8.2-.95.4-1.98.6-3.06 1.02-5.33 2.24-11.76 6.64-14.5.35-.21.2-.78-.22-.86-4.2-.8-8.05-.3-11.43 2.13-2.98 2.15-5.08 5.02-7.23 7.95l-1.34 1.81c-4.63 6.16-12.33 7.46-20.3 6.57-.5-.06-.63-.72-.2-.92 8.69-4.03 15.13-12.56 15.44-22.32.06-1.98-.03-5.22-.1-8.35-.07-2.6-.14-5.12-.12-6.77.32-21.1 15.3-35.72 31.94-42.57.42-.18.33-.8-.14-.91-19.37 1.31-29.68.7-36.38.3-9.28-.55-11.62-.7-21.47 5.27-5.86 3.56-9.26 7.93-12.38 11.94-5.88 7.56-10.75 13.83-29.19 10.89 4.3-4.77 5.6-12.39 5.24-19.44-.03-.63-.7-1.01-1.15-.62-3.82 3.4-6.8 5.69-13.2 5.95-3.1.13-6.25 0-9.39-.11-4.88-.2-9.75-.38-14.5.38v.01c-2.66.43-5.69 2.6-8.55 4.67-1.96 1.41-3.85 2.77-5.48 3.46-3.87.14-7.95.55-12.12 1.26A102 102 0 0 1 40.4 96.36 131.2 131.2 0 0 1 61.45 69.1c11.3-11.3 27.87-23.58 40.94-26.97.53-.14.82.48.45.9-4.3 4.96-6.33 10.92-6.43 14.95v.1c-.18 6.8-.27 10.25 1.15 15.88 1.03-.06 2.05-.11 3.08-.15 2.44-3.46 3.96-8.18 5.62-13.34l1.15-3.53c3.25-9.74 14.1-20.51 22.87-23.1l3.25-.93c2.28-.64 4.55-1.28 6.8-2.04 1.1-.38 2.31-.75 3.58-1.13 6.24-1.9 13.78-4.2 17.25-9.65.28-.43.93-.34 1 .14.62 4.73-.23 9.24-3.27 13.46-2.7 3.74-6.17 6.55-9.72 9.44-.73.59-1.47 1.18-2.2 1.79-7.45 6.18-9.5 15.23-9.03 24.3.04.56.8.62 1.06.09 5.27-10.56 15.6-19.16 26.93-20.86 2.3-.34 6.05-.7 9.66-1.03 3.01-.28 5.93-.55 7.84-.8 24.47-3.28 42.46-22.57 51.56-42.68.23-.51.95-.5 1.04.03 3.88 22.8 2.59 46.48-10.51 67.44-4.53 7.24-9.83 11.76-14.7 15.91-9.16 7.82-16.76 14.3-14.66 35.13 5.83-5.6 14.75-8.16 22.9-8.71.72-.05 1.12.67.63 1.24-4.21 4.87-7.06 8.62-7.82 16.02-.37 3.6-.45 7.21-.53 10.8-.12 5.6-.24 11.2-1.45 16.77h-.02c-.68 3.13-3.42 6.92-6 10.5-1.78 2.46-3.48 4.82-4.4 6.8-2 20.86-11.1 47.77-30.94 67.6-18.06 18.06-43.28 28.56-68.85 29.03",
        clipRule: "evenodd"
    })), l.createElement("path", {
        fill: "url(#bonusStamp-c)",
        fillRule: "evenodd",
        d: "M99.68 272.5a67.8 67.8 0 0 0 19.3-14.27c1.88-2 5.7-10.56 5.7-10.56s14.51-5.51 21.16-12.57c8.7-9.23 17.72-22.99 19.32-34.17.07-.46-.5-.74-.84-.45-3.88 3.5-8.88 4.93-12.4 4.81h-.08c-5.93-.21-8.93-.32-14-1.85-.05-.88-.12-1.78-.2-2.67 2.78-1.94 6.75-3 11.08-4.18l2.97-.8c8.18-2.32 16.46-11.19 17.8-18.68.17-.92.33-1.84.48-2.77.33-1.95.66-3.9 1.09-5.8.2-.95.4-1.98.6-3.06 1.02-5.33 2.24-11.76 6.64-14.5.35-.21.2-.78-.22-.86-4.2-.8-8.05-.3-11.43 2.13-2.98 2.15-5.08 5.02-7.23 7.95l-1.34 1.81c-4.63 6.16-12.33 7.46-20.3 6.57-.5-.06-.63-.72-.2-.92 8.69-4.03 15.13-12.56 15.44-22.32.06-1.98-.03-5.22-.1-8.35-.07-2.6-.14-5.12-.12-6.77.32-21.1 15.3-35.72 31.94-42.57.42-.18.33-.8-.14-.91-19.37 1.31-29.68.7-36.38.3-9.28-.55-11.62-.7-21.47 5.27-5.86 3.56-9.26 7.93-12.38 11.94-5.88 7.56-10.75 13.83-29.19 10.89 4.3-4.77 5.6-12.39 5.24-19.44-.03-.63-.7-1.01-1.15-.62-3.82 3.4-6.8 5.69-13.2 5.95-3.1.13-6.25 0-9.39-.11-4.88-.2-9.75-.38-14.5.38v.01c-2.66.43-5.69 2.6-8.55 4.67-1.96 1.41-3.85 2.77-5.48 3.46-3.87.14-7.95.55-12.12 1.26A102 102 0 0 1 40.4 96.36 131.2 131.2 0 0 1 61.45 69.1c11.3-11.3 27.87-23.58 40.94-26.97.53-.14.82.48.45.9-4.3 4.96-6.33 10.92-6.43 14.95v.1c-.18 6.8-.27 10.25 1.15 15.88 1.03-.06 2.05-.11 3.08-.15 2.44-3.46 3.96-8.18 5.62-13.34l1.15-3.53c3.25-9.74 14.1-20.51 22.87-23.1l3.25-.93c2.28-.64 4.55-1.28 6.8-2.04 1.1-.38 2.31-.75 3.58-1.13 6.24-1.9 13.78-4.2 17.25-9.65.28-.43.93-.34 1 .14.62 4.73-.23 9.24-3.27 13.46-2.7 3.74-6.17 6.55-9.72 9.44-.73.59-1.47 1.18-2.2 1.79-7.45 6.18-9.5 15.23-9.03 24.3.04.56.8.62 1.06.09 5.27-10.56 15.6-19.16 26.93-20.86 2.3-.34 6.05-.7 9.66-1.03 3.01-.28 5.93-.55 7.84-.8 24.47-3.28 42.46-22.57 51.56-42.68.23-.51.95-.5 1.04.03 3.88 22.8 2.59 46.48-10.51 67.44-4.53 7.24-9.83 11.76-14.7 15.91-9.16 7.82-16.76 14.3-14.66 35.13 5.83-5.6 14.75-8.16 22.9-8.71.72-.05 1.12.67.63 1.24-4.21 4.87-7.06 8.62-7.82 16.02-.37 3.6-.45 7.21-.53 10.8-.12 5.6-.24 11.2-1.45 16.77h-.02c-.68 3.13-3.42 6.92-6 10.5-1.78 2.46-3.48 4.82-4.4 6.8-2 20.86-11.1 47.77-30.94 67.6-18.06 18.06-43.28 28.56-68.85 29.03",
        clipRule: "evenodd"
    }), l.createElement("path", {
        fill: "url(#bonusStamp-d)",
        d: "m99.68 272.5.11 6.4-2.95-12.14zm19.3-14.27-4.66-4.4 4.65 4.4Zm5.7-10.56-5.83-2.62 1.08-2.42 2.49-.94 2.27 5.98Zm21.16-12.57 4.66 4.39-4.66-4.4Zm19.32-34.17-6.33-.91 6.33.9Zm-.84-.45-4.27-4.76zm-12.4 4.81-.21 6.4.22-6.4Zm-.08 0 .22-6.4zm-14-1.85-1.85 6.13-4.29-1.3-.25-4.47zm-.2-2.67-6.37.55-.32-3.67 3.03-2.12 3.67 5.24Zm11.08-4.18 1.7 6.17h-.02l-.01.01zm0 0-1.69-6.17h.03zm2.97-.8-1.74-6.16 1.74 6.15Zm17.8-18.68-6.3-1.13h.01l6.3 1.13Zm.48-2.77-6.3-1.06zm0 0 6.31 1.05v.01l-6.3-1.06Zm1.09-5.8 6.24 1.4zm.6-3.06-6.28-1.19v-.01l6.29 1.2Zm0 0 6.3 1.2zm6.64-14.5 3.41 5.42-.02.01-.02.02-3.37-5.44Zm-.22-.86-1.19 6.28zm-11.43 2.13-3.74-5.2zm-7.23 7.95-5.17-3.77v-.01zm0 0 5.16 3.78zm-1.34 1.81-5.11-3.84zm-20.3 6.57-.71 6.36h-.04l-.04-.01zm-.2-.92 2.7 5.8zm15.44-22.32 6.4.2zm-.1-8.35 6.39-.16-6.4.16Zm-.12-6.77-6.4-.08v-.01l6.4.1Zm31.94-42.57 2.44 5.91zm-.14-.91-.43-6.38.93-.07.92.2zm-36.38.3.38-6.39zm-21.47 5.27-3.32-5.47zm-12.38 11.94 5.05 3.93zm-29.19 10.89-1 6.32-11.62-1.85 7.87-8.75zm5.24-19.44-6.4.33V96zm-1.15-.62L85 90.3l.02-.02.02-.01 4.22 4.8Zm-13.2 5.95-.26-6.4.27 6.4Zm-9.39-.11v-6.4h.25zm0 0v6.4h-.12l-.12-.01.24-6.4Zm-14.5.38-6.38.44-.4-5.84 5.77-.92 1.02 6.32Zm0 .01 6.39-.44.4 5.83-5.77.93-1.01-6.32Zm-8.55 4.67 3.74 5.2zm-5.48 3.46 2.5 5.9-1.09.46-1.19.04zm-12.12 1.26 1.08 6.3-16.9 2.9 10.87-13.26zM40.4 96.36l5.55 3.2-.59 1.01-.91.75zm62-54.23 1.6 6.19-1.6-6.2Zm.44.9 4.84 4.2zm-6.43 14.95-6.4-.16zm0 .1-6.4-.16zm1.15 15.88.4 6.39-5.3.33-1.3-5.16zm3.08-.15 5.23 3.69-1.84 2.6-3.18.1-.2-6.39Zm5.62-13.34 6.09 1.96-6.1-1.96Zm1.15-3.53 6.07 2.03zm22.87-23.1 1.81 6.14-1.81-6.13Zm3.25-.93 1.74 6.16zm6.8-2.04-2.05-6.07zm3.58-1.13-1.87-6.12zm0 0-1.86-6.12.3-.1.3-.06zm0 0 1.86 6.12-.3.1-.3.05zm17.25-9.65-5.4-3.43.02-.02v-.01zm1 .14-6.35.84zm-3.27 13.46 5.19 3.75h-.01zm-9.72 9.44-4.53-4.53.24-.23.25-.21zm0 0 4.52 4.52-.23.23-.25.2zm0 0 4.04 4.95-.01.01-4.04-4.96Zm-2.2 1.79 4.1 4.92h-.01zm-9.03 24.3-6.38.41v-.08zm1.06.09-5.73-2.85L139 69.3Zm26.93-20.86-.95-6.32zm9.66-1.03-.59-6.37.6 6.37Zm7.84-.8.85 6.34h-.01zm51.56-42.68-5.83-2.64L235 3.94Zm1.04.03 6.3-1.08h.01v.01l-6.3 1.07Zm-10.51 67.44 5.43 3.39-5.43-3.4Zm-14.7 15.91 4.15 4.87zm-14.66 35.13 4.44 4.62-9.48 9.1-1.32-13.07zm22.9-8.71.46 6.38h-.03zm.63 1.24 4.87 4.15-.02.02-.01.02zM211.87 131l6.37.65zm-.53 10.8 6.4.15-6.4-.14Zm-1.45 16.77 6.25 1.36-1.04 4.78-4.9.25zm-.02 0-6.25-1.36 1.04-4.78 4.9-.25zm-6 10.5 5.18 3.75-5.19-3.75Zm-4.4 6.8-6.37-.61.1-1.1.46-.99 5.8 2.7Zm-30.94 67.6-4.52-4.53zm-71.7 23.3a61.4 61.4 0 0 0 17.49-12.93l9.3 8.78a74.2 74.2 0 0 1-21.1 15.6l-5.68-11.46Zm17.49-12.93c-.1.1.17-.21.8-1.3.53-.93 1.13-2.06 1.7-3.2.56-1.13 1.07-2.2 1.44-3l.44-.95.11-.26.03-.06v-.01l5.85 2.6 5.84 2.62-.02.03-.03.08-.14.3a101 101 0 0 1-2.08 4.36 77 77 0 0 1-2.05 3.87 20.6 20.6 0 0 1-2.58 3.7zm10.37-6.17-2.28-5.98.02-.01.1-.04.41-.16c.37-.15.92-.37 1.6-.67a92 92 0 0 0 5.34-2.49c4.34-2.2 8.79-4.94 11.3-7.61l9.32 8.78c-4.13 4.38-10.27 7.93-14.84 10.25a106 106 0 0 1-7.95 3.61l-.53.21-.15.06-.05.02h-.01zm16.5-16.96a88.6 88.6 0 0 0 11.47-15.22c3.33-5.63 5.53-11.04 6.17-15.47l12.66 1.81c-.96 6.76-4.06 13.82-7.82 20.17a101.3 101.3 0 0 1-13.17 17.49zm17.64-30.7a5.9 5.9 0 0 0 9.76 5.24l-8.53-9.53a6.9 6.9 0 0 1 7.77-.98 6.88 6.88 0 0 1 3.66 7.1zm9.77 5.23c-5.14 4.62-11.77 6.62-16.9 6.44l.45-12.78c1.89.06 5.27-.82 7.9-3.18zm-16.9 6.44h-.09l.45-12.79h.1l-.46 12.8Zm-.09 0c-5.96-.2-9.7-.32-15.62-2.11l3.7-12.25c4.2 1.27 6.49 1.37 12.37 1.57l-.45 12.8Zm-20.16-7.88a80 80 0 0 0-.18-2.48l12.75-1.1c.08.96.15 1.91.2 2.87zm2.53-8.27c3.89-2.72 9.12-4.05 13.08-5.11l3.33 12.35c-4.71 1.27-7.42 2.09-9.07 3.24zm13.05-5.1 3.39 12.33-3.4-12.34Zm.03-.02c.98-.26 1.93-.51 2.89-.78l3.48 12.3-3.04.84zm2.89-.79c2.7-.76 5.87-2.79 8.56-5.63 2.73-2.89 4.3-5.89 4.69-8l12.6 2.25c-.97 5.38-4.2 10.55-8 14.55-3.83 4.04-8.9 7.6-14.37 9.15zm13.25-13.64.46-2.7 12.62 2.12c-.15.92-.31 1.88-.49 2.85zm.46-2.7 12.62 2.12zm0 0c.33-1.92.68-4.03 1.15-6.15l12.49 2.8c-.39 1.72-.69 3.5-1.02 5.46zm1.15-6.14c.19-.83.36-1.75.57-2.85l12.57 2.39c-.2 1.05-.41 2.19-.65 3.25l-12.49-2.8Zm.57-2.86 12.57 2.4zm0 0c.49-2.55 1.14-6.05 2.34-9.27 1.21-3.22 3.29-7.03 7.21-9.46l6.74 10.88c-.47.3-1.2 1.06-1.96 3.08a45 45 0 0 0-1.76 7.16l-12.57-2.38Zm9.51-18.7a5.97 5.97 0 0 0-2.6 6.52 5.88 5.88 0 0 0 4.6 4.3l2.37-12.57a6.92 6.92 0 0 1 5.42 5.07c.6 2.3.03 5.61-2.97 7.5l-6.82-10.83Zm2 10.82c-2.94-.55-4.9-.12-6.5 1.04l-7.47-10.39c5.14-3.7 10.9-4.25 16.34-3.22zm-6.5 1.04c-2.03 1.46-3.57 3.48-5.81 6.54l-10.32-7.56c2.05-2.8 4.71-6.52 8.65-9.36l7.49 10.38Zm-5.8 6.54-10.34-7.55zm-.01 0c-.44.6-.9 1.24-1.39 1.88l-10.22-7.7 1.29-1.74zm-1.39 1.88c-6.68 8.88-17.34 10.06-26.12 9.08l1.42-12.72c7.17.8 11.9-.63 14.48-4.05zm-26.2 9.07a6.9 6.9 0 0 1-5.93-5.5 6.85 6.85 0 0 1 3.85-7.58l5.36 11.62a5.95 5.95 0 0 0 3.34-6.56 5.89 5.89 0 0 0-5.04-4.68zm-2.09-13.08c6.79-3.14 11.5-9.68 11.72-16.7l12.8.4c-.4 12.5-8.57 23.01-19.14 27.91l-5.38-11.6Zm11.72-16.7c.06-1.76-.02-4.77-.1-7.99l12.79-.33c.08 3.03.17 6.5.1 8.71l-12.79-.4Zm-.1-7.99c-.07-2.54-.14-5.21-.12-7.02l12.8.17c-.02 1.5.04 3.86.1 6.52zm-.12-7.03c.37-24.52 17.8-40.95 35.9-48.4l4.87 11.83c-15.17 6.25-27.7 19.06-27.97 36.76zm35.9-48.4a5.97 5.97 0 0 0-3.62 6.4 5.88 5.88 0 0 0 4.5 4.85l2.84-12.48a6.92 6.92 0 0 1 5.31 5.71c.4 2.64-.8 5.97-4.15 7.35l-4.89-11.82Zm2.73 11.4c-19.72 1.33-30.32.7-37.2.3l.77-12.78c6.53.4 16.56 1 35.57-.3l.86 12.77Zm-37.2.3c-4.87-.3-6.83-.37-8.78.05-1.88.4-4.16 1.38-8.99 4.3l-6.63-10.94c5.03-3.04 8.84-4.98 12.92-5.86 4-.87 7.85-.6 12.25-.33l-.76 12.78Zm-17.76 4.36c-4.76 2.88-7.54 6.38-10.65 10.39l-10.1-7.86c3.12-4.01 7.14-9.25 14.11-13.48zm-10.65 10.39c-2.8 3.6-6.31 8.27-12.06 11.16-5.9 2.98-13.23 3.7-23.18 2.12l2.01-12.64c8.49 1.35 12.8.41 15.42-.9 2.77-1.4 4.64-3.65 7.7-7.6l10.1 7.86Zm-39 2.68c2.6-2.9 3.94-8.4 3.6-14.83l12.79-.67c.4 7.69-.89 17.4-6.87 24.06l-9.51-8.56ZM84.03 96a5.57 5.57 0 0 0 2.9 4.61c1.81 1 4.5 1.08 6.56-.72l-8.43-9.62a7.02 7.02 0 0 1 8.03-.87 7.23 7.23 0 0 1 3.73 6l-12.78.6Zm9.5 3.85a33 33 0 0 1-6.98 5.08 24 24 0 0 1-10.2 2.5l-.53-12.8c2.42-.1 3.84-.55 4.92-1.1 1.22-.62 2.39-1.54 4.28-3.23l8.52 9.55Zm-17.18 7.57c-3.41.14-6.81 0-9.9-.11l.5-12.79c3.18.13 6.06.23 8.87.12zm-9.66-.1v-12.8zm0 0v-12.8zm-.24-.01c-5-.2-9.23-.34-13.24.3l-2.03-12.63c5.48-.88 11-.64 15.76-.46l-.5 12.79Zm-7.87-6.45v.01l-12.77.88v-.01zm-5.37 6.77c-.15.02-.76.2-1.96.91a54 54 0 0 0-3.87 2.63l-7.48-10.38c1.38-1 3.1-2.24 4.84-3.27 1.69-1 3.93-2.12 6.44-2.53zm-5.83 3.54c-1.75 1.26-4.28 3.12-6.72 4.16l-5-11.77c.82-.36 2.06-1.2 4.24-2.77zm-9 4.67c-3.58.12-7.37.5-11.26 1.17l-2.16-12.62c4.45-.76 8.82-1.2 12.97-1.34zm-17.29-9.2c2.24-2.72 4.63-5.36 7.17-7.9l9.05 9.04a95 95 0 0 0-6.32 6.98zm7.17-7.9c2.6-2.61 5.31-5.06 8.1-7.34l8.1 9.92a96 96 0 0 0-7.15 6.46l-9.05-9.05Zm6.6-5.57a137.6 137.6 0 0 1 22.08-28.6l9.04 9.06c-8.25 8.25-14.88 17-20.02 25.92zm22.08-28.6a149 149 0 0 1 20.72-17.2c7.46-5.1 15.57-9.48 23.13-11.43L104 48.32c-5.52 1.43-12.22 4.9-19.14 9.61a136 136 0 0 0-18.89 15.7l-9.04-9.05Zm43.85-28.63c3.3-.86 6.53.78 7.92 3.62a7 7 0 0 1-1.02 7.67L98 38.83a5.8 5.8 0 0 0-.8 6.35 5.93 5.93 0 0 0 6.8 3.14l-3.23-12.38Zm6.9 11.3c-3.43 3.92-4.81 8.48-4.88 10.9l-12.79-.33c.15-5.63 2.8-12.99 8-18.98l9.66 8.4Zm-4.88 10.9v.1L90 57.93l.01-.1 12.8.32Zm0 .1c-.17 6.8-.22 9.46.96 14.16l-12.4 3.12c-1.66-6.56-1.53-10.8-1.35-17.6l12.79.33Zm-5.65 9.34c1.1-.07 2.19-.13 3.28-.16l.42 12.79c-.96.03-1.92.08-2.89.14l-.8-12.77Zm-1.74 2.55c1.76-2.5 3-6.17 4.76-11.62l12.18 3.92c-1.56 4.86-3.36 10.64-6.48 15.07zm4.76-11.62 1.17-3.6 12.13 4.06-1.12 3.46zm1.17-3.6c2.03-6.07 6.22-12.01 10.9-16.72 4.65-4.66 10.45-8.78 16.23-10.48l3.62 12.27c-2.99.88-7 3.44-10.78 7.24-3.75 3.77-6.61 8.08-7.83 11.75l-12.14-4.05Zm27.13-27.2 3.32-.95 3.48 12.3-3.18.92zm3.32-.95c2.3-.65 4.42-1.26 6.49-1.96l4.1 12.13c-2.43.82-4.86 1.5-7.1 2.14l-3.5-12.31Zm6.5-1.96c1.21-.4 2.51-.8 3.75-1.18l3.73 12.24c-1.28.4-2.4.73-3.4 1.07l-4.09-12.13Zm3.75-1.18 3.73 12.24zm.62-.16 2.5 12.55zm-.61.16c3.2-.98 6.17-1.9 8.75-3.14s4.14-2.52 4.96-3.82l10.8 6.87c-2.64 4.14-6.59 6.74-10.2 8.48-3.62 1.74-7.55 2.92-10.59 3.85zm13.74-7a6.99 6.99 0 0 1 6.84-3.13 6.87 6.87 0 0 1 5.87 5.91l-12.69 1.67c.4 2.99 2.8 4.77 5.04 5.09a5.8 5.8 0 0 0 5.69-2.6l-10.75-6.93Zm12.7 2.78c.82 6.13-.3 12.33-4.42 18.04l-10.37-7.5a11.66 11.66 0 0 0 2.11-8.87l12.69-1.67Zm-4.42 18.04c-3.28 4.53-7.42 7.85-10.87 10.65l-8.07-9.93c3.66-2.97 6.44-5.28 8.57-8.22zM153.7 47.65l-9.05-9.05zm-.48.43-8.1-9.9v-.01zm-.01.01-2.14 1.75L142.9 40c.76-.64 1.52-1.25 2.24-1.84zm-2.14 1.75c-5.29 4.39-7.15 11.04-6.73 19.04l-12.78.67c-.53-10.12 1.71-21.58 11.34-29.56zm-6.73 18.96a5.91 5.91 0 0 0-5.42-5.5 5.77 5.77 0 0 0-5.64 3.16l11.46 5.7a7.03 7.03 0 0 1-6.87 3.9 6.86 6.86 0 0 1-6.3-6.43zm-11.06-2.35c6.02-12.06 17.95-22.26 31.71-24.32l1.9 12.65c-8.9 1.34-17.64 8.33-22.16 17.39zm31.71-24.32c2.52-.38 6.5-.75 10.02-1.08l1.19 12.74c-3.7.35-7.23.68-9.31 1zM175 41.05c3.06-.28 5.83-.54 7.59-.78l1.68 12.69c-2.07.27-5.13.56-8.08.83zm7.58-.78c21.5-2.87 38-20.02 46.58-38.97l11.66 5.28c-9.63 21.28-29.1 42.7-56.54 46.38zM229.16 1.3a7.01 7.01 0 0 1 6.6-4.13 6.87 6.87 0 0 1 6.58 5.72l-12.61 2.17a5.93 5.93 0 0 0 5.63 4.9 5.78 5.78 0 0 0 5.46-3.37l-11.66-5.3Zm13.18 1.6c4.03 23.69 2.82 49.14-11.4 71.9l-10.85-6.78c11.98-19.17 13.36-41.08 9.64-62.97zm-11.4 71.9c-5.1 8.16-11.1 13.24-15.97 17.4l-8.3-9.75c4.87-4.14 9.47-8.11 13.42-14.43zm-15.97 17.4c-4.72 4.02-7.94 6.85-10.06 10.82-2.01 3.76-3.35 9.22-2.38 18.79l-12.73 1.29c-1.14-11.27.27-19.47 3.82-26.11 3.45-6.44 8.61-10.75 13.05-14.54l8.3 9.74Zm-23.24 25.64c7.36-7.07 18-9.89 26.9-10.48l.86 12.76c-7.4.5-14.6 2.81-18.89 6.95zm26.87-10.48a7.17 7.17 0 0 1 6.9 3.8 7.15 7.15 0 0 1-.94 7.97l-9.74-8.3a5.65 5.65 0 0 0 4.7 9.3l-.93-12.77Zm5.93 11.8c-3.94 4.56-5.74 7.07-6.3 12.49l-12.72-1.3c.95-9.38 4.85-14.36 9.34-19.55l9.68 8.37Zm-6.3 12.5c-.33 3.3-.4 6.65-.49 10.29l-12.8-.28c.09-3.56.17-7.42.57-11.32l12.73 1.3Zm-.49 10.29c-.12 5.5-.24 11.7-1.6 17.98l-12.5-2.72c1.06-4.87 1.18-9.85 1.3-15.54zm-7.53 23.01h-.02l-.64-12.78h.02zm5.91-5.03a23.6 23.6 0 0 1-3.08 7.06c-1.24 2.04-2.73 4.08-3.99 5.83l-10.37-7.5a83 83 0 0 0 3.44-5c.99-1.61 1.4-2.6 1.5-3.11zm-7.07 12.9c-1.91 2.64-3.18 4.44-3.78 5.74l-11.6-5.4c1.23-2.66 3.37-5.58 5-7.84zm-3.22 3.65c-2.1 21.96-11.65 50.39-32.77 71.51l-9.05-9.05c18.54-18.54 27.2-43.92 29.09-63.68l12.74 1.22Zm-32.77 71.51c-19.27 19.26-46.07 30.41-73.27 30.9l-.23-12.8c23.96-.43 47.58-10.28 64.45-27.15z",
        mask: "url(#bonusStamp-e)"
    }), l.createElement("path", {
        fill: "url(#bonusStamp-f)",
        stroke: "url(#bonusStamp-g)",
        strokeWidth: 6.4,
        d: "m100.45 119.48 11.32 34.84.72 2.21h38.96l-29.64 21.54-1.88 1.37.72 2.2 11.32 34.85-29.64-21.53-1.88-1.37-1.88 1.37-29.64 21.53 11.32-34.84.72-2.21-1.88-1.37-29.64-21.54H88.4l.72-2.2 11.32-34.85Z"
    }), l.createElement("defs", null, l.createElement("linearGradient", {
        id: "bonusStamp-a",
        x1: 81.26,
        x2: 26.88,
        y1: 217.89,
        y2: 249.88,
        gradientUnits: "userSpaceOnUse"
    }, l.createElement("stop", {
        stopColor: "#FFB23F"
    }), l.createElement("stop", {
        offset: 1,
        stopColor: "#fff"
    })), l.createElement("linearGradient", {
        id: "bonusStamp-c",
        x1: 234.8,
        x2: 45.25,
        y1: 16.35,
        y2: 238.2,
        gradientUnits: "userSpaceOnUse"
    }, l.createElement("stop", {
        stopColor: "#fff"
    }), l.createElement("stop", {
        offset: .87,
        stopColor: "#FFB23F"
    })), l.createElement("linearGradient", {
        id: "bonusStamp-d",
        x1: 238,
        x2: 138.83,
        y1: 6.75,
        y2: 134.72,
        gradientUnits: "userSpaceOnUse"
    }, l.createElement("stop", {
        stopColor: "#FF9300"
    }), l.createElement("stop", {
        offset: 1,
        stopColor: "#FF9300",
        stopOpacity: 0
    })), l.createElement("radialGradient", {
        id: "bonusStamp-f",
        cx: 0,
        cy: 0,
        r: 1,
        gradientTransform: "matrix(70.3791 -19.1943 21.5603 79.0547 97.25 173.1)",
        gradientUnits: "userSpaceOnUse"
    }, l.createElement("stop", {
        stopColor: "#FFB23F"
    }), l.createElement("stop", {
        offset: .58,
        stopColor: "#fff"
    }), l.createElement("stop", {
        offset: .62,
        stopColor: "#FFB23F"
    })), l.createElement("radialGradient", {
        id: "bonusStamp-g",
        cx: 0,
        cy: 0,
        r: 1,
        gradientTransform: "rotate(-19.98 541.52 -198.53)scale(74.8878)",
        gradientUnits: "userSpaceOnUse"
    }, l.createElement("stop", {
        offset: .01,
        stopColor: "#F4E5CF"
    }), l.createElement("stop", {
        offset: .47,
        stopColor: "#FFB23F"
    }), l.createElement("stop", {
        offset: 1,
        stopColor: "#fff"
    })))),
    S2 = A2,
    O2 = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
        viewBox: "0 0 21 24",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        fillRule: "evenodd",
        d: "M4.19 0A3.27 3.27 0 0 0 .9 3.27v17.46C.91 22.53 2.38 24 4.2 24h13.09c1.8 0 3.27-1.47 3.27-3.27V3.27c0-1.8-1.46-3.27-3.27-3.27H4.18Zm13.09 2.18H4.18c-.6 0-1.08.49-1.08 1.1v17.45c0 .6.48 1.09 1.09 1.09h13.09c.6 0 1.09-.49 1.09-1.1V3.28c0-.6-.49-1.09-1.1-1.09ZM7.62 9.24a2.18 2.18 0 0 0 0 3.08l3.09 3.09.03-.03.02.03 3.09-3.09a2.18 2.18 0 1 0-3.09-3.08l-.02.02-.03-.02a2.18 2.18 0 0 0-3.09 0Z"
    })),
    Z2 = O2,
    B2 = t => l.createElement("svg", {
        viewBox: "64 64 896 896",
        width: "1em",
        height: "1em",
        fill: "currentColor",
        ...t
    }, l.createElement("path", {
        d: "M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"
    })),
    k2 = B2,
    L2 = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
        viewBox: "0 0 17 17",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "M8.67.7a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm3.2 9.05a.8.8 0 0 1-.8.54 1 1 0 0 1-.26-.04l-2.4-.8a.8.8 0 0 1-.54-.76v-4a.8.8 0 0 1 1.6 0v3.43l1.85.61a.8.8 0 0 1 .55 1.02Z"
    })),
    R2 = L2,
    H2 = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
        viewBox: "0 0 16 16",
        ...t
    }, l.createElement("line", {
        x1: 1,
        y1: 1,
        x2: 15,
        y2: 15,
        stroke: "currentColor",
        strokeWidth: 2
    }), l.createElement("line", {
        x1: 15,
        y1: 1,
        x2: 1,
        y2: 15,
        stroke: "currentColor",
        strokeWidth: 2
    })),
    z2 = H2,
    U2 = t => l.createElement("svg", {
        viewBox: "64 64 896 896",
        width: "1em",
        height: "1em",
        fill: "currentColor",
        ...t
    }, l.createElement("path", {
        d: "M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"
    })),
    D2 = U2,
    V2 = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
        viewBox: "0 0 14 14",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "M5.59 7.13.64 12.08l1.41 1.42L7 8.55l4.95 4.95 1.41-1.42-4.95-4.95 4.95-4.95L11.95.77 7 5.72 2.05.77.64 2.18l4.95 4.95Z"
    })),
    G2 = V2,
    I2 = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
        viewBox: "0 0 20 20",
        fill: "currentColor",
        ...t
    }, l.createElement("path", {
        d: "M16.799 1.555c.304-.46.18-1.08-.276-1.387a.99.99 0 0 0-1.378.277l-11.928 18c-.304.46-.18 1.08.276 1.387a.99.99 0 0 0 1.378-.277l11.928-18zM10.009 2c.566 0 1.108.05 1.624.14l-1.24 1.87a7.665 7.665 0 0 0-.385-.01c-2.175 0-3.981 1.028-5.37 2.378-1.242 1.207-2.09 2.616-2.502 3.6.434.953 1.158 2.16 2.154 3.244l-1.13 1.704C1.67 13.417.662 11.656.143 10.379L0 10.028l.125-.358c.44-1.267 1.507-3.151 3.131-4.73C4.891 3.35 7.166 2 10.008 2zm0 14a8.18 8.18 0 0 1-.386-.01L8.39 17.85c.516.097 1.056.15 1.618.15 2.784 0 5.085-1.34 6.744-2.918 1.646-1.566 2.763-3.464 3.155-4.799L20 9.965l-.114-.31c-.428-1.17-1.394-3.05-2.982-4.654l-1.13 1.704a11.832 11.832 0 0 1 2.122 3.321c-.363.96-1.223 2.378-2.51 3.603-1.42 1.35-3.257 2.37-5.378 2.37z"
    })),
    T2 = I2,
    P2 = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
        viewBox: "0 0 80 58",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "M71.6 57.87H8.4a8.4 8.4 0 0 1-8.4-8.4V8.44A8.4 8.4 0 0 1 8.4.04h63.2a8.4 8.4 0 0 1 8.4 8.4v41.03a8.4 8.4 0 0 1-8.4 8.4ZM74.97 8.4c0-1.99-1.6-3.58-3.58-3.58H8.33A3.57 3.57 0 0 0 4.75 8.4v11.45h70.22V8.41Zm0 16.41H4.75V49.5c0 1.98 1.6 3.58 3.58 3.58h63.06c1.99 0 3.58-1.6 3.58-3.58V24.82ZM37.73 38.04h-20.1a2.49 2.49 0 0 1-2.48-2.48 2.49 2.49 0 0 1 2.47-2.48h20.1a2.49 2.49 0 0 1 2.49 2.48 2.49 2.49 0 0 1-2.48 2.48Z"
    })),
    $2 = P2,
    W2 = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
        viewBox: "0 0 22 18",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "M11.83.443a1 1 0 0 0-1.66 0L6.39 6.079 1.747.852a1 1 0 0 0-1.73.854l2.687 13.865A3 3 0 0 0 5.65 18h10.7a3 3 0 0 0 2.945-2.43l2.687-13.864a1 1 0 0 0-1.73-.854L15.611 6.08z"
    })),
    q2 = W2,
    K2 = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
        viewBox: "0 0 11 11",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "M2 11h8.3V2.7H8.6V0H2A2 2 0 0 0 0 2v7c0 1 1 2 2 2Zm7-6.9v5.5H2a.7.7 0 0 1-.6-.7V4l.7.1h6.8ZM2 1.4h5.2v1.4H2.1a.7.7 0 1 1 0-1.4Z"
    })),
    Q2 = K2,
    Y2 = t => l.createElement("svg", {
        viewBox: "64 64 896 896",
        width: "1em",
        height: "1em",
        fill: "currentColor",
        ...t
    }, l.createElement("path", {
        d: "M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"
    })),
    J2 = Y2,
    X2 = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 42 42",
        width: "1em",
        height: "1em",
        ...t
    }, l.createElement("circle", {
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 4,
        r: 19,
        cx: "50%",
        cy: "50%"
    }), l.createElement("rect", {
        x: 10.5,
        y: 17,
        width: 21,
        height: 8,
        fill: "currentColor"
    })),
    e0 = X2,
    t0 = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
        viewBox: "0 0 20 20",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "M17.835 20H2.165A2.174 2.174 0 0 1 0 17.835V2.165C0 .976.976 0 2.165 0h6.023a1.366 1.366 0 0 1 0 2.73H2.73v14.54h14.542v-5.388a1.366 1.366 0 0 1 2.729 0v5.941c0 1.2-.977 2.177-2.165 2.177Zm.8-11.882a1.366 1.366 0 0 1-1.364-1.365V4.706l-9.26 9.259c-.529.53-1.4.53-1.929 0a1.37 1.37 0 0 1 0-1.93l9.306-9.306h-2.13a1.366 1.366 0 0 1-1.364-1.364A1.35 1.35 0 0 1 13.26 0h4.576C19.023 0 20 .976 20 2.165V6.74c0 .765-.612 1.377-1.365 1.377Z"
    })),
    s0 = t0,
    l0 = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
        viewBox: "0 0 16 15",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "m8 0 1.8 5.53h5.8l-4.7 3.41 1.8 5.53L8 11.06l-4.7 3.41 1.8-5.53L.4 5.53h5.8z"
    })),
    o0 = l0,
    a0 = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
        viewBox: "0 0 80 40",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "M78.25 28.02a19.65 19.65 0 0 1-6.12 7.62 20.27 20.27 0 0 1-18.87 2.9 19.99 19.99 0 0 1-8.17-5.43H34.9a20.13 20.13 0 0 1-17.99 6.35A19.99 19.99 0 0 1 1.74 28.02 19.45 19.45 0 0 1 3.22 9.23a19.85 19.85 0 0 1 7.23-6.6A20.24 20.24 0 0 1 20 .26h40c3.35 0 6.63.82 9.56 2.39a19.85 19.85 0 0 1 7.23 6.6 19.48 19.48 0 0 1 1.47 18.79Zm-3.38-9.18a14.55 14.55 0 0 0-7.73-11.72A15.22 15.22 0 0 0 60 5.33H19.99a14.9 14.9 0 0 0-12.53 6.7A14.42 14.42 0 0 0 6.37 25.9a14.7 14.7 0 0 0 4.55 5.66 15.07 15.07 0 0 0 14.13 2.15 15.05 15.05 0 0 0 6.1-4.04 5.1 5.1 0 0 1 3.77-1.66H45.1c1.43 0 2.8.6 3.77 1.66a14.91 14.91 0 0 0 6.1 4.04 14.97 14.97 0 0 0 7.35.7 14.83 14.83 0 0 0 11.32-8.5c.98-2.21 1.42-4.66 1.23-7.08Zm-9.38 3.67a2.61 2.61 0 1 1 0-5.22 2.61 2.61 0 0 1 0 5.22Zm-5.22-5.22a2.61 2.61 0 1 1 0-5.22 2.61 2.61 0 0 1 0 5.22ZM55.2 22.5a2.61 2.61 0 1 1 0-5.22 2.61 2.61 0 0 1 0 5.22Zm5.08-.14a2.61 2.61 0 1 1 0 5.22 2.61 2.61 0 0 1 0-5.22Zm-34.15.14h-3.37v3.5a2.55 2.55 0 0 1-5.08 0v-3.5h-3.5a2.55 2.55 0 0 1 0-5.09h3.5v-3.36a2.55 2.55 0 0 1 5.08 0v3.36h3.37a2.55 2.55 0 0 1 0 5.09Z"
    })),
    r0 = a0,
    n0 = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
        viewBox: "0 0 18 10",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "M5.176 4.281v-.659a.719.719 0 0 0-.188-.47.518.518 0 0 0-.47-.283c-.189 0-.377.094-.565.189-.188.188-.188.376-.188.564v.753h-.753c-.189-.094-.377 0-.565.188a.719.719 0 0 0-.188.47c0 .19.094.377.188.471.188.189.376.189.565.189h.753v.753c0 .188 0 .376.188.47.094.094.282.188.564.188.189 0 .377-.094.565-.188.094-.094.094-.282.094-.47v-.753h.753c.188 0 .377-.094.565-.189a.719.719 0 0 0 .188-.47.719.719 0 0 0-.188-.47c-.188-.189-.377-.283-.565-.283h-.753ZM4.517.799h8.941c.753 0 1.506.188 2.165.47.659.377 1.223.847 1.6 1.412.376.565.658 1.318.753 1.976.094.66-.095 1.412-.377 2.07a3.323 3.323 0 0 1-1.412 1.6c-.564.471-1.317.754-2.07.848-.753.094-1.506 0-2.165-.188-.659-.283-1.317-.66-1.788-1.13H7.811c-.47.565-1.129.941-1.788 1.13-.753.282-1.506.376-2.258.188a4.565 4.565 0 0 1-1.977-.753C1.13 7.952.658 7.387.376 6.728.094 6.163 0 5.41 0 4.752c.094-.66.282-1.412.753-1.977.376-.564.941-1.035 1.6-1.411A4.372 4.372 0 0 1 4.517.798Zm8.847 3.482c.188 0 .376-.094.565-.188.188-.094.188-.283.188-.47a.719.719 0 0 0-.188-.471c-.094-.094-.283-.189-.565-.189-.188 0-.377.095-.565.189a.719.719 0 0 0-.188.47c0 .188.094.377.188.47.189.189.377.189.565.189Zm-1.412 1.412c.188 0 .377-.094.565-.189a.719.719 0 0 0 .188-.47.719.719 0 0 0-.188-.47c-.094-.095-.282-.189-.565-.189-.188 0-.376.094-.564.188a.719.719 0 0 0-.189.47c0 .19.095.377.189.471.188.189.376.189.564.189Zm2.918 0c.188 0 .376-.094.565-.189a.719.719 0 0 0 .188-.47.719.719 0 0 0-.188-.47c-.095-.095-.283-.189-.565-.189-.188 0-.377.094-.565.188a.719.719 0 0 0-.188.47c0 .19.094.377.188.471.188.189.377.189.565.189Zm-1.506 1.411c.188 0 .376-.094.565-.188.188-.094.188-.282.188-.47a.719.719 0 0 0-.188-.471c-.094-.094-.283-.188-.565-.188-.188 0-.377.094-.565.188a.719.719 0 0 0-.188.47c0 .189.094.377.188.471.189.188.377.188.565.188Z"
    })),
    i0 = n0,
    c0 = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "100%",
        height: "100%",
        viewBox: "0 0 145 165",
        ...t
    }, l.createElement("path", {
        fill: "#AB5500",
        fillRule: "evenodd",
        d: "M1.33 62.46h132.03l-1.4 74.14-83.9 18.34-45.83-30.9-.9-61.58Z",
        clipRule: "evenodd"
    }), l.createElement("path", {
        fill: "url(#paint0_radial_40_6172)",
        fillRule: "evenodd",
        d: "M48.05 154.94V62.46H1.33l.9 61.58 45.82 30.9Z",
        clipRule: "evenodd"
    }), l.createElement("path", {
        fill: "url(#paint1_radial_40_6172)",
        fillRule: "evenodd",
        d: "M48.05 62.46v92.48l83.91-18.34 1.4-74.14h-85.3Z",
        clipRule: "evenodd"
    }), l.createElement("path", {
        fill: "url(#paint2_radial_40_6172)",
        fillRule: "evenodd",
        d: "M10.25 127.94c-5.43-4.05-7.3-6.9-8.09-11.4l.1 7.5L48.1 154.9v-8.54c-.94 2.35-4.2 2.6-6.87 1.41-8.38-3.69-23.45-14.22-30.97-19.86v.03Z",
        clipRule: "evenodd",
        opacity: .5,
        style: {
            mixBlendMode: "multiply"
        }
    }), l.createElement("path", {
        fill: "url(#paint3_radial_40_6172)",
        fillRule: "evenodd",
        d: "M48.05 146.4v8.53l83.88-18.34.21-12.41c-1.26 4.95-3.74 7.78-10.82 11.03-13.64 6.19-42.27 12.78-57.16 14.37-7.37.8-15 .65-16.1-3.19Z",
        clipRule: "evenodd",
        style: {
            mixBlendMode: "multiply"
        }
    }), l.createElement("path", {
        fill: "url(#paint4_radial_40_6172)",
        fillRule: "evenodd",
        d: "m1.47 71.5-.07-6.15 46.69 26.2v11.21c-3.17-10.63-37.66-33.8-46.62-31.22v-.04Z",
        clipRule: "evenodd",
        opacity: .4,
        style: {
            mixBlendMode: "multiply"
        }
    }), l.createElement("path", {
        fill: "url(#paint5_radial_40_6172)",
        fillRule: "evenodd",
        d: "M48.05 102.72c7.99-14.33 67.44-24.93 84.99-21.7l.14-8.37-85.13 17.33v12.74Z",
        clipRule: "evenodd",
        opacity: .75,
        style: {
            mixBlendMode: "multiply"
        }
    }), l.createElement("path", {
        fill: "#AB5500",
        fillRule: "evenodd",
        d: "m.29 64.73 47.19 26.93 86.82-16.03.43-23.89L0 41.3l.29 23.44Z",
        clipRule: "evenodd"
    }), l.createElement("path", {
        fill: "url(#paint6_radial_40_6172)",
        fillRule: "evenodd",
        d: "m0 41.29 47.48 25.76v24.6L.28 64.74 0 41.3Z",
        clipRule: "evenodd"
    }), l.createElement("path", {
        fill: "url(#paint7_radial_40_6172)",
        fillRule: "evenodd",
        d: "m47.48 67.06 87.25-15.31-.43 23.88-86.82 16.03v-24.6Z",
        clipRule: "evenodd"
    }), l.createElement("path", {
        fill: "url(#paint8_radial_40_6172)",
        fillRule: "evenodd",
        d: "m0 41.29 47.48 25.76 87.25-15.3-51.22-23.92L0 41.29Z",
        clipRule: "evenodd"
    }), l.createElement("path", {
        fill: "url(#paint9_radial_40_6172)",
        fillRule: "evenodd",
        d: "M57.47 88.04c-2.98-2.79-2.37-10.17.22-13.1 6.47-7.35 62.73-21.13 71.93-17.33 4.07 1.66 4.86 9.66 4.43 13.5a8.42 8.42 0 0 1-2.13 4.92l2.42-.44.43-23.88-87.26 15.3v24.61l12.66-2.31a5.75 5.75 0 0 1-2.62-1.27h-.08Z",
        clipRule: "evenodd",
        opacity: .2,
        style: {
            mixBlendMode: "screen"
        }
    }), l.createElement("path", {
        fill: "url(#paint10_radial_40_6172)",
        fillRule: "evenodd",
        d: "M2.73 64.66c-1.18-3.15-2.33-11.18.11-13.9 4-4.48 14.82 1.42 18.63 3.34 6.58 3.29 18.27 10.24 21.55 16.82a24.83 24.83 0 0 1 2.19 6.77c.43 2.53.1 9.04-2.8 10.1-.47.17-.94.17-1.44.17l6.5 3.73V67.1L0 41.29l.29 23.44 3.63 2.07c-.5-.65-.9-1.34-1.19-2.1v-.04Z",
        clipRule: "evenodd",
        opacity: .5,
        style: {
            mixBlendMode: "screen"
        }
    }), l.createElement("path", {
        fill: "url(#paint11_radial_40_6172)",
        fillRule: "evenodd",
        d: "M13.02 42.09c1.11-1.92 4.5-3.26 7.7-4.13L0 41.29l47.48 25.76 87.25-15.3-12.3-5.76c1.22 2.54-.61 4.67-5.32 6.08-16.8 5.14-43.7 9.26-61 10.17-2.84.14-5.72 0-8.53-.4C37.12 60.32 25 54.4 16.54 48.13c-3.27-2.43-4.53-4.38-3.52-6.08v.04Z",
        clipRule: "evenodd",
        opacity: .3,
        style: {
            mixBlendMode: "screen"
        }
    }), l.createElement("path", {
        fill: "#FF6A66",
        fillRule: "evenodd",
        d: "M18.45 51.31c5 2.97 26.33 15.24 27.48 16.54 1.18 1.3 1.22 6.59 1.5 19.03.4-5.24.84-17.55 1.63-18.7 1.18-.94 71.21-13.79 81.28-15.67-14.92 2.42-80.38 13.1-82.61 13.17-3.5-.62-22.3-10.86-29.28-14.37Z",
        clipRule: "evenodd"
    }), l.createElement("path", {
        fill: "url(#paint12_radial_40_6172)",
        fillRule: "evenodd",
        d: "m84.74 84.74-1.87 62.57 17.37-3.8 2.05-62.02c.07-8.04.18-16.1.25-24.14l-17.66 3.08c-.03 8.1-.1 16.17-.14 24.28v.03Z",
        clipRule: "evenodd"
    }), l.createElement("path", {
        fill: "url(#paint13_radial_40_6172)",
        fillRule: "evenodd",
        d: "m32.8 144.66-1.44-62.2-.1-24.2-15.62-8.47.22 23.8 1.7 60.8 15.28 10.27h-.04Z",
        clipRule: "evenodd"
    }), l.createElement("path", {
        fill: "url(#paint14_radial_40_6172)",
        fillRule: "evenodd",
        d: "M102.54 57.4c-9.28-4.64-19.89-8.66-29.27-13.25a253.8 253.8 0 0 1-20.54-11.36l-16.4 2.64c8.92 4.2 17.51 8.18 25.86 12.48 7.87 4.05 14.82 8.54 22.7 12.6l17.65-3.08v-.04Z",
        clipRule: "evenodd"
    }), l.createElement("path", {
        fill: "url(#paint15_radial_40_6172)",
        fillRule: "evenodd",
        d: "M77.26 56.3c-4.43-6.1 7.2-5.78 12.44-4.8-5.57-2.43-11.18-4.82-16.43-7.39a253.8 253.8 0 0 1-20.54-11.36l-16.4 2.64c8.92 4.2 17.51 8.18 25.86 12.48 5.25 2.72 10.1 5.61 15.07 8.44Z",
        clipRule: "evenodd",
        opacity: .65,
        style: {
            mixBlendMode: "multiply"
        }
    }), l.createElement("path", {
        fill: "url(#paint16_radial_40_6172)",
        fillRule: "evenodd",
        d: "M31.25 58.25c15.04-2.57 28.24-6.15 43.27-8.72a736.51 736.51 0 0 1 42.7-5.97l-16.84-7.85c-11.33 1.88-22.08 4.56-33.45 6.44-16.9 2.79-34.38 4.81-51.29 7.6l15.61 8.47v.03Z",
        clipRule: "evenodd"
    }), l.createElement("path", {
        fill: "#265755",
        fillRule: "evenodd",
        d: "M15.86 73.6v-1.38c1.7 2.35 12.3 9.34 15.5 8.43v1.81l.15 7.02a13.5 13.5 0 0 0-3.56-6.62c-3.85-4.09-10.14-7.92-11.98-5.07l-.1-4.2Z",
        clipRule: "evenodd",
        opacity: .35
    }), l.createElement("path", {
        fill: "#223C3B",
        fillRule: "evenodd",
        d: "M84.74 84.74V82.5c1.72 3.08 16.69-.29 17.58-3.58v2.57l-.21 6.44c-.4-1.41-1-2.64-2.63-2.9-3.27-.5-8.8.9-12.15 3.73a8.45 8.45 0 0 0-2.85 5.93l.26-9.95Z",
        clipRule: "evenodd",
        opacity: .2
    }), l.createElement("path", {
        fill: "#936037",
        fillRule: "evenodd",
        d: "M32.8 143.29c-5-3-10.5-6.73-15.28-10.06v1.16l15.28 10.27v-1.37Z",
        clipRule: "evenodd",
        opacity: .5,
        style: {
            mixBlendMode: "multiply"
        }
    }), l.createElement("path", {
        fill: "#B17F4A",
        fillRule: "evenodd",
        d: "M100.31 142.3a303.3 303.3 0 0 1-17.4 4.17v.87l17.36-3.8v-1.23h.04Z",
        clipRule: "evenodd",
        opacity: .5,
        style: {
            mixBlendMode: "multiply"
        }
    }), l.createElement("path", {
        fill: "url(#paint17_radial_40_6172)",
        fillRule: "evenodd",
        d: "M15.68 49.8v3.43c1.62-.58 11.69 4.09 15.6 8.83v-3.8s2.24-.36 2.42-.4a84.72 84.72 0 0 1-15.5-8.47l-2.52.44v-.04Z",
        clipRule: "evenodd",
        style: {
            mixBlendMode: "screen"
        }
    }), l.createElement("path", {
        fill: "url(#paint18_radial_40_6172)",
        fillRule: "evenodd",
        d: "M100.31 56.26a367.56 367.56 0 0 1-17.51 3.11l2.08 1.09 17.66-3.08-2.23-1.12Z",
        clipRule: "evenodd",
        style: {
            mixBlendMode: "screen"
        }
    }), l.createElement("path", {
        fill: "url(#paint19_radial_40_6172)",
        fillRule: "evenodd",
        d: "M84.88 64.09c5.75-1.6 11.87-3.04 17.66-4.2v-2.5l-17.66 3.08v3.62Z",
        clipRule: "evenodd",
        opacity: .3,
        style: {
            mixBlendMode: "multiply"
        }
    }), l.createElement("path", {
        fill: "url(#paint20_radial_40_6172)",
        fillRule: "evenodd",
        d: "M19.78 49.1c14 5.9 28.7 4.23 46.04 2.06 2.84-.58 5.75-1.12 8.7-1.63a736.54 736.54 0 0 1 42.7-5.97l-16.84-7.85c-11.33 1.88-22.08 4.56-33.45 6.44-15.53 2.57-31.54 4.49-47.15 6.95Z",
        clipRule: "evenodd",
        style: {
            mixBlendMode: "multiply"
        }
    }), l.createElement("path", {
        fill: "url(#paint21_radial_40_6172)",
        fillRule: "evenodd",
        d: "m64.38 39.8 6.66 1.3C76.54 26.5 82.26 19.8 92 7.25c-5.93 1.05-11.72 2.42-17 4.88a31.1 31.1 0 0 0-4.07-9.04C64.99 8.9 62.4 15.42 61.72 21.6c-.61 5.5.47 11.3 2.66 18.17v.03Z",
        clipRule: "evenodd"
    }), l.createElement("path", {
        fill: "url(#paint22_radial_40_6172)",
        fillRule: "evenodd",
        d: "M74.13 30.72c-2.91 1.2-8.56 1.16-10.72-1.52a10.61 10.61 0 0 1-1.83-3.22c.18 4.23 1.19 8.72 2.8 13.79l6.66 1.3c1.98-5.28 3.99-9.52 6.22-13.39-1.15 1.38-2.41 2.72-3.13 3v.04Z",
        clipRule: "evenodd",
        style: {
            mixBlendMode: "multiply"
        }
    }), l.createElement("path", {
        fill: "url(#paint23_radial_40_6172)",
        fillRule: "evenodd",
        d: "M61.68 22.33a4.25 4.25 0 0 1 3.45-1.74c3.06-.07 11.44.72 13.27 3.18.26.37.44.73.54 1.16 1.98-3.15 4.14-6.11 6.59-9.33-1.23.25-2.41.47-3.78.5-4.35.11-10.65-.5-14.46-2.67a3.93 3.93 0 0 1-2.05-2.97 29.3 29.3 0 0 0-3.6 11.83l.04.04Z",
        clipRule: "evenodd",
        style: {
            mixBlendMode: "screen"
        }
    }), l.createElement("path", {
        fill: "url(#paint24_radial_40_6172)",
        fillRule: "evenodd",
        d: "m63.3 42.4 5.43-4.12C61.57 24.42 60.39 15.67 57.58 0c-3.16 5.14-6.04 10.42-7.7 16.03a30.24 30.24 0 0 0-9.38-2.97c.36 8.36 3.48 14.62 7.62 19.25 3.67 4.13 8.7 7.17 15.21 10.1h-.03Z",
        clipRule: "evenodd"
    }), l.createElement("path", {
        fill: "url(#paint25_radial_40_6172)",
        fillRule: "evenodd",
        d: "M63.05 29.05c-1.04 3-4.82 7.2-8.27 7.06a9.82 9.82 0 0 1-3.6-.8c3.24 2.68 7.27 4.92 12.09 7.1l5.43-4.13c-2.59-5-4.39-9.33-5.8-13.57.26 1.77.4 3.62.15 4.34Z",
        clipRule: "evenodd",
        opacity: .65,
        style: {
            mixBlendMode: "multiply"
        }
    }), l.createElement("path", {
        fill: "url(#paint26_radial_40_6172)",
        fillRule: "evenodd",
        d: "M48.52 32.8a4.24 4.24 0 0 1 1-3.77c1.99-2.35 8.17-8.1 11.2-7.85.42 0 .82.14 1.22.36-1.01-3.58-1.8-7.2-2.56-11.18a22.25 22.25 0 0 1-2.12 3.18c-2.84 3.37-7.48 7.67-11.62 9.08a3.9 3.9 0 0 1-3.56-.43 29.34 29.34 0 0 0 6.4 10.6h.04Z",
        clipRule: "evenodd",
        style: {
            mixBlendMode: "screen"
        }
    }), l.createElement("path", {
        fill: "url(#paint27_radial_40_6172)",
        fillRule: "evenodd",
        d: "M66.03 40.1c-4.5-6.67-25.43-26.6-34.31-23.75-6.26 2.03-16.54 17.37-13.7 24.9.86 2.28 3.13 3.83 5.25 4.7 13.34 5.43 28.27 4.27 40.96.98.62-2.28 1.2-4.6 1.8-6.87v.03Z",
        clipRule: "evenodd"
    }), l.createElement("path", {
        fill: "url(#paint28_radial_40_6172)",
        fillRule: "evenodd",
        d: "m68.73 39.5 3.39 6.73c9.74 1.05 28.44.4 39.85-6.8 1.22-.76 2.3-2.13 1.97-4.09-1.5-8.6-11.72-19.93-19.27-20.8-7.38-.84-23.38 17.51-25.9 24.93l-.04.03Z",
        clipRule: "evenodd"
    }), l.createElement("path", {
        fill: "url(#paint29_linear_40_6172)",
        fillRule: "evenodd",
        d: "m59.85 44.8-.22 2.46c-11 2.53-27.58 3.1-37.62-3.48-4.42-2.93-2.12-11 .32-11.9 7.7-2.9 30.72 7.89 37.52 12.92Z",
        clipRule: "evenodd"
    }), l.createElement("path", {
        fill: "url(#paint30_radial_40_6172)",
        fillRule: "evenodd",
        d: "M29.96 31.88C35.93 41 43.77 45.81 54.67 48.24c1.76-.26 3.42-.58 5-.95l.22-2.46C54.7 41 40.03 33.8 29.99 31.88h-.03Z",
        clipRule: "evenodd",
        style: {
            mixBlendMode: "multiply"
        }
    }), l.createElement("path", {
        fill: "url(#paint31_linear_40_6172)",
        fillRule: "evenodd",
        d: "m75.35 44.5.47 1.2c8.95.4 19.92-.19 30.03-4.02 3.3-1.27 8.48-3.37 7.08-7.46-.86-2.46-3.23-5.24-4.42-5.39-7.3-.87-26.87 10.53-33.13 15.6l-.03.07Z",
        clipRule: "evenodd"
    }), l.createElement("path", {
        fill: "url(#paint32_radial_40_6172)",
        fillRule: "evenodd",
        d: "M107.75 30.76c-1-1.16-1.97-1.41-3.34-1.49-8.85 2.07-23.77 10.9-29.1 15.24 8.31-.94 22.12-3.37 30.47-7.64 1.69-.87 2.98-1.84 3.23-3.07.15-.8-.21-1.78-1.26-3.04Z",
        clipRule: "evenodd",
        style: {
            mixBlendMode: "multiply"
        }
    }), l.createElement("path", {
        fill: "url(#paint33_radial_40_6172)",
        fillRule: "evenodd",
        d: "M22.37 31.88c3.35-1.27 9.6.07 16.19 2.39-1.44-1.67-1.77-4.56.07-7.38 2.62-4.02 7.26-4.35 10.82-3.08-4.7-3.58-9.56-6.55-13.48-7.45a9.2 9.2 0 0 0-4.6 1.92c-4.4 3.18-9.29 10.45-10.76 14.61-.29.84-.5 1.74-.65 2.64.5-1.8 1.48-3.29 2.41-3.65Z",
        clipRule: "evenodd",
        style: {
            mixBlendMode: "screen"
        }
    }), l.createElement("path", {
        fill: "url(#paint34_radial_40_6172)",
        fillRule: "evenodd",
        d: "M95.85 15.42c-1.58-.5-3.16-.43-5.32.11-2.8 1.34-6.08 3.9-9.21 6.98 1.8-1.3 3.56-1.7 7.05-1.2 4.17.66 7.44 3.6 8.16 7.43.36 2.1-.28 3.07-1.47 4.01 5.4-2.5 10.47-4.23 13.49-3.87.82.11 2.23 1.45 3.3 3.11-2.66-5.86-8.99-14.4-15.96-16.6l-.04.03Z",
        clipRule: "evenodd",
        style: {
            mixBlendMode: "screen"
        }
    }), l.createElement("path", {
        fill: "url(#paint35_radial_40_6172)",
        fillRule: "evenodd",
        d: "M73.91 32.79c.14-.8.43-1.6.76-2.35.25-.55.53-1.05.82-1.56l-1.3 1.63-.96 1.3a37.07 37.07 0 0 0-4.18 6.91c.94 2.03 4.18 4.35 7.09 5.18 1.58-1.2 3.7-2.64 6.15-4.2 1.04-.65 2.16-1.3 3.27-1.99a13.98 13.98 0 0 1-4.89 1.05c-3.6 0-7.52-1.74-6.76-6v.03Z",
        clipRule: "evenodd",
        opacity: .5,
        style: {
            mixBlendMode: "multiply"
        }
    }), l.createElement("path", {
        fill: "url(#paint36_radial_40_6172)",
        fillRule: "evenodd",
        d: "M59.42 34.78c-.18 2.31-3.6 4.49-5.76 4.52-1.8.04-3.77-.58-5.5-1.05 3.85 1.81 7.34 3.7 9.78 5.25 3.24-.54 5.9-2.46 6.94-4.89a79.05 79.05 0 0 0-6.47-6.98 5.13 5.13 0 0 1 1 3.15Z",
        clipRule: "evenodd",
        opacity: .5,
        style: {
            mixBlendMode: "multiply"
        }
    }), l.createElement("path", {
        fill: "#1E4F4D",
        d: "M56.9 45.63c-.25-1.27 1.69-2.9 3.92-4.42 2.66-1.84 5-3 6.11-2.85 2.88.29 13.2 6.69 10.54 10.27-1.94 2.6-8.2 2.82-11.26 2.57-2.91-.22-8.67-2.1-9.31-5.57Z"
    }), l.createElement("path", {
        fill: "url(#paint37_radial_40_6172)",
        fillRule: "evenodd",
        d: "M59.42 46.61c1.5 1.3 3.84 2.03 6.36 2.35 2.6.33 5.32.18 7.66-.22 4.07-.72 4.46-2.93 2.77-4.8a27.94 27.94 0 0 0-7.8-5.58 3.52 3.52 0 0 0-3.13.04c-1.84.94-4.1 2.38-5.69 3.61-2.33 1.81-2.37 2.68-.17 4.6Z",
        clipRule: "evenodd"
    }), l.createElement("path", {
        fill: "url(#paint38_radial_40_6172)",
        fillRule: "evenodd",
        d: "M74.74 42.55a32.17 32.17 0 0 0-6.33-4.16 3.48 3.48 0 0 0-3.17.04c-1.76.9-3.84 2.24-5.43 3.4 0 4.16 15.83 5 15.32 1.44a1.12 1.12 0 0 0-.4-.72Z",
        clipRule: "evenodd",
        style: {
            mixBlendMode: "screen"
        }
    }), l.createElement("defs", null, l.createElement("radialGradient", {
        id: "paint0_radial_40_6172",
        cx: 0,
        cy: 0,
        r: 1,
        gradientTransform: "matrix(92.29 0 0 92.848 2.41 77.22)",
        gradientUnits: "userSpaceOnUse"
    }, l.createElement("stop", {
        stopColor: "#FF3F13"
    }), l.createElement("stop", {
        offset: 1,
        stopColor: "#6B0000"
    })), l.createElement("radialGradient", {
        id: "paint1_radial_40_6172",
        cx: 0,
        cy: 0,
        r: 1,
        gradientTransform: "matrix(164.547 0 0 165.542 20.82 9.09)",
        gradientUnits: "userSpaceOnUse"
    }, l.createElement("stop", {
        stopColor: "#FF3F13"
    }), l.createElement("stop", {
        offset: 1,
        stopColor: "#900000"
    })), l.createElement("radialGradient", {
        id: "paint2_radial_40_6172",
        cx: 0,
        cy: 0,
        r: 1,
        gradientTransform: "matrix(53.95 0 0 54.276 44.28 103.92)",
        gradientUnits: "userSpaceOnUse"
    }, l.createElement("stop", {
        offset: 1,
        stopColor: "#800802"
    })), l.createElement("radialGradient", {
        id: "paint3_radial_40_6172",
        cx: 0,
        cy: 0,
        r: 1,
        gradientTransform: "matrix(109.806 0 0 110.47 59.27 71.2)",
        gradientUnits: "userSpaceOnUse"
    }, l.createElement("stop", {
        offset: 1,
        stopColor: "#800802"
    })), l.createElement("radialGradient", {
        id: "paint4_radial_40_6172",
        cx: 0,
        cy: 0,
        r: 1,
        gradientTransform: "matrix(85.133 0 0 85.648 -9.32 141.52)",
        gradientUnits: "userSpaceOnUse"
    }, l.createElement("stop", {
        offset: .54,
        stopColor: "#fff"
    }), l.createElement("stop", {
        offset: .58,
        stopColor: "#FAF6F4"
    }), l.createElement("stop", {
        offset: .65,
        stopColor: "#ECDED9"
    }), l.createElement("stop", {
        offset: .73,
        stopColor: "#D6B7AD"
    }), l.createElement("stop", {
        offset: .84,
        stopColor: "#B8816F"
    }), l.createElement("stop", {
        offset: .95,
        stopColor: "#923E22"
    }), l.createElement("stop", {
        offset: 1,
        stopColor: "#822000"
    })), l.createElement("radialGradient", {
        id: "paint5_radial_40_6172",
        cx: 0,
        cy: 0,
        r: 1,
        gradientTransform: "matrix(77.256 0 0 77.723 99.99 139.74)",
        gradientUnits: "userSpaceOnUse"
    }, l.createElement("stop", {
        offset: .54,
        stopColor: "#fff"
    }), l.createElement("stop", {
        offset: .58,
        stopColor: "#FAF6F4"
    }), l.createElement("stop", {
        offset: .65,
        stopColor: "#ECDED9"
    }), l.createElement("stop", {
        offset: .73,
        stopColor: "#D6B7AD"
    }), l.createElement("stop", {
        offset: .84,
        stopColor: "#B8816F"
    }), l.createElement("stop", {
        offset: .95,
        stopColor: "#923E22"
    }), l.createElement("stop", {
        offset: 1,
        stopColor: "#822000"
    })), l.createElement("radialGradient", {
        id: "paint6_radial_40_6172",
        cx: 0,
        cy: 0,
        r: 1,
        gradientTransform: "matrix(102.217 0 0 102.835 11.26 43.31)",
        gradientUnits: "userSpaceOnUse"
    }, l.createElement("stop", {
        stopColor: "#FF5A3A"
    }), l.createElement("stop", {
        offset: 1,
        stopColor: "#8F0000"
    })), l.createElement("radialGradient", {
        id: "paint7_radial_40_6172",
        cx: 0,
        cy: 0,
        r: 1,
        gradientTransform: "matrix(132.141 0 0 132.94 65.5 -32.92)",
        gradientUnits: "userSpaceOnUse"
    }, l.createElement("stop", {
        stopColor: "#E60E10"
    }), l.createElement("stop", {
        offset: 1,
        stopColor: "#730000"
    })), l.createElement("radialGradient", {
        id: "paint8_radial_40_6172",
        cx: 0,
        cy: 0,
        r: 1,
        gradientTransform: "matrix(201.521 0 0 202.74 34.74 84.38)",
        gradientUnits: "userSpaceOnUse"
    }, l.createElement("stop", {
        stopColor: "#D9271C"
    }), l.createElement("stop", {
        offset: 1,
        stopColor: "red"
    })), l.createElement("radialGradient", {
        id: "paint9_radial_40_6172",
        cx: 0,
        cy: 0,
        r: 1,
        gradientTransform: "matrix(120.992 0 0 121.723 128.94 88.94)",
        gradientUnits: "userSpaceOnUse"
    }, l.createElement("stop", null), l.createElement("stop", {
        offset: 1,
        stopColor: "#FF9A8A"
    })), l.createElement("radialGradient", {
        id: "paint10_radial_40_6172",
        cx: 0,
        cy: 0,
        r: 1,
        gradientTransform: "matrix(141.924 0 0 142.782 32.23 125.96)",
        gradientUnits: "userSpaceOnUse"
    }, l.createElement("stop", null), l.createElement("stop", {
        offset: 1,
        stopColor: "#FF9A8A"
    })), l.createElement("radialGradient", {
        id: "paint11_radial_40_6172",
        cx: 0,
        cy: 0,
        r: 1,
        gradientTransform: "matrix(112.755 0 0 113.437 82.62 -19.72)",
        gradientUnits: "userSpaceOnUse"
    }, l.createElement("stop", null), l.createElement("stop", {
        offset: 1,
        stopColor: "#CA9E67"
    })), l.createElement("radialGradient", {
        id: "paint12_radial_40_6172",
        cx: 0,
        cy: 0,
        r: 1,
        gradientTransform: "matrix(135.99 0 0 136.812 27.23 35.39)",
        gradientUnits: "userSpaceOnUse"
    }, l.createElement("stop", {
        stopColor: "#13C7BC"
    }), l.createElement("stop", {
        offset: 1,
        stopColor: "#00615C"
    })), l.createElement("radialGradient", {
        id: "paint13_radial_40_6172",
        cx: 0,
        cy: 0,
        r: 1,
        gradientTransform: "matrix(124.013 0 0 124.763 6.98 17.26)",
        gradientUnits: "userSpaceOnUse"
    }, l.createElement("stop", {
        stopColor: "#13C7BC"
    }), l.createElement("stop", {
        offset: 1,
        stopColor: "#009891"
    })), l.createElement("radialGradient", {
        id: "paint14_radial_40_6172",
        cx: 0,
        cy: 0,
        r: 1,
        gradientTransform: "matrix(74.163 0 0 74.612 72 44.08)",
        gradientUnits: "userSpaceOnUse"
    }, l.createElement("stop", {
        stopColor: "#317471"
    }), l.createElement("stop", {
        offset: 1,
        stopColor: "#13C7BC"
    })), l.createElement("radialGradient", {
        id: "paint15_radial_40_6172",
        cx: 0,
        cy: 0,
        r: 1,
        gradientTransform: "matrix(20.609 0 0 20.733 79.74 65.71)",
        gradientUnits: "userSpaceOnUse"
    }, l.createElement("stop", {
        stopColor: "#B85E16"
    }), l.createElement("stop", {
        offset: 1,
        stopColor: "#fff"
    })), l.createElement("radialGradient", {
        id: "paint16_radial_40_6172",
        cx: 0,
        cy: 0,
        r: 1,
        gradientTransform: "matrix(36.758 0 0 36.98 66.43 46.96)",
        gradientUnits: "userSpaceOnUse"
    }, l.createElement("stop", {
        stopColor: "#168A85"
    }), l.createElement("stop", {
        offset: 1,
        stopColor: "#13C7BC"
    })), l.createElement("radialGradient", {
        id: "paint17_radial_40_6172",
        cx: 0,
        cy: 0,
        r: 1,
        gradientTransform: "matrix(31.29 0 0 31.48 13.52 39.95)",
        gradientUnits: "userSpaceOnUse"
    }, l.createElement("stop", {
        stopColor: "#FFF385"
    }), l.createElement("stop", {
        offset: 1
    })), l.createElement("radialGradient", {
        id: "paint18_radial_40_6172",
        cx: 0,
        cy: 0,
        r: 1,
        gradientTransform: "matrix(32.91 0 0 33.108 89.77 69.36)",
        gradientUnits: "userSpaceOnUse"
    }, l.createElement("stop", {
        stopColor: "#F24C7C"
    }), l.createElement("stop", {
        offset: 1
    })), l.createElement("radialGradient", {
        id: "paint19_radial_40_6172",
        cx: 0,
        cy: 0,
        r: 1,
        gradientTransform: "matrix(35.175 0 0 35.388 95.96 49.33)",
        gradientUnits: "userSpaceOnUse"
    }, l.createElement("stop", {
        stopColor: "#7C0000"
    }), l.createElement("stop", {
        offset: 1,
        stopColor: "#fff"
    })), l.createElement("radialGradient", {
        id: "paint20_radial_40_6172",
        cx: 0,
        cy: 0,
        r: 1,
        gradientTransform: "matrix(104.914 0 0 105.549 94.6 33.94)",
        gradientUnits: "userSpaceOnUse"
    }, l.createElement("stop", {
        stopColor: "#13C7BC"
    }), l.createElement("stop", {
        offset: 1,
        stopColor: "#47FFF4"
    })), l.createElement("radialGradient", {
        id: "paint21_radial_40_6172",
        cx: 0,
        cy: 0,
        r: 1,
        gradientTransform: "matrix(83.55 0 0 84.056 72.26 39.95)",
        gradientUnits: "userSpaceOnUse"
    }, l.createElement("stop", {
        stopColor: "#226F6C"
    }), l.createElement("stop", {
        offset: 1,
        stopColor: "#13C7BC"
    })), l.createElement("radialGradient", {
        id: "paint22_radial_40_6172",
        cx: 0,
        cy: 0,
        r: 1,
        gradientTransform: "matrix(24.96 0 0 25.112 72.55 19.43)",
        gradientUnits: "userSpaceOnUse"
    }, l.createElement("stop", {
        stopColor: "#13C7BC"
    }), l.createElement("stop", {
        offset: 1
    })), l.createElement("radialGradient", {
        id: "paint23_radial_40_6172",
        cx: 0,
        cy: 0,
        r: 1,
        gradientTransform: "matrix(26.22 0 0 26.378 74.2 6.37)",
        gradientUnits: "userSpaceOnUse"
    }, l.createElement("stop", {
        stopColor: "#13C7BC"
    }), l.createElement("stop", {
        offset: 1,
        stopColor: "#1B4B49"
    })), l.createElement("radialGradient", {
        id: "paint24_radial_40_6172",
        cx: 0,
        cy: 0,
        r: 1,
        gradientTransform: "matrix(45.821 0 0 46.099 65.38 35.82)",
        gradientUnits: "userSpaceOnUse"
    }, l.createElement("stop", {
        stopColor: "#2F7773"
    }), l.createElement("stop", {
        offset: 1,
        stopColor: "#13C7BC"
    })), l.createElement("radialGradient", {
        id: "paint25_radial_40_6172",
        cx: 0,
        cy: 0,
        r: 1,
        gradientTransform: "matrix(23.702 0 0 23.845 52.51 23.37)",
        gradientUnits: "userSpaceOnUse"
    }, l.createElement("stop", null), l.createElement("stop", {
        offset: 1,
        stopColor: "#43ADA8"
    })), l.createElement("radialGradient", {
        id: "paint26_radial_40_6172",
        cx: 0,
        cy: 0,
        r: 1,
        gradientTransform: "matrix(28.485 0 0 28.658 54.45 6.45)",
        gradientUnits: "userSpaceOnUse"
    }, l.createElement("stop", {
        stopColor: "#13C7BC"
    }), l.createElement("stop", {
        offset: 1,
        stopColor: "#2D5856"
    })), l.createElement("radialGradient", {
        id: "paint27_radial_40_6172",
        cx: 0,
        cy: 0,
        r: 1,
        gradientTransform: "matrix(38.484 0 0 38.717 32.58 22.61)",
        gradientUnits: "userSpaceOnUse"
    }, l.createElement("stop", {
        stopColor: "#13C7BC"
    }), l.createElement("stop", {
        offset: 1,
        stopColor: "#124F4C"
    })), l.createElement("radialGradient", {
        id: "paint28_radial_40_6172",
        cx: 0,
        cy: 0,
        r: 1,
        gradientTransform: "matrix(37.693 0 0 37.92 107.11 18.34)",
        gradientUnits: "userSpaceOnUse"
    }, l.createElement("stop", {
        offset: .4,
        stopColor: "#13C7BC"
    }), l.createElement("stop", {
        offset: 1,
        stopColor: "#0C3230"
    })), l.createElement("radialGradient", {
        id: "paint30_radial_40_6172",
        cx: 0,
        cy: 0,
        r: 1,
        gradientTransform: "matrix(35.607 0 0 35.822 66.22 24.53)",
        gradientUnits: "userSpaceOnUse"
    }, l.createElement("stop", {
        stopColor: "#1C403F"
    }), l.createElement("stop", {
        offset: 1,
        stopColor: "#13C7BC"
    })), l.createElement("radialGradient", {
        id: "paint32_radial_40_6172",
        cx: 0,
        cy: 0,
        r: 1,
        gradientTransform: "matrix(39.563 0 0 39.803 72.26 46.03)",
        gradientUnits: "userSpaceOnUse"
    }, l.createElement("stop", {
        stopColor: "#377976"
    }), l.createElement("stop", {
        offset: 1,
        stopColor: "#08201F"
    })), l.createElement("radialGradient", {
        id: "paint33_radial_40_6172",
        cx: 0,
        cy: 0,
        r: 1,
        gradientTransform: "matrix(34.132 0 0 34.339 30.1 36.8)",
        gradientUnits: "userSpaceOnUse"
    }, l.createElement("stop", {
        stopColor: "#13C7BC"
    }), l.createElement("stop", {
        offset: 1
    })), l.createElement("radialGradient", {
        id: "paint34_radial_40_6172",
        cx: 0,
        cy: 0,
        r: 1,
        gradientTransform: "matrix(38.736 0 0 38.97 82.22 38.87)",
        gradientUnits: "userSpaceOnUse"
    }, l.createElement("stop", {
        stopColor: "#13C7BC"
    }), l.createElement("stop", {
        offset: 1
    })), l.createElement("radialGradient", {
        id: "paint35_radial_40_6172",
        cx: 0,
        cy: 0,
        r: 1,
        gradientTransform: "matrix(20.645 0 0 20.77 83.51 29.97)",
        gradientUnits: "userSpaceOnUse"
    }, l.createElement("stop", {
        stopColor: "#13C7BC"
    }), l.createElement("stop", {
        offset: 1,
        stopColor: "#070D0C"
    })), l.createElement("radialGradient", {
        id: "paint36_radial_40_6172",
        cx: 0,
        cy: 0,
        r: 1,
        gradientTransform: "matrix(18.055 0 0 18.164 54.24 31.7)",
        gradientUnits: "userSpaceOnUse"
    }, l.createElement("stop", {
        stopColor: "#fff"
    }), l.createElement("stop", {
        offset: 1,
        stopColor: "#BA5700"
    })), l.createElement("radialGradient", {
        id: "paint37_radial_40_6172",
        cx: 0,
        cy: 0,
        r: 1,
        gradientTransform: "matrix(20.897 0 0 21.023 64.81 31.67)",
        gradientUnits: "userSpaceOnUse"
    }, l.createElement("stop", {
        stopColor: "#13C7BC"
    }), l.createElement("stop", {
        offset: 1,
        stopColor: "#206865"
    })), l.createElement("radialGradient", {
        id: "paint38_radial_40_6172",
        cx: 0,
        cy: 0,
        r: 1,
        gradientTransform: "matrix(17.875 0 0 17.983 68.91 30.43)",
        gradientUnits: "userSpaceOnUse"
    }, l.createElement("stop", {
        stopColor: "#13C7BC"
    }), l.createElement("stop", {
        offset: 1,
        stopColor: "#43ADA8"
    })), l.createElement("linearGradient", {
        id: "paint29_linear_40_6172",
        x1: 19.53,
        x2: 59.85,
        y1: 40.24,
        y2: 40.24,
        gradientUnits: "userSpaceOnUse"
    }, l.createElement("stop", {
        stopColor: "#2B706D"
    }), l.createElement("stop", {
        offset: 1,
        stopColor: "#13C7BC"
    })), l.createElement("linearGradient", {
        id: "paint31_linear_40_6172",
        x1: 75.35,
        x2: 157.78,
        y1: 37.34,
        y2: 37.34,
        gradientUnits: "userSpaceOnUse"
    }, l.createElement("stop", {
        stopColor: "#43ADA8"
    }), l.createElement("stop", {
        offset: 1,
        stopColor: "#13C7BC"
    })))),
    d0 = c0,
    p0 = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
        viewBox: "0 0 25 24",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "M12.55 0c-6.61 0-12 5.38-12 12v4.97c0 1.23 1.08 2.23 2.4 2.23h1.2c.67 0 1.2-.54 1.2-1.2v-6.17c0-.66-.53-1.2-1.2-1.2H3.07a9.6 9.6 0 0 1 9.48-8.23 9.6 9.6 0 0 1 9.5 8.23h-1.1c-.66 0-1.2.54-1.2 1.2v7.37a2.4 2.4 0 0 1-2.4 2.4h-2.4v-1.2h-4.8V24H17.35a4.8 4.8 0 0 0 4.8-4.8c1.33 0 2.4-1 2.4-2.23V12c0-6.62-5.38-12-12-12Z"
    })),
    f0 = p0,
    u0 = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
        viewBox: "0 0 24 22",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "M2.42 2.58a6.25 6.25 0 0 0 0 8.84l9.722 9.722v-.002l.002.002 9.722-9.723a6.25 6.25 0 1 0-8.839-8.838l-.884.885-.885-.885a6.25 6.25 0 0 0-8.839 0Z"
    })),
    m0 = u0,
    h0 = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
        viewBox: "0 0 19 19",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "M6.974 8.996v7.01H5V19h8.056v-2.994h-1.933V6.002H5v2.995h1.974Zm.524-5.127a2.263 2.263 0 0 0 3.867-1.593 2.211 2.211 0 0 0-.658-1.607 2.267 2.267 0 0 0-3.216 0 2.2 2.2 0 0 0-.665 1.607 2.174 2.174 0 0 0 .672 1.593Z"
    })),
    x0 = h0,
    g0 = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "0.875em",
        viewBox: "0 0 24 20",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "M18.633 1.799c-2.23 0-2.59.287-2.59 2.374h-1.87c0-2.087-.432-2.374-2.59-2.374s-2.59.287-2.59 2.374H7.05c0-2.087-.431-2.374-2.662-2.374s-2.59.287-2.59 2.374H0C0 0 1.87 0 4.46 0c1.511 0 2.734 0 3.526.863C8.777 0 10 0 11.51 0c1.51 0 2.734 0 3.525.863C15.827 0 17.122 0 18.633 0c2.518 0 4.389-.072 4.389 4.173h-1.799c0-2.087-.432-2.374-2.59-2.374M1.583 6.043H7.41V7.77L3.597 14.1H1.44l3.813-6.186h-3.67zm7.122 0h5.827V7.77l-3.813 6.259H8.633l3.741-6.26H8.705zm7.05 0h5.828V7.77l-3.813 6.259h-2.086l3.74-6.115h-3.669zM4.46 18.201c2.159 0 2.662-.287 2.662-2.374h1.871c0 2.087.431 2.374 2.59 2.374s2.59-.287 2.59-2.374h1.87c0 2.087.432 2.374 2.59 2.374s2.59-.287 2.59-2.374h1.799C23.022 20 21.152 20 18.633 20c-1.51 0-2.734 0-3.525-.863-.792.863-2.014.863-3.525.863s-2.734 0-3.525-.863C7.266 20 6.043 20 4.532 20 1.871 20 0 20.072 0 15.827h1.799c0 2.087.431 2.374 2.661 2.374"
    })),
    v0 = g0,
    C0 = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024",
        width: "1em",
        height: "1em",
        fill: "currentColor",
        ...t
    }, l.createElement("path", {
        d: "M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"
    })),
    j0 = C0,
    y0 = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
        viewBox: "0 0 58 42",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        fillRule: "evenodd",
        d: "M4 0a4 4 0 0 0-4 4v34a4 4 0 0 0 4 4h50a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H4Zm13 20a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM7 29a6 6 0 0 1 6-6h8a6 6 0 0 1 6 6v3H7v-3Zm30-17a2 2 0 1 0 0 4h11a2 2 0 1 0 0-4H37Zm-2 10c0-1.1.9-2 2-2h11a2 2 0 1 1 0 4H37a2 2 0 0 1-2-2Zm2 6a2 2 0 1 0 0 4h11a2 2 0 1 0 0-4H37Z"
    })),
    w0 = y0,
    _0 = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
        viewBox: "0 0 20 20",
        ...t
    }, l.createElement("line", {
        stroke: "currentColor",
        strokeWidth: 3,
        x1: 1.5,
        y1: 18.5,
        x2: 18.5,
        y2: 18.5,
        strokeLinecap: "round"
    })),
    b0 = _0,
    E0 = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
        viewBox: "0 0 20 16",
        fill: "currentColor",
        ...t
    }, l.createElement("path", {
        d: "M4.76 11.703c-1.241-1.194-2.125-2.628-2.624-3.725.413-.984 1.26-2.393 2.502-3.6C6.027 3.028 7.833 2 10.008 2c2.346 0 4.147 1.059 5.483 2.407 1.209 1.22 2 2.646 2.405 3.62-.363.96-1.223 2.377-2.51 3.602C13.966 12.98 12.13 14 10.008 14c-2.125 0-3.876-.977-5.249-2.297zM10.007 0c-2.84 0-5.116 1.35-6.751 2.94C1.632 4.519.566 6.403.125 7.67L0 8.028l.143.35a14.498 14.498 0 0 0 3.242 4.77C5.01 14.71 7.228 16 10.008 16c2.784 0 5.085-1.34 6.744-2.918 1.646-1.566 2.763-3.463 3.155-4.799L20 7.965l-.114-.31C19.457 6.482 18.49 4.6 16.9 2.994 15.294 1.375 13.013 0 10.009 0zM8.134 8a1.88 1.88 0 0 1 1.874-1.885A1.88 1.88 0 0 1 11.882 8a1.88 1.88 0 0 1-1.874 1.886A1.88 1.88 0 0 1 8.134 8zm1.874-4.114c-2.259 0-4.09 1.842-4.09 4.114 0 2.273 1.831 4.115 4.09 4.115s4.09-1.842 4.09-4.115c0-2.272-1.831-4.114-4.09-4.114z"
    })),
    M0 = E0,
    N0 = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
        viewBox: "0 0 16 19",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "M7.686.114c.21-.104.314-.104.523 0l1.15 1.255c.105.105.21.105.314.105L11.24.95c.21 0 .314.104.418.209l.419 1.673c0 .105.104.21.209.21l1.673.417c.209 0 .314.21.209.419l-.418 1.673c0 .104 0 .209.104.313l1.255 1.15a.318.318 0 0 1 0 .419l-1.255 1.15c-.104.105-.104.21-.104.314l.418 1.673c0 .209-.104.313-.21.418l-1.045.314c.105 0 .105.104.105.209l1.36 5.228c.104.21-.21.523-.42.314l-1.672-.837c-.105-.104-.314 0-.418.105l-1.046 1.568c-.21.21-.523.21-.627-.104l-1.15-4.497-.837.837a.318.318 0 0 1-.418 0l-.837-.941-1.36 4.6c-.104.21-.417.314-.522.105l-1.046-1.568c-.104-.105-.209-.21-.418-.105l-1.777.837c-.21.104-.523-.105-.419-.314l1.464-5.437c0-.105.105-.105.105-.21l-1.046-.313c-.209 0-.314-.21-.209-.418l.418-1.673c0-.105 0-.21-.104-.314L.89 7.434c-.105-.21-.105-.314 0-.523l1.254-1.15c.105-.105.105-.21.105-.314L1.726 3.88c0-.21.105-.314.21-.419l1.672-.418c.105 0 .21-.104.21-.209l.417-1.673c0-.21.21-.314.419-.21l1.673.42c.104 0 .209 0 .313-.105L7.686.115Zm.105 10.352c1.673 0 3.137-1.36 3.137-3.137 0-1.673-1.36-3.137-3.137-3.137-1.673 0-3.137 1.36-3.137 3.137 0 1.673 1.464 3.137 3.137 3.137Zm0 1.255c2.405 0 4.391-1.987 4.391-4.392 0-2.405-1.986-4.391-4.391-4.391-2.405 0-4.392 1.986-4.392 4.391 0 2.405 1.987 4.392 4.392 4.392Z"
    })),
    F0 = N0,
    A0 = t => l.createElement("svg", {
        fill: "currentColor",
        width: "1em",
        height: "1em",
        viewBox: "64 64 896 896",
        ...t
    }, l.createElement("path", {
        d: "M779.3 196.6c-94.2-94.2-247.6-94.2-341.7 0l-261 260.8c-1.7 1.7-2.6 4-2.6 6.4s.9 4.7 2.6 6.4l36.9 36.9a9 9 0 0 0 12.7 0l261-260.8c32.4-32.4 75.5-50.2 121.3-50.2s88.9 17.8 121.2 50.2c32.4 32.4 50.2 75.5 50.2 121.2 0 45.8-17.8 88.8-50.2 121.2l-266 265.9-43.1 43.1c-40.3 40.3-105.8 40.3-146.1 0-19.5-19.5-30.2-45.4-30.2-73s10.7-53.5 30.2-73l263.9-263.8c6.7-6.6 15.5-10.3 24.9-10.3h.1c9.4 0 18.1 3.7 24.7 10.3 6.7 6.7 10.3 15.5 10.3 24.9 0 9.3-3.7 18.1-10.3 24.7L372.4 653c-1.7 1.7-2.6 4-2.6 6.4s.9 4.7 2.6 6.4l36.9 36.9a9 9 0 0 0 12.7 0l215.6-215.6c19.9-19.9 30.8-46.3 30.8-74.4s-11-54.6-30.8-74.4c-41.1-41.1-107.9-41-149 0L463 364 224.8 602.1A172.22 172.22 0 0 0 174 724.8c0 46.3 18.1 89.8 50.8 122.5 33.9 33.8 78.3 50.7 122.7 50.7s88.8-16.9 122.6-50.7l309.2-309C824.8 492.7 850 432 850 367.5c.1-64.6-25.1-125.3-70.7-170.9"
    })),
    S0 = A0,
    O0 = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
        viewBox: "0 0 20 20",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "M4.073 15.373a8 8 0 1 1 11.854 0C15.476 13.462 12.994 12 10 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6c-2.994 0-5.476 1.462-5.927 3.373M10 20c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10"
    })),
    Z0 = O0,
    B0 = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
        viewBox: "0 0 16 15",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "m8 0 1.8 5.53h5.8l-4.7 3.41 1.8 5.53L8 11.06l-4.7 3.41 1.8-5.53L.4 5.53h5.8z"
    })),
    k0 = B0,
    L0 = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "100%",
        height: "100%",
        viewBox: "0 0 36 95",
        ...t
    }, l.createElement("path", {
        fill: "#FF385C",
        fillRule: "evenodd",
        d: "M11.4 18.2a2 2 0 0 0-1.9 2.1L11.4 50c1.5.7 3.3 1.3 4.6 1.8l1.3.5c1 .4 1.5 2.5 1.6 3.6l1.7-.2v.2l13-.8c1 0 2-1 1.8-2.1l-2.1-34c0-1.2-1-2-2.1-2l-19.8 1.3Z",
        clipRule: "evenodd"
    }), l.createElement("path", {
        fill: "#FF385C",
        fillOpacity: .3,
        stroke: "#FF385C",
        d: "M7.1 49.8c.4-1 1.7-1 2.2-.8 2.3 1.1 6.9 2.7 8 3.2 1 .4 1.5 2.5 1.6 3.6l1.7-.2c.1 1.7.5 5.3 1.2 6 .8 1 2.6 3 2.6 4.7.1 1.8.7 3 .8 6.2.2 3.2-2.8 4-3.4 6.1a20 20 0 0 0 0 6.5l.6 7.6c-5.5 2.8-11 1.1-13 0v-6.1c-1.6-1.3-1.5-4.3-2.3-5.4C5 79.1 3.3 72.8 2.6 71 1.9 69.3.8 68.4.8 67c0-1.3 0-1.6.9-2.5.8-.8-.6-2.4-.9-2.9-.2-.4.5-1.5.9-2 0-.5 0-2 .4-3 .3-1.1 1.7-1.1 2.3-1 .8-1.4 2.4-4.7 2.7-5.8Z"
    }), l.createElement("path", {
        fill: "#FF385C",
        fillRule: "evenodd",
        d: "M8.4 51.8c.2 0 .5.1.5.4s.3 1 .6 1.4c.2.3.5.6 1 .7h.4c.6.1 1 0 1.6 0h.4c.7-.2 1.5-.2 2.4.3.4.2.7.7 1 1.1l1 1.7 1 2.5.2.3.2-.3c.3-.4.4-.8.4-1 0-.3 0-.8-.2-1.3l-.4-1.2a.5.5 0 0 1 .9-.3 17 17 0 0 1 .6 2.8c0 .5-.2 1-.5 1.5l-.6.8.3.6c.2.4.3.8.3 1.3a4.8 4.8 0 0 1-.6 2.5l-.5.6c0 .9-.3 2.4-1.8 3.5l.3 1.6v.5c0 .2-.2.4-.4.5l-.5.3-.8.3c-.7.3-1.9.5-3 .3a3 3 0 0 1-1.5-.7c-.4-.4-.6-1-.6-1.6 0-.3 0-.4.2-.6l.4-.2.9-.1h1.9a.5.5 0 0 1-.1 1 12.7 12.7 0 0 0-2.4 0c0 .4.2.6.4.8l1 .5c.9.1 2 0 2.5-.2l.3-.2a27 27 0 0 0 .8-.5l-.4-1.7a59 59 0 0 1-2.3-5.3h-3.1l-1.2.2a73 73 0 0 1-3.5.2.5.5 0 1 1 .2-.9h1.6l1.6-.2 1.2-.2 2.5-.1c.4 0 .7 0 1 .2.3 0 .6.3.7.7a57 57 0 0 0 2 4.5c1-1 1.2-2.2 1.1-2.8l-3.1-6v-.1c0-.2-.4-1-1.8-1-1 0-2.3.3-3.7.7l-.5.1-1.5.4-1.4.2a.5.5 0 0 1 0-1l1.2-.1 1.4-.4a254 254 0 0 1 4.5-.8c1.8 0 2.5 1 2.7 1.7l2.8 5.5h.1l.4-1 .1-1.1c0-.4 0-.6-.2-.8l-.5-1a67 67 0 0 1-1.4-3.5l-1-1.6c-.2-.4-.5-.7-.7-.8-.6-.4-1.2-.3-1.8-.3h-.3c-.5.2-1.2.3-2 .1h-.4a7 7 0 0 0-1.8.3c-.8.2-1.6.5-2 .8a.5.5 0 0 1-.5-.9 16 16 0 0 1 3-1l-.3-.3c-.4-.6-.6-1.3-.7-1.8 0-.2.1-.5.4-.5M4 71c.2 0 .5.1.5.3a25.2 25.2 0 0 0 2.4 5.3c.3.5.7.8 1 1a.5.5 0 0 1-.5.8A4 4 0 0 1 6 77.2l-1-1.9c-.7-1.3-1.2-2.8-1.4-3.7-.1-.2 0-.5.3-.6Zm5.7 8.5c.2-.3.4-.3.7-.2a17.3 17.3 0 0 0 3.6 1.1h.7a.5.5 0 1 1 .4.8c-.4.2-.8.2-1.2.2-.5 0-1-.2-1.4-.3l-2.5-1a.5.5 0 0 1-.3-.6m.3 3.1c.2-.2.5-.2.7 0l.8.4 1.1.4a.5.5 0 1 1 0 .9c-.5 0-1-.2-1.5-.4l-1-.6a.5.5 0 0 1 0-.7Zm1 3.4c.3 0 .5.2.5.5l.2 2.7a.5.5 0 0 1-.9 0l-.2-2.7c0-.2.2-.4.4-.5M9.9 2.5c.5-.2 1 0 1.3.5l5.1 10.2a1 1 0 1 1-1.7.9L9.4 3.9a1 1 0 0 1 .5-1.4m23.4.5c.5.3.7.9.4 1.4L28 14.2a1 1 0 1 1-1.7-1L32 3.4a1 1 0 0 1 1.3-.4M21.4 0c.5 0 1 .4 1 1v11.4a1 1 0 1 1-2 0V1c0-.6.4-1 1-1",
        clipRule: "evenodd"
    })),
    R0 = L0,
    H0 = t => l.createElement("svg", {
        fill: "currentColor",
        width: "1em",
        height: "1em",
        viewBox: "64 64 896 896",
        ...t
    }, l.createElement("path", {
        d: "M168 504.2c1-43.7 10-86.1 26.9-126 17.3-41 42.1-77.7 73.7-109.4S337 212.3 378 195c42.4-17.9 87.4-27 133.9-27s91.5 9.1 133.8 27A341.5 341.5 0 0 1 755 268.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 0 0 3 14.1l175.7 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c0-6.7-7.7-10.5-12.9-6.3l-56.4 44.1C765.8 155.1 646.2 92 511.8 92 282.7 92 96.3 275.6 92 503.8a8 8 0 0 0 8 8.2h60c4.4 0 7.9-3.5 8-7.8m756 7.8h-60c-4.4 0-7.9 3.5-8 7.8-1 43.7-10 86.1-26.9 126-17.3 41-42.1 77.8-73.7 109.4A342.45 342.45 0 0 1 512.1 856a342.24 342.24 0 0 1-243.2-100.8c-9.9-9.9-19.2-20.4-27.8-31.4l60.2-47a8 8 0 0 0-3-14.1l-175.7-43c-5-1.2-9.9 2.6-9.9 7.7l-.7 181c0 6.7 7.7 10.5 12.9 6.3l56.4-44.1C258.2 868.9 377.8 932 512.2 932c229.2 0 415.5-183.7 419.8-411.8a8 8 0 0 0-8-8.2"
    })),
    z0 = H0,
    U0 = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
        viewBox: "0 0 16 16",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "M10.19 4.018a4.364 4.364 0 1 1-6.172 6.171 4.364 4.364 0 0 1 6.171-6.171Zm2.065 6.823a6.366 6.366 0 0 0-9.651-8.237 6.364 6.364 0 0 0 8.237 9.652l3.141 3.14a1 1 0 0 0 1.414-1.414l-3.14-3.14Z"
    })),
    D0 = U0,
    V0 = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
        viewBox: "0 0 80 66",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "M66.65 65.08H13.36A13.4 13.4 0 0 1 0 51.68V38.03l3.92-.57a4.68 4.68 0 0 0 3.98-4.6c0-2.3-1.71-4.27-3.98-4.6L0 27.72V14.09C0 6.7 6 .7 13.36.7h53.3C74.01.69 80 6.7 80 14.09V28.03l-4.35.21a4.65 4.65 0 0 0 0 9.29l4.35.2V51.67c0 7.4-5.98 13.4-13.35 13.4Zm8.78-22.98a9.23 9.23 0 0 1 0-18.43v-9.58a8.8 8.8 0 0 0-8.8-8.81H13.37a8.8 8.8 0 0 0-8.79 8.81v9.65a9.23 9.23 0 0 1 0 18.26v9.67a8.8 8.8 0 0 0 8.8 8.82h53.28a8.8 8.8 0 0 0 8.79-8.82V42.1h-.01Zm-18.51 3.92-4.5-4.5-.05.05a13.23 13.23 0 0 1-17.08-1.44 13.38 13.38 0 0 1 0-18.86c5.19-5.2 13.6-5.2 18.78 0a13.38 13.38 0 0 1 1.56 16.97l-.1.1 4.54 4.54a2.23 2.23 0 0 1-3.15 3.14Zm-5.99-21.6a8.83 8.83 0 0 0-12.51 0 8.92 8.92 0 0 0 0 12.58 8.83 8.83 0 0 0 12.51 0 8.92 8.92 0 0 0 0-12.58Zm-31 28.91c-.95 0-.48-.76-.48-1.7v-4.47c0-.94.77-1.7 1.73-1.7.95 0 1.72.76 1.72 1.7v4.47c0 .94-2.01 1.7-2.97 1.7Zm1.25-11.05c-.96 0-1.73-.76-1.73-1.7V36.1c0-.94.77-1.7 1.73-1.7.95 0 1.72.76 1.72 1.7v4.48c0 .94-.77 1.7-1.72 1.7Zm0-11.05c-.96 0-1.73-.77-1.73-1.7v-4.48c0-.94.77-1.7 1.73-1.7.95 0 1.72.76 1.72 1.7v4.48c0 .93-.77 1.7-1.72 1.7Zm0-11.06c-.96 0-1.73-.76-1.73-1.7V14c0-.94.77-1.7 1.73-1.7.95 0 1.72.76 1.72 1.7v4.47c0 .94-.77 1.7-1.72 1.7Z"
    })),
    G0 = V0,
    I0 = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
        viewBox: "0 0 17 17",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        fillRule: "evenodd",
        d: "M7.33.69a.3.3 0 0 0-.3.3V2.7c-.5.13-1 .33-1.44.58l-1.3-1.3a.3.3 0 0 0-.41 0L1.96 3.93a.3.3 0 0 0 0 .42l1.33 1.33c-.15.28-.28.58-.38.9H1.08a.3.3 0 0 0-.3.3v2.7c0 .17.13.3.3.3H2.8c.14.51.33 1 .59 1.44L2.2 12.5a.3.3 0 0 0 0 .42l1.92 1.92c.12.12.3.12.42 0l1.23-1.22c.4.21.82.37 1.26.49v1.73c0 .16.13.3.3.3h2.71a.3.3 0 0 0 .3-.3V14c.3-.1.6-.23.9-.38l1.22 1.22c.11.12.3.12.41 0l1.92-1.92a.3.3 0 0 0 0-.42l-1.18-1.18c.26-.44.45-.93.58-1.44h1.73a.3.3 0 0 0 .3-.3v-2.7a.3.3 0 0 0-.3-.3H14.1c-.1-.32-.23-.62-.38-.9l1.33-1.33a.3.3 0 0 0 0-.42L13.12 2a.3.3 0 0 0-.42 0l-1.3 1.29c-.33-.2-.69-.35-1.06-.47V.98a.3.3 0 0 0-.3-.3H7.33ZM8.5 11.08a2.67 2.67 0 1 0 0-5.35 2.67 2.67 0 0 0 0 5.35"
    })),
    T0 = I0,
    P0 = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
        viewBox: "0 0 14 16",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "M13.8 13.95a2.56 2.56 0 0 1-2.36 1.55H3.4a2.56 2.56 0 0 1-2.36-1.55 2.52 2.52 0 0 1 .86-3.05l1.21-.86a2.56 2.56 0 0 1 2.49-.3 4.6 4.6 0 0 0 3.64 0 2.57 2.57 0 0 1 2.48.3l1.21.86c.97.7 1.33 1.96.88 3.05Zm-6.5-5.3c-1.9 0-3.44-1.81-3.44-4.07C3.86 2.32 5.4.5 7.3.5s3.44 1.82 3.44 4.08S9.2 8.66 7.3 8.66Z"
    })),
    $0 = P0,
    W0 = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 40 40",
        width: "1em",
        height: "1em",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "M20 0a20 20 0 1 0 0 40 20 20 0 0 0 0-40Zm.05 35.8a15.84 15.84 0 0 1-15.9-15.79c0-8.72 7.11-15.8 15.9-15.8 8.78 0 15.88 7.06 15.88 15.79s-7.11 15.8-15.88 15.8Zm7.13-22.58L18.22 22l-3.39-3.83-3.18 2.46 6.57 6.82 11.6-11.72-2.48-2.48h-.16v-.02Z"
    })),
    q0 = W0,
    K0 = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
        viewBox: "0 0 27 24",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "M19.44 2.03H7.82v8.67l.07.35c.32 1.82 2 3.51 4.46 3.97l1.28.24 1.28-.24c2.47-.46 4.15-2.15 4.47-3.97l.06-.32v-8.7Zm3.82 6.31c.25-.23.44-.51.56-.82.08-.23.13-.47.13-.72V5.6h-2.6v3.47c.75 0 1.43-.28 1.9-.73Zm3.37-5.05V6.8c0 2.53-2.37 4.59-5.28 4.59h-.09c-.49 2.74-2.9 4.93-6 5.51v3.8h1.9c.58 0 1.05.4 1.05.91v.05h1.62v2.22H7.43v-2.22h1.62v-.05c0-.5.47-.91 1.06-.91H12v-3.8c-3.1-.58-5.52-2.77-6-5.51h-.1C3.01 11.39.63 9.33.63 6.8V3.3h5.28V.12h15.44v3.17h5.28ZM5.91 9.07V5.6h-2.6v1.2c0 .24.04.48.13.7.12.32.31.6.56.83a2.8 2.8 0 0 0 1.91.73Z"
    })),
    Q0 = K0,
    Y0 = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
        viewBox: "0 0 53 52",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "M42.224 5.563V0h-31.46v5.563H0v8.25c0 5.927 4.828 10.749 10.764 10.749h.188c.993 6.441 5.91 11.577 12.222 12.934v8.903h-3.86c-1.195 0-2.15.966-2.15 2.147v.124h-3.295V52h25.262v-3.33h-3.295v-.124a2.15 2.15 0 0 0-2.15-2.147h-3.86v-8.903c6.325-1.357 11.229-6.505 12.222-12.934h.188C48.172 24.562 53 19.74 53 13.812v-8.25H42.224Zm-31.46 13.562c-2.93 0-5.32-2.386-5.32-5.312V11h5.32zm36.766-5.312a5.315 5.315 0 0 1-5.306 5.312V11h5.306z"
    })),
    J0 = Y0,
    X0 = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
        viewBox: "0 0 512 512",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "M361.74 278.26a50.08 50.08 0 1 0 0 100.18H512V278.25H361.74zm0 66.78a16.7 16.7 0 1 1 0-33.39 16.7 16.7 0 0 1 0 33.4z"
    }), l.createElement("path", {
        fill: "currentColor",
        d: "M361.74 244.87h83.48v-50.09a50.14 50.14 0 0 0-50.09-50.08H16.7A16.7 16.7 0 0 0 0 161.4v333.9A16.7 16.7 0 0 0 16.7 512h378.43a50.14 50.14 0 0 0 50.09-50.09v-50.08h-83.48c-46.03 0-83.48-37.45-83.48-83.48s37.45-83.48 83.48-83.48zM461.91 144.7h-.16a82.94 82.94 0 0 1 16.86 50.08v50.09H512v-50.09a50.14 50.14 0 0 0-50.09-50.08zM478.6 411.83v50.08c0 18.8-6.31 36.12-16.85 50.09h.16A50.14 50.14 0 0 0 512 461.91v-50.08h-33.4zM273.37 4.9a16.7 16.7 0 0 0-23.61 0l-14.67 14.67 91.74 91.73h52.95L273.37 4.9zM173.2 4.9a16.69 16.69 0 0 0-23.61 0L43.17 111.3h236.44L173.19 4.9z"
    })),
    el = X0,
    tl = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 43 40",
        width: "1em",
        height: "1em",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "M21.46 11.01a2.5 2.5 0 0 0-2.5 2.5c0 1.4.7 8.93.83 11.44 0 .97.7 1.67 1.67 1.67.98 0 1.68-.7 1.68-1.67.27-2.37.83-9.76.83-11.43a2.5 2.5 0 0 0-2.5-2.5Zm0 18.4a2.2 2.2 0 0 0-2.23 2.23 2.2 2.2 0 0 0 2.23 2.23 2.2 2.2 0 0 0 2.23-2.23 2.2 2.2 0 0 0-2.23-2.23Zm20.63 1.25C40.98 28.85 27.32 4.04 26.76 3.21A5.94 5.94 0 0 0 21.46 0a5.94 5.94 0 0 0-5.3 3.2C15.62 4.05 1.82 28.86.85 30.67A6.22 6.22 0 0 0 6.14 40h30.65a6.22 6.22 0 0 0 5.3-9.34Zm-5.16 5.02H6c-.97 0-1.8-.84-1.8-1.81 0-.42 0-.7.27-.98.28-.56 15.33-27.32 15.47-27.6.28-.7.84-1.1 1.53-1.1.7 0 1.26.4 1.68.97.14.28 15.05 27.04 15.47 27.6.14.27.27.55.27.97-.13 1.11-.97 1.95-1.95 1.95Z"
    })),
    sl = tl,
    ll = {
        allGames: v2,
        americanFootball: j2,
        arrowLeft: w2,
        auth: b2,
        betHistory: M2,
        bonusGift: F2,
        bonusStamp: S2,
        cardHearts: Z2,
        check: k2,
        clock: R2,
        close: z2,
        close2: D2,
        closeAlt: G2,
        closedEye: T2,
        creditCard: $2,
        crown: q2,
        cryptoWallet: Q2,
        edit: J2,
        errorSign: e0,
        expandWindow: s0,
        favourites: o0,
        gamepad: r0,
        gamepadSolid: i0,
        gift: d0,
        headset: f0,
        heart: m0,
        info: x0,
        jackpotSlots: v0,
        loading: j0,
        memberCard: w0,
        minimizeWindow: b0,
        openedEye: M0,
        order: F0,
        paperClip: S0,
        player: Z0,
        recommended: k0,
        redCard: R0,
        reload: z0,
        search: D0,
        searchTicket: G0,
        settings: T0,
        signIn: $0,
        successSign: q0,
        trophy: Q0,
        trophySolid: J0,
        wallet: el,
        warningSign: sl
    };

function J({
    className: t,
    name: s
}) {
    return e.jsx(oe, {
        fallback: e.jsx("pre", {
            children: "%"
        }),
        children: e.jsx(ol, {
            className: t,
            name: s
        })
    })
}

function ol({
    className: t,
    name: s
}) {
    const o = ll[s];
    return e.jsx(o, {
        className: t
    })
}

function E1({
    className: t,
    variant: s = "primary",
    type: o = "button",
    loading: a,
    fit: r,
    onClick: n,
    children: i,
    ...c
}) {
    return e.jsxs("button", {
        className: x("btn", `btn-${s}`, r && "btn-fit", a && "pointer-events-none cursor-default", t),
        type: o,
        onClick: n,
        ...c,
        children: [e.jsx("div", {
            className: x("truncate", a && "invisible"),
            children: i
        }), a && e.jsx("span", {
            className: "absolute animate-spin",
            children: e.jsx(J, {
                name: "loading"
            })
        })]
    })
}

function M1() {
    return Intl.DateTimeFormat().resolvedOptions()
}

function N1(t = {}) {
    const s = M1().locale;
    return new Date().toLocaleString(s, {
        timeZone: "UTC",
        timeZoneName: "shortOffset",
        hour12: !1,
        ...t
    })
}

function Se() {
    const {
        timeZone: t
    } = M1();
    return N1({
        timeZone: t
    }).replace("GMT", "UTC")
}

function Oe() {
    return N1().replace("GMT", "UTC+0")
}

function al({
    className: t
}) {
    const {
        $t: s
    } = w(), o = n2(), a = i2();
    return a ? e.jsx(a, {
        className: t
    }) : e.jsxs("div", {
        className: t,
        children: [e.jsx(o, {
            className: "animate-spin size-24 text-24"
        }), e.jsx("div", {
            className: "mt-1 font-medium text-center",
            children: s({
                id: "gjBiyj",
                defaultMessage: [{
                    type: 0,
                    value: "Loading..."
                }]
            })
        })]
    })
}

function it({
    className: t,
    style: s,
    children: o
}) {
    return e.jsx("div", {
        style: s,
        className: x("skeleton", t),
        children: o
    })
}

function ct({
    className: t,
    children: s
}) {
    const {
        $t: o
    } = w();
    return e.jsx("div", {
        className: x("error-placeholder", t),
        children: e.jsxs("div", {
            children: [e.jsx("p", {
                children: o({
                    id: "h4hXDR",
                    defaultMessage: [{
                        type: 0,
                        value: "An error has occurred"
                    }]
                })
            }), s]
        })
    })
}
const rl = ({
        children: t
    }) => {
        var Y, T, Q;
        const [s, o] = l.useState(null), [a, r] = l.useState(null), [n, i] = l.useState(!1), {
            addWinsListener: c,
            acceptWin: d,
            handleGetSlotsAndWins: p,
            connect: f,
            addSlotsListener: u,
            isOpen: m,
            init: h,
            error: v
        } = Js(), {
            isAuth: j
        } = W(), {
            data: C
        } = R({
            enabled: j,
            queryKey: ["Lobby.getCurrent"],
            queryFn: () => E.send({
                endpoint: "Lobby.getCurrent"
            })
        }), y = !!((T = (Y = C == null ? void 0 : C.result) == null ? void 0 : Y.jackpots) != null && T.isActive), _ = R({
            enabled: j && y,
            queryKey: ["Lobby.getWsStream"],
            queryFn: () => E.send({
                endpoint: "Lobby.getWsStream"
            })
        }), b = ((Q = _ == null ? void 0 : _.data) == null ? void 0 : Q.result) ? ? null, N = l.useCallback(async () => {
            m || await f()
        }, [m]), Z = l.useCallback(async () => {
            if (!m) return;
            const {
                slots: B,
                wins: G
            } = await p();
            B && o(B), G && r(G)
        }, [m, b]), g = l.useCallback(async B => {
            if (!m) return;
            await d(B);
            const {
                slots: G,
                wins: U
            } = await p();
            r(U), o(G)
        }, [m]), M = l.useCallback(() => {
            if (!m) return;
            u(G => {
                G && o(U => {
                    const ne = G.map(he => he.slot);
                    return (U == null ? void 0 : U.map(he => {
                        const fe = ne.indexOf(he.slot);
                        return fe !== -1 ? G[fe] : he
                    })) ? ? U
                })
            })
        }, [m]), L = l.useCallback(() => {
            m && c(B => {
                B && r(G => {
                    const U = (G || []).filter(({
                        id: ne
                    }) => ne !== B.id);
                    return B.state !== "pending" ? U : [...U, B]
                })
            })
        }, [m]), K = l.useMemo(() => {
            if (!m) return null;
            const B = s == null ? void 0 : s.sort((U, ne) => U.slot - ne.slot);
            return (B == null ? void 0 : B.map(U => ({
                value: U.value,
                name: y1[U.slot],
                slot: U.slot
            }))) ? ? null
        }, [m, s]), H = m ? a : null, F = (H == null ? void 0 : H.filter(B => B.state === "pending")) ? ? null;
        return l.useEffect(() => {
            b ? h(b).then(() => {
                Promise.all([N(), Z(), M(), L()])
            }) : j && y && _.refetch()
        }, [n, j, y, M, L, N, Z, h, b]), l.useEffect(() => se.on("PLAYER_LOGIN", () => {
            i(!0)
        }), []), e.jsx(v1.Provider, {
            value: {
                slots: K,
                wins: F,
                fetchWinAccept: g,
                error: v
            },
            children: t
        })
    },
    nl = ["ar", "he"];

function Ht({
    children: t
}) {
    const s = localStorage.getItem("locale") ? ? "en",
        [o, a] = l.useState(s);
    return l.useEffect(() => {
        nl.includes(o) ? document.documentElement.dir = "rtl" : document.documentElement.dir = "ltr", document.documentElement.lang = o
    }, [o]), l.useEffect(() => {
        const r = se.on("SET_LOCALE", a);
        return () => r()
    }, []), e.jsx(Ps, {
        locale: o,
        basePath: "/",
        version: "0.109.0",
        children: t
    })
}

function il({
    className: t,
    onClick: s
}) {
    var i, c;
    const a = ((c = (i = ge.useConversationList().data) == null ? void 0 : i.result) == null ? void 0 : c[0]) ? ? null,
        r = (a == null ? void 0 : a.isRead) ? ? !0;

    function n() {
        se.emit("SUPPORT_CHAT_OPEN"), s == null || s()
    }
    return e.jsxs("button", {
        className: x("support-chat-btn", t),
        type: "button",
        onClick: n,
        children: [e.jsxs("svg", {
            width: "100%",
            height: "100%",
            viewBox: "0 0 54 50",
            children: [e.jsx("path", {
                fill: "currentColor",
                d: "m49.8 21.83 3.87 23.52A4 4 0 0 1 49.72 50H25A25 25 0 1 1 49.5 20c.12.6.22 1.21.3 1.83Z"
            }), e.jsx("path", {
                className: "support-chat-btn__icon",
                d: "M25 9C16.18 9 9 16.18 9 25v6.63c0 1.64 1.44 2.97 3.2 2.97h1.6c.88 0 1.6-.72 1.6-1.6v-8.23c0-.88-.72-1.6-1.6-1.6h-1.45A12.8 12.8 0 0 1 25 12.2a12.8 12.8 0 0 1 12.65 10.97H36.2c-.88 0-1.6.72-1.6 1.6v9.83a3.2 3.2 0 0 1-3.2 3.2h-3.2v-1.6h-6.4V41H31.4a6.4 6.4 0 0 0 6.4-6.4c1.76 0 3.2-1.33 3.2-2.97V25c0-8.82-7.18-16-16-16Z"
            }), e.jsx("path", {
                className: "support-chat-btn__icon",
                d: "m16.84 30 .33-1.54a177.43 177.43 0 0 0 2.87-2.1c.42-.32.75-.64 1-.93.26-.3.42-.6.49-.92.07-.3.02-.55-.14-.74-.15-.2-.41-.3-.77-.3-.18 0-.36.03-.56.09a7.63 7.63 0 0 0-1.88.88l.27-2.29a9.07 9.07 0 0 1 1.25-.42 6.46 6.46 0 0 1 1.5-.18c.7 0 1.27.13 1.71.38.45.25.76.6.94 1.04.18.43.2.93.09 1.49-.1.4-.25.79-.47 1.14-.23.35-.53.7-.93 1.03-.39.34-.88.7-1.48 1.08l-1.26.82-.24-.5h3.67L22.82 30h-5.98Zm10.62 0a271.5 271.5 0 0 1 .53-2.48l.24-.3.44-2.11a313.66 313.66 0 0 1 .5-2.42l1.73-.75a357.88 357.88 0 0 0-1.5 1.67l-1.6 1.78a130.42 130.42 0 0 0-1.3 1.44l-.08-.28h2.35l.23-.16H31.53l-.4 1.97H24.23l.31-1.53.65-.72.72-.8.67-.75 1.25-1.39.64-.72.65-.72h2.38a1161.6 1161.6 0 0 0-.6 2.89l-.6 2.89a1652.12 1652.12 0 0 0-.53 2.49h-2.32Z"
            })]
        }), !r && e.jsx("sup", {
            className: "support-chat-btn__unread-badge",
            children: "new"
        })]
    })
}

function cl(t, s) {
    const o = new Date(t),
        a = new Date().getDate() - o.getDate(),
        r = new Date().getMonth() - o.getMonth(),
        n = new Date().getFullYear() - o.getFullYear(),
        i = new Date(t).toLocaleTimeString(s, {
            timeStyle: "short"
        }),
        c = new Date(t).toLocaleDateString(s, {
            dateStyle: "short"
        });
    return n === 0 && a === 0 && r === 0 ? i : `${i}, ${c}`
}
const dl = l.memo(function({
    conversationId: s,
    pendingMessages: o,
    isChatWindowExpanded: a,
    onError: r
}) {
    var N, Z;
    const n = l.useRef(null),
        i = l.useRef(!1),
        c = l.useRef(0),
        d = V.usePlayer(),
        p = ge.useConversationList(),
        {
            data: f,
            fetchNextPage: u,
            isFetchingNextPage: m,
            isLoading: h
        } = ge.useConversationHistory(s),
        v = $s(),
        j = l.useMemo(() => (f == null ? void 0 : f.pages.flatMap(g => g.result).reverse()) ? ? [], [f]),
        C = j.length || o.length > 0,
        y = ((Z = (N = p.data) == null ? void 0 : N.result) == null ? void 0 : Z[0]) ? ? null,
        _ = !((y == null ? void 0 : y.isRead) ? ? !0);

    function b() {
        var g;
        (g = n.current) == null || g.scrollTo(0, n.current.scrollHeight)
    }
    return l.useLayoutEffect(() => {
        const g = n.current;
        g && (m || g.scrollTo(0, g.scrollHeight - c.current), c.current = g.scrollHeight ? ? 0)
    }, [m]), l.useLayoutEffect(() => {
        b()
    }, [h]), l.useLayoutEffect(() => {
        (i.current || o.length > 0) && b()
    }, [j, o.length, a]), l.useEffect(() => {
        var M;
        const g = (M = Vs(f == null ? void 0 : f.pages)) == null ? void 0 : M.error;
        g && r(g)
    }, [f]), l.useEffect(() => {
        _ && (D.setQueryData(["Conversation.getList"], g => !g || !g.result ? g : (g.result[0].isRead = !0, { ...g,
            result: { ...g.result
            }
        })), D.isFetching({
            queryKey: ["Conversation.getMessages"]
        }) === 0 && D.invalidateQueries({
            queryKey: ["Conversation.getMessages"]
        }))
    }, [f, _]), l.useEffect(() => {
        if (!n.current) return;
        const g = new AbortController;
        return n.current.addEventListener("scroll", () => {
            const M = n.current;
            M && (i.current = M.scrollTop + M.clientHeight === M.scrollHeight, M.scrollTop === 0 && u())
        }, {
            signal: g.signal
        }), () => {
            g.abort()
        }
    }, [n.current, C]), e.jsx("div", {
        className: "support-chat-window__conversation-window",
        children: C ? e.jsxs("div", {
            ref: n,
            className: "relative h-full overflow-y-auto overscroll-contain p-2.5",
            children: [m && e.jsx("div", {
                className: "pointer-events-none absolute top-5 right-0 left-0 flex items-center justify-center",
                children: e.jsx(J, {
                    className: "animate-spin text-20 text-accent",
                    name: "reload"
                })
            }), e.jsxs("ul", {
                id: "chat-history-list",
                className: "space-y-2.5",
                children: [j.map(g => {
                    var M;
                    return e.jsx("li", {
                        children: e.jsx(zt, {
                            sender: g.from.userName,
                            message: g.text,
                            messageType: g.type,
                            timestamp: g.createdAt * 1e3,
                            isFromCurrentUser: g.from.userId === ((M = d.data) == null ? void 0 : M.id),
                            locale: v
                        })
                    }, g.seqNum)
                }), o.map((g, M) => {
                    var L;
                    return e.jsx("li", {
                        style: {
                            opacity: .5
                        },
                        children: e.jsx(zt, {
                            sender: ((L = d.data) == null ? void 0 : L.displayableName) ? ? "",
                            message: g.text,
                            messageType: "text",
                            timestamp: g.timestamp,
                            locale: v,
                            isFromCurrentUser: !0
                        })
                    }, M)
                })]
            })]
        }) : h ? e.jsx("div", {
            className: "absolute inset-0 flex items-center justify-center",
            children: e.jsx(al, {})
        }) : e.jsx(fl, {})
    })
});

function zt({
    sender: t,
    message: s,
    messageType: o,
    locale: a,
    timestamp: r,
    isFromCurrentUser: n
}) {
    const [i, c] = l.useState(!1), [d, p] = l.useState(!1), [f, u] = l.useState(!1), m = () => {
        c(!0)
    };
    return e.jsxs(e.Fragment, {
        children: [e.jsxs("div", {
            className: `support-chat-message ${n?"-user":"-support"}`,
            children: [e.jsx("span", {
                className: "support-chat-message__sender-name",
                children: t
            }), o === "text" && e.jsx("p", {
                children: s
            }), o === "image" && e.jsxs("div", {
                className: "support-chat-message__media-preview",
                onClick: m,
                children: [!d && e.jsx(it, {}), e.jsx("img", {
                    src: Ie(s),
                    alt: "Image",
                    onLoad: () => p(!0),
                    onError: () => p(!0),
                    style: {
                        display: d ? "block" : "none"
                    }
                })]
            }), o === "video" && e.jsxs("div", {
                className: "support-chat-message__media-preview",
                onClick: m,
                children: [!f && e.jsx(it, {}), e.jsx("video", {
                    src: Ie(s),
                    muted: !0,
                    onLoadedData: () => u(!0),
                    onError: () => u(!0),
                    style: {
                        display: f ? "block" : "none"
                    }
                }), f && e.jsx("div", {
                    className: "support-chat-message__media-preview__play-icon",
                    children: e.jsxs("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "1em",
                        height: "1em",
                        viewBox: "0 0 48 48",
                        children: [e.jsx("circle", {
                            cx: "50%",
                            cy: "50%",
                            r: "50%",
                            fill: "rgba(0, 0, 0, 0.8)"
                        }), e.jsx("path", {
                            d: "M18 14v20l16-10z",
                            fill: "white"
                        })]
                    })
                })]
            }), e.jsx("span", {
                className: "support-chat-message__timestamp",
                children: cl(r, a)
            })]
        }), e.jsx(hl, {
            mediaUrl: o !== "text" ? s : null,
            mediaType: o !== "text" ? o : null,
            isOpen: i,
            onClose: () => c(!1)
        })]
    })
}

function pl({
    disabled: t,
    onClick: s
}) {
    return e.jsx("button", {
        type: "button",
        disabled: t,
        onClick: s,
        onMouseDown: o => o.preventDefault(),
        className: "support-chat-window__send-message-btn",
        children: e.jsx("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: "1em",
            height: "1em",
            viewBox: "0 0 24 20",
            children: e.jsx("path", {
                fill: "currentColor",
                d: "M.68 10.836c.885.31 2.041.729 3.577 1.166 1.545.447 2.274.525 3.84-.496 1.564-1.02 6.968-4.714 7.649-5.19.68-.466 2.002-1.244 2.255-1.06.252.185-.321 1.06-1.186 1.896-.865.836-4.656 4.325-5.599 5.268-.943.943-.933 1.633.04 2.42.961.788 1.311.933 5.131 3.548 3.82 2.615 4.724 1.74 5.093-.428.37-2.167 2.07-13.18 2.382-15.318.165-1.098.291-1.934-.292-2.226-.573-.291-1.254-.136-2.624.438-2.78 1.176-17.7 7.25-19.556 8.038-1.857.777-1.594 1.633-.71 1.944Z"
            })
        })
    })
}

function fl() {
    const {
        $t: t
    } = w();
    return e.jsxs("div", {
        className: "support-chat-window-nodata-placeholder",
        children: [e.jsxs("svg", {
            className: "support-chat-window-nodata-placeholder__icon",
            xmlns: "http://www.w3.org/2000/svg",
            width: "1em",
            height: "1em",
            viewBox: "0 0 112 112",
            children: [e.jsx("path", {
                fill: "currentColor",
                strokeWidth: "3",
                d: "m10.23 49.39-.25 1.7h6.82a4.1 4.1 0 0 1 4.1 4.1V84a4.1 4.1 0 0 1-4.1 4.1h-5.6c-5.46 0-9.7-4.1-9.7-8.9V56A54.56 54.56 0 0 1 56 1.5 54.56 54.56 0 0 1 110.5 56v23.2c0 4.8-4.25 8.9-9.7 8.9h-1.5v1.5c0 11.53-9.37 20.9-20.9 20.9H46.3V96.7h19.4v5.6h12.7c7 0 12.7-5.7 12.7-12.7V55.2a4.1 4.1 0 0 1 4.1-4.1h6.82l-.25-1.71A46.32 46.32 0 0 0 56 9.7a46.32 46.32 0 0 0-45.77 39.69Z"
            }), e.jsx("path", {
                fill: "currentColor",
                d: "M67.17 70.57a950.24 950.24 0 0 1 1.83-8.7l.84-1.05 1.55-7.37A1097.8 1097.8 0 0 1 73.18 45l6.02-2.63a1252.58 1252.58 0 0 0-5.27 5.84l-5.6 6.24a456.47 456.47 0 0 0-4.54 5.04l-.27-.99h8.2l.83-.57h8.84l-1.4 6.9h-24.1l1.1-5.36 2.26-2.52 2.52-2.82c.86-.93 1.64-1.8 2.36-2.6l4.34-4.85 2.27-2.52 2.27-2.52h8.34a4065.6 4065.6 0 0 0-2.12 10.1L77.1 61.85a5782.42 5782.42 0 0 0-1.82 8.72h-8.1ZM30 70.57l1.16-5.38a621 621 0 0 0 2.47-1.78c.81-.6 1.64-1.18 2.48-1.77a152.7 152.7 0 0 0 5.06-3.8 24.2 24.2 0 0 0 3.53-3.27 7.42 7.42 0 0 0 1.7-3.22c.24-1.06.08-1.93-.48-2.6-.55-.67-1.45-1-2.71-1-.62 0-1.27.08-1.95.26-.69.19-1.4.43-2.13.74-.72.3-1.47.66-2.22 1.07-.74.4-1.5.81-2.25 1.26l.95-7.98c.68-.3 1.39-.57 2.12-.82.73-.25 1.48-.47 2.27-.65a22.6 22.6 0 0 1 5.27-.63c2.42 0 4.4.44 5.96 1.32a7.16 7.16 0 0 1 3.28 3.64c.63 1.52.73 3.26.31 5.2-.3 1.45-.85 2.78-1.64 4.02a17.18 17.18 0 0 1-3.23 3.6 44.47 44.47 0 0 1-5.19 3.79l-4.43 2.85-.82-1.74h12.86l-1.45 6.89H30Z"
            })]
        }), e.jsx("div", {
            children: t({
                id: "FeoSOL",
                defaultMessage: [{
                    type: 0,
                    value: "Have a question? Ask us!"
                }]
            })
        })]
    })
}

function ul({
    onFileSelect: t
}) {
    const s = l.useRef(null),
        o = a => {
            var n;
            const r = (n = a.target.files) == null ? void 0 : n[0];
            r && (t(r), s.current && (s.current.value = ""))
        };
    return e.jsxs("button", {
        type: "button",
        onClick: () => {
            var a;
            return (a = s.current) == null ? void 0 : a.click()
        },
        onMouseDown: a => a.preventDefault(),
        className: "support-chat-window__add-attachment-btn",
        children: [e.jsx("input", {
            ref: s,
            type: "file",
            accept: ".jpeg, .jpg, .png, .mp4, .mov, .avi",
            onChange: o,
            className: "hidden"
        }), e.jsx(J, {
            name: "paperClip"
        })]
    })
}

function ml({
    file: t,
    isOpen: s,
    isUploading: o,
    error: a,
    onSend: r,
    onCancel: n
}) {
    const [i, c] = l.useState(null), d = l.useRef(null), p = l.useRef(null), f = b1(), u = t == null ? void 0 : t.type.startsWith("video/"), m = t == null ? void 0 : t.type.startsWith("image/");
    return l.useEffect(() => {
        var h;
        if (t && s) {
            const v = URL.createObjectURL(t);
            return c(v), d.current && !d.current.open && d.current.showModal(), () => {
                URL.revokeObjectURL(v)
            }
        } else !s && ((h = d.current) != null && h.open) && (d.current.close(), c(null))
    }, [t, s]), l.useEffect(() => {
        if (u && p.current && i) {
            const h = p.current;
            h.currentTime = .1
        }
    }, [u, i]), t ? e.jsx("dialog", {
        ref: d,
        className: "attachment-preview-dialog dialog",
        onClose: n,
        children: e.jsxs("div", {
            className: "attachment-preview-dialog__content",
            children: [e.jsx("div", {
                className: "attachment-preview-dialog__header",
                children: f ? e.jsx(f, {
                    onClick: n
                }) : e.jsx(E1, {
                    variant: "secondary",
                    fit: !0,
                    onClick: n,
                    children: e.jsx(J, {
                        className: "text-sm lg:text-base",
                        name: "close"
                    })
                })
            }), e.jsxs("div", {
                className: "attachment-preview-dialog__preview",
                children: [m && i && e.jsx("img", {
                    src: i,
                    alt: "Preview"
                }), u && i && e.jsx("video", {
                    ref: p,
                    src: i,
                    controls: !1,
                    muted: !0
                })]
            }), e.jsxs("div", {
                className: "attachment-preview-dialog__preview-details",
                children: [e.jsx("span", {
                    children: t.name
                }), e.jsxs("span", {
                    children: [(t.size / 1024 / 1024).toFixed(2), " MB"]
                })]
            }), a && e.jsx("div", {
                className: "attachment-preview-dialog__error",
                children: a
            }), e.jsx("div", {
                className: "attachment-preview-dialog__actions",
                children: e.jsx("button", {
                    type: "button",
                    onClick: r,
                    disabled: o,
                    "data-button": "send",
                    children: o ? e.jsx(J, {
                        className: "animate-spin",
                        name: "reload"
                    }) : e.jsx("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "1em",
                        height: "1em",
                        viewBox: "0 0 24 20",
                        children: e.jsx("path", {
                            fill: "currentColor",
                            d: "M.68 10.836c.885.31 2.041.729 3.577 1.166 1.545.447 2.274.525 3.84-.496 1.564-1.02 6.968-4.714 7.649-5.19.68-.466 2.002-1.244 2.255-1.06.252.185-.321 1.06-1.186 1.896-.865.836-4.656 4.325-5.599 5.268-.943.943-.933 1.633.04 2.42.961.788 1.311.933 5.131 3.548 3.82 2.615 4.724 1.74 5.093-.428.37-2.167 2.07-13.18 2.382-15.318.165-1.098.291-1.934-.292-2.226-.573-.291-1.254-.136-2.624.438-2.78 1.176-17.7 7.25-19.556 8.038-1.857.777-1.594 1.633-.71 1.944Z"
                        })
                    })
                })
            })]
        })
    }) : null
}

function hl({
    mediaUrl: t,
    mediaType: s,
    isOpen: o,
    onClose: a
}) {
    const r = l.useRef(null),
        n = b1();
    return l.useEffect(() => {
        var i;
        o && r.current && !r.current.open ? r.current.showModal() : !o && ((i = r.current) != null && i.open) && r.current.close()
    }, [o]), !t || !s ? null : e.jsx("dialog", {
        ref: r,
        className: "media-viewer-dialog dialog",
        onClose: a,
        children: e.jsxs("div", {
            className: "media-viewer-dialog__content",
            children: [e.jsx("div", {
                className: "media-viewer-dialog__header",
                children: n ? e.jsx(n, {
                    onClick: a
                }) : e.jsx(E1, {
                    variant: "secondary",
                    fit: !0,
                    onClick: a,
                    children: e.jsx(J, {
                        className: "text-sm lg:text-base",
                        name: "close"
                    })
                })
            }), e.jsxs("div", {
                className: "media-viewer-dialog__media-container",
                children: [s === "image" && e.jsx("img", {
                    src: Ie(t),
                    alt: "Media"
                }), s === "video" && e.jsx("video", {
                    src: Ie(t),
                    controls: !0,
                    autoPlay: !1
                })]
            })]
        })
    })
}
const xl = 4096;

function gl({
    onMinimized: t
}) {
    var Nt, Ft, At;
    const [s, o] = Te(!1), [a, r, n] = Te(!1), [i, c] = l.useState(""), [d, p] = l.useState(null), [f, u] = l.useState([]), [m, h] = l.useState(null), [v, j] = l.useState(!1), [C, y] = l.useState(null), _ = l.useRef(null), b = me(), {
        $t: N
    } = w(), {
        formatMessage: Z
    } = _e(), g = V.usePlayer(), M = ge.useConversationList(), {
        mutate: L
    } = ge.useSendMessage(), K = ge.useUploadAttachment(), H = ((Ft = (Nt = M.data) == null ? void 0 : Nt.result) == null ? void 0 : Ft[0]) ? ? null, F = (H == null ? void 0 : H.id) ? ? null, Y = F !== null, T = l.useMemo(() => i.length >= xl, [i]);

    function Q(A) {
        const P = A.type.startsWith("image/"),
            Le = A.type.startsWith("video/");
        if (!P && !Le) return N({
            id: "bY0Ufj",
            defaultMessage: [{
                type: 0,
                value: "Only image (jpg, png) and video (mp4, mov, avi) files are allowed"
            }]
        });
        const ds = P ? 10 * 1024 * 1024 : 50 * 1024 * 1024;
        return A.size > ds ? N(P ? {
            id: "F1hwJt",
            defaultMessage: [{
                type: 0,
                value: "Image size must be less than 10MB"
            }]
        } : {
            id: "2yhkg0",
            defaultMessage: [{
                type: 0,
                value: "Video size must be less than 50MB"
            }]
        }) : P ? new Promise(St => {
            const Me = new Image;
            Me.onload = () => {
                URL.revokeObjectURL(Me.src), St(null)
            }, Me.onerror = () => {
                URL.revokeObjectURL(Me.src), St(N({
                    id: "3bEBaq",
                    defaultMessage: [{
                        type: 0,
                        value: "Failed to load image"
                    }]
                }))
            }, Me.src = URL.createObjectURL(A)
        }) : null
    }
    async function B(A) {
        const P = await Q(A);
        if (P) {
            fe({
                code: 0,
                message: P
            });
            return
        }
        h(A), j(!0), y(null)
    }

    function G() {
        h(null), j(!1), y(null)
    }
    async function U() {
        !m || F === null || (y(null), K.mutate({
            conversationId: F,
            file: m
        }, {
            onSuccess: async () => {
                G()
            },
            onError: A => {
                y(A instanceof Error ? A.message : N({
                    id: "x2gE8t",
                    defaultMessage: [{
                        type: 0,
                        value: "Failed to upload file"
                    }]
                }))
            }
        }))
    }

    function ne() {
        c("")
    }

    function be(A) {
        const P = A.trim();
        if (T) throw new Error("Message is too long");
        return P
    }

    function he(A) {
        u(P => [...P, {
            text: A,
            timestamp: Date.now()
        }]), L({ ...F !== null && {
                conversationId: F
            },
            text: A
        }, {
            onSettled: P => {
                u([]), P != null && P.error && fe({
                    code: P.error.code,
                    message: P.error.message
                }), F === null && M.refetch()
            }
        })
    }

    function fe(A) {
        var P, Le;
        p({
            code: A.code,
            message: Z(new le(A.message, {
                code: A.code
            })),
            playerId: (P = g.data) == null ? void 0 : P.id,
            hallId: (Le = g.data) == null ? void 0 : Le.hallId,
            timestamp: Date.now()
        })
    }

    function Ee() {
        const A = be(i);
        A && (he(A), ne())
    }

    function Xe(A) {
        c(A.target.value)
    }

    function is(A) {
        Ee()
    }

    function cs(A) {
        A.key === "Enter" && Ee()
    }
    return l.useEffect(() => {
        var A;
        (A = M.data) != null && A.error && fe(M.data.error)
    }, [(At = M.data) == null ? void 0 : At.error]), e.jsx("div", {
        className: x("support-chat-window", {
            "support-chat-window_expanded": s,
            "support-chat-window_minimized": a,
            "modal-dialog": b && !a
        }),
        onAnimationEnd: ({
            animationName: A
        }) => {
            A === "minimize-chat-window" && t()
        },
        children: a ? e.jsx("div", {
            className: "absolute inset-0 rounded-inherit"
        }) : e.jsxs("div", {
            className: "flex h-full flex-col gap-1",
            children: [e.jsxs("div", {
                className: "-mt-1 -mx-1 flex items-end justify-between mobile-only:p-2 mobile-only:pb-0 text-18",
                children: [e.jsx("button", {
                    type: "button",
                    onClick: () => n(!0),
                    className: "support-chat-window__control-btn",
                    children: e.jsx(J, {
                        name: "minimizeWindow"
                    })
                }), e.jsx("button", {
                    type: "button",
                    onClick: o,
                    className: "support-chat-window__control-btn mobile-only:hidden",
                    children: e.jsx(J, {
                        name: "expandWindow"
                    })
                })]
            }), e.jsxs("div", {
                className: "relative flex min-h-0 grow flex-col",
                children: [e.jsx(dl, {
                    conversationId: F,
                    pendingMessages: f,
                    isChatWindowExpanded: s,
                    onError: fe
                }), T && e.jsx("span", {
                    style: {
                        color: "var(--error-accent-color)"
                    },
                    children: N({
                        id: "MBjOL0",
                        defaultMessage: [{
                            type: 0,
                            value: "Message is too long"
                        }]
                    })
                }), e.jsxs("div", {
                    className: "support-chat-window__message-input-container",
                    children: [Y && e.jsx(ul, {
                        onFileSelect: B
                    }), e.jsx("input", {
                        ref: _,
                        name: "message",
                        type: "text",
                        value: i,
                        placeholder: N({
                            id: "Olq7Wf",
                            defaultMessage: [{
                                type: 0,
                                value: "Type your message here..."
                            }]
                        }),
                        autoComplete: "off",
                        onChange: Xe,
                        onKeyDown: cs
                    }), e.jsx(pl, {
                        disabled: T,
                        onClick: is
                    })]
                }), d && e.jsx("div", {
                    className: "support-chat-window__alert-container",
                    children: e.jsx(x2, {
                        message: d.message,
                        type: "error",
                        closable: !0,
                        afterClose: () => p(null),
                        description: e.jsxs(e.Fragment, {
                            children: [e.jsxs("div", {
                                children: ["Code: ", d.code]
                            }), e.jsxs("div", {
                                children: ["PID: ", d.playerId, " / ", d.hallId]
                            }), e.jsx("div", {
                                children: new Date(d.timestamp).toLocaleString()
                            })]
                        })
                    })
                }), e.jsx(ml, {
                    file: m,
                    isOpen: v,
                    isUploading: K.isPending || f.length > 0,
                    error: C,
                    onSend: U,
                    onCancel: G
                })]
            })]
        })
    })
}

function vl({
    className: t
}) {
    const {
        data: s
    } = ae.useLobby();
    return ((s == null ? void 0 : s.isIMActive) ? ? !1) && e.jsx(Cl, {
        className: t
    })
}

function Cl({
    className: t
}) {
    var d, p;
    const [s, o] = l.useState(!0), r = ((p = (d = ge.useConversationList().data) == null ? void 0 : d.result) == null ? void 0 : p[0]) ? ? null, n = (r == null ? void 0 : r.isRead) ? ? !0;

    function i() {
        D.invalidateQueries({
            queryKey: ["Conversation.getList"]
        }), o(!0)
    }

    function c() {
        D.isFetching({
            queryKey: ["Conversation.getMessages"]
        }) > 0 || D.invalidateQueries({
            queryKey: ["Conversation.getMessages"]
        }), o(!1)
    }
    return l.useEffect(() => {
        s && !n && D.invalidateQueries({
            queryKey: ["Conversation.getMessages"]
        })
    }, [s, n]), e.jsxs("div", {
        className: x("support-chat-container", {
            "-open": !s
        }, t),
        children: [e.jsx(il, {
            onClick: c
        }), !s && e.jsx(gl, {
            onMinimized: i
        })]
    })
}
const jl = "https://www.google.com/search?igu=1";

function yl({
    children: t
}) {
    const {
        data: s
    } = V.usePanic(), o = wl(s), a = l.useRef(o);
    return l.useEffect(() => {
        o && (window.document.title = "Welcome"), !o && a.current && window.location.reload(), a.current = o
    }, [o]), o ? e.jsx("iframe", {
        src: s.redirectUrl || jl,
        style: {
            background: "white",
            border: 0,
            position: "fixed",
            inset: 0,
            height: "100%",
            width: "100%",
            zIndex: 99999999
        }
    }) : e.jsx(e.Fragment, {
        children: t
    })
}

function wl(t) {
    return typeof t == "object" && t !== null && "redirectUrl" in t
}

function _l({
    children: t,
    isCustomJackpotProvider: s
}) {
    const o = localStorage.getItem("locale");
    m2[o] || localStorage.setItem("locale", "en");
    const a = s ? e.jsx(Ht, {
        children: t
    }) : e.jsx(rl, {
        children: e.jsx(Ht, {
            children: t
        })
    });
    return e.jsx(vs, {
        client: D,
        children: e.jsx(yl, {
            children: e.jsx(Xs, {
                children: e.jsx(t2, {
                    children: a
                })
            })
        })
    })
}

function Ut({
    direction: t,
    disabled: s,
    onClick: o,
    className: a,
    svgDefault: r,
    svgHover: n
}) {
    return e.jsx("button", {
        dir: "ltr",
        type: "button",
        onClick: o,
        disabled: s,
        className: x("group h-[95px] w-fit cursor-pointer", a, {
            "pointer-events-none cursor-not-allowed grayscale": s,
            "rotate-180 transform": t === "right"
        }),
        children: e.jsxs("div", {
            className: "relative h-full w-full",
            children: [e.jsx("div", {
                className: "absolute inset-0 transition-opacity duration-500 ease-in-out group-hover:opacity-0",
                children: r
            }), e.jsx("div", {
                className: "absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100",
                children: n
            })]
        })
    })
}
const Dt = l.forwardRef(function({
    className: s,
    label: o,
    requiredMessage: a,
    ...r
}, n) {
    return e.jsxs("label", {
        className: x(s, "flex flex-col gap-1 desktop:text-base text-xs"),
        children: [o && e.jsxs("span", {
            className: "font-bold",
            children: [o, ":"]
        }), e.jsxs("div", {
            className: "relative grow",
            children: [e.jsx("input", {
                className: "peer input-border h-16 w-full rounded-rounded border-3 bg-black p-2.5 font-normal text-2xl text-white placeholder:text-white focus:outline focus:outline-1 focus:outline-primary",
                ref: n,
                ...r
            }), e.jsx("div", {
                className: "invisible absolute left-2.5 font-light desktop:text-xs text-2xs text-radical-red peer-[:user-invalid]:visible",
                children: a
            })]
        })]
    })
});

function $({
    className: t,
    children: s
}) {
    return e.jsx("div", {
        className: `${t} animate-pulse desktop:rounded-rounded bg-bright-gray`,
        children: s
    })
}
const bl = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "100%",
        height: "100%",
        viewBox: "0 0 16 10",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        fillRule: "evenodd",
        d: "M0 1a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm6 0a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zM1 6a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1z",
        clipRule: "evenodd"
    })),
    El = bl,
    Ml = t => l.createElement("svg", {
        width: 12,
        height: 22,
        viewBox: "0 0 12 22",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...t
    }, l.createElement("path", {
        d: "M11.8356 19.6166C11.8356 20.2741 11.4247 20.9316 10.7671 21.1782C10.1096 21.4248 9.36986 21.2604 8.87671 20.8495L0.493151 12.3015C0.164384 11.9727 0 11.4796 0 11.0686C0 10.5755 0.164384 10.1645 0.493151 9.83576L9.0411 1.20562C9.53425 0.712471 10.274 0.548088 10.9315 0.876855C11.589 1.12343 12 1.78096 12 2.4385L11.8356 19.6166Z",
        fill: "currentColor"
    })),
    Nl = Ml,
    Fl = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "100%",
        height: "100%",
        viewBox: "0 0 7 10",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "M6.35 4.4c.33.25.33.75 0 1L1.64 9.07a.64.64 0 0 1-1.03-.5v-7.3c0-.54.6-.84 1.03-.51l4.7 3.65Z"
    })),
    Al = Fl,
    Sl = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: 20,
        height: 17,
        fill: "none",
        viewBox: "0 0 20 17",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        fillRule: "evenodd",
        d: "M11.584 2.17a6.234 6.234 0 1 1 0 12.469v1.781a8.015 8.015 0 1 0-8.016-8.015H5.35a6.234 6.234 0 0 1 6.234-6.235M4.459 13.748l3.085-5.343h-6.17zm8.397-6.878-.898-2.766-.9 2.766H8.152l2.353 1.71-.9 2.766 2.354-1.71 2.353 1.71-.9-2.766 2.354-1.71z",
        clipRule: "evenodd"
    })),
    Ol = Sl,
    Zl = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "100%",
        height: "100%",
        fill: "none",
        viewBox: "0 0 235 235",
        ...t
    }, l.createElement("path", {
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeMiterlimit: 10,
        strokeWidth: 14,
        d: "M212.214 101.715H22.785v126.286h189.429V101.715ZM228 54.355H7v47.358h221V54.356Z"
    }), l.createElement("path", {
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeMiterlimit: 10,
        strokeWidth: 14,
        d: "M141.174 101.715H93.816v126.286h47.358V101.715ZM141.174 54.355H93.816v47.358h47.358V54.356ZM117.495 46.464l23.679-23.678L133.281 7h-31.572l-7.893 15.786 23.679 23.678ZM141.184 22.787l31.571-7.892 15.786 15.785V54.36"
    }), l.createElement("path", {
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeMiterlimit: 10,
        strokeWidth: 14,
        d: "m93.822 22.787-31.571-7.892L46.465 30.68V54.36"
    })),
    Bl = Zl,
    kl = t => l.createElement("svg", {
        width: "100%",
        height: "100%",
        viewBox: "0 0 12 13",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...t
    }, l.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M6.00003 13C9.04003 12.9913 11.5 11.5465 11.5 9.89963C11.5 8.24773 11.1944 6.07638 11.1944 6.07638C11.0701 5.46106 10.3737 4.69615 9.71955 4.69615V3.78934C9.71949 1.70467 8.05647 0.0136391 6.00003 0C3.94359 0.0136391 2.28051 1.70467 2.28051 3.78934V4.69615C1.62645 4.69615 0.929989 5.46106 0.805689 6.07638C0.805689 6.07638 0.5 8.24773 0.5 9.89963C0.500054 11.5465 2.96003 12.9913 6.00003 13ZM6.67526 8.46902L6.88431 10.1661C6.88431 10.4174 6.64649 10.6212 6.35313 10.6212H5.65595C5.36258 10.6212 5.12476 10.4174 5.12476 10.1661L5.36935 8.46902C5.01636 8.24734 4.78046 7.8527 4.78046 7.40127C4.78046 6.70707 5.33646 6.1443 6.0223 6.1443C6.70815 6.1443 7.26414 6.70707 7.26414 7.40127C7.26414 7.85264 7.02825 8.24734 6.67526 8.46902ZM4.14615 3.678C4.14615 2.63714 4.97434 1.79246 6.00003 1.78133C7.02572 1.79252 7.8539 2.6372 7.8539 3.678V4.53816H6.00003H4.14615V3.678Z",
        fill: "white"
    })),
    Ll = kl,
    Rl = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "100%",
        height: "100%",
        viewBox: "0 0 32 32",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "M30.85 5.4a1 1 0 0 0 0-1.42l-2.83-2.83a1 1 0 0 0-1.41 0L16 11.75 5.4 1.15a1 1 0 0 0-1.42 0L1.15 3.98a1 1 0 0 0 0 1.41L11.75 16 1.16 26.6a1 1 0 0 0 0 1.42l2.83 2.83a1 1 0 0 0 1.41 0L16 20.24l10.6 10.6a1 1 0 0 0 1.42 0l2.83-2.82a1 1 0 0 0 0-1.42L20.25 16z"
    })),
    Hl = Rl,
    zl = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "100%",
        height: "100%",
        viewBox: "0 0 14 14",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "M5.59 7.13.64 12.08l1.41 1.42L7 8.55l4.95 4.95 1.41-1.42-4.95-4.95 4.95-4.95L11.95.77 7 5.72 2.05.77.64 2.18l4.95 4.95Z"
    })),
    Ul = zl,
    Dl = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: 23,
        height: 15,
        fill: "none",
        viewBox: "0 0 23 15",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        fillRule: "evenodd",
        d: "M0 7.9s5.15 7 11.5 7 11.5-7 11.5-7-5.15-7-11.5-7S0 7.9 0 7.9m2.61 0a22 22 0 0 0 2.05 1.97c1.95 1.65 4.37 3.03 6.84 3.03s4.89-1.38 6.84-3.03c.84-.7 1.53-1.4 2.05-1.97a22 22 0 0 0-2.05-1.97C16.4 4.3 13.97 2.9 11.5 2.9S6.61 4.3 4.66 5.93c-.84.7-1.53 1.4-2.05 1.97m-1 1.19",
        clipRule: "evenodd"
    })),
    Vl = Dl,
    Gl = t => l.createElement("svg", {
        width: 24,
        height: 24,
        viewBox: "0 0 41 41",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...t
    }, l.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M20.1133 40.5C9.0085 40.5 0 31.5482 0 20.5C0 9.45184 9.0085 0.5 20.1133 0.5C31.2181 0.5 40.2266 9.45184 40.2266 20.5C40.2266 31.5482 31.2181 40.5 20.1133 40.5ZM20.1133 4.70397C11.3428 4.70397 4.22663 11.7748 4.22663 20.5C4.22663 29.2252 11.3428 36.296 20.1133 36.296C28.8839 36.296 36 29.2252 36 20.5C36 11.7748 28.8839 4.70397 20.1133 4.70397ZM9.41643 16.9079H30.8102V24.2734H9.41643V16.9079Z",
        fill: "currentColor"
    })),
    Il = Gl,
    Tl = t => l.createElement("svg", {
        width: "100%",
        height: "100%",
        id: "\\u0421\\u043B\\u043E\\u0439_1",
        xmlns: "http://www.w3.org/2000/svg",
        xmlnsXlink: "http://www.w3.org/1999/xlink",
        viewBox: "-244 360.9 107 120",
        style: {
            enableBackground: "new -244 360.9 107 120"
        },
        xmlSpace: "preserve",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "M-138.7,425.2l-16.4,16.3c-1.9,1.9-5,1.9-6.9,0s-1.9-5,0-6.8l8.9-8.7h-62.8c-2.8,0-5-2.2-5-5s2.2-5,5-5h62.4 l-10-9.8c-1.9-1.9-1.9-4.9,0-6.8s5-1.9,6.9,0l17.9,17.7C-136.4,419.3-136.4,422.9-138.7,425.2z M-174,390.9c-2.8,0-5-2.2-5-5v-11 c0-2.2-1.8-4-4-4h-47c-2.2,0-4,1.8-4,4v92c0,2.2,1.8,4,4,4h47c2.2,0,4-1.8,4-4v-11c0-2.8,2.2-5,5-5s5,2.2,5,5v11c0,7.7-6.3,14-14,14 h-47c-7.7,0-14-6.3-14-14v-92c0-7.7,6.3-14,14-14h47c7.7,0,14,6.3,14,14v11C-169,388.7-171.2,390.9-174,390.9z"
    })),
    Pl = Tl,
    $l = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "100%",
        height: "100%",
        viewBox: "0 0 16 15",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "m8 0 1.8 5.53h5.8l-4.7 3.41 1.8 5.53L8 11.06l-4.7 3.41 1.8-5.53L.4 5.53h5.8z"
    })),
    Wl = $l,
    ql = t => l.createElement("svg", {
        width: "100%",
        height: "100%",
        viewBox: "0 0 18 18",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...t
    }, l.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M16.0947 17.5H11.2543C10.7664 17.5 10.3565 17.1092 10.3565 16.6207C10.3565 16.1322 10.7468 15.7414 11.2543 15.7414H14.4162L10.1418 11.5598C9.79047 11.2276 9.79047 10.6609 10.1418 10.3287C10.3175 10.1529 10.5517 10.0747 10.7664 10.0747C11.0006 10.0747 11.2153 10.1529 11.3909 10.3287L15.7044 14.5299V11.3253C15.7044 10.8368 16.0947 10.446 16.6022 10.446C17.1096 10.446 17.5 10.8368 17.5 11.3253V16.1126C17.4805 16.8747 16.8559 17.5 16.0947 17.5ZM7.13605 7.92529C6.90184 7.92529 6.68714 7.84713 6.51148 7.67126L2.2566 3.45057V6.65517C2.2566 7.14368 1.86625 7.53448 1.3783 7.53448C0.890356 7.53448 0.5 7.14368 0.5 6.65517V1.88736C0.5 1.12529 1.12457 0.5 1.88576 0.5H6.64811C7.13605 0.5 7.52641 0.890805 7.52641 1.37931C7.52641 1.86782 7.13605 2.25862 6.64811 2.25862H3.52526L7.76062 6.44023C8.11194 6.77241 8.11194 7.33908 7.76062 7.67126C7.58496 7.82759 7.37026 7.92529 7.13605 7.92529Z",
        fill: "white"
    })),
    Kl = ql,
    Ql = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "100%",
        height: "100%",
        viewBox: "0 0 62 31",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "M18.084 12.917v-2.584a2.583 2.583 0 0 0-5.167 0v2.584h-2.583a2.583 2.583 0 1 0 0 5.166h2.583v2.584a2.583 2.583 0 1 0 5.167 0v-2.584h2.583a2.583 2.583 0 1 0 0-5.166zM15.5 0h31a15.5 15.5 0 1 1-11.553 25.833h-7.894A15.499 15.499 0 0 1 2.493 7.07 15.5 15.5 0 0 1 15.5 0m31 12.917a2.583 2.583 0 1 0 0-5.167 2.583 2.583 0 0 0 0 5.167m-5.167 5.166a2.583 2.583 0 1 0 0-5.166 2.583 2.583 0 0 0 0 5.166m10.333 0a2.583 2.583 0 1 0 0-5.166 2.583 2.583 0 0 0 0 5.166M46.5 23.25a2.584 2.584 0 1 0 0-5.167 2.584 2.584 0 0 0 0 5.167"
    })),
    Yl = Ql,
    Jl = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "100%",
        height: "100%",
        viewBox: "0 0 24 22",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "M2.42 2.58a6.25 6.25 0 0 0 0 8.84l9.722 9.722v-.002l.002.002 9.722-9.723a6.25 6.25 0 1 0-8.839-8.838l-.884.885-.885-.885a6.25 6.25 0 0 0-8.839 0Z"
    })),
    Xl = Jl,
    eo = t => l.createElement("svg", {
        width: 30,
        height: 30,
        viewBox: "0 0 30 30",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...t
    }, l.createElement("path", {
        d: "M24.6408 29.4944H19.8906C18.5093 29.4944 17.3639 28.382 17.3639 26.9663V22.0786H12.6473V26.9663C12.6473 28.3483 11.5356 29.4944 10.1206 29.4944H5.40407C4.0228 29.4944 2.87735 28.382 2.87735 26.9663V17.9326H2.47308C1.46239 17.9326 0.552777 17.3258 0.182192 16.382C-0.188393 15.4382 0.0137445 14.3595 0.721225 13.6517L13.119 1.24719C13.6243 0.775278 14.2307 0.505615 14.9045 0.505615C15.5783 0.505615 16.2184 0.775278 16.6901 1.24719L29.2563 13.8202C29.9974 14.5281 30.1996 15.6404 29.7953 16.5843C29.391 17.5281 28.4814 18.1348 27.4707 18.1348H27.1675V27C27.1675 28.3483 26.0221 29.4944 24.6408 29.4944ZM20.4296 26.4607H24.1355V17.5955C24.1355 16.9213 24.405 16.2809 24.8766 15.809C25.2472 15.4382 25.7525 15.2022 26.2579 15.1011L14.9045 3.74157L3.75328 14.9326C4.96611 15.1011 5.9431 16.1461 5.9431 17.427V26.4607H9.64895V21.5393C9.64895 20.1573 10.7607 19.0112 12.1757 19.0112H17.9366C19.3178 19.0112 20.4633 20.1236 20.4633 21.5393V26.4607H20.4296Z",
        fill: "currentColor"
    })),
    to = eo,
    so = t => l.createElement("svg", {
        width: "100%",
        height: "100%",
        viewBox: "0 0 8 23",
        xmlns: "http://www.w3.org/2000/svg",
        ...t
    }, l.createElement("path", {
        d: "M2.5 8.92035C2.3 9.9115 2 11.7947 1.4 14.5699C1 16.354 0.8 17.7416 0.6 18.5345C0.4 19.3274 0.3 20.0212 0.3 20.6159V20.8142C0.3 21.9044 1 22.4 2.5 22.4C3.1 22.4 3.8 22.3009 4.4 22.0035C5 21.8053 5.6 21.508 6 21.2106C6.4 20.9133 6.7 20.6159 6.9 20.4177L6.3 19.7239C5.8 20.0212 5.5 20.3186 5.2 20.4177C4.9 20.5168 4.7 20.6159 4.5 20.6159C4.2 20.6159 4.1 20.4177 4.1 20.0212C4.1 19.823 4.1 19.7239 4.1 19.6248L6.5 6.73982L5.6 6.34336L0.3 7.03717L0 8.12743L2.5 8.92035ZM3.3 2.08142C3.3 2.47788 3.5 2.87434 3.9 3.17168C4.3 3.46903 4.8 3.66726 5.3 3.66726C5.8 3.66726 6.2 3.56814 6.6 3.36991C7 3.17168 7.3 2.87434 7.6 2.57699C7.8 2.18053 8 1.88319 8 1.48673C8 1.09027 7.8 0.693805 7.4 0.39646C7 0.099115 6.5 0 5.8 0C5.4 0 5 0.099115 4.6 0.297345C4.2 0.495575 3.9 0.693805 3.7 0.99115C3.4 1.38761 3.3 1.68496 3.3 2.08142Z",
        fill: "url(#i-1)"
    }), l.createElement("defs", null, l.createElement("linearGradient", {
        id: "i-1",
        x1: 4,
        y1: 0,
        x2: 4,
        y2: 22.4,
        gradientUnits: "userSpaceOnUse"
    }, l.createElement("stop", {
        offset: .42,
        stopColor: "white"
    }), l.createElement("stop", {
        offset: .48,
        stopColor: "currentColor"
    }), l.createElement("stop", {
        offset: .63,
        stopColor: "currentColor"
    })))),
    lo = so,
    oo = t => l.createElement("svg", {
        width: "100%",
        height: "100%",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-274.8 408.4 9.6 24.6",
        style: {
            enableBackground: "new -274.8 408.4 9.6 24.6"
        },
        xmlSpace: "preserve",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "M-271.5,418.1c-0.3,1.1-0.8,3.1-1.6,6.2c-0.5,2-0.9,3.4-1.1,4.4c-0.2,0.9-0.4,1.7-0.5,2.3l0,0.3 c-0.1,1.2,0.7,1.7,2.3,1.7c0.7,0,1.4-0.1,2.1-0.4c0.7-0.3,1.2-0.6,1.7-0.9c0.5-0.3,0.8-0.6,1-0.8l-0.5-0.8c-0.5,0.4-0.9,0.6-1.3,0.8 c-0.3,0.1-0.6,0.2-0.8,0.2c-0.3,0-0.5-0.2-0.4-0.7c0-0.2,0-0.3,0.1-0.5l3.5-14.2l-0.9-0.4l-5.8,0.8l-0.4,1.2L-271.5,418.1z  M-270.2,410.6c0,0.5,0.2,0.9,0.6,1.2c0.4,0.3,0.9,0.5,1.5,0.5c0.5,0,1-0.1,1.4-0.3c0.5-0.2,0.8-0.5,1.1-0.9 c0.3-0.4,0.4-0.7,0.5-1.1c0-0.5-0.2-0.9-0.6-1.2c-0.4-0.3-1-0.5-1.7-0.5c-0.4,0-0.9,0.1-1.3,0.3c-0.4,0.2-0.8,0.5-1.1,0.8 C-270,409.9-270.2,410.2-270.2,410.6L-270.2,410.6z"
    })),
    ao = oo,
    ro = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: 23,
        height: 15,
        fill: "none",
        viewBox: "0 0 23 15",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "M11.5 14.9c-6.35 0-11.5-7-11.5-7s5.15-7 11.5-7 11.5 7 11.5 7-5.15 7-11.5 7M4.66 9.87A22 22 0 0 1 2.6 7.9a22 22 0 0 1 2.05-1.97C6.6 4.3 9.03 2.9 11.5 2.9s4.89 1.4 6.84 3.03c.84.7 1.53 1.4 2.05 1.97a22 22 0 0 1-2.05 1.97c-1.95 1.65-4.37 3.03-6.84 3.03s-4.89-1.38-6.84-3.03m6.83 1.04a3 3 0 1 0 0-6 3 3 0 0 0 0 6",
        fillRule: "evenodd"
    })),
    no = ro,
    io = t => l.createElement("svg", {
        width: 16,
        height: 20,
        viewBox: "0 0 16 20",
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
        ...t
    }, l.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M12.9555 20H2.59108C1.13359 20 0 18.7854 0 17.3279V16.6802C0 14.0891 2.0243 11.9838 4.53442 11.9838H11.0121C13.5223 11.9838 15.5465 14.0891 15.5465 16.6802V17.3279C15.5465 18.8664 14.4129 20 12.9555 20ZM7.53035 10.0405C4.85829 10.0405 2.67205 7.77329 2.67205 5.02025C2.67205 2.26722 4.85829 0 7.53035 0C10.2024 0 12.3886 2.26722 12.3886 5.02025C12.3886 7.85426 10.2024 10.0405 7.53035 10.0405Z",
        fill: "currentColor"
    })),
    co = io,
    po = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "100%",
        height: "100%",
        viewBox: "0 0 16 15",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "m8 0 1.8 5.53h5.8l-4.7 3.41 1.8 5.53L8 11.06l-4.7 3.41 1.8-5.53L.4 5.53h5.8z"
    })),
    fo = po,
    uo = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: 31,
        height: 31,
        fill: "none",
        viewBox: "0 0 31 31",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "M3.44 15.5a12.06 12.06 0 0 1 24.12 0H23.3l5.97 10.33 5.96-10.33H31A15.5 15.5 0 1 0 15.5 31v-3.44c-6.66 0-12.06-5.4-12.06-12.06"
    })),
    mo = uo,
    ho = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "100%",
        height: "100%",
        fill: "none",
        viewBox: "0 0 16 16",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        fillRule: "evenodd",
        d: "M10.19 4.018a4.364 4.364 0 1 1-6.172 6.171 4.364 4.364 0 0 1 6.171-6.171Zm2.065 6.823a6.366 6.366 0 0 0-9.651-8.237 6.364 6.364 0 0 0 8.237 9.652l3.141 3.14a1 1 0 0 0 1.414-1.414l-3.14-3.14Z",
        clipRule: "evenodd"
    })),
    xo = ho,
    go = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "100%",
        height: "100%",
        viewBox: "0 0 325 200",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        fillRule: "evenodd",
        d: "M38.343 0h248.215c21.143 0 38.343 17.203 38.343 38.346v47.79l-12.501.59c-7.112.337-12.683 6.169-12.683 13.276s5.571 12.94 12.678 13.272l12.506.585v47.8c0 21.138-17.2 38.341-38.343 38.341H38.343C17.199 200 0 182.797 0 161.659v-46.893l11.259-1.61c6.502-.933 11.406-6.59 11.406-13.154 0-6.57-4.906-12.227-11.412-13.16L0 85.228V38.345C0 17.203 17.2 0 38.343 0m248.256 100.002c0-14.179 11.168-25.718 25.183-26.38V38.345c0-13.932-11.294-25.227-25.224-25.227H38.343c-13.93 0-25.225 11.295-25.225 25.227v35.512c12.809 1.84 22.665 12.827 22.665 26.145s-9.856 24.305-22.665 26.14v35.516c0 13.929 11.294 25.223 25.225 25.223h248.215c13.93 0 25.224-11.294 25.224-25.223v-35.28c-14.015-.657-25.183-12.196-25.183-26.376m-211.277 48.33h8.679v22.635h-8.679zm8.679-39.766h-8.679v22.635h8.679zm-8.679-39.773h8.679v22.639h-8.679zm8.679-39.758h-8.679V51.67h8.679zm96.305 79.938c-9.913 9.913-25.984 9.913-35.897 0s-9.913-25.984 0-35.897 25.984-9.912 35.897 0 9.912 25.985 0 35.897m4.113 13.091c-14.869 10.595-35.645 9.223-48.984-4.116-14.869-14.869-14.869-38.977 0-53.846s38.976-14.869 53.845 0c13.184 13.184 14.678 33.63 4.483 48.46l13.913 13.913 2.244-2.245 21.987 21.987-13.91 13.91-21.987-21.987 2.243-2.242z"
    })),
    vo = go,
    Co = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: 17,
        height: 17,
        viewBox: "0 0 17 17",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        fillRule: "evenodd",
        d: "M7.33.69a.3.3 0 0 0-.3.3V2.7c-.5.13-1 .33-1.44.58l-1.3-1.3a.3.3 0 0 0-.41 0L1.96 3.93a.3.3 0 0 0 0 .42l1.33 1.33c-.15.28-.28.58-.38.9H1.08a.3.3 0 0 0-.3.3v2.7c0 .17.13.3.3.3H2.8c.14.51.33 1 .59 1.44L2.2 12.5a.3.3 0 0 0 0 .42l1.92 1.92c.12.12.3.12.42 0l1.23-1.22c.4.21.82.37 1.26.49v1.73c0 .16.13.3.3.3h2.71a.3.3 0 0 0 .3-.3V14c.3-.1.6-.23.9-.38l1.22 1.22c.11.12.3.12.41 0l1.92-1.92a.3.3 0 0 0 0-.42l-1.18-1.18c.26-.44.45-.93.58-1.44h1.73a.3.3 0 0 0 .3-.3v-2.7a.3.3 0 0 0-.3-.3H14.1c-.1-.32-.23-.62-.38-.9l1.33-1.33a.3.3 0 0 0 0-.42L13.12 2a.3.3 0 0 0-.42 0l-1.3 1.29c-.33-.2-.69-.35-1.06-.47V.98a.3.3 0 0 0-.3-.3H7.33ZM8.5 11.08a2.67 2.67 0 1 0 0-5.35 2.67 2.67 0 0 0 0 5.35",
        clipRule: "evenodd"
    })),
    jo = Co,
    yo = t => l.createElement("svg", {
        width: "100%",
        height: "100%",
        xmlns: "http://www.w3.org/2000/svg",
        xmlnsXlink: "http://www.w3.org/1999/xlink",
        x: "0px",
        y: "0px",
        viewBox: "-284 407.9 26 26",
        style: {
            enableBackground: "new -284 407.9 26 26"
        },
        xmlSpace: "preserve",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "M-258.8,414.3l-0.7,5.2c-0.3,2-2.2,3.5-4.3,3.5l-0.1,1.6c-0.1,1.7-1.8,3-3.6,3h-7.4c-1.9,0-3.5-1.3-3.6-3 l-0.1-1.6c-2.2,0-4.1-1.5-4.3-3.5l-0.7-5.2c-0.2-1.3,0.8-2.4,2.2-2.4h1.9l-0.1-1.1c-0.1-1.3,0.9-2.4,2.2-2.4h12.8 c1.3,0,2.3,1.1,2.2,2.4l-0.1,1.1h1.9C-259.5,411.9-258.6,413-258.8,414.3z M-279.6,413.3h-2c-0.5,0-0.8,0.4-0.8,0.9 c0,0,0.5,4.2,0.6,5.3c0.1,1,1.2,2,2.8,2.1L-279.6,413.3z M-269.6,415.3l-1.7-2.9l-1.7,2.9l-3.2,0.8l2.1,2.6l-0.2,3.4l3-1.3l3,1.3 l-0.3-3.4l2.1-2.6L-269.6,415.3z M-261,413.3h-2l-0.7,8.3c1.6-0.1,2.7-1.1,2.8-2.1c0.1-1.1,0.6-5.3,0.6-5.3 C-260.1,413.7-260.5,413.3-261,413.3z M-277.7,432.1l6-4c0.2-0.2,0.5-0.2,0.8,0l6,4c0.6,0.4,0.3,1.2-0.4,1.2h-12.1 C-278,433.4-278.2,432.5-277.7,432.1z"
    })),
    wo = yo,
    _o = t => l.createElement("svg", {
        width: 20,
        height: 18,
        viewBox: "0 0 20 18",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...t
    }, l.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M0.566762 9.64405C1.30393 9.90327 2.26792 10.2516 3.54783 10.6161C4.83585 10.9888 5.44341 11.0536 6.74763 10.203C8.05184 9.35242 12.5559 6.27414 13.1229 5.87721C13.69 5.48837 14.7917 4.84031 15.0023 4.99423C15.2129 5.14814 14.735 5.87721 14.014 6.57387C13.293 7.27053 10.1337 10.1787 9.34796 10.9645C8.56219 11.7502 8.57029 12.3254 9.38037 12.9816C10.1823 13.6377 10.474 13.7592 13.6576 15.9383C16.8411 18.1174 17.5945 17.3884 17.9023 15.5819C18.2102 13.7754 19.6278 4.59729 19.887 2.81513C20.0247 1.89974 20.13 1.20308 19.644 0.960058C19.1661 0.717036 18.599 0.846648 17.4568 1.32459C15.14 2.30478 2.70536 7.36774 1.15812 8.0239C-0.389125 8.67196 -0.170405 9.38483 0.566762 9.64405Z",
        fill: "currentColor"
    })),
    bo = _o,
    Eo = t => l.createElement("svg", {
        width: 43,
        height: 41,
        viewBox: "0 0 43 41",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...t
    }, l.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M21.4634 11.5105C20.0697 11.5105 18.9547 12.6254 18.9547 14.0192C18.9547 15.4129 19.6516 22.939 19.7909 25.4477C19.7909 26.4233 20.4878 27.1202 21.4634 27.1202C22.439 27.1202 23.1359 26.4233 23.1359 25.4477C23.4146 23.0784 23.9721 15.6916 23.9721 14.0192C23.9721 12.6254 22.8571 11.5105 21.4634 11.5105ZM21.4634 29.9077C20.2091 29.9077 19.2334 30.8833 19.2334 32.1376C19.2334 33.392 20.2091 34.3676 21.4634 34.3676C22.7178 34.3676 23.6934 33.392 23.6934 32.1376C23.6934 30.8833 22.7178 29.9077 21.4634 29.9077ZM42.0906 31.162C40.9756 29.3502 27.3171 4.54181 26.7596 3.70557C25.784 1.75436 23.6934 0.5 21.4634 0.5C19.2334 0.5 17.1429 1.75436 16.1672 3.70557C15.6098 4.54181 1.81185 29.3502 0.836237 31.162C0.278746 32.1376 0 33.1132 0 34.2282C0 37.7125 2.78746 40.5 6.1324 40.5H36.7944C40.1394 40.5 42.9268 37.7125 42.9268 34.2282C42.9268 33.1132 42.6481 32.1376 42.0906 31.162ZM36.9338 36.1794H5.99303C5.01742 36.1794 4.18118 35.3432 4.18118 34.3676C4.18118 33.9495 4.18118 33.6707 4.45993 33.392C4.73868 32.8345 19.7909 6.07491 19.9303 5.79617C20.2091 5.0993 20.7666 4.68118 21.4634 4.68118C22.1603 4.68118 22.7178 5.0993 23.1359 5.65679C23.2753 5.93554 38.1882 32.6951 38.6063 33.2526C38.7456 33.5314 38.885 33.8101 38.885 34.2282C38.7456 35.3432 37.9094 36.1794 36.9338 36.1794Z",
        fill: "white"
    })),
    Mo = Eo,
    No = {
        allGames: El,
        arrowLeft: Nl,
        arrowRight: Al,
        betHistory: Ol,
        bonusGift: Bl,
        close: Hl,
        closeAlt: Ul,
        closedEye: Vl,
        favourites: Wl,
        gamepad: Yl,
        heart: Xl,
        openedEye: no,
        recommended: fo,
        reload: mo,
        searchTicket: vo,
        search: xo,
        settings: jo,
        info: ao,
        fullscreen: Kl,
        sportBets: wo,
        profile: co,
        exit: Pl,
        clock: Ll,
        home: to,
        telegram: bo,
        i: lo,
        warning: Mo,
        error: Il
    };

function ce({
    className: t,
    name: s
}) {
    const o = No[s];
    return e.jsx(oe, {
        fallback: e.jsx("pre", {
            children: "%"
        }),
        children: e.jsx("div", {
            className: x(t, "svg-icon flex-center empty:hidden"),
            children: e.jsx(o, {})
        })
    })
}

function Fo({
    className: t
}) {
    return e.jsx("div", {
        className: x(t, "loader bg-black before:bg-loading-spinner")
    })
}

function Ao({
    children: t,
    className: s
}) {
    const [o, a] = l.useState(!0), r = l.useRef(0), n = l.useRef();
    return l.useEffect(() => {
        const i = document.documentElement;
        if (!i) return;
        const c = f => {
                const u = f - r.current;
                if (f <= 5) {
                    a(!0), clearTimeout(n.current);
                    return
                }
                u > 0 ? (a(!1), clearTimeout(n.current), n.current = setTimeout(a, 250, !0)) : a(!0)
            },
            d = () => {
                c(i.scrollTop), r.current = i.scrollTop
            },
            p = new AbortController;
        return window.addEventListener("scroll", d, {
            signal: p.signal
        }), () => {
            p.abort(), clearTimeout(n.current)
        }
    }, []), e.jsx("div", {
        className: x("mobile:fixed mobile:bottom-0 mobile:left-0 mobile:z-50 mobile:h-[5.625rem] w-full transition-transform duration-300", s, o ? "translate-y-0" : "translate-y-1"),
        children: t
    })
}

function So({
    className: t,
    children: s
}) {
    return e.jsx("div", {
        className: x("float-group", t),
        children: s
    })
}

function Oo({
    className: t,
    items: s
}) {
    const [o, a] = l.useState(0);
    return e.jsxs("div", {
        className: "flex min-h-0 flex-col",
        children: [e.jsx("div", {
            className: x("mb-4 flex justify-center gap-2 border-b-2 border-white/10", t),
            children: s.map((r, n) => e.jsx("button", {
                className: `-mb-0.5 px-4 py-2 border-b-2 font-bold border-transparent focus-visible:outline-none uppercase ${o===n?"border-white":"text-gray"}`,
                onClick: () => a(n),
                type: "button",
                children: r.label
            }, r.label))
        }), s[o].children]
    })
}
const F1 = l.createContext({
    openDialog: () => "",
    closeDialog: () => null,
    closeAllDialogs: () => null
});

function A1({
    children: t
}) {
    const [s, o] = l.useState([]), a = l.useRef({}), r = l.useRef({}), n = l.useCallback((p, f) => {
        const u = (f == null ? void 0 : f.id) || Math.random().toString(36).substring(2, 9);
        return o(m => m.some(h => h.id === u) ? m : [...m, {
            id: u,
            content: p,
            options: f
        }]), u
    }, []), i = l.useCallback(p => {
        o(f => {
            var m, h, v, j;
            if (!p) {
                const C = f.at(-1);
                return (h = (m = C == null ? void 0 : C.options) == null ? void 0 : m.onClose) == null || h.call(m), f.slice(0, -1)
            }
            const u = f.find(C => C.id === p);
            return (j = (v = u == null ? void 0 : u.options) == null ? void 0 : v.onClose) == null || j.call(v), f.filter(C => C.id !== p)
        })
    }, []), c = l.useCallback(() => {
        o(p => (p.forEach(f => {
            var u, m;
            return (m = (u = f.options) == null ? void 0 : u.onClose) == null ? void 0 : m.call(u)
        }), []))
    }, []), d = l.useCallback((p, f) => {
        var h;
        const u = s.find(v => v.id === f),
            m = a.current[f];
        p.target === m && !((h = u == null ? void 0 : u.options) != null && h.disableBackdropClose) && i(f)
    }, [s, i]);
    return l.useEffect(() => {
        const p = () => {
                var u;
                s.length > 0 && i((u = s.at(-1)) == null ? void 0 : u.id)
            },
            f = u => {
                var m;
                if (u.key === "Escape" && s.length > 0) {
                    const h = s.at(-1);
                    ((m = h == null ? void 0 : h.options) == null ? void 0 : m.closeOnEscape) !== !1 ? i(h == null ? void 0 : h.id) : u.preventDefault()
                }
            };
        return window.addEventListener("popstate", p), window.addEventListener("keydown", f), () => {
            window.removeEventListener("popstate", p), window.removeEventListener("keydown", f)
        }
    }, [s, i]), l.useEffect(() => {
        const p = new AbortController;
        return window.addEventListener("player:logout", c, {
            signal: p.signal
        }), () => p.abort()
    }, [c]), l.useEffect(() => {
        const p = () => {
            s.forEach(f => {
                var u;
                (u = f.options) != null && u.autoCloseCondition && f.options.autoCloseCondition() && i(f.id)
            })
        };
        if (s.some(f => {
                var u;
                return (u = f.options) == null ? void 0 : u.autoCloseCondition
            })) {
            const f = setInterval(p, 100);
            return () => clearInterval(f)
        }
    }, [s, i]), e.jsxs(F1.Provider, {
        value: {
            openDialog: n,
            closeDialog: i,
            closeAllDialogs: c
        },
        children: [t, s.map((p, f) => {
            var u, m;
            return e.jsx("dialog", {
                "data-id": p.id,
                ref: h => {
                    a.current[p.id] = h, h && !h.open && !r.current[p.id] && (h.showModal(), r.current[p.id] = !0)
                },
                onClick: h => d(h, p.id),
                onCancel: h => {
                    var v;
                    ((v = p.options) == null ? void 0 : v.closeOnEscape) === !1 && h.preventDefault()
                },
                className: `dialog ${((u=p.options)==null?void 0:u.animation)==="slide-in"?"slide-in":"fade-in"} ${((m=p.options)==null?void 0:m.dialogClassName)||""}`,
                style: {
                    zIndex: 1e3 + f
                },
                children: e.jsx("div", {
                    className: "w-full",
                    onClick: h => h.stopPropagation(),
                    children: p.content
                })
            }, p.id)
        })]
    })
}
const z = () => {
    const t = l.useContext(F1);
    if (!t) throw new Error("useDialog must be used within a DialogProvider");
    return t
};

function tt({
    error: t,
    actions: s
}) {
    const {
        $t: o
    } = w(), a = Se(), r = Oe(), {
        formatMessage: n
    } = _e(), i = (t == null ? void 0 : t.details) ? ? {}, c = Object.entries(i).filter(([d]) => d !== "playerId" && d !== "hallId");
    return e.jsx(oe, {
        children: e.jsx("div", {
            className: "flex-center p-2",
            children: e.jsxs("div", {
                className: "relative mobile:w-auto w-[37.25rem] overflow-hidden rounded-[0.3125rem] bg-[#8F1303] p-0.5",
                children: [e.jsx("div", {
                    className: x("btn-flickering top-left")
                }), e.jsx("div", {
                    className: x("btn-flickering bottom-right")
                }), e.jsxs("div", {
                    className: "relative z-10 flex flex-col rounded-[0.375rem] bg-black px-10 py-5 [box-shadow:inset_0_0_30px_0_#530606]",
                    children: [e.jsxs("div", {
                        className: "flex items-center",
                        children: [e.jsx(ce, {
                            name: "error",
                            className: "me-3 inline-block shrink-0 text-white *:size-10"
                        }), e.jsx("p", {
                            className: "font-bold text-lg uppercase tracking-[0.04em]",
                            children: o({
                                id: "ahYtFD",
                                defaultMessage: [{
                                    type: 0,
                                    value: "error"
                                }]
                            })
                        })]
                    }), e.jsxs("div", {
                        className: "pb-5",
                        children: [e.jsx("p", {
                            className: "whitespace-pre-wrap py-5 font-medium text-lg leading-6",
                            children: n(t)
                        }), c.length > 0 && e.jsx("ul", {
                            children: c.map(([d, p]) => p ? e.jsxs("li", {
                                className: "text-sm first-letter:capitalize",
                                children: [d, ": ", String(p)]
                            }, d) : null)
                        })]
                    }), e.jsxs("div", {
                        className: "mb-7.5 flex gap-5 whitespace-pre-wrap text-[#565464] text-sm",
                        children: [e.jsxs("div", {
                            className: "whitespace-nowrap",
                            children: [e.jsxs("div", {
                                children: [e.jsx("span", {
                                    children: "P:"
                                }), " ", i.playerId ? ? "N/A"]
                            }), e.jsxs("div", {
                                children: [e.jsx("span", {
                                    children: "H:"
                                }), " ", i.hallId ? ? "N/A"]
                            })]
                        }), e.jsxs("div", {
                            className: "grid grid-cols-[auto_auto] gap-x-1",
                            children: [e.jsx("span", {
                                children: "Local time:"
                            }), e.jsx("span", {
                                children: a
                            }), e.jsx("span", {
                                children: "UTC time:"
                            }), e.jsx("span", {
                                children: r
                            })]
                        })]
                    }), e.jsx("div", {
                        className: "self-center",
                        children: s
                    })]
                })]
            })
        })
    })
}

function Zo({
    error: t,
    variant: s = "fullLog"
}) {
    const {
        $t: o
    } = w(), {
        formatMessage: a
    } = _e(), r = Se(), n = Oe(), i = Bo(t), {
        message: c,
        details: d
    } = i, p = ko(d), f = p ? Object.entries(p).filter(([u]) => u !== "playerId" && u !== "hallId") : [];
    return s === "shortLog" ? e.jsx(oe, {
        children: e.jsxs("div", {
            className: "relative z-10 flex items-center gap-4 rounded-[0.3125rem] p-4",
            children: [e.jsxs("div", {
                className: "flex items-center gap-3",
                children: [e.jsx("svg", {
                    className: "shrink-0",
                    width: "24",
                    height: "24",
                    viewBox: "0 0 41 41",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    children: e.jsx("path", {
                        fillRule: "evenodd",
                        clipRule: "evenodd",
                        d: "M20.1133 40.5C9.0085 40.5 0 31.5482 0 20.5C0 9.45184 9.0085 0.5 20.1133 0.5C31.2181 0.5 40.2266 9.45184 40.2266 20.5C40.2266 31.5482 31.2181 40.5 20.1133 40.5ZM20.1133 4.70397C11.3428 4.70397 4.22663 11.7748 4.22663 20.5C4.22663 29.2252 11.3428 36.296 20.1133 36.296C28.8839 36.296 36 29.2252 36 20.5C36 11.7748 28.8839 4.70397 20.1133 4.70397ZM9.41643 16.9079H30.8102V24.2734H9.41643V16.9079Z",
                        fill: "white"
                    })
                }), e.jsx("p", {
                    className: " ml-2 font-bold uppercase tracking-[0.04em]",
                    children: o({
                        id: "ahYtFD",
                        defaultMessage: [{
                            type: 0,
                            value: "error"
                        }]
                    })
                })]
            }), e.jsx("div", {
                className: "flex-1",
                children: e.jsx("p", {
                    className: "line-clamp-1 font-medium leading-5",
                    title: a(c),
                    children: a(c)
                })
            }), e.jsx("div", {
                className: "flex items-center gap-4 text-[#565464] text-sm",
                children: f.length > 0 && e.jsx("div", {
                    className: "flex gap-2",
                    children: f.map(([u, m]) => m ? e.jsxs("span", {
                        className: "first-letter:capitalize",
                        children: [u, ": ", String(m)]
                    }, u) : null)
                })
            })]
        })
    }) : e.jsx(oe, {
        children: e.jsxs("div", {
            className: "relative z-10 flex flex-col rounded-[0.3125rem]",
            children: [e.jsxs("div", {
                className: "flex items-center",
                children: [e.jsx("svg", {
                    className: "me-3 inline-block shrink-0",
                    width: "41",
                    height: "41",
                    viewBox: "0 0 41 41",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    children: e.jsx("path", {
                        fillRule: "evenodd",
                        clipRule: "evenodd",
                        d: "M20.1133 40.5C9.0085 40.5 0 31.5482 0 20.5C0 9.45184 9.0085 0.5 20.1133 0.5C31.2181 0.5 40.2266 9.45184 40.2266 20.5C40.2266 31.5482 31.2181 40.5 20.1133 40.5ZM20.1133 4.70397C11.3428 4.70397 4.22663 11.7748 4.22663 20.5C4.22663 29.2252 11.3428 36.296 20.1133 36.296C28.8839 36.296 36 29.2252 36 20.5C36 11.7748 28.8839 4.70397 20.1133 4.70397ZM9.41643 16.9079H30.8102V24.2734H9.41643V16.9079Z",
                        fill: "white"
                    })
                }), e.jsx("p", {
                    className: "font-bold text-lg uppercase tracking-[0.04em]",
                    children: o({
                        id: "ahYtFD",
                        defaultMessage: [{
                            type: 0,
                            value: "error"
                        }]
                    })
                })]
            }), e.jsxs("div", {
                className: "pb-5",
                children: [e.jsx("p", {
                    className: "whitespace-pre-wrap py-5 font-medium text-lg leading-6",
                    children: a(c)
                }), f.length > 0 && e.jsx("ul", {
                    children: f.map(([u, m]) => m ? e.jsxs("li", {
                        className: "text-sm first-letter:capitalize",
                        children: [u, ": ", String(m)]
                    }, u) : null)
                })]
            }), e.jsxs("div", {
                className: "mb-7.5 flex gap-5 whitespace-pre-wrap text-[#565464] text-sm",
                children: [e.jsxs("div", {
                    className: "whitespace-nowrap",
                    children: [e.jsxs("div", {
                        children: [e.jsx("span", {
                            children: "P:"
                        }), " ", (p == null ? void 0 : p.playerId) ? ? "N/A"]
                    }), e.jsxs("div", {
                        children: [e.jsx("span", {
                            children: "H:"
                        }), " ", (p == null ? void 0 : p.hallId) ? ? "N/A"]
                    })]
                }), e.jsxs("div", {
                    className: "grid grid-cols-[auto_auto] gap-x-1",
                    children: [e.jsx("span", {
                        children: "Local time:"
                    }), e.jsx("span", {
                        children: r
                    }), e.jsx("span", {
                        children: "UTC time:"
                    }), e.jsx("span", {
                        children: n
                    })]
                })]
            })]
        })
    })
}

function Bo(t) {
    return console.log(t), t ? t instanceof le ? {
        message: t.message,
        details: t.details
    } : t instanceof Error && "code" in t ? {
        message: t.message,
        details: {
            code: t.code
        }
    } : t instanceof Error ? {
        message: t.message
    } : {
        message: typeof t == "string" ? t : "Unexpected error"
    } : {
        message: "Unknown error"
    }
}

function ko(t) {
    if (!t) return;
    const s = n => typeof n == "string" || typeof n == "number" ? String(n) : "N/A",
        {
            playerId: o,
            hallId: a,
            ...r
        } = t;
    return {
        playerId: s(o),
        hallId: s(a),
        ...Object.fromEntries(Object.entries(r).map(([n, i]) => [n, s(i)]))
    }
}

function Lo({
    error: t,
    actions: s,
    logo: o
}) {
    const {
        $t: a
    } = w(), r = Se(), n = Oe(), i = (t == null ? void 0 : t.details) ? ? {}, c = Object.entries(i).filter(([d]) => d !== "playerId" && d !== "hallId");
    return e.jsx(oe, {
        children: e.jsx("div", {
            className: "mobile:h-[100dvh] flex-center mobile:overflow-y-auto p-2",
            children: e.jsx("div", {
                className: "relative mobile:w-auto w-[52.5rem] overflow-hidden",
                children: e.jsxs("div", {
                    className: "relative z-10 flex flex-col rounded-[0.375rem] px-10 py-5",
                    children: [e.jsxs("div", {
                        className: "flex desktop:flex-row flex-col-reverse desktop:items-center desktop:gap-x-5 gap-y-5",
                        children: [e.jsxs("div", {
                            className: "flex-col",
                            children: [e.jsxs("p", {
                                className: "pb-7.5 desktop:text-6xl text-3xl uppercase",
                                children: [a({
                                    id: "RyvPnx",
                                    defaultMessage: [{
                                        type: 0,
                                        value: "Sorry"
                                    }]
                                }), "!"]
                            }), e.jsx("p", {
                                className: "font-medium desktop:text-[2.5rem] text-3xl leading-none",
                                children: a({
                                    id: "98Y9+l",
                                    defaultMessage: [{
                                        type: 0,
                                        value: "You cannot play this game with bonus money"
                                    }]
                                })
                            })]
                        }), e.jsx("img", {
                            src: o,
                            alt: "logo",
                            height: "100%",
                            className: "desktop:w-[224px] w-[148px]"
                        })]
                    }), e.jsx("div", {
                        className: "py-5",
                        children: c.length > 0 && e.jsx("ul", {
                            children: c.map(([d, p]) => p ? e.jsxs("li", {
                                className: "text-sm first-letter:capitalize",
                                children: [d, ": ", String(p)]
                            }, d) : null)
                        })
                    }), e.jsxs("div", {
                        className: "mb-7.5 flex gap-5 whitespace-pre-wrap text-[#545664] text-sm",
                        children: [e.jsxs("div", {
                            className: "whitespace-nowrap",
                            children: [e.jsxs("div", {
                                children: [e.jsx("span", {
                                    children: "P:"
                                }), " ", i.playerId ? ? "N/A"]
                            }), e.jsxs("div", {
                                children: [e.jsx("span", {
                                    children: "H:"
                                }), " ", i.hallId ? ? "N/A"]
                            })]
                        }), e.jsxs("div", {
                            className: "grid grid-cols-[auto_auto] gap-x-1",
                            children: [e.jsx("span", {
                                children: "Local time:"
                            }), e.jsx("span", {
                                children: r
                            }), e.jsx("span", {
                                children: "UTC time:"
                            }), e.jsx("span", {
                                children: n
                            })]
                        })]
                    }), e.jsx("div", {
                        className: "self-center",
                        children: s
                    })]
                })
            })
        })
    })
}

function jt(t) {
    const {
        query: s,
        isEmpty: o = m => !m,
        renderSkeleton: a = () => e.jsx($, {
            className: "h-full w-full"
        }),
        renderEmpty: r = () => null,
        renderError: n = m => e.jsx(Zo, {
            error: m
        }),
        renderSuccess: i
    } = t, c = l.useMemo(() => a, [a]), d = l.useMemo(() => r, [r]), p = l.useMemo(() => n, [n]), f = l.useMemo(() => i, [i]), u = l.useMemo(() => o, [o]);
    return Cs(s).with({
        status: "pending"
    }, c).with({
        status: "error"
    }, ({
        error: m
    }) => p(m)).with({
        status: "success",
        data: {
            error: et.not(void 0)
        }
    }, ({
        data: m
    }) => {
        const h = new le(m.error.message, {
            code: m.error.code
        });
        return p(h)
    }).with({
        status: "success",
        data: et.when(m => u(m))
    }, d).with({
        status: "success",
        data: et.not(void 0)
    }, ({
        data: m
    }) => f(m)).otherwise(() => null)
}

function Ro({
    actions: t,
    className: s
}) {
    const {
        $t: o
    } = w();
    return e.jsx(oe, {
        children: e.jsx("div", {
            className: "flex-center p-2",
            children: e.jsxs("div", {
                className: x("relative mobile:w-auto w-[37.25rem] overflow-hidden rounded-[0.3125rem] p-0.5", "[--confirm-modal-border:_#0658A6]", "[--confirm-modal-bg:_#000000]", "[--confirm-modal-shadow:_#002B7C]", "bg-[var(--confirm-modal-border)]", s),
                children: [e.jsx("div", {
                    className: x("btn-flickering top-left")
                }), e.jsx("div", {
                    className: x("btn-flickering bottom-right")
                }), e.jsxs("div", {
                    className: "relative z-10 flex flex-col rounded-[0.375rem] bg-[var(--confirm-modal-bg)] px-10 py-5 [box-shadow:inset_0_0_30px_0_var(--confirm-modal-shadow)]",
                    children: [e.jsxs("div", {
                        className: "flex items-center",
                        children: [e.jsx(ce, {
                            name: "warning",
                            className: "me-3 inline-block shrink-0 text-white *:size-10"
                        }), e.jsx("p", {
                            className: "font-bold text-lg uppercase tracking-[0.04em]",
                            children: o({
                                id: "2oCaym",
                                defaultMessage: [{
                                    type: 0,
                                    value: "Are you sure?"
                                }]
                            })
                        })]
                    }), e.jsx("div", {
                        className: "pb-5",
                        children: e.jsx("p", {
                            className: "whitespace-pre-wrap py-5 font-medium text-lg leading-6",
                            children: o({
                                id: "BHBJUz",
                                defaultMessage: [{
                                    type: 0,
                                    value: "Are you sure you want to sign out?"
                                }]
                            })
                        })
                    }), e.jsx("div", {
                        className: "self-center",
                        children: t
                    })]
                })]
            })
        })
    })
}

function Ho({
    actions: t,
    classNameBorderMask: s,
    classNameBackground: o
}) {
    const {
        $t: a
    } = w();
    return e.jsx(oe, {
        children: e.jsx("div", {
            className: "flex-center p-2",
            children: e.jsxs("div", {
                className: x("relative mobile:w-auto w-[37.25rem] overflow-hidden rounded-[0.3125rem] bg-[#313131] p-0.5", s),
                children: [e.jsx("div", {
                    className: x("btn-flickering top-left")
                }), e.jsx("div", {
                    className: x("btn-flickering bottom-right")
                }), e.jsxs("div", {
                    className: x("relative z-10 flex flex-col rounded-[0.375rem] bg-black px-10 py-5 [box-shadow:inset_0_0_30px_0_#313131]", o),
                    children: [e.jsxs("div", {
                        className: "flex items-center",
                        children: [e.jsx(ce, {
                            name: "warning",
                            className: "me-3 inline-block shrink-0"
                        }), e.jsx("p", {
                            className: "font-bold text-lg uppercase tracking-[0.04em]",
                            children: a({
                                id: "yrIqNQ",
                                defaultMessage: [{
                                    type: 0,
                                    value: "please note"
                                }]
                            })
                        })]
                    }), e.jsxs("div", {
                        className: "pb-5",
                        children: [e.jsx("p", {
                            className: "whitespace-pre-wrap py-5 font-medium text-lg leading-6",
                            children: a({
                                id: "qSxKra",
                                defaultMessage: [{
                                    type: 0,
                                    value: "When you switch to the game, your entire balance will be transferred to the game. This is a feature of this game provider"
                                }]
                            })
                        }), e.jsx("p", {
                            className: "text-sm first-letter:capitalize",
                            children: a({
                                id: "ssQpBF",
                                defaultMessage: [{
                                    type: 0,
                                    value: "There may be a situation where the balance in the system and in the game is different.In order to return the balance from the game to system, you need to click EXIT (cross) on the screen in the game."
                                }]
                            })
                        })]
                    }), e.jsx("div", {
                        className: "self-center",
                        children: t
                    })]
                })]
            })
        })
    })
}
class zo {
    constructor(s, o, a, r) {
        this.games = s, this.lang = o, this.$t = a, this.sortOrder = r
    }
    filterRawGames(s) {
        return this.games.filter(o => !(s.search && !o.name.toLowerCase().includes(s.search) || s.cid && !o.categories.includes(s.cid) || s.pid && o.providerId !== s.pid || s.favouritesOnly && !o.isFavourite || s.wagerableGames && !o.isBonusPlay || s.recommendedIds && !s.recommendedIds.has(o.id)))
    }
    sort(s) {
        return Array.isArray(this.sortOrder) && this.sortOrder.length > 0 ? [...s].sort((o, a) => this.sortOrder.indexOf(Number(o.id)) - this.sortOrder.indexOf(Number(a.id))) : s
    }
    getBySearch(s) {
        return {
            type: "search",
            label: Hs(ee.searchResults.id),
            id: ee.searchResults.id,
            games: this.games.filter(o => o.name.toLowerCase().includes(s.toLowerCase())).slice(0, 20)
        }
    }
    getFavourites() {
        return {
            type: "favourites",
            label: this.$t({
                id: "zBd7Qu",
                defaultMessage: [{
                    type: 0,
                    value: "Favourites"
                }]
            }),
            id: ee.favourites.id,
            games: this.games.filter(s => s.isFavourite)
        }
    }
    getRecommended(s) {
        return {
            type: "recommended",
            label: this.$t({
                id: "VKfWR3",
                defaultMessage: [{
                    type: 0,
                    value: "Recommended"
                }]
            }),
            id: ee.recommended.id,
            games: this.games.filter(o => s.has(o.id))
        }
    }
    getByCategory(s) {
        return {
            type: "category",
            label: I.getCategoryNameById(s, this.lang),
            id: s,
            games: this.games.filter(o => o.categories.includes(s))
        }
    }
    getByProvider(s) {
        return {
            type: "provider",
            label: I.getProviderNameById(s),
            id: s,
            games: this.games.filter(o => o.providerId === s)
        }
    }
    groupByCategories() {
        var o, a;
        const s = new Map;
        for (const r of this.games)
            for (const n of r.categories) s.has(n) || s.set(n, {
                type: "category",
                label: I.getCategoryNameById(n, this.lang),
                id: n,
                games: []
            }), (a = (o = s.get) == null ? void 0 : o.call(s, n)) == null || a.games.push(r);
        return this.sort([...s.values()])
    }
    groupAll(s) {
        return [...this.groupByCategories(), this.getFavourites(), this.getRecommended(s)]
    }
}

function qe() {
    const {
        cid: t,
        pid: s,
        game: o
    } = q({
        strict: !1
    }), {
        isAuth: a
    } = W(), {
        $t: r
    } = w(), {
        intl: {
            locale: n,
            defaultLocale: i
        }
    } = pe(), c = n || i, {
        data: d
    } = I.useList(), {
        data: p
    } = I.useRecommendedGames(), f = l.useMemo(() => new Set((p == null ? void 0 : p.gamesIds) ? ? []), [p]), u = l.useMemo(() => d ? new zo(d, c, r) : null, [d, c, r]);
    return l.useMemo(() => u ? o ? u.filterRawGames({
        search: o
    }) : t ? u1(t) && a ? u.filterRawGames({
        favouritesOnly: !0
    }) : m1(t) ? u.filterRawGames({
        recommendedIds: f
    }) : h1(t) && a ? u.filterRawGames({
        wagerableGames: !0
    }) : u.filterRawGames({
        cid: t
    }) : s ? u.filterRawGames({
        pid: s
    }) : u.filterRawGames({}) : [], [u, t, s, o, f, a])
}

function yt() {
    const t = qe(),
        s = V.useBalances();
    return l.useMemo(() => {
        var r, n;
        const o = !!((n = (r = s == null ? void 0 : s.data) == null ? void 0 : r.wager) != null && n.remaining),
            a = t.some(i => !i.isBonusPlay);
        return {
            refetchBonusBalance: s.refetch,
            hasNoWagerableGamesInCurrentFilter: o && a,
            hasRemainingWagerBalance: o
        }
    }, [t, s])
}

function S1() {
    const t = te(),
        {
            gameId: s
        } = c1({
            from: "/_auth/game/$gameId"
        }),
        o = qe(),
        [a, r] = l.useState(!1),
        n = o.find(p => p.stringId === s),
        i = q({
            strict: !1,
            select: ({
                cid: p
            }) => p
        }),
        {
            refetchBonusBalance: c
        } = yt(),
        d = l.useCallback(() => {
            r(!0), c().then(p => {
                if (!p.data) return;
                const f = i === ee.wagerableGames.id && !p.data.wager.remaining;
                r(!1), t({
                    to: "/casino",
                    replace: !0,
                    search: u => ({ ...u,
                        cid: f ? void 0 : u.cid,
                        pid: f ? n == null ? void 0 : n.providerId : u.pid,
                        game: void 0
                    })
                })
            })
        }, [n, t, i, c]);
    return {
        isPending: a,
        handleBack: d
    }
}
const dt = {
        de: {
            code: "de",
            name: "Deutsch"
        },
        el: {
            code: "el",
            name: "Ελληνικά"
        },
        en: {
            code: "en",
            name: "English"
        },
        es: {
            code: "es",
            name: "Español"
        },
        hr: {
            code: "hr",
            name: "Hrvatski"
        },
        pl: {
            code: "pl",
            name: "Polski"
        },
        pt: {
            code: "pt",
            name: "Português"
        },
        sq: {
            code: "sq",
            name: "Shqiptare"
        },
        sr: {
            code: "sr",
            name: "Српски"
        },
        he: {
            code: "he",
            name: "Hebrew"
        },
        tr: {
            code: "tr",
            name: "Türk"
        },
        zh: {
            code: "zh",
            name: "中文"
        },
        ru: {
            code: "ru",
            name: "Русский"
        },
        fr: {
            code: "fr",
            name: "Français"
        },
        ro: {
            code: "ro",
            name: "Romanian"
        },
        uk: {
            code: "uk",
            name: "Українська "
        },
        "sr-en": {
            code: "sr-en",
            name: "Serbian"
        },
        ar: {
            code: "ar",
            name: "العربية"
        }
    },
    Uo = {
        primary: "btn_primary",
        "primary-variant-1": "btn_primary-variant-1",
        secondary: "btn_secondary",
        cancel: "btn_cancel",
        close: "btn_close",
        reset: "btn_reset",
        filter: "btn_filter"
    },
    Vt = {
        "tl-br": ["top-left", "bottom-right"],
        "tr-bl": ["top-right", "bottom-left"],
        off: ["hidden", "hidden"]
    };

function O({
    className: t,
    contentClassName: s,
    children: o,
    disabled: a,
    type: r = "primary",
    htmlType: n = "button",
    isActive: i,
    activeClassName: c,
    onClick: d,
    htmlTag: p,
    hoverFlickeringDirection: f = "tl-br",
    style: u
}) {
    const m = p || "button";
    return e.jsxs("div", {
        className: x("btn-wrapper group", t),
        style: { ...u
        },
        children: [e.jsx("div", {
            className: x("btn-flickering", Vt[f][0])
        }), e.jsx(m, {
            className: x("btn", Uo[r], i && c, s),
            type: n,
            disabled: a,
            onClick: d,
            children: o
        }), e.jsx("div", {
            className: x("btn-flickering", Vt[f][1])
        })]
    })
}

function Ze({
    className: t
}) {
    const s = l.useId(),
        o = `a-${s}`,
        a = `b-${s}`,
        r = `c-${s}`,
        n = `d-${s}`;
    return e.jsx("div", {
        className: x(t),
        children: e.jsxs("svg", {
            height: "100%",
            viewBox: "0 0 306 53",
            children: [e.jsx("path", {
                fill: `url(#${o})`,
                stroke: `url(#${a})`,
                strokeWidth: "2",
                d: "m231.53 1.5-8.59 44.15-.23 1.2h12.03l.15-.82 8.66-44.53h14.08l-8.5 43.24c-.72 3.73-4.1 6.67-7.35 6.67h-28.36a4.34 4.34 0 0 1-3.63-1.78 5.75 5.75 0 0 1-.82-4.51l8.49-43.62h14.07Zm68.83 0c1.59 0 2.84.69 3.63 1.78.8 1.1 1.17 2.68.82 4.51l-2.45 12.59a8.73 8.73 0 0 1-3.39 5.27l-.93.68.8.82c1.08 1.1 1.64 2.88 1.24 5l-2.45 12.59c-.73 3.73-4.11 6.67-7.36 6.67H256.3l9.7-49.91h34.37Zm-155.39 0h26.23l-.89 4.57h-17.87l-.16.8-7.56 38.87-.23 1.2h17.87l-.88 4.56-26.6-.1a4.34 4.34 0 0 1-3.63-1.77 5.75 5.75 0 0 1-.82-4.51l7.2-36.95c.72-3.73 4.1-6.67 7.34-6.67Zm47.36 0-8.59 44.15-.23 1.2h17.89l-.89 4.56h-32.3l9.71-49.91h14.4Zm83.7 27.38c-.68 0-1.2.5-1.36 1.08l-.02.09-3 15.42c-.06.33-.01.71.23 1.03.24.34.63.52 1.02.52h9.07c.71 0 1.26-.55 1.38-1.17l3-15.42c.06-.33.01-.71-.22-1.04a1.27 1.27 0 0 0-1.03-.52h-9.06Zm4.44-22.81c-.71 0-1.26.55-1.38 1.17l-3 15.42c-.07.33-.02.72.21 1.04.25.34.64.52 1.03.52h9.07c.71 0 1.27-.56 1.38-1.18l3-15.42a1.27 1.27 0 0 0-1.25-1.56h-9.06Z"
            }), e.jsx("path", {
                fill: `url(#${r})`,
                stroke: `url(#${n})`,
                strokeWidth: "2",
                d: "M101.86 1.5h26.23l-.9 4.57h-17.86l-.16.8-3.12 16.06-.23 1.2h13.67l-.88 4.56h-13.68l-.16.81-3.15 16.24-.23 1.2h17.86l-.89 4.56-26.6-.1a4.34 4.34 0 0 1-3.62-1.77 5.75 5.75 0 0 1-.82-4.51L94.5 8.17c.7-3.62 3.9-6.49 7.05-6.66l.3-.01Zm-40.15 0-5.45 28-.23 1.2h11.52l.16-.82L73.23 1.5h14.41l-9.7 49.9H63.52l2.9-14.95.23-1.19H55.14l-.15.81L52 51.41H37.6L47.3 1.5h14.41Zm-21.31 0-.89 4.57H27.6l-.16.8-8.66 44.54H4.37l8.59-44.15.23-1.2H1.27l.89-4.56H40.4Z"
            }), e.jsxs("defs", {
                children: [e.jsxs("linearGradient", {
                    id: o,
                    x1: "217.62",
                    x2: "217.62",
                    y1: ".5",
                    y2: "52.5",
                    gradientUnits: "userSpaceOnUse",
                    children: [e.jsx("stop", {
                        offset: ".42",
                        stopColor: "#fff"
                    }), e.jsx("stop", {
                        offset: ".48",
                        stopColor: "#C2D0EA"
                    }), e.jsx("stop", {
                        offset: ".63",
                        stopColor: "#CEDBED"
                    })]
                }), e.jsxs("linearGradient", {
                    id: a,
                    x1: "217.62",
                    x2: "217.62",
                    y1: ".5",
                    y2: "52.5",
                    gradientUnits: "userSpaceOnUse",
                    children: [e.jsx("stop", {
                        offset: ".48",
                        stopColor: "#fff"
                    }), e.jsx("stop", {
                        offset: ".65",
                        stopColor: "#666"
                    }), e.jsx("stop", {
                        offset: ".9",
                        stopColor: "#E3E3E3"
                    })]
                }), e.jsxs("linearGradient", {
                    id: r,
                    x1: "64.68",
                    x2: "64.68",
                    y1: ".5",
                    y2: "52.5",
                    gradientUnits: "userSpaceOnUse",
                    children: [e.jsx("stop", {
                        offset: ".2",
                        stopColor: "#72AAFF"
                    }), e.jsx("stop", {
                        offset: ".43",
                        stopColor: "#216DDF"
                    }), e.jsx("stop", {
                        offset: ".48",
                        stopColor: "#0040B6"
                    }), e.jsx("stop", {
                        offset: ".73",
                        stopColor: "#216DDF"
                    }), e.jsx("stop", {
                        offset: "1",
                        stopColor: "#0040B6"
                    })]
                }), e.jsxs("linearGradient", {
                    id: n,
                    x1: "64.68",
                    x2: "64.68",
                    y1: ".5",
                    y2: "52.5",
                    gradientUnits: "userSpaceOnUse",
                    children: [e.jsx("stop", {
                        offset: ".3",
                        stopColor: "#63DDFF"
                    }), e.jsx("stop", {
                        offset: ".65",
                        stopColor: "#0E2A68"
                    }), e.jsx("stop", {
                        offset: "1",
                        stopColor: "#005FA4"
                    })]
                })]
            })]
        })
    })
}

function Be({
    className: t
}) {
    return e.jsx(Fo, {
        className: x("before:bg-loading-spinner", t)
    })
}

function O1({
    children: t
}) {
    const s = document.getElementById("root");
    if (!s) throw new Error("Root element not found");
    return e.jsx(e.Fragment, {
        children: js.createPortal(t, s)
    })
}

function Do({
    className: t = "",
    onClick: s
}) {
    return e.jsx("button", {
        type: "button",
        className: x("fixed inset-0 bg-[#04020C] bg-opacity-80", t),
        onClick: s
    })
}

function Vo({
    isActive: t
}) {
    return e.jsxs("div", {
        className: x("absolute inset-0 overflow-hidden rounded-inherit", t ? "visible" : "invisible"),
        children: [e.jsx("div", {
            className: "absolute inset-0 bg-white bg-opacity-90"
        }), e.jsx("div", {
            className: "-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 flex size-50 items-center justify-center",
            children: e.jsx(Be, {
                className: "absolute size-40"
            })
        })]
    })
}

function Go({
    className: t,
    children: s,
    noBg: o
}) {
    return e.jsxs("div", {
        className: x("relative mb-5; flex flex-center desktop:text-center text-center font-bold desktop:text-xl text-2xs", t),
        children: [!o && e.jsxs("svg", {
            width: "986",
            height: "108",
            viewBox: "0 0 986 108",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: [e.jsx("path", {
                d: "M168 2H818V4H168V2Z",
                fill: "url(#paint0_linear_358_418)"
            }), e.jsx("path", {
                d: "M168 104H818V106H168V104Z",
                fill: "url(#paint1_linear_358_418)"
            }), e.jsx("path", {
                d: "M168 4H818V104H168V4Z",
                fill: "url(#paint2_linear_358_418)"
            }), e.jsx("path", {
                d: "M168 0H818V106H168V0Z",
                fill: "url(#paint3_radial_358_418)"
            }), e.jsx("path", {
                d: "M247 86H740V91H247V86Z",
                fill: "url(#paint4_linear_358_418)"
            }), e.jsx("path", {
                d: "M247 16H740V21H247V16Z",
                fill: "url(#paint5_linear_358_418)"
            }), e.jsx("path", {
                d: "M247 102H740V108H247V102Z",
                fill: "url(#paint6_linear_358_418)"
            }), e.jsx("path", {
                d: "M247 0H740V6H247V0Z",
                fill: "url(#paint7_linear_358_418)"
            }), e.jsxs("defs", {
                children: [e.jsxs("linearGradient", {
                    id: "paint0_linear_358_418",
                    x1: "168",
                    y1: "56",
                    x2: "818",
                    y2: "56",
                    gradientUnits: "userSpaceOnUse",
                    children: [e.jsx("stop", {
                        stopColor: "#0B1E4D",
                        stopOpacity: "0"
                    }), e.jsx("stop", {
                        offset: "0.2",
                        stopColor: "#0B1E4D",
                        stopOpacity: "0.1"
                    }), e.jsx("stop", {
                        offset: "0.36",
                        stopColor: "white",
                        stopOpacity: "0.3"
                    }), e.jsx("stop", {
                        offset: "0.4",
                        stopColor: "white"
                    }), e.jsx("stop", {
                        offset: "0.44",
                        stopColor: "white",
                        stopOpacity: "0.3"
                    }), e.jsx("stop", {
                        offset: "0.6",
                        stopColor: "#0B1E4D",
                        stopOpacity: "0.1"
                    }), e.jsx("stop", {
                        offset: "1",
                        stopColor: "#0B1E4D",
                        stopOpacity: "0"
                    })]
                }), e.jsxs("linearGradient", {
                    id: "paint1_linear_358_418",
                    x1: "168",
                    y1: "158",
                    x2: "818",
                    y2: "158",
                    gradientUnits: "userSpaceOnUse",
                    children: [e.jsx("stop", {
                        stopColor: "#0B1E4D",
                        stopOpacity: "0"
                    }), e.jsx("stop", {
                        offset: "0.4",
                        stopColor: "#0B1E4D",
                        stopOpacity: "0.1"
                    }), e.jsx("stop", {
                        offset: "0.56",
                        stopColor: "white",
                        stopOpacity: "0.3"
                    }), e.jsx("stop", {
                        offset: "0.6",
                        stopColor: "white"
                    }), e.jsx("stop", {
                        offset: "0.64",
                        stopColor: "white",
                        stopOpacity: "0.3"
                    }), e.jsx("stop", {
                        offset: "0.8",
                        stopColor: "#0B1E4D",
                        stopOpacity: "0.1"
                    }), e.jsx("stop", {
                        offset: "1",
                        stopColor: "#0B1E4D",
                        stopOpacity: "0"
                    })]
                }), e.jsxs("linearGradient", {
                    id: "paint2_linear_358_418",
                    x1: "168",
                    y1: "97.9337",
                    x2: "819.002",
                    y2: "97.9337",
                    gradientUnits: "userSpaceOnUse",
                    children: [e.jsx("stop", {
                        stopColor: "#0B1E4D",
                        stopOpacity: "0"
                    }), e.jsx("stop", {
                        offset: "0.36",
                        stopColor: "#0C36A3",
                        stopOpacity: "0.4"
                    }), e.jsx("stop", {
                        offset: "0.64",
                        stopColor: "#0C36A3",
                        stopOpacity: "0.4"
                    }), e.jsx("stop", {
                        offset: "1",
                        stopColor: "#0B1E4D",
                        stopOpacity: "0"
                    })]
                }), e.jsxs("radialGradient", {
                    id: "paint3_radial_358_418",
                    cx: "0",
                    cy: "0",
                    r: "1",
                    gradientUnits: "userSpaceOnUse",
                    gradientTransform: "translate(493 53.6385) rotate(180) scale(325 52.3614)",
                    children: [e.jsx("stop", {
                        stopColor: "#376FFF"
                    }), e.jsx("stop", {
                        offset: "0.5",
                        stopColor: "#002FA8",
                        stopOpacity: "0.43"
                    }), e.jsx("stop", {
                        offset: "1",
                        stopColor: "#000F35",
                        stopOpacity: "0"
                    })]
                }), e.jsxs("linearGradient", {
                    id: "paint4_linear_358_418",
                    x1: "247",
                    y1: "88.5",
                    x2: "740",
                    y2: "88.5",
                    gradientUnits: "userSpaceOnUse",
                    children: [e.jsx("stop", {
                        stopColor: "#0B1E4D",
                        stopOpacity: "0"
                    }), e.jsx("stop", {
                        offset: "0.46",
                        stopColor: "#3E74FF",
                        stopOpacity: "0.2"
                    }), e.jsx("stop", {
                        offset: "0.5",
                        stopColor: "#739AFF",
                        stopOpacity: "0.3"
                    }), e.jsx("stop", {
                        offset: "0.54",
                        stopColor: "#3E74FF",
                        stopOpacity: "0.2"
                    }), e.jsx("stop", {
                        offset: "1",
                        stopColor: "#0B1E4D",
                        stopOpacity: "0"
                    })]
                }), e.jsxs("linearGradient", {
                    id: "paint5_linear_358_418",
                    x1: "247",
                    y1: "88.5",
                    x2: "740",
                    y2: "88.5",
                    gradientUnits: "userSpaceOnUse",
                    children: [e.jsx("stop", {
                        stopColor: "#0B1E4D",
                        stopOpacity: "0"
                    }), e.jsx("stop", {
                        offset: "0.46",
                        stopColor: "#3E74FF",
                        stopOpacity: "0.2"
                    }), e.jsx("stop", {
                        offset: "0.5",
                        stopColor: "#739AFF",
                        stopOpacity: "0.3"
                    }), e.jsx("stop", {
                        offset: "0.54",
                        stopColor: "#3E74FF",
                        stopOpacity: "0.2"
                    }), e.jsx("stop", {
                        offset: "1",
                        stopColor: "#0B1E4D",
                        stopOpacity: "0"
                    })]
                }), e.jsxs("linearGradient", {
                    id: "paint6_linear_358_418",
                    x1: "247",
                    y1: "72.5",
                    x2: "740",
                    y2: "72.5",
                    gradientUnits: "userSpaceOnUse",
                    children: [e.jsx("stop", {
                        stopColor: "#0B1E4D",
                        stopOpacity: "0"
                    }), e.jsx("stop", {
                        offset: "0.3",
                        stopColor: "#144DDF",
                        stopOpacity: "0.2"
                    }), e.jsx("stop", {
                        offset: "0.46",
                        stopColor: "#144DDF",
                        stopOpacity: "0.3"
                    }), e.jsx("stop", {
                        offset: "0.5",
                        stopColor: "#0048FF",
                        stopOpacity: "0.5"
                    }), e.jsx("stop", {
                        offset: "0.54",
                        stopColor: "#144DDF",
                        stopOpacity: "0.3"
                    }), e.jsx("stop", {
                        offset: "0.7",
                        stopColor: "#144DDF",
                        stopOpacity: "0.2"
                    }), e.jsx("stop", {
                        offset: "1",
                        stopColor: "#0B1E4D",
                        stopOpacity: "0"
                    })]
                }), e.jsxs("linearGradient", {
                    id: "paint7_linear_358_418",
                    x1: "247",
                    y1: "72.5",
                    x2: "740",
                    y2: "72.5",
                    gradientUnits: "userSpaceOnUse",
                    children: [e.jsx("stop", {
                        stopColor: "#0B1E4D",
                        stopOpacity: "0"
                    }), e.jsx("stop", {
                        offset: "0.3",
                        stopColor: "#144DDF",
                        stopOpacity: "0.2"
                    }), e.jsx("stop", {
                        offset: "0.46",
                        stopColor: "#144DDF",
                        stopOpacity: "0.3"
                    }), e.jsx("stop", {
                        offset: "0.5",
                        stopColor: "#0048FF",
                        stopOpacity: "0.5"
                    }), e.jsx("stop", {
                        offset: "0.54",
                        stopColor: "#144DDF",
                        stopOpacity: "0.3"
                    }), e.jsx("stop", {
                        offset: "0.7",
                        stopColor: "#144DDF",
                        stopOpacity: "0.2"
                    }), e.jsx("stop", {
                        offset: "1",
                        stopColor: "#0B1E4D",
                        stopOpacity: "0"
                    })]
                })]
            })]
        }), e.jsx("div", {
            className: x("w-full", {
                "-translate-y-1/2 absolute top-1/2 right-1/2 translate-x-1/2": !o
            }),
            children: s
        })]
    })
}

function Io({
    className: t,
    onClick: s
}) {
    return e.jsx("button", {
        className: x(t, "absolute right-0 block desktop:size-8 h-4 w-5"),
        type: "button",
        onClick: s,
        children: e.jsx(k, {
            className: "size-full text-white",
            name: "close"
        })
    })
}

function To({
    className: t,
    centered: s,
    children: o
}) {
    return e.jsx("div", {
        className: x("modal-dialog__panel -translate-x-1/2 pointer-events-auto absolute left-1/2 flex flex-col border-1 border-primary bg-black", t, s && "-translate-y-1/2 top-1/2"),
        children: o
    })
}

function Po({
    children: t,
    open: s
}) {
    return s && e.jsx(O1, {
        children: e.jsx("div", {
            className: "modal-dialog fixed inset-0 z-[1010] overflow-y-auto overflow-x-hidden",
            children: t
        })
    })
}
Object.assign(Po, {
    Title: Go,
    Panel: To,
    Overlay: Do,
    PendingOverlay: Vo,
    Portal: O1,
    CloseButton: Io
});
const $o = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "100%",
        height: "100%",
        viewBox: "0 0 16 10",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        fillRule: "evenodd",
        d: "M0 1a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm6 0a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zM1 6a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1z",
        clipRule: "evenodd"
    })),
    Wo = t => l.createElement("svg", {
        width: 12,
        height: 22,
        viewBox: "0 0 12 22",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...t
    }, l.createElement("path", {
        d: "M11.8356 19.6166C11.8356 20.2741 11.4247 20.9316 10.7671 21.1782C10.1096 21.4248 9.36986 21.2604 8.87671 20.8495L0.493151 12.3015C0.164384 11.9727 0 11.4796 0 11.0686C0 10.5755 0.164384 10.1645 0.493151 9.83576L9.0411 1.20562C9.53425 0.712471 10.274 0.548088 10.9315 0.876855C11.589 1.12343 12 1.78096 12 2.4385L11.8356 19.6166Z",
        fill: "currentColor"
    })),
    qo = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "100%",
        height: "100%",
        viewBox: "0 0 7 10",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "M6.35 4.4c.33.25.33.75 0 1L1.64 9.07a.64.64 0 0 1-1.03-.5v-7.3c0-.54.6-.84 1.03-.51l4.7 3.65Z"
    })),
    Ko = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: 20,
        height: 17,
        fill: "none",
        viewBox: "0 0 20 17",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        fillRule: "evenodd",
        d: "M11.584 2.17a6.234 6.234 0 1 1 0 12.469v1.781a8.015 8.015 0 1 0-8.016-8.015H5.35a6.234 6.234 0 0 1 6.234-6.235M4.459 13.748l3.085-5.343h-6.17zm8.397-6.878-.898-2.766-.9 2.766H8.152l2.353 1.71-.9 2.766 2.354-1.71 2.353 1.71-.9-2.766 2.354-1.71z",
        clipRule: "evenodd"
    })),
    Qo = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "100%",
        height: "100%",
        fill: "none",
        viewBox: "0 0 235 235",
        ...t
    }, l.createElement("path", {
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeMiterlimit: 10,
        strokeWidth: 14,
        d: "M212.214 101.715H22.785v126.286h189.429V101.715ZM228 54.355H7v47.358h221V54.356Z"
    }), l.createElement("path", {
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeMiterlimit: 10,
        strokeWidth: 14,
        d: "M141.174 101.715H93.816v126.286h47.358V101.715ZM141.174 54.355H93.816v47.358h47.358V54.356ZM117.495 46.464l23.679-23.678L133.281 7h-31.572l-7.893 15.786 23.679 23.678ZM141.184 22.787l31.571-7.892 15.786 15.785V54.36"
    }), l.createElement("path", {
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeMiterlimit: 10,
        strokeWidth: 14,
        d: "m93.822 22.787-31.571-7.892L46.465 30.68V54.36"
    })),
    Yo = t => l.createElement("svg", {
        width: "100%",
        height: "100%",
        viewBox: "0 0 12 13",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...t
    }, l.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M6.00003 13C9.04003 12.9913 11.5 11.5465 11.5 9.89963C11.5 8.24773 11.1944 6.07638 11.1944 6.07638C11.0701 5.46106 10.3737 4.69615 9.71955 4.69615V3.78934C9.71949 1.70467 8.05647 0.0136391 6.00003 0C3.94359 0.0136391 2.28051 1.70467 2.28051 3.78934V4.69615C1.62645 4.69615 0.929989 5.46106 0.805689 6.07638C0.805689 6.07638 0.5 8.24773 0.5 9.89963C0.500054 11.5465 2.96003 12.9913 6.00003 13ZM6.67526 8.46902L6.88431 10.1661C6.88431 10.4174 6.64649 10.6212 6.35313 10.6212H5.65595C5.36258 10.6212 5.12476 10.4174 5.12476 10.1661L5.36935 8.46902C5.01636 8.24734 4.78046 7.8527 4.78046 7.40127C4.78046 6.70707 5.33646 6.1443 6.0223 6.1443C6.70815 6.1443 7.26414 6.70707 7.26414 7.40127C7.26414 7.85264 7.02825 8.24734 6.67526 8.46902ZM4.14615 3.678C4.14615 2.63714 4.97434 1.79246 6.00003 1.78133C7.02572 1.79252 7.8539 2.6372 7.8539 3.678V4.53816H6.00003H4.14615V3.678Z",
        fill: "white"
    })),
    Jo = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "100%",
        height: "100%",
        viewBox: "0 0 32 32",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "M30.85 5.4a1 1 0 0 0 0-1.42l-2.83-2.83a1 1 0 0 0-1.41 0L16 11.75 5.4 1.15a1 1 0 0 0-1.42 0L1.15 3.98a1 1 0 0 0 0 1.41L11.75 16 1.16 26.6a1 1 0 0 0 0 1.42l2.83 2.83a1 1 0 0 0 1.41 0L16 20.24l10.6 10.6a1 1 0 0 0 1.42 0l2.83-2.82a1 1 0 0 0 0-1.42L20.25 16z"
    })),
    Xo = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "100%",
        height: "100%",
        viewBox: "0 0 14 14",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "M5.59 7.13.64 12.08l1.41 1.42L7 8.55l4.95 4.95 1.41-1.42-4.95-4.95 4.95-4.95L11.95.77 7 5.72 2.05.77.64 2.18l4.95 4.95Z"
    })),
    ea = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: 23,
        height: 15,
        fill: "none",
        viewBox: "0 0 23 15",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        fillRule: "evenodd",
        d: "M0 7.9s5.15 7 11.5 7 11.5-7 11.5-7-5.15-7-11.5-7S0 7.9 0 7.9m2.61 0a22 22 0 0 0 2.05 1.97c1.95 1.65 4.37 3.03 6.84 3.03s4.89-1.38 6.84-3.03c.84-.7 1.53-1.4 2.05-1.97a22 22 0 0 0-2.05-1.97C16.4 4.3 13.97 2.9 11.5 2.9S6.61 4.3 4.66 5.93c-.84.7-1.53 1.4-2.05 1.97m-1 1.19",
        clipRule: "evenodd"
    })),
    ta = t => l.createElement("svg", {
        width: "100%",
        height: "100%",
        id: "\\u0421\\u043B\\u043E\\u0439_1",
        xmlns: "http://www.w3.org/2000/svg",
        xmlnsXlink: "http://www.w3.org/1999/xlink",
        viewBox: "-244 360.9 107 120",
        style: {
            enableBackground: "new -244 360.9 107 120"
        },
        xmlSpace: "preserve",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "M-138.7,425.2l-16.4,16.3c-1.9,1.9-5,1.9-6.9,0s-1.9-5,0-6.8l8.9-8.7h-62.8c-2.8,0-5-2.2-5-5s2.2-5,5-5h62.4 l-10-9.8c-1.9-1.9-1.9-4.9,0-6.8s5-1.9,6.9,0l17.9,17.7C-136.4,419.3-136.4,422.9-138.7,425.2z M-174,390.9c-2.8,0-5-2.2-5-5v-11 c0-2.2-1.8-4-4-4h-47c-2.2,0-4,1.8-4,4v92c0,2.2,1.8,4,4,4h47c2.2,0,4-1.8,4-4v-11c0-2.8,2.2-5,5-5s5,2.2,5,5v11c0,7.7-6.3,14-14,14 h-47c-7.7,0-14-6.3-14-14v-92c0-7.7,6.3-14,14-14h47c7.7,0,14,6.3,14,14v11C-169,388.7-171.2,390.9-174,390.9z"
    })),
    sa = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "100%",
        height: "100%",
        viewBox: "0 0 16 15",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "m8 0 1.8 5.53h5.8l-4.7 3.41 1.8 5.53L8 11.06l-4.7 3.41 1.8-5.53L.4 5.53h5.8z"
    })),
    la = t => l.createElement("svg", {
        width: "100%",
        height: "100%",
        viewBox: "0 0 18 18",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...t
    }, l.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M16.0947 17.5H11.2543C10.7664 17.5 10.3565 17.1092 10.3565 16.6207C10.3565 16.1322 10.7468 15.7414 11.2543 15.7414H14.4162L10.1418 11.5598C9.79047 11.2276 9.79047 10.6609 10.1418 10.3287C10.3175 10.1529 10.5517 10.0747 10.7664 10.0747C11.0006 10.0747 11.2153 10.1529 11.3909 10.3287L15.7044 14.5299V11.3253C15.7044 10.8368 16.0947 10.446 16.6022 10.446C17.1096 10.446 17.5 10.8368 17.5 11.3253V16.1126C17.4805 16.8747 16.8559 17.5 16.0947 17.5ZM7.13605 7.92529C6.90184 7.92529 6.68714 7.84713 6.51148 7.67126L2.2566 3.45057V6.65517C2.2566 7.14368 1.86625 7.53448 1.3783 7.53448C0.890356 7.53448 0.5 7.14368 0.5 6.65517V1.88736C0.5 1.12529 1.12457 0.5 1.88576 0.5H6.64811C7.13605 0.5 7.52641 0.890805 7.52641 1.37931C7.52641 1.86782 7.13605 2.25862 6.64811 2.25862H3.52526L7.76062 6.44023C8.11194 6.77241 8.11194 7.33908 7.76062 7.67126C7.58496 7.82759 7.37026 7.92529 7.13605 7.92529Z",
        fill: "white"
    })),
    oa = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "100%",
        height: "100%",
        viewBox: "0 0 62 31",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "M18.084 12.917v-2.584a2.583 2.583 0 0 0-5.167 0v2.584h-2.583a2.583 2.583 0 1 0 0 5.166h2.583v2.584a2.583 2.583 0 1 0 5.167 0v-2.584h2.583a2.583 2.583 0 1 0 0-5.166zM15.5 0h31a15.5 15.5 0 1 1-11.553 25.833h-7.894A15.499 15.499 0 0 1 2.493 7.07 15.5 15.5 0 0 1 15.5 0m31 12.917a2.583 2.583 0 1 0 0-5.167 2.583 2.583 0 0 0 0 5.167m-5.167 5.166a2.583 2.583 0 1 0 0-5.166 2.583 2.583 0 0 0 0 5.166m10.333 0a2.583 2.583 0 1 0 0-5.166 2.583 2.583 0 0 0 0 5.166M46.5 23.25a2.584 2.584 0 1 0 0-5.167 2.584 2.584 0 0 0 0 5.167"
    })),
    aa = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "100%",
        height: "100%",
        viewBox: "0 0 24 22",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "M2.42 2.58a6.25 6.25 0 0 0 0 8.84l9.722 9.722v-.002l.002.002 9.722-9.723a6.25 6.25 0 1 0-8.839-8.838l-.884.885-.885-.885a6.25 6.25 0 0 0-8.839 0Z"
    })),
    ra = t => l.createElement("svg", {
        width: 30,
        height: 30,
        viewBox: "0 0 30 30",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...t
    }, l.createElement("path", {
        d: "M24.6408 29.4944H19.8906C18.5093 29.4944 17.3639 28.382 17.3639 26.9663V22.0786H12.6473V26.9663C12.6473 28.3483 11.5356 29.4944 10.1206 29.4944H5.40407C4.0228 29.4944 2.87735 28.382 2.87735 26.9663V17.9326H2.47308C1.46239 17.9326 0.552777 17.3258 0.182192 16.382C-0.188393 15.4382 0.0137445 14.3595 0.721225 13.6517L13.119 1.24719C13.6243 0.775278 14.2307 0.505615 14.9045 0.505615C15.5783 0.505615 16.2184 0.775278 16.6901 1.24719L29.2563 13.8202C29.9974 14.5281 30.1996 15.6404 29.7953 16.5843C29.391 17.5281 28.4814 18.1348 27.4707 18.1348H27.1675V27C27.1675 28.3483 26.0221 29.4944 24.6408 29.4944ZM20.4296 26.4607H24.1355V17.5955C24.1355 16.9213 24.405 16.2809 24.8766 15.809C25.2472 15.4382 25.7525 15.2022 26.2579 15.1011L14.9045 3.74157L3.75328 14.9326C4.96611 15.1011 5.9431 16.1461 5.9431 17.427V26.4607H9.64895V21.5393C9.64895 20.1573 10.7607 19.0112 12.1757 19.0112H17.9366C19.3178 19.0112 20.4633 20.1236 20.4633 21.5393V26.4607H20.4296Z",
        fill: "currentColor"
    })),
    na = t => l.createElement("svg", {
        width: "100%",
        height: "100%",
        viewBox: "0 0 8 23",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...t
    }, l.createElement("path", {
        d: "M2.5 8.92035C2.3 9.9115 2 11.7947 1.4 14.5699C1 16.354 0.8 17.7416 0.6 18.5345C0.4 19.3274 0.3 20.0212 0.3 20.6159V20.8142C0.3 21.9044 1 22.4 2.5 22.4C3.1 22.4 3.8 22.3009 4.4 22.0035C5 21.8053 5.6 21.508 6 21.2106C6.4 20.9133 6.7 20.6159 6.9 20.4177L6.3 19.7239C5.8 20.0212 5.5 20.3186 5.2 20.4177C4.9 20.5168 4.7 20.6159 4.5 20.6159C4.2 20.6159 4.1 20.4177 4.1 20.0212C4.1 19.823 4.1 19.7239 4.1 19.6248L6.5 6.73982L5.6 6.34336L0.3 7.03717L0 8.12743L2.5 8.92035ZM3.3 2.08142C3.3 2.47788 3.5 2.87434 3.9 3.17168C4.3 3.46903 4.8 3.66726 5.3 3.66726C5.8 3.66726 6.2 3.56814 6.6 3.36991C7 3.17168 7.3 2.87434 7.6 2.57699C7.8 2.18053 8 1.88319 8 1.48673C8 1.09027 7.8 0.693805 7.4 0.39646C7 0.099115 6.5 0 5.8 0C5.4 0 5 0.099115 4.6 0.297345C4.2 0.495575 3.9 0.693805 3.7 0.99115C3.4 1.38761 3.3 1.68496 3.3 2.08142Z",
        fill: "url(#paint0_linear_691_15446)"
    }), l.createElement("defs", null, l.createElement("linearGradient", {
        id: "paint0_linear_691_15446",
        x1: 4,
        y1: 0,
        x2: 4,
        y2: 22.4,
        gradientUnits: "userSpaceOnUse"
    }, l.createElement("stop", {
        offset: .42,
        stopColor: "white"
    }), l.createElement("stop", {
        offset: .48,
        stopColor: "#C2D0EA"
    }), l.createElement("stop", {
        offset: .63,
        stopColor: "#CEDBED"
    })))),
    ia = t => l.createElement("svg", {
        width: "100%",
        height: "100%",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-274.8 408.4 9.6 24.6",
        style: {
            enableBackground: "new -274.8 408.4 9.6 24.6"
        },
        xmlSpace: "preserve",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "M-271.5,418.1c-0.3,1.1-0.8,3.1-1.6,6.2c-0.5,2-0.9,3.4-1.1,4.4c-0.2,0.9-0.4,1.7-0.5,2.3l0,0.3 c-0.1,1.2,0.7,1.7,2.3,1.7c0.7,0,1.4-0.1,2.1-0.4c0.7-0.3,1.2-0.6,1.7-0.9c0.5-0.3,0.8-0.6,1-0.8l-0.5-0.8c-0.5,0.4-0.9,0.6-1.3,0.8 c-0.3,0.1-0.6,0.2-0.8,0.2c-0.3,0-0.5-0.2-0.4-0.7c0-0.2,0-0.3,0.1-0.5l3.5-14.2l-0.9-0.4l-5.8,0.8l-0.4,1.2L-271.5,418.1z  M-270.2,410.6c0,0.5,0.2,0.9,0.6,1.2c0.4,0.3,0.9,0.5,1.5,0.5c0.5,0,1-0.1,1.4-0.3c0.5-0.2,0.8-0.5,1.1-0.9 c0.3-0.4,0.4-0.7,0.5-1.1c0-0.5-0.2-0.9-0.6-1.2c-0.4-0.3-1-0.5-1.7-0.5c-0.4,0-0.9,0.1-1.3,0.3c-0.4,0.2-0.8,0.5-1.1,0.8 C-270,409.9-270.2,410.2-270.2,410.6L-270.2,410.6z"
    })),
    ca = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: 23,
        height: 15,
        fill: "none",
        viewBox: "0 0 23 15",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "M11.5 14.9c-6.35 0-11.5-7-11.5-7s5.15-7 11.5-7 11.5 7 11.5 7-5.15 7-11.5 7M4.66 9.87A22 22 0 0 1 2.6 7.9a22 22 0 0 1 2.05-1.97C6.6 4.3 9.03 2.9 11.5 2.9s4.89 1.4 6.84 3.03c.84.7 1.53 1.4 2.05 1.97a22 22 0 0 1-2.05 1.97c-1.95 1.65-4.37 3.03-6.84 3.03s-4.89-1.38-6.84-3.03m6.83 1.04a3 3 0 1 0 0-6 3 3 0 0 0 0 6",
        fillRule: "evenodd"
    })),
    da = t => l.createElement("svg", {
        width: 16,
        height: 20,
        viewBox: "0 0 16 20",
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
        ...t
    }, l.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M12.9555 20H2.59108C1.13359 20 0 18.7854 0 17.3279V16.6802C0 14.0891 2.0243 11.9838 4.53442 11.9838H11.0121C13.5223 11.9838 15.5465 14.0891 15.5465 16.6802V17.3279C15.5465 18.8664 14.4129 20 12.9555 20ZM7.53035 10.0405C4.85829 10.0405 2.67205 7.77329 2.67205 5.02025C2.67205 2.26722 4.85829 0 7.53035 0C10.2024 0 12.3886 2.26722 12.3886 5.02025C12.3886 7.85426 10.2024 10.0405 7.53035 10.0405Z",
        fill: "currentColor"
    })),
    pa = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "100%",
        height: "100%",
        viewBox: "0 0 16 15",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "m8 0 1.8 5.53h5.8l-4.7 3.41 1.8 5.53L8 11.06l-4.7 3.41 1.8-5.53L.4 5.53h5.8z"
    })),
    fa = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: 31,
        height: 31,
        fill: "none",
        viewBox: "0 0 31 31",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "M3.44 15.5a12.06 12.06 0 0 1 24.12 0H23.3l5.97 10.33 5.96-10.33H31A15.5 15.5 0 1 0 15.5 31v-3.44c-6.66 0-12.06-5.4-12.06-12.06"
    })),
    ua = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: 16,
        height: 16,
        fill: "none",
        viewBox: "0 0 16 16",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        fillRule: "evenodd",
        d: "M10.19 4.018a4.364 4.364 0 1 1-6.172 6.171 4.364 4.364 0 0 1 6.171-6.171Zm2.065 6.823a6.366 6.366 0 0 0-9.651-8.237 6.364 6.364 0 0 0 8.237 9.652l3.141 3.14a1 1 0 0 0 1.414-1.414l-3.14-3.14Z",
        clipRule: "evenodd"
    })),
    ma = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "100%",
        height: "100%",
        viewBox: "0 0 325 200",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        fillRule: "evenodd",
        d: "M38.343 0h248.215c21.143 0 38.343 17.203 38.343 38.346v47.79l-12.501.59c-7.112.337-12.683 6.169-12.683 13.276s5.571 12.94 12.678 13.272l12.506.585v47.8c0 21.138-17.2 38.341-38.343 38.341H38.343C17.199 200 0 182.797 0 161.659v-46.893l11.259-1.61c6.502-.933 11.406-6.59 11.406-13.154 0-6.57-4.906-12.227-11.412-13.16L0 85.228V38.345C0 17.203 17.2 0 38.343 0m248.256 100.002c0-14.179 11.168-25.718 25.183-26.38V38.345c0-13.932-11.294-25.227-25.224-25.227H38.343c-13.93 0-25.225 11.295-25.225 25.227v35.512c12.809 1.84 22.665 12.827 22.665 26.145s-9.856 24.305-22.665 26.14v35.516c0 13.929 11.294 25.223 25.225 25.223h248.215c13.93 0 25.224-11.294 25.224-25.223v-35.28c-14.015-.657-25.183-12.196-25.183-26.376m-211.277 48.33h8.679v22.635h-8.679zm8.679-39.766h-8.679v22.635h8.679zm-8.679-39.773h8.679v22.639h-8.679zm8.679-39.758h-8.679V51.67h8.679zm96.305 79.938c-9.913 9.913-25.984 9.913-35.897 0s-9.913-25.984 0-35.897 25.984-9.912 35.897 0 9.912 25.985 0 35.897m4.113 13.091c-14.869 10.595-35.645 9.223-48.984-4.116-14.869-14.869-14.869-38.977 0-53.846s38.976-14.869 53.845 0c13.184 13.184 14.678 33.63 4.483 48.46l13.913 13.913 2.244-2.245 21.987 21.987-13.91 13.91-21.987-21.987 2.243-2.242z"
    })),
    ha = t => l.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: 17,
        height: 17,
        viewBox: "0 0 17 17",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        fillRule: "evenodd",
        d: "M7.33.69a.3.3 0 0 0-.3.3V2.7c-.5.13-1 .33-1.44.58l-1.3-1.3a.3.3 0 0 0-.41 0L1.96 3.93a.3.3 0 0 0 0 .42l1.33 1.33c-.15.28-.28.58-.38.9H1.08a.3.3 0 0 0-.3.3v2.7c0 .17.13.3.3.3H2.8c.14.51.33 1 .59 1.44L2.2 12.5a.3.3 0 0 0 0 .42l1.92 1.92c.12.12.3.12.42 0l1.23-1.22c.4.21.82.37 1.26.49v1.73c0 .16.13.3.3.3h2.71a.3.3 0 0 0 .3-.3V14c.3-.1.6-.23.9-.38l1.22 1.22c.11.12.3.12.41 0l1.92-1.92a.3.3 0 0 0 0-.42l-1.18-1.18c.26-.44.45-.93.58-1.44h1.73a.3.3 0 0 0 .3-.3v-2.7a.3.3 0 0 0-.3-.3H14.1c-.1-.32-.23-.62-.38-.9l1.33-1.33a.3.3 0 0 0 0-.42L13.12 2a.3.3 0 0 0-.42 0l-1.3 1.29c-.33-.2-.69-.35-1.06-.47V.98a.3.3 0 0 0-.3-.3H7.33ZM8.5 11.08a2.67 2.67 0 1 0 0-5.35 2.67 2.67 0 0 0 0 5.35",
        clipRule: "evenodd"
    })),
    xa = t => l.createElement("svg", {
        width: "100%",
        height: "100%",
        xmlns: "http://www.w3.org/2000/svg",
        xmlnsXlink: "http://www.w3.org/1999/xlink",
        x: "0px",
        y: "0px",
        viewBox: "-284 407.9 26 26",
        style: {
            enableBackground: "new -284 407.9 26 26"
        },
        xmlSpace: "preserve",
        ...t
    }, l.createElement("path", {
        fill: "currentColor",
        d: "M-258.8,414.3l-0.7,5.2c-0.3,2-2.2,3.5-4.3,3.5l-0.1,1.6c-0.1,1.7-1.8,3-3.6,3h-7.4c-1.9,0-3.5-1.3-3.6-3 l-0.1-1.6c-2.2,0-4.1-1.5-4.3-3.5l-0.7-5.2c-0.2-1.3,0.8-2.4,2.2-2.4h1.9l-0.1-1.1c-0.1-1.3,0.9-2.4,2.2-2.4h12.8 c1.3,0,2.3,1.1,2.2,2.4l-0.1,1.1h1.9C-259.5,411.9-258.6,413-258.8,414.3z M-279.6,413.3h-2c-0.5,0-0.8,0.4-0.8,0.9 c0,0,0.5,4.2,0.6,5.3c0.1,1,1.2,2,2.8,2.1L-279.6,413.3z M-269.6,415.3l-1.7-2.9l-1.7,2.9l-3.2,0.8l2.1,2.6l-0.2,3.4l3-1.3l3,1.3 l-0.3-3.4l2.1-2.6L-269.6,415.3z M-261,413.3h-2l-0.7,8.3c1.6-0.1,2.7-1.1,2.8-2.1c0.1-1.1,0.6-5.3,0.6-5.3 C-260.1,413.7-260.5,413.3-261,413.3z M-277.7,432.1l6-4c0.2-0.2,0.5-0.2,0.8,0l6,4c0.6,0.4,0.3,1.2-0.4,1.2h-12.1 C-278,433.4-278.2,432.5-277.7,432.1z"
    })),
    ga = t => l.createElement("svg", {
        width: 20,
        height: 18,
        viewBox: "0 0 20 18",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...t
    }, l.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M0.566762 9.64405C1.30393 9.90327 2.26792 10.2516 3.54783 10.6161C4.83585 10.9888 5.44341 11.0536 6.74763 10.203C8.05184 9.35242 12.5559 6.27414 13.1229 5.87721C13.69 5.48837 14.7917 4.84031 15.0023 4.99423C15.2129 5.14814 14.735 5.87721 14.014 6.57387C13.293 7.27053 10.1337 10.1787 9.34796 10.9645C8.56219 11.7502 8.57029 12.3254 9.38037 12.9816C10.1823 13.6377 10.474 13.7592 13.6576 15.9383C16.8411 18.1174 17.5945 17.3884 17.9023 15.5819C18.2102 13.7754 19.6278 4.59729 19.887 2.81513C20.0247 1.89974 20.13 1.20308 19.644 0.960058C19.1661 0.717036 18.599 0.846648 17.4568 1.32459C15.14 2.30478 2.70536 7.36774 1.15812 8.0239C-0.389125 8.67196 -0.170405 9.38483 0.566762 9.64405Z",
        fill: "currentColor"
    })),
    va = {
        allGames: $o,
        arrowLeft: Wo,
        arrowRight: qo,
        betHistory: Ko,
        bonusGift: Qo,
        close: Jo,
        closeAlt: Xo,
        closedEye: ea,
        favourites: sa,
        gamepad: oa,
        heart: aa,
        openedEye: ca,
        recommended: pa,
        reload: fa,
        searchTicket: ma,
        search: ua,
        settings: ha,
        info: ia,
        fullscreen: la,
        sportBets: xa,
        profile: da,
        exit: ta,
        clock: Yo,
        home: ra,
        telegram: ga,
        i: na
    };

function k({
    className: t,
    name: s
}) {
    const o = va[s];
    return e.jsx(oe, {
        fallback: e.jsx("pre", {
            children: "%"
        }),
        children: e.jsx("div", {
            className: x(t, "svg-icon flex-center empty:hidden"),
            children: e.jsx(o, {})
        })
    })
}

function Ca({
    text: t,
    className: s
}) {
    return e.jsx("h1", {
        className: x("jackpot-title uppercase", s),
        children: e.jsx("div", {
            children: t
        })
    })
}

function ja({
    title: t,
    children: s,
    actions: o,
    ...a
}) {
    return e.jsx("div", {
        className: "relative",
        ...a,
        children: e.jsxs("div", {
            className: "flex h-screen mobile:h-[100dvh] w-screen flex-col items-center overflow-hidden border-none bg-transparent desktop:px-5.5 px-2 desktop:py-12.5 py-2",
            children: [e.jsxs("div", {
                className: x("relative mb-5 flex flex-center desktop:text-center text-center font-bold desktop:text-xl text-2xs"),
                children: [e.jsx(ya, {}), e.jsx("p", {
                    className: "title-gold absolute z-10 truncate text-center",
                    children: t
                })]
            }), e.jsx("div", {
                className: "desktop:mb-10 grid max-h-full mobile:w-full desktop:max-w-[67.5rem] grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] mobile:grid-cols-[repeat(auto-fit,minmax(11.375rem,1fr))] items-center justify-items-center gap-4 mobile:gap-2 overflow-y-auto overflow-x-hidden",
                children: s
            }), e.jsx("div", {
                className: "mt-auto flex min-w-full justify-center mobile:pt-5",
                children: e.jsx("div", {
                    className: "flex mobile:justify-center gap-5 mobile:whitespace-nowrap",
                    children: o
                })
            })]
        })
    })
}

function ya() {
    return e.jsxs("svg", {
        width: "986",
        height: "108",
        viewBox: "0 0 986 108",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [e.jsx("path", {
            d: "M168 2H818V4H168V2Z",
            fill: "url(#paint0_linear_358_418)"
        }), e.jsx("path", {
            d: "M168 104H818V106H168V104Z",
            fill: "url(#paint1_linear_358_418)"
        }), e.jsx("path", {
            d: "M168 4H818V104H168V4Z",
            fill: "url(#paint2_linear_358_418)"
        }), e.jsx("path", {
            d: "M168 0H818V106H168V0Z",
            fill: "url(#paint3_radial_358_418)"
        }), e.jsx("path", {
            d: "M247 86H740V91H247V86Z",
            fill: "url(#paint4_linear_358_418)"
        }), e.jsx("path", {
            d: "M247 16H740V21H247V16Z",
            fill: "url(#paint5_linear_358_418)"
        }), e.jsx("path", {
            d: "M247 102H740V108H247V102Z",
            fill: "url(#paint6_linear_358_418)"
        }), e.jsx("path", {
            d: "M247 0H740V6H247V0Z",
            fill: "url(#paint7_linear_358_418)"
        }), e.jsxs("defs", {
            children: [e.jsxs("linearGradient", {
                id: "paint0_linear_358_418",
                x1: "168",
                y1: "56",
                x2: "818",
                y2: "56",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    stopColor: "#0B1E4D",
                    stopOpacity: "0"
                }), e.jsx("stop", {
                    offset: "0.2",
                    stopColor: "#0B1E4D",
                    stopOpacity: "0.1"
                }), e.jsx("stop", {
                    offset: "0.36",
                    stopColor: "white",
                    stopOpacity: "0.3"
                }), e.jsx("stop", {
                    offset: "0.4",
                    stopColor: "white"
                }), e.jsx("stop", {
                    offset: "0.44",
                    stopColor: "white",
                    stopOpacity: "0.3"
                }), e.jsx("stop", {
                    offset: "0.6",
                    stopColor: "#0B1E4D",
                    stopOpacity: "0.1"
                }), e.jsx("stop", {
                    offset: "1",
                    stopColor: "#0B1E4D",
                    stopOpacity: "0"
                })]
            }), e.jsxs("linearGradient", {
                id: "paint1_linear_358_418",
                x1: "168",
                y1: "158",
                x2: "818",
                y2: "158",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    stopColor: "#0B1E4D",
                    stopOpacity: "0"
                }), e.jsx("stop", {
                    offset: "0.4",
                    stopColor: "#0B1E4D",
                    stopOpacity: "0.1"
                }), e.jsx("stop", {
                    offset: "0.56",
                    stopColor: "white",
                    stopOpacity: "0.3"
                }), e.jsx("stop", {
                    offset: "0.6",
                    stopColor: "white"
                }), e.jsx("stop", {
                    offset: "0.64",
                    stopColor: "white",
                    stopOpacity: "0.3"
                }), e.jsx("stop", {
                    offset: "0.8",
                    stopColor: "#0B1E4D",
                    stopOpacity: "0.1"
                }), e.jsx("stop", {
                    offset: "1",
                    stopColor: "#0B1E4D",
                    stopOpacity: "0"
                })]
            }), e.jsxs("linearGradient", {
                id: "paint2_linear_358_418",
                x1: "168",
                y1: "97.9337",
                x2: "819.002",
                y2: "97.9337",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    stopColor: "#0B1E4D",
                    stopOpacity: "0"
                }), e.jsx("stop", {
                    offset: "0.36",
                    stopColor: "#0C36A3",
                    stopOpacity: "0.4"
                }), e.jsx("stop", {
                    offset: "0.64",
                    stopColor: "#0C36A3",
                    stopOpacity: "0.4"
                }), e.jsx("stop", {
                    offset: "1",
                    stopColor: "#0B1E4D",
                    stopOpacity: "0"
                })]
            }), e.jsxs("radialGradient", {
                id: "paint3_radial_358_418",
                cx: "0",
                cy: "0",
                r: "1",
                gradientUnits: "userSpaceOnUse",
                gradientTransform: "translate(493 53.6385) rotate(180) scale(325 52.3614)",
                children: [e.jsx("stop", {
                    stopColor: "#376FFF"
                }), e.jsx("stop", {
                    offset: "0.5",
                    stopColor: "#002FA8",
                    stopOpacity: "0.43"
                }), e.jsx("stop", {
                    offset: "1",
                    stopColor: "#000F35",
                    stopOpacity: "0"
                })]
            }), e.jsxs("linearGradient", {
                id: "paint4_linear_358_418",
                x1: "247",
                y1: "88.5",
                x2: "740",
                y2: "88.5",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    stopColor: "#0B1E4D",
                    stopOpacity: "0"
                }), e.jsx("stop", {
                    offset: "0.46",
                    stopColor: "#3E74FF",
                    stopOpacity: "0.2"
                }), e.jsx("stop", {
                    offset: "0.5",
                    stopColor: "#739AFF",
                    stopOpacity: "0.3"
                }), e.jsx("stop", {
                    offset: "0.54",
                    stopColor: "#3E74FF",
                    stopOpacity: "0.2"
                }), e.jsx("stop", {
                    offset: "1",
                    stopColor: "#0B1E4D",
                    stopOpacity: "0"
                })]
            }), e.jsxs("linearGradient", {
                id: "paint5_linear_358_418",
                x1: "247",
                y1: "88.5",
                x2: "740",
                y2: "88.5",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    stopColor: "#0B1E4D",
                    stopOpacity: "0"
                }), e.jsx("stop", {
                    offset: "0.46",
                    stopColor: "#3E74FF",
                    stopOpacity: "0.2"
                }), e.jsx("stop", {
                    offset: "0.5",
                    stopColor: "#739AFF",
                    stopOpacity: "0.3"
                }), e.jsx("stop", {
                    offset: "0.54",
                    stopColor: "#3E74FF",
                    stopOpacity: "0.2"
                }), e.jsx("stop", {
                    offset: "1",
                    stopColor: "#0B1E4D",
                    stopOpacity: "0"
                })]
            }), e.jsxs("linearGradient", {
                id: "paint6_linear_358_418",
                x1: "247",
                y1: "72.5",
                x2: "740",
                y2: "72.5",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    stopColor: "#0B1E4D",
                    stopOpacity: "0"
                }), e.jsx("stop", {
                    offset: "0.3",
                    stopColor: "#144DDF",
                    stopOpacity: "0.2"
                }), e.jsx("stop", {
                    offset: "0.46",
                    stopColor: "#144DDF",
                    stopOpacity: "0.3"
                }), e.jsx("stop", {
                    offset: "0.5",
                    stopColor: "#0048FF",
                    stopOpacity: "0.5"
                }), e.jsx("stop", {
                    offset: "0.54",
                    stopColor: "#144DDF",
                    stopOpacity: "0.3"
                }), e.jsx("stop", {
                    offset: "0.7",
                    stopColor: "#144DDF",
                    stopOpacity: "0.2"
                }), e.jsx("stop", {
                    offset: "1",
                    stopColor: "#0B1E4D",
                    stopOpacity: "0"
                })]
            }), e.jsxs("linearGradient", {
                id: "paint7_linear_358_418",
                x1: "247",
                y1: "72.5",
                x2: "740",
                y2: "72.5",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    stopColor: "#0B1E4D",
                    stopOpacity: "0"
                }), e.jsx("stop", {
                    offset: "0.3",
                    stopColor: "#144DDF",
                    stopOpacity: "0.2"
                }), e.jsx("stop", {
                    offset: "0.46",
                    stopColor: "#144DDF",
                    stopOpacity: "0.3"
                }), e.jsx("stop", {
                    offset: "0.5",
                    stopColor: "#0048FF",
                    stopOpacity: "0.5"
                }), e.jsx("stop", {
                    offset: "0.54",
                    stopColor: "#144DDF",
                    stopOpacity: "0.3"
                }), e.jsx("stop", {
                    offset: "0.7",
                    stopColor: "#144DDF",
                    stopOpacity: "0.2"
                }), e.jsx("stop", {
                    offset: "1",
                    stopColor: "#0B1E4D",
                    stopOpacity: "0"
                })]
            })]
        })]
    })
}
const wt = l.memo(ja);

function wa({
    lang: t,
    onClick: s
}) {
    const {
        intl: o
    } = pe(), r = o.locale === t.code;

    function n(i) {
        se.emit("SET_LOCALE", i), localStorage.setItem("locale", i), s == null || s()
    }
    return e.jsx(O, {
        type: "filter",
        activeClassName: "btn_filter_active",
        onClick: () => n(t.code),
        isActive: r,
        className: x("mobile:max-w-full", {
            "after:absolute after:top-0 after:right-0 after:z-20 after:h-8 after:w-8 after:bg-checkbox-checked after:bg-cover": r
        }),
        children: e.jsxs("div", {
            className: "flex items-center desktop:gap-4 gap-2",
            children: [e.jsx("div", {
                className: "flex size-6 w-8 shrink-0 justify-center overflow-hidden rounded-rounded",
                children: pt[t.code]
            }), e.jsx("span", {
                className: "font-medium",
                children: (t == null ? void 0 : t.name) ? ? ""
            })]
        })
    })
}

function _a() {
    const {
        $t: t
    } = w(), {
        closeDialog: s
    } = z();
    return e.jsx(wt, {
        title: t({
            id: "GsBRWL",
            defaultMessage: [{
                type: 0,
                value: "Languages"
            }]
        }),
        actions: e.jsx(O, {
            type: "cancel",
            hoverFlickeringDirection: "tr-bl",
            onClick: () => s(),
            children: e.jsx("p", {
                className: "truncate whitespace-normal drop-shadow-[1px_1px_#1e2022]",
                children: t({
                    id: "cqZqGK",
                    defaultMessage: [{
                        type: 0,
                        value: "cancel"
                    }]
                })
            })
        }),
        children: Object.values(dt).map(o => e.jsx(wa, {
            lang: o,
            onClick: s
        }, o.code))
    })
}
const pt = {
    en: e.jsxs("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 28 20",
        children: [e.jsx("rect", {
            y: "7.692%",
            width: "100%",
            height: "90%",
            fill: "#fff"
        }), e.jsx("rect", {
            width: "100%",
            height: "7.692%",
            fill: "#D02F44"
        }), e.jsx("rect", {
            y: "15.384%",
            width: "100%",
            height: "7.692%",
            fill: "#D02F44"
        }), e.jsx("rect", {
            y: "30.769%",
            width: "100%",
            height: "7.692%",
            fill: "#D02F44"
        }), e.jsx("rect", {
            y: "46.153%",
            width: "100%",
            height: "7.692%",
            fill: "#D02F44"
        }), e.jsx("rect", {
            y: "61.538%",
            width: "100%",
            height: "7.692%",
            fill: "#D02F44"
        }), e.jsx("rect", {
            y: "76.923%",
            width: "100%",
            height: "7.692%",
            fill: "#D02F44"
        }), e.jsx("rect", {
            y: "92.307%",
            width: "100%",
            height: "7.692%",
            fill: "#D02F44"
        }), e.jsx("rect", {
            width: "42.8%",
            height: "46.3%",
            fill: "#46467F"
        }), e.jsx("path", {
            fill: "#fff",
            d: "M2.67 2a.67.67 0 1 1-1.34 0 .67.67 0 0 1 1.34 0Zm2.66 0A.67.67 0 1 1 4 2a.67.67 0 0 1 1.33 0Zm2 .67a.67.67 0 1 0 0-1.34.67.67 0 0 0 0 1.34ZM10.67 2a.67.67 0 1 1-1.34 0 .67.67 0 0 1 1.34 0ZM3.33 4a.67.67 0 1 0 0-1.33.67.67 0 0 0 0 1.33Zm3.34-.67a.67.67 0 1 1-1.34 0 .67.67 0 0 1 1.34 0Zm2 .67a.67.67 0 1 0 0-1.33.67.67 0 0 0 0 1.33Zm2 .67a.67.67 0 1 1-1.34 0 .67.67 0 0 1 1.34 0Zm-3.34.66a.67.67 0 1 0 0-1.33.67.67 0 0 0 0 1.33Zm-2-.66a.67.67 0 1 1-1.33 0 .67.67 0 0 1 1.33 0ZM2 5.33A.67.67 0 1 0 2 4a.67.67 0 0 0 0 1.33ZM4 6a.67.67 0 1 1-1.33 0A.67.67 0 0 1 4 6Zm2 .67a.67.67 0 1 0 0-1.34.67.67 0 0 0 0 1.34ZM9.33 6A.67.67 0 1 1 8 6a.67.67 0 0 1 1.33 0ZM10 8a.67.67 0 1 0 0-1.33A.67.67 0 0 0 10 8Zm-2-.67a.67.67 0 1 1-1.33 0 .67.67 0 0 1 1.33 0ZM4.67 8a.67.67 0 1 0 0-1.33.67.67 0 0 0 0 1.33Zm-2-.67a.67.67 0 1 1-1.34 0 .67.67 0 0 1 1.34 0Z"
        })]
    }),
    de: e.jsxs("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 28 20",
        children: [e.jsx("rect", {
            width: "100%",
            height: "33.33%",
            fill: "#262626"
        }), e.jsx("rect", {
            y: "33.33%",
            width: "100%",
            height: "33.33%",
            fill: "#F01515"
        }), e.jsx("rect", {
            y: "66.66%",
            width: "100%",
            height: "33.33%",
            fill: "#FFD521"
        })]
    }),
    es: e.jsxs("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 28 20",
        children: [e.jsx("path", {
            fill: "#DD172C",
            d: "M0 5.33h28V0H0v5.33ZM0 20h28v-5.33H0V20Z"
        }), e.jsx("path", {
            fill: "#FFD133",
            d: "M0 14.67h28V5.33H0v9.34Z"
        }), e.jsx("path", {
            fill: "#FFEDB1",
            d: "M7.33 9.33h1.34V10H7.33v-.67Z"
        }), e.jsx("path", {
            stroke: "#A41517",
            strokeWidth: ".67",
            d: "M6.06 9.36A.33.33 0 0 1 6.39 9h1.89c.2 0 .34.17.33.36l-.17 2.06a1 1 0 0 1-1 .91h-.21a1 1 0 0 1-1-.91l-.17-2.06Z"
        }), e.jsx("path", {
            fill: "#A41517",
            d: "M6 10h2.67v.67H8L7.33 12l-.66-1.33H6V10Z"
        }), e.jsx("rect", {
            width: "1.33",
            height: "4.67",
            x: "4",
            y: "8",
            fill: "#A41517",
            rx: ".67"
        }), e.jsx("rect", {
            width: "1.33",
            height: "4.67",
            x: "9.33",
            y: "8",
            fill: "#A41517",
            rx: ".67"
        }), e.jsx("path", {
            fill: "#A41517",
            d: "M6 7.73c0-.59.48-1.06 1.07-1.06h.53c.59 0 1.07.47 1.07 1.06 0 .15-.12.27-.27.27H6.27A.27.27 0 0 1 6 7.73Z"
        })]
    }),
    tr: e.jsxs("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 28 20",
        children: [e.jsx("rect", {
            width: "100%",
            height: "100%",
            fill: "#E92434"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m19.02 10.77-1.22 1.48.08-1.92-1.8-.7 1.86-.52.12-1.92 1.06 1.6L21 8.31l-1.2 1.5 1.03 1.63-1.8-.67Z"
        }), e.jsx("path", {
            fill: "#fff",
            d: "M17.4 13.68a5.99 5.99 0 1 1 0-7.36 5.2 5.2 0 0 0-3.07-.99c-2.76 0-5 2.1-5 4.67 0 2.58 2.24 4.67 5 4.67a5.2 5.2 0 0 0 3.07-.99Z"
        })]
    }),
    pt: e.jsxs("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 28 20",
        children: [e.jsx("rect", {
            width: "40%",
            height: "100%",
            fill: "#128415"
        }), e.jsx("rect", {
            width: "60%",
            height: "100%",
            x: "40%",
            fill: "#FF2936"
        }), e.jsx("circle", {
            cx: "40%",
            cy: "50%",
            r: "13%",
            stroke: "#FAF94F",
            fill: "none"
        }), e.jsxs("g", {
            transform: "translate(4.54 0)",
            children: [e.jsx("path", {
                fill: "#fff",
                d: "M5.33 8.33c0-.18.15-.33.34-.33h2c.18 0 .33.15.33.33v2.34a1.33 1.33 0 0 1-2.67 0V8.33Z"
            }), e.jsx("path", {
                fill: "#1D50B5",
                d: "M6.67 10.67c.36 0 .66-.97.66-1.34a.67.67 0 1 0-1.33 0c0 .37.3 1.34.67 1.34Z"
            })]
        })]
    }),
    hr: e.jsxs("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 28 20",
        children: [e.jsx("rect", {
            y: "33.33%",
            width: "100%",
            height: "33.33%",
            fill: "#fff"
        }), e.jsxs("g", {
            fillRule: "evenodd",
            children: [e.jsx("rect", {
                width: "100%",
                height: "33.33%",
                fill: "#FF202D"
            }), e.jsx("path", {
                fill: "#1895DB",
                d: "m10.67 5.33.66-.66.67.66v1.34h-1.33V5.33Zm2.66 0 .67-.66.67.66v1.34h-1.34V5.33Zm3.34-.66-.67.66v1.34h1.33V5.33l-.66-.66Z",
                opacity: ".5"
            }), e.jsx("path", {
                fill: "#191F94",
                d: "m12.67 4.67-.67.66v1.34h1.33V5.33l-.66-.66Zm2.66 0-.66.66v1.34H16V5.33l-.67-.66Z",
                opacity: ".5"
            }), e.jsx("rect", {
                y: "66.66%",
                width: "100%",
                height: "33.33%",
                fill: "#2027AC"
            }), e.jsx("path", {
                fill: "#FD0D1B",
                d: "M12 6.67h-.67L10.67 8H12v1.33h-1.33v1.34H12V12h-1.33v1.33H12v1.34h1.33v-1.34h1.34v1.34H16v-1.34h1.33V12H16v-1.33h1.33V9.33H16V8h1.33l-.66-1.33H16V8h-1.33V6.67h-1.34V8H12V6.67Zm1.33 2.66V8h1.34v1.33h-1.34Zm0 1.34V9.33H12v1.34h1.33Zm1.34 0h-1.34V12H12v1.33h1.33V12h1.34v1.33H16V12h-1.33v-1.33Zm0 0H16V9.33h-1.33v1.34Z"
            })]
        })]
    }),
    sq: e.jsxs("svg", {
        viewBox: "0 0 28 20",
        xmlns: "http://www.w3.org/2000/svg",
        children: [e.jsx("path", {
            fill: "#EE343C",
            d: "M0 0h28v20H0z"
        }), e.jsx("path", {
            fill: "#262626",
            d: "M12.39 4.39a.67.67 0 0 0-.84-.09l-.6.4a.67.67 0 0 0 .08 1.15l1.27.63c.22.12.37.35.37.6v.25c0 .37-.3.67-.67.67h-.5c-.11 0-.21-.02-.3-.07L9.1 6.88a.67.67 0 0 0-.77.13l-.34.34a.67.67 0 0 0 .17 1.06l.94.48c.4.2.44.75.07 1-.43.29-.3.95.2 1.05l.57.11c.54.11.7.8.25 1.14l-.5.37a.43.43 0 0 0 .36.76l1.26-.31c.48-.12.86.4.58.82-.24.36.02.84.45.84h.58c.25 0 .47.15.54.38.17.52.9.52 1.08 0 .07-.23.3-.38.54-.38h.58c.43 0 .69-.48.45-.84a.54.54 0 0 1 .58-.82l1.26.31.1.01c.41 0 .59-.52.26-.77l-.5-.37a.64.64 0 0 1 .25-1.14l.56-.1c.51-.11.64-.77.21-1.06a.58.58 0 0 1 .07-1l.94-.48c.4-.2.5-.74.17-1.06L19.67 7a.67.67 0 0 0-.77-.13l-2.1 1.05c-.09.05-.19.07-.3.07H16a.67.67 0 0 1-.67-.67v-.25c0-.25.15-.48.37-.6l1.27-.63c.46-.23.5-.87.07-1.15l-.59-.4a.67.67 0 0 0-.84.09l-1.14 1.14a.67.67 0 0 1-.94 0l-1.14-1.14Z"
        })]
    }),
    sr: e.jsxs("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 28 20",
        children: [e.jsx("rect", {
            width: "27.5",
            height: "19.5",
            x: ".25",
            y: ".25",
            fill: "#fff",
            stroke: "#F5F5F5",
            strokeWidth: ".5",
            rx: "1.75"
        }), e.jsxs("g", {
            children: [e.jsx("path", {
                fill: "#17508F",
                fillRule: "evenodd",
                d: "M0 13.33h28V6.66H0v6.67Z",
                clipRule: "evenodd"
            }), e.jsx("path", {
                fill: "#E1444D",
                fillRule: "evenodd",
                d: "M0 6.67h28V0H0v6.67Z",
                clipRule: "evenodd"
            }), e.jsx("path", {
                fill: "red",
                fillRule: "evenodd",
                d: "M6 10c0-.65.34-2.08.54-2.84.07-.3.33-.5.64-.5h2.98c.3 0 .56.2.64.5.19.75.53 2.18.53 2.84 0 .74-.5 2.7-.63 3.2a.57.57 0 0 1-.11.23c-.26.31-1.1 1.23-1.92 1.23-.84 0-1.67-.92-1.92-1.23a.57.57 0 0 1-.12-.22A19.7 19.7 0 0 1 6 10Z",
                clipRule: "evenodd"
            }), e.jsx("mask", {
                id: "lang-sr-mask1",
                width: "6",
                height: "9",
                x: "6",
                y: "6",
                maskUnits: "userSpaceOnUse",
                children: e.jsx("path", {
                    fill: "#fff",
                    fillRule: "evenodd",
                    d: "M6 10c0-.65.34-2.08.54-2.84.07-.3.33-.5.64-.5h2.98c.3 0 .56.2.64.5.19.75.53 2.18.53 2.84 0 .74-.5 2.7-.63 3.2a.57.57 0 0 1-.11.23c-.26.31-1.1 1.23-1.92 1.23-.84 0-1.67-.92-1.92-1.23a.57.57 0 0 1-.12-.22A19.7 19.7 0 0 1 6 10Z",
                    clipRule: "evenodd"
                })
            }), e.jsx("g", {
                stroke: "#fff",
                strokeLinecap: "square",
                strokeWidth: "1.33",
                mask: "url(#lang-sr-mask1)",
                children: e.jsx("path", {
                    d: "M11.33 7.33 6 14M6 7.33 11.33 14"
                })
            })]
        })]
    }),
    he: e.jsxs("svg", {
        viewBox: "0 0 28 20",
        children: [e.jsx("rect", {
            width: "100%",
            height: "100%",
            fill: "white",
            stroke: "#F5F5F5",
            strokeWidth: "0.5"
        }), e.jsx("path", {
            d: "M0 4H28V0H0V4Z",
            fill: "#0E46D4"
        }), e.jsx("path", {
            d: "M0 20H28V16H0V20Z",
            fill: "#0E46D4"
        }), e.jsx("path", {
            d: "M10.3752 11.8381L10.1001 12.3333L10.6666 12.3333L17.3333 12.3333L17.8998 12.3333L17.6247 11.8381L14.2913 5.8381L13.9999 5.31361L13.7085 5.8381L10.3752 11.8381Z",
            fill: "none",
            stroke: "#093EC5",
            strokeWidth: "0.666667"
        }), e.jsx("path", {
            d: "M10.3752 8.1619L10.1001 7.66668L10.6666 7.66668L17.3333 7.66668L17.8998 7.66668L17.6247 8.1619L14.2913 14.1619L13.9999 14.6864L13.7085 14.1619L10.3752 8.1619Z",
            fill: "none",
            stroke: "#093EC5",
            strokeWidth: "0.666667"
        })]
    }),
    "sr-en": e.jsxs("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 28 20",
        children: [e.jsx("rect", {
            width: "27.5",
            height: "19.5",
            x: ".25",
            y: ".25",
            fill: "#fff",
            stroke: "#F5F5F5",
            strokeWidth: ".5",
            rx: "1.75"
        }), e.jsxs("g", {
            children: [e.jsx("path", {
                fill: "#17508F",
                fillRule: "evenodd",
                d: "M0 13.33h28V6.66H0v6.67Z",
                clipRule: "evenodd"
            }), e.jsx("path", {
                fill: "#E1444D",
                fillRule: "evenodd",
                d: "M0 6.67h28V0H0v6.67Z",
                clipRule: "evenodd"
            }), e.jsx("path", {
                fill: "red",
                fillRule: "evenodd",
                d: "M6 10c0-.65.34-2.08.54-2.84.07-.3.33-.5.64-.5h2.98c.3 0 .56.2.64.5.19.75.53 2.18.53 2.84 0 .74-.5 2.7-.63 3.2a.57.57 0 0 1-.11.23c-.26.31-1.1 1.23-1.92 1.23-.84 0-1.67-.92-1.92-1.23a.57.57 0 0 1-.12-.22A19.7 19.7 0 0 1 6 10Z",
                clipRule: "evenodd"
            }), e.jsx("mask", {
                id: "lang-sr-mask1",
                width: "6",
                height: "9",
                x: "6",
                y: "6",
                maskUnits: "userSpaceOnUse",
                children: e.jsx("path", {
                    fill: "#fff",
                    fillRule: "evenodd",
                    d: "M6 10c0-.65.34-2.08.54-2.84.07-.3.33-.5.64-.5h2.98c.3 0 .56.2.64.5.19.75.53 2.18.53 2.84 0 .74-.5 2.7-.63 3.2a.57.57 0 0 1-.11.23c-.26.31-1.1 1.23-1.92 1.23-.84 0-1.67-.92-1.92-1.23a.57.57 0 0 1-.12-.22A19.7 19.7 0 0 1 6 10Z",
                    clipRule: "evenodd"
                })
            }), e.jsx("g", {
                stroke: "#fff",
                strokeLinecap: "square",
                strokeWidth: "1.33",
                mask: "url(#lang-sr-mask1)",
                children: e.jsx("path", {
                    d: "M11.33 7.33 6 14M6 7.33 11.33 14"
                })
            })]
        })]
    }),
    el: e.jsxs("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 28 20",
        children: [e.jsx("rect", {
            width: "27.5",
            height: "19.5",
            x: ".25",
            y: ".25",
            fill: "#fff",
            stroke: "#fff",
            strokeWidth: ".5"
        }), e.jsx("path", {
            fill: "#1c6dc1",
            d: "M5.33 0H0v5.33h5.33V0Zm8 0H8v5.33h5.33V8H8v5.33h20v-2.66H13.33V8H28V5.33H13.33V2.67H28V0H13.33ZM28 16H0v2.67h28V16ZM5.33 8H0v5.33h5.33V8Z"
        })]
    }),
    zh: e.jsxs("svg", {
        viewBox: "0 0 28 20",
        children: [e.jsx("rect", {
            width: "100%",
            height: "100%",
            fill: "#F1361D"
        }), e.jsx("path", {
            fill: "#FFDC42",
            d: "m10.07 3.1.97.17.73.66.16-.97.66-.73-.96-.16-.73-.66-.17.96-.66.73Zm2.6 3.39.84-.51.98.02-.51-.84.02-.98-.84.5-.98-.01.51.84-.02.98Zm-1.14 5.48-.82.54-.01-.98-.54-.82.98-.01.82-.54.01.98.54.82-.98.01Zm.71-2.54.98-.1.88.43-.11-.98.44-.88-.98.11-.88-.44.1.98-.43.88ZM6.67 8.23 4.32 9.9l.86-2.75-2.32-1.72 2.89-.03.92-2.73.91 2.73 2.9.03-2.33 1.72.87 2.75-2.35-1.67Z"
        })]
    }),
    ru: e.jsxs("svg", {
        viewBox: "0 0 28 20",
        children: [e.jsx("rect", {
            height: "33.33%",
            width: "100%",
            fill: "white"
        }), e.jsx("rect", {
            y: "33.33%",
            height: "33.33%",
            width: "100%",
            fill: "#0C47B7"
        }), e.jsx("rect", {
            y: "66.66%",
            height: "33.33%",
            width: "100%",
            fill: "#E53B35"
        })]
    }),
    ro: e.jsxs("svg", {
        viewBox: "0 0 28 20",
        children: [e.jsx("rect", {
            width: "33.33%",
            height: "100%",
            fill: "#083780"
        }), e.jsx("rect", {
            x: "33.33%",
            width: "33.33%",
            height: "100%",
            fill: "#FFD147"
        }), e.jsx("rect", {
            x: "66.66%",
            width: "33.33%",
            height: "100%",
            fill: "#DE1D42"
        })]
    }),
    uk: e.jsxs("svg", {
        viewBox: "0 0 28 20",
        xmlns: "http://www.w3.org/2000/svg",
        children: [e.jsx("rect", {
            width: "100%",
            height: "50%",
            fill: "#0066CC"
        }), e.jsx("rect", {
            y: "50%",
            width: "100%",
            height: "50%",
            fill: "#FFCC00"
        })]
    }),
    fr: e.jsxs("svg", {
        viewBox: "0 0 28 20",
        xmlns: "http://www.w3.org/2000/svg",
        children: [e.jsx("rect", {
            x: "0",
            width: "33.33%",
            height: "100%",
            fill: "#0055A4"
        }), e.jsx("rect", {
            x: "33.33%",
            width: "33.33%",
            height: "100%",
            fill: "white"
        }), e.jsx("rect", {
            x: "66.66%",
            width: "33.33%",
            height: "100%",
            fill: "#EF4135"
        })]
    }),
    ar: e.jsxs("svg", {
        viewBox: "0 0 28 20",
        xmlns: "http://www.w3.org/2000/svg",
        children: [e.jsx("rect", {
            width: "100%",
            height: "100%",
            fill: "rgba(25, 191, 191, 1)",
            strokeWidth: "0.5"
        }), e.jsx("circle", {
            cx: "50%",
            cy: "50%",
            r: "7",
            fill: "none",
            stroke: "white",
            strokeWidth: "1.25"
        }), e.jsx("ellipse", {
            cx: "50%",
            cy: "50%",
            fill: "none",
            rx: "2.5",
            ry: "7",
            stroke: "white",
            strokeWidth: "1.25"
        }), e.jsx("line", {
            x1: "25%",
            x2: "75%",
            y1: "50%",
            y2: "50%",
            stroke: "white",
            strokeWidth: "1.25"
        })]
    }),
    pl: e.jsxs("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 28 20",
        children: [e.jsx("rect", {
            width: "28",
            height: "10",
            fill: "#F5F5F5"
        }), e.jsx("rect", {
            width: "28",
            height: "10",
            y: "10",
            fill: "#DC143C"
        })]
    })
};

function Ke({
    className: t
}) {
    const {
        intl: s
    } = pe(), {
        openDialog: o
    } = z(), a = me(), r = s.locale;
    l.useEffect(() => {
        s.locale = localStorage.getItem("locale") ? ? "en"
    }, [s]);
    const n = () => {
        o(e.jsx(_a, {}))
    };
    return a ? e.jsxs("button", {
        className: x("flex flex-center gap-2 text-slate-gray uppercase", t),
        onClick: n,
        type: "button",
        children: [e.jsx("div", {
            className: "flex h-[1.3em] w-[1.3em] justify-center rounded-sm",
            children: pt[r]
        }), e.jsx("span", {
            className: "text-base",
            children: dt[r].name
        }), e.jsx("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: "7",
            height: "7",
            fill: "none",
            viewBox: "0 0 7 7",
            children: e.jsx("path", {
                className: "fill-slate-gray",
                d: "M4.366 6a1 1 0 0 1-1.732 0L.469 2.25a1 1 0 0 1 .866-1.5h4.33a1 1 0 0 1 .866 1.5L4.366 6Z"
            })
        })]
    }) : e.jsx(O, {
        onClick: n,
        className: x(t),
        type: "primary",
        children: e.jsxs("div", {
            className: "flex flex-center gap-2 text-slate-gray",
            children: [e.jsx("div", {
                className: "flex h-[1.25em] w-[1.2em] shrink-0 justify-center overflow-hidden rounded-full border-2 border-slate-gray",
                children: pt[r]
            }), e.jsx("span", {
                className: "button--label text-md",
                children: dt[r].name
            })]
        })
    })
}

function ba({
    error: t
}) {
    const {
        $t: s
    } = w();
    return e.jsxs("div", {
        className: "absolute inset-0 flex-center mobile:flex-col gap-5 px-5 lg:gap-10",
        children: [e.jsx("div", {
            className: "flex-center text-[9rem] text-white lg:text-[16rem]",
            children: e.jsx(J, {
                name: "gamepadSolid"
            })
        }), e.jsxs("div", {
            className: "flex max-w-[30rem] flex-col items-center lg:items-start",
            children: [t != null && t.code ? e.jsx("h1", {
                className: "font-bold text-6xl",
                children: t.code
            }) : e.jsx("h1", {
                className: "font-bold text-4xl",
                children: s({
                    id: "qDwvZ4",
                    defaultMessage: [{
                        type: 0,
                        value: "Unknown error"
                    }]
                })
            }), e.jsx("p", {
                className: "my-5 mobile:text-center text-sm lg:text-lg",
                children: s({
                    id: "kmTees",
                    defaultMessage: [{
                        type: 0,
                        value: "Sorry! Games are temporarily unavailable! Technical work is underway! We will fix everything soon."
                    }]
                })
            }), e.jsx(O, {
                type: "primary",
                onClick: () => window.location.reload(),
                children: s({
                    id: "RtfJfe",
                    defaultMessage: [{
                        type: 0,
                        value: "Reload page"
                    }]
                })
            }), e.jsx("hr", {
                className: "my-5 w-full text-shark dark:text-silver"
            }), e.jsx("div", {
                className: "flex w-full items-center justify-between",
                children: e.jsx(Ke, {})
            })]
        })]
    })
}
const Qe = ys()({
    component: Ea,
    onError: console.error,
    errorComponent: ({
        error: t
    }) => e.jsx(A1, {
        children: e.jsx(ba, {
            error: t
        })
    }),
    notFoundComponent: () => e.jsx(ws, {
        to: "/",
        replace: !0
    }),
    validateSearch: t => ({
        modal: t.modal,
        cid: t.cid,
        pid: t.pid,
        game: t.game,
        redirect: t.redirect
    })
});

function Ea() {
    return e.jsxs(A1, {
        children: [e.jsx("div", {
            id: "message-container"
        }), e.jsx(d1, {}), e.jsx(_s, {
            buttonPosition: "bottom-right"
        })]
    })
}

function Ma({
    className: t
}) {
    const s = Ve(),
        [o, a] = l.useState(""),
        [r, n] = l.useState(""),
        [i, c] = l.useState(""),
        {
            $t: d
        } = w(),
        {
            formatMessage: p
        } = _e(),
        {
            mutate: f,
            isPending: u
        } = V.useLogIn();

    function m(C) {
        C.preventDefault(), a("");
        const y = new FormData(C.currentTarget);
        j(y) && h(y)
    }

    function h(C) {
        f({
            login: C.get("login"),
            password: C.get("password")
        }, {
            onSuccess: v
        })
    }

    function v(C) {
        const y = C.error;
        if (y) {
            const _ = p(new le(y.message, {
                code: y.code
            }));
            a(_)
        }
        s.invalidate()
    }

    function j(C) {
        return C.has("login") && C.has("password")
    }
    return u ? e.jsx(Be, {}) : e.jsxs("form", {
        className: t,
        onSubmit: m,
        children: [e.jsx(Dt, {
            className: "desktop:min-w-[18.75rem]",
            onChange: C => n(C.target.value),
            type: "text",
            name: "login",
            placeholder: d({
                id: "AyGauy",
                defaultMessage: [{
                    type: 0,
                    value: "Login"
                }]
            }),
            autoComplete: "username",
            autoCapitalize: "off",
            minLength: 3,
            autoFocus: !0,
            required: !0,
            defaultValue: r
        }), e.jsx(Dt, {
            onChange: C => c(C.target.value),
            className: "mt-5 desktop:min-w-[18.75rem]",
            type: "password",
            name: "password",
            placeholder: d({
                id: "5sg7KC",
                defaultMessage: [{
                    type: 0,
                    value: "Password"
                }]
            }),
            autoComplete: "current-password",
            minLength: 6,
            defaultValue: i,
            required: !0
        }), o && e.jsx("div", {
            className: "mt-3 text-center text-falu-red text-sm",
            children: o
        }), e.jsx("div", {
            className: "mt-3",
            children: e.jsx(O, {
                className: "mx-auto min-w-[10rem]",
                type: "primary",
                htmlType: "submit",
                children: e.jsx("span", {
                    className: "font-oswald text-2xl text-white",
                    children: d({
                        id: "r2Jjms",
                        defaultMessage: [{
                            type: 0,
                            value: "Log In"
                        }]
                    })
                })
            })
        })]
    })
}

function Na() {
    return e.jsx(e.Fragment, {
        children: e.jsxs("div", {
            className: "relative flex h-[100dvh] flex-col",
            children: [e.jsx("div", {
                className: "flex-1 flex-center overflow-y-auto mobile:px-10",
                children: e.jsxs("div", {
                    className: "h-fit desktop:min-w-80",
                    children: [e.jsx(Ze, {
                        className: "mx-auto h-13 w-fit"
                    }), e.jsx(Ma, {
                        className: "mt-13 flex flex-center flex-col mobile:landscape:mt-5"
                    })]
                })
            }), e.jsx("div", {
                className: "border-[#4D4D4D] border-t-1 p-2.5",
                children: e.jsx(Ke, {
                    className: "max-w-40"
                })
            })]
        })
    })
}
async function Fa() {
    if (await bt()) return D.ensureQueryData({
        queryKey: ["FortuneWheel.getSettings"],
        queryFn: () => E.send({
            endpoint: "FortuneWheel.getSettings"
        })
    })
}

function _t() {
    return D.ensureQueryData({
        queryKey: ["Lobby.getCurrent"],
        queryFn: () => E.send({
            endpoint: "Lobby.getCurrent"
        })
    })
}

function Ye() {
    const t = localStorage.getItem("locale") ? ? "en";
    return D.ensureQueryData({
        queryKey: ["Game.getCategoriesList", t],
        queryFn: () => E.send({
            endpoint: "Game.getCategoriesList",
            params: {
                lang: t
            }
        })
    })
}

function Z1() {
    return D.ensureQueryData({
        queryKey: ["Game.getList"],
        queryFn: () => E.send({
            endpoint: "Game.getList"
        })
    })
}

function Aa() {
    return D.ensureQueryData({
        queryKey: ["Game.getProvidersList"],
        queryFn: async () => E.send({
            endpoint: "Game.getProvidersList"
        })
    })
}

function Sa() {
    return D.ensureQueryData({
        queryKey: ["Game.getRecommendations"],
        queryFn: () => E.send({
            endpoint: "Game.getRecommendations"
        })
    })
}
async function bt() {
    return !!(await D.ensureQueryData({
        queryKey: ["Player.getCurrent"],
        queryFn: () => E.send({
            endpoint: "Player.getCurrent",
            params: {
                isActive: "true"
            }
        })
    })).result
}
async function Oa(t) {
    if (await bt()) throw xe({
        to: t
    })
}
async function B1() {
    if (!await bt()) throw xe({
        to: "/sign-in",
        replace: !0
    })
}
async function Za() {
    var o, a;
    if (!!!((a = (o = (await D.ensureQueryData({
            queryKey: ["Lobby.getCurrent"],
            queryFn: () => E.send({
                endpoint: "Lobby.getCurrent"
            })
        })).result) == null ? void 0 : o.fortuneWheel) != null && a.isActive)) throw xe({
        to: "/",
        replace: !0
    })
}
async function Ba() {
    var a;
    const o = (((a = (await Ye()).result) == null ? void 0 : a.data) ? ? []).find(({
        tag: r
    }) => r === "header");
    if (o) switch (o.actionType) {
        case "game":
            throw xe({
                to: "/game/$gameId",
                params: {
                    gameId: o.actionData
                }
            });
        case "category":
            throw xe({
                to: "/casino",
                search: {
                    cid: o.id
                }
            });
        default:
            throw xe({
                to: "/casino"
            })
    } else throw xe({
        to: "/casino"
    })
}
const ka = we("/sign-in")({
        component: Na,
        onError: console.error,
        beforeLoad: async () => {
            await Oa("/")
        },
        loader: () => Promise.all([_t()])
    }),
    La = we("/_auth")({
        beforeLoad: () => B1(),
        loader: () => _t(),
        component: () => {
            const t = ie(),
                s = Ve();
            return l.useEffect(() => {
                const o = new AbortController;
                return window.addEventListener("api:unauthorized", () => {
                    t.setQueryData(["Player.getCurrent"], {}), s.invalidate(), t.invalidateQueries(), window.dispatchEvent(new Event("player:logout"))
                }, {
                    signal: o.signal
                }), () => o.abort()
            }, [t, s]), e.jsx(d1, {})
        }
    }),
    Ra = we("/")({
        beforeLoad: async () => (await B1(), Ba()),
        onError: console.error
    }),
    Pe = 768,
    S = Pe / 2,
    Ha = Pe * .84,
    Fe = Ha / 2,
    za = 3,
    Gt = 3,
    Ua = 3,
    It = ["#4ADBFF", "#EE0000", "#00FF09", "#FFEE2E", "#F58F00", "#FF23B0"],
    Tt = [
        ["#007ecb", "#005b95"],
        ["#495165", "#262c35"],
        ["#11b6ab", "#09726b"],
        ["#e88d23", "#cd6e00"],
        ["#7052dd", "#5038a6"],
        ["#ff385c", "#992237"]
    ],
    k1 = Math.PI / 180;

function L1(t, s, o) {
    return t + s * Math.cos(o * k1)
}

function R1(t, s, o) {
    return t + s * Math.sin(o * k1)
}

function Pt(t, s, o) {
    return `${L1(t,s,o)} ${R1(t,s,o)}`
}

function Da(t) {
    return 2 * Math.PI * t
}

function H1(t) {
    return 360 / t
}

function Va(t, s) {
    const o = H1(t);
    return (t - s) * o + za * 360
}

function Ga(t, s) {
    return t ** 2 / (2 * s)
}

function Ia(t, s, o) {
    return t * s - .5 * o * s ** 2
}

function $t(t, s, o, a = 0) {
    const r = o / 2;
    return `M${t} ${t-a*r} L${Pt(t+a,s+a,-r-90)} A${s} ${s} 0 0 1 ${Pt(t-a,s-a,r-90)} Z`
}

function Ta(t) {
    return It[t % It.length]
}

function Pa(t) {
    return Tt[t % Tt.length]
}

function $a(t, s) {
    return s ? t.findIndex(o => s === o.id) : -1
}

function z1({
    error: t,
    onOk: s
}) {
    const {
        $t: o
    } = w(), a = Se(), r = Oe(), {
        formatMessage: n
    } = _e(), i = (t == null ? void 0 : t.details) ? ? {}, c = Object.entries(i).filter(([d]) => d !== "playerId" && d !== "hallId");
    return e.jsx(oe, {
        children: e.jsx("div", {
            className: "flex-center p-2",
            children: e.jsxs("div", {
                className: "relative mobile:w-auto w-[37.25rem] overflow-hidden rounded-[0.3125rem] bg-[#8F1303] p-0.5",
                children: [e.jsx("div", {
                    className: x("btn-flickering top-left")
                }), e.jsx("div", {
                    className: x("btn-flickering bottom-right")
                }), e.jsxs("div", {
                    className: "relative z-10 flex flex-col rounded-[0.3125rem] bg-black px-10 py-5 [box-shadow:inset_0_0_30px_0_#530606]",
                    children: [e.jsxs("div", {
                        className: "flex items-center",
                        children: [e.jsx("svg", {
                            className: "me-3 inline-block shrink-0",
                            width: "41",
                            height: "41",
                            viewBox: "0 0 41 41",
                            fill: "none",
                            xmlns: "http://www.w3.org/2000/svg",
                            children: e.jsx("path", {
                                "fill-rule": "evenodd",
                                "clip-rule": "evenodd",
                                d: "M20.1133 40.5C9.0085 40.5 0 31.5482 0 20.5C0 9.45184 9.0085 0.5 20.1133 0.5C31.2181 0.5 40.2266 9.45184 40.2266 20.5C40.2266 31.5482 31.2181 40.5 20.1133 40.5ZM20.1133 4.70397C11.3428 4.70397 4.22663 11.7748 4.22663 20.5C4.22663 29.2252 11.3428 36.296 20.1133 36.296C28.8839 36.296 36 29.2252 36 20.5C36 11.7748 28.8839 4.70397 20.1133 4.70397ZM9.41643 16.9079H30.8102V24.2734H9.41643V16.9079Z",
                                fill: "white"
                            })
                        }), e.jsx("p", {
                            className: "font-bold text-lg uppercase tracking-[0.04em]",
                            children: o({
                                id: "ahYtFD",
                                defaultMessage: [{
                                    type: 0,
                                    value: "error"
                                }]
                            })
                        })]
                    }), e.jsxs("div", {
                        className: "pb-5",
                        children: [e.jsx("p", {
                            className: "whitespace-pre-wrap py-5 font-medium text-lg leading-6",
                            children: n(t)
                        }), c.length > 0 && e.jsx("ul", {
                            children: c.map(([d, p]) => p ? e.jsxs("li", {
                                className: "text-sm first-letter:capitalize",
                                children: [d, ": ", String(p)]
                            }, d) : null)
                        })]
                    }), e.jsxs("div", {
                        className: "mb-7.5 flex gap-5 whitespace-pre-wrap text-[#565464] text-sm",
                        children: [e.jsxs("div", {
                            className: "whitespace-nowrap",
                            children: [e.jsxs("div", {
                                children: [e.jsx("span", {
                                    children: "P:"
                                }), " ", i.playerId ? ? "N/A"]
                            }), e.jsxs("div", {
                                children: [e.jsx("span", {
                                    children: "H:"
                                }), " ", i.hallId ? ? "N/A"]
                            })]
                        }), e.jsxs("div", {
                            className: "grid grid-cols-[auto_auto] gap-x-1",
                            children: [e.jsx("span", {
                                children: "Local time:"
                            }), e.jsx("span", {
                                children: a
                            }), e.jsx("span", {
                                children: "UTC time:"
                            }), e.jsx("span", {
                                children: r
                            })]
                        })]
                    }), e.jsx(O, {
                        type: "secondary",
                        className: "min-w-[6.25rem] self-center",
                        onClick: s,
                        children: e.jsx("div", {
                            className: "uppercase",
                            children: o({
                                id: "n7u7Wg",
                                defaultMessage: [{
                                    type: 0,
                                    value: "ok"
                                }]
                            })
                        })
                    })]
                })]
            })
        })
    })
}

function U1({
    error: t
}) {
    const {
        $t: s
    } = w(), {
        formatMessage: o
    } = _e(), a = Se(), r = Oe(), n = Wa(t), {
        message: i,
        details: c = {}
    } = n, d = qa(c), p = Object.entries(d).filter(([f]) => f !== "playerId" && f !== "hallId");
    return e.jsx(oe, {
        children: e.jsxs("div", {
            className: "relative z-10 flex flex-col rounded-[0.3125rem]",
            children: [e.jsxs("div", {
                className: "flex items-center",
                children: [e.jsx("svg", {
                    className: "me-3 inline-block shrink-0",
                    width: "41",
                    height: "41",
                    viewBox: "0 0 41 41",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    children: e.jsx("path", {
                        fillRule: "evenodd",
                        clipRule: "evenodd",
                        d: "M20.1133 40.5C9.0085 40.5 0 31.5482 0 20.5C0 9.45184 9.0085 0.5 20.1133 0.5C31.2181 0.5 40.2266 9.45184 40.2266 20.5C40.2266 31.5482 31.2181 40.5 20.1133 40.5ZM20.1133 4.70397C11.3428 4.70397 4.22663 11.7748 4.22663 20.5C4.22663 29.2252 11.3428 36.296 20.1133 36.296C28.8839 36.296 36 29.2252 36 20.5C36 11.7748 28.8839 4.70397 20.1133 4.70397ZM9.41643 16.9079H30.8102V24.2734H9.41643V16.9079Z",
                        fill: "white"
                    })
                }), e.jsx("p", {
                    className: "font-bold text-lg uppercase tracking-[0.04em]",
                    children: s({
                        id: "ahYtFD",
                        defaultMessage: [{
                            type: 0,
                            value: "error"
                        }]
                    })
                })]
            }), e.jsxs("div", {
                className: "pb-5",
                children: [e.jsx("p", {
                    className: "whitespace-pre-wrap py-5 font-medium text-lg leading-6",
                    children: o(i)
                }), p.length > 0 && e.jsx("ul", {
                    children: p.map(([f, u]) => u ? e.jsxs("li", {
                        className: "text-sm first-letter:capitalize",
                        children: [f, ": ", String(u)]
                    }, f) : null)
                })]
            }), e.jsxs("div", {
                className: "mb-7.5 flex gap-5 whitespace-pre-wrap text-[#565464] text-sm",
                children: [e.jsxs("div", {
                    className: "whitespace-nowrap",
                    children: [e.jsxs("div", {
                        children: [e.jsx("span", {
                            children: "P:"
                        }), " ", d.playerId ? ? "N/A"]
                    }), e.jsxs("div", {
                        children: [e.jsx("span", {
                            children: "H:"
                        }), " ", d.hallId ? ? "N/A"]
                    })]
                }), e.jsxs("div", {
                    className: "grid grid-cols-[auto_auto] gap-x-1",
                    children: [e.jsx("span", {
                        children: "Local time:"
                    }), e.jsx("span", {
                        children: a
                    }), e.jsx("span", {
                        children: "UTC time:"
                    }), e.jsx("span", {
                        children: r
                    })]
                })]
            })]
        })
    })
}

function Wa(t) {
    if (!t) return {
        message: "Unknown error"
    };
    if (typeof t == "object" && "error" in t) {
        const s = t;
        return {
            message: s.error.message ? ? "Unknown API error",
            details: s.error.details ? ? {}
        }
    }
    return t instanceof Error && "code" in t ? {
        message: t.message,
        details: {
            code: t.code
        }
    } : t instanceof Error ? {
        message: t.message
    } : {
        message: typeof t == "string" ? t : "Unexpected error"
    }
}

function qa(t) {
    const s = n => typeof n == "string" || typeof n == "number" ? String(n) : "N/A",
        {
            playerId: o,
            hallId: a,
            ...r
        } = t;
    return {
        playerId: s(o),
        hallId: s(a),
        ...Object.fromEntries(Object.entries(r).map(([n, i]) => [n, s(i)]))
    }
}
l.memo(function(s) {
    var r;
    const {
        data: o
    } = ae.useLobby(), a = We((r = o == null ? void 0 : o.fortuneWheel) == null ? void 0 : r.nextSpinTime);
    return e.jsx("text", {
        fontWeight: "bold",
        alignmentBaseline: "middle",
        className: "fill-white text-[3.125rem] tracking-tight [text-shadow:0_0.125rem_0.25rem_#000]",
        ...s,
        children: Ct(a)
    })
});

function Ka({
    fill: t,
    path: s,
    isWinSector: o,
    ...a
}) {
    return e.jsxs("g", { ...a,
        children: [e.jsx("path", {
            fill: t,
            d: s
        }), o && e.jsx("path", {
            fill: "#fff",
            fillOpacity: "0",
            d: s,
            children: e.jsx("animate", {
                attributeName: "fill-opacity",
                calcMode: "discrete",
                values: "0;0.25",
                dur: "1s",
                repeatCount: "indefinite"
            })
        })]
    })
}

function Qa() {
    return e.jsx("g", {
        children: e.jsxs("g", {
            transform: "translate(-90,-90)",
            children: [e.jsx("ellipse", {
                cx: "474",
                cy: "473.683",
                rx: "473.351",
                ry: "473.351",
                fill: "url(#paint0_radial_672_66924)"
            }), e.jsx("ellipse", {
                cx: "474",
                cy: "473.683",
                rx: "473.351",
                ry: "473.351",
                fill: "url(#paint1_radial_672_66924)"
            }), e.jsx("ellipse", {
                cx: "474",
                cy: "473.683",
                rx: "473.351",
                ry: "473.351",
                fill: "url(#paint2_radial_672_66924)"
            }), e.jsx("path", {
                "fill-rule": "evenodd",
                "clip-rule": "evenodd",
                d: "M474.5 97.3691C681.687 97.3691 849.631 265.313 849.631 472.5C849.631 679.687 681.687 847.63 474.5 847.63C267.313 847.63 99.3694 679.687 99.3694 472.5C99.3694 265.313 267.313 97.3691 474.5 97.3691Z",
                fill: "#FFEA94"
            }), e.jsx("path", {
                "fill-rule": "evenodd",
                "clip-rule": "evenodd",
                d: "M474.5 102.103C679.081 102.103 844.897 267.919 844.897 472.5C844.897 677.081 679.081 842.897 474.5 842.897C269.919 842.897 104.103 677.081 104.103 472.5C104.103 267.919 269.919 102.103 474.5 102.103Z",
                fill: "#C79C11"
            }), e.jsx("path", {
                "fill-rule": "evenodd",
                "clip-rule": "evenodd",
                d: "M474.5 102.103C679.081 102.103 844.897 267.919 844.897 472.5C844.897 677.081 679.081 842.897 474.5 842.897C269.919 842.897 104.103 677.081 104.103 472.5C104.103 267.919 269.919 102.103 474.5 102.103Z",
                fill: "url(#paint3_radial_672_66924)"
            }), e.jsx("path", {
                "fill-rule": "evenodd",
                "clip-rule": "evenodd",
                d: "M474.5 102.103C679.081 102.103 844.897 267.919 844.897 472.5C844.897 677.081 679.081 842.897 474.5 842.897C269.919 842.897 104.103 677.081 104.103 472.5C104.103 267.919 269.919 102.103 474.5 102.103Z",
                fill: "url(#paint4_radial_672_66924)"
            }), e.jsx("path", {
                "fill-rule": "evenodd",
                "clip-rule": "evenodd",
                d: "M474.5 102.103C679.081 102.103 844.897 267.919 844.897 472.5C844.897 677.081 679.081 842.897 474.5 842.897C269.919 842.897 104.103 677.081 104.103 472.5C104.103 267.919 269.919 102.103 474.5 102.103Z",
                fill: "url(#paint5_radial_672_66924)"
            }), e.jsx("path", {
                "fill-rule": "evenodd",
                "clip-rule": "evenodd",
                d: "M474.5 847.63C267.305 847.63 99.3694 679.695 99.3694 472.5C99.3694 265.304 267.305 97.3691 474.5 97.3691C681.695 97.3691 849.631 265.304 849.631 472.5C849.631 679.695 681.695 847.63 474.5 847.63ZM474.5 102.97C270.439 102.97 104.971 268.439 104.971 472.5C104.971 676.561 270.388 842.029 474.5 842.029C678.612 842.029 844.029 676.612 844.029 472.5C844.029 268.388 678.561 102.97 474.5 102.97ZM474.5 804.105C291.354 804.105 142.895 655.646 142.895 472.5C142.895 289.354 291.354 140.895 474.5 140.895C657.646 140.895 806.105 289.354 806.105 472.5C806.105 655.646 657.646 804.105 474.5 804.105ZM474.5 147.421C294.951 147.421 149.421 292.951 149.421 472.5C149.421 652.049 294.951 797.579 474.5 797.579C654.049 797.579 799.579 652.049 799.579 472.5C799.579 292.951 654.049 147.421 474.5 147.421Z",
                fill: "#F5C04C"
            }), e.jsx("path", {
                "fill-rule": "evenodd",
                "clip-rule": "evenodd",
                d: "M474.5 847.63C267.305 847.63 99.3694 679.695 99.3694 472.5C99.3694 265.304 267.305 97.3691 474.5 97.3691C681.695 97.3691 849.631 265.304 849.631 472.5C849.631 679.695 681.695 847.63 474.5 847.63ZM474.5 102.97C270.439 102.97 104.971 268.439 104.971 472.5C104.971 676.561 270.388 842.029 474.5 842.029C678.612 842.029 844.029 676.612 844.029 472.5C844.029 268.388 678.561 102.97 474.5 102.97ZM474.5 804.105C291.354 804.105 142.895 655.646 142.895 472.5C142.895 289.354 291.354 140.895 474.5 140.895C657.646 140.895 806.105 289.354 806.105 472.5C806.105 655.646 657.646 804.105 474.5 804.105ZM474.5 147.421C294.951 147.421 149.421 292.951 149.421 472.5C149.421 652.049 294.951 797.579 474.5 797.579C654.049 797.579 799.579 652.049 799.579 472.5C799.579 292.951 654.049 147.421 474.5 147.421Z",
                fill: "url(#paint6_linear_672_66924)"
            }), e.jsx("path", {
                "fill-rule": "evenodd",
                "clip-rule": "evenodd",
                d: "M474.5 847.63C267.305 847.63 99.3694 679.695 99.3694 472.5C99.3694 265.304 267.305 97.3691 474.5 97.3691C681.695 97.3691 849.631 265.304 849.631 472.5C849.631 679.695 681.695 847.63 474.5 847.63ZM474.5 102.97C270.439 102.97 104.971 268.439 104.971 472.5C104.971 676.561 270.388 842.029 474.5 842.029C678.612 842.029 844.029 676.612 844.029 472.5C844.029 268.388 678.561 102.97 474.5 102.97ZM474.5 804.105C291.354 804.105 142.895 655.646 142.895 472.5C142.895 289.354 291.354 140.895 474.5 140.895C657.646 140.895 806.105 289.354 806.105 472.5C806.105 655.646 657.646 804.105 474.5 804.105ZM474.5 147.421C294.951 147.421 149.421 292.951 149.421 472.5C149.421 652.049 294.951 797.579 474.5 797.579C654.049 797.579 799.579 652.049 799.579 472.5C799.579 292.951 654.049 147.421 474.5 147.421Z",
                fill: "url(#paint7_linear_672_66924)"
            }), e.jsx("path", {
                "fill-rule": "evenodd",
                "clip-rule": "evenodd",
                d: "M474.5 847.63C267.305 847.63 99.3694 679.695 99.3694 472.5C99.3694 265.304 267.305 97.3691 474.5 97.3691C681.695 97.3691 849.631 265.304 849.631 472.5C849.631 679.695 681.695 847.63 474.5 847.63ZM474.5 102.97C270.439 102.97 104.971 268.439 104.971 472.5C104.971 676.561 270.388 842.029 474.5 842.029C678.612 842.029 844.029 676.612 844.029 472.5C844.029 268.388 678.561 102.97 474.5 102.97ZM474.5 804.105C291.354 804.105 142.895 655.646 142.895 472.5C142.895 289.354 291.354 140.895 474.5 140.895C657.646 140.895 806.105 289.354 806.105 472.5C806.105 655.646 657.646 804.105 474.5 804.105ZM474.5 147.421C294.951 147.421 149.421 292.951 149.421 472.5C149.421 652.049 294.951 797.579 474.5 797.579C654.049 797.579 799.579 652.049 799.579 472.5C799.579 292.951 654.049 147.421 474.5 147.421Z",
                fill: "url(#paint8_linear_672_66924)"
            }), e.jsx("path", {
                "fill-rule": "evenodd",
                "clip-rule": "evenodd",
                d: "M474.5 847.63C267.305 847.63 99.3694 679.695 99.3694 472.5C99.3694 265.304 267.305 97.3691 474.5 97.3691C681.695 97.3691 849.631 265.304 849.631 472.5C849.631 679.695 681.695 847.63 474.5 847.63ZM474.5 147.421C294.951 147.421 149.421 292.951 149.421 472.5C149.421 652.049 294.951 797.579 474.5 797.579C654.049 797.579 799.579 652.049 799.579 472.5C799.579 292.951 654.049 147.421 474.5 147.421Z",
                fill: "url(#paint9_radial_672_66924)"
            }), e.jsx("ellipse", {
                cx: "23.6675",
                cy: "23.6676",
                rx: "23.6675",
                ry: "23.6676",
                transform: "matrix(1 0 0 -1 894.599 490.25)",
                fill: "url(#paint10_radial_672_66924)"
            }), e.jsx("circle", {
                cx: "11.8338",
                cy: "11.8338",
                r: "11.8338",
                transform: "matrix(1 0 0 -1 854.364 369.546)",
                fill: "url(#paint11_radial_672_66924)"
            }), e.jsx("ellipse", {
                cx: "20.1174",
                cy: "20.1174",
                rx: "20.1174",
                ry: "20.1174",
                transform: "matrix(1 0 0 -1 823.596 300.91)",
                fill: "url(#paint12_radial_672_66924)"
            }), e.jsx("ellipse", {
                cx: "5.91687",
                cy: "5.91689",
                rx: "5.91687",
                ry: "5.91689",
                transform: "matrix(1 0 0 -1 875.665 203.874)",
                fill: "url(#paint13_radial_672_66924)"
            }), e.jsx("ellipse", {
                cx: "23.6675",
                cy: "23.6675",
                rx: "23.6675",
                ry: "23.6675",
                transform: "matrix(1 0 0 -1 816.496 196.773)",
                fill: "url(#paint14_radial_672_66924)"
            }), e.jsx("ellipse", {
                cx: "16.5673",
                cy: "16.5673",
                rx: "16.5673",
                ry: "16.5673",
                transform: "matrix(1 0 0 -1 762.061 151.805)",
                fill: "url(#paint15_radial_672_66924)"
            }), e.jsx("ellipse", {
                cx: "11.8338",
                cy: "11.8338",
                rx: "11.8338",
                ry: "11.8338",
                transform: "matrix(1 0 0 -1 681.591 47.6675)",
                fill: "url(#paint16_radial_672_66924)"
            }), e.jsx("circle", {
                cx: "11.8338",
                cy: "11.8338",
                r: "11.8338",
                transform: "matrix(1 0 0 -1 291.077 109.203)",
                fill: "url(#paint17_radial_672_66924)"
            }), e.jsx("ellipse", {
                cx: "11.8338",
                cy: "11.8338",
                rx: "11.8338",
                ry: "11.8338",
                transform: "matrix(1 0 0 -1 172.739 113.937)",
                fill: "url(#paint18_radial_672_66924)"
            }), e.jsx("ellipse", {
                cx: "11.8338",
                cy: "11.8338",
                rx: "11.8338",
                ry: "11.8338",
                transform: "matrix(1 0 0 -1 87.5356 142.338)",
                fill: "url(#paint19_radial_672_66924)"
            }), e.jsx("circle", {
                cx: "29.5844",
                cy: "29.5844",
                r: "29.5844",
                transform: "matrix(1 0 0 -1 123.037 222.808)",
                fill: "url(#paint20_radial_672_66924)"
            }), e.jsx("ellipse", {
                cx: "23.6675",
                cy: "23.6675",
                rx: "23.6675",
                ry: "23.6675",
                transform: "matrix(1 0 0 -1 59.1345 305.644)",
                fill: "url(#paint21_radial_672_66924)"
            }), e.jsx("ellipse", {
                cx: "11.8338",
                cy: "11.8338",
                rx: "11.8338",
                ry: "11.8338",
                transform: "matrix(1 0 0 -1 26 483.15)",
                fill: "url(#paint22_radial_672_66924)"
            }), e.jsx("ellipse", {
                cx: "17.7507",
                cy: "17.7507",
                rx: "17.7507",
                ry: "17.7507",
                transform: "matrix(1 0 0 -1 66.2349 561.253)",
                fill: "url(#paint23_radial_672_66924)"
            }), e.jsx("ellipse", {
                cx: "5.91689",
                cy: "5.91687",
                rx: "5.91689",
                ry: "5.91687",
                transform: "matrix(1 0 0 -1 99.3694 632.256)",
                fill: "url(#paint24_radial_672_66924)"
            }), e.jsx("ellipse", {
                cx: "23.6675",
                cy: "23.6676",
                rx: "23.6675",
                ry: "23.6676",
                transform: "matrix(1 0 0 -1 123.037 726.926)",
                fill: "url(#paint25_radial_672_66924)"
            }), e.jsx("ellipse", {
                cx: "5.91689",
                cy: "5.91687",
                rx: "5.91689",
                ry: "5.91687",
                transform: "matrix(1 0 0 -1 293.443 939.934)",
                fill: "url(#paint26_radial_672_66924)"
            }), e.jsxs("defs", {
                children: [e.jsxs("radialGradient", {
                    id: "paint0_radial_672_66924",
                    cx: "0",
                    cy: "0",
                    r: "1",
                    gradientUnits: "userSpaceOnUse",
                    gradientTransform: "translate(474 473.683) rotate(90) scale(473.351 473.351)",
                    children: [e.jsx("stop", {
                        stopColor: "#FF0000"
                    }), e.jsx("stop", {
                        offset: "1",
                        stopColor: "#FF0000",
                        stopOpacity: "0"
                    })]
                }), e.jsxs("radialGradient", {
                    id: "paint1_radial_672_66924",
                    cx: "0",
                    cy: "0",
                    r: "1",
                    gradientUnits: "userSpaceOnUse",
                    gradientTransform: "translate(474 473.683) rotate(90) scale(473.351 473.351)",
                    children: [e.jsx("stop", {
                        offset: "0.8",
                        stopColor: "white"
                    }), e.jsx("stop", {
                        offset: "0.81",
                        stopColor: "#F7E033",
                        stopOpacity: "0.5"
                    }), e.jsx("stop", {
                        offset: "0.87",
                        stopColor: "#FF8800",
                        stopOpacity: "0.2"
                    }), e.jsx("stop", {
                        offset: "0.9",
                        stopColor: "#FF0000",
                        stopOpacity: "0.1"
                    }), e.jsx("stop", {
                        offset: "0.97",
                        stopColor: "#FF0000",
                        stopOpacity: "0"
                    })]
                }), e.jsxs("radialGradient", {
                    id: "paint2_radial_672_66924",
                    cx: "0",
                    cy: "0",
                    r: "1",
                    gradientUnits: "userSpaceOnUse",
                    gradientTransform: "translate(474 473.683) rotate(90) scale(473.351 473.351)",
                    children: [e.jsx("stop", {
                        offset: "0.81",
                        stopColor: "white"
                    }), e.jsx("stop", {
                        offset: "0.82",
                        stopColor: "#FFF28D",
                        stopOpacity: "0.4"
                    }), e.jsx("stop", {
                        offset: "0.84",
                        stopColor: "#FF8800",
                        stopOpacity: "0.1"
                    }), e.jsx("stop", {
                        offset: "0.9",
                        stopColor: "#FF0000",
                        stopOpacity: "0.03"
                    }), e.jsx("stop", {
                        offset: "0.97",
                        stopColor: "#FF0000",
                        stopOpacity: "0"
                    })]
                }), e.jsxs("radialGradient", {
                    id: "paint3_radial_672_66924",
                    cx: "0",
                    cy: "0",
                    r: "1",
                    gradientUnits: "userSpaceOnUse",
                    gradientTransform: "translate(474.5 472.5) rotate(90) scale(370.397)",
                    children: [e.jsx("stop", {
                        offset: "0.99",
                        stopColor: "white",
                        stopOpacity: "0"
                    }), e.jsx("stop", {
                        offset: "1",
                        stopColor: "white",
                        stopOpacity: "0.7"
                    })]
                }), e.jsxs("radialGradient", {
                    id: "paint4_radial_672_66924",
                    cx: "0",
                    cy: "0",
                    r: "1",
                    gradientUnits: "userSpaceOnUse",
                    gradientTransform: "translate(474.5 472.5) rotate(90) scale(370.397)",
                    children: [e.jsx("stop", {
                        offset: "0.87",
                        stopOpacity: "0.4"
                    }), e.jsx("stop", {
                        offset: "0.89",
                        stopColor: "#0A0A0A",
                        stopOpacity: "0.2"
                    }), e.jsx("stop", {
                        offset: "0.91",
                        stopColor: "#0F0F0F",
                        stopOpacity: "0"
                    }), e.jsx("stop", {
                        offset: "0.97",
                        stopOpacity: "0"
                    }), e.jsx("stop", {
                        offset: "0.98",
                        stopOpacity: "0.1"
                    }), e.jsx("stop", {
                        offset: "0.985",
                        stopOpacity: "0.4"
                    }), e.jsx("stop", {
                        offset: "1"
                    })]
                }), e.jsxs("radialGradient", {
                    id: "paint5_radial_672_66924",
                    cx: "0",
                    cy: "0",
                    r: "1",
                    gradientUnits: "userSpaceOnUse",
                    gradientTransform: "translate(474.5 472.5) rotate(90) scale(370.397)",
                    children: [e.jsx("stop", {
                        offset: "0.899795",
                        stopColor: "white",
                        stopOpacity: "0"
                    }), e.jsx("stop", {
                        offset: "0.915994",
                        stopColor: "white",
                        stopOpacity: "0.1"
                    }), e.jsx("stop", {
                        offset: "0.943401",
                        stopColor: "white",
                        stopOpacity: "0.6"
                    }), e.jsx("stop", {
                        offset: "0.970155",
                        stopColor: "white",
                        stopOpacity: "0.1"
                    }), e.jsx("stop", {
                        offset: "0.986124",
                        stopColor: "white",
                        stopOpacity: "0"
                    })]
                }), e.jsxs("linearGradient", {
                    id: "paint6_linear_672_66924",
                    x1: "758.129",
                    y1: "97.3692",
                    x2: "190.871",
                    y2: "847.63",
                    gradientUnits: "userSpaceOnUse",
                    children: [e.jsx("stop", {
                        offset: "0.44",
                        stopColor: "white",
                        stopOpacity: "0"
                    }), e.jsx("stop", {
                        offset: "0.52",
                        stopColor: "white"
                    }), e.jsx("stop", {
                        offset: "0.8",
                        stopColor: "white",
                        stopOpacity: "0"
                    })]
                }), e.jsxs("linearGradient", {
                    id: "paint7_linear_672_66924",
                    x1: "849.631",
                    y1: "486.569",
                    x2: "99.3694",
                    y2: "458.431",
                    gradientUnits: "userSpaceOnUse",
                    children: [e.jsx("stop", {
                        offset: "0.36",
                        stopColor: "white",
                        stopOpacity: "0"
                    }), e.jsx("stop", {
                        offset: "0.5",
                        stopColor: "white"
                    }), e.jsx("stop", {
                        offset: "0.54",
                        stopColor: "white",
                        stopOpacity: "0"
                    })]
                }), e.jsxs("linearGradient", {
                    id: "paint8_linear_672_66924",
                    x1: "625.009",
                    y1: "847.63",
                    x2: "323.991",
                    y2: "97.3692",
                    gradientUnits: "userSpaceOnUse",
                    children: [e.jsx("stop", {
                        offset: "0.49",
                        stopColor: "white",
                        stopOpacity: "0"
                    }), e.jsx("stop", {
                        offset: "0.5",
                        stopColor: "white"
                    }), e.jsx("stop", {
                        offset: "0.6",
                        stopColor: "white",
                        stopOpacity: "0"
                    })]
                }), e.jsxs("radialGradient", {
                    id: "paint9_radial_672_66924",
                    cx: "0",
                    cy: "0",
                    r: "1",
                    gradientUnits: "userSpaceOnUse",
                    gradientTransform: "translate(474.5 472.5) rotate(180) scale(375.131 375.131)",
                    children: [e.jsx("stop", {
                        offset: "0.94",
                        stopColor: "#FFCB00",
                        stopOpacity: "0"
                    }), e.jsx("stop", {
                        offset: "0.97",
                        stopColor: "#FFCF67",
                        stopOpacity: "0.8"
                    }), e.jsx("stop", {
                        offset: "1",
                        stopColor: "white",
                        stopOpacity: "0.99"
                    })]
                }), e.jsxs("radialGradient", {
                    id: "paint10_radial_672_66924",
                    cx: "0",
                    cy: "0",
                    r: "1",
                    gradientUnits: "userSpaceOnUse",
                    gradientTransform: "translate(23.6675 23.6676) rotate(90) scale(23.6676 23.6675)",
                    children: [e.jsx("stop", {
                        offset: "0.07",
                        stopColor: "white"
                    }), e.jsx("stop", {
                        offset: "0.1",
                        stopColor: "#FFF0B4"
                    }), e.jsx("stop", {
                        offset: "0.25",
                        stopColor: "#FFBB00",
                        stopOpacity: "0.49"
                    }), e.jsx("stop", {
                        offset: "0.44",
                        stopColor: "#FFBB00",
                        stopOpacity: "0.18"
                    }), e.jsx("stop", {
                        offset: "0.72",
                        stopColor: "#FFBB00",
                        stopOpacity: "0.04"
                    }), e.jsx("stop", {
                        offset: "1",
                        stopColor: "#FF8800",
                        stopOpacity: "0"
                    })]
                }), e.jsxs("radialGradient", {
                    id: "paint11_radial_672_66924",
                    cx: "0",
                    cy: "0",
                    r: "1",
                    gradientUnits: "userSpaceOnUse",
                    gradientTransform: "translate(11.8338 11.8338) rotate(90) scale(11.8338)",
                    children: [e.jsx("stop", {
                        offset: "0.07",
                        stopColor: "white"
                    }), e.jsx("stop", {
                        offset: "0.1",
                        stopColor: "#FFF0B4"
                    }), e.jsx("stop", {
                        offset: "0.25",
                        stopColor: "#FFBB00",
                        stopOpacity: "0.49"
                    }), e.jsx("stop", {
                        offset: "0.44",
                        stopColor: "#FFBB00",
                        stopOpacity: "0.18"
                    }), e.jsx("stop", {
                        offset: "0.72",
                        stopColor: "#FFBB00",
                        stopOpacity: "0.04"
                    }), e.jsx("stop", {
                        offset: "1",
                        stopColor: "#FF8800",
                        stopOpacity: "0"
                    })]
                }), e.jsxs("radialGradient", {
                    id: "paint12_radial_672_66924",
                    cx: "0",
                    cy: "0",
                    r: "1",
                    gradientUnits: "userSpaceOnUse",
                    gradientTransform: "translate(20.1174 20.1174) rotate(90) scale(20.1174 20.1174)",
                    children: [e.jsx("stop", {
                        offset: "0.07",
                        stopColor: "white"
                    }), e.jsx("stop", {
                        offset: "0.1",
                        stopColor: "#FFF0B4"
                    }), e.jsx("stop", {
                        offset: "0.25",
                        stopColor: "#FFBB00",
                        stopOpacity: "0.49"
                    }), e.jsx("stop", {
                        offset: "0.44",
                        stopColor: "#FFBB00",
                        stopOpacity: "0.18"
                    }), e.jsx("stop", {
                        offset: "0.72",
                        stopColor: "#FFBB00",
                        stopOpacity: "0.04"
                    }), e.jsx("stop", {
                        offset: "1",
                        stopColor: "#FF8800",
                        stopOpacity: "0"
                    })]
                }), e.jsxs("radialGradient", {
                    id: "paint13_radial_672_66924",
                    cx: "0",
                    cy: "0",
                    r: "1",
                    gradientUnits: "userSpaceOnUse",
                    gradientTransform: "translate(5.91687 5.91689) rotate(90) scale(5.91689 5.91687)",
                    children: [e.jsx("stop", {
                        offset: "0.07",
                        stopColor: "white"
                    }), e.jsx("stop", {
                        offset: "0.1",
                        stopColor: "#FFF0B4"
                    }), e.jsx("stop", {
                        offset: "0.25",
                        stopColor: "#FFBB00",
                        stopOpacity: "0.49"
                    }), e.jsx("stop", {
                        offset: "0.44",
                        stopColor: "#FFBB00",
                        stopOpacity: "0.18"
                    }), e.jsx("stop", {
                        offset: "0.72",
                        stopColor: "#FFBB00",
                        stopOpacity: "0.04"
                    }), e.jsx("stop", {
                        offset: "1",
                        stopColor: "#FF8800",
                        stopOpacity: "0"
                    })]
                }), e.jsxs("radialGradient", {
                    id: "paint14_radial_672_66924",
                    cx: "0",
                    cy: "0",
                    r: "1",
                    gradientUnits: "userSpaceOnUse",
                    gradientTransform: "translate(23.6675 23.6675) rotate(90) scale(23.6675 23.6675)",
                    children: [e.jsx("stop", {
                        offset: "0.07",
                        stopColor: "white"
                    }), e.jsx("stop", {
                        offset: "0.1",
                        stopColor: "#FFF0B4"
                    }), e.jsx("stop", {
                        offset: "0.25",
                        stopColor: "#FFBB00",
                        stopOpacity: "0.49"
                    }), e.jsx("stop", {
                        offset: "0.44",
                        stopColor: "#FFBB00",
                        stopOpacity: "0.18"
                    }), e.jsx("stop", {
                        offset: "0.72",
                        stopColor: "#FFBB00",
                        stopOpacity: "0.04"
                    }), e.jsx("stop", {
                        offset: "1",
                        stopColor: "#FF8800",
                        stopOpacity: "0"
                    })]
                }), e.jsxs("radialGradient", {
                    id: "paint15_radial_672_66924",
                    cx: "0",
                    cy: "0",
                    r: "1",
                    gradientUnits: "userSpaceOnUse",
                    gradientTransform: "translate(16.5673 16.5673) rotate(90) scale(16.5673 16.5673)",
                    children: [e.jsx("stop", {
                        offset: "0.07",
                        stopColor: "white"
                    }), e.jsx("stop", {
                        offset: "0.1",
                        stopColor: "#FFF0B4"
                    }), e.jsx("stop", {
                        offset: "0.25",
                        stopColor: "#FFBB00",
                        stopOpacity: "0.49"
                    }), e.jsx("stop", {
                        offset: "0.44",
                        stopColor: "#FFBB00",
                        stopOpacity: "0.18"
                    }), e.jsx("stop", {
                        offset: "0.72",
                        stopColor: "#FFBB00",
                        stopOpacity: "0.04"
                    }), e.jsx("stop", {
                        offset: "1",
                        stopColor: "#FF8800",
                        stopOpacity: "0"
                    })]
                }), e.jsxs("radialGradient", {
                    id: "paint16_radial_672_66924",
                    cx: "0",
                    cy: "0",
                    r: "1",
                    gradientUnits: "userSpaceOnUse",
                    gradientTransform: "translate(11.8338 11.8338) rotate(90) scale(11.8338 11.8338)",
                    children: [e.jsx("stop", {
                        offset: "0.07",
                        stopColor: "white"
                    }), e.jsx("stop", {
                        offset: "0.1",
                        stopColor: "#FFF0B4"
                    }), e.jsx("stop", {
                        offset: "0.25",
                        stopColor: "#FFBB00",
                        stopOpacity: "0.49"
                    }), e.jsx("stop", {
                        offset: "0.44",
                        stopColor: "#FFBB00",
                        stopOpacity: "0.18"
                    }), e.jsx("stop", {
                        offset: "0.72",
                        stopColor: "#FFBB00",
                        stopOpacity: "0.04"
                    }), e.jsx("stop", {
                        offset: "1",
                        stopColor: "#FF8800",
                        stopOpacity: "0"
                    })]
                }), e.jsxs("radialGradient", {
                    id: "paint17_radial_672_66924",
                    cx: "0",
                    cy: "0",
                    r: "1",
                    gradientUnits: "userSpaceOnUse",
                    gradientTransform: "translate(11.8338 11.8338) rotate(90) scale(11.8338)",
                    children: [e.jsx("stop", {
                        offset: "0.07",
                        stopColor: "white"
                    }), e.jsx("stop", {
                        offset: "0.1",
                        stopColor: "#FFF0B4"
                    }), e.jsx("stop", {
                        offset: "0.25",
                        stopColor: "#FFBB00",
                        stopOpacity: "0.49"
                    }), e.jsx("stop", {
                        offset: "0.44",
                        stopColor: "#FFBB00",
                        stopOpacity: "0.18"
                    }), e.jsx("stop", {
                        offset: "0.72",
                        stopColor: "#FFBB00",
                        stopOpacity: "0.04"
                    }), e.jsx("stop", {
                        offset: "1",
                        stopColor: "#FF8800",
                        stopOpacity: "0"
                    })]
                }), e.jsxs("radialGradient", {
                    id: "paint18_radial_672_66924",
                    cx: "0",
                    cy: "0",
                    r: "1",
                    gradientUnits: "userSpaceOnUse",
                    gradientTransform: "translate(11.8338 11.8338) rotate(90) scale(11.8338 11.8338)",
                    children: [e.jsx("stop", {
                        offset: "0.07",
                        stopColor: "white"
                    }), e.jsx("stop", {
                        offset: "0.1",
                        stopColor: "#FFF0B4"
                    }), e.jsx("stop", {
                        offset: "0.25",
                        stopColor: "#FFBB00",
                        stopOpacity: "0.49"
                    }), e.jsx("stop", {
                        offset: "0.44",
                        stopColor: "#FFBB00",
                        stopOpacity: "0.18"
                    }), e.jsx("stop", {
                        offset: "0.72",
                        stopColor: "#FFBB00",
                        stopOpacity: "0.04"
                    }), e.jsx("stop", {
                        offset: "1",
                        stopColor: "#FF8800",
                        stopOpacity: "0"
                    })]
                }), e.jsxs("radialGradient", {
                    id: "paint19_radial_672_66924",
                    cx: "0",
                    cy: "0",
                    r: "1",
                    gradientUnits: "userSpaceOnUse",
                    gradientTransform: "translate(11.8338 11.8338) rotate(90) scale(11.8338 11.8338)",
                    children: [e.jsx("stop", {
                        offset: "0.07",
                        stopColor: "white"
                    }), e.jsx("stop", {
                        offset: "0.1",
                        stopColor: "#FFF0B4"
                    }), e.jsx("stop", {
                        offset: "0.25",
                        stopColor: "#FFBB00",
                        stopOpacity: "0.49"
                    }), e.jsx("stop", {
                        offset: "0.44",
                        stopColor: "#FFBB00",
                        stopOpacity: "0.18"
                    }), e.jsx("stop", {
                        offset: "0.72",
                        stopColor: "#FFBB00",
                        stopOpacity: "0.04"
                    }), e.jsx("stop", {
                        offset: "1",
                        stopColor: "#FF8800",
                        stopOpacity: "0"
                    })]
                }), e.jsxs("radialGradient", {
                    id: "paint20_radial_672_66924",
                    cx: "0",
                    cy: "0",
                    r: "1",
                    gradientUnits: "userSpaceOnUse",
                    gradientTransform: "translate(29.5844 29.5844) rotate(90) scale(29.5844)",
                    children: [e.jsx("stop", {
                        offset: "0.07",
                        stopColor: "white"
                    }), e.jsx("stop", {
                        offset: "0.1",
                        stopColor: "#FFF0B4"
                    }), e.jsx("stop", {
                        offset: "0.25",
                        stopColor: "#FFBB00",
                        stopOpacity: "0.49"
                    }), e.jsx("stop", {
                        offset: "0.44",
                        stopColor: "#FFBB00",
                        stopOpacity: "0.18"
                    }), e.jsx("stop", {
                        offset: "0.72",
                        stopColor: "#FFBB00",
                        stopOpacity: "0.04"
                    }), e.jsx("stop", {
                        offset: "1",
                        stopColor: "#FF8800",
                        stopOpacity: "0"
                    })]
                }), e.jsxs("radialGradient", {
                    id: "paint21_radial_672_66924",
                    cx: "0",
                    cy: "0",
                    r: "1",
                    gradientUnits: "userSpaceOnUse",
                    gradientTransform: "translate(23.6675 23.6675) rotate(90) scale(23.6675 23.6675)",
                    children: [e.jsx("stop", {
                        offset: "0.07",
                        stopColor: "white"
                    }), e.jsx("stop", {
                        offset: "0.1",
                        stopColor: "#FFF0B4"
                    }), e.jsx("stop", {
                        offset: "0.25",
                        stopColor: "#FFBB00",
                        stopOpacity: "0.49"
                    }), e.jsx("stop", {
                        offset: "0.44",
                        stopColor: "#FFBB00",
                        stopOpacity: "0.18"
                    }), e.jsx("stop", {
                        offset: "0.72",
                        stopColor: "#FFBB00",
                        stopOpacity: "0.04"
                    }), e.jsx("stop", {
                        offset: "1",
                        stopColor: "#FF8800",
                        stopOpacity: "0"
                    })]
                }), e.jsxs("radialGradient", {
                    id: "paint22_radial_672_66924",
                    cx: "0",
                    cy: "0",
                    r: "1",
                    gradientUnits: "userSpaceOnUse",
                    gradientTransform: "translate(11.8338 11.8338) rotate(90) scale(11.8338 11.8338)",
                    children: [e.jsx("stop", {
                        offset: "0.07",
                        stopColor: "white"
                    }), e.jsx("stop", {
                        offset: "0.1",
                        stopColor: "#FFF0B4"
                    }), e.jsx("stop", {
                        offset: "0.25",
                        stopColor: "#FFBB00",
                        stopOpacity: "0.49"
                    }), e.jsx("stop", {
                        offset: "0.44",
                        stopColor: "#FFBB00",
                        stopOpacity: "0.18"
                    }), e.jsx("stop", {
                        offset: "0.72",
                        stopColor: "#FFBB00",
                        stopOpacity: "0.04"
                    }), e.jsx("stop", {
                        offset: "1",
                        stopColor: "#FF8800",
                        stopOpacity: "0"
                    })]
                }), e.jsxs("radialGradient", {
                    id: "paint23_radial_672_66924",
                    cx: "0",
                    cy: "0",
                    r: "1",
                    gradientUnits: "userSpaceOnUse",
                    gradientTransform: "translate(17.7507 17.7507) rotate(90) scale(17.7507 17.7507)",
                    children: [e.jsx("stop", {
                        offset: "0.07",
                        stopColor: "white"
                    }), e.jsx("stop", {
                        offset: "0.1",
                        stopColor: "#FFF0B4"
                    }), e.jsx("stop", {
                        offset: "0.25",
                        stopColor: "#FFBB00",
                        stopOpacity: "0.49"
                    }), e.jsx("stop", {
                        offset: "0.44",
                        stopColor: "#FFBB00",
                        stopOpacity: "0.18"
                    }), e.jsx("stop", {
                        offset: "0.72",
                        stopColor: "#FFBB00",
                        stopOpacity: "0.04"
                    }), e.jsx("stop", {
                        offset: "1",
                        stopColor: "#FF8800",
                        stopOpacity: "0"
                    })]
                }), e.jsxs("radialGradient", {
                    id: "paint24_radial_672_66924",
                    cx: "0",
                    cy: "0",
                    r: "1",
                    gradientUnits: "userSpaceOnUse",
                    gradientTransform: "translate(5.91689 5.91687) rotate(90) scale(5.91687 5.91689)",
                    children: [e.jsx("stop", {
                        offset: "0.07",
                        stopColor: "white"
                    }), e.jsx("stop", {
                        offset: "0.1",
                        stopColor: "#FFF0B4"
                    }), e.jsx("stop", {
                        offset: "0.25",
                        stopColor: "#FFBB00",
                        stopOpacity: "0.49"
                    }), e.jsx("stop", {
                        offset: "0.44",
                        stopColor: "#FFBB00",
                        stopOpacity: "0.18"
                    }), e.jsx("stop", {
                        offset: "0.72",
                        stopColor: "#FFBB00",
                        stopOpacity: "0.04"
                    }), e.jsx("stop", {
                        offset: "1",
                        stopColor: "#FF8800",
                        stopOpacity: "0"
                    })]
                }), e.jsxs("radialGradient", {
                    id: "paint25_radial_672_66924",
                    cx: "0",
                    cy: "0",
                    r: "1",
                    gradientUnits: "userSpaceOnUse",
                    gradientTransform: "translate(23.6675 23.6676) rotate(90) scale(23.6676 23.6675)",
                    children: [e.jsx("stop", {
                        offset: "0.07",
                        stopColor: "white"
                    }), e.jsx("stop", {
                        offset: "0.1",
                        stopColor: "#FFF0B4"
                    }), e.jsx("stop", {
                        offset: "0.25",
                        stopColor: "#FFBB00",
                        stopOpacity: "0.49"
                    }), e.jsx("stop", {
                        offset: "0.44",
                        stopColor: "#FFBB00",
                        stopOpacity: "0.18"
                    }), e.jsx("stop", {
                        offset: "0.72",
                        stopColor: "#FFBB00",
                        stopOpacity: "0.04"
                    }), e.jsx("stop", {
                        offset: "1",
                        stopColor: "#FF8800",
                        stopOpacity: "0"
                    })]
                }), e.jsxs("radialGradient", {
                    id: "paint26_radial_672_66924",
                    cx: "0",
                    cy: "0",
                    r: "1",
                    gradientUnits: "userSpaceOnUse",
                    gradientTransform: "translate(5.91689 5.91687) rotate(90) scale(5.91687 5.91689)",
                    children: [e.jsx("stop", {
                        offset: "0.07",
                        stopColor: "white"
                    }), e.jsx("stop", {
                        offset: "0.1",
                        stopColor: "#FFF0B4"
                    }), e.jsx("stop", {
                        offset: "0.25",
                        stopColor: "#FFBB00",
                        stopOpacity: "0.49"
                    }), e.jsx("stop", {
                        offset: "0.44",
                        stopColor: "#FFBB00",
                        stopOpacity: "0.18"
                    }), e.jsx("stop", {
                        offset: "0.72",
                        stopColor: "#FFBB00",
                        stopOpacity: "0.04"
                    }), e.jsx("stop", {
                        offset: "1",
                        stopColor: "#FF8800",
                        stopOpacity: "0"
                    })]
                })]
            })]
        })
    })
}

function Ya() {
    return e.jsxs("svg", {
        id: "outer-circle-diamond",
        viewBox: "0 0 47 47",
        children: [e.jsx("path", {
            fill: "#D8A61F",
            d: "m17.689 38.886-5.649-3.864-3.865-5.65-1.262-6.726 1.262-6.726 3.865-5.649 5.649-3.86 6.725-1.263L31.14 6.41l5.649 3.865 3.862 5.647 1.262 6.726-1.262 6.727-3.864 5.648-5.647 3.863-6.726 1.262-6.726-1.262Z"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m33.436 27.005-9.43-3.906h9.43v3.906Z",
            opacity: ".7"
        }), e.jsx("path", {
            fill: "#fff",
            d: "M38.363 23.111h3.608l-1.296 6.905-2.312-6.905Z",
            opacity: ".6"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m40.675 30.016-2.312-6.905-4.927 3.907 7.24 2.998Z",
            opacity: ".9"
        }), e.jsx("path", {
            fill: "#fff",
            d: "M38.363 23.1h-4.927v3.907l4.927-3.906Z",
            opacity: ".7"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m33.436 19.196-9.43 3.907h9.43v-3.907ZM38.363 23.11h3.608l-1.296-6.904-2.312 6.905Z",
            opacity: ".9"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m40.675 16.206-2.312 6.905-4.927-3.907 7.24-2.998Z",
            opacity: ".8"
        }), e.jsx("path", {
            fill: "#fff",
            d: "M38.363 23.103h-4.927v-3.907l4.927 3.907Z",
            opacity: ".51"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m14.465 19.217 9.43 3.906h-9.43v-3.906Z",
            opacity: ".7"
        }), e.jsx("path", {
            fill: "#fff",
            d: "M9.538 23.11H5.931l1.295-6.904 2.312 6.905Z",
            opacity: ".5"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m7.226 16.206 2.312 6.905 4.927-3.907-7.239-2.998Z",
            opacity: ".9"
        }), e.jsx("path", {
            fill: "#fff",
            d: "M9.538 23.121h4.927v-3.906L9.538 23.12Z",
            opacity: ".6"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m14.465 27.026 9.43-3.907h-9.43v3.907Z",
            opacity: ".9"
        }), e.jsx("path", {
            fill: "#fff",
            d: "M9.538 23.111H5.931l1.295 6.905 2.312-6.905Z",
            opacity: ".2"
        }), e.jsx("path", {
            fill: "#fff",
            d: "M9.538 23.12h4.927v3.906l-4.927-3.907Z",
            opacity: ".3"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m20.056 32.596 3.907-9.43v9.43h-3.907Z",
            opacity: ".2"
        }), e.jsx("path", {
            fill: "#fff",
            d: "M23.95 37.523v3.608l-6.904-1.296 6.905-2.312Z"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m17.046 39.835 6.905-2.312-3.907-4.927-2.998 7.24Z",
            opacity: ".7"
        }), e.jsx("path", {
            fill: "#fff",
            d: "M23.96 37.523v-4.927h-3.906l3.907 4.928Z",
            opacity: ".8"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m27.866 32.596-3.907-9.43v9.43h3.907Z"
        }), e.jsx("path", {
            fill: "#fff",
            d: "M23.95 37.523v3.608l6.905-1.296-6.904-2.312Z",
            opacity: ".9"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m30.855 39.835-6.904-2.312 3.906-4.927 2.998 7.24Z",
            opacity: ".7"
        }), e.jsx("path", {
            fill: "#fff",
            d: "M23.959 37.523v-4.927h3.907l-3.907 4.928Z",
            opacity: ".2"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m27.845 13.626-3.906 9.43v-9.43h3.906Z"
        }), e.jsx("path", {
            fill: "#fff",
            d: "M23.95 8.699V5.09l6.905 1.296-6.904 2.312Z",
            opacity: ".5"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m30.855 6.387-6.904 2.312 3.906 4.927 2.998-7.24Z",
            opacity: ".9"
        }), e.jsx("path", {
            fill: "#fff",
            d: "M23.94 8.698v4.928h3.907L23.94 8.698Z",
            opacity: ".4"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m20.036 13.626 3.907 9.43v-9.43h-3.907Z",
            opacity: ".8"
        }), e.jsx("path", {
            fill: "#fff",
            d: "M23.95 8.699V5.09l-6.904 1.296 6.905 2.312Z",
            opacity: ".2"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m17.046 6.387 6.905 2.312-3.907 4.927-2.998-7.24Z",
            opacity: ".7"
        }), e.jsx("path", {
            fill: "#fff",
            d: "M23.943 8.698v4.928h-3.907l3.907-4.928Z",
            opacity: ".1"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m27.904 32.572-3.906-9.43 6.668 6.668-2.762 2.762Z",
            opacity: ".8"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m34.143 33.303 2.55 2.55-5.799 3.966 3.249-6.516Z"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m30.894 39.819 3.249-6.518-6.247-.72 2.998 7.238ZM33.426 27.05l-9.43-3.906 6.668 6.668 2.762-2.762Z",
            opacity: ".9"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m34.143 33.303 2.55 2.55 3.966-5.799-6.516 3.25Z",
            opacity: ".7"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m40.659 30.055-6.518 3.248-.723-6.247 7.24 2.999Z",
            opacity: ".7"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m34.147 33.297-3.485-3.485 2.762-2.762.723 6.247ZM19.997 13.65l3.907 9.43-6.669-6.668 2.762-2.762Z"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m13.758 12.919-2.55-2.55 5.8-3.966-3.25 6.516Z",
            opacity: ".7"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m17.007 6.403-3.249 6.518 6.247.723-2.998-7.241Z"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m13.752 12.927 3.485 3.485L20 13.65l-6.247-.723Z",
            opacity: ".6"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m14.475 19.172 9.43 3.906-6.668-6.668-2.762 2.762Z",
            opacity: ".7"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m13.758 12.919-2.55-2.55-3.965 5.799 6.515-3.25Z",
            opacity: ".2"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m7.243 16.167 6.518-3.248.723 6.247-7.241-2.999Z",
            opacity: ".6"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m13.754 12.925 3.485 3.485-2.762 2.762-.723-6.247Z",
            opacity: ".3"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m14.49 27.064 9.43-3.906-6.668 6.668-2.762-2.762Z",
            opacity: ".5"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m13.758 33.303-2.55 2.55-3.965-5.799 6.515 3.25Z",
            opacity: ".9"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m7.243 30.055 6.518 3.248.723-6.247-7.241 2.999Z"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m13.767 33.31 3.485-3.486-2.762-2.762-.723 6.247Z",
            opacity: ".5"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m20.012 32.586 3.906-9.43-6.668 6.668 2.762 2.762Z",
            opacity: ".9"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m13.758 33.303-2.55 2.55 5.8 3.968-3.25-6.518Z",
            opacity: ".7"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m17.007 39.819-3.249-6.518 6.247-.723-2.998 7.241Z",
            opacity: ".5"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m33.412 19.157-9.43 3.907 6.668-6.669 2.762 2.762ZM34.143 12.919l2.55-2.55 3.966 5.799-6.516-3.25Z",
            opacity: ".9"
        }), e.jsx("path", {
            fill: "#fff",
            d: "M40.659 16.167 34.14 12.92l-.721 6.247 7.239-2.999Z",
            opacity: ".4"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m34.135 12.913-3.485 3.483 2.762 2.761.723-6.244Z",
            opacity: ".6"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m27.89 13.636-3.907 9.43 6.669-6.668-2.762-2.762Z",
            opacity: ".4"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m34.143 12.919 2.55-2.55-5.799-3.966 3.249 6.516Z",
            opacity: ".2"
        }), e.jsx("path", {
            fill: "#fff",
            d: "M34.137 12.915 30.652 16.4l-2.762-2.764 6.247-.721Z",
            opacity: ".3"
        })]
    })
}

function Ja() {
    return e.jsxs("svg", {
        id: "outer-circle-handle",
        viewBox: "0 0 15 15",
        children: [e.jsx("circle", {
            cx: "56%",
            cy: "50%",
            r: "50%",
            fill: "url(#paint0_radial_669_250)"
        }), e.jsx("circle", {
            cx: "50%",
            cy: "50%",
            r: "37%",
            fill: "#FFEA94"
        }), e.jsx("circle", {
            cx: "50%",
            cy: "50%",
            r: "37%",
            fill: "url(#paint0_radial_669_251)"
        }), e.jsxs("defs", {
            children: [e.jsxs("radialGradient", {
                id: "paint0_radial_669_251",
                children: [e.jsx("stop", {
                    offset: ".39",
                    stopOpacity: "0"
                }), e.jsx("stop", {
                    offset: ".58",
                    stopOpacity: ".08"
                }), e.jsx("stop", {
                    offset: ".9",
                    stopOpacity: ".34"
                }), e.jsx("stop", {
                    offset: "1",
                    stopOpacity: ".75"
                })]
            }), e.jsxs("radialGradient", {
                id: "paint0_radial_669_250",
                children: [e.jsx("stop", {
                    offset: ".73",
                    stopOpacity: ".6"
                }), e.jsx("stop", {
                    offset: ".9",
                    stopOpacity: ".1"
                }), e.jsx("stop", {
                    offset: "1",
                    stopOpacity: "0"
                })]
            })]
        })]
    })
}

function Xa() {
    return e.jsxs("svg", {
        id: "inner-circle-diamond",
        viewBox: "0 0 27 27",
        children: [e.jsx("circle", {
            cx: "13.892",
            cy: "12.876",
            r: "10.5",
            fill: "#CA9A00"
        }), e.jsx("circle", {
            cx: "13.892",
            cy: "12.876",
            r: "10.5",
            fill: "url(#paint2_linear_660_1226)"
        }), e.jsx("path", {
            fill: "#D8A61F",
            d: "m10.241 21.69-3.066-2.097-2.098-3.067-.685-3.651.685-3.651 2.098-3.067 3.066-2.096 3.651-.685 3.651.685 3.067 2.098 2.097 3.066.685 3.651-.685 3.651-2.098 3.067-3.066 2.097-3.65.685-3.652-.685Z"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m18.831 15.442-5.29-2.191h5.29v2.191Z",
            opacity: ".7"
        }), e.jsx("path", {
            fill: "#fff",
            d: "M21.595 13.257h2.024l-.727 3.874-1.297-3.874Z",
            opacity: ".6"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m22.892 17.13-1.297-3.873-2.764 2.192 4.061 1.682Z",
            opacity: ".9"
        }), e.jsx("path", {
            fill: "#fff",
            d: "M21.595 13.252h-2.764v2.191l2.764-2.191Z",
            opacity: ".7"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m18.831 11.061-5.29 2.192h5.29V11.06ZM21.595 13.258h2.024l-.727-3.874-1.297 3.873Z",
            opacity: ".9"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m22.892 9.384-1.297 3.873-2.764-2.191 4.061-1.682Z",
            opacity: ".8"
        }), e.jsx("path", {
            fill: "#fff",
            d: "M21.595 13.253h-2.764V11.06l2.764 2.192Z",
            opacity: ".51"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m8.19 11.073 5.29 2.191H8.19v-2.191Z",
            opacity: ".7"
        }), e.jsx("path", {
            fill: "#fff",
            d: "M5.425 13.258H3.402l.726-3.874 1.297 3.873Z",
            opacity: ".5"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m4.128 9.384 1.297 3.873 2.764-2.191-4.06-1.682Z",
            opacity: ".9"
        }), e.jsx("path", {
            fill: "#fff",
            d: "M5.425 13.263H8.19v-2.191l-2.764 2.191Z",
            opacity: ".6"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m8.19 15.454 5.29-2.192H8.19v2.191Z",
            opacity: ".9"
        }), e.jsx("path", {
            fill: "#fff",
            d: "M5.425 13.257H3.402l.726 3.874 1.297-3.874Z",
            opacity: ".2"
        }), e.jsx("path", {
            fill: "#fff",
            d: "M5.425 13.262H8.19v2.191l-2.764-2.191Z",
            opacity: ".3"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m11.326 18.579 2.191-5.29v5.29h-2.191Z",
            opacity: ".2"
        }), e.jsx("path", {
            fill: "#fff",
            d: "M13.51 21.343v2.023l-3.873-.727 3.873-1.296Z"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m9.637 22.64 3.873-1.297-2.191-2.764-1.682 4.06Z",
            opacity: ".7"
        }), e.jsx("path", {
            fill: "#fff",
            d: "M13.516 21.343v-2.764h-2.191l2.191 2.764Z",
            opacity: ".8"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m15.706 18.579-2.191-5.29v5.29h2.191Z"
        }), e.jsx("path", {
            fill: "#fff",
            d: "M13.51 21.343v2.023l3.874-.727-3.874-1.296Z",
            opacity: ".9"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m17.384 22.64-3.874-1.297 2.192-2.764 1.682 4.06Z",
            opacity: ".7"
        }), e.jsx("path", {
            fill: "#fff",
            d: "M13.515 21.343v-2.764h2.191l-2.191 2.764Z",
            opacity: ".2"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m15.695 7.936-2.191 5.29v-5.29h2.191Z"
        }), e.jsx("path", {
            fill: "#fff",
            d: "M13.51 5.172V3.15l3.874.726-3.874 1.297Z",
            opacity: ".5"
        }), e.jsx("path", {
            fill: "#fff",
            d: "M17.384 3.875 13.51 5.172l2.192 2.764 1.682-4.06Z",
            opacity: ".9"
        }), e.jsx("path", {
            fill: "#fff",
            d: "M13.505 5.172v2.764h2.191l-2.191-2.764Z",
            opacity: ".4"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m11.314 7.936 2.192 5.29v-5.29h-2.192Z",
            opacity: ".8"
        }), e.jsx("path", {
            fill: "#fff",
            d: "M13.51 5.172V3.15l-3.873.726 3.873 1.297Z",
            opacity: ".2"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m9.637 3.875 3.873 1.297-2.191 2.764-1.682-4.06Z",
            opacity: ".7"
        }), e.jsx("path", {
            fill: "#fff",
            d: "M13.506 5.172v2.764h-2.192l2.192-2.764Z",
            opacity: ".1"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m15.728 18.565-2.191-5.29 3.74 3.74-1.549 1.55Z",
            opacity: ".8"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m19.228 18.975 1.43 1.43-3.253 2.225 1.823-3.655Z"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m17.405 22.63 1.823-3.656-3.505-.405 1.682 4.061ZM18.826 15.467l-5.29-2.191 3.74 3.74 1.55-1.549Z",
            opacity: ".9"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m19.228 18.975 1.43 1.43 2.225-3.252-3.655 1.822ZM22.883 17.153l-3.656 1.822-.406-3.504 4.062 1.682Z",
            opacity: ".7"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m19.23 18.972-1.955-1.955 1.55-1.55.405 3.505ZM11.293 7.95l2.191 5.29-3.74-3.74 1.549-1.55Z"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m7.793 7.54-1.43-1.43 3.252-2.225L7.793 7.54Z",
            opacity: ".7"
        }), e.jsx("path", {
            fill: "#fff",
            d: "M9.615 3.885 7.793 7.54l3.504.405-1.682-4.061Z"
        }), e.jsx("path", {
            fill: "#fff",
            d: "M7.79 7.544 9.743 9.5l1.55-1.549-3.505-.406Z",
            opacity: ".6"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m8.195 11.048 5.29 2.191-3.74-3.74-1.55 1.549Z",
            opacity: ".7"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m7.793 7.54-1.43-1.43-2.225 3.252L7.793 7.54Z",
            opacity: ".2"
        }), e.jsx("path", {
            fill: "#fff",
            d: "M4.138 9.362 7.794 7.54l.405 3.504-4.061-1.682Z",
            opacity: ".6"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m7.79 7.543 1.955 1.955-1.549 1.55-.406-3.505Z",
            opacity: ".3"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m8.203 15.475 5.29-2.191-3.74 3.74-1.55-1.549Z",
            opacity: ".5"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m7.793 18.975-1.43 1.43-2.225-3.252 3.655 1.822Z",
            opacity: ".9"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m4.138 17.153 3.656 1.822.405-3.504-4.061 1.682Z"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m7.797 18.979 1.955-1.956-1.55-1.549-.405 3.505Z",
            opacity: ".5"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m11.3 18.573 2.192-5.29-3.74 3.74 1.548 1.55Z",
            opacity: ".9"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m7.793 18.975-1.43 1.43 3.252 2.226-1.822-3.656Z",
            opacity: ".7"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m9.615 22.63-1.822-3.656 3.504-.406-1.682 4.062Z",
            opacity: ".5"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m18.818 11.04-5.29 2.191 3.74-3.74 1.55 1.549ZM19.228 7.54l1.43-1.43 2.225 3.252-3.655-1.822Z",
            opacity: ".9"
        }), e.jsx("path", {
            fill: "#fff",
            d: "M22.883 9.362 19.227 7.54l-.405 3.504 4.061-1.682Z",
            opacity: ".4"
        }), e.jsx("path", {
            fill: "#fff",
            d: "M19.223 7.536 17.268 9.49l1.55 1.55.405-3.504Z",
            opacity: ".6"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m15.72 7.942-2.191 5.29 3.74-3.74-1.549-1.55Z",
            opacity: ".4"
        }), e.jsx("path", {
            fill: "#fff",
            d: "m19.228 7.54 1.43-1.43-3.253-2.225 1.823 3.655Z",
            opacity: ".2"
        }), e.jsx("path", {
            fill: "#fff",
            d: "M19.224 7.538 17.27 9.493l-1.55-1.55 3.504-.405Z",
            opacity: ".3"
        }), e.jsx("defs", {
            children: e.jsxs("linearGradient", {
                id: "paint2_linear_660_1226",
                gradientTransform: "rotate(45) translate(0.2)",
                children: [e.jsx("stop", {
                    offset: ".36",
                    stopColor: "#fff",
                    stopOpacity: "0"
                }), e.jsx("stop", {
                    offset: ".5",
                    stopColor: "#fff",
                    stopOpacity: ".8"
                }), e.jsx("stop", {
                    offset: ".69",
                    stopColor: "#fff",
                    stopOpacity: "0"
                })]
            })
        })]
    })
}

function er() {
    return e.jsxs("svg", {
        id: "inner-circle-lamp",
        viewBox: "0 0 40 40",
        children: [e.jsx("circle", {
            cx: "50%",
            cy: "50%",
            r: "50%",
            fill: "url(#paint0_radial_660_1898)"
        }), e.jsx("defs", {
            children: e.jsxs("radialGradient", {
                id: "paint0_radial_660_1898",
                children: [e.jsx("stop", {
                    stopColor: "#FFFDEE"
                }), e.jsx("stop", {
                    offset: ".28",
                    stopColor: "#fff"
                }), e.jsx("stop", {
                    offset: ".37",
                    stopColor: "#fff",
                    stopOpacity: ".62"
                }), e.jsx("stop", {
                    offset: ".51",
                    stopColor: "#fff",
                    stopOpacity: ".4"
                }), e.jsx("stop", {
                    offset: ".865",
                    stopColor: "#fff",
                    stopOpacity: "0"
                })]
            })
        })]
    })
}

function tr({
    x: t = 0,
    y: s = 0,
    ...o
}) {
    return e.jsxs("svg", {
        x: +t - 110,
        y: s,
        ...o,
        width: "138",
        height: "138",
        viewBox: "0 0 138 138",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [e.jsx("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M14.4855 54.0603C14.4855 54.0603 46.2391 60.8769 72.4708 67.9057C98.7025 74.9345 122.607 83.0314 122.607 83.0314C122.607 83.0314 97.8566 78.0913 71.6249 71.0625C45.3932 64.0338 14.4855 54.0603 14.4855 54.0603Z",
            fill: "url(#paint0_linear_3110_78481)"
        }), e.jsx("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M83.0315 14.4856C83.0315 14.4856 77.0937 46.4747 70.065 72.7064C63.0362 98.9381 54.0604 122.607 54.0604 122.607C54.0604 122.607 58.1216 97.6212 65.1504 71.3895C72.1792 45.1578 83.0315 14.4856 83.0315 14.4856Z",
            fill: "url(#paint1_linear_3110_78481)"
        }), e.jsx("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M95.8497 50.7812C95.8497 50.7812 81.9427 62.4362 68.6943 71.0563C55.4458 79.6763 41.2426 86.3111 41.2426 86.3111C41.2426 86.3111 51.6126 76.9574 64.861 68.3374C78.1095 59.7174 95.8497 50.7812 95.8497 50.7812Z",
            fill: "url(#paint2_linear_3110_78481)"
        }), e.jsx("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M45.542 23.3005C45.542 23.3005 61.2136 49.3035 72.3759 71.258C83.5382 93.2124 91.5506 113.792 91.5506 113.792C91.5506 113.792 78.8591 93.6504 67.6968 71.696C56.5345 49.7415 45.542 23.3005 45.542 23.3005Z",
            fill: "url(#paint3_linear_3110_78481)"
        }), e.jsxs("defs", {
            children: [e.jsxs("linearGradient", {
                id: "paint0_linear_3110_78481",
                x1: "14.4855",
                y1: "54.0603",
                x2: "122.607",
                y2: "83.0314",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    stopColor: "white",
                    stopOpacity: "0"
                }), e.jsx("stop", {
                    offset: "0.35",
                    stopColor: "white",
                    stopOpacity: "0.3"
                }), e.jsx("stop", {
                    offset: "0.5",
                    stopColor: "white"
                }), e.jsx("stop", {
                    offset: "0.65",
                    stopColor: "white",
                    stopOpacity: "0.3"
                }), e.jsx("stop", {
                    offset: "1",
                    stopColor: "white",
                    stopOpacity: "0"
                })]
            }), e.jsxs("linearGradient", {
                id: "paint1_linear_3110_78481",
                x1: "83.0315",
                y1: "14.4856",
                x2: "54.0605",
                y2: "122.607",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    stopColor: "white",
                    stopOpacity: "0"
                }), e.jsx("stop", {
                    offset: "0.35",
                    stopColor: "white",
                    stopOpacity: "0.3"
                }), e.jsx("stop", {
                    offset: "0.5",
                    stopColor: "white"
                }), e.jsx("stop", {
                    offset: "0.65",
                    stopColor: "white",
                    stopOpacity: "0.3"
                }), e.jsx("stop", {
                    offset: "1",
                    stopColor: "white",
                    stopOpacity: "0"
                })]
            }), e.jsxs("linearGradient", {
                id: "paint2_linear_3110_78481",
                x1: "95.8497",
                y1: "50.7812",
                x2: "60.8066",
                y2: "100.188",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    stopColor: "white",
                    stopOpacity: "0"
                }), e.jsx("stop", {
                    offset: "0.35",
                    stopColor: "white",
                    stopOpacity: "0.3"
                }), e.jsx("stop", {
                    offset: "0.5",
                    stopColor: "white"
                }), e.jsx("stop", {
                    offset: "0.65",
                    stopColor: "white",
                    stopOpacity: "0.3"
                }), e.jsx("stop", {
                    offset: "1",
                    stopColor: "white",
                    stopOpacity: "0"
                })]
            }), e.jsxs("linearGradient", {
                id: "paint3_linear_3110_78481",
                x1: "45.542",
                y1: "23.3005",
                x2: "54.3383",
                y2: "117.275",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    stopColor: "white",
                    stopOpacity: "0"
                }), e.jsx("stop", {
                    offset: "0.35",
                    stopColor: "white",
                    stopOpacity: "0.3"
                }), e.jsx("stop", {
                    offset: "0.5",
                    stopColor: "white"
                }), e.jsx("stop", {
                    offset: "0.65",
                    stopColor: "white",
                    stopOpacity: "0.3"
                }), e.jsx("stop", {
                    offset: "1",
                    stopColor: "white",
                    stopOpacity: "0"
                })]
            })]
        })]
    })
}

function sr({
    x: t = 0,
    y: s = 0,
    ...o
}) {
    return e.jsxs("svg", {
        x: +t - 110 / 2,
        y: s,
        width: "110",
        height: "103",
        viewBox: "0 0 110 103",
        ...o,
        children: [e.jsx("path", {
            fill: "url(#paint0_linear_0_1)",
            d: "M54.994 94.618 12.064 6.601S31.071 0 54.994 0s42.93 6.601 42.93 6.601l-42.93 88.017Z"
        }), e.jsx("path", {
            fill: "url(#paint1_linear_0_1)",
            fillOpacity: ".4",
            d: "M54.994 94.618 12.064 6.601S31.071 0 54.994 0s42.93 6.601 42.93 6.601l-42.93 88.017Z"
        }), e.jsx("path", {
            fill: "url(#paint2_linear_0_1)",
            fillOpacity: ".4",
            d: "M54.994 94.618 12.064 6.601S31.071 0 54.994 0s42.93 6.601 42.93 6.601l-42.93 88.017Z"
        }), e.jsx("path", {
            fill: "url(#paint3_linear_0_1)",
            d: "M100.126 15.406C97.45 20.9 57.172 101.32 56.811 102.004c-.36.685-1.095.996-1.805.996s-1.456-.311-1.805-.996c-.348-.685-40.651-81.105-43.34-86.598C5.804 7.174 4.546 5.38.227 5.38 5.83 4.41 12.75 3.3 17.566 3.3c1.32 0 2.203 1.097 2.203 1.097l35.225 73.706L90.219 4.397S91.102 3.3 92.422 3.3c4.817 0 11.737 1.108 17.338 2.08-4.319 0-5.576 1.793-9.634 10.025Z"
        }), e.jsx("path", {
            fill: "url(#paint4_linear_0_1)",
            d: "M92.422 3.3c-1.32 0-2.203 1.097-2.203 1.097L54.994 78.103 19.769 4.397S18.885 3.3 17.566 3.3c-3.635 0-9.248.697-14.202 1.457 2.95 0 4.941 2.055 8.7 9.54 3.075 6.277 42.93 83.608 42.93 83.608s39.867-77.33 42.93-83.608c3.746-7.485 5.75-9.54 8.7-9.54-4.942-.76-10.555-1.457-14.202-1.457Z"
        }), e.jsxs("defs", {
            children: [e.jsxs("linearGradient", {
                id: "paint0_linear_0_1",
                x1: "54.994",
                x2: "54.994",
                y1: "0",
                y2: "94.618",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    stopColor: "#fff"
                }), e.jsx("stop", {
                    offset: ".41",
                    stopColor: "#fff"
                }), e.jsx("stop", {
                    offset: "1",
                    stopColor: "#5E5E5E"
                })]
            }), e.jsxs("linearGradient", {
                id: "paint2_linear_0_1",
                x1: "97.923",
                x2: "12.064",
                y1: "27.28",
                y2: "67.338",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    offset: ".61",
                    stopColor: "#fff",
                    stopOpacity: "0"
                }), e.jsx("stop", {
                    offset: ".65"
                })]
            }), e.jsxs("linearGradient", {
                id: "paint3_linear_0_1",
                x1: "54.994",
                x2: "54.994",
                y1: "103",
                y2: "3.301",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    offset: ".04",
                    stopColor: "#5C3700"
                }), e.jsx("stop", {
                    offset: ".575",
                    stopColor: "#FBE9C1"
                }), e.jsx("stop", {
                    offset: "1",
                    stopColor: "#F9DF7B"
                })]
            }), e.jsxs("linearGradient", {
                id: "paint4_linear_0_1",
                x1: "54.994",
                x2: "54.994",
                y1: "97.906",
                y2: "3.301",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    offset: ".08",
                    stopColor: "#E8CDA0"
                }), e.jsx("stop", {
                    offset: ".425",
                    stopColor: "#693712"
                }), e.jsx("stop", {
                    offset: ".585",
                    stopColor: "#875A17"
                }), e.jsx("stop", {
                    offset: ".78",
                    stopColor: "#F7EBC6"
                }), e.jsx("stop", {
                    offset: "1",
                    stopColor: "#723F17"
                })]
            })]
        })]
    })
}

function lr({
    x: t = 0,
    y: s = 0,
    ...o
}) {
    return e.jsxs("svg", {
        x: +t - 126 / 2,
        y: s,
        width: "126",
        height: "69",
        viewBox: "0 0 126 69",
        ...o,
        children: [e.jsx("path", {
            fill: "url(#paint0_linear_298_1179)",
            d: "M0 68.365c.473-9.79 2.39-48.971 2.651-55.597.311-7.573 2.95-9.615 5.303-10.263C10.306 1.857 17.4.811 20.86.675c3.46-.125 6.597 2.415 6.597 2.415h71.06s3.136-2.54 6.596-2.416c3.46.125 10.555 1.17 12.908 1.831 2.352.648 5.003 2.69 5.302 10.275.261 6.626 2.178 45.808 2.651 55.598H0v-.013Z"
        }), e.jsx("defs", {
            children: e.jsxs("linearGradient", {
                id: "paint0_linear_298_1179",
                x1: "62.987",
                x2: "62.987",
                y1: "68.378",
                y2: ".67",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    offset: ".56",
                    stopColor: "#734F1F"
                }), e.jsx("stop", {
                    offset: "1",
                    stopColor: "#241104"
                })]
            })
        })]
    })
}

function or({
    x: t = 0,
    y: s = 0,
    ...o
}) {
    return e.jsxs("svg", {
        x: +t - 263 / 2,
        y: +s - 263 / 2,
        width: "263",
        height: "263",
        viewBox: "0 0 263 263",
        ...o,
        children: [e.jsx("path", {
            fill: "#B78114",
            d: "M176.56 8.442c67.963 24.878 102.897 100.155 78.019 168.118S154.424 279.457 86.461 254.579-16.436 154.424 8.442 86.461C33.321 18.498 108.597-16.436 176.56 8.442Z"
        }), e.jsx("path", {
            fill: "url(#paint0_linear_751_289)",
            fillOpacity: ".6",
            d: "M176.56 8.442c67.963 24.878 102.897 100.155 78.019 168.118S154.424 279.457 86.461 254.579-16.436 154.424 8.442 86.461C33.321 18.498 108.597-16.436 176.56 8.442Z"
        }), e.jsx("path", {
            fill: "url(#paint1_linear_751_289)",
            fillOpacity: ".6",
            d: "M176.56 8.442c67.963 24.878 102.897 100.155 78.019 168.118S154.424 279.457 86.461 254.579-16.436 154.424 8.442 86.461C33.321 18.498 108.597-16.436 176.56 8.442Z"
        }), e.jsx("path", {
            fill: "url(#paint2_linear_751_289)",
            fillOpacity: ".6",
            d: "M176.56 8.442c67.963 24.878 102.897 100.155 78.019 168.118S154.424 279.457 86.461 254.579-16.436 154.424 8.442 86.461C33.321 18.498 108.597-16.436 176.56 8.442Z"
        }), e.jsx("path", {
            fill: "url(#paint3_linear_751_289)",
            fillOpacity: ".6",
            d: "M176.56 8.442c67.963 24.878 102.897 100.155 78.019 168.118S154.424 279.457 86.461 254.579-16.436 154.424 8.442 86.461C33.321 18.498 108.597-16.436 176.56 8.442Z"
        }), e.jsx("path", {
            fill: "url(#paint4_linear_751_289)",
            fillOpacity: ".6",
            d: "M176.56 8.442c67.963 24.878 102.897 100.155 78.019 168.118S154.424 279.457 86.461 254.579-16.436 154.424 8.442 86.461C33.321 18.498 108.597-16.436 176.56 8.442Z"
        }), e.jsx("path", {
            fill: "url(#paint5_linear_751_289)",
            fillOpacity: ".6",
            d: "M176.56 8.442c67.963 24.878 102.897 100.155 78.019 168.118S154.424 279.457 86.461 254.579-16.436 154.424 8.442 86.461C33.321 18.498 108.597-16.436 176.56 8.442Z"
        }), e.jsx("path", {
            fill: "url(#paint6_radial_751_289)",
            d: "M176.56 8.442c67.963 24.878 102.897 100.155 78.019 168.118S154.424 279.457 86.461 254.579-16.436 154.424 8.442 86.461C33.321 18.498 108.597-16.436 176.56 8.442Z"
        }), e.jsxs("defs", {
            children: [e.jsxs("linearGradient", {
                id: "paint0_linear_751_289",
                x1: "246.678",
                x2: "16.343",
                y1: "198.145",
                y2: "64.876",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    offset: ".4",
                    stopColor: "#fff",
                    stopOpacity: "0"
                }), e.jsx("stop", {
                    offset: ".5",
                    stopColor: "#fff"
                }), e.jsx("stop", {
                    offset: ".6",
                    stopColor: "#fff",
                    stopOpacity: "0"
                })]
            }), e.jsxs("linearGradient", {
                id: "paint1_linear_751_289",
                x1: "-8.803",
                x2: "271.824",
                y1: "133.572",
                y2: "129.449",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    offset: ".4",
                    stopColor: "#fff",
                    stopOpacity: "0"
                }), e.jsx("stop", {
                    offset: ".5",
                    stopColor: "#fff"
                }), e.jsx("stop", {
                    offset: ".6",
                    stopColor: "#fff",
                    stopOpacity: "0"
                })]
            }), e.jsxs("linearGradient", {
                id: "paint2_linear_751_289",
                x1: "-14.432",
                x2: "277.454",
                y1: "217.646",
                y2: "45.375",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    offset: ".4",
                    stopColor: "#fff",
                    stopOpacity: "0"
                }), e.jsx("stop", {
                    offset: ".5",
                    stopColor: "#fff"
                }), e.jsx("stop", {
                    offset: ".6",
                    stopColor: "#fff",
                    stopOpacity: "0"
                })]
            }), e.jsxs("linearGradient", {
                id: "paint3_linear_751_289",
                x1: "62.761",
                x2: "200.26",
                y1: "245.903",
                y2: "17.118",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    offset: ".4",
                    stopColor: "#fff",
                    stopOpacity: "0"
                }), e.jsx("stop", {
                    offset: ".5",
                    stopColor: "#fff"
                }), e.jsx("stop", {
                    offset: ".6",
                    stopColor: "#fff",
                    stopOpacity: "0"
                })]
            }), e.jsxs("linearGradient", {
                id: "paint4_linear_751_289",
                x1: "129.518",
                x2: "133.503",
                y1: "270.34",
                y2: "-7.319",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    offset: ".4",
                    stopColor: "#fff",
                    stopOpacity: "0"
                }), e.jsx("stop", {
                    offset: ".5",
                    stopColor: "#fff"
                }), e.jsx("stop", {
                    offset: ".6",
                    stopColor: "#fff",
                    stopOpacity: "0"
                })]
            }), e.jsxs("linearGradient", {
                id: "paint5_linear_751_289",
                x1: "45.141",
                x2: "217.88",
                y1: "-13.794",
                y2: "276.815",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    offset: ".4",
                    stopColor: "#fff",
                    stopOpacity: "0"
                }), e.jsx("stop", {
                    offset: ".5",
                    stopColor: "#fff"
                }), e.jsx("stop", {
                    offset: ".6",
                    stopColor: "#fff",
                    stopOpacity: "0"
                })]
            }), e.jsxs("radialGradient", {
                id: "paint6_radial_751_289",
                children: [e.jsx("stop", {
                    offset: ".73"
                }), e.jsx("stop", {
                    offset: ".74",
                    stopOpacity: "0"
                }), e.jsx("stop", {
                    offset: ".76",
                    stopOpacity: "0"
                }), e.jsx("stop", {
                    offset: ".77",
                    stopOpacity: ".4"
                }), e.jsx("stop", {
                    offset: ".8",
                    stopOpacity: ".1"
                }), e.jsx("stop", {
                    offset: ".83",
                    stopOpacity: "0"
                }), e.jsx("stop", {
                    offset: ".9",
                    stopOpacity: "0"
                }), e.jsx("stop", {
                    offset: ".94",
                    stopOpacity: ".1"
                }), e.jsx("stop", {
                    offset: ".97",
                    stopOpacity: ".5"
                }), e.jsx("stop", {
                    offset: ".98",
                    stopOpacity: "0"
                })]
            })]
        })]
    })
}

function ar({
    x: t = 0,
    y: s = 0,
    isReadyToSpin: o,
    ...a
}) {
    return e.jsxs("svg", {
        x: +t - 94.5,
        y: +s - 94.5,
        width: "189",
        height: "189",
        viewBox: "0 0 189 189",
        className: `group ${o?"pointer-events-auto":"pointer-events-none"}`,
        ...a,
        children: [e.jsx("circle", {
            cx: "50%",
            cy: "50%",
            r: "50%",
            className: "fill-[#E80000] group-hover:fill-[#FB2929] group-active:fill-[#D40101]"
        }), e.jsx("circle", {
            cx: "50%",
            cy: "50%",
            r: "50%",
            fill: "url(#paint0_radial_748_290)",
            className: "opacity-70 group-active:opacity-90"
        }), e.jsx("path", {
            fill: "url(#paint1_radial_748_290)",
            fillOpacity: ".7",
            d: "M187.788 93.653c0 31.129-16.515 56.369-36.883 56.369-20.368 0-36.883-25.24-36.883-56.37 0-31.128 16.515-56.368 36.883-56.368 20.368 0 36.883 25.24 36.883 56.369Z"
        }), e.jsx("path", {
            fill: "url(#paint2_radial_748_290)",
            fillOpacity: ".7",
            d: "M74.187 93.653c0 31.129-16.515 56.369-36.884 56.369-20.368 0-36.883-25.24-36.883-56.37 0-31.128 16.515-56.368 36.883-56.368 20.369 0 36.884 25.24 36.884 56.369Z"
        }), e.jsx("path", {
            fill: "url(#paint3_radial_748_290)",
            d: "M94.64 11.621c25.871 0 46.848 11.106 46.848 24.802 0 13.697-20.977 24.803-46.849 24.803-25.871 0-46.849-11.106-46.849-24.803 0-13.696 20.977-24.802 46.85-24.802Z"
        }), o ? e.jsx(nr, {
            x: 94.5,
            y: 94.5
        }) : e.jsx(rr, {
            x: 94.5,
            y: 94.5
        }), e.jsxs("defs", {
            children: [e.jsxs("radialGradient", {
                id: "paint0_radial_748_290",
                children: [e.jsx("stop", {
                    offset: ".1",
                    stopOpacity: "0"
                }), e.jsx("stop", {
                    offset: ".76",
                    stopOpacity: ".1"
                }), e.jsx("stop", {
                    offset: ".84",
                    stopOpacity: ".2"
                }), e.jsx("stop", {
                    offset: ".9",
                    stopOpacity: ".3"
                }), e.jsx("stop", {
                    offset: ".97",
                    stopOpacity: ".6"
                }), e.jsx("stop", {
                    offset: "1",
                    stopOpacity: ".8"
                })]
            }), e.jsxs("radialGradient", {
                id: "paint1_radial_748_290",
                children: [e.jsx("stop", {
                    offset: ".395",
                    stopColor: "#fff",
                    stopOpacity: ".8"
                }), e.jsx("stop", {
                    offset: ".84",
                    stopColor: "#fff",
                    stopOpacity: ".1"
                }), e.jsx("stop", {
                    offset: "1",
                    stopColor: "#fff",
                    stopOpacity: "0"
                })]
            }), e.jsxs("radialGradient", {
                id: "paint2_radial_748_290",
                children: [e.jsx("stop", {
                    offset: ".395",
                    stopColor: "#fff",
                    stopOpacity: ".8"
                }), e.jsx("stop", {
                    offset: ".84",
                    stopColor: "#fff",
                    stopOpacity: ".1"
                }), e.jsx("stop", {
                    offset: "1",
                    stopColor: "#fff",
                    stopOpacity: "0"
                })]
            }), e.jsxs("radialGradient", {
                id: "paint3_radial_748_290",
                children: [e.jsx("stop", {
                    offset: ".365",
                    stopColor: "#fff"
                }), e.jsx("stop", {
                    offset: ".75",
                    stopColor: "#fff",
                    stopOpacity: ".2"
                }), e.jsx("stop", {
                    offset: "1",
                    stopColor: "#fff",
                    stopOpacity: "0"
                })]
            })]
        })]
    })
}

function rr({
    x: t = 0,
    y: s = 0,
    ...o
}) {
    return e.jsx("svg", {
        x: +t - 58 / 2,
        y: +s - 69 / 2,
        width: "58",
        height: "69",
        viewBox: "0 0 58 69",
        ...o,
        children: e.jsx("path", {
            fill: "#fff",
            d: "M29.25 69C45.141 68.954 58 61.285 58 52.544c0-8.768-1.598-20.292-1.598-20.292-.65-3.266-4.29-7.326-7.709-7.326v-4.813C48.693 9.048 40 .073 29.25 0 18.5.072 9.807 9.048 9.807 20.113v4.813c-3.419 0-7.06 4.06-7.71 7.326 0 0-1.597 11.524-1.597 20.292C.5 61.285 13.36 68.954 29.25 69Zm3.53-24.049 1.093 9.007c0 1.334-1.244 2.416-2.777 2.416H27.45c-1.533 0-2.776-1.082-2.776-2.416l1.278-9.007a6.703 6.703 0 0 1-3.078-5.667c0-3.685 2.907-6.672 6.492-6.672s6.491 2.987 6.491 6.672a6.703 6.703 0 0 1-3.078 5.667Zm-13.22-25.43c0-5.524 4.329-10.007 9.69-10.066 5.362.06 9.69 4.542 9.69 10.067v4.565H19.56v-4.565Z"
        })
    })
}

function nr({
    x: t = 0,
    y: s = 0,
    ...o
}) {
    return e.jsxs("svg", {
        x: +t - 108 / 2,
        y: +s - 107 / 2,
        width: "108",
        height: "107",
        viewBox: "0 0 108 107",
        ...o,
        children: [e.jsxs("g", {
            children: [e.jsx("path", {
                fill: "url(#arrow-icon_paint0_linear_0_1)",
                d: "M.184 53.598C.184 24.34 23.96.539 53.17.539a53.028 53.028 0 0 1 38.446 16.54l9.967-7.174 5.61 48.762-44.444-20.665 9.364-6.788c-5.308-4.51-11.952-7.002-18.943-7.002-16.18 0-29.34 13.189-29.34 29.386 0 16.196 13.16 29.386 29.34 29.386 8.026 0 15.49-3.18 21.1-8.98l.82-.859L92.393 89.3l-.863.902C81.433 100.813 67.798 106.7 53.127 106.7 23.96 106.656.184 82.855.184 53.598Z"
            }), e.jsx("path", {
                fill: "url(#arrow-icon_paint1_linear_0_1)",
                d: "M.184 53.598C.184 24.34 23.96.539 53.17.539a53.028 53.028 0 0 1 38.446 16.54l9.967-7.174 5.61 48.762-44.444-20.665 9.364-6.788c-5.308-4.51-11.952-7.002-18.943-7.002-16.18 0-29.34 13.189-29.34 29.386 0 16.196 13.16 29.386 29.34 29.386 8.026 0 15.49-3.18 21.1-8.98l.82-.859L92.393 89.3l-.863.902C81.433 100.813 67.798 106.7 53.127 106.7 23.96 106.656.184 82.855.184 53.598Z"
            }), e.jsx("path", {
                fill: "url(#arrow-icon_paint2_linear_0_1)",
                d: "M.184 53.598C.184 24.34 23.96.539 53.17.539a53.028 53.028 0 0 1 38.446 16.54l9.967-7.174 5.61 48.762-44.444-20.665 9.364-6.788c-5.308-4.51-11.952-7.002-18.943-7.002-16.18 0-29.34 13.189-29.34 29.386 0 16.196 13.16 29.386 29.34 29.386 8.026 0 15.49-3.18 21.1-8.98l.82-.859L92.393 89.3l-.863.902C81.433 100.813 67.798 106.7 53.127 106.7 23.96 106.656.184 82.855.184 53.598Z"
            }), e.jsx("path", {
                fill: "#fff",
                d: "M1.56 53.57c0-28.68 23.108-51.96 51.574-51.96 15.133 0 28.723 6.565 38.154 17.018l9.089-6.652 5.102 44.617-40.427-18.918 8.917-6.479c-5.445-5.14-12.733-8.292-20.792-8.292-16.806 0-30.439 13.734-30.439 30.665 0 16.931 13.633 30.666 30.438 30.666 8.575 0 16.334-3.585 21.864-9.372l15.434 14.512c-9.389 9.934-22.636 16.153-37.34 16.153-28.466 0-51.574-23.28-51.574-51.959Z"
            })]
        }), e.jsxs("defs", {
            children: [e.jsxs("linearGradient", {
                id: "arrow-icon_paint0_linear_0_1",
                x1: "49.443",
                x2: "57.511",
                y1: "106.699",
                y2: ".507",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    offset: ".27",
                    stopColor: "#fff",
                    stopOpacity: "0"
                }), e.jsx("stop", {
                    offset: ".5",
                    stopColor: "#fff"
                }), e.jsx("stop", {
                    offset: ".715",
                    stopColor: "#fff",
                    stopOpacity: "0"
                })]
            }), e.jsxs("linearGradient", {
                id: "arrow-icon_paint1_linear_0_1",
                x1: "33.232",
                x2: "74.144",
                y1: ".539",
                y2: "106.699",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    offset: ".315",
                    stopColor: "#fff",
                    stopOpacity: "0"
                }), e.jsx("stop", {
                    offset: ".525",
                    stopColor: "#fff"
                }), e.jsx("stop", {
                    offset: ".745",
                    stopColor: "#fff",
                    stopOpacity: "0"
                })]
            }), e.jsxs("linearGradient", {
                id: "arrow-icon_paint2_linear_0_1",
                x1: ".184",
                x2: "107.436",
                y1: "22.822",
                y2: "83.99",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    offset: ".27",
                    stopColor: "#fff",
                    stopOpacity: "0"
                }), e.jsx("stop", {
                    offset: ".5",
                    stopColor: "#fff"
                }), e.jsx("stop", {
                    offset: ".715",
                    stopColor: "#fff",
                    stopOpacity: "0"
                })]
            })]
        })]
    })
}
const ir = l.memo(function({
        className: s,
        sectors: o,
        onWinAnimationEnd: a,
        onAnimationStart: r
    }) {
        var K;
        const [n, i] = l.useState("idle"), [c, d] = l.useState(), p = l.useRef(null), {
            openDialog: f,
            closeDialog: u
        } = z(), m = ie(), {
            mutate: h
        } = ye.useWheelSpin(), {
            data: v
        } = ae.useLobby(), j = We((K = v == null ? void 0 : v.fortuneWheel) == null ? void 0 : K.nextSpinTime), C = c == null ? void 0 : c.sectorId, y = l.useMemo(() => $a(o, C), [o, C]), _ = H1(o.length), b = $t(S, Fe, _, 1), N = $t(S, Fe, _ - 1, .5), Z = L1(S, Fe - 60, -92);

        function g() {
            m.invalidateQueries({
                queryKey: ["Lobby.getCurrent"]
            })
        }

        function M({
            result: H,
            error: F
        }) {
            if (H && (i("spinning"), d(H), r == null || r(!0)), F) {
                i("ready"), g();
                const Y = new le(F.message, {
                        code: F.code
                    }),
                    T = f(e.jsx(z1, {
                        error: Y,
                        onOk: () => {
                            u(T)
                        }
                    }))
            }
        }

        function L() {
            i("fetching"), h(void 0, {
                onSuccess: M
            })
        }
        return l.useEffect(() => {
            n === "win" && c && a && setTimeout(() => a({
                id: c.sectorId,
                value: c.win,
                colors: Pa(y)
            }), 1500)
        }, [n, y, c]), l.useEffect(() => {
            var be;
            if (n !== "spinning" || p.current === null) return;
            const H = p.current,
                F = Da(S),
                T = Va(o.length, y) / 360 * F,
                Q = Ga(Gt, T);
            let B, G = 0;
            const U = Number((be = document.timeline) == null ? void 0 : be.currentTime) || 0;

            function ne(he) {
                const fe = he - U,
                    Ee = Ia(Gt, fe, Q);
                G > Ee ? (i("win"), G = T) : G = Ee;
                const Xe = G / F * 360;
                H.setAttribute("transform", `rotate(${Xe} ${S} ${S})`), B = requestAnimationFrame(ne)
            }
            return B = requestAnimationFrame(ne), () => cancelAnimationFrame(B)
        }, [n]), l.useEffect(() => {
            i(j > 0 ? "idle" : "ready")
        }, [j]), e.jsx("div", {
            style: {
                direction: "ltr"
            },
            className: s,
            children: e.jsxs("svg", {
                className: "select-none",
                viewBox: `0 0 ${Pe} ${Pe}`,
                children: [e.jsx(lr, {
                    x: S,
                    y: -10
                }), e.jsx(Qa, {}), Array.from({
                    length: 12
                }).map((H, F) => e.jsx("use", {
                    href: "#outer-circle-diamond",
                    x: S - 47 / 2,
                    y: 10,
                    width: "47",
                    height: "47",
                    transform: `rotate(${F*(360/12)} ${S} ${S})`
                }, F)), e.jsx("g", {
                    transform: `rotate(${45/2} ${S} ${S})`,
                    children: Array.from({
                        length: 24
                    }).map((H, F) => e.jsx("use", {
                        href: "#outer-circle-handle",
                        x: S - 15 / 2,
                        y: 25,
                        width: "15",
                        height: "15",
                        transform: `rotate(${F*(360/24)} ${S} ${S})`
                    }, F))
                }), e.jsx("circle", {
                    cx: "50%",
                    cy: "50%",
                    r: Fe,
                    fill: "black"
                }), e.jsxs("g", {
                    ref: p,
                    children: [o.map(({
                        id: H
                    }, F) => e.jsxs(l.Fragment, {
                        children: [e.jsx(Ka, {
                            path: b,
                            fill: Ta(F),
                            transform: `rotate(${F*_} ${S} ${S})`,
                            isWinSector: H === C && n === "win"
                        }), e.jsx("path", {
                            fill: "#000",
                            fillOpacity: "0.1",
                            transform: `rotate(${F*_} ${S} ${S})`,
                            d: N
                        })]
                    }, F)), e.jsx("path", {
                        fill: "url(#paint27_radial_572_1481)",
                        d: "M384.49 708.078c-178.775 0-323.716-144.941-323.716-323.715 0-178.775 144.941-323.716 323.716-323.716s323.716 144.941 323.716 323.716c0 178.774-144.941 323.715-323.716 323.715Z"
                    }), e.jsx("path", {
                        fill: "url(#paint28_radial_572_1481)",
                        d: "M384.49 708.078c-178.775 0-323.716-144.941-323.716-323.715 0-178.775 144.941-323.716 323.716-323.716s323.716 144.941 323.716 323.716c0 178.774-144.941 323.715-323.716 323.715Z"
                    }), e.jsx("g", {
                        children: o.map(({
                            value: H
                        }, F) => (H = H / 100, e.jsx("g", {
                            transform: `rotate(${F*_} ${S} ${S})`,
                            children: H.toString().split("").map((Y, T) => e.jsx("text", {
                                x: Z,
                                y: R1(S, Fe - 40 - T * 40, -100),
                                fill: "#fff",
                                className: "font-extrabold text-4xl tracking-[1rem] [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]",
                                children: Y
                            }, `${F}-${T}`))
                        }, F)))
                    })]
                }), e.jsxs("g", {
                    children: [e.jsx(or, {
                        x: S,
                        y: S
                    }), e.jsx("g", {
                        children: Array.from({
                            length: 12
                        }).map((H, F) => {
                            const T = `rotate(${F*30} ${S} ${S})`;
                            return e.jsxs(l.Fragment, {
                                children: [e.jsx("use", {
                                    href: "#inner-circle-diamond",
                                    x: S - 27 / 2,
                                    y: 270 - 27 / 2,
                                    width: "27",
                                    height: "27",
                                    transform: T
                                }), e.jsx("use", {
                                    href: "#inner-circle-lamp",
                                    x: S - 40 / 2,
                                    y: 270 - 40 / 2,
                                    width: "40",
                                    height: "40",
                                    transform: T
                                })]
                            }, F)
                        })
                    }), e.jsx(ar, {
                        x: S,
                        y: S,
                        isReadyToSpin: n === "ready",
                        onClick: L
                    })]
                }), e.jsx(sr, {
                    x: S,
                    y: -13
                }), e.jsx(tr, {
                    x: S,
                    y: -60
                }), e.jsxs("defs", {
                    children: [e.jsx(Ya, {}), e.jsx(Ja, {}), e.jsx(Xa, {}), e.jsx(er, {}), e.jsxs("linearGradient", {
                        id: "paint2_linear_572_1481",
                        x1: "671.003",
                        x2: "98.65",
                        y1: "6.326",
                        y2: "763.326",
                        gradientUnits: "userSpaceOnUse",
                        children: [e.jsx("stop", {
                            offset: ".44",
                            stopColor: "#fff",
                            stopOpacity: "0"
                        }), e.jsx("stop", {
                            offset: ".52",
                            stopColor: "#fff"
                        }), e.jsx("stop", {
                            offset: ".8",
                            stopColor: "#fff",
                            stopOpacity: "0"
                        })]
                    }), e.jsxs("radialGradient", {
                        id: "paint1_radial_572_1481",
                        cx: "0",
                        cy: "0",
                        r: "1",
                        gradientTransform: "rotate(90 0 384.826) scale(380.5)",
                        gradientUnits: "userSpaceOnUse",
                        children: [e.jsx("stop", {
                            offset: ".87",
                            stopOpacity: ".4"
                        }), e.jsx("stop", {
                            offset: ".91",
                            stopColor: "#141414",
                            stopOpacity: "0"
                        }), e.jsx("stop", {
                            offset: ".95",
                            stopOpacity: "0"
                        }), e.jsx("stop", {
                            offset: ".98",
                            stopOpacity: ".4"
                        })]
                    }), e.jsxs("radialGradient", {
                        id: "paint0_radial_572_1481",
                        cx: "0",
                        cy: "0",
                        r: "1",
                        gradientTransform: "rotate(90 0 384.826) scale(380.5)",
                        gradientUnits: "userSpaceOnUse",
                        children: [e.jsx("stop", {
                            offset: ".99",
                            stopColor: "#fff",
                            stopOpacity: "0"
                        }), e.jsx("stop", {
                            offset: "1",
                            stopColor: "#fff",
                            stopOpacity: ".7"
                        })]
                    }), e.jsxs("radialGradient", {
                        id: "paint27_radial_572_1481",
                        cx: "0",
                        cy: "0",
                        r: "1",
                        gradientTransform: "rotate(90 .063 384.427) scale(323.716)",
                        gradientUnits: "userSpaceOnUse",
                        children: [e.jsx("stop", {
                            offset: ".4",
                            stopOpacity: ".5"
                        }), e.jsx("stop", {
                            offset: ".43",
                            stopOpacity: ".05"
                        }), e.jsx("stop", {
                            offset: ".49",
                            stopOpacity: "0"
                        }), e.jsx("stop", {
                            offset: ".9",
                            stopOpacity: "0"
                        }), e.jsx("stop", {
                            offset: ".99",
                            stopOpacity: ".26"
                        }), e.jsx("stop", {
                            offset: "1",
                            stopOpacity: ".9"
                        })]
                    }), e.jsxs("radialGradient", {
                        id: "paint28_radial_572_1481",
                        cx: "0",
                        cy: "0",
                        r: "1",
                        gradientTransform: "rotate(90 .063 384.427) scale(323.716)",
                        gradientUnits: "userSpaceOnUse",
                        children: [e.jsx("stop", {
                            offset: ".54",
                            stopColor: "#fff",
                            stopOpacity: "0"
                        }), e.jsx("stop", {
                            offset: ".83",
                            stopColor: "#fff",
                            stopOpacity: ".4"
                        }), e.jsx("stop", {
                            offset: ".92",
                            stopColor: "#fff",
                            stopOpacity: ".1"
                        }), e.jsx("stop", {
                            offset: ".99",
                            stopColor: "#fff",
                            stopOpacity: "0"
                        })]
                    })]
                })]
            })
        })
    }),
    cr = p1(dr, {
        fallback: e.jsxs(ft, {
            children: [e.jsx(ct, {
                className: "h-64 w-96"
            }), e.jsx(ct, {
                className: "h-64 w-96"
            })]
        })
    });

function dr() {
    const {
        data: t,
        isLoading: s
    } = ye.useWheelSettings();
    if (s) return e.jsxs(ft, {
        children: [e.jsx(qt, {}), e.jsx(qt, {})]
    });
    const o = t.result.rules;
    return o ? e.jsxs(ft, {
        children: [e.jsx(Wt, {
            title: o.howToWork.title,
            description: o.howToWork.body
        }), e.jsx(Wt, {
            title: o.dailyRules.title,
            description: o.dailyRules.body
        })]
    }) : null
}

function ft({
    children: t
}) {
    return e.jsx("div", {
        dir: "ltr",
        className: "pointer-events-none relative flex max-w-screen-2xl items-start justify-center rounded-[0.3125rem] border-5 border-[rgba(255,255,255,20%)] bg-[#20212A] p-8.5 *:pointer-events-auto",
        children: t
    })
}

function Wt({
    title: t,
    description: s
}) {
    return e.jsxs(D1, {
        children: [e.jsx("div", {
            className: "mb-2.5 font-bold text-22 uppercase",
            children: t
        }), e.jsx("p", {
            className: "whitespace-pre-line text-18",
            children: s
        })]
    })
}

function qt() {
    return e.jsx(D1, {
        children: e.jsx("div", {
            className: "h-full w-full",
            children: e.jsx($, {
                className: "px-60 py-20"
            })
        })
    })
}

function D1({
    children: t
}) {
    return e.jsx("div", {
        className: "flex-1 px-6 py-0.5",
        children: e.jsx("div", {
            className: "rounded-inherit bg-raisin-black",
            children: t
        })
    })
}
const pr = p1(fr, {
    fallback: e.jsx(ct, {
        className: "h-40"
    })
});

function fr() {
    const {
        data: t,
        isLoading: s
    } = ye.useWheelSettings(), {
        $t: o
    } = w(), [a, r] = Te(!1);
    if (s) return e.jsx(Kt, {
        isExpanded: !1,
        children: e.jsx(ur, {})
    });
    const n = t.result.rules;
    return e.jsx(Kt, {
        isExpanded: a,
        children: e.jsxs("button", {
            onClick: r,
            className: "w-full cursor-pointer drop-shadow-[0_-0.125rem_0.375rem_black]",
            type: "button",
            children: [e.jsxs("div", {
                className: "relative z-[1] mx-auto flex h-11 w-fit translate-y-[0.0625rem] items-center gap-x-2 rounded-tl-[1rem] rounded-tr-[1rem] border-1 border-white/20 border-b-0 bg-[#20212A] px-7.5",
                children: [e.jsx(k, {
                    name: "i",
                    className: "size-[1.5em]"
                }), e.jsx("p", {
                    className: "clip-text clip-bg-text-variant-1 font-bold text-2xl/none uppercase",
                    children: o({
                        id: "kAAlGL",
                        defaultMessage: [{
                            type: 0,
                            value: "Rules"
                        }]
                    })
                })]
            }), e.jsxs("div", {
                dir: "ltr",
                className: "border-white/20 border-t-1 bg-[#20212A] p-2.5 text-center",
                children: [e.jsx(Qt, {
                    title: n.howToWork.title,
                    description: n.howToWork.body
                }), e.jsx(Qt, {
                    title: n.dailyRules.title,
                    description: n.dailyRules.body
                })]
            })]
        })
    })
}

function Kt({
    children: t,
    isExpanded: s
}) {
    return e.jsx("div", {
        className: x("fixed bottom-0 left-0 w-full transition-transform duration-300 ease-in-out", s ? "translate-y-0" : "translate-y-[calc(100%-2.75rem)]"),
        children: t
    })
}

function Qt({
    title: t,
    description: s
}) {
    return e.jsxs("div", {
        children: [e.jsx("div", {
            className: "my-3 font-bold text-[1.25rem] uppercase",
            children: t
        }), e.jsx("p", {
            className: "whitespace-pre-line text-start text-[1rem]",
            children: s
        })]
    })
}

function ur() {
    return e.jsx("div", {
        className: "flex w-full flex-col",
        children: e.jsx($, {
            className: "h-10"
        })
    })
}
const V1 = l.memo(({
    amount: t
}) => {
    const s = re();
    return e.jsx("div", {
        className: "clip-bg-text-variant-2 text-center font-bold text-[7cqw]/none",
        children: s(t)
    })
});
V1.displayName = "CongratsAmount";
const G1 = l.memo(({
    text: t
}) => e.jsx("div", {
    className: "clip-bg-text-variant-1 text-center font-biolinum text-[5cqw]/none uppercase shadow-light",
    lang: "en",
    children: t
}));
G1.displayName = "DescriptionText";
const mr = {
    "wheel-fortune": "bg-congrats-wheel",
    "mini-game": "bg-congrats-mini-game",
    bonus: "bg-congrats-bonus"
};

function Et({
    type: t,
    winAmount: s,
    title: o,
    description: a,
    actions: r
}) {
    return e.jsxs("div", {
        dir: t === "bonus" ? "ltr" : "auto",
        "data-type": t,
        className: "flex flex-center flex-col gap-4",
        children: [e.jsxs("div", {
            className: x("relative flex aspect-[770/573] h-full w-[33.75rem] mobile:max-w-full flex-col items-center justify-center bg-center bg-cover bg-no-repeat [container-type:inline-size] landscape:max-w-[100dvh]", mr[t]),
            children: [e.jsx("div", {
                className: "congrats-modal--title",
                lang: "en",
                children: o
            }), e.jsxs("div", {
                className: "absolute bottom-[7%] flex w-full flex-col gap-[2cqw] text-center uppercase",
                children: [e.jsx(G1, {
                    text: a
                }), e.jsx(V1, {
                    amount: s
                })]
            })]
        }), e.jsx("div", {
            className: "mt-auto flex flex-row flex-nowrap justify-center gap-2.5",
            children: r
        })]
    })
}
const hr = "/assets/congrats-bonus-BMAX9BqH.avif";
new Image().src = hr;

function xr({
    handleClose: t
}) {
    const {
        $t: s
    } = w(), {
        data: o
    } = V.useBalances(), a = o == null ? void 0 : o.bonus, r = V.useActivateBonus();

    function n() {
        r.mutate(void 0, {
            onSuccess: () => t()
        })
    }

    function i() {
        t()
    }
    return a ? e.jsx(Et, {
        type: "bonus",
        title: `${a.type}${"!"}`,
        description: `${s({id:"xFXoAY",defaultMessage:[{type:0,value:"bonus"}]})}${"!"}`,
        winAmount: a.amount,
        actions: e.jsxs(e.Fragment, {
            children: [e.jsx(O, {
                type: "secondary",
                onClick: n,
                children: s({
                    id: "O5epsB",
                    defaultMessage: [{
                        type: 0,
                        value: "take"
                    }]
                })
            }), e.jsx(O, {
                type: "primary-variant-1",
                onClick: i,
                className: "min-w-[100px] text-xl",
                children: s({
                    id: "8yIuZe",
                    defaultMessage: [{
                        type: 0,
                        value: "later"
                    }]
                })
            })]
        })
    }) : null
}
const gr = "/assets/congrats-wheel-DuiuX6F5.avif";
new Image().src = gr;

function vr({
    handleTakeWin: t,
    winAmount: s
}) {
    const {
        $t: o
    } = w();
    return e.jsx(Et, {
        type: "wheel-fortune",
        title: o({
            id: "1t5psc",
            defaultMessage: [{
                type: 0,
                value: "congrats!"
            }]
        }),
        description: o({
            id: "clzs3Y",
            defaultMessage: [{
                type: 0,
                value: "you won!"
            }]
        }),
        winAmount: s,
        actions: e.jsx(O, {
            type: "secondary",
            onClick: t,
            className: "min-w-[6.25rem]",
            children: o({
                id: "WAv50a",
                defaultMessage: [{
                    type: 0,
                    value: "get"
                }]
            })
        })
    })
}
const Cr = "/assets/congrats-mini-game-Dt54n5vG.avif";
new Image().src = Cr;

function jr({
    winAmount: t,
    handleTakeWin: s,
    slotType: o
}) {
    const {
        $t: a
    } = w();
    return e.jsx(Et, {
        type: "mini-game",
        title: a({
            id: "clzs3Y",
            defaultMessage: [{
                type: 0,
                value: "you won!"
            }]
        }),
        description: `${o} ${a({id:"PjdNew",defaultMessage:[{type:0,value:"jackpot"}]})} ${"!"}`,
        winAmount: t,
        actions: e.jsx(O, {
            type: "secondary",
            onClick: s,
            className: "min-w-[6.25rem]",
            children: a({
                id: "O5epsB",
                defaultMessage: [{
                    type: 0,
                    value: "take"
                }]
            })
        })
    })
}
const ke = 1280,
    je = {
        searchResults: {
            id: "searchResults"
        },
        allGames: {
            id: "allGames",
            icon: "allGames"
        },
        favourites: {
            id: "favourites",
            icon: "heart"
        },
        recommended: {
            id: "recommended",
            icon: "recommended"
        }
    };

function yr({
    className: t
}) {
    return e.jsx("header", {
        className: x("relative", t),
        children: e.jsx(Q1, {})
    })
}

function Mt({
    className: t
}) {
    var d;
    const s = re(),
        {
            $t: o
        } = w(),
        {
            data: a,
            isPending: r,
            isLoading: n,
            error: i
        } = V.useBalances(),
        c = ((d = a == null ? void 0 : a.balance) == null ? void 0 : d.balance) ? ? 0;
    return n || r ? e.jsx($, {
        className: "desktop:h-9 desktop:w-40"
    }) : i ? e.jsx("div", {
        className: x("text-falu-red text-xl"),
        children: o({
            id: "YZl0YM",
            defaultMessage: [{
                type: 0,
                value: "Balance fetching error"
            }]
        })
    }) : e.jsx("div", {
        className: t,
        children: s(c ? ? 0)
    })
}

function I1({
    className: t
}) {
    const {
        data: s
    } = V.usePlayer(), o = s == null ? void 0 : s.displayableName;
    return e.jsx("div", {
        className: x("whitespace-nowrap", t),
        children: o
    })
}

function wr() {
    var r, n;
    const t = I.useCategoriesListQuery(),
        {
            data: s,
            isLoading: o
        } = t,
        a = ((n = (r = s == null ? void 0 : s.result) == null ? void 0 : r.data) == null ? void 0 : n.filter(({
            tag: i
        }) => i === "header")) || [];
    return {
        query: t,
        headerCategory: a,
        isLoading: o,
        error: s == null ? void 0 : s.error
    }
}

function _r() {
    const {
        $t: t
    } = w();
    return e.jsx("div", {
        className: "mb-6 w-full",
        children: e.jsxs("section", {
            className: "w-full rounded-[0.3125rem] bg-[#101218] px-4 py-2",
            children: [e.jsx("div", {
                className: "mb-5 font-medium text-[#464256] text-[1.125rem]",
                children: t({
                    id: "VKb1MS",
                    defaultMessage: [{
                        type: 0,
                        value: "Categories"
                    }]
                })
            }), e.jsx("div", {
                className: "flex flex-nowrap justify-start overflow-x-auto overflow-y-hidden",
                children: e.jsx(br, {})
            })]
        })
    })
}

function br() {
    const t = q({
            strict: !1,
            select: ({
                cid: n
            }) => n
        }),
        {
            headerCategory: s,
            isLoading: o,
            error: a
        } = wr(),
        {
            closeAllDialogs: r
        } = z();
    if (o) return Ae(4)(n => e.jsx($, {
        className: "mx-1.5 rounded-xl px-14 py-14"
    }, n));
    if (a) {
        const n = new le(a.message, {
            code: a.code
        });
        return e.jsx(U1, {
            error: n
        })
    }
    return e.jsx("ul", {
        className: "nav-list flex gap-2.5",
        children: s.filter(({
            actionType: n
        }) => n !== "sport_history").map(({
            id: n,
            name: i,
            actionType: c,
            actionData: d
        }) => {
            switch (c) {
                case "main":
                    return e.jsx("li", {
                        children: e.jsx(de, {
                            activeOptions: {
                                exact: s.some(({
                                    id: p
                                }) => p === t)
                            },
                            activeProps: {
                                className: "active bg-radical-red text-red"
                            },
                            to: "/casino",
                            children: e.jsx(O, {
                                onClick: r,
                                className: "!w-fit !h-28 min-w-28",
                                activeClassName: "btn_filter_active capitalize",
                                isActive: !s.some(({
                                    id: p
                                }) => p === t),
                                type: "filter",
                                children: e.jsx("span", {
                                    className: "capitalize",
                                    children: i
                                })
                            })
                        })
                    }, n);
                case "game":
                    return e.jsx("li", {
                        children: e.jsx(de, {
                            activeProps: {
                                className: "active"
                            },
                            to: "/game/$gameId",
                            params: {
                                gameId: d
                            },
                            children: e.jsx(O, {
                                onClick: r,
                                className: "!w-fit !h-28 min-w-28 capitalize",
                                activeClassName: "btn_filter_active",
                                isActive: n === t,
                                type: "filter",
                                children: e.jsx("span", {
                                    className: "capitalize",
                                    children: i
                                })
                            })
                        })
                    }, n);
                default:
                    return e.jsx("li", {
                        children: e.jsx(de, {
                            activeProps: {
                                className: "active"
                            },
                            to: "/casino",
                            search: {
                                cid: n
                            },
                            children: e.jsx(O, {
                                onClick: r,
                                className: "!w-fit !h-28 min-w-28 capitalize",
                                activeClassName: "btn_filter_active",
                                isActive: n === t,
                                type: "filter",
                                children: e.jsx("span", {
                                    className: "capitalize",
                                    children: i
                                })
                            })
                        })
                    }, n)
            }
        })
    })
}

function Er() {
    const {
        closeDialog: t
    } = z();
    return e.jsxs("div", {
        className: "flex items-center self-start px-1.5 py-2",
        children: [e.jsx("button", {
            onClick: () => t(),
            type: "button",
            className: "flex flex-center rounded-2xl bg-[#2E303D] p-4",
            children: e.jsx(k, {
                className: "size-4",
                name: "close"
            })
        }), e.jsx(Ze, {
            className: "ms-2.5 h-5"
        }), e.jsx(Ke, {
            className: "ms-auto"
        })]
    })
}

function T1({
    className: t
}) {
    var p, f;
    const {
        $t: s
    } = w(), o = V.useLogOut(), a = ae.useLobby(), r = (f = (p = a == null ? void 0 : a.data) == null ? void 0 : p.buttons) == null ? void 0 : f.logout, n = me(ke), {
        openDialog: i,
        closeDialog: c
    } = z(), d = () => {
        i(e.jsx(Ro, {
            actions: e.jsxs("div", {
                className: "flex gap-2",
                children: [e.jsx(O, {
                    onClick: o.mutate,
                    type: "secondary",
                    children: s({
                        id: "a5msuh",
                        defaultMessage: [{
                            type: 0,
                            value: "Yes"
                        }]
                    })
                }), e.jsx(O, {
                    onClick: () => c(),
                    type: "primary-variant-1",
                    children: s({
                        id: "oUWADl",
                        defaultMessage: [{
                            type: 0,
                            value: "No"
                        }]
                    })
                })]
            })
        }))
    };
    return r ? n ? e.jsx("button", {
        type: "button",
        onClick: d,
        children: e.jsx(k, {
            name: "exit",
            className: "size-5 cursor-pointer text-[#6D7C8D]"
        })
    }) : e.jsx("div", {
        className: t,
        children: e.jsx(O, {
            className: "shrink-0",
            type: "primary",
            onClick: d,
            children: e.jsxs("div", {
                className: "flex items-center gap-2 text-slate-gray",
                children: [e.jsx(k, {
                    name: "exit",
                    className: "h-[1.25em] w-[1.2em] shrink-0"
                }), e.jsx("div", {
                    className: "button--label",
                    children: s({
                        id: "xXbJso",
                        defaultMessage: [{
                            type: 0,
                            value: "Sign out"
                        }]
                    })
                })]
            })
        })
    }) : null
}

function Mr() {
    const {
        $t: t
    } = w();
    return e.jsx("div", {
        className: "mb-2 w-full",
        children: e.jsxs("section", {
            className: "w-full rounded-[0.3125rem] bg-[#181920] px-4 py-2 *:mb-5",
            children: [e.jsxs("div", {
                className: "grid grid-cols-[1fr_auto] items-center",
                children: [e.jsxs("div", {
                    className: "inline-flex items-center gap-x-2 text-[#464256] text-base",
                    children: [t({
                        id: "NhX4DJ",
                        defaultMessage: [{
                            type: 0,
                            value: "Hello"
                        }]
                    }), ",", " ", e.jsx("span", {
                        className: "text-white",
                        children: e.jsx(I1, {})
                    })]
                }), e.jsx(T1, {})]
            }), e.jsxs("div", {
                className: "flex flex-col mobile:items-start items-center mobile-small:items-center justify-center gap-2",
                children: [e.jsx("div", {
                    className: "text-[#464256] text-sm",
                    children: t({
                        id: "qomUJy",
                        defaultMessage: [{
                            type: 0,
                            value: "Current Wallet Balance"
                        }]
                    })
                }), e.jsx(Mt, {
                    className: "font-medium text-3xl"
                })]
            })]
        })
    })
}
const Nr = {
    cashback: Sr,
    bounceback: Or,
    lastchance: Zr,
    fortunewheel: null,
    wagerbonus: null
};

function Fr(t) {
    const s = Nr[t.type];
    return s ? e.jsx(s, {
        bonus: t
    }) : (console.warn(`Unhandled bonus type: ${t.type}`), null)
}

function Ar() {
    const {
        $t: t
    } = w(), {
        data: s,
        isPending: o,
        isLoading: a,
        isError: r,
        error: n
    } = V.useBonusDescription();
    if (o || a) return Ae(18)(c => e.jsx($, {
        className: "mb-2 h-6 py-2"
    }, c));
    if (r) return e.jsx("p", {
        className: "text-falu-red",
        children: n.message
    });
    const i = s.result.data;
    return i.length === 0 ? e.jsx("p", {
        className: "text-center",
        children: t({
            id: "NeLXEk",
            defaultMessage: [{
                type: 0,
                value: "This shop does not provide bonus"
            }]
        })
    }) : e.jsx("div", {
        children: i.map(c => e.jsx("div", {
            className: "mb-8",
            children: Fr(c)
        }, c.stringId))
    })
}

function Sr({
    bonus: t
}) {
    const {
        $t: s
    } = w(), o = re();
    return e.jsxs("section", {
        children: [e.jsx("h2", {
            className: "font-bold text-lg capitalize",
            children: t.type
        }), e.jsx("p", {
            children: s({
                id: "vCe6ro",
                defaultMessage: [{
                    type: 0,
                    value: "The bonus amount is "
                }, {
                    type: 1,
                    value: "depositPercentage"
                }, {
                    type: 0,
                    value: " of the player's deposit amount"
                }]
            }, {
                depositPercentage: e.jsxs("span", {
                    className: "font-bold",
                    children: [t.depositPercentage, "%"]
                })
            })
        }), e.jsx("p", {
            children: s({
                id: "X6Dyo1",
                defaultMessage: [{
                    type: 0,
                    value: "The bonus becomes available to the player when his balance is less than "
                }, {
                    type: 1,
                    value: "threshold"
                }]
            }, {
                threshold: e.jsx("b", {
                    children: o(t.threshold)
                })
            })
        }), e.jsx("p", {
            children: s({
                id: "C/aZo8",
                defaultMessage: [{
                    type: 0,
                    value: "Wager coefficient "
                }, {
                    type: 1,
                    value: "wagerCoeff"
                }]
            }, {
                wagerCoeff: e.jsx("b", {
                    children: t.wagerCoeff
                })
            })
        }), f2(t.cooldown) && Number(t.cooldown) > 0 && e.jsx("p", {
            children: s({
                id: "YQSl1u",
                defaultMessage: [{
                    type: 0,
                    value: "The player can use the bonus once every "
                }, {
                    type: 1,
                    value: "cooldown"
                }, {
                    type: 0,
                    value: " hours"
                }]
            }, {
                cooldown: e.jsx("b", {
                    children: Number(t.cooldown)
                })
            })
        }), e.jsx("p", {
            children: s({
                id: "N+rDHk",
                defaultMessage: [{
                    type: 0,
                    value: "The bonus available for deposits from "
                }, {
                    type: 1,
                    value: "minDeposit"
                }, {
                    type: 0,
                    value: " till "
                }, {
                    type: 1,
                    value: "maxDeposit"
                }]
            }, {
                minDeposit: e.jsx("b", {
                    children: o(t.minDeposit)
                }),
                maxDeposit: e.jsx("b", {
                    children: o(t.maxDeposit)
                })
            })
        }), !!t.happyHours.isEnabled && t.happyHours.from !== null && t.happyHours.to !== null && e.jsxs(e.Fragment, {
            children: [e.jsxs("div", {
                className: "mt-2 flex items-center",
                children: [e.jsx("h4", {
                    className: "mr-2 font-bold text-lg",
                    children: s({
                        id: "PH1C9B",
                        defaultMessage: [{
                            type: 0,
                            value: "Happy hours"
                        }]
                    })
                }), e.jsx("p", {
                    children: s({
                        id: "cimFCb",
                        defaultMessage: [{
                            type: 0,
                            value: "from "
                        }, {
                            type: 1,
                            value: "startTime"
                        }, {
                            type: 0,
                            value: " till "
                        }, {
                            type: 1,
                            value: "endTime"
                        }]
                    }, {
                        startTime: e.jsx("b", {
                            children: new Date(t.happyHours.from).toLocaleString()
                        }),
                        endTime: e.jsx("b", {
                            children: new Date(t.happyHours.to).toLocaleString()
                        }),
                        boost: e.jsxs("b", {
                            children: [Number(t.happyHours.boost), " ", "%"]
                        })
                    })
                })]
            }), e.jsx("p", {
                children: s({
                    id: "Wx7keH",
                    defaultMessage: [{
                        type: 0,
                        value: "if this make deposit at this time, bonus will be increased by "
                    }, {
                        type: 1,
                        value: "boost"
                    }]
                }, {
                    boost: e.jsxs("b", {
                        children: [Number(t.happyHours.boost), " ", "%"]
                    })
                })
            })]
        })]
    })
}

function Or({
    bonus: t
}) {
    const {
        $t: s
    } = w(), o = re();
    return e.jsxs("section", {
        children: [e.jsx("h2", {
            className: "font-bold text-lg capitalize",
            children: t.type
        }), e.jsx("p", {
            children: s({
                id: "vCe6ro",
                defaultMessage: [{
                    type: 0,
                    value: "The bonus amount is "
                }, {
                    type: 1,
                    value: "depositPercentage"
                }, {
                    type: 0,
                    value: " of the player's deposit amount"
                }]
            }, {
                depositPercentage: e.jsxs("span", {
                    className: "font-bold",
                    children: [t.depositPercentage, "%"]
                })
            })
        }), e.jsx("p", {
            children: s({
                id: "ULE2Jb",
                defaultMessage: [{
                    type: 0,
                    value: "The bonus is available to the player within a 5-7 minutes after making a deposit"
                }]
            })
        }), e.jsx("p", {
            children: s({
                id: "C/aZo8",
                defaultMessage: [{
                    type: 0,
                    value: "Wager coefficient "
                }, {
                    type: 1,
                    value: "wagerCoeff"
                }]
            }, {
                wagerCoeff: e.jsx("b", {
                    children: t.wagerCoeff
                })
            })
        }), e.jsx("p", {
            children: s({
                id: "N+rDHk",
                defaultMessage: [{
                    type: 0,
                    value: "The bonus available for deposits from "
                }, {
                    type: 1,
                    value: "minDeposit"
                }, {
                    type: 0,
                    value: " till "
                }, {
                    type: 1,
                    value: "maxDeposit"
                }]
            }, {
                minDeposit: e.jsx("b", {
                    children: o(t.minDeposit)
                }),
                maxDeposit: e.jsx("b", {
                    children: o(t.maxDeposit)
                })
            })
        }), !!t.happyHours.isEnabled && t.happyHours.from !== null && t.happyHours.to !== null && e.jsxs(e.Fragment, {
            children: [e.jsxs("div", {
                className: "mt-2 flex items-center",
                children: [e.jsx("h4", {
                    className: "mr-2 font-bold text-lg",
                    children: s({
                        id: "PH1C9B",
                        defaultMessage: [{
                            type: 0,
                            value: "Happy hours"
                        }]
                    })
                }), e.jsx("p", {
                    children: s({
                        id: "cimFCb",
                        defaultMessage: [{
                            type: 0,
                            value: "from "
                        }, {
                            type: 1,
                            value: "startTime"
                        }, {
                            type: 0,
                            value: " till "
                        }, {
                            type: 1,
                            value: "endTime"
                        }]
                    }, {
                        startTime: e.jsx("b", {
                            children: new Date(t.happyHours.from).toLocaleString()
                        }),
                        endTime: e.jsx("b", {
                            children: new Date(t.happyHours.to).toLocaleString()
                        }),
                        boost: e.jsxs("b", {
                            children: [Number(t.happyHours.boost), " ", "%"]
                        })
                    })
                })]
            }), e.jsx("p", {
                children: s({
                    id: "Wx7keH",
                    defaultMessage: [{
                        type: 0,
                        value: "if this make deposit at this time, bonus will be increased by "
                    }, {
                        type: 1,
                        value: "boost"
                    }]
                }, {
                    boost: e.jsxs("b", {
                        children: [Number(t.happyHours.boost), " ", "%"]
                    })
                })
            })]
        })]
    })
}

function Zr({
    bonus: t
}) {
    const {
        $t: s
    } = w(), o = re();
    return e.jsxs("section", {
        children: [e.jsx("h2", {
            className: "font-bold text-lg capitalize",
            children: t.type
        }), e.jsx("p", {
            children: s({
                id: "vCe6ro",
                defaultMessage: [{
                    type: 0,
                    value: "The bonus amount is "
                }, {
                    type: 1,
                    value: "depositPercentage"
                }, {
                    type: 0,
                    value: " of the player's deposit amount"
                }]
            }, {
                depositPercentage: e.jsxs("span", {
                    className: "font-bold",
                    children: [t.depositPercentage, "%"]
                })
            })
        }), e.jsx("p", {
            children: s({
                id: "X6Dyo1",
                defaultMessage: [{
                    type: 0,
                    value: "The bonus becomes available to the player when his balance is less than "
                }, {
                    type: 1,
                    value: "threshold"
                }]
            }, {
                threshold: e.jsx("b", {
                    children: o(t.threshold)
                })
            })
        }), e.jsx("p", {
            children: s({
                id: "C/aZo8",
                defaultMessage: [{
                    type: 0,
                    value: "Wager coefficient "
                }, {
                    type: 1,
                    value: "wagerCoeff"
                }]
            }, {
                wagerCoeff: e.jsx("b", {
                    children: t.wagerCoeff
                })
            })
        }), !Number.isNaN(t.cooldown) && e.jsx("p", {
            children: s({
                id: "YQSl1u",
                defaultMessage: [{
                    type: 0,
                    value: "The player can use the bonus once every "
                }, {
                    type: 1,
                    value: "cooldown"
                }, {
                    type: 0,
                    value: " hours"
                }]
            }, {
                cooldown: e.jsx("b", {
                    children: Number(t.cooldown)
                })
            })
        })]
    })
}

function P1({
    className: t,
    topText: s,
    bottomText: o,
    icon: a
}) {
    return e.jsx("div", {
        className: x(t, "h-64 max-h-full min-h-36 flex-center"),
        children: e.jsxs("div", {
            className: "text-center font-bold desktop:text-xl text-base text-white",
            children: [s && e.jsx("div", {
                children: s
            }), e.jsx("div", {
                className: "desktop:my-5 my-3 inline-block",
                children: a
            }), o && e.jsx("div", {
                children: o
            })]
        })
    })
}

function Br(t, s) {
    return t({
        id: `bonus_status/${s}`,
        defaultMessage: s
    })
}

function kr({
    className: t
}) {
    const s = re(),
        {
            intl: o
        } = pe(),
        {
            data: a,
            isLoading: r
        } = V.useBonusHistory(),
        {
            $t: n
        } = w(),
        i = a && a.length > 0;
    return e.jsxs("div", {
        className: x(t, "flex flex-col"),
        children: [!i && !r && e.jsx(P1, {
            topText: n({
                id: "bLZkJk",
                defaultMessage: [{
                    type: 0,
                    value: "Your bonus will be here soon"
                }]
            }),
            icon: e.jsx(k, {
                name: "bonusGift",
                className: "w-18"
            })
        }), r && Ae(10)(c => e.jsx($, {
            className: "mb-2 h-9 bg-silver"
        }, c)), i && e.jsx("div", {
            className: "overflow-y-auto",
            children: e.jsx("div", {
                className: "desktop:ml-2",
                children: e.jsxs("table", {
                    className: "bonuses-table desktop:-ml-2",
                    children: [e.jsx("thead", {
                        children: e.jsxs("tr", {
                            children: [e.jsx("th", {
                                children: n({
                                    id: "P7PLVj",
                                    defaultMessage: [{
                                        type: 0,
                                        value: "Date"
                                    }]
                                })
                            }), e.jsx("th", {
                                children: n({
                                    id: "saDFoR",
                                    defaultMessage: [{
                                        type: 0,
                                        value: "Bonus"
                                    }]
                                })
                            }), e.jsx("th", {
                                children: n({
                                    id: "wUw9WW",
                                    defaultMessage: [{
                                        type: 0,
                                        value: "Wager"
                                    }]
                                })
                            }), e.jsx("th", {
                                children: n({
                                    id: "/0TOL5",
                                    defaultMessage: [{
                                        type: 0,
                                        value: "Amount"
                                    }]
                                })
                            }), e.jsx("th", {
                                children: n({
                                    id: "tzMNF3",
                                    defaultMessage: [{
                                        type: 0,
                                        value: "Status"
                                    }]
                                })
                            })]
                        })
                    }), e.jsx("tbody", {
                        children: a.map(c => e.jsxs("tr", {
                            children: [e.jsx("td", {
                                children: new Date(c.lastStatusChangeAt * 1e3).toLocaleString(o.locale, {
                                    timeStyle: "short",
                                    dateStyle: "short"
                                })
                            }), e.jsx("td", {
                                children: c.type
                            }), e.jsx("td", {
                                className: "[text-align:match-parent]",
                                children: s(c.initialWager ? ? 0, {
                                    style: "decimal"
                                })
                            }), e.jsx("td", {
                                className: "[text-align:match-parent]",
                                children: s(c.amount ? ? 0, {
                                    style: "decimal"
                                })
                            }), e.jsx("td", {
                                children: Br(n, c.status)
                            })]
                        }, c.id))
                    })]
                })
            })
        })]
    })
}
const Lr = () => {
    const {
        data: t,
        isLoading: s
    } = I.useNoWagerGames(), {
        data: o,
        isLoading: a
    } = I.useNoJackpotGames(), r = n => {
        if (!(!n || !(n != null && n.length))) return n.reduce((i, c) => (i[c.providerName] || (i[c.providerName] = []), i[c.providerName].push(c), i), {})
    };
    return {
        noWagerGames: t ? r(t.data) : null,
        noJackpotGames: o ? r(o.data) : null,
        isNoWagerLoading: s,
        isNoJackpotLoading: a
    }
};

function Rr() {
    const {
        $t: t
    } = w(), {
        noJackpotGames: s,
        noWagerGames: o,
        isNoWagerLoading: a,
        isNoJackpotLoading: r
    } = Lr();
    if (r || a) return Ae(10)(c => e.jsx($, {
        className: "mb-2 h-9 bg-silver"
    }, c));
    const n = o && e.jsxs("div", {
            className: "mt-5 flex flex-col gap-2",
            children: [e.jsx("p", {
                className: "font-bold text-lg",
                children: t({
                    id: "yoArFw",
                    defaultMessage: [{
                        type: 0,
                        value: "A list of games in which the bonus cannot be wagered"
                    }]
                })
            }), Object.keys(o || {}).map(c => {
                var d;
                return e.jsxs("div", {
                    children: [e.jsxs("span", {
                        className: "font-bold",
                        children: [c, ":"]
                    }), e.jsx("span", {
                        className: "comma",
                        children: (d = o == null ? void 0 : o[c]) == null ? void 0 : d.map(p => e.jsx("span", {
                            className: "game-name ml-2",
                            children: p.name
                        }, p.stringId))
                    })]
                }, c)
            })]
        }),
        i = s && e.jsxs("div", {
            className: "mt-10 flex flex-col gap-2",
            children: [e.jsx("p", {
                className: "font-bold text-lg",
                children: t({
                    id: "HIonBS",
                    defaultMessage: [{
                        type: 0,
                        value: "List of games in which the jackpot does not accumulate and cannot be received"
                    }]
                })
            }), Object.keys(s || {}).map(c => {
                var d;
                return e.jsxs("div", {
                    className: "",
                    children: [e.jsxs("span", {
                        className: "font-bold",
                        children: [c, " ", ":"]
                    }), e.jsx("span", {
                        className: "comma",
                        children: (d = s == null ? void 0 : s[c]) == null ? void 0 : d.map(p => e.jsx("span", {
                            className: "game-name ml-2",
                            children: p.name
                        }, p.stringId))
                    })]
                }, c)
            })]
        });
    return e.jsxs("div", {
        className: "mobile:w-[calc(100%-2rem)]",
        children: [n, i]
    })
}

function $1() {
    var c, d;
    const {
        $t: t
    } = w(), {
        closeDialog: s
    } = z(), o = re(), {
        data: a
    } = V.usePlayer(), {
        data: r
    } = V.useBalances(), n = (a == null ? void 0 : a.displayableName) ? ? "???", i = ((c = r == null ? void 0 : r.balance) == null ? void 0 : c.balance) ? ? 0;
    return e.jsx(e.Fragment, {
        children: e.jsxs("div", {
            className: "relative flex h-[80dvh] mobile:h-[100dvh] mobile:w-full w-[50rem] flex-col items-center overflow-hidden rounded-lg border-2 border-primary mobile:border-none bg-black desktop:px-8 mobile:px-2 desktop:py-6",
            children: [e.jsx("div", {
                className: "mb-5 w-full justify-center mobile:px-10 px-7.5 mobile:pt-3 font-medium font-oswald desktop:text-4xl text-3xl uppercase italic lg:text-center",
                children: e.jsx("p", {
                    className: "title-gray z-10 w-full bg-clip-text text-center text-transparent",
                    children: t({
                        id: "we4Lby",
                        defaultMessage: [{
                            type: 0,
                            value: "Info"
                        }]
                    })
                })
            }), e.jsxs("div", {
                className: "flex h-full min-h-0 desktop:w-[46.125rem] mobile:w-full flex-col overflow-y-auto",
                children: [e.jsxs("div", {
                    className: "mb-8",
                    children: [e.jsxs("div", {
                        className: "flex items-center gap-1 whitespace-nowrap",
                        children: [e.jsx(k, {
                            className: "h-[1.2em] w-[1.2em] shrink-0",
                            name: "profile"
                        }), e.jsx("div", {
                            className: "font-bold text-lg",
                            children: n
                        })]
                    }), e.jsxs("div", {
                        className: "flex text-xl",
                        children: [e.jsxs("span", {
                            children: [t({
                                id: "H5+NAX",
                                defaultMessage: [{
                                    type: 0,
                                    value: "Balance"
                                }]
                            }), ":"]
                        }), e.jsx("span", {
                            className: "ms-2 font-bold",
                            children: o(i ? ? 0)
                        })]
                    }), e.jsxs("div", {
                        className: "flex text-xl",
                        children: [e.jsxs("span", {
                            className: "capitalize",
                            children: [t({
                                id: "PZNVw+",
                                defaultMessage: [{
                                    type: 0,
                                    value: "wager"
                                }]
                            }), ":"]
                        }), e.jsx("span", {
                            className: "ms-2 font-bold",
                            children: o(((d = r == null ? void 0 : r.wager) == null ? void 0 : d.remaining) ? ? "N/A")
                        })]
                    })]
                }), e.jsx(kr, {}), e.jsx("div", {
                    className: "mt-8 font-bold text-lg",
                    children: t({
                        id: "4FKxkF",
                        defaultMessage: [{
                            type: 0,
                            value: "Bonuses Rules"
                        }]
                    })
                }), e.jsx("div", {
                    className: "text-balance",
                    children: t({
                        id: "npeEXd",
                        defaultMessage: [{
                            type: 0,
                            value: "All bonuses are issued at the time of making a deposit. To use the bonus, the player must explicitly accept it by clicking the TAKE button in the lobby. At the same time, a player can have only one bonus. The bonus can be canceled under certain conditions"
                        }]
                    })
                }), e.jsxs("div", {
                    className: "mb-8",
                    children: [e.jsx("div", {
                        className: "mt-8 font-bold text-lg",
                        children: t({
                            id: "qGeBzm",
                            defaultMessage: [{
                                type: 0,
                                value: "Automatic bonus cancellation rules"
                            }]
                        })
                    }), e.jsx("span", {
                        className: "whitespace-pre-line",
                        children: t({
                            id: "OJMqo5",
                            defaultMessage: [{
                                type: 0,
                                value: "Bonus has not been wagered. Attempt to withdraw money"
                            }, {
                                type: 1,
                                value: "br"
                            }, {
                                type: 0,
                                value: "Withdraw amount <= min Withdraw limit settings"
                            }]
                        }, {
                            br: e.jsx("br", {})
                        })
                    })]
                }), e.jsx(Ar, {}), e.jsx(Rr, {})]
            }), e.jsx("button", {
                className: x("absolute desktop:top-6 top-3 z-10 block size-8 focus-visible:outline-none ltr:desktop:right-6 ltr:right-3 rtl:desktop:left-6 rtl:left-3"),
                type: "button",
                onClick: () => s(),
                children: e.jsx(k, {
                    className: "size-full text-white",
                    name: "close"
                })
            })]
        })
    })
}

function Yt(t) {
    return Gs(String(t), 3, "-")
}
const Hr = "0000000000000000";

function W1({
    className: t,
    children: s,
    onClick: o
}) {
    return e.jsx("div", {
        className: x("member-card--card", t),
        onClick: o,
        children: s
    })
}

function zr({
    onClick: t
}) {
    return e.jsx(W1, {
        className: "member-card--card-front",
        onClick: t,
        children: e.jsx(Ze, {
            className: "h-12"
        })
    })
}

function Ur() {
    var u;
    const [t, s] = l.useState("000-000"), o = l.useRef(null), {
        $t: a
    } = w(), {
        data: r,
        isFetching: n
    } = Bt.useCurrent(), {
        mutate: i,
        isPending: c
    } = Bt.usePinGenerator(), d = (r == null ? void 0 : r.memberCard) || Hr;

    function p({
        result: m
    }) {
        m && s(Yt(m))
    }

    function f(m) {
        m.stopPropagation(), i(void 0, {
            onSuccess: p
        })
    }
    return l.useEffect(() => {
        r != null && r.pin && s(Yt(r.pin))
    }, [r == null ? void 0 : r.pin]), l.useEffect(() => {
        c && o.current && o.current.classList.add("animate-spin")
    }, [c]), l.useEffect(() => {
        bs("#member-card-barcode", d, {
            background: "transparent",
            font: "Ubuntu",
            fontOptions: "bold",
            fontSize: 12,
            textMargin: 8,
            margin: 0,
            height: 150,
            displayValue: !1
        })
    }, [d]), e.jsx(W1, {
        className: "member-card--card-back",
        children: e.jsxs("div", {
            className: "absolute inset-0 flex-center flex-col gap-[0.5em] py-[1.5em]",
            children: [e.jsxs("div", {
                className: "flex h-[1em] min-h-0 items-center gap-[0.25em] font-bold",
                children: [e.jsxs("span", {
                    className: "text-[0.75em]",
                    children: [a({
                        id: "e/4U0n",
                        defaultMessage: [{
                            type: 0,
                            value: "PIN"
                        }]
                    }), ":"]
                }), n || c ? e.jsx($, {
                    className: "h-full w-[2.8125em]"
                }) : e.jsx("span", {
                    className: "text-[0.75em]",
                    children: t
                }), e.jsx("div", {
                    ref: o,
                    onClick: f,
                    onAnimationIteration: m => !c && m.currentTarget.classList.remove("animate-spin"),
                    className: "relative inline-block size-[1em] cursor-pointer",
                    children: e.jsx(J, {
                        name: "reload"
                    })
                })]
            }), e.jsx("svg", {
                className: "mx-auto min-h-0 w-auto max-w-full grow",
                id: "member-card-barcode"
            }), n ? e.jsx($, {
                className: "h-[1em] w-1/2"
            }) : e.jsx("div", {
                className: "h-[1em] min-h-0 font-bold",
                children: e.jsx("div", {
                    className: "text-[0.75em] leading-none",
                    children: (u = u2(d, 4)) == null ? void 0 : u.join("-")
                })
            })]
        })
    })
}

function Dr({
    onClick: t
}) {
    const {
        $t: s
    } = w();
    return e.jsx(O, {
        type: "primary",
        onClick: t,
        className: "whitespace-normal [&_.btn]:whitespace-normal",
        children: s({
            id: "Zl90tZ",
            defaultMessage: [{
                type: 0,
                value: "log in to the kiosk using barcode"
            }]
        })
    })
}

function Vr() {
    const {
        $t: t
    } = w(), {
        closeAllDialogs: s
    } = z();
    return e.jsx(de, {
        to: "/",
        onClick: () => s(),
        className: "mt-6 w-fit font-bold text-14 uppercase underline",
        children: t({
            id: "7uEFWZ",
            defaultMessage: [{
                type: 0,
                value: "back to the lobby"
            }]
        })
    })
}

function Gr({
    className: t
}) {
    const {
        $t: s
    } = w();
    return e.jsx("p", {
        className: x("mt-4 font-medium text-12 leading-6 tracking-wide", t),
        children: s({
            id: "0dUAmn",
            defaultMessage: [{
                type: 0,
                value: "Add the virtual Member Card to the home screen. In browser options press "
            }, {
                type: 1,
                value: "icon"
            }, {
                type: 0,
                value: ' and tap "Add to home screen"!'
            }]
        }, {
            icon: e.jsxs("svg", {
                className: "inline-block size-4",
                fill: "none",
                viewBox: "0 0 42 49",
                children: [e.jsx("path", {
                    stroke: "currentColor",
                    strokeWidth: "2",
                    d: "M12.96 15H1v33h40V15H28.66"
                }), e.jsx("path", {
                    fill: "currentColor",
                    d: "M21.7.3a1 1 0 0 0-1.4 0l-6.37 6.36a1 1 0 0 0 1.41 1.41L21 2.41l5.66 5.66a1 1 0 1 0 1.41-1.41L21.71.29ZM22 29V1h-2v28h2Z"
                })]
            })
        })
    })
}
const Ir = l.memo(function() {
    const {
        $t: s
    } = w(), {
        closeDialog: o
    } = z(), [a, r] = Te(!1);
    return e.jsxs("div", {
        className: "relative flex h-[80dvh] mobile:h-[100dvh] mobile:w-[100dvw] w-[50rem] flex-col items-center overflow-hidden rounded-lg border-2 border-primary mobile:border-none bg-black desktop:px-8 mobile:px-2 desktop:py-6",
        children: [e.jsx("div", {
            className: "w-full justify-center mobile:pt-3 font-medium font-oswald desktop:text-4xl text-3xl uppercase italic lg:text-center",
            children: e.jsx("p", {
                className: "title-gray z-10 mb-5 w-full bg-clip-text mobile:pe-11 text-transparent",
                children: s({
                    id: "jNzMH7",
                    defaultMessage: [{
                        type: 0,
                        value: "Member card"
                    }]
                })
            })
        }), e.jsxs("div", {
            className: "flex h-full min-h-0 desktop:w-[46.125rem] mobile:w-full flex-col overflow-y-auto",
            children: [e.jsxs("div", {
                className: `relative mx-auto flex w-full max-w-[25rem] select-none flex-col items-center transition-[aspect-ratio] ${a?"[aspect-ratio:1/1.2]":"[aspect-ratio:1.3/1]"}`,
                children: [e.jsx(Ur, {}), e.jsx(zr, {
                    onClick: r
                })]
            }), e.jsxs("div", {
                className: "relative mt-10 flex flex-col items-center text-center",
                children: [e.jsx(Dr, {
                    onClick: r
                }), e.jsx(Vr, {}), e.jsx(Gr, {
                    className: "lg:hidden"
                })]
            })]
        }), e.jsx("button", {
            className: x("absolute desktop:top-6 top-3 z-10 block size-8 focus-visible:outline-none ltr:desktop:right-6 ltr:right-3 rtl:desktop:left-6 rtl:left-3"),
            type: "button",
            onClick: () => o(),
            children: e.jsx(k, {
                className: "size-full text-white",
                name: "close"
            })
        }), e.jsx("div", {})]
    })
});

function Tr(t, s) {
    const o = s ** 10;
    return Math.floor(Number(t) * o) / o
}
const Jt = t => Tr(t, 2);

function Pr({
    createdAt: t,
    uid: s,
    eventsToGuessNum: o,
    description: a,
    typeEx: r,
    odds: n,
    bet: i,
    win: c,
    currency: d,
    status: p,
    bonusAmount: f = 0,
    outcomeStatus: u,
    events: m
}) {
    var T;
    const {
        $t: h
    } = w(), v = re(), j = p === "cancelled" || u === "cancelled", C = u === "win", y = u === "half_win", _ = u === "half_lost", b = u === "draw", N = u === "lost", Z = f > 0, g = new Date(t).toLocaleDateString(), M = ((T = s == null ? void 0 : s.match(/.{1,4}/g)) == null ? void 0 : T.join(" ")) ? ? s, L = Jt(n), K = v(f, {
        currency: d
    }), H = v(i, {
        currency: d
    }), F = v(c, {
        currency: d
    });
    let Y = e.jsx(e.Fragment, {});
    return Z && (C || y || _ || b) ? Y = e.jsxs("div", {
        className: "br self-end font-bold",
        children: [e.jsx("span", {
            className: "font-light",
            children: h({
                id: "saDFoR",
                defaultMessage: [{
                    type: 0,
                    value: "Bonus"
                }]
            }) + ": "
        }), e.jsx("span", {
            children: K
        })]
    }) : p === "cashout" ? Y = e.jsx("div", {
        className: "br self-end font-bold desktop:text-sm text-2xs uppercase",
        children: h({
            id: "DKo8XH",
            defaultMessage: [{
                type: 0,
                value: "cashout"
            }]
        })
    }) : j && (Y = e.jsx("div", {
        className: "tr self-end font-bold desktop:text-sm text-2xs uppercase",
        children: h({
            id: "8XMLza",
            defaultMessage: [{
                type: 0,
                value: "cancelled"
            }]
        })
    })), e.jsxs("div", {
        className: "coupon",
        children: [e.jsx("div", {
            className: `desktop:px-5 px-3 desktop:py-2.5 py-1.5 ${C?"bg-keppel":"bg-dusty-gray"}`,
            children: e.jsxs("div", {
                className: "flex-c-sb font-bold uppercase",
                children: [e.jsxs("div", {
                    className: "whitespace-pre",
                    children: [g, " ", r === "single" ? r : a]
                }), o > 1 && e.jsx("div", {
                    children: L
                })]
            })
        }), m.map((Q, B) => {
            const G = Q.status === "win",
                U = Q.status === "lose";
            return e.jsxs("div", {
                className: x("flex flex-col desktop:gap-2.5 gap-1.5 overflow-hidden bg-white desktop:px-5 px-3 desktop:py-2.5 py-1.5", B > 0 && "rounded-t-xl border-mercury border-t-2 border-dashed", m.length > 1 && B !== m.length - 1 && "rounded-b-xl", `coupon-status_${U?"lost":Q.status}`),
                children: [e.jsxs("div", {
                    className: "flex-c-sb",
                    children: [e.jsx("div", {
                        className: "font-black",
                        children: Q.name
                    }), e.jsx("div", {
                        className: "font-bold",
                        children: Jt(Q.odds)
                    })]
                }), e.jsxs("div", {
                    className: "flex-c-sb font-bold",
                    children: [e.jsx("div", {
                        className: "text-keppel",
                        children: Q.sport
                    }), e.jsx("div", {
                        children: Q.categoryName
                    })]
                }), e.jsxs("div", {
                    className: "flex-c-sb",
                    children: [e.jsxs("div", {
                        children: [e.jsx("span", {
                            className: "font-bold",
                            children: Q.selName
                        }), " ", e.jsx("span", {
                            className: "font-light",
                            children: `(${Q.marketName})`
                        })]
                    }), e.jsx("div", {
                        className: "desktop:size-5.5 size-4",
                        children: G ? e.jsx("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            width: "100%",
                            height: "100%",
                            viewBox: "0 0 22 23",
                            children: e.jsx("path", {
                                className: "fill-keppel dark:fill-java",
                                fillRule: "evenodd",
                                d: "M11 22.904c6.075 0 11-4.925 11-11s-4.925-11-11-11-11 4.925-11 11 4.925 11 11 11Zm-.869-4.759 8.108-9.266-2.258-1.975-5.893 6.734L6.22 9.383 4 11.4l6.131 6.744Z"
                            })
                        }) : U && e.jsx("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            width: "100%",
                            height: "100%",
                            viewBox: "0 0 22 23",
                            children: e.jsx("path", {
                                className: "fill-radical-red",
                                fillRule: "evenodd",
                                d: "M11 22.904c6.075 0 11-4.925 11-11s-4.925-11-11-11-11 4.925-11 11 4.925 11 11 11ZM16.85 8.56l-3.535 3.535 3.535 3.536-2.121 2.121-3.536-3.536-3.535 3.536-2.122-2.121 3.536-3.536-3.535-3.535 2.12-2.122 3.536 3.536 3.536-3.536 2.121 2.122Z"
                            })
                        })
                    })]
                })]
            }, B)
        }), e.jsxs("div", {
            className: x("status-win bg-white desktop:px-5 px-3", `coupon-status_${u}`),
            children: [e.jsx("hr", {
                className: "border-1"
            }), e.jsxs("div", {
                className: "coupon-footer",
                children: [e.jsxs("div", {
                    className: "tl whitespace-pre font-bold",
                    children: [e.jsx("span", {
                        className: "font-light",
                        children: h({
                            id: "+Cvc8Z",
                            defaultMessage: [{
                                type: 0,
                                value: "Bet"
                            }]
                        }) + ": "
                    }), e.jsx("span", {
                        children: H
                    })]
                }), p === "cashout" ? e.jsx(ve, {
                    children: e.jsx("span", {
                        children: F
                    })
                }) : e.jsxs(e.Fragment, {
                    children: [C && e.jsxs(ve, {
                        children: [e.jsx("span", {
                            className: "font-light",
                            children: h({
                                id: "UFNhAb",
                                defaultMessage: [{
                                    type: 0,
                                    value: "Win"
                                }]
                            }) + ": "
                        }), e.jsx("span", {
                            children: F
                        }), e.jsx(st, {})]
                    }), y && e.jsxs(ve, {
                        children: [e.jsx("span", {
                            className: "font-light",
                            children: h({
                                id: "2hMg/k",
                                defaultMessage: [{
                                    type: 0,
                                    value: "Half win"
                                }]
                            }) + ": "
                        }), e.jsx("span", {
                            children: F
                        }), e.jsx(st, {})]
                    }), _ && e.jsxs(ve, {
                        children: [e.jsx("span", {
                            className: "font-light",
                            children: h({
                                id: "6tKvNI",
                                defaultMessage: [{
                                    type: 0,
                                    value: "Half lose"
                                }]
                            }) + ": "
                        }), e.jsx("span", {
                            children: F
                        }), e.jsx(st, {})]
                    }), b && e.jsxs(ve, {
                        children: [e.jsx("span", {
                            className: "font-light",
                            children: "Draw: "
                        }), e.jsx("span", {
                            children: F
                        })]
                    }), N && e.jsx(ve, {
                        children: h({
                            id: "iJzmXx",
                            defaultMessage: [{
                                type: 0,
                                value: "Lose"
                            }]
                        })
                    })]
                }), e.jsxs("div", {
                    className: "bl self-end desktop:text-2xs text-3xs",
                    children: [h({
                        id: "qlcuNQ",
                        defaultMessage: [{
                            type: 0,
                            value: "ID"
                        }]
                    }) + ": ", " ", M]
                }), Y]
            })]
        })]
    })
}

function ve({
    children: t
}) {
    return e.jsx("div", {
        className: "tr flex items-center justify-end whitespace-pre font-bold",
        children: t
    })
}

function st() {
    return e.jsx("svg", {
        className: "ml-1 desktop:size-3.5 size-3",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 14 15",
        children: e.jsx("path", {
            className: "fill-java",
            d: "M14 8.275 7.368.905.734 8.275h3.683v6.628h5.896V8.275h3.688Z"
        })
    })
}

function Xt({
    status: t
}) {
    const {
        data: s,
        fetchNextPage: o,
        isFetchingNextPage: a,
        isLoading: r
    } = Ws.useSportBetHistory(t), n = a2(o, null), {
        $t: i
    } = w(), c = l.useMemo(() => (s == null ? void 0 : s.pages.flatMap(p => {
        var f;
        return (f = p.result) == null ? void 0 : f.data
    })) ? ? [], [s]), d = c.length > 0;
    return e.jsxs("div", {
        className: "relative h-full max-h-full min-h-0 overflow-y-auto",
        ref: n,
        children: [!d && !a && !r && e.jsx(P1, {
            topText: i(t === "created" ? {
                id: "efWhFy",
                defaultMessage: [{
                    type: 0,
                    value: "You have no active bets"
                }]
            } : {
                id: "7LXMBk",
                defaultMessage: [{
                    type: 0,
                    value: "You have no completed bets"
                }]
            }),
            bottomText: t === "created" ? i({
                id: "5WP2Qw",
                defaultMessage: [{
                    type: 0,
                    value: "Place a new bid"
                }]
            }) : void 0,
            icon: e.jsx(k, {
                name: "searchTicket",
                className: "w-28"
            })
        }), r && e.jsxs(e.Fragment, {
            children: [e.jsx($, {
                className: "desktop:mb-5 mb-3 desktop:h-56 h-40 bg-silver"
            }), e.jsx($, {
                className: "desktop:mb-5 mb-3 desktop:h-56 h-40 bg-silver"
            })]
        }), d && c.map((p, f) => e.jsx(Pr, { ...p
        }, f)), a && e.jsx("div", {
            className: "my-2 flex h-10 items-center justify-center",
            children: e.jsx(k, {
                className: "animate-spin *:size-5",
                name: "reload"
            })
        })]
    })
}

function q1() {
    const {
        $t: t
    } = w(), {
        closeDialog: s
    } = z();
    return e.jsxs("div", {
        className: "relative flex h-[80dvh] mobile:h-[100dvh] mobile:w-[100dvw] w-[50rem] flex-col items-center overflow-hidden rounded-lg border-2 border-primary mobile:border-none bg-black desktop:px-8 mobile:px-2 desktop:py-6",
        children: [e.jsx("div", {
            className: "mb-5 w-full justify-center mobile:px-10 px-7.5 mobile:pt-3 font-medium font-oswald desktop:text-4xl text-3xl uppercase italic lg:text-center",
            children: e.jsx("p", {
                className: "title-gray z-10 w-full bg-clip-text text-center text-transparent",
                children: t({
                    id: "y8wjUE",
                    defaultMessage: [{
                        type: 0,
                        value: "Sport Bets"
                    }]
                })
            })
        }), e.jsx("div", {
            className: "bet-history flex h-full min-h-0 desktop:w-[46.125rem] mobile:w-full flex-col overflow-y-auto",
            children: e.jsx(Oo, {
                items: [{
                    label: t({
                        id: "mWAtqc",
                        defaultMessage: [{
                            type: 0,
                            value: "In game"
                        }]
                    }),
                    children: e.jsx(Xt, {
                        status: "created"
                    })
                }, {
                    label: t({
                        id: "95stPq",
                        defaultMessage: [{
                            type: 0,
                            value: "Completed"
                        }]
                    }),
                    children: e.jsx(Xt, {
                        status: "non-created"
                    })
                }]
            })
        }), e.jsx("button", {
            className: x("absolute desktop:top-6 top-3 z-10 block size-8 focus-visible:outline-none ltr:desktop:right-6 ltr:right-3 rtl:desktop:left-6 rtl:left-3"),
            type: "button",
            onClick: () => s(),
            children: e.jsx(k, {
                className: "size-full text-white",
                name: "close"
            })
        }), e.jsx("div", {})]
    })
}

function $r() {
    var d;
    const {
        $t: t
    } = w(), s = te(), {
        closeDialog: o,
        openDialog: a
    } = z(), n = !!((d = ae.useLobby().data) != null && d.showSportHistory), i = l.useMemo(() => ({
        betHistory: () => a(e.jsx(q1, {})),
        memberCard: () => a(e.jsx(Ir, {})),
        info: () => a(e.jsx($1, {})),
        recommended: () => {
            o(), s({
                replace: !0,
                search: p => ({ ...p,
                    modal: void 0,
                    pid: void 0,
                    cid: je.recommended.id
                })
            })
        },
        favourite: () => {
            o(), s({
                replace: !0,
                search: p => ({ ...p,
                    modal: void 0,
                    pid: void 0,
                    cid: je.favourites.id
                })
            })
        }
    }), []), c = l.useMemo(() => [{
        icon: e.jsx(ce, {
            name: "heart",
            className: "size-5"
        }),
        text: t({
            id: "zBd7Qu",
            defaultMessage: [{
                type: 0,
                value: "Favourites"
            }]
        }),
        onClick: i.favourite,
        show: !0
    }, {
        icon: e.jsx(ce, {
            name: "recommended",
            className: "size-5"
        }),
        text: t({
            id: "VKfWR3",
            defaultMessage: [{
                type: 0,
                value: "Recommended"
            }]
        }),
        onClick: i.recommended,
        show: !0
    }, {
        icon: e.jsx(ce, {
            name: "info",
            className: "size-5"
        }),
        text: t({
            id: "we4Lby",
            defaultMessage: [{
                type: 0,
                value: "Info"
            }]
        }),
        onClick: i.info,
        show: !0
    }, {
        icon: e.jsx(ce, {
            name: "sportBets",
            className: "size-5"
        }),
        text: t({
            id: "y8wjUE",
            defaultMessage: [{
                type: 0,
                value: "Sport Bets"
            }]
        }),
        onClick: i.betHistory,
        show: n
    }, {
        icon: e.jsx(J, {
            name: "memberCard",
            className: "size-5"
        }),
        text: t({
            id: "ZdenWh",
            defaultMessage: [{
                type: 0,
                value: "Member Card"
            }]
        }),
        onClick: i.memberCard,
        show: !0
    }].filter(f => f.show), [t, n, i]);
    return e.jsx("div", {
        className: "px-3",
        children: e.jsx("ul", {
            className: "flex flex-col gap-y-5 text-[1.125rem] *:relative *:cursor-pointer [&_svg]:text-[#6D7C8D]",
            children: c.map((p, f) => e.jsxs("li", {
                className: "inline-flex items-center gap-4",
                onClick: p.onClick,
                children: [p.icon, e.jsx("div", {
                    className: "lead flex-1 border-[#121528] border-b-1 leading-relaxed",
                    children: p.text
                })]
            }, f))
        })
    })
}

function Wr() {
    return e.jsx("div", {
        className: "bg-black",
        children: e.jsxs("div", {
            className: "h-[100dvh] w-screen flex-col items-center overflow-hidden overflow-y-auto border-none px-2 pb-1",
            children: [e.jsx(Er, {}), e.jsx(Mr, {}), e.jsx(_r, {}), e.jsx($r, {})]
        })
    })
}

function qr({
    className: t
}) {
    const {
        openDialog: s
    } = z(), o = me(ke), a = () => {
        s(e.jsx(Wr, {}), {
            animation: "slide-in",
            disableBackdropClose: !0,
            autoCloseCondition: () => !o
        })
    };
    return e.jsxs("button", {
        type: "button",
        className: x("flex cursor-pointer flex-col gap-[0.3rem]", t),
        onClick: a,
        children: [e.jsx("div", {
            className: "h-[0.2rem] w-[13px] rounded-sm bg-white"
        }), e.jsx("div", {
            className: "h-[0.2rem] w-[18px] rounded-sm bg-white"
        }), e.jsx("div", {
            className: "h-[0.2rem] w-[9px] rounded-sm bg-white"
        })]
    })
}

function Kr({
    className: t
}) {
    const {
        isAuth: s
    } = W();
    return e.jsx("header", {
        className: x("sticky top-0 z-50 w-full ", t),
        children: e.jsxs("div", {
            className: "flex items-center justify-between gap-1 bg-eerie-black px-4 py-2",
            children: [e.jsxs("div", {
                className: "flex shrink-0 items-center",
                children: [e.jsx(qr, {
                    className: "rounded-2xl bg-[#2E303D] p-3.5"
                }), e.jsx(Ze, {
                    className: "ms-2.5 h-5"
                })]
            }), s && e.jsxs("div", {
                className: "flex flex-col items-end",
                children: [e.jsx(I1, {
                    className: "text-2xs text-[#6d7c8d] uppercase"
                }), e.jsx(Mt, {
                    className: "font-bold text-[1.06rem] text-white"
                })]
            })]
        })
    })
}

function Qr() {
    return me(ke) ? e.jsx(Kr, {}) : e.jsx(yr, {})
}

function ze({
    id: t,
    className: s,
    type: o,
    value: a,
    isLoading: r
}) {
    const n = re(),
        i = a != null,
        c = () => {
            if (!i) return null;
            const d = n(a),
                p = d.match(/^(\d+)\.(\d+)(.*)$/);
            if (!p) return e.jsx("p", {
                className: "jackpots-ticker__value",
                children: d
            });
            const [, f, u, m] = p;
            return e.jsxs("p", {
                className: "jackpots-ticker__value",
                children: [e.jsx("span", {
                    className: "jackpots-ticker__value-integer",
                    children: f
                }), e.jsxs("span", {
                    className: "jackpots-ticker__value-decimal",
                    children: [".", u]
                }), e.jsx("span", {
                    className: "jackpots-ticker__value-integer",
                    children: m
                })]
            })
        };
    return r ? e.jsx($, {
        className: "desktop:mx-4 h-[2.1875rem] w-full desktop:max-w-[31.25rem] mobile:max-w-[21.875rem]"
    }) : e.jsx("div", {
        className: x(`jackpots__ticker jackpots-ticker jackpots-ticker_type_${o}`, s),
        "data-jp-ticker-id": t,
        children: e.jsxs("div", {
            className: "jackpots-ticker__inner",
            children: [e.jsx("p", {
                className: "jackpots-ticker__text",
                lang: "en",
                children: o
            }), c()]
        })
    })
}

function K1() {
    var a;
    const {
        isAuth: t
    } = W(), {
        data: s,
        isLoading: o
    } = ae.useLobby();
    return !t || !o && !((a = s == null ? void 0 : s.jackpots) != null && a.isActive) ? null : e.jsx(Yr, {})
}
const e1 = t => t.offsetTop;

function Yr() {
    var p, f, u, m;
    const t = l.useRef(null),
        [s, o] = l.useState(!1),
        {
            slots: a
        } = gt(),
        r = !!(a && Array.isArray(a) && a.length > 0),
        n = (p = a == null ? void 0 : a.find(({
            name: h
        }) => h === "mini")) == null ? void 0 : p.value,
        i = (f = a == null ? void 0 : a.find(({
            name: h
        }) => h === "major")) == null ? void 0 : f.value,
        c = (u = a == null ? void 0 : a.find(({
            name: h
        }) => h === "grand")) == null ? void 0 : u.value,
        d = (m = a == null ? void 0 : a.find(({
            name: h
        }) => h === "ultimate")) == null ? void 0 : m.value;
    return l.useEffect(() => {
        if (!t.current) return;
        const h = new ResizeObserver(v => {
            for (const j of v) {
                const y = j.target.children;
                if (y.length < 2) return;
                o(e1(y[1]) > e1(y[0]))
            }
        });
        return h.observe(t.current), () => h.disconnect()
    }, [r]), e.jsxs(e.Fragment, {
        children: [e.jsx("div", {
            className: "relative my-2.5 mobile:block hidden",
            children: e.jsx(Ca, {
                text: "Jackpots"
            })
        }), e.jsxs("div", {
            ref: t,
            className: x("jackpots", s && "jackpots_wrapped"),
            children: [e.jsxs("div", {
                className: "jackpots__tickers-group",
                children: [e.jsx(ze, {
                    isLoading: !r,
                    type: "mini",
                    value: n,
                    id: 0
                }), e.jsx(ze, {
                    isLoading: !r,
                    type: "major",
                    value: i,
                    id: 1
                })]
            }), e.jsxs("div", {
                className: "jackpots__tickers-group",
                children: [e.jsx(ze, {
                    isLoading: !r,
                    type: "grand",
                    value: c,
                    id: 2
                }), e.jsx(ze, {
                    isLoading: !r,
                    type: "ultimate",
                    value: d,
                    id: 3
                })]
            })]
        })]
    })
}

function Q1() {
    return e.jsxs("div", {
        className: "relative px-5 py-4.5",
        children: [e.jsx(K1, {}), e.jsx(de, {
            to: "/",
            className: "-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2",
            children: e.jsx(Ze, {
                className: "ms-2 h-8.5"
            })
        })]
    })
}

function Jr() {
    var N;
    const {
        $t: t
    } = w(), s = ie(), o = te(), a = me(ke), {
        data: r
    } = ae.useLobby(), [n, i] = l.useState(!1), {
        openDialog: c,
        closeDialog: d,
        closeAllDialogs: p
    } = z(), f = We((N = r == null ? void 0 : r.fortuneWheel) == null ? void 0 : N.nextSpinTime), u = f > 0, m = l.useRef([]), {
        data: h
    } = ye.useWheelSettings(), v = h == null ? void 0 : h.result, j = l.useMemo(() => (!Ts(v == null ? void 0 : v.sectors) && !Is(v.sectors) && (m.current = b(v.sectors, Ua)), m.current), [v]);

    function C() {
        s.invalidateQueries({
            queryKey: ["Lobby.getCurrent"]
        }), s.invalidateQueries({
            queryKey: ["FortuneWheel.getSettings"]
        })
    }

    function y(Z) {
        C();
        const g = c(e.jsx(vr, {
            winAmount: Z.value,
            handleTakeWin: () => {
                d(g), o({
                    to: "/casino",
                    replace: !0
                })
            }
        }), {
            disableBackdropClose: !0,
            closeOnEscape: !1
        })
    }

    function _() {
        c(e.jsx(z1, {
            error: new le(t({
                id: "e0XxfE",
                defaultMessage: [{
                    type: 0,
                    value: "Make a deposit before spinning the wheel of fortune"
                }]
            })),
            onOk: p
        }))
    }

    function b(Z, g) {
        const M = [...Z];
        for (let L = 0; L < Z.length * g; L++) {
            const K = Z[L % Z.length];
            M.push({ ...K,
                id: L * -1
            })
        }
        return M
    }
    return l.useLayoutEffect(() => {
        v && v.state === "make_deposit" && _()
    }, []), e.jsxs("div", {
        className: "flex min-h-dvh flex-col",
        children: [!a && e.jsx(Q1, {}), e.jsxs("main", {
            className: "fortune-wheel",
            children: [e.jsx("div", {
                className: "fortune-wheel__shadow"
            }), !n && e.jsx(de, {
                to: "/casino",
                search: !0,
                className: "absolute top-5 left-5 z-20 whitespace-nowrap",
                children: e.jsx("div", {
                    className: "rounded-[0.5rem] border-1 border-mine-shaft bg-woodsmoke px-[0.75rem] py-[0.75rem]",
                    children: e.jsx(k, {
                        className: "size-4.5",
                        name: "close"
                    })
                })
            }), u && e.jsx("div", {
                className: "-translate-x-1/2 absolute top-0 left-1/2 z-20 whitespace-nowrap",
                children: e.jsxs("div", {
                    className: "fortune-wheel__countdown lowercase",
                    children: [e.jsx(k, {
                        name: "clock",
                        className: "h-[1.25em] w-[1.25em] shrink-0"
                    }), Ct(f)]
                })
            }), e.jsx("div", {
                className: "mt-24 mb-10 flex-center flex-grow",
                children: e.jsx("div", {
                    className: "relative isolate mobile-only:mt-2 w-full flex-center flex-col",
                    children: j && e.jsx(ir, {
                        onAnimationStart: () => i(!0),
                        sectors: j,
                        onWinAnimationEnd: y,
                        className: "mobile:w-[23.75rem] w-[40rem]"
                    })
                })
            }), !a && e.jsx("div", {
                className: "mt-auto",
                children: e.jsx(cr, {})
            }), a && e.jsx("div", {
                className: "isolate w-full",
                children: e.jsx(pr, {})
            })]
        })]
    })
}
const Xr = we("/_auth/fortune-wheel")({
        beforeLoad: async () => Za(),
        loader: () => Promise.all([Fa(), Ye()]),
        component: Jr,
        onError: console.error
    }),
    en = "/assets/fw-btn-bg-CrMVkumc.avif",
    tn = "make_deposit",
    sn = "h-[0.875em] w-[0.875em]";

function ln() {
    var p;
    const t = l.useRef(null),
        {
            data: s
        } = ae.useLobby(),
        {
            data: o,
            isLoading: a,
            isError: r
        } = ye.useWheelSettings(),
        n = ye.useIsWheelAvailable(),
        i = typeof((p = s == null ? void 0 : s.fortuneWheel) == null ? void 0 : p.nextSpinTime) == "number" ? s.fortuneWheel.nextSpinTime : 0,
        c = We(i),
        d = l.useMemo(() => {
            const f = (o == null ? void 0 : o.result) || t.current;
            return f && (t.current = f), f
        }, [o == null ? void 0 : o.result]);
    return {
        settings: d,
        isLoading: a && !d,
        countdown: c,
        isAvailable: n,
        isError: !!(o != null && o.error) || r
    }
}
const Y1 = l.memo(({
    countdown: t
}) => e.jsx("div", {
    className: "fortune-wheel-btn__label",
    children: e.jsxs("div", {
        className: "flex flex-center gap-[0.3125rem]",
        children: [e.jsx(k, {
            name: "clock",
            className: sn
        }), e.jsx("div", {
            className: "fortune-wheel-btn__timer lowercase",
            children: Ct(t)
        })]
    })
}));
Y1.displayName = "CountdownTimer";
const J1 = l.memo(({
    isLoading: t,
    isSpinReady: s,
    readyToSpinText: o
}) => {
    if (t) return e.jsx("div", {
        className: "fortune-wheel-btn__label",
        children: e.jsx("span", {
            className: "absolute animate-spin",
            children: e.jsx(J, {
                name: "loading"
            })
        })
    });
    if (s) return e.jsx("div", {
        className: "fortune-wheel-btn__label",
        children: e.jsx("span", {
            className: "fortune-wheel-btn__label-text",
            children: o
        })
    })
});
J1.displayName = "SpinLabel";
const X1 = l.memo(() => e.jsx("div", {
    className: "fortune-wheel-btn__wheel-img",
    children: e.jsx("img", {
        src: en,
        alt: "fortune-wheel-preview",
        width: "100%",
        height: "100%",
        loading: "eager"
    })
}));
X1.displayName = "WheelImage";

function on() {
    const {
        $t: t
    } = w(), {
        settings: s,
        isLoading: o,
        countdown: a,
        isAvailable: r,
        isError: n
    } = ln(), i = l.useMemo(() => t({
        id: "vqb+CT",
        defaultMessage: [{
            type: 0,
            value: "fortune wheel"
        }]
    }), [t]), c = l.useMemo(() => t({
        id: "IiZkH1",
        defaultMessage: [{
            type: 0,
            value: "ready to spin"
        }]
    }), [t]);
    if (!r) return null;
    const d = a > 0,
        f = !((s == null ? void 0 : s.state) === tn) && !d;
    return n ? null : e.jsx("div", {
        className: "fortune-wheel-btn",
        children: e.jsxs(de, {
            className: "w-full",
            to: "/fortune-wheel",
            search: !0,
            children: [e.jsxs("div", {
                className: "fortune-wheel-btn__bg",
                children: [e.jsx("div", {
                    className: "fortune-wheel-btn__title",
                    children: i
                }), d && e.jsx(Y1, {
                    countdown: a
                }), !d && e.jsx(J1, {
                    isLoading: o,
                    isSpinReady: f,
                    readyToSpinText: c
                })]
            }), e.jsx(X1, {})]
        })
    })
}

function an() {
    const t = te(),
        [s, o] = l.useState(!1),
        a = l.useRef(null),
        {
            $t: r
        } = w(),
        n = l.useCallback(vt(d => {
            t({
                search: p => ({ ...p,
                    game: d.toLowerCase() || void 0,
                    pid: d ? void 0 : p.pid,
                    cid: d ? void 0 : p.cid
                })
            }), window.scrollTo(0, 0)
        }, 300), []);

    function i() {
        o(d => !d)
    }

    function c() {
        a.current && (a.current.value = "", n(""))
    }
    return e.jsxs("div", {
        className: "search-filter z-20",
        "data-opened": s,
        onTransitionEnd: () => {
            var d;
            s && ((d = a.current) == null || d.focus())
        },
        children: [e.jsx("button", {
            type: "button",
            onClick: i,
            "data-button": "search-toggle",
            children: e.jsx("svg", {
                viewBox: "0 0 20 20",
                children: e.jsx("path", {
                    fill: "currentColor",
                    d: "M19.7 19.67c-.44.44-1.11.44-1.55 0L14.7 16.2a9.02 9.02 0 0 1-5.62 1.98A9.1 9.1 0 0 1 9.07 0a9.08 9.08 0 0 1 7.16 14.66l3.46 3.47c.41.44.41 1.11 0 1.54ZM9.06 2.17c-3.8 0-6.9 3.11-6.9 6.92a6.88 6.88 0 1 0 13.75 0 6.87 6.87 0 0 0-6.85-6.92Z"
                })
            })
        }), e.jsx("input", {
            ref: a,
            type: "text",
            placeholder: r({
                id: "pjKYgr",
                defaultMessage: [{
                    type: 0,
                    value: "Search games"
                }]
            }) + "...",
            onChange: d => n(d.target.value),
            autoCorrect: "off",
            defaultValue: new URLSearchParams(window.location.search).get("game") || "",
            maxLength: 50
        }), e.jsx("button", {
            type: "button",
            onClick: c,
            "data-button": "clear",
            children: e.jsx("svg", {
                viewBox: "0 0 25 26",
                children: e.jsx("path", {
                    fill: "currentColor",
                    d: "m15.82 13.25 8.5-8.5c.9-.9.9-2.35 0-3.26a2.3 2.3 0 0 0-3.26 0L12.5 10 4 1.44a2.3 2.3 0 0 0-3.26 0c-.9.9-.9 2.36 0 3.26l8.5 8.5-8.56 8.63c-.9.9-.9 2.35 0 3.26.9.9 2.35.9 3.26 0l8.5-8.5 8.5 8.5c.9.9 2.36.9 3.26 0 .9-.9.9-2.36 0-3.26l-8.38-8.57Z"
                })
            })
        })]
    })
}
const rn = l.memo(() => {
        const t = r2(),
            {
                hasNoWagerableGamesInCurrentFilter: s
            } = yt(),
            [o, a] = l.useState(!1),
            r = q({
                strict: !1,
                select: ({
                    pid: d
                }) => d
            }),
            n = q({
                strict: !1,
                select: ({
                    pid: d
                }) => d
            }),
            {
                $t: i
            } = w(),
            c = () => {
                t(ee.wagerableGames.id)
            };
        return l.useEffect(() => {
            (r || n) && a(!1)
        }, [r, n]), s ? e.jsxs("section", {
            className: x("relative flex mobile:flex-col items-center justify-center gap-x-4 mobile:gap-y-1 bg-[#0D0505] mobile:px-2 desktop:py-5 py-1", o && "hidden"),
            children: [e.jsx("p", {
                className: "text-[#EEFF00] text-[1.125rem] uppercase",
                children: i({
                    id: "nSVjL+",
                    defaultMessage: [{
                        type: 0,
                        value: "warning"
                    }]
                })
            }), e.jsx("button", {
                type: "button",
                onClick: () => a(!0),
                className: "absolute top-2 right-2 mobile:block hidden",
                children: e.jsx(ce, {
                    className: "size-4",
                    name: "close"
                })
            }), e.jsx("p", {
                className: "max-w-[40rem]",
                children: i({
                    id: "Yfoaqd",
                    defaultMessage: [{
                        type: 0,
                        value: "You currently have an unwagered bonus. Some games you can't play with bonus money. Do you want to show only games that can be played with bonus money?"
                    }]
                })
            }), e.jsx("button", {
                type: "button",
                onClick: c,
                className: "btn-wrapper-label",
                children: e.jsx("span", {
                    className: "btn-label",
                    children: i({
                        id: "Ph/zGT",
                        defaultMessage: [{
                            type: 0,
                            value: "show"
                        }]
                    })
                })
            })]
        }) : null
    }),
    nn = "/assets/get-bonus-logo-BjuhFZL8.avif";

function cn({
    className: t,
    type: s,
    amount: o,
    onClick: a
}) {
    return e.jsx("div", {
        className: x(t, "relative mobile-only:w-full lg:rtl:ms-10"),
        children: e.jsx("div", {
            className: "take-bonus",
            children: e.jsx("button", {
                className: "take-bonus__content relative z-10 flex h-17.5 items-center justify-center ps-15 pe-5 rtl:justify-end",
                type: "button",
                onClick: a,
                children: e.jsxs("div", {
                    className: "flex h-full items-center",
                    children: [e.jsx("div", {
                        className: "-translate-y-[0.1875rem] rtl:-scale-x-100 ltr:-translate-x-1/2 ltr:-left-1 rtl:-right-1 absolute aspect-square w-28 rtl:translate-x-1/2",
                        children: e.jsx("img", {
                            src: nn,
                            alt: "bonus-logo",
                            width: "100%",
                            height: "100%",
                            className: "object-cover"
                        })
                    }), e.jsxs("div", {
                        className: "text-end",
                        children: [e.jsx("p", {
                            className: "take-bonus__type",
                            children: s
                        }), e.jsx("p", {
                            className: "take-bonus__value",
                            children: o
                        })]
                    })]
                })
            })
        })
    })
}

function dn({
    className: t,
    data: s
}) {
    const o = re(),
        {
            openDialog: a,
            closeDialog: r
        } = z(),
        n = o(s.amount);

    function i() {
        a(e.jsx(xr, {
            handleClose: r
        }))
    }
    return e.jsx(cn, {
        className: t,
        type: s.type,
        amount: n,
        onClick: i
    })
}

function pn({
    className: t
}) {
    const {
        data: s
    } = V.useBalances(), o = s == null ? void 0 : s.bonus;
    return o && e.jsx(dn, {
        className: t,
        data: o
    })
}

function fn({
    className: t,
    id: s
}) {
    return e.jsx("div", {
        className: t,
        children: x1(s) ? e.jsx(ce, {
            className: "desktop:size-8.5 size-8.5",
            name: g1(String(s))
        }) : e.jsx("div", {
            className: "desktop:size-8.5 size-8.5 text-white",
            style: {
                backgroundColor: "currentcolor",
                mask: `url(${Ds("dark",s)}) center/100% no-repeat`
            }
        })
    })
}

function es() {
    const t = te();
    return s => {
        t({
            replace: !0,
            search: o => ({ ...o,
                game: void 0,
                pid: void 0,
                cid: xt(s) ? void 0 : s
            })
        })
    }
}

function un({
    children: t,
    isActive: s,
    disabled: o,
    id: a,
    onClick: r
}) {
    const n = es(),
        i = () => {
            n(a), r == null || r()
        };
    return e.jsx(O, {
        isActive: s,
        activeClassName: "btn_filter_active",
        className: x({
            "mobile:max-w-full after:absolute after:top-0 after:right-0 after:z-20 after:h-8 after:w-8 after:bg-checkbox-checked after:bg-cover [&_.btn]:px-4": s
        }),
        disabled: o,
        onClick: i,
        type: "filter",
        children: e.jsxs("div", {
            className: x("flex flex-center gap-2 truncate"),
            children: [e.jsx(fn, {
                id: a
            }), t]
        })
    })
}

function mn() {
    return e.jsx("li", {
        children: e.jsx($, {
            className: "h-15 w-full"
        })
    })
}

function ut({
    isActive: t,
    id: s,
    onClick: o
}) {
    const a = es(),
        r = x1(s) ? e.jsx(ce, {
            className: "desktop:size-6 size-6",
            name: g1(String(s))
        }) : null,
        n = () => {
            a(s), o == null || o()
        };
    return e.jsxs("button", {
        type: "button",
        className: x("private-category-filter group", {
            "private-category-filter_active": t
        }),
        onClick: n,
        children: [e.jsx("div", {
            className: x("btn-flickering bottom-right")
        }), e.jsx("div", {
            className: x("btn-flickering top-left")
        }), e.jsx("div", {
            className: "private-category-filter-container",
            children: r
        })]
    })
}
const hn = Object.assign(un, {
    Skeleton: mn,
    Private: ut
});

function xn() {
    const t = te(),
        s = I.useCategoriesListQuery(),
        {
            $t: o
        } = w(),
        {
            closeDialog: a
        } = z(),
        r = q({
            strict: !1,
            select: ({
                cid: c
            }) => c
        }),
        n = l.useCallback(() => {
            a(), t({
                replace: !0,
                search: c => ({ ...c,
                    search: void 0,
                    cid: void 0
                })
            })
        }, []),
        i = jt({
            query: s,
            isEmpty: c => {
                var d;
                return ((d = c.result) == null ? void 0 : d.data.length) === 0
            },
            renderEmpty: () => e.jsx("p", {
                className: "text-2xl",
                children: o({
                    id: "75zUDs",
                    defaultMessage: [{
                        type: 0,
                        value: "No categories available"
                    }]
                })
            }),
            renderSkeleton: () => Array.from({
                length: 20
            }).map((c, d) => e.jsx($, {
                className: "h-17 w-full rounded-md"
            }, `skeleton-${d}`)),
            renderSuccess: c => c.result.data.filter(d => d.tag !== "header").map(({
                name: d,
                id: p
            }) => e.jsx(hn, {
                onClick: a,
                id: p,
                isActive: r === p,
                children: e.jsx("span", {
                    className: "max-w-full truncate text-white uppercase",
                    children: d
                })
            }, p))
        });
    return e.jsx(wt, {
        title: o({
            id: "VKb1MS",
            defaultMessage: [{
                type: 0,
                value: "Categories"
            }]
        }),
        "data-categories-modal": !0,
        actions: e.jsxs(e.Fragment, {
            children: [e.jsx(O, {
                type: "cancel",
                hoverFlickeringDirection: "tr-bl",
                onClick: () => a(),
                className: "min-w-36",
                children: e.jsx("p", {
                    className: "truncate drop-shadow-[1px_1px_#1e2022]",
                    children: o({
                        id: "cqZqGK",
                        defaultMessage: [{
                            type: 0,
                            value: "cancel"
                        }]
                    })
                })
            }), e.jsx(O, {
                type: "reset",
                onClick: n,
                hoverFlickeringDirection: "tr-bl",
                className: "min-w-36",
                children: e.jsx("p", {
                    className: "max-w-full truncate drop-shadow-[1px_1px_#1e2022]",
                    children: o({
                        id: "vI2rTZ",
                        defaultMessage: [{
                            type: 0,
                            value: "reset"
                        }]
                    })
                })
            })]
        }),
        children: i
    })
}

function gn() {
    const {
        $t: t
    } = w(), s = q({
        strict: !1,
        select: ({
            cid: c
        }) => c
    }), {
        data: o
    } = I.useCategoriesList(), a = l.useMemo(() => o == null ? void 0 : o.filter(({
        tag: c
    }) => c !== "header"), [o]), r = a == null ? void 0 : a.find(({
        id: c
    }) => c === s), {
        openDialog: n
    } = z(), i = () => {
        n(e.jsx(xn, {}))
    };
    return e.jsxs("button", {
        type: "button",
        onClick: i,
        className: x("category-filter -skew-x-6 group", {
            "category-filter_active": !!s && r
        }),
        children: [e.jsx("div", {
            className: x("btn-flickering bottom-left")
        }), e.jsx("div", {
            className: x("btn-flickering top-right")
        }), e.jsx("div", {
            className: "category-filter-container",
            children: e.jsx("div", {
                className: "category-filter-content",
                children: e.jsx("div", {
                    className: "max-w-full skew-x-6",
                    children: r != null && r.name ? e.jsxs(e.Fragment, {
                        children: [e.jsx("div", {
                            className: "mb-0.5 truncate font-bold mobile:text-xs text-sm text-white uppercase mobile:[font-size:clamp(0.75rem,0.698rem+0.221vw,0.875rem)]",
                            children: t({
                                id: "VKb1MS",
                                defaultMessage: [{
                                    type: 0,
                                    value: "Categories"
                                }]
                            })
                        }), e.jsx("div", {
                            className: "-tracking-wide truncate whitespace-normal font-medium text-xl [text-shadow:0px_1px_4px_#000000] mobile:[font-size:clamp(0.875rem,0.72rem+0.663vw,1.25rem)]",
                            children: r == null ? void 0 : r.name
                        })]
                    }) : e.jsxs(e.Fragment, {
                        children: [e.jsx("div", {
                            className: "mb-0.5 truncate font-bold text-[#8484a6] text-sm uppercase mobile:[font-size:clamp(0.75rem,0.698rem+0.221vw,0.875rem)]",
                            children: t({
                                id: "VKb1MS",
                                defaultMessage: [{
                                    type: 0,
                                    value: "Categories"
                                }]
                            })
                        }), e.jsx("div", {
                            className: "-tracking-wide truncate font-medium text-xl [text-shadow:0px_1px_4px_#000000] mobile:[font-size:clamp(0.875rem,0.72rem+0.663vw,1.25rem)]",
                            children: t({
                                id: "8jpwwf",
                                defaultMessage: [{
                                    type: 0,
                                    value: "All Games"
                                }]
                            })
                        })]
                    })
                })
            })
        })]
    })
}

function vn({
    id: t,
    isActive: s,
    stringId: o,
    onClick: a,
    className: r
}) {
    const n = te(),
        {
            closeDialog: i
        } = z(),
        c = async () => {
            await n({
                replace: !0,
                search: d => ({ ...d,
                    game: void 0,
                    cid: void 0,
                    pid: d.pid === t ? void 0 : t
                })
            }), document.documentElement.scrollTo(0, 0), i(), a == null || a()
        };
    return e.jsxs(O, {
        type: "filter",
        activeClassName: "btn_filter_active",
        onClick: c,
        isActive: s,
        className: x(r, {
            "after:absolute after:top-0 after:right-0 after:z-20 after:h-8 after:w-8 after:bg-checkbox-checked after:bg-cover": s
        }),
        children: [e.jsx("span", {
            className: "hidden max-w-full truncate text-sm has-[+.hidden]:block",
            children: o
        }), e.jsx("img", {
            loading: "lazy",
            src: Us("dark", o),
            alt: o,
            onError: d => d.target.classList.add("hidden"),
            className: "h-full w-full"
        })]
    })
}

function Cn() {
    const {
        $t: t
    } = w(), {
        pid: s
    } = q({
        strict: !1
    }), {
        closeDialog: o
    } = z(), a = te(), r = I.useProvidersList(), n = jt({
        query: r,
        isEmpty: c => {
            var d;
            return ((d = c.result) == null ? void 0 : d.data.length) === 0
        },
        renderEmpty: () => e.jsx("p", {
            className: "text-2xl",
            children: t({
                id: "Ygf5Y7",
                defaultMessage: [{
                    type: 0,
                    value: "No providers available"
                }]
            })
        }),
        renderSkeleton: () => Array.from({
            length: 20
        }).map((c, d) => e.jsx($, {
            className: "h-17 w-full rounded-md"
        }, `skeleton-${d}`)),
        renderSuccess: c => c.result.data.map(({
            name: d,
            id: p,
            stringId: f
        }) => e.jsx(vn, {
            className: "mobile:max-w-full",
            id: p,
            isActive: s === p,
            name: d,
            stringId: f
        }, p))
    }), i = () => {
        o(), a({
            replace: !0,
            search: c => ({ ...c,
                pid: void 0,
                modal: void 0
            })
        })
    };
    return e.jsx(wt, {
        title: t({
            id: "IL1Uey",
            defaultMessage: [{
                type: 0,
                value: "Providers"
            }]
        }),
        "data-providers-modal": !0,
        actions: e.jsxs(e.Fragment, {
            children: [e.jsx(O, {
                className: "min-w-36",
                type: "cancel",
                hoverFlickeringDirection: "tr-bl",
                onClick: () => o(),
                children: e.jsx("p", {
                    className: "truncate drop-shadow-[1px_1px_#1e2022]",
                    children: t({
                        id: "cqZqGK",
                        defaultMessage: [{
                            type: 0,
                            value: "cancel"
                        }]
                    })
                })
            }), e.jsx(O, {
                type: "reset",
                onClick: i,
                hoverFlickeringDirection: "tr-bl",
                className: "min-w-36",
                children: e.jsx("p", {
                    className: "truncate drop-shadow-[1px_1px_#1e2022]",
                    children: t({
                        id: "vI2rTZ",
                        defaultMessage: [{
                            type: 0,
                            value: "reset"
                        }]
                    })
                })
            })]
        }),
        children: n
    })
}

function jn() {
    var c;
    const {
        $t: t
    } = w(), s = q({
        strict: !1,
        select: ({
            pid: d
        }) => d
    }), {
        openDialog: o
    } = z(), {
        data: a
    } = I.useProvidersList(), n = (((c = a == null ? void 0 : a.result) == null ? void 0 : c.data) ? ? []).find(({
        id: d
    }) => s === d), i = () => {
        o(e.jsx(Cn, {}))
    };
    return e.jsxs("button", {
        type: "button",
        onClick: i,
        className: x("provider-filter group skew-x-6", {
            "provider-filter_active": !!n
        }),
        children: [e.jsx("div", {
            className: x("btn-flickering top-left")
        }), e.jsx("div", {
            className: x("btn-flickering bottom-right")
        }), e.jsx("div", {
            className: "provider-filter-container",
            children: e.jsx("div", {
                className: "provider-filter-content",
                children: e.jsx("div", {
                    className: "-skew-x-6 max-w-full",
                    children: n != null && n.name ? e.jsxs(e.Fragment, {
                        children: [e.jsx("div", {
                            className: "mb-0.5 truncate font-bold text-sm text-white uppercase mobile:[font-size:clamp(0.75rem,0.698rem+0.221vw,0.875rem)]",
                            children: t({
                                id: "IL1Uey",
                                defaultMessage: [{
                                    type: 0,
                                    value: "Providers"
                                }]
                            })
                        }), e.jsx("div", {
                            className: "-tracking-wide truncate font-medium text-xl [text-shadow:0px_1px_4px_#000000] mobile:[font-size:clamp(0.875rem,0.72rem+0.663vw,1.25rem)]",
                            children: n == null ? void 0 : n.name
                        })]
                    }) : e.jsxs(e.Fragment, {
                        children: [e.jsx("div", {
                            className: "mb-0.5 truncate font-bold text-[#8484a6] text-sm uppercase mobile:[font-size:clamp(0.75rem,0.698rem+0.221vw,0.875rem)]",
                            children: t({
                                id: "IL1Uey",
                                defaultMessage: [{
                                    type: 0,
                                    value: "Providers"
                                }]
                            })
                        }), e.jsx("div", {
                            className: "-tracking-wide truncate font-medium text-xl [text-shadow:0px_1px_4px_#000000] mobile:[font-size:clamp(0.875rem,0.72rem+0.663vw,1.25rem)]",
                            children: t({
                                id: "8jpwwf",
                                defaultMessage: [{
                                    type: 0,
                                    value: "All Games"
                                }]
                            })
                        })]
                    })
                })
            })
        })]
    })
}

function yn() {
    const t = te(),
        {
            $t: s
        } = w(),
        o = q({
            strict: !1,
            select: ({
                pid: n
            }) => n
        }),
        a = q({
            strict: !1,
            select: ({
                cid: n
            }) => n
        }),
        r = () => {
            t({
                replace: !0,
                search: () => ({
                    pid: void 0,
                    cid: void 0
                })
            })
        };
    return e.jsxs("button", {
        dir: "ltr",
        type: "button",
        onClick: r,
        style: {
            transform: "perspective(90px) rotateX(-7.7deg)"
        },
        className: x("reset-selection-filter group mt-1", !a && !o && "reset-selection-filter_active"),
        children: [e.jsx("div", {
            className: x("btn-flickering bottom-left")
        }), e.jsx("div", {
            className: x("btn-flickering top-right")
        }), e.jsx("div", {
            className: "reset-selection-filter-container",
            children: e.jsxs("div", {
                className: "reset-selection-filter-content flex-col font-medium font-oswald uppercase [text-shadow:0_1px_4px_#000]",
                children: [e.jsx("p", {
                    children: s({
                        id: "K7AkdL",
                        defaultMessage: [{
                            type: 0,
                            value: "Show"
                        }]
                    })
                }), e.jsx("p", {
                    children: s({
                        id: "zQvVDJ",
                        defaultMessage: [{
                            type: 0,
                            value: "All"
                        }]
                    })
                })]
            })
        })]
    })
}
const lt = {
    style: {
        "--radius": "0.3125rem"
    },
    className: "!text-base h-[2.625rem]",
    activeClassName: "btn_primary-variant-1_active"
};

function wn() {
    const t = q({
            strict: !1,
            select: ({
                cid: o
            }) => o
        }),
        s = I.useCategoriesListQuery();
    return jt({
        query: s,
        renderError: () => null,
        renderSkeleton: () => Ae(4)(o => e.jsx($, {
            className: "mx-0.5 px-16 py-[1.3125rem]"
        }, o)),
        renderSuccess: o => {
            const a = I.extractTagHeaderCategory(o.result.data);
            return e.jsx("ul", {
                className: "nav-list mx-auto flex gap-1.5",
                children: a.filter(({
                    actionType: r
                }) => r !== "sport_history").map(({
                    id: r,
                    name: n,
                    actionType: i,
                    actionData: c
                }) => {
                    switch (i) {
                        case "main":
                            return e.jsx("li", {
                                children: e.jsx(de, {
                                    activeOptions: {
                                        exact: a.some(({
                                            id: d
                                        }) => d === t)
                                    },
                                    activeProps: {
                                        className: "active bg-radical-red text-red"
                                    },
                                    to: "/casino",
                                    children: e.jsx(O, {
                                        type: "primary-variant-1",
                                        isActive: !a.some(({
                                            id: d
                                        }) => d === t),
                                        ...lt,
                                        children: n
                                    })
                                })
                            }, r);
                        case "game":
                            return e.jsx("li", {
                                children: e.jsx(de, {
                                    activeProps: {
                                        className: "active"
                                    },
                                    to: "/game/$gameId",
                                    params: {
                                        gameId: c
                                    },
                                    children: e.jsx(O, {
                                        type: "primary-variant-1",
                                        isActive: r === t,
                                        ...lt,
                                        children: n
                                    })
                                })
                            }, r);
                        default:
                            return e.jsx("li", {
                                children: e.jsx(de, {
                                    activeProps: {
                                        className: "active"
                                    },
                                    to: "/casino",
                                    search: {
                                        cid: r
                                    },
                                    children: e.jsx(O, {
                                        type: "primary-variant-1",
                                        ...lt,
                                        isActive: r === t,
                                        children: n
                                    })
                                })
                            }, r)
                    }
                })
            })
        }
    })
}

function _n() {
    const {
        cid: t
    } = q({
        strict: !1
    });
    return e.jsxs(e.Fragment, {
        children: [e.jsx(ut, {
            isActive: String(t) === je.favourites.id,
            id: je.favourites.id
        }), e.jsx(ut, {
            isActive: String(t) === je.recommended.id,
            id: je.recommended.id
        })]
    })
}

function bn({
    className: t
}) {
    const {
        $t: s
    } = w(), [o, a] = l.useState(!1);
    return e.jsxs("footer", {
        className: x("footer z-[2]", t),
        children: [e.jsxs("div", {
            className: "footer--top-bar",
            children: [e.jsxs("div", {
                className: "flex mobile:hidden desktop:basis-1/4 flex-col px-4",
                children: [e.jsx("span", {
                    className: "text-md",
                    children: s({
                        id: "t7fKtE",
                        defaultMessage: [{
                            type: 0,
                            value: "balance"
                        }]
                    }).toUpperCase()
                }), e.jsx(Mt, {
                    className: "text-3xl"
                })]
            }), e.jsxs("div", {
                className: "mx-auto flex-center desktop:basis-1/2 mobile:basis-full desktop:gap-4 mobile:gap-2 mobile:*:flex-1",
                children: [e.jsx(jn, {}), e.jsx(yn, {}), e.jsx(gn, {})]
            }), e.jsx("div", {
                className: "flex mobile:hidden basis-1/4 justify-end desktop:gap-4",
                children: e.jsx(_n, {})
            })]
        }), e.jsx("hr", {
            className: "my-2 mobile:hidden text-[#4d4d4d]/30"
        }), e.jsx(t1, {
            isBottomBarCompact: o
        }), e.jsx(t1, {
            onContentOverflow: a,
            className: "invisible absolute right-0 bottom-0 left-0"
        })]
    })
}

function t1({
    className: t,
    isBottomBarCompact: s,
    onContentOverflow: o
}) {
    var y;
    const [a, r] = l.useState(null), [n, i] = l.useState(!1), c = l.useRef(null), d = l.useRef(null), p = l.useRef(null), f = l.useRef(null), {
        $t: u
    } = w(), m = ae.useLobby(), {
        openDialog: h
    } = z(), v = !!((y = m.data) != null && y.showSportHistory), j = () => {
        h(e.jsx(q1, {}))
    }, C = () => {
        h(e.jsx($1, {}))
    };
    return l.useEffect(() => {
        const _ = new ResizeObserver(() => {
            const b = c.current,
                N = d.current,
                Z = f.current,
                g = Math.max(N.clientWidth, Z.clientWidth);
            o == null || o(b.scrollWidth > b.clientWidth), r(g)
        });
        return _.observe(d.current), _.observe(f.current), () => {
            _.disconnect()
        }
    }, [o]), l.useEffect(() => {
        const _ = new ResizeObserver(b => {
            for (const N of b) i(N.target.scrollWidth > N.target.clientWidth)
        });
        return _.observe(p.current), () => {
            _.disconnect()
        }
    }, []), l.useEffect(() => {
        if (!o) return;
        const _ = new ResizeObserver(() => {
            const b = c.current;
            o(b.scrollWidth > b.clientWidth)
        });
        return _.observe(c.current), () => {
            _.disconnect()
        }
    }, [o]), e.jsxs("div", {
        ref: c,
        className: x("footer--bottom-bar", t, s && "--compact"),
        children: [e.jsx("div", {
            style: {
                minWidth: a ? `${a}px` : "auto"
            },
            children: e.jsxs("div", {
                ref: d,
                className: "flex w-fit items-center gap-1.5",
                children: [e.jsx(k, {
                    className: "size-[1.2em] shrink-0",
                    name: "profile"
                }), e.jsx(En, {}), e.jsx(Ke, {
                    className: "shrink-0"
                }), e.jsx(T1, {})]
            })
        }), e.jsx("div", {
            ref: p,
            className: x(n && "right-corner-black-mask", "flex min-w-[31.25rem] items-center overflow-x-auto overflow-y-hidden"),
            children: e.jsx(wn, {})
        }), e.jsx("div", {
            style: {
                minWidth: a ? `${a}px` : "auto"
            },
            children: e.jsxs("div", {
                ref: f,
                className: "ms-auto flex h-full w-fit items-center justify-end gap-1.5",
                children: [v && e.jsx(O, {
                    type: "primary",
                    onClick: j,
                    className: "shrink-0",
                    children: e.jsxs("div", {
                        className: "footer--bottom-bar--button--inner",
                        children: [e.jsx(k, {
                            name: "sportBets"
                        }), e.jsx("span", {
                            className: "button--label",
                            children: u({
                                id: "y8wjUE",
                                defaultMessage: [{
                                    type: 0,
                                    value: "Sport Bets"
                                }]
                            })
                        })]
                    })
                }), e.jsx(O, {
                    type: "primary",
                    onClick: C,
                    className: "shrink-0",
                    children: e.jsxs("div", {
                        className: "footer--bottom-bar--button--inner",
                        children: [e.jsx(k, {
                            name: "info"
                        }), e.jsx("span", {
                            className: "button--label",
                            children: u({
                                id: "we4Lby",
                                defaultMessage: [{
                                    type: 0,
                                    value: "Info"
                                }]
                            })
                        })]
                    })
                })]
            })
        })]
    })
}

function En() {
    const {
        data: t
    } = V.usePlayer(), s = t == null ? void 0 : t.displayableName;
    return e.jsx("div", {
        className: "max-w-36 truncate text-[#6D7C8D] text-lg tracking-tight",
        children: s
    })
}

function Mn({
    className: t,
    onClick: s,
    gameStringId: o
}) {
    const {
        isAuth: a
    } = W(), r = I.useFavouriteSetter(), n = I.getGameByStringId(o), i = !!(n != null && n.isFavourite), c = () => {
        r.mutate({
            gameId: Number(n == null ? void 0 : n.id),
            isFavourite: !i
        }), s == null || s()
    };
    return a ? e.jsx("button", {
        className: x(t, "group/fav"),
        type: "button",
        onClick: c,
        children: e.jsx("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 25 20",
            className: x("size-[1em] drop-shadow-[0_0_0.0625rem_black] transition-transform duration-200 ease-in-out desktop:group-hover/fav:scale-125", i ? "text-[#841d1a]" : "text-black/20", r.isPending && "animate-heartbeat"),
            children: e.jsx("path", {
                stroke: "white",
                strokeWidth: "2",
                fill: "currentColor",
                d: "M23 1.6a6.7 6.7 0 0 0-8.8 0l-1.7 1.5-1.6-1.5a6.7 6.7 0 0 0-8.8 0 5.9 5.9 0 0 0 0 9L12.5 20 23 10.6a5.9 5.9 0 0 0 0-9Z"
            })
        })
    }) : null
}
const ts = l.memo(Mn),
    Nn = "data:image/avif;base64,AAAAHGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZgAAAZhtZXRhAAAAAAAAACFoZGxyAAAAAAAAAABwaWN0AAAAAAAAAAAAAAAAAAAAAA5waXRtAAAAAAABAAAANGlsb2MAAAAAREAAAgACAAAAAAG8AAEAAAAAAAABbgABAAAAAAMqAAEAAAAAAAABNQAAADhpaW5mAAAAAAACAAAAFWluZmUCAAAAAAEAAGF2MDEAAAAAFWluZmUCAAAAAAIAAGF2MDEAAAAA12lwcnAAAACxaXBjbwAAABNjb2xybmNseAACAAIABoAAAAAMYXYxQ4EAHAAAAAAUaXNwZQAAAAAAAACGAAAAhQAAAA5waXhpAAAAAAEIAAAAOGF1eEMAAAAAdXJuOm1wZWc6bXBlZ0I6Y2ljcDpzeXN0ZW1zOmF1eGlsaWFyeTphbHBoYQAAAAAMYXYxQ4EgAgAAAAAUaXNwZQAAAAAAAACGAAAAhQAAABBwaXhpAAAAAAMICAgAAAAeaXBtYQAAAAAAAAACAAEEgYYHiAACBIIDhIUAAAAaaXJlZgAAAAAAAAAOYXV4bAACAAEAAQAAAqttZGF0EgAKBhgd4WEYVDLhAkSAAQQUtPr+hqAFBXcVxThAeR3ag5t6s/pKL3kJ+WCO6VKv/p/Ud/fe7u/3BjlWK86aB/QGFoY4GwlGKzBsN7u7t6MSHUuq8IMKc1RJ0W7uZB1a8Eket7h2n9nSIVgav3pj0TnSPJ0pWc+LJs2fw2wCFkOubTy4BFNWGRTt//Dc5AGUgjS6f0g94Pf/QvjBtDr5g4h2w3sC/9wbUERzH/+h5dk3leXMLTl0cAhO9d8AdiR/////////Ro9BwE4ni766bel9////////+h///wHL4p1g4AAAAAmDOEUPH7jenf/+nJppNGPtgWHNZFrSxGALek+IqkcE5v///////2f4Wehunk5lQ2dP//////+T3JwlOAV38gAAAABX5/+3Zifeis2C6TFI+XuMsg/6iBu8Ae4Coq8f///lNX6s3OCLmfTelrD4lq1Z7qogRypMHvNl77epTungNgG3Dmj0gnjAEgAKBjgd4WEYJDKoAkSAAAAFALSA8Tu5uuC3jWYcbA/////uq/+ghBqm09VX///////+yoAB3wyZ59jZwLEky5aLT/////92NF0K7Cihcx///////9jCAHvSNNYChb4jRkN///+wTwNgUastK8ZDX////w0ixH3NnY1Kfne8f////3aIclCiJPov///////agACPoy1ttlUX2L////+7i0dKNw9tf///////GCAD7iCMDysV5oeL///2yeW7AiGDXY////7ZuW309clXBj3K///+Gs6jCWcShgH/////tn64TepZ7P///////hzwCB5FKNg32EAnMP/////2zzvC5mUuH///////2MIAqVopt3NzT///xnqJa+SCzOX///33AFHm7DGeJRFKGS0eF///jNIm2kOn";

function Fn(t, s = {}) {
    const o = l.useRef();
    l.useEffect(() => (o.current = new IntersectionObserver(t, s), () => {
        var n;
        return (n = o.current) == null ? void 0 : n.disconnect()
    }), []);
    const a = l.useCallback(n => {
            var i;
            n && ((i = o.current) == null || i.observe(n))
        }, []),
        r = l.useCallback(n => {
            var i;
            n && ((i = o.current) == null || i.unobserve(n))
        }, []);
    return {
        observe: a,
        unobserve: r
    }
}

function An({
    imgSrc: t,
    title: s,
    gameStringId: o,
    isFavourite: a,
    hasWagerBalance: r,
    showWalletIntegrationWarning: n,
    isBonusPlay: i
}) {
    const {
        $t: c
    } = w(), {
        isAuth: d
    } = W(), [p, f] = l.useState(!1), u = l.useRef(null), {
        openDialog: m,
        closeDialog: h
    } = z(), v = te(), {
        observe: j,
        unobserve: C
    } = Fn(b => {
        b.forEach(N => {
            N.isIntersecting && (f(!0), C(N.target))
        })
    }, {
        rootMargin: "50px"
    });
    l.useEffect(() => (j(u.current), () => C(u.current)), [j, C]);
    const y = l.useCallback(() => {
            v({
                to: "/game/$gameId",
                params: {
                    gameId: o
                },
                search: b => ({ ...b
                })
            })
        }, [o, v]),
        _ = l.useCallback(() => {
            n ? m(e.jsx(Ho, {
                actions: e.jsx(O, {
                    type: "primary-variant-1",
                    contentClassName: "h-[45px] flex-center",
                    className: "min-w-[100px] text-xl",
                    onClick: () => {
                        h(), y()
                    },
                    children: c({
                        id: "n7u7Wg",
                        defaultMessage: [{
                            type: 0,
                            value: "ok"
                        }]
                    })
                })
            }), {
                closeOnEscape: !1,
                disableBackdropClose: !0
            }) : y()
        }, [n, c, y, h, m]);
    return e.jsxs("div", {
        dir: "ltr",
        className: "relative overflow-hidden",
        ref: u,
        children: [!i && r && e.jsxs("div", {
            className: "absolute top-0 left-0",
            children: [e.jsx("img", {
                src: Nn,
                alt: "label-no-wager",
                className: "relative z-[1]"
            }), e.jsx("p", {
                className: "-rotate-45 -translate-x-[0.35rem] absolute top-[3rem] left-0 z-[1] max-w-[120px] origin-center truncate text-[20px] uppercase leading-none [text-shadow:0px_4px_4px_rgba(0,0,0,0.5)]",
                children: "no bonus"
            })]
        }), e.jsxs("div", {
            className: "group relative snap-start overflow-hidden rounded-[0.625rem]",
            children: [e.jsx("div", {
                className: "aspect-square bg-cover bg-game-card-preview-img transition-transform duration-200 group-hover:desktop:scale-105",
                children: p && e.jsxs("picture", {
                    children: [e.jsx("source", {
                        srcSet: t.replace(".jpg", ".webp"),
                        type: "image/webp"
                    }), e.jsx("img", {
                        className: "object-contain",
                        src: t,
                        alt: s,
                        loading: "lazy",
                        width: "100%",
                        height: "100%",
                        onError: Sn
                    })]
                })
            }), e.jsx("button", {
                type: "button",
                className: "absolute inset-0 z-[2] opacity-0 shadow-[inset_0_0_1.25rem_0.25rem_#1A25FF] transition-opacity duration-200 desktop:group-hover:opacity-100",
                onClick: _,
                children: e.jsx("div", {
                    className: "-translate-x-1/2 absolute bottom-1/3 left-1/2 flex h-8 items-center justify-center bg-[#244394] px-5 text-base text-white leading-none drop-shadow-[0_0_0.0625rem_black]",
                    children: c({
                        id: "J3ca41",
                        defaultMessage: [{
                            type: 0,
                            value: "Play"
                        }]
                    })
                })
            }), d && e.jsx(ts, {
                className: x("absolute top-2 z-[2] mobile:hidden text-[1.5625rem] opacity-0 transition-opacity duration-200 group-hover:opacity-100 ltr:right-2 rtl:right-auto rtl:left-2", a && "opacity-100"),
                gameStringId: o
            })]
        }), e.jsx("div", {
            className: "flex flex-col justify-center desktop:px-2.5 px-2 py-1",
            children: e.jsx("div", {
                className: "truncate text-center font-medium desktop:text-[14px] text-xs uppercase",
                title: s,
                children: s
            })
        })]
    })
}

function Sn(t) {
    t.target.style.opacity = "0", t.target.parentElement.style.backgroundColor = "#244394"
}

function On() {
    return e.jsxs("div", {
        className: "h-full snap-start rounded-rounded bg-white dark:bg-ebony-clay",
        children: [e.jsx($, {
            className: "h-[8.125rem]"
        }), e.jsxs("div", {
            className: "p-2.5",
            children: [e.jsx($, {
                className: "h-4"
            }), e.jsx($, {
                className: "mt-1 h-4"
            })]
        })]
    })
}
const ss = Object.assign(An, {
        Skeleton: On
    }),
    s1 = e.jsxs("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "31",
        height: "95",
        fill: "none",
        children: [e.jsx("path", {
            fill: "url(#a)",
            fillRule: "evenodd",
            d: "M31 95 13 48 31 0v95Z",
            clipRule: "evenodd"
        }), e.jsx("path", {
            fill: "#669CFF",
            fillOpacity: ".2",
            fillRule: "evenodd",
            d: "M26 95h-7L1 48 19 0h7L8 48l18 47Z",
            clipRule: "evenodd"
        }), e.jsx("path", {
            fill: "url(#b)",
            fillRule: "evenodd",
            d: "M20 95h-2L0 48 18 0h2L2 48l18 47Z",
            clipRule: "evenodd"
        }), e.jsxs("defs", {
            children: [e.jsxs("linearGradient", {
                id: "a",
                x1: "13",
                x2: "31",
                y1: "47.25",
                y2: "47.25",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    stopColor: "#669CFF",
                    stopOpacity: ".6"
                }), e.jsx("stop", {
                    offset: ".43",
                    stopColor: "#669CFF",
                    stopOpacity: ".4"
                }), e.jsx("stop", {
                    offset: "1",
                    stopColor: "#669CFF",
                    stopOpacity: "0"
                })]
            }), e.jsxs("linearGradient", {
                id: "b",
                x1: "10",
                x2: "10",
                y1: "0",
                y2: "95",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    stopColor: "#669CFF",
                    stopOpacity: "0"
                }), e.jsx("stop", {
                    offset: ".4",
                    stopColor: "#669CFF",
                    stopOpacity: ".5"
                }), e.jsx("stop", {
                    offset: ".5",
                    stopColor: "#669CFF"
                }), e.jsx("stop", {
                    offset: ".6",
                    stopColor: "#669CFF",
                    stopOpacity: ".5"
                }), e.jsx("stop", {
                    offset: "1",
                    stopColor: "#669CFF",
                    stopOpacity: "0"
                })]
            })]
        })]
    }),
    l1 = e.jsxs("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "97",
        height: "95",
        fill: "none",
        children: [e.jsx("path", {
            fill: "url(#a1)",
            fillRule: "evenodd",
            d: "M31 95 13 48 31 0v95Z",
            clipRule: "evenodd"
        }), e.jsx("path", {
            fill: "#669CFF",
            fillOpacity: ".1",
            fillRule: "evenodd",
            d: "M26 95h-7L1 48 19 0h7L8 48l18 47Z",
            clipRule: "evenodd"
        }), e.jsx("path", {
            fill: "url(#b2)",
            fillRule: "evenodd",
            d: "M18 95 0 48 18 0h79v95H18Z",
            clipRule: "evenodd"
        }), e.jsx("path", {
            fill: "url(#c3)",
            fillRule: "evenodd",
            d: "M20 95h-2L0 48 18 0h2L2 48l18 47Z",
            clipRule: "evenodd"
        }), e.jsxs("defs", {
            children: [e.jsxs("linearGradient", {
                id: "a1",
                x1: "13",
                x2: "31",
                y1: "47.5",
                y2: "47.5",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    stopColor: "#669CFF",
                    stopOpacity: ".4"
                }), e.jsx("stop", {
                    offset: ".43",
                    stopColor: "#669CFF",
                    stopOpacity: ".2"
                }), e.jsx("stop", {
                    offset: "1",
                    stopColor: "#669CFF",
                    stopOpacity: "0"
                })]
            }), e.jsxs("linearGradient", {
                id: "b2",
                x1: "0",
                x2: "97",
                y1: "47.5",
                y2: "47.5",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    stopColor: "#669CFF",
                    stopOpacity: ".6"
                }), e.jsx("stop", {
                    offset: ".43",
                    stopColor: "#669CFF",
                    stopOpacity: ".4"
                }), e.jsx("stop", {
                    offset: "1",
                    stopColor: "#669CFF",
                    stopOpacity: "0"
                })]
            }), e.jsxs("linearGradient", {
                id: "c3",
                x1: "10",
                x2: "10",
                y1: "0",
                y2: "95",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    stopColor: "#99BDFF",
                    stopOpacity: "0"
                }), e.jsx("stop", {
                    offset: ".3",
                    stopColor: "#99BDFF",
                    stopOpacity: ".6"
                }), e.jsx("stop", {
                    offset: ".5",
                    stopColor: "#99BDFF"
                }), e.jsx("stop", {
                    offset: ".7",
                    stopColor: "#99BDFF",
                    stopOpacity: ".6"
                }), e.jsx("stop", {
                    offset: "1",
                    stopColor: "#99BDFF",
                    stopOpacity: "0"
                })]
            })]
        })]
    }),
    o1 = 166,
    Zn = 210,
    Bn = 20,
    kn = 10,
    a1 = 600,
    Ln = 8;

function Rn() {
    const {
        $t: t
    } = w(), s = l.useRef(null), [o, a] = l.useState(!0), [r, n] = l.useState(!1), [i, c] = l.useState(3), d = V.useBalances(), {
        hasNoWagerableGamesInCurrentFilter: p
    } = yt(), {
        isLoading: f,
        isError: u,
        error: m
    } = I.useList(), h = qe(), v = q({
        strict: !1,
        select: ({
            cid: g
        }) => g
    }), j = q({
        strict: !1,
        select: ({
            pid: g
        }) => g
    }), C = document.dir || "ltr", y = l.useCallback(() => {
        if (!s.current) return;
        const {
            scrollLeft: g,
            scrollWidth: M,
            clientWidth: L
        } = s.current, K = M - L;
        a(g <= 0), n(g >= K)
    }, []);
    l.useEffect(() => {
        const g = s.current;
        if (g) return y(), g.addEventListener("scroll", y), () => g.removeEventListener("scroll", y)
    }, [y]);
    const _ = l.useCallback(vt(() => {
        var L;
        const g = ((L = s.current) == null ? void 0 : L.clientHeight) ? ? 0,
            M = Math.max(Math.floor(g / Zn), 1);
        c(Math.min(M, Ln)), y()
    }, 50), []);
    l.useLayoutEffect(() => {
        if (h.length) return _(), window.addEventListener("resize", _), () => window.removeEventListener("resize", _)
    }, [_, h, p]);
    const b = C === "rtl" ? [...h].reverse() : h,
        N = f1({
            horizontal: !0,
            count: b != null && b.length ? Math.ceil(b.length / i) : 0,
            getScrollElement: () => s.current,
            estimateSize: () => o1,
            overscan: 15,
            gap: Bn
        });
    l.useEffect(() => {
        if (s.current && C === "rtl" && h.length > 0) {
            const g = s.current.scrollWidth - s.current.clientWidth;
            g > 0 && (s.current.scrollTo(g, 0), y())
        }
    }, [C, h.length, y]), l.useEffect(() => {
        if (s.current && (j || v || p)) {
            if (C === "rtl") {
                const g = s.current.scrollWidth - s.current.clientWidth;
                s.current.scrollTo(g, 0)
            } else s.current.scrollTo(0, 0);
            y()
        }
    }, [j, v, y, C]);
    const Z = l.useCallback(g => {
        if (!s.current) return;
        const M = g === "left" ? -a1 : a1;
        s.current.scrollBy({
            left: M,
            behavior: "smooth"
        })
    }, []);
    return f ? e.jsx(Be, {}) : u && !(h != null && h.length) ? e.jsx("span", {
        className: "text-falu-red text-xl",
        children: m.message
    }) : e.jsxs("div", {
        className: "game-card-list-container",
        children: [h != null && h.length ? e.jsx("div", {
            dir: "ltr",
            ref: s,
            className: "game-card-list",
            children: e.jsx("div", {
                className: "relative my-auto h-full overflow-y-hidden",
                style: {
                    width: N.getTotalSize()
                },
                children: N.getVirtualItems().map(g => e.jsx("div", {
                    "data-index": g.index,
                    ref: N.measureElement,
                    className: "virtual-column",
                    style: {
                        position: "absolute",
                        top: "50%",
                        left: 0,
                        width: `${o1}px`,
                        transform: `translateX(${g.start}px) translateY(-50%)`,
                        display: "grid",
                        gridTemplateRows: `repeat(${i}, 1fr)`,
                        gap: `${kn}px`
                    },
                    children: b == null ? void 0 : b.slice(g.index * i, (g.index + 1) * i).map(M => {
                        var L, K;
                        return e.jsx(ss, {
                            hasWagerBalance: !!((K = (L = d == null ? void 0 : d.data) == null ? void 0 : L.wager) != null && K.remaining),
                            showWalletIntegrationWarning: M.isWalletIntegration,
                            isBonusPlay: M.isBonusPlay,
                            imgSrc: M == null ? void 0 : M.pic,
                            title: M.name,
                            id: M.id,
                            gameStringId: M.stringId,
                            isFavourite: M.isFavourite,
                            provider: M.providerName
                        }, M.id)
                    })
                }, g.key))
            })
        }) : e.jsxs("div", {
            className: "mx-auto h-full flex-center flex-col text-center desktop:text-4xl text-xs peer-empty:block",
            children: [e.jsx(J, {
                name: "gamepad",
                className: "h-[4em] w-[4em]"
            }), t({
                id: "tEd1Pr",
                defaultMessage: [{
                    type: 0,
                    value: "No games in this category"
                }]
            })]
        }), (h == null ? void 0 : h.length) > 0 && e.jsxs(e.Fragment, {
            children: [e.jsx(Ut, {
                disabled: o,
                direction: "left",
                onClick: () => Z("left"),
                svgDefault: s1,
                svgHover: l1,
                className: "-translate-y-1/2 absolute top-1/2 left-10 z-100"
            }), e.jsx(Ut, {
                disabled: r,
                direction: "right",
                svgDefault: s1,
                svgHover: l1,
                onClick: () => Z("right"),
                className: "-translate-y-1/2 absolute top-1/2 right-10"
            })]
        })]
    })
}
const Hn = 160,
    zn = 200,
    ot = 10;

function Un() {
    const {
        $t: t
    } = w(), {
        isLoading: s,
        isError: o,
        error: a
    } = I.useList(), r = qe(), n = V.useBalances(), i = l.useRef(null), [c, d] = l.useState(2), p = q({
        strict: !1,
        select: ({
            cid: v
        }) => v
    }), f = q({
        strict: !1,
        select: ({
            pid: v
        }) => v
    }), u = l.useCallback(() => {
        const v = i.current;
        if (!v) return;
        const j = v.clientWidth - ot * 2,
            C = Math.max(Math.floor(j / (Hn + ot)), 2);
        d(C)
    }, []), m = l.useCallback(vt(() => {
        u()
    }, 100), []);
    l.useLayoutEffect(() => {
        if (r.length) return u(), window.addEventListener("resize", m), () => window.removeEventListener("resize", m)
    }, [m, r, u]);
    const h = f1({
        count: r != null && r.length ? Math.ceil(r.length / c) : 0,
        getScrollElement: () => i.current,
        estimateSize: () => zn + ot,
        overscan: 5
    });
    return l.useEffect(() => {
        i.current && (f || p) && i.current.scrollTo(0, 0)
    }, [f, p]), s ? e.jsx(it, {
        className: "h-[100dvh] w-full"
    }) : o && !(r != null && r.length) ? e.jsx("span", {
        className: "#010101 text-falu-red text-xl",
        children: a.message
    }) : e.jsx("div", {
        ref: i,
        className: "w-full py-2",
        children: r != null && r.length ? e.jsx("div", {
            className: "relative w-full px-2.5",
            style: {
                height: `${h.getTotalSize()}px`
            },
            children: h.getVirtualItems().map(v => e.jsx("div", {
                "data-index": v.index,
                ref: h.measureElement,
                className: "absolute top-0 left-0 grid w-full gap-2.5 px-2.5",
                style: {
                    transform: `translateY(${v.start}px)`,
                    gridTemplateColumns: `repeat(${c}, 1fr)`
                },
                children: r == null ? void 0 : r.slice(v.index * c, (v.index + 1) * c).map(j => {
                    var C, y;
                    return e.jsx(ss, {
                        hasWagerBalance: !!((y = (C = n == null ? void 0 : n.data) == null ? void 0 : C.wager) != null && y.remaining),
                        isBonusPlay: j.isBonusPlay,
                        showWalletIntegrationWarning: j.isWalletIntegration,
                        imgSrc: j.pic,
                        title: j.name,
                        id: j.id,
                        gameStringId: j.stringId,
                        isFavourite: j.isFavourite,
                        provider: j.providerName
                    }, j.id)
                })
            }, v.key))
        }) : e.jsxs("div", {
            className: "mt-[8dvh] flex flex-center flex-col whitespace-nowrap text-2xl peer-empty:block",
            children: [e.jsx(J, {
                name: "gamepad",
                className: "h-[4em] w-[4em]"
            }), t({
                id: "tEd1Pr",
                defaultMessage: [{
                    type: 0,
                    value: "No games in this category"
                }]
            })]
        })
    })
}

function Dn() {
    return me(ke) ? e.jsx(Un, {}) : e.jsx(Rn, {})
}
const Vn = l.memo(Dn);

function Gn() {
    return e.jsx(e.Fragment, {
        children: e.jsxs("div", {
            className: "relative flex h-[100dvh] flex-col desktop:overflow-hidden",
            children: [e.jsxs("div", {
                className: "flex flex-1 flex-col desktop:overflow-hidden overscroll-y-none desktop:pb-0 pb-24",
                children: [e.jsx("div", {
                    className: "top-gradient-bg mobile:contents",
                    children: e.jsx(Qr, {})
                }), e.jsxs("div", {
                    className: "mobile-wrapper-header-gradients",
                    children: [e.jsx("div", {
                        className: "fixed top-0 mobile:mb-2.5 mobile:contents desktop:hidden h-[4.375rem] w-full translate-y-1/4",
                        children: e.jsx(K1, {})
                    }), e.jsx(on, {})]
                }), e.jsxs("main", {
                    className: "relative flex desktop:flex-1 flex-col items-center",
                    children: [e.jsx(Vn, {}), e.jsx(an, {})]
                })]
            }), e.jsx("div", {
                className: "absolute top-[60px] z-50 desktop:contents w-full",
                children: e.jsx(rn, {})
            }), e.jsx(Ao, {
                children: e.jsx(bn, {})
            }), e.jsxs(So, {
                children: [e.jsx(vl, {
                    className: "z-10"
                }), e.jsx(pn, {
                    className: "relative z-10"
                })]
            })]
        })
    })
}

function In() {
    return e.jsx(Gn, {})
}
const Tn = we("/_auth/casino")({
    loader: () => Promise.all([Ye(), Z1(), _t(), Aa(), Sa()]),
    component: In,
    onError: console.error,
    pendingComponent: () => e.jsx(Be, {})
});

function Pn({
    className: t
}) {
    const {
        toggle: s
    } = p2();
    return e.jsx("button", {
        onClick: s,
        type: "button",
        className: x("rounded-lg border-1 border-mine-shaft bg-woodsmoke px-[0.75rem] py-[0.75rem]", t),
        children: e.jsx(k, {
            className: "size-4.5",
            name: "fullscreen"
        })
    })
}

function $n({
    className: t,
    onClose: s
}) {
    const {
        data: o
    } = V.usePlayer(), {
        handleBack: a,
        isPending: r
    } = S1(), n = o == null ? void 0 : o.displayableName;
    return e.jsx("footer", {
        className: t,
        children: e.jsx("div", {
            className: "mx-auto",
            children: e.jsxs("div", {
                className: "mb-1 flex flex-col",
                children: [e.jsx("hr", {
                    className: "mb-1 bg-jumbo opacity-30"
                }), e.jsxs("div", {
                    className: "flex items-center justify-between gap-1 bg-black px-7.5",
                    children: [e.jsxs("div", {
                        className: "flex-center gap-1 ",
                        children: [e.jsx(k, {
                            className: "size-4.5 text-white",
                            name: "profile"
                        }), e.jsx("span", {
                            className: "opacity-50",
                            children: n
                        })]
                    }), e.jsxs("div", {
                        className: "flex flex-center gap-6",
                        children: [e.jsx(Pn, {}), e.jsx("div", {
                            onClick: () => {
                                a(), s == null || s()
                            },
                            className: "rounded-lg border-1 border-mine-shaft bg-woodsmoke px-[0.75rem] py-[0.75rem]",
                            children: r ? e.jsx(k, {
                                className: "size-4.5 animate-spin",
                                name: "reload"
                            }) : e.jsx(k, {
                                className: "size-4.5",
                                name: "close"
                            })
                        })]
                    })]
                })]
            })
        })
    })
}

function Wn({
    id: t,
    className: s,
    type: o,
    value: a
}) {
    const r = re(),
        n = a != null,
        i = () => {
            if (!n) return null;
            const c = r(a),
                d = c.match(/^(\d+)\.(\d+)(.*)$/);
            if (!d) return e.jsx("div", {
                className: "jackpots-ticker-game__value ml-[0.375em]",
                children: c
            });
            const [, p, f, u] = d;
            return e.jsxs("div", {
                className: "jackpots-ticker-game__value ml-[0.375em]",
                children: [e.jsx("span", {
                    className: "jackpots-ticker-game__value-integer",
                    children: p
                }), e.jsxs("span", {
                    className: "jackpots-ticker-game__value-decimal",
                    children: [".", f]
                }), e.jsx("span", {
                    className: "jackpots-ticker-game__value-integer",
                    children: u
                })]
            })
        };
    return e.jsx("div", {
        className: x(`jackpots__ticker-game jackpots-ticker-game jackpots-ticker-game_type_${o}`, s),
        "data-jp-ticker-id": t,
        children: e.jsxs("div", {
            className: "jackpots-ticker-game__inner",
            children: [e.jsx("div", {
                className: "jackpots-ticker-game__text",
                lang: "en",
                children: o
            }), i()]
        })
    })
}
const Ue = l.memo(Wn),
    ls = i1();

function qn() {
    var a;
    const {
        isAuth: t
    } = W(), {
        data: s,
        isLoading: o
    } = ae.useLobby();
    return !t || !o && !((a = s == null ? void 0 : s.jackpots) != null && a.isActive) ? null : e.jsx(Kn, {})
}
const r1 = t => t.offsetTop;

function Kn() {
    var u, m, h, v;
    const t = l.useRef(null),
        [s, o] = l.useState(!0),
        [a, r] = l.useState(!1);
    l.useEffect(() => ls.on("TOGGLE_JACKPOTS_VISIBILITY", () => {
        o(j => !j)
    }), []);
    const {
        slots: n
    } = gt(), i = n && Array.isArray(n) && n.length > 0, c = (u = n == null ? void 0 : n.find(({
        name: j
    }) => j === "mini")) == null ? void 0 : u.value, d = (m = n == null ? void 0 : n.find(({
        name: j
    }) => j === "major")) == null ? void 0 : m.value, p = (h = n == null ? void 0 : n.find(({
        name: j
    }) => j === "grand")) == null ? void 0 : h.value, f = (v = n == null ? void 0 : n.find(({
        name: j
    }) => j === "ultimate")) == null ? void 0 : v.value;
    return l.useEffect(() => {
        if (!t.current) return;
        const j = new ResizeObserver(C => {
            for (const y of C) {
                const b = y.target.children;
                if (b.length < 2) return;
                r(r1(b[1]) > r1(b[0]))
            }
        });
        return j.observe(t.current), () => j.disconnect()
    }, [i]), e.jsxs("div", {
        ref: t,
        className: x("jackpots-game transition-transform ease-in-out", a && "jackpots_wrapped", !s && "mobile:-translate-y-1 transition-transform duration-150 ease-in-out"),
        children: [e.jsxs("div", {
            className: "jackpots__tickers-game-group",
            children: [e.jsx(Ue, {
                type: "mini",
                value: c,
                id: 0
            }), e.jsx(Ue, {
                type: "major",
                value: d,
                id: 1
            })]
        }), e.jsxs("div", {
            className: "jackpots__tickers-game-group",
            children: [e.jsx(Ue, {
                type: "grand",
                value: p,
                id: 2
            }), e.jsx(Ue, {
                type: "ultimate",
                value: f,
                id: 3
            })]
        })]
    })
}
const n1 = -20,
    Qn = 15;

function Yn({
    containerRef: t,
    baseItems: s,
    totalRepeats: o,
    stopIndex: a,
    status: r,
    onStop: n
}) {
    const i = l.useRef(),
        c = l.useRef(0),
        d = l.useRef(!1),
        p = l.useRef({
            itemHeight: 0,
            totalItems: 0
        }),
        f = m => {
            d.current = !1, c.current = 0, Re.set(m, {
                y: n1
            })
        },
        u = m => {
            const h = m.querySelector(".mini-game__reel");
            if (h) return h.offsetHeight
        };
    l.useEffect(() => {
        const m = t.current;
        m && (p.current = {
            itemHeight: u(m) ? ? 0,
            totalItems: s.length
        }, f(m))
    }, [s.length, t, o]), l.useEffect(() => {
        if (r !== "spinning") return;
        const m = t.current;
        if (!m || d.current) return;
        const {
            itemHeight: h,
            totalItems: v
        } = p.current;
        if (!h) return;
        const j = () => {
                i.current = Re.to(m, {
                    translateY: `-=${h*v}`,
                    duration: .4,
                    ease: "none",
                    modifiers: {
                        translateY: y => {
                            const _ = Number.parseFloat(y),
                                b = h * v;
                            return `${(_%b+b)%b-h}`
                        }
                    },
                    onRepeat: () => {
                        c.current += 1, c.current >= Qn && !d.current && C()
                    },
                    repeat: -1
                })
            },
            C = () => {
                var b;
                d.current = !0, (b = i.current) == null || b.pause();
                const _ = -(v * o + a) * h + h + n1;
                Re.to(m, {
                    translateY: `${_-h/2}px`,
                    duration: 4,
                    ease: "none",
                    onComplete: () => {
                        Re.to(m, {
                            translateY: _,
                            duration: 5,
                            ease: "power3.out",
                            onComplete: n,
                            overwrite: !0
                        })
                    },
                    overwrite: !0
                })
            };
        return j(), () => {
            var y;
            (y = i.current) == null || y.kill()
        }
    }, [r, a, t, n])
}
const mt = ["MINI", "MAJOR", "GRAND", "ULTIMATE"],
    os = 2;

function Jn() {
    const t = Array(os).fill(mt).flat();
    return [...t, ...mt, ...t]
}

function Xn({
    className: t,
    stopIndex: s,
    status: o,
    onStop: a
}) {
    const r = Jn(),
        n = l.useRef(null);
    return Yn({
        containerRef: n,
        baseItems: mt,
        totalRepeats: os,
        stopIndex: s,
        status: o,
        onStop: a
    }), e.jsx("div", {
        ref: n,
        className: x("mini-game__reels", t),
        children: r.map((i, c) => e.jsx("div", {
            className: x("mini-game__reel", c % 2 === 0 ? "mini-game__reel_variant1" : "mini-game__reel_variant2"),
            children: e.jsx("p", {
                className: "mini-game__reel-text",
                children: i
            })
        }, c))
    })
}

function e3({
    className: t
}) {
    return e.jsxs("svg", {
        width: "100%",
        height: "100%",
        className: t,
        viewBox: "0 0 484 467",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [e.jsx("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M232.475 367.5C222.975 357.2 209.475 350.7 194.375 350.7C179.275 350.7 165.675 357.2 156.275 367.5H41.375V321.5H347.375V367.5H232.475ZM41.375 67.5H347.375V113.5H41.375V67.5Z",
            fill: "url(#paint0_linear_451_4676)"
        }), e.jsx("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M363.375 181.5H386.375C387.475 181.5 388.375 182.4 388.375 183.5V264.5C388.375 265.6 387.475 266.5 386.375 266.5H363.375C362.275 266.5 361.375 265.6 361.375 264.5V183.5C361.375 182.4 362.275 181.5 363.375 181.5Z",
            fill: "url(#paint1_linear_451_4676)"
        }), e.jsx("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M355.375 164.5H378.375C379.475 164.5 380.375 165.4 380.375 166.5V281.5C380.375 282.6 379.475 283.5 378.375 283.5H355.375C354.275 283.5 353.375 282.6 353.375 281.5V166.5C353.375 165.4 354.275 164.5 355.375 164.5Z",
            fill: "url(#paint2_linear_451_4676)"
        }), e.jsx("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M355.375 164.5H378.375C379.475 164.5 380.375 165.4 380.375 166.5V281.5C380.375 282.6 379.475 283.5 378.375 283.5H355.375C354.275 283.5 353.375 282.6 353.375 281.5V166.5C353.375 165.4 354.275 164.5 355.375 164.5Z",
            fill: "url(#paint3_linear_451_4676)"
        }), e.jsx("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M387.375 265.9V181.5C387.975 181.8 388.375 182.5 388.375 183.2V264.2C388.375 265 387.975 265.6 387.375 265.9ZM379.375 282.9V164.5C379.975 164.8 380.375 165.5 380.375 166.2V281.2C380.375 282 379.975 282.6 379.375 282.9Z",
            fill: "url(#paint4_linear_451_4676)",
            fillOpacity: "0.1"
        }), e.jsxs("g", {
            clipPath: "url(#clip0_451_4676)",
            children: [e.jsx("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M366 435H235.7C241.7 427.4 245.6 418.1 246.6 408H358C360.8 408 363 405.8 363 403V32C363 29.2 360.8 27 358 27H32C29.2 27 27 29.2 27 32V403C27 405.8 29.2 408 32 408H143.5C144.5 418.1 148.4 427.4 154.4 435H24C10.7 435 0 424.3 0 411V24C0 10.7 10.7 0 24 0H366C379.3 0 390 10.7 390 24V411C390 424.3 379.3 435 366 435Z",
                fill: "#3A89FF",
                fillOpacity: "0.02"
            }), e.jsx("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M365 433H237.2C242.3 425.8 245.7 417.3 246.5 408H358C360.8 408 363 405.8 363 403V32C363 29.2 360.8 27 358 27H32C29.2 27 27 29.2 27 32V403C27 405.8 29.2 408 32 408H143.5C144.4 417.3 147.7 425.8 152.8 433H25C12.3 433 2 422.7 2 410V25C2 12.3 12.3 2 25 2H365C377.7 2 388 12.3 388 25V410C388 422.7 377.7 433 365 433Z",
                fill: "#3A89FF",
                fillOpacity: "0.02"
            }), e.jsx("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M365 431H238.5C242.9 424.2 245.7 416.4 246.5 408H358C360.8 408 363 405.8 363 403V32C363 29.2 360.8 27 358 27H32C29.2 27 27 29.2 27 32V403C27 405.8 29.2 408 32 408H143.5C144.3 416.4 147.1 424.2 151.5 431H25C13.4 431 4 421.6 4 410V25C4 13.4 13.4 4 25 4H365C376.6 4 386 13.4 386 25V410C386 421.6 376.6 431 365 431Z",
                fill: "#3A89FF",
                fillOpacity: "0.02"
            }), e.jsx("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M365 429H239.7C243.4 422.7 245.7 415.6 246.5 408H358C360.8 408 363 405.8 363 403V32C363 29.2 360.8 27 358 27H32C29.2 27 27 29.2 27 32V403C27 405.8 29.2 408 32 408H143.5C144.2 415.6 146.6 422.7 150.3 429H25C14.5 429 6 420.5 6 410V25C6 14.5 14.5 6 25 6H365C375.5 6 384 14.5 384 25V410C384 420.5 375.5 429 365 429Z",
                fill: "#3A89FF",
                fillOpacity: "0.02"
            }), e.jsx("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M365 427H240.9C243.9 421.2 245.9 414.8 246.6 408H358C360.8 408 363 405.8 363 403V32C363 29.2 360.8 27 358 27H32C29.2 27 27 29.2 27 32V403C27 405.8 29.2 408 32 408H143.5C144.2 414.8 146.1 421.2 149.2 427H25C15.6 427 8 419.4 8 410V25C8 15.6 15.6 8 25 8H365C374.4 8 382 15.6 382 25V410C382 419.4 374.4 427 365 427Z",
                fill: "#3A89FF",
                fillOpacity: "0.02"
            }), e.jsx("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M365 425H241.8C244.3 419.8 245.9 414 246.5 408H358C360.8 408 363 405.8 363 403V32C363 29.2 360.8 27 358 27H32C29.2 27 27 29.2 27 32V403C27 405.8 29.2 408 32 408H143.5C144.1 414 145.7 419.8 148.2 425H25C16.7 425 10 418.3 10 410V25C10 16.7 16.7 10 25 10H365C373.3 10 380 16.7 380 25V410C380 418.3 373.3 425 365 425Z",
                fill: "#3A89FF",
                fillOpacity: "0.03"
            }), e.jsx("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M365 423H242.7C244.7 418.3 246 413.3 246.5 408H358C360.8 408 363 405.8 363 403V32C363 29.2 360.8 27 358 27H32C29.2 27 27 29.2 27 32V403C27 405.8 29.2 408 32 408H143.5C144 413.3 145.3 418.3 147.3 423H25C17.8 423 12 417.2 12 410V25C12 17.8 17.8 12 25 12H365C372.2 12 378 17.8 378 25V410C378 417.2 372.2 423 365 423Z",
                fill: "#3A89FF",
                fillOpacity: "0.05"
            }), e.jsx("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M365 421H243.5C245 416.9 246.1 412.5 246.5 408H358C360.8 408 363 405.8 363 403V32C363 29.2 360.8 27 358 27H32C29.2 27 27 29.2 27 32V403C27 405.8 29.2 408 32 408H143.5C143.9 412.5 145 416.9 146.5 421H25C18.9 421 14 416.1 14 410V25C14 18.9 18.9 14 25 14H365C371.1 14 376 18.9 376 25V410C376 416.1 371.1 421 365 421Z",
                fill: "#3A89FF",
                fillOpacity: "0.1"
            }), e.jsx("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M365 419H244.2C245.3 415.5 246.1 411.8 246.5 408H358C360.8 408 363 405.8 363 403V32C363 29.2 360.8 27 358 27H32C29.2 27 27 29.2 27 32V403C27 405.8 29.2 408 32 408H143.5C143.9 411.8 144.7 415.5 145.8 419H25C20 419 16 415 16 410V25C16 20 20 16 25 16H365C370 16 374 20 374 25V410C374 415 370 419 365 419Z",
                fill: "#3A89FF",
                fillOpacity: "0.12"
            }), e.jsx("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M365 417H244.8C245.6 414.1 246.2 411.1 246.5 408H358C360.8 408 363 405.8 363 403V32C363 29.2 360.8 27 358 27H32C29.2 27 27 29.2 27 32V403C27 405.8 29.2 408 32 408H143.5C143.8 411.1 144.4 414.1 145.2 417H25C21.1 417 18 413.9 18 410V25C18 21.1 21.1 18 25 18H365C368.9 18 372 21.1 372 25V410C372 413.9 368.9 417 365 417Z",
                fill: "#3A89FF",
                fillOpacity: "0.32"
            })]
        }), e.jsx("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M362.875 412.8H245.375C245.975 409.5 246.375 406.1 246.375 402.7C246.375 389.2 241.175 376.9 232.775 367.7H307.275C310.375 359.3 331.575 298.9 331.575 218.2C331.575 137.4 310.275 76.1 307.275 67.7H81.975C78.875 76.1 57.675 137.4 57.675 218.2C57.675 298.9 78.975 359.3 81.975 367.7H156.475C147.975 376.9 142.875 389.2 142.875 402.7C142.875 406.2 143.175 409.6 143.875 412.8H26.375C23.575 412.8 21.375 410.6 21.375 407.8V26.5C21.375 23.7 23.575 21.5 26.375 21.5H362.875C365.675 21.5 367.875 23.7 367.875 26.5V407.7C367.875 410.5 365.675 412.8 362.875 412.8Z",
            fill: "url(#paint5_linear_451_4676)"
        }), e.jsx("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M362.875 412.8H245.375C245.975 409.5 246.375 406.1 246.375 402.7C246.375 389.2 241.175 376.9 232.775 367.7H307.275C310.375 359.3 331.575 298.9 331.575 218.2C331.575 137.4 310.275 76.1 307.275 67.7H81.975C78.875 76.1 57.675 137.4 57.675 218.2C57.675 298.9 78.975 359.3 81.975 367.7H156.475C147.975 376.9 142.875 389.2 142.875 402.7C142.875 406.2 143.175 409.6 143.875 412.8H26.375C23.575 412.8 21.375 410.6 21.375 407.8V26.5C21.375 23.7 23.575 21.5 26.375 21.5H362.875C365.675 21.5 367.875 23.7 367.875 26.5V407.7C367.875 410.5 365.675 412.8 362.875 412.8Z",
            fill: "#2A2FC5"
        }), e.jsx("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M362.875 412.8H245.375C245.975 409.5 246.375 406.1 246.375 402.7C246.375 389.2 241.175 376.9 232.775 367.7H307.275C310.375 359.3 331.575 298.9 331.575 218.2C331.575 137.4 310.275 76.1 307.275 67.7H81.975C78.875 76.1 57.675 137.4 57.675 218.2C57.675 298.9 78.975 359.3 81.975 367.7H156.475C147.975 376.9 142.875 389.2 142.875 402.7C142.875 406.2 143.175 409.6 143.875 412.8H26.375C23.575 412.8 21.375 410.6 21.375 407.8V26.5C21.375 23.7 23.575 21.5 26.375 21.5H362.875C365.675 21.5 367.875 23.7 367.875 26.5V407.7C367.875 410.5 365.675 412.8 362.875 412.8Z",
            fill: "url(#paint6_linear_451_4676)"
        }), e.jsx("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M362.875 412.8H245.375C245.975 409.5 246.375 406.1 246.375 402.7C246.375 389.2 241.175 376.9 232.775 367.7H307.275C310.375 359.3 331.575 298.9 331.575 218.2C331.575 137.4 310.275 76.1 307.275 67.7H81.975C78.875 76.1 57.675 137.4 57.675 218.2C57.675 298.9 78.975 359.3 81.975 367.7H156.475C147.975 376.9 142.875 389.2 142.875 402.7C142.875 406.2 143.175 409.6 143.875 412.8H26.375C23.575 412.8 21.375 410.6 21.375 407.8V26.5C21.375 23.7 23.575 21.5 26.375 21.5H362.875C365.675 21.5 367.875 23.7 367.875 26.5V407.7C367.875 410.5 365.675 412.8 362.875 412.8Z",
            fill: "url(#paint7_linear_451_4676)"
        }), e.jsx("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M362.875 412.8H245.375C245.975 409.5 246.375 406.1 246.375 402.7C246.375 389.2 241.175 376.9 232.775 367.7H307.275C310.375 359.3 331.575 298.9 331.575 218.2C331.575 137.4 310.275 76.1 307.275 67.7H81.975C78.875 76.1 57.675 137.4 57.675 218.2C57.675 298.9 78.975 359.3 81.975 367.7H156.475C147.975 376.9 142.875 389.2 142.875 402.7C142.875 406.2 143.175 409.6 143.875 412.8H26.375C23.575 412.8 21.375 410.6 21.375 407.8V26.5C21.375 23.7 23.575 21.5 26.375 21.5H362.875C365.675 21.5 367.875 23.7 367.875 26.5V407.7C367.875 410.5 365.675 412.8 362.875 412.8Z",
            fill: "url(#paint8_linear_451_4676)"
        }), e.jsx("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M81.375 67.5L24.375 33.5H364.375L307.375 67.5H81.375ZM156.275 367.5C147.975 376.5 142.875 388.4 142.675 401.5H24.375L81.375 367.5H156.275ZM307.375 367.5L364.375 401.5H246.075C245.875 388.4 240.675 376.5 232.475 367.5H307.375Z",
            fill: "url(#paint9_linear_451_4676)"
        }), e.jsx("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M81.375 67.5L24.375 33.5H364.375L307.375 67.5H81.375ZM156.275 367.5C147.975 376.5 142.875 388.4 142.675 401.5H24.375L81.375 367.5H156.275ZM307.375 367.5L364.375 401.5H246.075C245.875 388.4 240.675 376.5 232.475 367.5H307.375Z",
            fill: "url(#paint10_linear_451_4676)"
        }), e.jsx("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M81.375 67.5L24.375 33.5H364.375L307.375 67.5H81.375ZM156.275 367.5C147.975 376.5 142.875 388.4 142.675 401.5H24.375L81.375 367.5H156.275ZM307.375 367.5L364.375 401.5H246.075C245.875 388.4 240.675 376.5 232.475 367.5H307.375Z",
            fill: "url(#paint11_linear_451_4676)"
        }), e.jsx("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M364.625 414.5H249.325C243.825 439.7 221.425 458.5 194.625 458.5C167.825 458.5 145.425 439.7 139.925 414.5H24.625C21.825 414.5 19.625 412.3 19.625 409.5V24.5C19.625 21.7 21.825 19.5 24.625 19.5H364.625C367.425 19.5 369.625 21.7 369.625 24.5V409.5C369.625 412.3 367.425 414.5 364.625 414.5ZM194.625 454.3C223.225 454.3 246.425 431.1 246.425 402.5C246.425 373.9 223.225 350.7 194.625 350.7C166.025 350.7 142.825 373.9 142.825 402.5C142.825 431.1 166.025 454.3 194.625 454.3ZM352.625 41.5C352.625 38.7 350.425 36.5 347.625 36.5H41.625C38.825 36.5 36.625 38.7 36.625 41.5V392.5C36.625 395.3 38.825 397.5 41.625 397.5H138.825C141.325 368.9 165.325 346.5 194.625 346.5C223.925 346.5 247.825 368.9 250.425 397.5H347.625C350.425 397.5 352.625 395.3 352.625 392.5V41.5Z",
            fill: "url(#paint12_linear_451_4676)"
        }), e.jsx("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M364.625 412.5H249.325C243.825 437.7 221.425 456.5 194.625 456.5C167.825 456.5 145.425 437.7 139.925 412.5H24.625C21.825 412.5 19.625 410.3 19.625 407.5V25.5C19.625 22.7 21.825 20.5 24.625 20.5H364.625C367.425 20.5 369.625 22.7 369.625 25.5V407.5C369.625 410.3 367.425 412.5 364.625 412.5ZM194.625 454.3C223.225 454.3 246.425 431.1 246.425 402.5C246.425 373.9 223.225 350.7 194.625 350.7C166.025 350.7 142.825 373.9 142.825 402.5C142.825 431.1 166.025 454.3 194.625 454.3ZM352.625 41.5C352.625 38.7 350.425 36.5 347.625 36.5H41.625C38.825 36.5 36.625 38.7 36.625 41.5V392.5C36.625 395.3 38.825 397.5 41.625 397.5H138.825C141.325 368.9 165.325 346.5 194.625 346.5C223.925 346.5 247.825 368.9 250.425 397.5H347.625C350.425 397.5 352.625 395.3 352.625 392.5V41.5Z",
            fill: "url(#paint13_linear_451_4676)"
        }), e.jsx("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M364.625 412.5H249.325C243.825 437.7 221.425 456.5 194.625 456.5C167.825 456.5 145.425 437.7 139.925 412.5H24.625C21.825 412.5 19.625 410.3 19.625 407.5V25.5C19.625 22.7 21.825 20.5 24.625 20.5H364.625C367.425 20.5 369.625 22.7 369.625 25.5V407.5C369.625 410.3 367.425 412.5 364.625 412.5ZM194.625 454.3C223.225 454.3 246.425 431.1 246.425 402.5C246.425 373.9 223.225 350.7 194.625 350.7C166.025 350.7 142.825 373.9 142.825 402.5C142.825 431.1 166.025 454.3 194.625 454.3ZM352.625 41.5C352.625 38.7 350.425 36.5 347.625 36.5H41.625C38.825 36.5 36.625 38.7 36.625 41.5V392.5C36.625 395.3 38.825 397.5 41.625 397.5H138.825C141.325 368.9 165.325 346.5 194.625 346.5C223.925 346.5 247.825 368.9 250.425 397.5H347.625C350.425 397.5 352.625 395.3 352.625 392.5V41.5Z",
            fill: "url(#paint14_linear_451_4676)"
        }), e.jsx("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M364.625 412.5H249.325C243.825 437.7 221.425 456.5 194.625 456.5C167.825 456.5 145.425 437.7 139.925 412.5H24.625C21.825 412.5 19.625 410.3 19.625 407.5V25.5C19.625 22.7 21.825 20.5 24.625 20.5H364.625C367.425 20.5 369.625 22.7 369.625 25.5V407.5C369.625 410.3 367.425 412.5 364.625 412.5ZM194.625 454.3C223.225 454.3 246.425 431.1 246.425 402.5C246.425 373.9 223.225 350.7 194.625 350.7C166.025 350.7 142.825 373.9 142.825 402.5C142.825 431.1 166.025 454.3 194.625 454.3ZM352.625 41.5C352.625 38.7 350.425 36.5 347.625 36.5H41.625C38.825 36.5 36.625 38.7 36.625 41.5V392.5C36.625 395.3 38.825 397.5 41.625 397.5H138.825C141.325 368.9 165.325 346.5 194.625 346.5C223.925 346.5 247.825 368.9 250.425 397.5H347.625C350.425 397.5 352.625 395.3 352.625 392.5V41.5Z",
            fill: "url(#paint15_linear_451_4676)"
        }), e.jsx("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M36 327V393C36 395.8 38.2 398 41 398H143.5C143.3 399.6 143.3 400.3 143.3 402C143.3 406.1 143.8 410.1 144.7 414H25C22.2 414 20 411.8 20 409V327H36ZM246.5 398H348C350.8 398 353 395.8 353 393V327H370V409C370 411.8 367.8 414 365 414H245.3C246.2 410.1 246.7 406.1 246.7 402C246.8 400.3 246.7 399.6 246.5 398Z",
            fill: "url(#paint16_linear_451_4676)"
        }), e.jsx("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M347.375 399.5H246.075C246.075 398.8 245.975 398.2 245.875 397.5H347.375C350.175 397.5 352.375 395.3 352.375 392.5V245.2L333.375 217.5L352.375 187.1V41.5C352.375 38.7 350.175 36.5 347.375 36.5H41.375C38.575 36.5 36.375 38.7 36.375 41.5V187.1L55.375 217.5L36.375 245.2V392.5C36.375 395.3 38.575 397.5 41.375 397.5H142.875C142.775 398.2 142.775 398.8 142.675 399.5H41.375C37.475 399.5 34.375 396.4 34.375 392.5V250.4V182.8V41.5C34.375 37.6 37.475 34.5 41.375 34.5H347.375C351.275 34.5 354.375 37.6 354.375 41.5V182.8V250.4V392.5C354.375 396.4 351.275 399.5 347.375 399.5Z",
            fill: "url(#paint17_linear_451_4676)"
        }), e.jsx("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M335.375 217L352.375 190.5V242.3L335.375 217ZM36.375 190.5L53.375 217L36.375 242.3V190.5Z",
            fill: "white"
        }), e.jsx("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M337.375 217L350.375 196.5V236.3L337.375 217ZM38.375 196.5L51.375 217L38.375 236.3V196.5Z",
            fill: "url(#paint18_linear_451_4676)"
        }), e.jsx("ellipse", {
            cx: "36.1875",
            cy: "216.5",
            rx: "5",
            ry: "119.5",
            fill: "url(#paint19_radial_451_4676)"
        }), e.jsx("ellipse", {
            cx: "36.1875",
            cy: "216.5",
            rx: "3",
            ry: "59.5",
            fill: "url(#paint20_radial_451_4676)"
        }), e.jsx("ellipse", {
            cx: "353.188",
            cy: "216.5",
            rx: "6",
            ry: "119.5",
            fill: "url(#paint21_radial_451_4676)"
        }), e.jsx("ellipse", {
            cx: "353.188",
            cy: "216.5",
            rx: "3",
            ry: "59.5",
            fill: "url(#paint22_radial_451_4676)"
        }), e.jsx("ellipse", {
            cx: "194",
            cy: "20",
            rx: "5.99999",
            ry: "174",
            transform: "rotate(-90 194 20)",
            fill: "url(#paint23_radial_451_4676)"
        }), e.jsx("ellipse", {
            cx: "194",
            cy: "34",
            rx: "5.99999",
            ry: "174",
            transform: "rotate(-90 194 34)",
            fill: "url(#paint24_radial_451_4676)"
        }), e.jsx("g", {
            filter: "url(#filter0_d_451_4676)",
            children: e.jsx("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M194.375 346.5C163.475 346.5 138.375 371.6 138.375 402.5C138.375 433.4 163.475 458.5 194.375 458.5C225.275 458.5 250.375 433.4 250.375 402.5C250.375 371.6 225.275 346.5 194.375 346.5ZM194.375 446.7C169.975 446.7 150.175 426.9 150.175 402.5C150.175 378.1 169.975 358.3 194.375 358.3C218.775 358.3 238.575 378.1 238.575 402.5C238.575 426.9 218.775 446.7 194.375 446.7Z",
                fill: "url(#paint25_linear_451_4676)"
            })
        }), e.jsx("g", {
            filter: "url(#filter1_d_451_4676)",
            children: e.jsx("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M194.375 350.5C163.475 350.5 143.375 371.6 143.375 402.5C143.375 433.4 163.475 454.5 194.375 454.5C225.275 454.5 246.375 433.4 246.375 402.5C246.375 371.6 225.275 350.5 194.375 350.5ZM194.375 446.7C169.975 446.7 150.175 426.9 150.175 402.5C150.175 378.1 169.975 358.3 194.375 358.3C218.775 358.3 238.575 378.1 238.575 402.5C238.575 426.9 218.775 446.7 194.375 446.7Z",
                fill: "url(#paint26_linear_451_4676)"
            })
        }), e.jsx("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M194.675 348.45C164.675 348.45 140.375 372.75 140.375 402.75C140.375 432.75 164.675 457.05 194.675 457.05C224.675 457.05 248.975 432.75 248.975 402.75C248.975 372.75 224.675 348.45 194.675 348.45ZM194.675 448.75C169.275 448.75 148.675 428.15 148.675 402.75C148.675 377.35 169.275 356.75 194.675 356.75C220.075 356.75 240.675 377.35 240.675 402.75C240.675 428.15 220.075 448.75 194.675 448.75Z",
            fill: "#E8C858"
        }), e.jsx("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M194.675 348.45C164.675 348.45 140.375 372.75 140.375 402.75C140.375 432.75 164.675 457.05 194.675 457.05C224.675 457.05 248.975 432.75 248.975 402.75C248.975 372.75 224.675 348.45 194.675 348.45ZM194.675 448.75C169.275 448.75 148.675 428.15 148.675 402.75C148.675 377.35 169.275 356.75 194.675 356.75C220.075 356.75 240.675 377.35 240.675 402.75C240.675 428.15 220.075 448.75 194.675 448.75Z",
            fill: "url(#paint27_linear_451_4676)"
        }), e.jsx("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M194.675 348.45C164.675 348.45 140.375 372.75 140.375 402.75C140.375 432.75 164.675 457.05 194.675 457.05C224.675 457.05 248.975 432.75 248.975 402.75C248.975 372.75 224.675 348.45 194.675 348.45ZM194.675 448.75C169.275 448.75 148.675 428.15 148.675 402.75C148.675 377.35 169.275 356.75 194.675 356.75C220.075 356.75 240.675 377.35 240.675 402.75C240.675 428.15 220.075 448.75 194.675 448.75Z",
            fill: "url(#paint28_linear_451_4676)"
        }), e.jsx("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M194.675 348.45C164.675 348.45 140.375 372.75 140.375 402.75C140.375 432.75 164.675 457.05 194.675 457.05C224.675 457.05 248.975 432.75 248.975 402.75C248.975 372.75 224.675 348.45 194.675 348.45ZM194.675 448.75C169.275 448.75 148.675 428.15 148.675 402.75C148.675 377.35 169.275 356.75 194.675 356.75C220.075 356.75 240.675 377.35 240.675 402.75C240.675 428.15 220.075 448.75 194.675 448.75Z",
            fill: "url(#paint29_linear_451_4676)"
        }), e.jsx("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M194.675 348.45C164.675 348.45 140.375 372.75 140.375 402.75C140.375 432.75 164.675 457.05 194.675 457.05C224.675 457.05 248.975 432.75 248.975 402.75C248.975 372.75 224.675 348.45 194.675 348.45ZM194.675 448.75C169.275 448.75 148.675 428.15 148.675 402.75C148.675 377.35 169.275 356.75 194.675 356.75C220.075 356.75 240.675 377.35 240.675 402.75C240.675 428.15 220.075 448.75 194.675 448.75Z",
            fill: "url(#paint30_linear_451_4676)"
        }), e.jsx("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M194.675 348.45C164.675 348.45 140.375 372.75 140.375 402.75C140.375 432.75 164.675 457.05 194.675 457.05C224.675 457.05 248.975 432.75 248.975 402.75C248.975 372.75 224.675 348.45 194.675 348.45ZM194.675 448.75C169.275 448.75 148.675 428.15 148.675 402.75C148.675 377.35 169.275 356.75 194.675 356.75C220.075 356.75 240.675 377.35 240.675 402.75C240.675 428.15 220.075 448.75 194.675 448.75Z",
            fill: "url(#paint31_linear_451_4676)"
        }), e.jsx("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M194.675 348.45C164.675 348.45 140.375 372.75 140.375 402.75C140.375 432.75 164.675 457.05 194.675 457.05C224.675 457.05 248.975 432.75 248.975 402.75C248.975 372.75 224.675 348.45 194.675 348.45ZM194.675 448.75C169.275 448.75 148.675 428.15 148.675 402.75C148.675 377.35 169.275 356.75 194.675 356.75C220.075 356.75 240.675 377.35 240.675 402.75C240.675 428.15 220.075 448.75 194.675 448.75Z",
            fill: "url(#paint32_linear_451_4676)"
        }), e.jsx("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M194.675 348.45C164.675 348.45 140.375 372.75 140.375 402.75C140.375 432.75 164.675 457.05 194.675 457.05C224.675 457.05 248.975 432.75 248.975 402.75C248.975 372.75 224.675 348.45 194.675 348.45ZM194.675 448.75C169.275 448.75 148.675 428.15 148.675 402.75C148.675 377.35 169.275 356.75 194.675 356.75C220.075 356.75 240.675 377.35 240.675 402.75C240.675 428.15 220.075 448.75 194.675 448.75Z",
            fill: "url(#paint33_linear_451_4676)"
        }), e.jsx("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M306.476 66.5H294.564C294.564 66.5 319.084 141.8 319.084 218C319.084 294.2 294.564 368.5 294.564 368.5H306.476C306.476 368.5 330.997 305.1 330.997 218C330.997 130.9 306.476 66.5 306.476 66.5ZM81.5208 66.5C81.5208 66.5 57 130.9 57 218C57 305.1 81.5208 368.5 81.5208 368.5H93.4337C93.4337 368.5 68.9129 294.2 68.9129 218C68.9129 141.8 93.4337 66.5 93.4337 66.5H81.5208Z",
            fill: "black",
            fillOpacity: "0.4"
        }), e.jsx("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M306.476 66.5H295.556C295.556 66.5 320.077 141.8 320.077 218C320.077 294.2 295.556 368.5 295.556 368.5H306.476C306.476 368.5 330.997 305.1 330.997 218C330.997 130.9 306.476 66.5 306.476 66.5ZM81.5208 66.5C81.5208 66.5 57 130.9 57 218C57 305.1 81.5208 368.5 81.5208 368.5H92.4409C92.4409 368.5 67.9202 294.2 67.9202 218C67.9202 141.8 92.4409 66.5 92.4409 66.5H81.5208Z",
            fill: "url(#paint34_linear_451_4676)"
        }), e.jsx("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M306.476 66.5H299.527C299.527 66.5 324.048 141.8 324.048 218C324.048 294.2 299.527 368.5 299.527 368.5H306.476C306.476 368.5 330.997 305.1 330.997 218C330.997 130.9 306.476 66.5 306.476 66.5ZM81.5208 66.5C81.5208 66.5 57 130.9 57 218C57 305.1 81.5208 368.5 81.5208 368.5H88.47C88.47 368.5 63.9492 294.2 63.9492 218C63.9492 141.8 88.47 66.5 88.47 66.5H81.5208Z",
            fill: "url(#paint35_linear_451_4676)"
        }), e.jsx("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M306.983 67H301.027C301.027 67 325.548 142.3 325.548 218.5C325.548 294.7 301.027 369 301.027 369H306.983C306.983 369 331.504 305.6 331.504 218.5C331.504 131.4 306.983 67 306.983 67ZM82.0276 67C82.0276 67 57.5068 131.4 57.5068 218.5C57.5068 305.6 82.0276 369 82.0276 369H87.9841C87.9841 369 63.4633 294.7 63.4633 218.5C63.4633 142.3 87.9841 67 87.9841 67H82.0276Z",
            fill: "url(#paint36_linear_451_4676)"
        }), e.jsxs("g", {
            className: "mobile:translate-x-[9%] mobile:scale-90",
            children: [e.jsx("path", {
                d: "M393.188 216.483C390.283 216.483 388 214.786 388 212.625V200.278C388 193.487 395.471 187.931 404.602 187.931H418.091C421.826 187.931 425.769 185.461 426.496 182.606L441.645 123.34L456.691 64.1511C457.209 62.0676 459.907 60.6785 462.709 61.0644C465.51 61.4502 467.378 63.4566 466.859 65.5402L451.814 124.806L436.664 184.072C435.108 190.555 426.911 195.725 418.091 195.725H404.602C401.178 195.725 398.376 197.808 398.376 200.355V212.702C398.376 214.786 396.093 216.483 393.188 216.483Z",
                fill: "url(#paint37_linear_451_4676)"
            }), e.jsx("path", {
                d: "M462.812 61.5274C465.303 61.9132 466.755 64.3055 466.34 66.1575L451.399 124.806L436.249 184.072C434.9 189.474 428.882 193.95 421.826 195.107C420.581 195.339 418.921 195.416 417.676 195.416H407.404C407.3 195.416 404.394 195.416 404.291 195.416C400.866 195.493 398.169 197.5 398.065 200.046C397.961 200.123 397.961 203.365 397.961 203.442V212.239C397.961 213.628 396.924 215.249 395.263 215.789C394.641 216.02 393.811 216.098 393.084 216.098C390.49 216.098 388.519 213.937 388.519 212.008V204.985C388.519 204.831 388.623 199.892 388.726 199.738C388.934 196.265 391.217 193.178 394.641 191.172C397.235 189.397 402.319 188.239 406.158 188.239C406.573 188.239 419.025 188.008 419.336 187.776C420.996 187.622 422.657 187.005 424.109 186.156C425.562 185.307 426.911 183.532 427.222 182.22L442.268 123.417L457.106 64.6141C457.417 63.3023 458.87 61.8361 460.633 61.5274C461.256 61.373 462.086 61.373 462.812 61.5274Z",
                fill: "white",
                fillOpacity: "0.02"
            }), e.jsx("path", {
                d: "M462.812 61.9132C464.991 62.2219 466.133 65 465.718 66.6206L450.88 124.652L435.731 183.918C434.382 189.32 428.26 193.718 421.204 194.722C420.166 194.876 418.195 195.03 417.157 195.03H406.988C406.781 195.03 404.083 195.03 403.876 195.107C400.555 195.262 397.857 197.191 397.546 199.66C397.442 199.892 397.339 202.824 397.339 203.056V211.853C397.339 213.088 396.405 215.017 395.056 215.48C394.537 215.635 393.499 215.789 392.877 215.789C390.698 215.789 388.83 213.165 388.83 211.545V204.599C388.83 204.213 388.934 199.738 389.245 199.429C389.764 196.034 392.254 193.101 395.782 191.403C398.065 189.783 404.187 188.857 407.507 188.857C408.441 188.857 419.855 188.471 420.374 187.854C421.93 187.622 423.487 186.928 424.732 186.002C426.081 185.23 427.326 183.146 427.533 181.989L442.475 123.494L457.417 65.1543C457.728 63.9968 459.181 62.2219 460.633 61.9132C461.152 61.8361 462.19 61.8361 462.812 61.9132Z",
                fill: "white",
                fillOpacity: "0.02"
            }), e.jsx("path", {
                d: "M462.812 62.3763C464.68 62.6078 465.51 65.7717 465.095 67.1608L450.465 124.652L435.315 183.918C433.966 189.243 427.844 193.564 420.789 194.49C419.855 194.645 417.676 194.722 416.742 194.722H406.677C406.366 194.722 403.979 194.722 403.668 194.799C400.347 195.03 397.753 196.96 397.338 199.352C397.131 199.661 397.027 202.284 397.027 202.67V211.39C397.027 212.393 396.197 214.631 395.056 215.094C394.64 215.249 393.395 215.326 392.877 215.326C391.009 215.326 389.452 212.239 389.452 210.85V203.905C389.452 203.365 389.66 199.275 390.075 198.812C390.801 195.493 393.499 192.792 397.235 191.249C399.206 189.86 406.366 189.088 409.271 189.088C410.62 189.088 420.996 188.471 421.722 187.622C423.175 187.236 424.628 186.542 425.769 185.539C426.911 184.844 428.156 182.529 428.363 181.526L442.994 123.572L457.728 65.6946C457.935 64.6914 459.388 62.6078 460.633 62.3763C461.152 62.2219 462.293 62.2991 462.812 62.3763Z",
                fill: "white",
                fillOpacity: "0.02"
            }), e.jsx("path", {
                d: "M462.812 62.8393C464.369 63.0708 464.784 66.5434 464.473 67.7781L449.946 124.652L434.797 183.918C433.448 189.166 427.222 193.487 420.27 194.259C419.544 194.413 417.053 194.49 416.223 194.49H406.158C405.743 194.49 403.564 194.567 403.149 194.645C399.933 194.953 397.339 196.805 396.716 199.12C396.508 199.506 396.301 201.898 396.301 202.439V211.082C396.301 211.93 395.575 214.477 394.641 214.863C394.226 215.017 392.981 215.094 392.462 215.094C390.905 215.094 389.556 211.622 389.556 210.387V203.519C389.556 202.747 389.868 199.12 390.386 198.503C391.32 195.339 394.226 192.715 398.065 191.481C399.725 190.323 407.922 189.629 410.309 189.629C412.177 189.629 421.411 188.857 422.449 187.699C423.902 187.236 425.147 186.387 426.184 185.384C427.118 184.844 428.363 182.143 428.571 181.294L443.201 123.957L458.143 66.1576C458.351 65.3087 459.596 62.9165 460.633 62.685C461.049 62.6078 462.397 62.7621 462.812 62.8393Z",
                fill: "white",
                fillOpacity: "0.02"
            }), e.jsx("path", {
                d: "M462.812 63.2251C464.058 63.3795 464.161 67.3151 463.85 68.2411L449.531 124.498L434.382 183.764C433.136 189.011 426.807 193.255 419.855 193.796C419.232 193.873 416.535 193.95 415.912 193.95H405.951C405.432 193.95 403.461 194.027 402.942 194.104C399.725 194.49 397.131 196.265 396.508 198.58C396.197 199.12 395.99 201.204 395.99 201.821V210.387C395.99 211.082 395.471 213.937 394.641 214.168C394.329 214.246 392.877 214.323 392.462 214.323C391.217 214.323 390.179 210.387 390.179 209.461V202.67C390.179 201.744 390.49 198.426 391.113 197.654C392.358 194.567 395.471 192.098 399.414 191.095C400.763 190.169 409.998 189.629 411.865 189.629C414.148 189.629 422.345 188.625 423.694 187.236C425.043 186.619 426.184 185.77 427.015 184.69C427.741 184.227 428.986 181.217 429.09 180.6L443.616 123.726L458.143 66.6978C458.558 66.0032 459.907 63.3023 460.737 63.0708C461.048 63.0708 462.501 63.2251 462.812 63.2251Z",
                fill: "white",
                fillOpacity: "0.02"
            }), e.jsx("path", {
                d: "M462.812 63.6881C463.746 63.8425 463.435 68.0868 463.227 68.7813L449.116 124.42L433.967 183.686C432.721 188.857 426.392 193.101 419.44 193.487C419.025 193.564 415.912 193.641 415.497 193.641H405.639C405.017 193.641 403.253 193.718 402.734 193.873C399.621 194.259 397.027 196.034 396.197 198.271C395.782 198.889 395.575 200.741 395.575 201.513V210.001C395.575 210.541 395.16 213.705 394.537 213.86C394.329 213.937 392.669 214.014 392.462 214.014C391.528 214.014 390.698 209.615 390.698 208.921V202.13C390.698 200.972 391.113 198.117 391.839 197.191C393.292 194.181 396.612 191.944 400.763 191.172C401.8 190.477 412.073 190.091 413.525 190.091C416.327 190.091 423.487 188.934 425.043 187.159C426.288 186.465 427.326 185.461 428.052 184.381C428.571 184.072 429.816 180.677 429.92 180.214L444.343 123.803L458.766 67.1607C458.869 66.6205 460.115 63.6109 460.737 63.4566C460.945 63.4566 462.605 63.6109 462.812 63.6881Z",
                fill: "white",
                fillOpacity: "0.02"
            }), e.jsx("path", {
                d: "M462.812 64.1512C463.435 64.2283 462.812 68.8585 462.709 69.3215L448.597 124.343L433.448 183.609C432.203 188.702 425.769 192.947 418.921 193.178C418.61 193.255 415.289 193.255 414.978 193.255H405.224C404.498 193.255 403.045 193.333 402.319 193.487C399.206 193.95 396.716 195.648 395.782 197.886C395.367 198.657 395.056 200.201 395.056 201.05V209.461C395.056 209.77 394.744 213.242 394.433 213.397C394.329 213.474 392.462 213.474 392.358 213.474C391.735 213.474 391.217 208.612 391.217 208.149V201.435C391.217 200.124 391.735 197.654 392.565 196.574C394.226 193.641 397.857 191.558 402.112 191.018C402.734 190.555 414.148 190.323 415.082 190.323C418.298 190.323 424.42 188.934 426.288 186.928C427.43 186.079 428.363 185.076 428.986 183.918C429.401 183.686 430.542 180.059 430.542 179.674L444.862 123.803L459.077 67.7009C459.181 67.3923 460.322 63.9968 460.737 63.9196C460.945 63.8425 462.709 64.074 462.812 64.1512Z",
                fill: "white",
                fillOpacity: "0.02"
            }), e.jsx("path", {
                d: "M462.812 64.537C463.124 64.6142 462.086 69.6302 462.086 69.8617L448.182 124.266L433.033 183.532C431.788 188.625 425.354 192.715 418.506 192.87C418.402 192.87 414.771 192.947 414.563 192.947H404.809C403.876 192.947 402.734 193.024 401.904 193.178C398.895 193.718 396.405 195.416 395.367 197.5C394.848 198.349 394.537 199.661 394.537 200.664V208.998C394.537 209.152 394.433 212.934 394.226 213.011C394.122 213.011 392.254 213.088 392.15 213.088C391.839 213.088 391.528 207.84 391.528 207.609V200.895C391.528 199.352 392.15 197.345 393.084 196.111C395.056 193.333 398.791 191.326 403.149 191.095C403.46 190.863 415.912 190.709 416.431 190.709C420.062 190.709 425.147 189.165 427.326 186.85C428.363 185.924 429.193 184.767 429.609 183.609C429.816 183.532 430.957 179.519 430.957 179.365L445.069 123.957L459.492 68.2411C459.492 68.0868 460.633 64.3827 460.841 64.3055L462.812 64.537Z",
                fill: "white",
                fillOpacity: "0.02"
            }), e.jsx("path", {
                d: "M394.226 212.625H392.15V200.278C392.15 195.185 397.754 191.017 404.602 191.017H418.091C423.902 191.017 429.505 187.468 430.542 183.146L445.692 123.88L460.841 64.6913L462.916 65L447.767 124.266L432.618 183.455C431.372 188.471 424.835 192.561 418.091 192.561H404.602C398.895 192.561 394.226 196.033 394.226 200.278V212.625Z",
                fill: "white",
                fillOpacity: "0.02"
            }), e.jsx("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M465.158 34C475.12 34 483.317 41.8 483.317 51.5C483.317 61.1 475.223 69 465.158 69C455.093 68.9 447 61.1 447 51.5C447 41.8 455.093 34 465.158 34Z",
                fill: "url(#paint38_radial_451_4676)"
            }), e.jsx("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M465.158 68C455.508 67.7 450.113 61.2 450.113 56.1C450.113 49.3 458.518 48 465.262 48C472.007 48 480.204 49.3 480.204 56C480.204 61.3 474.808 67.7 465.158 68Z",
                fill: "url(#paint39_radial_451_4676)"
            }), e.jsx("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M464.279 54.4C452.45 54.4 449.649 45.6 451.828 42.3C457.327 33.9 472.373 33.9 477.872 42.3C479.947 45.6 476.108 54.4 464.279 54.4Z",
                fill: "url(#paint40_radial_451_4676)"
            })]
        }), e.jsxs("defs", {
            children: [e.jsxs("filter", {
                id: "filter0_d_451_4676",
                x: "134.375",
                y: "346.5",
                width: "120",
                height: "120",
                filterUnits: "userSpaceOnUse",
                colorInterpolationFilters: "sRGB",
                children: [e.jsx("feFlood", {
                    floodOpacity: "0",
                    result: "BackgroundImageFix"
                }), e.jsx("feColorMatrix", { in: "SourceAlpha",
                    type: "matrix",
                    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                    result: "hardAlpha"
                }), e.jsx("feOffset", {
                    dy: "4"
                }), e.jsx("feGaussianBlur", {
                    stdDeviation: "2"
                }), e.jsx("feComposite", {
                    in2: "hardAlpha",
                    operator: "out"
                }), e.jsx("feColorMatrix", {
                    type: "matrix",
                    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                }), e.jsx("feBlend", {
                    mode: "normal",
                    in2: "BackgroundImageFix",
                    result: "effect1_dropShadow_451_4676"
                }), e.jsx("feBlend", {
                    mode: "normal",
                    in: "SourceGraphic",
                    in2: "effect1_dropShadow_451_4676",
                    result: "shape"
                })]
            }), e.jsxs("filter", {
                id: "filter1_d_451_4676",
                x: "139.375",
                y: "350.5",
                width: "111",
                height: "112",
                filterUnits: "userSpaceOnUse",
                colorInterpolationFilters: "sRGB",
                children: [e.jsx("feFlood", {
                    floodOpacity: "0",
                    result: "BackgroundImageFix"
                }), e.jsx("feColorMatrix", { in: "SourceAlpha",
                    type: "matrix",
                    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                    result: "hardAlpha"
                }), e.jsx("feOffset", {
                    dy: "4"
                }), e.jsx("feGaussianBlur", {
                    stdDeviation: "2"
                }), e.jsx("feComposite", {
                    in2: "hardAlpha",
                    operator: "out"
                }), e.jsx("feColorMatrix", {
                    type: "matrix",
                    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                }), e.jsx("feBlend", {
                    mode: "normal",
                    in2: "BackgroundImageFix",
                    result: "effect1_dropShadow_451_4676"
                }), e.jsx("feBlend", {
                    mode: "normal",
                    in: "SourceGraphic",
                    in2: "effect1_dropShadow_451_4676",
                    result: "shape"
                })]
            }), e.jsxs("linearGradient", {
                id: "paint0_linear_451_4676",
                x1: "194.375",
                y1: "67.5",
                x2: "194.375",
                y2: "367.5",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    stopOpacity: "0.8"
                }), e.jsx("stop", {
                    offset: "0.01",
                    stopOpacity: "0.2"
                }), e.jsx("stop", {
                    offset: "0.12",
                    stopOpacity: "0"
                }), e.jsx("stop", {
                    offset: "0.88",
                    stopOpacity: "0"
                }), e.jsx("stop", {
                    offset: "0.99",
                    stopOpacity: "0.2"
                }), e.jsx("stop", {
                    offset: "1",
                    stopOpacity: "0.8"
                })]
            }), e.jsxs("linearGradient", {
                id: "paint1_linear_451_4676",
                x1: "374.875",
                y1: "181.5",
                x2: "374.875",
                y2: "266.5",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    stopColor: "#232323"
                }), e.jsx("stop", {
                    offset: "0.14",
                    stopColor: "#353535"
                }), e.jsx("stop", {
                    offset: "0.24",
                    stopColor: "#454545"
                }), e.jsx("stop", {
                    offset: "0.345",
                    stopColor: "#CFCFCF"
                }), e.jsx("stop", {
                    offset: "0.47",
                    stopColor: "#101010"
                }), e.jsx("stop", {
                    offset: "0.73",
                    stopColor: "#353535"
                }), e.jsx("stop", {
                    offset: "1",
                    stopColor: "#232323"
                })]
            }), e.jsxs("linearGradient", {
                id: "paint2_linear_451_4676",
                x1: "366.875",
                y1: "164.5",
                x2: "366.875",
                y2: "283.5",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {}), e.jsx("stop", {
                    offset: "0.14"
                }), e.jsx("stop", {
                    offset: "0.24",
                    stopColor: "#454545"
                }), e.jsx("stop", {
                    offset: "0.345",
                    stopColor: "#515151"
                }), e.jsx("stop", {
                    offset: "0.47",
                    stopColor: "#2A2A2A"
                }), e.jsx("stop", {
                    offset: "0.55",
                    stopColor: "#040404"
                }), e.jsx("stop", {
                    offset: "1"
                })]
            }), e.jsxs("linearGradient", {
                id: "paint3_linear_451_4676",
                x1: "366.875",
                y1: "164.5",
                x2: "366.875",
                y2: "283.5",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    stopColor: "#1C1C1C"
                }), e.jsx("stop", {
                    offset: "0.14",
                    stopColor: "#353535"
                }), e.jsx("stop", {
                    offset: "0.24",
                    stopColor: "#454545"
                }), e.jsx("stop", {
                    offset: "0.345",
                    stopColor: "#D8D8D8"
                }), e.jsx("stop", {
                    offset: "0.47",
                    stopColor: "#131313"
                }), e.jsx("stop", {
                    offset: "0.73",
                    stopColor: "#353535"
                }), e.jsx("stop", {
                    offset: "1",
                    stopColor: "#161616"
                })]
            }), e.jsxs("linearGradient", {
                id: "paint4_linear_451_4676",
                x1: "383.875",
                y1: "164.5",
                x2: "383.875",
                y2: "282.9",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    offset: "0.14",
                    stopColor: "#424242"
                }), e.jsx("stop", {
                    offset: "0.19",
                    stopColor: "#C7C7C7"
                }), e.jsx("stop", {
                    offset: "0.47",
                    stopColor: "#575757"
                }), e.jsx("stop", {
                    offset: "0.785",
                    stopColor: "#CBCBCB"
                }), e.jsx("stop", {
                    offset: "0.915",
                    stopColor: "#424242"
                })]
            }), e.jsxs("linearGradient", {
                id: "paint5_linear_451_4676",
                x1: "194.625",
                y1: "412.8",
                x2: "194.625",
                y2: "21.5",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    stopColor: "#03041D"
                }), e.jsx("stop", {
                    offset: "0.3",
                    stopColor: "#080C8D"
                }), e.jsx("stop", {
                    offset: "0.7",
                    stopColor: "#070DC8"
                }), e.jsx("stop", {
                    offset: "0.95",
                    stopColor: "#03041D"
                })]
            }), e.jsxs("linearGradient", {
                id: "paint6_linear_451_4676",
                x1: "21.375",
                y1: "217.15",
                x2: "367.875",
                y2: "217.15",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    offset: "0.03",
                    stopColor: "#3A60F8"
                }), e.jsx("stop", {
                    offset: "0.08",
                    stopColor: "#3A60F8",
                    stopOpacity: "0"
                }), e.jsx("stop", {
                    offset: "0.92",
                    stopColor: "#3A60F8",
                    stopOpacity: "0"
                }), e.jsx("stop", {
                    offset: "0.97",
                    stopColor: "#3A60F8"
                })]
            }), e.jsxs("linearGradient", {
                id: "paint7_linear_451_4676",
                x1: "367.875",
                y1: "80.3364",
                x2: "21.375",
                y2: "353.964",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    offset: "0.3",
                    stopColor: "#07082B",
                    stopOpacity: "0"
                }), e.jsx("stop", {
                    offset: "0.5",
                    stopColor: "#07082B"
                }), e.jsx("stop", {
                    offset: "0.7",
                    stopColor: "#07082B",
                    stopOpacity: "0"
                })]
            }), e.jsxs("linearGradient", {
                id: "paint8_linear_451_4676",
                x1: "21.375",
                y1: "73.9339",
                x2: "367.875",
                y2: "360.366",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    offset: "0.3",
                    stopColor: "#07082B",
                    stopOpacity: "0"
                }), e.jsx("stop", {
                    offset: "0.5",
                    stopColor: "#07082B"
                }), e.jsx("stop", {
                    offset: "0.7",
                    stopColor: "#07082B",
                    stopOpacity: "0"
                })]
            }), e.jsxs("linearGradient", {
                id: "paint9_linear_451_4676",
                x1: "194.375",
                y1: "33.5",
                x2: "194.375",
                y2: "401.5",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    offset: "0.03",
                    stopColor: "#162356"
                }), e.jsx("stop", {
                    offset: "0.0918478",
                    stopColor: "#1031B2"
                }), e.jsx("stop", {
                    offset: "0.93",
                    stopColor: "#3456DD"
                }), e.jsx("stop", {
                    offset: "0.98",
                    stopColor: "#1031B2"
                })]
            }), e.jsxs("linearGradient", {
                id: "paint10_linear_451_4676",
                x1: "364.375",
                y1: "87.6671",
                x2: "35.6265",
                y2: "360.872",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    offset: "0.3",
                    stopColor: "#07082B",
                    stopOpacity: "0"
                }), e.jsx("stop", {
                    offset: "0.5",
                    stopColor: "#07082B"
                }), e.jsx("stop", {
                    offset: "0.7",
                    stopColor: "#07082B",
                    stopOpacity: "0"
                })]
            }), e.jsxs("linearGradient", {
                id: "paint11_linear_451_4676",
                x1: "24.375",
                y1: "86.9208",
                x2: "352.71",
                y2: "362.002",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    offset: "0.3",
                    stopColor: "#07082B",
                    stopOpacity: "0"
                }), e.jsx("stop", {
                    offset: "0.5",
                    stopColor: "#07082B"
                }), e.jsx("stop", {
                    offset: "0.7",
                    stopColor: "#07082B",
                    stopOpacity: "0"
                })]
            }), e.jsxs("linearGradient", {
                id: "paint12_linear_451_4676",
                x1: "194.625",
                y1: "19.5",
                x2: "194.625",
                y2: "458.5",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    stopColor: "#6B9EFF"
                }), e.jsx("stop", {
                    offset: "0.805",
                    stopColor: "#2C2485"
                })]
            }), e.jsxs("linearGradient", {
                id: "paint13_linear_451_4676",
                x1: "19.625",
                y1: "419.858",
                x2: "369.122",
                y2: "420.344",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    stopColor: "#5F6DF9"
                }), e.jsx("stop", {
                    offset: "0.01",
                    stopColor: "#183195"
                }), e.jsx("stop", {
                    offset: "0.12",
                    stopColor: "#516BD2"
                }), e.jsx("stop", {
                    offset: "0.3",
                    stopColor: "#96ADFF"
                }), e.jsx("stop", {
                    offset: "0.52",
                    stopColor: "#DEECFF"
                }), e.jsx("stop", {
                    offset: "0.7",
                    stopColor: "#96ADFF"
                }), e.jsx("stop", {
                    offset: "0.8",
                    stopColor: "#516BD2"
                }), e.jsx("stop", {
                    offset: "0.99",
                    stopColor: "#183195"
                }), e.jsx("stop", {
                    offset: "1",
                    stopColor: "#5F6DF9"
                })]
            }), e.jsxs("linearGradient", {
                id: "paint14_linear_451_4676",
                x1: "19.625",
                y1: "47.8337",
                x2: "403.35",
                y2: "391.512",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    offset: "0.39",
                    stopColor: "#2233AC",
                    stopOpacity: "0"
                }), e.jsx("stop", {
                    offset: "0.47",
                    stopColor: "#5A5ECF"
                }), e.jsx("stop", {
                    offset: "0.5",
                    stopColor: "#2233AC",
                    stopOpacity: "0"
                })]
            }), e.jsxs("linearGradient", {
                id: "paint15_linear_451_4676",
                x1: "369.625",
                y1: "112.544",
                x2: "47.4474",
                y2: "396.071",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    offset: "0.39",
                    stopColor: "#2233AC",
                    stopOpacity: "0"
                }), e.jsx("stop", {
                    offset: "0.47",
                    stopColor: "#5A5ECF"
                }), e.jsx("stop", {
                    offset: "0.5",
                    stopColor: "#2233AC",
                    stopOpacity: "0"
                })]
            }), e.jsxs("linearGradient", {
                id: "paint16_linear_451_4676",
                x1: "20",
                y1: "370.5",
                x2: "370",
                y2: "370.5",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    offset: "0.3",
                    stopColor: "#1D2975",
                    stopOpacity: "0"
                }), e.jsx("stop", {
                    offset: "0.4",
                    stopColor: "#1D2975"
                }), e.jsx("stop", {
                    offset: "0.6",
                    stopColor: "#1D2975"
                }), e.jsx("stop", {
                    offset: "0.7",
                    stopColor: "#1D2975",
                    stopOpacity: "0"
                })]
            }), e.jsxs("linearGradient", {
                id: "paint17_linear_451_4676",
                x1: "194.375",
                y1: "34.5",
                x2: "194.375",
                y2: "399.5",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    stopColor: "#090E30"
                }), e.jsx("stop", {
                    offset: "0.02",
                    stopColor: "#29389C"
                }), e.jsx("stop", {
                    offset: "0.25",
                    stopColor: "#303FA5"
                }), e.jsx("stop", {
                    offset: "0.5",
                    stopColor: "#718DFF"
                }), e.jsx("stop", {
                    offset: "0.75",
                    stopColor: "#323F9C"
                }), e.jsx("stop", {
                    offset: "0.99",
                    stopColor: "#3B4BBE"
                }), e.jsx("stop", {
                    offset: "1",
                    stopColor: "#BDC6FF"
                })]
            }), e.jsxs("linearGradient", {
                id: "paint18_linear_451_4676",
                x1: "194.375",
                y1: "196.5",
                x2: "194.375",
                y2: "236.3",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    stopColor: "#D0ECFF"
                }), e.jsx("stop", {
                    offset: "0.5",
                    stopColor: "white"
                }), e.jsx("stop", {
                    offset: "0.52",
                    stopColor: "#8FAEE6"
                }), e.jsx("stop", {
                    offset: "0.65",
                    stopColor: "#80A3FC"
                }), e.jsx("stop", {
                    offset: "1",
                    stopColor: "#A0CDFF"
                })]
            }), e.jsxs("radialGradient", {
                id: "paint19_radial_451_4676",
                cx: "0",
                cy: "0",
                r: "1",
                gradientUnits: "userSpaceOnUse",
                gradientTransform: "translate(36.1875 216.5) rotate(90) scale(119.5 5)",
                children: [e.jsx("stop", {
                    stopColor: "white"
                }), e.jsx("stop", {
                    offset: "0.345",
                    stopColor: "white",
                    stopOpacity: "0.3"
                }), e.jsx("stop", {
                    offset: "0.945",
                    stopColor: "white",
                    stopOpacity: "0"
                })]
            }), e.jsxs("radialGradient", {
                id: "paint20_radial_451_4676",
                cx: "0",
                cy: "0",
                r: "1",
                gradientUnits: "userSpaceOnUse",
                gradientTransform: "translate(36.1875 216.5) rotate(90) scale(59.5 3)",
                children: [e.jsx("stop", {
                    stopColor: "white"
                }), e.jsx("stop", {
                    offset: "0.945",
                    stopColor: "white",
                    stopOpacity: "0"
                })]
            }), e.jsxs("radialGradient", {
                id: "paint21_radial_451_4676",
                cx: "0",
                cy: "0",
                r: "1",
                gradientUnits: "userSpaceOnUse",
                gradientTransform: "translate(353.188 216.5) rotate(90) scale(119.5 6)",
                children: [e.jsx("stop", {
                    stopColor: "white"
                }), e.jsx("stop", {
                    offset: "0.345",
                    stopColor: "white",
                    stopOpacity: "0.3"
                }), e.jsx("stop", {
                    offset: "0.945",
                    stopColor: "white",
                    stopOpacity: "0"
                })]
            }), e.jsxs("radialGradient", {
                id: "paint22_radial_451_4676",
                cx: "0",
                cy: "0",
                r: "1",
                gradientUnits: "userSpaceOnUse",
                gradientTransform: "translate(353.188 216.5) rotate(90) scale(59.5 3)",
                children: [e.jsx("stop", {
                    stopColor: "white"
                }), e.jsx("stop", {
                    offset: "0.945",
                    stopColor: "white",
                    stopOpacity: "0"
                })]
            }), e.jsxs("radialGradient", {
                id: "paint23_radial_451_4676",
                cx: "0",
                cy: "0",
                r: "1",
                gradientUnits: "userSpaceOnUse",
                gradientTransform: "translate(194 20) rotate(90) scale(174 5.99999)",
                children: [e.jsx("stop", {
                    stopColor: "white"
                }), e.jsx("stop", {
                    offset: "0.345",
                    stopColor: "white",
                    stopOpacity: "0.3"
                }), e.jsx("stop", {
                    offset: "0.945",
                    stopColor: "white",
                    stopOpacity: "0"
                })]
            }), e.jsxs("radialGradient", {
                id: "paint24_radial_451_4676",
                cx: "0",
                cy: "0",
                r: "1",
                gradientUnits: "userSpaceOnUse",
                gradientTransform: "translate(194 34) rotate(90) scale(174 5.99999)",
                children: [e.jsx("stop", {
                    stopColor: "white"
                }), e.jsx("stop", {
                    offset: "0.345",
                    stopColor: "white",
                    stopOpacity: "0.3"
                }), e.jsx("stop", {
                    offset: "0.945",
                    stopColor: "white",
                    stopOpacity: "0"
                })]
            }), e.jsxs("linearGradient", {
                id: "paint25_linear_451_4676",
                x1: "194.375",
                y1: "346.5",
                x2: "194.375",
                y2: "458.5",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    stopColor: "#F4DA7D"
                }), e.jsx("stop", {
                    offset: "0.48",
                    stopColor: "#FFE177"
                }), e.jsx("stop", {
                    offset: "1",
                    stopColor: "#41350A"
                })]
            }), e.jsxs("linearGradient", {
                id: "paint26_linear_451_4676",
                x1: "194.375",
                y1: "458.5",
                x2: "194.375",
                y2: "346.5",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    offset: "0.085",
                    stopColor: "#FEDC66"
                }), e.jsx("stop", {
                    offset: "0.845",
                    stopColor: "#534410"
                })]
            }), e.jsxs("linearGradient", {
                id: "paint27_linear_451_4676",
                x1: "217.97",
                y1: "348.45",
                x2: "171.38",
                y2: "457.05",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    offset: "0.36",
                    stopColor: "#5C3100",
                    stopOpacity: "0"
                }), e.jsx("stop", {
                    offset: "0.5",
                    stopColor: "#442400"
                }), e.jsx("stop", {
                    offset: "0.64",
                    stopColor: "#5C3100",
                    stopOpacity: "0"
                })]
            }), e.jsxs("linearGradient", {
                id: "paint28_linear_451_4676",
                x1: "248.975",
                y1: "404.373",
                x2: "140.375",
                y2: "401.127",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    offset: "0.36",
                    stopColor: "#5C3100",
                    stopOpacity: "0"
                }), e.jsx("stop", {
                    offset: "0.5",
                    stopColor: "#442400"
                }), e.jsx("stop", {
                    offset: "0.64",
                    stopColor: "#5C3100",
                    stopOpacity: "0"
                })]
            }), e.jsxs("linearGradient", {
                id: "paint29_linear_451_4676",
                x1: "140.375",
                y1: "375.801",
                x2: "248.975",
                y2: "429.699",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    offset: "0.205",
                    stopColor: "#BC802A",
                    stopOpacity: "0"
                }), e.jsx("stop", {
                    offset: "0.43",
                    stopColor: "#BC802A"
                }), e.jsx("stop", {
                    offset: "0.55",
                    stopColor: "#BC802A"
                }), e.jsx("stop", {
                    offset: "0.785",
                    stopColor: "#BC802A",
                    stopOpacity: "0"
                })]
            }), e.jsxs("linearGradient", {
                id: "paint30_linear_451_4676",
                x1: "194.675",
                y1: "348.45",
                x2: "194.675",
                y2: "457.05",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    offset: "0.46",
                    stopColor: "white",
                    stopOpacity: "0"
                }), e.jsx("stop", {
                    offset: "0.5",
                    stopColor: "white"
                }), e.jsx("stop", {
                    offset: "0.54",
                    stopColor: "white",
                    stopOpacity: "0"
                })]
            }), e.jsxs("linearGradient", {
                id: "paint31_linear_451_4676",
                x1: "248.975",
                y1: "409.882",
                x2: "140.375",
                y2: "395.618",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    offset: "0.36",
                    stopColor: "white",
                    stopOpacity: "0"
                }), e.jsx("stop", {
                    offset: "0.5",
                    stopColor: "white"
                }), e.jsx("stop", {
                    offset: "0.54",
                    stopColor: "white",
                    stopOpacity: "0"
                })]
            }), e.jsxs("linearGradient", {
                id: "paint32_linear_451_4676",
                x1: "248.975",
                y1: "452.384",
                x2: "140.375",
                y2: "353.116",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    offset: "0.49",
                    stopColor: "white",
                    stopOpacity: "0"
                }), e.jsx("stop", {
                    offset: "0.5",
                    stopColor: "white"
                }), e.jsx("stop", {
                    offset: "0.6",
                    stopColor: "white",
                    stopOpacity: "0"
                })]
            }), e.jsxs("linearGradient", {
                id: "paint33_linear_451_4676",
                x1: "248.975",
                y1: "358.276",
                x2: "140.375",
                y2: "447.224",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    offset: "0.36",
                    stopColor: "white",
                    stopOpacity: "0"
                }), e.jsx("stop", {
                    offset: "0.5",
                    stopColor: "white"
                }), e.jsx("stop", {
                    offset: "0.64",
                    stopColor: "white",
                    stopOpacity: "0"
                })]
            }), e.jsxs("linearGradient", {
                id: "paint34_linear_451_4676",
                x1: "193.999",
                y1: "66.5",
                x2: "193.999",
                y2: "368.5",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    stopColor: "#050631"
                }), e.jsx("stop", {
                    offset: "0.1",
                    stopColor: "#0C0F63"
                }), e.jsx("stop", {
                    offset: "0.22",
                    stopColor: "#212699"
                }), e.jsx("stop", {
                    offset: "0.505",
                    stopColor: "#4348D8"
                }), e.jsx("stop", {
                    offset: "0.78",
                    stopColor: "#212699"
                }), e.jsx("stop", {
                    offset: "0.9",
                    stopColor: "#0C0F63"
                }), e.jsx("stop", {
                    offset: "1",
                    stopColor: "#050631"
                })]
            }), e.jsxs("linearGradient", {
                id: "paint35_linear_451_4676",
                x1: "193.999",
                y1: "66.5",
                x2: "193.999",
                y2: "368.5",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    stopColor: "#1D1F7E"
                }), e.jsx("stop", {
                    offset: "0.11",
                    stopColor: "#2729AD"
                }), e.jsx("stop", {
                    offset: "0.29",
                    stopColor: "#6485DA"
                }), e.jsx("stop", {
                    offset: "0.355",
                    stopColor: "white"
                }), e.jsx("stop", {
                    offset: "0.56",
                    stopColor: "#6485DA"
                }), e.jsx("stop", {
                    offset: "0.89",
                    stopColor: "#2729AD"
                }), e.jsx("stop", {
                    offset: "1",
                    stopColor: "#1D1F7E"
                })]
            }), e.jsxs("linearGradient", {
                id: "paint36_linear_451_4676",
                x1: "194.505",
                y1: "67",
                x2: "194.505",
                y2: "369",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    stopColor: "#0E1056"
                }), e.jsx("stop", {
                    offset: "0.11",
                    stopColor: "#0B0D9B"
                }), e.jsx("stop", {
                    offset: "0.29",
                    stopColor: "#436ACD"
                }), e.jsx("stop", {
                    offset: "0.355",
                    stopColor: "#BECBFF"
                }), e.jsx("stop", {
                    offset: "0.56",
                    stopColor: "#5D7CE1"
                }), e.jsx("stop", {
                    offset: "0.89",
                    stopColor: "#1C2868"
                }), e.jsx("stop", {
                    offset: "1",
                    stopColor: "#070838"
                })]
            }), e.jsxs("linearGradient", {
                id: "paint37_linear_451_4676",
                x1: "465.122",
                y1: "61",
                x2: "421.221",
                y2: "224.894",
                gradientUnits: "userSpaceOnUse",
                children: [e.jsx("stop", {
                    stopColor: "#FFDA5C"
                }), e.jsx("stop", {
                    offset: "0.04",
                    stopColor: "#4E1005"
                }), e.jsx("stop", {
                    offset: "0.23"
                }), e.jsx("stop", {
                    offset: "0.68"
                }), e.jsx("stop", {
                    offset: "0.77",
                    stopColor: "#202020"
                }), e.jsx("stop", {
                    offset: "0.82"
                }), e.jsx("stop", {
                    offset: "0.84"
                }), e.jsx("stop", {
                    offset: "0.88",
                    stopColor: "#202020"
                }), e.jsx("stop", {
                    offset: "0.94"
                })]
            }), e.jsxs("radialGradient", {
                id: "paint38_radial_451_4676",
                cx: "0",
                cy: "0",
                r: "1",
                gradientUnits: "userSpaceOnUse",
                gradientTransform: "translate(465.158 51.5) rotate(90) scale(17.5 18.1584)",
                children: [e.jsx("stop", {
                    stopColor: "#422009"
                }), e.jsx("stop", {
                    offset: "0.38",
                    stopColor: "#AE6B2E"
                }), e.jsx("stop", {
                    offset: "0.79",
                    stopColor: "#EDC15B"
                }), e.jsx("stop", {
                    offset: "1",
                    stopColor: "#422009"
                })]
            }), e.jsxs("radialGradient", {
                id: "paint39_radial_451_4676",
                cx: "0",
                cy: "0",
                r: "1",
                gradientUnits: "userSpaceOnUse",
                gradientTransform: "translate(465.158 58) rotate(89.0712) scale(8.00105 15.4364)",
                children: [e.jsx("stop", {
                    offset: "0.215",
                    stopColor: "#5A2C0C"
                }), e.jsx("stop", {
                    offset: "1",
                    stopColor: "#5A2C0C",
                    stopOpacity: "0"
                })]
            }), e.jsxs("radialGradient", {
                id: "paint40_radial_451_4676",
                cx: "0",
                cy: "0",
                r: "1",
                gradientUnits: "userSpaceOnUse",
                gradientTransform: "translate(464.964 31.4502) rotate(90) scale(21 16.8145)",
                children: [e.jsx("stop", {
                    stopColor: "white"
                }), e.jsx("stop", {
                    offset: "0.445",
                    stopColor: "#FFF2D7"
                }), e.jsx("stop", {
                    offset: "1",
                    stopColor: "#FFD579",
                    stopOpacity: "0"
                })]
            }), e.jsx("clipPath", {
                id: "clip0_451_4676",
                children: e.jsx("rect", {
                    width: "390",
                    height: "435",
                    fill: "white"
                })
            })]
        })]
    })
}
const as = {
        fetchWinAccept: () => null,
        updateReelStatus: () => null,
        win: null,
        reelStatus: "idle",
        error: null
    },
    rs = l.createContext(as),
    t3 = ({
        children: t
    }) => {
        const [s, o] = l.useState(as.reelStatus), {
            fetchWinAccept: a,
            wins: r,
            error: n
        } = gt(), i = l.useMemo(() => {
            if (!r) return null;
            const [d] = r.filter(p => p.state === "pending");
            return d
        }, [r]), c = l.useCallback(() => {
            i != null && i.id && a(i.id)
        }, [a, i == null ? void 0 : i.id]);
        return e.jsx(rs.Provider, {
            value: {
                reelStatus: s,
                updateReelStatus: o,
                win: i,
                fetchWinAccept: c,
                error: n
            },
            children: t
        })
    },
    s3 = () => {
        const t = l.useContext(rs);
        if (!t) throw new Error("maybe the application is not wrapped in useMiniGameContext Component");
        return t
    };

function l3({
    className: t,
    handleStart: s,
    disabled: o
}) {
    const {
        $t: a
    } = w();
    return e.jsx("button", {
        onClick: s,
        type: "button",
        className: x("mini-game__spin-button", t, o && "pointer-events-none grayscale filter"),
        children: a({
            id: "ZyS3lt",
            defaultMessage: [{
                type: 0,
                value: "spin"
            }]
        })
    })
}
const o3 = l.memo(({
    win: t,
    error: s,
    fetchWinAccept: o,
    reelStatus: a,
    updateReelStatus: r
}) => {
    const {
        openDialog: n,
        closeAllDialogs: i
    } = z();
    l.useEffect(() => {
        Ce.play("alert")
    }, []);
    const c = l.useCallback(async () => {
            r("spinning"), await Ce.play("wheel")
        }, []),
        d = l.useCallback(async () => {
            r("stopping"), await Ce.play("coin"), await Ce.play("congratulations"), n(e.jsx(jr, {
                handleTakeWin: async () => {
                    i(), r("idle"), await o(), Ce.stopAll()
                },
                winAmount: t.value,
                slotType: y1[t.slot]
            }), {
                closeOnEscape: !1,
                disableBackdropClose: !0
            })
        }, [t.slot, t.value]);
    return s ? e.jsx(U1, {
        error: s
    }) : e.jsx("div", {
        className: "minigame-screen",
        children: e.jsx("div", {
            className: "minigame-machine-container",
            children: e.jsxs("div", {
                className: "minigame-machine",
                children: [e.jsx("p", {
                    className: "minigame-machine--title",
                    children: "Jackpot Game"
                }), e.jsx(e3, {}), e.jsx("div", {
                    className: "minigame-machine--reels-container",
                    children: e.jsx(Xn, {
                        stopIndex: t.slot,
                        status: a,
                        onStop: d
                    })
                }), e.jsx("div", {
                    className: "absolute bottom-4.5 left-[154px] z-10 rtl:left-[163px]",
                    children: e.jsx(l3, {
                        handleStart: c,
                        disabled: a === "spinning" || a === "stopping"
                    })
                })]
            })
        })
    })
});

function a3() {
    return e.jsx(t3, {
        children: e.jsx(r3, {})
    })
}

function r3() {
    const t = s3();
    if (t.win) return e.jsx(o3, { ...t
    })
}

function n3({
    className: t,
    onClick: s
}) {
    const o = () => {
        ls.emit("TOGGLE_JACKPOTS_VISIBILITY"), s == null || s()
    };
    return e.jsx("button", {
        className: x(t, "group/fav"),
        type: "button",
        onClick: o,
        children: e.jsx("svg", {
            width: "30",
            height: "28",
            viewBox: "0 0 30 28",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: e.jsx("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M28.2 4.1H1.8C0.81 4.1 0 3.29 0 2.3C0 1.31 0.81 0.5 1.8 0.5H28.2C29.19 0.5 30 1.31 30 2.3C30 3.29 29.19 4.1 28.2 4.1ZM1.8 7.7H7.41C8.07 7.7 8.67 8.06 8.97 8.63C9.3 9.2 9.27 9.89 8.94 10.46C8.16 11.75 6.12 15.68 6.12 18.5C6.12 19.49 5.31 20.3 4.32 20.3C3.33 20.3 2.52 19.49 2.52 18.5C2.52 16.04 3.51 13.28 4.44 11.3H1.8C0.81 11.3 0 10.49 0 9.5C0 8.51 0.81 7.7 1.8 7.7ZM10.5 9.5C10.5 8.51 11.31 7.7 12.3 7.7H17.91C18.57 7.7 19.17 8.06 19.47 8.63C19.8 9.2 19.77 9.89 19.44 10.46C18.66 11.75 16.62 15.68 16.62 18.5C16.62 19.49 15.81 20.3 14.82 20.3C13.83 20.3 13.02 19.49 13.02 18.5C13.02 16.04 14.01 13.28 14.94 11.3H12.3C11.31 11.3 10.5 10.49 10.5 9.5ZM20.7 9.5C20.7 8.51 21.51 7.7 22.5 7.7H28.11C28.77 7.7 29.37 8.06 29.67 8.63C30 9.2 29.97 9.89 29.64 10.46C28.86 11.75 26.82 15.68 26.82 18.5C26.82 19.49 26.01 20.3 25.02 20.3C24.03 20.3 23.22 19.49 23.22 18.5C23.22 16.04 24.21 13.28 25.14 11.3H22.5C21.51 11.3 20.7 10.49 20.7 9.5ZM1.8 23.9H28.2C29.19 23.9 30 24.71 30 25.7C30 26.69 29.19 27.5 28.2 27.5H1.8C0.81 27.5 0 26.69 0 25.7C0 24.71 0.81 23.9 1.8 23.9Z",
                fill: "currentColor"
            })
        })
    })
}

function i3({
    gameStringId: t,
    onGameClose: s,
    className: o
}) {
    const {
        isAuth: a
    } = W(), [r, n] = l.useState(!1);
    te();
    const {
        handleBack: i,
        isPending: c
    } = S1();
    return e.jsxs("div", {
        className: x(`absolute z-10 bg-black bg-opacity-80 py-2.5 transition-transform ltr:right-0 rtl:left-0 ${r?"translate-x-0":"rtl:-translate-x-1 ltr:translate-x-1"}`, o),
        children: [e.jsx("button", {
            type: "button",
            className: "ltr:-translate-x-1 absolute top-0 z-10 h-full w-8 flex-center bg-black bg-opacity-80 ltr:left-0 rtl:right-0 rtl:translate-x-1",
            onClick: () => n(!r),
            children: e.jsx(k, {
                className: ` size-4 text-[#6D7C8D] transition-transform ${r?"ltr:rotate-180 rtl:rotate-0":"rtl:-rotate-180 ltr:rotate-0"}`,
                name: "arrowLeft"
            })
        }), e.jsxs("ul", {
            className: "flex h-full items-center px-1.5 *:flex-center *:px-3.5 *:py-2.5",
            children: [e.jsx("li", {
                children: e.jsx("button", {
                    type: "button",
                    onClick: () => {
                        s == null || s(), i()
                    },
                    children: c ? e.jsx(k, {
                        className: "animate-spin",
                        name: "reload"
                    }) : e.jsx(k, {
                        name: "home"
                    })
                })
            }), a && e.jsxs(e.Fragment, {
                children: [e.jsx("li", {
                    children: e.jsx(ts, {
                        gameStringId: t,
                        className: "text-[1.875rem]"
                    })
                }), e.jsx("li", {
                    children: e.jsx(n3, {})
                })]
            })]
        })]
    })
}
const c3 = "/assets/big-money-DkUXJ2sD.avif",
    d3 = 6014;

function De({
    handleErrorOk: t
}) {
    const {
        $t: s
    } = w();
    return e.jsx(O, {
        type: "secondary",
        className: "min-w-[6.25rem]",
        onClick: t,
        children: e.jsx("div", {
            className: "uppercase",
            children: s({
                id: "n7u7Wg",
                defaultMessage: [{
                    type: 0,
                    value: "ok"
                }]
            })
        })
    })
}

function p3() {
    var b;
    const {
        gameId: t
    } = c1({
        from: "/_auth/game/$gameId"
    }), s = te(), [o, a] = l.useState(Date.now().toString()), r = l.useRef(null), {
        openDialog: n,
        closeDialog: i
    } = z(), c = me(), {
        data: d
    } = V.usePlayer(), p = localStorage.getItem("theme") ? ? "dark", {
        data: f
    } = I.useGameRun({
        gameStringId: t,
        place: "game_list",
        lang: localStorage.getItem("locale") ? ? "en",
        deviceType: c ? "mobile" : "desktop",
        theme: "dark",
        color: p === "dark" ? "13c7bc" : "43ada8"
    }), u = I.useRedeemProviderBalance(), m = I.getGameByStringId(t), h = (b = f == null ? void 0 : f.result) == null ? void 0 : b.url, v = (m == null ? void 0 : m.isJackpotActive) ? ? !1, j = () => {
        s({
            to: "/casino",
            replace: !0,
            search: N => ({ ...N,
                modal: void 0,
                pid: void 0,
                cid: ee.wagerableGames.id
            })
        }), i()
    };

    function C() {
        m != null && m.isWalletIntegration && u.mutate({
            gameStringId: t
        }), window.history.pushState(null, "", "/casino" + window.location.search)
    }
    const y = () => {
            r.current && a(Date.now().toString())
        },
        _ = () => {
            i(), s({
                to: "/casino",
                replace: !0,
                search: !0
            })
        };
    return l.useEffect(() => {
        if (f != null && f.error) {
            const N = f.error,
                Z = new le(N.message, {
                    code: N.code,
                    game: t,
                    PID: d != null && d.id ? `${d.id} / ${d.hallId}` : null
                }),
                g = N.code === d3 ? e.jsx(Lo, {
                    logo: c3,
                    error: Z,
                    actions: e.jsx(De, {
                        handleErrorOk: j
                    })
                }) : e.jsx(tt, {
                    error: Z,
                    actions: e.jsx(De, {
                        handleErrorOk: _
                    })
                });
            n(g, {
                disableBackdropClose: !0,
                closeOnEscape: !1
            })
        }
    }, [f, h, s, t, d]), l.useEffect(() => {
        Ce.preloadAll();
        const N = se.on("SET_LOCALE", y);
        return rt.isOnline() || n(e.jsx(tt, {
            error: new Ge(nt[0]),
            actions: e.jsx(De, {
                handleErrorOk: _
            })
        }), {
            disableBackdropClose: !0
        }), () => {
            rt.subscribe(Z => {
                Z || n(e.jsx(tt, {
                    error: new Ge(nt[0]),
                    actions: e.jsx(De, {
                        handleErrorOk: _
                    })
                }))
            }), N()
        }
    }, [_, n, y]), e.jsxs(e.Fragment, {
        children: [e.jsx("div", {
            className: "game-frame fixed inset-0 z-[100] h-dvh w-screen overflow-hidden",
            children: e.jsx("div", {
                className: "relative h-full",
                children: e.jsxs("div", {
                    className: "flex h-full flex-col",
                    children: [v && e.jsx(qn, {}), c && e.jsx(i3, {
                        className: "fixed top-0 flex ltr:right-0 rtl:left-0",
                        gameStringId: t
                    }), e.jsx("div", {
                        className: "grow",
                        children: h && e.jsx("iframe", {
                            ref: r,
                            className: "size-full",
                            id: "game-frame",
                            title: "game-frame",
                            src: h,
                            allowFullScreen: t === "btm"
                        }, o)
                    }), e.jsx($n, {
                        onClose: C,
                        className: "mobile:hidden"
                    })]
                })
            })
        }), v && e.jsx(a3, {})]
    })
}
const f3 = we("/_auth/game/$gameId")({
        loader: () => Promise.all([Ye(), Z1()]),
        component: p3,
        onError: console.error
    }),
    u3 = ka.update({
        path: "/sign-in",
        getParentRoute: () => Qe
    }),
    Je = La.update({
        id: "/_auth",
        getParentRoute: () => Qe
    }),
    m3 = Ra.update({
        path: "/",
        getParentRoute: () => Qe
    }),
    h3 = Xr.update({
        path: "/fortune-wheel",
        getParentRoute: () => Je
    }),
    x3 = Tn.update({
        path: "/casino",
        getParentRoute: () => Je
    }),
    g3 = f3.update({
        path: "/game/$gameId",
        getParentRoute: () => Je
    }),
    v3 = Qe.addChildren([m3, Je.addChildren([x3, h3, g3]), u3]),
    C3 = Es({
        routeTree: v3,
        context: {
            queryClient: D
        },
        defaultPreload: !1,
        defaultPreloadStaleTime: 0,
        defaultPendingComponent: () => e.jsx(Be, {})
    });

function j3() {
    return e.jsx(_l, {
        children: e.jsx(Ms, {
            router: C3
        })
    })
}
const ns = document.getElementById("root");
if (!ns) throw new Error("Root element not found");
Ns({
    release: "0.109.0",
    dsn: "https://59319574596e8756cf3a2bc0895fd72b@errorcollect.com/22",
    tracesSampleRate: .2,
    environment: o2()
}), Fs("lobby-theme", "THECLUB2");
As(ns).render(e.jsx(l.StrictMode, {
    children: e.jsx(j3, {})
}));