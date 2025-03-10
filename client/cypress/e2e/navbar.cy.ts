describe('Navbar Testing', () => {
	it('should navigate to the home page when clicking the logo', () => {
		cy.visit('/login');

		cy.get('[data-testid=logo]').click();

		cy.url().should('include', '/home');
		cy.url().should('not.include', '/login');
	});

	it('should navigate to the login page when clicking the login button', () => {
		cy.visit('/home');

		cy.get('[data-testid=login]').click();

		cy.url().should('include', '/login');
		cy.url().should('not.include', '/home');
	});

	it('should navigate to the register page when clicking the register button', () => {
		cy.visit('/home');

		cy.get('[data-testid=register]').click();

		cy.url().should('include', '/register');
		cy.url().should('not.include', '/home');
		cy.get('[data-testid=user').should('not.exist');
	});

	it('should have no login or register button on dashboard page', () => {
		cy.fixture('users').then((users) => {
			cy.visit('/login');

			cy.get('[data-testid=username]').type(users.defaultUser.username);
			cy.get('[data-testid=password]').type(users.defaultUser.password);

			cy.get('[data-testid=login-form-submit-btn]').click();

			cy.visit('/dashboard');

			cy.get('[data-testid=login]').should('not.exist');
			cy.get('[data-testid=register]').should('not.exist');
			cy.get(`[data-testid=${users.defaultUser.username}]`).should(
				'exist'
			);
		});
	});

	it('should logout and return to the home page when clicking the logout button', () => {
		cy.fixture('users').then((users) => {
			cy.visit('/login');

			cy.get('[data-testid=username]').type(users.defaultUser.username);
			cy.get('[data-testid=password]').type(users.defaultUser.password);

			cy.get('[data-testid=login-form-submit-btn]').click();

			cy.visit('/dashboard');

			cy.get('[data-testid=user-menu-trigger]').click();
			cy.get('[data-testid=logout]').click();

			cy.url().should('include', '/home');
			cy.url().should('not.include', '/dashboard');

			cy.visit('/dashboard');
			cy.url().should('include', '/login');
		});
	});

	it('should show user info at the home page when logged in', () => {
		cy.fixture('users').then((users) => {
			cy.visit('/login');
			cy.get('[data-testid=username]').type(users.defaultUser.username);
			cy.get('[data-testid=password]').type(users.defaultUser.password);
			cy.get('[data-testid=login-form-submit-btn]').click();

			cy.visit('/home');
			cy.get(`[data-testid=${users.defaultUser.username}]`).should(
				'exist'
			);
		});
	});

	it('should store the language preference in local storage', () => {
		cy.visit('/home');
		cy.get('[data-testid=language-selection-en-flag]').should('exist');

		cy.get('[data-testid=language-selection-trigger]').click();

		cy.get('[data-testid=language-selection-vi]').click();

		cy.visit('/home');
		cy.get('[data-testid=language-selection-vi-flag]').should('exist');
	});
});
