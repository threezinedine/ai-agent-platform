import { Random } from '../utils';

describe('Profile testing', () => {
	it('should so nothing except username at the first time login profile page', () => {
		const username = Random(12);
		const password = Random(12);

		cy.visit('/register');
		cy.get('input[data-testid="username"]').type(username);
		cy.get('input[data-testid="password"]').type(password);
		cy.get('input[data-testid="confirm-password"]').type(password);

		cy.get('[data-testid="register-form-submit-btn"]').click();

		cy.visit('/login');
		cy.get('input[data-testid="username"]').type(username);
		cy.get('input[data-testid="password"]').type(password);
		cy.get('[data-testid="login-form-submit-btn"]').click();

		cy.visit('/profile');

		cy.get('input[data-testid="username"]')
			.should('have.value', username)
			.should('have.attr', 'readonly');
	});
});
