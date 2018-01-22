import React, { Component } from 'react'
import './ClusterPlot.css'
import { select, max, min, scaleLinear, scaleOrdinal,
axisLeft, axisBottom, mean } from 'd3'
import { schemeAccent } from 'd3-scale-chromatic'
const tip = require('d3-tip')
const FileSaver = require('file-saver');

// Based on Russell Jurney’s Block https://bl.ocks.org/rjurney/e04ceddae2e8f85cf3afe4681dac1d74

class ClusterPlot extends Component {
   constructor(props){
      super(props)
      this.createPlot = this.createPlot.bind(this)
      this.formatDataForD3 = this.formatDataForD3.bind(this)
      this.state = {
        selectedView: "both"
      }
   }

   componentDidMount() {
      this.createPlot(this.props);
   }

   componentWillUpdate(nextProps,nextState) {
     //only redraw the plot if the properties change
     //if the state changes then we are going to just do a transition
     if(this.state.selectedView !== nextState.selectedView) {

     } else {
       this.createPlot(nextProps);
     }
   }

   //componentDidUpdate() {
    // this.createPlot();
   //}

   formatDataForD3(props) {

     //perform a shallow copy of the input data
     const gene = props.gene;
     const clusters = props.clusters;

     let minX = null;
     let maxX = null;
     let minY = 0;
     let maxY = 1;
     const scaleFactor = 1000000
     let genePlotData = {
       x: gene.start / scaleFactor,
       start: gene.start,
       end: gene.end,
       y: 1.1,
       width: gene.end / scaleFactor - gene.start / scaleFactor + 1,
       height: 0.05,
       name: gene.symbol,
       chrom: gene.chrom,
       strand: gene.strand,
       description: gene.description,
       numClusters: clusters.length,
       expSize: props.expSize,
       geneNull: props.geneNull,
       geneFDR: props.fdr
     }

     let clusterPlotData = []
     let variantPlotData = []
     let colors = []
     let varPos_s_all = []
     for(let i = 0; i < clusters.length; i++) {
       let cluster = clusters[i]
       let clusterPoint = {}
       clusterPoint["y"] = cluster.pip;
       clusterPoint["color"] = cluster.cluster;
       clusterPoint["numVariants"] = cluster.variants.length;
       colors.push(cluster.cluster);
       let variants = cluster.variants;
       let varPos_s = []
       for(let j = 0; j < variants.length; j++ ) {
         let variant = variants[j];
         let variantPoint = {}
         variantPoint["x"] = variant.pos / scaleFactor;
         variantPoint["pos"] = variant.pos;
         variantPoint["variantStr"] = variant.variantStr;
         varPos_s.push(variant.pos / scaleFactor);
         varPos_s_all.push(variant.pos / scaleFactor);
         variantPoint["y"] = variant.pip;
         variantPoint["color"] = cluster.cluster;
         variantPlotData.push(variantPoint)
       }
       //let clusterPoint["x"] be the mean position of the cluster
       clusterPoint["x"] = mean(varPos_s);
       clusterPoint["pos"] = Math.round(mean(varPos_s) * scaleFactor);
       clusterPlotData.push(clusterPoint);
     }

     varPos_s_all.push(gene.start / scaleFactor)
     minX = min(varPos_s_all) - 1;
     varPos_s_all.push(gene.end / scaleFactor)
     maxX = max(varPos_s_all) + 1;

     //
     let colorScale = scaleOrdinal(schemeAccent)
       .domain(colors);

     return {
       "clusterPlotData": clusterPlotData,
       "variantPlotData": variantPlotData,
       "genePlotData": genePlotData,
       "colorScale": colorScale,
       "minY": minY,
       "maxY": maxY,
       "maxX": maxX,
       "minX": minX
     }
   }

