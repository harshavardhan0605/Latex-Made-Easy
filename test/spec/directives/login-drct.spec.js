'use strict';
describe('Directive: login', function() {

  // load the directive's module
  beforeEach(module('latexmadeeasyApp'));

  let element, scope;

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function($compile) {
    element = angular.element('<login></login>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('');
  }));
});
