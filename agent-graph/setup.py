from setuptools import setup, find_packages

setup(
    name="llm-agent-graph",
    version="0.1.0",
    authors=[
        {"name": "Author One", "email": "threezinedine@gmail.com"},
        {"name": "Author Two", "email": "khanhtran2001@example.com"},
    ],
    description="A short description of your library",
    long_description=open("README.md").read(),
    long_description_content_type="text/markdown",
    url="https://github.com/threezinedine/ai-agent-platform/tree/main/agent-graph",
    packages=find_packages(exclude=["tests", "docs"]),
    install_requires=[],
    classifiers=[
        "Development Status :: 1 - Planning",
        "Intended Audience :: Developers",
        "Intended Audience :: Education",
        "Intended Audience :: Science/Research",
        "Intended Audience :: Information Technology",
        "Programming Language :: Python :: 3",
        "License :: Public Domain",
        "Operating System :: OS Independent",
        "Topic :: Software Development :: Libraries",
        "Topic :: Scientific/Engineering :: Artificial Intelligence",
        "Environment :: Console",
        "Environment :: Web Environment",
    ],
    python_requires=">=3.6",
)
