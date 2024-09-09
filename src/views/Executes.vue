<template>
    <div>
        <v-data-table :headers="headers" disable-sort :items="items">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>اجرا ها</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-btn color="primary" small @click="showHistory(item.id)">
                    تاریخچه
                </v-btn>
            </template>
        </v-data-table>

    </div>
</template>

<script>
import { robotService } from '../service/robots';

export default {
    data: () => {
        return {
            headers: [
                { text: "نام", value: "name", sortable: false },
                { text: "نام ربات", value: "robot_name", sortable: false },
                { text: "تعداد درخواست", value: "history_count", sortable: false },
                { value: "actions", align: "end", sortable: false },
            ],
            execute_active: false,
            items: [],
        }
    },
    async mounted() {
        let response = await robotService.executeList();
        this.items = response.data;
    },
    methods: {
        showHistory(id) {
            this.$router.push({ name: "history", params: { id: id } })
        }
    }

}

</script>