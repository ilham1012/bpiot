<template>
  <div>
    <div :ref="chart.uuid"></div>
  </div>
</template>

<script>
import Plotly from "plotly.js";

export default {
  name: "plotly-chart",
  props: ["chart"],
  mounted() {
    console.log("chart mounted");
    console.log(this.chart.traces);
    Plotly.newPlot(this.$refs[this.chart.uuid], this.chart.traces, this.chart.layout, this.chart.config);
  },
  watch: {
    chart: {
      handler: function() {
        Plotly.react(
          this.$refs[this.chart.uuid],
          this.chart.traces,
          this.chart.layout,
          this.chart.config,
        );
      },
      deep: true
    }
  }

}
</script>
