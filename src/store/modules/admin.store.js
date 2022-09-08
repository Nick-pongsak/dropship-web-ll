import axios from 'axios';
const url = `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_API_PORT}`;
const debug = process.env.VUE_APP_PRODUCTION_STATUS;


const store = {
  state: {
    // user_profile: null,
    // access_token: null
    create_profile: null
  },
  mutations: {
    SetCreateProfile(state, data) {
      state.create_profile = data;
    },
    // SetUserProfile(state, data) {
    //   state.user_profile = data;
    // },
  },
  actions: {
    Register({ state, commit, dispatch }, data) {
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/auth/register`, {
          user_role: data.user_role,
          user_id: data.user_id,
          user_name: data.user_name,
          user_surname: data.user_surname,
          user_company: data.user_company,
          user_email: data.user_email,
          user_phone: data.user_phone,
          user_phone_secendary: data.user_phone_secendary,
          user_password: data.user_password,
          user_address: data.user_address,
          user_district: data.user_district == null ? '' : data.user_district,
          user_subdistrict: data.user_subdistrict == null ? '' : data.user_subdistrict,
          user_province: data.user_province == null ? '' : data.user_province,
          user_postal: data.user_postal == null ? '' : data.user_postal,
        }, {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${store.getters.access_token}`,
          }
        }).then(response => {
          console.log(response)
          resolve(response.data);
        }).catch(error => {
          reject(error)
        })
      })

    },
    getDataUserCreate({ state, commit, dispatch }, data) {
      return new Promise((resolve, reject) => {
        let Profile = JSON.parse(sessionStorage.getItem('user_profile'))
        axios.post(`${url}/apiweb/api/get-data-user`, { user_role: data.value }, {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${Profile.access_token}`,
          }
        }).then(response => {
          resolve(response.data);
        }).catch(error => {
          reject(error)
        })
      })

    },
    getUserList({ state, commit, dispatch }, data) {
      return new Promise((resolve, reject) => {
        console.log("getUserList ==>", JSON.stringify(data))
        let Profile = JSON.parse(sessionStorage.getItem('user_profile'))
        axios.post(`${url}/apiweb/api/get-user-list`, data, {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${Profile.access_token}`,
          }
        }).then(response => {
          resolve(response.data.success);
        }).catch(error => {
          reject(error)
        })
      })

    },
    disableOrderAdmin({ state, commit, dispatch }, data) {
      return new Promise((resolve, reject) => {
        console.log("getUserList ==>", JSON.stringify(data))
        let Profile = JSON.parse(sessionStorage.getItem('user_profile'))
        axios.post(`${url}/apiweb/api/disable-order-admin`, {
          purchase_id: JSON.stringify(data)
        }, {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${Profile.access_token}`,
          }
        }).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error)
        })
      })

    },
   
    changePwdStatus({ state, commit, dispatch }, data) {
      let Profile = JSON.parse(sessionStorage.getItem('user_profile'))
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/change-pwd-status`, {
          user_id: data.user_id,
          new_password: data.new_password,
          user_status: data.user_status,
        }, {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${Profile.access_token}`,
          }
        }).then(response => {
          console.log(response)
          resolve(response.data);
        }).catch(error => {
          reject(error)
        })
      })

    },

    GetProvince({ state, commit, dispatch }, data) {
      let Profile = JSON.parse(sessionStorage.getItem('user_profile'))
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/get-province`, {
          province_id: data.province_id,
          zip_code: data.zip_code,
          subdistrict_id: data.subdistrict_id,
          district_id: data.district_id
        }, {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${Profile.access_token}`,
          }
        }).then(response => {
          console.log(response)
          resolve(response.data);
        }).catch(error => {
          reject(error)
        })
      })

    },
    getOrderAdmin({ state, commit, dispatch }, data) {
      let Profile = JSON.parse(sessionStorage.getItem('user_profile'))
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/get-order-admin`, {
          keyword:data.search,
          cus_name:data.customer,
          sup_name:data.manufacturer,
          company:data.company,
          purchase_id:data.order,


          start_order_date:data.startOrderDate,
          end_order_date:data.endOrderDate,

          start_delivery_date:data.startDliveryDate,
          end_delivery_date:data.endDliveryDate,

          start_success_date:data.startSuccessDelivery,
          end_success_date:data.endSuccessDelivery,

          order_status:data.status == 'all'? '' : data.status
        }, {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${Profile.access_token}`,
          }
        }).then(response => {
          console.log(response)
          resolve(response.data);
        }).catch(error => {
          reject(error)
        })
      })

    },
    updateProfile({ state, commit, dispatch }, data) {
      let Profile = JSON.parse(sessionStorage.getItem('user_profile'))
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/update-profile`, {
          user_id:data.user_id,
          user_email:data.user_email,
          user_name:data.user_name,
          user_surname:data.user_surname,
          user_phone:data.user_phone,
        }, {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${Profile.access_token}`,
          }
        }).then(response => {
          console.log(response)
          resolve(response.data);
        }).catch(error => {
          reject(error)
        })
      })

    },
    changePassword({ state, commit, dispatch }, data) {
      let Profile = JSON.parse(sessionStorage.getItem('user_profile'))
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/change-password`, {
          user_id:data.user_id,
          old_password:data.old_password,
          new_password:data.new_password,
        }, {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${Profile.access_token}`,
          }
        }).then(response => {
          
          resolve(response.data);
        }).catch(error => {
          reject(error)
        })
      })

    },
  },
  getters: {
    user_create_profile(state) {
      return state.create_profile;
    },
    // access_token(state) {
    //   return state.access_token;
    // },
  }
}

export default store;