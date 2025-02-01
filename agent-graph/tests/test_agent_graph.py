import unittest
from unittest.mock import patch
from llm_agent_graph import *


class AgentGraphTest(unittest.TestCase):
    @patch("builtins.print")
    def test_agent_graph_init(self, mock_print):
        Node.Initialize(["llm_agent_graph/default_blocks"])

        graph = Node()  # Create a node with model name "int-input"

        graph.AddNode(Node("int-input", {"name": "test-input"}))
        graph.AddNode(Node("int-output", {"name": "test-output"}))

        graph.AddEdge(
            "test-input",
            "test-output",
            {},
        )

        graph.Compile()

        graph.Execute({"test-input": 10})  # Output: 10
        mock_print.assert_called_with(10)
