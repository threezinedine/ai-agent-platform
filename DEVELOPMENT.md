# Development Instructions for AI Agent Platform

## Table of Contents

-   [Development Instructions for AI Agent Platform](#development-instructions-for-ai-agent-platform)
    -   [Table of Contents](#table-of-contents)
    -   [Backend](#backend)
        -   [Prerequisites](#prerequisites)
        -   [Setting Up the Backend](#setting-up-the-backend)
        -   [Running the Backend Server](#running-the-backend-server)
        -   [Testing the Backend Server](#testing-the-backend-server)
    -   [Frontend](#frontend)
        -   [Prerequisites](#prerequisites-1)
        -   [Setting Up the Frontend](#setting-up-the-frontend)
        -   [Running the Frontend Server](#running-the-frontend-server)
        -   [Testing the Frontend Server](#testing-the-frontend-server)
    -   [End-to-End Testing](#end-to-end-testing)
    -   [Code Formatting and Linting](#code-formatting-and-linting)

## Backend

### Prerequisites

-   Python 3.11 or higher (can be installed from [here](https://www.python.org/downloads/))
-   Virtual Environment (can be installed using `pip install virtualenv`)

### Setting Up the Backend

1. Clone the repository:

    ```sh
    git clone https://github.com/your-repo/ai-agent-platform.git
    cd ai-agent-platform/backend
    ```

2. Create and activate a virtual environment:

    ```sh
    python -m venv server/venv
    source server/venv/bin/activate  # On Windows use `server\venv\Scripts\activate`
    ```

3. Install dependencies:

    ```sh
    pip install -r server/requirements.txt
    ```

### Running the Backend Server

1. Start the backend service:

    ```sh
    python server/app.py
    ```

2. The backend server will run on `http://localhost:8000` (this can be changed in `docker-compose.yml`).

### Testing the Backend Server

-   Run all tests (ensure you are in the virtual environment):

    ```sh
    pytest
    ```

-   All tests are placed in the `__tests__` directory, and the test file names should follow `test_<filename>.py` format.

## Frontend

### Prerequisites

-   Node.js v20.0.0 or higher (can be installed via NVM from [here](https://github.com/nvm-sh/nvm))

### Setting Up the Frontend

1. Navigate to the frontend directory:

    ```sh
    cd ../frontend
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

### Running the Frontend Server

1. Start the frontend server:

    ```sh
    npm run dev
    ```

2. The frontend server will run on `http://localhost:3000` (modifiable in `docker-compose.yml`).

### Testing the Frontend Server

-   Run all tests in a separate terminal:

    ```sh
    npm run test:watch
    ```

-   Test files should be placed in the `__tests__` directory, and follow `<file_name>.test.ts` naming convention.

## End-to-End Testing

-   Run end-to-end tests:

    ```sh
    npm run test:e2e
    ```

## Code Formatting and Linting

Ensure your code follows the formatting and linting guidelines:

-   **Python**: Use `black` for formatting:

    ```sh
    black .
    ```

-   **JavaScript**: Use `eslint` and `prettier`:

    ```sh
    npm run lint
    ```
