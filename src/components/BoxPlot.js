import React, { Component } from 'react'
import './App.css'
import { select, max, scaleLinear } from 'd3'

class BoxPlot extends Component {
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


     const data = this.props.data;
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
     console.log(groupedData)

     //const dataMax = max(this.props.data)
     //const yScale = scaleLinear()
      //   .domain([0, dataMax])
        // .range([0, this.props.size[1]]);




/*
     select(node)
        .selectAll('rect')
        .data(this.props.data)
        .enter()
        .append('rect')

     select(node)
        .selectAll('rect')
        .data(this.props.data)
        .exit()
        .remove()

     select(node)
        .selectAll('rect')
        .data(this.props.data)
        .style('fill', '#fe9922')
        .attr('x', (d,i) => i * 25)
        .attr('y', d => {
            return this.props.size[1] - yScale(d);
          }
        )
        .attr('height', d => yScale(d))
        .attr('width', 25);
*/
   }

render() {
      return <svg ref={node => this.node = node}
      width={500} height={500}>
      </svg>
   }
}
export default BoxPlot
