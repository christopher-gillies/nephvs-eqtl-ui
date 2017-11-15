import React, { Component } from 'react';
import Card from './Card'

class About extends Component {

  render() {
    return(
      <div className="text-center">
      <h1>About the NephVS eQTL Browser</h1>

      <Card title="Cohort information" size="col-lg">
        <p>...</p>
      </Card>

      <Card title="Data processing pipeline" size="col-lg">
        <p>...</p>
      </Card>

      <Card title="Download Full matrix eQTL results" size="col-lg">
        <p>You can download the tubulointerstitial Matrix eQTL results <a href="_blank">here.</a></p>
        <p>You can download the glomerular Matrix eQTL results <a href="_blank">here.</a></p>
      </Card>

      <Card title="Lab website" size="col-lg">
        Please visit our lab <a href="https://sites.google.com/a/umich.edu/sampson_lab/">here.</a>
      </Card>
      </div>
    )
  }
}

export default About;
