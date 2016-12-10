/*******************************************************************************
* Copyright (c) 2014 IBM Corporation and other Contributors.
*
* All rights reserved. This program and the accompanying materials
* are made available under the terms of the Eclipse Public License v1.0
* which accompanies this distribution, and is available at
* http://www.eclipse.org/legal/epl-v10.html
*
* Contributors:
* IBM - Initial Contribution
*******************************************************************************/

var HistorianGraph = function(){

	this.palette = new Rickshaw.Color.Palette( { scheme: [
	        "#7f1c7d",
	 		"#00b2ef",
			"#00649d",
			"#00a6a0",
			"#ee3e96"
	    ] } );


	this.drawGraph = function(seriesData)
	{
		// instantiate our graph!

		this.graph = new Rickshaw.Graph( {
			element: document.getElementById("chart"),
			width: 900,
			height: 500,
			renderer: 'line',
			stroke: true,
			preserve: true,
			series: seriesData	
		} );

		this.graph.render();

		this.hoverDetail = new Rickshaw.Graph.HoverDetail( {
			graph: this.graph,
			xFormatter: function(x) {
				return new Date(x * 1000).toString();
			}
		} );

		this.annotator = new Rickshaw.Graph.Annotate( {
			graph: this.graph,
			element: document.getElementById('timeline')
		} );

		this.legend = new Rickshaw.Graph.Legend( {
			graph: this.graph,
			element: document.getElementById('legend')

		} );

		this.shelving = new Rickshaw.Graph.Behavior.Series.Toggle( {
			graph: this.graph,
			legend: this.legend
		} );

		this.order = new Rickshaw.Graph.Behavior.Series.Order( {
			graph: this.graph,
			legend: this.legend
		} );

		this.highlighter = new Rickshaw.Graph.Behavior.Series.Highlight( {
			graph: this.graph,
			legend: this.legend
		} );

		this.smoother = new Rickshaw.Graph.Smoother( {
			graph: this.graph,
			element: document.querySelector('#smoother')
		} );

		this.ticksTreatment = 'glow';

		this.xAxis = new Rickshaw.Graph.Axis.Time( {
			graph: this.graph,
			ticksTreatment: this.ticksTreatment,
			timeFixture: new Rickshaw.Fixtures.Time.Local()
		} );

		this.xAxis.render();

		this.yAxis = new Rickshaw.Graph.Axis.Y( {
			graph: this.graph,
			tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
			ticksTreatment: this.ticksTreatment
		} );

		this.yAxis.render();


		this.controls = new RenderControls( {
			element: document.querySelector('form'),
			graph: this.graph
		} );

	};

	this.displayHistChart = function(device,histData){

		var seriesData = [];

		var counter = 0;

		var data = histData.events;
		
		for(var i = data.length-1 ; i>=0 ;i-- ){	
	   		
	   		var key = 0;	
			
			for (var j in data[i].evt){

				if (typeof data[i].evt[j] !== 'string') {
					if(i===data.length-1){
						seriesData[key]={};
						seriesData[key].name=j;
						seriesData[key].color = this.palette.color();
						seriesData[key].data=[];	
					}
					
					seriesData[key].data[counter]={};
					seriesData[key].data[counter].x = data[i].timestamp.$date/1000;// timestamp;
					seriesData[key].data[counter].y = data[i].evt[j];
				
					key++;
				}
			}
			
			counter++;
		}	
		this.drawGraph(seriesData);
		
	};

};