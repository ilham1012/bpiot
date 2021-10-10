<template>
  <div>
    <div>
      <h5 class="pl-3 heading-small text-muted">{{ deviceId }}</h5>

      <div class="table-responsive">
        <base-table
          class="table align-items-center table-flush table-hover"
          :class="type === 'dark' ? 'table-dark' : ''"
          :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
          tbody-classes="list"
          :data="tele"
        >
          <template v-slot:columns>
            <th>Key</th>
            <th>Value</th>
            <th>Time</th>
          </template>

          <template v-slot:default="row">
            <th scope="row"><base-button type="primary" size="sm" @click="showViz(row.item.key.id)">{{ row.item.key.key }}</base-button></th>
            <td>{{ row.item.value }}</td>
            <td>{{ $filters.moment(row.item.time) }}</td>
          </template>
        </base-table>
      </div>

      <plotly-chart :chart="chart"></plotly-chart>
    
    </div>


    <!-- <modal v-model:show="show_viz"
           body-classes="p-0"
           modal-classes="modal-dialog-centered modal-sm">
      <card type="secondary" shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0">

       
        <h3 class="modal-title mb-3 text-center" id="modal-title-default">Data Visualization</h3>
        <p>Test</p>
               

      </card>
    </modal> -->

  </div>
</template>
<script>

import TelemetryService from "../../services/telemetry.service";
// import moment from "moment";

// import Plotly from "plotly.js";

export default {
  name: "last-tele-table",
  data(){
    return {
      show_viz: false,
      teleChartID: "teleChart",
      telemetry: {},
      chart_exist: false,

      chart: {
        uuid: "123",
        traces: [
          {
            x: [
              // "2021-09-21T01:32:40.448Z", "2021-09-29T03:19:19.011Z",
              // "2021-09-29T03:21:53.280Z", "2021-09-29T03:22:02.213Z",
              // "2021-09-29T03:22:08.614Z", "2021-09-29T03:22:25.603Z",
              // "2021-10-09T23:51:42.856Z"
               ],
            y: [
              // 27.43, 35.5, 34.5, 34.8, 34.9, 35.1, 33
            ],

            type: "scatter",
            // mode: "lines",
            line: {
              color: "#5e9e7e",
              width: 4,
              shape: "line"
            }
          }
        ],
        layout: {
          title:'Please select telemetry key',
          font_size: 16,
          xaxis: {
            title: 'time'
          },
          yaxis: {
            title: 'value'
          }
        },
        config: {
          responsive: true,
        }
      }
    }
  },
  methods: {
    async retrieveTele(key_id) {
      
      this.telemetry = await (await TelemetryService.getTele(this.deviceId, key_id)).data;
      console.log(`retrieve telemetry dev: ${this.deviceId} key: ${key_id}`);
      console.log(this.telemetry);
      return this.telemetry;
    },
    async showViz(id){
      console.log(id);
      
      if (this.chart_exist){
        // chart.destroy();
      }

      await this.retrieveTele(id);
      // this.chart.traces[0].y.push(Math.random()*100);
      // this.chart.traces[0].x.push(this.chart.traces[0].x.length);
      // let time = await this.telemetry.time.map((time) => moment(time).format("YYYY-MM-DD HH:MM:SS.ss"));
      console.log('update chart traces');
      this.chart.traces[0].x = this.telemetry.time;
      this.chart.traces[0].y = this.telemetry.values;
      this.chart.layout.title = '';
      this.chart.layout.yaxis.title = this.telemetry.telemetry_key.key;
      this.chart.layout.datarevision = new Date().getTime();
      console.log(this.chart.traces);

      // Plotly.newPlot(this.chart.uuid, this.chart.traces, this.chart.layout, this.chart.config);

      this.show_viz = true;

      this.chart_exist = true;

    },
  },
  mounted() {

  },
  props: {
    title: String,
    tele: Array,
    deviceId: {
      type: Number,
      required: true
    },
  },
};
</script>
<style></style>
