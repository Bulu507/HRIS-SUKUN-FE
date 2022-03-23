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
          <v-btn
            dark
            class="mx-1 mt-1 d-none d-md-block"
            @click="showFilter()"
            color="#25695c"
          >
            <v-icon class="mx-2" small>mdi-filter-variant</v-icon> Filter
            Recruitment
          </v-btn>
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
                      <h4 style="color: black; font-size: 18px">Recruitment</h4>
                      <v-divider
                        class="mx-2 mt-3"
                        style="border-color: black"
                      ></v-divider>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="6" md="6" class="pa-1">
                        <v-text-field
                          v-model="defaultItem.nama_recruitment"
                          outlined
                          label="Nama Recruitment"
                          class="fontall"
                          color="#25695c"
                          dense
                          :rules="[(v) => !!v || 'Field is required']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pa-1">
                        <v-text-field
                          v-model="defaultItem.jabatan"
                          outlined
                          label="Jabatan"
                          class="fontall"
                          color="#25695c"
                          dense
                          :rules="[(v) => !!v || 'Field is required']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12" class="pa-1">
                        <v-select
                          v-model="defaultItem.department"
                          :items="itemsdept"
                          item-value="department_code"
                          item-text="dept_nama"
                          label="Pilih Department"
                          clearable
                          outlined
                          dense
                          :rules="[(v) => !!v || 'Field is required']"
                        ></v-select>
                      </v-col>

                      <v-col cols="12" sm="6" md="6" class="pa-1">
                        <v-text-field
                          v-model="defaultItem.lokasi_penempatan"
                          outlined
                          label="Penempatan"
                          class="fontall"
                          color="#25695c"
                          dense
                          :rules="[(v) => !!v || 'Field is required']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pa-1">
                        <v-text-field
                          v-model="defaultItem.jumlah_kebutuhan"
                          outlined
                          label="Jumlah Kebutuhan"
                          class="fontall"
                          color="#25695c"
                          type="number"
                          dense
                          :rules="[(v) => !!v || 'Field is required']"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="6" class="pa-1">
                        <v-menu
                          v-model="menu1"
                          :close-on-content-click="false"
                          transition="scale-transition"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="datepicker1"
                              slot="activator"
                              label="Tanggal Permintaan"
                              outlined
                              dense
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="datepicker1"
                            @input="menu1 = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pa-1">
                        <v-menu
                          v-model="menu2"
                          :close-on-content-click="false"
                          transition="scale-transition"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="datepicker2"
                              slot="activator"
                              label="Target Tanggal Pemenuhan"
                              outlined
                              dense
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="datepicker2"
                            @input="menu2 = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pa-1">
                        <v-select
                          v-model="defaultItem.source_pemenuhan"
                          :items="itemsSource"
                          item-value="value"
                          item-text="text"
                          label="Pilih Source"
                          clearable
                          outlined
                          dense
                          :rules="[(v) => !!v || 'Field is required']"
                        ></v-select>
                      </v-col>
                    </v-row>
                    <v-row class="mb-1 mt-0">
                      <h4 style="color: black; font-size: 18px">
                        Recruitment Schedule
                      </h4>
                      <v-divider
                        class="mx-2 mt-3"
                        style="border-color: black"
                      ></v-divider>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="12" md="12" class="pa-1">
                        <v-simple-table>
                          <template v-slot:default>
                            <thead>
                              <tr>
                                <th class="text-left">Name Schedule</th>
                                <th class="text-left">Tanggal Schedule</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Psikotes</td>
                                <td class="pt-5">
                                  <v-menu
                                    v-model="menu3"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                  >
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-text-field
                                        v-model="datepicker3"
                                        slot="activator"
                                        label="Tanggal Permintaan"
                                        outlined
                                        dense
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                      ></v-text-field>
                                    </template>
                                    <v-date-picker
                                      v-model="datepicker3"
                                      @input="menu3 = false"
                                    ></v-date-picker>
                                  </v-menu>
                                </td>
                              </tr>
                              <tr>
                                <td>Interview_HR</td>
                                <td class="pt-5">
                                  <v-menu
                                    v-model="menu4"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                  >
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-text-field
                                        v-model="datepicker4"
                                        slot="activator"
                                        label="Tanggal Permintaan"
                                        outlined
                                        dense
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                      ></v-text-field>
                                    </template>
                                    <v-date-picker
                                      v-model="datepicker4"
                                      @input="menu4 = false"
                                    ></v-date-picker>
                                  </v-menu>
                                </td>
                              </tr>
                              <tr>
                                <td>Interview_Manager</td>
                                <td class="pt-5">
                                  <v-menu
                                    v-model="menu5"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                  >
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-text-field
                                        v-model="datepicker5"
                                        slot="activator"
                                        label="Tanggal Permintaan"
                                        outlined
                                        dense
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                      ></v-text-field>
                                    </template>
                                    <v-date-picker
                                      v-model="datepicker5"
                                      @input="menu5 = false"
                                    ></v-date-picker>
                                  </v-menu>
                                </td>
                              </tr>
                              <tr>
                                <td>Inteview_User</td>
                                <td class="pt-5">
                                  <v-menu
                                    v-model="menu6"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                  >
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-text-field
                                        v-model="datepicker6"
                                        slot="activator"
                                        label="Tanggal Permintaan"
                                        outlined
                                        dense
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                      ></v-text-field>
                                    </template>
                                    <v-date-picker
                                      v-model="datepicker6"
                                      @input="menu6 = false"
                                    ></v-date-picker>
                                  </v-menu>
                                </td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
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
                          Recruitment
                        </h4>
                        <v-divider
                          class="mx-2 mt-3"
                          style="border-color: black"
                        ></v-divider>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="12" md="12" class="pa-1">
                          <v-text-field
                            v-model="defaultItem.nama_recruitment"
                            outlined
                            label="Nama Recruitment"
                            class="fontall"
                            color="#25695c"
                            dense
                            readonly
                            :rules="[(v) => !!v || 'Field is required']"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" class="pa-1">
                          <v-select
                            v-model="defaultItem.department"
                            :items="itemsdept"
                            item-value="department_code"
                            item-text="dept_nama"
                            label="Pilih Department"
                            readonly
                            outlined
                            dense
                            :rules="[(v) => !!v || 'Field is required']"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" class="pa-1">
                          <v-text-field
                            v-model="defaultItem.jabatan"
                            outlined
                            label="Jabatan"
                            class="fontall"
                            color="#25695c"
                            dense
                            readonly
                            :rules="[(v) => !!v || 'Field is required']"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="6" class="pa-1">
                          <v-text-field
                            v-model="defaultItem.lokasi_penempatan"
                            outlined
                            label="Penempatan"
                            class="fontall"
                            color="#25695c"
                            dense
                            readonly
                            :rules="[(v) => !!v || 'Field is required']"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" class="pa-1">
                          <v-text-field
                            v-model="defaultItem.jumlah_kebutuhan"
                            outlined
                            label="Jumlah Kebutuhan"
                            class="fontall"
                            color="#25695c"
                            type="number"
                            dense
                            readonly
                            :rules="[(v) => !!v || 'Field is required']"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="6" class="pa-1">
                          <v-text-field
                            v-model="datepicker1"
                            slot="activator"
                            label="Tanggal Permintaan"
                            outlined
                            dense
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            :rules="[(v) => !!v || 'Field is required']"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" class="pa-1">
                          <v-text-field
                            v-model="datepicker2"
                            slot="activator"
                            label="Target Tanggal Pemenuhan"
                            outlined
                            dense
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            :rules="[(v) => !!v || 'Field is required']"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" class="pa-1">
                          <v-select
                            v-model="defaultItem.source_pemenuhan"
                            :items="itemsSource"
                            item-value="value"
                            item-text="text"
                            label="Pilih Source"
                            readonly
                            outlined
                            dense
                            :rules="[(v) => !!v || 'Field is required']"
                          ></v-select>
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
                          Recruitment Schedule
                        </h4>
                        <v-divider
                          class="mx-2 mt-3"
                          style="border-color: black"
                        ></v-divider>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="12" md="12" class="pa-1">
                          <v-simple-table>
                            <template v-slot:default>
                              <tbody>
                                <tr>
                                  <td>Psikotes</td>
                                  <td class="pt-5">
                                    <v-text-field
                                      v-model="datepicker3"
                                      slot="activator"
                                      label="Tanggal Permintaan"
                                      outlined
                                      dense
                                      readonly
                                      v-bind="attrs"
                                      v-on="on"
                                      :rules="[
                                        (v) => !!v || 'Field is required',
                                      ]"
                                    ></v-text-field>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Interview_HR</td>
                                  <td class="pt-5">
                                    <v-text-field
                                      v-model="datepicker4"
                                      slot="activator"
                                      label="Tanggal Permintaan"
                                      outlined
                                      dense
                                      readonly
                                      v-bind="attrs"
                                      v-on="on"
                                      :rules="[
                                        (v) => !!v || 'Field is required',
                                      ]"
                                    ></v-text-field>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Interview_Manager</td>
                                  <td class="pt-5">
                                    <v-text-field
                                      v-model="datepicker5"
                                      slot="activator"
                                      label="Tanggal Permintaan"
                                      outlined
                                      dense
                                      readonly
                                      v-bind="attrs"
                                      v-on="on"
                                      :rules="[
                                        (v) => !!v || 'Field is required',
                                      ]"
                                    ></v-text-field>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Inteview_User</td>
                                  <td class="pt-5">
                                    <v-text-field
                                      v-model="datepicker6"
                                      slot="activator"
                                      label="Tanggal Permintaan"
                                      outlined
                                      dense
                                      readonly
                                      v-bind="attrs"
                                      v-on="on"
                                      :rules="[
                                        (v) => !!v || 'Field is required',
                                      ]"
                                    ></v-text-field>
                                  </td>
                                </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
                        </v-col>
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
                      v-model="defaultItem.nama_recruitment"
                      label="Nama Recruitment"
                      outlined
                      readonly
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6" class="px-7 py-0">
                    <v-text-field
                      v-model="defaultItem.jabatan"
                      label="Jabatan"
                      outlined
                      readonly
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6" class="px-7 py-0">
                    <v-text-field
                      v-model="defaultItem.jumlah_kebutuhan"
                      label="Jumlah Kebutuhan"
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
  name: "Recruitment",
  data: () => ({
    itemsbr: [
      {
        text: "Recruitment",
        disabled: true,
        href: "breadcrumbs_dashboard",
      },
      {
        text: "Recruitment",
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
      { text: "Nama", value: "nama_recruitment" },
      { text: "Department", value: "dept_nama" },
      // { text: "Unit Perusahaan", value: "unit_perusahan_nama" },
      { text: "Jabatan", value: "jabatan" },
      { text: "Penempatan", value: "lokasi_penempatan" },
      { text: "Jumlah", value: "jumlah_kebutuhan" },
      { text: "Tanggal Pemenuhan", value: "target_tanggal_pemenuhan" },
      //   { text: "Pangkat", value: "pangkat" },
      //   { text: "User ID", value: "username" },
      { text: "Actions", value: "actions", sortable: false, width: "15%" },
    ],
    dataobject: [],

    readOnly: {
      id_recruitment: "",
    },
    defaultItem: {
      nama_recruitment: "",
      jabatan: "",
      department: "",
      lokasi_penempatan: "",
      jumlah_kebutuhan: "",
      source_pemenuhan: "",
      tanggal_permintaan: "",
      target_tanggal_pemenuhan: "",
      listSchedule: "list",
    },

    deleteDetailItem: {
      id: "",
      no_induk_karyawan: "",
      nama_lengkap: "",
    },

    itemsdept: [],
    itemsdivisi: [],
    itemsSource: [
      { text: "internal", value: "internal" },
      { text: "eksternal", value: "eksternal" },
    ],

    id_schedule1: "",
    id_schedule2: "",
    id_schedule3: "",
    id_schedule4: "",

    datepicker1: "2022-01-01",
    menu1: false,
    datepicker2: "2022-01-01",
    menu2: false,
    datepicker3: "2022-01-01",
    menu3: false,
    datepicker4: "2022-01-01",
    menu4: false,
    datepicker5: "2022-01-01",
    menu5: false,
    datepicker6: "2022-01-01",
    menu6: false,

    selectDivisi: "",
    selectDepartment: "",
    selectStatusKaryawan: "",
    selectDepartment: "",
    selectUnitPerusahaan: "",
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
    this.getDept();
  },
  setup() {},

  methods: {
    async initialize(dept) {
      var dept_code = "";
      if (dept) {
        dept_code = dept;
      }
      try {
        const response = await axios.get(
          this.BaseUrlGet + "GetRecruitment?department_code=" + dept_code,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
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
    async getDivisi() {
      try {
        const response = await axios.get(this.BaseUrlGet + "GetAllDivisi", {
          headers: {
            Authorization: `Bearer ` + this.authtoken,
          },
        });
        console.log(response.data.data.result.data);
        if (response.data.length != 0) {
          this.itemsdivisi = response.data.data.result.data;
        } else {
          console.log("Kosong");
          this.itemsdivisi = [];
        }
      } catch (error) {
        console.error(error);
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        } else {
          this.itemsdivisi = [];
        }
      }
    },
    // async getDept(val) {
    //   var div_code = "";
    //   if (val) {
    //     div_code = val;
    //   }
    //   try {
    //     const response = await axios.get(
    //       this.BaseUrlGet + "GetAllDepartment?divisi_code=" + div_code,
    //       {
    //         headers: {
    //           Authorization: `Bearer ` + this.authtoken,
    //         },
    //       }
    //     );
    //     console.log(response.data.data.result.data);
    //     if (response.data.length != 0) {
    //       this.itemsdept = response.data.data.result.data;
    //     } else {
    //       console.log("Kosong");
    //       this.itemsdept = [];
    //     }
    //   } catch (error) {
    //     console.error(error);
    //     if (error.response.status == 401) {
    //       localStorage.removeItem("token");
    //       this.$router.push("/");
    //     } else {
    //       this.itemsdept = [];
    //     }
    //   }
    // },
    async getDept() {
      try {
        const response = await axios.get(this.BaseUrlGet + "GetAllDepartment", {
          headers: {
            Authorization: `Bearer ` + this.authtoken,
          },
        });
        console.log(response.data.data.result.data);
        if (response.data.length != 0) {
          this.itemsdept = response.data.data.result.data;
        } else {
          console.log("Kosong");
          this.itemsdept = [];
        }
      } catch (error) {
        console.error(error);
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        } else {
          this.itemsdept = [];
        }
      }
    },
    async getDetail() {
      try {
        const response = await axios.get(
          this.BaseUrlGet +
            "GetDetailRecruitment?id_recruitment=" +
            this.readOnly.id_recruitment,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        console.log(response.data.data.result);
        if (response.data.length != 0) {
          this.defaultItem = response.data.data.result.GetDetailRecruitment;
          this.datepicker1 =
            response.data.data.result.GetDetailRecruitment.tanggal_permintaan.substring(
              0,
              10
            );
          this.datepicker2 =
            response.data.data.result.GetDetailRecruitment.target_tanggal_pemenuhan.substring(
              0,
              10
            );

          this.datepicker3 =
            response.data.data.result.GetSchedule[0].tanggal_schedule.substring(
              0,
              10
            );
          this.datepicker4 =
            response.data.data.result.GetSchedule[1].tanggal_schedule.substring(
              0,
              10
            );
          this.datepicker5 =
            response.data.data.result.GetSchedule[2].tanggal_schedule.substring(
              0,
              10
            );
          this.datepicker6 =
            response.data.data.result.GetSchedule[3].tanggal_schedule.substring(
              0,
              10
            );

          this.id_schedule1 =
            response.data.data.result.GetSchedule[0].id_schedule;
          this.id_schedule2 =
            response.data.data.result.GetSchedule[1].id_schedule;
          this.id_schedule3 =
            response.data.data.result.GetSchedule[2].id_schedule;
          this.id_schedule4 =
            response.data.data.result.GetSchedule[3].id_schedule;

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
          this.BaseUrlGet + "AddRecruitment",
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
          this.BaseUrlGet + "UpdateRecruitment",
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
        id_recruitment: this.readOnly.id_recruitment,
        // no_induk_karyawan: this.deleteDetailItem.no_induk_karyawan,
      };
      // this.dialogDetail = false;
      try {
        const response = await axios.post(
          this.BaseUrlGet + "DeleteRecruitment",
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
      this.readOnly.id_recruitment = item.id_recruitment;
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
      this.readOnly.id_recruitment = item.id_recruitment;
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
      this.readOnly.id_recruitment = item.id_recruitment;
      this.defaultItem.nama_recruitment = item.nama_recruitment;
      this.defaultItem.jabatan = item.jabatan;
      this.defaultItem.jumlah_kebutuhan = item.jumlah_kebutuhan;
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
      let itemsSchedule = [
        {
          id_schedule: this.id_schedule1,
          nama_schedule: "Psikotes",
          tanggal_schedule: this.datepicker3,
        },
        {
          id_schedule: this.id_schedule2,
          nama_schedule: "Interview_HR",
          tanggal_schedule: this.datepicker4,
        },
        {
          id_schedule: this.id_schedule3,
          nama_schedule: "Interview_Manager",
          tanggal_schedule: this.datepicker5,
        },
        {
          id_schedule: this.id_schedule4,
          nama_schedule: "Inteview_User",
          tanggal_schedule: this.datepicker6,
        },
      ];
      //   this.loading = true;

      this.defaultItem.tanggal_permintaan = this.datepicker1;
      this.defaultItem.target_tanggal_pemenuhan = this.datepicker2;

      const datapost = this.defaultItem;

      console.log(datapost);

      if (HelperGlobalService.checkMandatory(datapost, "object") == true) {
        datapost.listSchedule = JSON.stringify(itemsSchedule);

        console.log(datapost);
        if (this.readOnly.id_recruitment) {
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
      this.defaultItem.nama_recruitment = "";
      this.defaultItem.jabatan = "";
      this.defaultItem.department = "";
      this.defaultItem.lokasi_penempatan = "";
      this.defaultItem.jumlah_kebutuhan = "";
      this.defaultItem.source_pemenuhan = "";
      this.defaultItem.tanggal_permintaan = "";
      this.defaultItem.target_tanggal_pemenuhan = "";

      this.readOnly.id_recruitment = "";
      this.$refs.form.resetValidation();
    },

    gettanggal(val) {
      return HelperGlobalService.gettanggal(val);
    },
  },
};
</script>
