# AI Agent Platform

![Test Status](https://github.com/threezinedine/ai-agent-platform/actions/workflows/test.yml/badge.svg)
![GitHub issues](https://img.shields.io/github/issues/threezinedine/ai-agent-platform.svg)
![GitHub pull requests](https://img.shields.io/github/issues-pr/threezinedine/ai-agent-platform.svg)
![License](https://img.shields.io/github/license/threezinedine/ai-agent-platform.svg)
![GitHub stars](https://img.shields.io/github/stars/threezinedine/ai-agent-platform.svg)

This project is divided into two main parts:

1. **Backend**: Handles the logic of the large language model (LLM), processes input, manages model operations, and returns output.
2. **Frontend**: Provides a user interface (UI) for describing, debugging, and integrating with other applications. It enables users to interact with the backend, visualize results, and manage configurations.

This platform aims to streamline the development and deployment of AI agents by offering a robust backend for handling complex language model operations and an intuitive frontend for user interaction, making it easier to describe, debug, and integrate AI functionalities into various applications.

## Table of Contents

-   [AI Agent Platform](#ai-agent-platform)
    -   [Table of Contents](#table-of-contents)
    -   [Build Docker Image](#build-docker-image)
        -   [Prerequisites](#prerequisites)
        -   [Steps](#steps)
        -   [Remarks:](#remarks)
    -   [Development Instructions](#development-instructions)
    -   [Contact Us](#contact-us)

## Build Docker Image

### Prerequisites

-   Docker Desktop version 20.0.0 or higher (can be installed from [here](https://www.docker.com/products/docker-desktop))
-   Docker Compose version 2.10.0 or higher (can be installed from [here](https://docs.docker.com/compose/install/))

### Steps

Use `docker-compose` to build the image and run the container.

```sh
docker-compose up -d
```

To rebuild the image, use the following command:

```sh
docker-compose build
docker-compose up -d
```

To stop the container, use the following command:

```sh
docker-compose down
```

### Remarks:

-   The `-d` flag is used to run the container in detached mode.
-   Docker must be running before executing the above commands.
-   The output port is `334` for the entire project; this can be changed in the `docker-compose.yml` file.

## Development Instructions

For more detailed instructions on how to run the backend and frontend servers, please refer to the [DEVELOPMENT.md](DEVELOPMENT.md) file.

## Contact Us

If you have any questions or need further assistance, please feel free to reach out to us at [threezinedine@gmail.com](mailto:threezinedine@gmail.com) or [khanhtran2001@gmail.com](mailto:khanhtran2001@gmail.com)