   createPlot(props) {
      const node = this.node

      //clear node
      select(node).html("");

      const { clusterPlotData, variantPlotData, genePlotData, colorScale, minY, maxY, minX, maxX  } = this.formatDataForD3(props);


      //set sizes of plot and margin
      const totalWidth = props.width;
      const totalHeight = props.height;


      const margin = {top: 60, right: 50, bottom: 60, left: 50};

      const width = totalWidth - margin.left - margin.right,
          height = totalHeight - margin.top - margin.bottom;

      const xAxisShift = 35;

      //define axes
      const xScale = scaleLinear()
        .domain([minX, maxX])
        .rangeRound([0, width]);

      const yScale = scaleLinear()
        .domain([minY, maxY])
        .rangeRound([height-10, 0]);


      var svg = select(node).append("svg")
        .attr("width", totalWidth)
        .attr("height", totalHeight)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      const g = svg.append("g")
        .attr("transform", "translate(" + xAxisShift + ",0)");

      //Add clusters
      const clusters = g.selectAll(".clusters").data(clusterPlotData)
        .enter().append("circle")
        .attr("cx", function(d) {
          return xScale(d.x)
        })
        .attr("cy", function(d) { return yScale(d.y); })
        .attr("stroke",function(d) { return colorScale(d.color); })
        .attr("fill",function(d) { return colorScale(d.color); })
        .attr("r","5")
        .attr("class","clusters")

      if(this.state.selectedView === "both" || this.state.selectedView === "clusters") {
        clusters.style("opacity","1")
      } else {
        clusters.style("opacity","0")
      }

      //Add variants
      const variants = g.selectAll(".variants").data(variantPlotData)
        .enter().append("circle")
        .attr("cx", function(d) {
          return xScale(d.x)
        })
        .attr("cy", function(d) { return yScale(d.y); })
        .attr("stroke",function(d) { return colorScale(d.color); })
        .attr("fill",function(d) { return colorScale(d.color); })
        .attr("r","2")
        .attr("class","variants")

        if(this.state.selectedView === "both" || this.state.selectedView === "variants") {
          variants.style("opacity","1")
        } else {
          variants.style("opacity","0")
        }

      //Add gene

      let genePlotWidth = xScale(genePlotData.width) - xScale(0);
      let genePlotHeight = yScale(0) - yScale(genePlotData.height);
      let genePlotX = xScale(genePlotData.x);
      let genePlotY = yScale(genePlotData.y);

      var geneRect = g.append("rect")
        .attr("width", genePlotWidth )
        .attr("height",  genePlotHeight)
        .attr("x", genePlotX)
        .attr("y", genePlotY)
        .attr("fill", "#4682b4")
        .attr("stroke", "#4682b4")
        .attr("stroke-width", 1)

      this.drawArrowEnd(g,genePlotData.strand,genePlotX,genePlotY,genePlotHeight,genePlotWidth);

      // add gene label
      var text = g.selectAll("text")
        .data([genePlotData])
        .enter()
        .append("text")
        .text(genePlotData.name)
        .attr("x", xScale(genePlotData.x) + xScale(genePlotData.width/2) - xScale(0))
        .attr("y", yScale(genePlotData.y) - 10)
        .attr("font-family", "sans-serif")
        .attr("font-style", "italic")
        .attr("font-size", "15px")
        .attr("fill", "black");

      let textWidth = text.node().getBoundingClientRect().width;
      text.attr("x", xScale(genePlotData.x) + xScale(genePlotData.width/2) - xScale(0) - textWidth/2);

      // Move the left axis over 25 pixels, and the top axis over 35 pixels
      var axisLeftG = svg.append("g").attr("transform", "translate(25,0)");
      var axisBottomG = svg.append("g").attr("transform", "translate(" + xAxisShift +",0)");

      // Setup a scale on the left
      var axisLeftObj = axisLeft(yScale).tickValues([0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1]);
      axisLeftG.append("g")
        .call(axisLeftObj);

      //x-axis label
      const axisLeftLabel = axisLeftG.append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("y", -(30 + 25 + 10)) //shifts the axis left
        .attr("x", -height / 2 ) //shift it down
        .attr("dy", "30px")
        .attr("text-anchor", "end")
        .text("Posterior Inclusion Probability");

      const axisLeftLabelHeight = axisLeftLabel.node().getBoundingClientRect().height;
      axisLeftLabel.attr("x", -height / 2 + axisLeftLabelHeight / 2);

      // Setup a series axis on the top
      var axisBottomObj = axisBottom(xScale);

      axisBottomG.append("g")
        .attr("transform", "translate(0," + yScale(0) + ")")
        .call(axisBottomObj)

      //
      const axisBottomLabel = axisBottomG.append("text")
        .attr("class", "axis-label")
        .attr("dy", "30px")
        .attr("text-anchor", "end")
        .attr("y", height + 10)
        .attr("x", width / 2)
        .text("Position (mb) on chr" + genePlotData.chrom);

      //re-center the axis label based on the size of the text
      const axisLabelWidth = axisBottomLabel.node().getBoundingClientRect().width;
      axisBottomLabel.attr("x", width / 2 + axisLabelWidth / 2);


      //add tool tips for points

      let createParagraph = function(label,data) {
        return "<p style='margin: 0; padding: 0;'><strong>" + label + ":</strong> " + data + "</p>"
      }

      const clusterToolTip = tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
          return createParagraph("Cluster",d.color) +
              createParagraph("PIP",d.y) +
              createParagraph("# of Variants",d.numVariants)
        })
      svg.call(clusterToolTip);

      const variantToolTip = tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
          return createParagraph("Variant",d.variantStr) + createParagraph("Cluster",d.color) +
              createParagraph("PIP",d.y) + createParagraph("Position",d.pos)
        })
      svg.call(variantToolTip);



      clusters.on('mouseover', clusterToolTip.show)
            .on('mouseout', clusterToolTip.hide);
      variants.on('mouseover', variantToolTip.show)
            .on('mouseout', variantToolTip.hide);

      // add gene tool tip

      const geneToolTip = tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(createParagraph("Chrom","chr" + genePlotData.chrom ) +
            createParagraph("Start",genePlotData.start) +
            createParagraph("End",genePlotData.end) +
              createParagraph("Description",genePlotData.description) +
              createParagraph("# of Clusters",genePlotData.numClusters) +
              createParagraph("Exp. # of eQTLs",genePlotData.expSize) +
              createParagraph("Prob. of no eQTL",genePlotData.geneNull.toPrecision(3)) +
              createParagraph("FDR",genePlotData.geneFDR.toPrecision(3))
            )
      svg.call(geneToolTip);

      geneRect.on('mouseover', geneToolTip.show)
            .on('mouseout', geneToolTip.hide);
   }

  drawArrowEnd = (handle,strand,x,y,height,width) => {
    //Draw polygon in SVG
    //https://www.w3schools.com/graphics/svg_polygon.asp
    let verticalPad = 5
    let horizontalPad = 10

    if(strand === "-") {
      let p1 = x + "," + (y - verticalPad);
      let p2 = x + "," + (y + height + verticalPad);
      let p3 = (x - horizontalPad) + "," + (y + height / 2)

      handle.append("polygon")
      .attr("points", [p1,p2,p3].join(" "))
      .attr("fill", "#4682b4")
      .attr("stroke", "#4682b4")
      .attr("stroke-width", 1)

    } else if(strand === "+") {
      let p1 = (x + width) + "," + (y - verticalPad);
      let p2 = (x + width) + "," + (y + height + verticalPad);
      let p3 = (x + horizontalPad + width) + "," + (y + height / 2)

      handle.append("polygon")
      .attr("points", [p1,p2,p3].join(" "))
      .attr("fill", "#4682b4")
      .attr("stroke", "#4682b4")
      .attr("stroke-width", 1)

    }
  }

  saveImage = () => {
    let handle = select(this.node);
    let filename = this.props.filename ? this.props.filename : "dap_result.svg"
    let html = handle.select("svg")
      .attr("title", "dap_result")
      .attr("version", 1.1)
      .attr("xmlns", "http://www.w3.org/2000/svg")
      .node().parentNode.innerHTML;
    let blob = new Blob([html], {type: "image/svg+xml"});
    FileSaver.saveAs(blob, filename);
  }

  handleViewChange = (changeEvent) => {
    const newVal = changeEvent.target.value;
    this.setState({
      selectedView: newVal
    });
    let variants = select(this.node).selectAll(".variants");
    let clusters = select(this.node).selectAll(".clusters");
    if(newVal === "both") {
      console.log(variants)
      console.log(clusters)
      variants.transition().duration(1000).style("opacity","1");
      clusters.transition().duration(1000).style("opacity","1");
    } else if(newVal === "clusters") {
      console.log(variants)
      console.log(clusters)
      variants.transition().duration(1000).style("opacity","0");
      clusters.transition().duration(1000).style("opacity","1");
    } else {
      console.log(variants)
      console.log(clusters)
      variants.transition().duration(1000).style("opacity","1");
      clusters.transition().duration(1000).style("opacity","0");
    }
  }

  render() {
        return (
          <div>
            <div ref={node => this.node = node}>
            </div>
            <form>
            <div className="btn-group-toggle">
              <label className={ this.state.selectedView === "both" ? "btn btn-secondary active" : "btn btn-secondary" }>
                <input type="radio" value="both" checked={this.state.selectedView === "both"}
                onChange={this.handleViewChange}
                /> Both
              </label>
              <label className={ this.state.selectedView === "clusters" ? "btn btn-secondary active" : "btn btn-secondary" }>
                <input type="radio" value="clusters"  checked={this.state.selectedView === "clusters"}
                onChange={this.handleViewChange}
                /> Clusters
              </label>
              <label className={ this.state.selectedView === "variants" ? "btn btn-secondary active" : "btn btn-secondary" }>
                <input type="radio"  value="variants"  checked={this.state.selectedView === "variants"}
                onChange={this.handleViewChange}
                /> Variants
              </label>
            </div>
            </form>
            <div className="text-right">
              <button className="btn btn-light fa fa-download" onClick={ () => this.saveImage() }>
              </button>
            </div>
          </div>
        );
     }
}

export default ClusterPlot
