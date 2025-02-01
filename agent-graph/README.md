# Agent Graph

First version without any code

## Table of Contents

## Introduction

LLM AI Agent Library is a lightweight framework designed to help developers build and deploy intelligent agents powered by large language models (LLMs). The library abstracts the complexities of interacting with LLMs, offering a simple and modular interface that enables the creation of applications capable of understanding natural language, making decisions, and interacting with users or other systems. With built-in support for common agent patterns and easy customization, this library is ideal for quickly prototyping and implementing AI-driven solutions.

## Features

[ ]

## Examples

For constructing a working flow, there are 2 ways:

1. Using Python code

text_input = Node(type="input_node", input_nums=0,) # have both text_input.Inputs and text_input.Outputs
summarizer = Node(...)
text_to_speech = Node(...)
audio_output = Node(...)
text_output = Node(...)

graph.AddNode(text_input, sumarizer)
graph.AddNode(summarizer, text_to_speech)
graph.AddNode(summarizer, text_output)
graph.AddNode(text_to_speech, audio_output)

graph.Compile() # -> error or not - ex: circular dependencies - non-connected nodes

print(graph.Description()) # draw graph in the console (optional)

graph.Execute()

````

2. Using `JSON`

```json
{
	"text_input": {
		"block_type": "text-input",
		"outputs": ["summarizer"]
	},
	"summarizer": {
		"block_type": "llm",
		"outputs": ["text_to_speech", "text_output"]
	},
	"text_to_speech": {
		"block_type": "text-to-speech",
		"outputs": ["audio_output"]
	},
	"text_output": {
		"block_type": "text-output"
	},
	"audio_output": {
		"block_type": "audio-output"
	}
}
````

And load it with:

```python
graph = Node()
graph.LoadFromJson(json)
graph.Compile() # -> error or not - ex: circular dependencies - non-connected nodes

# method 1
output = graph.Execute(data_input)

# method 2
graph.Execute(data_input)
graph.Outputs()

graph.ToDebugJSON() # -> {} -> debug info
```

Block Manager:

-   Plugin block types
    -   Pros:
    -   Cons:
-   Fixed block types
    -   Pros:
    -   Cons:

## Node features

-   [ ] A Node is a Graph, which can contains another flow inside.
-   [ ] A Node can be compilied to check if it's children are valid or not
-   [ ] A Node's inputs, outputs number can be modified by JSON config
-   [ ] A Node can be debugged to see the flow of the data
-   [ ] A Node can be saved to JSON and loaded from JSON
