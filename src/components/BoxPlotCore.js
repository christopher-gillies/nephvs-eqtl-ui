import React, { Component } from 'react'
import './BoxPlotCore.css'
import { select, scaleLinear, scaleBand, scaleOrdinal,
axisLeft, axisBottom  } from 'd3'
import { schemeAccent } from 'd3-scale-chromatic'
const tip = require('d3-tip')
const FileSaver = require('file-saver');

// Based on Russell Jurney’s Block https://bl.ocks.org/rjurney/e04ceddae2e8f85cf3afe4681dac1d74
// Draws a Boxplot from summary information within each category

class BoxPlotCore extends Component {
   constructor(props){
      super(props)
      this.createBoxPlot = this.createBoxPlot.bind(this)
   }

   componentDidMount() {
      this.createBoxPlot()
   }

   componentDidUpdate() {
     this.createBoxPlot()
   }

   createBoxPlot() {
    const node = this.node

    //clear node
    select(node).html("");

    let boxPlotData = this.props.boxPlotData;
    let groups = this.props.groups;
    let minY = this.props.minY;
    let maxY = this.props.maxY;

    //const { boxPlotData, groups, minY, maxY  } = this.formatDataForD3();

    //create color scale
    let colorScale = scaleOrdinal(schemeAccent)
      .domain(groups);
    boxPlotData.forEach( (rec) => {
      rec["color"] = colorScale(rec["group"]);
    });

    console.log(boxPlotData)

    //set sizes of plot and margin
    const totalWidth = this.props.width;
    const totalHeight = this.props.height;
    const barWidth = this.props.boxWidth;

    const margin = {top: 60, right: 50, bottom: 60, left: 50};

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
    g.selectAll(".verticalLines")
      .data(boxPlotData)
      .enter()
      .append("line")
      .attr("x1", function(datum) {
          return xScale(datum.group) + computedBandWidth / 2;
        }
      )
      .attr("y1", function(datum) {
          var whisker = datum.whiskers[0];
          return yScale(whisker);
        }
      )
      .attr("x2", function(datum) {
          return xScale(datum.group) + computedBandWidth / 2;
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

    let createParagraph = function(label,data) {
      return "<p style='margin: 0; padding: 0;'><strong>" + label + ":</strong> " + data + "</p>"
    }

    const boxPlotToolTip = tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {

        let html = createParagraph("N",d.n) +
                    createParagraph("1st Quartile",d.quartile[0].toPrecision(3)) +
                    createParagraph("Median",d.quartile[1].toPrecision(3)) +
                    createParagraph("Mean",d.mean.toPrecision(3)) +
                    createParagraph("Std. dev.",d.stdDev.toPrecision(3)) +
                    createParagraph("3rd Quartile",d.quartile[2].toPrecision(3)) +
                    createParagraph("Min.",d.min.toPrecision(3)) +
                    createParagraph("Max.",d.max.toPrecision(3)) +
                    createParagraph("IQR", (d.quartile[2]-d.quartile[0]).toPrecision(3));
        return html;
      })

    svg.call(boxPlotToolTip);

    const outlierToolTip = tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
        return createParagraph("Group",d.group) +
            createParagraph("Value",d.val);
      })

    svg.call(outlierToolTip);

    //draw rectangles
    g.selectAll("rect")
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
          // xScale(datum.group) + computedBandWidth / 2 is the center
          // we go back half the width of the box and then go over the full width
          return xScale(datum.group) + computedBandWidth / 2 - barWidth/2;
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
      .attr("stroke-width", 1)
      .on('mouseover', boxPlotToolTip.show)
      .on('mouseout', boxPlotToolTip.hide);

    //draw outliers
    g.selectAll(".outliers").data(boxPlotData).enter().selectAll(".outliers")
      .data(function(d, i) {
        return d.outliers;
      }).enter().append("circle")
      .attr("cx", function(d) {
        return xScale(d.group) + computedBandWidth / 2 ;
      })
      .attr("cy", function(d) { return yScale(d.val); })
      .attr("stroke",function(d) { return colorScale(d.group); })
      .attr("fill",function(d) { return colorScale(d.group); })
      .attr("r","3")
      .on('mouseover', outlierToolTip.show)
      .on('mouseout', outlierToolTip.hide);

    // Now render all the horizontal lines at once - the whiskers and the median
    const horizontalLineConfigs = [
      // Top whisker
      {
        x1: function(datum) { return xScale(datum.group) + computedBandWidth / 2 - barWidth/2},
        y1: function(datum) { return yScale(datum.whiskers[1]) },
        x2: function(datum) { return xScale(datum.group) + computedBandWidth / 2 + barWidth/2 },
        y2: function(datum) { return yScale(datum.whiskers[1]) }
      },
      // Median line
      {
        x1: function(datum) { return xScale(datum.group) + computedBandWidth / 2 - barWidth/2},
        y1: function(datum) { return yScale(datum.quartile[1]) },
        x2: function(datum) { return xScale(datum.group) + computedBandWidth / 2 + barWidth/2 },
        y2: function(datum) { return yScale(datum.quartile[1]) }
      },
      // Bottom whisker
      {
        x1: function(datum) { return xScale(datum.group) + computedBandWidth / 2 - barWidth/2},
        y1: function(datum) { return yScale(datum.whiskers[0]) },
        x2: function(datum) { return xScale(datum.group) + computedBandWidth / 2 + barWidth/2 },
        y2: function(datum) { return yScale(datum.whiskers[0]) }
      }
    ];

    for(let i=0; i < horizontalLineConfigs.length; i++) {
      var lineConfig = horizontalLineConfigs[i];

      // Draw the whiskers at the min for this series
      g.selectAll(".whiskers")
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

  saveImage = () => {
    let handle = select(this.node);
    let filename = this.props.filename ? this.props.filename : "boxplot.svg"
    let html = handle.select("svg")
      .attr("title", "boxplot")
      .attr("version", 1.1)
      .attr("xmlns", "http://www.w3.org/2000/svg")
      .node().parentNode.innerHTML;
    let blob = new Blob([html], {type: "image/svg+xml"});
    FileSaver.saveAs(blob, filename);
  }

  render() {
        return (
          <div>
            <div ref={node => this.node = node}>
            </div>
            <div className="text-right">
              <button className="btn btn-light" onClick={ () => this.saveImage() }>
                Download Plot &nbsp;  <span className="fa fa-download"/>
              </button>
            </div>
          </div>
        );
     }
}


BoxPlotCore.defaultProps = {
  boxWidth: 100
}

export default BoxPlotCore
