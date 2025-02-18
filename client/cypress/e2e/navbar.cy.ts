describe('Navbar Testing', () => {
	it('should navigate to the home page when clicking the logo', () => {
		cy.visit('/login');

		cy.get('[data-testid=logo]').click();

		cy.url().should('include', '/');
		cy.url().should('not.include', '/login');
	});
});
