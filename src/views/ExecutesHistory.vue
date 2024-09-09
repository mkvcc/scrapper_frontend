<template>
    <div>
        <v-data-table :headers="headers" disable-sort :items="items">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>اجرا ها</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-btn @click="updateData">
                        بروزرسانی
                    </v-btn>
                    <v-btn :style="{'margin-right' : '10px'}" @click="show_gui_dialog = true">
                        نمایش گرافیکی
                    </v-btn>

                </v-toolbar>

            </template>
            <template v-slot:item.status="{ item }">
                <v-chip v-if="item.status == 3" class="ma-2" color="green" text-color="white">
                    تکمیل شده
                </v-chip>

                <v-chip v-if="item.status == 1" class="ma-2">
                    در انتظار اجرا
                </v-chip>

                <v-chip v-if="item.status == 2" class="ma-2" color="red" text-color="white">
                    خطا
                </v-chip>
            </template>
            <template v-slot:item.payload="{ item }">
                <v-btn @click="showPayloadData(item)">
                    نمایش
                </v-btn>
            </template>
            <template v-slot:item.response_data="{ item }">
                <v-btn @click="showResponseData(item)">
                    نمایش داده خام
                </v-btn>
            </template>
        </v-data-table>
        <v-dialog v-model="show_response_data_dialog" width="500">
            <v-card>
                <v-card-title class="text-h5 grey lighten-2">

                </v-card-title>
                <v-divider></v-divider>

                <v-card-text>
                    <JsonEditorVue class="jse-theme-dark" style="direction: ltr" v-model="selected_response_data" />
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error " @click="show_response_data_dialog = null">
                        بستن
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="show_payload_dialog" width="500">
            <v-card>
                <v-card-title class="text-h5 grey lighten-2">

                </v-card-title>
                <v-divider></v-divider>

                <v-card-text>
                    <JsonEditorVue class="jse-theme-dark" style="direction: ltr" v-model="selected_payload" />
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error " @click="show_payload_dialog = null">
                        بستن
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="show_gui_dialog" >
            <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                    نمایش گرافیکی
                </v-card-title>
                <v-divider></v-divider>

                <v-card-text>
                    <div v-if="show_gui_dialog" >
                        <ChartView :execute_id="execute_id"></ChartView>
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error " @click="show_gui_dialog = false">
                        بستن
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { robotService } from '../service/robots';
import ChartView from './ChartView.vue';

export default {
    components: {
        ChartView: ChartView
    },
    data: () => {
        return {
            headers: [
                { text: "شناسه", value: "id", sortable: false },
                { text: "وضعیت", value: "status", sortable: false },
                { text: "نتیجه", value: "response_data", sortable: false },
                { text: "داده ورودی", value: "payload", sortable: false },
                { value: "actions", align: "end", sortable: false },
            ],
            execute_active: false,
            items: [],
            show_response_data_dialog: false,
            selected_response_data: null,
            show_payload_dialog: false,
            selected_payload: null,
            show_gui_dialog: false,
            selected_gui: null,
            execute_id: null ,
        }
    },
    async mounted() {
        this.execute_id = this.$route.params.id ;
        await this.loadData();

    },
    methods: {
        showResponseData(item) {
            this.selected_response_data = item.response_data;
            this.show_response_data_dialog = true;

        },
        showPayloadData(item) {
            this.selected_payload = item.payload;
            this.show_payload_dialog = true;

        },
        showGUI(item) {
            this.selected_gui = item;
            this.show_gui_dialog = true;
        },
        async updateData() {
            await this.loadData();
        },
        async loadData() {
            let response = await robotService.executeHistoryList(this.execute_id);
            this.items = response.data;
        }
    }

}

</script>