from llm_agent_graph.block_base import BlockBase
from node import Node


class IntInputBlock(BlockBase):
    pass


def initialize_block() -> None:
    Node.RegisterBlock("int-input", IntInputBlock)
