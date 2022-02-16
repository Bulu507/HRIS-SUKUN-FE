<template>
  <div>
    <v-breadcrumbs
      class="breadcrumbsmain fontall"
      :items="itemsbr"
      large
      color="black"
      style="font-weight: bold"
      ><template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template></v-breadcrumbs
    >

    <v-data-table
      :headers="headers"
      :items="dataobject"
      :search="search"
      class="rounded elevation-6 mx-3 pa-1 fontall"
    >
      <template v-slot:item.status="{ item }">
        <v-chip label :color="getColorStatus(item.status)" dark>
          <v-icon medium class="mr-1" color="white">
            {{ getIconStatusAdmin(item.status) }}
          </v-icon>
          {{ getStatus(item.status) }}
        </v-chip>
      </template>

      <template v-slot:top>
        <v-toolbar flat>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search here..."
            single-line
            hide-details
          ></v-text-field>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <!-- <v-btn dark class="mb-2" @click="showAddModal()" color="green">
            <v-icon small>mdi-plus</v-icon> Add Item
          </v-btn> -->
          <v-dialog v-model="dialog" max-width="800px">
            <v-card>
              <v-card-title class="headermodalstyle mb-0">
                Detail Pending Task
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text class="fontall">
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <div>
                        <h5>Judul Pengajuan</h5>
                        <h3 class="ml-2">
                          {{ defaultItem.judul }}
                        </h3>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="3" md="3">
                      <div>
                        <h5>Pembuat</h5>
                        <h3 class="ml-2">{{ defaultItem.name }}</h3>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="3" md="3">
                      <div>
                        <h5>Tanggal</h5>
                        <h3 class="ml-2">
                          {{ gettanggal(defaultItem.created_at) }}
                        </h3>
                      </div>
                    </v-col>
                  </v-row>
                  <!-- <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <div>
                        <h5>Judul Menu</h5>
                        <h3 class="ml-2">{{ defaultItem.judul }}</h3>
                      </div>
                    </v-col>
                  </v-row> -->
                  <v-row>
                    <h5 class="ml-3">Isi Pengajuan</h5>
                    <v-card class="ml-4" color="#9CACA3" width="725px">
                      <v-card-text class="fontall pa-1">
                        <v-container class="pa-1">
                          <v-simple-table
                            class="rounded elevation-1 mx-4 pa-1 my-3"
                          >
                            <template v-slot:default>
                              <tbody>
                                <tr>
                                  <th
                                    class="text-left"
                                    style="
                                      width: 250px !important;
                                      font-size: 14px;
                                    "
                                  >
                                    Term Of Payment
                                  </th>
                                  <td
                                    class="text-left"
                                    style="font-size: 14px; font-weight: bold"
                                  >
                                    <v-chip label color="orange" dark>
                                      {{ detailTask.term_of_payment }} -
                                      {{ detailTask.lama_tempo }} hari
                                    </v-chip>
                                  </td>
                                </tr>
                                <tr>
                                  <th class="text-left" style="font-size: 14px">
                                    Diskon
                                  </th>
                                  <td
                                    class="text-left"
                                    style="font-size: 14px; font-weight: bold"
                                  >
                                    <v-chip label color="orange" dark>
                                      {{ detailTask.jumlah_discount }} %
                                    </v-chip>
                                  </td>
                                </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
                          <v-simple-table
                            class="rounded elevation-1 mx-4 pa-1 my-3"
                          >
                            <template v-slot:default>
                              <tbody>
                                <tr>
                                  <th
                                    class="text-left"
                                    style="
                                      width: 250px !important;
                                      font-size: 14px;
                                    "
                                  >
                                    No Order
                                  </th>
                                  <td
                                    class="text-left"
                                    style="font-size: 14px; font-weight: bold"
                                  >
                                    {{ detailTask.order_no }}
                                  </td>
                                </tr>
                                <tr>
                                  <th class="text-left" style="font-size: 14px">
                                    Nama Customer
                                  </th>
                                  <td
                                    class="text-left"
                                    style="font-size: 14px; font-weight: bold"
                                  >
                                    {{ detailTask.nama_customer }}
                                  </td>
                                </tr>
                                <tr>
                                  <th
                                    rowspan="2"
                                    class="text-left"
                                    style="font-size: 14px"
                                  >
                                    Alamat
                                  </th>
                                  <td
                                    class="text-left"
                                    style="font-size: 14px; font-weight: bold"
                                  >
                                    {{ detailTask.alamat }}
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    class="text-left"
                                    style="font-size: 14px; font-weight: bold"
                                  >
                                    {{ detailTask.alamat_ro }}
                                  </td>
                                </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
                          <v-data-table
                            :headers="headersProduct"
                            :items="detailTask.list_order"
                            :search="search"
                            class="rounded elevation-1 mx-4 pa-1 my-3 fontall"
                            hide-default-footer
                            disable-pagination
                          >
                            <template v-slot:item.harga="{ item }">
                              {{ getRupiah(item.harga) }}
                            </template>
                            <template v-slot:item.jumlah="{ item }">
                              {{ item.jumlah }} {{ item.satuan }}
                            </template>
                          </v-data-table>
                        </v-container>
                      </v-card-text>
                    </v-card>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="success" elevation="1" outlined @click="approve">
                  <v-icon left> mdi-checkbox-marked-circle-outline </v-icon>
                  Approve
                </v-btn>
                <v-btn color="red" elevation="1" outlined @click="reject">
                  <v-icon left> mdi-close-circle-outline </v-icon> Reject
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon class="mr-2" @click="detailItem(item)" color="#25695C">
          mdi-information-outline
        </v-icon>
        <!-- <v-icon @click="deleteItem(item)" color="red"> mdi-delete </v-icon> -->
      </template>
    </v-data-table>

    <v-snackbar
      v-model="snackbar"
      :color="colorsnackbar"
      :timeout="timeoutsnackbar"
    >
      {{ textsnackbar }}
    </v-snackbar>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PendingTask",
  data: () => ({
    itemsbr: [
      {
        text: "Task",
        disabled: true,
        href: "breadcrumbs_dashboard",
      },
      {
        text: "Pending Task",
        disabled: true,
        href: "breadcrumbs_link_1",
      },
    ],

    formTitle: "Add Item",
    value: "add",
    dialog: false,
    dialogDelete: false,
    search: "",
    authtoken: "",
    BaseUrlGet: "",
    headers: [
      { text: "Nama Menu", value: "nama_menu", align: "center" },
      { text: "Nama Task", value: "judul", align: "center" },
      { text: "Pembuat", value: "name", align: "center" },
      { text: "Status", value: "status", align: "center" },
      //   { text: "User ID", value: "username" },
      {
        text: "Actions",
        value: "actions",
        align: "center",
        sortable: false,
        width: "15%",
      },
    ],
    headersProduct: [
      { text: "Product", value: "nama_product" },
      { text: "Harga", value: "harga" },
      { text: "Jumlah", value: "jumlah" },
      { text: "Keterangan", value: "deskripsi" },
    ],
    dataobject: [],

    defaultItem: {
      id: "",
      nama_menu: "",
      name: "",
      judul: "",
      created_at: "",
      status: "",
      gambar: "",
    },

    detailTask: {
      judul: "",
      isi: "",
      kategori: "",
      tanggal: "",

      order_no: "",
      alamat_ro: "",
      status_task: "",
      status_so: "",
      jumlah_barang: "",
      jumlah_uang: "",
      nama_sales: "",
      code_customer: "",
      nama_customer: "",
      code_salesman: "",
      alamat: "",
      code_alamat_ro: "",
      alamat_cust_ro: "",
      jumlah_discount: "",
      term_of_payment: "",
      lama_tempo: "",
      due_date: "",
      created_at: "",
      itemsProductSelected: "",
      list_order: [],
      kabROCombobox: "",
    },

    itemsStatus: [
      { text: "Reseller", value: "1" },
      { text: "Cust Reguler", value: "0" },
    ],
    snackbar: false,
    textsnackbar: "Test",
    timeoutsnackbar: 2000,
    colorsnackbar: null,

    admin_id: "",
  }),

  created() {
    this.authtoken = localStorage.getItem("token");
    this.BaseUrlGet = localStorage.getItem("BaseUrlGet");
    this.User = JSON.parse(localStorage.getItem("User"));
    if (this.User) {
      this.admin_id = this.User.code;
    }
    this.initialize();
  },

  methods: {
    async initialize() {
      try {
        const response = await axios.get(this.BaseUrlGet + "GetPendingTask", {
          headers: {
            Authorization: `Bearer ` + this.authtoken,
          },
        });
        console.log(response.data.data.result.data);
        if (response.data.length != 0) {
          this.dataobject = response.data.data.result.data;
        } else {
          console.log("Kosong");
          this.dataobject = [];
        }
      } catch (error) {
        console.error(error);
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        } else {
          this.dataobject = [];
        }
      }
    },

    async getDetail() {
      try {
        const response = await axios.get(
          this.BaseUrlGet + "GetDetailPendingTask?id=" + this.defaultItem.id,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        console.log(response.data.data.result);
        if (response.data.length != 0) {
          this.defaultItem = response.data.data.result.GetDetailPendingTask;
          this.detailTask = response.data.data.result.GetDetailTask;
        } else {
          console.log("Kosong");
        }
      } catch (error) {
        console.error(error);
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        }
      }
    },

    async approveTask() {
      const datapost = {
        id: this.defaultItem.id,
        status: this.defaultItem.status,
        admin_id: this.admin_id,
      };
      console.log(datapost);
      // this.dialogDetail = false;
      try {
        const response = await axios.post(
          this.BaseUrlGet + "ApproveTask",
          datapost,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        // console.log(response.data.data.result);
        this.dialog = false;
        this.snackbar = true;
        this.colorsnackbar = "green";
        this.textsnackbar = "Sukses Approve data";
        this.initialize();
        // if (response.data.data.result == "success") {
        //   this.dialog = false;
        //   this.snackbar = true;
        //   this.colorsnackbar = "green";
        //   this.textsnackbar = "Sukses tambah data";
        //   this.initialize();
        // } else {
        //   //   this.dialog = false;
        //   this.snackbar = true;
        //   this.colorsnackbar = "red";
        //   this.textsnackbar = "Gagal ubah data";
        // }
      } catch (error) {
        console.error(error.response);
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        } else {
          this.snackbar = true;
          this.colorsnackbar = "red";
          this.textsnackbar = "Gagal ubah data";
        }
      }
    },

    detailItem(item) {
      console.log(item);
      this.defaultItem = Object.assign({}, item);
      this.getDetail();
      this.dialog = true;
    },
    deleteItem(item) {
      this.defaultItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.closeDelete();
      this.verifDelete();
    },
    close() {
      this.dialog = false;
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    approve() {
      console.log("approve");
      this.defaultItem.status = "Approved";
      this.approveTask();
    },
    reject() {
      console.log("reject");
      this.defaultItem.status = "Rejected";
      this.approveTask();
    },
    getStatus(status) {
      if (status == "Pending") return "Pending";
      else if (status == "Approved") return "Approved";
      else return "Rejected";
    },
    getColorStatus(status) {
      if (status == "Pending") return "#BF9168";
      else if (status == "Approved") return "#25695C";
      else return "#D42F2F";
    },
    getIconStatusAdmin(status) {
      if (status == "Pending") return "mdi-update";
      else if (status == "Approved")
        return "mdi-checkbox-marked-circle-outline";
      else return "mdi-close-circle-outline";
    },
    getRupiah(val) {
      var bilangan = val;

      if (bilangan) {
        var number_string = bilangan.toString(),
          sisa = number_string.length % 3,
          rupiah = number_string.substr(0, sisa),
          ribuan = number_string.substr(sisa).match(/\d{3}/g);

        if (ribuan) {
          var separator = sisa ? "." : "";
          rupiah += separator + ribuan.join(".");
        }

        return "Rp. " + rupiah;
      }
    },
    gettanggal(val) {
      var bulanIndo = [
        "",
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Juni",
        "Juli",
        "Agust",
        "Sept",
        "Okt",
        "Nov",
        "Des",
      ];

      var date = val.split(" ")[0];

      var tanggal = date.split("-")[2];
      var bulan = date.split("-")[1];
      var tahun = date.split("-")[0];

      return tanggal + " " + bulanIndo[Math.abs(bulan)] + " " + tahun;
    },
  },
};
</script>
