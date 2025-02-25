describe('Testing toast', () => {
	it('should display the toast message when the user logs in successfully', () => {
		cy.fixture('users').then((users) => {
			const defaultUser = users.defaultUser;
			console.log(defaultUser);

			cy.visit('/login');
			cy.get('input#username').type(defaultUser.username);
			cy.get('input#password').type(defaultUser.password);

			cy.get('[data-testid="login-form-submit-btn"]').click();

			cy.get('.toast-message--success').should('be.visible');
		});
	});
});
