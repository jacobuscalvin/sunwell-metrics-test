<template>
  <v-container>
    <!-- Otomatis dari vue.js mengubah components CreateMetricDialog menjadi <create-metric-dialog/> -->
    <!-- Button metric dialog -->
    <h1 class="blue--text">Metric</h1>
    <v-layout>
      <v-layout>
        <v-layout justify-end class="pa-md-2 mx-lg-auto">
          <v-spacer />
          <v-tooltip bottom>
            <template #activator="{ on }">
              <v-btn
                v-on="on"
                outlined
                color="cyan"
                style="margin-right: 0.5%"
                @click="showCreateDialog()"
              >
                Create Metric
              </v-btn>
            </template>
            <span>Create</span>
          </v-tooltip>
        </v-layout>
      </v-layout>
    </v-layout>
    <v-data-table
      :page="paginate.page"
      :headers="headers"
      :items="metrics.data"
      :options.sync="paginate"
      :server-items-length="totalMetric"
      class="mt-6 row-pointer"
    >
      <template #item="props">
        <tr>
          <td>{{ changeIndex(props.index) }}</td>
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.memo }}</td>
          <td align="center">
            <!-- Button Update -->
            <v-tooltip bottom>
              <template #activator="{ on }">
                <v-icon
                  class="blue--text"
                  v-on="on"
                  style="margin-right: 0.5%"
                  @click="
                    showUpdateDialog(props.item.systemid)
                  "
                >
                  mdi-pencil
                </v-icon>
              </template>
              <span>Update</span>
            </v-tooltip>

            &nbsp;

            <!-- Button Delete -->
            <v-tooltip bottom>
              <template #activator="{ on }">
                <v-icon
                  class="red--text"
                  v-on="on"
                  style="margin-right: 0.5%"
                  @click="
                    showDeleteDialog(props.item.systemid, props.item.name)
                  "
                >
                  mdi-close-octagon
                </v-icon>
              </template>
              <span>Delete</span>
            </v-tooltip>
          </td>
        </tr>
      </template>
    </v-data-table>
    <create-metric-dialog ref="create_metric_dialog" @refresh="refresh()" />
    <update-metric-dialog ref="update_metric_dialog" @refresh="refresh()" />
    <delete-metric-dialog ref="delete_metric_dialog" @refresh="refresh()" />
  </v-container>
</template>

<script>
// import { x } -> dipakai kalo ga ada export default dalam filenya, supaya ga bingung manggil sintax yg mana
import { Repository } from "@/repositories/repository";
// import x -> tidak pakai kurung kurawal, dipakai ketika ada export default dalam filenya
import CreateMetricDialog from "@/components/moduleSpecific/metrics/CreateMetricDialog.vue";
import UpdateMetricDialog from "@/components/moduleSpecific/metrics/UpdateMetricDialog.vue";
import DeleteMetricDialog from "@/components/moduleSpecific/metrics/DeleteMetricDialog.vue";

const MetricsRepo = Repository.get("metrics");

export default {
  name: "metrics",
  components: {
    CreateMetricDialog,
    UpdateMetricDialog,
    DeleteMetricDialog,
  },
  created() {
    this.getMetrics();
  },
  data: () => ({
    headers: [{ 
      text: "No." , sortable: false }, 
      { text: "Metric Name" , sortable: false }, 
      { text: "Memo" , sortable: false }, 
      { text: "Action" , sortable: false , align: "center" }
    ],
    metrics: [],
    // totalMetric adalah keseluruhan data yang ada di backend
    totalMetric: 1,
    paginate: {
      page: 1,
      itemsPerPage: 10,
    },
    search: {
      page: 1,
      limit: 5,
    },
  }),
  watch: {
    paginate: {
      handler() {
        this.getMetrics();
      },
      deep: true,
    },
  },
  methods: {
    changeIndex(_index) {
      // _varx -> nama parameter
      return _index + 1 + (this.paginate.page - 1) * this.paginate.itemsPerPage;
    },
    // pakai async supaya memastikan function ini beres dulu dijalankan
    // setelah itu baru function selanjutnya
    // async - await saling berhubungan
    // await merupakan properti dari async
    async getMetrics() {
      const { page, itemsPerPage } = this.paginate;
      console.log("Paginate", this.paginate);
      this.search.page = page;

      if (itemsPerPage === -1) {
        this.search.limit = this.totalMetric;
      } else {
        this.search.limit = itemsPerPage;
      }

      try {
        // buat variable response, untuk menampung data metrics yang di get dari API
        const response = await MetricsRepo.getMetrics(this.search);
        this.metrics = response.data;
        // meta digunakan untuk
        this.totalMetric = response.data.meta.total;
        console.log("Debug resp: ", this.totalMetric);
      } catch (error) {
        console.log("ERROR Get Metrics \n", error);
      }
    },
    async refresh() {
      try {
        await this.getMetrics();
      } catch (error) {
        console.log("[ ERROR ] \n", error);
      }
    },
    showCreateDialog() {
      this.$refs.create_metric_dialog.showDialog();
    },
    showUpdateDialog(_systemid) {
      this.$refs.update_metric_dialog.getById(_systemid);
    },
    showDeleteDialog(_systemid, _name) {
      this.$refs.delete_metric_dialog.showDialog(_systemid, _name);
    },
  },
};
</script>