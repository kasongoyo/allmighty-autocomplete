angular.module('autocomplete').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('autocomplete.html',
    "<div class=\"autocomplete\">\n" +
    "    <div class=\"autocomplete__searchBox {{ attrs.inputclass }}\" ng-class=\"{'autocomplete__searchBox--focus':focusSearchBox}\">\n" +
    "        <input type=\"text\" class=\" autocomplete__inputField {{ attrs.inputclass }}\" ng-model=\"searchParam\" placeholder=\"{{ attrs.placeholder }}\" tabindex=\"{{ attrs.tabindex }}\" id=\"{{ attrs.inputid }}\" name=\"{{ attrs.name }}\" ng-required=\"{{ autocompleteRequired }}\" ng-focus=\"focusSearchBox = true; showSearchTools = false\" ng-blur=\"focusSearchBox = false\" show-focus=\"focusSearchBox\" />\n" +
    "        <span class=\"autocomplete__clearBtn\" ng-show=\"searchParam\" title=\"Clear\" ng-click=\"focusSearchBox = true; searchParam=undefined\">&#10005</span>\n" +
    "        <span class=\"autocomplete__searchToolsBtnIcon\" title=\"Search options\" ng-click=\"showSearchTools = !showSearchTools; completing=false\" ng-show=\"enableSearchTool\">&#9662</span>\n" +
    "    </div>\n" +
    "    <div class=\"autocomplete__suggestions\" ng-if=\"!showSearchTools\">\n" +
    "        <div ng-if=\"!noAutoSort\" ng-show=\"completing && (suggestions | filter:searchFilter).length > 0\">\n" +
    "            <div class=\"autocomplete__suggestion\" suggestion ng-repeat=\"suggestion in suggestions | filter:searchFilter | orderBy:'toString()' track by $index\" index=\"{{ $index }}\" val=\"{{ suggestion }}\" ng-class=\"{ 'is-active': ($index === selectedIndex), 'autocomplete__suggestion--last': $last }\" ng-click=\"select(suggestion)\" ng-bind-html=\"suggestion | highlight:searchParam\">\n" +
    "            </div>\n" +
    "            <div class=\"autocomplete__searchToolsBtn\" title=\"Click to see more search tools\" ng-hide=\"searchParam || !enableSearchTool\" ng-click=\"activateSearchTools()\">More search tools\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div ng-if=\"noAutoSort\" ng-show=\"completing && (suggestions | filter:searchFilter).length > 0\">\n" +
    "            <div class=\"autocomplete__suggestion\" suggestion ng-repeat=\"suggestion in suggestions | filter:searchFilter track by $index\" index=\"{{ $index }}\" val=\"{{ suggestion }}\" ng-class=\"{ 'is-active': ($index === selectedIndex), 'autocomplete__suggestion--last': $last }\" ng-click=\"select(suggestion)\" ng-bind-html=\"suggestion | highlight:searchParam\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"autocomplete__searchTools\" ng-if=\"enableSearchTool && showSearchTools\" ng-transclude>\n" +
    "    </div>\n" +
    "</div>\n"
  );

}]);
