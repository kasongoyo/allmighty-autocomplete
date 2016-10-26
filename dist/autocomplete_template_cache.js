angular.module('autocomplete').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('autocomplete.html',
    "<div class=\"autocomplete\">\n" +
    "    <div class=\"acSearchBox {{ attrs.size }} {{ attrs.inputclass }}\" ng-class=\"{'acSearchBox--focus':focusSearchBox}\">\n" +
    "        <input type=\"text\" class=\"acSearchBox__input\" ng-model=\"searchParam\" placeholder=\"{{ attrs.placeholder }}\" tabindex=\"{{ attrs.tabindex }}\" id=\"{{ attrs.inputid }}\" name=\"{{ attrs.name }}\" ng-required=\"{{ autocompleteRequired }}\" ng-focus=\"focusSearchBox = true; showSearchTools = false\" ng-blur=\"focusSearchBox = false\" show-focus=\"focusSearchBox\" />\n" +
    "        <i class=\"acSearchBox__clearTextIcon\" ng-show=\"searchParam\" title=\"Clear\" ng-click=\"focusSearchBox = true; searchParam=undefined\">&#215</i>\n" +
    "        <i class=\"acSearchBox__dropdownIcon\" title=\"Search options\" ng-click=\"showSearchTools = !showSearchTools; completing=false\" ng-show=\"enableSearchTool\">\n" +
    "        &#9660</i>\n" +
    "    </div>\n" +
    "    <div class=\"autocomplete__suggestions\" ng-if=\"!showSearchTools\">\n" +
    "        <div ng-if=\"!noAutoSort\" ng-show=\"completing && (suggestions | filter:searchFilter).length > 0\">\n" +
    "            <div class=\"autocomplete__suggestion\" suggestion ng-repeat=\"suggestion in suggestions | filter:searchFilter | orderBy:'toString()' track by $index\" index=\"{{ $index }}\" val=\"{{ suggestion }}\" ng-class=\"{ 'is-active': ($index === selectedIndex), 'autocomplete__suggestion--last': $last }\" ng-click=\"select(suggestion)\" ng-bind-html=\"suggestion | highlight:searchParam\">\n" +
    "            </div>\n" +
    "            <div class=\"autocomplete__searchToolsBtn\" title=\"Click to see more search tools\" ng-hide=\"!enableSearchTool\" ng-click=\"activateSearchTools()\">More search tools\n" +
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
