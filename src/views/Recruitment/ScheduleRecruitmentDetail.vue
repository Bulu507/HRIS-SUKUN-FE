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

    <v-card class="pr-2 mx-2">
      <v-row>
        <v-col class="mx-0" cols="12" sm="4" md="4">
          <v-card class="mx-3 my-2" elevation="5">
            <v-card-text class="pa-1">
              <div style="text-align: center" class="mb-5 mt-2">
                <v-chip color="#25695c" outlined> Recruitment </v-chip>
              </div>
              <div class="px-3">
                <v-text-field
                  v-model="defaultItem.nama_recruitment"
                  outlined
                  label="Nama Recruitment"
                  class="fontall"
                  color="#25695c"
                  dense
                  readonly
                ></v-text-field>
                <v-text-field
                  v-model="defaultItem.dept_nama"
                  outlined
                  label="Nama Department"
                  class="fontall"
                  color="#25695c"
                  dense
                  readonly
                ></v-text-field>
                <v-text-field
                  v-model="defaultItem.jabatan"
                  outlined
                  label="Jabatan"
                  class="fontall"
                  color="#25695c"
                  dense
                  readonly
                ></v-text-field>
                <v-text-field
                  v-model="defaultItem.lokasi_penempatan"
                  outlined
                  label="Lokasi Penempatan"
                  class="fontall"
                  color="#25695c"
                  dense
                  readonly
                ></v-text-field>
                <v-text-field
                  v-model="defaultItem.jumlah_kebutuhan"
                  outlined
                  label="Jumlah Kebutuhan"
                  class="fontall"
                  color="#25695c"
                  dense
                  readonly
                ></v-text-field>
                <v-text-field
                  v-model="defaultItem.source_pemenuhan"
                  outlined
                  label="Source Pemenuhan"
                  class="fontall"
                  color="#25695c"
                  dense
                  readonly
                ></v-text-field>
              </div>
            </v-card-text>
            <v-divider class="mx-4"></v-divider>
          </v-card>
          <v-card class="mx-3 mb-2 mt-7" elevation="5">
            <v-card-text class="pa-1">
              <div style="text-align: center" class="mb-2 mt-2">
                <v-chip color="#25695c" outlined> List Pelamar </v-chip>
              </div>
              <v-row>
                <v-col cols="6">
                  <h4 class="ml-5 my-3">Jumlah Pelamar</h4>
                </v-col>
                <v-col cols="6" style="text-align: right">
                  <h4 class="mr-5 my-3">{{ jmlPelamar }} Pelamar</h4></v-col
                >
              </v-row>
              <div class="px-1 mb-2">
                <v-data-table
                  :headers="headersPelamar"
                  :items="listPelamar"
                  :search="search"
                  disable-items-per-page="true"
                  class="rounded elevation-6 mx-3 pa-1 itemchild"
                >
                  <template v-slot:item.actions="{ item }">
                    <v-icon
                      class="mr-2"
                      @click="detailItemJobSeeker(item)"
                      color="#25695C"
                    >
                      mdi-information-outline
                    </v-icon>
                  </template>
                </v-data-table>
              </div>
            </v-card-text>
            <v-divider class="mx-4"></v-divider>
          </v-card>
        </v-col>
        <v-col class="mx-0" cols="12" sm="8" md="8">
          <v-card class="fontall mx-1 my-2" elevation="5">
            <v-card-text>
              <v-row class="mb-3 mt-2 ml-1">
                <h4>Status Recruitment</h4>
                <v-divider class="mx-2 mt-3"></v-divider>
              </v-row>
              <v-row>
                <v-col cols="8" sm="8" md="8"
                  ><v-select
                    class="ml-5"
                    v-model="defaultItem.status_schedule"
                    :items="itemsstatus"
                    item-value="value"
                    item-text="text"
                    label="Pilih Status"
                    :disabled="disabledStatus"
                    outlined
                    dense
                    :rules="[(v) => !!v || 'Field is required']"
                  ></v-select>
                </v-col>
                <v-col cols="4" sm="4" md="4">
                  <v-btn
                    @click="btnStatus()"
                    color="#25695c"
                    elevation="2"
                    dark
                  >
                    {{ textButtonStatus }}</v-btn
                  >
                </v-col>
              </v-row>
              <v-row class="mb-3 mt-2 ml-1">
                <h4>List Schedule</h4>
                <v-divider class="mx-2 mt-3"></v-divider>
              </v-row>
              <v-row class="mr-2 mb-2">
                <v-timeline dense>
                  <v-timeline-item
                    small
                    color="#25695c"
                    v-for="item in listSchedule"
                    :key="item.id_schedule"
                  >
                    <!-- <span slot="opposite">Tus eu perfecto</span> -->
                    <v-card class="elevation-2">
                      <!-- <v-card-title class="text-h5"> Lorem ipsum </v-card-title> -->
                      <v-card-text class="pa-2">
                        <h4 style="color: #25695c">
                          {{ item.nama_schedule }}
                        </h4>
                        <h5 style="color: #bf9168">
                          {{ gettanggal(item.tanggal_schedule) }}
                        </h5>
                        <hr />
                        <h5>Peserta :</h5>
                        <v-chip
                          v-for="tag in item.listvaljobseeker"
                          :key="tag.id_job_seeker"
                          label
                          color="cyan"
                          small
                          dark
                          class="mr-1 mt-1"
                        >
                          <v-icon style="font-size: medium" left>
                            mdi-account-circle-outline
                          </v-icon>
                          {{ tag.nama }}
                        </v-chip>
                        <h5 style="color: #bf9168">
                          {{ item.jmlh_job_seeker }} Peserta
                        </h5>
                      </v-card-text>
                      <v-card-actions
                        v-if="item.nama_schedule == status_schedule_global"
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          dark
                          :loading="loading"
                          color="#25695c"
                          @click="editpesertaschedule(item)"
                          x-small
                          elevation="2"
                        >
                          Edit Peserta
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-timeline-item>
                </v-timeline>
              </v-row>
              <v-row class="mb-3 mt-2 ml-1">
                <h4>Hasil Rekruitment</h4>
                <v-divider class="mx-2 mt-3"></v-divider>
              </v-row>
              <v-row class="mr-2 mb-2">
                <v-timeline dense>
                  <v-timeline-item
                    small
                    color="#25695c"
                    v-for="item in listResult"
                    :key="item.id_schedule"
                  >
                    <!-- <span slot="opposite">Tus eu perfecto</span> -->
                    <v-card class="elevation-2">
                      <!-- <v-card-title class="text-h5"> Lorem ipsum </v-card-title> -->
                      <v-card-text class="pa-2">
                        <h4 style="color: #25695c">Seleksi Berakhir</h4>
                        <hr />
                        <h5>Peserta Lolos :</h5>
                        <v-chip
                          v-for="tag in item.listvaljobseeker"
                          :key="tag.id_job_seeker"
                          label
                          color="cyan"
                          small
                          dark
                          class="mr-1"
                        >
                          <v-icon style="font-size: medium" left>
                            mdi-account-circle-outline
                          </v-icon>
                          {{ tag.nama }}
                        </v-chip>
                        <h5 style="color: #bf9168">
                          {{ item.jmlh_job_seeker }} Peserta
                        </h5>
                      </v-card-text>
                      <v-card-actions
                        v-if="status_schedule_global == 'Proses_Selesai'"
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          dark
                          :loading="loading"
                          color="#25695c"
                          @click="editpesertaresult(item)"
                          x-small
                          elevation="2"
                        >
                          Edit Peserta
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-timeline-item>
                </v-timeline>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card>

    <!-- Modal Edit Peserta -->
    <v-dialog persistent v-model="dialogEditPeserta" max-width="800px">
      <v-card>
        <v-card-title class="headermodalstyle">
          Edit Peserta
          <v-spacer></v-spacer>
          <v-btn icon dark large class="right" @click="close()">
            <v-icon>mdi-close-box-outline</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="fontall">
          <v-container fluid>
            <v-row>
              <v-col cols="12" sm="12" md="12" class="pa-1">
                <v-combobox
                  v-model="list_job_seeker_global"
                  item-text="nama"
                  :items="itemspesertasemua"
                  chips
                  clearable
                  label="Pilih Peserta"
                  multiple
                  prepend-icon="mdi-filter-variant"
                  solo
                >
                  <template
                    v-slot:selection="{ attrs, item, select, selected }"
                  >
                    <v-chip
                      v-bind="attrs"
                      :input-value="selected"
                      close
                      @click="select"
                      @click:close="removeselectedpeserta(item)"
                    >
                      <strong>{{ item.nama }}</strong>
                    </v-chip>
                  </template>
                </v-combobox>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark color="red" @click="close">
            <v-icon left> mdi-close-circle-outline </v-icon> Cancel
          </v-btn>
          <v-btn
            dark
            :loading="loading"
            color="#25695c"
            @click="saveeditpeserta"
          >
            <v-icon left> mdi-checkbox-marked-circle-outline </v-icon>
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal Detail Job Seeker -->
    <v-dialog persistent v-model="dialogDetailJobSeeker" max-width="1000px">
      <v-card>
        <v-card-title class="headermodalstyle">
          Detail Item JobSeeker
          <v-spacer></v-spacer>
          <v-btn icon dark large class="right" @click="close()">
            <v-icon>mdi-close-box-outline</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="fontall">
          <v-row>
            <v-col cols="12" sm="7" md="7">
              <v-container fluid>
                <v-row class="mb-1 mt-0">
                  <h4 style="color: black; font-size: 18px">
                    Identitas Pelamar
                  </h4>
                  <v-divider
                    class="mx-2 mt-3"
                    style="border-color: black"
                  ></v-divider>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="6" class="pa-1">
                    <v-text-field
                      v-model="jobSeekerItem.nama"
                      outlined
                      label="Nama Job Seeker"
                      class="fontall"
                      color="#25695c"
                      dense
                      readonly
                      :rules="[(v) => !!v || 'Field is required']"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6" class="pa-1">
                    <v-text-field
                      v-model="jobSeekerItem.no_ktp"
                      outlined
                      label="No Ktp"
                      class="fontall"
                      color="#25695c"
                      dense
                      readonly
                      :rules="[(v) => !!v || 'Field is required']"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6" class="pa-1">
                    <v-text-field
                      v-model="jobSeekerItem.telp"
                      outlined
                      label="No Telp"
                      class="fontall"
                      color="#25695c"
                      dense
                      readonly
                      :rules="[(v) => !!v || 'Field is required']"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6" class="pa-1">
                    <v-text-field
                      v-model="jobSeekerItem.email"
                      outlined
                      label="Email"
                      class="fontall"
                      color="#25695c"
                      dense
                      readonly
                      :rules="[(v) => !!v || 'Field is required']"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" class="pa-1">
                    <v-textarea
                      v-model="jobSeekerItem.alamat"
                      outlined
                      label="Alamat"
                      class="fontall"
                      color="#25695c"
                      dense
                      readonly
                      :rules="[(v) => !!v || 'Field is required']"
                    ></v-textarea>
                  </v-col>
                </v-row>
                <v-row class="mb-1 mt-0">
                  <v-divider
                    class="mx-2 mt-3"
                    style="border-color: black"
                  ></v-divider>
                </v-row>
              </v-container>
            </v-col>
            <v-col cols="12" sm="5" md="5">
              <v-container fluid>
                <v-row class="mb-1 mt-0">
                  <h4 style="color: black; font-size: 18px">Berkas Lamaran</h4>
                  <v-divider
                    class="mx-2 mt-3"
                    style="border-color: black"
                  ></v-divider>
                </v-row>
                <v-row>
                  <v-col cols="6" sm="6" md="6" class="pa-1">
                    Berkas 1 :
                  </v-col>
                  <v-col cols="6" sm="6" md="6" class="pa-1"> - </v-col>
                  <v-col cols="6" sm="6" md="6" class="pa-1">
                    Berkas 2 :
                  </v-col>
                  <v-col cols="6" sm="6" md="6" class="pa-1"> - </v-col>
                  <v-col cols="6" sm="6" md="6" class="pa-1">
                    Berkas 3 :
                  </v-col>
                  <v-col cols="6" sm="6" md="6" class="pa-1"> - </v-col>
                </v-row>
                <v-row class="mb-1" style="margin-top: 15px !important">
                  <v-divider
                    class="mx-2 mt-3"
                    style="border-color: black"
                  ></v-divider>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
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
import HelperGlobal from "../../services/Helper";
const HelperGlobalService = new HelperGlobal();

