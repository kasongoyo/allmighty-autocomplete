/* --- Made by justgoscha and licensed under MIT license --- */

var app = angular.module('autocomplete', []);

app.directive('autocomplete', function() {
    var index = -1;

    return {
        restrict: 'E',
        scope: {
            searchParam: '=ngModel',
            suggestions: '=data',
            suggestionKey: '@key',
            onType: '=onType',
            onSelect: '=onSelect',
            autocompleteRequired: '=',
            noAutoSort: '=noAutoSort',
            enableSearchTool: '@',
            showSearchTools: '=?',
            size: '@?'
        },
        transclude: true,
        controller: ['$scope', function($scope) {
            // the index of the suggestions that's currently selected
            $scope.selectedIndex = -1;

            $scope.initLock = true;

            // set new index
            $scope.setIndex = function(i) {
                $scope.selectedIndex = parseInt(i);
            };

            this.setIndex = function(i) {
                $scope.setIndex(i);
                $scope.$apply();
            };

            $scope.getIndex = function(i) {
                return $scope.selectedIndex;
            };

            // watches if the parameter filter should be changed
            var watching = true;

            // autocompleting drop down on/off
            $scope.completing = false;

            //show search tools panel
            $scope.showSearchTools = false;

            $scope.activateSearchTools = function() {
                $scope.showSearchTools = true;
            }

            // starts autocompleting on typing in something
            $scope.$watch('searchParam', function(newValue, oldValue) {

                if (oldValue === newValue || (!oldValue && $scope.initLock)) {
                    return;
                }

                if (watching && typeof $scope.searchParam !== 'undefined' && $scope.searchParam !== null) {
                    $scope.completing = true;
                    $scope.searchFilter = $scope.searchParam;
                    $scope.selectedIndex = -1;
                }

                // function thats passed to on-type attribute gets executed
                if ($scope.onType)
                    $scope.onType($scope.searchFilter);
            });

            // for hovering over suggestions
            // this.preSelect = function(suggestion) {

            // watching = false;

            // this line determines if it is shown
            // in the input field before it's selected:
            // $scope.searchParam = suggestion;

            // $scope.$apply();
            // watching = true;

            // };

            // $scope.preSelect = this.preSelect;

            // this.preSelectOff = function() {
            //     watching = true;
            // };

            // $scope.preSelectOff = this.preSelectOff;

            // selecting a suggestion with RIGHT ARROW or ENTER
            $scope.select = function(suggestion) {
                if (suggestion) {
                    if(typeof suggestion === 'object'){
                        $scope.searchParam = suggestion[$scope.suggestionKey];
                    }else{
                        $scope.searchParam = suggestion;
                    }
                    
                    $scope.searchFilter = suggestion;
                    if ($scope.onSelect)
                        $scope.onSelect(suggestion);
                }
                watching = false;
                $scope.completing = false;
                setTimeout(function() { watching = true; }, 1000);
                $scope.setIndex(-1);
            };


        }],
        link: function(scope, element, attrs) {
            setTimeout(function() {
                scope.initLock = false;
                scope.$apply();
            }, 250);

            var attr = '';

            // Default atts
            scope.attrs = {
                "placeholder": "start typing...",
                "class": "",
                "id": "",
                "inputclass": "",
                "inputid": ""
            };

            for (var a in attrs) {
                attr = a.replace('attr', '').toLowerCase();
                // add attribute overriding defaults
                // and preventing duplication
                if (a.indexOf('attr') === 0) {
                    scope.attrs[attr] = attrs[a];
                }
            }

            //search box size
            if (scope.size) {
                switch (scope.size) {
                    case 'large':
                        scope.attrs['size'] = 'acSearchBox--large';
                        break;
                    case 'big':
                        scope.attrs['size'] = 'acSearchBox--big';
                        break;
                    default:
                        scope.attrs['size'] = '';
                }
            }

            if (attrs.clickActivation) {
                var inputField = element[0].querySelector('.acSearchBox__input');
                inputField.onclick = function(e) {
                    if (!scope.searchParam) {
                        setTimeout(function() {
                            scope.completing = true;
                            scope.$apply();
                        }, 200);
                    }
                };
            }

            var key = { left: 37, up: 38, right: 39, down: 40, enter: 13, esc: 27, tab: 9 };

            document.addEventListener("keydown", function(e) {
                var keycode = e.keyCode || e.which;

                switch (keycode) {
                    case key.esc:
                        // disable suggestions on escape
                        scope.select();
                        scope.setIndex(-1);
                        scope.$apply();
                        e.preventDefault();
                }
            }, true);

            document.addEventListener("blur", function(e) {
                // disable suggestions on blur
                // we do a timeout to prevent hiding it before a click event is registered
                setTimeout(function() {
                    scope.select();
                    scope.setIndex(-1);
                    scope.$apply();
                }, 150);
            }, true);

            element[0].addEventListener("keydown", function(e) {
                var keycode = e.keyCode || e.which;

                // var l = angular.element(this).find('li').length;
                var l = element[0].querySelectorAll('.autocomplete__suggestion').length;
                // this allows submitting forms by pressing Enter in the autocompleted field
                if (!scope.completing || l == 0) return;

                // implementation of the up and down movement in the list of suggestions
                switch (keycode) {
                    case key.up:

                        index = scope.getIndex() - 1;
                        if (index < -1) {
                            index = l - 1;
                        } else if (index >= l) {
                            index = -1;
                            scope.setIndex(index);
                            // scope.preSelectOff();
                            break;
                        }
                        scope.setIndex(index);

                        // if (index !== -1)
                        //     scope.preSelect(angular.element(element[0].querySelectorAll('.autocomplete__suggestion')[index]).text());

                        scope.$apply();

                        break;
                    case key.down:
                        index = scope.getIndex() + 1;
                        if (index < -1) {
                            index = l - 1;
                        } else if (index >= l) {
                            index = -1;
                            scope.setIndex(index);
                            // scope.preSelectOff();
                            scope.$apply();
                            break;
                        }
                        scope.setIndex(index);

                        if (index !== -1) {
                            // scope.preSelect(angular.element(element[0].querySelectorAll('.autocomplete__suggestion')[index]).text());
                        }
                        scope.$apply();

                        break;
                    case key.left:
                        break;
                    case key.right:
                    case key.enter:
                    case key.tab:

                        index = scope.getIndex();
                        // scope.preSelectOff();
                        if (index !== -1) {
                            scope.select(angular.element(element[0].querySelectorAll('.autocomplete__suggestion')[index]).text());
                            if (keycode == key.enter) {
                                e.preventDefault();
                            }
                        } else {
                            if (keycode == key.enter) {
                                scope.select();
                            }
                        }
                        scope.setIndex(-1);
                        scope.$apply();

                        break;
                    case key.esc:
                        // disable suggestions on escape
                        scope.select();
                        scope.setIndex(-1);
                        scope.$apply();
                        e.preventDefault();
                        break;
                    default:
                        return;
                }

            });
        },
        templateUrl: 'autocomplete.html'
    };
});

