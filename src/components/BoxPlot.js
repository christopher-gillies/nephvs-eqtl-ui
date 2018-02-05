import React, { Component } from 'react'
import BoxPlotCore from './BoxPlotCore'
import { max, min, quantile, mean, deviation } from 'd3'


// Based on Russell Jurney’s Block https://bl.ocks.org/rjurney/e04ceddae2e8f85cf3afe4681dac1d74

class BoxPlot extends Component {
   constructor(props){
      super(props)
      this.formatDataForD3 = this.formatDataForD3.bind(this)
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

     //format for D3
     let boxPlotData = [];

     //for each group,
     //groupVals are the values for this group
     //so for the genotype of 1, we would have a set of expression values
     for (let [group, groupVals] of Object.entries(groupedData)) {

       let record = {};
       let localMin = min(groupVals);
       let localMax = max(groupVals);
       let localMean = mean(groupVals)
       let localStdDev = deviation(groupVals)
       let quartiles = computeQuartiles(groupVals);
       let iqr = quartiles[2] - quartiles[0]
       let lb_iqr = quartiles[0] - 1.5 * iqr;
       let ub_iqr = quartiles[2] + 1.5 * iqr;
       let lowerWhisker = max( [localMin, lb_iqr]);
       let upperWhisker = min( [localMax, ub_iqr]);
       let outliers = groupVals.filter(function(c) {
         if(c < lb_iqr || c > ub_iqr) {
           return true;
         } else {
           return false;
         }
       });
       record["group"] = group;
       record["n"] = groupVals.length;
       record["outliers"] = outliers.map(function(y) {
         return { group: group, y: x}
       });
       record["quartile"] = quartiles;
       record["min"] = localMin;
       record["max"] = localMax;
       record["mean"] = localMean;
       record["stdDev"] = localStdDev;
       record["whiskers"] = [lowerWhisker, upperWhisker];

       boxPlotData.push(record);
     }

     return {
       "groupInfos": boxPlotData,
       "groupsKeys": groups,
       "minY": minY,
       "maxY": maxY,
     }
   }


  render() {
        const { groupInfos, groupsKeys, minY, maxY  } = this.formatDataForD3();
        return (
          <div>
            <BoxPlotCore groupInfos={groupInfos} groupKeys={groupsKeys} minY={minY} maxY={maxY} boxWidth={this.props.boxWidth} width={this.props.width} height={this.props.height} />
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