export default {
  name: "ScheduleRecruitmentDetail",
  data: () => ({
    itemsbr: [
      {
        text: "Schedule",
        disabled: true,
        href: "breadcrumbs_dashboard",
      },
      {
        text: "Schedule Recruitment Detail",
        disabled: true,
        href: "breadcrumbs_link_1",
      },
    ],

    formTitle: "Add Item",
    value: "add",
    dialog: false,
    dialogDelete: false,
    dialogEditPeserta: false,
    dialogDetailJobSeeker: false,
    search: "",
    authtoken: "",
    BaseUrlGet: "",

    disabledStatus: true,
    textButtonStatus: "Edit",

    defaultItem: {
      nama_recruitment: "",
      jabatan: "",
      department: "",
      lokasi_penempatan: "",
      jumlah_kebutuhan: "",
      source_pemenuhan: "",
      tanggal_permintaan: "",
      target_tanggal_pemenuhan: "",
      status_schedule: "",
      listSchedule: "list",
    },

    status_schedule_global: "",

    headersPelamar: [
      { text: "Nama", value: "nama" },
      { text: "", value: "actions", sortable: false, width: "8%" },
    ],

    listPelamar: [],
    jmlPelamar: 0,
    listSchedule: [],
    listResult: [],
    listJobSeekerAll: [],

    detailEmp: {},

    itemlistanak: [
      {
        id: 1,
        nama: "indra",
        anak_ke: "1",
        tempat_lahir: "Salatiga",
        tanggal_lahir: "1990-01-01",
        status_nikah: "Sudah",
        status_status: "Bekerja",
      },
      {
        id: 2,
        nama: "dani",
        anak_ke: "2",
        tempat_lahir: "Salatiga",
        tanggal_lahir: "1994-02-02",
        status_nikah: "Belum",
        status_status: "Bekerja",
      },
      {
        id: 3,
        nama: "andra",
        anak_ke: "3",
        tempat_lahir: "Salatiga",
        tanggal_lahir: "1998-03-03",
        status_nikah: "Belum",
        status_status: "Bekerja",
      },
    ],
    itemsstatus: [
      { text: "Buka_Lowongan", value: "Buka_Lowongan" },
      { text: "Psikotes", value: "Psikotes" },
      { text: "Interview_HR", value: "Interview_HR" },
      { text: "Interview_Manager", value: "Interview_Manager" },
      { text: "Inteview_User", value: "Inteview_User" },
      { text: "Proses_Selesai", value: "Proses_Selesai" },
    ],
    snackbar: false,
    textsnackbar: "Test",
    timeoutsnackbar: 2000,
    colorsnackbar: null,

    admin_id: "",
    id_recruitment: "",

    jobSeekerItem: {
      id_job_seeker: "-",
      no_ktp: "",
      nama: "",
      telp: "",
      email: "",
      alamat: "",
      code_recruitment: "",
    },
    scheduleItem: {
      id_schedule: "",
      nama_schedule: "",
      tanggal_schedule: "",
      list_job_seeker: [],
    },
    resultItem: {
      id_result: "",
      status: "",
      list_job_seeker: [],
    },
    statusedit: "",
    list_job_seeker_global: [],
    itemspesertasemua: ["Streaming", "Eating"],
  }),

  created() {
    this.id_recruitment = localStorage.getItem("id_recruitment");
    console.log(this.id_emp);
    this.authtoken = localStorage.getItem("token");
    this.BaseUrlGet = localStorage.getItem("BaseUrlGet");
    this.User = JSON.parse(localStorage.getItem("User"));
    if (this.User) {
      this.admin_id = this.User.code;
    }
    this.getDetail();
    this.GetJobSeekerByRecruitment();
  },

  methods: {
    async getDetail() {
      try {
        const response = await axios.get(
          this.BaseUrlGet +
            "GetDetailRecruitment?id_recruitment=" +
            this.id_recruitment,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        console.log(response.data.data.result);
        if (response.data.length != 0) {
          this.defaultItem = response.data.data.result.GetDetailRecruitment;

          this.listSchedule = response.data.data.result.GetSchedule;
          this.listJobSeekerAll = response.data.data.result.GetJobSeekerAll;
          this.status_schedule_global =
            response.data.data.result.GetDetailRecruitment.status_schedule;
          this.listResult = response.data.data.result.GetResult;
          this.listPelamar = response.data.data.result.GetJobSeekerAll;
          this.jmlPelamar = this.listPelamar.length;
          // if (response.data.data.result.foto == "-") {
          //   this.detailEmp.foto = "/images/noimage.png";
          // }
          // this.itemlistanak = response.data.data.result.listAnak;
          // this.itemlistriwayatkerja =
          //   response.data.data.result.listRiwayatPekerjaan;
          // this.itemlistpengalamankerja =
          //   response.data.data.result.listPengalamanKerja;
          //   this.detailTask = response.data.data.result.GetDetailTask;
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
    async GetJobSeekerByRecruitment() {
      try {
        const response = await axios.get(
          this.BaseUrlGet +
            "GetJobSeekerByRecruitment?id_recruitment=" +
            this.id_recruitment,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        console.log(response.data.data.result.data);
        if (response.data.length != 0) {
          this.itemspesertasemua = response.data.data.result.data;
          // if (response.data.data.result.foto == "-") {
          //   this.detailEmp.foto = "/images/noimage.png";
          // }
          // this.itemlistanak = response.data.data.result.listAnak;
          // this.itemlistriwayatkerja =
          //   response.data.data.result.listRiwayatPekerjaan;
          // this.itemlistpengalamankerja =
          //   response.data.data.result.listPengalamanKerja;
          //   this.detailTask = response.data.data.result.GetDetailTask;
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

    async editStatusRecruitment(datapost) {
      // this.dialogDetail = false;
      try {
        const response = await axios.post(
          this.BaseUrlGet + "UpdateStatusRecruitment",
          datapost,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        console.log(response.data.data.result);
        if (response.data.data.result == "success") {
          this.dialog = false;
          this.snackbar = true;
          this.colorsnackbar = "green";
          this.textsnackbar = "Sukses Ubah data";
          this.getDetail();
        } else {
          //   this.dialog = false;
          this.snackbar = true;
          this.colorsnackbar = "red";
          this.textsnackbar = "Gagal ubah data";
        }
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
    async editSchedulePeserta(datapost) {
      // this.dialogDetail = false;
      try {
        const response = await axios.post(
          this.BaseUrlGet + "UpdateSchedule",
          datapost,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        console.log(response.data.data.result);
        if (response.data.data.result == "success") {
          this.dialogEditPeserta = false;
          this.snackbar = true;
          this.colorsnackbar = "green";
          this.textsnackbar = "Sukses Ubah data";
          this.getDetail();
        } else {
          //   this.dialog = false;
          this.snackbar = true;
          this.colorsnackbar = "red";
          this.textsnackbar = "Gagal ubah data";
        }
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
    async editResultPeserta(datapost) {
      // this.dialogDetail = false;
      try {
        const response = await axios.post(
          this.BaseUrlGet + "UpdateResult",
          datapost,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        console.log(response.data.data.result);
        if (response.data.data.result == "success") {
          this.dialogEditPeserta = false;
          this.snackbar = true;
          this.colorsnackbar = "green";
          this.textsnackbar = "Sukses Ubah data";
          this.getDetail();
        } else {
          //   this.dialog = false;
          this.snackbar = true;
          this.colorsnackbar = "red";
          this.textsnackbar = "Gagal ubah data";
        }
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

    btnStatus() {
      if (this.disabledStatus == true) {
        this.disabledStatus = false;
        this.textButtonStatus = "Simpan";
      } else {
        this.disabledStatus = true;
        this.textButtonStatus = "Edit";
        const datapost = {
          id_recruitment: this.id_recruitment,
          status_schedule: this.defaultItem.status_schedule,
        };
        this.editStatusRecruitment(datapost);
      }
    },

    editpesertaschedule(val) {
      console.log(val);
      this.statusedit = "schedule";
      this.scheduleItem.id_schedule = val.id_schedule;
      this.scheduleItem.nama_schedule = val.nama_schedule;
      this.scheduleItem.tanggal_schedule = val.tanggal_schedule;
      this.scheduleItem.list_job_seeker = val.listvaljobseeker;
      this.list_job_seeker_global = val.listvaljobseeker;
      this.dialogEditPeserta = true;
    },
    editpesertaresult(val) {
      console.log(val);
      this.statusedit = "result";
      this.resultItem.id_result = val.id_result;
      this.resultItem.status = "Approved";
      this.resultItem.list_job_seeker = val.listvaljobseeker;
      this.list_job_seeker_global = val.listvaljobseeker;
      this.dialogEditPeserta = true;
    },
    removeselectedpeserta(item) {
      this.list_job_seeker_global.splice(
        this.list_job_seeker_global.indexOf(item),
        1
      );
      this.list_job_seeker_global = [...this.list_job_seeker_global];
    },

    saveeditpeserta() {
      console.log(this.scheduleItem);
      if (this.statusedit == "schedule") {
        this.scheduleItem.list_job_seeker = this.list_job_seeker_global;
        this.editSchedulePeserta(this.scheduleItem);
      } else {
        this.resultItem.list_job_seeker = this.list_job_seeker_global;
        this.editResultPeserta(this.resultItem);
      }
    },
    close() {
      this.dialog = false;
      this.dialogEditPeserta = false;
      this.dialogDetailJobSeeker = false;
    },
    closeDelete() {
      this.dialogDelete = false;
    },

    detailItemJobSeeker(item) {
      // this.getDetailJobSeeker(item.id_job_seeker);
      this.jobSeekerItem.no_ktp = item.no_ktp;
      this.jobSeekerItem.nama = item.nama;
      this.jobSeekerItem.telp = item.telp;
      this.jobSeekerItem.email = item.email;
      this.jobSeekerItem.alamat = item.alamat;

      this.dialogDetailJobSeeker = true;
      //   this.$router.push("/EmpDetail");
      //   localStorage.setItem("id_emp", item.id);
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
      return HelperGlobalService.gettanggal(val);
    },
  },
};
</script>
