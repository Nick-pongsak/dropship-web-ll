import axios from 'axios';
import Vue from 'vue'
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
      let Profile = JSON.parse(Vue.localStorage.get('user_profile'))
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
            "Authorization": `Bearer ${Profile.access_token}`,
          }
        }).then(response => {
          // console.log(response)
          dispatch('newToken',response.data.success.data.token)
         
          resolve(response.data);
        }).catch(error => {
          dispatch('newToken',error.response.data.error.data.token)
          // console.log(error.response)
          reject(error)
        })
      })

    },
    getDataUserCreate({ state, commit, dispatch }, data) {
      return new Promise((resolve, reject) => {
        let Profile = JSON.parse(Vue.localStorage.get('user_profile'))
        axios.post(`${url}/apiweb/api/get-data-user`, { user_role: data.value }, {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${Profile.access_token}`,
          }
        }).then(response => {
          dispatch('newToken',response.data.success.token)
          // console.log(response.data.success.token)
          resolve(response.data);
        }).catch(error => {
          dispatch('newToken',error.response.data.error.data.token)
          // console.log(error.response)
          reject(error)
        })
      })

    },
    getUserList({ state, commit, dispatch }, data) {
      return new Promise((resolve, reject) => {
        let Profile = JSON.parse(Vue.localStorage.get('user_profile'))
        axios.post(`${url}/apiweb/api/get-user-list`, data, {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${Profile.access_token}`,
          }
        }).then(response => {
          dispatch('newToken',response.data.success.token)
          // console.log(response.data.success)
          resolve(response.data.success);
        }).catch(error => {
          reject(error)
        })
      })

    },
    disableOrderAdmin({ state, commit, dispatch }, data) {
      return new Promise((resolve, reject) => {
        let Profile = JSON.parse(Vue.localStorage.get('user_profile'))
        axios.post(`${url}/apiweb/api/disable-order-admin`, {
          purchase_id: JSON.stringify(data)
        }, {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${Profile.access_token}`,
          }
        }).then(response => {
          dispatch('newToken',response.data.success.data.token)
          resolve(response);
        }).catch(error => {
          reject(error)
        })
      })

    },
    resendMail({ state, commit, dispatch }, data) {
      return new Promise((resolve, reject) => {
        let Profile = JSON.parse(Vue.localStorage.get('user_profile'))
        axios.post(`${url}/apiweb/api/resend-mail`, {
          purchase_id: JSON.stringify(data)
        }, {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${Profile.access_token}`,
          }
        }).then(response => {
          dispatch('newToken',response.data.success.data.token)
          resolve(response);
        }).catch(error => {
          reject(error)
        })
      })

    },


  
   
    changePwdStatus({ state, commit, dispatch }, data) {
      let Profile = JSON.parse(Vue.localStorage.get('user_profile'))
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
          dispatch('newToken',response.data.success.data.token)
          // console.log(response)
          resolve(response.data);
        }).catch(error => {
          reject(error)
        })
      })

    },

    GetProvince({ state, commit, dispatch }, data) {
      let Profile = JSON.parse(Vue.localStorage.get('user_profile'))
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
          resolve(response.data);
        }).catch(error => {
          reject(error)
        })
      })

    },
    getOrderAdmin({ state, commit, dispatch }, data) {
      console.log(data)
      let Profile = JSON.parse(Vue.localStorage.get('user_profile'))
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

          order_status:data.status == 'all'? '' : data.status,

          status_send_mail:data.status_send_mail
        }, {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${Profile.access_token}`,
          }
        }).then(response => {
          dispatch('newToken',response.data.success.token)
          // console.log(response)
          resolve(response.data);
        }).catch(error => {
          reject(error)
        })
      })

    },
    getAccountEmail({ state, commit, dispatch }, data) {
      console.log(data)
      let Profile = JSON.parse(Vue.localStorage.get('user_profile'))
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/accounting-mail`, {
          event :data.event ,
          id:data.id,
          acc_email :data.acc_email ,
          acc_name :data.acc_name ,
          is_active :data.is_active ,
        }, {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${Profile.access_token}`,
          }
        }).then(response => {
          dispatch('newToken',response.data.success.token)
          // console.log(response.data.success.token)
          resolve(response.data.success.data);
        }).catch(error => {
          dispatch('newToken',error.response.data.error.data.token)
          reject(error)
        })
      })

    },
    updateProfile({ state, commit, dispatch }, data) {
      let Profile = JSON.parse(Vue.localStorage.get('user_profile'))
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
          dispatch('newToken',response.data.success.data.token)
          // console.log(response)
          resolve(response.data);
        }).catch(error => {
          dispatch('newToken',error.response.data.error.data.token)
          // console.log(error.response)
          reject(error)
        })
      })

    },
    changePassword({ state, commit, dispatch }, data) {
      let Profile = JSON.parse(Vue.localStorage.get('user_profile'))
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
          dispatch('newToken',response.data.success.data.token)
          resolve(response.data);
        }).catch(error => {
          dispatch('newToken',error.response.data.error.data.token)
          // console.log(error.response)
          reject(error)
        })
      })

    },

    sendOrderStatus({ state, commit, dispatch }, data) {
      // console.log('Pro')
      let Profile = JSON.parse(Vue.localStorage.get('user_profile'))
      let formData = new FormData()
      formData.append('purchase_id', data.purchase_id)
      formData.append('order_remark', data.order_remarks)
      formData.append('order_status', data.order_status)
      formData.append('order_delivery_date', data.order_delivery_date)
      formData.append('order_success_date', data.order_success_date)
      formData.append('shipping_code', data.shipping_code)
      formData.append('tracking_code', data.tracking_code)
      formData.append('shipping_track_link', data.shipping_track_link)
      formData.append('image', data.image)
      return new Promise((resolve, reject) => {

        axios.post(`${url}/apiweb/api/send-order-status`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
            "Authorization": `Bearer ${Profile.access_token}`
          }
        }).then(response => {
          dispatch('newToken',response.data.success.data.token)
            console.log(response.data.success.data.token)
          resolve(response.data);
        }).catch(error => {
          dispatch('newToken',error.response.data.error.data.token)
          reject(error)
        })
      })

    },
    changeAddress({ state, commit, dispatch }, data) {
      // console.log('Pro')
      let Profile = JSON.parse(Vue.localStorage.get('user_profile'))
      let formData = new FormData()
      formData.append('purchase_id', data)
      return new Promise((resolve, reject) => {

        axios.post(`${url}/apiweb/api/change-address`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
            "Authorization": `Bearer ${Profile.access_token}`
          }
        }).then(response => {
          dispatch('newToken',response.data.success.data.token)
            console.log(response.data.success.data.token)
          resolve(response.data);
        }).catch(error => {
          dispatch('newToken',error.response.data.error.data.token)
          reject(error)
        })
      })

    },

    // http://10.7.200.176/apiweb/api/change-address

    registerSendEmail({ state, commit, dispatch }, data) {
      // console.log('Pro')
      let Profile = JSON.parse(Vue.localStorage.get('user_profile'))
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/auth/register-send-email`, {
          user_email: data.user_email,
          user_password: data.user_password,
        }, {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${Profile.access_token}`,
          }
        }).then(response => {
          dispatch('newToken',response.data.success.data.token)
            // console.log(response)
          resolve(response.data);
        }).catch(error => {
          dispatch('newToken',error.response.data.error.data.token)
          reject(error)
        })
      })

    },
    shippingMaster({ state, commit, dispatch }, data) {
      // console.log('Pro')
      let Profile = JSON.parse(Vue.localStorage.get('user_profile'))
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/shipping-master`, {
          event:data.event,
          shipping_id:data.shipping_id,
          shipping_code:data.shipping_code,
          shipping_name:data.shipping_name,
          shipping_track_link:data.shipping_track_link,
          is_active:data.is_active,
        }, {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${Profile.access_token}`,
          }
        }).then(response => {
          dispatch('newToken',response.data.success.token)
            // console.log(response.data.success.data)
          resolve(response.data.success.data);
        }).catch(error => {
         
          dispatch('newToken',error.response.data.error.data.token)
          reject(error)
        })
      })

    },
    Up({ state, commit, dispatch }, data) {
      let Profile = JSON.parse(Vue.localStorage.get('user_profile'))
      let formData = new FormData()
      console.log(data)
      formData.append('image', data.image)
      // formData.append('file_type', data.image.type)
      formData.append('purchase_id', data.detail)
      axios.post(`${url}/apiweb/api/upload-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          "Authorization": `Bearer ${Profile.access_token}`
        }
          }).then(res => {
            dispatch('newToken',res.data.success.data.token)
            console.log(res)
            console.log(res.data.success.data.token)
          
          }).catch(error => {
                  console.log(error.response.data.error.data.token)
                  dispatch('newToken',error.response.data.error.data.token)
                  reject(error)
          })
        },
    newToken({ state, commit, dispatch }, data) {
      let Profile = JSON.parse(Vue.localStorage.get('user_profile'))
      Profile.access_token = data
      // console.log( Profile)
      Vue.localStorage.set('user_profile',JSON.stringify(Profile))
    }
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