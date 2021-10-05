<template>
  <div>
    <h3>Test</h3>
    <div :ref="chart.uuid"></div>
  </div>
</template>

<script>
import Plotly from "plotly.js";

export default {
  name: "plotly-chart",
  props: ["chart"],
  mounted() {
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
