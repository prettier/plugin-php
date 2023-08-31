(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('prettier/standalone')) :
	typeof define === 'function' && define.amd ? define(['exports', 'prettier/standalone'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.prettierPlugins = global.prettierPlugins || {}, global.prettierPlugins.php = {}), global.prettier));
})(this, (function (exports, prettier) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var PHP = {
	  "name": "PHP",
	  "type": "programming",
	  "tmScope": "text.html.php",
	  "aceMode": "php",
	  "codemirrorMode": "php",
	  "codemirrorMimeType": "application/x-httpd-php",
	  "color": "#4F5D95",
	  "extensions": [".php", ".aw", ".ctp", ".fcgi", ".inc", ".php3", ".php4", ".php5", ".phps", ".phpt"],
	  "filenames": [".php", ".php_cs", ".php_cs.dist", "Phakefile"],
	  "interpreters": ["php"],
	  "aliases": ["inc"],
	  "languageId": 272
	};

	var HTML_PHP = {
	  "name": "HTML+PHP",
	  "type": "markup",
	  "color": "#4f5d95",
	  "tmScope": "text.html.php",
	  "group": "HTML",
	  "extensions": [".phtml"],
	  "aceMode": "php",
	  "codemirrorMode": "php",
	  "codemirrorMimeType": "application/x-httpd-php",
	  "languageId": 151
	};

	var LINGUIST_LANGUAGES_PHP = PHP;
	var LINGUIST_LANGUAGES_HTML_PHP = HTML_PHP;

	function ownKeys(object, enumerableOnly) {
	  var keys = Object.keys(object);

	  if (Object.getOwnPropertySymbols) {
	    var symbols = Object.getOwnPropertySymbols(object);
	    enumerableOnly && (symbols = symbols.filter(function (sym) {
	      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
	    })), keys.push.apply(keys, symbols);
	  }

	  return keys;
	}

	function _objectSpread2(target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = null != arguments[i] ? arguments[i] : {};
	    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
	      _defineProperty(target, key, source[key]);
	    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
	      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
	    });
	  }

	  return target;
	}

	function _regeneratorRuntime() {
	  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */

	  _regeneratorRuntime = function () {
	    return exports;
	  };

	  var exports = {},
	      Op = Object.prototype,
	      hasOwn = Op.hasOwnProperty,
	      $Symbol = "function" == typeof Symbol ? Symbol : {},
	      iteratorSymbol = $Symbol.iterator || "@@iterator",
	      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
	      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

	  function define(obj, key, value) {
	    return Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: !0,
	      configurable: !0,
	      writable: !0
	    }), obj[key];
	  }

	  try {
	    define({}, "");
	  } catch (err) {
	    define = function (obj, key, value) {
	      return obj[key] = value;
	    };
	  }

	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
	        generator = Object.create(protoGenerator.prototype),
	        context = new Context(tryLocsList || []);
	    return generator._invoke = function (innerFn, self, context) {
	      var state = "suspendedStart";
	      return function (method, arg) {
	        if ("executing" === state) throw new Error("Generator is already running");

	        if ("completed" === state) {
	          if ("throw" === method) throw arg;
	          return doneResult();
	        }

	        for (context.method = method, context.arg = arg;;) {
	          var delegate = context.delegate;

	          if (delegate) {
	            var delegateResult = maybeInvokeDelegate(delegate, context);

	            if (delegateResult) {
	              if (delegateResult === ContinueSentinel) continue;
	              return delegateResult;
	            }
	          }

	          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
	            if ("suspendedStart" === state) throw state = "completed", context.arg;
	            context.dispatchException(context.arg);
	          } else "return" === context.method && context.abrupt("return", context.arg);
	          state = "executing";
	          var record = tryCatch(innerFn, self, context);

	          if ("normal" === record.type) {
	            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
	            return {
	              value: record.arg,
	              done: context.done
	            };
	          }

	          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
	        }
	      };
	    }(innerFn, self, context), generator;
	  }

	  function tryCatch(fn, obj, arg) {
	    try {
	      return {
	        type: "normal",
	        arg: fn.call(obj, arg)
	      };
	    } catch (err) {
	      return {
	        type: "throw",
	        arg: err
	      };
	    }
	  }

	  exports.wrap = wrap;
	  var ContinueSentinel = {};

	  function Generator() {}

	  function GeneratorFunction() {}

	  function GeneratorFunctionPrototype() {}

	  var IteratorPrototype = {};
	  define(IteratorPrototype, iteratorSymbol, function () {
	    return this;
	  });
	  var getProto = Object.getPrototypeOf,
	      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
	  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
	  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);

	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function (method) {
	      define(prototype, method, function (arg) {
	        return this._invoke(method, arg);
	      });
	    });
	  }

	  function AsyncIterator(generator, PromiseImpl) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);

	      if ("throw" !== record.type) {
	        var result = record.arg,
	            value = result.value;
	        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
	          invoke("next", value, resolve, reject);
	        }, function (err) {
	          invoke("throw", err, resolve, reject);
	        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
	          result.value = unwrapped, resolve(result);
	        }, function (error) {
	          return invoke("throw", error, resolve, reject);
	        });
	      }

	      reject(record.arg);
	    }

	    var previousPromise;

	    this._invoke = function (method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new PromiseImpl(function (resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }

	      return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
	    };
	  }

	  function maybeInvokeDelegate(delegate, context) {
	    var method = delegate.iterator[context.method];

	    if (undefined === method) {
	      if (context.delegate = null, "throw" === context.method) {
	        if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
	        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
	      }

	      return ContinueSentinel;
	    }

	    var record = tryCatch(method, delegate.iterator, context.arg);
	    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
	    var info = record.arg;
	    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
	  }

	  function pushTryEntry(locs) {
	    var entry = {
	      tryLoc: locs[0]
	    };
	    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
	  }

	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal", delete record.arg, entry.completion = record;
	  }

	  function Context(tryLocsList) {
	    this.tryEntries = [{
	      tryLoc: "root"
	    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
	  }

	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) return iteratorMethod.call(iterable);
	      if ("function" == typeof iterable.next) return iterable;

	      if (!isNaN(iterable.length)) {
	        var i = -1,
	            next = function next() {
	          for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;

	          return next.value = undefined, next.done = !0, next;
	        };

	        return next.next = next;
	      }
	    }

	    return {
	      next: doneResult
	    };
	  }

	  function doneResult() {
	    return {
	      value: undefined,
	      done: !0
	    };
	  }

	  return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
	    var ctor = "function" == typeof genFun && genFun.constructor;
	    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
	  }, exports.mark = function (genFun) {
	    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
	  }, exports.awrap = function (arg) {
	    return {
	      __await: arg
	    };
	  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
	    return this;
	  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
	    void 0 === PromiseImpl && (PromiseImpl = Promise);
	    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
	    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
	      return result.done ? result.value : iter.next();
	    });
	  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
	    return this;
	  }), define(Gp, "toString", function () {
	    return "[object Generator]";
	  }), exports.keys = function (object) {
	    var keys = [];

	    for (var key in object) keys.push(key);

	    return keys.reverse(), function next() {
	      for (; keys.length;) {
	        var key = keys.pop();
	        if (key in object) return next.value = key, next.done = !1, next;
	      }

	      return next.done = !0, next;
	    };
	  }, exports.values = values, Context.prototype = {
	    constructor: Context,
	    reset: function (skipTempReset) {
	      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
	    },
	    stop: function () {
	      this.done = !0;
	      var rootRecord = this.tryEntries[0].completion;
	      if ("throw" === rootRecord.type) throw rootRecord.arg;
	      return this.rval;
	    },
	    dispatchException: function (exception) {
	      if (this.done) throw exception;
	      var context = this;

	      function handle(loc, caught) {
	        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
	      }

	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i],
	            record = entry.completion;
	        if ("root" === entry.tryLoc) return handle("end");

	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc"),
	              hasFinally = hasOwn.call(entry, "finallyLoc");

	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
	            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
	          } else {
	            if (!hasFinally) throw new Error("try statement without catch or finally");
	            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
	          }
	        }
	      }
	    },
	    abrupt: function (type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];

	        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }

	      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
	      var record = finallyEntry ? finallyEntry.completion : {};
	      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
	    },
	    complete: function (record, afterLoc) {
	      if ("throw" === record.type) throw record.arg;
	      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
	    },
	    finish: function (finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
	      }
	    },
	    catch: function (tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];

	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;

	          if ("throw" === record.type) {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }

	          return thrown;
	        }
	      }

	      throw new Error("illegal catch attempt");
	    },
	    delegateYield: function (iterable, resultName, nextLoc) {
	      return this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
	    }
	  }, exports;
	}

	function _typeof(obj) {
	  "@babel/helpers - typeof";

	  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
	    return typeof obj;
	  } : function (obj) {
	    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	  }, _typeof(obj);
	}

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	function _slicedToArray(arr, i) {
	  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
	}

	function _toConsumableArray(arr) {
	  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
	}

	function _arrayWithoutHoles(arr) {
	  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
	}

	function _arrayWithHoles(arr) {
	  if (Array.isArray(arr)) return arr;
	}

	function _iterableToArray(iter) {
	  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
	}

	function _iterableToArrayLimit(arr, i) {
	  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

	  if (_i == null) return;
	  var _arr = [];
	  var _n = true;
	  var _d = false;

	  var _s, _e;

	  try {
	    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
	      _arr.push(_s.value);

	      if (i && _arr.length === i) break;
	    }
	  } catch (err) {
	    _d = true;
	    _e = err;
	  } finally {
	    try {
	      if (!_n && _i["return"] != null) _i["return"]();
	    } finally {
	      if (_d) throw _e;
	    }
	  }

	  return _arr;
	}

	function _unsupportedIterableToArray(o, minLen) {
	  if (!o) return;
	  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
	  var n = Object.prototype.toString.call(o).slice(8, -1);
	  if (n === "Object" && o.constructor) n = o.constructor.name;
	  if (n === "Map" || n === "Set") return Array.from(o);
	  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
	}

	function _arrayLikeToArray(arr, len) {
	  if (len == null || len > arr.length) len = arr.length;

	  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

	  return arr2;
	}

	function _nonIterableSpread() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}

	function _nonIterableRest() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}

	function _createForOfIteratorHelper(o, allowArrayLike) {
	  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

	  if (!it) {
	    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
	      if (it) o = it;
	      var i = 0;

	      var F = function () {};

	      return {
	        s: F,
	        n: function () {
	          if (i >= o.length) return {
	            done: true
	          };
	          return {
	            done: false,
	            value: o[i++]
	          };
	        },
	        e: function (e) {
	          throw e;
	        },
	        f: F
	      };
	    }

	    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	  }

	  var normalCompletion = true,
	      didErr = false,
	      err;
	  return {
	    s: function () {
	      it = it.call(o);
	    },
	    n: function () {
	      var step = it.next();
	      normalCompletion = step.done;
	      return step;
	    },
	    e: function (e) {
	      didErr = true;
	      err = e;
	    },
	    f: function () {
	      try {
	        if (!normalCompletion && it.return != null) it.return();
	      } finally {
	        if (didErr) throw err;
	      }
	    }
	  };
	}

	var src = {exports: {}};

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var attribute$1 = {
	  attributeIndex: 0,
	  attributeListDepth: {},
	  matchST_ATTRIBUTE: function matchST_ATTRIBUTE() {
	    var ch = this.input();

	    if (this.is_WHITESPACE()) {
	      do {
	        ch = this.input();
	      } while (this.is_WHITESPACE());

	      this.unput(1);
	      return null;
	    }

	    switch (ch) {
	      case "]":
	        if (this.attributeListDepth[this.attributeIndex] === 0) {
	          delete this.attributeListDepth[this.attributeIndex];
	          this.attributeIndex--;
	          this.popState();
	        } else {
	          /* istanbul ignore next */
	          this.attributeListDepth[this.attributeIndex]--;
	        }

	        return "]";

	      case "(":
	      case ")":
	      case ":":
	      case "=":
	      case "|":
	      case "&":
	      case "^":
	      case "-":
	      case "+":
	      case "*":
	      case "%":
	      case "~":
	      case "<":
	      case ">":
	      case "!":
	      case ".":
	        return this.consume_TOKEN();

	      case "[":
	        this.attributeListDepth[this.attributeIndex]++;
	        return "[";

	      case ",":
	        return ",";

	      case '"':
	        return this.ST_DOUBLE_QUOTES();

	      case "'":
	        return this.T_CONSTANT_ENCAPSED_STRING();

	      case "/":
	        if (this._input[this.offset] === "/") {
	          return this.T_COMMENT();
	        } else if (this._input[this.offset] === "*") {
	          this.input();
	          return this.T_DOC_COMMENT();
	        } else {
	          return this.consume_TOKEN();
	        }

	    }

	    if (this.is_LABEL_START() || ch === "\\") {
	      while (this.offset < this.size) {
	        var _ch = this.input();

	        if (!(this.is_LABEL() || _ch === "\\")) {
	          if (_ch) this.unput(1);
	          break;
	        }
	      }

	      return this.T_STRING();
	    } else if (this.is_NUM()) {
	      return this.consume_NUM();
	    }
	    /* istanbul ignore next */


	    throw new Error("Bad terminal sequence \"".concat(ch, "\" at line ").concat(this.yylineno, " (offset ").concat(this.offset, ")"));
	  }
	};

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var comments = {
	  /*
	   * Reads a single line comment
	   */
	  T_COMMENT: function T_COMMENT() {
	    while (this.offset < this.size) {
	      var ch = this.input();

	      if (ch === "\n" || ch === "\r") {
	        return this.tok.T_COMMENT;
	      } else if (ch === "?" && !this.aspTagMode && this._input[this.offset] === ">") {
	        this.unput(1);
	        return this.tok.T_COMMENT;
	      } else if (ch === "%" && this.aspTagMode && this._input[this.offset] === ">") {
	        this.unput(1);
	        return this.tok.T_COMMENT;
	      }
	    }

	    return this.tok.T_COMMENT;
	  },

	  /*
	   * Behaviour : https://github.com/php/php-src/blob/master/Zend/zend_language_scanner.l#L1927
	   */
	  T_DOC_COMMENT: function T_DOC_COMMENT() {
	    var ch = this.input();
	    var token = this.tok.T_COMMENT;

	    if (ch === "*") {
	      // started with '/*' , check is next is '*'
	      ch = this.input();

	      if (this.is_WHITESPACE()) {
	        // check if next is WHITESPACE
	        token = this.tok.T_DOC_COMMENT;
	      }

	      if (ch === "/") {
	        return token;
	      } else {
	        this.unput(1); // reset
	      }
	    }

	    while (this.offset < this.size) {
	      ch = this.input();

	      if (ch === "*" && this._input[this.offset] === "/") {
	        this.input();
	        break;
	      }
	    }

	    return token;
	  }
	};

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var initial = {
	  nextINITIAL: function nextINITIAL() {
	    if (this.conditionStack.length > 1 && this.conditionStack[this.conditionStack.length - 1] === "INITIAL") {
	      // Return to HEREDOC/ST_DOUBLE_QUOTES mode
	      this.popState();
	    } else {
	      this.begin("ST_IN_SCRIPTING");
	    }

	    return this;
	  },
	  matchINITIAL: function matchINITIAL() {
	    while (this.offset < this.size) {
	      var ch = this.input();

	      if (ch == "<") {
	        ch = this.ahead(1);

	        if (ch == "?") {
	          if (this.tryMatch("?=")) {
	            this.unput(1).appendToken(this.tok.T_OPEN_TAG_WITH_ECHO, 3).nextINITIAL();
	            break;
	          } else if (this.tryMatchCaseless("?php")) {
	            ch = this._input[this.offset + 4];

	            if (ch === " " || ch === "\t" || ch === "\n" || ch === "\r") {
	              this.unput(1).appendToken(this.tok.T_OPEN_TAG, 6).nextINITIAL();
	              break;
	            }
	          }

	          if (this.short_tags) {
	            this.unput(1).appendToken(this.tok.T_OPEN_TAG, 2).nextINITIAL();
	            break;
	          }
	        } else if (this.asp_tags && ch == "%") {
	          if (this.tryMatch("%=")) {
	            this.aspTagMode = true;
	            this.unput(1).appendToken(this.tok.T_OPEN_TAG_WITH_ECHO, 3).nextINITIAL();
	            break;
	          } else {
	            this.aspTagMode = true;
	            this.unput(1).appendToken(this.tok.T_OPEN_TAG, 2).nextINITIAL();
	            break;
	          }
	        }
	      }
	    }

	    if (this.yytext.length > 0) {
	      return this.tok.T_INLINE_HTML;
	    } else {
	      return false;
	    }
	  }
	};

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */
	/* istanbul ignore else  */


	var MAX_LENGTH_OF_LONG = 10;
	var long_min_digits = "2147483648";

	var numbers = {
	  consume_NUM: function consume_NUM() {
	    var ch = this.yytext[0];
	    var hasPoint = ch === ".";

	    if (ch === "0") {
	      ch = this.input(); // check if hexa

	      if (ch === "x" || ch === "X") {
	        ch = this.input();

	        if (ch !== "_" && this.is_HEX()) {
	          return this.consume_HNUM();
	        } else {
	          this.unput(ch ? 2 : 1);
	        } // check binary notation

	      } else if (ch === "b" || ch === "B") {
	        ch = this.input();

	        if (ch !== "_" && ch === "0" || ch === "1") {
	          return this.consume_BNUM();
	        } else {
	          this.unput(ch ? 2 : 1);
	        }
	      } else if (ch === "o" || ch === "O") {
	        ch = this.input();

	        if (ch !== "_" && this.is_OCTAL()) {
	          return this.consume_ONUM();
	        } else {
	          this.unput(ch ? 2 : 1);
	        }
	      } else if (!this.is_NUM()) {
	        if (ch) this.unput(1);
	      }
	    }

	    while (this.offset < this.size) {
	      var prev = ch;
	      ch = this.input();

	      if (ch === "_") {
	        if (prev === "_") {
	          // restriction : next to underscore / 1__1;
	          this.unput(2); // keep 1

	          break;
	        }

	        if (prev === ".") {
	          // next to decimal point  "1._0"
	          this.unput(1); // keep 1.

	          break;
	        }

	        if (prev === "e" || prev === "E") {
	          // next to e "1e_10"
	          this.unput(2); // keep 1

	          break;
	        }
	      } else if (ch === ".") {
	        if (hasPoint) {
	          // no multiple points "1.0.5"
	          this.unput(1); // keep 1.0

	          break;
	        }

	        if (prev === "_") {
	          // next to decimal point  "1_.0"
	          this.unput(2); // keep 1

	          break;
	        }

	        hasPoint = true;
	        continue;
	      } else if (ch === "e" || ch === "E") {
	        if (prev === "_") {
	          // next to e "1_e10"
	          this.unput(1);
	          break;
	        }

	        var undo = 2;
	        ch = this.input();

	        if (ch === "+" || ch === "-") {
	          // 1e-5
	          undo = 3;
	          ch = this.input();
	        }

	        if (this.is_NUM_START()) {
	          this.consume_LNUM();
	          return this.tok.T_DNUMBER;
	        }

	        this.unput(ch ? undo : undo - 1); // keep only 1

	        break;
	      }

	      if (!this.is_NUM()) {
	        // example : 10.0a
	        if (ch) this.unput(1); // keep 10.0

	        break;
	      }
	    }

	    if (hasPoint) {
	      return this.tok.T_DNUMBER;
	    } else if (this.yytext.length < MAX_LENGTH_OF_LONG - 1) {
	      return this.tok.T_LNUMBER;
	    } else {
	      if (this.yytext.length < MAX_LENGTH_OF_LONG || this.yytext.length == MAX_LENGTH_OF_LONG && this.yytext < long_min_digits) {
	        return this.tok.T_LNUMBER;
	      }

	      return this.tok.T_DNUMBER;
	    }
	  },
	  // read hexa
	  consume_HNUM: function consume_HNUM() {
	    while (this.offset < this.size) {
	      var ch = this.input();

	      if (!this.is_HEX()) {
	        if (ch) this.unput(1);
	        break;
	      }
	    }

	    return this.tok.T_LNUMBER;
	  },
	  // read a generic number
	  consume_LNUM: function consume_LNUM() {
	    while (this.offset < this.size) {
	      var ch = this.input();

	      if (!this.is_NUM()) {
	        if (ch) this.unput(1);
	        break;
	      }
	    }

	    return this.tok.T_LNUMBER;
	  },
	  // read binary
	  consume_BNUM: function consume_BNUM() {
	    var ch;

	    while (this.offset < this.size) {
	      ch = this.input();

	      if (ch !== "0" && ch !== "1" && ch !== "_") {
	        if (ch) this.unput(1);
	        break;
	      }
	    }

	    return this.tok.T_LNUMBER;
	  },
	  // read an octal number
	  consume_ONUM: function consume_ONUM() {
	    while (this.offset < this.size) {
	      var ch = this.input();

	      if (!this.is_OCTAL()) {
	        if (ch) this.unput(1);
	        break;
	      }
	    }

	    return this.tok.T_LNUMBER;
	  }
	};

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var property$1 = {
	  matchST_LOOKING_FOR_PROPERTY: function matchST_LOOKING_FOR_PROPERTY() {
	    var ch = this.input();

	    if (ch === "-") {
	      ch = this.input();

	      if (ch === ">") {
	        // https://github.com/php/php-src/blob/master/Zend/zend_language_scanner.l#L1296
	        return this.tok.T_OBJECT_OPERATOR;
	      }

	      if (ch) this.unput(1);
	    } else if (this.is_WHITESPACE()) {
	      return this.tok.T_WHITESPACE;
	    } else if (this.is_LABEL_START()) {
	      // https://github.com/php/php-src/blob/master/Zend/zend_language_scanner.l#L1300
	      this.consume_LABEL();
	      this.popState();
	      return this.tok.T_STRING;
	    } // https://github.com/php/php-src/blob/master/Zend/zend_language_scanner.l#L1306


	    this.popState();
	    if (ch) this.unput(1);
	    return false;
	  },
	  matchST_LOOKING_FOR_VARNAME: function matchST_LOOKING_FOR_VARNAME() {
	    var ch = this.input(); // SHIFT STATE

	    this.popState();
	    this.begin("ST_IN_SCRIPTING");

	    if (this.is_LABEL_START()) {
	      this.consume_LABEL();
	      ch = this.input();

	      if (ch === "[" || ch === "}") {
	        this.unput(1);
	        return this.tok.T_STRING_VARNAME;
	      } else {
	        // any char (that's started with a label sequence)
	        this.unput(this.yytext.length);
	      }
	    } else {
	      // any char (thats not a label start sequence)
	      if (ch) this.unput(1);
	    } // stops looking for a varname and starts the scripting mode


	    return false;
	  },
	  matchST_VAR_OFFSET: function matchST_VAR_OFFSET() {
	    var ch = this.input();

	    if (this.is_NUM_START()) {
	      this.consume_NUM();
	      return this.tok.T_NUM_STRING;
	    } else if (ch === "]") {
	      this.popState();
	      return "]";
	    } else if (ch === "$") {
	      this.input();

	      if (this.is_LABEL_START()) {
	        this.consume_LABEL();
	        return this.tok.T_VARIABLE;
	      } else {
	        /* istanbul ignore next */
	        throw new Error("Unexpected terminal");
	      }
	    } else if (this.is_LABEL_START()) {
	      this.consume_LABEL();
	      return this.tok.T_STRING;
	    } else if (this.is_WHITESPACE() || ch === "\\" || ch === "'" || ch === "#") {
	      return this.tok.T_ENCAPSED_AND_WHITESPACE;
	    } else if (ch === "[" || ch === "{" || ch === "}" || ch === '"' || ch === "`" || this.is_TOKEN()) {
	      return ch;
	    } else {
	      /* istanbul ignore next */
	      throw new Error("Unexpected terminal");
	    }
	  }
	};

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var scripting = {
	  matchST_IN_SCRIPTING: function matchST_IN_SCRIPTING() {
	    var ch = this.input();

	    switch (ch) {
	      case " ":
	      case "\t":
	      case "\n":
	      case "\r":
	      case "\r\n":
	        return this.T_WHITESPACE();

	      case "#":
	        if (this.version >= 800 && this._input[this.offset] === "[") {
	          this.input();
	          this.attributeListDepth[++this.attributeIndex] = 0;
	          this.begin("ST_ATTRIBUTE");
	          return this.tok.T_ATTRIBUTE;
	        }

	        return this.T_COMMENT();

	      case "/":
	        if (this._input[this.offset] === "/") {
	          return this.T_COMMENT();
	        } else if (this._input[this.offset] === "*") {
	          this.input();
	          return this.T_DOC_COMMENT();
	        }

	        return this.consume_TOKEN();

	      case "'":
	        return this.T_CONSTANT_ENCAPSED_STRING();

	      case '"':
	        return this.ST_DOUBLE_QUOTES();

	      case "`":
	        this.begin("ST_BACKQUOTE");
	        return "`";

	      case "?":
	        if (!this.aspTagMode && this.tryMatch(">")) {
	          this.input();
	          var nextCH = this._input[this.offset];
	          if (nextCH === "\n" || nextCH === "\r") this.input();

	          if (this.conditionStack.length > 1) {
	            this.begin("INITIAL");
	          }

	          return this.tok.T_CLOSE_TAG;
	        }

	        return this.consume_TOKEN();

	      case "%":
	        if (this.aspTagMode && this._input[this.offset] === ">") {
	          this.input(); // consume the '>'

	          ch = this._input[this.offset]; // read next

	          if (ch === "\n" || ch === "\r") {
	            this.input(); // consume the newline
	          }

	          this.aspTagMode = false;

	          if (this.conditionStack.length > 1) {
	            this.begin("INITIAL");
	          }

	          return this.tok.T_CLOSE_TAG;
	        }

	        return this.consume_TOKEN();

	      case "{":
	        this.begin("ST_IN_SCRIPTING");
	        return "{";

	      case "}":
	        if (this.conditionStack.length > 2) {
	          // Return to HEREDOC/ST_DOUBLE_QUOTES mode
	          this.popState();
	        }

	        return "}";

	      default:
	        if (ch === ".") {
	          ch = this.input();

	          if (this.is_NUM_START()) {
	            return this.consume_NUM();
	          } else {
	            if (ch) this.unput(1);
	          }
	        }

	        if (this.is_NUM_START()) {
	          return this.consume_NUM();
	        } else if (this.is_LABEL_START()) {
	          return this.consume_LABEL().T_STRING();
	        } else if (this.is_TOKEN()) {
	          return this.consume_TOKEN();
	        }

	    }

	    throw new Error('Bad terminal sequence "' + ch + '" at line ' + this.yylineno + " (offset " + this.offset + ")");
	  },
	  T_WHITESPACE: function T_WHITESPACE() {
	    while (this.offset < this.size) {
	      var ch = this.input();

	      if (ch === " " || ch === "\t" || ch === "\n" || ch === "\r") {
	        continue;
	      }

	      if (ch) this.unput(1);
	      break;
	    }

	    return this.tok.T_WHITESPACE;
	  }
	};

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var newline = ["\n", "\r"];
	var valid_after_heredoc = ["\n", "\r", ";"];
	var valid_after_heredoc_73 = valid_after_heredoc.concat(["\t", " ", ",", "]", ")", "/", "=", "!"]);
	var strings = {
	  T_CONSTANT_ENCAPSED_STRING: function T_CONSTANT_ENCAPSED_STRING() {
	    var ch;

	    while (this.offset < this.size) {
	      ch = this.input();

	      if (ch == "\\") {
	        this.input();
	      } else if (ch == "'") {
	        break;
	      }
	    }

	    return this.tok.T_CONSTANT_ENCAPSED_STRING;
	  },
	  // check if matching a HEREDOC state
	  is_HEREDOC: function is_HEREDOC() {
	    var revert = this.offset;

	    if (this._input[this.offset - 1] === "<" && this._input[this.offset] === "<" && this._input[this.offset + 1] === "<") {
	      this.offset += 3; // optional tabs / spaces

	      if (this.is_TABSPACE()) {
	        while (this.offset < this.size) {
	          this.offset++;

	          if (!this.is_TABSPACE()) {
	            break;
	          }
	        }
	      } // optional quotes


	      var tChar = this._input[this.offset - 1];

	      if (tChar === "'" || tChar === '"') {
	        this.offset++;
	      } else {
	        tChar = null;
	      } // required label


	      if (this.is_LABEL_START()) {
	        var yyoffset = this.offset - 1;

	        while (this.offset < this.size) {
	          this.offset++;

	          if (!this.is_LABEL()) {
	            break;
	          }
	        }

	        var yylabel = this._input.substring(yyoffset, this.offset - 1);

	        if (!tChar || tChar === this._input[this.offset - 1]) {
	          // required ending quote
	          if (tChar) this.offset++; // require newline

	          if (newline.includes(this._input[this.offset - 1])) {
	            // go go go
	            this.heredoc_label.label = yylabel;
	            this.heredoc_label.length = yylabel.length;
	            this.heredoc_label.finished = false;
	            yyoffset = this.offset - revert;
	            this.offset = revert;
	            this.consume(yyoffset);

	            if (tChar === "'") {
	              this.begin("ST_NOWDOC");
	            } else {
	              this.begin("ST_HEREDOC");
	            } // prematch to get the indentation information from end of doc


	            this.prematch_ENDOFDOC();
	            return this.tok.T_START_HEREDOC;
	          }
	        }
	      }
	    }

	    this.offset = revert;
	    return false;
	  },
	  ST_DOUBLE_QUOTES: function ST_DOUBLE_QUOTES() {
	    var ch;

	    while (this.offset < this.size) {
	      ch = this.input();

	      if (ch == "\\") {
	        this.input();
	      } else if (ch == '"') {
	        break;
	      } else if (ch == "$") {
	        ch = this.input();

	        if (ch == "{" || this.is_LABEL_START()) {
	          this.unput(2);
	          break;
	        }

	        if (ch) this.unput(1);
	      } else if (ch == "{") {
	        ch = this.input();

	        if (ch == "$") {
	          this.unput(2);
	          break;
	        }

	        if (ch) this.unput(1);
	      }
	    }

	    if (ch == '"') {
	      return this.tok.T_CONSTANT_ENCAPSED_STRING;
	    } else {
	      var prefix = 1;

	      if (this.yytext[0] === "b" || this.yytext[0] === "B") {
	        prefix = 2;
	      }

	      if (this.yytext.length > 2) {
	        this.appendToken(this.tok.T_ENCAPSED_AND_WHITESPACE, this.yytext.length - prefix);
	      }

	      this.unput(this.yytext.length - prefix);
	      this.begin("ST_DOUBLE_QUOTES");
	      return this.yytext;
	    }
	  },
	  // check if its a DOC end sequence
	  isDOC_MATCH: function isDOC_MATCH(offset, consumeLeadingSpaces) {
	    // @fixme : check if out of text limits
	    // consumeLeadingSpaces is false happen DOC prematch END HEREDOC stage.
	    // Ensure current state is really after a new line break, not after a such as ${variables}
	    var prev_ch = this._input[offset - 2];

	    if (!newline.includes(prev_ch)) {
	      return false;
	    } // skip leading spaces or tabs


	    var indentation_uses_spaces = false;
	    var indentation_uses_tabs = false; // reset heredoc_label structure

	    var indentation = 0;
	    var leading_ch = this._input[offset - 1];

	    if (this.version >= 703) {
	      while (leading_ch === "\t" || leading_ch === " ") {
	        if (leading_ch === " ") {
	          indentation_uses_spaces = true;
	        } else if (leading_ch === "\t") {
	          indentation_uses_tabs = true;
	        }

	        leading_ch = this._input[offset + indentation];
	        indentation++;
	      } // Move offset to skip leading whitespace


	      offset = offset + indentation; // return out if there was only whitespace on this line

	      if (newline.includes(this._input[offset - 1])) {
	        return false;
	      }
	    }

	    if (this._input.substring(offset - 1, offset - 1 + this.heredoc_label.length) === this.heredoc_label.label) {
	      var ch = this._input[offset - 1 + this.heredoc_label.length];

	      if ((this.version >= 703 ? valid_after_heredoc_73 : valid_after_heredoc).includes(ch)) {
	        if (consumeLeadingSpaces) {
	          this.consume(indentation); // https://wiki.php.net/rfc/flexible_heredoc_nowdoc_syntaxes

	          if (indentation_uses_spaces && indentation_uses_tabs) {
	            throw new Error("Parse error:  mixing spaces and tabs in ending marker at line " + this.yylineno + " (offset " + this.offset + ")");
	          }
	        } else {
	          // Called in prematch_ENDOFDOC
	          this.heredoc_label.indentation = indentation;
	          this.heredoc_label.indentation_uses_spaces = indentation_uses_spaces;
	          this.heredoc_label.first_encaps_node = true;
	        }

	        return true;
	      }
	    }

	    return false;
	  },

	  /*
	   * Prematch the end of HEREDOC/NOWDOC end tag to preset the
	   * context of this.heredoc_label
	   */
	  prematch_ENDOFDOC: function prematch_ENDOFDOC() {
	    // reset heredoc
	    this.heredoc_label.indentation_uses_spaces = false;
	    this.heredoc_label.indentation = 0;
	    this.heredoc_label.first_encaps_node = true;
	    var offset = this.offset + 1;

	    while (offset < this._input.length) {
	      // if match heredoc_label structrue will be set
	      if (this.isDOC_MATCH(offset, false)) {
	        return;
	      }

	      if (!newline.includes(this._input[offset - 1])) {
	        // skip one line
	        while (!newline.includes(this._input[offset++]) && offset < this._input.length) {// skip
	        }
	      }

	      offset++;
	    }
	  },
	  matchST_NOWDOC: function matchST_NOWDOC() {
	    // edge case : empty now doc
	    if (this.isDOC_MATCH(this.offset, true)) {
	      // @fixme : never reached (may be caused by quotes)
	      this.consume(this.heredoc_label.length);
	      this.popState();
	      return this.tok.T_END_HEREDOC;
	    } // SCANNING CONTENTS


	    var ch = this._input[this.offset - 1];

	    while (this.offset < this.size) {
	      if (newline.includes(ch)) {
	        ch = this.input();

	        if (this.isDOC_MATCH(this.offset, true)) {
	          this.unput(1).popState();
	          this.appendToken(this.tok.T_END_HEREDOC, this.heredoc_label.length);
	          return this.tok.T_ENCAPSED_AND_WHITESPACE;
	        }
	      } else {
	        ch = this.input();
	      }
	    } // too bad ! reached end of document (will get a parse error)


	    return this.tok.T_ENCAPSED_AND_WHITESPACE;
	  },
	  matchST_HEREDOC: function matchST_HEREDOC() {
	    // edge case : empty here doc
	    var ch = this.input();

	    if (this.isDOC_MATCH(this.offset, true)) {
	      this.consume(this.heredoc_label.length - 1);
	      this.popState();
	      return this.tok.T_END_HEREDOC;
	    } // SCANNING CONTENTS


	    while (this.offset < this.size) {
	      if (ch === "\\") {
	        ch = this.input(); // ignore next

	        if (!newline.includes(ch)) {
	          ch = this.input();
	        }
	      }

	      if (newline.includes(ch)) {
	        ch = this.input();

	        if (this.isDOC_MATCH(this.offset, true)) {
	          this.unput(1).popState();
	          this.appendToken(this.tok.T_END_HEREDOC, this.heredoc_label.length);
	          return this.tok.T_ENCAPSED_AND_WHITESPACE;
	        }
	      } else if (ch === "$") {
	        ch = this.input();

	        if (ch === "{") {
	          // start of ${
	          this.begin("ST_LOOKING_FOR_VARNAME");

	          if (this.yytext.length > 2) {
	            this.appendToken(this.tok.T_DOLLAR_OPEN_CURLY_BRACES, 2);
	            this.unput(2);
	            return this.tok.T_ENCAPSED_AND_WHITESPACE;
	          } else {
	            return this.tok.T_DOLLAR_OPEN_CURLY_BRACES;
	          }
	        } else if (this.is_LABEL_START()) {
	          // start of $var...
	          var yyoffset = this.offset;
	          var next = this.consume_VARIABLE();

	          if (this.yytext.length > this.offset - yyoffset + 2) {
	            this.appendToken(next, this.offset - yyoffset + 2);
	            this.unput(this.offset - yyoffset + 2);
	            return this.tok.T_ENCAPSED_AND_WHITESPACE;
	          } else {
	            return next;
	          } //console.log(this.yytext);

	        }
	      } else if (ch === "{") {
	        ch = this.input();

	        if (ch === "$") {
	          // start of {$...
	          this.begin("ST_IN_SCRIPTING");

	          if (this.yytext.length > 2) {
	            this.appendToken(this.tok.T_CURLY_OPEN, 1);
	            this.unput(2);
	            return this.tok.T_ENCAPSED_AND_WHITESPACE;
	          } else {
	            this.unput(1);
	            return this.tok.T_CURLY_OPEN;
	          }
	        }
	      } else {
	        ch = this.input();
	      }
	    } // too bad ! reached end of document (will get a parse error)


	    return this.tok.T_ENCAPSED_AND_WHITESPACE;
	  },
	  consume_VARIABLE: function consume_VARIABLE() {
	    this.consume_LABEL();
	    var ch = this.input();

	    if (ch == "[") {
	      this.unput(1);
	      this.begin("ST_VAR_OFFSET");
	      return this.tok.T_VARIABLE;
	    } else if (ch === "-") {
	      if (this.input() === ">") {
	        this.input();

	        if (this.is_LABEL_START()) {
	          this.begin("ST_LOOKING_FOR_PROPERTY");
	        }

	        this.unput(3);
	        return this.tok.T_VARIABLE;
	      } else {
	        this.unput(2);
	      }
	    } else {
	      if (ch) this.unput(1);
	    }

	    return this.tok.T_VARIABLE;
	  },
	  // HANDLES BACKQUOTES
	  matchST_BACKQUOTE: function matchST_BACKQUOTE() {
	    var ch = this.input();

	    if (ch === "$") {
	      ch = this.input();

	      if (ch === "{") {
	        this.begin("ST_LOOKING_FOR_VARNAME");
	        return this.tok.T_DOLLAR_OPEN_CURLY_BRACES;
	      } else if (this.is_LABEL_START()) {
	        var tok = this.consume_VARIABLE();
	        return tok;
	      }
	    } else if (ch === "{") {
	      if (this._input[this.offset] === "$") {
	        this.begin("ST_IN_SCRIPTING");
	        return this.tok.T_CURLY_OPEN;
	      }
	    } else if (ch === "`") {
	      this.popState();
	      return "`";
	    } // any char


	    while (this.offset < this.size) {
	      if (ch === "\\") {
	        this.input();
	      } else if (ch === "`") {
	        this.unput(1);
	        this.popState();
	        this.appendToken("`", 1);
	        break;
	      } else if (ch === "$") {
	        ch = this.input();

	        if (ch === "{") {
	          this.begin("ST_LOOKING_FOR_VARNAME");

	          if (this.yytext.length > 2) {
	            this.appendToken(this.tok.T_DOLLAR_OPEN_CURLY_BRACES, 2);
	            this.unput(2);
	            return this.tok.T_ENCAPSED_AND_WHITESPACE;
	          } else {
	            return this.tok.T_DOLLAR_OPEN_CURLY_BRACES;
	          }
	        } else if (this.is_LABEL_START()) {
	          // start of $var...
	          var yyoffset = this.offset;
	          var next = this.consume_VARIABLE();

	          if (this.yytext.length > this.offset - yyoffset + 2) {
	            this.appendToken(next, this.offset - yyoffset + 2);
	            this.unput(this.offset - yyoffset + 2);
	            return this.tok.T_ENCAPSED_AND_WHITESPACE;
	          } else {
	            return next;
	          }
	        }

	        continue;
	      } else if (ch === "{") {
	        ch = this.input();

	        if (ch === "$") {
	          // start of {$...
	          this.begin("ST_IN_SCRIPTING");

	          if (this.yytext.length > 2) {
	            this.appendToken(this.tok.T_CURLY_OPEN, 1);
	            this.unput(2);
	            return this.tok.T_ENCAPSED_AND_WHITESPACE;
	          } else {
	            this.unput(1);
	            return this.tok.T_CURLY_OPEN;
	          }
	        }

	        continue;
	      }

	      ch = this.input();
	    }

	    return this.tok.T_ENCAPSED_AND_WHITESPACE;
	  },
	  matchST_DOUBLE_QUOTES: function matchST_DOUBLE_QUOTES() {
	    var ch = this.input();

	    if (ch === "$") {
	      ch = this.input();

	      if (ch === "{") {
	        this.begin("ST_LOOKING_FOR_VARNAME");
	        return this.tok.T_DOLLAR_OPEN_CURLY_BRACES;
	      } else if (this.is_LABEL_START()) {
	        var tok = this.consume_VARIABLE();
	        return tok;
	      }
	    } else if (ch === "{") {
	      if (this._input[this.offset] === "$") {
	        this.begin("ST_IN_SCRIPTING");
	        return this.tok.T_CURLY_OPEN;
	      }
	    } else if (ch === '"') {
	      this.popState();
	      return '"';
	    } // any char


	    while (this.offset < this.size) {
	      if (ch === "\\") {
	        this.input();
	      } else if (ch === '"') {
	        this.unput(1);
	        this.popState();
	        this.appendToken('"', 1);
	        break;
	      } else if (ch === "$") {
	        ch = this.input();

	        if (ch === "{") {
	          this.begin("ST_LOOKING_FOR_VARNAME");

	          if (this.yytext.length > 2) {
	            this.appendToken(this.tok.T_DOLLAR_OPEN_CURLY_BRACES, 2);
	            this.unput(2);
	            return this.tok.T_ENCAPSED_AND_WHITESPACE;
	          } else {
	            return this.tok.T_DOLLAR_OPEN_CURLY_BRACES;
	          }
	        } else if (this.is_LABEL_START()) {
	          // start of $var...
	          var yyoffset = this.offset;
	          var next = this.consume_VARIABLE();

	          if (this.yytext.length > this.offset - yyoffset + 2) {
	            this.appendToken(next, this.offset - yyoffset + 2);
	            this.unput(this.offset - yyoffset + 2);
	            return this.tok.T_ENCAPSED_AND_WHITESPACE;
	          } else {
	            return next;
	          }
	        }

	        if (ch) this.unput(1);
	      } else if (ch === "{") {
	        ch = this.input();

	        if (ch === "$") {
	          // start of {$...
	          this.begin("ST_IN_SCRIPTING");

	          if (this.yytext.length > 2) {
	            this.appendToken(this.tok.T_CURLY_OPEN, 1);
	            this.unput(2);
	            return this.tok.T_ENCAPSED_AND_WHITESPACE;
	          } else {
	            // @fixme : yytext = '"{$' (this.yytext.length > 3)
	            this.unput(1);
	            return this.tok.T_CURLY_OPEN;
	          }
	        }

	        if (ch) this.unput(1);
	      }

	      ch = this.input();
	    }

	    return this.tok.T_ENCAPSED_AND_WHITESPACE;
	  }
	};

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var tokens$3 = {
	  T_STRING: function T_STRING() {
	    var token = this.yytext.toLowerCase();
	    var id = this.keywords[token];

	    if (typeof id !== "number") {
	      if (token === "yield") {
	        if (this.version >= 700 && this.tryMatch(" from")) {
	          this.consume(5);
	          id = this.tok.T_YIELD_FROM;
	        } else {
	          id = this.tok.T_YIELD;
	        }
	      } else {
	        id = this.tok.T_STRING;

	        if (token === "b" || token === "B") {
	          var ch = this.input();

	          if (ch === '"') {
	            return this.ST_DOUBLE_QUOTES();
	          } else if (ch === "'") {
	            return this.T_CONSTANT_ENCAPSED_STRING();
	          } else if (ch) {
	            this.unput(1);
	          }
	        }
	      }
	    } // https://github.com/php/php-src/blob/master/Zend/zend_language_scanner.l#L1546


	    if (id === this.tok.T_ENUM) {
	      if (this.version < 801) {
	        return this.tok.T_STRING;
	      }

	      var initial = this.offset;

	      var _ch = this.input();

	      while (_ch == " ") {
	        _ch = this.input();
	      }

	      var isEnum = false;

	      if (this.is_LABEL_START()) {
	        while (this.is_LABEL()) {
	          _ch += this.input();
	        }

	        var label = _ch.slice(0, -1).toLowerCase();

	        isEnum = label !== "extends" && label !== "implements";
	      }

	      this.unput(this.offset - initial);
	      return isEnum ? this.tok.T_ENUM : this.tok.T_STRING;
	    }

	    if (this.offset < this.size && id !== this.tok.T_YIELD_FROM) {
	      // If immediately followed by a backslash, this is a T_NAME_RELATIVE or T_NAME_QUALIFIED.
	      var _ch2 = this.input();

	      if (_ch2 === "\\") {
	        id = token === "namespace" ? this.tok.T_NAME_RELATIVE : this.tok.T_NAME_QUALIFIED;

	        do {
	          if (this._input[this.offset] === "{") {
	            // e.g. when using group use statements, the last '\\' is followed by a '{'
	            this.input();
	            break;
	          }

	          this.consume_LABEL();
	          _ch2 = this.input();
	        } while (_ch2 === "\\");
	      }

	      if (_ch2) {
	        this.unput(1);
	      }
	    }

	    return id;
	  },
	  // reads a custom token
	  consume_TOKEN: function consume_TOKEN() {
	    var ch = this._input[this.offset - 1];
	    var fn = this.tokenTerminals[ch];

	    if (fn) {
	      return fn.apply(this, []);
	    } else {
	      return this.yytext;
	    }
	  },
	  // list of special char tokens
	  tokenTerminals: {
	    $: function $() {
	      this.offset++;

	      if (this.is_LABEL_START()) {
	        this.offset--;
	        this.consume_LABEL();
	        return this.tok.T_VARIABLE;
	      } else {
	        this.offset--;
	        return "$";
	      }
	    },
	    "-": function _() {
	      var nchar = this._input[this.offset];

	      if (nchar === ">") {
	        this.begin("ST_LOOKING_FOR_PROPERTY").input();
	        return this.tok.T_OBJECT_OPERATOR;
	      } else if (nchar === "-") {
	        this.input();
	        return this.tok.T_DEC;
	      } else if (nchar === "=") {
	        this.input();
	        return this.tok.T_MINUS_EQUAL;
	      }

	      return "-";
	    },
	    "\\": function _() {
	      if (this.offset < this.size) {
	        this.input();

	        if (this.is_LABEL_START()) {
	          var ch;

	          do {
	            if (this._input[this.offset] === "{") {
	              // e.g. when using group use statements, the last '\\' is followed by a '{'
	              this.input();
	              break;
	            }

	            this.consume_LABEL();
	            ch = this.input();
	          } while (ch === "\\");

	          this.unput(1);
	          return this.tok.T_NAME_FULLY_QUALIFIED;
	        } else {
	          this.unput(1);
	        }
	      }

	      return this.tok.T_NS_SEPARATOR;
	    },
	    "/": function _() {
	      if (this._input[this.offset] === "=") {
	        this.input();
	        return this.tok.T_DIV_EQUAL;
	      }

	      return "/";
	    },
	    ":": function _() {
	      if (this._input[this.offset] === ":") {
	        this.input();
	        return this.tok.T_DOUBLE_COLON;
	      } else {
	        return ":";
	      }
	    },
	    "(": function _() {
	      var initial = this.offset;
	      this.input();

	      if (this.is_TABSPACE()) {
	        this.consume_TABSPACE().input();
	      }

	      if (this.is_LABEL_START()) {
	        var yylen = this.yytext.length;
	        this.consume_LABEL();
	        var castToken = this.yytext.substring(yylen - 1).toLowerCase();
	        var castId = this.castKeywords[castToken];

	        if (typeof castId === "number") {
	          this.input();

	          if (this.is_TABSPACE()) {
	            this.consume_TABSPACE().input();
	          }

	          if (this._input[this.offset - 1] === ")") {
	            return castId;
	          }
	        }
	      } // revert the check


	      this.unput(this.offset - initial);
	      return "(";
	    },
	    "=": function _() {
	      var nchar = this._input[this.offset];

	      if (nchar === ">") {
	        this.input();
	        return this.tok.T_DOUBLE_ARROW;
	      } else if (nchar === "=") {
	        if (this._input[this.offset + 1] === "=") {
	          this.consume(2);
	          return this.tok.T_IS_IDENTICAL;
	        } else {
	          this.input();
	          return this.tok.T_IS_EQUAL;
	        }
	      }

	      return "=";
	    },
	    "+": function _() {
	      var nchar = this._input[this.offset];

	      if (nchar === "+") {
	        this.input();
	        return this.tok.T_INC;
	      } else if (nchar === "=") {
	        this.input();
	        return this.tok.T_PLUS_EQUAL;
	      }

	      return "+";
	    },
	    "!": function _() {
	      if (this._input[this.offset] === "=") {
	        if (this._input[this.offset + 1] === "=") {
	          this.consume(2);
	          return this.tok.T_IS_NOT_IDENTICAL;
	        } else {
	          this.input();
	          return this.tok.T_IS_NOT_EQUAL;
	        }
	      }

	      return "!";
	    },
	    "?": function _() {
	      if (this.version >= 700 && this._input[this.offset] === "?") {
	        if (this.version >= 704 && this._input[this.offset + 1] === "=") {
	          this.consume(2);
	          return this.tok.T_COALESCE_EQUAL;
	        } else {
	          this.input();
	          return this.tok.T_COALESCE;
	        }
	      }

	      if (this.version >= 800 && this._input[this.offset] === "-" && this._input[this.offset + 1] === ">") {
	        this.consume(2);
	        return this.tok.T_NULLSAFE_OBJECT_OPERATOR;
	      }

	      return "?";
	    },
	    "<": function _() {
	      var nchar = this._input[this.offset];

	      if (nchar === "<") {
	        nchar = this._input[this.offset + 1];

	        if (nchar === "=") {
	          this.consume(2);
	          return this.tok.T_SL_EQUAL;
	        } else if (nchar === "<") {
	          if (this.is_HEREDOC()) {
	            return this.tok.T_START_HEREDOC;
	          }
	        }

	        this.input();
	        return this.tok.T_SL;
	      } else if (nchar === "=") {
	        this.input();

	        if (this.version >= 700 && this._input[this.offset] === ">") {
	          this.input();
	          return this.tok.T_SPACESHIP;
	        } else {
	          return this.tok.T_IS_SMALLER_OR_EQUAL;
	        }
	      } else if (nchar === ">") {
	        this.input();
	        return this.tok.T_IS_NOT_EQUAL;
	      }

	      return "<";
	    },
	    ">": function _() {
	      var nchar = this._input[this.offset];

	      if (nchar === "=") {
	        this.input();
	        return this.tok.T_IS_GREATER_OR_EQUAL;
	      } else if (nchar === ">") {
	        nchar = this._input[this.offset + 1];

	        if (nchar === "=") {
	          this.consume(2);
	          return this.tok.T_SR_EQUAL;
	        } else {
	          this.input();
	          return this.tok.T_SR;
	        }
	      }

	      return ">";
	    },
	    "*": function _() {
	      var nchar = this._input[this.offset];

	      if (nchar === "=") {
	        this.input();
	        return this.tok.T_MUL_EQUAL;
	      } else if (nchar === "*") {
	        this.input();

	        if (this._input[this.offset] === "=") {
	          this.input();
	          return this.tok.T_POW_EQUAL;
	        } else {
	          return this.tok.T_POW;
	        }
	      }

	      return "*";
	    },
	    ".": function _() {
	      var nchar = this._input[this.offset];

	      if (nchar === "=") {
	        this.input();
	        return this.tok.T_CONCAT_EQUAL;
	      } else if (nchar === "." && this._input[this.offset + 1] === ".") {
	        this.consume(2);
	        return this.tok.T_ELLIPSIS;
	      }

	      return ".";
	    },
	    "%": function _() {
	      if (this._input[this.offset] === "=") {
	        this.input();
	        return this.tok.T_MOD_EQUAL;
	      }

	      return "%";
	    },
	    "&": function _() {
	      var nchar = this._input[this.offset];

	      if (nchar === "=") {
	        this.input();
	        return this.tok.T_AND_EQUAL;
	      } else if (nchar === "&") {
	        this.input();
	        return this.tok.T_BOOLEAN_AND;
	      }

	      return "&";
	    },
	    "|": function _() {
	      var nchar = this._input[this.offset];

	      if (nchar === "=") {
	        this.input();
	        return this.tok.T_OR_EQUAL;
	      } else if (nchar === "|") {
	        this.input();
	        return this.tok.T_BOOLEAN_OR;
	      }

	      return "|";
	    },
	    "^": function _() {
	      if (this._input[this.offset] === "=") {
	        this.input();
	        return this.tok.T_XOR_EQUAL;
	      }

	      return "^";
	    }
	  }
	};

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var tokens$2 = ";:,.\\[]()|^&+-/*=%!~$<>?@";
	var utils$1 = {
	  // check if the char can be a numeric
	  is_NUM: function is_NUM() {
	    var ch = this._input.charCodeAt(this.offset - 1);

	    return ch > 47 && ch < 58 || ch === 95;
	  },
	  // check if the char can be a numeric
	  is_NUM_START: function is_NUM_START() {
	    var ch = this._input.charCodeAt(this.offset - 1);

	    return ch > 47 && ch < 58;
	  },
	  // check if current char can be a label
	  is_LABEL: function is_LABEL() {
	    var ch = this._input.charCodeAt(this.offset - 1);

	    return ch > 96 && ch < 123 || ch > 64 && ch < 91 || ch === 95 || ch > 47 && ch < 58 || ch > 126;
	  },
	  // check if current char can be a label
	  is_LABEL_START: function is_LABEL_START() {
	    var ch = this._input.charCodeAt(this.offset - 1); // A - Z


	    if (ch > 64 && ch < 91) return true; // a - z

	    if (ch > 96 && ch < 123) return true; // _ (95)

	    if (ch === 95) return true; // utf8 / extended

	    if (ch > 126) return true; // else

	    return false;
	  },
	  // reads each char of the label
	  consume_LABEL: function consume_LABEL() {
	    while (this.offset < this.size) {
	      var ch = this.input();

	      if (!this.is_LABEL()) {
	        if (ch) this.unput(1);
	        break;
	      }
	    }

	    return this;
	  },
	  // check if current char is a token char
	  is_TOKEN: function is_TOKEN() {
	    var ch = this._input[this.offset - 1];
	    return tokens$2.indexOf(ch) !== -1;
	  },
	  // check if current char is a whitespace
	  is_WHITESPACE: function is_WHITESPACE() {
	    var ch = this._input[this.offset - 1];
	    return ch === " " || ch === "\t" || ch === "\n" || ch === "\r";
	  },
	  // check if current char is a whitespace (without newlines)
	  is_TABSPACE: function is_TABSPACE() {
	    var ch = this._input[this.offset - 1];
	    return ch === " " || ch === "\t";
	  },
	  // consume all whitespaces (excluding newlines)
	  consume_TABSPACE: function consume_TABSPACE() {
	    while (this.offset < this.size) {
	      var ch = this.input();

	      if (!this.is_TABSPACE()) {
	        if (ch) this.unput(1);
	        break;
	      }
	    }

	    return this;
	  },
	  // check if current char can be a hexadecimal number
	  is_HEX: function is_HEX() {
	    var ch = this._input.charCodeAt(this.offset - 1); // 0 - 9


	    if (ch > 47 && ch < 58) return true; // A - F

	    if (ch > 64 && ch < 71) return true; // a - f

	    if (ch > 96 && ch < 103) return true; // _ (code 95)

	    if (ch === 95) return true; // else

	    return false;
	  },
	  // check if current char can be an octal number
	  is_OCTAL: function is_OCTAL() {
	    var ch = this._input.charCodeAt(this.offset - 1); // 0 - 7


	    if (ch > 47 && ch < 56) return true; // _ (code 95)

	    if (ch === 95) return true; // else

	    return false;
	  }
	};

	/**
	 * This is the php lexer. It will tokenize the string for helping the
	 * parser to build the AST from its grammar.
	 *
	 * @constructor Lexer
	 * @memberOf module:php-parser
	 * @property {number} EOF
	 * @property {boolean} all_tokens defines if all tokens must be retrieved (used by token_get_all only)
	 * @property {boolean} comment_tokens extracts comments tokens
	 * @property {boolean} mode_eval enables the evald mode (ignore opening tags)
	 * @property {boolean} asp_tags disables by default asp tags mode
	 * @property {boolean} short_tags enables by default short tags mode
	 * @property {object} keywords List of php keyword
	 * @property {object} castKeywords List of php keywords for type casting
	 */


	var Lexer = function Lexer(engine) {
	  this.engine = engine;
	  this.tok = this.engine.tokens.names;
	  this.EOF = 1;
	  this.debug = false;
	  this.all_tokens = true;
	  this.comment_tokens = false;
	  this.mode_eval = false;
	  this.asp_tags = false;
	  this.short_tags = false;
	  this.version = 801;
	  this.yyprevcol = 0;
	  this.keywords = {
	    __class__: this.tok.T_CLASS_C,
	    __trait__: this.tok.T_TRAIT_C,
	    __function__: this.tok.T_FUNC_C,
	    __method__: this.tok.T_METHOD_C,
	    __line__: this.tok.T_LINE,
	    __file__: this.tok.T_FILE,
	    __dir__: this.tok.T_DIR,
	    __namespace__: this.tok.T_NS_C,
	    exit: this.tok.T_EXIT,
	    die: this.tok.T_EXIT,
	    function: this.tok.T_FUNCTION,
	    const: this.tok.T_CONST,
	    return: this.tok.T_RETURN,
	    try: this.tok.T_TRY,
	    catch: this.tok.T_CATCH,
	    finally: this.tok.T_FINALLY,
	    throw: this.tok.T_THROW,
	    if: this.tok.T_IF,
	    elseif: this.tok.T_ELSEIF,
	    endif: this.tok.T_ENDIF,
	    else: this.tok.T_ELSE,
	    while: this.tok.T_WHILE,
	    endwhile: this.tok.T_ENDWHILE,
	    do: this.tok.T_DO,
	    for: this.tok.T_FOR,
	    endfor: this.tok.T_ENDFOR,
	    foreach: this.tok.T_FOREACH,
	    endforeach: this.tok.T_ENDFOREACH,
	    declare: this.tok.T_DECLARE,
	    enddeclare: this.tok.T_ENDDECLARE,
	    instanceof: this.tok.T_INSTANCEOF,
	    as: this.tok.T_AS,
	    switch: this.tok.T_SWITCH,
	    endswitch: this.tok.T_ENDSWITCH,
	    case: this.tok.T_CASE,
	    default: this.tok.T_DEFAULT,
	    break: this.tok.T_BREAK,
	    continue: this.tok.T_CONTINUE,
	    goto: this.tok.T_GOTO,
	    echo: this.tok.T_ECHO,
	    print: this.tok.T_PRINT,
	    class: this.tok.T_CLASS,
	    interface: this.tok.T_INTERFACE,
	    trait: this.tok.T_TRAIT,
	    enum: this.tok.T_ENUM,
	    extends: this.tok.T_EXTENDS,
	    implements: this.tok.T_IMPLEMENTS,
	    new: this.tok.T_NEW,
	    clone: this.tok.T_CLONE,
	    var: this.tok.T_VAR,
	    eval: this.tok.T_EVAL,
	    include: this.tok.T_INCLUDE,
	    include_once: this.tok.T_INCLUDE_ONCE,
	    require: this.tok.T_REQUIRE,
	    require_once: this.tok.T_REQUIRE_ONCE,
	    namespace: this.tok.T_NAMESPACE,
	    use: this.tok.T_USE,
	    insteadof: this.tok.T_INSTEADOF,
	    global: this.tok.T_GLOBAL,
	    isset: this.tok.T_ISSET,
	    empty: this.tok.T_EMPTY,
	    __halt_compiler: this.tok.T_HALT_COMPILER,
	    static: this.tok.T_STATIC,
	    abstract: this.tok.T_ABSTRACT,
	    final: this.tok.T_FINAL,
	    private: this.tok.T_PRIVATE,
	    protected: this.tok.T_PROTECTED,
	    public: this.tok.T_PUBLIC,
	    unset: this.tok.T_UNSET,
	    list: this.tok.T_LIST,
	    array: this.tok.T_ARRAY,
	    callable: this.tok.T_CALLABLE,
	    or: this.tok.T_LOGICAL_OR,
	    and: this.tok.T_LOGICAL_AND,
	    xor: this.tok.T_LOGICAL_XOR,
	    match: this.tok.T_MATCH,
	    readonly: this.tok.T_READ_ONLY
	  };
	  this.castKeywords = {
	    int: this.tok.T_INT_CAST,
	    integer: this.tok.T_INT_CAST,
	    real: this.tok.T_DOUBLE_CAST,
	    double: this.tok.T_DOUBLE_CAST,
	    float: this.tok.T_DOUBLE_CAST,
	    string: this.tok.T_STRING_CAST,
	    binary: this.tok.T_STRING_CAST,
	    array: this.tok.T_ARRAY_CAST,
	    object: this.tok.T_OBJECT_CAST,
	    bool: this.tok.T_BOOL_CAST,
	    boolean: this.tok.T_BOOL_CAST,
	    unset: this.tok.T_UNSET_CAST
	  };
	};
	/**
	 * Initialize the lexer with the specified input
	 * @function Lexer#setInput
	 * @memberOf module:php-parser
	 */


	Lexer.prototype.setInput = function (input) {
	  this._input = input;
	  this.size = input.length;
	  this.yylineno = 1;
	  this.offset = 0;
	  this.yyprevcol = 0;
	  this.yytext = "";
	  this.yylloc = {
	    first_offset: 0,
	    first_line: 1,
	    first_column: 0,
	    prev_offset: 0,
	    prev_line: 1,
	    prev_column: 0,
	    last_line: 1,
	    last_column: 0
	  };
	  this.tokens = [];

	  if (this.version > 703) {
	    this.keywords.fn = this.tok.T_FN;
	  } else {
	    delete this.keywords.fn;
	  }

	  this.done = this.offset >= this.size;

	  if (!this.all_tokens && this.mode_eval) {
	    this.conditionStack = ["INITIAL"];
	    this.begin("ST_IN_SCRIPTING");
	  } else {
	    this.conditionStack = [];
	    this.begin("INITIAL");
	  } // https://github.com/php/php-src/blob/999e32b65a8a4bb59e27e538fa68ffae4b99d863/Zend/zend_language_scanner.h#L59
	  // Used for heredoc and nowdoc


	  this.heredoc_label = {
	    label: "",
	    length: 0,
	    indentation: 0,
	    indentation_uses_spaces: false,
	    finished: false,

	    /*
	     * this used for parser to detemine the if current node segment is first encaps node.
	     * if ture, the indentation will remove from the begining. and if false, the prev node
	     * might be a variable '}' ,and the leading spaces should not be removed util meet the
	     * first \n
	     */
	    first_encaps_node: false,
	    // for backward compatible

	    /* istanbul ignore next */
	    toString: function toString() {
	      this.label;
	    }
	  };
	  return this;
	};
	/**
	 * consumes and returns one char from the input
	 * @function Lexer#input
	 * @memberOf module:php-parser
	 */


	Lexer.prototype.input = function () {
	  var ch = this._input[this.offset];
	  if (!ch) return "";
	  this.yytext += ch;
	  this.offset++;

	  if (ch === "\r" && this._input[this.offset] === "\n") {
	    this.yytext += "\n";
	    this.offset++;
	  }

	  if (ch === "\n" || ch === "\r") {
	    this.yylloc.last_line = ++this.yylineno;
	    this.yyprevcol = this.yylloc.last_column;
	    this.yylloc.last_column = 0;
	  } else {
	    this.yylloc.last_column++;
	  }

	  return ch;
	};
	/**
	 * revert eating specified size
	 * @function Lexer#unput
	 * @memberOf module:php-parser
	 */


	Lexer.prototype.unput = function (size) {
	  if (size === 1) {
	    // 1 char unput (most cases)
	    this.offset--;

	    if (this._input[this.offset] === "\n" && this._input[this.offset - 1] === "\r") {
	      this.offset--;
	      size++;
	    }

	    if (this._input[this.offset] === "\r" || this._input[this.offset] === "\n") {
	      this.yylloc.last_line--;
	      this.yylineno--;
	      this.yylloc.last_column = this.yyprevcol;
	    } else {
	      this.yylloc.last_column--;
	    }

	    this.yytext = this.yytext.substring(0, this.yytext.length - size);
	  } else if (size > 0) {
	    this.offset -= size;

	    if (size < this.yytext.length) {
	      this.yytext = this.yytext.substring(0, this.yytext.length - size); // re-calculate position

	      this.yylloc.last_line = this.yylloc.first_line;
	      this.yylloc.last_column = this.yyprevcol = this.yylloc.first_column;

	      for (var i = 0; i < this.yytext.length; i++) {
	        var c = this.yytext[i];

	        if (c === "\r") {
	          c = this.yytext[++i];
	          this.yyprevcol = this.yylloc.last_column;
	          this.yylloc.last_line++;
	          this.yylloc.last_column = 0;

	          if (c !== "\n") {
	            if (c === "\r") {
	              this.yylloc.last_line++;
	            } else {
	              this.yylloc.last_column++;
	            }
	          }
	        } else if (c === "\n") {
	          this.yyprevcol = this.yylloc.last_column;
	          this.yylloc.last_line++;
	          this.yylloc.last_column = 0;
	        } else {
	          this.yylloc.last_column++;
	        }
	      }

	      this.yylineno = this.yylloc.last_line;
	    } else {
	      // reset full text
	      this.yytext = "";
	      this.yylloc.last_line = this.yylineno = this.yylloc.first_line;
	      this.yylloc.last_column = this.yylloc.first_column;
	    }
	  }

	  return this;
	};
	/**
	 * check if the text matches
	 * @function Lexer#tryMatch
	 * @memberOf module:php-parser
	 * @param {string} text
	 * @returns {boolean}
	 */


	Lexer.prototype.tryMatch = function (text) {
	  return text === this.ahead(text.length);
	};
	/**
	 * check if the text matches
	 * @function Lexer#tryMatchCaseless
	 * @memberOf module:php-parser
	 * @param {string} text
	 * @returns {boolean}
	 */


	Lexer.prototype.tryMatchCaseless = function (text) {
	  return text === this.ahead(text.length).toLowerCase();
	};
	/**
	 * look ahead
	 * @function Lexer#ahead
	 * @memberOf module:php-parser
	 * @param {number} size
	 * @returns {string}
	 */


	Lexer.prototype.ahead = function (size) {
	  var text = this._input.substring(this.offset, this.offset + size);

	  if (text[text.length - 1] === "\r" && this._input[this.offset + size + 1] === "\n") {
	    text += "\n";
	  }

	  return text;
	};
	/**
	 * consume the specified size
	 * @function Lexer#consume
	 * @memberOf module:php-parser
	 * @param {number} size
	 * @returns {Lexer}
	 */


	Lexer.prototype.consume = function (size) {
	  for (var i = 0; i < size; i++) {
	    var ch = this._input[this.offset];
	    if (!ch) break;
	    this.yytext += ch;
	    this.offset++;

	    if (ch === "\r" && this._input[this.offset] === "\n") {
	      this.yytext += "\n";
	      this.offset++;
	      i++;
	    }

	    if (ch === "\n" || ch === "\r") {
	      this.yylloc.last_line = ++this.yylineno;
	      this.yyprevcol = this.yylloc.last_column;
	      this.yylloc.last_column = 0;
	    } else {
	      this.yylloc.last_column++;
	    }
	  }

	  return this;
	};
	/**
	 * Gets the current state
	 * @function Lexer#getState
	 * @memberOf module:php-parser
	 */


	Lexer.prototype.getState = function () {
	  return {
	    yytext: this.yytext,
	    offset: this.offset,
	    yylineno: this.yylineno,
	    yyprevcol: this.yyprevcol,
	    yylloc: {
	      first_offset: this.yylloc.first_offset,
	      first_line: this.yylloc.first_line,
	      first_column: this.yylloc.first_column,
	      last_line: this.yylloc.last_line,
	      last_column: this.yylloc.last_column
	    },
	    heredoc_label: this.heredoc_label
	  };
	};
	/**
	 * Sets the current lexer state
	 * @function Lexer#setState
	 * @memberOf module:php-parser
	 */


	Lexer.prototype.setState = function (state) {
	  this.yytext = state.yytext;
	  this.offset = state.offset;
	  this.yylineno = state.yylineno;
	  this.yyprevcol = state.yyprevcol;
	  this.yylloc = state.yylloc;

	  if (state.heredoc_label) {
	    this.heredoc_label = state.heredoc_label;
	  }

	  return this;
	};
	/**
	 * prepend next token
	 * @function Lexer#appendToken
	 * @memberOf module:php-parser
	 * @param {*} value
	 * @param {*} ahead
	 * @returns {Lexer}
	 */


	Lexer.prototype.appendToken = function (value, ahead) {
	  this.tokens.push([value, ahead]);
	  return this;
	};
	/**
	 * return next match that has a token
	 * @function Lexer#lex
	 * @memberOf module:php-parser
	 * @returns {number|string}
	 */


	Lexer.prototype.lex = function () {
	  this.yylloc.prev_offset = this.offset;
	  this.yylloc.prev_line = this.yylloc.last_line;
	  this.yylloc.prev_column = this.yylloc.last_column;
	  var token = this.next() || this.lex();

	  if (!this.all_tokens) {
	    while (token === this.tok.T_WHITESPACE || // ignore white space
	    !this.comment_tokens && (token === this.tok.T_COMMENT || // ignore single lines comments
	    token === this.tok.T_DOC_COMMENT) || // ignore doc comments
	    // ignore open tags
	    token === this.tok.T_OPEN_TAG) {
	      token = this.next() || this.lex();
	    }

	    if (token == this.tok.T_OPEN_TAG_WITH_ECHO) {
	      // https://github.com/php/php-src/blob/7ff186434e82ee7be7c59d0db9a976641cf7b09c/Zend/zend_compile.c#L1683
	      // open tag with echo statement
	      return this.tok.T_ECHO;
	    } else if (token === this.tok.T_CLOSE_TAG) {
	      // https://github.com/php/php-src/blob/7ff186434e82ee7be7c59d0db9a976641cf7b09c/Zend/zend_compile.c#L1680
	      return ";";
	      /* implicit ; */
	    }
	  }

	  if (!this.yylloc.prev_offset) {
	    this.yylloc.prev_offset = this.yylloc.first_offset;
	    this.yylloc.prev_line = this.yylloc.first_line;
	    this.yylloc.prev_column = this.yylloc.first_column;
	  }
	  /*else if (this.yylloc.prev_offset === this.offset && this.offset !== this.size) {
	    throw new Error('Infinite loop @ ' + this.offset + ' / ' + this.size);
	  }*/


	  return token;
	};
	/**
	 * activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
	 * @function Lexer#begin
	 * @memberOf module:php-parser
	 * @param {*} condition
	 * @returns {Lexer}
	 */


	Lexer.prototype.begin = function (condition) {
	  this.conditionStack.push(condition);
	  this.curCondition = condition;
	  this.stateCb = this["match" + condition];
	  /* istanbul ignore next */

	  if (typeof this.stateCb !== "function") {
	    throw new Error('Undefined condition state "' + condition + '"');
	  }

	  return this;
	};
	/**
	 * pop the previously active lexer condition state off the condition stack
	 * @function Lexer#popState
	 * @memberOf module:php-parser
	 * @returns {string|*}
	 */


	Lexer.prototype.popState = function () {
	  var n = this.conditionStack.length - 1;
	  var condition = n > 0 ? this.conditionStack.pop() : this.conditionStack[0];
	  this.curCondition = this.conditionStack[this.conditionStack.length - 1];
	  this.stateCb = this["match" + this.curCondition];
	  /* istanbul ignore next */

	  if (typeof this.stateCb !== "function") {
	    throw new Error('Undefined condition state "' + this.curCondition + '"');
	  }

	  return condition;
	};
	/**
	 * return next match in input
	 * @function Lexer#next
	 * @memberOf module:php-parser
	 * @returns {number|*}
	 */


	Lexer.prototype.next = function () {
	  var token;

	  if (!this._input) {
	    this.done = true;
	  }

	  this.yylloc.first_offset = this.offset;
	  this.yylloc.first_line = this.yylloc.last_line;
	  this.yylloc.first_column = this.yylloc.last_column;
	  this.yytext = "";

	  if (this.done) {
	    this.yylloc.prev_offset = this.yylloc.first_offset;
	    this.yylloc.prev_line = this.yylloc.first_line;
	    this.yylloc.prev_column = this.yylloc.first_column;
	    return this.EOF;
	  }

	  if (this.tokens.length > 0) {
	    token = this.tokens.shift();

	    if (_typeof(token[1]) === "object") {
	      this.setState(token[1]);
	    } else {
	      this.consume(token[1]);
	    }

	    token = token[0];
	  } else {
	    token = this.stateCb.apply(this, []);
	  }

	  if (this.offset >= this.size && this.tokens.length === 0) {
	    this.done = true;
	  }
	  /* istanbul ignore next */


	  if (this.debug) {
	    var tName = token;

	    if (typeof tName === "number") {
	      tName = this.engine.tokens.values[tName];
	    } else {
	      tName = '"' + tName + '"';
	    }

	    var e = new Error(tName + "\tfrom " + this.yylloc.first_line + "," + this.yylloc.first_column + "\t - to " + this.yylloc.last_line + "," + this.yylloc.last_column + '\t"' + this.yytext + '"'); // eslint-disable-next-line no-console

	    console.error(e.stack);
	  }

	  return token;
	}; // extends the lexer with states


	[attribute$1, comments, initial, numbers, property$1, scripting, strings, tokens$3, utils$1].forEach(function (ext) {
	  for (var k in ext) {
	    Lexer.prototype[k] = ext[k];
	  }
	});
	var lexer$1 = Lexer;

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */
	/**
	 * Each Position object consists of a line number (1-indexed) and a column number (0-indexed):
	 * @constructor Position
	 * @memberOf module:php-parser
	 * @property {number} line
	 * @property {number} column
	 * @property {number} offset
	 */


	var Position$2 = function Position(line, column, offset) {
	  this.line = line;
	  this.column = column;
	  this.offset = offset;
	};

	var position = Position$2;

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var array$1 = {
	  /*
	   * Parse an array
	   * ```ebnf
	   * array ::= T_ARRAY '(' array_pair_list ')' |
	   *   '[' array_pair_list ']'
	   * ```
	   */
	  read_array: function read_array() {
	    var expect = null;
	    var shortForm = false;
	    var result = this.node("array");

	    if (this.token === this.tok.T_ARRAY) {
	      this.next().expect("(");
	      expect = ")";
	    } else {
	      shortForm = true;
	      expect = "]";
	    }

	    var items = [];

	    if (this.next().token !== expect) {
	      items = this.read_array_pair_list(shortForm);
	    }

	    this.expect(expect);
	    this.next();
	    return result(shortForm, items);
	  },

	  /*
	   * Reads an array of items
	   * ```ebnf
	   * array_pair_list ::= array_pair (',' array_pair?)*
	   * ```
	   */
	  read_array_pair_list: function read_array_pair_list(shortForm) {
	    var self = this;
	    return this.read_list(function () {
	      return self.read_array_pair(shortForm);
	    }, ",", true);
	  },

	  /*
	   * Reads an entry
	   * array_pair:
	   *  expr T_DOUBLE_ARROW expr
	   *  | expr
	   *  | expr T_DOUBLE_ARROW '&' variable
	   *  | '&' variable
	   *  | expr T_DOUBLE_ARROW T_LIST '(' array_pair_list ')'
	   *  | T_LIST '(' array_pair_list ')'
	   */
	  read_array_pair: function read_array_pair(shortForm) {
	    if (!shortForm && this.token === ")" || shortForm && this.token === "]") {
	      return;
	    }

	    if (this.token === ",") {
	      return this.node("noop")();
	    }

	    var entry = this.node("entry");
	    var key = null;
	    var value = null;
	    var byRef = false;
	    var unpack = false;

	    if (this.token === "&") {
	      this.next();
	      byRef = true;
	      value = this.read_variable(true, false);
	    } else if (this.token === this.tok.T_ELLIPSIS && this.version >= 704) {
	      this.next();

	      if (this.token === "&") {
	        this.error();
	      }

	      unpack = true;
	      value = this.read_expr();
	    } else {
	      var expr = this.read_expr();

	      if (this.token === this.tok.T_DOUBLE_ARROW) {
	        this.next();
	        key = expr;

	        if (this.token === "&") {
	          this.next();
	          byRef = true;
	          value = this.read_variable(true, false);
	        } else {
	          value = this.read_expr();
	        }
	      } else {
	        value = expr;
	      }
	    }

	    return entry(key, value, byRef, unpack);
	  }
	};

	var _class$1 = {
	  /*
	   * reading a class
	   * ```ebnf
	   * class ::= class_scope? T_CLASS T_STRING (T_EXTENDS NAMESPACE_NAME)? (T_IMPLEMENTS (NAMESPACE_NAME ',')* NAMESPACE_NAME)? '{' CLASS_BODY '}'
	   * ```
	   */
	  read_class_declaration_statement: function read_class_declaration_statement(attrs) {
	    var result = this.node("class");
	    var flag = this.read_class_modifiers(); // graceful mode : ignore token & go next

	    if (this.token !== this.tok.T_CLASS) {
	      this.error(this.tok.T_CLASS);
	      this.next();
	      return null;
	    }

	    this.next().expect(this.tok.T_STRING);
	    var propName = this.node("identifier");
	    var name = this.text();
	    this.next();
	    propName = propName(name);
	    var propExtends = this.read_extends_from();
	    var propImplements = this.read_implements_list();
	    this.expect("{");
	    var body = this.next().read_class_body(true, false);
	    var node = result(propName, propExtends, propImplements, body, flag);
	    if (attrs) node.attrGroups = attrs;
	    return node;
	  },
	  read_class_modifiers: function read_class_modifiers() {
	    var modifier = this.read_class_modifier({
	      readonly: 0,
	      final_or_abstract: 0
	    });
	    return [0, 0, modifier.final_or_abstract, modifier.readonly];
	  },
	  read_class_modifier: function read_class_modifier(memo) {
	    if (this.token === this.tok.T_READ_ONLY) {
	      this.next();
	      memo.readonly = 1;
	      memo = this.read_class_modifier(memo);
	    } else if (memo.final_or_abstract === 0 && this.token === this.tok.T_ABSTRACT) {
	      this.next();
	      memo.final_or_abstract = 1;
	      memo = this.read_class_modifier(memo);
	    } else if (memo.final_or_abstract === 0 && this.token === this.tok.T_FINAL) {
	      this.next();
	      memo.final_or_abstract = 2;
	      memo = this.read_class_modifier(memo);
	    }

	    return memo;
	  },

	  /*
	   * Reads a class body
	   * ```ebnf
	   *   class_body ::= (member_flags? (T_VAR | T_STRING | T_FUNCTION))*
	   * ```
	   */
	  read_class_body: function read_class_body(allow_variables, allow_enum_cases) {
	    var result = [];
	    var attrs = [];

	    while (this.token !== this.EOF && this.token !== "}") {
	      if (this.token === this.tok.T_COMMENT) {
	        result.push(this.read_comment());
	        continue;
	      }

	      if (this.token === this.tok.T_DOC_COMMENT) {
	        result.push(this.read_doc_comment());
	        continue;
	      } // check T_USE trait


	      if (this.token === this.tok.T_USE) {
	        result = result.concat(this.read_trait_use_statement());
	        continue;
	      } // check enum cases


	      if (allow_enum_cases && this.token === this.tok.T_CASE) {
	        var enumcase = this.read_enum_case();

	        if (this.expect(";")) {
	          this.next();
	        }

	        result = result.concat(enumcase);
	        continue;
	      }

	      if (this.token === this.tok.T_ATTRIBUTE) {
	        attrs = this.read_attr_list();
	      }

	      var locStart = this.position(); // read member flags

	      var flags = this.read_member_flags(false); // check constant

	      if (this.token === this.tok.T_CONST) {
	        var constants = this.read_constant_list(flags, attrs);

	        if (this.expect(";")) {
	          this.next();
	        }

	        result = result.concat(constants);
	        continue;
	      } // jump over T_VAR then land on T_VARIABLE


	      if (allow_variables && this.token === this.tok.T_VAR) {
	        this.next().expect(this.tok.T_VARIABLE);
	        flags[0] = null; // public (as null)

	        flags[1] = 0; // non static var
	      }

	      if (this.token === this.tok.T_FUNCTION) {
	        // reads a function
	        result.push(this.read_function(false, flags, attrs, locStart));
	        attrs = [];
	      } else if (allow_variables && (this.token === this.tok.T_VARIABLE || this.version >= 801 && this.token === this.tok.T_READ_ONLY || // support https://wiki.php.net/rfc/typed_properties_v2
	      this.version >= 704 && (this.token === "?" || this.token === this.tok.T_ARRAY || this.token === this.tok.T_CALLABLE || this.token === this.tok.T_NAMESPACE || this.token === this.tok.T_NAME_FULLY_QUALIFIED || this.token === this.tok.T_NAME_QUALIFIED || this.token === this.tok.T_NAME_RELATIVE || this.token === this.tok.T_NS_SEPARATOR || this.token === this.tok.T_STRING))) {
	        // reads a variable
	        var variables = this.read_variable_list(flags, attrs);
	        attrs = [];
	        this.expect(";");
	        this.next();
	        result = result.concat(variables);
	      } else {
	        // raise an error
	        this.error([this.tok.T_CONST].concat(_toConsumableArray(allow_variables ? [this.tok.T_VARIABLE] : []), _toConsumableArray(allow_enum_cases ? [this.tok.T_CASE] : []), [this.tok.T_FUNCTION])); // ignore token

	        this.next();
	      }
	    }

	    this.expect("}");
	    this.next();
	    return result;
	  },

	  /*
	   * Reads variable list
	   * ```ebnf
	   *  variable_list ::= (variable_declaration ',')* variable_declaration
	   * ```
	   */
	  read_variable_list: function read_variable_list(flags, attrs) {
	    var result = this.node("propertystatement");
	    var properties = this.read_list(
	    /*
	     * Reads a variable declaration
	     *
	     * ```ebnf
	     *  variable_declaration ::= T_VARIABLE '=' scalar
	     * ```
	     */
	    function read_variable_declaration() {
	      var result = this.node("property");
	      var readonly = false;

	      if (this.token === this.tok.T_READ_ONLY) {
	        readonly = true;
	        this.next();
	      }

	      var _this$read_optional_t = this.read_optional_type(),
	          _this$read_optional_t2 = _slicedToArray(_this$read_optional_t, 2),
	          nullable = _this$read_optional_t2[0],
	          type = _this$read_optional_t2[1];

	      this.expect(this.tok.T_VARIABLE);
	      var propName = this.node("identifier");
	      var name = this.text().substring(1); // ignore $

	      this.next();
	      propName = propName(name);

	      if (this.token === ";" || this.token === ",") {
	        return result(propName, null, readonly, nullable, type, attrs || []);
	      } else if (this.token === "=") {
	        // https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L815
	        return result(propName, this.next().read_expr(), readonly, nullable, type, attrs || []);
	      } else {
	        this.expect([",", ";", "="]);
	        return result(propName, null, nullable, type, attrs || []);
	      }
	    }, ",");
	    return result(null, properties, flags);
	  },

	  /*
	   * Reads constant list
	   * ```ebnf
	   *  constant_list ::= T_CONST (constant_declaration ',')* constant_declaration
	   * ```
	   */
	  read_constant_list: function read_constant_list(flags, attrs) {
	    if (this.expect(this.tok.T_CONST)) {
	      this.next();
	    }

	    var result = this.node("classconstant");
	    var items = this.read_list(
	    /*
	     * Reads a constant declaration
	     *
	     * ```ebnf
	     *  constant_declaration ::= (T_STRING | IDENTIFIER) '=' expr
	     * ```
	     * @return {Constant} [:link:](AST.md#constant)
	     */
	    function read_constant_declaration() {
	      var result = this.node("constant");
	      var constName = null;
	      var value = null;

	      if (this.token === this.tok.T_STRING || this.version >= 700 && this.is("IDENTIFIER")) {
	        constName = this.node("identifier");
	        var name = this.text();
	        this.next();
	        constName = constName(name);
	      } else {
	        this.expect("IDENTIFIER");
	      }

	      if (this.expect("=")) {
	        value = this.next().read_expr();
	      }

	      return result(constName, value);
	    }, ",");
	    return result(null, items, flags, attrs || []);
	  },

	  /*
	   * Read member flags
	   * @return array
	   *  1st index : 0 => public, 1 => protected, 2 => private
	   *  2nd index : 0 => instance member, 1 => static member
	   *  3rd index : 0 => normal, 1 => abstract member, 2 => final member
	   */
	  read_member_flags: function read_member_flags(asInterface) {
	    var result = [-1, -1, -1];

	    if (this.is("T_MEMBER_FLAGS")) {
	      var idx = 0,
	          val = 0;

	      do {
	        switch (this.token) {
	          case this.tok.T_PUBLIC:
	            idx = 0;
	            val = 0;
	            break;

	          case this.tok.T_PROTECTED:
	            idx = 0;
	            val = 1;
	            break;

	          case this.tok.T_PRIVATE:
	            idx = 0;
	            val = 2;
	            break;

	          case this.tok.T_STATIC:
	            idx = 1;
	            val = 1;
	            break;

	          case this.tok.T_ABSTRACT:
	            idx = 2;
	            val = 1;
	            break;

	          case this.tok.T_FINAL:
	            idx = 2;
	            val = 2;
	            break;
	        }

	        if (asInterface) {
	          if (idx == 0 && val == 2) {
	            // an interface can't be private
	            this.expect([this.tok.T_PUBLIC, this.tok.T_PROTECTED]);
	            val = -1;
	          } else if (idx == 2 && val == 1) {
	            // an interface cant be abstract
	            this.error();
	            val = -1;
	          }
	        }

	        if (result[idx] !== -1) {
	          // already defined flag
	          this.error();
	        } else if (val !== -1) {
	          result[idx] = val;
	        }
	      } while (this.next().is("T_MEMBER_FLAGS"));
	    }

	    if (result[1] == -1) result[1] = 0;
	    if (result[2] == -1) result[2] = 0;
	    return result;
	  },

	  /*
	   * optional_type:
	   *	  /- empty -/	{ $$ = NULL; }
	   *   |	type_expr	{ $$ = $1; }
	   * ;
	   *
	   * type_expr:
	   *		type		{ $$ = $1; }
	   *	|	'?' type	{ $$ = $2; $$->attr |= ZEND_TYPE_NULLABLE; }
	   *	|	union_type	{ $$ = $1; }
	   * ;
	   *
	   * type:
	   * 		T_ARRAY		{ $$ = zend_ast_create_ex(ZEND_AST_TYPE, IS_ARRAY); }
	   * 	|	T_CALLABLE	{ $$ = zend_ast_create_ex(ZEND_AST_TYPE, IS_CALLABLE); }
	   * 	|	name		{ $$ = $1; }
	   * ;
	   *
	   * union_type:
	   * 		type '|' type       { $$ = zend_ast_create_list(2, ZEND_AST_TYPE_UNION, $1, $3); }
	   * 	|	union_type '|' type { $$ = zend_ast_list_add($1, $3); }
	   * ;
	   */
	  read_optional_type: function read_optional_type() {
	    var nullable = false;

	    if (this.token === "?") {
	      nullable = true;
	      this.next();
	    }

	    var type = this.read_types();

	    if (nullable && !type) {
	      this.raiseError("Expecting a type definition combined with nullable operator");
	    }

	    if (!nullable && !type) {
	      return [false, null];
	    }

	    if (this.token === "|") {
	      type = [type];

	      do {
	        this.next();
	        var variant = this.read_type();

	        if (!variant) {
	          this.raiseError("Expecting a type definition");
	          break;
	        }

	        type.push(variant);
	      } while (this.token === "|");
	    }

	    return [nullable, type];
	  },

	  /*
	   * reading an interface
	   * ```ebnf
	   * interface ::= T_INTERFACE T_STRING (T_EXTENDS (NAMESPACE_NAME ',')* NAMESPACE_NAME)? '{' INTERFACE_BODY '}'
	   * ```
	   */
	  read_interface_declaration_statement: function read_interface_declaration_statement(attrs) {
	    var result = this.node("interface");

	    if (this.token !== this.tok.T_INTERFACE) {
	      this.error(this.tok.T_INTERFACE);
	      this.next();
	      return null;
	    }

	    this.next().expect(this.tok.T_STRING);
	    var propName = this.node("identifier");
	    var name = this.text();
	    this.next();
	    propName = propName(name);
	    var propExtends = this.read_interface_extends_list();
	    this.expect("{");
	    var body = this.next().read_interface_body();
	    return result(propName, propExtends, body, attrs || []);
	  },

	  /*
	   * Reads an interface body
	   * ```ebnf
	   *   interface_body ::= (member_flags? (T_CONST | T_FUNCTION))*
	   * ```
	   */
	  read_interface_body: function read_interface_body() {
	    var result = [],
	        attrs = [];

	    while (this.token !== this.EOF && this.token !== "}") {
	      if (this.token === this.tok.T_COMMENT) {
	        result.push(this.read_comment());
	        continue;
	      }

	      if (this.token === this.tok.T_DOC_COMMENT) {
	        result.push(this.read_doc_comment());
	        continue;
	      }

	      var locStart = this.position();
	      attrs = this.read_attr_list(); // read member flags

	      var flags = this.read_member_flags(true); // check constant

	      if (this.token == this.tok.T_CONST) {
	        var constants = this.read_constant_list(flags, attrs);

	        if (this.expect(";")) {
	          this.next();
	        }

	        result = result.concat(constants);
	        attrs = [];
	      } else if (this.token === this.tok.T_FUNCTION) {
	        // reads a function
	        var method = this.read_function_declaration(2, flags, attrs, locStart);
	        method.parseFlags(flags);
	        result.push(method);

	        if (this.expect(";")) {
	          this.next();
	        }

	        attrs = [];
	      } else {
	        // raise an error
	        this.error([this.tok.T_CONST, this.tok.T_FUNCTION]);
	        this.next();
	      }
	    }

	    if (this.expect("}")) {
	      this.next();
	    }

	    return result;
	  },

	  /*
	   * reading a trait
	   * ```ebnf
	   * trait ::= T_TRAIT T_STRING (T_EXTENDS (NAMESPACE_NAME ',')* NAMESPACE_NAME)? '{' FUNCTION* '}'
	   * ```
	   */
	  read_trait_declaration_statement: function read_trait_declaration_statement() {
	    var result = this.node("trait"); // graceful mode : ignore token & go next

	    if (this.token !== this.tok.T_TRAIT) {
	      this.error(this.tok.T_TRAIT);
	      this.next();
	      return null;
	    }

	    this.next().expect(this.tok.T_STRING);
	    var propName = this.node("identifier");
	    var name = this.text();
	    this.next();
	    propName = propName(name);
	    this.expect("{");
	    var body = this.next().read_class_body(true, false);
	    return result(propName, body);
	  },

	  /*
	   * reading a use statement
	   * ```ebnf
	   * trait_use_statement ::= namespace_name (',' namespace_name)* ('{' trait_use_alias '}')?
	   * ```
	   */
	  read_trait_use_statement: function read_trait_use_statement() {
	    // defines use statements
	    var node = this.node("traituse");
	    this.expect(this.tok.T_USE) && this.next();
	    var traits = [this.read_namespace_name()];
	    var adaptations = null;

	    while (this.token === ",") {
	      traits.push(this.next().read_namespace_name());
	    }

	    if (this.token === "{") {
	      adaptations = []; // defines alias statements

	      while (this.next().token !== this.EOF) {
	        if (this.token === "}") break;
	        adaptations.push(this.read_trait_use_alias());
	        this.expect(";");
	      }

	      if (this.expect("}")) {
	        this.next();
	      }
	    } else {
	      if (this.expect(";")) {
	        this.next();
	      }
	    }

	    return node(traits, adaptations);
	  },

	  /*
	   * Reading trait alias
	   * ```ebnf
	   * trait_use_alias ::= namespace_name ( T_DOUBLE_COLON T_STRING )? (T_INSTEADOF namespace_name) | (T_AS member_flags? T_STRING)
	   * ```
	   * name list : https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L303
	   * trait adaptation : https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L742
	   */
	  read_trait_use_alias: function read_trait_use_alias() {
	    var node = this.node();
	    var trait = null;
	    var method;

	    if (this.is("IDENTIFIER")) {
	      method = this.node("identifier");
	      var methodName = this.text();
	      this.next();
	      method = method(methodName);
	    } else {
	      method = this.read_namespace_name();

	      if (this.token === this.tok.T_DOUBLE_COLON) {
	        this.next();

	        if (this.token === this.tok.T_STRING || this.version >= 700 && this.is("IDENTIFIER")) {
	          trait = method;
	          method = this.node("identifier");

	          var _methodName = this.text();

	          this.next();
	          method = method(_methodName);
	        } else {
	          this.expect(this.tok.T_STRING);
	        }
	      } else {
	        // convert identifier as string
	        method = method.name;
	      }
	    } // handle trait precedence


	    if (this.token === this.tok.T_INSTEADOF) {
	      return node("traitprecedence", trait, method, this.next().read_name_list());
	    } else if (this.token === this.tok.T_AS) {
	      // handle trait alias
	      var flags = null;
	      var alias = null;

	      if (this.next().is("T_MEMBER_FLAGS")) {
	        flags = this.read_member_flags();
	      }

	      if (this.token === this.tok.T_STRING || this.version >= 700 && this.is("IDENTIFIER")) {
	        alias = this.node("identifier");
	        var name = this.text();
	        this.next();
	        alias = alias(name);
	      } else if (flags === false) {
	        // no visibility flags and no name => too bad
	        this.expect(this.tok.T_STRING);
	      }

	      return node("traitalias", trait, method, alias, flags);
	    } // handle errors


	    this.expect([this.tok.T_AS, this.tok.T_INSTEADOF]);
	    return node("traitalias", trait, method, null, null);
	  }
	};

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var comment$1 = {
	  /*
	   *  Comments with // or # or / * ... * /
	   */
	  read_comment: function read_comment() {
	    var text = this.text();
	    var result = this.ast.prepare(text.substring(0, 2) === "/*" ? "commentblock" : "commentline", null, this);
	    var offset = this.lexer.yylloc.first_offset; // handle location on comment

	    var prev = this.prev;
	    this.prev = [this.lexer.yylloc.last_line, this.lexer.yylloc.last_column, this.lexer.offset];
	    this.lex();
	    result = result(text);
	    result.offset = offset;
	    this.prev = prev;
	    return result;
	  },

	  /*
	   * Comments with / ** ... * /
	   */
	  read_doc_comment: function read_doc_comment() {
	    var result = this.ast.prepare("commentblock", null, this);
	    var offset = this.lexer.yylloc.first_offset;
	    var text = this.text();
	    var prev = this.prev;
	    this.prev = [this.lexer.yylloc.last_line, this.lexer.yylloc.last_column, this.lexer.offset];
	    this.lex();
	    result = result(text);
	    result.offset = offset;
	    this.prev = prev;
	    return result;
	  }
	};

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var expr = {
	  read_expr: function read_expr(expr) {
	    var result = this.node();

	    if (this.token === "@") {
	      if (!expr) {
	        expr = this.next().read_expr();
	      }

	      return result("silent", expr);
	    }

	    if (!expr) {
	      expr = this.read_expr_item();
	    } // binary operations


	    if (this.token === "|") {
	      return result("bin", "|", expr, this.next().read_expr());
	    }

	    if (this.token === "&") {
	      return result("bin", "&", expr, this.next().read_expr());
	    }

	    if (this.token === "^") {
	      return result("bin", "^", expr, this.next().read_expr());
	    }

	    if (this.token === ".") {
	      return result("bin", ".", expr, this.next().read_expr());
	    }

	    if (this.token === "+") {
	      return result("bin", "+", expr, this.next().read_expr());
	    }

	    if (this.token === "-") {
	      return result("bin", "-", expr, this.next().read_expr());
	    }

	    if (this.token === "*") {
	      return result("bin", "*", expr, this.next().read_expr());
	    }

	    if (this.token === "/") {
	      return result("bin", "/", expr, this.next().read_expr());
	    }

	    if (this.token === "%") {
	      return result("bin", "%", expr, this.next().read_expr());
	    }

	    if (this.token === this.tok.T_POW) {
	      return result("bin", "**", expr, this.next().read_expr());
	    }

	    if (this.token === this.tok.T_SL) {
	      return result("bin", "<<", expr, this.next().read_expr());
	    }

	    if (this.token === this.tok.T_SR) {
	      return result("bin", ">>", expr, this.next().read_expr());
	    } // more binary operations (formerly bool)


	    if (this.token === this.tok.T_BOOLEAN_OR) {
	      return result("bin", "||", expr, this.next().read_expr());
	    }

	    if (this.token === this.tok.T_LOGICAL_OR) {
	      return result("bin", "or", expr, this.next().read_expr());
	    }

	    if (this.token === this.tok.T_BOOLEAN_AND) {
	      return result("bin", "&&", expr, this.next().read_expr());
	    }

	    if (this.token === this.tok.T_LOGICAL_AND) {
	      return result("bin", "and", expr, this.next().read_expr());
	    }

	    if (this.token === this.tok.T_LOGICAL_XOR) {
	      return result("bin", "xor", expr, this.next().read_expr());
	    }

	    if (this.token === this.tok.T_IS_IDENTICAL) {
	      return result("bin", "===", expr, this.next().read_expr());
	    }

	    if (this.token === this.tok.T_IS_NOT_IDENTICAL) {
	      return result("bin", "!==", expr, this.next().read_expr());
	    }

	    if (this.token === this.tok.T_IS_EQUAL) {
	      return result("bin", "==", expr, this.next().read_expr());
	    }

	    if (this.token === this.tok.T_IS_NOT_EQUAL) {
	      return result("bin", "!=", expr, this.next().read_expr());
	    }

	    if (this.token === "<") {
	      return result("bin", "<", expr, this.next().read_expr());
	    }

	    if (this.token === ">") {
	      return result("bin", ">", expr, this.next().read_expr());
	    }

	    if (this.token === this.tok.T_IS_SMALLER_OR_EQUAL) {
	      return result("bin", "<=", expr, this.next().read_expr());
	    }

	    if (this.token === this.tok.T_IS_GREATER_OR_EQUAL) {
	      return result("bin", ">=", expr, this.next().read_expr());
	    }

	    if (this.token === this.tok.T_SPACESHIP) {
	      return result("bin", "<=>", expr, this.next().read_expr());
	    }

	    if (this.token === this.tok.T_INSTANCEOF) {
	      expr = result("bin", "instanceof", expr, this.next().read_class_name_reference());

	      if (this.token !== ";" && this.token !== this.tok.T_INLINE_HTML && this.token !== this.EOF) {
	        expr = this.read_expr(expr);
	      }
	    } // extra operations :
	    // $username = $_GET['user'] ?? 'nobody';


	    if (this.token === this.tok.T_COALESCE) {
	      return result("bin", "??", expr, this.next().read_expr());
	    } // extra operations :
	    // $username = $_GET['user'] ? true : false;


	    if (this.token === "?") {
	      var trueArg = null;

	      if (this.next().token !== ":") {
	        trueArg = this.read_expr();
	      }

	      this.expect(":") && this.next();
	      return result("retif", expr, trueArg, this.read_expr());
	    } else {
	      // see #193
	      result.destroy(expr);
	    }

	    return expr;
	  },

	  /*
	   * Reads a cast expression
	   */
	  read_expr_cast: function read_expr_cast(type) {
	    return this.node("cast")(type, this.text(), this.next().read_expr());
	  },

	  /*
	   * Read a isset variable
	   */
	  read_isset_variable: function read_isset_variable() {
	    return this.read_expr();
	  },

	  /*
	   * Reads isset variables
	   */
	  read_isset_variables: function read_isset_variables() {
	    return this.read_function_list(this.read_isset_variable, ",");
	  },

	  /*
	   * Reads internal PHP functions
	   */
	  read_internal_functions_in_yacc: function read_internal_functions_in_yacc() {
	    var result = null;

	    switch (this.token) {
	      case this.tok.T_ISSET:
	        {
	          result = this.node("isset");

	          if (this.next().expect("(")) {
	            this.next();
	          }

	          var variables = this.read_isset_variables();

	          if (this.expect(")")) {
	            this.next();
	          }

	          result = result(variables);
	        }
	        break;

	      case this.tok.T_EMPTY:
	        {
	          result = this.node("empty");

	          if (this.next().expect("(")) {
	            this.next();
	          }

	          var expression = this.read_expr();

	          if (this.expect(")")) {
	            this.next();
	          }

	          result = result(expression);
	        }
	        break;

	      case this.tok.T_INCLUDE:
	        result = this.node("include")(false, false, this.next().read_expr());
	        break;

	      case this.tok.T_INCLUDE_ONCE:
	        result = this.node("include")(true, false, this.next().read_expr());
	        break;

	      case this.tok.T_EVAL:
	        {
	          result = this.node("eval");

	          if (this.next().expect("(")) {
	            this.next();
	          }

	          var _expr = this.read_expr();

	          if (this.expect(")")) {
	            this.next();
	          }

	          result = result(_expr);
	        }
	        break;

	      case this.tok.T_REQUIRE:
	        result = this.node("include")(false, true, this.next().read_expr());
	        break;

	      case this.tok.T_REQUIRE_ONCE:
	        result = this.node("include")(true, true, this.next().read_expr());
	        break;
	    }

	    return result;
	  },

	  /*
	   * Reads optional expression
	   */
	  read_optional_expr: function read_optional_expr(stopToken) {
	    if (this.token !== stopToken) {
	      return this.read_expr();
	    }

	    return null;
	  },

	  /*
	   * Reads exit expression
	   */
	  read_exit_expr: function read_exit_expr() {
	    var expression = null;

	    if (this.token === "(") {
	      this.next();
	      expression = this.read_optional_expr(")");
	      this.expect(")") && this.next();
	    }

	    return expression;
	  },

	  /*
	   * ```ebnf
	   * Reads an expression
	   *  expr ::= @todo
	   * ```
	   */
	  read_expr_item: function read_expr_item() {
	    var result,
	        expr,
	        attrs = [];

	    if (this.token === "+") {
	      return this.node("unary")("+", this.next().read_expr());
	    }

	    if (this.token === "-") {
	      return this.node("unary")("-", this.next().read_expr());
	    }

	    if (this.token === "!") {
	      return this.node("unary")("!", this.next().read_expr());
	    }

	    if (this.token === "~") {
	      return this.node("unary")("~", this.next().read_expr());
	    }

	    if (this.token === "(") {
	      expr = this.next().read_expr();
	      expr.parenthesizedExpression = true;
	      this.expect(")") && this.next();
	      return this.handleDereferencable(expr);
	    }

	    if (this.token === "`") {
	      // https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L1048
	      return this.read_encapsed_string("`");
	    }

	    if (this.token === this.tok.T_LIST) {
	      var assign = null;
	      var isInner = this.innerList;
	      result = this.node("list");

	      if (!isInner) {
	        assign = this.node("assign");
	      }

	      if (this.next().expect("(")) {
	        this.next();
	      }

	      if (!this.innerList) this.innerList = true; // reads inner items

	      var assignList = this.read_array_pair_list(false);

	      if (this.expect(")")) {
	        this.next();
	      } // check if contains at least one assignment statement


	      var hasItem = false;

	      for (var i = 0; i < assignList.length; i++) {
	        if (assignList[i] !== null && assignList[i].kind !== "noop") {
	          hasItem = true;
	          break;
	        }
	      }

	      if (!hasItem) {
	        /* istanbul ignore next */
	        this.raiseError("Fatal Error :  Cannot use empty list on line " + this.lexer.yylloc.first_line);
	      } // handles the node resolution


	      if (!isInner) {
	        this.innerList = false;

	        if (this.expect("=")) {
	          return assign(result(assignList, false), this.next().read_expr(), "=");
	        } else {
	          // error fallback : list($a, $b);

	          /* istanbul ignore next */
	          return result(assignList, false);
	        }
	      } else {
	        return result(assignList, false);
	      }
	    }

	    if (this.token === this.tok.T_ATTRIBUTE) {
	      attrs = this.read_attr_list();
	    }

	    if (this.token === this.tok.T_CLONE) {
	      return this.node("clone")(this.next().read_expr());
	    }

	    switch (this.token) {
	      case this.tok.T_INC:
	        return this.node("pre")("+", this.next().read_variable(false, false));

	      case this.tok.T_DEC:
	        return this.node("pre")("-", this.next().read_variable(false, false));

	      case this.tok.T_NEW:
	        return this.read_new_expr();

	      case this.tok.T_ISSET:
	      case this.tok.T_EMPTY:
	      case this.tok.T_INCLUDE:
	      case this.tok.T_INCLUDE_ONCE:
	      case this.tok.T_EVAL:
	      case this.tok.T_REQUIRE:
	      case this.tok.T_REQUIRE_ONCE:
	        return this.read_internal_functions_in_yacc();

	      case this.tok.T_MATCH:
	        return this.read_match_expression();

	      case this.tok.T_INT_CAST:
	        return this.read_expr_cast("int");

	      case this.tok.T_DOUBLE_CAST:
	        return this.read_expr_cast("float");

	      case this.tok.T_STRING_CAST:
	        return this.read_expr_cast(this.text().indexOf("binary") !== -1 ? "binary" : "string");

	      case this.tok.T_ARRAY_CAST:
	        return this.read_expr_cast("array");

	      case this.tok.T_OBJECT_CAST:
	        return this.read_expr_cast("object");

	      case this.tok.T_BOOL_CAST:
	        return this.read_expr_cast("bool");

	      case this.tok.T_UNSET_CAST:
	        return this.read_expr_cast("unset");

	      case this.tok.T_THROW:
	        {
	          if (this.version < 800) {
	            this.raiseError("PHP 8+ is required to use throw as an expression");
	          }

	          var _result = this.node("throw");

	          var _expr2 = this.next().read_expr();

	          return _result(_expr2);
	        }

	      case this.tok.T_EXIT:
	        {
	          var useDie = this.lexer.yytext.toLowerCase() === "die";
	          result = this.node("exit");
	          this.next();
	          var expression = this.read_exit_expr();
	          return result(expression, useDie);
	        }

	      case this.tok.T_PRINT:
	        return this.node("print")(this.next().read_expr());
	      // T_YIELD (expr (T_DOUBLE_ARROW expr)?)?

	      case this.tok.T_YIELD:
	        {
	          var value = null;
	          var key = null;
	          result = this.node("yield");

	          if (this.next().is("EXPR")) {
	            // reads the yield return value
	            value = this.read_expr();

	            if (this.token === this.tok.T_DOUBLE_ARROW) {
	              // reads the yield returned key
	              key = value;
	              value = this.next().read_expr();
	            }
	          }

	          return result(value, key);
	        }
	      // T_YIELD_FROM expr

	      case this.tok.T_YIELD_FROM:
	        result = this.node("yieldfrom");
	        expr = this.next().read_expr();
	        return result(expr);

	      case this.tok.T_FN:
	      case this.tok.T_FUNCTION:
	        return this.read_inline_function(undefined, attrs);

	      case this.tok.T_STATIC:
	        {
	          var backup = [this.token, this.lexer.getState()];
	          this.next();

	          if (this.token === this.tok.T_FUNCTION || this.version >= 704 && this.token === this.tok.T_FN) {
	            // handles static function
	            return this.read_inline_function([0, 1, 0], attrs);
	          } else {
	            // rollback
	            this.lexer.tokens.push(backup);
	            this.next();
	          }
	        }
	    } // SCALAR | VARIABLE


	    if (this.is("VARIABLE")) {
	      result = this.node();
	      expr = this.read_variable(false, false); // https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L877
	      // should accept only a variable

	      var isConst = expr.kind === "identifier" || expr.kind === "staticlookup" && expr.offset.kind === "identifier"; // VARIABLES SPECIFIC OPERATIONS

	      switch (this.token) {
	        case "=":
	          {
	            if (isConst) this.error("VARIABLE");

	            if (this.next().token == "&") {
	              return this.read_assignref(result, expr);
	            }

	            return result("assign", expr, this.read_expr(), "=");
	          }
	        // operations :

	        case this.tok.T_PLUS_EQUAL:
	          if (isConst) this.error("VARIABLE");
	          return result("assign", expr, this.next().read_expr(), "+=");

	        case this.tok.T_MINUS_EQUAL:
	          if (isConst) this.error("VARIABLE");
	          return result("assign", expr, this.next().read_expr(), "-=");

	        case this.tok.T_MUL_EQUAL:
	          if (isConst) this.error("VARIABLE");
	          return result("assign", expr, this.next().read_expr(), "*=");

	        case this.tok.T_POW_EQUAL:
	          if (isConst) this.error("VARIABLE");
	          return result("assign", expr, this.next().read_expr(), "**=");

	        case this.tok.T_DIV_EQUAL:
	          if (isConst) this.error("VARIABLE");
	          return result("assign", expr, this.next().read_expr(), "/=");

	        case this.tok.T_CONCAT_EQUAL:
	          if (isConst) this.error("VARIABLE");
	          return result("assign", expr, this.next().read_expr(), ".=");

	        case this.tok.T_MOD_EQUAL:
	          if (isConst) this.error("VARIABLE");
	          return result("assign", expr, this.next().read_expr(), "%=");

	        case this.tok.T_AND_EQUAL:
	          if (isConst) this.error("VARIABLE");
	          return result("assign", expr, this.next().read_expr(), "&=");

	        case this.tok.T_OR_EQUAL:
	          if (isConst) this.error("VARIABLE");
	          return result("assign", expr, this.next().read_expr(), "|=");

	        case this.tok.T_XOR_EQUAL:
	          if (isConst) this.error("VARIABLE");
	          return result("assign", expr, this.next().read_expr(), "^=");

	        case this.tok.T_SL_EQUAL:
	          if (isConst) this.error("VARIABLE");
	          return result("assign", expr, this.next().read_expr(), "<<=");

	        case this.tok.T_SR_EQUAL:
	          if (isConst) this.error("VARIABLE");
	          return result("assign", expr, this.next().read_expr(), ">>=");

	        case this.tok.T_COALESCE_EQUAL:
	          if (isConst) this.error("VARIABLE");
	          return result("assign", expr, this.next().read_expr(), "??=");

	        case this.tok.T_INC:
	          if (isConst) this.error("VARIABLE");
	          this.next();
	          return result("post", "+", expr);

	        case this.tok.T_DEC:
	          if (isConst) this.error("VARIABLE");
	          this.next();
	          return result("post", "-", expr);

	        default:
	          // see #193
	          result.destroy(expr);
	      }
	    } else if (this.is("SCALAR")) {
	      result = this.node();
	      expr = this.read_scalar();

	      if (expr.kind === "array" && expr.shortForm && this.token === "=") {
	        // list assign
	        var list = this.convertToList(expr);
	        if (expr.loc) list.loc = expr.loc;
	        var right = this.next().read_expr();
	        return result("assign", list, right, "=");
	      } else {
	        // see #189 - swap docs on nodes
	        result.destroy(expr);
	      } // classic array


	      return this.handleDereferencable(expr);
	    } else {
	      this.error("EXPR");
	      this.next();
	    } // returns variable | scalar


	    return expr;
	  },

	  /*
	   * Recursively convert nested array to nested list.
	   */
	  convertToList: function convertToList(array) {
	    var _this = this;

	    var convertedItems = array.items.map(function (entry) {
	      if (entry.value && entry.value.kind === "array" && entry.value.shortForm) {
	        entry.value = _this.convertToList(entry.value);
	      }

	      return entry;
	    });
	    var node = this.node("list")(convertedItems, true);
	    if (array.loc) node.loc = array.loc;
	    if (array.leadingComments) node.leadingComments = array.leadingComments;
	    if (array.trailingComments) node.trailingComments = array.trailingComments;
	    return node;
	  },

	  /*
	   * Reads assignment
	   * @param {*} left
	   */
	  read_assignref: function read_assignref(result, left) {
	    this.next();
	    var right;

	    if (this.token === this.tok.T_NEW) {
	      if (this.version >= 700) {
	        this.error();
	      }

	      right = this.read_new_expr();
	    } else {
	      right = this.read_variable(false, false);
	    }

	    return result("assignref", left, right);
	  },

	  /*
	   *
	   * inline_function:
	   * 		function returns_ref backup_doc_comment '(' parameter_list ')' lexical_vars return_type
	   * 		backup_fn_flags '{' inner_statement_list '}' backup_fn_flags
	   * 			{ $$ = zend_ast_create_decl(ZEND_AST_CLOSURE, $2 | $13, $1, $3,
	   * 				  zend_string_init("{closure}", sizeof("{closure}") - 1, 0),
	   * 				  $5, $7, $11, $8); CG(extra_fn_flags) = $9; }
	   * 	|	fn returns_ref '(' parameter_list ')' return_type backup_doc_comment T_DOUBLE_ARROW backup_fn_flags backup_lex_pos expr backup_fn_flags
	   * 			{ $$ = zend_ast_create_decl(ZEND_AST_ARROW_FUNC, $2 | $12, $1, $7,
	   * 				  zend_string_init("{closure}", sizeof("{closure}") - 1, 0), $4, NULL,
	   * 				  zend_ast_create(ZEND_AST_RETURN, $11), $6);
	   * 				  ((zend_ast_decl *) $$)->lex_pos = $10;
	   * 				  CG(extra_fn_flags) = $9; }   *
	   */
	  read_inline_function: function read_inline_function(flags, attrs) {
	    if (this.token === this.tok.T_FUNCTION) {
	      var _result2 = this.read_function(true, flags, attrs);

	      _result2.attrGroups = attrs;
	      return _result2;
	    } // introduced in PHP 7.4


	    if (!this.version >= 704) {
	      this.raiseError("Arrow Functions are not allowed");
	    } // as an arrowfunc


	    var node = this.node("arrowfunc"); // eat T_FN

	    if (this.expect(this.tok.T_FN)) this.next(); // check the &

	    var isRef = this.is_reference(); // ...

	    if (this.expect("(")) this.next();
	    var params = this.read_parameter_list();
	    if (this.expect(")")) this.next();
	    var nullable = false;
	    var returnType = null;

	    if (this.token === ":") {
	      if (this.next().token === "?") {
	        nullable = true;
	        this.next();
	      }

	      returnType = this.read_types();
	    }

	    if (this.expect(this.tok.T_DOUBLE_ARROW)) this.next();
	    var body = this.read_expr();
	    var result = node(params, isRef, body, returnType, nullable, flags ? true : false);
	    result.attrGroups = attrs;
	    return result;
	  },
	  read_match_expression: function read_match_expression() {
	    var node = this.node("match");
	    this.expect(this.tok.T_MATCH) && this.next();

	    if (this.version < 800) {
	      this.raiseError("Match statements are not allowed before PHP 8");
	    }

	    var cond = null;
	    var arms = [];
	    if (this.expect("(")) this.next();
	    cond = this.read_expr();
	    if (this.expect(")")) this.next();
	    if (this.expect("{")) this.next();
	    arms = this.read_match_arms();
	    if (this.expect("}")) this.next();
	    return node(cond, arms);
	  },
	  read_match_arms: function read_match_arms() {
	    var _this2 = this;

	    return this.read_list(function () {
	      return _this2.read_match_arm();
	    }, ",", true);
	  },
	  read_match_arm: function read_match_arm() {
	    if (this.token === "}") {
	      return;
	    }

	    return this.node("matcharm")(this.read_match_arm_conds(), this.read_expr());
	  },
	  read_match_arm_conds: function read_match_arm_conds() {
	    var conds = [];

	    if (this.token === this.tok.T_DEFAULT) {
	      conds = null;
	      this.next();
	    } else {
	      conds.push(this.read_expr());

	      while (this.token === ",") {
	        this.next();

	        if (this.token === this.tok.T_DOUBLE_ARROW) {
	          this.next();
	          return conds;
	        }

	        conds.push(this.read_expr());
	      }
	    }

	    if (this.expect(this.tok.T_DOUBLE_ARROW)) {
	      this.next();
	    }

	    return conds;
	  },
	  read_attribute: function read_attribute() {
	    var name = this.text();
	    var args = [];
	    this.next();

	    if (this.token === "(") {
	      args = this.read_argument_list();
	    }

	    return this.node("attribute")(name, args);
	  },
	  read_attr_list: function read_attr_list() {
	    var list = [];

	    if (this.token === this.tok.T_ATTRIBUTE) {
	      do {
	        var attrGr = this.node("attrgroup")([]);
	        this.next();
	        attrGr.attrs.push(this.read_attribute());

	        while (this.token === ",") {
	          this.next();
	          if (this.token !== "]") attrGr.attrs.push(this.read_attribute());
	        }

	        list.push(attrGr);
	        this.expect("]");
	        this.next();
	      } while (this.token === this.tok.T_ATTRIBUTE);
	    }

	    return list;
	  },

	  /*
	   * ```ebnf
	   *    new_expr ::= T_NEW (namespace_name function_argument_list) | (T_CLASS ... class declaration)
	   * ```
	   * https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L850
	   */
	  read_new_expr: function read_new_expr() {
	    var result = this.node("new");
	    this.expect(this.tok.T_NEW) && this.next();
	    var args = [];

	    if (this.token === "(") {
	      this.next();
	      var newExp = this.read_expr();
	      this.expect(")");
	      this.next();

	      if (this.token === "(") {
	        args = this.read_argument_list();
	      }

	      return result(newExp, args);
	    }

	    var attrs = this.read_attr_list();

	    if (this.token === this.tok.T_CLASS) {
	      var what = this.node("class"); // Annonymous class declaration

	      if (this.next().token === "(") {
	        args = this.read_argument_list();
	      }

	      var propExtends = this.read_extends_from();
	      var propImplements = this.read_implements_list();
	      var body = null;

	      if (this.expect("{")) {
	        body = this.next().read_class_body(true, false);
	      }

	      var whatNode = what(null, propExtends, propImplements, body, [0, 0, 0]);
	      whatNode.attrGroups = attrs;
	      return result(whatNode, args);
	    } // Already existing class


	    var name = this.read_new_class_name();

	    while (this.token === "[") {
	      var offsetNode = this.node("offsetlookup");
	      var offset = this.next().read_encaps_var_offset();
	      this.expect("]") && this.next();
	      name = offsetNode(name, offset);
	    }

	    if (this.token === "(") {
	      args = this.read_argument_list();
	    }

	    return result(name, args);
	  },

	  /*
	   * Reads a class name
	   * ```ebnf
	   * read_new_class_name ::= namespace_name | variable
	   * ```
	   */
	  read_new_class_name: function read_new_class_name() {
	    if (this.token === this.tok.T_NS_SEPARATOR || this.token === this.tok.T_NAME_RELATIVE || this.token === this.tok.T_NAME_QUALIFIED || this.token === this.tok.T_NAME_FULLY_QUALIFIED || this.token === this.tok.T_STRING || this.token === this.tok.T_NAMESPACE) {
	      var result = this.read_namespace_name(true);

	      if (this.token === this.tok.T_DOUBLE_COLON) {
	        result = this.read_static_getter(result);
	      }

	      return result;
	    } else if (this.is("VARIABLE")) {
	      return this.read_variable(true, false);
	    } else {
	      this.expect([this.tok.T_STRING, "VARIABLE"]);
	    }
	  },
	  handleDereferencable: function handleDereferencable(expr) {
	    while (this.token !== this.EOF) {
	      if (this.token === this.tok.T_OBJECT_OPERATOR || this.token === this.tok.T_DOUBLE_COLON) {
	        expr = this.recursive_variable_chain_scan(expr, false, false, true);
	      } else if (this.token === this.tok.T_CURLY_OPEN || this.token === "[") {
	        expr = this.read_dereferencable(expr);
	      } else if (this.token === "(") {
	        // https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L1118
	        expr = this.node("call")(expr, this.read_argument_list());
	      } else {
	        return expr;
	      }
	    }

	    return expr;
	  }
	};

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var _enum$1 = {
	  /*
	   * reading an enum
	   * ```ebnf
	   * enum ::= enum_scope? T_ENUM T_STRING (':' NAMESPACE_NAME)? (T_IMPLEMENTS (NAMESPACE_NAME ',')* NAMESPACE_NAME)? '{' ENUM_BODY '}'
	   * ```
	   */
	  read_enum_declaration_statement: function read_enum_declaration_statement(attrs) {
	    var result = this.node("enum"); // graceful mode : ignore token & go next

	    if (!this.expect(this.tok.T_ENUM)) {
	      return null;
	    }

	    this.next().expect(this.tok.T_STRING);
	    var propName = this.node("identifier");
	    var name = this.text();
	    this.next();
	    propName = propName(name);
	    var valueType = this.read_enum_value_type();
	    var propImplements = this.read_implements_list();
	    this.expect("{");
	    var body = this.next().read_class_body(false, true);
	    var node = result(propName, valueType, propImplements, body);
	    if (attrs) node.attrGroups = attrs;
	    return node;
	  },
	  read_enum_value_type: function read_enum_value_type() {
	    if (this.token === ":") {
	      return this.next().read_namespace_name();
	    }

	    return null;
	  },
	  read_enum_case: function read_enum_case() {
	    this.expect(this.tok.T_CASE);
	    var result = this.node("enumcase");
	    var caseName = this.node("identifier");
	    var name = this.next().text();
	    this.next();
	    caseName = caseName(name);
	    var value = this.token === "=" ? this.next().read_expr() : null;
	    this.expect(";");
	    return result(caseName, value);
	  }
	};

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var _function$1 = {
	  /*
	   * checks if current token is a reference keyword
	   */
	  is_reference: function is_reference() {
	    if (this.token === "&") {
	      this.next();
	      return true;
	    }

	    return false;
	  },

	  /*
	   * checks if current token is a variadic keyword
	   */
	  is_variadic: function is_variadic() {
	    if (this.token === this.tok.T_ELLIPSIS) {
	      this.next();
	      return true;
	    }

	    return false;
	  },

	  /*
	   * reading a function
	   * ```ebnf
	   * function ::= function_declaration code_block
	   * ```
	   */
	  read_function: function read_function(closure, flag, attrs, locStart) {
	    var result = this.read_function_declaration(closure ? 1 : flag ? 2 : 0, flag && flag[1] === 1, attrs || [], locStart);

	    if (flag && flag[2] == 1) {
	      // abstract function :
	      result.parseFlags(flag);

	      if (this.expect(";")) {
	        this.next();
	      }
	    } else {
	      if (this.expect("{")) {
	        result.body = this.read_code_block(false);

	        if (result.loc && result.body.loc) {
	          result.loc.end = result.body.loc.end;
	        }
	      }

	      if (!closure && flag) {
	        result.parseFlags(flag);
	      }
	    }

	    return result;
	  },

	  /*
	   * reads a function declaration (without his body)
	   * ```ebnf
	   * function_declaration ::= T_FUNCTION '&'?  T_STRING '(' parameter_list ')'
	   * ```
	   */
	  read_function_declaration: function read_function_declaration(type, isStatic, attrs, locStart) {
	    var _this = this;

	    var nodeName = "function";

	    if (type === 1) {
	      nodeName = "closure";
	    } else if (type === 2) {
	      nodeName = "method";
	    }

	    var result = this.node(nodeName);

	    if (this.expect(this.tok.T_FUNCTION)) {
	      this.next();
	    }

	    var isRef = this.is_reference();
	    var name = false,
	        use = [],
	        returnType = null,
	        nullable = false;

	    if (type !== 1) {
	      var nameNode = this.node("identifier");

	      if (type === 2) {
	        if (this.version >= 700) {
	          if (this.token === this.tok.T_STRING || this.is("IDENTIFIER")) {
	            name = this.text();
	            this.next();
	          } else if (this.version < 704) {
	            this.error("IDENTIFIER");
	          }
	        } else if (this.token === this.tok.T_STRING) {
	          name = this.text();
	          this.next();
	        } else {
	          this.error("IDENTIFIER");
	        }
	      } else {
	        if (this.version >= 700) {
	          if (this.token === this.tok.T_STRING) {
	            name = this.text();
	            this.next();
	          } else if (this.version >= 704) {
	            if (!this.expect("(")) {
	              this.next();
	            }
	          } else {
	            this.error(this.tok.T_STRING);
	            this.next();
	          }
	        } else {
	          if (this.expect(this.tok.T_STRING)) {
	            name = this.text();
	          }

	          this.next();
	        }
	      }

	      name = nameNode(name);
	    }

	    if (this.expect("(")) this.next();
	    var params = this.read_parameter_list(name.name === "__construct");
	    if (this.expect(")")) this.next();

	    if (type === 1) {
	      use = this.read_lexical_vars();
	    }

	    if (this.token === ":") {
	      if (this.next().token === "?") {
	        nullable = true;
	        this.next();
	      }

	      returnType = this.read_types();
	    }

	    var apply_attrgroup_location = function apply_attrgroup_location(node) {
	      node.attrGroups = attrs || [];

	      if (locStart && node.loc) {
	        node.loc.start = locStart;

	        if (node.loc.source) {
	          node.loc.source = _this.lexer._input.substr(node.loc.start.offset, node.loc.end.offset - node.loc.start.offset);
	        }
	      }

	      return node;
	    };

	    if (type === 1) {
	      // closure
	      return apply_attrgroup_location(result(params, isRef, use, returnType, nullable, isStatic));
	    }

	    return apply_attrgroup_location(result(name, params, isRef, returnType, nullable));
	  },
	  read_lexical_vars: function read_lexical_vars() {
	    var result = [];

	    if (this.token === this.tok.T_USE) {
	      this.next();
	      this.expect("(") && this.next();
	      result = this.read_lexical_var_list();
	      this.expect(")") && this.next();
	    }

	    return result;
	  },
	  read_list_with_dangling_comma: function read_list_with_dangling_comma(item) {
	    var result = [];

	    while (this.token != this.EOF) {
	      result.push(item());

	      if (this.token == ",") {
	        this.next();

	        if (this.version >= 800 && this.token === ")") {
	          return result;
	        }
	      } else if (this.token == ")") {
	        break;
	      } else {
	        this.error([",", ")"]);
	        break;
	      }
	    }

	    return result;
	  },
	  read_lexical_var_list: function read_lexical_var_list() {
	    return this.read_list_with_dangling_comma(this.read_lexical_var.bind(this));
	  },

	  /*
	   * ```ebnf
	   * lexical_var ::= '&'? T_VARIABLE
	   * ```
	   */
	  read_lexical_var: function read_lexical_var() {
	    if (this.token === "&") {
	      return this.read_byref(this.read_lexical_var.bind(this));
	    }

	    var result = this.node("variable");
	    this.expect(this.tok.T_VARIABLE);
	    var name = this.text().substring(1);
	    this.next();
	    return result(name, false);
	  },

	  /*
	   * reads a list of parameters
	   * ```ebnf
	   *  parameter_list ::= (parameter ',')* parameter?
	   * ```
	   */
	  read_parameter_list: function read_parameter_list(is_class_constructor) {
	    if (this.token !== ")") {
	      var wasVariadic = false;
	      return this.read_list_with_dangling_comma(function () {
	        var parameter = this.read_parameter(is_class_constructor);

	        if (parameter) {
	          // variadic parameters can only be defined at the end of the parameter list
	          if (wasVariadic) {
	            this.raiseError("Unexpected parameter after a variadic parameter");
	          }

	          if (parameter.variadic) {
	            wasVariadic = true;
	          }
	        }

	        return parameter;
	      }.bind(this), ",");
	    }

	    return [];
	  },

	  /*
	   * ```ebnf
	   *  parameter ::= type? '&'? T_ELLIPSIS? T_VARIABLE ('=' expr)?
	   * ```
	   * @see https://github.com/php/php-src/blob/493524454d66adde84e00d249d607ecd540de99f/Zend/zend_language_parser.y#L640
	   */
	  read_parameter: function read_parameter(is_class_constructor) {
	    var node = this.node("parameter");
	    var parameterName = null;
	    var value = null;
	    var types = null;
	    var nullable = false;
	    var readonly = false;
	    var attrs = [];
	    if (this.token === this.tok.T_ATTRIBUTE) attrs = this.read_attr_list();

	    if (this.version >= 801 && this.token === this.tok.T_READ_ONLY) {
	      if (is_class_constructor) {
	        this.next();
	        readonly = true;
	      } else {
	        this.raiseError("readonly properties can be used only on class constructor");
	      }
	    }

	    var flags = this.read_promoted();

	    if (!readonly && this.version >= 801 && this.token === this.tok.T_READ_ONLY) {
	      if (is_class_constructor) {
	        this.next();
	        readonly = true;
	      } else {
	        this.raiseError("readonly properties can be used only on class constructor");
	      }
	    }

	    if (this.token === "?") {
	      this.next();
	      nullable = true;
	    }

	    types = this.read_types();

	    if (nullable && !types) {
	      this.raiseError("Expecting a type definition combined with nullable operator");
	    }

	    var isRef = this.is_reference();
	    var isVariadic = this.is_variadic();

	    if (this.expect(this.tok.T_VARIABLE)) {
	      parameterName = this.node("identifier");
	      var name = this.text().substring(1);
	      this.next();
	      parameterName = parameterName(name);
	    }

	    if (this.token == "=") {
	      value = this.next().read_expr();
	    }

	    var result = node(parameterName, types, value, isRef, isVariadic, readonly, nullable, flags);
	    if (attrs) result.attrGroups = attrs;
	    return result;
	  },
	  read_types: function read_types() {
	    var MODE_UNSET = "unset";
	    var MODE_UNION = "union";
	    var MODE_INTERSECTION = "intersection";
	    var types = [];
	    var mode = MODE_UNSET;
	    var type = this.read_type();
	    if (!type) return null; // we have matched a single type

	    types.push(type); // is the current token a:
	    // - | for union type
	    // - & for intersection type (> php 8.1)

	    while (this.token === "|" || this.version >= 801 && this.token === "&") {
	      var nextToken = this.peek();

	      if (nextToken === this.tok.T_ELLIPSIS || nextToken === this.tok.T_VARIABLE) {
	        // the next token is part of the variable (or the variable itself),
	        // we're not gonna match anymore types
	        break;
	      }

	      if (mode === MODE_UNSET) {
	        // are we in union or intersection "mode"
	        mode = this.token === "|" ? MODE_UNION : MODE_INTERSECTION;
	      } else {
	        // it is not possible to mix "modes"
	        if (mode === MODE_UNION && this.token !== "|" || mode === MODE_INTERSECTION && this.token !== "&") {
	          this.raiseError('Unexpect token "' + this.token + '", "|" and "&" can not be mixed');
	        }
	      }

	      this.next();
	      types.push(this.read_type());
	    }

	    if (types.length === 1) {
	      return types[0];
	    } else {
	      return mode === MODE_INTERSECTION ? this.node("intersectiontype")(types) : this.node("uniontype")(types);
	    }
	  },
	  read_promoted: function read_promoted() {
	    var MODIFIER_PUBLIC = 1;
	    var MODIFIER_PROTECTED = 2;
	    var MODIFIER_PRIVATE = 4;

	    if (this.token === this.tok.T_PUBLIC) {
	      this.next();
	      return MODIFIER_PUBLIC;
	    } else if (this.token === this.tok.T_PROTECTED) {
	      this.next();
	      return MODIFIER_PROTECTED;
	    } else if (this.token === this.tok.T_PRIVATE) {
	      this.next();
	      return MODIFIER_PRIVATE;
	    }

	    return 0;
	  },

	  /*
	   * Reads a list of arguments
	   * ```ebnf
	   *  function_argument_list ::= '(' (argument_list (',' argument_list)*)? ')'
	   * ```
	   */
	  read_argument_list: function read_argument_list() {
	    var result = [];
	    this.expect("(") && this.next();

	    if (this.version >= 801 && this.token === this.tok.T_ELLIPSIS && this.peek() === ")") {
	      result.push(this.node("variadicplaceholder")());
	      this.next();
	    } else if (this.token !== ")") {
	      result = this.read_non_empty_argument_list();
	    }

	    this.expect(")") && this.next();
	    return result;
	  },

	  /*
	   * Reads non empty argument list
	   */
	  read_non_empty_argument_list: function read_non_empty_argument_list() {
	    var wasVariadic = false;
	    return this.read_function_list(function () {
	      var argument = this.read_argument();

	      if (argument) {
	        var isVariadic = argument.kind === "variadic"; // variadic arguments can only be followed by other variadic arguments

	        if (wasVariadic && !isVariadic) {
	          this.raiseError("Unexpected non-variadic argument after a variadic argument");
	        }

	        if (isVariadic) {
	          wasVariadic = true;
	        }
	      }

	      return argument;
	    }.bind(this), ",");
	  },

	  /*
	   * ```ebnf
	   *    argument_list ::= T_STRING ':' expr | T_ELLIPSIS? expr
	   * ```
	   */
	  read_argument: function read_argument() {
	    if (this.token === this.tok.T_ELLIPSIS) {
	      return this.node("variadic")(this.next().read_expr());
	    }

	    if (this.token === this.tok.T_STRING || Object.values(this.lexer.keywords).includes(this.token)) {
	      var nextToken = this.peek();

	      if (nextToken === ":") {
	        if (this.version < 800) {
	          this.raiseError("PHP 8+ is required to use named arguments");
	        }

	        return this.node("namedargument")(this.text(), this.next().next().read_expr());
	      }
	    }

	    return this.read_expr();
	  },

	  /*
	   * read type hinting
	   * ```ebnf
	   *  type ::= T_ARRAY | T_CALLABLE | namespace_name
	   * ```
	   */
	  read_type: function read_type() {
	    var result = this.node();

	    if (this.token === this.tok.T_ARRAY || this.token === this.tok.T_CALLABLE) {
	      var type = this.text();
	      this.next();
	      return result("typereference", type.toLowerCase(), type);
	    } else if (this.token === this.tok.T_NAME_RELATIVE || this.token === this.tok.T_NAME_QUALIFIED || this.token === this.tok.T_NAME_FULLY_QUALIFIED || this.token === this.tok.T_STRING || this.token === this.tok.T_STATIC) {
	      var _type = this.text();

	      var backup = [this.token, this.lexer.getState()];
	      this.next();

	      if (this.token !== this.tok.T_NS_SEPARATOR && this.ast.typereference.types.indexOf(_type.toLowerCase()) > -1) {
	        return result("typereference", _type.toLowerCase(), _type);
	      } else {
	        // rollback a classic namespace
	        this.lexer.tokens.push(backup);
	        this.next(); // fix : destroy not consumed node (release comments)

	        result.destroy();
	        return this.read_namespace_name();
	      }
	    } // fix : destroy not consumed node (release comments)


	    result.destroy();
	    return null;
	  }
	};

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var _if$1 = {
	  /*
	   * Reads an IF statement
	   *
	   * ```ebnf
	   *  if ::= T_IF '(' expr ')' ':' ...
	   * ```
	   */
	  read_if: function read_if() {
	    var result = this.node("if");
	    var test = this.next().read_if_expr();
	    var body = null;
	    var alternate = null;
	    var shortForm = false;

	    if (this.token === ":") {
	      shortForm = true;
	      this.next();
	      body = this.node("block");
	      var items = [];

	      while (this.token !== this.EOF && this.token !== this.tok.T_ENDIF) {
	        if (this.token === this.tok.T_ELSEIF) {
	          alternate = this.read_elseif_short();
	          break;
	        } else if (this.token === this.tok.T_ELSE) {
	          alternate = this.read_else_short();
	          break;
	        }

	        items.push(this.read_inner_statement());
	      }

	      body = body(null, items);
	      this.expect(this.tok.T_ENDIF) && this.next();
	      this.expectEndOfStatement();
	    } else {
	      body = this.read_statement();

	      if (this.token === this.tok.T_ELSEIF) {
	        alternate = this.read_if();
	      } else if (this.token === this.tok.T_ELSE) {
	        alternate = this.next().read_statement();
	      }
	    }

	    return result(test, body, alternate, shortForm);
	  },

	  /*
	   * reads an if expression : '(' expr ')'
	   */
	  read_if_expr: function read_if_expr() {
	    this.expect("(") && this.next();
	    var result = this.read_expr();
	    this.expect(")") && this.next();
	    return result;
	  },

	  /*
	   * reads an elseif (expr): statements
	   */
	  read_elseif_short: function read_elseif_short() {
	    var alternate = null;
	    var result = this.node("if");
	    var test = this.next().read_if_expr();
	    if (this.expect(":")) this.next();
	    var body = this.node("block");
	    var items = [];

	    while (this.token != this.EOF && this.token !== this.tok.T_ENDIF) {
	      if (this.token === this.tok.T_ELSEIF) {
	        alternate = this.read_elseif_short();
	        break;
	      } else if (this.token === this.tok.T_ELSE) {
	        alternate = this.read_else_short();
	        break;
	      }

	      items.push(this.read_inner_statement());
	    }

	    return result(test, body(null, items), alternate, true);
	  },

	  /*
	   *
	   */
	  read_else_short: function read_else_short() {
	    if (this.next().expect(":")) this.next();
	    var body = this.node("block");
	    var items = [];

	    while (this.token != this.EOF && this.token !== this.tok.T_ENDIF) {
	      items.push(this.read_inner_statement());
	    }

	    return body(null, items);
	  }
	};

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var loops = {
	  /*
	   * Reads a while statement
	   * ```ebnf
	   * while ::= T_WHILE (statement | ':' inner_statement_list T_ENDWHILE ';')
	   * ```
	   * @see https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L587
	   * @return {While}
	   */
	  read_while: function read_while() {
	    var result = this.node("while");
	    this.expect(this.tok.T_WHILE) && this.next();
	    var test = null;
	    var body = null;
	    var shortForm = false;
	    if (this.expect("(")) this.next();
	    test = this.read_expr();
	    if (this.expect(")")) this.next();

	    if (this.token === ":") {
	      shortForm = true;
	      body = this.read_short_form(this.tok.T_ENDWHILE);
	    } else {
	      body = this.read_statement();
	    }

	    return result(test, body, shortForm);
	  },

	  /*
	   * Reads a do / while loop
	   * ```ebnf
	   * do ::= T_DO statement T_WHILE '(' expr ')' ';'
	   * ```
	   * @see https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L423
	   * @return {Do}
	   */
	  read_do: function read_do() {
	    var result = this.node("do");
	    this.expect(this.tok.T_DO) && this.next();
	    var test = null;
	    var body = null;
	    body = this.read_statement();

	    if (this.expect(this.tok.T_WHILE)) {
	      if (this.next().expect("(")) this.next();
	      test = this.read_expr();
	      if (this.expect(")")) this.next();
	      if (this.expect(";")) this.next();
	    }

	    return result(test, body);
	  },

	  /*
	   * Read a for incremental loop
	   * ```ebnf
	   * for ::= T_FOR '(' for_exprs ';' for_exprs ';' for_exprs ')' for_statement
	   * for_statement ::= statement | ':' inner_statement_list T_ENDFOR ';'
	   * for_exprs ::= expr? (',' expr)*
	   * ```
	   * @see https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L425
	   * @return {For}
	   */
	  read_for: function read_for() {
	    var result = this.node("for");
	    this.expect(this.tok.T_FOR) && this.next();
	    var init = [];
	    var test = [];
	    var increment = [];
	    var body = null;
	    var shortForm = false;
	    if (this.expect("(")) this.next();

	    if (this.token !== ";") {
	      init = this.read_list(this.read_expr, ",");
	      if (this.expect(";")) this.next();
	    } else {
	      this.next();
	    }

	    if (this.token !== ";") {
	      test = this.read_list(this.read_expr, ",");
	      if (this.expect(";")) this.next();
	    } else {
	      this.next();
	    }

	    if (this.token !== ")") {
	      increment = this.read_list(this.read_expr, ",");
	      if (this.expect(")")) this.next();
	    } else {
	      this.next();
	    }

	    if (this.token === ":") {
	      shortForm = true;
	      body = this.read_short_form(this.tok.T_ENDFOR);
	    } else {
	      body = this.read_statement();
	    }

	    return result(init, test, increment, body, shortForm);
	  },

	  /*
	   * Reads a foreach loop
	   * ```ebnf
	   * foreach ::= '(' expr T_AS foreach_variable (T_DOUBLE_ARROW foreach_variable)? ')' statement
	   * ```
	   * @see https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L438
	   * @return {Foreach}
	   */
	  read_foreach: function read_foreach() {
	    var result = this.node("foreach");
	    this.expect(this.tok.T_FOREACH) && this.next();
	    var source = null;
	    var key = null;
	    var value = null;
	    var body = null;
	    var shortForm = false;
	    if (this.expect("(")) this.next();
	    source = this.read_expr();

	    if (this.expect(this.tok.T_AS)) {
	      this.next();
	      value = this.read_foreach_variable();

	      if (this.token === this.tok.T_DOUBLE_ARROW) {
	        key = value;
	        value = this.next().read_foreach_variable();
	      }
	    } // grammatically correct but not supported by PHP


	    if (key && key.kind === "list") {
	      this.raiseError("Fatal Error : Cannot use list as key element");
	    }

	    if (this.expect(")")) this.next();

	    if (this.token === ":") {
	      shortForm = true;
	      body = this.read_short_form(this.tok.T_ENDFOREACH);
	    } else {
	      body = this.read_statement();
	    }

	    return result(source, key, value, body, shortForm);
	  },

	  /*
	   * Reads a foreach variable statement
	   * ```ebnf
	   * foreach_variable =
	   *    variable |
	   *    '&' variable |
	   *    T_LIST '(' assignment_list ')' |
	   *    '[' assignment_list ']'
	   * ```
	   * @see https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L544
	   * @return {Expression}
	   */
	  read_foreach_variable: function read_foreach_variable() {
	    if (this.token === this.tok.T_LIST || this.token === "[") {
	      var isShort = this.token === "[";
	      var result = this.node("list");
	      this.next();
	      if (!isShort && this.expect("(")) this.next();
	      var assignList = this.read_array_pair_list(isShort);
	      if (this.expect(isShort ? "]" : ")")) this.next();
	      return result(assignList, isShort);
	    } else {
	      return this.read_variable(false, false);
	    }
	  }
	};

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var main = {
	  /*
	   * ```ebnf
	   * start ::= (namespace | top_statement)*
	   * ```
	   */
	  read_start: function read_start() {
	    if (this.token == this.tok.T_NAMESPACE) {
	      return this.read_namespace();
	    } else {
	      return this.read_top_statement();
	    }
	  }
	};

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var namespace$1 = {
	  /*
	   * Reads a namespace declaration block
	   * ```ebnf
	   * namespace ::= T_NAMESPACE namespace_name? '{'
	   *    top_statements
	   * '}'
	   * | T_NAMESPACE namespace_name ';' top_statements
	   * ```
	   * @see http://php.net/manual/en/language.namespaces.php
	   * @return {Namespace}
	   */
	  read_namespace: function read_namespace() {
	    var result = this.node("namespace");
	    var body;
	    this.expect(this.tok.T_NAMESPACE) && this.next();
	    var name;

	    if (this.token === "{") {
	      name = {
	        name: [""]
	      };
	    } else {
	      name = this.read_namespace_name();
	    }

	    this.currentNamespace = name;

	    if (this.token === ";") {
	      this.currentNamespace = name;
	      body = this.next().read_top_statements();
	      this.expect(this.EOF);
	      return result(name.name, body, false);
	    } else if (this.token === "{") {
	      this.currentNamespace = name;
	      body = this.next().read_top_statements();
	      this.expect("}") && this.next();

	      if (body.length === 0 && this.extractDoc && this._docs.length > this._docIndex) {
	        body.push(this.node("noop")());
	      }

	      return result(name.name, body, true);
	    } else {
	      this.error(["{", ";"]); // graceful mode :

	      this.currentNamespace = name;
	      body = this.read_top_statements();
	      this.expect(this.EOF);
	      return result(name, body, false);
	    }
	  },

	  /*
	   * Reads a namespace name
	   * ```ebnf
	   *  namespace_name ::= T_NS_SEPARATOR? (T_STRING T_NS_SEPARATOR)* T_STRING
	   * ```
	   * @see http://php.net/manual/en/language.namespaces.rules.php
	   * @return {Reference}
	   */
	  read_namespace_name: function read_namespace_name(resolveReference) {
	    var result = this.node();
	    var resolution;
	    var name = this.text();

	    switch (this.token) {
	      case this.tok.T_NAME_RELATIVE:
	        resolution = this.ast.name.RELATIVE_NAME;
	        name = name.replace(/^namespace\\/, "");
	        break;

	      case this.tok.T_NAME_QUALIFIED:
	        resolution = this.ast.name.QUALIFIED_NAME;
	        break;

	      case this.tok.T_NAME_FULLY_QUALIFIED:
	        resolution = this.ast.name.FULL_QUALIFIED_NAME;
	        break;

	      default:
	        resolution = this.ast.name.UNQUALIFIED_NAME;

	        if (!this.expect(this.tok.T_STRING)) {
	          // graceful mode
	          return result("name", "", this.ast.name.FULL_QUALIFIED_NAME);
	        }

	    }

	    this.next();

	    if (resolveReference || this.token !== "(") {
	      if (name.toLowerCase() === "parent") {
	        return result("parentreference", name);
	      } else if (name.toLowerCase() === "self") {
	        return result("selfreference", name);
	      }
	    }

	    return result("name", name, resolution);
	  },

	  /*
	   * Reads a use statement
	   * ```ebnf
	   * use_statement ::= T_USE
	   *   use_type? use_declarations |
	   *   use_type use_statement '{' use_declarations '}' |
	   *   use_statement '{' use_declarations(=>typed) '}'
	   * ';'
	   * ```
	   * @see http://php.net/manual/en/language.namespaces.importing.php
	   * @return {UseGroup}
	   */
	  read_use_statement: function read_use_statement() {
	    var result = this.node("usegroup");
	    var items = [];
	    var name = null;
	    this.expect(this.tok.T_USE) && this.next();
	    var type = this.read_use_type();
	    items.push(this.read_use_declaration(false));

	    if (this.token === ",") {
	      items = items.concat(this.next().read_use_declarations(false));
	    } else if (this.token === "{") {
	      name = items[0].name;
	      items = this.next().read_use_declarations(type === null);
	      this.expect("}") && this.next();
	    }

	    result = result(name, type, items);
	    this.expect(";") && this.next();
	    return result;
	  },

	  /*
	   *
	   * @see https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L1045
	   */
	  read_class_name_reference: function read_class_name_reference() {
	    // resolved as the same
	    return this.read_variable(true, false);
	  },

	  /*
	   * Reads a use declaration
	   * ```ebnf
	   * use_declaration ::= use_type? namespace_name use_alias
	   * ```
	   * @see https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L380
	   * @return {UseItem}
	   */
	  read_use_declaration: function read_use_declaration(typed) {
	    var result = this.node("useitem");
	    var type = null;
	    if (typed) type = this.read_use_type();
	    var name = this.read_namespace_name();
	    var alias = this.read_use_alias();
	    return result(name.name, alias, type);
	  },

	  /*
	   * Reads a list of use declarations
	   * ```ebnf
	   * use_declarations ::= use_declaration (',' use_declaration)*
	   * ```
	   * @see https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L380
	   * @return {UseItem[]}
	   */
	  read_use_declarations: function read_use_declarations(typed) {
	    var result = [this.read_use_declaration(typed)];

	    while (this.token === ",") {
	      this.next();

	      if (typed) {
	        if (this.token !== this.tok.T_NAME_RELATIVE && this.token !== this.tok.T_NAME_QUALIFIED && this.token !== this.tok.T_NAME_FULLY_QUALIFIED && this.token !== this.tok.T_FUNCTION && this.token !== this.tok.T_CONST && this.token !== this.tok.T_STRING) {
	          break;
	        }
	      } else if (this.token !== this.tok.T_NAME_RELATIVE && this.token !== this.tok.T_NAME_QUALIFIED && this.token !== this.tok.T_NAME_FULLY_QUALIFIED && this.token !== this.tok.T_STRING && this.token !== this.tok.T_NS_SEPARATOR) {
	        break;
	      }

	      result.push(this.read_use_declaration(typed));
	    }

	    return result;
	  },

	  /*
	   * Reads a use statement
	   * ```ebnf
	   * use_alias ::= (T_AS T_STRING)?
	   * ```
	   * @return {String|null}
	   */
	  read_use_alias: function read_use_alias() {
	    var result = null;

	    if (this.token === this.tok.T_AS) {
	      if (this.next().expect(this.tok.T_STRING)) {
	        var aliasName = this.node("identifier");
	        var name = this.text();
	        this.next();
	        result = aliasName(name);
	      }
	    }

	    return result;
	  },

	  /*
	   * Reads the namespace type declaration
	   * ```ebnf
	   * use_type ::= (T_FUNCTION | T_CONST)?
	   * ```
	   * @see https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L335
	   * @return {String|null} Possible values : function, const
	   */
	  read_use_type: function read_use_type() {
	    if (this.token === this.tok.T_FUNCTION) {
	      this.next();
	      return this.ast.useitem.TYPE_FUNCTION;
	    } else if (this.token === this.tok.T_CONST) {
	      this.next();
	      return this.ast.useitem.TYPE_CONST;
	    }

	    return null;
	  }
	};

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var specialChar = {
	  "\\": "\\",
	  $: "$",
	  n: "\n",
	  r: "\r",
	  t: "\t",
	  f: String.fromCharCode(12),
	  v: String.fromCharCode(11),
	  e: String.fromCharCode(27)
	};
	var scalar = {
	  /*
	   * Unescape special chars
	   */
	  resolve_special_chars: function resolve_special_chars(text, doubleQuote) {
	    if (!doubleQuote) {
	      // single quote fix
	      return text.replace(/\\\\/g, "\\").replace(/\\'/g, "'");
	    }

	    return text.replace(/\\"/, '"').replace(/\\([\\$nrtfve]|[xX][0-9a-fA-F]{1,2}|[0-7]{1,3}|u{([0-9a-fA-F]+)})/g, function ($match, p1, p2) {
	      if (specialChar[p1]) {
	        return specialChar[p1];
	      } else if ("x" === p1[0] || "X" === p1[0]) {
	        return String.fromCodePoint(parseInt(p1.substr(1), 16));
	      } else if ("u" === p1[0]) {
	        return String.fromCodePoint(parseInt(p2, 16));
	      } else {
	        return String.fromCodePoint(parseInt(p1, 8));
	      }
	    });
	  },

	  /*
	   * Remove all leading spaces each line for heredoc text if there is a indentation
	   * @param {string} text
	   * @param {number} indentation
	   * @param {boolean} indentation_uses_spaces
	   * @param {boolean} first_encaps_node if it is behind a variable, the first N spaces should not be removed
	   */
	  remove_heredoc_leading_whitespace_chars: function remove_heredoc_leading_whitespace_chars(text, indentation, indentation_uses_spaces, first_encaps_node) {
	    if (indentation === 0) {
	      return text;
	    }

	    this.check_heredoc_indentation_level(text, indentation, indentation_uses_spaces, first_encaps_node);
	    var matchedChar = indentation_uses_spaces ? " " : "\t";
	    var removementRegExp = new RegExp("\\n".concat(matchedChar, "{").concat(indentation, "}"), "g");
	    var removementFirstEncapsNodeRegExp = new RegExp("^".concat(matchedChar, "{").concat(indentation, "}")); // Rough replace, need more check

	    if (first_encaps_node) {
	      // Remove text leading whitespace
	      text = text.replace(removementFirstEncapsNodeRegExp, "");
	    } // Remove leading whitespace after \n


	    return text.replace(removementRegExp, "\n");
	  },

	  /*
	   * Check indentation level of heredoc in text, if mismatch, raiseError
	   * @param {string} text
	   * @param {number} indentation
	   * @param {boolean} indentation_uses_spaces
	   * @param {boolean} first_encaps_node if it is behind a variable, the first N spaces should not be removed
	   */
	  check_heredoc_indentation_level: function check_heredoc_indentation_level(text, indentation, indentation_uses_spaces, first_encaps_node) {
	    var textSize = text.length;
	    var offset = 0;
	    var leadingWhitespaceCharCount = 0;
	    /*
	     * @var inCoutingState {boolean} reset to true after a new line
	     * @private
	     */

	    var inCoutingState = true;
	    var chToCheck = indentation_uses_spaces ? " " : "\t";
	    var inCheckState = false;

	    if (!first_encaps_node) {
	      // start from first \n
	      offset = text.indexOf("\n"); // if no \n, just return

	      if (offset === -1) {
	        return;
	      }

	      offset++;
	    }

	    while (offset < textSize) {
	      if (inCoutingState) {
	        if (text[offset] === chToCheck) {
	          leadingWhitespaceCharCount++;
	        } else {
	          inCheckState = true;
	        }
	      } else {
	        inCoutingState = false;
	      }

	      if (text[offset] !== "\n" && inCheckState && leadingWhitespaceCharCount < indentation) {
	        this.raiseError("Invalid body indentation level (expecting an indentation at least ".concat(indentation, ")"));
	      } else {
	        inCheckState = false;
	      }

	      if (text[offset] === "\n") {
	        // Reset counting state
	        inCoutingState = true;
	        leadingWhitespaceCharCount = 0;
	      }

	      offset++;
	    }
	  },

	  /*
	   * Reads dereferencable scalar
	   */
	  read_dereferencable_scalar: function read_dereferencable_scalar() {
	    var result = null;

	    switch (this.token) {
	      case this.tok.T_CONSTANT_ENCAPSED_STRING:
	        {
	          var value = this.node("string");
	          var text = this.text();
	          var offset = 0;

	          if (text[0] === "b" || text[0] === "B") {
	            offset = 1;
	          }

	          var isDoubleQuote = text[offset] === '"';
	          this.next();
	          var textValue = this.resolve_special_chars(text.substring(offset + 1, text.length - 1), isDoubleQuote);
	          value = value(isDoubleQuote, textValue, offset === 1, // unicode flag
	          text);

	          if (this.token === this.tok.T_DOUBLE_COLON) {
	            // https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L1151
	            result = this.read_static_getter(value);
	          } else {
	            // dirrect string
	            result = value;
	          }
	        }
	        break;

	      case this.tok.T_ARRAY:
	        // array parser
	        result = this.read_array();
	        break;

	      case "[":
	        // short array format
	        result = this.read_array();
	        break;
	    }

	    return result;
	  },

	  /*
	   * ```ebnf
	   *  scalar ::= T_MAGIC_CONST
	   *       | T_LNUMBER | T_DNUMBER
	   *       | T_START_HEREDOC T_ENCAPSED_AND_WHITESPACE? T_END_HEREDOC
	   *       | '"' encaps_list '"'
	   *       | T_START_HEREDOC encaps_list T_END_HEREDOC
	   *       | namespace_name (T_DOUBLE_COLON T_STRING)?
	   * ```
	   */
	  read_scalar: function read_scalar() {
	    if (this.is("T_MAGIC_CONST")) {
	      return this.get_magic_constant();
	    } else {
	      var value, node;

	      switch (this.token) {
	        // NUMERIC
	        case this.tok.T_LNUMBER: // long

	        case this.tok.T_DNUMBER:
	          {
	            // double
	            var result = this.node("number");
	            value = this.text();
	            this.next();
	            return result(value, null);
	          }

	        case this.tok.T_START_HEREDOC:
	          if (this.lexer.curCondition === "ST_NOWDOC") {
	            var start = this.lexer.yylloc.first_offset;
	            node = this.node("nowdoc");
	            value = this.next().text(); // strip the last line return char

	            if (this.lexer.heredoc_label.indentation > 0) {
	              value = value.substring(0, value.length - this.lexer.heredoc_label.indentation);
	            }

	            var lastCh = value[value.length - 1];

	            if (lastCh === "\n") {
	              if (value[value.length - 2] === "\r") {
	                // windows style
	                value = value.substring(0, value.length - 2);
	              } else {
	                // linux style
	                value = value.substring(0, value.length - 1);
	              }
	            } else if (lastCh === "\r") {
	              // mac style
	              value = value.substring(0, value.length - 1);
	            }

	            this.expect(this.tok.T_ENCAPSED_AND_WHITESPACE) && this.next();
	            this.expect(this.tok.T_END_HEREDOC) && this.next();

	            var raw = this.lexer._input.substring(start, this.lexer.yylloc.first_offset);

	            node = node(this.remove_heredoc_leading_whitespace_chars(value, this.lexer.heredoc_label.indentation, this.lexer.heredoc_label.indentation_uses_spaces, this.lexer.heredoc_label.first_encaps_node), raw, this.lexer.heredoc_label.label);
	            this.lexer.heredoc_label.finished = true;
	            return node;
	          } else {
	            return this.read_encapsed_string(this.tok.T_END_HEREDOC);
	          }

	        case '"':
	          return this.read_encapsed_string('"');

	        case 'b"':
	        case 'B"':
	          {
	            return this.read_encapsed_string('"', true);
	          }
	        // TEXTS

	        case this.tok.T_CONSTANT_ENCAPSED_STRING:
	        case this.tok.T_ARRAY: // array parser

	        case "[":
	          // short array format
	          return this.read_dereferencable_scalar();

	        default:
	          {
	            var err = this.error("SCALAR"); // graceful mode : ignore token & return error node

	            this.next();
	            return err;
	          }
	      }
	    }
	  },

	  /*
	   * Handles the dereferencing
	   */
	  read_dereferencable: function read_dereferencable(expr) {
	    var result, offset;
	    var node = this.node("offsetlookup");

	    if (this.token === "[") {
	      offset = this.next().read_expr();
	      if (this.expect("]")) this.next();
	      result = node(expr, offset);
	    } else if (this.token === this.tok.T_DOLLAR_OPEN_CURLY_BRACES) {
	      offset = this.read_encapsed_string_item(false);
	      result = node(expr, offset);
	    }

	    return result;
	  },

	  /*
	   * Reads and extracts an encapsed item
	   * ```ebnf
	   * encapsed_string_item ::= T_ENCAPSED_AND_WHITESPACE
	   *  | T_DOLLAR_OPEN_CURLY_BRACES expr '}'
	   *  | T_DOLLAR_OPEN_CURLY_BRACES T_STRING_VARNAME '}'
	   *  | T_DOLLAR_OPEN_CURLY_BRACES T_STRING_VARNAME '[' expr ']' '}'
	   *  | T_CURLY_OPEN variable '}'
	   *  | variable
	   *  | variable '[' expr ']'
	   *  | variable T_OBJECT_OPERATOR T_STRING
	   * ```
	   * @return {String|Variable|Expr|Lookup}
	   * @see https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L1219
	   */
	  read_encapsed_string_item: function read_encapsed_string_item(isDoubleQuote) {
	    var encapsedPart = this.node("encapsedpart");
	    var syntax = null;
	    var curly = false;
	    var result = this.node(),
	        offset,
	        node,
	        name; // plain text
	    // https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L1222

	    if (this.token === this.tok.T_ENCAPSED_AND_WHITESPACE) {
	      var text = this.text();
	      this.next(); // if this.lexer.heredoc_label.first_encaps_node -> remove first indents

	      result = result("string", false, this.version >= 703 && !this.lexer.heredoc_label.finished ? this.remove_heredoc_leading_whitespace_chars(this.resolve_special_chars(text, isDoubleQuote), this.lexer.heredoc_label.indentation, this.lexer.heredoc_label.indentation_uses_spaces, this.lexer.heredoc_label.first_encaps_node) : text, false, text);
	    } else if (this.token === this.tok.T_DOLLAR_OPEN_CURLY_BRACES) {
	      syntax = "simple";
	      curly = true; // dynamic variable name
	      // https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L1239

	      name = null;

	      if (this.next().token === this.tok.T_STRING_VARNAME) {
	        name = this.node("variable");
	        var varName = this.text();
	        this.next(); // check if lookup an offset
	        // https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L1243

	        result.destroy();

	        if (this.token === "[") {
	          name = name(varName, false);
	          node = this.node("offsetlookup");
	          offset = this.next().read_expr();
	          this.expect("]") && this.next();
	          result = node(name, offset);
	        } else {
	          result = name(varName, false);
	        }
	      } else {
	        result = result("variable", this.read_expr(), false);
	      }

	      this.expect("}") && this.next();
	    } else if (this.token === this.tok.T_CURLY_OPEN) {
	      // expression
	      // https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L1246
	      syntax = "complex";
	      result.destroy();
	      result = this.next().read_variable(false, false);
	      this.expect("}") && this.next();
	    } else if (this.token === this.tok.T_VARIABLE) {
	      syntax = "simple"; // plain variable
	      // https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L1231

	      result.destroy();
	      result = this.read_simple_variable(); // https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L1233

	      if (this.token === "[") {
	        node = this.node("offsetlookup");
	        offset = this.next().read_encaps_var_offset();
	        this.expect("]") && this.next();
	        result = node(result, offset);
	      } // https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L1236


	      if (this.token === this.tok.T_OBJECT_OPERATOR) {
	        node = this.node("propertylookup");
	        this.next().expect(this.tok.T_STRING);
	        var what = this.node("identifier");
	        name = this.text();
	        this.next();
	        result = node(result, what(name));
	      } // error / fallback

	    } else {
	      this.expect(this.tok.T_ENCAPSED_AND_WHITESPACE);
	      var value = this.text();
	      this.next(); // consider it as string

	      result.destroy();
	      result = result("string", false, value, false, value);
	    } // reset first_encaps_node to false after access any node


	    this.lexer.heredoc_label.first_encaps_node = false;
	    return encapsedPart(result, syntax, curly);
	  },

	  /*
	   * Reads an encapsed string
	   */
	  read_encapsed_string: function read_encapsed_string(expect) {
	    var isBinary = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	    var labelStart = this.lexer.yylloc.first_offset;
	    var node = this.node("encapsed");
	    this.next();
	    var start = this.lexer.yylloc.prev_offset - (isBinary ? 1 : 0);
	    var value = [];
	    var type = null;

	    if (expect === "`") {
	      type = this.ast.encapsed.TYPE_SHELL;
	    } else if (expect === '"') {
	      type = this.ast.encapsed.TYPE_STRING;
	    } else {
	      type = this.ast.encapsed.TYPE_HEREDOC;
	    } // reading encapsed parts


	    while (this.token !== expect && this.token !== this.EOF) {
	      value.push(this.read_encapsed_string_item(true));
	    }

	    if (value.length > 0 && value[value.length - 1].kind === "encapsedpart" && value[value.length - 1].expression.kind === "string") {
	      var _node = value[value.length - 1].expression;
	      var lastCh = _node.value[_node.value.length - 1];

	      if (lastCh === "\n") {
	        if (_node.value[_node.value.length - 2] === "\r") {
	          // windows style
	          _node.value = _node.value.substring(0, _node.value.length - 2);
	        } else {
	          // linux style
	          _node.value = _node.value.substring(0, _node.value.length - 1);
	        }
	      } else if (lastCh === "\r") {
	        // mac style
	        _node.value = _node.value.substring(0, _node.value.length - 1);
	      }
	    }

	    this.expect(expect) && this.next();

	    var raw = this.lexer._input.substring(type === "heredoc" ? labelStart : start - 1, this.lexer.yylloc.first_offset);

	    node = node(value, raw, type);

	    if (expect === this.tok.T_END_HEREDOC) {
	      node.label = this.lexer.heredoc_label.label;
	      this.lexer.heredoc_label.finished = true;
	    }

	    return node;
	  },

	  /*
	   * Constant token
	   */
	  get_magic_constant: function get_magic_constant() {
	    var result = this.node("magic");
	    var name = this.text();
	    this.next();
	    return result(name.toUpperCase(), name);
	  }
	};

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var statement$1 = {
	  /*
	   * reading a list of top statements (helper for top_statement*)
	   * ```ebnf
	   *  top_statements ::= top_statement*
	   * ```
	   */
	  read_top_statements: function read_top_statements() {
	    var result = [];

	    while (this.token !== this.EOF && this.token !== "}") {
	      var _statement = this.read_top_statement();

	      if (_statement) {
	        if (Array.isArray(_statement)) {
	          result = result.concat(_statement);
	        } else {
	          result.push(_statement);
	        }
	      }
	    }

	    return result;
	  },

	  /*
	   * reading a top statement
	   * ```ebnf
	   *  top_statement ::=
	   *       namespace | function | class
	   *       | interface | trait
	   *       | use_statements | const_list
	   *       | statement
	   * ```
	   */
	  read_top_statement: function read_top_statement() {
	    var attrs = [];

	    if (this.token === this.tok.T_ATTRIBUTE) {
	      attrs = this.read_attr_list();
	    }

	    switch (this.token) {
	      case this.tok.T_FUNCTION:
	        return this.read_function(false, false, attrs);
	      // optional flags

	      case this.tok.T_ABSTRACT:
	      case this.tok.T_FINAL:
	      case this.tok.T_READ_ONLY:
	      case this.tok.T_CLASS:
	        return this.read_class_declaration_statement(attrs);

	      case this.tok.T_INTERFACE:
	        return this.read_interface_declaration_statement(attrs);

	      case this.tok.T_TRAIT:
	        return this.read_trait_declaration_statement();

	      case this.tok.T_ENUM:
	        return this.read_enum_declaration_statement(attrs);

	      case this.tok.T_USE:
	        return this.read_use_statement();

	      case this.tok.T_CONST:
	        {
	          var result = this.node("constantstatement");
	          var items = this.next().read_const_list();
	          this.expectEndOfStatement();
	          return result(null, items);
	        }

	      case this.tok.T_NAMESPACE:
	        return this.read_namespace();

	      case this.tok.T_HALT_COMPILER:
	        {
	          var _result = this.node("halt");

	          if (this.next().expect("(")) this.next();
	          if (this.expect(")")) this.next();
	          this.expect(";");
	          this.lexer.done = true;
	          return _result(this.lexer._input.substring(this.lexer.offset));
	        }

	      default:
	        return this.read_statement();
	    }
	  },

	  /*
	   * reads a list of simple inner statements (helper for inner_statement*)
	   * ```ebnf
	   *  inner_statements ::= inner_statement*
	   * ```
	   */
	  read_inner_statements: function read_inner_statements() {
	    var result = [];

	    while (this.token != this.EOF && this.token !== "}") {
	      var _statement2 = this.read_inner_statement();

	      if (_statement2) {
	        if (Array.isArray(_statement2)) {
	          result = result.concat(_statement2);
	        } else {
	          result.push(_statement2);
	        }
	      }
	    }

	    return result;
	  },

	  /*
	   * Reads a list of constants declaration
	   * ```ebnf
	   *   const_list ::= T_CONST T_STRING '=' expr (',' T_STRING '=' expr)* ';'
	   * ```
	   */
	  read_const_list: function read_const_list() {
	    return this.read_list(function () {
	      this.expect(this.tok.T_STRING);
	      var result = this.node("constant");
	      var constName = this.node("identifier");
	      var name = this.text();
	      this.next();
	      constName = constName(name);

	      if (this.expect("=")) {
	        return result(constName, this.next().read_expr());
	      } else {
	        // fallback
	        return result(constName, null);
	      }
	    }, ",", false);
	  },

	  /*
	   * Reads a list of constants declaration
	   * ```ebnf
	   *   declare_list ::= IDENTIFIER '=' expr (',' IDENTIFIER '=' expr)*
	   * ```
	   * @retrurn {Array}
	   */
	  read_declare_list: function read_declare_list() {
	    var result = [];

	    while (this.token != this.EOF && this.token !== ")") {
	      this.expect(this.tok.T_STRING);
	      var directive = this.node("declaredirective");
	      var key = this.node("identifier");
	      var name = this.text();
	      this.next();
	      key = key(name);
	      var value = null;

	      if (this.expect("=")) {
	        value = this.next().read_expr();
	      }

	      result.push(directive(key, value));
	      if (this.token !== ",") break;
	      this.next();
	    }

	    return result;
	  },

	  /*
	   * reads a simple inner statement
	   * ```ebnf
	   *  inner_statement ::= '{' inner_statements '}' | token
	   * ```
	   */
	  read_inner_statement: function read_inner_statement() {
	    var attrs = [];

	    if (this.token === this.tok.T_ATTRIBUTE) {
	      attrs = this.read_attr_list();
	    }

	    switch (this.token) {
	      case this.tok.T_FUNCTION:
	        {
	          var result = this.read_function(false, false);
	          result.attrGroups = attrs;
	          return result;
	        }
	      // optional flags

	      case this.tok.T_ABSTRACT:
	      case this.tok.T_FINAL:
	      case this.tok.T_CLASS:
	        return this.read_class_declaration_statement();

	      case this.tok.T_INTERFACE:
	        return this.read_interface_declaration_statement();

	      case this.tok.T_TRAIT:
	        return this.read_trait_declaration_statement();

	      case this.tok.T_ENUM:
	        return this.read_enum_declaration_statement();

	      case this.tok.T_HALT_COMPILER:
	        {
	          this.raiseError("__HALT_COMPILER() can only be used from the outermost scope"); // fallback : returns a node but does not stop the parsing

	          var node = this.node("halt");
	          this.next().expect("(") && this.next();
	          this.expect(")") && this.next();
	          node = node(this.lexer._input.substring(this.lexer.offset));
	          this.expect(";") && this.next();
	          return node;
	        }

	      default:
	        return this.read_statement();
	    }
	  },

	  /*
	   * Reads statements
	   */
	  read_statement: function read_statement() {
	    switch (this.token) {
	      case "{":
	        return this.read_code_block(false);

	      case this.tok.T_IF:
	        return this.read_if();

	      case this.tok.T_SWITCH:
	        return this.read_switch();

	      case this.tok.T_FOR:
	        return this.read_for();

	      case this.tok.T_FOREACH:
	        return this.read_foreach();

	      case this.tok.T_WHILE:
	        return this.read_while();

	      case this.tok.T_DO:
	        return this.read_do();

	      case this.tok.T_COMMENT:
	        return this.read_comment();

	      case this.tok.T_DOC_COMMENT:
	        return this.read_doc_comment();

	      case this.tok.T_RETURN:
	        {
	          var result = this.node("return");
	          this.next();
	          var expr = this.read_optional_expr(";");
	          this.expectEndOfStatement();
	          return result(expr);
	        }
	      // https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L429

	      case this.tok.T_BREAK:
	      case this.tok.T_CONTINUE:
	        {
	          var _result2 = this.node(this.token === this.tok.T_CONTINUE ? "continue" : "break");

	          this.next();
	          var level = this.read_optional_expr(";");
	          this.expectEndOfStatement();
	          return _result2(level);
	        }

	      case this.tok.T_GLOBAL:
	        {
	          var _result3 = this.node("global");

	          var items = this.next().read_list(this.read_simple_variable, ",");
	          this.expectEndOfStatement();
	          return _result3(items);
	        }

	      case this.tok.T_STATIC:
	        {
	          var current = [this.token, this.lexer.getState()];

	          var _result4 = this.node();

	          if (this.next().token === this.tok.T_DOUBLE_COLON) {
	            // static keyword for a class
	            this.lexer.tokens.push(current);

	            var _expr = this.next().read_expr();

	            this.expectEndOfStatement(_expr);
	            return _result4("expressionstatement", _expr);
	          }

	          if (this.token === this.tok.T_FUNCTION) {
	            return this.read_function(true, [0, 1, 0]);
	          }

	          var _items = this.read_variable_declarations();

	          this.expectEndOfStatement();
	          return _result4("static", _items);
	        }

	      case this.tok.T_ECHO:
	        {
	          var _result5 = this.node("echo");

	          var text = this.text();
	          var shortForm = text === "<?=" || text === "<%=";
	          var expressions = this.next().read_function_list(this.read_expr, ",");
	          this.expectEndOfStatement();
	          return _result5(expressions, shortForm);
	        }

	      case this.tok.T_INLINE_HTML:
	        {
	          var value = this.text();
	          var prevChar = this.lexer.yylloc.first_offset > 0 ? this.lexer._input[this.lexer.yylloc.first_offset - 1] : null;
	          var fixFirstLine = prevChar === "\r" || prevChar === "\n"; // revert back the first stripped line

	          if (fixFirstLine) {
	            if (prevChar === "\n" && this.lexer.yylloc.first_offset > 1 && this.lexer._input[this.lexer.yylloc.first_offset - 2] === "\r") {
	              prevChar = "\r\n";
	            }
	          }

	          var _result6 = this.node("inline");

	          this.next();
	          return _result6(value, fixFirstLine ? prevChar + value : value);
	        }

	      case this.tok.T_UNSET:
	        {
	          var _result7 = this.node("unset");

	          this.next().expect("(") && this.next();
	          var variables = this.read_function_list(this.read_variable, ",");
	          this.expect(")") && this.next();
	          this.expect(";") && this.next();
	          return _result7(variables);
	        }

	      case this.tok.T_DECLARE:
	        {
	          var _result8 = this.node("declare");

	          var body = [];
	          var mode;
	          this.next().expect("(") && this.next();
	          var directives = this.read_declare_list();
	          this.expect(")") && this.next();

	          if (this.token === ":") {
	            this.next();

	            while (this.token != this.EOF && this.token !== this.tok.T_ENDDECLARE) {
	              // @todo : check declare_statement from php / not valid
	              body.push(this.read_top_statement());
	            }

	            if (body.length === 0 && this.extractDoc && this._docs.length > this._docIndex) {
	              body.push(this.node("noop")());
	            }

	            this.expect(this.tok.T_ENDDECLARE) && this.next();
	            this.expectEndOfStatement();
	            mode = this.ast.declare.MODE_SHORT;
	          } else if (this.token === "{") {
	            this.next();

	            while (this.token != this.EOF && this.token !== "}") {
	              // @todo : check declare_statement from php / not valid
	              body.push(this.read_top_statement());
	            }

	            if (body.length === 0 && this.extractDoc && this._docs.length > this._docIndex) {
	              body.push(this.node("noop")());
	            }

	            this.expect("}") && this.next();
	            mode = this.ast.declare.MODE_BLOCK;
	          } else {
	            this.expect(";") && this.next();
	            mode = this.ast.declare.MODE_NONE;
	          }

	          return _result8(directives, body, mode);
	        }

	      case this.tok.T_TRY:
	        return this.read_try();

	      case this.tok.T_THROW:
	        {
	          var _result9 = this.node("throw");

	          var _expr2 = this.next().read_expr();

	          this.expectEndOfStatement();
	          return _result9(_expr2);
	        }
	      // ignore this (extra ponctuation)

	      case ";":
	        {
	          this.next();
	          return null;
	        }

	      case this.tok.T_STRING:
	        {
	          var _result10 = this.node();

	          var _current = [this.token, this.lexer.getState()];
	          var labelNameText = this.text();
	          var labelName = this.node("identifier"); // AST : https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L457

	          if (this.next().token === ":") {
	            labelName = labelName(labelNameText);
	            this.next();
	            return _result10("label", labelName);
	          } else {
	            labelName.destroy();
	          } // default fallback expr / T_STRING '::' (etc...)


	          _result10.destroy();

	          this.lexer.tokens.push(_current);

	          var _statement3 = this.node("expressionstatement");

	          var _expr3 = this.next().read_expr();

	          this.expectEndOfStatement(_expr3);
	          return _statement3(_expr3);
	        }

	      case this.tok.T_GOTO:
	        {
	          var _result11 = this.node("goto");

	          var _labelName = null;

	          if (this.next().expect(this.tok.T_STRING)) {
	            _labelName = this.node("identifier");
	            var name = this.text();
	            this.next();
	            _labelName = _labelName(name);
	            this.expectEndOfStatement();
	          }

	          return _result11(_labelName);
	        }

	      default:
	        {
	          // default fallback expr
	          var _statement4 = this.node("expressionstatement");

	          var _expr4 = this.read_expr();

	          this.expectEndOfStatement(_expr4);
	          return _statement4(_expr4);
	        }
	    }
	  },

	  /*
	   * ```ebnf
	   *  code_block ::= '{' (inner_statements | top_statements) '}'
	   * ```
	   */
	  read_code_block: function read_code_block(top) {
	    var result = this.node("block");
	    this.expect("{") && this.next();
	    var body = top ? this.read_top_statements() : this.read_inner_statements();

	    if (body.length === 0 && this.extractDoc && this._docs.length > this._docIndex) {
	      body.push(this.node("noop")());
	    }

	    this.expect("}") && this.next();
	    return result(null, body);
	  }
	};

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var _switch$1 = {
	  /*
	   * Reads a switch statement
	   * ```ebnf
	   *  switch ::= T_SWITCH '(' expr ')' switch_case_list
	   * ```
	   * @return {Switch}
	   * @see http://php.net/manual/en/control-structures.switch.php
	   */
	  read_switch: function read_switch() {
	    var result = this.node("switch");
	    this.expect(this.tok.T_SWITCH) && this.next();
	    this.expect("(") && this.next();
	    var test = this.read_expr();
	    this.expect(")") && this.next();
	    var shortForm = this.token === ":";
	    var body = this.read_switch_case_list();
	    return result(test, body, shortForm);
	  },

	  /*
	   * ```ebnf
	   *  switch_case_list ::= '{' ';'? case_list* '}' | ':' ';'? case_list* T_ENDSWITCH ';'
	   * ```
	   * @see https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L566
	   */
	  read_switch_case_list: function read_switch_case_list() {
	    // DETECT SWITCH MODE
	    var expect = null;
	    var result = this.node("block");
	    var items = [];

	    if (this.token === "{") {
	      expect = "}";
	    } else if (this.token === ":") {
	      expect = this.tok.T_ENDSWITCH;
	    } else {
	      this.expect(["{", ":"]);
	    }

	    this.next(); // OPTIONNAL ';'
	    // https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L570

	    if (this.token === ";") {
	      this.next();
	    } // EXTRACTING CASES


	    while (this.token !== this.EOF && this.token !== expect) {
	      items.push(this.read_case_list(expect));
	    }

	    if (items.length === 0 && this.extractDoc && this._docs.length > this._docIndex) {
	      items.push(this.node("noop")());
	    } // CHECK END TOKEN


	    this.expect(expect) && this.next();

	    if (expect === this.tok.T_ENDSWITCH) {
	      this.expectEndOfStatement();
	    }

	    return result(null, items);
	  },

	  /*
	   * ```ebnf
	   *   case_list ::= ((T_CASE expr) | T_DEFAULT) (':' | ';') inner_statement*
	   * ```
	   */
	  read_case_list: function read_case_list(stopToken) {
	    var result = this.node("case");
	    var test = null;

	    if (this.token === this.tok.T_CASE) {
	      test = this.next().read_expr();
	    } else if (this.token === this.tok.T_DEFAULT) {
	      // the default entry - no condition
	      this.next();
	    } else {
	      this.expect([this.tok.T_CASE, this.tok.T_DEFAULT]);
	    } // case_separator


	    this.expect([":", ";"]) && this.next();
	    var body = this.node("block");
	    var items = [];

	    while (this.token !== this.EOF && this.token !== stopToken && this.token !== this.tok.T_CASE && this.token !== this.tok.T_DEFAULT) {
	      items.push(this.read_inner_statement());
	    }

	    return result(test, body(null, items));
	  }
	};

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var _try$1 = {
	  /*
	   * ```ebnf
	   *  try ::= T_TRY '{' inner_statement* '}'
	   *          (
	   *              T_CATCH '(' namespace_name (variable)? ')' '{'  inner_statement* '}'
	   *          )*
	   *          (T_FINALLY '{' inner_statement* '}')?
	   * ```
	   * @see https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L448
	   * @return {Try}
	   */
	  read_try: function read_try() {
	    this.expect(this.tok.T_TRY);
	    var result = this.node("try");
	    var always = null;
	    var catches = [];
	    var body = this.next().read_statement(); // https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L455

	    while (this.token === this.tok.T_CATCH) {
	      var item = this.node("catch");
	      this.next().expect("(") && this.next();
	      var what = this.read_list(this.read_namespace_name, "|", false);
	      var variable = null;

	      if (this.version < 800 || this.token === this.tok.T_VARIABLE) {
	        variable = this.read_variable(true, false);
	      }

	      this.expect(")");
	      catches.push(item(this.next().read_statement(), what, variable));
	    }

	    if (this.token === this.tok.T_FINALLY) {
	      always = this.next().read_statement();
	    }

	    return result(body, catches, always);
	  }
	};

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var utils = {
	  /*
	   * Reads a short form of tokens
	   * @param {Number} token - The ending token
	   * @return {Block}
	   */
	  read_short_form: function read_short_form(token) {
	    var body = this.node("block");
	    var items = [];
	    /* istanbul ignore next */

	    if (this.expect(":")) this.next();

	    while (this.token != this.EOF && this.token !== token) {
	      items.push(this.read_inner_statement());
	    }

	    if (items.length === 0 && this.extractDoc && this._docs.length > this._docIndex) {
	      items.push(this.node("noop")());
	    }
	    /* istanbul ignore next */


	    if (this.expect(token)) this.next();
	    this.expectEndOfStatement();
	    return body(null, items);
	  },

	  /*
	   * https://wiki.php.net/rfc/trailing-comma-function-calls
	   * @param {*} item
	   * @param {*} separator
	   */
	  read_function_list: function read_function_list(item, separator) {
	    var result = [];

	    do {
	      if (this.token == separator && this.version >= 703 && result.length > 0) {
	        result.push(this.node("noop")());
	        break;
	      }

	      result.push(item.apply(this, []));

	      if (this.token != separator) {
	        break;
	      }

	      if (this.next().token == ")" && this.version >= 703) {
	        break;
	      }
	    } while (this.token != this.EOF);

	    return result;
	  },

	  /*
	   * Helper : reads a list of tokens / sample : T_STRING ',' T_STRING ...
	   * ```ebnf
	   * list ::= separator? ( item separator )* item
	   * ```
	   */
	  read_list: function read_list(item, separator, preserveFirstSeparator) {
	    var result = [];

	    if (this.token == separator) {
	      if (preserveFirstSeparator) {
	        result.push(typeof item === "function" ? this.node("noop")() : null);
	      }

	      this.next();
	    }

	    if (typeof item === "function") {
	      do {
	        var itemResult = item.apply(this, []);

	        if (itemResult) {
	          result.push(itemResult);
	        }

	        if (this.token != separator) {
	          break;
	        }
	      } while (this.next().token != this.EOF);
	    } else {
	      if (this.expect(item)) {
	        result.push(this.text());
	      } else {
	        return [];
	      }

	      while (this.next().token != this.EOF) {
	        if (this.token != separator) break; // trim current separator & check item

	        if (this.next().token != item) break;
	        result.push(this.text());
	      }
	    }

	    return result;
	  },

	  /*
	   * Reads a list of names separated by a comma
	   *
	   * ```ebnf
	   * name_list ::= namespace (',' namespace)*
	   * ```
	   *
	   * Sample code :
	   * ```php
	   * <?php class foo extends bar, baz { }
	   * ```
	   *
	   * @see https://github.com/php/php-src/blob/master/Zend/zend_language_parser.y#L726
	   * @return {Reference[]}
	   */
	  read_name_list: function read_name_list() {
	    return this.read_list(this.read_namespace_name, ",", false);
	  },

	  /*
	   * Reads the byref token and assign it to the specified node
	   * @param {*} cb
	   */
	  read_byref: function read_byref(cb) {
	    var byref = this.node("byref");
	    this.next();
	    byref = byref(null);
	    var result = cb();

	    if (result) {
	      this.ast.swapLocations(result, byref, result, this);
	      result.byref = true;
	    }

	    return result;
	  },

	  /*
	   * Reads a list of variables declarations
	   *
	   * ```ebnf
	   * variable_declaration ::= T_VARIABLE ('=' expr)?*
	   * variable_declarations ::= variable_declaration (',' variable_declaration)*
	   * ```
	   *
	   * Sample code :
	   * ```php
	   * <?php static $a = 'hello', $b = 'world';
	   * ```
	   * @return {StaticVariable[]} Returns an array composed by a list of variables, or
	   * assign values
	   */
	  read_variable_declarations: function read_variable_declarations() {
	    return this.read_list(function () {
	      var node = this.node("staticvariable");
	      var variable = this.node("variable"); // plain variable name

	      /* istanbul ignore else */

	      if (this.expect(this.tok.T_VARIABLE)) {
	        var name = this.text().substring(1);
	        this.next();
	        variable = variable(name, false);
	      } else {
	        variable = variable("#ERR", false);
	      }

	      if (this.token === "=") {
	        return node(variable, this.next().read_expr());
	      } else {
	        return variable;
	      }
	    }, ",");
	  },

	  /*
	   * Reads class extends
	   */
	  read_extends_from: function read_extends_from() {
	    if (this.token === this.tok.T_EXTENDS) {
	      return this.next().read_namespace_name();
	    }

	    return null;
	  },

	  /*
	   * Reads interface extends list
	   */
	  read_interface_extends_list: function read_interface_extends_list() {
	    if (this.token === this.tok.T_EXTENDS) {
	      return this.next().read_name_list();
	    }

	    return null;
	  },

	  /*
	   * Reads implements list
	   */
	  read_implements_list: function read_implements_list() {
	    if (this.token === this.tok.T_IMPLEMENTS) {
	      return this.next().read_name_list();
	    }

	    return null;
	  }
	};

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var variable$1 = {
	  /*
	   * Reads a variable
	   *
	   * ```ebnf
	   *   variable ::= &? ...complex @todo
	   * ```
	   *
	   * Some samples of parsed code :
	   * ```php
	   *  &$var                      // simple var
	   *  $var                      // simple var
	   *  classname::CONST_NAME     // dynamic class name with const retrieval
	   *  foo()                     // function call
	   *  $var->func()->property    // chained calls
	   * ```
	   */
	  read_variable: function read_variable(read_only, encapsed) {
	    var result; // check the byref flag

	    if (this.token === "&") {
	      return this.read_byref(this.read_variable.bind(this, read_only, encapsed));
	    } // reads the entry point


	    if (this.is([this.tok.T_VARIABLE, "$"])) {
	      result = this.read_reference_variable(encapsed);
	    } else if (this.is([this.tok.T_NS_SEPARATOR, this.tok.T_STRING, this.tok.T_NAME_RELATIVE, this.tok.T_NAME_QUALIFIED, this.tok.T_NAME_FULLY_QUALIFIED, this.tok.T_NAMESPACE])) {
	      result = this.node();
	      var name = this.read_namespace_name();

	      if (this.token != this.tok.T_DOUBLE_COLON && this.token != "(" && ["parentreference", "selfreference"].indexOf(name.kind) === -1) {
	        // @see parser.js line 130 : resolves a conflict with scalar
	        var literal = name.name.toLowerCase();

	        if (literal === "true") {
	          result = name.destroy(result("boolean", true, name.name));
	        } else if (literal === "false") {
	          result = name.destroy(result("boolean", false, name.name));
	        } else if (literal === "null") {
	          result = name.destroy(result("nullkeyword", name.name));
	        } else {
	          result.destroy(name);
	          result = name;
	        }
	      } else {
	        // @fixme possible #193 bug
	        result.destroy(name);
	        result = name;
	      }
	    } else if (this.token === this.tok.T_STATIC) {
	      result = this.node("staticreference");
	      var raw = this.text();
	      this.next();
	      result = result(raw);
	    } else {
	      this.expect("VARIABLE");
	    } // static mode


	    if (this.token === this.tok.T_DOUBLE_COLON) {
	      result = this.read_static_getter(result, encapsed);
	    }

	    return this.recursive_variable_chain_scan(result, read_only, encapsed);
	  },
	  // resolves a static call
	  read_static_getter: function read_static_getter(what, encapsed) {
	    var result = this.node("staticlookup");
	    var offset, name;

	    if (this.next().is([this.tok.T_VARIABLE, "$"])) {
	      offset = this.read_reference_variable(encapsed);
	    } else if (this.token === this.tok.T_STRING || this.token === this.tok.T_CLASS || this.version >= 700 && this.is("IDENTIFIER")) {
	      offset = this.node("identifier");
	      name = this.text();
	      this.next();
	      offset = offset(name);
	    } else if (this.token === "{") {
	      offset = this.node("literal");
	      name = this.next().read_expr();
	      this.expect("}") && this.next();
	      offset = offset("literal", name, null);
	      this.expect("(");
	    } else {
	      this.error([this.tok.T_VARIABLE, this.tok.T_STRING]); // graceful mode : set getter as error node and continue

	      offset = this.node("identifier");
	      name = this.text();
	      this.next();
	      offset = offset(name);
	    }

	    return result(what, offset);
	  },
	  read_what: function read_what() {
	    var is_static_lookup = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	    var what = null;
	    var name = null;

	    switch (this.next().token) {
	      case this.tok.T_STRING:
	        what = this.node("identifier");
	        name = this.text();
	        this.next();
	        what = what(name);

	        if (is_static_lookup && this.token === this.tok.T_OBJECT_OPERATOR) {
	          this.error();
	        }

	        break;

	      case this.tok.T_VARIABLE:
	        what = this.node("variable");
	        name = this.text().substring(1);
	        this.next();
	        what = what(name, false);
	        break;

	      case "$":
	        what = this.node();
	        this.next().expect(["$", "{", this.tok.T_VARIABLE]);

	        if (this.token === "{") {
	          // $obj->${$varname}
	          name = this.next().read_expr();
	          this.expect("}") && this.next();
	          what = what("variable", name, true);
	        } else {
	          // $obj->$$varname
	          name = this.read_expr();
	          what = what("variable", name, false);
	        }

	        break;

	      case "{":
	        what = this.node("encapsedpart");
	        name = this.next().read_expr();
	        this.expect("}") && this.next();
	        what = what(name, "complex", false);
	        break;

	      default:
	        this.error([this.tok.T_STRING, this.tok.T_VARIABLE, "$", "{"]); // graceful mode : set what as error mode & continue

	        what = this.node("identifier");
	        name = this.text();
	        this.next();
	        what = what(name);
	        break;
	    }

	    return what;
	  },
	  recursive_variable_chain_scan: function recursive_variable_chain_scan(result, read_only, encapsed) {
	    var node, offset;

	    recursive_scan_loop: while (this.token != this.EOF) {
	      switch (this.token) {
	        case "(":
	          if (read_only) {
	            // @fixme : add more informations & test
	            return result;
	          } else {
	            result = this.node("call")(result, this.read_argument_list());
	          }

	          break;

	        case "[":
	        case "{":
	          {
	            var backet = this.token;
	            var isSquareBracket = backet === "[";
	            node = this.node("offsetlookup");
	            this.next();
	            offset = false;

	            if (encapsed) {
	              offset = this.read_encaps_var_offset();
	              this.expect(isSquareBracket ? "]" : "}") && this.next();
	            } else {
	              var isCallableVariable = isSquareBracket ? this.token !== "]" : this.token !== "}"; // callable_variable : https://github.com/php/php-src/blob/493524454d66adde84e00d249d607ecd540de99f/Zend/zend_language_parser.y#L1122

	              if (isCallableVariable) {
	                offset = this.read_expr();
	                this.expect(isSquareBracket ? "]" : "}") && this.next();
	              } else {
	                this.next();
	              }
	            }

	            result = node(result, offset);
	            break;
	          }

	        case this.tok.T_DOUBLE_COLON:
	          // @see https://github.com/glayzzle/php-parser/issues/107#issuecomment-354104574
	          if (result.kind === "staticlookup" && result.offset.kind === "identifier") {
	            this.error();
	          }

	          node = this.node("staticlookup");
	          result = node(result, this.read_what(true)); // fix 185
	          // static lookup dereferencables are limited to staticlookup over functions

	          /*if (dereferencable && this.token !== "(") {
	            this.error("(");
	          }*/

	          break;

	        case this.tok.T_OBJECT_OPERATOR:
	          {
	            node = this.node("propertylookup");
	            result = node(result, this.read_what());
	            break;
	          }

	        case this.tok.T_NULLSAFE_OBJECT_OPERATOR:
	          {
	            node = this.node("nullsafepropertylookup");
	            result = node(result, this.read_what());
	            break;
	          }

	        default:
	          break recursive_scan_loop;
	      }
	    }

	    return result;
	  },

	  /*
	   * https://github.com/php/php-src/blob/493524454d66adde84e00d249d607ecd540de99f/Zend/zend_language_parser.y#L1231
	   */
	  read_encaps_var_offset: function read_encaps_var_offset() {
	    var offset = this.node();

	    if (this.token === this.tok.T_STRING) {
	      var text = this.text();
	      this.next();
	      offset = offset("identifier", text);
	    } else if (this.token === this.tok.T_NUM_STRING) {
	      var num = this.text();
	      this.next();
	      offset = offset("number", num, null);
	    } else if (this.token === "-") {
	      this.next();

	      var _num = -1 * this.text();

	      this.expect(this.tok.T_NUM_STRING) && this.next();
	      offset = offset("number", _num, null);
	    } else if (this.token === this.tok.T_VARIABLE) {
	      var name = this.text().substring(1);
	      this.next();
	      offset = offset("variable", name, false);
	    } else {
	      this.expect([this.tok.T_STRING, this.tok.T_NUM_STRING, "-", this.tok.T_VARIABLE]); // fallback : consider as identifier

	      var _text = this.text();

	      this.next();
	      offset = offset("identifier", _text);
	    }

	    return offset;
	  },

	  /*
	   * ```ebnf
	   *  reference_variable ::=  simple_variable ('[' OFFSET ']')* | '{' EXPR '}'
	   * ```
	   * <code>
	   *  $foo[123];      // foo is an array ==> gets its entry
	   *  $foo{1};        // foo is a string ==> get the 2nd char offset
	   *  ${'foo'}[123];  // get the dynamic var $foo
	   *  $foo[123]{1};   // gets the 2nd char from the 123 array entry
	   * </code>
	   */
	  read_reference_variable: function read_reference_variable(encapsed) {
	    var result = this.read_simple_variable();
	    var offset;

	    while (this.token != this.EOF) {
	      var node = this.node();

	      if (this.token == "{" && !encapsed) {
	        // @fixme check coverage, not sure thats working
	        offset = this.next().read_expr();
	        this.expect("}") && this.next();
	        result = node("offsetlookup", result, offset);
	      } else {
	        node.destroy();
	        break;
	      }
	    }

	    return result;
	  },

	  /*
	   * ```ebnf
	   *  simple_variable ::= T_VARIABLE | '$' '{' expr '}' | '$' simple_variable
	   * ```
	   */
	  read_simple_variable: function read_simple_variable() {
	    var result = this.node("variable");
	    var name;

	    if (this.expect([this.tok.T_VARIABLE, "$"]) && this.token === this.tok.T_VARIABLE) {
	      // plain variable name
	      name = this.text().substring(1);
	      this.next();
	      result = result(name, false);
	    } else {
	      if (this.token === "$") this.next(); // dynamic variable name

	      switch (this.token) {
	        case "{":
	          {
	            var expr = this.next().read_expr();
	            this.expect("}") && this.next();
	            result = result(expr, true);
	            break;
	          }

	        case "$":
	          // $$$var
	          result = result(this.read_simple_variable(), false);
	          break;

	        case this.tok.T_VARIABLE:
	          {
	            // $$var
	            name = this.text().substring(1);
	            var node = this.node("variable");
	            this.next();
	            result = result(node(name, false), false);
	            break;
	          }

	        default:
	          this.error(["{", "$", this.tok.T_VARIABLE]); // graceful mode

	          name = this.text();
	          this.next();
	          result = result(name, false);
	      }
	    }

	    return result;
	  }
	};

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Position$1 = position;
	/**
	 * @private
	 */

	function isNumber(n) {
	  return n != "." && n != "," && !isNaN(parseFloat(n)) && isFinite(n);
	}
	/**
	 * The PHP Parser class that build the AST tree from the lexer
	 *
	 * @constructor Parser
	 * @memberOf module:php-parser
	 * @tutorial Parser
	 * @property {Lexer} lexer - current lexer instance
	 * @property {AST} ast - the AST factory instance
	 * @property {number|string} token - current token
	 * @property {boolean} extractDoc - should extract documentation as AST node
	 * @property {boolean} extractTokens - should extract each token
	 * @property {boolean} suppressErrors - should ignore parsing errors and continue
	 * @property {boolean} debug - should output debug informations
	 */


	var Parser = function Parser(lexer, ast) {
	  this.lexer = lexer;
	  this.ast = ast;
	  this.tok = lexer.tok;
	  this.EOF = lexer.EOF;
	  this.token = null;
	  this.prev = null;
	  this.debug = false;
	  this.version = 801;
	  this.extractDoc = false;
	  this.extractTokens = false;
	  this.suppressErrors = false;

	  var mapIt = function mapIt(item) {
	    return [item, null];
	  };

	  this.entries = {
	    // reserved_non_modifiers
	    IDENTIFIER: new Map([this.tok.T_ABSTRACT, this.tok.T_ARRAY, this.tok.T_AS, this.tok.T_BREAK, this.tok.T_CALLABLE, this.tok.T_CASE, this.tok.T_CATCH, this.tok.T_CLASS, this.tok.T_CLASS_C, this.tok.T_CLONE, this.tok.T_CONST, this.tok.T_CONTINUE, this.tok.T_DECLARE, this.tok.T_DEFAULT, this.tok.T_DIR, this.tok.T_DO, this.tok.T_ECHO, this.tok.T_ELSE, this.tok.T_ELSEIF, this.tok.T_EMPTY, this.tok.T_ENDDECLARE, this.tok.T_ENDFOR, this.tok.T_ENDFOREACH, this.tok.T_ENDIF, this.tok.T_ENDSWITCH, this.tok.T_ENDWHILE, this.tok.T_ENUM, this.tok.T_EVAL, this.tok.T_EXIT, this.tok.T_EXTENDS, this.tok.T_FILE, this.tok.T_FINAL, this.tok.T_FINALLY, this.tok.T_FN, this.tok.T_FOR, this.tok.T_FOREACH, this.tok.T_FUNC_C, this.tok.T_FUNCTION, this.tok.T_GLOBAL, this.tok.T_GOTO, this.tok.T_IF, this.tok.T_IMPLEMENTS, this.tok.T_INCLUDE, this.tok.T_INCLUDE_ONCE, this.tok.T_INSTANCEOF, this.tok.T_INSTEADOF, this.tok.T_INTERFACE, this.tok.T_ISSET, this.tok.T_LINE, this.tok.T_LIST, this.tok.T_LOGICAL_AND, this.tok.T_LOGICAL_OR, this.tok.T_LOGICAL_XOR, this.tok.T_MATCH, this.tok.T_METHOD_C, this.tok.T_NAMESPACE, this.tok.T_NEW, this.tok.T_NS_C, this.tok.T_PRINT, this.tok.T_PRIVATE, this.tok.T_PROTECTED, this.tok.T_PUBLIC, this.tok.T_READ_ONLY, this.tok.T_REQUIRE, this.tok.T_REQUIRE_ONCE, this.tok.T_RETURN, this.tok.T_STATIC, this.tok.T_SWITCH, this.tok.T_THROW, this.tok.T_TRAIT, this.tok.T_TRY, this.tok.T_UNSET, this.tok.T_USE, this.tok.T_VAR, this.tok.T_WHILE, this.tok.T_YIELD].map(mapIt)),
	    VARIABLE: new Map([this.tok.T_VARIABLE, "$", "&", this.tok.T_STRING, this.tok.T_NAME_RELATIVE, this.tok.T_NAME_QUALIFIED, this.tok.T_NAME_FULLY_QUALIFIED, this.tok.T_NAMESPACE, this.tok.T_STATIC].map(mapIt)),
	    SCALAR: new Map([this.tok.T_CONSTANT_ENCAPSED_STRING, this.tok.T_START_HEREDOC, this.tok.T_LNUMBER, this.tok.T_DNUMBER, this.tok.T_ARRAY, "[", this.tok.T_CLASS_C, this.tok.T_TRAIT_C, this.tok.T_FUNC_C, this.tok.T_METHOD_C, this.tok.T_LINE, this.tok.T_FILE, this.tok.T_DIR, this.tok.T_NS_C, '"', 'b"', 'B"', "-", this.tok.T_NS_SEPARATOR].map(mapIt)),
	    T_MAGIC_CONST: new Map([this.tok.T_CLASS_C, this.tok.T_TRAIT_C, this.tok.T_FUNC_C, this.tok.T_METHOD_C, this.tok.T_LINE, this.tok.T_FILE, this.tok.T_DIR, this.tok.T_NS_C].map(mapIt)),
	    T_MEMBER_FLAGS: new Map([this.tok.T_PUBLIC, this.tok.T_PRIVATE, this.tok.T_PROTECTED, this.tok.T_STATIC, this.tok.T_ABSTRACT, this.tok.T_FINAL].map(mapIt)),
	    EOS: new Map([";", this.EOF, this.tok.T_INLINE_HTML].map(mapIt)),
	    EXPR: new Map(["@", "-", "+", "!", "~", "(", "`", this.tok.T_LIST, this.tok.T_CLONE, this.tok.T_INC, this.tok.T_DEC, this.tok.T_NEW, this.tok.T_ISSET, this.tok.T_EMPTY, this.tok.T_MATCH, this.tok.T_INCLUDE, this.tok.T_INCLUDE_ONCE, this.tok.T_REQUIRE, this.tok.T_REQUIRE_ONCE, this.tok.T_EVAL, this.tok.T_INT_CAST, this.tok.T_DOUBLE_CAST, this.tok.T_STRING_CAST, this.tok.T_ARRAY_CAST, this.tok.T_OBJECT_CAST, this.tok.T_BOOL_CAST, this.tok.T_UNSET_CAST, this.tok.T_EXIT, this.tok.T_PRINT, this.tok.T_YIELD, this.tok.T_STATIC, this.tok.T_FUNCTION, this.tok.T_FN, // using VARIABLES :
	    this.tok.T_VARIABLE, "$", this.tok.T_NS_SEPARATOR, this.tok.T_STRING, this.tok.T_NAME_RELATIVE, this.tok.T_NAME_QUALIFIED, this.tok.T_NAME_FULLY_QUALIFIED, // using SCALAR :
	    this.tok.T_STRING, // @see variable.js line 45 > conflict with variable = shift/reduce :)
	    this.tok.T_CONSTANT_ENCAPSED_STRING, this.tok.T_START_HEREDOC, this.tok.T_LNUMBER, this.tok.T_DNUMBER, this.tok.T_ARRAY, "[", this.tok.T_CLASS_C, this.tok.T_TRAIT_C, this.tok.T_FUNC_C, this.tok.T_METHOD_C, this.tok.T_LINE, this.tok.T_FILE, this.tok.T_DIR, this.tok.T_NS_C, '"', 'b"', 'B"', "-", this.tok.T_NS_SEPARATOR].map(mapIt))
	  };
	};
	/**
	 * helper : gets a token name
	 * @function Parser#getTokenName
	 * @memberOf module:php-parser
	 */


	Parser.prototype.getTokenName = function (token) {
	  if (!isNumber(token)) {
	    return "'" + token + "'";
	  } else {
	    if (token == this.EOF) return "the end of file (EOF)";
	    return this.lexer.engine.tokens.values[token];
	  }
	};
	/**
	 * main entry point : converts a source code to AST
	 * @function Parser#parse
	 * @memberOf module:php-parser
	 */


	Parser.prototype.parse = function (code, filename) {
	  this._errors = [];
	  this.filename = filename || "eval";
	  this.currentNamespace = [""];

	  if (this.extractDoc) {
	    this._docs = [];
	  } else {
	    this._docs = null;
	  }

	  if (this.extractTokens) {
	    this._tokens = [];
	  } else {
	    this._tokens = null;
	  }

	  this._docIndex = 0;
	  this._lastNode = null;
	  this.lexer.setInput(code);
	  this.lexer.all_tokens = this.extractTokens;
	  this.lexer.comment_tokens = this.extractDoc;
	  this.length = this.lexer._input.length;
	  this.innerList = false;
	  this.innerListForm = false;
	  var program = this.node("program");
	  var childs = [];
	  this.next();

	  while (this.token != this.EOF) {
	    childs.push(this.read_start());
	  } // append last comment


	  if (childs.length === 0 && this.extractDoc && this._docs.length > this._docIndex) {
	    childs.push(this.node("noop")());
	  } // #176 : register latest position


	  this.prev = [this.lexer.yylloc.last_line, this.lexer.yylloc.last_column, this.lexer.offset];
	  var result = program(childs, this._errors, this._docs, this._tokens);

	  if (this.debug) {
	    var errors = this.ast.checkNodes();
	    /* istanbul ignore next */

	    if (errors.length > 0) {
	      errors.forEach(function (error) {
	        if (error.position) {
	          // eslint-disable-next-line no-console
	          console.log("Node at line " + error.position.line + ", column " + error.position.column);
	        } // eslint-disable-next-line no-console


	        console.log(error.stack.join("\n"));
	      });
	      throw new Error("Some nodes are not closed");
	    }
	  }

	  return result;
	};
	/**
	 * Raise an error
	 * @function Parser#raiseError
	 * @memberOf module:php-parser
	 */


	Parser.prototype.raiseError = function (message, msgExpect, expect, token) {
	  message += " on line " + this.lexer.yylloc.first_line;

	  if (!this.suppressErrors) {
	    var err = new SyntaxError(message, this.filename, this.lexer.yylloc.first_line);
	    err.lineNumber = this.lexer.yylloc.first_line;
	    err.fileName = this.filename;
	    err.columnNumber = this.lexer.yylloc.first_column;
	    throw err;
	  } // Error node :


	  var node = this.ast.prepare("error", null, this)(message, token, this.lexer.yylloc.first_line, expect);

	  this._errors.push(node);

	  return node;
	};
	/**
	 * handling errors
	 * @function Parser#error
	 * @memberOf module:php-parser
	 */


	Parser.prototype.error = function (expect) {
	  var msg = "Parse Error : syntax error";
	  var token = this.getTokenName(this.token);
	  var msgExpect = "";

	  if (this.token !== this.EOF) {
	    if (isNumber(this.token)) {
	      var symbol = this.text();
	      /* istanbul ignore next */

	      if (symbol.length > 10) {
	        symbol = symbol.substring(0, 7) + "...";
	      }

	      token = "'" + symbol + "' (" + token + ")";
	    }

	    msg += ", unexpected " + token;
	  }

	  if (expect && !Array.isArray(expect)) {
	    if (isNumber(expect) || expect.length === 1) {
	      msgExpect = ", expecting " + this.getTokenName(expect);
	    }

	    msg += msgExpect;
	  }

	  return this.raiseError(msg, msgExpect, expect, token);
	};
	/**
	 * Create a position node from the lexers position
	 *
	 * @function Parser#position
	 * @memberOf module:php-parser
	 * @return {Position}
	 */


	Parser.prototype.position = function () {
	  return new Position$1(this.lexer.yylloc.first_line, this.lexer.yylloc.first_column, this.lexer.yylloc.first_offset);
	};
	/**
	 * Creates a new AST node
	 * @function Parser#node
	 * @memberOf module:php-parser
	 */


	Parser.prototype.node = function (name) {
	  if (this.extractDoc) {
	    var docs = null;

	    if (this._docIndex < this._docs.length) {
	      docs = this._docs.slice(this._docIndex);
	      this._docIndex = this._docs.length;
	      /* istanbul ignore next */

	      if (this.debug) {
	        // eslint-disable-next-line no-console
	        console.log(new Error("Append docs on " + name)); // eslint-disable-next-line no-console

	        console.log(docs);
	      }
	    }

	    var node = this.ast.prepare(name, docs, this);
	    /*
	     * TOKENS :
	     * node1 commentA token commmentB node2 commentC token commentD node3 commentE token
	     *
	     * AST :
	     * structure:S1 [
	     *    left: node1 ( trail: commentA ),
	     *    right: structure:S2 [
	     *       node2 (lead: commentB, trail: commentC),
	     *       node3 (lead: commentD)
	     *    ],
	     *    trail: commentE
	     * ]
	     *
	     * Algorithm :
	     *
	     * Attach the last comments on parent of current node
	     * If a new node is started and the parent has a trailing comment
	     * the move it on previous node
	     *
	     * start S2
	     * start node1
	     * consume node1 & set commentA as trailingComment on S2
	     * start S2
	     * S1 has a trailingComment, attach it on node1
	     * ...
	     * NOTE : As the trailingComment Behavior depends on AST, it will be build on
	     * the AST layer - last child node will keep it's trailingComment nodes
	     */

	    node.postBuild = function (self) {
	      if (this._docIndex < this._docs.length) {
	        if (this._lastNode) {
	          var offset = this.prev[2];
	          var max = this._docIndex;

	          for (; max < this._docs.length; max++) {
	            if (this._docs[max].offset > offset) {
	              break;
	            }
	          }

	          if (max > this._docIndex) {
	            // inject trailing comment on child node
	            this._lastNode.setTrailingComments(this._docs.slice(this._docIndex, max));

	            this._docIndex = max;
	          }
	        } else if (this.token === this.EOF) {
	          // end of content
	          self.setTrailingComments(this._docs.slice(this._docIndex));
	          this._docIndex = this._docs.length;
	        }
	      }

	      this._lastNode = self;
	    }.bind(this);

	    return node;
	  }

	  return this.ast.prepare(name, null, this);
	};
	/**
	 * expects an end of statement or end of file
	 * @function Parser#expectEndOfStatement
	 * @memberOf module:php-parser
	 * @return {boolean}
	 */


	Parser.prototype.expectEndOfStatement = function (node) {
	  if (this.token === ";") {
	    // include only real ';' statements
	    // https://github.com/glayzzle/php-parser/issues/164
	    if (node && this.lexer.yytext === ";") {
	      node.includeToken(this);
	    }
	  } else if (this.token !== this.tok.T_INLINE_HTML && this.token !== this.EOF) {
	    this.error(";");
	    return false;
	  }

	  this.next();
	  return true;
	};

	var ignoreStack = ["parser.next", "parser.node", "parser.showlog"];
	/**
	 * outputs some debug information on current token
	 * @private
	 * @function Parser#showlog
	 * @memberOf module:php-parser
	 */

	Parser.prototype.showlog = function () {
	  var stack = new Error().stack.split("\n");
	  var line;

	  for (var offset = 2; offset < stack.length; offset++) {
	    line = stack[offset].trim();
	    var found = false;

	    for (var i = 0; i < ignoreStack.length; i++) {
	      /* istanbul ignore next */
	      if (line.substring(3, 3 + ignoreStack[i].length) === ignoreStack[i]) {
	        found = true;
	        break;
	      }
	    }
	    /* istanbul ignore next */


	    if (!found) {
	      break;
	    }
	  } // eslint-disable-next-line no-console


	  console.log("Line " + this.lexer.yylloc.first_line + " : " + this.getTokenName(this.token) + ">" + this.lexer.yytext + "<" + " @-->" + line);
	  return this;
	};
	/**
	 * Force the parser to check the current token.
	 *
	 * If the current token does not match to expected token,
	 * the an error will be raised.
	 *
	 * If the suppressError mode is activated, then the error will
	 * be added to the program error stack and this function will return `false`.
	 *
	 * @function Parser#expect
	 * @memberOf module:php-parser
	 * @param {String|Number} token
	 * @return {boolean}
	 * @throws Error
	 */


	Parser.prototype.expect = function (token) {
	  if (Array.isArray(token)) {
	    if (token.indexOf(this.token) === -1) {
	      this.error(token);
	      return false;
	    }
	  } else if (this.token != token) {
	    this.error(token);
	    return false;
	  }

	  return true;
	};
	/**
	 * Returns the current token contents
	 * @function Parser#text
	 * @memberOf module:php-parser
	 * @return {String}
	 */


	Parser.prototype.text = function () {
	  return this.lexer.yytext;
	};
	/**
	 * consume the next token
	 * @function Parser#next
	 * @memberOf module:php-parser
	 */


	Parser.prototype.next = function () {
	  // prepare the back command
	  if (this.token !== ";" || this.lexer.yytext === ";") {
	    // ignore '?>' from automated resolution
	    // https://github.com/glayzzle/php-parser/issues/168
	    this.prev = [this.lexer.yylloc.last_line, this.lexer.yylloc.last_column, this.lexer.offset];
	  } // eating the token


	  this.lex(); // showing the debug

	  if (this.debug) {
	    this.showlog();
	  } // handling comments


	  if (this.extractDoc) {
	    while (this.token === this.tok.T_COMMENT || this.token === this.tok.T_DOC_COMMENT) {
	      // APPEND COMMENTS
	      if (this.token === this.tok.T_COMMENT) {
	        this._docs.push(this.read_comment());
	      } else {
	        this._docs.push(this.read_doc_comment());
	      }
	    }
	  }

	  return this;
	};
	/**
	 * Peek at the next token.
	 * @function Parser#peek
	 * @memberOf module:php-parser
	 * @returns {string|number} Next Token
	 */


	Parser.prototype.peek = function () {
	  var lexerState = this.lexer.getState();
	  var nextToken = this.lexer.lex();
	  this.lexer.setState(lexerState);
	  return nextToken;
	};
	/**
	 * Eating a token
	 * @function Parser#lex
	 * @memberOf module:php-parser
	 */


	Parser.prototype.lex = function () {
	  // append on token stack
	  if (this.extractTokens) {
	    do {
	      // the token
	      this.token = this.lexer.lex() ||
	      /* istanbul ignore next */
	      this.EOF;
	      if (this.token === this.EOF) return this;
	      var entry = this.lexer.yytext;

	      if (Object.prototype.hasOwnProperty.call(this.lexer.engine.tokens.values, this.token)) {
	        entry = [this.lexer.engine.tokens.values[this.token], entry, this.lexer.yylloc.first_line, this.lexer.yylloc.first_offset, this.lexer.offset];
	      } else {
	        entry = [null, entry, this.lexer.yylloc.first_line, this.lexer.yylloc.first_offset, this.lexer.offset];
	      }

	      this._tokens.push(entry);

	      if (this.token === this.tok.T_CLOSE_TAG) {
	        // https://github.com/php/php-src/blob/7ff186434e82ee7be7c59d0db9a976641cf7b09c/Zend/zend_compile.c#L1680
	        this.token = ";";
	        return this;
	      } else if (this.token === this.tok.T_OPEN_TAG_WITH_ECHO) {
	        this.token = this.tok.T_ECHO;
	        return this;
	      }
	    } while (this.token === this.tok.T_WHITESPACE || // ignore white space
	    !this.extractDoc && (this.token === this.tok.T_COMMENT || // ignore single lines comments
	    this.token === this.tok.T_DOC_COMMENT) || // ignore doc comments
	    // ignore open tags
	    this.token === this.tok.T_OPEN_TAG);
	  } else {
	    this.token = this.lexer.lex() ||
	    /* istanbul ignore next */
	    this.EOF;
	  }

	  return this;
	};
	/**
	 * Check if token is of specified type
	 * @function Parser#is
	 * @memberOf module:php-parser
	 */


	Parser.prototype.is = function (type) {
	  if (Array.isArray(type)) {
	    return type.indexOf(this.token) !== -1;
	  }

	  return this.entries[type].has(this.token);
	}; // extends the parser with syntax files


	[array$1, _class$1, comment$1, expr, _enum$1, _function$1, _if$1, loops, main, namespace$1, scalar, statement$1, _switch$1, _try$1, utils, variable$1].forEach(function (ext) {
	  for (var k in ext) {
	    /* istanbul ignore next */
	    if (Object.prototype.hasOwnProperty.call(Parser.prototype, k)) {
	      // @see https://github.com/glayzzle/php-parser/issues/234
	      throw new Error("Function " + k + " is already defined - collision");
	    }

	    Parser.prototype[k] = ext[k];
	  }
	});
	var parser$1 = Parser;

	/**
	 * @readonly
	 * @memberOf module:php-parser
	 *
	 * @enum {number}
	 **/


	var TokenNames = {
	  T_HALT_COMPILER: 101,
	  T_USE: 102,
	  T_ENCAPSED_AND_WHITESPACE: 103,
	  T_OBJECT_OPERATOR: 104,
	  T_STRING: 105,
	  T_DOLLAR_OPEN_CURLY_BRACES: 106,
	  T_STRING_VARNAME: 107,
	  T_CURLY_OPEN: 108,
	  T_NUM_STRING: 109,
	  T_ISSET: 110,
	  T_EMPTY: 111,
	  T_INCLUDE: 112,
	  T_INCLUDE_ONCE: 113,
	  T_EVAL: 114,
	  T_REQUIRE: 115,
	  T_REQUIRE_ONCE: 116,
	  T_NAMESPACE: 117,
	  T_NS_SEPARATOR: 118,
	  T_AS: 119,
	  T_IF: 120,
	  T_ENDIF: 121,
	  T_WHILE: 122,
	  T_DO: 123,
	  T_FOR: 124,
	  T_SWITCH: 125,
	  T_BREAK: 126,
	  T_CONTINUE: 127,
	  T_RETURN: 128,
	  T_GLOBAL: 129,
	  T_STATIC: 130,
	  T_ECHO: 131,
	  T_INLINE_HTML: 132,
	  T_UNSET: 133,
	  T_FOREACH: 134,
	  T_DECLARE: 135,
	  T_TRY: 136,
	  T_THROW: 137,
	  T_GOTO: 138,
	  T_FINALLY: 139,
	  T_CATCH: 140,
	  T_ENDDECLARE: 141,
	  T_LIST: 142,
	  T_CLONE: 143,
	  T_PLUS_EQUAL: 144,
	  T_MINUS_EQUAL: 145,
	  T_MUL_EQUAL: 146,
	  T_DIV_EQUAL: 147,
	  T_CONCAT_EQUAL: 148,
	  T_MOD_EQUAL: 149,
	  T_AND_EQUAL: 150,
	  T_OR_EQUAL: 151,
	  T_XOR_EQUAL: 152,
	  T_SL_EQUAL: 153,
	  T_SR_EQUAL: 154,
	  T_INC: 155,
	  T_DEC: 156,
	  T_BOOLEAN_OR: 157,
	  T_BOOLEAN_AND: 158,
	  T_LOGICAL_OR: 159,
	  T_LOGICAL_AND: 160,
	  T_LOGICAL_XOR: 161,
	  T_SL: 162,
	  T_SR: 163,
	  T_IS_IDENTICAL: 164,
	  T_IS_NOT_IDENTICAL: 165,
	  T_IS_EQUAL: 166,
	  T_IS_NOT_EQUAL: 167,
	  T_IS_SMALLER_OR_EQUAL: 168,
	  T_IS_GREATER_OR_EQUAL: 169,
	  T_INSTANCEOF: 170,
	  T_INT_CAST: 171,
	  T_DOUBLE_CAST: 172,
	  T_STRING_CAST: 173,
	  T_ARRAY_CAST: 174,
	  T_OBJECT_CAST: 175,
	  T_BOOL_CAST: 176,
	  T_UNSET_CAST: 177,
	  T_EXIT: 178,
	  T_PRINT: 179,
	  T_YIELD: 180,
	  T_YIELD_FROM: 181,
	  T_FUNCTION: 182,
	  T_DOUBLE_ARROW: 183,
	  T_DOUBLE_COLON: 184,
	  T_ARRAY: 185,
	  T_CALLABLE: 186,
	  T_CLASS: 187,
	  T_ABSTRACT: 188,
	  T_TRAIT: 189,
	  T_FINAL: 190,
	  T_EXTENDS: 191,
	  T_INTERFACE: 192,
	  T_IMPLEMENTS: 193,
	  T_VAR: 194,
	  T_PUBLIC: 195,
	  T_PROTECTED: 196,
	  T_PRIVATE: 197,
	  T_CONST: 198,
	  T_NEW: 199,
	  T_INSTEADOF: 200,
	  T_ELSEIF: 201,
	  T_ELSE: 202,
	  T_ENDSWITCH: 203,
	  T_CASE: 204,
	  T_DEFAULT: 205,
	  T_ENDFOR: 206,
	  T_ENDFOREACH: 207,
	  T_ENDWHILE: 208,
	  T_CONSTANT_ENCAPSED_STRING: 209,
	  T_LNUMBER: 210,
	  T_DNUMBER: 211,
	  T_LINE: 212,
	  T_FILE: 213,
	  T_DIR: 214,
	  T_TRAIT_C: 215,
	  T_METHOD_C: 216,
	  T_FUNC_C: 217,
	  T_NS_C: 218,
	  T_START_HEREDOC: 219,
	  T_END_HEREDOC: 220,
	  T_CLASS_C: 221,
	  T_VARIABLE: 222,
	  T_OPEN_TAG: 223,
	  T_OPEN_TAG_WITH_ECHO: 224,
	  T_CLOSE_TAG: 225,
	  T_WHITESPACE: 226,
	  T_COMMENT: 227,
	  T_DOC_COMMENT: 228,
	  T_ELLIPSIS: 229,
	  T_COALESCE: 230,
	  T_POW: 231,
	  T_POW_EQUAL: 232,
	  T_SPACESHIP: 233,
	  T_COALESCE_EQUAL: 234,
	  T_FN: 235,
	  T_NULLSAFE_OBJECT_OPERATOR: 236,
	  T_MATCH: 237,
	  T_ATTRIBUTE: 238,
	  T_ENUM: 239,
	  T_READ_ONLY: 240,
	  T_NAME_RELATIVE: 241,
	  T_NAME_QUALIFIED: 242,
	  T_NAME_FULLY_QUALIFIED: 243
	};
	/**
	 * PHP AST Tokens
	 * @readonly
	 * @memberOf module:php-parser
	 *
	 * @type {object}
	 * @property {Object.<number, string>} values
	 * @property {TokenNames} names
	 */

	var tokens$1 = {
	  values: Object.entries(TokenNames).reduce(function (result, _ref) {
	    var _ref2 = _slicedToArray(_ref, 2),
	        key = _ref2[0],
	        value = _ref2[1];

	    return _objectSpread2(_objectSpread2({}, result), {}, _defineProperty({}, value, key));
	  }, {}),
	  names: TokenNames
	};
	var tokens_1 = Object.freeze(tokens$1);

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */
	/**
	 * Defines the location of the node (with it's source contents as string)
	 * @constructor Location
	 * @memberOf module:php-parser
	 * @property {string|null} source
	 * @property {Position} start
	 * @property {Position} end
	 */


	var Location$1 = function Location(source, start, end) {
	  this.source = source;
	  this.start = start;
	  this.end = end;
	};

	var location = Location$1;

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */
	/**
	 * A generic AST node
	 * @constructor Node
	 * @memberOf module:php-parser
	 * @property {Location|null} loc
	 * @property {CommentBlock[]|Comment[]|null} leadingComments
	 * @property {CommentBlock[]|Comment[]|null} trailingComments
	 * @property {string} kind
	 */


	var Node$i = function Node(kind, docs, location) {
	  this.kind = kind;

	  if (docs) {
	    this.leadingComments = docs;
	  }

	  if (location) {
	    this.loc = location;
	  }
	};
	/**
	 * Attach comments to current node
	 * @function Node#setTrailingComments
	 * @memberOf module:php-parser
	 * @param {*} docs
	 */


	Node$i.prototype.setTrailingComments = function (docs) {
	  this.trailingComments = docs;
	};
	/**
	 * Destroying an unused node
	 * @function Node#destroy
	 * @memberOf module:php-parser
	 */


	Node$i.prototype.destroy = function (node) {
	  if (!node) {
	    /* istanbul ignore next */
	    throw new Error("Node already initialized, you must swap with another node");
	  }

	  if (this.leadingComments) {
	    if (node.leadingComments) {
	      node.leadingComments = Array.concat(this.leadingComments, node.leadingComments);
	    } else {
	      node.leadingComments = this.leadingComments;
	    }
	  }

	  if (this.trailingComments) {
	    if (node.trailingComments) {
	      node.trailingComments = Array.concat(this.trailingComments, node.trailingComments);
	    } else {
	      node.trailingComments = this.trailingComments;
	    }
	  }

	  return node;
	};
	/**
	 * Includes current token position of the parser
	 * @function Node#includeToken
	 * @memberOf module:php-parser
	 * @param {*} parser
	 */


	Node$i.prototype.includeToken = function (parser) {
	  if (this.loc) {
	    if (this.loc.end) {
	      this.loc.end.line = parser.lexer.yylloc.last_line;
	      this.loc.end.column = parser.lexer.yylloc.last_column;
	      this.loc.end.offset = parser.lexer.offset;
	    }

	    if (parser.ast.withSource) {
	      this.loc.source = parser.lexer._input.substring(this.loc.start.offset, parser.lexer.offset);
	    }
	  }

	  return this;
	};
	/**
	 * Helper for extending the Node class
	 * @function Node.extends
	 * @memberOf module:php-parser
	 * @param {string} type
	 * @param {Function} constructor
	 * @return {Function}
	 */


	Node$i.extends = function (type, constructor) {
	  constructor.prototype = Object.create(this.prototype);
	  constructor.extends = this.extends;
	  constructor.prototype.constructor = constructor;
	  constructor.kind = type;
	  return constructor;
	};

	var node = Node$i;

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Node$h = node;
	var KIND$1K = "expression";
	/**
	 * Any expression node. Since the left-hand side of an assignment may
	 * be any expression in general, an expression can also be a pattern.
	 * @constructor Expression
	 * @memberOf module:php-parser
	 * @extends {Node}
	 */

	var expression = Node$h.extends(KIND$1K, function Expression(kind, docs, location) {
	  Node$h.apply(this, [kind || KIND$1K, docs, location]);
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Expr$2 = expression;
	var KIND$1J = "array";
	/**
	 * Defines an array structure
	 * @constructor Array
	 * @memberOf module:php-parser
	 * @example
	 * // PHP code :
	 * [1, 'foo' => 'bar', 3]
	 *
	 * // AST structure :
	 * {
	 *  "kind": "array",
	 *  "shortForm": true
	 *  "items": [
	 *    {"kind": "number", "value": "1"},
	 *    {
	 *      "kind": "entry",
	 *      "key": {"kind": "string", "value": "foo", "isDoubleQuote": false},
	 *      "value": {"kind": "string", "value": "bar", "isDoubleQuote": false}
	 *    },
	 *    {"kind": "number", "value": "3"}
	 *  ]
	 * }
	 * @extends {Expression}
	 * @property {Array<Entry|Expression|Variable>} items List of array items
	 * @property {boolean} shortForm Indicate if the short array syntax is used, ex `[]` instead `array()`
	 */

	var array = Expr$2.extends(KIND$1J, function Array(shortForm, items, docs, location) {
	  Expr$2.apply(this, [KIND$1J, docs, location]);
	  this.items = items;
	  this.shortForm = shortForm;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Expression$q = expression;
	var KIND$1I = "arrowfunc";
	/**
	 * Defines an arrow function (it's like a closure)
	 * @constructor ArrowFunc
	 * @memberOf module:php-parser
	 * @extends {Expression}
	 * @property {Parameter[]} arguments
	 * @property {Identifier} type
	 * @property {Expression} body
	 * @property {boolean} byref
	 * @property {boolean} nullable
	 * @property {boolean} isStatic
	 */

	var arrowfunc = Expression$q.extends(KIND$1I, function Closure(args, byref, body, type, nullable, isStatic, docs, location) {
	  Expression$q.apply(this, [KIND$1I, docs, location]);
	  this.arguments = args;
	  this.byref = byref;
	  this.body = body;
	  this.type = type;
	  this.nullable = nullable;
	  this.isStatic = isStatic || false;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Expression$p = expression;
	var KIND$1H = "assign";
	/**
	 * Assigns a value to the specified target
	 * @constructor Assign
	 * @memberOf module:php-parser
	 * @extends {Expression}
	 * @property {Expression} left
	 * @property {Expression} right
	 * @property {String} operator
	 */

	var assign = Expression$p.extends(KIND$1H, function Assign(left, right, operator, docs, location) {
	  Expression$p.apply(this, [KIND$1H, docs, location]);
	  this.left = left;
	  this.right = right;
	  this.operator = operator;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Expression$o = expression;
	var KIND$1G = "assignref";
	/**
	 * Assigns a value to the specified target
	 * @constructor AssignRef
	 * @memberOf module:php-parser
	 * @extends {Expression}
	 * @property {Expression} left
	 * @property {Expression} right
	 * @property {String} operator
	 */

	var assignref = Expression$o.extends(KIND$1G, function AssignRef(left, right, docs, location) {
	  Expression$o.apply(this, [KIND$1G, docs, location]);
	  this.left = left;
	  this.right = right;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Node$g = node;
	var KIND$1F = "attribute";
	/**
	 * Attribute Value
	 * @memberOf module:php-parser
	 * @constructor Attribute
	 * @extends {Node}
	 * @property {String} name
	 * @property {Parameter[]} args
	 */

	var attribute = Node$g.extends(KIND$1F, function Attribute(name, args, docs, location) {
	  Node$g.apply(this, [KIND$1F, docs, location]);
	  this.name = name;
	  this.args = args;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Node$f = node;
	var KIND$1E = "attrgroup";
	/**
	 * Attribute group
	 * @memberOf module:php-parser
	 * @constructor AttrGroup
	 * @extends {Node}
	 * @property {Attribute[]} attrs
	 */

	var attrgroup = Node$f.extends(KIND$1E, function AttrGroup(attrs, docs, location) {
	  Node$f.apply(this, [KIND$1E, docs, location]);
	  this.attrs = attrs || [];
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Expr$1 = expression;
	var KIND$1D = "operation";
	/**
	 * Defines binary operations
	 * @constructor Operation
	 * @memberOf module:php-parser
	 * @extends {Expression}
	 */

	var operation = Expr$1.extends(KIND$1D, function Operation(kind, docs, location) {
	  Expr$1.apply(this, [kind || KIND$1D, docs, location]);
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Operation$4 = operation;
	var KIND$1C = "bin";
	/**
	 * Binary operations
	 * @constructor Bin
	 * @memberOf module:php-parser
	 * @extends {Operation}
	 * @property {String} type
	 * @property {Expression} left
	 * @property {Expression} right
	 */

	var bin = Operation$4.extends(KIND$1C, function Bin(type, left, right, docs, location) {
	  Operation$4.apply(this, [KIND$1C, docs, location]);
	  this.type = type;
	  this.left = left;
	  this.right = right;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Node$e = node;
	var KIND$1B = "statement";
	/**
	 * Any statement.
	 * @constructor Statement
	 * @memberOf module:php-parser
	 * @extends {Node}
	 */

	var statement = Node$e.extends(KIND$1B, function Statement(kind, docs, location) {
	  Node$e.apply(this, [kind || KIND$1B, docs, location]);
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Statement$r = statement;
	var KIND$1A = "block";
	/**
	 * A block statement, i.e., a sequence of statements surrounded by braces.
	 * @constructor Block
	 * @memberOf module:php-parser
	 * @extends {Statement}
	 * @property {Node[]} children
	 */

	var block = Statement$r.extends(KIND$1A, function Block(kind, children, docs, location) {
	  Statement$r.apply(this, [kind || KIND$1A, docs, location]);
	  this.children = children.filter(Boolean);
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Expression$n = expression;
	var KIND$1z = "literal";
	/**
	 * Defines an array structure
	 * @constructor Literal
	 * @memberOf module:php-parser
	 * @extends {Expression}
	 * @property {string} raw
	 * @property {EncapsedPart[]|Node|string|number|boolean|null} value
	 */

	var literal = Expression$n.extends(KIND$1z, function Literal(kind, value, raw, docs, location) {
	  Expression$n.apply(this, [kind || KIND$1z, docs, location]);
	  this.value = value;

	  if (raw) {
	    this.raw = raw;
	  }
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Literal$6 = literal;
	var KIND$1y = "boolean";
	/**
	 * Defines a boolean value (true/false)
	 * @constructor Boolean
	 * @memberOf module:php-parser
	 * @extends {Literal}
	 * @property {boolean} value
	 */

	var boolean = Literal$6.extends(KIND$1y, function Boolean(value, raw, docs, location) {
	  Literal$6.apply(this, [KIND$1y, value, raw, docs, location]);
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Statement$q = statement;
	var KIND$1x = "break";
	/**
	 * A break statement
	 * @constructor Break
	 * @memberOf module:php-parser
	 * @extends {Statement}
	 * @property {Number|Null} level
	 */

	var _break = Statement$q.extends(KIND$1x, function Break(level, docs, location) {
	  Statement$q.apply(this, [KIND$1x, docs, location]);
	  this.level = level;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Expression$m = expression;
	var KIND$1w = "byref";
	/**
	 * Passing by Reference - so the function can modify the variable
	 * @constructor ByRef
	 * @memberOf module:php-parser
	 * @extends {Expression}
	 * @property {ExpressionStatement} what
	 */

	var byref = Expression$m.extends(KIND$1w, function ByRef(what, docs, location) {
	  Expression$m.apply(this, [KIND$1w, docs, location]);
	  this.what = what;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Expression$l = expression;
	var KIND$1v = "call";
	/**
	 * Executes a call statement
	 * @constructor Call
	 * @memberOf module:php-parser
	 * @extends {Expression}
	 * @property {Identifier|Variable} what
	 * @property {Expression[]} arguments
	 */

	var call = Expression$l.extends(KIND$1v, function Call(what, args, docs, location) {
	  Expression$l.apply(this, [KIND$1v, docs, location]);
	  this.what = what;
	  this.arguments = args;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Statement$p = statement;
	var KIND$1u = "case";
	/**
	 * A switch case statement
	 * @constructor Case
	 * @memberOf module:php-parser
	 * @extends {Statement}
	 * @property {Expression|null} test - if null, means that the default case
	 * @property {Block|null} body
	 */

	var _case = Statement$p.extends(KIND$1u, function Case(test, body, docs, location) {
	  Statement$p.apply(this, [KIND$1u, docs, location]);
	  this.test = test;
	  this.body = body;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Operation$3 = operation;
	var KIND$1t = "cast";
	/**
	 * Binary operations
	 * @constructor Cast
	 * @memberOf module:php-parser
	 * @extends {Operation}
	 * @property {String} type
	 * @property {String} raw
	 * @property {Expression} expr
	 */

	var cast = Operation$3.extends(KIND$1t, function Cast(type, raw, expr, docs, location) {
	  Operation$3.apply(this, [KIND$1t, docs, location]);
	  this.type = type;
	  this.raw = raw;
	  this.expr = expr;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Statement$o = statement;
	var KIND$1s = "catch";
	/**
	 * Defines a catch statement
	 * @constructor Catch
	 * @memberOf module:php-parser
	 * @extends {Statement}
	 * @property {Name[]} what
	 * @property {Variable} variable
	 * @property {Block} body
	 * @see http://php.net/manual/en/language.exceptions.php
	 */

	var _catch = Statement$o.extends(KIND$1s, function Catch(body, what, variable, docs, location) {
	  Statement$o.apply(this, [KIND$1s, docs, location]);
	  this.body = body;
	  this.what = what;
	  this.variable = variable;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Statement$n = statement;
	var KIND$1r = "declaration";
	var IS_UNDEFINED$3 = "";
	var IS_PUBLIC$3 = "public";
	var IS_PROTECTED$3 = "protected";
	var IS_PRIVATE$3 = "private";
	/**
	 * A declaration statement (function, class, interface...)
	 * @constructor Declaration
	 * @memberOf module:php-parser
	 * @extends {Statement}
	 * @property {Identifier|string} name
	 */

	var Declaration$8 = Statement$n.extends(KIND$1r, function Declaration(kind, name, docs, location) {
	  Statement$n.apply(this, [kind || KIND$1r, docs, location]);
	  this.name = name;
	});
	/**
	 * Generic flags parser
	 * @function
	 * @name Declaration#parseFlags
	 * @memberOf module:php-parser
	 * @param {Array<number|null>} flags
	 * @return {void}
	 */

	Declaration$8.prototype.parseFlags = function (flags) {
	  this.isAbstract = flags[2] === 1;
	  this.isFinal = flags[2] === 2;
	  this.isReadonly = flags[3] === 1;

	  if (this.kind !== "class") {
	    if (flags[0] === -1) {
	      this.visibility = IS_UNDEFINED$3;
	    } else if (flags[0] === null) {
	      /* istanbul ignore next */
	      this.visibility = null;
	    } else if (flags[0] === 0) {
	      this.visibility = IS_PUBLIC$3;
	    } else if (flags[0] === 1) {
	      this.visibility = IS_PROTECTED$3;
	    } else if (flags[0] === 2) {
	      this.visibility = IS_PRIVATE$3;
	    }

	    this.isStatic = flags[1] === 1;
	  }
	};

	var declaration = Declaration$8;

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Declaration$7 = declaration;
	var KIND$1q = "class";
	/**
	 * A class definition
	 * @constructor Class
	 * @memberOf module:php-parser
	 * @extends {Declaration}
	 * @property {Identifier|null} extends
	 * @property {Identifier[]|null} implements
	 * @property {Declaration[]} body
	 * @property {boolean} isAnonymous
	 * @property {boolean} isAbstract
	 * @property {boolean} isFinal
	 * @property {boolean} isReadonly
	 * @property {AttrGroup[]} attrGroups
	 */

	var _class = Declaration$7.extends(KIND$1q, function Class(name, ext, impl, body, flags, docs, location) {
	  Declaration$7.apply(this, [KIND$1q, name, docs, location]);
	  this.isAnonymous = name ? false : true;
	  this.extends = ext;
	  this.implements = impl;
	  this.body = body;
	  this.attrGroups = [];
	  this.parseFlags(flags);
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Statement$m = statement;
	var KIND$1p = "constantstatement";
	/**
	 * Declares a constants into the current scope
	 * @constructor ConstantStatement
	 * @memberOf module:php-parser
	 * @extends {Statement}
	 * @property {Constant[]} constants
	 */

	var constantstatement = Statement$m.extends(KIND$1p, function ConstantStatement(kind, constants, docs, location) {
	  Statement$m.apply(this, [kind || KIND$1p, docs, location]);
	  this.constants = constants;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var ConstantStatement = constantstatement;
	var KIND$1o = "classconstant";
	var IS_UNDEFINED$2 = "";
	var IS_PUBLIC$2 = "public";
	var IS_PROTECTED$2 = "protected";
	var IS_PRIVATE$2 = "private";
	/**
	 * Defines a class/interface/trait constant
	 * @constructor ClassConstant
	 * @memberOf module:php-parser
	 * @extends {ConstantStatement}
	 * @property {string} visibility
	 * @property {bool} final
	 * @property {AttrGroup[]} attrGroups
	 */

	var ClassConstant = ConstantStatement.extends(KIND$1o, function ClassConstant(kind, constants, flags, attrGroups, docs, location) {
	  ConstantStatement.apply(this, [kind || KIND$1o, constants, docs, location]);
	  this.parseFlags(flags);
	  this.attrGroups = attrGroups;
	});
	/**
	 * Generic flags parser
	 * @function
	 * @name ClassConstant#parseFlags
	 * @memberOf module:php-parser
	 * @param {Array<number|null>} flags
	 * @return {void}
	 */

	ClassConstant.prototype.parseFlags = function (flags) {
	  if (flags[0] === -1) {
	    this.visibility = IS_UNDEFINED$2;
	  } else if (flags[0] === null) {
	    /* istanbul ignore next */
	    this.visibility = null;
	  } else if (flags[0] === 0) {
	    this.visibility = IS_PUBLIC$2;
	  } else if (flags[0] === 1) {
	    this.visibility = IS_PROTECTED$2;
	  } else if (flags[0] === 2) {
	    this.visibility = IS_PRIVATE$2;
	  }

	  this.final = flags[2] === 2;
	};

	var classconstant = ClassConstant;

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Expression$k = expression;
	var KIND$1n = "clone";
	/**
	 * Defines a clone call
	 * @constructor Clone
	 * @memberOf module:php-parser
	 * @extends {Expression}
	 * @property {Expression} what
	 */

	var clone = Expression$k.extends(KIND$1n, function Clone(what, docs, location) {
	  Expression$k.apply(this, [KIND$1n, docs, location]);
	  this.what = what;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Expression$j = expression;
	var KIND$1m = "closure";
	/**
	 * Defines a closure
	 * @constructor Closure
	 * @memberOf module:php-parser
	 * @extends {Expression}
	 * @property {Parameter[]} arguments
	 * @property {Variable[]} uses
	 * @property {Identifier} type
	 * @property {Boolean} byref
	 * @property {boolean} nullable
	 * @property {Block|null} body
	 * @property {boolean} isStatic
	 * @property {AttrGroup[]} attrGroups
	 */

	var closure = Expression$j.extends(KIND$1m, function Closure(args, byref, uses, type, nullable, isStatic, docs, location) {
	  Expression$j.apply(this, [KIND$1m, docs, location]);
	  this.uses = uses;
	  this.arguments = args;
	  this.byref = byref;
	  this.type = type;
	  this.nullable = nullable;
	  this.isStatic = isStatic || false;
	  this.body = null;
	  this.attrGroups = [];
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Node$d = node;
	/**
	 * Abstract documentation node (ComentLine or CommentBlock)
	 * @constructor Comment
	 * @memberOf module:php-parser
	 * @extends {Node}
	 * @property {String} value
	 */

	var comment = Node$d.extends("comment", function Comment(kind, value, docs, location) {
	  Node$d.apply(this, [kind, docs, location]);
	  this.value = value;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Comment$1 = comment;
	var KIND$1l = "commentblock";
	/**
	 * A comment block (multiline)
	 * @constructor CommentBlock
	 * @memberOf module:php-parser
	 * @extends {Comment}
	 */

	var commentblock = Comment$1.extends(KIND$1l, function CommentBlock(value, docs, location) {
	  Comment$1.apply(this, [KIND$1l, value, docs, location]);
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Comment = comment;
	var KIND$1k = "commentline";
	/**
	 * A single line comment
	 * @constructor CommentLine
	 * @memberOf module:php-parser
	 * @extends {Comment}
	 */

	var commentline = Comment.extends(KIND$1k, function CommentLine(value, docs, location) {
	  Comment.apply(this, [KIND$1k, value, docs, location]);
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Node$c = node;
	var KIND$1j = "constant";
	/**
	 * Defines a constant
	 * @constructor Constant
	 * @memberOf module:php-parser
	 * @extends {Node}
	 * @property {string} name
	 * @property {Node|string|number|boolean|null} value
	 */

	var constant = Node$c.extends(KIND$1j, function Constant(name, value, docs, location) {
	  Node$c.apply(this, [KIND$1j, docs, location]);
	  this.name = name;
	  this.value = value;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Statement$l = statement;
	var KIND$1i = "continue";
	/**
	 * A continue statement
	 * @constructor Continue
	 * @memberOf module:php-parser
	 * @extends {Statement}
	 * @property {number|null} level
	 */

	var _continue = Statement$l.extends(KIND$1i, function Continue(level, docs, location) {
	  Statement$l.apply(this, [KIND$1i, docs, location]);
	  this.level = level;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Block$2 = block;
	var KIND$1h = "declare";
	/**
	 * The declare construct is used to set execution directives for a block of code
	 * @constructor Declare
	 * @memberOf module:php-parser
	 * @extends {Block}
	 * @property {DeclareDirective[]} directives
	 * @property {string} mode
	 * @see http://php.net/manual/en/control-structures.declare.php
	 */

	var Declare = Block$2.extends(KIND$1h, function Declare(directives, body, mode, docs, location) {
	  Block$2.apply(this, [KIND$1h, body, docs, location]);
	  this.directives = directives;
	  this.mode = mode;
	});
	/**
	 * The node is declared as a short tag syntax :
	 * ```php
	 * <?php
	 * declare(ticks=1):
	 * // some statements
	 * enddeclare;
	 * ```
	 * @constant {String} Declare#MODE_SHORT
	 * @memberOf module:php-parser
	 */

	Declare.MODE_SHORT = "short";
	/**
	 * The node is declared bracket enclosed code :
	 * ```php
	 * <?php
	 * declare(ticks=1) {
	 * // some statements
	 * }
	 * ```
	 * @constant {String} Declare#MODE_BLOCK
	 * @memberOf module:php-parser
	 */

	Declare.MODE_BLOCK = "block";
	/**
	 * The node is declared as a simple statement. In order to make things simpler
	 * children of the node are automatically collected until the next
	 * declare statement.
	 * ```php
	 * <?php
	 * declare(ticks=1);
	 * // some statements
	 * declare(ticks=2);
	 * // some statements
	 * ```
	 * @constant {String} Declare#MODE_NONE
	 * @memberOf module:php-parser
	 */

	Declare.MODE_NONE = "none";
	var declare = Declare;

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Node$b = node;
	var KIND$1g = "declaredirective";
	/**
	 * Defines a constant
	 * @constructor DeclareDirective
	 * @memberOf module:php-parser
	 * @extends {Node}
	 * @property {Identifier} key
	 * @property {Node|string|number|boolean|null} value
	 */

	var declaredirective = Node$b.extends(KIND$1g, function DeclareDirective(key, value, docs, location) {
	  Node$b.apply(this, [KIND$1g, docs, location]);
	  this.key = key;
	  this.value = value;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Statement$k = statement;
	var KIND$1f = "do";
	/**
	 * Defines a do/while statement
	 * @constructor Do
	 * @memberOf module:php-parser
	 * @extends {Statement}
	 * @property {Expression} test
	 * @property {Block | null} body
	 */

	var _do = Statement$k.extends(KIND$1f, function Do(test, body, docs, location) {
	  Statement$k.apply(this, [KIND$1f, docs, location]);
	  this.test = test;
	  this.body = body;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Statement$j = statement;
	var KIND$1e = "echo";
	/**
	 * Defines system based call
	 * @constructor Echo
	 * @memberOf module:php-parser
	 * @property {boolean} shortForm
	 * @property {Expression[]} expressions
	 * @extends {Statement}
	 */

	var echo = Statement$j.extends(KIND$1e, function Echo(expressions, shortForm, docs, location) {
	  Statement$j.apply(this, [KIND$1e, docs, location]);
	  this.shortForm = shortForm;
	  this.expressions = expressions;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Expression$i = expression;
	var KIND$1d = "empty";
	/**
	 * Defines an empty check call
	 * @constructor Empty
	 * @memberOf module:php-parser
	 * @extends {Expression}
	 */

	var empty = Expression$i.extends(KIND$1d, function Empty(expression, docs, location) {
	  Expression$i.apply(this, [KIND$1d, docs, location]);
	  this.expression = expression;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Literal$5 = literal;
	var KIND$1c = "encapsed";
	/**
	 * Defines an encapsed string (contains expressions)
	 * @constructor Encapsed
	 * @memberOf module:php-parser
	 * @extends {Literal}
	 * @property {String} type - Defines the type of encapsed string (shell, heredoc, string)
	 * @property {String|Null} label - The heredoc label, defined only when the type is heredoc
	 * @property {EncapsedPart[]} value
	 */

	var Encapsed = Literal$5.extends(KIND$1c, function Encapsed(value, raw, type, docs, location) {
	  Literal$5.apply(this, [KIND$1c, value, raw, docs, location]);
	  this.type = type;
	});
	/**
	 * The node is a double quote string :
	 * ```php
	 * <?php
	 * echo "hello $world";
	 * ```
	 * @constant {String} Encapsed#TYPE_STRING - `string`
	 * @memberOf module:php-parser
	 */

	Encapsed.TYPE_STRING = "string";
	/**
	 * The node is a shell execute string :
	 * ```php
	 * <?php
	 * echo `ls -larth $path`;
	 * ```
	 * @constant {String} Encapsed#TYPE_SHELL - `shell`
	 * @memberOf module:php-parser
	 */

	Encapsed.TYPE_SHELL = "shell";
	/**
	 * The node is a shell execute string :
	 * ```php
	 * <?php
	 * echo <<<STR
	 *  Hello $world
	 * STR
	 * ;
	 * ```
	 * @constant {String} Encapsed#TYPE_HEREDOC - `heredoc`
	 * @memberOf module:php-parser
	 */

	Encapsed.TYPE_HEREDOC = "heredoc";
	/**
	 * The node contains a list of constref / variables / expr :
	 * ```php
	 * <?php
	 * echo $foo->bar_$baz;
	 * ```
	 * @constant {String} Encapsed#TYPE_OFFSET - `offset`
	 * @memberOf module:php-parser
	 */

	Encapsed.TYPE_OFFSET = "offset";
	var encapsed = Encapsed;

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Expression$h = expression;
	var KIND$1b = "encapsedpart";
	/**
	 * Part of `Encapsed` node
	 * @constructor EncapsedPart
	 * @memberOf module:php-parser
	 * @extends {Expression}
	 * @property {Expression} expression
	 * @property {String} syntax
	 * @property {Boolean} curly
	 */

	var encapsedpart = Expression$h.extends(KIND$1b, function EncapsedPart(expression, syntax, curly, docs, location) {
	  Expression$h.apply(this, [KIND$1b, docs, location]);
	  this.expression = expression;
	  this.syntax = syntax;
	  this.curly = curly;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Expression$g = expression;
	var KIND$1a = "entry";
	/**
	 * An array entry - see [Array](#array)
	 * @memberOf module:php-parser
	 * @constructor Entry
	 * @extends {Expression}
	 * @property {Node|null} key The entry key/offset
	 * @property {Node} value The entry value
	 * @property {Boolean} byRef By reference
	 * @property {Boolean} unpack Argument unpacking
	 */

	var entry = Expression$g.extends(KIND$1a, function Entry(key, value, byRef, unpack, docs, location) {
	  Expression$g.apply(this, [KIND$1a, docs, location]);
	  this.key = key;
	  this.value = value;
	  this.byRef = byRef;
	  this.unpack = unpack;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Declaration$6 = declaration;
	var KIND$19 = "enum";
	/**
	 * A enum definition
	 * @constructor Enum
	 * @memberOf module:php-parser
	 * @extends {Declaration}
	 * @property {Identifier|null} valueType
	 * @property {Identifier[]} implements
	 * @property {Declaration[]} body
	 * @property {AttrGroup[]} attrGroups
	 */

	var _enum = Declaration$6.extends(KIND$19, function Enum(name, valueType, impl, body, docs, location) {
	  Declaration$6.apply(this, [KIND$19, name, docs, location]);
	  this.valueType = valueType;
	  this.implements = impl;
	  this.body = body;
	  this.attrGroups = [];
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Node$a = node;
	var KIND$18 = "enumcase";
	/**
	 * Declares a cases into the current scope
	 * @constructor EnumCase
	 * @memberOf module:php-parser
	 * @extends {Node}
	 * @property {string} name
	 * @property {string|number|null} value
	 */

	var enumcase = Node$a.extends(KIND$18, function EnumCase(name, value, docs, location) {
	  Node$a.apply(this, [KIND$18, docs, location]);
	  this.name = name;
	  this.value = value;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Node$9 = node;
	var KIND$17 = "error";
	/**
	 * Defines an error node (used only on silentMode)
	 * @constructor Error
	 * @memberOf module:php-parser
	 * @extends {Node}
	 * @property {string} message
	 * @property {number} line
	 * @property {number|string} token
	 * @property {string|array} expected
	 */

	var error = Node$9.extends(KIND$17, function Error(message, token, line, expected, docs, location) {
	  Node$9.apply(this, [KIND$17, docs, location]);
	  this.message = message;
	  this.token = token;
	  this.line = line;
	  this.expected = expected;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Expression$f = expression;
	var KIND$16 = "eval";
	/**
	 * Defines an eval statement
	 * @constructor Eval
	 * @memberOf module:php-parser
	 * @extends {Expression}
	 * @property {Node} source
	 */

	var _eval = Expression$f.extends(KIND$16, function Eval(source, docs, location) {
	  Expression$f.apply(this, [KIND$16, docs, location]);
	  this.source = source;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Expression$e = expression;
	var KIND$15 = "exit";
	/**
	 * Defines an exit / die call
	 * @constructor Exit
	 * @memberOf module:php-parser
	 * @extends {Expression}
	 * @property {Node|null} expression
	 * @property {boolean} useDie
	 */

	var exit = Expression$e.extends(KIND$15, function Exit(expression, useDie, docs, location) {
	  Expression$e.apply(this, [KIND$15, docs, location]);
	  this.expression = expression;
	  this.useDie = useDie;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Statement$i = statement;
	var KIND$14 = "expressionstatement";
	/**
	 * Defines an expression based statement
	 * @constructor ExpressionStatement
	 * @memberOf module:php-parser
	 * @extends {Statement}
	 * @property {Expression} expression
	 */

	var expressionstatement = Statement$i.extends(KIND$14, function ExpressionStatement(expr, docs, location) {
	  Statement$i.apply(this, [KIND$14, docs, location]);
	  this.expression = expr;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Statement$h = statement;
	var KIND$13 = "for";
	/**
	 * Defines a for iterator
	 * @constructor For
	 * @memberOf module:php-parser
	 * @extends {Statement}
	 * @property {Expression[]} init
	 * @property {Expression[]} test
	 * @property {Expression[]} increment
	 * @property {Block | null} body
	 * @property {boolean} shortForm
	 * @see http://php.net/manual/en/control-structures.for.php
	 */

	var _for = Statement$h.extends(KIND$13, function For(init, test, increment, body, shortForm, docs, location) {
	  Statement$h.apply(this, [KIND$13, docs, location]);
	  this.init = init;
	  this.test = test;
	  this.increment = increment;
	  this.shortForm = shortForm;
	  this.body = body;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Statement$g = statement;
	var KIND$12 = "foreach";
	/**
	 * Defines a foreach iterator
	 * @constructor Foreach
	 * @memberOf module:php-parser
	 * @extends {Statement}
	 * @property {Expression} source
	 * @property {Expression|null} key
	 * @property {Expression} value
	 * @property {Block | null} body
	 * @property {boolean} shortForm
	 * @see http://php.net/manual/en/control-structures.foreach.php
	 */

	var foreach = Statement$g.extends(KIND$12, function Foreach(source, key, value, body, shortForm, docs, location) {
	  Statement$g.apply(this, [KIND$12, docs, location]);
	  this.source = source;
	  this.key = key;
	  this.value = value;
	  this.shortForm = shortForm;
	  this.body = body;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Declaration$5 = declaration;
	var KIND$11 = "function";
	/**
	 * Defines a classic function
	 * @constructor Function
	 * @memberOf module:php-parser
	 * @extends {Declaration}
	 * @property {Parameter[]} arguments
	 * @property {Identifier} type
	 * @property {boolean} byref
	 * @property {boolean} nullable
	 * @property {Block|null} body
	 * @property {AttrGroup[]} attrGroups
	 */

	var _function = Declaration$5.extends(KIND$11, function _Function(name, args, byref, type, nullable, docs, location) {
	  Declaration$5.apply(this, [KIND$11, name, docs, location]);
	  this.arguments = args;
	  this.byref = byref;
	  this.type = type;
	  this.nullable = nullable;
	  this.body = null;
	  this.attrGroups = [];
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Statement$f = statement;
	var KIND$10 = "global";
	/**
	 * Imports a variable from the global scope
	 * @constructor Global
	 * @memberOf module:php-parser
	 * @extends {Statement}
	 * @property {Variable[]} items
	 */

	var global$1 = Statement$f.extends(KIND$10, function Global(items, docs, location) {
	  Statement$f.apply(this, [KIND$10, docs, location]);
	  this.items = items;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Statement$e = statement;
	var KIND$$ = "goto";
	/**
	 * Defines goto statement
	 * @constructor Goto
	 * @memberOf module:php-parser
	 * @extends {Statement}
	 * @property {string} label
	 * @see {Label}
	 */

	var goto = Statement$e.extends(KIND$$, function Goto(label, docs, location) {
	  Statement$e.apply(this, [KIND$$, docs, location]);
	  this.label = label;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Statement$d = statement;
	var KIND$_ = "halt";
	/**
	 * Halts the compiler execution
	 * @constructor Halt
	 * @memberOf module:php-parser
	 * @extends {Statement}
	 * @property {String} after - String after the halt statement
	 * @see http://php.net/manual/en/function.halt-compiler.php
	 */

	var halt = Statement$d.extends(KIND$_, function Halt(after, docs, location) {
	  Statement$d.apply(this, [KIND$_, docs, location]);
	  this.after = after;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Node$8 = node;
	var KIND$Z = "identifier";
	/**
	 * Defines an identifier node
	 * @constructor Identifier
	 * @memberOf module:php-parser
	 * @extends {Node}
	 * @property {string} name
	 */

	var Identifier = Node$8.extends(KIND$Z, function Identifier(name, docs, location) {
	  Node$8.apply(this, [KIND$Z, docs, location]);
	  this.name = name;
	});
	var identifier = Identifier;

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Statement$c = statement;
	var KIND$Y = "if";
	/**
	 * Defines a if statement
	 * @constructor If
	 * @memberOf module:php-parser
	 * @extends {Statement}
	 * @property {Expression} test
	 * @property {Block} body
	 * @property {Block|If|null} alternate
	 * @property {boolean} shortForm
	 */

	var _if = Statement$c.extends(KIND$Y, function If(test, body, alternate, shortForm, docs, location) {
	  Statement$c.apply(this, [KIND$Y, docs, location]);
	  this.test = test;
	  this.body = body;
	  this.alternate = alternate;
	  this.shortForm = shortForm;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Expression$d = expression;
	var KIND$X = "include";
	/**
	 * Defines system include call
	 * @constructor Include
	 * @memberOf module:php-parser
	 * @extends {Expression}
	 * @property {Node} target
	 * @property {boolean} once
	 * @property {boolean} require
	 */

	var include = Expression$d.extends(KIND$X, function Include(once, require, target, docs, location) {
	  Expression$d.apply(this, [KIND$X, docs, location]);
	  this.once = once;
	  this.require = require;
	  this.target = target;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Literal$4 = literal;
	var KIND$W = "inline";
	/**
	 * Defines inline html output (treated as echo output)
	 * @constructor Inline
	 * @memberOf module:php-parser
	 * @extends {Literal}
	 * @property {string} value
	 */

	var inline = Literal$4.extends(KIND$W, function Inline(value, raw, docs, location) {
	  Literal$4.apply(this, [KIND$W, value, raw, docs, location]);
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Declaration$4 = declaration;
	var KIND$V = "interface";
	/**
	 * An interface definition
	 * @constructor Interface
	 * @memberOf module:php-parser
	 * @extends {Declaration}
	 * @property {Identifier[]} extends
	 * @property {Declaration[]} body
	 * @property {AttrGroup[]} attrGroups
	 */

	var _interface = Declaration$4.extends(KIND$V, function Interface(name, ext, body, attrGroups, docs, location) {
	  Declaration$4.apply(this, [KIND$V, name, docs, location]);
	  this.extends = ext;
	  this.body = body;
	  this.attrGroups = attrGroups;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Declaration$3 = declaration;
	var KIND$U = "intersectiontype";
	/**
	 * A union of types
	 * @memberOf module:php-parser
	 * @constructor IntersectionType
	 * @extends {Declaration}
	 * @property {TypeReference[]} types
	 */

	var intersectiontype = Declaration$3.extends(KIND$U, function IntersectionType(types, docs, location) {
	  Declaration$3.apply(this, [KIND$U, null, docs, location]);
	  this.types = types;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Expression$c = expression;
	var KIND$T = "isset";
	/**
	 * Defines an isset call
	 * @constructor Isset
	 * @memberOf module:php-parser
	 * @extends {Expression}
	 */

	var isset = Expression$c.extends(KIND$T, function Isset(variables, docs, location) {
	  Expression$c.apply(this, [KIND$T, docs, location]);
	  this.variables = variables;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Statement$b = statement;
	var KIND$S = "label";
	/**
	 * A label statement (referenced by goto)
	 * @constructor Label
	 * @memberOf module:php-parser
	 * @extends {Statement}
	 * @property {String} name
	 */

	var label = Statement$b.extends(KIND$S, function Label(name, docs, location) {
	  Statement$b.apply(this, [KIND$S, docs, location]);
	  this.name = name;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Expression$b = expression;
	var KIND$R = "list";
	/**
	 * Defines list assignment
	 * @constructor List
	 * @memberOf module:php-parser
	 * @extends {Expression}
	 * @property {boolean} shortForm
	 * @property {Entry[]} items
	 */

	var list = Expression$b.extends(KIND$R, function List(items, shortForm, docs, location) {
	  Expression$b.apply(this, [KIND$R, docs, location]);
	  this.items = items;
	  this.shortForm = shortForm;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Expr = expression;
	var KIND$Q = "lookup";
	/**
	 * Lookup on an offset in the specified object
	 * @constructor Lookup
	 * @memberOf module:php-parser
	 * @extends {Expression}
	 * @property {Expression} what
	 * @property {Expression} offset
	 */

	var lookup = Expr.extends(KIND$Q, function Lookup(kind, what, offset, docs, location) {
	  Expr.apply(this, [kind || KIND$Q, docs, location]);
	  this.what = what;
	  this.offset = offset;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Literal$3 = literal;
	var KIND$P = "magic";
	/**
	 * Defines magic constant
	 * @constructor Magic
	 * @memberOf module:php-parser
	 * @extends {Literal}
	 */

	var magic = Literal$3.extends(KIND$P, function Magic(value, raw, docs, location) {
	  Literal$3.apply(this, [KIND$P, value, raw, docs, location]);
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Expression$a = expression;
	var KIND$O = "match";
	/**
	 * Defines a match expression
	 * @memberOf module:php-parser
	 * @constructor Match
	 * @extends {Expression}
	 * @property {Expression} cond Condition expression to match against
	 * @property {MatchArm[]} arms Arms for comparison
	 */

	var match = Expression$a.extends(KIND$O, function Match(cond, arms, docs, location) {
	  Expression$a.apply(this, [KIND$O, docs, location]);
	  this.cond = cond;
	  this.arms = arms;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Expression$9 = expression;
	var KIND$N = "matcharm";
	/**
	 * An array entry - see [Array](#array)
	 * @memberOf module:php-parser
	 * @constructor MatchArm
	 * @extends {Expression}
	 * @property {Expression[]|null} conds The match condition expression list - null indicates default arm
	 * @property {Expression} body The return value expression
	 */

	var matcharm = Expression$9.extends(KIND$N, function MatchArm(conds, body, docs, location) {
	  Expression$9.apply(this, [KIND$N, docs, location]);
	  this.conds = conds;
	  this.body = body;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Function_ = _function;
	var KIND$M = "method";
	/**
	 * Defines a class/interface/trait method
	 * @constructor Method
	 * @memberOf module:php-parser
	 * @extends {Function}
	 * @property {boolean} isAbstract
	 * @property {boolean} isFinal
	 * @property {boolean} isStatic
	 * @property {string} visibility
	 */

	var method = Function_.extends(KIND$M, function Method() {
	  Function_.apply(this, arguments);
	  this.kind = KIND$M;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Node$7 = node;
	var KIND$L = "reference";
	/**
	 * Defines a reference node
	 * @constructor Reference
	 * @memberOf module:php-parser
	 * @extends {Node}
	 */

	var Reference$5 = Node$7.extends(KIND$L, function Reference(kind, docs, location) {
	  Node$7.apply(this, [kind || KIND$L, docs, location]);
	});
	var reference = Reference$5;

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Reference$4 = reference;
	var KIND$K = "name";
	/**
	 * Defines a class reference node
	 * @constructor Name
	 * @memberOf module:php-parser
	 * @extends {Reference}
	 * @property {string} name
	 * @property {string} resolution
	 */

	var Name = Reference$4.extends(KIND$K, function Name(name, resolution, docs, location) {
	  Reference$4.apply(this, [KIND$K, docs, location]);
	  this.name = name.replace(/\\$/, "");
	  this.resolution = resolution;
	});
	/**
	 * This is an identifier without a namespace separator, such as Foo
	 * @constant {String} Name#UNQUALIFIED_NAME
	 * @memberOf module:php-parser
	 */

	Name.UNQUALIFIED_NAME = "uqn";
	/**
	 * This is an identifier with a namespace separator, such as Foo\Bar
	 * @constant {String} Name#QUALIFIED_NAME
	 * @memberOf module:php-parser
	 */

	Name.QUALIFIED_NAME = "qn";
	/**
	 * This is an identifier with a namespace separator that begins with
	 * a namespace separator, such as \Foo\Bar. The namespace \Foo is also
	 * a fully qualified name.
	 * @constant {String} Name#FULL_QUALIFIED_NAME
	 * @memberOf module:php-parser
	 */

	Name.FULL_QUALIFIED_NAME = "fqn";
	/**
	 * This is an identifier starting with namespace, such as namespace\Foo\Bar.
	 * @constant {String} Name#RELATIVE_NAME
	 * @memberOf module:php-parser
	 */

	Name.RELATIVE_NAME = "rn";
	var name = Name;

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Block$1 = block;
	var KIND$J = "namespace";
	/**
	 * The main program node
	 * @constructor Namespace
	 * @memberOf module:php-parser
	 * @extends {Block}
	 * @property {string} name
	 * @property {boolean} withBrackets
	 */

	var namespace = Block$1.extends(KIND$J, function Namespace(name, children, withBrackets, docs, location) {
	  Block$1.apply(this, [KIND$J, children, docs, location]);
	  this.name = name;
	  this.withBrackets = withBrackets || false;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Expression$8 = expression;
	var KIND$I = "namedargument";
	/**
	 * Named arguments.
	 * @memberOf module:php-parser
	 * @constructor namedargument
	 * @extends {Expression}
	 * @property {String} name
	 * @property {Expression} value
	 * @see https://www.php.net/manual/en/functions.arguments.php#functions.named-arguments
	 */

	var namedargument = Expression$8.extends(KIND$I, function namedargument(name, value, docs, location) {
	  Expression$8.apply(this, [KIND$I, docs, location]);
	  this.name = name;
	  this.value = value;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Expression$7 = expression;
	var KIND$H = "new";
	/**
	 * Creates a new instance of the specified class
	 * @constructor New
	 * @memberOf module:php-parser
	 * @extends {Expression}
	 * @property {Identifier|Variable|Class} what
	 * @property {Variable[]} arguments
	 */

	var _new = Expression$7.extends(KIND$H, function New(what, args, docs, location) {
	  Expression$7.apply(this, [KIND$H, docs, location]);
	  this.what = what;
	  this.arguments = args;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Node$6 = node;
	var KIND$G = "noop";
	/**
	 * Ignore this node, it implies a no operation block, for example :
	 * [$foo, $bar, /* here a noop node * /]
	 * @constructor Noop
	 * @memberOf module:php-parser
	 * @extends {Node}
	 */

	var noop = Node$6.extends(KIND$G, function Noop(docs, location) {
	  Node$6.apply(this, [KIND$G, docs, location]);
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Literal$2 = literal;
	var KIND$F = "nowdoc";
	/**
	 * Defines a nowdoc string
	 * @constructor NowDoc
	 * @memberOf module:php-parser
	 * @extends {Literal}
	 * @property {string} label
	 * @property {string} raw
	 * @property {string} value
	 */

	var nowdoc = Literal$2.extends(KIND$F, function Nowdoc(value, raw, label, docs, location) {
	  Literal$2.apply(this, [KIND$F, value, raw, docs, location]);
	  this.label = label;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Node$5 = node;
	var KIND$E = "nullkeyword";
	/**
	 * Represents the null keyword
	 * @constructor NullKeyword
	 * @memberOf module:php-parser
	 * @extends {Node}
	 */

	var nullkeyword = Node$5.extends(KIND$E, function NullKeyword(raw, docs, location) {
	  Node$5.apply(this, [KIND$E, docs, location]);
	  this.raw = raw;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Lookup$3 = lookup;
	var KIND$D = "nullsafepropertylookup";
	/**
	 * Lookup to an object property
	 * @memberOf module:php-parser
	 * @constructor NullSafePropertyLookup
	 * @extends {Lookup}
	 */

	var nullsafepropertylookup = Lookup$3.extends(KIND$D, function NullSafePropertyLookup(what, offset, docs, location) {
	  Lookup$3.apply(this, [KIND$D, what, offset, docs, location]);
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Literal$1 = literal;
	var KIND$C = "number";
	/**
	 * Defines a numeric value
	 * @constructor Number
	 * @memberOf module:php-parser
	 * @extends {Literal}
	 * @property {number} value
	 */

	var number = Literal$1.extends(KIND$C, function Number(value, raw, docs, location) {
	  Literal$1.apply(this, [KIND$C, value, raw, docs, location]);
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Lookup$2 = lookup;
	var KIND$B = "offsetlookup";
	/**
	 * Lookup on an offset in an array
	 * @constructor OffsetLookup
	 * @memberOf module:php-parser
	 * @extends {Lookup}
	 */

	var offsetlookup = Lookup$2.extends(KIND$B, function OffsetLookup(what, offset, docs, location) {
	  Lookup$2.apply(this, [KIND$B, what, offset, docs, location]);
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Declaration$2 = declaration;
	var KIND$A = "parameter";
	/**
	 * @memberOf module:php-parser
	 * @typedef {1} MODIFIER_PUBLIC
	 **/

	/**
	 * @memberOf module:php-parser
	 * @typedef {2} MODIFIER_PROTECTED
	 **/

	/**
	 * @memberOf module:php-parser
	 * @typedef {4} MODIFIER_PRIVATE
	 **/

	/**
	 * Defines a function parameter
	 * @constructor Parameter
	 * @memberOf module:php-parser
	 * @extends {Declaration}
	 * @property {Identifier|null} type
	 * @property {Node|null} value
	 * @property {boolean} byref
	 * @property {boolean} variadic
	 * @property {boolean} readonly
	 * @property {boolean} nullable
	 * @property {AttrGroup[]} attrGroups
	 * @property {MODIFIER_PUBLIC|MODIFIER_PROTECTED|MODIFIER_PRIVATE} flags
	 */

	var parameter = Declaration$2.extends(KIND$A, function Parameter(name, type, value, isRef, isVariadic, readonly, nullable, flags, docs, location) {
	  Declaration$2.apply(this, [KIND$A, name, docs, location]);
	  this.value = value;
	  this.type = type;
	  this.byref = isRef;
	  this.variadic = isVariadic;
	  this.readonly = readonly;
	  this.nullable = nullable;
	  this.flags = flags || 0;
	  this.attrGroups = [];
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Reference$3 = reference;
	var KIND$z = "parentreference";
	/**
	 * Defines a class reference node
	 * @constructor ParentReference
	 * @memberOf module:php-parser
	 * @extends {Reference}
	 */

	var ParentReference = Reference$3.extends(KIND$z, function ParentReference(raw, docs, location) {
	  Reference$3.apply(this, [KIND$z, docs, location]);
	  this.raw = raw;
	});
	var parentreference = ParentReference;

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Operation$2 = operation;
	var KIND$y = "post";
	/**
	 * Defines a post operation `$i++` or `$i--`
	 * @constructor Post
	 * @memberOf module:php-parser
	 * @extends {Operation}
	 * @property {String} type
	 * @property {Variable} what
	 */

	var post = Operation$2.extends(KIND$y, function Post(type, what, docs, location) {
	  Operation$2.apply(this, [KIND$y, docs, location]);
	  this.type = type;
	  this.what = what;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Operation$1 = operation;
	var KIND$x = "pre";
	/**
	 * Defines a pre operation `++$i` or `--$i`
	 * @constructor Pre
	 * @memberOf module:php-parser
	 * @extends {Operation}
	 * @property {String} type
	 * @property {Variable} what
	 */

	var pre = Operation$1.extends(KIND$x, function Pre(type, what, docs, location) {
	  Operation$1.apply(this, [KIND$x, docs, location]);
	  this.type = type;
	  this.what = what;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Expression$6 = expression;
	var KIND$w = "print";
	/**
	 * Outputs
	 * @constructor Print
	 * @memberOf module:php-parser
	 * @extends {Expression}
	 */

	var print = Expression$6.extends(KIND$w, function Print(expression, docs, location) {
	  Expression$6.apply(this, [KIND$w, docs, location]);
	  this.expression = expression;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Block = block;
	var KIND$v = "program";
	/**
	 * The main program node
	 * @constructor Program
	 * @memberOf module:php-parser
	 * @extends {Block}
	 * @property {Error[]} errors
	 * @property {Comment[]|null} comments
	 * @property {String[]|null} tokens
	 */

	var program = Block.extends(KIND$v, function Program(children, errors, comments, tokens, docs, location) {
	  Block.apply(this, [KIND$v, children, docs, location]);
	  this.errors = errors;

	  if (comments) {
	    this.comments = comments;
	  }

	  if (tokens) {
	    this.tokens = tokens;
	  }
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Statement$a = statement;
	var KIND$u = "property";
	/**
	 * Defines a class property
	 * @constructor Property
	 * @memberOf module:php-parser
	 * @extends {Statement}
	 * @property {string} name
	 * @property {Node|null} value
	 * @property {boolean} readonly
	 * @property {boolean} nullable
	 * @property {Identifier|Array<Identifier>|null} type
	 * @property {AttrGroup[]} attrGroups
	 */

	var property = Statement$a.extends(KIND$u, function Property(name, value, readonly, nullable, type, attrGroups, docs, location) {
	  Statement$a.apply(this, [KIND$u, docs, location]);
	  this.name = name;
	  this.value = value;
	  this.readonly = readonly;
	  this.nullable = nullable;
	  this.type = type;
	  this.attrGroups = attrGroups;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Lookup$1 = lookup;
	var KIND$t = "propertylookup";
	/**
	 * Lookup to an object property
	 * @memberOf module:php-parser
	 * @constructor PropertyLookup
	 * @extends {Lookup}
	 */

	var propertylookup = Lookup$1.extends(KIND$t, function PropertyLookup(what, offset, docs, location) {
	  Lookup$1.apply(this, [KIND$t, what, offset, docs, location]);
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Statement$9 = statement;
	var KIND$s = "propertystatement";
	var IS_UNDEFINED$1 = "";
	var IS_PUBLIC$1 = "public";
	var IS_PROTECTED$1 = "protected";
	var IS_PRIVATE$1 = "private";
	/**
	 * Declares a properties into the current scope
	 * @constructor PropertyStatement
	 * @memberOf module:php-parser
	 * @extends {Statement}
	 * @property {Property[]} properties
	 * @property {string|null} visibility
	 * @property {boolean} isStatic
	 */

	var PropertyStatement = Statement$9.extends(KIND$s, function PropertyStatement(kind, properties, flags, docs, location) {
	  Statement$9.apply(this, [KIND$s, docs, location]);
	  this.properties = properties;
	  this.parseFlags(flags);
	});
	/**
	 * Generic flags parser
	 * @function PropertyStatement#parseFlags
	 * @memberOf module:php-parser
	 * @param {Array<number|null>} flags
	 * @return {void}
	 */

	PropertyStatement.prototype.parseFlags = function (flags) {
	  if (flags[0] === -1) {
	    this.visibility = IS_UNDEFINED$1;
	  } else if (flags[0] === null) {
	    this.visibility = null;
	  } else if (flags[0] === 0) {
	    this.visibility = IS_PUBLIC$1;
	  } else if (flags[0] === 1) {
	    this.visibility = IS_PROTECTED$1;
	  } else if (flags[0] === 2) {
	    this.visibility = IS_PRIVATE$1;
	  }

	  this.isStatic = flags[1] === 1;
	};

	var propertystatement = PropertyStatement;

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Expression$5 = expression;
	var KIND$r = "retif";
	/**
	 * Defines a short if statement that returns a value
	 * @constructor RetIf
	 * @memberOf module:php-parser
	 * @extends {Expression}
	 * @property {Expression} test
	 * @property {Expression} trueExpr
	 * @property {Expression} falseExpr
	 */

	var retif = Expression$5.extends(KIND$r, function RetIf(test, trueExpr, falseExpr, docs, location) {
	  Expression$5.apply(this, [KIND$r, docs, location]);
	  this.test = test;
	  this.trueExpr = trueExpr;
	  this.falseExpr = falseExpr;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Statement$8 = statement;
	var KIND$q = "return";
	/**
	 * A continue statement
	 * @constructor Return
	 * @memberOf module:php-parser
	 * @extends {Statement}
	 * @property {Expression|null} expr
	 */

	var _return = Statement$8.extends(KIND$q, function Return(expr, docs, location) {
	  Statement$8.apply(this, [KIND$q, docs, location]);
	  this.expr = expr;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Reference$2 = reference;
	var KIND$p = "selfreference";
	/**
	 * Defines a class reference node
	 * @constructor SelfReference
	 * @memberOf module:php-parser
	 * @extends {Reference}
	 */

	var SelfReference = Reference$2.extends(KIND$p, function SelfReference(raw, docs, location) {
	  Reference$2.apply(this, [KIND$p, docs, location]);
	  this.raw = raw;
	});
	var selfreference = SelfReference;

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Expression$4 = expression;
	var KIND$o = "silent";
	/**
	 * Avoids to show/log warnings & notices from the inner expression
	 * @constructor Silent
	 * @memberOf module:php-parser
	 * @extends {Expression}
	 * @property {Expression} expr
	 */

	var silent = Expression$4.extends(KIND$o, function Silent(expr, docs, location) {
	  Expression$4.apply(this, [KIND$o, docs, location]);
	  this.expr = expr;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Statement$7 = statement;
	var KIND$n = "static";
	/**
	 * Declares a static variable into the current scope
	 * @constructor Static
	 * @memberOf module:php-parser
	 * @extends {Statement}
	 * @property {StaticVariable[]} variables
	 */

	var _static = Statement$7.extends(KIND$n, function Static(variables, docs, location) {
	  Statement$7.apply(this, [KIND$n, docs, location]);
	  this.variables = variables;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Node$4 = node;
	var KIND$m = "staticvariable";
	/**
	 * Defines a constant
	 * @constructor StaticVariable
	 * @memberOf module:php-parser
	 * @extends {Node}
	 * @property {Variable} variable
	 * @property {Node|string|number|boolean|null} defaultValue
	 */

	var staticvariable = Node$4.extends(KIND$m, function StaticVariable(variable, defaultValue, docs, location) {
	  Node$4.apply(this, [KIND$m, docs, location]);
	  this.variable = variable;
	  this.defaultValue = defaultValue;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Lookup = lookup;
	var KIND$l = "staticlookup";
	/**
	 * Lookup to a static property
	 * @constructor StaticLookup
	 * @memberOf module:php-parser
	 * @extends {Lookup}
	 */

	var staticlookup = Lookup.extends(KIND$l, function StaticLookup(what, offset, docs, location) {
	  Lookup.apply(this, [KIND$l, what, offset, docs, location]);
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Reference$1 = reference;
	var KIND$k = "staticreference";
	/**
	 * Defines a class reference node
	 * @constructor StaticReference
	 * @memberOf module:php-parser
	 * @extends {Reference}
	 */

	var StaticReference = Reference$1.extends(KIND$k, function StaticReference(raw, docs, location) {
	  Reference$1.apply(this, [KIND$k, docs, location]);
	  this.raw = raw;
	});
	var staticreference = StaticReference;

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Literal = literal;
	var KIND$j = "string";
	/**
	 * Defines a string (simple or double quoted) - chars are already escaped
	 * @constructor String
	 * @memberOf module:php-parser
	 * @extends {Literal}
	 * @property {boolean} unicode
	 * @property {boolean} isDoubleQuote
	 * @see {Encapsed}
	 * @property {string} value
	 */

	var string = Literal.extends(KIND$j, function String(isDoubleQuote, value, unicode, raw, docs, location) {
	  Literal.apply(this, [KIND$j, value, raw, docs, location]);
	  this.unicode = unicode;
	  this.isDoubleQuote = isDoubleQuote;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Statement$6 = statement;
	var KIND$i = "switch";
	/**
	 * Defines a switch statement
	 * @constructor Switch
	 * @memberOf module:php-parser
	 * @extends {Statement}
	 * @property {Expression} test
	 * @property {Block} body
	 * @property {boolean} shortForm
	 */

	var _switch = Statement$6.extends(KIND$i, function Switch(test, body, shortForm, docs, location) {
	  Statement$6.apply(this, [KIND$i, docs, location]);
	  this.test = test;
	  this.body = body;
	  this.shortForm = shortForm;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Statement$5 = statement;
	var KIND$h = "throw";
	/**
	 * Defines a throw statement
	 * @constructor Throw
	 * @memberOf module:php-parser
	 * @extends {Statement}
	 * @property {Expression} what
	 */

	var _throw = Statement$5.extends(KIND$h, function Throw(what, docs, location) {
	  Statement$5.apply(this, [KIND$h, docs, location]);
	  this.what = what;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Declaration$1 = declaration;
	var KIND$g = "trait";
	/**
	 * A trait definition
	 * @constructor Trait
	 * @memberOf module:php-parser
	 * @extends {Declaration}
	 * @property {Declaration[]} body
	 */

	var trait = Declaration$1.extends(KIND$g, function Trait(name, body, docs, location) {
	  Declaration$1.apply(this, [KIND$g, name, docs, location]);
	  this.body = body;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Node$3 = node;
	var KIND$f = "traitalias";
	var IS_UNDEFINED = "";
	var IS_PUBLIC = "public";
	var IS_PROTECTED = "protected";
	var IS_PRIVATE = "private";
	/**
	 * Defines a trait alias
	 * @constructor TraitAlias
	 * @memberOf module:php-parser
	 * @extends {Node}
	 * @property {Identifier|null} trait
	 * @property {Identifier} method
	 * @property {Identifier|null} as
	 * @property {string|null} visibility
	 */

	var traitalias = Node$3.extends(KIND$f, function TraitAlias(trait, method, as, flags, docs, location) {
	  Node$3.apply(this, [KIND$f, docs, location]);
	  this.trait = trait;
	  this.method = method;
	  this.as = as;
	  this.visibility = IS_UNDEFINED;

	  if (flags) {
	    if (flags[0] === 0) {
	      this.visibility = IS_PUBLIC;
	    } else if (flags[0] === 1) {
	      this.visibility = IS_PROTECTED;
	    } else if (flags[0] === 2) {
	      this.visibility = IS_PRIVATE;
	    }
	  }
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Node$2 = node;
	var KIND$e = "traitprecedence";
	/**
	 * Defines a trait alias
	 * @constructor TraitPrecedence
	 * @memberOf module:php-parser
	 * @extends {Node}
	 * @property {Identifier|null} trait
	 * @property {Identifier} method
	 * @property {Identifier[]} instead
	 */

	var traitprecedence = Node$2.extends(KIND$e, function TraitPrecedence(trait, method, instead, docs, location) {
	  Node$2.apply(this, [KIND$e, docs, location]);
	  this.trait = trait;
	  this.method = method;
	  this.instead = instead;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Node$1 = node;
	var KIND$d = "traituse";
	/**
	 * Defines a trait usage
	 * @constructor TraitUse
	 * @memberOf module:php-parser
	 * @extends {Node}
	 * @property {Identifier[]} traits
	 * @property {Node[]|null} adaptations
	 */

	var traituse = Node$1.extends(KIND$d, function TraitUse(traits, adaptations, docs, location) {
	  Node$1.apply(this, [KIND$d, docs, location]);
	  this.traits = traits;
	  this.adaptations = adaptations;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Statement$4 = statement;
	var KIND$c = "try";
	/**
	 * Defines a try statement
	 * @constructor Try
	 * @memberOf module:php-parser
	 * @extends {Statement}
	 * @property {Block} body
	 * @property {Catch[]} catches
	 * @property {Block} always
	 */

	var _try = Statement$4.extends(KIND$c, function Try(body, catches, always, docs, location) {
	  Statement$4.apply(this, [KIND$c, docs, location]);
	  this.body = body;
	  this.catches = catches;
	  this.always = always;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Reference = reference;
	var KIND$b = "typereference";
	/**
	 * Defines a class reference node
	 * @constructor TypeReference
	 * @memberOf module:php-parser
	 * @extends {Reference}
	 * @property {string} name
	 */

	var TypeReference = Reference.extends(KIND$b, function TypeReference(name, raw, docs, location) {
	  Reference.apply(this, [KIND$b, docs, location]);
	  this.name = name;
	  this.raw = raw;
	});
	TypeReference.types = ["int", "float", "string", "bool", "object", "array", "callable", "iterable", "void", "static"];
	var typereference = TypeReference;

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Operation = operation;
	var KIND$a = "unary";
	/**
	 * Unary operations
	 * @constructor Unary
	 * @memberOf module:php-parser
	 * @extends {Operation}
	 * @property {string} type
	 * @property {Expression} what
	 */

	var unary = Operation.extends(KIND$a, function Unary(type, what, docs, location) {
	  Operation.apply(this, [KIND$a, docs, location]);
	  this.type = type;
	  this.what = what;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Declaration = declaration;
	var KIND$9 = "uniontype";
	/**
	 * A union of types
	 * @memberOf module:php-parser
	 * @constructor UnionType
	 * @extends {Declaration}
	 * @property {TypeReference[]} types
	 */

	var uniontype = Declaration.extends(KIND$9, function UnionType(types, docs, location) {
	  Declaration.apply(this, [KIND$9, null, docs, location]);
	  this.types = types;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Statement$3 = statement;
	var KIND$8 = "unset";
	/**
	 * Deletes references to a list of variables
	 * @constructor Unset
	 * @memberOf module:php-parser
	 * @extends {Statement}
	 */

	var unset = Statement$3.extends(KIND$8, function Unset(variables, docs, location) {
	  Statement$3.apply(this, [KIND$8, docs, location]);
	  this.variables = variables;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Statement$2 = statement;
	var KIND$7 = "usegroup";
	/**
	 * Defines a use statement (with a list of use items)
	 * @constructor UseGroup
	 * @memberOf module:php-parser
	 * @extends {Statement}
	 * @property {string|null} name
	 * @property {string|null} type - Possible value : function, const
	 * @property {UseItem[]} item
	 * @see {Namespace}
	 * @see http://php.net/manual/en/language.namespaces.importing.php
	 */

	var usegroup = Statement$2.extends(KIND$7, function UseGroup(name, type, items, docs, location) {
	  Statement$2.apply(this, [KIND$7, docs, location]);
	  this.name = name;
	  this.type = type;
	  this.items = items;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Statement$1 = statement;
	var KIND$6 = "useitem";
	/**
	 * Defines a use statement (from namespace)
	 * @constructor UseItem
	 * @memberOf module:php-parser
	 * @extends {Statement}
	 * @property {string} name
	 * @property {string|null} type - Possible value : function, const
	 * @property {Identifier|null} alias
	 * @see {Namespace}
	 * @see http://php.net/manual/en/language.namespaces.importing.php
	 */

	var UseItem = Statement$1.extends(KIND$6, function UseItem(name, alias, type, docs, location) {
	  Statement$1.apply(this, [KIND$6, docs, location]);
	  this.name = name;
	  this.alias = alias;
	  this.type = type;
	});
	/**
	 * Importing a constant
	 * @constant {string} UseItem#TYPE_CONST
	 * @memberOf module:php-parser
	 */

	UseItem.TYPE_CONST = "const";
	/**
	 * Importing a function
	 * @constant {string} UseItem#TYPE_FUNC
	 * @memberOf module:php-parser
	 */

	UseItem.TYPE_FUNCTION = "function";
	var useitem = UseItem;

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Expression$3 = expression;
	var KIND$5 = "variable";
	/**
	 * Any expression node. Since the left-hand side of an assignment may
	 * be any expression in general, an expression can also be a pattern.
	 * @constructor Variable
	 * @memberOf module:php-parser
	 * @extends {Expression}
	 * @example
	 * // PHP code :
	 * $foo
	 * // AST output
	 * {
	 *  "kind": "variable",
	 *  "name": "foo",
	 *  "curly": false
	 * }
	 * @property {string|Node} name The variable name (can be a complex expression when the name is resolved dynamically)
	 * @property {boolean} curly Indicate if the name is defined between curlies, ex `${foo}`
	 */

	var variable = Expression$3.extends(KIND$5, function Variable(name, curly, docs, location) {
	  Expression$3.apply(this, [KIND$5, docs, location]);
	  this.name = name;
	  this.curly = curly || false;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Expression$2 = expression;
	var KIND$4 = "variadic";
	/**
	 * Introduce a list of items into the arguments of the call
	 * @constructor Variadic
	 * @memberOf module:php-parser
	 * @extends {Expression}
	 * @property {Array|Expression} what
	 * @see https://wiki.php.net/rfc/argument_unpacking
	 */

	var variadic = Expression$2.extends(KIND$4, function variadic(what, docs, location) {
	  Expression$2.apply(this, [KIND$4, docs, location]);
	  this.what = what;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Node = node;
	var KIND$3 = "variadicplaceholder";
	/**
	 * Defines a variadic placeholder (the ellipsis in PHP 8.1+'s first-class callable syntax)
	 * @constructor VariadicPlaceholder
	 * @memberOf module:php-parser
	 * @extends {Node}
	 * @see {Namespace}
	 * @see http://php.net/manual/en/language.namespaces.importing.php
	 */

	var variadicplaceholder = Node.extends(KIND$3, function VariadicPlaceholder(docs, location) {
	  Node.apply(this, [KIND$3, docs, location]);
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Statement = statement;
	var KIND$2 = "while";
	/**
	 * Defines a while statement
	 * @constructor While
	 * @memberOf module:php-parser
	 * @extends {Statement}
	 * @property {Expression} test
	 * @property {Block | null} body
	 * @property {boolean} shortForm
	 */

	var _while = Statement.extends(KIND$2, function While(test, body, shortForm, docs, location) {
	  Statement.apply(this, [KIND$2, docs, location]);
	  this.test = test;
	  this.body = body;
	  this.shortForm = shortForm;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Expression$1 = expression;
	var KIND$1 = "yield";
	/**
	 * Defines a yield generator statement
	 * @constructor Yield
	 * @memberOf module:php-parser
	 * @extends {Expression}
	 * @property {Expression|null} value
	 * @property {Expression|null} key
	 * @see http://php.net/manual/en/language.generators.syntax.php
	 */

	var _yield = Expression$1.extends(KIND$1, function Yield(value, key, docs, location) {
	  Expression$1.apply(this, [KIND$1, docs, location]);
	  this.value = value;
	  this.key = key;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Expression = expression;
	var KIND = "yieldfrom";
	/**
	 * Defines a yield from generator statement
	 * @constructor YieldFrom
	 * @memberOf module:php-parser
	 * @extends {Expression}
	 * @property {Expression} value
	 * @see http://php.net/manual/en/language.generators.syntax.php
	 */

	var yieldfrom = Expression.extends(KIND, function YieldFrom(value, docs, location) {
	  Expression.apply(this, [KIND, docs, location]);
	  this.value = value;
	});

	/**
	 * Copyright (C) 2018 Glayzzle (BSD3 License)
	 * @authors https://github.com/glayzzle/php-parser/graphs/contributors
	 * @url http://glayzzle.com
	 */

	var Location = location;
	var Position = position;
	/**
	 * ## Class hierarchy
	 *
	 * - [Location](#location)
	 * - [Position](#position)
	 * - [Node](#node)
	 *   - [Noop](#noop)
	 *   - [NullKeyword](#nullkeyword)
	 *   - [StaticVariable](#staticvariable)
	 *   - [EncapsedPart](#encapsedpart)
	 *   - [Constant](#constant)
	 *   - [Identifier](#identifier)
	 *   - [Reference](#reference)
	 *     - [TypeReference](#typereference)
	 *     - [ParentReference](#parentreference)
	 *     - [StaticReference](#staticreference)
	 *     - [SelfReference](#selfreference)
	 *     - [Name](#name)
	 *   - [TraitUse](#traituse)
	 *   - [TraitAlias](#traitalias)
	 *   - [TraitPrecedence](#traitprecedence)
	 *   - [Comment](#comment)
	 *     - [CommentLine](#commentline)
	 *     - [CommentBlock](#commentblock)
	 *   - [Error](#error)
	 *   - [Expression](#expression)
	 *     - [Entry](#entry)
	 *     - [ArrowFunc](#arrowfunc)
	 *     - [Closure](#closure)
	 *     - [ByRef](#byref)
	 *     - [Silent](#silent)
	 *     - [RetIf](#retif)
	 *     - [New](#new)
	 *     - [Include](#include)
	 *     - [Call](#call)
	 *     - [Eval](#eval)
	 *     - [Exit](#exit)
	 *     - [Clone](#clone)
	 *     - [Assign](#assign)
	 *     - [AssignRef](#assignref)
	 *     - [Array](#array)
	 *     - [List](#list)
	 *     - [Variable](#variable)
	 *     - [Variadic](#variadic)
	 *     - [Yield](#yield)
	 *     - [YieldFrom](#yieldfrom)
	 *     - [Print](#print)
	 *     - [Isset](#isset)
	 *     - [Empty](#empty)
	 *     - [Lookup](#lookup)
	 *       - [PropertyLookup](#propertylookup)
	 *       - [StaticLookup](#staticlookup)
	 *       - [OffsetLookup](#offsetlookup)
	 *     - [Operation](#operation)
	 *       - [Pre](#pre)
	 *       - [Post](#post)
	 *       - [Bin](#bin)
	 *       - [Unary](#unary)
	 *       - [Cast](#cast)
	 *     - [Literal](#literal)
	 *       - [Boolean](#boolean)
	 *       - [String](#string)
	 *       - [Number](#number)
	 *       - [Inline](#inline)
	 *       - [Magic](#magic)
	 *       - [Nowdoc](#nowdoc)
	 *       - [Encapsed](#encapsed)
	 *   - [Statement](#statement)
	 *     - [ConstantStatement](#constantstatement)
	 *       - [ClassConstant](#classconstant)
	 *     - [Return](#return)
	 *     - [Label](#label)
	 *     - [Continue](#continue)
	 *     - [Case](#case)
	 *     - [Break](#break)
	 *     - [Echo](#echo)
	 *     - [Unset](#unset)
	 *     - [Halt](#halt)
	 *     - [Declare](#declare)
	 *     - [Global](#global)
	 *     - [Static](#static)
	 *     - [If](#if)
	 *     - [Do](#do)
	 *     - [While](#while)
	 *     - [For](#for)
	 *     - [Foreach](#foreach)
	 *     - [Switch](#switch)
	 *     - [Goto](#goto)
	 *     - [Try](#try)
	 *     - [Catch](#catch)
	 *     - [Throw](#throw)
	 *     - [UseGroup](#usegroup)
	 *     - [UseItem](#useitem)
	 *     - [Block](#block)
	 *       - [Program](#program)
	 *       - [Namespace](#namespace)
	 *     - [PropertyStatement](#propertystatement)
	 *     - [Property](#property)
	 *     - [Declaration](#declaration)
	 *       - [Class](#class)
	 *       - [Interface](#interface)
	 *       - [Trait](#trait)
	 *       - [Function](#function)
	 *         - [Method](#method)
	 *       - [Parameter](#parameter)
	 * ---
	 */

	/**
	 * The AST builder class
	 * @constructor AST
	 * @memberOf module:php-parser
	 * @tutorial AST
	 * @property {Boolean} withPositions - Should locate any node (by default false)
	 * @property {Boolean} withSource - Should extract the node original code (by default false)
	 */

	var AST$1 = function AST(withPositions, withSource) {
	  this.withPositions = withPositions;
	  this.withSource = withSource;
	}; // operators in ascending order of precedence


	AST$1.precedence = {};
	[["or"], ["xor"], ["and"], ["="], ["?"], ["??"], ["||"], ["&&"], ["|"], ["^"], ["&"], ["==", "!=", "===", "!==",
	/* '<>', */
	"<=>"], ["<", "<=", ">", ">="], ["<<", ">>"], ["+", "-", "."], ["*", "/", "%"], ["!"], ["instanceof"], ["cast", "silent"], ["**"] // TODO: [ (array)
	// TODO: clone, new
	].forEach(function (list, index) {
	  list.forEach(function (operator) {
	    AST$1.precedence[operator] = index + 1;
	  });
	});
	/**
	 * @private
	 * @function AST#isRightAssociative
	 * @memberOf module:php-parser
	 * @param operator
	 * @return {boolean}
	 */

	AST$1.prototype.isRightAssociative = function (operator) {
	  return operator === "**" || operator === "??";
	};
	/**
	 * Change parent node informations after swapping childs
	 * @private
	 * @function AST#swapLocations
	 * @memberOf module:php-parser
	 */


	AST$1.prototype.swapLocations = function (target, first, last, parser) {
	  if (this.withPositions) {
	    target.loc.start = first.loc.start;
	    target.loc.end = last.loc.end;

	    if (this.withSource) {
	      target.loc.source = parser.lexer._input.substring(target.loc.start.offset, target.loc.end.offset);
	    }
	  }
	};
	/**
	 * Includes locations from first & last into the target
	 * @private
	 * @function AST#resolveLocations
	 * @memberOf module:php-parser
	 */


	AST$1.prototype.resolveLocations = function (target, first, last, parser) {
	  if (this.withPositions) {
	    if (target.loc.start.offset > first.loc.start.offset) {
	      target.loc.start = first.loc.start;
	    }
	    /* istanbul ignore next */


	    if (target.loc.end.offset < last.loc.end.offset) {
	      target.loc.end = last.loc.end;
	    }

	    if (this.withSource) {
	      target.loc.source = parser.lexer._input.substring(target.loc.start.offset, target.loc.end.offset);
	    }
	  }
	};
	/**
	 * Check and fix precence, by default using right
	 * @private
	 * @function AST#resolvePrecedence
	 * @memberOf module:php-parser
	 */


	AST$1.prototype.resolvePrecedence = function (result, parser) {
	  var buffer, lLevel, rLevel; // handling precendence

	  if (result.kind === "call") {
	    // including what argument into location
	    this.resolveLocations(result, result.what, result, parser);
	  } else if (result.kind === "propertylookup" || result.kind === "staticlookup" || result.kind === "offsetlookup" && result.offset) {
	    // including what argument into location
	    this.resolveLocations(result, result.what, result.offset, parser);
	  } else if (result.kind === "bin") {
	    if (result.right && !result.right.parenthesizedExpression) {
	      if (result.right.kind === "bin") {
	        lLevel = AST$1.precedence[result.type];
	        rLevel = AST$1.precedence[result.right.type];

	        if (lLevel && rLevel && rLevel <= lLevel && (result.type !== result.right.type || !this.isRightAssociative(result.type))) {
	          // https://github.com/glayzzle/php-parser/issues/79
	          // shift precedence
	          buffer = result.right;
	          result.right = result.right.left;
	          this.swapLocations(result, result.left, result.right, parser);
	          buffer.left = this.resolvePrecedence(result, parser);
	          this.swapLocations(buffer, buffer.left, buffer.right, parser);
	          result = buffer;
	        }
	      } else if (result.right.kind === "retif") {
	        lLevel = AST$1.precedence[result.type];
	        rLevel = AST$1.precedence["?"];

	        if (lLevel && rLevel && rLevel <= lLevel) {
	          buffer = result.right;
	          result.right = result.right.test;
	          this.swapLocations(result, result.left, result.right, parser);
	          buffer.test = this.resolvePrecedence(result, parser);
	          this.swapLocations(buffer, buffer.test, buffer.falseExpr, parser);
	          result = buffer;
	        }
	      }
	    }
	  } else if ((result.kind === "silent" || result.kind === "cast") && result.expr && !result.expr.parenthesizedExpression) {
	    // https://github.com/glayzzle/php-parser/issues/172
	    if (result.expr.kind === "bin") {
	      buffer = result.expr;
	      result.expr = result.expr.left;
	      this.swapLocations(result, result, result.expr, parser);
	      buffer.left = this.resolvePrecedence(result, parser);
	      this.swapLocations(buffer, buffer.left, buffer.right, parser);
	      result = buffer;
	    } else if (result.expr.kind === "retif") {
	      buffer = result.expr;
	      result.expr = result.expr.test;
	      this.swapLocations(result, result, result.expr, parser);
	      buffer.test = this.resolvePrecedence(result, parser);
	      this.swapLocations(buffer, buffer.test, buffer.falseExpr, parser);
	      result = buffer;
	    }
	  } else if (result.kind === "unary") {
	    // https://github.com/glayzzle/php-parser/issues/75
	    if (result.what && !result.what.parenthesizedExpression) {
	      // unary precedence is always lower
	      if (result.what.kind === "bin") {
	        buffer = result.what;
	        result.what = result.what.left;
	        this.swapLocations(result, result, result.what, parser);
	        buffer.left = this.resolvePrecedence(result, parser);
	        this.swapLocations(buffer, buffer.left, buffer.right, parser);
	        result = buffer;
	      } else if (result.what.kind === "retif") {
	        buffer = result.what;
	        result.what = result.what.test;
	        this.swapLocations(result, result, result.what, parser);
	        buffer.test = this.resolvePrecedence(result, parser);
	        this.swapLocations(buffer, buffer.test, buffer.falseExpr, parser);
	        result = buffer;
	      }
	    }
	  } else if (result.kind === "retif") {
	    // https://github.com/glayzzle/php-parser/issues/77
	    if (result.falseExpr && result.falseExpr.kind === "retif" && !result.falseExpr.parenthesizedExpression) {
	      buffer = result.falseExpr;
	      result.falseExpr = buffer.test;
	      this.swapLocations(result, result.test, result.falseExpr, parser);
	      buffer.test = this.resolvePrecedence(result, parser);
	      this.swapLocations(buffer, buffer.test, buffer.falseExpr, parser);
	      result = buffer;
	    }
	  } else if (result.kind === "assign") {
	    // https://github.com/glayzzle/php-parser/issues/81
	    if (result.right && result.right.kind === "bin" && !result.right.parenthesizedExpression) {
	      lLevel = AST$1.precedence["="];
	      rLevel = AST$1.precedence[result.right.type]; // only shifts with and, xor, or

	      if (lLevel && rLevel && rLevel < lLevel) {
	        buffer = result.right;
	        result.right = result.right.left;
	        buffer.left = result;
	        this.swapLocations(buffer, buffer.left, result.right, parser);
	        result = buffer;
	      }
	    }
	  } else if (result.kind === "expressionstatement") {
	    this.swapLocations(result, result.expression, result, parser);
	  }

	  return result;
	};
	/**
	 * Prepares an AST node
	 * @private
	 * @function AST#prepare
	 * @memberOf module:php-parser
	 * @param {String|null} kind - Defines the node type
	 * @param {*} docs - (if null, the kind must be passed at the function call)
	 * @param {Parser} parser - The parser instance (use for extracting locations)
	 * @return {Function}
	 */


	AST$1.prototype.prepare = function (kind, docs, parser) {
	  var start = null;

	  if (this.withPositions || this.withSource) {
	    start = parser.position();
	  }

	  var self = this; // returns the node

	  var result = function result() {
	    var location = null;
	    var args = Array.prototype.slice.call(arguments);
	    args.push(docs);

	    if (self.withPositions || self.withSource) {
	      var src = null;

	      if (self.withSource) {
	        src = parser.lexer._input.substring(start.offset, parser.prev[2]);
	      } // if with source, need location on swapLocations function


	      location = new Location(src, start, new Position(parser.prev[0], parser.prev[1], parser.prev[2])); // last argument is always the location

	      args.push(location);
	    } // handle lazy kind definitions


	    if (!kind) {
	      kind = args.shift();
	    } // build the object


	    var node = self[kind];

	    if (typeof node !== "function") {
	      throw new Error('Undefined node "' + kind + '"');
	    }

	    var astNode = Object.create(node.prototype);
	    node.apply(astNode, args);
	    result.instance = astNode;
	    /* istanbul ignore next */

	    if (result.trailingComments) {
	      // buffer of trailingComments
	      astNode.trailingComments = result.trailingComments;
	    }

	    if (typeof result.postBuild === "function") {
	      result.postBuild(astNode);
	    }

	    if (parser.debug) {
	      delete self.stack[result.stackUid];
	    }

	    return self.resolvePrecedence(astNode, parser);
	  };

	  if (parser.debug) {
	    if (!this.stack) {
	      this.stack = {};
	      this.stackUid = 1;
	    }

	    this.stack[++this.stackUid] = {
	      position: start,
	      stack: new Error().stack.split("\n").slice(3, 5)
	    };
	    result.stackUid = this.stackUid;
	  }
	  /**
	   * Sets a list of trailing comments
	   * @private
	   * @param {*} docs
	   */


	  result.setTrailingComments = function (docs) {
	    if (result.instance) {
	      // already created
	      result.instance.setTrailingComments(docs);
	    } else {
	      result.trailingComments = docs;
	    }
	  };
	  /**
	   * Release a node without using it on the AST
	   * @private
	   * @param {*} target
	   */


	  result.destroy = function (target) {
	    if (docs) {
	      // release current docs stack
	      if (target) {
	        if (!target.leadingComments) {
	          target.leadingComments = docs;
	        } else {
	          target.leadingComments = docs.concat(target.leadingComments);
	        }
	      } else {
	        parser._docIndex = parser._docs.length - docs.length;
	      }
	    }

	    if (parser.debug) {
	      delete self.stack[result.stackUid];
	    }
	  };

	  return result;
	};

	AST$1.prototype.checkNodes = function () {
	  var errors = [];

	  for (var k in this.stack) {
	    if (Object.prototype.hasOwnProperty.call(this.stack, k)) {
	      this.stack[k].key = k;
	      errors.push(this.stack[k]);
	    }
	  }

	  this.stack = {};
	  return errors;
	}; // Define all AST nodes


	[array, arrowfunc, assign, assignref, attribute, attrgroup, bin, block, boolean, _break, byref, call, _case, cast, _catch, _class, classconstant, clone, closure, comment, commentblock, commentline, constant, constantstatement, _continue, declaration, declare, declaredirective, _do, echo, empty, encapsed, encapsedpart, entry, _enum, enumcase, error, _eval, exit, expression, expressionstatement, _for, foreach, _function, global$1, goto, halt, identifier, _if, include, inline, _interface, intersectiontype, isset, label, list, literal, lookup, magic, match, matcharm, method, name, namespace, namedargument, _new, node, noop, nowdoc, nullkeyword, nullsafepropertylookup, number, offsetlookup, operation, parameter, parentreference, post, pre, print, program, property, propertylookup, propertystatement, reference, retif, _return, selfreference, silent, statement, _static, staticvariable, staticlookup, staticreference, string, _switch, _throw, trait, traitalias, traitprecedence, traituse, _try, typereference, unary, uniontype, unset, usegroup, useitem, variable, variadic, variadicplaceholder, _while, _yield, yieldfrom].forEach(function (ctor) {
	  AST$1.prototype[ctor.kind] = ctor;
	});
	var ast = AST$1;

	var lexer = lexer$1;
	var parser = parser$1;
	var tokens = tokens_1;
	var AST = ast;
	/**
	 * @private
	 */

	function combine(src, to) {
	  var keys = Object.keys(src);
	  var i = keys.length;

	  while (i--) {
	    var k = keys[i];
	    var val = src[k];

	    if (val === null) {
	      delete to[k];
	    } else if (typeof val === "function") {
	      to[k] = val.bind(to);
	    } else if (Array.isArray(val)) {
	      to[k] = Array.isArray(to[k]) ? to[k].concat(val) : val;
	    } else if (_typeof(val) === "object") {
	      to[k] = _typeof(to[k]) === "object" ? combine(val, to[k]) : val;
	    } else {
	      to[k] = val;
	    }
	  }

	  return to;
	}
	/**
	 * Initialise a new parser instance with the specified options
	 *
	 * @class
	 * @memberOf module:php-parser
	 * @tutorial Engine
	 * @example
	 * var parser = require('php-parser');
	 * var instance = new parser({
	 *   parser: {
	 *     extractDoc: true,
	 *     suppressErrors: true,
	 *     version: 704 // or '7.4'
	 *   },
	 *   ast: {
	 *     withPositions: true
	 *   },
	 *   lexer: {
	 *     short_tags: true,
	 *     asp_tags: true
	 *   }
	 * });
	 *
	 * var evalAST = instance.parseEval('some php code');
	 * var codeAST = instance.parseCode('<?php some php code', 'foo.php');
	 * var tokens = instance.tokenGetAll('<?php some php code');
	 *
	 * @param {Object} options - List of options
	 * @property {Lexer} lexer
	 * @property {Parser} parser
	 * @property {AST} ast
	 * @property {Object} tokens
	 */


	var Engine = function Engine(options) {
	  if (typeof this === "function") {
	    return new this(options);
	  }

	  this.tokens = tokens;
	  this.lexer = new lexer(this);
	  this.ast = new AST();
	  this.parser = new parser(this.lexer, this.ast);

	  if (options && _typeof(options) === "object") {
	    // disable php7 from lexer if already disabled from parser
	    if (options.parser) {
	      if (!options.lexer) {
	        options.lexer = {};
	      }

	      if (options.parser.version) {
	        if (typeof options.parser.version === "string") {
	          var version = options.parser.version.split(".");
	          version = parseInt(version[0]) * 100 + parseInt(version[1]);

	          if (isNaN(version)) {
	            throw new Error("Bad version number : " + options.parser.version);
	          } else {
	            options.parser.version = version;
	          }
	        } else if (typeof options.parser.version !== "number") {
	          throw new Error("Expecting a number for version");
	        }

	        if (options.parser.version < 500 || options.parser.version > 900) {
	          throw new Error("Can only handle versions between 5.x to 8.x");
	        }
	      }
	    }

	    combine(options, this); // same version flags based on parser options

	    this.lexer.version = this.parser.version;
	  }
	};
	/**
	 * Check if the inpyt is a buffer or a string
	 * @private
	 * @param  {Buffer|String} buffer Input value that can be either a buffer or a string
	 * @return {String}   Returns the string from input
	 */


	var getStringBuffer = function getStringBuffer(buffer) {
	  return typeof buffer.write === "function" ? buffer.toString() : buffer;
	};
	/**
	 * Creates a new instance (Helper)
	 * @param {Object} options
	 * @return {Engine}
	 * @private
	 */


	Engine.create = function (options) {
	  return new Engine(options);
	};
	/**
	 * Evaluate the buffer
	 * @private
	 */


	Engine.parseEval = function (buffer, options) {
	  var self = new Engine(options);
	  return self.parseEval(buffer);
	};
	/**
	 * Parse an evaluating mode string (no need to open php tags)
	 * @param {String} buffer
	 * @return {Program}
	 */


	Engine.prototype.parseEval = function (buffer) {
	  this.lexer.mode_eval = true;
	  this.lexer.all_tokens = false;
	  buffer = getStringBuffer(buffer);
	  return this.parser.parse(buffer, "eval");
	};
	/**
	 * Static function that parse a php code with open/close tags
	 * @private
	 */


	Engine.parseCode = function (buffer, filename, options) {
	  if (_typeof(filename) === "object" && !options) {
	    // retro-compatibility
	    options = filename;
	    filename = "unknown";
	  }

	  var self = new Engine(options);
	  return self.parseCode(buffer, filename);
	};
	/**
	 * Function that parse a php code with open/close tags
	 *
	 * Sample code :
	 * ```php
	 * <?php $x = 1;
	 * ```
	 *
	 * Usage :
	 * ```js
	 * var parser = require('php-parser');
	 * var phpParser = new parser({
	 *   // some options
	 * });
	 * var ast = phpParser.parseCode('...php code...', 'foo.php');
	 * ```
	 * @param {String} buffer - The code to be parsed
	 * @param {String} filename - Filename
	 * @return {Program}
	 */


	Engine.prototype.parseCode = function (buffer, filename) {
	  this.lexer.mode_eval = false;
	  this.lexer.all_tokens = false;
	  buffer = getStringBuffer(buffer);
	  return this.parser.parse(buffer, filename);
	};
	/**
	 * Split the buffer into tokens
	 * @private
	 */


	Engine.tokenGetAll = function (buffer, options) {
	  var self = new Engine(options);
	  return self.tokenGetAll(buffer);
	};
	/**
	 * Extract tokens from the specified buffer.
	 * > Note that the output tokens are *STRICLY* similar to PHP function `token_get_all`
	 * @param {string} buffer
	 * @return {Array<string|string[]>} - Each item can be a string or an array with following informations [token_name, text, line_number]
	 */


	Engine.prototype.tokenGetAll = function (buffer) {
	  this.lexer.mode_eval = false;
	  this.lexer.all_tokens = true;
	  buffer = getStringBuffer(buffer);
	  var EOF = this.lexer.EOF;
	  var names = this.tokens.values;
	  this.lexer.setInput(buffer);
	  var token = this.lexer.lex() || EOF;
	  var result = [];

	  while (token != EOF) {
	    var entry = this.lexer.yytext;

	    if (Object.prototype.hasOwnProperty.call(names, token)) {
	      entry = [names[token], entry, this.lexer.yylloc.first_line];
	    }

	    result.push(entry);
	    token = this.lexer.lex() || EOF;
	  }

	  return result;
	};
	/** @module php-parser */
	// exports the function


	src.exports = Engine; // makes libraries public

	src.exports.tokens = tokens;
	src.exports.lexer = lexer;
	src.exports.AST = AST;
	src.exports.parser = parser;
	src.exports.combine = combine;
	src.exports.Engine = Engine; // allow the default export in index.d.ts

	src.exports.default = Engine;

	var srcExports = src.exports;
	var engine = /*@__PURE__*/getDefaultExportFromCjs(srcExports);

	function parse(text, opts) {
	  var inMarkdown = opts && opts.parentParser === "markdown";

	  if (!text && inMarkdown) {
	    return "";
	  } // Todo https://github.com/glayzzle/php-parser/issues/170


	  text = text.replace(/\?>\n<\?/g, "?>\n___PSEUDO_INLINE_PLACEHOLDER___<?"); // initialize a new parser instance

	  var parser = new engine({
	    parser: {
	      extractDoc: true
	    },
	    ast: {
	      withPositions: true,
	      withSource: true
	    }
	  });
	  var hasOpenPHPTag = text.indexOf("<?php") !== -1;
	  var parseAsEval = inMarkdown && !hasOpenPHPTag;
	  var ast;

	  try {
	    ast = parseAsEval ? parser.parseEval(text) : parser.parseCode(text);
	  } catch (err) {
	    if (err instanceof SyntaxError && "lineNumber" in err) {
	      err.loc = {
	        start: {
	          line: err.lineNumber,
	          column: err.columnNumber
	        }
	      };
	      delete err.lineNumber;
	      delete err.columnNumber;
	    }

	    throw err;
	  }

	  ast.extra = {
	    parseAsEval: parseAsEval
	  }; // https://github.com/glayzzle/php-parser/issues/155
	  // currently inline comments include the line break at the end, we need to
	  // strip those out and update the end location for each comment manually

	  ast.comments.forEach(function (comment) {
	    if (comment.value[comment.value.length - 1] === "\n") {
	      comment.value = comment.value.slice(0, -1);
	      comment.loc.end.offset = comment.loc.end.offset - 1;
	    }
	  });
	  return ast;
	}

	var loc = function loc(prop) {
	  return function (node) {
	    return node.loc && node.loc[prop] && node.loc[prop].offset;
	  };
	};

	var locStart = loc("start");
	var locEnd = loc("end");

	var hasNewline$2 = prettier.util.hasNewline,
	    skipEverythingButNewLine = prettier.util.skipEverythingButNewLine,
	    skipNewline$1 = prettier.util.skipNewline,
	    _isNextLineEmpty = prettier.util.isNextLineEmpty,
	    _isPreviousLineEmpty = prettier.util.isPreviousLineEmpty,
	    _getNextNonSpaceNonCommentCharacterIndex = prettier.util.getNextNonSpaceNonCommentCharacterIndex;

	function lookupIfPrettier2(options, prop) {
	  return parseInt(prettier.version[0]) > 1 ? options[prop] : options;
	}

	function isPreviousLineEmpty(text, node, options) {
	  return _isPreviousLineEmpty(text, node, lookupIfPrettier2(options, "locStart"));
	}

	function isNextLineEmpty(text, node, options) {
	  return _isNextLineEmpty(text, node, lookupIfPrettier2(options, "locEnd"));
	}

	function getNextNonSpaceNonCommentCharacterIndex(text, node, options) {
	  return _getNextNonSpaceNonCommentCharacterIndex(text, node, lookupIfPrettier2(options, "locEnd"));
	}

	function printNumber(rawNumber) {
	  return rawNumber.toLowerCase() // Remove unnecessary plus and zeroes from scientific notation.
	  .replace(/^([+-]?[\d.]+e)(?:\+|(-))?0*(\d)/, "$1$2$3") // Remove unnecessary scientific notation (1e0).
	  .replace(/^([+-]?[\d.]+)e[+-]?0+$/, "$1") // Make sure numbers always start with a digit.
	  .replace(/^([+-])?\./, "$10.") // Remove extraneous trailing decimal zeroes.
	  .replace(/(\.\d+?)0+(?=e|$)/, "$1") // Remove unnecessary .e notation
	  .replace(/\.(?=e)/, "");
	} // http://php.net/manual/en/language.operators.precedence.php


	var PRECEDENCE = {};
	[["or"], ["xor"], ["and"], ["=", "+=", "-=", "*=", "**=", "/=", ".=", "%=", "&=", "|=", "^=", "<<=", ">>="], ["??"], ["||"], ["&&"], ["|"], ["^"], ["&"], ["==", "===", "!=", "!==", "<>", "<=>"], ["<", ">", "<=", ">="], [">>", "<<"], ["+", "-", "."], ["*", "/", "%"], ["!"], ["instanceof"], ["++", "--", "~"], ["**"]].forEach(function (tier, i) {
	  tier.forEach(function (op) {
	    PRECEDENCE[op] = i;
	  });
	});

	function getPrecedence(op) {
	  return PRECEDENCE[op];
	}

	var equalityOperators = ["==", "!=", "===", "!==", "<>", "<=>"];
	var multiplicativeOperators = ["*", "/", "%"];
	var bitshiftOperators = [">>", "<<"];

	function isBitwiseOperator(operator) {
	  return !!bitshiftOperators[operator] || operator === "|" || operator === "^" || operator === "&";
	}

	function shouldFlatten(parentOp, nodeOp) {
	  if (getPrecedence(nodeOp) !== getPrecedence(parentOp)) {
	    return false;
	  } // ** is right-associative
	  // x ** y ** z --> x ** (y ** z)


	  if (parentOp === "**") {
	    return false;
	  } // x == y == z --> (x == y) == z


	  if (equalityOperators.includes(parentOp) && equalityOperators.includes(nodeOp)) {
	    return false;
	  } // x * y % z --> (x * y) % z


	  if (nodeOp === "%" && multiplicativeOperators.includes(parentOp) || parentOp === "%" && multiplicativeOperators.includes(nodeOp)) {
	    return false;
	  } // x * y / z --> (x * y) / z
	  // x / y * z --> (x / y) * z


	  if (nodeOp !== parentOp && multiplicativeOperators.includes(nodeOp) && multiplicativeOperators.includes(parentOp)) {
	    return false;
	  } // x << y << z --> (x << y) << z


	  if (bitshiftOperators.includes(parentOp) && bitshiftOperators.includes(nodeOp)) {
	    return false;
	  }

	  return true;
	}

	function nodeHasStatement(node) {
	  return ["block", "program", "namespace", "class", "enum", "interface", "trait", "traituse", "declare"].includes(node.kind);
	}

	function getBodyFirstChild(_ref) {
	  var body = _ref.body;

	  if (!body) {
	    return null;
	  }

	  if (body.kind === "block") {
	    body = body.children;
	  }

	  return body[0];
	}

	function getNodeListProperty(node) {
	  var body = node.children || node.body || node.adaptations;
	  return Array.isArray(body) ? body : null;
	}

	function getParentNodeListProperty(path) {
	  var parent = path.parent;

	  if (!parent) {
	    return null;
	  }

	  return getNodeListProperty(parent);
	}

	function getLast(arr) {
	  if (arr.length > 0) {
	    return arr[arr.length - 1];
	  }

	  return null;
	}

	function getPenultimate(arr) {
	  if (arr.length > 1) {
	    return arr[arr.length - 2];
	  }

	  return null;
	}

	function isLastStatement(path) {
	  var body = getParentNodeListProperty(path);

	  if (!body) {
	    return true;
	  }

	  var node = path.node;
	  return body[body.length - 1] === node;
	}

	function isFirstChildrenInlineNode(path) {
	  var node = path.node;

	  if (node.kind === "program") {
	    var children = getNodeListProperty(node);

	    if (!children || children.length === 0) {
	      return false;
	    }

	    return children[0].kind === "inline";
	  }

	  if (node.kind === "switch") {
	    if (!node.body) {
	      return false;
	    }

	    var _children = getNodeListProperty(node.body);

	    if (_children.length === 0) {
	      return false;
	    }

	    var _children3 = _slicedToArray(_children, 1),
	        firstCase = _children3[0];

	    if (!firstCase.body) {
	      return false;
	    }

	    var firstCaseChildren = getNodeListProperty(firstCase.body);

	    if (firstCaseChildren.length === 0) {
	      return false;
	    }

	    return firstCaseChildren[0].kind === "inline";
	  }

	  var firstChild = getBodyFirstChild(node);

	  if (!firstChild) {
	    return false;
	  }

	  return firstChild.kind === "inline";
	}

	function isDocNode(node) {
	  return node.kind === "nowdoc" || node.kind === "encapsed" && node.type === "heredoc";
	}
	/**
	 * Heredoc/Nowdoc nodes need a trailing linebreak if they
	 * appear as function arguments or array elements
	 */


	function docShouldHaveTrailingNewline(path) {
	  var recurse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	  var node = path.getNode(recurse);
	  var parent = path.getNode(recurse + 1);
	  var parentParent = path.getNode(recurse + 2);

	  if (!parent) {
	    return false;
	  }

	  if (parentParent && ["call", "new", "echo"].includes(parentParent.kind) && !["call", "array"].includes(parent.kind) || parent.kind === "parameter") {
	    var lastIndex = parentParent.arguments.length - 1;
	    var index = parentParent.arguments.indexOf(parent);
	    return index !== lastIndex;
	  }

	  if (parentParent && parentParent.kind === "for") {
	    var initIndex = parentParent.init.indexOf(parent);

	    if (initIndex !== -1) {
	      return initIndex !== parentParent.init.length - 1;
	    }

	    var testIndex = parentParent.test.indexOf(parent);

	    if (testIndex !== -1) {
	      return testIndex !== parentParent.test.length - 1;
	    }

	    var incrementIndex = parentParent.increment.indexOf(parent);

	    if (incrementIndex !== -1) {
	      return incrementIndex !== parentParent.increment.length - 1;
	    }
	  }

	  if (parent.kind === "bin") {
	    return parent.left === node || docShouldHaveTrailingNewline(path, recurse + 1);
	  }

	  if (parent.kind === "case" && parent.test === node) {
	    return true;
	  }

	  if (parent.kind === "staticvariable") {
	    var _lastIndex = parentParent.variables.length - 1;

	    var _index = parentParent.variables.indexOf(parent);

	    return _index !== _lastIndex;
	  }

	  if (parent.kind === "entry") {
	    if (parent.key === node) {
	      return true;
	    }

	    var _lastIndex2 = parentParent.items.length - 1;

	    var _index2 = parentParent.items.indexOf(parent);

	    return _index2 !== _lastIndex2;
	  }

	  if (["call", "new"].includes(parent.kind)) {
	    var _lastIndex3 = parent.arguments.length - 1;

	    var _index3 = parent.arguments.indexOf(node);

	    return _index3 !== _lastIndex3;
	  }

	  if (parent.kind === "echo") {
	    var _lastIndex4 = parent.expressions.length - 1;

	    var _index4 = parent.expressions.indexOf(node);

	    return _index4 !== _lastIndex4;
	  }

	  if (parent.kind === "array") {
	    var _lastIndex5 = parent.items.length - 1;

	    var _index5 = parent.items.indexOf(node);

	    return _index5 !== _lastIndex5;
	  }

	  if (parent.kind === "retif") {
	    return docShouldHaveTrailingNewline(path, recurse + 1);
	  }

	  return false;
	}

	function lineShouldEndWithSemicolon(path) {
	  var node = path.node,
	      parentNode = path.parent;

	  if (!parentNode) {
	    return false;
	  } // for single line control structures written in a shortform (ie without a block),
	  // we need to make sure the single body node gets a semicolon


	  if (["for", "foreach", "while", "do", "if", "switch"].includes(parentNode.kind) && node.kind !== "block" && node.kind !== "if" && (parentNode.body === node || parentNode.alternate === node)) {
	    return true;
	  }

	  if (!nodeHasStatement(parentNode)) {
	    return false;
	  }

	  if (node.kind === "echo" && node.shortForm) {
	    return false;
	  }

	  if (node.kind === "traituse") {
	    return !node.adaptations;
	  }

	  if (node.kind === "method" && node.isAbstract) {
	    return true;
	  }

	  if (node.kind === "method") {
	    var parent = path.parent;

	    if (parent && parent.kind === "interface") {
	      return true;
	    }
	  }

	  return ["expressionstatement", "do", "usegroup", "classconstant", "propertystatement", "traitprecedence", "traitalias", "goto", "constantstatement", "enumcase", "global", "static", "echo", "unset", "return", "break", "continue", "throw"].includes(node.kind);
	}

	function fileShouldEndWithHardline(path) {
	  var node = path.node;
	  var isProgramNode = node.kind === "program";
	  var lastNode = node.children && getLast(node.children);

	  if (!isProgramNode) {
	    return false;
	  }

	  if (lastNode && ["halt", "inline"].includes(lastNode.kind)) {
	    return false;
	  }

	  if (lastNode && (lastNode.kind === "declare" || lastNode.kind === "namespace")) {
	    var lastNestedNode = lastNode.children.length > 0 && getLast(lastNode.children);

	    if (lastNestedNode && ["halt", "inline"].includes(lastNestedNode.kind)) {
	      return false;
	    }
	  }

	  return true;
	}

	function maybeStripLeadingSlashFromUse(name) {
	  var nameWithoutLeadingSlash = name.replace(/^\\/, "");

	  if (nameWithoutLeadingSlash.indexOf("\\") !== -1) {
	    return nameWithoutLeadingSlash;
	  }

	  return name;
	}

	function hasDanglingComments(node) {
	  return node.comments && node.comments.some(function (comment) {
	    return !comment.leading && !comment.trailing;
	  });
	}

	function isLookupNode(node) {
	  return node.kind === "propertylookup" || node.kind === "nullsafepropertylookup" || node.kind === "staticlookup" || node.kind === "offsetlookup";
	}

	function shouldPrintHardLineAfterStartInControlStructure(path) {
	  var node = path.node;

	  if (["try", "catch"].includes(node.kind)) {
	    return false;
	  }

	  return isFirstChildrenInlineNode(path);
	}

	function shouldPrintHardLineBeforeEndInControlStructure(path) {
	  var node = path.node;

	  if (["try", "catch"].includes(node.kind)) {
	    return true;
	  }

	  if (node.kind === "switch") {
	    var children = getNodeListProperty(node.body);

	    if (children.length === 0) {
	      return true;
	    }

	    var lastCase = getLast(children);

	    if (!lastCase.body) {
	      return true;
	    }

	    var childrenInCase = getNodeListProperty(lastCase.body);

	    if (childrenInCase.length === 0) {
	      return true;
	    }

	    return childrenInCase[0].kind !== "inline";
	  }

	  return !isFirstChildrenInlineNode(path);
	}

	function getAlignment(text) {
	  var lines = text.split("\n");
	  var lastLine = lines.pop();
	  return lastLine.length - lastLine.trimLeft().length + 1;
	}

	function getNextNode(path, node) {
	  var parent = path.parent;
	  var children = getNodeListProperty(parent);

	  if (!children) {
	    return null;
	  }

	  var index = children.indexOf(node);

	  if (index === -1) {
	    return null;
	  }

	  return parent.children[index + 1];
	}

	function isProgramLikeNode(node) {
	  return ["program", "declare", "namespace"].includes(node.kind);
	}

	function isReferenceLikeNode(node) {
	  return ["name", "parentreference", "selfreference", "staticreference"].includes(node.kind);
	} // Return `logical` value for `bin` node containing `||` or `&&` type otherwise return kind of node.
	// Require for grouping logical and binary nodes in right way.


	function getNodeKindIncludingLogical(node) {
	  if (node.kind === "bin" && ["||", "&&"].includes(node.type)) {
	    return "logical";
	  }

	  return node.kind;
	}
	/**
	 * Check if string can safely be converted from double to single quotes and vice-versa, i.e.
	 *
	 * - no embedded variables ("foo $bar")
	 * - no linebreaks
	 * - no special characters like \n, \t, ...
	 * - no octal/hex/unicode characters
	 *
	 * See https://php.net/manual/en/language.types.string.php#language.types.string.syntax.double
	 */


	function useDoubleQuote(node, options) {
	  if (node.isDoubleQuote === options.singleQuote) {
	    // We have a double quote and the user passed singleQuote:true, or the other way around.
	    var rawValue = node.raw.slice(node.raw[0] === "b" ? 2 : 1, -1);
	    var isComplex = rawValue.match(/\\([$nrtfve]|[xX][0-9a-fA-F]{1,2}|[0-7]{1,3}|u{([0-9a-fA-F]+)})|\r?\n|'|"|\$/);
	    return node.isDoubleQuote ? isComplex : !isComplex;
	  }

	  return node.isDoubleQuote;
	}

	function hasEmptyBody(path) {
	  var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "body";
	  var node = path.node;
	  return node[name] && node[name].children && node[name].children.length === 0 && (!node[name].comments || node[name].comments.length === 0);
	}

	function isNextLineEmptyAfterNamespace(text, node) {
	  var idx = locStart(node);
	  idx = skipEverythingButNewLine(text, idx);
	  idx = skipNewline$1(text, idx);
	  return hasNewline$2(text, idx);
	}

	function shouldPrintHardlineBeforeTrailingComma(lastElem) {
	  if (lastElem.kind === "nowdoc" || lastElem.kind === "encapsed" && lastElem.type === "heredoc") {
	    return true;
	  }

	  if (lastElem.kind === "entry" && (lastElem.value.kind === "nowdoc" || lastElem.value.kind === "encapsed" && lastElem.value.type === "heredoc")) {
	    return true;
	  }

	  return false;
	}

	function getAncestorCounter(path, typeOrTypes) {
	  var types = [].concat(typeOrTypes);
	  var counter = -1;
	  var ancestorNode;

	  while (ancestorNode = path.getParentNode(++counter)) {
	    if (types.indexOf(ancestorNode.kind) !== -1) {
	      return counter;
	    }
	  }

	  return -1;
	}

	function getAncestorNode(path, typeOrTypes) {
	  var counter = getAncestorCounter(path, typeOrTypes);
	  return counter === -1 ? null : path.getParentNode(counter);
	}

	var magicMethods = ["__construct", "__destruct", "__call", "__callStatic", "__get", "__set", "__isset", "__unset", "__sleep", "__wakeup", "__toString", "__invoke", "__set_state", "__clone", "__debugInfo"];
	var magicMethodsMap = new Map(magicMethods.map(function (name) {
	  return [name.toLowerCase(), name];
	}));

	function normalizeMagicMethodName(name) {
	  var loweredName = name.toLowerCase();

	  if (magicMethodsMap.has(loweredName)) {
	    return magicMethodsMap.get(loweredName);
	  }

	  return name;
	}

	var addLeadingComment = prettier.util.addLeadingComment,
	    addDanglingComment = prettier.util.addDanglingComment,
	    addTrailingComment = prettier.util.addTrailingComment,
	    skipNewline = prettier.util.skipNewline,
	    hasNewline$1 = prettier.util.hasNewline,
	    hasNewlineInRange$1 = prettier.util.hasNewlineInRange;
	var _doc$builders$2 = prettier.doc.builders,
	    join$2 = _doc$builders$2.join,
	    indent$1 = _doc$builders$2.indent,
	    hardline$2 = _doc$builders$2.hardline,
	    cursor = _doc$builders$2.cursor,
	    lineSuffix$1 = _doc$builders$2.lineSuffix,
	    breakParent$1 = _doc$builders$2.breakParent;
	/*
	Comment functions are meant to inspect various edge cases using given comment nodes,
	with information about where those comment nodes exist in the tree (ie enclosingNode,
	previousNode, followingNode), and then either call the built in functions to handle
	certain cases (ie addLeadingComment, addTrailingComment, addDanglingComment), or just
	let prettier core handle them. To signal that the plugin is taking over, the comment
	handler function should return true, otherwise returning false signals that prettier
	core should handle the comment

	args:
	  comment
	  text
	  options
	  ast
	  isLastComment
	*/

	function handleOwnLineComment(comment, text, options) {
	  var precedingNode = comment.precedingNode,
	      enclosingNode = comment.enclosingNode,
	      followingNode = comment.followingNode;
	  return handleLastFunctionArgComments(text, precedingNode, enclosingNode, followingNode, comment, options) || handleMemberExpressionComments(enclosingNode, followingNode, comment) || handleIfStatementComments(text, precedingNode, enclosingNode, followingNode, comment, options) || handleWhileComments(text, precedingNode, enclosingNode, followingNode, comment, options) || handleTryComments(enclosingNode, followingNode, comment) || handleClassComments(enclosingNode, followingNode, comment) || handleFunctionParameter(text, precedingNode, enclosingNode, followingNode, comment) || handleFunction(text, enclosingNode, followingNode, comment, options) || handleForComments(enclosingNode, precedingNode, followingNode, comment) || handleInlineComments(enclosingNode, precedingNode, followingNode, comment) || handleDeclareComments(enclosingNode, precedingNode, followingNode, comment);
	}

	function handleEndOfLineComment(comment, text, options) {
	  var precedingNode = comment.precedingNode,
	      enclosingNode = comment.enclosingNode,
	      followingNode = comment.followingNode;
	  return handleArrayComments(text, precedingNode, enclosingNode, followingNode, comment) || handleReturnComments(text, precedingNode, enclosingNode, followingNode, comment) || handleLastFunctionArgComments(text, precedingNode, enclosingNode, followingNode, comment, options) || handleRetifComments(enclosingNode, precedingNode, followingNode, comment, text) || handleIfStatementComments(text, precedingNode, enclosingNode, followingNode, comment, options) || handleWhileComments(text, precedingNode, enclosingNode, followingNode, comment, options) || handleTryComments(enclosingNode, followingNode, comment) || handleClassComments(enclosingNode, followingNode, comment) || handleFunctionParameter(text, precedingNode, enclosingNode, followingNode, comment) || handleFunction(text, enclosingNode, followingNode, comment, options) || handleEntryComments(enclosingNode, comment) || handleCallComments(precedingNode, enclosingNode, comment) || handleAssignComments(enclosingNode, followingNode, comment) || handleInlineComments(enclosingNode, precedingNode, followingNode, comment) || handleNamespaceComments(enclosingNode, precedingNode, followingNode, comment) || handleDeclareComments(enclosingNode, precedingNode, followingNode, comment) || handleGoto(enclosingNode, comment);
	}

	function handleRemainingComment(comment, text, options) {
	  var precedingNode = comment.precedingNode,
	      enclosingNode = comment.enclosingNode,
	      followingNode = comment.followingNode;
	  return handleIfStatementComments(text, precedingNode, enclosingNode, followingNode, comment, options) || handleWhileComments(text, precedingNode, enclosingNode, followingNode, comment, options) || handleCommentInEmptyParens(text, enclosingNode, comment, options) || handleClassComments(enclosingNode, followingNode, comment) || handleTraitUseComments(enclosingNode, followingNode, comment) || handleFunctionParameter(text, precedingNode, enclosingNode, followingNode, comment) || handleFunction(text, enclosingNode, followingNode, comment, options) || handleGoto(enclosingNode, comment) || handleHalt(precedingNode, enclosingNode, followingNode, comment) || handleBreakAndContinueStatementComments(enclosingNode, comment) || handleInlineComments(enclosingNode, precedingNode, followingNode, comment) || handleNamespaceComments(enclosingNode, precedingNode, followingNode, comment);
	}

	function addBlockStatementFirstComment(node, comment) {
	  var children = node.children;

	  if (children.length === 0) {
	    addDanglingComment(node, comment);
	  } else {
	    addLeadingComment(children[0], comment);
	  }
	}

	function addBlockOrNotComment(node, comment) {
	  if (node.kind === "block") {
	    addBlockStatementFirstComment(node, comment);
	  } else {
	    addLeadingComment(node, comment);
	  }
	}

	function handleArrayComments(text, precedingNode, enclosingNode, followingNode, comment) {
	  if (!precedingNode && !followingNode && enclosingNode && enclosingNode.kind === "array") {
	    addTrailingComment(enclosingNode, comment);
	    return true;
	  }

	  return false;
	}

	function handleReturnComments(text, precedingNode, enclosingNode, followingNode, comment) {
	  if (enclosingNode && enclosingNode.kind === "return" && !enclosingNode.expr) {
	    addTrailingComment(enclosingNode, comment);
	    return true;
	  }

	  return false;
	}

	function handleLastFunctionArgComments(text, precedingNode, enclosingNode, followingNode, comment, options) {
	  var nextCharIndex = getNextNonSpaceNonCommentCharacterIndex(text, comment, options);
	  var nextCharacter = text.charAt(nextCharIndex); // Real functions

	  if (precedingNode && precedingNode.kind === "identifier" && enclosingNode && (enclosingNode.kind === "function" || enclosingNode.kind === "method") && nextCharacter === ")") {
	    addTrailingComment(enclosingNode, comment);
	    return true;
	  }

	  if (enclosingNode && (enclosingNode.kind === "function" || enclosingNode.kind === "method") && followingNode && followingNode.kind === "block") {
	    addBlockStatementFirstComment(followingNode, comment);
	    return true;
	  }

	  return false;
	}

	function handleMemberExpressionComments(enclosingNode, followingNode, comment) {
	  if (enclosingNode && isLookupNode(enclosingNode) && followingNode && ["identifier", "variable", "encapsed"].includes(followingNode.kind)) {
	    addLeadingComment(enclosingNode, comment);
	    return true;
	  }

	  return false;
	}

	function handleIfStatementComments(text, precedingNode, enclosingNode, followingNode, comment, options) {
	  if (!enclosingNode || enclosingNode.kind !== "if" || !followingNode) {
	    return false;
	  }

	  var nextCharIndex = getNextNonSpaceNonCommentCharacterIndex(text, comment, options);
	  var nextCharacter = text.charAt(nextCharIndex);

	  if (nextCharacter === ")") {
	    addTrailingComment(precedingNode, comment);
	    return true;
	  } // Comments before `else`/`else if` treat as a dangling comment


	  if (precedingNode === enclosingNode.body && followingNode === enclosingNode.alternate) {
	    addDanglingComment(enclosingNode, comment);
	    return true;
	  }

	  if (followingNode.kind === "if") {
	    addBlockOrNotComment(followingNode.body, comment);
	    return true;
	  } // For comments positioned after the condition parenthesis in an if statement
	  // before the consequent without brackets on, such as
	  // if (a) /* comment */ true,
	  // we look at the next character to see if the following node
	  // is the consequent for the if statement


	  if (enclosingNode.body === followingNode) {
	    addLeadingComment(followingNode, comment);
	    return true;
	  }

	  return false;
	}

	function handleRetifComments(enclosingNode, precedingNode, followingNode, comment, text
	/* options */
	) {
	  var isSameLineAsPrecedingNode = precedingNode && !hasNewlineInRange$1(text, locEnd(precedingNode), locStart(comment));

	  if ((!precedingNode || !isSameLineAsPrecedingNode) && enclosingNode && enclosingNode.kind === "retif" && followingNode) {
	    addLeadingComment(followingNode, comment);
	    return true;
	  }

	  return false;
	}

	function handleForComments(enclosingNode, precedingNode, followingNode, comment) {
	  if (!followingNode && enclosingNode && (enclosingNode.kind === "for" || enclosingNode.kind === "foreach")) {
	    // For a shortform for loop (where the body is just one node), add
	    // this as a leading comment to the body
	    if (enclosingNode.body && enclosingNode.body.kind !== "block") {
	      addLeadingComment(followingNode, comment);
	    } else {
	      addLeadingComment(enclosingNode, comment);
	    }

	    return true;
	  }

	  return false;
	}

	function handleTraitUseComments(enclosingNode, followingNode, comment) {
	  if (enclosingNode && enclosingNode.kind === "traituse" && enclosingNode.adaptations && !enclosingNode.adaptations.length) {
	    addDanglingComment(enclosingNode, comment);
	    return true;
	  }

	  return false;
	}

	function handleClassComments(enclosingNode, followingNode, comment) {
	  if (enclosingNode && ["class", "interface", "trait"].includes(enclosingNode.kind)) {
	    var _enclosingNode$__pare;

	    if ((_enclosingNode$__pare = enclosingNode.__parent_new_arguments) !== null && _enclosingNode$__pare !== void 0 && _enclosingNode$__pare.includes(followingNode)) {
	      return false;
	    } // for extends nodes that have leading comments, we can store them as
	    // dangling comments so we can handle them in the printer


	    if (followingNode && enclosingNode.extends) {
	      if (!Array.isArray(enclosingNode.extends)) {
	        if (followingNode === enclosingNode.extends) {
	          addDanglingComment(followingNode, comment);
	          return true;
	        }
	      } else {
	        if (enclosingNode.extends.some(function (extendsNode) {
	          if (followingNode && followingNode === extendsNode) {
	            addDanglingComment(followingNode, comment);
	            return true;
	          }
	        })) {
	          return true;
	        }
	      }
	    } // check each implements node - if any of them have comments we can store
	    // them as dangling comments and handle them in the printer


	    if (followingNode && enclosingNode.implements) {
	      if (enclosingNode.implements.some(function (implementsNode) {
	        if (followingNode && followingNode === implementsNode) {
	          addDanglingComment(followingNode, comment);
	          return true;
	        }
	      })) {
	        return true;
	      }
	    } // For an empty class where the body is only made up of comments, we
	    // need to attach this as a dangling comment on the class node itself


	    if (!(enclosingNode.body && enclosingNode.body.length > 0)) {
	      addDanglingComment(enclosingNode, comment);
	      return true;
	    }
	  }

	  if (followingNode && followingNode.kind === "class" && followingNode.isAnonymous && followingNode.leadingComments && comment.kind === "commentblock") {
	    return true;
	  }

	  return false;
	}

	function handleFunction(text, enclosingNode, followingNode, comment, options) {
	  if (enclosingNode && (enclosingNode.kind === "function" || enclosingNode.kind === "method")) {
	    // we need to figure out if there are any comments that should be assigned
	    // to the function return type. To do this we check if the comment location
	    // is between the last argument end location and the return type start location.
	    var argumentsLocEnd = 0;

	    for (var i = 0; i < enclosingNode.arguments.length; i++) {
	      argumentsLocEnd = locEnd(enclosingNode.arguments[i]) > argumentsLocEnd ? locEnd(enclosingNode.arguments[i]) : argumentsLocEnd;
	    }

	    var commentIsBetweenArgumentsAndBody = enclosingNode.body && locStart(comment) > argumentsLocEnd && locEnd(comment) < locStart(enclosingNode.body);
	    var nextCharIndex = getNextNonSpaceNonCommentCharacterIndex(text, comment, options); // we additionally need to check if this isn't a trailing argument comment,
	    // by checking the next character isn't ")"

	    if (enclosingNode.type && commentIsBetweenArgumentsAndBody && text.charAt(nextCharIndex) !== ")") {
	      if (locEnd(comment) < locStart(enclosingNode.type)) {
	        // we need to store this as a dangling comment in case the type is nullable
	        // ie function(): ?string {} - the "nullable" attribute is part of the
	        // function node, not the type.
	        addDanglingComment(enclosingNode.type, comment);
	        return true;
	      }

	      addTrailingComment(enclosingNode.type, comment);
	      return true;
	    }
	  }

	  return false;
	}

	function handleFunctionParameter(text, precedingNode, enclosingNode, followingNode, comment) {
	  if (!enclosingNode || !["function", "method", "parameter"].includes(enclosingNode.kind)) {
	    return false;
	  }

	  if (precedingNode.kind === "typereference" && followingNode.kind === "identifier") {
	    addTrailingComment(precedingNode, comment);
	    return true;
	  }

	  return false;
	}

	function handleBreakAndContinueStatementComments(enclosingNode, comment) {
	  if (enclosingNode && (enclosingNode.kind === "continue" || enclosingNode.kind === "break") && !enclosingNode.label) {
	    addTrailingComment(enclosingNode, comment);
	    return true;
	  }

	  return false;
	}

	function handleGoto(enclosingNode, comment) {
	  if (enclosingNode && ["label", "goto"].includes(enclosingNode.kind)) {
	    addTrailingComment(enclosingNode, comment);
	    return true;
	  }

	  return false;
	}

	function handleHalt(precedingNode, enclosingNode, followingNode, comment) {
	  if (enclosingNode && enclosingNode.kind === "halt") {
	    addDanglingComment(enclosingNode, comment);
	    return true;
	  }

	  if (precedingNode && precedingNode.kind === "halt") {
	    addDanglingComment(precedingNode, comment);
	    return true;
	  }

	  return false;
	}

	function handleCommentInEmptyParens(text, enclosingNode, comment, options) {
	  var nextCharIndex = getNextNonSpaceNonCommentCharacterIndex(text, comment, options);

	  if (text.charAt(nextCharIndex) !== ")") {
	    return false;
	  } // Only add dangling comments to fix the case when no arguments are present,
	  // i.e. a function without any argument.


	  if (enclosingNode && (enclosingNode.kind === "function" || enclosingNode.kind === "closure" || enclosingNode.kind === "method" || enclosingNode.kind === "call" || enclosingNode.kind === "new") && enclosingNode.arguments.length === 0) {
	    addDanglingComment(enclosingNode, comment);
	    return true;
	  }

	  return false;
	}

	function handleInlineComments(enclosingNode, precedingNode, followingNode, comment) {
	  if (followingNode && followingNode.kind === "inline") {
	    if (!followingNode.leadingComments) {
	      followingNode.leadingComments = [];
	    }

	    if (!followingNode.leadingComments.includes(comment)) {
	      followingNode.leadingComments.push(comment);
	    }

	    return true;
	  } else if (!enclosingNode && !followingNode && precedingNode && precedingNode.kind === "inline") {
	    addDanglingComment(precedingNode, comment);
	    return true;
	  }

	  return false;
	}

	function handleEntryComments(enclosingNode, comment) {
	  if (enclosingNode && enclosingNode.kind === "entry") {
	    addLeadingComment(enclosingNode, comment);
	    return true;
	  }

	  return false;
	}

	function handleAssignComments(enclosingNode, followingNode, comment) {
	  if (enclosingNode && enclosingNode.kind === "assign" && followingNode) {
	    var equalSignOffset = enclosingNode.loc.start.offset + enclosingNode.loc.source.indexOf("=");

	    if (comment.loc.start.offset > equalSignOffset) {
	      addLeadingComment(followingNode, comment);
	      return true;
	    }
	  }

	  return false;
	}

	function handleTryComments(enclosingNode, followingNode, comment) {
	  if (!enclosingNode || enclosingNode.kind !== "try" || !followingNode) {
	    return false;
	  }

	  if (followingNode.kind === "block") {
	    addBlockStatementFirstComment(followingNode, comment);
	    return true;
	  }

	  if (followingNode.kind === "try") {
	    addBlockOrNotComment(followingNode.always, comment);
	    return true;
	  }

	  if (followingNode.kind === "catch") {
	    addBlockOrNotComment(followingNode.body, comment);
	    return true;
	  }

	  return false;
	}

	function handleCallComments(precedingNode, enclosingNode, comment) {
	  if (enclosingNode && enclosingNode.kind === "call" && precedingNode && enclosingNode.what === precedingNode && enclosingNode.arguments.length > 0) {
	    addLeadingComment(enclosingNode.arguments[0], comment);
	    return true;
	  }

	  return false;
	}

	function handleNamespaceComments(enclosingNode, precedingNode, followingNode, comment) {
	  if (!followingNode && !precedingNode && enclosingNode && enclosingNode.kind === "namespace" && !enclosingNode.withBrackets) {
	    addTrailingComment(enclosingNode, comment);
	    return true;
	  } else if (!precedingNode && enclosingNode && enclosingNode.kind === "namespace" && !enclosingNode.withBrackets) {
	    addDanglingComment(enclosingNode, comment);
	    return true;
	  }

	  return false;
	}

	function handleDeclareComments(enclosingNode, precedingNode, followingNode, comment) {
	  if (!enclosingNode || enclosingNode.kind !== "declare") {
	    return false;
	  }

	  if (precedingNode && precedingNode.kind === "noop") {
	    return false;
	  }

	  if (!followingNode || enclosingNode.directives[0] === followingNode) {
	    if (enclosingNode.mode === "none") {
	      addTrailingComment(enclosingNode, comment);
	    } else {
	      addDanglingComment(enclosingNode, comment);
	    }

	    return true;
	  }

	  if (followingNode && precedingNode) {
	    addLeadingComment(followingNode, comment);
	    return true;
	  }

	  return false;
	}

	function handleWhileComments(text, precedingNode, enclosingNode, followingNode, comment, options) {
	  if (!enclosingNode || enclosingNode.kind !== "while" || !followingNode) {
	    return false;
	  } // We unfortunately have no way using the AST or location of nodes to know
	  // if the comment is positioned before the condition parenthesis:
	  //   while (a /* comment */) {}
	  // The only workaround I found is to look at the next character to see if
	  // it is a ).


	  var nextCharIndex = getNextNonSpaceNonCommentCharacterIndex(text, comment, options);
	  var nextCharacter = text.charAt(nextCharIndex);

	  if (nextCharacter === ")") {
	    addTrailingComment(precedingNode, comment);
	    return true;
	  }

	  if (followingNode.kind === "block") {
	    addBlockStatementFirstComment(followingNode, comment);
	    return true;
	  }

	  return false;
	} // https://github.com/prettier/prettier/blob/c01661f311a2e1e033f1f9cb127882cc13e293bd/src/main/comments/print.js#L23


	function printComment(path, options) {
	  var comment = path.node;
	  comment.printed = true;
	  return options.printer.printComment(path, options);
	} // https://github.com/prettier/prettier/blob/master/src/main/comments.js#L440


	function printDanglingComments(path, options, sameIndent, filter) {
	  var parts = [];
	  var node = path.getValue();

	  if (!node || !node.comments) {
	    return "";
	  }

	  path.each(function () {
	    var comment = path.node;

	    if (comment && !comment.leading && !comment.trailing && (!filter || filter(comment))) {
	      parts.push(printComment(path, options));
	    }
	  }, "comments");

	  if (parts.length === 0) {
	    return "";
	  }

	  if (sameIndent) {
	    return join$2(hardline$2, parts);
	  }

	  return indent$1([hardline$2, join$2(hardline$2, parts)]);
	}

	function hasLeadingComment(node) {
	  return node.comments && node.comments.some(function (comment) {
	    return comment.leading;
	  });
	}

	function hasTrailingComment(node) {
	  return node.comments && node.comments.some(function (comment) {
	    return comment.trailing;
	  });
	}

	function hasLeadingOwnLineComment(text, node) {
	  return node.comments && node.comments.some(function (comment) {
	    return comment.leading && hasNewline$1(text, locEnd(comment));
	  });
	}

	function printComments(comments, options) {
	  var parts = [];
	  comments.forEach(function (comment, index, comments) {
	    comment.printed = true;
	    var isLastComment = comments.length === index + 1;
	    parts.push(comment.value);

	    if (!isLastComment) {
	      parts.push(hardline$2);
	    }

	    if (isNextLineEmpty(options.originalText, comment, options) && !isLastComment) {
	      parts.push(hardline$2);
	    }
	  });
	  return parts;
	}

	function isBlockComment(comment) {
	  return comment.kind === "commentblock";
	}

	function getCommentChildNodes(node) {
	  if (node.kind === "new" && node.what.kind === "class") {
	    // Pretend to be child of `class`
	    node.what.__parent_new_arguments = _toConsumableArray(node.arguments);
	    return [node.what];
	  }
	}

	function canAttachComment(node) {
	  return node.kind && node.kind !== "commentblock" && node.kind !== "commentline";
	} // Based on https://github.com/prettier/prettier/blob/master/src/main/comments.js
	// TODO remove after https://github.com/prettier/prettier/issues/5087


	function prependCursorPlaceholder(path, options, printed) {
	  var node = path.node;

	  if (node && node === options.cursorNode) {
	    return [cursor, printed, cursor];
	  }

	  return printed;
	}

	function printLeadingComment(path, print, options) {
	  var contents = printComment(path, options);

	  if (!contents) {
	    return "";
	  }

	  var comment = path.node;
	  var isBlock = options.printer.isBlockComment && options.printer.isBlockComment(comment); // Leading block comments should see if they need to stay on the
	  // same line or not.

	  if (isBlock) {
	    return [contents, hasNewline$1(options.originalText, locEnd(comment)) ? hardline$2 : " "];
	  }

	  return [contents, hardline$2];
	}

	function printTrailingComment(path, print, options) {
	  var contents = printComment(path, options);

	  if (!contents) {
	    return "";
	  }

	  var comment = path.node;
	  var isBlock = options.printer.isBlockComment && options.printer.isBlockComment(comment);

	  if (hasNewline$1(options.originalText, locStart(comment), {
	    backwards: true
	  })) {
	    // This allows comments at the end of nested structures:
	    // {
	    //   x: 1,
	    //   y: 2
	    //   // A comment
	    // }
	    // Those kinds of comments are almost always leading comments, but
	    // here it doesn't go "outside" the block and turns it into a
	    // trailing comment for `2`. We can simulate the above by checking
	    // if this a comment on its own line; normal trailing comments are
	    // always at the end of another expression.
	    var isLineBeforeEmpty = isPreviousLineEmpty(options.originalText, comment, options);
	    return lineSuffix$1([hardline$2, isLineBeforeEmpty ? hardline$2 : "", contents]);
	  } else if (isBlock) {
	    // Trailing block comments never need a newline
	    return [" ", contents];
	  }

	  return [lineSuffix$1([" ", contents]), !isBlock ? breakParent$1 : ""];
	}

	function printAllComments(path, print, options, needsSemi) {
	  var node = path.node;
	  var printed = print(path);
	  var comments = node && node.comments;

	  if (!comments || comments.length === 0) {
	    return prependCursorPlaceholder(path, options, printed);
	  }

	  var leadingParts = [];
	  var trailingParts = [needsSemi ? ";" : "", printed];
	  path.each(function (_ref) {
	    var comment = _ref.node;
	    var leading = comment.leading,
	        trailing = comment.trailing;

	    if (leading) {
	      var contents = printLeadingComment(path, print, options);

	      if (!contents) {
	        return;
	      }

	      leadingParts.push(contents);
	      var text = options.originalText;

	      if (hasNewline$1(text, skipNewline(text, locEnd(comment)))) {
	        leadingParts.push(hardline$2);
	      }
	    } else if (trailing) {
	      trailingParts.push(printTrailingComment(path, print, options));
	    }
	  }, "comments");
	  return prependCursorPlaceholder(path, options, leadingParts.concat(trailingParts));
	}

	function needsParens(path) {
	  var parent = path.parent;

	  if (!parent) {
	    return false;
	  }

	  var key = path.key,
	      node = path.node;

	  if ([//  No need parens for top level children of this nodes
	  "program", "expressionstatement", "namespace", "declare", "block", // No need parens
	  "include", "print", "return", "echo"].includes(parent.kind)) {
	    return false;
	  }

	  switch (node.kind) {
	    case "pre":
	    case "post":
	      if (parent.kind === "unary") {
	        return node.kind === "pre" && (node.type === "+" && parent.type === "+" || node.type === "-" && parent.type === "-");
	      }

	    // else fallthrough

	    case "unary":
	      switch (parent.kind) {
	        case "unary":
	          return node.type === parent.type && (node.type === "+" || node.type === "-");

	        case "propertylookup":
	        case "nullsafepropertylookup":
	        case "staticlookup":
	        case "offsetlookup":
	        case "call":
	          return key === "what";

	        case "bin":
	          return parent.type === "**" && key === "left";

	        default:
	          return false;
	      }

	    case "bin":
	      {
	        switch (parent.kind) {
	          case "assign":
	          case "retif":
	            return ["and", "xor", "or"].includes(node.type);

	          case "silent":
	          case "cast":
	            // TODO: bug https://github.com/glayzzle/php-parser/issues/172
	            return node.parenthesizedExpression;

	          case "pre":
	          case "post":
	          case "unary":
	            return true;

	          case "call":
	          case "propertylookup":
	          case "nullsafepropertylookup":
	          case "staticlookup":
	          case "offsetlookup":
	            return key === "what";

	          case "bin":
	            {
	              var po = parent.type;
	              var pp = getPrecedence(po);
	              var no = node.type;
	              var np = getPrecedence(no);

	              if (pp > np) {
	                return true;
	              }

	              if (po === "||" && no === "&&") {
	                return true;
	              }

	              if (pp === np && key === "right") {
	                return true;
	              }

	              if (pp === np && !shouldFlatten(po, no)) {
	                return true;
	              }

	              if (pp < np && no === "%") {
	                return po === "+" || po === "-";
	              } // Add parenthesis when working with bitwise operators
	              // It's not stricly needed but helps with code understanding


	              if (isBitwiseOperator(po)) {
	                return true;
	              }

	              return false;
	            }

	          default:
	            return false;
	        }
	      }

	    case "propertylookup":
	    case "nullsafepropertylookup":
	    case "staticlookup":
	      {
	        switch (parent.kind) {
	          case "call":
	            return key === "what" && node.parenthesizedExpression;

	          default:
	            return false;
	        }
	      }

	    case "clone":
	    case "new":
	      {
	        switch (parent.kind) {
	          case "propertylookup":
	          case "nullsafepropertylookup":
	          case "staticlookup":
	          case "offsetlookup":
	          case "call":
	            return key === "what";

	          default:
	            return false;
	        }
	      }

	    case "yield":
	      {
	        switch (parent.kind) {
	          case "propertylookup":
	          case "nullsafepropertylookup":
	          case "staticlookup":
	          case "offsetlookup":
	          case "call":
	            return key === "what";

	          case "retif":
	            return key === "test";

	          default:
	            return !!(node.key || node.value);
	        }
	      }

	    case "assign":
	      {
	        if (parent.kind === "for" && (parent.init.includes(node) || parent.increment.includes(node))) {
	          return false;
	        } else if (parent.kind === "assign") {
	          return false;
	        } else if (parent.kind === "static") {
	          return false;
	        } else if (["if", "do", "while", "foreach", "switch"].includes(parent.kind)) {
	          return false;
	        } else if (parent.kind === "silent") {
	          return false;
	        } else if (parent.kind === "call") {
	          return false;
	        }

	        return true;
	      }

	    case "retif":
	      switch (parent.kind) {
	        case "cast":
	          return true;

	        case "unary":
	        case "bin":
	        case "retif":
	          if (key === "test" && !parent.trueExpr) {
	            return false;
	          }

	          return true;

	        case "propertylookup":
	        case "nullsafepropertylookup":
	        case "staticlookup":
	        case "offsetlookup":
	        case "call":
	          return key === "what";

	        default:
	          return false;
	      }

	    case "closure":
	      switch (parent.kind) {
	        case "call":
	          return key === "what";
	        // https://github.com/prettier/plugin-php/issues/1675

	        case "propertylookup":
	        case "nullsafepropertylookup":
	          return true;

	        default:
	          return false;
	      }

	    case "silence":
	    case "cast":
	      // TODO: bug https://github.com/glayzzle/php-parser/issues/172
	      return node.parenthesizedExpression;
	    // else fallthrough

	    case "string":
	    case "array":
	      switch (parent.kind) {
	        case "propertylookup":
	        case "nullsafepropertylookup":
	        case "staticlookup":
	        case "offsetlookup":
	        case "call":
	          if (["string", "array"].includes(node.kind) && parent.kind === "offsetlookup") {
	            return false;
	          }

	          return key === "what";

	        default:
	          return false;
	      }

	    case "print":
	    case "include":
	      return parent.kind === "bin";
	  }

	  return false;
	}

	var _doc$builders$1 = prettier.doc.builders,
	    breakParent = _doc$builders$1.breakParent,
	    join$1 = _doc$builders$1.join,
	    line = _doc$builders$1.line,
	    lineSuffix = _doc$builders$1.lineSuffix,
	    group = _doc$builders$1.group,
	    conditionalGroup = _doc$builders$1.conditionalGroup,
	    indent = _doc$builders$1.indent,
	    dedent = _doc$builders$1.dedent,
	    ifBreak = _doc$builders$1.ifBreak,
	    hardline$1 = _doc$builders$1.hardline,
	    softline = _doc$builders$1.softline,
	    literalline = _doc$builders$1.literalline,
	    align = _doc$builders$1.align,
	    dedentToRoot = _doc$builders$1.dedentToRoot;
	var willBreak = prettier.doc.utils.willBreak;
	var isNextLineEmptyAfterIndex = prettier.util.isNextLineEmptyAfterIndex,
	    hasNewline = prettier.util.hasNewline,
	    hasNewlineInRange = prettier.util.hasNewlineInRange;

	function isMinVersion(actualVersion, requiredVersion) {
	  return parseFloat(actualVersion) >= parseFloat(requiredVersion);
	}

	function shouldPrintComma(options, requiredVersion) {
	  if (!options.trailingCommaPHP) {
	    return false;
	  }

	  return isMinVersion(options.phpVersion, requiredVersion);
	}

	function shouldPrintHardlineForOpenBrace(options) {
	  switch (options.braceStyle) {
	    case "1tbs":
	      return false;

	    case "psr-2":
	    case "per-cs":
	    default:
	      return true;
	  }
	}

	function genericPrint(path, options, print) {
	  var node = path.node;

	  if (typeof node === "string") {
	    return node;
	  }

	  var printedWithoutParens = printNode(path, options, print);
	  var parts = [];
	  var needsParens$1 = needsParens(path);

	  if (needsParens$1) {
	    parts.unshift("(");
	  }

	  parts.push(printedWithoutParens);

	  if (needsParens$1) {
	    parts.push(")");
	  }

	  if (lineShouldEndWithSemicolon(path)) {
	    parts.push(";");
	  }

	  if (fileShouldEndWithHardline(path)) {
	    parts.push(hardline$1);
	  }

	  return parts;
	}

	function printPropertyLookup(path, options, print) {
	  var nullsafe = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
	  return [nullsafe ? "?" : "", "->", print("offset")];
	}

	function printNullsafePropertyLookup(path, options, print) {
	  return printPropertyLookup(path, options, print, true);
	}

	function printStaticLookup(path, options, print) {
	  var node = path.node;
	  var needCurly = !["variable", "identifier"].includes(node.offset.kind);
	  return ["::", needCurly ? "{" : "", print("offset"), needCurly ? "}" : ""];
	}

	function printOffsetLookup(path, options, print) {
	  var node = path.node;
	  var shouldInline = node.offset && node.offset.kind === "number" || getAncestorNode(path, "encapsed");
	  return ["[", node.offset ? group([indent([shouldInline ? "" : softline, print("offset")]), shouldInline ? "" : softline]) : "", "]"];
	} // We detect calls on member expressions specially to format a
	// common pattern better. The pattern we are looking for is this:
	//
	// $arr
	//   ->map(function(x) { return $x + 1; })
	//   ->filter(function(x) { return $x > 10; })
	//   ->some(function(x) { return $x % 2; });
	//
	// The way it is structured in the AST is via a nested sequence of
	// propertylookup, staticlookup, offsetlookup and call.
	// We need to traverse the AST and make groups out of it
	// to print it in the desired way.


	function printMemberChain(path, options, print) {
	  // The first phase is to linearize the AST by traversing it down.
	  //
	  // Example:
	  //   a()->b->c()->d();
	  // has the AST structure
	  //   call (isLookupNode d (
	  //     call (isLookupNode c (
	  //       isLookupNode b (
	  //         call (variable a)
	  //       )
	  //     ))
	  //   ))
	  // and we transform it into (notice the reversed order)
	  //   [identifier a, call, isLookupNode b, isLookupNode c, call,
	  //    isLookupNode d, call]
	  var printedNodes = []; // Here we try to retain one typed empty line after each call expression or
	  // the first group whether it is in parentheses or not
	  //
	  // Example:
	  //   $a
	  //     ->call()
	  //
	  //     ->otherCall();
	  //
	  //   ($foo ? $a : $b)
	  //     ->call()
	  //     ->otherCall();

	  function shouldInsertEmptyLineAfter(node) {
	    var originalText = options.originalText;
	    var nextCharIndex = getNextNonSpaceNonCommentCharacterIndex(originalText, node, options);
	    var nextChar = originalText.charAt(nextCharIndex); // if it is cut off by a parenthesis, we only account for one typed empty
	    // line after that parenthesis

	    if (nextChar === ")") {
	      return isNextLineEmptyAfterIndex(originalText, nextCharIndex + 1, options);
	    }

	    return isNextLineEmpty(originalText, node, options);
	  }

	  function traverse(path) {
	    var node = path.node;

	    if (node.kind === "call" && (isLookupNode(node.what) || node.what.kind === "call")) {
	      printedNodes.unshift({
	        node: node,
	        printed: [printAllComments(path, function () {
	          return printArgumentsList(path, options, print);
	        }, options), shouldInsertEmptyLineAfter(node) ? hardline$1 : ""]
	      });
	      path.call(function (what) {
	        return traverse(what);
	      }, "what");
	    } else if (isLookupNode(node)) {
	      // Print *lookup nodes as we standard print them outside member chain
	      var printedMemberish = null;

	      if (node.kind === "propertylookup") {
	        printedMemberish = printPropertyLookup(path, options, print);
	      } else if (node.kind === "nullsafepropertylookup") {
	        printedMemberish = printNullsafePropertyLookup(path, options, print);
	      } else if (node.kind === "staticlookup") {
	        printedMemberish = printStaticLookup(path, options, print);
	      } else {
	        printedMemberish = printOffsetLookup(path, options, print);
	      }

	      printedNodes.unshift({
	        node: node,
	        needsParens: needsParens(path),
	        printed: printAllComments(path, function () {
	          return printedMemberish;
	        }, options)
	      });
	      path.call(function (what) {
	        return traverse(what);
	      }, "what");
	    } else {
	      printedNodes.unshift({
	        node: node,
	        printed: print()
	      });
	    }
	  }

	  var node = path.node;
	  printedNodes.unshift({
	    node: node,
	    printed: printArgumentsList(path, options, print)
	  });
	  path.call(function (what) {
	    return traverse(what);
	  }, "what"); // Restore parens around `propertylookup` and `staticlookup` nodes with call.
	  // $value = ($object->foo)();
	  // $value = ($object::$foo)();

	  for (var _i2 = 0; _i2 < printedNodes.length; ++_i2) {
	    if (printedNodes[_i2].node.kind === "call" && printedNodes[_i2 - 1] && ["propertylookup", "nullsafepropertylookup", "staticlookup"].includes(printedNodes[_i2 - 1].node.kind) && printedNodes[_i2 - 1].needsParens) {
	      printedNodes[0].printed = ["(", printedNodes[0].printed];
	      printedNodes[_i2 - 1].printed = [printedNodes[_i2 - 1].printed, ")"];
	    }
	  } // create groups from list of nodes, i.e.
	  //   [identifier a, call, isLookupNode b, isLookupNode c, call,
	  //    isLookupNode d, call]
	  // will be grouped as
	  //   [
	  //     [identifier a, Call],
	  //     [isLookupNode b, isLookupNode c, call],
	  //     [isLookupNode d, call]
	  //   ]
	  // so that we can print it as
	  //   a()
	  //     ->b->c()
	  //     ->d();


	  var groups = [];
	  var currentGroup = [printedNodes[0]];
	  var i = 1;

	  for (; i < printedNodes.length; ++i) {
	    if (printedNodes[i].node.kind === "call" || isLookupNode(printedNodes[i].node) && printedNodes[i].node.offset && printedNodes[i].node.offset.kind === "number") {
	      currentGroup.push(printedNodes[i]);
	    } else {
	      break;
	    }
	  }

	  if (printedNodes[0].node.kind !== "call") {
	    for (; i + 1 < printedNodes.length; ++i) {
	      if (isLookupNode(printedNodes[i].node) && isLookupNode(printedNodes[i + 1].node)) {
	        currentGroup.push(printedNodes[i]);
	      } else {
	        break;
	      }
	    }
	  }

	  groups.push(currentGroup);
	  currentGroup = []; // Then, each following group is a sequence of propertylookup followed by
	  // a sequence of call. To compute it, we keep adding things to the
	  // group until we have seen a call in the past and reach a
	  // propertylookup

	  var hasSeenCallExpression = false;

	  for (; i < printedNodes.length; ++i) {
	    if (hasSeenCallExpression && isLookupNode(printedNodes[i].node)) {
	      // [0] should be appended at the end of the group instead of the
	      // beginning of the next one
	      if (printedNodes[i].node.kind === "offsetlookup" && printedNodes[i].node.offset && printedNodes[i].node.offset.kind === "number") {
	        currentGroup.push(printedNodes[i]);
	        continue;
	      }

	      groups.push(currentGroup);
	      currentGroup = [];
	      hasSeenCallExpression = false;
	    }

	    if (printedNodes[i].node.kind === "call") {
	      hasSeenCallExpression = true;
	    }

	    currentGroup.push(printedNodes[i]);

	    if (printedNodes[i].node.comments && hasTrailingComment(printedNodes[i].node)) {
	      groups.push(currentGroup);
	      currentGroup = [];
	      hasSeenCallExpression = false;
	    }
	  }

	  if (currentGroup.length > 0) {
	    groups.push(currentGroup);
	  } // Merge next nodes when:
	  //
	  // 1. We have `$this` variable before
	  //
	  // Example:
	  //     $this->method()->property;
	  //
	  // 2. When we have offsetlookup after *lookup node
	  //
	  // Example:
	  //    $foo->Data['key']("foo")
	  //      ->method();
	  //
	  // 3. expression statements with variable names shorter than the tab width
	  //
	  // Example:
	  // $foo->bar()
	  //     ->baz()
	  //     ->buzz()


	  function shouldNotWrap(groups) {
	    var hasComputed = groups[1].length && groups[1][0].node.kind === "offsetlookup";

	    if (groups[0].length === 1) {
	      var firstNode = groups[0][0].node;
	      return firstNode.kind === "variable" && (firstNode.name === "this" || isExpressionStatement && isShort(firstNode.name)) || isReferenceLikeNode(firstNode);
	    }

	    function isShort(name) {
	      return name.length < options.tabWidth;
	    }

	    var lastNode = getLast(groups[0]).node;
	    return isLookupNode(lastNode) && (lastNode.offset.kind === "identifier" || lastNode.offset.kind === "variable") && hasComputed;
	  }

	  var isExpressionStatement = path.parent.kind === "expressionstatement";
	  var shouldMerge = groups.length >= 2 && !groups[1][0].node.comments && shouldNotWrap(groups);

	  function printGroup(printedGroup) {
	    var result = [];

	    for (var _i4 = 0; _i4 < printedGroup.length; _i4++) {
	      // Checks if the next node (i.e. the parent node) needs parens
	      // and print accordingl y
	      if (printedGroup[_i4 + 1] && printedGroup[_i4 + 1].needsParens) {
	        result.push("(", printedGroup[_i4].printed, printedGroup[_i4 + 1].printed, ")");
	        _i4++;
	      } else {
	        result.push(printedGroup[_i4].printed);
	      }
	    }

	    return result;
	  }

	  function printIndentedGroup(groups) {
	    if (groups.length === 0) {
	      return "";
	    }

	    return indent(group([hardline$1, join$1(hardline$1, groups.map(printGroup))]));
	  }

	  var printedGroups = groups.map(printGroup);
	  var oneLine = printedGroups; // Indicates how many we should merge
	  //
	  // Example (true):
	  //   $this->method()->otherMethod(
	  //     'argument'
	  //   );
	  //
	  // Example (false):
	  //   $foo
	  //     ->method()
	  //     ->otherMethod();

	  var cutoff = shouldMerge ? 3 : 2;
	  var flatGroups = groups.slice(0, cutoff).flat();
	  var hasComment = flatGroups.slice(1, -1).some(function (node) {
	    return hasLeadingComment(node.node);
	  }) || flatGroups.slice(0, -1).some(function (node) {
	    return hasTrailingComment(node.node);
	  }) || groups[cutoff] && hasLeadingComment(groups[cutoff][0].node);
	  var hasEncapsedAncestor = getAncestorNode(path, "encapsed"); // If we only have a single `->`, we shouldn't do anything fancy and just
	  // render everything concatenated together.
	  // In `encapsed` node we always print in one line.

	  if (groups.length <= cutoff && !hasComment || hasEncapsedAncestor) {
	    return group(oneLine);
	  } // Find out the last node in the first group and check if it has an
	  // empty line after


	  var lastNodeBeforeIndent = getLast(shouldMerge ? groups.slice(1, 2)[0] : groups[0]).node;
	  var shouldHaveEmptyLineBeforeIndent = lastNodeBeforeIndent.kind !== "call" && shouldInsertEmptyLineAfter(lastNodeBeforeIndent);
	  var expanded = [printGroup(groups[0]), shouldMerge ? groups.slice(1, 2).map(printGroup) : "", shouldHaveEmptyLineBeforeIndent ? hardline$1 : "", printIndentedGroup(groups.slice(shouldMerge ? 2 : 1))];
	  var callExpressionCount = printedNodes.filter(function (tuple) {
	    return tuple.node.kind === "call";
	  }).length; // We don't want to print in one line if there's:
	  //  * A comment.
	  //  * 3 or more chained calls.
	  //  * Any group but the last one has a hard line.
	  // If the last group is a function it's okay to inline if it fits.

	  if (hasComment || callExpressionCount >= 3 || printedGroups.slice(0, -1).some(willBreak)) {
	    return group(expanded);
	  }

	  return [// We only need to check `oneLine` because if `expanded` is chosen
	  // that means that the parent group has already been broken
	  // naturally
	  willBreak(oneLine) || shouldHaveEmptyLineBeforeIndent ? breakParent : "", conditionalGroup([oneLine, expanded])];
	}

	function couldGroupArg(arg) {
	  return arg.kind === "array" && (arg.items.length > 0 || arg.comments) || arg.kind === "function" || arg.kind === "method" || arg.kind === "closure";
	}

	function shouldGroupLastArg(args) {
	  var lastArg = getLast(args);
	  var penultimateArg = getPenultimate(args);
	  return !hasLeadingComment(lastArg) && !hasTrailingComment(lastArg) && couldGroupArg(lastArg) && ( // If the last two arguments are of the same type,
	  // disable last element expansion.
	  !penultimateArg || penultimateArg.kind !== lastArg.kind);
	}

	function shouldGroupFirstArg(args) {
	  if (args.length !== 2) {
	    return false;
	  }

	  var _args = _slicedToArray(args, 2),
	      firstArg = _args[0],
	      secondArg = _args[1];

	  return (!firstArg.comments || !firstArg.comments.length) && (firstArg.kind === "function" || firstArg.kind === "method" || firstArg.kind === "closure") && secondArg.kind !== "retif" && !couldGroupArg(secondArg);
	}

	function printArgumentsList(path, options, print) {
	  var argumentsKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "arguments";
	  var args = path.node[argumentsKey];

	  if (args.length === 0) {
	    return ["(", printDanglingComments(path, options,
	    /* sameIndent */
	    true), ")"];
	  }

	  var anyArgEmptyLine = false;
	  var hasEmptyLineFollowingFirstArg = false;
	  var printedArguments = path.map(function (_ref) {
	    var arg = _ref.node,
	        isLast = _ref.isLast,
	        isFirst = _ref.isFirst;
	    var parts = [print()];

	    if (isLast) ; else if (isNextLineEmpty(options.originalText, arg, options)) {
	      if (isFirst) {
	        hasEmptyLineFollowingFirstArg = true;
	      }

	      anyArgEmptyLine = true;
	      parts.push(",", hardline$1, hardline$1);
	    } else {
	      parts.push(",", line);
	    }

	    return parts;
	  }, argumentsKey);
	  var node = path.node;
	  var lastArg = getLast(args);
	  var maybeTrailingComma = shouldPrintComma(options, "7.3") && ["call", "new", "unset", "isset"].includes(node.kind) || shouldPrintComma(options, "8.0") && ["function", "closure", "method", "arrowfunc", "attribute"].includes(node.kind) ? indent([lastArg && shouldPrintHardlineBeforeTrailingComma(lastArg) ? hardline$1 : "", ","]) : "";

	  function allArgsBrokenOut() {
	    return group(["(", indent([line].concat(_toConsumableArray(printedArguments))), maybeTrailingComma, line, ")"], {
	      shouldBreak: true
	    });
	  }

	  var shouldGroupFirst = shouldGroupFirstArg(args);
	  var shouldGroupLast = shouldGroupLastArg(args);

	  if (shouldGroupFirst || shouldGroupLast) {
	    var shouldBreak = (shouldGroupFirst ? printedArguments.slice(1).some(willBreak) : printedArguments.slice(0, -1).some(willBreak)) || anyArgEmptyLine; // We want to print the last argument with a special flag

	    var printedExpanded;
	    path.each(function (_ref2) {
	      var isLast = _ref2.isLast,
	          isFirst = _ref2.isFirst;

	      if (shouldGroupFirst && isFirst) {
	        printedExpanded = [print([], {
	          expandFirstArg: true
	        }), printedArguments.length > 1 ? "," : "", hasEmptyLineFollowingFirstArg ? hardline$1 : line, hasEmptyLineFollowingFirstArg ? hardline$1 : "", printedArguments.slice(1)];
	      }

	      if (shouldGroupLast && isLast) {
	        printedExpanded = [].concat(_toConsumableArray(printedArguments.slice(0, -1)), [print([], {
	          expandLastArg: true
	        })]);
	      }
	    }, argumentsKey);
	    var somePrintedArgumentsWillBreak = printedArguments.some(willBreak);
	    var simpleConcat = ["("].concat(_toConsumableArray(printedExpanded), [")"]);
	    return [somePrintedArgumentsWillBreak ? breakParent : "", conditionalGroup([!somePrintedArgumentsWillBreak ? simpleConcat : ifBreak(allArgsBrokenOut(), simpleConcat), shouldGroupFirst ? ["(", group(printedExpanded[0], {
	      shouldBreak: true
	    })].concat(_toConsumableArray(printedExpanded.slice(1)), [")"]) : ["("].concat(_toConsumableArray(printedArguments.slice(0, -1)), [group(getLast(printedExpanded), {
	      shouldBreak: true
	    }), ")"]), group(["(", indent([line].concat(_toConsumableArray(printedArguments))), ifBreak(maybeTrailingComma), line, ")"], {
	      shouldBreak: true
	    })], {
	      shouldBreak: shouldBreak
	    })];
	  }

	  return group(["(", indent([softline].concat(_toConsumableArray(printedArguments))), ifBreak(maybeTrailingComma), softline, ")"], {
	    shouldBreak: printedArguments.some(willBreak) || anyArgEmptyLine
	  });
	}

	function shouldInlineRetifFalseExpression(node) {
	  return node.kind === "array" && node.items.length !== 0;
	}

	function shouldInlineLogicalExpression(node) {
	  return node.right.kind === "array" && node.right.items.length !== 0;
	} // For binary expressions to be consistent, we need to group
	// subsequent operators with the same precedence level under a single
	// group. Otherwise they will be nested such that some of them break
	// onto new lines but not all. Operators with the same precedence
	// level should either all break or not. Because we group them by
	// precedence level and the AST is structured based on precedence
	// level, things are naturally broken up correctly, i.e. `&&` is
	// broken before `+`.


	function printBinaryExpression(path, print, options, isNested, isInsideParenthesis) {
	  var parts = [];
	  var node = path.node;

	  if (node.kind === "bin") {
	    // Put all operators with the same precedence level in the same
	    // group. The reason we only need to do this with the `left`
	    // expression is because given an expression like `1 + 2 - 3`, it
	    // is always parsed like `((1 + 2) - 3)`, meaning the `left` side
	    // is where the rest of the expression will exist. Binary
	    // expressions on the right side mean they have a difference
	    // precedence level and should be treated as a separate group, so
	    // print them normally. (This doesn't hold for the `**` operator,
	    // which is unique in that it is right-associative.)
	    if (shouldFlatten(node.type, node.left.type)) {
	      // Flatten them out by recursively calling this function.
	      parts = parts.concat(path.call(function () {
	        return printBinaryExpression(path, print, options,
	        /* isNested */
	        true, isInsideParenthesis);
	      }, "left"));
	    } else {
	      parts.push(print("left"));
	    }

	    var shouldInline = shouldInlineLogicalExpression(node);
	    var right = shouldInline ? [node.type, " ", print("right")] : [node.type, line, print("right")]; // If there's only a single binary expression, we want to create a group
	    // in order to avoid having a small right part like -1 be on its own line.

	    var parent = path.parent;
	    var shouldGroup = !(isInsideParenthesis && ["||", "&&"].includes(node.type)) && getNodeKindIncludingLogical(parent) !== getNodeKindIncludingLogical(node) && getNodeKindIncludingLogical(node.left) !== getNodeKindIncludingLogical(node) && getNodeKindIncludingLogical(node.right) !== getNodeKindIncludingLogical(node);
	    var shouldNotHaveWhitespace = isDocNode(node.left) || node.left.kind === "bin" && isDocNode(node.left.right);
	    parts.push(shouldNotHaveWhitespace ? "" : " ", shouldGroup ? group(right) : right); // The root comments are already printed, but we need to manually print
	    // the other ones since we don't call the normal print on bin,
	    // only for the left and right parts

	    if (isNested && node.comments) {
	      parts = printAllComments(path, function () {
	        return parts;
	      }, options);
	    }
	  } else {
	    // Our stopping case. Simply print the node normally.
	    parts.push(print());
	  }

	  return parts;
	}

	function printLookupNodes(path, options, print) {
	  var node = path.node;

	  switch (node.kind) {
	    case "propertylookup":
	      return printPropertyLookup(path, options, print);

	    case "nullsafepropertylookup":
	      return printNullsafePropertyLookup(path, options, print);

	    case "staticlookup":
	      return printStaticLookup(path, options, print);

	    case "offsetlookup":
	      return printOffsetLookup(path, options, print);

	    /* istanbul ignore next */

	    default:
	      return "Have not implemented lookup kind ".concat(node.kind, " yet.");
	  }
	}

	function getEncapsedQuotes(node) {
	  var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	      _ref3$opening = _ref3.opening,
	      opening = _ref3$opening === void 0 ? true : _ref3$opening;

	  if (node.type === "heredoc") {
	    return opening ? "<<<".concat(node.label) : node.label;
	  }

	  var quotes = {
	    string: '"',
	    shell: "`"
	  };

	  if (quotes[node.type]) {
	    return quotes[node.type];
	  }
	  /* istanbul ignore next */


	  return "Unimplemented encapsed type ".concat(node.type);
	}

	function printArrayItems(path, options, print) {
	  var printedElements = [];
	  var separatorParts = [];
	  path.each(function (_ref4) {
	    var node = _ref4.node;
	    printedElements.push(separatorParts);
	    printedElements.push(group(print()));
	    separatorParts = [",", line];

	    if (node && isNextLineEmpty(options.originalText, node, options)) {
	      separatorParts.push(softline);
	    }
	  }, "items");
	  return printedElements;
	} // Wrap parts into groups by indexes.
	// It is require to have same indent on lines for all parts into group.
	// The value of `alignment` option indicates how many spaces must be before each part.
	//
	// Example:
	// <div>
	//     <?php
	//     echo '1';
	//     echo '2';
	//     echo '3';
	//     ?>
	// </div>


	function wrapPartsIntoGroups(parts, indexes) {
	  if (indexes.length === 0) {
	    return parts;
	  }

	  var lastEnd = 0;
	  return indexes.reduce(function (accumulator, index) {
	    var start = index.start,
	        end = index.end,
	        alignment = index.alignment,
	        before = index.before,
	        after = index.after;
	    var printedPartsForGrouping = [before || ""].concat(_toConsumableArray(parts.slice(start, end)), [after || ""]);
	    var newArray = accumulator.concat(parts.slice(lastEnd, start), alignment ? dedentToRoot(group(align(new Array(alignment).join(" "), printedPartsForGrouping))) : group(printedPartsForGrouping), end === parts.length - 1 ? parts.slice(end) : "");
	    lastEnd = end;
	    return newArray;
	  }, []);
	}

	function printLines(path, options, print) {
	  var childrenAttribute = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "children";
	  var node = path.node,
	      parentNode = path.parent;
	  var lastInlineIndex = -1;
	  var parts = [];
	  var groupIndexes = [];
	  path.map(function () {
	    var childNode = path.node,
	        nextNode = path.next,
	        isFirstNode = path.isFirst,
	        isLastNode = path.isLast,
	        index = path.index;
	    var isInlineNode = childNode.kind === "inline";
	    var printedPath = print();
	    var canPrintBlankLine = !isLastStatement(path) && !isInlineNode && (nextNode && nextNode.kind === "case" ? !isFirstChildrenInlineNode(path) : nextNode && nextNode.kind !== "inline");
	    var printed = [printedPath, canPrintBlankLine ? hardline$1 : "", canPrintBlankLine && isNextLineEmpty(options.originalText, childNode, options) ? hardline$1 : ""];
	    var isBlockNestedNode = node.kind === "block" && parentNode && ["function", "closure", "method", "try", "catch"].includes(parentNode.kind);
	    var beforeCloseTagInlineNode = isBlockNestedNode && isFirstNode ? "" : " ";

	    if (isInlineNode || !isInlineNode && isLastNode && lastInlineIndex >= 0) {
	      var prevLastInlineIndex = lastInlineIndex;

	      if (isInlineNode) {
	        lastInlineIndex = index;
	      }

	      var shouldCreateGroup = isInlineNode && !isFirstNode || !isInlineNode && isLastNode;

	      if (shouldCreateGroup) {
	        var start = (isInlineNode ? prevLastInlineIndex : lastInlineIndex) + 1;
	        var end = isLastNode && !isInlineNode ? index + 1 : index;
	        var prevInlineNode = path.siblings[isInlineNode ? prevLastInlineIndex : lastInlineIndex];
	        var alignment = prevInlineNode ? getAlignment(prevInlineNode.raw) : "";
	        var shouldBreak = end - start > 1;
	        var before = shouldBreak ? isBlockNestedNode && !prevInlineNode || isProgramLikeNode(node) && start === 0 ? "" : hardline$1 : "";
	        var after = shouldBreak && childNode.kind !== "halt" ? isBlockNestedNode && isLastNode ? "" : hardline$1 : "";

	        if (shouldBreak) {
	          beforeCloseTagInlineNode = "";
	        }

	        groupIndexes.push({
	          start: start,
	          end: end,
	          alignment: alignment,
	          before: before,
	          after: after
	        });
	      }
	    }

	    if (isInlineNode) {
	      var openTag = nextNode && nextNode.kind === "echo" && nextNode.shortForm ? "<?=" : "<?php";
	      var beforeInline = childNode.leadingComments && childNode.leadingComments.length ? [isFirstNode && node.kind !== "namespace" && !isBlockNestedNode ? "<?php" : "", node.kind === "namespace" || !isBlockNestedNode ? hardline$1 : "", printComments(childNode.leadingComments, options), hardline$1, "?>"] : isProgramLikeNode(node) && isFirstNode && node.kind !== "namespace" ? "" : [beforeCloseTagInlineNode, "?>"]; //FIXME getNode is used to get ancestors, but it seems this means to get next sibling?

	      var nextV = path.getNode(index + 1);
	      var skipLastComment = nextV && nextV.children && nextV.children.length;
	      var afterInline = childNode.comments && childNode.comments.length ? [openTag, hardline$1, skipLastComment ? printComments(childNode.comments, options) : "", hardline$1] : isProgramLikeNode(node) && isLastNode ? "" : [openTag, " "];
	      printed = [beforeInline, printed, afterInline];
	    }

	    parts.push(printed);
	  }, childrenAttribute);
	  var wrappedParts = wrapPartsIntoGroups(parts, groupIndexes);

	  if (node.kind === "program" && !node.extra.parseAsEval) {
	    var _parts = [];

	    var _node$children2 = _slicedToArray(node.children, 1),
	        firstNode = _node$children2[0];

	    var hasStartTag = !firstNode || firstNode.kind !== "inline";

	    if (hasStartTag) {
	      var between = options.originalText.trim().match(/^<\?(php|=)(\s+)?\S/);
	      var afterOpenTag = [between && between[2] && between[2].includes("\n") ? [hardline$1, between[2].split("\n").length > 2 ? hardline$1 : ""] : " ", node.comments ? printComments(node.comments, options) : ""];
	      var shortEcho = firstNode && firstNode.kind === "echo" && firstNode.shortForm;

	      _parts.push([shortEcho ? "<?=" : "<?php", afterOpenTag]);
	    }

	    _parts.push(wrappedParts);

	    var hasEndTag = /\?>\n?$/.test(options.originalText);

	    if (hasEndTag) {
	      var lastNode = getLast(node.children);
	      var beforeCloseTag = lastNode ? [hasNewlineInRange(options.originalText.trimEnd(), locEnd(lastNode), locEnd(node)) ? !(lastNode.kind === "inline" && lastNode.comments && lastNode.comments.length) ? hardline$1 : "" : " ", isNextLineEmpty(options.originalText, lastNode, options) ? hardline$1 : ""] : node.comments ? hardline$1 : "";

	      _parts.push(lineSuffix([beforeCloseTag, "?>"]));
	    }

	    return _parts;
	  }

	  return wrappedParts;
	}

	function printStatements(path, options, print, childrenAttribute) {
	  return path.map(function () {
	    var parts = [];
	    parts.push(print());

	    if (!isLastStatement(path)) {
	      parts.push(hardline$1);

	      if (isNextLineEmpty(options.originalText, path.node, options)) {
	        parts.push(hardline$1);
	      }
	    }

	    return parts;
	  }, childrenAttribute);
	}

	function printClassPart(path, options, print) {
	  var part = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "extends";
	  var beforePart = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : " ";
	  var afterPart = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : " ";
	  var value = path.node[part];
	  var printedBeforePart = hasDanglingComments(value) ? [hardline$1, path.call(function () {
	    return printDanglingComments(path, options, true);
	  }, part), hardline$1] : beforePart;
	  var printedPartItems = Array.isArray(value) ? group(join$1(",", path.map(function (_ref5) {
	    var node = _ref5.node;
	    var printedPart = print(); // Check if any of the implements nodes have comments

	    return hasDanglingComments(node) ? [hardline$1, printDanglingComments(path, options, true), hardline$1, printedPart] : [afterPart, printedPart];
	  }, part))) : [afterPart, print(part)];
	  return indent([printedBeforePart, part, willBreak(printedBeforePart) ? indent(printedPartItems) : printedPartItems]);
	}

	function printAttrs(path, options, print) {
	  var _ref6 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
	      _ref6$inline = _ref6.inline,
	      inline = _ref6$inline === void 0 ? false : _ref6$inline;

	  var allAttrs = [];

	  if (!path.node.attrGroups) {
	    return [];
	  }

	  path.each(function () {
	    var attrGroup = ["#["];

	    if (!inline && allAttrs.length > 0) {
	      allAttrs.push(hardline$1);
	    }

	    attrGroup.push(softline);
	    path.each(function () {
	      var attrNode = path.node;

	      if (attrGroup.length > 2) {
	        attrGroup.push(",", line);
	      }

	      var attrStmt = [attrNode.name];

	      if (attrNode.args.length > 0) {
	        attrStmt.push(printArgumentsList(path, options, print, "args"));
	      }

	      attrGroup.push(group(attrStmt));
	    }, "attrs");
	    allAttrs.push(group([indent(attrGroup), ifBreak(shouldPrintComma(options, "8.0") ? "," : ""), softline, "]", inline ? ifBreak(softline, " ") : ""]));
	  }, "attrGroups");

	  if (allAttrs.length === 0) {
	    return [];
	  }

	  return [].concat(allAttrs, [inline ? "" : hardline$1]);
	}

	function printClass(path, options, print) {
	  var node = path.node;
	  var isAnonymousClass = node.kind === "class" && node.isAnonymous;
	  var attrs = printAttrs(path, options, print, {
	    inline: isAnonymousClass
	  });
	  var declaration = isAnonymousClass ? [] : _toConsumableArray(attrs);

	  if (node.isReadonly) {
	    declaration.push("readonly ");
	  }

	  if (node.isFinal) {
	    declaration.push("final ");
	  }

	  if (node.isAbstract) {
	    declaration.push("abstract ");
	  } // `new` print `class` keyword with arguments


	  declaration.push(isAnonymousClass ? "" : node.kind);

	  if (node.name) {
	    declaration.push(" ", print("name"));
	  }

	  if (node.kind === "enum" && node.valueType) {
	    declaration.push(": ", print("valueType"));
	  } // Only `class` can have `extends` and `implements`


	  if (node.extends && node.implements) {
	    declaration.push(conditionalGroup([[printClassPart(path, options, print, "extends"), printClassPart(path, options, print, "implements")], [printClassPart(path, options, print, "extends"), printClassPart(path, options, print, "implements", " ", hardline$1)], [printClassPart(path, options, print, "extends", hardline$1, " "), printClassPart(path, options, print, "implements", hardline$1, node.implements.length > 1 ? hardline$1 : " ")]], {
	      shouldBreak: hasDanglingComments(node.extends)
	    }));
	  } else {
	    if (node.extends) {
	      declaration.push(conditionalGroup([printClassPart(path, options, print, "extends"), printClassPart(path, options, print, "extends", " ", hardline$1), printClassPart(path, options, print, "extends", hardline$1, node.extends.length > 1 ? hardline$1 : " ")]));
	    }

	    if (node.implements) {
	      declaration.push(conditionalGroup([printClassPart(path, options, print, "implements"), printClassPart(path, options, print, "implements", " ", hardline$1), printClassPart(path, options, print, "implements", hardline$1, node.implements.length > 1 ? hardline$1 : " ")]));
	    }
	  }

	  var printedDeclaration = group([group(declaration), shouldPrintHardlineForOpenBrace(options) ? isAnonymousClass ? line : hardline$1 : " "]);
	  var hasEmptyClassBody = node.body && node.body.length === 0 && !hasDanglingComments(node);
	  var printedBody = ["{", indent([hasEmptyClassBody ? "" : hardline$1, printStatements(path, options, print, "body")]), printDanglingComments(path, options, true), isAnonymousClass && hasEmptyClassBody ? softline : hardline$1, "}"];
	  return [printedDeclaration, printedBody];
	}

	function printFunction(path, options, print) {
	  var node = path.node;
	  var declAttrs = printAttrs(path, options, print, {
	    inline: node.kind === "closure"
	  });
	  var declaration = [];

	  if (node.isFinal) {
	    declaration.push("final ");
	  }

	  if (node.isAbstract) {
	    declaration.push("abstract ");
	  }

	  if (node.visibility) {
	    declaration.push(node.visibility, " ");
	  }

	  if (node.isStatic) {
	    declaration.push("static ");
	  }

	  declaration.push("function ");

	  if (node.byref) {
	    declaration.push("&");
	  }

	  if (node.name) {
	    declaration.push(print("name"));
	  }

	  declaration.push(printArgumentsList(path, options, print));

	  if (node.uses && node.uses.length > 0) {
	    declaration.push(group([" use ", printArgumentsList(path, options, print, "uses")]));
	  }

	  if (node.type) {
	    declaration.push([": ", hasDanglingComments(node.type) ? [path.call(function () {
	      return printDanglingComments(path, options, true);
	    }, "type"), " "] : "", node.nullable ? "?" : "", print("type")]);
	  }

	  var printedDeclaration = declaration;

	  if (!node.body) {
	    return [].concat(_toConsumableArray(declAttrs), [printedDeclaration]);
	  }

	  var isClosure = node.kind === "closure";
	  var printedBody = ["{", indent([hasEmptyBody(path) ? "" : hardline$1, print("body")]), isClosure && hasEmptyBody(path) ? "" : hardline$1, "}"];

	  if (isClosure) {
	    return [].concat(_toConsumableArray(declAttrs), [printedDeclaration, " ", printedBody]);
	  }

	  if (node.arguments.length === 0) {
	    return [].concat(_toConsumableArray(declAttrs), [printedDeclaration, shouldPrintHardlineForOpenBrace(options) ? hardline$1 : " ", printedBody]);
	  }

	  var willBreakDeclaration = declaration.some(willBreak);

	  if (willBreakDeclaration) {
	    return [printedDeclaration, " ", printedBody];
	  }

	  return [].concat(_toConsumableArray(declAttrs), [conditionalGroup([[printedDeclaration, shouldPrintHardlineForOpenBrace(options) ? hardline$1 : " ", printedBody], [printedDeclaration, " ", printedBody]])]);
	}

	function printBodyControlStructure(path, options, print) {
	  var bodyProperty = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "body";
	  var node = path.node;

	  if (!node[bodyProperty]) {
	    return ";";
	  }

	  var printedBody = print(bodyProperty);
	  return [node.shortForm ? ":" : " {", indent(node[bodyProperty].kind !== "block" || node[bodyProperty].children && node[bodyProperty].children.length > 0 || node[bodyProperty].comments && node[bodyProperty].comments.length > 0 ? [shouldPrintHardLineAfterStartInControlStructure(path) ? node.kind === "switch" ? " " : "" : hardline$1, printedBody] : ""), node.kind === "if" && bodyProperty === "body" ? "" : [shouldPrintHardLineBeforeEndInControlStructure(path) ? hardline$1 : "", node.shortForm ? ["end", node.kind, ";"] : "}"]];
	}

	function printAssignment(leftNode, printedLeft, operator, rightNode, printedRight, hasRef, options) {
	  if (!rightNode) {
	    return printedLeft;
	  }

	  var printed = printAssignmentRight(leftNode, rightNode, printedRight, hasRef, options);
	  return group([printedLeft, operator, printed]);
	}

	function isLookupNodeChain(node) {
	  if (!isLookupNode(node)) {
	    return false;
	  }

	  if (node.what.kind === "variable" || isReferenceLikeNode(node.what)) {
	    return true;
	  }

	  return isLookupNodeChain(node.what);
	}

	function printAssignmentRight(leftNode, rightNode, printedRight, hasRef, options) {
	  var ref = hasRef ? "&" : "";

	  if (hasLeadingOwnLineComment(options.originalText, rightNode)) {
	    return indent([hardline$1, ref, printedRight]);
	  }

	  var pureRightNode = rightNode.kind === "cast" ? rightNode.expr : rightNode;
	  var canBreak = pureRightNode.kind === "bin" && !shouldInlineLogicalExpression(pureRightNode) || pureRightNode.kind === "retif" && (!pureRightNode.trueExpr && !shouldInlineRetifFalseExpression(pureRightNode.falseExpr) || pureRightNode.test.kind === "bin" && !shouldInlineLogicalExpression(pureRightNode.test)) || (leftNode.kind === "variable" || leftNode.kind === "string" || isLookupNode(leftNode)) && (pureRightNode.kind === "string" && !stringHasNewLines(pureRightNode) || isLookupNodeChain(pureRightNode));

	  if (canBreak) {
	    return group(indent([line, ref, printedRight]));
	  }

	  return [" ", ref, printedRight];
	}

	function needsHardlineAfterDanglingComment(node) {
	  if (!node.comments) {
	    return false;
	  }

	  var lastDanglingComment = getLast(node.comments.filter(function (comment) {
	    return !comment.leading && !comment.trailing;
	  }));
	  return lastDanglingComment && !isBlockComment(lastDanglingComment);
	}

	function stringHasNewLines(node) {
	  return node.raw.includes("\n");
	}

	function isStringOnItsOwnLine(node, text) {
	  return (node.kind === "string" || node.kind === "encapsed" && (node.type === "string" || node.type === "shell")) && stringHasNewLines(node) && !hasNewline(text, locStart(node), {
	    backwards: true
	  });
	}

	function printComposedTypes(path, print, glue) {
	  return group(path.map(function (_ref7) {
	    var isFirst = _ref7.isFirst;
	    return isFirst ? [print()] : [glue, print()];
	  }, "types"));
	}

	function printNode(path, options, print) {
	  var node = path.node;

	  switch (node.kind) {
	    case "program":
	      {
	        return group([printLines(path, options, print), printDanglingComments(path, options,
	        /* sameIndent */
	        true, function (c) {
	          return !c.printed;
	        })]);
	      }

	    case "expressionstatement":
	      return print("expression");

	    case "block":
	      return [printLines(path, options, print), printDanglingComments(path, options, true)];

	    case "declare":
	      {
	        var printDeclareArguments = function printDeclareArguments(path) {
	          return join$1(", ", path.map(print, "directives"));
	        };

	        if (["block", "short"].includes(node.mode)) {
	          return ["declare(", printDeclareArguments(path), ")", node.mode === "block" ? " {" : ":", node.children.length > 0 ? indent([hardline$1, printLines(path, options, print)]) : "", printDanglingComments(path, options), hardline$1, node.mode === "block" ? "}" : "enddeclare;"];
	        }

	        var nextNode = getNextNode(path, node);
	        return ["declare(", printDeclareArguments(path), ")", nextNode && nextNode.kind === "inline" ? "" : ";"];
	      }

	    case "declaredirective":
	      return [print("key"), "=", print("value")];

	    case "namespace":
	      return ["namespace ", node.name && typeof node.name === "string" ? [node.name, node.withBrackets ? " " : ""] : "", node.withBrackets ? "{" : ";", hasDanglingComments(node) ? [" ", printDanglingComments(path, options, true)] : "", node.children.length > 0 ? node.withBrackets ? indent([hardline$1, printLines(path, options, print)]) : [node.children[0].kind === "inline" ? "" : [hardline$1, isNextLineEmptyAfterNamespace(options.originalText, node) ? hardline$1 : ""], printLines(path, options, print)] : "", node.withBrackets ? [hardline$1, "}"] : ""];

	    case "usegroup":
	      return group(["use ", node.type ? [node.type, " "] : "", indent([node.name ? [maybeStripLeadingSlashFromUse(node.name), "\\{", softline] : "", join$1([",", line], path.map(print, "items"))]), node.name ? [ifBreak(shouldPrintComma(options, "7.2") ? "," : ""), softline, "}"] : ""]);

	    case "useitem":
	      return [node.type ? [node.type, " "] : "", maybeStripLeadingSlashFromUse(node.name), hasDanglingComments(node) ? [" ", printDanglingComments(path, options, true)] : "", node.alias ? [" as ", print("alias")] : ""];

	    case "class":
	    case "enum":
	    case "interface":
	    case "trait":
	      return printClass(path, options, print);

	    case "traitprecedence":
	      return [print("trait"), "::", print("method"), " insteadof ", join$1(", ", path.map(print, "instead"))];

	    case "traitalias":
	      return [node.trait ? [print("trait"), "::"] : "", node.method ? print("method") : "", " as ", join$1(" ", [].concat(_toConsumableArray(node.visibility ? [node.visibility] : []), _toConsumableArray(node.as ? [print("as")] : [])))];

	    case "traituse":
	      return group(["use ", indent(group(join$1([",", line], path.map(print, "traits")))), node.adaptations ? [" {", node.adaptations.length > 0 ? [indent([hardline$1, printStatements(path, options, print, "adaptations")]), hardline$1] : hasDanglingComments(node) ? [line, printDanglingComments(path, options, true), line] : "", "}"] : ""]);

	    case "function":
	    case "closure":
	    case "method":
	      return printFunction(path, options, print);

	    case "arrowfunc":
	      return [node.parenthesizedExpression ? "(" : ""].concat(_toConsumableArray(printAttrs(path, options, print, {
	        inline: true
	      })), [node.isStatic ? "static " : "", "fn", printArgumentsList(path, options, print), node.type ? [": ", node.nullable ? "?" : "", print("type")] : "", " => ", print("body"), node.parenthesizedExpression ? ")" : ""]);

	    case "parameter":
	      {
	        var promoted = "";

	        if (node.flags === 1) {
	          promoted = "public ";
	        } else if (node.flags === 2) {
	          promoted = "protected ";
	        } else if (node.flags === 4) {
	          promoted = "private ";
	        }

	        var name = [].concat(_toConsumableArray(printAttrs(path, options, print, {
	          inline: true
	        })), [promoted, node.readonly ? "readonly " : "", node.nullable ? "?" : "", node.type ? [print("type"), " "] : "", node.byref ? "&" : "", node.variadic ? "..." : "", "$", print("name")]);

	        if (node.value) {
	          return group([name, // see handleFunctionParameter() in ./comments.js - since there's
	          // no node to attach comments that fall in between the parameter name
	          // and value, we store them as dangling comments
	          hasDanglingComments(node) ? " " : "", printDanglingComments(path, options, true), " =", printAssignmentRight(node.name, node.value, print("value"), false, options)]);
	        }

	        return name;
	      }

	    case "variadic":
	      return ["...", print("what")];

	    case "property":
	      return group([node.readonly ? "readonly " : "", node.type ? [node.nullable ? "?" : "", print("type"), " "] : "", "$", print("name"), node.value ? [" =", printAssignmentRight(node.name, node.value, print("value"), false, options)] : ""]);

	    case "propertystatement":
	      {
	        var attrs = [];
	        path.each(function () {
	          attrs.push.apply(attrs, _toConsumableArray(printAttrs(path, options, print)));
	        }, "properties");
	        var printed = path.map(print, "properties");
	        var hasValue = node.properties.some(function (property) {
	          return property.value;
	        });
	        var firstProperty;

	        if (printed.length === 1 && !node.properties[0].comments) {
	          var _printed = _slicedToArray(printed, 1);

	          firstProperty = _printed[0];
	        } else if (printed.length > 0) {
	          // Indent first property
	          firstProperty = indent(printed[0]);
	        }

	        var hasVisibility = node.visibility || node.visibility === null;
	        return group([].concat(attrs, [hasVisibility ? [node.visibility === null ? "var" : node.visibility, ""] : "", node.isStatic ? [hasVisibility ? " " : "", "static"] : "", firstProperty ? [" ", firstProperty] : "", indent(printed.slice(1).map(function (p) {
	          return [",", hasValue ? hardline$1 : line, p];
	        }))]));
	      }

	    case "if":
	      {
	        var parts = [];
	        var body = printBodyControlStructure(path, options, print, "body");
	        var opening = group(["if (", group([indent([softline, print("test")]), softline]), ")", body]);
	        parts.push(opening, isFirstChildrenInlineNode(path) || !node.body ? "" : hardline$1);

	        if (node.alternate) {
	          parts.push(node.shortForm ? "" : "} ");
	          var commentOnOwnLine = hasTrailingComment(node.body) && node.body.comments.some(function (comment) {
	            return comment.trailing && !isBlockComment(comment);
	          }) || needsHardlineAfterDanglingComment(node);
	          var elseOnSameLine = !commentOnOwnLine;
	          parts.push(elseOnSameLine ? "" : hardline$1);

	          if (hasDanglingComments(node)) {
	            parts.push(isNextLineEmpty(options.originalText, node.body, options) ? hardline$1 : "", printDanglingComments(path, options, true), commentOnOwnLine ? hardline$1 : " ");
	          }

	          parts.push("else", group(node.alternate.kind === "if" ? print("alternate") : printBodyControlStructure(path, options, print, "alternate")));
	        } else {
	          parts.push(node.body ? node.shortForm ? "endif;" : "}" : "");
	        }

	        return parts;
	      }

	    case "do":
	      return ["do", printBodyControlStructure(path, options, print, "body"), " while (", group([indent([softline, print("test")]), softline]), ")"];

	    case "while":
	    case "switch":
	      return group([node.kind, " (", group([indent([softline, print("test")]), softline]), ")", printBodyControlStructure(path, options, print, "body")]);

	    case "for":
	      {
	        var _body = printBodyControlStructure(path, options, print, "body"); // We want to keep dangling comments above the loop to stay consistent.
	        // Any comment positioned between the for statement and the parentheses
	        // is going to be printed before the statement.


	        var dangling = printDanglingComments(path, options,
	        /* sameLine */
	        true);
	        var printedComments = dangling ? [dangling, softline] : "";

	        if (!node.init.length && !node.test.length && !node.increment.length) {
	          return [printedComments, group(["for (;;)", _body])];
	        }

	        return [printedComments, group(["for (", group([indent([softline, group(join$1([",", line], path.map(print, "init"))), ";", line, group(join$1([",", line], path.map(print, "test"))), ";", line, group(join$1([",", line], path.map(print, "increment")))]), softline]), ")", _body])];
	      }

	    case "foreach":
	      {
	        var _body2 = printBodyControlStructure(path, options, print, "body"); // We want to keep dangling comments above the loop to stay consistent.
	        // Any comment positioned between the for statement and the parentheses
	        // is going to be printed before the statement.


	        var _dangling = printDanglingComments(path, options,
	        /* sameLine */
	        true);

	        var _printedComments = _dangling ? [_dangling, softline] : "";

	        return [_printedComments, group(["foreach (", group([indent([softline, print("source"), line, "as ", group(node.key ? indent(join$1([" =>", line], [print("key"), print("value")])) : print("value"))]), softline]), ")", _body2])];
	      }

	    case "try":
	      {
	        var _parts2 = [];

	        _parts2.push("try", printBodyControlStructure(path, options, print, "body"));

	        if (node.catches) {
	          _parts2.push(path.map(print, "catches"));
	        }

	        if (node.always) {
	          _parts2.push(" finally", printBodyControlStructure(path, options, print, "always"));
	        }

	        return _parts2;
	      }

	    case "catch":
	      {
	        return [" catch", node.what ? [" (", join$1(" | ", path.map(print, "what")), node.variable ? [" ", print("variable")] : "", ")"] : "", printBodyControlStructure(path, options, print, "body")];
	      }

	    case "case":
	      return [node.test ? ["case ", node.test.comments ? indent(print("test")) : print("test"), ":"] : "default:", node.body ? node.body.children && node.body.children.length ? indent([isFirstChildrenInlineNode(path) ? "" : hardline$1, print("body")]) : "" : ""];

	    case "break":
	    case "continue":
	      if (node.level) {
	        if (node.level.kind === "number" && node.level.value !== "1") {
	          return ["".concat(node.kind, " "), print("level")];
	        }

	        return node.kind;
	      }

	      return node.kind;

	    case "call":
	      {
	        // Multiline strings as single arguments
	        if (node.arguments.length === 1 && isStringOnItsOwnLine(node.arguments[0], options.originalText)) {
	          return [print("what"), "(", join$1(", ", path.map(print, "arguments")), ")"];
	        } // chain: Call (*LookupNode (Call (*LookupNode (...))))


	        if (isLookupNode(node.what)) {
	          return printMemberChain(path, options, print);
	        }

	        return [print("what"), printArgumentsList(path, options, print)];
	      }

	    case "new":
	      {
	        var isAnonymousClassNode = node.what && node.what.kind === "class" && node.what.isAnonymous; // Multiline strings as single arguments

	        if (!isAnonymousClassNode && node.arguments.length === 1 && isStringOnItsOwnLine(node.arguments[0], options.originalText)) {
	          return ["new "].concat(_toConsumableArray(path.call(printAttrs, "what")), [print("what"), "(", join$1(", ", path.map(print, "arguments")), ")"]);
	        }

	        var _parts3 = [];

	        _parts3.push("new ");

	        if (isAnonymousClassNode) {
	          _parts3.push.apply(_parts3, [node.what.leadingComments && node.what.leadingComments[0].kind === "commentblock" ? [printComments(node.what.leadingComments, options), " "] : ""].concat(_toConsumableArray(path.call(function () {
	            return printAttrs(path, options, print, {
	              inline: true
	            });
	          }, "what")), ["class", node.arguments.length > 0 ? [" ", printArgumentsList(path, options, print)] : "", group(print("what"))]));
	        } else {
	          var isExpression = ["call", "offsetlookup"].includes(node.what.kind);
	          var _printed2 = [isExpression ? "(" : "", print("what"), isExpression ? ")" : "", printArgumentsList(path, options, print)];

	          _parts3.push(hasLeadingComment(node.what) ? indent(_printed2) : _printed2);
	        }

	        return _parts3;
	      }

	    case "clone":
	      return ["clone ", node.what.comments ? indent(print("what")) : print("what")];

	    case "propertylookup":
	    case "nullsafepropertylookup":
	    case "staticlookup":
	    case "offsetlookup":
	      {
	        var parent = path.parent; // TODO: Use `AstPath.findAncestor` when it's stable

	        var firstNonMemberParent;
	        var i = 0;

	        do {
	          firstNonMemberParent = path.getParentNode(i);
	          i++;
	        } while (firstNonMemberParent && isLookupNode(firstNonMemberParent));

	        var hasEncapsedAncestor = getAncestorNode(path, "encapsed");
	        var shouldInline = hasEncapsedAncestor || firstNonMemberParent && (firstNonMemberParent.kind === "new" || firstNonMemberParent.kind === "assign" && firstNonMemberParent.left.kind !== "variable") || node.kind === "offsetlookup" || (isReferenceLikeNode(node.what) || node.what.kind === "variable") && ["identifier", "variable", "encapsedpart"].includes(node.offset.kind) && parent && !isLookupNode(parent);
	        return [print("what"), shouldInline ? printLookupNodes(path, options, print) : group(indent([softline, printLookupNodes(path, options, print)]))];
	      }

	    case "exit":
	      return group([node.useDie ? "die" : "exit", "(", node.expression ? isStringOnItsOwnLine(node.expression, options.originalText) ? print("expression") : [indent([softline, print("expression")]), softline] : printDanglingComments(path, options), ")"]);

	    case "global":
	      return group(["global ", indent(join$1([",", line], path.map(print, "items")))]);

	    case "include":
	      return [node.require ? "require" : "include", node.once ? "_once" : "", " ", node.target.comments ? indent(print("target")) : print("target")];

	    case "label":
	      return [print("name"), ":"];

	    case "goto":
	      return ["goto ", print("label")];

	    case "throw":
	      return ["throw ", node.what.comments ? indent(print("what")) : print("what")];

	    case "silent":
	      return ["@", print("expr")];

	    case "halt":
	      return [hasDanglingComments(node) ? [printDanglingComments(path, options,
	      /* sameIndent */
	      true), hardline$1] : "", "__halt_compiler();", node.after];

	    case "eval":
	      return group(["eval(", isStringOnItsOwnLine(node.source, options.originalText) ? print("source") : [indent([softline, print("source")]), softline], ")"]);

	    case "echo":
	      {
	        var printedArguments = path.map(print, "expressions");
	        var firstVariable;

	        if (printedArguments.length === 1 && !node.expressions[0].comments) {
	          var _printedArguments = _slicedToArray(printedArguments, 1);

	          firstVariable = _printedArguments[0];
	        } else if (printedArguments.length > 0) {
	          firstVariable = isDocNode(node.expressions[0]) || node.expressions[0].comments ? indent(printedArguments[0]) : dedent(printedArguments[0]);
	        }

	        return group([node.shortForm ? "" : "echo ", firstVariable ? firstVariable : "", indent(printedArguments.slice(1).map(function (p) {
	          return [",", line, p];
	        }))]);
	      }

	    case "print":
	      {
	        return ["print ", node.expression.comments ? indent(print("expression")) : print("expression")];
	      }

	    case "return":
	      {
	        var _parts4 = [];

	        _parts4.push("return");

	        if (node.expr) {
	          var printedExpr = print("expr");

	          _parts4.push(" ", node.expr.comments ? indent(printedExpr) : printedExpr);
	        }

	        if (hasDanglingComments(node)) {
	          _parts4.push(" ", printDanglingComments(path, options,
	          /* sameIndent */
	          true));
	        }

	        return _parts4;
	      }

	    case "isset":
	    case "unset":
	      return group([node.kind, printArgumentsList(path, options, print, "variables")]);

	    case "empty":
	      return group(["empty(", indent([softline, print("expression")]), softline, ")"]);

	    case "variable":
	      {
	        var _parent = path.parent,
	            parentParent = path.grandparent;
	        var ampersand = _parent.kind === "assign" ? "" : node.byref ? "&" : "";
	        var dollar = _parent.kind === "encapsedpart" && _parent.syntax === "simple" && _parent.curly || parentParent && _parent.kind === "offsetlookup" && parentParent.kind === "encapsedpart" && parentParent.syntax === "simple" && parentParent.curly ? "" : "$";
	        var openCurly = node.curly ? "{" : "";
	        var closeCurly = node.curly ? "}" : "";
	        return [ampersand, dollar, openCurly, print("name"), closeCurly];
	      }

	    case "constantstatement":
	    case "classconstant":
	      {
	        var _attrs = printAttrs(path, options, print);

	        var _printed3 = path.map(print, "constants");

	        var _firstVariable;

	        if (_printed3.length === 1 && !node.constants[0].comments) {
	          var _printed4 = _slicedToArray(_printed3, 1);

	          _firstVariable = _printed4[0];
	        } else if (_printed3.length > 0) {
	          // Indent first item
	          _firstVariable = indent(_printed3[0]);
	        }

	        return group([].concat(_toConsumableArray(_attrs), [node.final ? "final " : "", node.visibility ? [node.visibility, " "] : "", "const", _firstVariable ? [" ", _firstVariable] : "", indent(_printed3.slice(1).map(function (p) {
	          return [",", hardline$1, p];
	        }))]));
	      }

	    case "constant":
	      return printAssignment(node.name, print("name"), " =", node.value, print("value"), false, options);

	    case "static":
	      {
	        var _printed5 = path.map(print, "variables");

	        var _hasValue = node.variables.some(function (item) {
	          return item.defaultValue;
	        });

	        var _firstVariable2;

	        if (_printed5.length === 1 && !node.variables[0].comments) {
	          var _printed6 = _slicedToArray(_printed5, 1);

	          _firstVariable2 = _printed6[0];
	        } else if (_printed5.length > 0) {
	          // Indent first item
	          _firstVariable2 = indent(_printed5[0]);
	        }

	        return group(["static", _firstVariable2 ? [" ", _firstVariable2] : "", indent(_printed5.slice(1).map(function (p) {
	          return [",", _hasValue ? hardline$1 : line, p];
	        }))]);
	      }

	    case "staticvariable":
	      {
	        return printAssignment(node.variable, print("variable"), " =", node.defaultValue, print("defaultValue"), false, options);
	      }

	    case "list":
	    case "array":
	      {
	        var useShortForm = node.kind === "array" && isMinVersion(options.phpVersion, "5.4") || node.kind === "list" && (node.shortForm || isMinVersion(options.phpVersion, "7.1"));
	        var open = useShortForm ? "[" : [node.kind, "("];
	        var close = useShortForm ? "]" : ")";

	        if (node.items.length === 0) {
	          if (!hasDanglingComments(node)) {
	            return [open, close];
	          }

	          return group([open, printDanglingComments(path, options), softline, close]);
	        }

	        var lastElem = getLast(node.items); // PHP allows you to have empty elements in an array which
	        // changes its length based on the number of commas. The algorithm
	        // is that if the last argument is null, we need to force insert
	        // a comma to ensure PHP recognizes it.
	        //   [,] === $arr;
	        //   [1,] === $arr;
	        //   [1,,] === $arr;
	        //
	        // Note that getLast returns null if the array is empty, but
	        // we already check for an empty array just above so we are safe

	        var needsForcedTrailingComma = lastElem && lastElem.kind === "noop";

	        var _node$items$filter$so3 = node.items.filter(function (node) {
	          return node.kind !== "noop";
	        }).sort(function (a, b) {
	          return locStart(a) - locStart(b);
	        }),
	            _node$items$filter$so4 = _slicedToArray(_node$items$filter$so3, 1),
	            _firstProperty = _node$items$filter$so4[0];

	        var isAssociative = !!(_firstProperty && _firstProperty.key);
	        var shouldBreak = isAssociative && _firstProperty && hasNewlineInRange(options.originalText, locStart(node), locStart(_firstProperty));
	        return group([open, indent([softline, printArrayItems(path, options, print)]), needsForcedTrailingComma ? "," : "", ifBreak(!needsForcedTrailingComma && shouldPrintComma(options, "5.0") ? [lastElem && shouldPrintHardlineBeforeTrailingComma(lastElem) ? hardline$1 : "", ","] : ""), printDanglingComments(path, options, true), softline, close], {
	          shouldBreak: shouldBreak
	        });
	      }

	    case "entry":
	      {
	        var ref = node.byRef ? "&" : "";
	        var unpack = node.unpack ? "..." : "";
	        return node.key ? printAssignment(node.key, print("key"), " =>", node.value, print("value"), ref, options) : [ref, unpack, print("value")];
	      }

	    case "yield":
	      {
	        var printedKeyAndValue = [node.key ? [print("key"), " => "] : "", print("value")];
	        return ["yield", node.key || node.value ? " " : "", node.value && node.value.comments ? indent(printedKeyAndValue) : printedKeyAndValue];
	      }

	    case "yieldfrom":
	      return ["yield from ", node.value.comments ? indent(print("value")) : print("value")];

	    case "unary":
	      return [node.type, print("what")];

	    case "pre":
	      return [node.type + node.type, print("what")];

	    case "post":
	      return [print("what"), node.type + node.type];

	    case "cast":
	      return ["(", node.type, ") ", node.expr.comments ? indent(print("expr")) : print("expr")];

	    case "assignref":
	    case "assign":
	      {
	        var hasRef = node.kind === "assignref";
	        return printAssignment(node.left, print("left"), [" ", hasRef ? "=" : node.operator], node.right, print("right"), hasRef, options);
	      }

	    case "bin":
	      {
	        var _parent2 = path.parent,
	            _parentParent = path.grandparent;
	        var isInsideParenthesis = node !== _parent2.body && (_parent2.kind === "if" || _parent2.kind === "while" || _parent2.kind === "switch" || _parent2.kind === "do");

	        var _parts5 = printBinaryExpression(path, print, options,
	        /* isNested */
	        false, isInsideParenthesis); //   if (
	        //     $this->hasPlugin('dynamicImports') && $this->lookahead()->type === tt->parenLeft
	        //   ) {
	        //
	        // looks super weird, we want to break the children if the parent breaks
	        //
	        //   if (
	        //     $this->hasPlugin('dynamicImports') &&
	        //     $this->lookahead()->type === tt->parenLeft
	        //   ) {


	        if (isInsideParenthesis) {
	          return _parts5;
	        } // Break between the parens in unaries or in a member expression, i.e.
	        //
	        //   (
	        //     a &&
	        //     b &&
	        //     c
	        //   )->call()


	        if (_parent2.kind === "unary" || isLookupNode(_parent2) && _parent2.kind !== "offsetlookup") {
	          return group([indent([softline].concat(_toConsumableArray(_parts5))), softline]);
	        } // Avoid indenting sub-expressions in some cases where the first sub-expression is already
	        // indented accordingly. We should indent sub-expressions where the first case isn't indented.


	        var shouldNotIndent = node !== _parent2.body && _parent2.kind === "for" || _parent2.kind === "retif" && _parentParent && _parentParent.kind !== "return";
	        var shouldIndentIfInlining = ["assign", "property", "constant", "staticvariable", "entry"].includes(_parent2.kind);
	        var samePrecedenceSubExpression = node.left.kind === "bin" && shouldFlatten(node.type, node.left.type);

	        if (shouldNotIndent || shouldInlineLogicalExpression(node) && !samePrecedenceSubExpression || !shouldInlineLogicalExpression(node) && shouldIndentIfInlining) {
	          return group(_parts5);
	        }

	        var rest = _parts5.slice(1);

	        return group([// Don't include the initial expression in the indentation
	        // level. The first item is guaranteed to be the first
	        // left-most expression.
	        _parts5.length > 0 ? _parts5[0] : "", indent(rest)]);
	      }

	    case "retif":
	      {
	        var _parts6 = [];
	        var _parent3 = path.parent; // TODO: Use `AstPath.findAncestor` when it's stable
	        // Find the outermost non-retif parent, and the outermost retif parent.

	        var currentParent;
	        var _i5 = 0;

	        do {
	          currentParent = path.getParentNode(_i5);
	          _i5++;
	        } while (currentParent && currentParent.kind === "retif");

	        var firstNonRetifParent = currentParent || _parent3;
	        var printedFalseExpr = node.falseExpr.kind === "bin" ? indent(print("falseExpr")) : print("falseExpr");
	        var part = [node.trueExpr ? line : " ", "?", node.trueExpr ? [" ", node.trueExpr.kind === "bin" ? indent(print("trueExpr")) : print("trueExpr"), line] : "", ":", node.trueExpr ? [" ", printedFalseExpr] : [shouldInlineRetifFalseExpression(node.falseExpr) ? " " : line, printedFalseExpr]];

	        _parts6.push(part); // We want a whole chain of retif to all break if any of them break.


	        var maybeGroup = function maybeGroup(doc) {
	          return _parent3 === firstNonRetifParent ? group(doc) : doc;
	        }; // Break the closing parens to keep the chain right after it:
	        // ($a
	        //   ? $b
	        //   : $c
	        // )->call()


	        var _parentParent2 = path.grandparent;
	        var pureParent = _parent3.kind === "cast" && _parentParent2 ? _parentParent2 : _parent3;
	        var breakLookupNodes = ["propertylookup", "nullsafepropertylookup", "staticlookup"];
	        var breakClosingParens = breakLookupNodes.includes(pureParent.kind);
	        var printedTest = print("test");

	        if (!node.trueExpr) {
	          var _printed7 = [printedTest, pureParent.kind === "bin" || ["print", "echo", "return", "include"].includes(firstNonRetifParent.kind) ? indent(_parts6) : _parts6]; // Break between the parens in unaries or in a lookup nodes, i.e.
	          //
	          //   (
	          //     a ?:
	          //     b ?:
	          //     c
	          //   )->call()

	          if (pureParent.kind === "call" && pureParent.what === node || pureParent.kind === "unary" || isLookupNode(pureParent) && pureParent.kind !== "offsetlookup") {
	            return group([indent([softline, _printed7]), softline]);
	          }

	          return maybeGroup(_printed7);
	        }

	        return maybeGroup([node.test.kind === "retif" ? indent(printedTest) : printedTest, indent(_parts6), breakClosingParens ? softline : ""]);
	      }

	    case "boolean":
	      return node.value ? "true" : "false";

	    case "number":
	      return printNumber(node.value);

	    case "string":
	      {
	        var _parent4 = path.parent;

	        if (_parent4.kind === "encapsedpart") {
	          var _parentParent3 = path.grandparent;
	          var closingTagIndentation = 0;
	          var flexible = isMinVersion(options.phpVersion, "7.3");
	          var linebreak = literalline;

	          if (_parentParent3.type === "heredoc") {
	            linebreak = flexible ? hardline$1 : literalline;

	            var lines = _parentParent3.raw.split("\n");

	            closingTagIndentation = lines[lines.length - 1].search(/\S/);

	            if (closingTagIndentation === -1) {
	              closingTagIndentation = lines[lines.length - 2].search(/\S/);
	            }
	          }

	          return join$1(linebreak, node.raw.split("\n").map(function (s, i) {
	            return i > 0 || node.loc.start.column === 0 ? s.substring(closingTagIndentation) : s;
	          }));
	        }

	        var quote = useDoubleQuote(node, options) ? '"' : "'";
	        var stringValue = node.raw;

	        if (node.raw[0] === "b") {
	          stringValue = stringValue.slice(1);
	        } // We need to strip out the quotes from the raw value


	        if (['"', "'"].includes(stringValue[0])) {
	          stringValue = stringValue.substr(1);
	        }

	        if (['"', "'"].includes(stringValue[stringValue.length - 1])) {
	          stringValue = stringValue.substr(0, stringValue.length - 1);
	        }

	        return [node.raw[0] === "b" ? "b" : "", quote, join$1(literalline, stringValue.split("\n")), quote];
	      }

	    case "intersectiontype":
	      {
	        return printComposedTypes(path, print, "&");
	      }

	    case "uniontype":
	      {
	        return printComposedTypes(path, print, "|");
	      }

	    case "encapsedpart":
	      {
	        var _open = node.syntax === "simple" && node.curly || node.syntax === "complex" ? [node.curly ? "$" : "", "{"] : "";

	        var _close = node.syntax === "simple" && node.curly || node.syntax === "complex" ? "}" : "";

	        return [_open, print("expression"), _close];
	      }

	    case "encapsed":
	      switch (node.type) {
	        case "string":
	        case "shell":
	        case "heredoc":
	          {
	            var _flexible = isMinVersion(options.phpVersion, "7.3");

	            var _linebreak = _flexible ? hardline$1 : literalline;

	            return [getEncapsedQuotes(node), // Respect `indent` for `heredoc` nodes
	            node.type === "heredoc" ? _linebreak : ""].concat(_toConsumableArray(path.map(print, "value")), [getEncapsedQuotes(node, {
	              opening: false
	            }), node.type === "heredoc" && docShouldHaveTrailingNewline(path) ? hardline$1 : ""]);
	          }
	        // istanbul ignore next

	        default:
	          return "Have not implemented kind ".concat(node.type, " yet.");
	      }

	    case "inline":
	      return join$1(literalline, node.raw.replace("___PSEUDO_INLINE_PLACEHOLDER___", "").split("\n"));

	    case "magic":
	      return node.value;

	    case "nowdoc":
	      {
	        var _flexible2 = isMinVersion(options.phpVersion, "7.3");

	        var _linebreak2 = _flexible2 ? hardline$1 : literalline;

	        return ["<<<'", node.label, "'", _linebreak2, join$1(_linebreak2, node.value.split("\n")), _linebreak2, node.label, docShouldHaveTrailingNewline(path) ? hardline$1 : ""];
	      }

	    case "name":
	      return [node.resolution === "rn" ? "namespace\\" : "", node.name];

	    case "literal":
	      return print("value");

	    case "parentreference":
	      return "parent";

	    case "selfreference":
	      return "self";

	    case "staticreference":
	      return "static";

	    case "typereference":
	      return node.name;

	    case "nullkeyword":
	      return "null";

	    case "identifier":
	      {
	        var _parent5 = path.parent;

	        if (_parent5.kind === "method") {
	          node.name = normalizeMagicMethodName(node.name);
	        }

	        return print("name");
	      }

	    case "match":
	      {
	        var arms = path.map(function () {
	          var armNode = path.node;
	          var maybeLeadingComment = hasLeadingComment(armNode) ? [printComments(armNode.leadingComments, options), hardline$1] : [];
	          var maybeTrailingComma = !path.isLast || options.trailingCommaPHP ? "," : "";
	          var maybeTrailingComment = hasTrailingComment(armNode) ? [" ", printComments(armNode.comments.filter(function (c) {
	            return c.trailing;
	          }), options)] : [];
	          var conds = armNode.conds === null ? "default" : path.map(function (_ref8) {
	            var isFirst = _ref8.isFirst;
	            return [",", line, print()].slice(isFirst ? 2 : 0);
	          }, "conds");
	          var body = print("body");
	          var maybeEmptyLineBetweenArms = !path.isFirst && isPreviousLineEmpty(options.originalText, armNode, options) ? hardline$1 : "";
	          return ["", hardline$1, maybeEmptyLineBetweenArms].concat(maybeLeadingComment, [group([group([conds, indent(line)]), "=> ", body, maybeTrailingComma].concat(maybeTrailingComment))]).slice(!path.isFirst ? 0 : 1);
	        }, "arms");
	        return group(["match (", group([softline, indent(print("cond")), softline]), ") {", group(indent(_toConsumableArray(arms))), " ", softline, "}"]);
	      }

	    case "noop":
	      return node.comments ? printComments(node.comments, options) : "";

	    case "namedargument":
	      return [node.name, ": ", print("value")];

	    case "enumcase":
	      return group(["case ", print("name"), node.value ? [" =", printAssignmentRight(node.name, node.value, print("value"), false, options)] : ""]);

	    case "variadicplaceholder":
	      return "...";

	    case "error":
	    default:
	      // istanbul ignore next
	      throw new Error("Have not implemented kind '".concat(node.kind, "' yet."));
	  }
	}

	var ignoredProperties = new Set(["loc", "range", "raw", "comments", "leadingComments", "trailingComments", "parenthesizedExpression", "parent", "prev", "start", "end", "tokens", "errors", "extra"]);
	/**
	 * This function takes the existing ast node and a copy, by reference
	 * We use it for testing, so that we can compare pre-post versions of the AST,
	 * excluding things we don't care about (like node location, case that will be
	 * changed by the printer, etc.)
	 */

	function clean(node, newObj) {
	  if (node.kind === "string") {
	    // TODO if options are available in this method, replace with
	    // newObj.isDoubleQuote = !useSingleQuote(node, options);
	    delete newObj.isDoubleQuote;
	  }

	  if (["array", "list"].includes(node.kind)) {
	    // TODO if options are available in this method, assign instead of delete
	    delete newObj.shortForm;
	  }

	  if (node.kind === "inline") {
	    if (node.value.includes("___PSEUDO_INLINE_PLACEHOLDER___")) {
	      return null;
	    }

	    newObj.value = newObj.value.replace(/\n/g, "");
	  } // continue ((2)); -> continue 2;
	  // continue 1; -> continue;


	  if ((node.kind === "continue" || node.kind === "break") && node.level) {
	    var level = newObj.level;

	    if (level.kind === "number") {
	      newObj.level = level.value === "1" ? null : level;
	    }
	  } // if () {{ }} -> if () {}


	  if (node.kind === "block") {
	    if (node.children.length === 1 && node.children[0].kind === "block") {
	      while (newObj.children[0].kind === "block") {
	        newObj.children = newObj.children[0].children;
	      }
	    }
	  } // Normalize numbers


	  if (node.kind === "number") {
	    newObj.value = printNumber(node.value);
	  }

	  var statements = ["foreach", "for", "if", "while", "do"];

	  if (statements.includes(node.kind)) {
	    if (node.body && node.body.kind !== "block") {
	      newObj.body = {
	        kind: "block",
	        children: [newObj.body]
	      };
	    } else {
	      newObj.body = newObj.body ? newObj.body : null;
	    }

	    if (node.alternate && node.alternate.kind !== "block") {
	      newObj.alternate = {
	        kind: "block",
	        children: [newObj.alternate]
	      };
	    } else {
	      newObj.alternate = newObj.alternate ? newObj.alternate : null;
	    }
	  }

	  if (node.kind === "usegroup" && typeof node.name === "string") {
	    newObj.name = newObj.name.replace(/^\\/, "");
	  }

	  if (node.kind === "useitem") {
	    newObj.name = newObj.name.replace(/^\\/, "");
	  }

	  if (node.kind === "method" && node.name.kind === "identifier") {
	    newObj.name.name = normalizeMagicMethodName(newObj.name.name);
	  }

	  if (node.kind === "noop") {
	    return null;
	  }
	}

	clean.ignoredProperties = ignoredProperties;

	var CATEGORY_PHP = "PHP";
	var options = {
	  phpVersion: {
	    since: "0.13.0",
	    category: CATEGORY_PHP,
	    type: "choice",
	    default: "7.0",
	    description: "Minimum target PHP version.",
	    choices: [{
	      value: "5.0"
	    }, {
	      value: "5.1"
	    }, {
	      value: "5.2"
	    }, {
	      value: "5.3"
	    }, {
	      value: "5.4"
	    }, {
	      value: "5.5"
	    }, {
	      value: "5.6"
	    }, {
	      value: "7.0"
	    }, {
	      value: "7.1"
	    }, {
	      value: "7.2"
	    }, {
	      value: "7.3"
	    }, {
	      value: "7.4"
	    }, {
	      value: "8.0"
	    }, {
	      value: "8.1"
	    }, {
	      value: "8.2"
	    }]
	  },
	  trailingCommaPHP: {
	    since: "0.0.0",
	    category: CATEGORY_PHP,
	    type: "boolean",
	    default: true,
	    description: "Print trailing commas wherever possible when multi-line."
	  },
	  braceStyle: {
	    since: "0.10.0",
	    category: CATEGORY_PHP,
	    type: "choice",
	    default: "per-cs",
	    description: "Print one space or newline for code blocks (classes and functions).",
	    choices: [{
	      value: "psr-2",
	      description: "(deprecated) Use per-cs"
	    }, {
	      value: "per-cs",
	      description: "Use the PER Coding Style brace style."
	    }, {
	      value: "1tbs",
	      description: "Use 1tbs brace style."
	    }]
	  }
	};

	var copyProperty = function copyProperty(to, from, property, ignoreNonConfigurable) {
	  // `Function#length` should reflect the parameters of `to` not `from` since we keep its body.
	  // `Function#prototype` is non-writable and non-configurable so can never be modified.
	  if (property === 'length' || property === 'prototype') {
	    return;
	  } // `Function#arguments` and `Function#caller` should not be copied. They were reported to be present in `Reflect.ownKeys` for some devices in React Native (#41), so we explicitly ignore them here.


	  if (property === 'arguments' || property === 'caller') {
	    return;
	  }

	  var toDescriptor = Object.getOwnPropertyDescriptor(to, property);
	  var fromDescriptor = Object.getOwnPropertyDescriptor(from, property);

	  if (!canCopyProperty(toDescriptor, fromDescriptor) && ignoreNonConfigurable) {
	    return;
	  }

	  Object.defineProperty(to, property, fromDescriptor);
	}; // `Object.defineProperty()` throws if the property exists, is not configurable and either:
	// - one its descriptors is changed
	// - it is non-writable and its value is changed


	var canCopyProperty = function canCopyProperty(toDescriptor, fromDescriptor) {
	  return toDescriptor === undefined || toDescriptor.configurable || toDescriptor.writable === fromDescriptor.writable && toDescriptor.enumerable === fromDescriptor.enumerable && toDescriptor.configurable === fromDescriptor.configurable && (toDescriptor.writable || toDescriptor.value === fromDescriptor.value);
	};

	var changePrototype = function changePrototype(to, from) {
	  var fromPrototype = Object.getPrototypeOf(from);

	  if (fromPrototype === Object.getPrototypeOf(to)) {
	    return;
	  }

	  Object.setPrototypeOf(to, fromPrototype);
	};

	var wrappedToString = function wrappedToString(withName, fromBody) {
	  return "/* Wrapped ".concat(withName, "*/\n").concat(fromBody);
	};

	var toStringDescriptor = Object.getOwnPropertyDescriptor(Function.prototype, 'toString');
	var toStringName = Object.getOwnPropertyDescriptor(Function.prototype.toString, 'name'); // We call `from.toString()` early (not lazily) to ensure `from` can be garbage collected.
	// We use `bind()` instead of a closure for the same reason.
	// Calling `from.toString()` early also allows caching it in case `to.toString()` is called several times.

	var changeToString = function changeToString(to, from, name) {
	  var withName = name === '' ? '' : "with ".concat(name.trim(), "() ");
	  var newToString = wrappedToString.bind(null, withName, from.toString()); // Ensure `to.toString.toString` is non-enumerable and has the same `same`

	  Object.defineProperty(newToString, 'name', toStringName);
	  Object.defineProperty(to, 'toString', _objectSpread2(_objectSpread2({}, toStringDescriptor), {}, {
	    value: newToString
	  }));
	};

	function mimicFunction(to, from) {
	  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
	      _ref$ignoreNonConfigu = _ref.ignoreNonConfigurable,
	      ignoreNonConfigurable = _ref$ignoreNonConfigu === void 0 ? false : _ref$ignoreNonConfigu;

	  var name = to.name;

	  var _iterator = _createForOfIteratorHelper(Reflect.ownKeys(from)),
	      _step;

	  try {
	    for (_iterator.s(); !(_step = _iterator.n()).done;) {
	      var property = _step.value;
	      copyProperty(to, from, property, ignoreNonConfigurable);
	    }
	  } catch (err) {
	    _iterator.e(err);
	  } finally {
	    _iterator.f();
	  }

	  changePrototype(to, from);
	  changeToString(to, from, name);
	  return to;
	}

	var dist = {exports: {}};

	var pDefer = function pDefer() {
	  var ret = {};
	  ret.promise = new Promise(function (resolve, reject) {
	    ret.resolve = resolve;
	    ret.reject = reject;
	  });
	  return ret;
	};

	dist.exports;

	(function (module, exports) {

	  var __awaiter = commonjsGlobal && commonjsGlobal.__awaiter || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	      function fulfilled(value) {
	        try {
	          step(generator.next(value));
	        } catch (e) {
	          reject(e);
	        }
	      }

	      function rejected(value) {
	        try {
	          step(generator["throw"](value));
	        } catch (e) {
	          reject(e);
	        }
	      }

	      function step(result) {
	        result.done ? resolve(result.value) : new P(function (resolve) {
	          resolve(result.value);
	        }).then(fulfilled, rejected);
	      }

	      step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	  };

	  var __importDefault = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
	    return mod && mod.__esModule ? mod : {
	      "default": mod
	    };
	  };

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var p_defer_1 = __importDefault(pDefer);

	  function mapAgeCleaner(map) {
	    var _this = this;

	    var property = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'maxAge';
	    var processingKey;
	    var processingTimer;
	    var processingDeferred;

	    var cleanup = function cleanup() {
	      return __awaiter(_this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
	        var _this2 = this;

	        var setupTimer, _iterator, _step, entry;

	        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
	          while (1) switch (_context2.prev = _context2.next) {
	            case 0:
	              if (!(processingKey !== undefined)) {
	                _context2.next = 2;
	                break;
	              }

	              return _context2.abrupt("return");

	            case 2:
	              setupTimer = function setupTimer(item) {
	                return __awaiter(_this2, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
	                  var delay;
	                  return _regeneratorRuntime().wrap(function _callee$(_context) {
	                    while (1) switch (_context.prev = _context.next) {
	                      case 0:
	                        processingDeferred = p_defer_1.default();
	                        delay = item[1][property] - Date.now();

	                        if (!(delay <= 0)) {
	                          _context.next = 6;
	                          break;
	                        }

	                        // Remove the item immediately if the delay is equal to or below 0
	                        map.delete(item[0]);
	                        processingDeferred.resolve();
	                        return _context.abrupt("return");

	                      case 6:
	                        // Keep track of the current processed key
	                        processingKey = item[0];
	                        processingTimer = setTimeout(function () {
	                          // Remove the item when the timeout fires
	                          map.delete(item[0]);

	                          if (processingDeferred) {
	                            processingDeferred.resolve();
	                          }
	                        }, delay); // tslint:disable-next-line:strict-type-predicates

	                        if (typeof processingTimer.unref === 'function') {
	                          // Don't hold up the process from exiting
	                          processingTimer.unref();
	                        }

	                        return _context.abrupt("return", processingDeferred.promise);

	                      case 10:
	                      case "end":
	                        return _context.stop();
	                    }
	                  }, _callee);
	                }));
	              };

	              _context2.prev = 3;
	              _iterator = _createForOfIteratorHelper(map);
	              _context2.prev = 5;

	              _iterator.s();

	            case 7:
	              if ((_step = _iterator.n()).done) {
	                _context2.next = 13;
	                break;
	              }

	              entry = _step.value;
	              _context2.next = 11;
	              return setupTimer(entry);

	            case 11:
	              _context2.next = 7;
	              break;

	            case 13:
	              _context2.next = 18;
	              break;

	            case 15:
	              _context2.prev = 15;
	              _context2.t0 = _context2["catch"](5);

	              _iterator.e(_context2.t0);

	            case 18:
	              _context2.prev = 18;

	              _iterator.f();

	              return _context2.finish(18);

	            case 21:
	              _context2.next = 25;
	              break;

	            case 23:
	              _context2.prev = 23;
	              _context2.t1 = _context2["catch"](3);

	            case 25:
	              processingKey = undefined;

	            case 26:
	            case "end":
	              return _context2.stop();
	          }
	        }, _callee2, null, [[3, 23], [5, 15, 18, 21]]);
	      }));
	    };

	    var reset = function reset() {
	      processingKey = undefined;

	      if (processingTimer !== undefined) {
	        clearTimeout(processingTimer);
	        processingTimer = undefined;
	      }

	      if (processingDeferred !== undefined) {
	        // tslint:disable-line:early-exit
	        processingDeferred.reject(undefined);
	        processingDeferred = undefined;
	      }
	    };

	    var originalSet = map.set.bind(map);

	    map.set = function (key, value) {
	      if (map.has(key)) {
	        // If the key already exist, remove it so we can add it back at the end of the map.
	        map.delete(key);
	      } // Call the original `map.set`


	      var result = originalSet(key, value); // If we are already processing a key and the key added is the current processed key, stop processing it

	      if (processingKey && processingKey === key) {
	        reset();
	      } // Always run the cleanup method in case it wasn't started yet


	      cleanup(); // tslint:disable-line:no-floating-promises

	      return result;
	    };

	    cleanup(); // tslint:disable-line:no-floating-promises

	    return map;
	  }

	  exports.default = mapAgeCleaner; // Add support for CJS

	  module.exports = mapAgeCleaner;
	  module.exports.default = mapAgeCleaner;
	})(dist, dist.exports);

	var distExports = dist.exports;
	var mapAgeCleaner = /*@__PURE__*/getDefaultExportFromCjs(distExports);

	var cacheStore = new WeakMap();
	/**
	[Memoize](https://en.wikipedia.org/wiki/Memoization) functions - An optimization used to speed up consecutive function calls by caching the result of calls with identical input.

	@param fn - Function to be memoized.

	@example
	```
	import mem from 'mem';

	let index = 0;
	const counter = () => ++index;
	const memoized = mem(counter);

	memoized('foo');
	//=> 1

	// Cached as it's the same argument
	memoized('foo');
	//=> 1

	// Not cached anymore as the arguments changed
	memoized('bar');
	//=> 2

	memoized('bar');
	//=> 2
	```
	*/

	function mem(fn) {
	  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	      cacheKey = _ref.cacheKey,
	      _ref$cache = _ref.cache,
	      cache = _ref$cache === void 0 ? new Map() : _ref$cache,
	      maxAge = _ref.maxAge;

	  if (typeof maxAge === 'number') {
	    mapAgeCleaner(cache);
	  }

	  var memoized = function memoized() {
	    for (var _len = arguments.length, arguments_ = new Array(_len), _key = 0; _key < _len; _key++) {
	      arguments_[_key] = arguments[_key];
	    }

	    var key = cacheKey ? cacheKey(arguments_) : arguments_[0];
	    var cacheItem = cache.get(key);

	    if (cacheItem) {
	      return cacheItem.data; // eslint-disable-line @typescript-eslint/no-unsafe-return
	    }

	    var result = fn.apply(this, arguments_);
	    cache.set(key, {
	      data: result,
	      maxAge: maxAge ? Date.now() + maxAge : Number.POSITIVE_INFINITY
	    });
	    return result; // eslint-disable-line @typescript-eslint/no-unsafe-return
	  };

	  mimicFunction(memoized, fn, {
	    ignoreNonConfigurable: true
	  });
	  cacheStore.set(memoized, cache);
	  return memoized;
	}

	var reHasPragma = /@prettier|@format/;
	var getPageLevelDocBlock = mem(function (text) {
	  var parsed = parse(text);

	  var _parsed$children = _slicedToArray(parsed.children, 1),
	      firstChild = _parsed$children[0];

	  var _parsed$comments$filt = parsed.comments.filter(function (el) {
	    return el.kind === "commentblock";
	  }),
	      _parsed$comments$filt2 = _slicedToArray(_parsed$comments$filt, 1),
	      firstDocBlock = _parsed$comments$filt2[0];

	  if (firstChild && firstDocBlock && firstDocBlock.loc.start.line < firstChild.loc.start.line) {
	    return firstDocBlock;
	  }
	});

	function hasPragma(text) {
	  // fast path optimization - check if the pragma shows up in the file at all
	  if (!reHasPragma.test(text)) {
	    return false;
	  }

	  var pageLevelDocBlock = getPageLevelDocBlock(text);

	  if (pageLevelDocBlock) {
	    var value = pageLevelDocBlock.value;
	    return reHasPragma.test(value);
	  }

	  return false;
	}

	function injectPragma(docblock) {
	  var lines = docblock.split("\n");

	  if (lines.length === 1) {
	    // normalize to multiline for simplicity
	    var _$exec3 = /\/*\*\*(.*)\*\//.exec(lines[0]),
	        _$exec4 = _slicedToArray(_$exec3, 2),
	        line = _$exec4[1];

	    lines = ["/**", " * ".concat(line.trim()), " */"];
	  } // find the first @pragma
	  // if there happens to be one on the opening line, just put it on the next line.


	  var pragmaIndex = lines.findIndex(function (line) {
	    return /@\S/.test(line);
	  }) || 1; // not found => index == -1, which conveniently will splice 1 from the end.

	  lines.splice(pragmaIndex, 0, " * @format");
	  return lines.join("\n");
	}

	function insertPragma(text) {
	  var pageLevelDocBlock = getPageLevelDocBlock(text);

	  if (pageLevelDocBlock) {
	    var _pageLevelDocBlock$lo2 = pageLevelDocBlock.loc,
	        startOffset = _pageLevelDocBlock$lo2.start.offset,
	        endOffset = _pageLevelDocBlock$lo2.end.offset;
	    var before = text.substring(0, startOffset);

	    var _after = text.substring(endOffset);

	    return "".concat(before).concat(injectPragma(pageLevelDocBlock.value)).concat(_after);
	  }

	  var openTag = "<?php";

	  if (!text.startsWith(openTag)) {
	    // bail out
	    return text;
	  }

	  var splitAt = openTag.length;
	  var phpTag = text.substring(0, splitAt);
	  var after = text.substring(splitAt);
	  return "".concat(phpTag, "\n/** \n * @format \n */\n").concat(after);
	}

	var _doc$builders = prettier.doc.builders,
	    join = _doc$builders.join,
	    hardline = _doc$builders.hardline;

	function createLanguage(linguistData, _ref) {
	  var extend = _ref.extend,
	      override = _ref.override;
	  var language = {};

	  for (var key in linguistData) {
	    var newKey = key === "languageId" ? "linguistLanguageId" : key;
	    language[newKey] = linguistData[key];
	  }

	  if (extend) {
	    for (var _key2 in extend) {
	      language[_key2] = (language[_key2] || []).concat(extend[_key2]);
	    }
	  }

	  for (var _key4 in override) {
	    language[_key4] = override[_key4];
	  }

	  return language;
	}

	var languages = [createLanguage(LINGUIST_LANGUAGES_PHP, {
	  override: {
	    parsers: ["php"],
	    vscodeLanguageIds: ["php"]
	  }
	}), createLanguage(LINGUIST_LANGUAGES_HTML_PHP, {
	  override: {
	    parsers: ["php"],
	    vscodeLanguageIds: ["php"]
	  }
	})];
	var parsers = {
	  php: {
	    parse: parse,
	    astFormat: "php",
	    locStart: locStart,
	    locEnd: locEnd,
	    hasPragma: hasPragma
	  }
	};
	var ignoredKeys = new Set(["kind", "loc", "errors", "extra", "comments", "leadingComments", "enclosingNode", "precedingNode", "followingNode"]);

	function getVisitorKeys(node, nonTraversableKeys) {
	  return Object.keys(node).filter(function (key) {
	    return !nonTraversableKeys.has(key) && !ignoredKeys.has(key);
	  });
	}

	var printers = {
	  php: {
	    print: genericPrint,
	    getVisitorKeys: getVisitorKeys,
	    insertPragma: insertPragma,
	    massageAstNode: clean,
	    getCommentChildNodes: getCommentChildNodes,
	    canAttachComment: canAttachComment,
	    isBlockComment: isBlockComment,
	    handleComments: {
	      ownLine: handleOwnLineComment,
	      endOfLine: handleEndOfLineComment,
	      remaining: handleRemainingComment
	    },
	    willPrintOwnComments: function willPrintOwnComments(path) {
	      var node = path.node;
	      return node && node.kind === "noop";
	    },
	    printComment: function printComment(path) {
	      var comment = path.node;

	      switch (comment.kind) {
	        case "commentblock":
	          {
	            // for now, don't touch single line block comments
	            if (!comment.value.includes("\n")) {
	              return comment.value;
	            }

	            var lines = comment.value.split("\n"); // if this is a block comment, handle indentation

	            if (lines.slice(1, lines.length - 1).every(function (line) {
	              return line.trim()[0] === "*";
	            })) {
	              return join(hardline, lines.map(function (line, index) {
	                return (index > 0 ? " " : "") + (index < lines.length - 1 ? line.trim() : line.trimLeft());
	              }));
	            } // otherwise we can't be sure about indentation, so just print as is


	            return comment.value;
	          }

	        case "commentline":
	          {
	            return comment.value.trimRight();
	          }

	        /* istanbul ignore next */

	        default:
	          throw new Error("Not a comment: ".concat(JSON.stringify(comment)));
	      }
	    },
	    hasPrettierIgnore: function hasPrettierIgnore(path) {
	      var isSimpleIgnore = function isSimpleIgnore(comment) {
	        return comment.value.includes("prettier-ignore") && !comment.value.includes("prettier-ignore-start") && !comment.value.includes("prettier-ignore-end");
	      };

	      var node = path.node,
	          parentNode = path.parent;
	      return node && node.kind !== "classconstant" && node.comments && node.comments.length > 0 && node.comments.some(isSimpleIgnore) || // For proper formatting, the classconstant ignore formatting should
	      // run on the "constant" child
	      node && node.kind === "constant" && parentNode && parentNode.kind === "classconstant" && parentNode.comments && parentNode.comments.length > 0 && parentNode.comments.some(isSimpleIgnore);
	    }
	  }
	};
	var defaultOptions = {
	  tabWidth: 4
	};

	exports.defaultOptions = defaultOptions;
	exports.languages = languages;
	exports.options = options;
	exports.parsers = parsers;
	exports.printers = printers;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
