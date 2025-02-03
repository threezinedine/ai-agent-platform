describe('Testing Authentication Feature', () => {
	it('should register user with some restrictions on the fields', () => {
		cy.visit('http://localhost:3000/register');

		const usernameInput = cy.get('input[data-testid="username"]');

		usernameInput.type('test').blur();
		cy.contains('Username should be at least 8 characters long').should(
			'be.visible'
		);

		usernameInput.clear().type('testuseradsfalke').blur();
		cy.contains('Username should be at least 8 characters long').should(
			'not.exist'
		);
	});
});
