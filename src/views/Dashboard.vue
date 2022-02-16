<template>
  <v-container class="mt-9 pa-0">
    <v-row dense class="mt-5">
      <v-col class="pa-2" cols="12" md="12">
        <v-card>
          <v-card-title class="fontall" v-if="isMorning()">
            Good Morning, {{ namaAdmin }}</v-card-title
          >
          <v-card-title class="fontall" v-else>
            Good Afternoon, {{ namaAdmin }}</v-card-title
          >
          <v-card-subtitle class="fontall">
            it's
            {{
              new Date().toLocaleDateString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            }}
          </v-card-subtitle>
          <v-card-text>
            <v-row>
              <v-col cols="6" md="3" class="d-flex align-end">
                <v-avatar size="50" rounded class="elevation-1">
                  <v-icon dark size="40" color="#444941"
                    >mdi-account-multiple
                  </v-icon>
                </v-avatar>
                <div class="ms-3">
                  <p class="itemparent mb-0">
                    {{ data1.Judul }}
                  </p>
                  <h3 class="fontall">
                    {{ data1.Count }}
                  </h3>
                </div>
              </v-col>

              <v-col cols="6" md="3" class="d-flex align-end">
                <v-avatar size="50" rounded class="elevation-1">
                  <v-icon size="40" color="#444941">mdi-account-remove</v-icon>
                </v-avatar>
                <div class="ms-3">
                  <p class="itemparent mb-0">
                    {{ data2.Judul }}
                  </p>
                  <h3 class="fontall">
                    {{ data2.Count }}
                  </h3>
                </div>
              </v-col>

              <v-col cols="6" md="3" class="d-flex align-end">
                <v-avatar size="50" rounded class="elevation-1">
                  <v-icon size="40" color="#444941">mdi-account-check</v-icon>
                </v-avatar>
                <div class="ms-3">
                  <p class="itemparent mb-0">
                    {{ data4.Judul }}
                  </p>
                  <h3 class="fontall">
                    {{ data4.Count }}
                  </h3>
                </div>
              </v-col>
              <v-col cols="3">
                <v-row align="center" justify="center" class="mb-0">
                  <v-img
                    max-width="150"
                    src="/images/people.png"
                    style="margin-top: 2px"
                  ></v-img>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row dense class="mt-5">
      <v-col class="pa-2 mb-3" cols="12" sm="4" md="4">
        <v-card class="fontall pa-md-4" height="355px" elevation="5">
          <header class="fontall pa-2 mb-3" style="text-align: center">
            Employee Age Breakdown
          </header>
          <div>
            <apexchart
              type="bar"
              height="250"
              :options="chartOptionsColumn"
              :series="seriesColumn"
              class="fontall"
            ></apexchart>
          </div>
        </v-card>
      </v-col>
      <v-col class="pa-2 mb-3" cols="12" sm="4" md="4">
        <v-card class="fontall pa-md-4" height="355px" elevation="5">
          <header class="fontall pa-2 mb-3" style="text-align: center">
            Employment Status
          </header>

          <div id="chart" class="fontall">
            <apexchart
              type="bar"
              height="250"
              :options="chartOptionsBar"
              :series="seriesBar"
            ></apexchart>
          </div>
        </v-card>
      </v-col>
      <v-col class="pa-2 mb-3" cols="12" sm="4" md="4">
        <v-card class="fontall pa-md-4" height="355px" elevation="5">
          <header class="fontall pa-2 mb-3" style="text-align: center">
            Gender Diversity
          </header>
          <div>
            <apexchart
              width="350"
              type="donut"
              :options="chartOptionsDonut"
              :series="seriesDonut"
              :color="colors"
              class="fontall"
            ></apexchart>
          </div>
        </v-card>
      </v-col>
      <v-col class="pa-2 mb-3" cols="12" sm="6" md="6">
        <v-card class="fontall pa-md-4" height="355px" elevation="5">
          <header
            class="fontall pa-2 mb-3"
            style="text-align: center"
            table-header-color="orange"
          >
            List Karyawan Terlambat
          </header>

          <v-data-table
            id="mytable"
            :headers="headers"
            :items="profils"
            hide-default-footer
            disable-sort
          >
          </v-data-table>
        </v-card>
      </v-col>
      <v-col class="pa-2 mb-3" cols="12" sm="6" md="6">
        <v-card class="fontall pa-md-4" height="355px" elevation="5">
          <header class="fontall pa-2 mb-3" style="text-align: center">
            Info & Task
          </header>

          <v-tabs v-model="tab" background-color="#9CACA3" color="black" grow>
            <v-tab class="itemparent" href="#pengumuman"> Pengumuman </v-tab>
            <v-tab class="itemparent" href="#persetujuan"> Persetujuan </v-tab>
            <v-tab class="itemparent" href="#perpanjangkontrak"
              >Perpanjang Kontrak</v-tab
            >
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item :key="1" value="pengumuman">
              <v-card flat>
                <v-data-table
                  :headers="headersPengumuman"
                  :items="itemPengumuman"
                  hide-default-footer
                  disable-sort
                  hide-default-header
                >
                  <template v-slot:item.actions="{ item }">
                    <v-icon
                      class="mr-1"
                      @click="showEditModal(item)"
                      color="#bf9168"
                    >
                      mdi-pencil-outline
                    </v-icon>

                    <v-icon @click="showDeleteModal(item)" color="#d42f2f">
                      mdi-alpha-x-circle-outline
                    </v-icon>
                  </template>
                </v-data-table>
              </v-card>
            </v-tab-item>

            <v-tab-item :key="2" value="persetujuan">
              <v-card flat>
                <v-data-table
                  :headers="headersPengumuman"
                  :items="itemPengumuman"
                  hide-default-footer
                  disable-sort
                  hide-default-header
                >
                  <template v-slot:item.actions="{ item }">
                    <v-simple-checkbox
                      v-model="item.actions"
                    ></v-simple-checkbox>

                    <v-icon @click="showDeleteModal(item)" color="#d42f2f">
                      mdi-alpha-x-circle-outline
                    </v-icon>
                  </template>
                </v-data-table>
              </v-card>
            </v-tab-item>

            <v-tab-item :key="3" value="perpanjangkontrak">
              <v-card flat>
                <v-card flat>
                  <v-data-table
                    :headers="headersKontrak"
                    :items="itemKontrak"
                    hide-default-footer
                    disable-sort
                    hide-default-header
                  >
                    <template v-slot:item.actions="{ item }">
                      <v-simple-checkbox
                        v-model="item.actions"
                      ></v-simple-checkbox>

                      <v-icon @click="showDeleteModal(item)" color="#d42f2f">
                        mdi-alpha-x-circle-outline
                      </v-icon>
                    </template>
                  </v-data-table>
                </v-card>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import axios from "axios";

