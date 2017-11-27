import React, { Component } from 'react'
import './App.css'
import { select, max, min, scaleLinear, scaleBand, scaleOrdinal, quantile,
axisLeft, axisBottom } from 'd3'
import { schemeAccent } from 'd3-scale-chromatic'
// Based on Russell Jurney’s Block https://bl.ocks.org/rjurney/e04ceddae2e8f85cf3afe4681dac1d74

class BoxPlot extends Component {
   constructor(props){
      super(props)
      this.createBoxPlot = this.createBoxPlot.bind(this)
      this.formatDataForD3 = this.formatDataForD3.bind(this)
   }
   componentDidMount() {
      this.createBoxPlot()
   }
   componentDidUpdate() {
     this.createBoxPlot()
   }

   formatDataForD3() {

     //perform a shallow copy of the input data
     const data = this.props.data.slice();

     //sorting and then grouping is gives the same order as grouping and sorting
     data.sort( (a,b) => {
       if(a.y < b.y) {
         return -1;
       } else if(a.y > b.y) {
         return 1;
       } else {
         return 0;
       }
     })

     const yVals = data.map( a => a.y);
     const minY = min(yVals)
     const maxY = max(yVals)

     //Group data by x
     // x = 1 => [ expr... ]
     let groupedData = { };
     for(let i = 0; i < data.length; i++) {
       let item = data[i];
       let group = item.group;
       let y = item.y;
       if(groupedData[group] !== undefined) {
         groupedData[group].push(y);
       } else {
         groupedData[group] = [ y ]
       }
     }
     //console.log(groupedData)

     let groups = Object.keys(groupedData)

     //if the groupOrder is specified then override the groups variable
     if(this.props.groupOrder) {
       groups = this.props.groupOrder;
     }

     let colorScale = scaleOrdinal(schemeAccent)
       .domain(groups);

     //format for D3
     let boxPlotData = [];

     for (var [key, groupVals] of Object.entries(groupedData)) {

       var record = {};
       var localMin = min(groupVals);
       var localMax = max(groupVals);
       var quartiles = computeQuartiles(groupVals);
       var iqr = quartiles[2] - quartiles[0]
       var lb_iqr = quartiles[0] - 1.5 * iqr;
       var ub_iqr = quartiles[2] + 1.5 * iqr;
       var lowerWhisker = max( [localMin, lb_iqr]);
       var upperWhisker = min( [localMax, ub_iqr]);
       var outliers = groupVals.filter(function(c) {
         if(c < lb_iqr || c > ub_iqr) {
           return true;
         } else {
           return false;
         }
       });
       record["key"] = key;
       record["vals"] = groupVals;
       record["outliers"] = outliers.map(function(x) {
         return { key: key, val: x}
       });
       record["quartile"] = quartiles;
       record["whiskers"] = [lowerWhisker, upperWhisker];
       record["color"] = colorScale(key);

       boxPlotData.push(record);
     }

     return {
       "boxPlotData": boxPlotData,
       "groups": groups,
       "colorScale": colorScale,
       "minY": minY,
       "maxY": maxY,
     }
   }

