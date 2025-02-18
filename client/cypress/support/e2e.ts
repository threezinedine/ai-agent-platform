// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

before(() => {
	// cy.fixture('users').then((users) => {
	// 	// register the default user
	// 	cy.request({
	// 		method: 'POST',
	// 		url: 'http://localhost:8000/api/v1/users/register',
	// 		body: users.defaultUser,
	// 		failOnStatusCode: false,
	// 	}).then((response) => {
	// 		expect(response.status).to.eq(201);
	// 	});
	// });
});
