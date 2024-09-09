<template>
    <div>
        <div v-for="chart in chart_list">
            <Bar v-if="chart.type === 'bar'" :chart-options="options" :chart-data="chart.data" />
            <apexchart v-else-if="chart.type === 'line'" type="line" :options="chart.data.options"
                :series="chart.data.series"></apexchart>
            <p style="text-align: center;
                margin-top: 20px;
                margin-bottom: 20px;
                font-size: 25px;
            " v-else-if="chart.type === 'text'">
                {{ chart.data.data }}
            </p>
        </div>
    </div>
</template>

<script>
import { Bar, Line } from 'vue-chartjs'
import { robotService } from '../service/robots';
import { Chart as ChartJS, LineElement, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, LineElement, BarElement, CategoryScale, LinearScale)

export default {
    components: {
        Bar,
        Line
    },
    props: [
        "execute_id"
    ],
    data: () => {
        return {
            chart_list: [],
            options: {
                responsive: true
            }
        }
    },
    async mounted() {

        let res = await robotService.getProccesedData(this.execute_id);
        let view_data = res.data;

        if (view_data) {
            console.log(666, view_data);
            for (let i = 0; i < view_data.length; i++) {
                let current_data = view_data[i];
                this.addDataView(current_data);
            }
        }
    },
    methods: {
        addDataView(data) {
            if (data.type === "chart") {
                let single_chart = {
                    labels: [],
                    datasets: [{
                        data: [],
                        label: data.title,
                    }]
                };
                let keys = Object.keys(data.data);
                for (let i = 0; i < keys.length; i++) {
                    let key = keys[i];
                    console.log("222", data)
                    let key_data = data.data[keys[i]];
                    console.log(keys[i], key_data);
                    single_chart.labels.push(key);
                    single_chart.datasets[0].data.push(key_data);
                    console.log(single_chart);
                }
                this.chart_list = [...this.chart_list, {
                    type: "bar",
                    data: single_chart
                }]
            }
            if (data.type === "linechart") {
                this.chart_list = [...this.chart_list, {
                    type: "line",
                    data: data,
                }]
            }
            if (data.type === "text") {
                this.chart_list = [...this.chart_list, {
                    type: "text",
                    data: data,
                }]
            }
        }
    }


}
</script>