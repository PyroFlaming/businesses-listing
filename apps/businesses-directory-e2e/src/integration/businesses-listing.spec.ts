describe('businesses-directory', () => {
  before(() => cy.visit('/'));

  it('should display list of businesses', () => {
    cy.get('body').find('[e2e-business-item]');
  });

  it('should navigate to business Camido id:9843406486', () => {
    cy.get('[e2e-business-item="9843406486"]').click();

    cy.get('[e2e-business-view="9843406486"]');
  });
});
