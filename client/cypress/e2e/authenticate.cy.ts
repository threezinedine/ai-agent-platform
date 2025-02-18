import { Random } from '../utils';

describe('Testing Authentication Feature', () => {
	it('should register user with some restrictions on the fields', () => {
		cy.visit('/register');

		const testUsername = Random(15);
		const testPassword = Random(15);

		const usernameInput = cy.get('input[data-testid="username"]');

		usernameInput.type('test').blur();
		cy.contains('Username must be at least 8 characters long').should(
			'be.visible'
		);

		usernameInput.clear().type(testUsername).blur();
		cy.contains('Username must be at least 8 characters long').should(
			'not.exist'
		);

		const passwordInput = cy.get('input[data-testid="password"]');
		passwordInput.type('test').blur();
		cy.contains('Password must be at least 8 characters long').should(
			'be.visible'
		);
		// check password input has type password
		cy.get('input#password').should('have.attr', 'type', 'password');

		passwordInput.clear().type(testPassword).blur();
		cy.contains('Password must be at least 8 characters long').should(
			'not.exist'
		);

		const confirmPasswordInput = cy.get(
			'input[data-testid="confirm-password"]'
		);
		confirmPasswordInput.type(testUsername).blur();
		cy.contains('Passwords do not match').should('be.visible');

		confirmPasswordInput.clear().type(testPassword).blur();
		cy.contains('Passwords do not match').should('not.exist');
		cy.get('input#confirm-password').should(
			'have.attr',
			'type',
			'password'
		);

		cy.get('[data-testid="register-form-submit-btn"]').click();

		cy.wait(500);
		cy.visit('/login');

		const loginUsernameInput = cy.get('input#username');
		loginUsernameInput.focus();
		cy.wait(100);
		loginUsernameInput.blur();
		cy.contains('Username is required').should('be.visible');

		cy.get('[data-testid="login-form-submit-btn"]').click();
		cy.contains('Password is required').should('be.visible');

		loginUsernameInput.type(testUsername).blur();
		cy.contains('Username is required').should('not.exist');

		cy.get('input[data-testid="password"]').type(testPassword).blur();
		cy.contains('Password is required').should('not.exist');

		cy.get('[data-testid="login-form-submit-btn"]').click();

		cy.visit('/dashboard');
		cy.wait(500);
		cy.url().should('include', '/dashboard');
	});

	it('should return to login page if user is not authenticated', () => {
		cy.visit('/dashboard');
		cy.wait(100);
		cy.url().should('include', '/login');
	});

	it('should can see the dashboard page if user is authenticated', () => {
		cy.visit('/login');

		cy.fixture('users').then((users) => {
			const defaultUser = users.defaultUser;

			cy.get('input#username').type(defaultUser.username);
			cy.get('input#password').type(defaultUser.password);
			cy.get('[data-testid="login-form-submit-btn"]').click();

			cy.visit('/dashboard');
			cy.wait(500);
			cy.url().should('include', '/dashboard');
		});
	});
});
