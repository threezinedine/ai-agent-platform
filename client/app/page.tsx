'use client';

import React from 'react';
import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';

function initDiagram(): go.Diagram {
	const diagram = new go.Diagram({
		'undoManager.isEnabled': true,
		'clickCreatingTool.archetypeNodeData': {
			text: 'new node',
			color: 'black',
		},
		model: new go.GraphLinksModel({
			linkKeyProperty: 'key',
		}),
	});

	diagram.nodeTemplate = new go.Node('Auto')
		.bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)
		.add(
			new go.Shape('RoundedRectangle', {
				name: 'SHAPE',
				fill: 'white',
				strokeWidth: 0,
			}).bind('fill', 'color'),
			new go.TextBlock({ margin: 8, editable: true }).bindTwoWay('text')
		);

	diagram.linkTemplate = new go.Link()
		.bindModel('relinkableFrom', 'canRelink')
		.bindModel('relinkableTo', 'canRelink')
		.add(
			new go.Shape(),
			new go.Shape({
				toArrow: 'Standard',
			})
		);

	return diagram;
}

function hanldeModelChange(changes: go.IncrementalData) {
	console.log(changes);
}

export default function Home() {
	return (
		<div>
			<span>Hello world</span>
			<ReactDiagram
				initDiagram={initDiagram}
				divClassName="diagram-component"
				nodeDataArray={[
					{ key: 0, text: 'Alpha', color: 'lightblue', loc: '0 0' },
					{ key: 1, text: 'Beta', color: 'orange', loc: '150 0' },
					{
						key: 2,
						text: 'Gamma',
						color: 'lightgreen',
						loc: '0 150',
					},
					{ key: 3, text: 'Delta', color: 'pink', loc: '150 150' },
				]}
				linkDataArray={[
					{ key: -1, from: 0, to: 1 },
					{ key: -2, from: 0, to: 2 },
					{ key: -3, from: 1, to: 1 },
					{ key: -4, from: 2, to: 3 },
					{ key: -5, from: 3, to: 0 },
				]}
				onModelChange={hanldeModelChange}
			/>
		</div>
	);
}
