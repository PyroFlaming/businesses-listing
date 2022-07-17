describe('businesses-directory', () => {
  before(() => cy.visit('/business/9843406486'));
  it('should open Camido id:9843406486', () => {
    cy.get('body').find('[e2e-business-view="9843406486"]');
  });

  it('should have 3 nearby places', () => {
    cy.get('[e2e-nearby-business]').should("have.length", 3);
  });
});
