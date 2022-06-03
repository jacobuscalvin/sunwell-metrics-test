 <template>
  <v-dialog
    v-model="dialog"
    persistent
    scrollable
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar flat color="primary" dark>
        <v-toolbar-title class="white--text"> Update Metric </v-toolbar-title>
        <v-spacer />

        <v-divider class="divider" vertical inset />
        <!-- Close-->
        <v-tooltip bottom>
          <template #activator="{ on }">
            <v-btn icon v-on="on" @click="closeDialog()">
              <v-icon class="white--text"> mdi-close </v-icon>
            </v-btn>
          </template>
          <span>Close</span>
        </v-tooltip>
      </v-toolbar>
      <v-card-text>
        <v-form class="pt-4" v-model="valid">
          <v-text-field
            label="Name"
            placeholder="Metric Name"
            prepend-icon="mdi-content-paste"
            v-model="request.name"
            :rules="[rules.required]"
          />

          <v-textarea
            v-model="request.memo"
            :rules="[rules.required]"
            label="Memo"
            placeholder="Metric Memo"
            prepend-icon="mdi-comment-text"
            rows="4"
          />
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn outlined color="orange" @click="closeDialog()"> Cancel </v-btn>
        <v-btn
          outlined
          color="primary"
          :disabled="!valid"
          @click="updateMetric()"
        >
          Update
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { Repository } from "@/repositories/repository";
const MetricsRepo = Repository.get("metrics");

export default {
  name: "UpdateMetricDialog",
  data: () => ({
    dialog: false,
    valid: false,
    selectedId: "",
    rules: {
      // dipanggil oleh :rules, kemudian cek v-model
      // !! -> untuk return boolean (statement if)
      required: (v) => !!v || "Field is required",
    },
    request: {
      name: "",
      memo: "",
    },
  }),
  methods: {
    closeDialog() {
      this.dialog = false;
    },
    async getById(_systemid) {
      this.dialog = true;
      this.selectedId = _systemid;
      try {
        const response = await MetricsRepo.getById(_systemid);
        this.request.name = response.data.name;
        this.request.memo = response.data.memo;
        console.log("[DEBUG] Response", response);
      } catch (error) {
        console.log("[ERROR] \n", error);
      }
    },
    async updateMetric() {
      await MetricsRepo.updateMetric(this.selectedId, this.request)
        .then((res) => {
          console.log("Updated");
          window.alert("Success Update Metric");
          this.request.name = "";
          this.request.memo = "";
          this.$emit("refresh");
          this.dialog = false;
        })
        .catch((err) => {
          console.log("Error \n", err);
        });
    },
  },
};
</script>