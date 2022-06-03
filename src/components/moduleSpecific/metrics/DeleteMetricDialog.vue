<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="60%">
      <v-card>
        <v-card-title class="text-h5">
          Are you sure want to delete?
        </v-card-title>
        <v-card-text>{{ selectedName }}</v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="grey lighten-1" @click="closeDialog()"> Cancel </v-btn>
          <v-btn color="red darken-1" text @click="deleteMetric()">
            Sure!
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { Repository } from "@/repositories/repository";
const MetricsRepo = Repository.get("metrics");

export default {
  name: "DeleteMetricsDialog",
  data: () => ({
    dialog: false,
    selectedId: "",
    selectedName: "",
  }),
  methods: {
    closeDialog() {
      this.dialog = false;
    },
    showDialog(_systemid, _name) {
      this.dialog = true;
      this.selectedId = _systemid;
      this.selectedName = _name;
    },
    async deleteMetric() {
      await MetricsRepo.deleteMetric(this.selectedId)
        .then((res) => {
          console.log("Deleted");
          window.alert("Success Delete: " + this.selectedName);
          this.$emit("refresh");
          this.dialog = false;
        })
        .catch((err) => {
          console.log("Error", err);
        });
    },
  },
};
</script>