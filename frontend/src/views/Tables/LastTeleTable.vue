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
import moment from "moment";

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
            x: [],
            y: [],

            type: "scatter",
            mode: "lines",
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
            title: 'xaxis title'
          },
          yaxis: {
            title: 'yaxis title'
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
      this.chart.traces[0].x = this.telemetry.time.map((time) => moment(time).format("YYYY-MM-DD HH:MM:SS.ss"));
      this.chart.traces[0].y = this.telemetry.values;
      this.chart.layout.title = this.telemetry.telemetry_key.key;
      this.chart.layout.datarevision = new Date().getTime();
      console.log('update chart traces');
      console.log(typeof(this.chart.traces[0].x));
      // this.chart.layout.title = this.telemetry.telemetry_key.key;

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
