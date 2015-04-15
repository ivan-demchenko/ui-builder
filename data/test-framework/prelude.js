var prelude;
(function (prelude) {
    var data;
    (function (data) {
        var booleans;
        (function (booleans) {
            /**
             * Creates a function testing whether the passed value satisfies all given predicates.
             *
             * @param predicates {Array<(x:a)=>boolean>} array of predicates to test on the given argument.
             * @returns {(x:a)=>boolean} function returning true if every predicate were satisfied.
             */
            function all(predicates) {
                return function (val) {
                    return predicates.reduce(function (acc, p) {
                        return acc && p(val);
                    }, true);
                };
            }
            booleans.all = all;
            /**
             * Test whether at least one predicate of an array is satisfied by some arguments.
             *
             * @param predicates {Array<(x:a)=>boolean>} array of predicates to test on the given argument.
             * @returns {(x:a)=>boolean} function returning true if at least one predicate was satisfied.
             */
            function some(predicates) {
                return function (val) {
                    return predicates.reduce(function (acc, p) {
                        return acc && p(val);
                    }, false);
                };
            }
            booleans.some = some;
            /**
             * Boolean not.
             *
             * @param b {boolean} negated boolean.
             * @returns {boolean} not b.
             */
            function not(b) {
                return !b;
            }
            booleans.not = not;
        })(booleans = data.booleans || (data.booleans = {}));
    })(data = prelude.data || (prelude.data = {}));
})(prelude || (prelude = {}));
var prelude;
(function (prelude) {
    var data;
    (function (data) {
        var either;
        (function (either) {
            var Left = (function () {
                function Left(value) {
                    this.value = value;
                }
                Left.prototype.left = function () {
                    return this.value;
                };
                Left.prototype.isLeft = function () {
                    return true;
                };
                Left.prototype.right = function () {
                    throw new Error("Calling Left.right");
                };
                Left.prototype.isRight = function () {
                    return false;
                };
                Left.prototype.either = function (fl, _) {
                    return fl(this.value);
                };
                Left.prototype.fmap = function (fl, _) {
                    return this.either(function (l) { return left(fl(l)); }, function (_) { return null; });
                };
                return Left;
            })();
            either.Left = Left;
            var Right = (function () {
                function Right(value) {
                    this.value = value;
                }
                Right.prototype.left = function () {
                    throw new Error("Calling Right.left");
                };
                Right.prototype.isLeft = function () {
                    return false;
                };
                Right.prototype.right = function () {
                    return this.value;
                };
                Right.prototype.isRight = function () {
                    return true;
                };
                Right.prototype.either = function (_, fr) {
                    return fr(this.value);
                };
                Right.prototype.fmap = function (_, fr) {
                    return this.either(function (_) { return null; }, function (r) { return right(fr(r)); });
                };
                return Right;
            })();
            either.Right = Right;
            /**
             * Alias for new Left.
             *
             * @param val {L} left value.
             * @returns {Left<L>} Left instance of Either.
             */
            function left(val) {
                return new Left(val);
            }
            either.left = left;
            /**
             * Alias for new Right.
             *
             * @param val {R} Right value.
             * @returns {Right<R>} Right instance of Either.
             */
            function right(val) {
                return new Right(val);
            }
            either.right = right;
        })(either = data.either || (data.either = {}));
    })(data = prelude.data || (prelude.data = {}));
})(prelude || (prelude = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var prelude;
(function (prelude) {
    var data;
    (function (data) {
        var tuple;
        (function (_tuple) {
            /**
             * Class representing the association of two values.
             */
            var Tuple = (function () {
                function Tuple(first, second) {
                    this.first = first;
                    this.second = second;
                }
                return Tuple;
            })();
            _tuple.Tuple = Tuple;
            /**
             * Class representing the association of three values.
             */
            var Tuple3 = (function (_super) {
                __extends(Tuple3, _super);
                function Tuple3(first, second, third) {
                    _super.call(this, first, second);
                    this.third = third;
                }
                return Tuple3;
            })(Tuple);
            _tuple.Tuple3 = Tuple3;
            /**
             * Class representing the association of four values.
             */
            var Tuple4 = (function (_super) {
                __extends(Tuple4, _super);
                function Tuple4(first, second, third, fourth) {
                    _super.call(this, first, second, third);
                    this.fourth = fourth;
                }
                return Tuple4;
            })(Tuple3);
            _tuple.Tuple4 = Tuple4;
            /**
             * Swaps the values of a tuple.
             * @param tuple {Tuple<a, b>} tuple to swap.
             * @returns {Tuple<b, a>} swapped tuple.
             */
            function swap(tuple) {
                return new Tuple(tuple.second, tuple.first);
            }
            _tuple.swap = swap;
            /**
             * Retrieve the first value of a tuple.
             * @param tuple {Tuple<a, any>} the tuple.
             * @returns {a} the first value.
             */
            function fst(tuple) {
                return tuple.first;
            }
            _tuple.fst = fst;
            /**
             * Retrieve the second value of a tuple.
             * @param tuple {Tuple<any, b>} the tuple.
             * @returns {b} the second value.
             */
            function snd(tuple) {
                return tuple.second;
            }
            _tuple.snd = snd;
            /**
             * Retrieve the third value of a tuple.
             * @param tuple {Tuple3<any, any, c>} the tuple.
             * @returns {c} the third value.
             */
            function third(tuple) {
                return tuple.third;
            }
            _tuple.third = third;
            /**
             * Retrieve the fourth value of a tuple.
             * @param tuple {Tuple<any, any, any, d>} the tuple.
             * @returns {d} the fourth value.
             */
            function fourth(tuple) {
                return tuple.fourth;
            }
            _tuple.fourth = fourth;
        })(tuple = data.tuple || (data.tuple = {}));
    })(data = prelude.data || (prelude.data = {}));
})(prelude || (prelude = {}));
var prelude;
(function (prelude) {
    var data;
    (function (data) {
        var functions;
        (function (functions) {
            /**
             * Takes a binary function (two arguments), and returns the same function with arguments
             * flipped.
             *
             * @example
             * <pre>
             * function first(x, y) {
             *     return x;
             * }
             *
             * first(1, 2); // 1
             *
             * var second = flip(first);
             *
             * second(1, 2) // 2
             * </pre>
             *
             * @param fn {function(a, b):c} function to flip.
             * @returns {function(b, a):c} fn with flipped arguments.
             */
            function flip(fn) {
                return function (y, x) {
                    return fn(x, y);
                };
            }
            functions.flip = flip;
            /**
             * Same as normal function application.
             *
             * @example
             * <pre>
             * function increment(x) {
             *     return x + 1;
             * }
             *
             * apply(increment, 1); // 2
             *
             * // combined with flip, we can express more powerful behaviours.
             * var increments = [increment, increment, increment];
             *
             * var three = increments.reduce(flip(apply), 0); // 3
             * </pre>
             *
             * @param fn {function(a):b} the function to be called.
             * @param x {a} the argument to pass to the function.
             * @returns {b} the result of fn(x);
             */
            function apply(fn, x) {
                return fn(x);
            }
            functions.apply = apply;
            /**
             * Simple function composition.
             *
             * @example
             * <pre>
             * function increment(x) {
             *     return x + 1;
             * }
             *
             * function double(x) {
             *     return x + x;
             * }
             *
             * compose(double, increment)(1); // same as double(increment(1)), = 4
             * compose(increment, double(1); // same as increment(double(1)), = 3
             * </pre>
             *
             * @param g {function(b):c} function to apply second.
             * @param f {function(a):b} function to apply first.
             * @returns {function(a):c} function applying `f` to it's argument `x`, then `g` to the result of `f(x)`.
             */
            function compose(g, f) {
                return function (x) {
                    return g(f(x));
                };
            }
            functions.compose = compose;
            /**
             * Constant creates a function always returning the same value, ignoring it's parameter.
             *
             * @param value {a} value to always return.
             * @returns {function(b): a} function always returning the value.
             */
            function constant(value) {
                return function (ignored) { return value; };
            }
            functions.constant = constant;
            /**
             * Identity function. Returns it's parameter.
             *
             * @example
             * <pre>
             * id(1) // = 1
             * id('foo') // = 'foo'
             * </pre>
             *
             * @param value {a} value returned.
             * @returns {a} first parameter.
             */
            function id(value) {
                return value;
            }
            functions.id = id;
            /**
             * On creates a binary function g:(x:a, y:a)=>c from a function f:(x:b, y:b)=>c by applying a function h:(x:a)=>b to the arguments
             * of f.
             *
             * @example
             * <pre>
             * function add(x:number, y:number):number {
             *     return x + y;
             * }
             *
             * // we can't use x and y with add because they are strings and not numbers
             * var x = "9";
             * var y = "33";
             *
             * // we can `parseInt` the arguments of add to have a function adding string numbers
             * var addNumberStrings = on(parseInt, add);
             *
             * addNumbersStrings(x, y); // = 42
             * </pre>
             *
             * @param h {function(a):b} function to map the given arguments.
             * @param f {function(b, b):c} original function.
             * @returns {function(a, a):c} function mapping f's arguments with h before calling f.
             */
            function on(h, f) {
                return function (x, y) { return f(h(x), h(y)); };
            }
            functions.on = on;
        })(functions = data.functions || (data.functions = {}));
    })(data = prelude.data || (prelude.data = {}));
})(prelude || (prelude = {}));
/// <reference path="Booleans.ts" />
/// <reference path="Tuple.ts" />
/// <reference path="Functions.ts" />
var prelude;
(function (prelude) {
    var data;
    (function (data) {
        var objects;
        (function (objects) {
            var all = data.booleans.all;
            var compose = data.functions.compose;
            /**
             * Check if an object matches to predicate.
             *
             * @param  predicate {function(any):boolean} the predicate to be satisfied.
             * @param  object {any} the object to test.
             * @return {boolean} true if all of the key-value pairs of the object satisfied the predicate.
             *
             * @example
             * <pre>
             * var object1 = {
             *     a: null,
             *     b: 2
             * }
             *
             * var object2 = {
             *     a: null,
             *     b: null
             * }
             *
             * function predicateFn(k, v) {
             *     return v == null;
             * }
             *
             * objectMatches(predicateFn, object1); // false
             * objectMatches(predicateFn, object2); // true
             * </pre>
             */
            function objectMatches(predicate, object) {
                var keys = Object.keys(object);
                var predicates = keys.map(function (key) { return function (o) { return predicate(key, o[key]); }; });
                return all(predicates)(object);
            }
            objects.objectMatches = objectMatches;
            /**
             * Create a function to extract the value of an object's property.
             *
             * @example
             * <pre>
             * prop('foo')({ foo: 41 }); // = 41
             * </pre>
             *
             * @param key {string} name of the property.
             * @returns {function(any):a} function to extract to value from the object.
             */
            function prop(key) {
                return function (object) {
                    return object[key];
                };
            }
            objects.prop = prop;
            /**
             *
             * @param keysEq
             * @returns {function(any): boolean}
             */
            // TODO document / test
            function valuesSatisfy(keysEq) {
                var eqs = keysEq.map(function (keyEq) { return compose(keyEq.second, prop(keyEq.first)); });
                return all(eqs);
            }
            objects.valuesSatisfy = valuesSatisfy;
        })(objects = data.objects || (data.objects = {}));
    })(data = prelude.data || (prelude.data = {}));
})(prelude || (prelude = {}));
/// <reference path="Objects.ts" />
/// <reference path="Tuple.ts" />
/// <reference path="Booleans.ts" />
var prelude;
(function (prelude) {
    var data;
    (function (data) {
        var eq;
        (function (eq) {
            var Tuple = data.tuple.Tuple;
            var valuesSatisfy = data.objects.valuesSatisfy;
            /**
             * Curried version of (==).
             *
             * @param x {a} left hand side of the (==).
             * @returns {function(a):boolean} function taking the right hand side of (x ==) and returning the result of x == y.
             */
            function jsStrictEq(x) {
                return function (y) { return x === y; };
            }
            eq.jsStrictEq = jsStrictEq;
            /**
             * Curried version of (===).
             *
             * @param x {a} left hand side of the (===).
             * @returns {function(a):boolean} function taking the right hand side of (x ===) and returning the result of x === y.
             */
            function jsSoftEq(x) {
                return function (y) { return x == y; };
            }
            eq.jsSoftEq = jsSoftEq;
            /**
             *
             * @param keys
             * @param reference
             * @returns {function(a): boolean}
             */
            // TODO document / test
            function eqByKeys(keys, reference) {
                var keyEq = keys.map(function (key) { return new Tuple(key, jsStrictEq(reference[key])); });
                return valuesSatisfy(keyEq);
            }
            eq.eqByKeys = eqByKeys;
            /**
             *
             * @param reference
             * @returns {function(any): boolean}
             */
            // TODO document / test
            function objectEq(reference) {
                return eqByKeys(Object.keys(reference), reference);
            }
            eq.objectEq = objectEq;
        })(eq = data.eq || (data.eq = {}));
    })(data = prelude.data || (prelude.data = {}));
})(prelude || (prelude = {}));
var prelude;
(function (prelude) {
    var data;
    (function (data) {
        var maybe;
        (function (_maybe) {
            /**
             * Implementation of Maybe for a defined value.
             */
            var Just = (function () {
                function Just(val) {
                    this.val = val;
                }
                Just.prototype.fmap = function (f) {
                    return new Just(f(this.val));
                };
                Just.prototype.bind = function (f) {
                    return f(this.val);
                };
                Just.prototype.isDefined = function () {
                    return true;
                };
                Just.prototype.get = function () {
                    return this.val;
                };
                return Just;
            })();
            _maybe.Just = Just;
            /**
             * Implementation of Maybe for a value not defined.
             */
            var Nothing = (function () {
                function Nothing() {
                }
                Nothing.prototype.fmap = function (f) {
                    return new Nothing();
                };
                Nothing.prototype.bind = function (f) {
                    return new Nothing();
                };
                Nothing.prototype.isDefined = function () {
                    return false;
                };
                Nothing.prototype.get = function () {
                    throw new Error("Calling Nothing.get");
                };
                return Nothing;
            })();
            _maybe.Nothing = Nothing;
            /**
             * Extracts the value out of a Maybe.
             *
             * @example
             * <pre>
             * fromMaybe(10, new Nothing()) // 10
             * fromMaybe(10, new Just(3))   // 3
             * </pre>
             *
             * @param defaultValue {a} the value to return if the Maybe's value is not defined.
             * @param maybe {Maybe<a>} the maybe.
             * @returns {a} the values contained in the maybe or x.
             */
            function fromMaybe(defaultValue, maybe) {
                return maybe.isDefined() ? maybe.get() : defaultValue;
            }
            _maybe.fromMaybe = fromMaybe;
            /**
             * Extracts the defined values of an array of Maybe values.
             *
             * @example
             * <pre>catMaybes([new Just(1), new Nothing(), new Nothing(), new Just(3)]) // [1, 3]</pre>
             *
             * @param maybes {Array<Maybe<a>>} the array of maybes.
             * @returns {Array<a>} the defined values of the maybes.
             */
            function catMaybes(maybes) {
                return maybes.filter(function (m) { return m.isDefined(); }).map(function (m) { return m.get(); });
            }
            _maybe.catMaybes = catMaybes;
        })(maybe = data.maybe || (data.maybe = {}));
    })(data = prelude.data || (prelude.data = {}));
})(prelude || (prelude = {}));
var prelude;
(function (prelude) {
    var data;
    (function (_data) {
        var node;
        (function (_node) {
            var flatten = function (array) {
                return _.reduce(array, function (accu, xs) {
                    return accu.concat(xs);
                }, []);
            };
            var deepClone = function (x) {
                var clone = _.clone(x);
                _.each(clone, function (value, key) {
                    if (_.isObject(value) && !_.isFunction(value)) {
                        clone[key] = deepClone(value);
                    }
                });
                return clone;
            };
            var Node = (function () {
                /**
                 * @see `Node.createNode` or `Node.createTerminalNode` instead
                 */
                function Node(leaf, data) {
                    this.leaf = leaf;
                    this.data = data;
                    this.parent = null;
                    this.children = [];
                    this.listeners = {};
                }
                /**
                 * Try to move a node from his current parent to a given new parent.
                 * @param newParent - the new parent of the current node.
                 * @param position? - the position of the node
                 */
                Node.prototype.moveTo = function (newParent, position) {
                    // we don't want to be add a node to itself, se we first check
                    // that the new parent is not us.
                    if (newParent === this) {
                        throw new Error("can't move a node to itself.");
                    }
                    // it is not allowed to add a child to a leaf node, so we
                    // ensure that the new parent is not a leaf.
                    if (newParent && newParent.isLeaf()) {
                        throw new Error("can't move a node to a leaf.");
                    }
                    // it is not allowed to moveTo a node to one of it's descendent
                    // node, otherwise we create a circular referencing.
                    if (newParent && newParent.isDescendentOf(this)) {
                        throw new Error("can't move a node to one of it's descendents.");
                    }
                    // if we have already a parent, we have to notify him that we're being
                    // removed from hin so he can change his state accordingly.
                    if (this.parent) {
                        this.parent.notifyChildRemoved(this);
                    }
                    this.parent = newParent;
                    // if the new parent is defined, we have to notify him that we're being
                    // added to him so he can change his state accordingly.
                    if (this.parent) {
                        this.parent.notifyChildAdded(this, position);
                    }
                };
                /**
                 * Moves the current node to the given node's parent right after him in the list of children. Throws an
                 * exception if the given node is the root or is null.
                 *
                 * @param previous
                 */
                Node.prototype.moveAfter = function (previous) {
                    if (!previous) {
                        throw new Error("the previous node shoul be defined.");
                    }
                    if (previous.isRoot()) {
                        throw new Error("can't move a node after the root.");
                    }
                    var newParent = previous.getParent();
                    // first do the move to have validation applied
                    this.moveTo(newParent);
                    // then put the node at the right position
                    var currentIndex = newParent.getChildren().length - 1;
                    var previousIndex = newParent.getChildren().indexOf(previous);
                    if (previousIndex + 1 === currentIndex) {
                        return;
                    }
                    // remove the current node
                    newParent.getChildren().pop();
                    // split the children in two arrays
                    var before = newParent.getChildren().slice(0, previousIndex + 1);
                    var after = newParent.getChildren().slice(previousIndex + 1);
                    before.push(this);
                    newParent.children = before.concat(after);
                };
                /**
                 * Register an event listener at the root node of the tree.
                 *
                 * @param eventName - name of the event to listen to.
                 * @param callback - function to get called when the event is fired.
                 */
                Node.prototype.on = function (eventName, callback) {
                    if (this.isRoot()) {
                        if (!this.listeners[eventName]) {
                            this.listeners[eventName] = [];
                        }
                        this.listeners[eventName].push(callback);
                    }
                    else {
                        this.getRoot().on(eventName, callback);
                    }
                };
                /**
                 * Triggers an event of a certain name to call to callback functions
                 * registered to listen to it with the `on` function.
                 *
                 * @param eventName - name of the event to trigger.
                 * @param data - data to pass to the event listener.
                 */
                Node.prototype.trigger = function (eventName, data) {
                    if (this.isRoot()) {
                        var listeners = this.listeners[eventName];
                        if (listeners) {
                            _.forEach(listeners, function (l) { return l(data); });
                        }
                    }
                    else {
                        this.getRoot().trigger(eventName, data);
                    }
                };
                /**
                 * Folds the tree using the given function.
                 *
                 * @see unit tests for usage
                 * @param fn
                 * @returns {b}
                 */
                Node.prototype.fold = function (fn) {
                    var foldedChildren = _.map(this.children, function (child) { return child.fold(fn); });
                    return fn(this, foldedChildren);
                };
                /**
                 * Clones the structure of the tree, replacing the data of each node by the result of
                 * the given function applied to the node's data.
                 *
                 * @param f
                 * @returns {common.tree.Node<b>}
                 */
                Node.prototype.fmap = function (f) {
                    var fn = function (n, children) {
                        var data = deepClone(n.data);
                        var fdata = f(data);
                        var fnode = n.isLeaf() ? Node.createLeaf(fdata) : Node.create(fdata);
                        _.forEach(children, function (fchild) {
                            fchild.moveTo(fnode);
                        });
                        return fnode;
                    };
                    return this.fold(fn);
                };
                /**
                 * Filters the tree to return an array of path to the nodes for which the
                 * predicate was true.
                 *
                 * A path is the list of nodes fron the root to the node for which the predicate was true, including
                 * the node.
                 *
                 * @param predicate - function talking a node as a parameter and returning true or false.
                 * @returns {a} - the list of paths.
                 */
                Node.prototype.filter = function (predicate) {
                    var filterFn = function (node, foldedChildren) {
                        var thisPath = [node];
                        // here we use a custom flatten that is only one level deep.
                        var children_paths = _.map(flatten(foldedChildren), function (path) { return [].concat(thisPath, path); });
                        var thisPathResult = predicate(node) ? [thisPath] : [];
                        return thisPathResult.concat(children_paths);
                    };
                    return this.fold(filterFn);
                };
                /**
                 * Returns an array if index representing the index of each of the nodes parent if the path from the
                 * root to the current node.
                 *
                 * @returns {*}
                 */
                Node.prototype.direction = function () {
                    var parent = this.getParent();
                    if (!parent) {
                        return [];
                    }
                    var myIndex = _.indexOf(parent.children, this);
                    return parent.direction().concat([myIndex]);
                };
                /**
                 * Finds a node in the current node given a direction.
                 *
                 * @see Node.direction()
                 * @param direction
                 * @returns {*}
                 */
                Node.prototype.findFromDirection = function (direction) {
                    var nextIndex = direction.shift();
                    if (nextIndex === undefined) {
                        return this;
                    }
                    var nextNode = this.children[nextIndex];
                    if (!nextNode) {
                        throw new Error("invalid direction, couldn't find node.");
                    }
                    return nextNode.findFromDirection(direction);
                };
                /**
                 * Notify that a child was added to the node in order to add
                 * it to it's children list.
                 *
                 * @param addedChild - child added to the node's children
                 */
                Node.prototype.notifyChildAdded = function (addedChild, position) {
                    if (position <= 0) {
                        this.children.unshift(addedChild);
                    }
                    else if (position < this.children.length) {
                        var before = this.children.slice(0, position);
                        var after = this.children.slice(position);
                        before.push(addedChild);
                        this.children = before.concat(after);
                    }
                    else {
                        this.children.push(addedChild);
                    }
                };
                /**
                 * Notify that a child was removed from the node in order to remove
                 * it from it's children list.
                 *
                 * @param removedChild - child removed from the node's children
                 */
                Node.prototype.notifyChildRemoved = function (removedChild) {
                    this.children = _.filter(this.children, function (child) { return child !== removedChild; });
                };
                /**
                 * Clones the current tree in a structural and content way. The structure is cloned
                 * by recreating the tree and the content is cloned by deep copy.
                 *
                 * @returns {Node<a>}
                 */
                Node.prototype.clone = function () {
                    return this.fold(function (node, children) {
                        var clonedData = deepClone(node.data);
                        var clone = node.isLeaf() ? Node.createLeaf(clonedData) : Node.create(clonedData);
                        _.each(children, function (child) { return child.moveTo(clone); });
                        return clone;
                    });
                };
                /**
                 * @returns {common.tree.Node} the root of the current three.
                 */
                Node.prototype.getRoot = function () {
                    return this.isRoot() ? this : this.parent.getRoot();
                };
                /**
                 * @param node - the dedired new parent of the current node.
                 * @returns {boolean} true if the target node is a valid new parent for the current node.
                 */
                Node.prototype.canMoveTo = function (node) {
                    var isMe = node === this;
                    var isTerminal = node && node.isLeaf();
                    var isDescendant = node && node.isDescendentOf(this);
                    return !(isMe || isTerminal || isDescendant);
                };
                /**
                 * Find out if the given node is an ancestor of the called node.
                 * @param node - possible
                 * @returns {boolean}
                 */
                Node.prototype.isDescendentOf = function (node) {
                    if (this.isRoot() || this === node) {
                        return false;
                    }
                    if (node === this.parent) {
                        return true;
                    }
                    return this.parent.isDescendentOf(node);
                };
                /**
                 * @returns {boolean} - true if the node has no parent.
                 */
                Node.prototype.isRoot = function () {
                    return this.parent === undefined || this.parent == null;
                };
                /**
                 * @returns {boolean} - true if the node is a leaf, i.e. it can't have children.
                 */
                Node.prototype.isLeaf = function () {
                    return this.leaf;
                };
                /**
                 * @returns {Node[]} An array of children of the empty array if the node
                 *                   has no children.
                 */
                Node.prototype.getChildren = function () {
                    return this.children;
                };
                /**
                 * @returns {Node} then node's parent if set.
                 */
                Node.prototype.getParent = function () {
                    return this.parent;
                };
                /**
                 * @param data - data to be stored in the node.
                 * @returns {common.tree.Node} a leaf.
                 */
                Node.createLeaf = function (data) {
                    return new Node(true, data);
                };
                /**
                 * @param data - data to be stored in the node.
                 * @returns {common.tree.Node} a normal node.
                 */
                Node.create = function (data) {
                    return new Node(false, data);
                };
                return Node;
            })();
            _node.Node = Node;
        })(node = _data.node || (_data.node = {}));
    })(data = prelude.data || (prelude.data = {}));
})(prelude || (prelude = {}));
/// <reference path="Functions.ts" />
/// <reference path="Objects.ts" />
/// <reference path="Tuple.ts" />
var prelude;
(function (prelude) {
    var data;
    (function (data) {
        var ordering;
        (function (ordering) {
            var on = data.functions.on;
            var flip = data.functions.flip;
            var prop = data.objects.prop;
            /**
             * Enumeration representing the ordering of two values.
             */
            (function (Ordering) {
                Ordering[Ordering["LT"] = 0] = "LT";
                Ordering[Ordering["EQ"] = 1] = "EQ";
                Ordering[Ordering["GT"] = 2] = "GT";
            })(ordering.Ordering || (ordering.Ordering = {}));
            var Ordering = ordering.Ordering;
            /**
             * Reverse takes a function ordering values and returns a new function ordering values in it's reverse order.
             *
             * @example
             * <pre>
             * reverse(jsOrder)(1, 2); // Ordering.GT
             * reverse(jsOrder)(4, 4); // Ordering.EQ
             * reverse(jsOrder)(4, 1); // Ordering.LT
             * </pre>
             *
             * @param order {function(a, a):Ordering} function ordering two values.
             * @returns {function(a, a):Ordering} function ordering two values in the reverse order as the given function.
             */
            function reverse(order) {
                return flip(order);
            }
            ordering.reverse = reverse;
            /**
             * Creates an descending sort function from an ordering function.
             * This function is an alias to `ordering.reverse`.
             *
             * @param order {function(a, a):Ordering} function ordering two values.
             * @returns {function(a, a):Ordering} function ordering two values in the reverse order as the given function.
             */
            ordering.desc = reverse;
            /**
             * Creates an ascending sort function from an ordering function.
             * This function is an alias to `functions.id`.
             *
             * @param order {function(a, a):Ordering} function ordering two values.
             * @returns {function(a, a):Ordering} function ordering two values in the reverse order as the given function.
             */
            ordering.asc = data.functions.id;
            /**
             * Ordering function from Javascript's ordering operators (<, >, ===).
             *
             * @example
             * <pre>
             * jsOrder(1, 2); // Ordering.LT
             * jsOrder(4, 4) // Ordering.EQ
             * jsOrder(4, 1) // Ordering.GT
             * </pre>
             *
             * @param x {a} left operand of the comparison.
             * @param y {a} right operand of the comparison.
             * @returns {Ordering} result of the comparison.
             */
            function jsOrder(x, y) {
                if (x < y)
                    return 0 /* LT */;
                if (x === y)
                    return 1 /* EQ */;
                if (x > y)
                    return 2 /* GT */;
            }
            ordering.jsOrder = jsOrder;
            /**
             * Creates an ordering function by applying each of the given ordering functions in the array order until one of the ordering returns
             * a result different from Ordering.EQ, this result is then returned.
             *
             * @example
             * <pre>
             * // sort by 'a', then 'b' in desc order if a's are equal.
             * var ordering = concatOrderings([
             *      on(prop('a'), jsOrder),
             *      on(prop('b'), desc(jsOrder))
             * ]);
             *
             * var x = { a: 1, b: 4 };
             * var y = { a: 1, b: 2 };
             * var z = { a: 4, b: 5 };
             *
             * ordering(x, y); // Ordering.GT
             * ordering(x, z); // Ordering.LT
             * ordering(y, z); // Ordering.LT
             * </pre>
             *
             * @param compareFunctions {Array<function(a, a):Ordering>} array of ordering functions.
             * @returns {function(a, a):Ordering} resulting ordering function.
             */
            function concatOrderings(compareFunctions) {
                return function (x, y) {
                    var result = 1 /* EQ */;
                    for (var i = 0; i < compareFunctions.length && result === 1 /* EQ */; i++) {
                        result = compareFunctions[i](x, y);
                    }
                    return result;
                };
            }
            ordering.concatOrderings = concatOrderings;
            /**
             * orderByKeys creates an ordering function concatenating the orders specified for each of the given key in the array of key-orderings tuples.
             *
             * @example
             * <pre>
             * // the example for concatOrderings could be rewritten as
             * // sort by 'a', then 'b' in desc order if a's are equal.
             * var ordering = orderByKeys([
             *      new Tuple('a', jsOrder),
             *      new Tuple('b', desc(jsOrder)
             * ]);
             *
             * var x = { a: 1, b: 4 };
             * var y = { a: 1, b: 2 };
             * var z = { a: 4, b: 5 };
             *
             * ordering(x, y); // Ordering.GT
             * ordering(x, z); // Ordering.LT
             * ordering(y, z); // Ordering.LT
             * </pre>
             *
             * @param keysOrdering {Array<Tuple<string, (x:any, y:any)=>Ordering>>} array of key-ordering.
             * @returns {function(a, a):Ordering} the built ordering function.
             */
            function orderByKeys(keysOrdering) {
                var orderings = keysOrdering.map(function (keyOrdering) { return on(prop(keyOrdering.first), keyOrdering.second); });
                return concatOrderings(orderings);
            }
            ordering.orderByKeys = orderByKeys;
        })(ordering = data.ordering || (data.ordering = {}));
    })(data = prelude.data || (prelude.data = {}));
})(prelude || (prelude = {}));
/// <reference path="../Tuple.ts" />
/// <reference path="../Functions.ts" />
/// <reference path="../Booleans.ts" />
var prelude;
(function (prelude) {
    var data;
    (function (data) {
        var array;
        (function (array) {
            var Tuple = data.tuple.Tuple;
            var compose = data.functions.compose;
            var not = data.booleans.not;
            /**
             * Zip takes two lists and returns a list of corresponding pairs. If one input list is short, excess elements of the longer list are discarded.
             *
             * @example
             * <pre>
             * // here we will write tuples in short notation, instead of Tuple(x, y) we will write (x, y).
             * zip(
             *     [0, 1, 2, 3, 4],
             *     ['apples', 'carrots' 'bananas']
             * );
             * // = [ (0, 'apples'), (1, 'carrots), (2, 'bananas') ]
             * </pre>
             *
             * @param as {Array<a>} the array containing the first elements of the created tuples.
             * @param bs {Array<b>} the array containing the second elements of the created tuples.
             * @returns {Tuple<a, b>[]} the array of corresponding pairs from `as` and `bs`.
             */
            // TODO test
            function zip(as, bs) {
                return zipWith(function (a, b) { return new Tuple(a, b); }, as, bs);
            }
            array.zip = zip;
            /**
             * The partition function takes a predicate a list and returns the pair of lists of elements which do and do not satisfy the predicate,
             * respectively.
             *
             * @example
             * <pre>
             * var elements = [1, 2, 3, 4];
             * var predicate = x => x < 3;
             *
             * partition(predicate, elements); // = Tuple([1, 2], [3, 4])
             * </pre>
             *
             * @param predicate {function(a):boolean} predicate to apply to element of the array.
             * @param elements {Array<a>} array to partition.
             * @returns {Tuple<Array<a>, Array<a>>} partition of the array by the given predicate.
             */
            // TODO test
            function partition(predicate, elements) {
                return new Tuple(elements.filter(predicate), elements.filter(compose(not, predicate)));
            }
            array.partition = partition;
            /**
             * Generalized version of `zip`. Instead of using the Tuple constructor, `zipWith` uses the it's first argument as function to combine
             * corresponding pairs.
             *
             * @example
             * <pre>
             * zipWith(
             *     Math.pow,
             *     [1, 2, 3, 4],
             *     [1, 2, 3, 4]
             * );
             * // = [1, 4, 27, 256]
             *
             * // or, if instead of using tuples as the `zip` function does, we want array of two elements, we can write the following,
             * zipWith(
             *     (a, b) => [a, b]
             *     [0, 1, 2, 3, 4],
             *     ['apples', 'carrots' 'bananas']
             * );
             * // = [ [0, 'apples'], [1, 'carrots], [2, 'bananas'] ]
             * </pre>
             * @param zipFn {function(a, b):c} the function to combine corresponding pairs.
             * @param as {Array<a>} the array containing the first arguments given to the `zipFn`.
             * @param bs {Array<b>} the array containing the second arguments given to the `zipFn`.
             * @returns {Array<c>} the array of results returned by `zipFn` on each corresponding pairs from `as` and `bs`.
             */
            // TODO test
            function zipWith(zipFn, as, bs) {
                var result = [];
                for (var i = 0; i < as.length && i < bs.length; i++) {
                    result.push(zipFn(as[i], bs[i]));
                }
                return result;
            }
            array.zipWith = zipWith;
            /**
             * Creates an array containing `times` repetitions of a given value.
             *
             * @example
             * <pre>
             * repeat(3, 'foo'); // ['foo', 'foo', 'foo']
             * repeat(-1, 'bar'); // []
             * </pre>
             *
             * @param times {number} the number of times the value should be repeated, truncated to positive integers.
             * @param value {a} item to repeat.
             * @returns {Array<a>} array of `times` `value`.
             */
            // TODO test
            function repeat(times, value) {
                var result = [];
                // times shouldn't be negative
                times = Math.max(0, times);
                while (times--) {
                    result.push(value);
                }
                return result;
            }
            array.repeat = repeat;
            /**
             * Create an array containing natural numbers in the range [min; max[ (i.e max excluded). If max is bigger than min, than
             * max = min.
             *
             * @example
             * <pre>
             * range(0, 5); // [0, 1, 2, 3, 4]
             * range(5 0); // []
             * </pre>
             *
             * @param minValue {number} min value to include in the array.
             * @param maxValue {number} upper bound of the values included in the array.
             * @returns {Array<number>}  natural numbers in [ min; max |[
             */
            // TODO test
            function range(minValue, maxValue) {
                var result = [];
                // max should be smaller or equal to min
                maxValue = Math.max(minValue, maxValue);
                while (minValue < maxValue) {
                    result.push(minValue++);
                }
                return result;
            }
            array.range = range;
            /**
             * Extracts a page of items from an array.
             *
             * @example
             * <pre>
             * page(2, 1, [1, 2, 3, 4, 5]); // [3, 4]
             * </pre>
             *
             * @param pageSize {number} size of a page.
             * @param pageIndex {number} index of the page to return.
             * @param arr {Array<a>} array of elements to extract the page from.
             * @returns {Array<a>} the page of index `pageIndex` and size `pageSize` extracted from `arr`.
             */
            // TODO test
            function page(pageSize, pageIndex, arr) {
                return arr.slice(pageIndex * pageSize, (1 + pageIndex) * pageSize);
            }
            array.page = page;
        })(array = data.array || (data.array = {}));
    })(data = prelude.data || (prelude.data = {}));
})(prelude || (prelude = {}));
/// <reference path="../Maybe.ts" />
/// <reference path="../Eq.ts" />
var prelude;
(function (prelude) {
    var data;
    (function (data) {
        var array;
        (function (array) {
            var Just = data.maybe.Just;
            var Nothing = data.maybe.Nothing;
            var eqByKeys = data.eq.eqByKeys;
            var objectEq = data.eq.objectEq;
            /**
             * Returns Just the index of the first element of an array satisfying a predicate or Nothing if no element satisfied
             * the predicate.
             *
             * @param predicate {function(a):boolean} predicate to use.
             * @param list {Array<a>} array to search.
             * @returns {Maybe<number>} just the first element satisfying the predicate or nothing.
             */
            function findFirstIndex(predicate, list) {
                for (var i = 0; i < list.length; i++) {
                    if (predicate(list[i])) {
                        return new Just(i);
                    }
                }
                return new Nothing();
            }
            array.findFirstIndex = findFirstIndex;
            /**
             * Returns Just the first element of an array satisfying a predicate or Nothing if no element satisfied
             * the predicate.
             *
             * @param predicate {function(a):boolean} predicate to use.
             * @param list {Array<a>} array to search.
             * @returns {Maybe<a>} just the first element satisfying the predicate or nothing.
             */
            function findFirst(predicate, list) {
                return findFirstIndex(predicate, list).fmap(function (index) { return list[index]; });
            }
            array.findFirst = findFirst;
            /**
             * Returns Just the index of the first element of an array matching a reference object for the given keys.
             *
             * @param reference {a} value to compare to.
             * @param keys {Array<string>} keys to use for the matching.
             * @param list {Array<a>} array to search.
             * @returns {Maybe<number>} just the index of the first matching element or nothing.
             */
            function findFirstIndexByKeys(reference, keys, list) {
                return findFirstIndex(eqByKeys(keys, reference), list);
            }
            array.findFirstIndexByKeys = findFirstIndexByKeys;
            /**
             * Returns Just the first element of an array matching a reference object for the given keys.
             *
             * @param reference {a} value to compare to.
             * @param keys {Array<string>} keys to use for the matching.
             * @param list {Array<a>} array to search.
             * @returns {Maybe<a>} just the first matching element or nothing.
             */
            function findFirstByKeys(reference, keys, list) {
                return findFirstIndexByKeys(reference, keys, list).fmap(function (index) { return list[index]; });
            }
            array.findFirstByKeys = findFirstByKeys;
            /**
             * Returns Just the index of the first object of the array matching the reference object, i.e. every key-value present in the reference
             * object should be present in the item, otherwise return Nothing.
             *
             * @example
             * <pre>
             * var list = [{a:2, b:1}, {a:3, b: 4}, {a:4, b:10}];
             * var x = findFirstIndexMatching(list, {a:4}); // Just(2)
             * </pre>
             *
             * @param list {Array<a>} list to search in.
             * @param reference {any} hash to compare to.
             * @returns {Maybe<number>} the index of the first element matching.
             */
            function findFirstIndexMatching(reference, list) {
                return findFirstIndex(objectEq(reference), list);
            }
            array.findFirstIndexMatching = findFirstIndexMatching;
            /**
             * Returns Just the first object of the array matching the reference object, i.e. every key-value present in the reference
             * object should be present in the item, otherwise return Nothing.
             *
             * @example
             * <pre>
             * var list = [{a:2, b:1}, {a:3, b: 4}, {a:4, b:10}];
             * var x = findFirstMatching(list, {a:4}); // Just({a:4, b:10})
             * </pre>
             *
             * @param list {Array<a>} list to search in.
             * @param reference {any} hash to compare to.
             * @returns {Maybe<a>} the first element matching.
             */
            function findFirstMatching(reference, list) {
                return findFirstIndexMatching(reference, list).fmap(function (index) { return list[index]; });
            }
            array.findFirstMatching = findFirstMatching;
        })(array = data.array || (data.array = {}));
    })(data = prelude.data || (prelude.data = {}));
})(prelude || (prelude = {}));
/// <reference path="../Ordering.ts" />
/// <reference path="../Tuple.ts" />
var prelude;
(function (prelude) {
    var data;
    (function (data) {
        var array;
        (function (_array) {
            var Ordering = data.ordering.Ordering;
            var orderByKeys = data.ordering.orderByKeys;
            /**
             * Inserts an item in an array preserving the ordering specified a given function. Mutates
             * the given array by inserting the item in it.
             *
             * @example
             * <pre>
             * var array = [1,    3, 4, 5];
             * var two   =     2;
             *
             * mutatingInsertBy(jsOrder, two, array);
             *
             * // array = [1, 2, 3, 4, 5]
             * </pre>
             * @param ordering {function(a,a):Ordering} function specifying the ordering of the array.
             * @param item {a} item to insert.
             * @param array {Array<a>} array to insert the item in.
             * @returns {Array<a>} third parameter mutated with the new item.
             */
            function mutatingInsertBy(ordering, item, array) {
                for (var i = 0; i < array.length; i++) {
                    if (ordering(item, array[i]) !== 2 /* GT */) {
                        break;
                    }
                }
                array.splice(i, 0, item);
                return array;
            }
            _array.mutatingInsertBy = mutatingInsertBy;
            /**
             * Same as mutatingInsertBy, but operates on a copy of the given array, i.e. this function is not mutating the given array
             * but copying it and inserting the item in the new array.
             *
             * @example
             * <pre>
             * var array = [1,    3, 4, 5];
             * var two   =     2;
             *
             * insertBy(jsOrder, two, array); // = [1, 2, 3, 4, 5]
             * </pre>
             *
             * @param ordering {function(a,a):Ordering} function specifying the ordering of the array.
             * @param item {a} item to insert.
             * @param array {Array<a>} array to insert the item in.
             * @returns {Array<a>} new array with the given item inserted.
             */
            function insertBy(ordering, item, array) {
                return mutatingInsertBy(ordering, item, array.slice());
            }
            _array.insertBy = insertBy;
            /**
             * Creates a copy of an array ordered by some given function.
             *
             * @example
             * <pre>
             * sortBy(jsOrder, [3, 2, 4, 1]); // = [1, 2, 3, 4]
             * sortBy(desc(jsOrder), [3, 2, 4, 1]); // = [4, 3, 2, 1]
             * </pre>
             *
             * @param ordering {function(a, a):Ordering} function specifying the array order.
             * @param array {Array<a>} array to sort.
             * @returns {Array<a>} sorted array.
             */
            function sortBy(ordering, array) {
                return array.reduceRight(function (result, item) {
                    return mutatingInsertBy(ordering, item, result);
                }, []);
            }
            _array.sortBy = sortBy;
            /**
             * Sorts an array of objects by keys, each key having it's own ordering function. Until a key returns a different ordering as
             * Ordering.EQ, the next key is use to determine the order of two objects. If the last key returns Ordering.EQ, then the objects
             * are indeed equal.
             *
             * @example
             * <pre>
             * var items = [
             *     { a: 1, b: 3 },
             *     { a: 3, b: 1 },
             *     { a: 1, b: 2 },
             *     { a: 0, b: 5 }
             * ];
             *
             * // we want to order by jsOrder on 'a' or fallback on reverse js order on 'b'
             * sortByKeys(
             *     [ new Tuple('a', jsOrder), new Tuple('b', reverse(jsOrder)) ],
             *     items
             * );
             * // = [
             * //    { a: 0, b: 5 },
             * //    { a: 1, b: 3 },
             * //    { a: 1, b: 2 },
             * //    { a: 3, b: 1 }
             * //  ]
             * </pre>
             *
             * @param keysOrdering {Array<Tuple<string, (x:any, y:any)=>Ordering>>} array of key-ordering.
             * @param array {Array<a>} array of objects.
             * @returns {Array<a>} sorted array of objects.
             */
            function sortByKeys(keysOrdering, array) {
                return sortBy(orderByKeys(keysOrdering), array);
            }
            _array.sortByKeys = sortByKeys;
        })(array = data.array || (data.array = {}));
    })(data = prelude.data || (prelude.data = {}));
})(prelude || (prelude = {}));

(typeof exports !== "undefined") && (exports.prelude = prelude);