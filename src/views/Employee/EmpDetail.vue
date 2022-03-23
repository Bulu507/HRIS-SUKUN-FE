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
        <v-col class="mx-0" cols="12" sm="3" md="3">
          <v-card class="mx-3 my-2" elevation="5">
            <v-card-text class="pa-1">
              <v-img
                class="mx-2 my-2 pt-1"
                contain
                center
                max-height="250"
                v-bind:src="detailEmp.foto"
              ></v-img>

              <h3
                align="center"
                justify="center"
                style="font-weight: 600; color: black"
              >
                {{ detailEmp.nama_lengkap }}
              </h3>
              <div style="text-align: center" class="mb-5">
                <v-chip color="blue" outlined small> Employee </v-chip>
              </div>
              <div class="px-3">
                <v-text-field
                  v-model="detailEmp.no_induk_karyawan"
                  label="Nomor Induk Karyawan"
                  outlined
                  readonly
                  dense
                ></v-text-field>
                <v-text-field
                  v-model="detailEmp.divisi_nama"
                  label="Divisi"
                  outlined
                  readonly
                  dense
                ></v-text-field>
                <v-text-field
                  v-model="detailEmp.dept_nama"
                  label="Department"
                  outlined
                  readonly
                  dense
                ></v-text-field>
                <v-text-field
                  v-model="detailEmp.jabatan"
                  label="Jabatan"
                  outlined
                  readonly
                  dense
                ></v-text-field>
                <v-text-field
                  v-model="detailEmp.pangkat"
                  label="Pangkat"
                  outlined
                  readonly
                  dense
                ></v-text-field>
                <v-text-field
                  v-model="detailEmp.status_karyawan_nama"
                  label="Status Karyawan"
                  outlined
                  readonly
                  dense
                ></v-text-field>
                <v-text-field
                  v-model="detailEmp.mulai_masuk_kerja"
                  label="Join Date"
                  outlined
                  readonly
                  dense
                ></v-text-field>
              </div>
            </v-card-text>
            <v-divider class="mx-4"></v-divider>
          </v-card>
        </v-col>
        <v-col class="mx-0" cols="12" sm="9" md="9">
          <v-row>
            <v-col
              cols="12"
              align="center"
              justify="center"
              class="px-5 pt-3 pb-0 d-md-none"
            >
              <v-select
                :items="itemstabs"
                label="Pilih Tabs"
                item-value="value"
                item-text="text"
                v-on:change="selectedTabs"
                solo
              ></v-select>
            </v-col>
            <v-tabs class="d-none d-md-block mt-3 ml-3 mr-3 mb-5">
              <v-tab @click="tabsdetail(1)">Personal Data</v-tab>
              <v-tab @click="tabsdetail(2)">Family Data</v-tab>
              <v-tab @click="tabsdetail(3)">Work Data</v-tab>
              <v-tab @click="tabsdetail(4)">Document</v-tab>
            </v-tabs>
          </v-row>
          <v-card class="fontall mx-1 my-2" elevation="5">
            <v-card-text v-if="personaldata == true">
              <!-- <div>Personal Data</div> -->
              <v-row class="mb-3 mt-2 ml-1">
                <h4>Data Diri</h4>
                <v-divider class="mx-2 mt-3"></v-divider>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="detailEmp.nama_lengkap"
                    label="Nama Lengkap"
                    outlined
                    readonly
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="detailEmp.no_ktp"
                    label="No Ktp"
                    outlined
                    readonly
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmp.tempat_lahir"
                    label="Tempat Lahir"
                    outlined
                    readonly
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmp.tanggal_lahir"
                    label="Tanggal Lahir"
                    outlined
                    readonly
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmp.gol_darah"
                    label="Gol Darah"
                    outlined
                    readonly
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="detailEmp.agama"
                    label="Agama"
                    outlined
                    readonly
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="detailEmp.jenis_kelamin"
                    label="Jenis Kelamin"
                    outlined
                    readonly
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="mb-2 mt-3 ml-1">
                <h4>Alamat</h4>
                <v-divider class="mx-2 mt-3"></v-divider>
              </v-row>
              <v-row>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmp.no_rumah"
                    label="No Rumah"
                    outlined
                    readonly
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmp.rt"
                    label="RT"
                    outlined
                    readonly
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmp.rw"
                    label="RW"
                    outlined
                    readonly
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmp.desa"
                    label="Desa"
                    outlined
                    readonly
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmp.kec"
                    label="Kecamatan"
                    outlined
                    readonly
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmp.kab"
                    label="Kab/Kota"
                    outlined
                    readonly
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="mb-2 mt-3 ml-1">
                <h4>Contact</h4>
                <v-divider class="mx-2 mt-3"></v-divider>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="detailEmp.telpon"
                    label="No Telp"
                    outlined
                    readonly
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="detailEmp.no_telpon_darurat"
                    label="No Telp (darurat)"
                    outlined
                    readonly
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-text v-if="familydata == true">
              <v-row class="mb-2 mt-3 ml-1">
                <h4>Keluarga</h4>
                <v-divider class="mx-2 mt-3"></v-divider>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12">
                  <v-text-field
                    v-model="detailEmp.nama_ortu"
                    label="Orang Tua"
                    outlined
                    readonly
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmp.status_nikah"
                    label="Status Nikah"
                    outlined
                    readonly
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmp.nama_istri_suami"
                    label="Istri/Suami"
                    outlined
                    readonly
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmp.pekerjaan_istri_suami"
                    label="Pekerjaan"
                    outlined
                    readonly
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="mb-2 mt-3 ml-1">
                <h4>Daftar Anak</h4>
                <v-divider class="mx-2 mt-3"></v-divider>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">Nama</th>
                          <th class="text-left">Anak Ke</th>
                          <th class="text-left">TTL</th>
                          <th class="text-left">Kerja/Sekolah</th>
                          <th class="text-left">Status Nikah</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in itemlistanak" :key="item.id">
                          <td>{{ item.nama }}</td>
                          <td>{{ item.anak_ke }}</td>
                          <td>
                            {{ item.tempat_lahir }}/{{ item.tanggal_lahir }}
                          </td>
                          <td>{{ item.status_status }}</td>
                          <td>{{ item.status_nikah }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-text v-if="workdata == true">
              <v-row class="mb-2 mt-3 ml-1">
                <h4>Pekerjaan</h4>
                <v-divider class="mx-2 mt-3"></v-divider>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="detailEmp.pendidikan_terakhir"
                    label="Pendidikan Terakhir"
                    outlined
                    readonly
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="detailEmp.mulai_masuk_kerja"
                    label="Mulai Masuk Kerja"
                    outlined
                    readonly
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmp.bagian"
                    label="Bagian"
                    outlined
                    readonly
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmp.ditetapkan"
                    label="Ditetapkan"
                    outlined
                    readonly
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="detailEmp.no_anggota_koperasi"
                    label="No Koperasi"
                    outlined
                    readonly
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="mb-2 mt-3 ml-1">
                <h4>Riwayat Kerja</h4>
                <v-divider class="mx-2 mt-3"></v-divider>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">Unit Perusahaan</th>
                          <th class="text-left">Tanggal</th>
                          <th class="text-left">Jabatan</th>
                          <th class="text-left">Alasan Kepindahan</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in itemlistriwayatkerja" :key="item.id">
                          <td>{{ item.unit_perusahaan }}</td>
                          <td>{{ item.tgl }}</td>
                          <td>{{ item.jabatan }}</td>
                          <td>{{ item.alasan_kepindahan }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-col>
              </v-row>
              <v-row class="mb-2 mt-3 ml-1">
                <h4>Pengalaman Kerja</h4>
                <v-divider class="mx-2 mt-3"></v-divider>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">Perusahaan</th>
                          <th class="text-left">Jabatan</th>
                          <th class="text-left">Alasan Pindah</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="item in itemlistpengalamankerja"
                          :key="item.id"
                        >
                          <td>{{ item.perusahaan }}</td>
                          <td>{{ item.jabatan }}</td>
                          <td>{{ item.alasan_kepindahan }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-text v-if="documentdata == true">
              <v-row class="mb-2 mt-3 ml-1">
                <h4>Informasi Dokumen</h4>
                <v-divider class="mx-2 mt-3"></v-divider>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="detailEmp.nomor_jamsostek"
                    label="No Jamsostekr"
                    outlined
                    readonly
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="detailEmp.bpjs_kesehatan"
                    label="No Bpjs"
                    outlined
                    readonly
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="detailEmp.no_rek"
                    label="No Rekening"
                    outlined
                    readonly
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="detailEmp.no_npwp"
                    label="No Npwp"
                    outlined
                    readonly
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card>

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
  name: "EmployeeDetail",
  data: () => ({
    itemsbr: [
      {
        text: "Employee",
        disabled: true,
        href: "breadcrumbs_dashboard",
      },
      {
        text: "Detail",
        disabled: true,
        href: "breadcrumbs_link_1",
      },
    ],

    formTitle: "Add Item",
    value: "add",
    dialog: false,
    dialogDelete: false,
    personaldata: true,
    familydata: false,
    workdata: false,
    documentdata: false,
    search: "",
    authtoken: "",
    BaseUrlGet: "",

    detailEmp: {
      id: "",
      foto: "",
      no_induk_karyawan: "",
      no_ktp: "",
      nama_lengkap: "",
      jenis_kelamin: "",
      tempat_lahir: "",
      tanggal_lahir: "",
      nama_ortu: "",
      agama: "",
      unit_perusahan: "",
      pangkat: "",
      jabatan: "",
      divisi: "",
      departement: "",
      rt: "",
      rw: "",
      no_rumah: "",
      desa: "",
      kec: "",
      kab: "",
      status_nikah: "",
      nama_istri_suami: "",
      pekerjaan_istri_suami: "",
      bin_binti: "",
      gol_darah: "",
      status_karyawan: "",
      telpon: "",
      no_telpon_darurat: "",
      mulai_masuk_kerja: "",
      bagian: "",
      ditetapkan: "",
      nomor_jamsostek: "",
      scan_kartu_jamsostek: "",
      bpjs_kesehatan: "",
      scan_kartu_bpjs: "",
      no_rek: "",
      no_npwp: "",
      pendidikan_terakhir: "",
      no_anggota_koperasi: "",
    },

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
    itemlistriwayatkerja: [
      {
        id: 1,
        unit_perusahaan: "PR Sukun",
        tgl: "2022-01-01",
        jabatan: "Manager Keuangan",
        alasan_kepindahan: "-",
      },
      {
        id: 2,
        unit_perusahaan: "PR Sukun",
        tgl: "2021-02-02",
        jabatan: "Staff Keuangan",
        alasan_kepindahan: "-",
      },
    ],
    itemlistpengalamankerja: [
      {
        id: 1,
        perusahaan: "Formulatrix",
        jabatan: "Staff Keuangan",
        alasan_kepindahan: "-",
      },
      {
        id: 2,
        perusahaan: "Damatex",
        jabatan: "Staff Keuangan",
        alasan_kepindahan: "-",
      },
      {
        id: 3,
        perusahaan: "PT SCI",
        jabatan: "Staff Keuangan",
        alasan_kepindahan: "-",
      },
    ],

    itemstabs: [
      { text: "Personal Data", value: "1" },
      { text: "Family Data", value: "2" },
      { text: "Work Data", value: "3" },
      { text: "Document", value: "4" },
    ],
    itemsStatus: [
      { text: "Reseller", value: "1" },
      { text: "Cust Reguler", value: "0" },
    ],
    snackbar: false,
    textsnackbar: "Test",
    timeoutsnackbar: 2000,
    colorsnackbar: null,

    admin_id: "",
    id_emp: "",
  }),

  created() {
    this.id_emp = localStorage.getItem("id_emp");
    console.log(this.id_emp);
    this.authtoken = localStorage.getItem("token");
    this.BaseUrlGet = localStorage.getItem("BaseUrlGet");
    this.User = JSON.parse(localStorage.getItem("User"));
    if (this.User) {
      this.admin_id = this.User.code;
    }
    this.getDetail();
  },

  methods: {
    async getDetail() {
      try {
        const response = await axios.get(
          this.BaseUrlGet + "GetDetailEmployeeById?id=" + this.id_emp,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        console.log(response.data.data.result);
        if (response.data.length != 0) {
          this.detailEmp = response.data.data.result;
          if (response.data.data.result.foto == "-") {
            this.detailEmp.foto = "/images/noimage.png";
          }
          this.itemlistanak = response.data.data.result.listAnak;
          this.itemlistriwayatkerja =
            response.data.data.result.listRiwayatPekerjaan;
          this.itemlistpengalamankerja =
            response.data.data.result.listPengalamanKerja;
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

    tabsdetail(val) {
      this.changeTabs(val);
    },
    selectedTabs(val) {
      this.changeTabs(val);
    },
    changeTabs(val) {
      if (val == 1) {
        this.personaldata = true;
        this.familydata = false;
        this.workdata = false;
        this.documentdata = false;
      } else if (val == 2) {
        this.personaldata = false;
        this.familydata = true;
        this.workdata = false;
        this.documentdata = false;
      } else if (val == 3) {
        this.personaldata = false;
        this.familydata = false;
        this.workdata = true;
        this.documentdata = false;
      } else {
        this.personaldata = false;
        this.familydata = false;
        this.workdata = false;
        this.documentdata = true;
      }
    },
    detailItem(item) {
      console.log(item);
      this.defaultItem = Object.assign({}, item);
      this.getDetail();
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
    closeDelete() {
      this.dialogDelete = false;
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
