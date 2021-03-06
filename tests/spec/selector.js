jasmine.getFixtures().fixturesPath = 'fixtures';

describe('Lean selector', function() {

  beforeEach(function() {
    loadFixtures('fixtures.html')
  });

  describe('with single ID selector', function() {

    it('should find the element by id.',
      function() {
        expect(lean.cq('#pageHeader'))
          .toBe(document.getElementById('pageHeader'));
      });
    it('should give null on unknown id.', function() {
      expect(lean.cq('#unknown')).toBeNull();
    });
    it('should handle given context (ignoring)', function() {
      expect(lean.cq('#pageHeader', document.body))
          .toBe(document.getElementById('pageHeader'));
    });
  });

  describe('with single CLASS selector', function() {

    it('should find the lonely sidebar.', function() {
      var result = lean.cq('.sidebar');
      expect(result.length).toEqual(1);
      expect(result[0]).toBe(document.getElementById('page-sidebar'));
    });

    it('should find exactly four sideboxes.', function() {
      expect(lean.cq('.sidebox').length).toEqual(4);
    });

    it('should give empty HTMLCollection with class sidenav.', function() {
      expect(lean.cq('.sidenav').length).toEqual(0);
    });
  });

  describe('with single ELEMENT selector', function() {

    it('should find the lonely aside.', function() {
      var result = lean.cq('aside');
      expect(result.length).toEqual(1);
      expect(result[0]).toBe(document.getElementById('page-sidebar'));
    });

    it('should find exactly four header elements.', function() {
      expect(lean.cq('header').length).toEqual(4);
    });

    it('should give empty HTMLCollection searching for form tags.',
      function() {
        expect(lean.cq('form').length).toEqual(0);
      });
  });
});
