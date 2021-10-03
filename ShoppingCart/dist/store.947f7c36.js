// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"items.json":[function(require,module,exports) {
module.exports = [{
  "id": 1,
  "name": "Red",
  "category": "Primary Color",
  "priceCents": 1600,
  "imageColor": "F00"
}, {
  "id": 2,
  "name": "Yellow",
  "category": "Primary Color",
  "priceCents": 2100,
  "imageColor": "FF0"
}, {
  "id": 3,
  "name": "Blue",
  "category": "Primary Color",
  "priceCents": 1200,
  "imageColor": "00F"
}, {
  "id": 4,
  "name": "Orange",
  "category": "Secondary Color",
  "priceCents": 1800,
  "imageColor": "F60"
}, {
  "id": 5,
  "name": "Green",
  "category": "Secondary Color",
  "priceCents": 1600,
  "imageColor": "0F0"
}, {
  "id": 6,
  "name": "Purple",
  "category": "Secondary Color",
  "priceCents": 2100,
  "imageColor": "60F"
}, {
  "id": 7,
  "name": "Light Gray",
  "category": "Grayscale",
  "priceCents": 1200,
  "imageColor": "AAA"
}, {
  "id": 8,
  "name": "Dark Gray",
  "category": "Grayscale",
  "priceCents": 1600,
  "imageColor": "333"
}];
},{}],"util/formatCurrency.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatCurrency;
var formatter = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'USD'
});

function formatCurrency(amount) {
  return formatter.format(amount);
}
},{}],"shoppingCart.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showShopCart = showShopCart;
exports.addToCart = addToCart;
exports.renderCart = renderCart;
exports.setupShoppingCart = setupShoppingCart;

var _items = _interopRequireDefault(require("./items.json"));

var _formatCurrency = _interopRequireDefault(require("./util/formatCurrency"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var URL = 'https://dummyimage.com/420x260/';
var shoppingCart = loadCart();
var shopButton = document.querySelector('[data-shop-button]');
var shopCart = document.querySelector('[data-shop-cart]');
var shopCartWrapper = document.querySelector('[data-shop-cart-wrapper');
var shopCartTotal = document.querySelector('[data-cart-total]');
var shopCartTotalAmount = document.querySelector('[data-cart-total-amount]');
var SESSION_STORAGE_KEY = 'SHOPPING_CART-cart';

function showShopCart() {
  shopCart.classList.remove('invisible');
}

shopButton.addEventListener('click', function () {
  shopCart.classList.toggle('invisible');
});

function addToCart(id) {
  var existingItem = shoppingCart.find(function (e) {
    return e.id === id;
  });

  if (existingItem) {
    existingItem.quantity = existingItem.quantity + 1;
  } else {
    shoppingCart.push({
      id: id,
      quantity: 1
    });
  }

  saveCart();
}

function renderCart() {
  shopCartWrapper.innerHTML = '';
  var total = 0;
  var amount = 0;
  shoppingCart.forEach(function (item) {
    var shopItem = _items.default.find(function (i) {
      return i.id === item.id;
    });

    var itemElement = document.querySelector('#cart-item-template').content.cloneNode(true);
    var itemImg = itemElement.querySelector('[data-cart-img]');
    itemImg.src = URL + shopItem.imageColor + '/' + shopItem.imageColor;
    var itemName = itemElement.querySelector('[data-cart-name]');
    itemName.innerText = shopItem.name;
    var itemPrice = itemElement.querySelector('[data-cart-price]');
    itemPrice.innerText = (0, _formatCurrency.default)(shopItem.priceCents / 100);
    var itemQuantity = itemElement.querySelector('[data-cart-quantity]');
    itemQuantity.innerText = 'x' + item.quantity;
    var itemRmBtn = itemElement.querySelector('[data-cart-rm-btn]');
    itemRmBtn.addEventListener('click', function () {
      removeFromCart(item.id);
    });
    shopCartWrapper.appendChild(itemElement);
    total += shopItem.priceCents * item.quantity;
    amount += item.quantity;
  });
  shopCartTotal.innerText = (0, _formatCurrency.default)(total / 100);
  shopCartTotalAmount.innerText = amount;
}

function removeFromCart(id) {
  var existingItem = shoppingCart.find(function (entry) {
    return entry.id === id;
  });
  if (existingItem == null) return;
  shoppingCart = shoppingCart.filter(function (entry) {
    return entry.id != id;
  });
  renderCart();
  saveCart();
}

function setupShoppingCart() {
  loadCart();
  renderCart();
}

function saveCart() {
  sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(shoppingCart));
}

function loadCart() {
  var cart = sessionStorage.getItem(SESSION_STORAGE_KEY);
  console.log(cart);
  shoppingCart = JSON.parse(cart) || [];
}
},{"./items.json":"items.json","./util/formatCurrency":"util/formatCurrency.js"}],"store.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupStore = setupStore;

var _items = _interopRequireDefault(require("./items.json"));

var _shoppingCart = require("./shoppingCart");

var _formatCurrency = _interopRequireDefault(require("./util/formatCurrency.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _shoppingCart.setupShoppingCart)();
var URL = 'https://dummyimage.com/420x260/';
var storeItemTemplate = document.querySelector('#store-item-template');
var storeItemContainer = document.querySelector('[data-store-container]');

function setupStore() {
  storeItemContainer.innerHTML = '';

  _items.default.forEach(renderStoreItem);
}

function renderStoreItem(item) {
  var storeItem = storeItemTemplate.content.cloneNode(true);
  var container = storeItem.querySelector('[data-store-item]');
  container.dataset.itemId = item.id;
  var name = storeItem.querySelector('[data-name]');
  name.innerText = item.name;
  var category = storeItem.querySelector('[data-category');
  category.innerText = item.category;
  var price = storeItem.querySelector('[data-price]');
  price.innerText = (0, _formatCurrency.default)(item.priceCents / 100);
  var img = storeItem.querySelector('[data-img]');
  img.src = URL + item.imageColor + '/' + item.imageColor;
  var btn = storeItem.querySelector('[data-add-to-cart-btn]');
  btn.addEventListener('click', function () {
    (0, _shoppingCart.addToCart)(item.id);
    (0, _shoppingCart.renderCart)();
    (0, _shoppingCart.showShopCart)();
  });
  storeItemContainer.appendChild(storeItem);
}

setupStore();
},{"./items.json":"items.json","./shoppingCart":"shoppingCart.js","./util/formatCurrency.js":"util/formatCurrency.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58539" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","store.js"], null)
//# sourceMappingURL=/store.947f7c36.js.map