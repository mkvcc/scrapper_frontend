<template>
    <div>
        <v-data-table :headers="headers" disable-sort :items="items">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>ربات ها</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                </v-toolbar>
            </template>
            <template v-slot:item.display_name="{ item }">
                {{ item.config.display_name ? item.config.display_name : "" }}
            </template>
            <template v-slot:item.actions="{ item }">
                <v-btn color="primary" small @click="activateExecute(item)">
                    اجرا
                </v-btn>
            </template>
        </v-data-table>
        <v-dialog v-model="execute_active" width="500">
            <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                    درخواست اجرا
                </v-card-title>
                <v-divider></v-divider>

                <v-card-text>
                    <v-text-field v-model="execute_form.name" label="نام"></v-text-field>
                    <v-text-field v-model.number="execute_form.interval" type="number" label="تاخیر اجرا"></v-text-field>

                    <v-icon @click="addPayload" color="gray darken-2">
                        mdi-plus
                    </v-icon>

                    <div 
                    v-for="(payload, i) in execute_form.payloads"
                     style="margin-top: 10px">
                        <FormRenderer v-model="execute_form.payloads[i]" :form="execute_form.form" />
                    </div>


                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn color="success" @click="execute">
                        اجرا
                    </v-btn>
                    <v-btn color="error " @click="execute_active = false">
                        بستن
                    </v-btn>


                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
import { robotService } from '../service/robots';
import FormRenderer from './FormRenderer.vue'

export default {
    components: {FormRenderer } ,
    data: () => {
        return {
            headers: [
                { text: "نام", value: "name", sortable: false },
                { text: "نام نمایشی", value: "display_name", sortable: false },
                { value: "actions", align: "end", sortable: false },
            ],
            execute_active: false,
            items: [],
            execute_form: {
                name: "",
                robot_name: "",
                interval: 30,
                payloads: [],
            },
            selected_robot: null
        }
    },
    async mounted() {
        let response = await robotService.getRobots();
        this.items = response.data;
    },
    methods: {
        activateExecute(robot) {
            console.log(robot)
            this.execute_active = true;
            this.execute_form.name = "";
            this.execute_form.form = robot.config.form ?? [];
            this.execute_form.robot_name = robot.name;
            this.execute_form.inrval = 30;
            this.execute_form.payloads = [{}]
        },
        addPayload() {
            this.execute_form.payloads.push({});
        } , 
        async execute() {
            let response = await robotService.execute(this.execute_form);
            if (response.status == 201) {
                this.execute_active = false ;
            }

        }
    }


}

</script>