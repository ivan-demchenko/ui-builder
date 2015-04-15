angular.module('ys-ui-components-tpls', []).run(['$templateCache',
  function ($templateCache) {
    $templateCache.put("components/budgetAllocator/views/budgetAllocator.html",
      "<ys-ui-duplicate template-model=makeNewBudgetLine() class=ys-ui-budget-allocator><ys-ui-list model=model element-name=budgetLine><div class=ys-ui-budget-allocator-row><div class=ys-ui-budget-allocator--remove-button><i class=\"ys-ui-text-red-main ys-icon-circled-minus ys-ui-icon-big\" ys-ui-local-clickable=remove-item></i></div><div>{{ budgetType }} <input type=text ng-model=budgetLine.name></div><div class=ys-ui-budget-allocator--percentage>Percent <input type=number min=0 ng-model=budgetLine.percentage></div></div></ys-ui-list><button ys-ui-local-clickable=duplicate class=ys-ui-button><i class=ys-icon-circled-plus ys-ui-local-clickable=\"\"></i> Add new line</button></ys-ui-duplicate>");
    $templateCache.put("components/dateTimePicker/views/dateTimePicker.default.html",
      "<div class=ys-ui-dtp><div class=ys-ui-dtp-preview><span class=ys-ui-dtp-preview-date>{{dtPickerCtrl.templateDateHash.date.val}}</span><div><strong class=ys-ui-dtp-preview-month>{{dtPickerCtrl.templateDateHash.month.val}}</strong>, <span class=ys-ui-dtp-preview-year>{{dtPickerCtrl.templateDateHash.year.val}}</span>,<br><span class=ys-ui-dtp-preview-day-name>{{dtPickerCtrl.templateDateHash.dayName.val}}</span></div></div><div class=ys-ui-dtp-date><select ng-model=dtPickerCtrl.selected.date ng-options=\"item.val for item in dtPickerCtrl.available.dates\" ng-change=dtPickerCtrl.changeSelection()></select><select ng-model=dtPickerCtrl.selected.month ng-options=\"item.val for item in dtPickerCtrl.available.months\" ng-change=dtPickerCtrl.changeSelection()></select><select ng-model=dtPickerCtrl.selected.year ng-options=\"item.val for item in dtPickerCtrl.available.years\" ng-change=dtPickerCtrl.changeSelection()></select></div><div class=ys-ui-dtp-time-switcher><label><input type=checkbox ng-model=dtPickerCtrl.timeSetVisible> Set time</label></div><div class=ys-ui-dtp-time ng-show=dtPickerCtrl.timeSetVisible><select ng-model=dtPickerCtrl.selected.hour ng-options=\"item.val for item in dtPickerCtrl.available.hours\" ng-change=dtPickerCtrl.changeSelection()></select><select ng-model=dtPickerCtrl.selected.minute ng-options=\"item.val for item in dtPickerCtrl.available.minutes\" ng-change=dtPickerCtrl.changeSelection()></select></div></div>");
    $templateCache.put("components/dateTimePickerRange/views/date-time-picker-range.html",
      "<p><ys-ui-date-time-picker id=startDate1 model=ysUiDatesRangeCtrl.startDate min-date=ysUiDatesRangeCtrl.rangeBegins max-date=ysUiDatesRangeCtrl.endDate></ys-ui-date-time-picker></p><p><ys-ui-date-time-picker id=endDate1 model=ysUiDatesRangeCtrl.endDate max-date=ysUiDatesRangeCtrl.rangeEnds min-date=ysUiDatesRangeCtrl.startDate></ys-ui-date-time-picker></p>");
    $templateCache.put("components/dropDown/views/dropDown.html",
      "<select ng-model=model ng-options=\"{{ optionsExpression }}\"></select>");
    $templateCache.put("components/entityTitle/views/entityTitle.html",
      "<div class=ys-ui-entity-title><div class=\"ys-ui-entity-title__icon ys-ui-icon-huge\"><i class={{icon}}></i></div><div><span class=ys-ui-entity-title__sub-title>{{subTitle}}</span><br><span class=ys-ui-entity-label>{{title}}</span></div></div>");
    $templateCache.put("components/fileUploader/fileSelect.directive.html",
      "<span><input type=file class=ng-hide> <span ng-transclude></span> <span class=ng-hide></span></span>");
    $templateCache.put("components/listItem/views/action-list-item.html",
      "<div class=ys-ui-action-list-item ng-transclude=\"\"></div>");
    $templateCache.put("components/listItem/views/generic-list-item.html",
      "<div class=ys-ui-list-item ng-transclude=\"\"></div>");
    $templateCache.put("components/organization/views/organization-list-item.html",
      "<div class=ys-ui-organization-list-item><div class=ys-ui-organization-list-item--icon><i class=ys-icon-institution></i></div><div class=ys-ui-organization-list-item--info><i class=\"ys-ui-organization-list-item--top100 ys-icon-top100\" ng-if=model.inTop100></i> <strong>{{ model.name }}</strong><br>{{ model.addresses[0].searchAddress }}</div></div>");
    $templateCache.put("components/pagingControl/views/pagingControl.view.html",
      "<div class=ys-ui-paging-control><a ng-click=previousPage()><span class=ys-icon-square-arrow-up></span></a> <a ng-click=nextPage()><span class=ys-icon-square-arrow-down></span></a></div>");
    $templateCache.put("components/pagingCountView/pagingCountView.view.html",
      "<div><span class=ys-ui-paging-count--numbers><span class=ys-ui-paging-count--count><span>{{ minShownIndex() }}</span><br><span>{{ maxShownIndex() }}</span></span>/<span class=ys-text-gray>{{ maxItems }}</span></span> <span class=ys-ui-paging-count--caption>{{ caption }}</span></div>");
    $templateCache.put("components/person/views/person-list-item.html",
      "<div class=ys-ui-person-list-item><div class=ys-ui-person-list-item--icon><i class=ys-icon-person></i></div><div><strong>{{ model.fullName }}</strong>, {{ model.employments[0].organization }}<br>{{ model.employments[0].addresses[0].searchAddress }}</div></div>");
    $templateCache.put("components/wizard-progress-step-indicator/views/template.html",
      "<div class=ys-ui-wpsi><div class=ys-ui-wpsi--step ng-repeat=\"step in mappedSteps\" ng-class=\"step | wizardStep\"><div class=ys-ui-step-progress-line><div class=ys-ui-step-progress-line-fill></div></div><div class=ys-ui-step-label>{{ step.name }}</div><span class=ys-ui-step-bullet></span></div></div>");
    $templateCache.put("components/yesNo/views/yesNo.html",
      "<div class=ys-ui-yes-no><div class=\"ys-ui-yes-no-option ys-icon-circled-checked\" ng-click=ynCtrl.setYes() ng-class=\"model | yesNoState:true\"></div><div class=\"ys-ui-yes-no-option ys-icon-circled-no\" ng-click=ynCtrl.setNo() ng-class=\"model | yesNoState:false\"></div></div>");
  }
]);


//====================================================================================================================
// Module:    ys.components
// Optimized: Yes
// File:      .tmp/components/components.module.js
//====================================================================================================================

