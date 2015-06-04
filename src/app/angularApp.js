
import _ from 'lodash';
import angular from 'angular';
import hljs from 'highlightjs';

class SourceCodeView {

    constructor($http) {
        this.$http = $http;
    }

    definition() {
        return {
            scope: {
                type: '@',
                ref: '@'
            },
            link: this.link.bind(this)
        };
    }

    link(scope, element, attrs) {
        var preElem = angular.element("<pre></pre>");
        preElem.addClass("hljs-pre");
        var codeElem = angular.element("<code></code>");
        if(scope.type) {
            codeElem.addClass(scope.type);
        }
        preElem.append(codeElem);
        element.append(preElem);

        if(scope.ref) {
            this.$http({
                method: 'GET',
                url: scope.ref
            }).then((result) => {
                var code = this.formatCode(result.data);
                codeElem.text(code);
                hljs.highlightBlock(codeElem.get(0));
            });
        }
        else {
            codeElem.text("No source specified.");
        }
    }

    formatCode(code) {
        var displayLines = false;
        var displayMatch = /__display__/;
        var formattedCode = _(code.split(/\r*\n/g))
            .map(function(t) {
                return t.replace(/^\s+/, function(m) {
                    var newLength = Math.floor(m.length / 2);
                    return new Array(newLength+1).join(" ");
                });
            })
            .map(function(t) {
                if(displayMatch.test(t)) {
                    displayLines = !displayLines;
                }
                else if(displayLines) {
                    return t;
                }
            })
            .filter(function(t) {
                return _.isString(t);
            })
            .value()
            .join("\n");
        return formattedCode;
    }

    static directiveDefinition($http) {
        var sourceCodeView = new SourceCodeView($http);
        return sourceCodeView.definition();
    }
}

var presApp = angular.module('presApp', [])
    .directive('sourceCodeView', [
        '$http',
        SourceCodeView.directiveDefinition
    ]);

class AngularApp {
    bootstrap() {
        angular.bootstrap(document, ['presApp']);
    }
}

export default new AngularApp();
