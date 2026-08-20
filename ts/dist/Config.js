"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    main = {
        name: 'Typeform',
    };
    feature = {
        test: {
            "options": {
                "active": false
            }
        },
    };
    options = {
        base: "https://api.typeform.com",
        auth: {
            prefix: 'Bearer',
        },
        headers: {
            "content-type": "application/json"
        },
        entity: {
            form: {},
        }
    };
    entity = {
        "form": {
            "fields": [
                {
                    "name": "created_at",
                    "type": "`$STRING`"
                },
                {
                    "name": "fields",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "id",
                    "type": "`$STRING`"
                },
                {
                    "name": "last_updated_at",
                    "type": "`$STRING`"
                },
                {
                    "name": "links",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "published_at",
                    "type": "`$STRING`"
                },
                {
                    "name": "settings",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "theme",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "title",
                    "op": {
                        "create": {
                            "req": true,
                            "type": "`$STRING`"
                        },
                        "update": {
                            "req": true,
                            "type": "`$STRING`"
                        }
                    },
                    "type": "`$STRING`"
                },
                {
                    "name": "type",
                    "type": "`$STRING`"
                },
                {
                    "name": "workspace",
                    "type": "`$OBJECT`"
                }
            ],
            "name": "form",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "POST",
                            "orig": "/forms",
                            "parts": [
                                "forms"
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            }
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "page_size",
                                        "orig": "page_size",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "search",
                                        "orig": "search",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "workspace_id",
                                        "orig": "workspace_id",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/forms",
                            "parts": [
                                "forms"
                            ],
                            "select": {
                                "exist": [
                                    "page",
                                    "page_size",
                                    "search",
                                    "workspace_id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.items`"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "uid",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/forms/{uid}",
                            "parts": [
                                "forms",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "uid": "id"
                                }
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            }
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "uid",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/forms/{uid}",
                            "parts": [
                                "forms",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "uid": "id"
                                }
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            }
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "uid",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "PUT",
                            "orig": "/forms/{uid}",
                            "parts": [
                                "forms",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "uid": "id"
                                }
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map