(function (module) {

  'use strict';

  /**
   * @ngdoc overview
   * @name ys.components
   * @description
   * # Components
   *
   * This modules compraises of diffent UI components.
   *
   * Main module of the application.
   */

  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/budgetAllocator/budgetAllocator.controller.js
  //--------------------------------------------------------------------------------------------------------------------

  'use strict';

  /**
   * @ngdoc overview
   * @name BudgetAllocatorController
   * @description
   * # BudgetAllocator
   *
   * Controller for the ysBudgetAllocator directive.
   */
  module
    .controller('BudgetAllocatorController', ["$scope", "BudgetAllocatorService",
      function ($scope, BudgetAllocatorService) {
        if (!Array.isArray($scope.model)) {
          $scope.model = [];
        }

        $scope.maxPercentageFor = function (budgetLine) {
          return BudgetAllocatorService.maxPercentageFor($scope.model, budgetLine);
        };

        $scope.makeNewBudgetLine = function () {
          return BudgetAllocatorService.makeNewBudgetLine($scope.model);
        };
      }
    ]);

  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/budgetAllocator/budgetAllocator.directive.js
  //--------------------------------------------------------------------------------------------------------------------

  "use strict";

  /**
   * @ngdoc overview
   * @name ysUiBudgetAllocator
   * @description
   * # BudgetAllocator
   *
   * Directive for creating an configuring a budget repartition over several budget lines. It populates
   * it's model with an array of budget line consisting of a name, and the budget percentage assigned
   * to this budget line.
   */
  module
    .directive('ysUiBudgetAllocator', function () {
      return {
        restrict: 'E',
        scope: {
          model: '=',
          budgetType: '='
        },
        controller: 'BudgetAllocatorController',
        templateUrl: 'components/budgetAllocator/views/budgetAllocator.html'
      };
    });

  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/budgetAllocator/budgetAllocator.service.js
  //--------------------------------------------------------------------------------------------------------------------

  'use strict';

  /**
   * @ngdoc overview
   * @name BudgetAllocatorService
   * @description
   * # BudgetAllocator
   *
   * Service for the ysBudgetAllocator directive.
   */
  module
    .service('BudgetAllocatorService', function () {
      /**
       * Calculate the maximum allowed percentage for a budget line within a list of budget lines in
       * order to prevent the sum of the percentage of each budget line to exceed 100%.
       *
       * @param budgetLines - the array of business lines.
       * @param currentBudgetLine - the business line to test.
       * @returns {*} the maximum percentage selectable for the given budget line.
       */
      this.maxPercentageFor = function (budgetLines, currentBudgetLine) {
        var totalPercentage = budgetLines.reduce(function (total, budgetLine) {
          return total + budgetLine.percentage;
        }, 0);

        var freePercentages = 100 - totalPercentage;

        if (freePercentages <= 0) {
          return currentBudgetLine.percentage;
        }

        return currentBudgetLine.percentage + freePercentages;
      };

      /**
       * Creates a new budget line with an empty name and a percentage equal to the maximum
       * available percentage in the given budget lines list.
       *
       * @param budgetLines - list of existing bidget lines.
       * @returns {*} the newly created budget line.
       */
      this.makeNewBudgetLine = function (budgetLines) {
        var budgetLine = {
          name: '',
          percentage: 0
        };

        budgetLine.percentage = this.maxPercentageFor(budgetLines, budgetLine);

        return budgetLine;
      };
    });

  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/dataSources/endpointSource.directive.js
  //--------------------------------------------------------------------------------------------------------------------

  (function (angular) {
    'use strict';

    module
      .directive('ysUiEndPointSource', ["$http", "GetSetModelService",
        function ($http, GetSetModelService) {
          return {
            restrict: 'E',
            controller: ["$rootScope", "$scope", "$attrs", "Debouncer",
              function ($rootScope, $scope, $attrs, Debouncer) {

                var debouncer = new Debouncer();

                var model = GetSetModelService.makeAccessors($attrs.model);
                var maxItems = GetSetModelService.makeAccessors($attrs.maxItems, true);

                var queryExpression = $attrs.query;
                var endPointUrl = $attrs.endPointUrl;

                function buildFilteringParameters(query) {
                  return {
                    key: query.searchKey,
                    string: query.searchString
                  };
                }

                function buildSearchingParameters(query) {
                  return {
                    pageIndex: query.pageIndex,
                    pageSize: query.pageSize
                  };
                }

                function buildSortingParameters(query) {
                  var sortingParameters = [];
                  var DEFAULT_SORT_ORDER = 'asc';

                  if (query.sortParameters) {
                    var sortObject = query.sortParameters.reduce(function (sortObject, sortItem) {
                      sortObject[sortItem.key] = sortItem.order || DEFAULT_SORT_ORDER;
                      return sortObject;
                    }, {});

                    sortingParameters.push(sortObject);
                  }

                  return sortingParameters;
                }

                function buildParameters(query) {
                  return {
                    searching: buildSearchingParameters(query),
                    filtering: buildFilteringParameters(query),
                    sorting: buildSortingParameters(query)
                  };
                }

                $scope.$watch(queryExpression, function (query) {
                  query = query || {};

                  var parameters = buildParameters(query);

                  debouncer
                    .debounce(150)
                    .then(function () {
                      return $http.get(endPointUrl, {
                        params: parameters
                      });
                    })
                    .then(function (data) {
                      return data.data;
                    })
                    .then(function (data) {
                      var total;
                      var elements;

                      // if endpoint doesn't support the new api, it will only return us
                      // an array of values.
                      if (Array.isArray(data)) {
                        total = data.length;
                        elements = data;
                      } else {
                        total = data.maxItems;
                        elements = data.elements;
                      }

                      maxItems.assign($scope, total);
                      model.assign($scope, elements);
                    });
                });
              }
            ]
          };
        }
      ]);
  })(window.angular);

  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/dataSources/esSource.directive.js
  //--------------------------------------------------------------------------------------------------------------------

  'use strict';

  module
    .directive('ysUiEsSource', function () {
      return {
        restrict: 'E',
        controller: ["$scope", "$attrs", "$http", "GetSetModelService", "Debouncer",
          function ($scope, $attrs, $http, GetSetModelService, Debouncer) {
            var debouncer = new Debouncer();

            var model = GetSetModelService.makeAccessors($attrs.model);
            var maxItems = GetSetModelService.makeAccessors($attrs.maxItems, true);

            var queryExpression = $attrs.query;
            var endPointUrl = $attrs.endPointUrl;
            var searchedIndex = $attrs.searchedIndex;

            function baseQuery() {
              return {
                indices: [searchedIndex],
                scoped: true,
                search: {}
              };
            }

            function makeSearch(query) {
              var key = query.searchKey;
              var string = query.searchString;

              var must = [{
                match: {
                  state: 'ACTIVE'
                }
              }];

              if (key && string) {
                var esQuery = '*' + string + '*';
                must.push({
                  'query_string': {
                    fields: [key],
                    query: esQuery,
                    'use_dis_max': true
                  }
                });
              }

              return {
                bool: {
                  must: must
                }
              };
            }

            function makePaging(query) {
              var size = query.pageSize || 10;
              var index = query.pageIndex || 0;

              return {
                from: index * size,
                size: size
              };
            }

            function makeSort(query) {
              var sortArguments = [];
              var DEFAULT_SORT_ORDER = 'asc';

              if (query.sortParameters) {
                var sortObject = query.sortParameters.reduce(function (sortObject, sortItem) {
                  sortObject[sortItem.key] = {
                    order: sortItem.order || DEFAULT_SORT_ORDER
                  };

                  return sortObject;
                }, {});

                sortArguments.push(sortObject);
              }

              return sortArguments;
            }

            function makeEsQuery(query) {
              var esQuery = baseQuery();
              var paging = makePaging(query);

              esQuery.search.query = makeSearch(query);
              esQuery.search.sort = makeSort(query);

              esQuery.search.from = paging.from;
              esQuery.search.size = paging.size;

              return esQuery;
            }

            $scope.$watch(queryExpression, function (query) {
              query = query || {};

              var esQuery = makeEsQuery(query);

              debouncer
                .debounce(150)
                .then(function () {
                  return $http.post(endPointUrl, esQuery);
                })
                .then(function (data) {
                  return data.data;
                })
                .then(function (data) {
                  var total = data.hits.total;
                  var hits = [];

                  maxItems.assign($scope, total);

                  if (total > 0) {
                    hits = data.hits.hits.map(function (item) {
                      return item._source;
                    });
                  }

                  model.assign($scope, hits);
                });
            });
          }
        ]
      };
    });

  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/dataSources/arraySource/arraySource.controller.js
  //--------------------------------------------------------------------------------------------------------------------

  'use strict';

  module
    .controller('ArraySourceController', ["ArraySourceService", "GetSetModelService", "$scope", "$attrs",
      function (ArraySourceService, GetSetModelService, $scope, $attrs) {

        var model = GetSetModelService.makeAccessors($attrs.model);
        var maxItems = GetSetModelService.makeAccessors($attrs.maxItems, true);

        var queryExpression = $attrs.query;
        var constantDataExpression = $attrs.constantData;

        var constantData = [];
        var cachedQuery = {};

        function updateResult() {
          var queryResult = ArraySourceService.queryArray(cachedQuery, constantData);

          maxItems.assign($scope, queryResult.maxItems);
          model.assign($scope, queryResult.elements);
        }

        $scope.$watchCollection(constantDataExpression, function (value) {
          constantData = value || [];
          updateResult();
        });

        $scope.$watch(queryExpression, function (query) {
          cachedQuery = query || {};
          updateResult();
        });
      }
    ]);

  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/dataSources/arraySource/arraySource.directive.js
  //--------------------------------------------------------------------------------------------------------------------

  'use strict';

  module
    .directive('ysUiArraySource', function () {
      return {
        restrict: 'E',
        controller: 'ArraySourceController'
      };
    });

  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/dataSources/arraySource/arraySource.service.js
  //--------------------------------------------------------------------------------------------------------------------

  'use strict';

  var A = prelude.data.array;
  var Ord = prelude.data.ordering;
  var Obj = prelude.data.objects;
  var T = prelude.data.tuple;
  var F = prelude.data.functions;

  module
    .service('ArraySourceService', function () {

      this.search = function (searchKey, searchString, array) {
        if (!searchString) {
          return array;
        }

        var regexp = new RegExp(searchString, 'i');

        return array.filter(function (item) {
          var tested = searchKey ? item[searchKey] : item;
          return tested && (tested === searchString || regexp.test(tested));
        });
      };

      this.sort = function (sortParameters, array) {
        function makeOrder(orderStr) {
          var order = orderStr === 'desc' ? Ord.desc : Ord.asc;
          return order(Ord.jsOrder);
        }

        if (!sortParameters) {
          return array;
        }

        // first split the sort parameters into sorts on the full item and on fields of the item
        var searchItems = A.partition(
          F.compose(Boolean, Obj.prop('key')),
          sortParameters
        );

        // transform the key sorts into tuples of <key, order> using jsOrder and the specified order (asc | desc)
        var keySort = searchItems.first.map(function (item) {
          return new T.Tuple(item.key, makeOrder(item.order));
        });

        keySort = Ord.orderByKeys(keySort);

        // create orders from the specified ones
        var valueSort = searchItems.second.map(F.compose(makeOrder, Obj.prop('order')));

        // concatenate all orderings together into one function
        var finalOrdering = Ord.concatOrderings([keySort].concat(valueSort));

        return A.sortBy(finalOrdering, array);
      };

      this.page = function (pageSize, pageIndex, array) {
        if (!pageSize && !pageIndex) {
          return array;
        }

        return A.page(pageSize, pageIndex, array);
      };

      this.queryArray = function (query, array) {
        query = query || {};

        var elements = array;
        var maxItems;

        elements = this.search(query.searchKey, query.searchString, elements);
        elements = this.sort(query.sortParameters, elements);

        maxItems = elements.length;

        elements = this.page(query.pageSize, query.pageIndex, elements);

        return {
          elements: elements,
          maxItems: maxItems
        };
      };
    });

  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/dateTimePicker/date-time-picker.controller.js
  //--------------------------------------------------------------------------------------------------------------------

  'use strict';

  /**
   * @ngdoc overview
   * @name ysDateTimePickerCtrl
   * @description
   * # ysDateTimePickerCtrl
   *
   * Controller for Date time picker
   */
  module
    .controller('ysUiDateTimePickerCtrl', ['$scope', 'moment', '$rootScope', 'ysUiDateTimePickerService',
      function ($scope, moment, $rootScope, dateTimePickerService) {

        // Import
        var findFirstByKeys = prelude.data.array.findFirstByKeys;
        var fromMaybe = prelude.data.maybe.fromMaybe;

        var dtPickerCtrl = this;

        this.initialDate = $scope.model ? moment($scope.model) : undefined;
        this.minDate = $scope.minDate ? moment($scope.minDate) : undefined;
        this.maxDate = $scope.maxDate ? moment($scope.maxDate) : undefined;

        var unbind = $rootScope.$on('ys.ui.date-time-picker-range.date.set', function (evt, data) {
          if (data.componentId === $scope.id) {
            if (data.minDate) {
              dtPickerCtrl.setMinDate(data.minDate);
            }
            if (data.maxDate) {
              dtPickerCtrl.setMaxDate(data.maxDate);
            }
          }
        });

        $scope.$on('$destroy', unbind);

        if (this.minDate && this.model < this.minDate) {
          throw Error('Initial date (value of model) can not be lower then minimal date (min-date value)');
        }

        if (this.maxDate && this.model > this.maxDate) {
          throw Error('Initial date (value of model) can not be higher then maximal date (max-date value)');
        }

        /**
         * This represents that state of a component of whether to show or hide the time dropDowns
         * @type {boolean}
         */
        this.timeSetVisible = false;

        /**
         * This hash is needed for displaying selected date in template
         * @type {{date: {val: null, format: string}, dayName: {val: null, format: string}, month: {val: null, format: string}, year: {val: null, format: string}}}
         */
        this.templateDateHash = {
          date: {
            val: null,
            format: 'DD'
          },
          dayName: {
            val: null,
            format: 'dddd'
          },
          month: {
            val: null,
            format: 'MMMM'
          },
          year: {
            val: null,
            format: 'YYYY'
          }
        };

        this.selected = {
          date: null,
          month: null,
          year: null,
          hour: null,
          minute: null
        };

        this.available = {
          dates: null,
          months: null,
          years: null,
          hours: null,
          minutes: null
        };

        this.getTemplateDateHash = function (moment) {
          for (var dateUnit in this.templateDateHash) {
            if (this.templateDateHash.hasOwnProperty(dateUnit)) {
              this.templateDateHash[dateUnit].val = moment.format(this.templateDateHash[dateUnit].format);
            }
          }
        };

        this.getAvailableValues = function () {
          for (var dateUnit in this.available) {
            if (this.available.hasOwnProperty(dateUnit)) {
              this.available[dateUnit] = dateTimePickerService.getAvailable(dateUnit, this.selected, this.initialDate, this.minDate, this.maxDate, dateUnit === 'minutes' ? 5 : 1);
            }
          }
        };

        this.setInitialSelection = function () {
          for (var dateUnit in this.selected) {
            if (this.selected.hasOwnProperty(dateUnit)) {
              this.selected[dateUnit] = dateTimePickerService.getInitiallySelected(this.initialDate, dateUnit, this.available[dateUnit + 's']);
            }
          }
        };

        this.reSelectUiElements = function () {
          var defaultValue;
          for (var dateUnit in this.selected) {
            if (this.selected.hasOwnProperty(dateUnit)) {
              defaultValue = this.available[dateUnit + 's'][0];
              this.selected[dateUnit] = fromMaybe(defaultValue, findFirstByKeys(this.selected[dateUnit], ['key'], this.available[dateUnit + 's']));
            }
          }
        };

        this.setMinDate = function (newDate) {
          this.minDate = newDate;
          this.getAvailableValues();
          this.reSelectUiElements();
        };

        this.setMaxDate = function (newDate) {
          this.maxDate = newDate;
          this.getAvailableValues();
          this.reSelectUiElements();
        };

        /**
         * We have an object that represents values that we've selected.
         * We need to create a new `moment` obj from those values
         * @returns {moment}
         */
        this.getMomentFromSelection = function () {
          var newMoment = moment();
          for (var key in this.selected) {
            if (this.selected.hasOwnProperty(key) && !!this.selected[key]) {
              newMoment.set(key, this.selected[key].key);
            }
          }
          return newMoment;
        };

        /**
         * When a user selected a value in one of the dropDowns, we need to:
         * - recalculate possible values of other dropDowns,
         * - set selected values so Angular knows which items to select in dropDown,
         * - update UI and `model` value,
         * - notify others that date has been changed.
         */
        this.changeSelection = function () {
          this.getAvailableValues();
          this.reSelectUiElements();

          var selectedMoment = this.getMomentFromSelection();

          this.getTemplateDateHash(selectedMoment);

          $scope.model = selectedMoment.valueOf();

          $rootScope.$emit('ys.ui.date-time-picker.date.updated', {
            componentId: $scope.id,
            newDate: $scope.model
          });
        };

        /**
         * Initialize the components from the very beginning:
         * - populate dropDowns,
         * - select proper items in them,
         * - update IU, set model.
         */
        this.init = function () {
          var selectedMoment = this.getMomentFromSelection();

          this.getAvailableValues();
          this.setInitialSelection();
          this.getTemplateDateHash(selectedMoment);

          if (!$scope.model) {
            $scope.model = selectedMoment.valueOf();
          }
        };

        this.init();

      }
    ]);

  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/dateTimePicker/date-time-picker.directive.js
  //--------------------------------------------------------------------------------------------------------------------

  'use strict';

  /**
   * @ngdoc overview
   * @name ysDateTimePicker
   * @description
   * # ysDateTimePicker
   *
   * Date time picker
   */
  module
    .directive('ysUiDateTimePicker', function () {
      return {
        restrict: 'E',
        scope: {
          id: '@',
          model: '=',
          minDate: '=',
          maxDate: '=',
          selectSize: '@'
        },
        controller: 'ysUiDateTimePickerCtrl',
        controllerAs: 'dtPickerCtrl',
        templateUrl: 'components/dateTimePicker/views/dateTimePicker.default.html',
        compile: function () {
          return {
            post: function (scope, elem, attrs) {
              var selects;
              if (attrs.selectSize) {
                selects = Array.prototype.slice.call(elem.find('select'));
                selects.forEach(function (select) {
                  select.size = attrs.selectSize;
                });
              }
            }
          };
        }
      };
    });

  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/dateTimePicker/date-time-picker.service.js
  //--------------------------------------------------------------------------------------------------------------------

  'use strict';

  /**
   * @ngdoc overview
   * @name ysUiDateTimePickerService
   * @description
   * # ysUiDateTimePickerService
   *
   * Set of functions for dateTimePicker
   */
  module
    .service('ysUiDateTimePickerService', ["DateObject", "moment",
      function (DateObject, moment) {
        var Tuple = prelude.data.tuple.Tuple;
        var fst = prelude.data.tuple.fst;
        var snd = prelude.data.tuple.snd;
        var objectMatches = prelude.data.objects.objectMatches;
        var findFirstMatching = prelude.data.array.findFirstMatching;
        var fromMaybe = prelude.data.maybe.fromMaybe;

        /**
         * Return an array of with min and max dates within specified range.
         * @param currentDate curently selected date
         * @param rangeStart start of dates range
         * @param rangeEnd end of dates range
         * @param dropDateParam this param specifies for what (months, minutes, days) to calculate min and max dates
         * @returns {prelude.data.tuple.Tuple}
         * @example
         * var current = moment().set('year', 2015).set(month, 5);
         * var rangeStart = moment().set('year', 2011).set('month', 3);
         * var rangeEnd = moment().set('year', 2025).set('month', 6);
         * var minMax = getMinAndMaxDates(current, rangeStart, rangeEnd, 'month') // [moment([2015, 0...]), moment([2015, 11...])]
         */
        function getMinAndMaxDates(currentDate, rangeStart, rangeEnd, dropDateParam) {
          var minDateCheckpoint, maxDateCheckpoint, minimalDate, maximalDate;

          minDateCheckpoint = moment(currentDate).startOf(dropDateParam);
          maxDateCheckpoint = moment(currentDate).endOf(dropDateParam);

          minimalDate = rangeStart ? moment(rangeStart) : minDateCheckpoint;
          minimalDate = minimalDate >= minDateCheckpoint ? minimalDate : minDateCheckpoint;

          maximalDate = rangeEnd ? moment(rangeEnd) : maxDateCheckpoint;
          maximalDate = maximalDate > maxDateCheckpoint ? maxDateCheckpoint : maximalDate;

          return new Tuple(minimalDate, maximalDate);
        }

        /**
         * Returns moment obj that was filled with data from selection obj
         * @param selected
         * @returns {moment}
         * @example
         * var selected = {
         *    year: {
         *       key: 2011,
         *       val: '2011'
         *    },
         *    month: {key: 4, ...}
         *    ...
         * }
         * getSelectedDate(selected) // moment([2011, 4...])
         */
        function getSelectedDate(selected) {
          var date, dateUnit;

          date = moment();
          for (dateUnit in selected) {
            if (selected.hasOwnProperty(dateUnit)) {
              date.set(dateUnit, selected[dateUnit] ? selected[dateUnit].key : moment().get(dateUnit));
            }
          }
          return date;
        }

        /**
         * Returns current date according to possible values: selected date, the date that was initially set, rangeStart
         * @param selection - the date that is formed from the selection
         * @param initialDate - the date that has been set in a `model` param for the component
         * @param rangeStart - the value from the `minDate` param of a component
         * @returns {moment}
         * @example
         * getCurrentDate() // returns the moment() with the current date.
         * ..
         */
        function getCurrentDate(selection, initialDate, rangeStart) {
          var checkSelectedPredicate, currentDate;

          checkSelectedPredicate = function (k, value) {
            return value !== null;
          };
          currentDate = objectMatches(checkSelectedPredicate, selection) ?
            getSelectedDate(selection) :
            initialDate ?
            moment(initialDate) :
            moment();

          return (!!rangeStart && currentDate.valueOf() < rangeStart) ? moment(rangeStart) : currentDate;
        }

        /**
         * Generated an array of date objects ( i. e. { key: 2012, val: '2011' } ) for the specific
         * date param (f.i, `year`, `month`, etc.) according to min and max dates
         * @param minMaxDates - array with min and max dates
         * @param dateValueFormat - format of date for the `val` param in returned objects. Can be "ddd, DD"
         * @param stepAmount - step for dates object. Default is 1. For example, you want minutes like 0, 5, 10, 15... In this case, `stepAmount` is 5.
         * @returns {Array<DateObject>}
         * @example
         * var minDate = moment([2011, 04, 02]);
         * var maxDate = moment([2014, 03, 12]);
         * var datesTuple = new prelude.data.tuple.Tuple(minDate, maxDate);
         * var arr = generateArrayOfDateObjects(datesTuple, 'YYYY', 1); // [{key: 2011, val: '2011'}, {key: 2012, ...} ...]
         */
        function generateArrayOfDateObjects(minMaxDates, dateValueFormat, stepAmount) {
          var dateParams, res, startDate, endDate, diff, dateKey, dateValue;

          stepAmount = (stepAmount || 1);

          dateParams = {
            'YYYY': {
              dateUnit: 'year',
              diffUnit: 'year'
            },
            'MMM': {
              dateUnit: 'month',
              diffUnit: 'month'
            },
            'DD, ddd': {
              dateUnit: 'date',
              diffUnit: 'day'
            },
            'HH': {
              dateUnit: 'hour',
              diffUnit: 'hour'
            },
            'mm': {
              dateUnit: 'minute',
              diffUnit: 'minute'
            }
          };
          res = [];
          startDate = fst(minMaxDates);
          endDate = snd(minMaxDates);

          diff = endDate.diff(startDate, dateParams[dateValueFormat].diffUnit);

          while (diff > -1) {
            dateKey = startDate.get(dateParams[dateValueFormat].dateUnit);
            dateValue = startDate.format(dateValueFormat);
            res.push(new DateObject(dateKey, dateValue));
            startDate.add(stepAmount, dateParams[dateValueFormat].diffUnit);
            diff -= stepAmount;
          }

          return res;
        }

        /**
         * Generates an array of date object for specified requestedType (type)
         * @param {string} requestedType - e.g. months, days, hours, minutes
         * @param selected - selected dates obj
         * @param initialDate - specified date for `model` param for component
         * @param rangeStart - minimal possible date
         * @param rangeEnd - maximal possible date
         * @param step - step. Default is 1. F.e., if you want minutes like 0, 5, 10, 15... then step is 5.
         * @returns {Array} [{k: '', v: ''}]
         * @example
         * var selected = moment();
         * var rangeStart = moment().set('year', 2011).set('month', 03);
         * var rangeEnd = moment().set('year', 2021).set('month', 11);
         * var years = getAvailable('months', selected, undefined, rangeStart, rangeEnd); // [{key: 0, val: 'Jan'}]
         */
        this.getAvailable = function (requestedType, selected, initialDate, rangeStart, rangeEnd, step) {
          var min, max, minMaxDates, paramKV, currentDate;

          step = step || 1;

          if (requestedType === 'years') {
            min = rangeStart ? moment(rangeStart) : moment(initialDate);
            if (rangeEnd && moment(rangeEnd) < min) {
              min = moment(rangeEnd);
            }
            min.startOf('year');

            max = rangeEnd ? moment(rangeEnd) : moment(initialDate).add(10, 'y');
            max = max < min ? moment(min).add(1, 'y') : max;
            max.startOf('year');

            minMaxDates = new Tuple(min, max);
            return generateArrayOfDateObjects(minMaxDates, 'YYYY', step);
          }

          paramKV = {
            'months': {
              startOfParam: 'year',
              format: 'MMM'
            },
            'dates': {
              startOfParam: 'month',
              format: 'DD, ddd'
            },
            'hours': {
              startOfParam: 'day',
              format: 'HH'
            },
            'minutes': {
              startOfParam: 'hour',
              format: 'mm'
            }
          };
          currentDate = getCurrentDate(selected, initialDate, rangeStart);

          if (currentDate.valueOf() > rangeEnd) {
            currentDate = moment(rangeEnd).startOf(paramKV[requestedType].startOfParam);
          }

          minMaxDates = getMinAndMaxDates(currentDate, rangeStart, rangeEnd, paramKV[requestedType].startOfParam);
          return generateArrayOfDateObjects(minMaxDates, paramKV[requestedType].format, step);
        };

        /**
         * Return an date obj of specific type (dateComponent) from the range of available values according to initialDate (which is specified for component).
         * @param initialDate the date which has been specified for the component in `model` param. If not, it would be undefined -> current moment()
         * @param dateComponent - it might be 'year', 'month', 'date', etc.
         * @param range - the range from `getAvailable` function
         * @returns {DateObject}
         */
        this.getInitiallySelected = function (initialDate, dateComponent, range) {
          var dateValue, found;

          dateValue = moment(initialDate).get(dateComponent);
          found = findFirstMatching({
            key: dateValue
          }, range);
          return fromMaybe(range[0], found);
        };

      }
    ]);

  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/dateTimePicker/models/dateObject.js
  //--------------------------------------------------------------------------------------------------------------------

  'use strict';

  /**
   * @ngdoc overview
   * @name DateObject
   * @description
   * # DateObject
   *
   * The key: val obj for date
   */
  module
    .factory('DateObject', function () {

      /**
       * DateObject constructor
       * @param k the key that can be used in moment manipulations, e.g. 2012 or 02
       * @param v the value to represent the date value, e.g. 'Mon, 03' or '2015'
       */
      return function DateObject(k, v) {
        this.key = k;
        this.val = v;
      };

    });

  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/dateTimePickerRange/date-time-picker-range.controller.js
  //--------------------------------------------------------------------------------------------------------------------

  'use strict';

  /**
   * @ngdoc overview
   * @name ysUiDateTimePickerRangeController
   * @description
   * # ysUiDateTimePickerRangeController
   *
   */
  module
    .controller('ysUiDateTimePickerRangeController', ["$scope", "$rootScope",
      function ($scope, $rootScope) {

        var ctrl = this;

        this.rangeBegins = $scope.rangeBegins;
        this.rangeEnds = $scope.rangeEnds;
        this.startDate = $scope.startDate;
        this.endDate = $scope.endDate;

        this.startDateComponentId = 'startDate1';
        this.endDateComponentId = 'endDate1';

        this.emitDate = function (dateType, componentId, date) {
          var emitParam = {
            componentId: componentId
          };
          emitParam[dateType] = date;
          $rootScope.$emit('ys.ui.date-time-picker-range.date.set', emitParam);
        };

        ctrl.emitDate('minDate', ctrl.endDateComponentId, ctrl.rangeBegins);
        ctrl.emitDate('maxDate', ctrl.startDateComponentId, ctrl.rangeEnds);

        var unbind = $rootScope.$on('ys.ui.date-time-picker.date.updated', function (ent, data) {
          if (data.componentId === ctrl.startDateComponentId) {
            ctrl.emitDate('minDate', ctrl.endDateComponentId, data.newDate);
          }
          if (data.componentId === ctrl.endDateComponentId) {
            ctrl.emitDate('maxDate', ctrl.startDateComponentId, data.newDate);
          }
        });

        $scope.$on('$destroy', unbind);

      }
    ]);

  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/dateTimePickerRange/date-time-picker-range.directive.js
  //--------------------------------------------------------------------------------------------------------------------

  'use strict';

  /**
   * @ngdoc overview
   * @name ysUiDateTimePickerRange
   * @description
   * # ysUiDateTimePickerRange
   *
   * Range of two date time pickers with minimal and maximal dates
   */
  module
    .directive('ysUiDateTimePickerRange', function () {
      return {
        restrict: 'E',
        scope: {
          startDate: '=',
          endDate: '=',
          rangeBegins: '=',
          rangeEnds: '='
        },
        controller: 'ysUiDateTimePickerRangeController',
        controllerAs: 'ysUiDatesRangeCtrl',
        templateUrl: 'components/dateTimePickerRange/views/date-time-picker-range.html'
      };
    });

  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/doubleList/doubleList.directive.js
  //--------------------------------------------------------------------------------------------------------------------

  'use strict';

  module
    .directive('ysUiDoubleList', function () {
      return {
        restrict: 'E',
        scope: true,
        controller: ["$scope",
          function DoubleListController($scope) {
            $scope.$on("src.move-item", function (e, item) {
              $scope.$broadcast("src.remove-item", item);
              $scope.$broadcast("dst.add-item", item);

              e.stopPropagation();
            });

            $scope.$on("dst.move-item", function (e, item) {
              $scope.$broadcast("dst.remove-item", item);
              $scope.$broadcast("src.add-item", item);

              e.stopPropagation();
            });
          }
        ]
      };
    });

  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/dropDown/dropDown.directive.js
  //--------------------------------------------------------------------------------------------------------------------

  "use strict";

  /**
   * @ngdoc overview
   * @name ysUiDropDown
   * @description
   * # DropDown
   *
   */
  module
    .directive('ysUiDropDown', function () {
      return {
        restrict: 'E',
        scope: {
          model: '=',
          options: '=',
          expression: '@'
        },
        controller: ["$scope",
          function ($scope) {
            if (!$scope.expression) {
              $scope.optionsExpression = 'item as item';
            } else {
              $scope.optionsExpression = $scope.expression;
            }
            $scope.optionsExpression += ' for item in options';
          }
        ],
        templateUrl: 'components/dropDown/views/dropDown.html'
      };
    });

  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/duplicate/duplicate.directive.js
  //--------------------------------------------------------------------------------------------------------------------

  'use strict';

  /**
   * @example
   * <pre>
   * <ys-ui-duplicate template-model="budgetAllocationTemplate">
   *     <ys-ui-list model="budgetAllocations">
   *         <ys-ui-generic-list-item>
   *             <input ng-model="item.name">
   *             <button ys-ui-clickable="remove">delete</button>
   *         </ys-ui-generic-list-item>
   *     </ys-ui-list>
   *     <button ys-ui-clickable="add">add</button>
   * </ys-ui-duplicate>
   * </pre>
   */

  module
    .directive('ysUiDuplicate', function () {
      return {
        restrict: 'E',
        transclude: true,
        scope: true,
        template: '<div></div>',
        link: function ($scope, $element, $attrs, controller, $transclude) {
          $transclude($scope, function (clone) {
            $element.append(clone);
          });

          $scope.localEmit = function (event, data) {
            $scope.$emit(event, data);
          };

          $scope.localOn = function (event, callback) {
            $scope.$on(event, function (event, data) {
              callback(event, data);
              event.stopPropagation();
            });
          };

          $scope.localOn('duplicate', function () {
            var templateModel = $scope.$eval($attrs.templateModel);
            $scope.$broadcast('add-item', angular.copy(templateModel));
          });
        }
      };
    });

  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/enterBox/enterBox.directive.js
  //--------------------------------------------------------------------------------------------------------------------

  'use strict';

  module
    .directive('ysUiEnterBox', function () {
      return {
        restrict: 'A',
        requires: '^input',
        link: function (scope, element) {
          element.on('keyup', function (e) {
            if (e.keyCode === 13) {
              var value = element.val();
              if (value) {
                scope.$emit('value-entered', value);
                scope.$digest();
                element.val('');
              }
            }
          });
        }
      };
    });

  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/entityTitle/entityTitle.directive.js
  //--------------------------------------------------------------------------------------------------------------------

  "use strict";

  /**
   * @ngdoc overview
   * @name ysUiEntityTitle
   * @description
   * # EntityTitle
   *
   */

  module
    .directive('ysUiEntityTitle', function () {
      return {
        restrict: 'E',
        replace: true,
        scope: {
          title: '=',
          subTitle: '=',
          icon: '='
        },
        templateUrl: 'components/entityTitle/views/entityTitle.html'
      };
    });

  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/fileUploader/fileDelete.directive.js
  //--------------------------------------------------------------------------------------------------------------------

  'use strict';

  module
    .directive('ysUiFileDelete', function () {
      return {
        restrict: 'E',
        require: '^ysUiFileUploader',
        transclude: true,
        template: '<span ng-transclude class="ng-hide"></span>',
        replace: true,
        link: function ($scope, $element, _, fileUploaderController) {

          $scope.$watch(function () {
            return fileUploaderController.isFileUploaded();
          }, function (value) {
            if (value) {
              $element.removeClass('ng-hide');
            } else {
              $element.addClass('ng-hide');
            }
          });
          $element.on('click', function () {
            $scope.$apply(function () {
              fileUploaderController.deleteFile();
            });
          });
        }
      };
    });



  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/fileUploader/fileSelect.directive.js
  //--------------------------------------------------------------------------------------------------------------------

  'use strict';

  module
    .directive('ysUiFileSelect', ["$sanitize",
      function ($sanitize) {
        return {
          restrict: 'E',
          require: '^ysUiFileUploader',
          transclude: true,
          templateUrl: 'components/fileUploader/fileSelect.directive.html',
          replace: true,
          link: function ($scope, $element, $attrs, fileUploaderController) {
            $scope.selectedFileName = null;

            var fileElement = $element.children().eq(0);
            var transcludedElement = $element.children().eq(1);
            var fileNameElement = $element.children().eq(2);

            $scope.$watch(function () {
              return fileUploaderController.isFileUploaded();
            }, function (value) {
              if (value) {
                fileNameElement.html($sanitize(fileUploaderController.getFileName()));
                fileNameElement.removeClass('ng-hide');
                transcludedElement.addClass('ng-hide');
              } else {
                fileElement.val('');
                fileNameElement.addClass('ng-hide');
                transcludedElement.removeClass('ng-hide');
              }
            });

            $element.on('click', function () {
              fileElement[0].click();
            });


            fileElement.on('change', function (event) {
              var files = event.target.files;
              var fileObject = files.length > 0 ? files[0] : null;
              if (fileObject) {
                $scope.$apply(function () {
                  fileNameElement.html($sanitize(fileObject.name));
                  fileUploaderController.uploadFile(fileObject);
                });
              }
            });
          }
        };
      }
    ]);


  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/fileUploader/fileUploader.directive.js
  //--------------------------------------------------------------------------------------------------------------------

  'use strict';

  /**
   * this directive can select a file in local system and upload to the given remote server
   * @example
   * <pre>
   *  <ys-ui-file-uploader url="url" ng-model="file1" style="display:block;width: 300px;padding: 10px 10px;border: solid 1px #808080">
   *      <div style="font-size: x-large">
   *          {{title}}
   *      </div>
   *      <div>
   *          <ys-ui-file-select style="margin-left: 5px">
   *              {{selectFile}}
   *          </ys-ui-file-select>
   *
   *          <ys-ui-file-delete style="margin-left:5px">
   *              <a style="color: #0000ff;">{{delete}}</a>
   *          </ys-ui-file-delete>
   *      </div>
   *  </ys-ui-file-uploader>
   * </pre>
   */
  module
    .directive('ysUiFileUploader', ["$log", "$http",
      function ($log, $http) {
        return {
          restrict: 'E',
          require: ['ysUiFileUploader', 'ngModel'],
          transclude: true,
          template: '<span ng-transclude></span>',
          replace: true,
          controller: function () {},
          link: function ($scope, $element, $attrs, controllers) {

            var selfController = controllers[0];
            var ngModelController = controllers[1];
            var url = $scope.$eval($attrs.url);
            var id = $attrs.id || '';

            /**
             * upload file to the given url
             * @param file the html file object
             * @returns {promise<null>}
             * promise ges resolved if file upload succeed,otherwise it gets rejected
             */
            selfController.uploadFile = function (file) {
              $log.info('upload file:' + file.name + ' to url:' + url);

              var fd = new FormData();
              fd.append('file', file);

              selfController.beginUpload();
              return $http.post(url, fd, {
                  transformRequest: angular.identity,
                  headers: {
                    'Content-Type': undefined
                  }
                })
                .then(function () {
                  ngModelController.$setViewValue(file.name);
                  selfController.endUpload();
                }, selfController.failUpload);
            };

            /**
             * remove file from backend
             *
             * @returns {promise<null>}
             * promise gets resolved if file deletion succeed, otherwise it gets rejected
             */
            selfController.deleteFile = function () {
              selfController.beginDelete();
              $log.info('delete file:' + url);
              return $http.delete(url)
                .then(function () {
                  ngModelController.$setViewValue(null);
                  selfController.endDelete();
                }, selfController.failDelete);
            };

            selfController.localEmit = function (event, data) {
              if (id) {
                event = id + '.' + event;
              }
              $scope.$emit(event, data);
            };
            selfController.beginDelete = function () {
              selfController.localEmit('file-delete-begin');
            };
            selfController.endDelete = function () {
              selfController.localEmit('file-delete-success');
            };
            selfController.failDelete = function () {
              selfController.localEmit('file-delete-error');
            };


            selfController.beginUpload = function () {
              selfController.localEmit('file-upload-begin');
            };
            selfController.endUpload = function () {
              selfController.localEmit('file-upload-success');
            };
            selfController.failUpload = function () {
              selfController.localEmit('file-upload-error');
            };


            selfController.isFileUploaded = function () {
              return Boolean(ngModelController.$modelValue);
            };
            selfController.getFileName = function () {
              return ngModelController.$modelValue;
            };
          }
        };
      }
    ]);





  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/groupedList/groupedList.directive.js
  //--------------------------------------------------------------------------------------------------------------------

  "use strict";

  /**
   * @ngdoc overview
   * @name ysUiGroupedList
   * @description
   * # GroupedList
   * The component that displays a grouped data like following:
   *
   * <pre>
   * var data = [
   *  {
   *      date: '12-12-12',
   *      items: ['item 1', 'item 2', 'item 3']
   *  },
   *  {
   *      date: '11-11-11',
   *      items: ['item 1', 'item 2', 'item 3']
   *  }
   * ]
   * </pre>
   */

  module
    .directive('ysUiGroupedList', ["$compile",
      function ($compile) {
        return {
          restrict: 'E',
          compile: function (tElement, tAttrs) {
            var groupHeaderHtml, groupItemHtml, ngRepeat, compile;

            if (!tAttrs.model) {
              throw 'The model cannot be null';
            }

            if (tElement.find('group-header').length === 0) {
              throw 'Group header is not found';
            }

            if (tElement.find('group-item').length === 0) {
              throw 'Group item is not found';
            }

            groupHeaderHtml = tElement.find('group-header').html();
            groupItemHtml = tElement.find('group-item').html();

            ngRepeat = [
              '<ul class="ys-ui-grouped-list">',
              '    <li ng-repeat="header in ' + tAttrs.model + ' track by $index" class="ys-ui-grouped-list--group">',
              '        <div class="ys-ui-grouped-list--groupheader">', groupHeaderHtml, '</div>',
              '        <ul class="ys-ui-grouped-list--groupcontent">',
              '            <li ng-repeat="item in header.items track by $index" class="ys-ui-grouped-list--listitem">', groupItemHtml, '</li>',
              '        </ul>',
              '    </li>',
              '</ul>'
            ].join('\n');

            tElement.html('');
            tElement.append(ngRepeat);
            compile = $compile(tElement.contents());

            return function (scope) {
              compile(scope);
            };
          }
        };
      }
    ]);

  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/list/list.directive.js
  //--------------------------------------------------------------------------------------------------------------------

  'use strict';

  module
    .directive('ysUiList', function () {
      return {
        restrict: 'E',
        scope: true,
        controller: ["$scope", "$attrs", "GetSetModelService",
          function ($scope, $attrs, GetSetModelService) {
            var $parent = $scope.$parent;
            var model = GetSetModelService.makeAccessors($attrs.model);
            var name = $attrs.name;

            if (!model.read($parent)) {
              model.assign($parent, []);
            }

            function prependId(eventName) {
              return name ? (name + '.' + eventName) : eventName;
            }

            $scope.localOn = function (eventName, fn) {
              $scope.$on(prependId(eventName), fn);
            };

            $scope.localEmit = function (eventName, data) {
              $scope.$emit(prependId(eventName), data);
            };

            $scope.localBroadcast = function (eventName, data) {
              $scope.$broadcast(prependId(eventName), data);
            };

            $scope.localOn('add-item', function (e, item) {
              model.read($parent).push(item);
            });

            $scope.localOn('remove-item', function (e, item) {
              var index = model.read($scope).indexOf(item);
              if (index !== -1) {
                model.read($parent).splice(index, 1);
              }
            });

            $scope.elementName = $attrs.elementName || 'item';
          }
        ],
        compile: function compile(tElement, tAttrs) {
          var template = tElement.children();

          var resultArrayName = tAttrs.model;
          var arrayElementName = tAttrs.elementName || 'item';

          // wrap everything that is not 1-level deep
          // to make sure that we include the raw {{xxx}}
          if (!template.html()) {
            template = angular.element('<span>' + tElement.html() + '</span>');
          }

          var ngRepeat = angular.element('<div ng-repeat="' + arrayElementName + ' in ' + resultArrayName + ' track by $index" ></div>');

          ngRepeat.append(template);
          tElement.html('');
          tElement.append(ngRepeat);
        }
      };
    });

  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/list/behaviours/selection/multiSelectable.directive.js
  //--------------------------------------------------------------------------------------------------------------------

  'use strict';

  module
    .directive('ysUiMultiSelectable', function () {
      return {
        restrict: 'A',
        require: '^ysUiList',
        controller: ["$scope", "$attrs", "GetSetModelService", "$timeout",
          function ($scope, $attrs, GetSetModelService, $timeout) {
            var $parent = $scope.$parent;
            var model = GetSetModelService.makeAccessors($attrs.ysUiMultiSelectable);

            if (!model.read($parent)) {
              model.assign($parent, []);
            }

            // wait for the next digest in order to make sure that the
            // children were compiled
            $timeout(function () {
              var alreadySelected = model.read($parent);
              alreadySelected.forEach(function (item) {
                $scope.localBroadcast('select-item', item);
              });
            });

            $scope.localOn('item-selected', function (_, item) {
              if (model.read($parent).indexOf(item) === -1) {
                model.read($parent).push(item);
              }
            });

            $scope.localOn('item-unselected', function (_, item) {
              var index = model.read($parent).indexOf(item);
              if (index !== -1) {
                model.read($parent).splice(index, 1);
              }
            });
          }
        ]
      };
    });

  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/list/behaviours/selection/singleSelectable.directive.js
  //--------------------------------------------------------------------------------------------------------------------

  'use strict';

  module
    .directive('ysUiSingleSelectable', function () {
      return {
        restrict: 'A',
        require: '^ysUiList',
        controller: ["$scope", "$attrs", "$timeout", "GetSetModelService",
          function ($scope, $attrs, $timeout, GetSetModelService) {
            var $parent = $scope.$parent;
            var model = GetSetModelService.makeAccessors($attrs.ysUiSingleSelectable);

            // wait for the next digest in order to make sure that the
            // children were compiled
            $timeout(function () {
              if (model.read($parent)) {
                $scope.localBroadcast('select-item', model.read($parent));
              }
            });

            $scope.localOn('item-selected', function (_, item) {
              if (model.read($parent) !== item) {
                $scope.localBroadcast('unselect-item', model.read($parent));
                model.assign($parent, item);
              }
            });

            $scope.localOn('item-unselected', function (_, item) {
              if (model.read($parent) === item) {
                model.assign($parent, undefined);
              }
            });
          }
        ]
      };
    });

  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/listItem/action-list-item.directive.js
  //--------------------------------------------------------------------------------------------------------------------

  'use strict';

  /**
   * @ngdoc directive
   * @name ysUiActionListItem
   * @description
   * # ysUiActionListItem
   *
   * The list item that suppose to produce an action.
   *
   * @example
   * <ys-ui-action-list-item>
   *     <action name="move-item" icon="plus"></action>
   *     <ys-ui-generic-list-item>{{ item }}</ys-ui-generic-list-item>
   * </ys-ui-action-list-item>
   */
  module
    .directive('ysUiActionListItem', function () {
      return {
        restrict: 'E',
        templateUrl: 'components/listItem/views/action-list-item.html',
        transclude: true,
        replace: true
      };
    });

  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/listItem/generic-list-item.directive.js
  //--------------------------------------------------------------------------------------------------------------------

  'use strict';

  /**
   * @ngdoc overview
   * @name ysUiGenericListItem
   * @description
   * # ysUiGenericListItem
   *
   * The simplest, the very basic list item possible
   */
  module
    .directive('ysUiGenericListItem', function () {
      return {
        restrict: 'E',
        templateUrl: 'components/listItem/views/generic-list-item.html',
        transclude: true,
        replace: true
      };
    });

  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/listItem/behaviours/list-item-behaviours.service.js
  //--------------------------------------------------------------------------------------------------------------------

  'use strict';

  var eqByKeys = prelude.data.eq.eqByKeys;

  /**
   * @ngdoc overview
   * @name ysUiListItemBehavioursService
   * @description
   * # ysUiListItemBehavioursService
   *
   * Set of functions that describe the behaviour of list item
   */
  module
    .service('ysUiListItemBehavioursService', ["$rootScope",
      function ($rootScope) {

        this.domElement = function (angularElement) {
          return angularElement[0];
        };

        this.markElementSelected = function (elem, className) {
          this.domElement(elem).classList.add(className);
        };

        this.markElementUnselected = function (elem, className) {
          this.domElement(elem).classList.remove(className);
        };

        this.selectItem = function (className, elem, item, localScope) {
          this.markElementSelected(elem, className);
          if (localScope) {
            localScope.localEmit('item-selected', item);
          }
          $rootScope.$digest();
          return true;
        };

        this.unselectItem = function (className, elem) {
          this.markElementUnselected(elem, className);
          $rootScope.$digest();
          return false;
        };

        this.toggleSelected = function (selected, element, selectedClass, item, scope) {
          if (selected) {
            this.markElementUnselected(element, selectedClass);
          } else {
            this.markElementSelected(element, selectedClass);
          }

          scope.localEmit(
            (selected ? 'item-unselected' : 'item-selected'),
            item
          );

          $rootScope.$digest();
          return !selected;
        };

        this.makeEqualityFunction = function (trackBy) {
          if (trackBy === void 0 || typeof trackBy !== 'string') {
            return function (item, other) {
              return item === other;
            };
          }

          return function (item, other) {
            if (item && !item.hasOwnProperty(trackBy)) {
              return false;
            }
            if (other && !other.hasOwnProperty(trackBy)) {
              return false;
            }

            return eqByKeys([trackBy], item)(other);
          };
        };
      }
    ]);

  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/listItem/behaviours/localClickable/localClickable.directive.js
  //--------------------------------------------------------------------------------------------------------------------

  'use strict';

  module
    .directive('ysUiLocalClickable', ["$rootScope",
      function ($rootScope) {
        return {
          restrict: 'A',
          requires: '^ysUiList',
          link: function (scope, element, attrs) {
            var event = attrs.ysUiLocalClickable;

            element.on('click', function () {
              scope.localEmit(event, scope[scope.elementName]);
              $rootScope.$digest();
            });
          }
        };
      }
    ]);

  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/listItem/behaviours/selectable/selectable.directive.js
  //--------------------------------------------------------------------------------------------------------------------

  'use strict';

  module
    .directive('ysUiSelectable', ['ysUiListItemBehavioursService',
      function (Behaviour) {
        return {
          restrict: 'A',
          requires: '^ysUiList',
          link: function (scope, element, attrs) {
            var item = scope[scope.elementName];
            var selectedClass = attrs.ysUiSelectable || 'selected';
            var selected = false;

            var areEqual = Behaviour.makeEqualityFunction(attrs.trackBy);

            Behaviour.markElementUnselected(element, selectedClass);

            // of the item is programmatically selected
            scope.localOn('select-item', function (_, it) {
              if (areEqual(item, it) && !selected) {
                selected = Behaviour.selectItem(selectedClass, element, item, scope);
              }
            });

            // of the item is programmatically unselected
            scope.localOn('unselect-item', function (_, it) {
              if (areEqual(item, it) && selected) {
                selected = Behaviour.unselectItem(selectedClass, element);
              }
            });

            // the user clicks the item and selects it
            element.on('click', function () {
              if (!selected) {
                selected = Behaviour.selectItem(selectedClass, element, item, scope);
              }
            });
          }
        };
      }
    ]);

  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/listItem/behaviours/toggleSelectable/toggleSelectable.directive.js
  //--------------------------------------------------------------------------------------------------------------------

  'use strict';

  module
    .directive('ysUiToggleSelectable', ['ysUiListItemBehavioursService',
      function (Behaviour) {
        return {
          restrict: 'A',
          requires: '^ysUiList',
          link: function (scope, element, attrs) {
            var item = scope[scope.elementName];
            var selectedClass = attrs.ysUiToggleSelectable || 'selected';

            var areEqual = Behaviour.makeEqualityFunction(attrs.trackBy);

            var selected = false;

            Behaviour.markElementUnselected(element, selectedClass);

            // of the item is programmatically selected
            scope.localOn('select-item', function (_, it) {
              if (areEqual(item, it) && !selected) {
                selected = Behaviour.selectItem(selectedClass, element);
              }
            });

            // of the item is programmatically unselected
            scope.localOn('unselect-item', function (_, it) {
              if (areEqual(item, it) && selected) {
                selected = Behaviour.unselectItem(selectedClass, element);
              }
            });

            // the user clicks the item and selects it, here we toggle the selection
            element.on('click', function () {
              selected = Behaviour.toggleSelected(selected, element, selectedClass, item, scope);
            });
          }
        };
      }
    ]);

  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/organization/organization-list-item.directive.js
  //--------------------------------------------------------------------------------------------------------------------

  'use strict';

  /**
   * @ngdoc overview
   * @name ysUiOrganizationListItem
   * @description
   * # ysUiOrganizationListItem
   *
   * This is a component that can display an organisation in a list
   */
  module
    .directive('ysUiOrganizationListItem', function () {
      return {
        restrict: 'E',
        scope: {
          model: '='
        },
        templateUrl: 'components/organization/views/organization-list-item.html'
      };
    });

  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/pagingControl/pagingControl.directive.js
  //--------------------------------------------------------------------------------------------------------------------

  (function (angular) {
    'use strict';

    module
      .directive('ysUiPagingControl', function () {

        return {
          restrict: 'E',
          scope: {
            index: '=pageIndex',
            size: '=pageSize',
            maxItems: '='
          },
          templateUrl: 'components/pagingControl/views/pagingControl.view.html',
          controller: ["$scope",
            function ($scope) {
              $scope.previousPage = function () {
                if ($scope.index > 0) {
                  $scope.index--;
                }
              };

              $scope.nextPage = function () {
                if (($scope.index + 1) * $scope.size < $scope.maxItems) {
                  $scope.index++;
                }
              };
            }
          ]
        };
      });

  })(window.angular);

  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/pagingCountView/pagingCountView.directive.js
  //--------------------------------------------------------------------------------------------------------------------

  (function (angular) {
    'use strict';

    module
      .directive('ysUiPagingCountView', function () {
        return {
          restrict: 'E',
          scope: {
            pageIndex: '=',
            pageSize: '=',
            maxItems: '=',
            caption: '='
          },
          templateUrl: 'components/pagingCountView/pagingCountView.view.html',
          controller: ["$scope",
            function ($scope) {

              $scope.minShownIndex = function () {
                return $scope.pageIndex * $scope.pageSize + 1;
              };

              $scope.maxShownIndex = function () {
                var endOfPage = (1 + $scope.pageIndex) * $scope.pageSize;
                var max = $scope.maxItems;

                return Math.min(max, endOfPage);
              };
            }
          ]
        };
      });

  })(window.angular);

  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/person/person-list-item.directive.js
  //--------------------------------------------------------------------------------------------------------------------

  'use strict';

  /**
   * @ngdoc overview
   * @name ysUiPersonListItem
   * @description
   * # ysUiPersonListItem
   *
   * This is a components that can show a person in a list
   */
  module
    .directive('ysUiPersonListItem', function () {
      return {
        restrict: 'E',
        scope: {
          model: '='
        },
        templateUrl: 'components/person/views/person-list-item.html'
      };
    });

  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/queryBuilder/multiSort.directive.js
  //--------------------------------------------------------------------------------------------------------------------

  (function (angular) {
    'use strict';

    var A = prelude.data.array;

    module
      .directive('ysUiMultiSort', function () {
        return {
          restrict: 'A',
          requires: '^ysUiQueryBuilder',
          link: function (scope, element, attrs) {
            var sortKeys = (attrs.sortKeys || '').replace(/ /g, '');
            var sortOrders = (attrs.sortOrders || '').replace(/ /g, '');

            var sortKeysGetter = function () {
              return scope.$eval(sortKeys);
            };
            var sortOrdersGetter = function () {
              return scope.$eval(sortOrders);
            };

            scope.registerQueryModifier(function (query) {
              var keys = sortKeysGetter();
              var orders = sortOrdersGetter();

              if (!(keys || orders)) {
                return query;
              }

              if (!query.sortParameters) {
                query.sortParameters = [];
              }

              var sortItems = A.zipWith(function (key, order) {
                return {
                  key: key,
                  order: order
                };
              }, keys, orders);

              query.sortParameters = query.sortParameters.concat(sortItems);

              return query;
            });
          }
        };
      });
  })(window.angular);

  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/queryBuilder/page.directive.js
  //--------------------------------------------------------------------------------------------------------------------

  'use strict';

  module
    .directive('ysUiPage', function () {
      return {
        restrict: 'A',
        requires: '^ysUiQueryBuilder',
        link: function (scope, element, attrs) {
          var pageSize = (attrs.pageSize || '').replace(/ /g, '');
          var pageIndex = (attrs.pageIndex || '').replace(/ /g, '');

          var pageSizeGetter = function () {
            return scope.$eval(pageSize);
          };
          var pageIndexGetter = function () {
            return scope.$eval(pageIndex);
          };

          scope.registerQueryModifier(function (query) {
            query.pageSize = pageSizeGetter();
            query.pageIndex = pageIndexGetter();

            return query;
          });
        }
      };
    });

  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/queryBuilder/queryBuilder.directive.js
  //--------------------------------------------------------------------------------------------------------------------

  'use strict';

  module
    .directive('ysUiQueryBuilder', function () {

      var F = prelude.data.functions;

      return {
        restrict: 'E',
        scope: true,
        controller: ["$scope", "$attrs",
          function ($scope, $attrs) {
            var model = $attrs.model;
            var queryModifiers = [];

            $scope.registerQueryModifier = function (modifier) {
              queryModifiers.push(modifier);
            };

            $scope.$watch(
              function () {
                return queryModifiers.reduce(F.flip(F.apply), {});
              },
              function (query) {
                // the $parent scope is always present and always the user's scope
                $scope.$parent[model] = query;
              }, true
            );
          }
        ]
      };
    });

  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/queryBuilder/search.directive.js
  //--------------------------------------------------------------------------------------------------------------------

  'use strict';

  module
    .directive('ysUiSearch', function () {
      return {
        restrict: 'A',
        requires: '^ysUiQueryBuilder',
        link: function (scope, element, attrs) {
          var searchKey = (attrs.searchKey || '').replace(/ /g, '');
          var searchString = (attrs.searchString || '').replace(/ /g, '');

          var searchKeyGetter = function () {
            return scope.$eval(searchKey);
          };
          var searchStringGetter = function () {
            return scope.$eval(searchString);
          };

          scope.registerQueryModifier(function (query) {
            query.searchString = searchStringGetter();
            query.searchKey = searchKeyGetter();

            return query;
          });
        }
      };
    });

  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/queryBuilder/sort.directive.js
  //--------------------------------------------------------------------------------------------------------------------

  'use strict';

  module
    .directive('ysUiSort', function () {
      return {
        restrict: 'A',
        requires: '^ysUiQueryBuilder',
        link: function (scope, element, attrs) {
          var sortKey = (attrs.sortKey || '').replace(/ /g, '');
          var sortOrder = (attrs.sortOrder || '').replace(/ /g, '');

          var sortKeyGetter = function () {
            return scope.$eval(sortKey);
          };
          var sortOrderGetter = function () {
            return scope.$eval(sortOrder);
          };

          scope.registerQueryModifier(function (query) {
            var key = sortKeyGetter();
            var order = sortOrderGetter();

            if (!(key || order)) {
              return query;
            }

            if (!query.sortParameters) {
              query.sortParameters = [];
            }

            query.sortParameters.push({
              key: key,
              order: order
            });

            return query;
          });
        }
      };
    });

  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/searchField/search-field.directive.js
  //--------------------------------------------------------------------------------------------------------------------

  'use strict';

  /**
   * @ngdoc overview
   * @name ysUiSearchField
   * @description
   * # ysUiSearchField
   *
   * Search field
   */
  module
    .directive('ysUiSearchField', function () {
      return {
        restrict: 'E',
        scope: {
          model: '='
        },
        template: '<div class="ys-ui-search-field"><input class="ys-ui-search-field--input" ng-model="model"><i class="ys-ui-search-field--icon ys-icon-search"></i></div>'
      };
    });

  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/services/debouncer.factory.js
  //--------------------------------------------------------------------------------------------------------------------

  'use strict';

  module
    .factory('Debouncer', ["$timeout",
      function ($timeout) {
        return function Debouncer() {
          var timeoutPromise;

          /**
           * Creates a promise that will be resolved at the end of the given time,
           * or cancelled if another debounce was triggered before.
           *
           * @param timeoutDuration {number}
           * @returns {Promise}
           */
          this.debounce = function (timeoutDuration) {
            if (timeoutPromise) {
              $timeout.cancel(timeoutPromise);
            }

            timeoutPromise = $timeout(angular.noop, timeoutDuration);

            timeoutPromise.finally(function () {
              timeoutPromise = null;
            });

            return timeoutPromise;
          };
        };
      }
    ]);

  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/services/getSetModelService.js
  //--------------------------------------------------------------------------------------------------------------------

  'use strict';

  module
    .service('GetSetModelService', ["$parse", "$log",
      function ($parse, $log) {

        /**
         * Creates a object containing read and assign functions in order to get and set
         * the value of an expression in a given scope.
         *
         * throws an error if the expression is non-assignable.
         *
         * @param expression {string} expression to read and assign.
         * @param nonMandatory {boolean?} if false, then an error will be thrown if the expression is invalid or non assignable. If true,
         * setter and getter will be noops if then expression is invalid.
         * @returns {{get, set}} getter and setter for the given expression in a given scope.
         */
        this.makeAccessors = function (expression, nonMandatory) {
          var getter = $parse(expression);
          var setter = getter.assign;

          var accessors = {
            read: getter,
            assign: setter
          };

          if (!setter) {
            if (!nonMandatory) {
              throw new Error('Expression: "' + expression + '" is non-assignable.');
            } else {
              $log.warn('Expression: "' + expression + '" is non-assignable but nonMandatory is true, no error is thrown.');

              accessors.read = angular.noop;
              accessors.assign = angular.noop;
            }
          }

          return accessors;
        };

      }
    ]);

  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/services/guid.js
  //--------------------------------------------------------------------------------------------------------------------

  'use strict';

  /**
   * @ngdoc overview
   * @name ysUiDateTimePickerRangeController
   * @description
   * # ysUiDateTimePickerRangeController
   *
   */
  module
    .factory('ysUiGUID', function () {
      return function guid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
      };
    });

  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/services/moment.provider.js
  //--------------------------------------------------------------------------------------------------------------------

  'use strict';

  /**
   * @ngdoc overview
   * @name MomentJS provider
   * @description
   * # moment provider
   *
   * Easy and injectable way ot use momentJs
   */
  module
    .factory('moment', ["$window",
      function ($window) {
        return $window.moment;
      }
    ]);

  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/toggle/toggle-action.directive.js
  //--------------------------------------------------------------------------------------------------------------------

  'use strict';

  /**
   * to mark which element will be the event emitter
   *
   * @example
   * <pre>
   * <ys-ui-toggle model="selectedValue">
   *    <ys-ui-toggle-option value="'global'">
   *       <span ys-ui-toggle-action>Deutschland</span>
   *       <span>icon1</span>
   *    </ys-ui-toggle-option>
   *
   *    <ys-ui-toggle-option value="'territory'">
   *       <span ys-ui-toggle-action>Gebiet</span>
   *       <span>icon2</span>
   *    </ys-ui-toggle-option>
   *
   *    <ys-ui-toggle-option value="'organization'">
   *       <span ys-ui-toggle-action>Organisationen</span>
   *       <span>icon2</span>
   *    </ys-ui-toggle-option>
   * </ys-ui-toggle>
   * </pre>
   *
   * only the element with ys-ui-toggle-action attribute will be clickable
   */
  module
    .directive('ysUiToggleAction', function () {
      return {
        restrict: 'A',
        require: '^ysUiToggle',
        link: function ($scope, $element, $attrs, toggleController) {
          $element.on('click', function () {
            $scope.$apply(function () {
              toggleController.toggle();
            });
          });
        }
      };
    });



  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/toggle/toggle-option.directive.js
  //--------------------------------------------------------------------------------------------------------------------

  'use strict';

  /**
   *
   * @example
   * <pre>
   * <ys-ui-toggle model="selectedValue">
   *    <ys-ui-toggle-option value="'global'">
   *       <span ys-ui-toggle-action>Deutschland</span>
   *       <span>icon1</span>
   *    </ys-ui-toggle-option>
   *
   *    <ys-ui-toggle-option value="'territory'">
   *       <span ys-ui-toggle-action>Gebiet</span>
   *       <span>icon2</span>
   *    </ys-ui-toggle-option>
   *
   *    <ys-ui-toggle-option value="'organization'">
   *       <span ys-ui-toggle-action>Organisationen</span>
   *       <span>icon2</span>
   *    </ys-ui-toggle-option>
   * </ys-ui-toggle>
   * </pre>
   *
   * 3 options defined in above code
   */
  module
    .directive('ysUiToggleOption', function () {
      return {
        restrict: 'E',
        require: '^ysUiToggle',
        template: '<span></span>',
        replace: true,
        transclude: true,
        link: function ($scope, $element, $attrs, _, $transclude) {
          $transclude($scope, function (clone) {
            $element.append(clone);
          });

          $element.attr('option-value', $scope.$eval($attrs.value));
        }
      };
    });



  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/toggle/toggle.directive.js
  //--------------------------------------------------------------------------------------------------------------------

  (function (angular) {
    'use strict';

    /**
     * switch content from one to another
     *
     * @example
     * <pre>
     * <ys-ui-toggle model="selectedValue">
     *    <ys-ui-toggle-option value="'global'">
     *       <span ys-ui-toggle-action>Deutschland</span>
     *    </ys-ui-toggle-option>
     *
     *    <ys-ui-toggle-option value="'territory'">
     *       <span ys-ui-toggle-action>Gebiet</span>
     *    </ys-ui-toggle-option>
     *
     *    <ys-ui-toggle-option value="'organization'">
     *       <span ys-ui-toggle-action>Organisationen</span>
     *    </ys-ui-toggle-option>
     * </ys-ui-toggle>
     * </pre>
     *
     * the selected value 'global','territory' or 'organization' will be inserted into scope with the key 'selectedValue'
     */

    var array = prelude.data.array;

    module
      .directive('ysUiToggle', ["GetSetModelService",
        function (GetSetModelService) {
          return {
            template: '<span></span>',
            replace: true,
            transclude: true,
            restrict: 'E',
            controller: function () {},
            link: function ($scope, $element, $attrs, controller, $transclude) {
              var selectedIndex = -1;
              var model = GetSetModelService.makeAccessors($attrs.model);
              controller.toggle = function () {
                ++selectedIndex;
                if (selectedIndex >= $element.children().length) {
                  selectedIndex = 0;
                }
              };

              $scope.$watch(function () {
                return selectedIndex;
              }, function () {
                if (selectedIndex >= 0) {
                  var optionsElements = $element.children();
                  if (optionsElements.length > 0 && selectedIndex < optionsElements.length) {
                    optionsElements.addClass('ng-hide');
                    var selectedOptionElement = optionsElements.eq(selectedIndex);
                    selectedOptionElement.removeClass('ng-hide');
                    model.assign($scope, selectedOptionElement.attr('option-value'));
                  }
                }
              });

              $transclude($scope, function (clone) {
                $element.append(clone);
              });

              $scope.$watch($attrs.model, function (model) {
                selectedIndex = 0;
                var maybe = array.findFirstIndex(function (optionElement) {
                  return angular.element(optionElement).attr('option-value') === model;
                }, $element.children());
                if (maybe.isDefined()) {
                  selectedIndex = maybe.get();
                }
              });
            }
          };
        }
      ]);
  }(window.angular));


  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/wizard-progress-step-indicator/wizard-progress-step-indicator.directive.js
  //--------------------------------------------------------------------------------------------------------------------

  'use strict';

  /**
   * @ngdoc overview
   * @name ysUiWizardProgressStepIndicator
   * @description
   * # ysUiWizardProgressStepIndicator
   *
   */
  module
    .directive('ysUiWizardProgressStepIndicator', function () {
      return {
        restrict: 'E',
        replace: true,
        scope: {
          stepsDefinition: '='
        },
        templateUrl: 'components/wizard-progress-step-indicator/views/template.html',
        link: function (scope) {
          scope.$watch('stepsDefinition', function (definition, oldDefinition) {
            if (!definition && definition === oldDefinition) {
              return;
            }
            scope.mappedSteps = definition.steps.map(function (step, index) {
              return {
                name: step,
                isActive: scope.stepsDefinition.current === index,
                isCompleted: scope.stepsDefinition.current >= index
              };
            });
          });
        }
      };
    });

  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/wizard-progress-step-indicator/wizard-progress-step-indicator.filter.js
  //--------------------------------------------------------------------------------------------------------------------

  'use strict';

  /**
   * @ngdoc overview
   * @name ysUiWizardProgressStepIndicator
   * @description
   * # ysUiWizardProgressStepIndicator
   *
   */
  module

  .filter('wizardStep', function () {

    return function (step) {

      var res = [];

      if (step.isActive) {
        res.push('ys-ui-wpsi--step__active');
      }

      if (step.isCompleted) {
        res.push('ys-ui-wpsi--step__completed');
      }

      return res;
    };

  });

  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/yesNo/yesNo.controller.js
  //--------------------------------------------------------------------------------------------------------------------

  "use strict";

  /**
   * @ngdoc overview
   * @name ysUiYesNo Controller
   * @description
   * # YesNo Controller
   *
   */

  module
    .controller('ysUiYesNoCtrl', ["$scope",
      function ($scope) {
        this.setYes = function () {
          $scope.model = true;
        };
        this.setNo = function () {
          $scope.model = false;
        };
      }
    ]);

  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/yesNo/yesNo.directive.js
  //--------------------------------------------------------------------------------------------------------------------

  "use strict";

  /**
   * @ngdoc overview
   * @name ysUiYesNo
   * @description
   * # YesNo
   *
   */

  module
    .directive('ysUiYesNo', function () {
      return {
        restrict: 'E',
        scope: {
          model: '='
        },
        controller: 'ysUiYesNoCtrl',
        controllerAs: 'ynCtrl',
        templateUrl: 'components/yesNo/views/yesNo.html'
      };
    });

  //--------------------------------------------------------------------------------------------------------------------
  // File: .tmp/components/yesNo/yesNo.filter.js
  //--------------------------------------------------------------------------------------------------------------------

  'use strict';

  /**
   * @ngdoc demo
   * @name YesNoState Filter
   * @description
   * # YesNo Filter
   *
   * The filter for the class depending on model state
   */

  module
    .filter('yesNoState', function () {
      return function (valueFromModel, valueThatHasToBe) {
        if (typeof valueFromModel === 'undefined') {
          return 'ys-ui-text-gray-light';
        }
        return valueThatHasToBe === true ?
          Boolean(valueFromModel) === true ? 'ys-ui-text-green-main' : 'ys-ui-text-gray-light' :
          Boolean(valueFromModel) === false ? 'ys-ui-text-red-main' : 'ys-ui-text-gray-light';
      };
    });


})(angular.module('ys.components', ['ys-ui-components-tpls', 'ngSanitize']));