   createBoxPlot() {
     const node = this.node

     //clear node
     select(node).html("");

     if(this.props.data === null && this.props.data === undefined &&
        this.props.data.length === 0) {
          //dont do anything
          return;
       }

     const { boxPlotData, groups, colorScale, minY, maxY  } = this.formatDataForD3();
     console.log(boxPlotData)

    //set sizes of plot and margin
    const totalWidth = this.props.width;
    const totalHeight = this.props.height;
    const barWidth = this.props.boxWidth;

    const margin = {top: 30, right: 30, bottom: 60, left: 30};

    const width = totalWidth - margin.left - margin.right,
        height = totalHeight - margin.top - margin.bottom;

    const xAxisShift = 35;

    //define axes
    const xScale = scaleBand()
      .domain(groups)
      .rangeRound([0, width])
      .padding(0)

    const computedBandWidth = xScale.bandwidth()

    const yScale = scaleLinear()
      .domain([minY, maxY])
      .rangeRound([height-10, 0]);


    const svg = select(node).append("svg")
      .attr("width", totalWidth)
      .attr("height", totalHeight)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //full shift in is really xAxisShift + margin.left
    const g = svg.append("g")
      .attr("transform", "translate(" + xAxisShift + ",0)");

      // Draw the box plot vertical lines
    const verticalLines = g.selectAll(".verticalLines")
      .data(boxPlotData)
      .enter()
      .append("line")
      .attr("x1", function(datum) {
          return xScale(datum.key) + computedBandWidth / 2;
        }
      )
      .attr("y1", function(datum) {
          var whisker = datum.whiskers[0];
          return yScale(whisker);
        }
      )
      .attr("x2", function(datum) {
          return xScale(datum.key) + computedBandWidth / 2;
        }
      )
      .attr("y2", function(datum) {
          var whisker = datum.whiskers[1];
          return yScale(whisker);
        }
      )
      .attr("stroke", "#000")
      .attr("stroke-width", 1)
      .attr("fill", "none");

      const rects = g.selectAll("rect")
        .data(boxPlotData)
        .enter()
        .append("rect")
        .attr("width", barWidth)
        .attr("height", function(datum) {
            var quartiles = datum.quartile;
            var height = yScale(quartiles[0]) - yScale(quartiles[2]);
            return height;
          }
        )
        .attr("x", function(datum) {
            // xScale(datum.key) + computedBandWidth / 2 is the center
            // we go back half the width of the box and then go over the full width
            return xScale(datum.key) + computedBandWidth / 2 - barWidth/2;
          }
        )
        .attr("y", function(datum) {
            return yScale(datum.quartile[2]); //this defines the top positon
          }
        )
        .attr("fill", function(datum) {
          return datum.color;
          }
        )
        .attr("stroke", "#000")
        .attr("stroke-width", 1);

        const outliers = g.selectAll(".outliers").data(boxPlotData).enter().selectAll(".outliers")
        .data(function(d, i) {
          return d.outliers;
        }).enter().append("circle")
        .attr("cx", function(d) {
          return xScale(d.key) + computedBandWidth / 2 ;
        })
        .attr("cy", function(d) { return yScale(d.val); })
        .attr("stroke",function(d) { return colorScale(d.key); })
        .attr("fill",function(d) { return colorScale(d.key); })
        .attr("r","3")


      // Now render all the horizontal lines at once - the whiskers and the median
      const horizontalLineConfigs = [
        // Top whisker
        {
          x1: function(datum) { return xScale(datum.key) + computedBandWidth / 2 - barWidth/2},
          y1: function(datum) { return yScale(datum.whiskers[1]) },
          x2: function(datum) { return xScale(datum.key) + computedBandWidth / 2 + barWidth/2 },
          y2: function(datum) { return yScale(datum.whiskers[1]) }
        },
        // Median line
        {
          x1: function(datum) { return xScale(datum.key) + computedBandWidth / 2 - barWidth/2},
          y1: function(datum) { return yScale(datum.quartile[1]) },
          x2: function(datum) { return xScale(datum.key) + computedBandWidth / 2 + barWidth/2 },
          y2: function(datum) { return yScale(datum.quartile[1]) }
        },
        // Bottom whisker
        {
          x1: function(datum) { return xScale(datum.key) + computedBandWidth / 2 - barWidth/2},
          y1: function(datum) { return yScale(datum.whiskers[0]) },
          x2: function(datum) { return xScale(datum.key) + computedBandWidth / 2 + barWidth/2 },
          y2: function(datum) { return yScale(datum.whiskers[0]) }
        }
      ];

      for(let i=0; i < horizontalLineConfigs.length; i++) {
        var lineConfig = horizontalLineConfigs[i];

        // Draw the whiskers at the min for this series
        const horizontalLine = g.selectAll(".whiskers")
          .data(boxPlotData)
          .enter()
          .append("line")
          .attr("x1", lineConfig.x1)
          .attr("y1", lineConfig.y1)
          .attr("x2", lineConfig.x2)
          .attr("y2", lineConfig.y2)
          .attr("stroke", "#000")
          .attr("stroke-width", 1)
          .attr("fill", "none");
      }

      // Move the left axis over 25 pixels, and the bottom axis over 35 pixels
      const axisLeftG = svg.append("g").attr("transform", "translate(25,0)");
      const axisBottomG = svg.append("g").attr("transform", "translate(" + xAxisShift + ",0)");

      // Setup a scale on the left
      const axisLeftPlot = axisLeft(yScale);
      axisLeftG.append("g")
        .attr("class", "axis axis--x")
        .call(axisLeftPlot);

      const yLabel = this.props.ylab;
      const italicPart = this.props.ylabItalic;

      const axisLeftLabel = axisLeftG.append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("y", -(30 + 25 + 10))
        .attr("x", -height / 2 )
        .attr("dy", "30px")
        .attr("text-anchor", "end")
        .text(yLabel);

      axisLeftLabel.append("tspan")
        .attr("font-style","italic")
        .text(italicPart);

      const axisLeftLabelHeight = axisLeftLabel.node().getBoundingClientRect().height;
      axisLeftLabel.attr("x", -height / 2 + axisLeftLabelHeight / 2);

      // Setup a series axis on the top
      const axisBottomPlot = axisBottom(xScale);

      axisBottomG.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(axisBottomPlot);

      const xLabel = this.props.xlab;

      const axisBottomLabel = axisBottomG.append("text")
      .attr("class", "axis-label")
      .attr("dy", "30px")
      .attr("text-anchor", "end")
      .attr("y", height + 10)
      .attr("x", width / 2)
      .text(xLabel);

      //re-center the axis label based on the size of the text
      const axisLabelWidth = axisBottomLabel.node().getBoundingClientRect().width;
      axisBottomLabel.attr("x", width / 2 + axisLabelWidth / 2);
      //console.log(axisBottomLabel.node().getBoundingClientRect().width);
   }

  render() {
        return (
          <div ref={node => this.node = node}>
          </div>
        );
     }
}

function computeQuartiles(d) {
  return [
    quantile(d, .25),
    quantile(d, .5),
    quantile(d, .75)
  ];
}

BoxPlot.defaultProps = {
  boxWidth: 100
}

export default BoxPlot
