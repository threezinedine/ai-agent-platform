from typing import *
from .block_base import BlockBase


class Node:
    """
    Core class for AgentGraph represens the unit of functionality in the graph.

    Example:
    ```python
    Node.RegisterBlock("int-input", IntInputBlockCode) # Register a model with name "int-input" and class IntInputNode
    Node.RegisterBlock("int-output", IntOutputBlockCode) # Register a model with name "int-output" and class IntOutputNode

    graph = Node() # Create a node with model name "int-input"

    graph.AddNode("test-input", Node("int-input", {}))
    graph.AddNode("test-output", Node("int-output", {}))

    graph.AddEdge(
        "test-input",
        "test-output",
        {},
    )

    graph.Compile()

    graph.Execute({"test-input": 10}) # Output: 10
    ```
    """

    def __init__(
        self,
        model: str = "",
        data: Optional[Dict[str, Any]] = None,
    ) -> None:
        self._model = model
        self._name = data.get("name", "") if data else ""

    def AddNode(self, node: Self) -> None:
        pass

    def AddEdge(
        self,
        source: str,
        target: str,
        data: Optional[Dict[str, Any]] = None,
    ) -> None:
        pass

    def Compile(self) -> None:
        pass

    def Execute(self, inputs: Dict[str, Any]) -> Any:
        pass

    @staticmethod
    def Initialize(block_dirs: List[str]) -> None:
        """
        Load all the plugins from the given directories.
        """
        pass

    @staticmethod
    def RegisterBlock(name: str, block: Type[BlockBase]) -> None:
        pass


if __name__ == "__main__":
    node = Node()
