describe('DomElem service', function() {
  'use strict';

  var DomElement;

  beforeEach(module('uiBuilderApp'));

  beforeEach(inject(function(_DomElem_) {
    DomElement = _DomElem_;
  }));

  it('should be available', function() {
    expect(DomElement).toBeDefined();
  });

  it('should be able to say true for H1 element can have children', function() {
    var elem = document.createElement('H1');
    expect(DomElement.canHaveChildren(elem)).toEqual(true);
  });

  it('should return false for IMG element can have children', function() {
    var elem = document.createElement('IMG');
    expect(DomElement.canHaveChildren(elem)).toEqual(false);
  });

  it('should return true if element has children (is parent)', function() {
    var elem = document.createElement('H1'),
      img = document.createElement('img');
    elem.appendChild(img);

    expect(DomElement.isParent(elem)).toEqual(true);
  });

  it('should return true if element has children (is parent)', function() {
    var elem = document.createElement('H1');

    expect(DomElement.isParent(elem)).toEqual(false);
  });

  it('should return true in case innerText for the element can be changed', function() {
    var elem = document.createElement('H1');

    expect(DomElement.canChangeInnerText(elem)).toEqual(true);
  });

  it('should return false for canChangeInnerText for the element with children', function() {
    var elem = document.createElement('H1'),
      img = document.createElement('img');
    elem.appendChild(img);

    expect(DomElement.canChangeInnerText(elem)).toEqual(false);
  });

  it('should determine if element contains a param', function() {
    var elem = document.createElement('H1');

    elem.uibParams = [{
      name: 'a',
      value: 1
    }];

    expect(DomElement.containUIBParam(elem.uibParams, 'a')).toEqual(true);
    expect(DomElement.containUIBParam(elem.uibParams, 'b')).toEqual(false);
  });

  it('should set proper class value to elem params while preparing the element for editing', function() {
    var elem = document.createElement('H1');
    elem.classList.add('a');
    DomElement.prepareElemPropsToEdit(elem);
    expect(elem.uibParams).toEqual([{
      name: 'Class',
      attr: 'class',
      value: 'a',
      inUse: true
    }, {
      name: 'Inner text',
      domAttr: 'innerText',
      value: '',
      inUse: undefined
    }]);
  });

  it('should set attribute to the element when it is in use', function() {
    var elem = document.createElement('H1');
    DomElement.setAttr(elem, 'class', 'a', true);
    expect(elem.classList.contains('a')).toEqual(true);
  });

  it('should set attribute to the element when it is in use', function() {
    var elem = document.createElement('H1');
    DomElement.setAttr(elem, 'class', 'a', false);
    expect(elem.classList.length).toEqual(0);
  });

});
