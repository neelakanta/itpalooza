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

var Historian  = function () {

	var $ = jQuery;
	var historianGraph;

	this.initialize = function() {
		historianGraph = new HistorianGraph();
	}

	this.plotHistoricGraph = function (){
		var item = $( "#deviceslist" ).val();
		if(item) {
			var tokens = item.split(':');

			var top = $( 'input[name=historicQuery]:checked' ).val();
			console.log("called "+top);
			var queryParam = {};
			
			if(top == "topEvents") {
				queryParam = {
					top: $(historicTopRange).spinner( "value" )
				};
			} 
			else if(top == "dateRange") {
				//Datetimes only in GMT
				var startDate = Date.parse($(historicStarts).val()+" GMT");
				var endDate = Date.parse($(historicEnds).val()+" GMT");
				queryParam = {
					start: startDate,
					end: endDate
				};
			}
			
			$.ajax
			({
				type: "GET",
				url: "/api/v0002/historian/"+tokens[1]+"/types/"+tokens[2]+"/devices/"+tokens[3],
				data: queryParam,
				dataType: 'json',
				async: true,

				success: function (data, status, jq){

					//clear prev graphs
					$('#chart').empty(); 
					$('#timeline').empty();
					$('#legend').empty();
					historianGraph.displayHistChart(null,data);
				},
				error: function (xhr, ajaxOptions, thrownError) {
					console.log(xhr.status);
					console.log(thrownError);
				}
			});
		}
	}

	this.initialize();
	var imageHTML = '<div class="iotdashboardtext">The selected device does not have historic events in the Internet of Things Foundation</div><br><div class="iotdashboardtext">Select a different device.</div> <img class="iotimagesMiddle" align="middle" alt="Chart" src="images/IOT_Icons_Thing02.svg">';
};
