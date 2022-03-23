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
      class="rounded elevation-6 mx-3 pa-1 itemchild"
    >
      <template v-slot:item.target_tanggal_pemenuhan="{ item }">
        {{ gettanggal(item.target_tanggal_pemenuhan) }}
      </template>

      <template v-slot:top>
        <v-toolbar flat>
          <!-- <v-btn
            dark
            class="mx-1 mt-1 d-none d-md-block"
            @click="showFilter()"
            color="#25695c"
          >
            <v-icon class="mx-2" small>mdi-filter-variant</v-icon> Filter
            Recruitment
          </v-btn> -->
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search here..."
            single-line
            hide-details
          ></v-text-field>
          <v-divider class="mx-2 d-none d-md-block" inset vertical></v-divider>
          <v-btn dark class="mb-2" @click="add()" color="#25695c">
            <v-icon small>mdi-plus</v-icon> Add Item
          </v-btn>

          <!-- Modal Filter Emp -->
          <v-dialog persistent v-model="dialogFilter" max-width="500px">
            <v-card>
              <v-card-title class="headermodalstyle">
                Filter Pencarian
                <v-spacer></v-spacer>
                <v-btn icon dark large class="right" @click="close()">
                  <v-icon>mdi-close-box-outline</v-icon>
                </v-btn>
              </v-card-title>
              <v-card-text class="fontall pb-1">
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-container fluid>
                    <v-row class="mb-3 mt-2 ml-0">
                      <h4>Department</h4>
                      <v-divider class="mx-2 mt-3"></v-divider>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-select
                          v-model="selectDepartment"
                          :items="itemsdept"
                          item-value="department_code"
                          item-text="dept_nama"
                          label="Pilih Department"
                          clearable
                          outlined
                          dense
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn dark color="red" @click="close">
                  <v-icon left> mdi-close-circle-outline </v-icon> Cancel
                </v-btn>
                <v-btn dark :loading="loading" color="#25695c" @click="cari()">
                  <v-icon left> mdi-checkbox-marked-circle-outline </v-icon>
                  Cari
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- Modal Add Edit -->
          <v-dialog persistent v-model="dialog" max-width="800px">
            <v-card>
              <v-card-title class="headermodalstyle">
                {{ formTitle }}
                <v-spacer></v-spacer>
                <v-btn icon dark large class="right" @click="close()">
                  <v-icon>mdi-close-box-outline</v-icon>
                </v-btn>
              </v-card-title>
              <v-card-text class="fontall">
                <v-form ref="form" v-model="valid" lazy-validation>
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
                          v-model="defaultItem.nama"
                          outlined
                          label="Nama Job Seeker"
                          class="fontall"
                          color="#25695c"
                          dense
                          :rules="[(v) => !!v || 'Field is required']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pa-1">
                        <v-text-field
                          v-model="defaultItem.no_ktp"
                          outlined
                          label="No Ktp"
                          class="fontall"
                          color="#25695c"
                          dense
                          :rules="[(v) => !!v || 'Field is required']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pa-1">
                        <v-text-field
                          v-model="defaultItem.telp"
                          outlined
                          label="No Telp"
                          class="fontall"
                          color="#25695c"
                          dense
                          :rules="[(v) => !!v || 'Field is required']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pa-1">
                        <v-text-field
                          v-model="defaultItem.email"
                          outlined
                          label="Email"
                          class="fontall"
                          color="#25695c"
                          dense
                          :rules="[(v) => !!v || 'Field is required']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12" class="pa-1">
                        <v-textarea
                          v-model="defaultItem.alamat"
                          outlined
                          label="Alamat"
                          class="fontall"
                          color="#25695c"
                          dense
                          :rules="[(v) => !!v || 'Field is required']"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                    <v-row class="mb-1 mt-0">
                      <h4 style="color: black; font-size: 18px">
                        Posisi Dilamar
                      </h4>
                      <v-divider
                        class="mx-2 mt-3"
                        style="border-color: black"
                      ></v-divider>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="12" md="12" class="pa-1">
                        <v-select
                          v-model="defaultItem.code_recruitment"
                          :items="itemsRecruitment"
                          item-value="id_recruitment"
                          item-text="nama_recruitment"
                          label="Pilih Recruitment"
                          clearable
                          outlined
                          dense
                          :rules="[(v) => !!v || 'Field is required']"
                        ></v-select>
                      </v-col>
                    </v-row>
                    <v-row class="mb-1 mt-0">
                      <h4 style="color: black; font-size: 18px">
                        Berkas Pelamar
                      </h4>
                      <v-divider
                        class="mx-2 mt-3"
                        style="border-color: black"
                      ></v-divider>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="12" md="12" class="pa-1">
                        <v-file-input
                          v-model="berkas1"
                          label="File Berkas 1"
                          outlined
                          dense
                        ></v-file-input>
                      </v-col>
                      <v-col cols="12" sm="12" md="12" class="pa-1">
                        <v-file-input
                          v-model="berkas2"
                          label="File Berkas 2"
                          outlined
                          dense
                        ></v-file-input>
                      </v-col>
                      <v-col cols="12" sm="12" md="12" class="pa-1">
                        <v-file-input
                          v-model="berkas3"
                          label="File Berkas 3"
                          outlined
                          dense
                        ></v-file-input>
                      </v-col>
                    </v-row>
                    <v-row class="mb-1 mt-0">
                      <v-divider
                        class="mx-2 mt-3"
                        style="border-color: black"
                      ></v-divider>
                    </v-row>
                  </v-container>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn dark color="red" @click="close">
                  <v-icon left> mdi-close-circle-outline </v-icon> Cancel
                </v-btn>
                <v-btn dark :loading="loading" color="#25695c" @click="save">
                  <v-icon left> mdi-checkbox-marked-circle-outline </v-icon>
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- Modal Detail -->
          <v-dialog persistent v-model="dialogDetail" max-width="1000px">
            <v-card>
              <v-card-title class="headermodalstyle">
                Detail Item
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
                            v-model="defaultItem.nama"
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
                            v-model="defaultItem.no_ktp"
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
                            v-model="defaultItem.telp"
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
                            v-model="defaultItem.email"
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
                            v-model="defaultItem.alamat"
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
                        <h4 style="color: black; font-size: 18px">
                          Data Lamaran
                        </h4>
                        <v-divider
                          class="mx-2 mt-3"
                          style="border-color: black"
                        ></v-divider>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="12" md="12" class="pa-1">
                          <v-select
                            v-model="defaultItem.code_recruitment"
                            :items="itemsRecruitment"
                            item-value="id_recruitment"
                            item-text="nama_recruitment"
                            label="Pilih Recruitment"
                            readonly
                            outlined
                            dense
                            :rules="[(v) => !!v || 'Field is required']"
                          ></v-select>
                        </v-col>
                      </v-row>
                      <v-row class="mb-1 mt-0">
                        <h4 style="color: black; font-size: 18px">
                          Berkas Lamaran
                        </h4>
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

          <!-- Modal Delete -->
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-text>
                <v-row class="mb-5 mt-5 ml-0 px-2">
                  <h4>Detail Data</h4>
                  <v-divider class="mx-2 mt-3"></v-divider>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="12" md="12" class="px-7 py-0">
                    <v-text-field
                      v-model="defaultItem.nama"
                      label="Nama Job Seeker"
                      outlined
                      readonly
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" class="px-7 py-0">
                    <v-text-field
                      v-model="defaultItem.no_ktp"
                      label="No KTP"
                      outlined
                      readonly
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="mb-5 mt-2 ml-0 px-2">
                  <v-divider class="mx-2 mt-2"></v-divider>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn dark color="red" @click="closeDelete">
                  <v-icon left> mdi-close-circle-outline </v-icon>
                  Cancel
                </v-btn>
                <v-btn dark color="#25695c" @click="deleteItemConfirm">
                  <v-icon left> mdi-checkbox-marked-circle-outline </v-icon>
                  OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- Modal Testing -->
          <v-dialog v-model="dialogTesting" max-width="300px">
            <v-card>
              <v-card-title class="headline">Sedang Maintenance</v-card-title>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon class="mr-2" @click="detailItem(item)" color="#25695C">
          mdi-information-outline
        </v-icon>
        <v-icon class="mr-1" @click="edit(item)" color="#bf9168">
          mdi-pencil-outline
        </v-icon>
        <v-icon @click="showDeleteModal(item)" color="#d42f2f">
          mdi-delete-outline
        </v-icon>
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
import HelperGlobal from "../../services/Helper";
const HelperGlobalService = new HelperGlobal();

