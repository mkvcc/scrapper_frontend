<template>
    <v-card>
        <v-form style="padding : 15px" > 
            <div v-for="form_item in form">
                <div v-if="form_item.type === 'string'">
                    <v-text-field @input="submitChange" v-model="form_payload[form_item.key]" :label="form_item.label"></v-text-field>
                </div>
                <div v-else-if="form_item.type === 'int'">
                    <v-text-field @input="submitChange" type="number" v-model.number="form_payload[form_item.key]" :label="form_item.label"></v-text-field>
                </div>
                <div v-else-if="form_item.type === 'dropdown'">
                    <v-select
                        v-model="form_payload[form_item.key]"
                      :items="form_item.config"
                      :label="form_item.label"
                      item-text="name"
                      item-value="key"
                    ></v-select>
                </div>
            </div>
        </v-form>
    </v-card>
</template>

<script>
export default {
    data: () => {
        return {
            form_payload: {}
        }
    } ,
    props: [
        "form"
    ] ,
    methods: {
        submitChange() {
            console.log("submit")
            this.$emit("input" , JSON.parse(JSON.stringify(this.form_payload)))
        }
    }
}
</script>