import VueApexCharts from "vue-apexcharts";

const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "black"],
  ["purple", "violet"],
  ["#FF0", "#F0F", "#00c6ff"],
  ["#1feaea", "#ffd200", "#f72047"],
];

export default {
  name: "Dashboard",

  components: {
    apexchart: VueApexCharts,
  },
  data: () => ({
    tab: null,
    isMorning() {
      return new Date().getHours() < 12 ? true : false;
    },
    seriesDonut: [100, 55],
    chartOptionsDonut: {
      chart: {
        type: "donut",
        fontFamily: "Montserrat",
      },
      responsive: [
        {
          breakpoint: undefined,
          options: {},
        },
      ],
      legend: {
        position: "bottom",
        fontWeight: "bold",
      },
      labels: ["Laki-laki", "Perempuan"],
      colors: ["#444941", "#99A799"],
    },
    seriesBar: [
      {
        name: "Permanent",
        data: [100],
      },
      {
        name: "Contract",
        data: [212],
      },
      {
        name: "Probation",
        data: [333],
      },
    ],
    chartOptionsBar: {
      chart: {
        type: "bar",
        height: 200,
        stacked: true,
        stackType: "100%",
        fontFamily: "Montserrat",
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },

      stroke: {
        width: 1,
        colors: ["#444941"],
      },
      xaxis: {
        categories: ["Status"],
      },

      fill: {
        opacity: 1,
      },
      colors: ["#444941", "#99A799", "#25695C"],
      legend: {
        position: "bottom",
        horizontalAlign: "left",
        offsetX: 40,
        fontWeight: "bold",
      },
    },
    seriesColumn: [
      {
        name: "Age Groups",
        data: [35, 50, 47, 38, 25],
      },
    ],
    chartOptionsColumn: {
      chart: {
        type: "bar",
        height: 200,
        fontFamily: "Montserrat",
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      colors: ["#99A799", "#25695C"],
      legend: {
        position: "bottom",
        horizontalAlign: "left",
        offsetX: 40,
        fontWeight: "bold",
      },
      xaxis: {
        categories: ["20'an", "30'an", "40'an", "50'an", "60'an"],
        title: {
          text: "Age Groups",
        },
      },
      yaxis: {
        title: {
          text: "Employee",
        },
      },
      fill: {
        opacity: 1,
      },
    },

    drawer: null,
    BaseUrlGet: "",
    authtoken: "",

    headers: [
      {
        text: "Nama",
        align: "center",
        sortable: false,
        value: "name",
      },
      { text: "Email", value: "email", align: "center" },

      { text: "Kedatangan", value: "time", align: "center" },
    ],
    profils: [
      {
        name: "Admin1",
        email: "admin1@mail.com",
        time: "10.00",
        status: "1",
      },
      {
        name: "Admin2",
        email: "admin2@mail.com",
        time: "09.33",
        status: "1",
      },
      {
        name: "Cust1",
        email: "cust1@mail.com",
        time: "09.55",
        status: "1",
      },
      {
        name: "Cust2",
        email: "cust2@mail.com",
        time: "09.25",
        status: "1",
      },
    ],
    headersPengumuman: [
      {
        text: "Isi",
        align: "start",
        sortable: false,
        value: "isi",
      },
      { text: "Actions", value: "actions", sortable: false, width: "15%" },
    ],
    itemPengumuman: [
      {
        isi: "Akhir bulan akan diadakan kerja bakti untuk seluruh kantor",
      },
      {
        isi: "Peresmian kepala cabang akan dilakukan pada hari selasa",
      },
      {
        isi: "Karena Hari Minggu tanggal merah, kita libur",
      },
    ],
    headersKontrak: [
      {
        text: "Nama",
        align: "center",
        sortable: false,
        value: "name",
      },
      { text: "Email", value: "email", align: "center" },
      {
        text: "Actions",

        value: "actions",
        sortable: false,
        width: "15%",
      },
    ],
    itemKontrak: [
      {
        name: "Admin1",
        email: "admin1@mail.com",
        status: "1",
      },
      {
        name: "Admin2",
        email: "admin2@mail.com",

        status: "1",
      },
      {
        name: "Cust1",
        email: "cust1@mail.com",
        status: "1",
      },
      {
        name: "Cust2",
        email: "cust2@mail.com",
        status: "1",
      },
    ],
    defaultItem: {
      code: "",
      nama: "",
      email: "",
      status: "",
      status_name: "",
    },

    data1: {
      Judul: "Jumlah Karyawan",
      Deskripsi: "Detail Data Total Karyawan",
      Count: "1",
      link: "/",
    },
    data2: {
      Judul: "Jumlah Karyawan Ijin",
      Deskripsi: "Detail Data Karyawan Ijin",
      Count: "11",
      link: "/",
    },
    data3: {
      Judul: "Persetujuan",
      Deskripsi: "Detail Data Persetujuan",
      Count: "111",
      link: "/",
    },
    data4: {
      Judul: "Karyawan Terlambat",
      Deskripsi: "Detail Karywan Terlambat",
      Count: "1111",
      link: "/",
    },

    gradientDirection: "top",
    gradients,
    gradient: gradients[10],
    labelsSparkline: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "August",
      "Sept",
      "Okt",
      "Nop",
      "Dec",
    ],
    valueSparkline: [350, 200, 410, 390, 310, 460, 250, 240, 0, 0, 0, 0],
    srcimage: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
    datacollection: null,
    namaAdmin: "Nama Admin",

    chartData: [
      ["Tempat", "Total"],
      ["Lokasi1", 1000],
      ["Lokasi2", 1170],
      ["Lokasi3", 760],
      ["Lokasi4", 1030],
      ["Lokasi5", 600],
    ],
    chartOptionsGoogle: {
      title: "Chart Dashboard",
      // pieHole: 0.4,
      is3D: true,
      legend: "none",
      pieSliceText: "label",
      width: $(window).width() * 0.25,
      height: $(window).height() * 0.45,
    },
    chartOptionsGoogleMobile: {
      title: "Chart Dashboard",
      // pieHole: 0.4,
      is3D: true,
      legend: "none",
      pieSliceText: "label",
    },
  }),
  created() {
    this.authtoken = localStorage.getItem("token");
    this.BaseUrlGet = localStorage.getItem("BaseUrlGet");
    this.firstinitialize();
  },
  methods: {
    async firstinitialize() {
      if (this.authtoken) {
      } else {
        localStorage.removeItem("token");
        this.$router.push("/");
      }
    },
  },
  handleSectionClick(section, event) {
    console.log(`${section.label} clicked.`);
  },
  getColorStatus(status_name) {
    if (status_name == "1") return "green";
    else if (status_name == "2") return "orange";
    else if (stastatus_nametus == "3") return "red";
    else return "blue";
  },
};
</script>