export default {
  name: "JobSeeker",
  data: () => ({
    itemsbr: [
      {
        text: "Recruitment",
        disabled: true,
        href: "breadcrumbs_dashboard",
      },
      {
        text: "Job Seeker",
        disabled: true,
        href: "breadcrumbs_link_1",
      },
    ],

    rules: {
      required: (value) => !!value || "Required.",
      countermin: (value) => value.length > 5 || "Min 6 characters",
      email: (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
    },
    loading: false,
    formTitle: "Add Item",
    value: "add",
    dialog: false,
    dialogDetail: false,
    dialogDelete: false,
    dialogReset: false,
    dialogTesting: false,
    dialogFilter: false,
    search: "",
    authtoken: "",
    BaseUrlGet: "",
    headers: [
      { text: "ID Job Seeker", value: "id_job_seeker" },
      { text: "Nama", value: "nama" },
      { text: "No Ktp", value: "no_ktp" },
      // { text: "Unit Perusahaan", value: "unit_perusahan_nama" },
      { text: "No Telp", value: "telp" },
      { text: "Email", value: "email" },
      //   { text: "Pangkat", value: "pangkat" },
      //   { text: "User ID", value: "username" },
      { text: "Actions", value: "actions", sortable: false, width: "15%" },
    ],
    dataobject: [],

    readOnly: {
      id_job_seeker: "",
    },
    defaultItem: {
      id_job_seeker: "-",
      no_ktp: "",
      nama: "",
      telp: "",
      email: "",
      alamat: "",
      code_recruitment: "",
    },

    deleteDetailItem: {
      id: "",
    },

    listschedulejobseeker: [],
    berkas1: "",
    berkas2: "",
    berkas3: "",

    itemsRecruitment: [],
    itemsSource: [
      { text: "internal", value: "internal" },
      { text: "eksternal", value: "eksternal" },
    ],

    AddModal: true,
    valid: true,

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
    localStorage.removeItem("status");
    this.initialize();
    this.GetRecruitment();
  },
  setup() {},

  methods: {
    async initialize(dept) {
      var dept_code = "";
      if (dept) {
        dept_code = dept;
      }
      try {
        const response = await axios.get(this.BaseUrlGet + "GetJobSeeker", {
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
    async GetRecruitment() {
      try {
        const response = await axios.get(this.BaseUrlGet + "GetRecruitment", {
          headers: {
            Authorization: `Bearer ` + this.authtoken,
          },
        });
        console.log(response.data.data.result.data);
        if (response.data.length != 0) {
          this.itemsRecruitment = response.data.data.result.data;
        } else {
          console.log("Kosong");
          this.itemsRecruitment = [];
        }
      } catch (error) {
        console.error(error);
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        } else {
          this.itemsRecruitment = [];
        }
      }
    },
    async getDetail() {
      try {
        const response = await axios.get(
          this.BaseUrlGet +
            "GetJobSeekerStatus?id_job_seeker=" +
            this.readOnly.id_job_seeker,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        console.log(response.data.data.result);
        if (response.data.length != 0) {
          this.defaultItem.id_job_seeker =
            response.data.data.result[0].id_job_seeker;
          this.defaultItem.no_ktp = response.data.data.result[0].no_ktp;
          this.defaultItem.nama = response.data.data.result[0].nama;
          this.defaultItem.telp = response.data.data.result[0].telp;
          this.defaultItem.email = response.data.data.result[0].email;
          this.defaultItem.alamat = response.data.data.result[0].alamat;
          this.defaultItem.code_recruitment =
            response.data.data.result[0].code_recruitment;

          this.listschedulejobseeker =
            response.data.data.result[0].listschedulejobseeker;

          //   if (response.data.data.result.foto == "-") {
          //     this.detailEmp.foto = "/images/noimage.png";
          //   }
          //   this.itemlistanak = response.data.data.result.listAnak;
          //   this.itemlistriwayatkerja =
          //     response.data.data.result.listRiwayatPekerjaan;
          //   this.itemlistpengalamankerja =
          //     response.data.data.result.listPengalamanKerja;
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
    async addData(datapost) {
      // this.dialogDetail = false;
      try {
        const response = await axios.post(
          this.BaseUrlGet + "AddJobSeeker",
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
          this.textsnackbar = "Sukses tambah data";
          this.initialize();
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
    async editData(datapost) {
      // this.dialogDetail = false;
      try {
        const response = await axios.post(
          this.BaseUrlGet + "UpdateJobSeeker",
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
          this.textsnackbar = "Sukses tambah data";
          this.initialize();
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
    async deleteApi() {
      const datapost = {
        id_job_seeker: this.readOnly.id_job_seeker,
        // no_induk_karyawan: this.deleteDetailItem.no_induk_karyawan,
      };
      // this.dialogDetail = false;
      try {
        const response = await axios.post(
          this.BaseUrlGet + "DeleteJobSeeker",
          datapost,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        console.log(response.data.data.result);
        if (response.data.data.result == "success") {
          this.snackbar = true;
          this.colorsnackbar = "green";
          this.textsnackbar = "Sukses menghapus data";

          this.dialogDelete = false;
          this.initialize();
        } else {
          this.dialog = true;
        }
      } catch (error) {
        console.error(error.response.data.data.result);
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        }
        if (error.response.status == 400) {
          this.snackbar = true;
          this.colorsnackbar = "red";
          this.textsnackbar = error.response.data.data.result;
        }
      }
    },

    async showFilter() {
      // console.log(localStorage.getItem("token"));
      //   await this.resetFilter();
      this.dialogFilter = true;
    },

    selectedDivisi(val) {
      console.log(val);
      this.getDept(val);
    },

    cari() {
      this.initialize(this.selectDepartment);
      this.dialogFilter = false;
    },

    detailItem(item) {
      this.readOnly.id_job_seeker = item.id_job_seeker;
      this.getDetail();
      this.dialogDetail = true;
      //   this.$router.push("/EmpDetail");
      //   localStorage.setItem("id_emp", item.id);
    },
    add() {
      this.dialog = true;
      this.formTitle = "Add Item";
      this.resetItem();
      //   this.$router.push("/EmpAddEdit");
      //   // localStorage.setItem("id_emp", item.id);
      //   localStorage.removeItem("id_emp");
      //   localStorage.setItem("status", "add_emp");
    },
    edit(item) {
      this.readOnly.id_job_seeker = item.id_job_seeker;
      this.getDetail();
      this.dialog = true;
      this.formTitle = "Edit Item";
      //   this.$router.push("/EmpAddEdit");
      //   localStorage.setItem("id_emp", item.id);
      //   // localStorage.removeItem("id_emp");
      //   localStorage.setItem("status", "edit_emp");
    },
    showDeleteModal(item) {
      this.dialogDelete = true;
      this.readOnly.id_job_seeker = item.id_job_seeker;
      this.defaultItem.nama = item.nama;
      this.defaultItem.no_ktp = item.no_ktp;
      //   this.defaultItem = Object.assign({}, item);
      //   this.dialogDelete = true;
    },

    close() {
      this.dialog = false;
      this.dialogReset = false;
      this.dialogFilter = false;
      this.dialogDetail = false;
    },
    closeDelete() {
      this.dialogDelete = false;
      this.dialogFilter = false;
    },

    save() {
      //   this.loading = true;

      const datapost = this.defaultItem;

      console.log(datapost);

      if (HelperGlobalService.checkMandatory(datapost, "object") == true) {
        console.log(datapost);
        if (this.readOnly.id_job_seeker) {
          console.log("Save Edit");
          this.editData(datapost);
        } else {
          console.log("Save Add");
          this.addData(datapost);
        }
      } else {
        this.snackbar = true;
        this.colorsnackbar = "red";
        this.textsnackbar =
          "Gagal Simpan, Kolom required tidak boleh ada yang kosong";
      }
    },

    deleteItemConfirm() {
      this.deleteApi();
    },
    resetItem() {
      //   this.defaultItem.user_id = item.user_id;
      this.defaultItem.no_ktp = "";
      this.defaultItem.nama = "";
      this.defaultItem.telp = "";
      this.defaultItem.email = "";
      this.defaultItem.alamat = "";
      this.readOnly.id_job_seeker = "";
      this.$refs.form.resetValidation();
    },

    gettanggal(val) {
      return HelperGlobalService.gettanggal(val);
    },
  },
};
</script>