app.filter('highlight', ['$sce', function($sce) {
    return function(input, searchParam, highlightKey) {
        if (typeof input === 'function') return '';
        if (typeof input === 'object') input = input[highlightKey]
        if (searchParam) {
            var words;
            if (typeof searchParam === 'object') {
                words = '(' +
                    searchParam[highlightKey].split(/\ /).join(' |') + '|' +
                    searchParam[highlightKey].split(/\ /).join('|') +
                    ')',
                    exp = new RegExp(words, 'gi');
            } else {
                words = '(' +
                    searchParam.split(/\ /).join(' |') + '|' +
                    searchParam.split(/\ /).join('|') +
                    ')',
                    exp = new RegExp(words, 'gi');
            }

            if (words.length) {
                input = input.replace(exp, "<span class=\"highlight\">$1</span>");
            }
        }
        return $sce.trustAsHtml(input);
    };
}]);

app.directive('suggestion', function() {
    return {
        restrict: 'A',
        require: '^autocomplete', // ^look for controller on parents element
        link: function(scope, element, attrs, autoCtrl) {
            element.bind('mouseenter', function() {
                // autoCtrl.preSelect(attrs.val);
                autoCtrl.setIndex(attrs.index);
            });

            element.bind('mouseleave', function() {
                // autoCtrl.preSelectOff();
                autoCtrl.setIndex(-1);
            });
        }
    };
});

app.directive('showFocus', function($timeout) {
    return function(scope, element, attrs) {
        scope.$watch(attrs.showFocus,
            function(newValue) {
                $timeout(function() {
                    newValue && element[0].focus();
                });
            }, true);
    };
});
