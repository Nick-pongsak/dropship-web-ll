import axios from 'axios';
const url = `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_API_PORT}`;
const debug = process.env.VUE_APP_PRODUCTION_STATUS;

const store = {
  state: {
        status_ : false
  },
  mutations: {
    // SetLoading(state, data) {
    //   state.loading = data;
    // }
  },
  actions: {

    checkEmail({ state, commit, dispatch }, data) {
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/auth/checkemail`, {
          user_email: data
          
        }, {
          headers: {
            'Content-Type': 'application/json',
          }
        }).then(response => {
          console.log(response)
          resolve(response.data);
        }).catch(error => {
          reject(error)
        })
      })

    },
    
    sendMail({ state, commit, dispatch }, data) {
      console.log("sendMail API => ", data)
 
      // return new Promise((resolve, reject) => {
      //   axios.post(`${url}/apiweb/api/auth/sendmail`, {
      //     email: data
          
      //   }, {
      //     headers: {
      //       'Content-Type': 'application/json',
      //     }
      //   }).then(response => {
      //     console.log(response)
      //     resolve(response.data);
      //   }).catch(error => {
      //     reject(error)
      //   })
      // })

    },

    getOrderSupplier({ state, commit, dispatch }, data) {
      let Profile = JSON.parse(sessionStorage.getItem('user_profile'))
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/get-order-supplier `, {
          keyword:data.search,
          cus_name:data.customer, 
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
          console.log(response.data.success.data)
          for (let index = 0; index < response.data.success.data.length; index++) {
             const element = response.data.success.data[index];

            if(element.order_status != 'Delivering'){
              Object.assign(element , {checked: true});
            }else {
              Object.assign(element , {checked: false});
            }
           
            
          }
         
          resolve(response.data);
        }).catch(error => {
          reject(error)
        })
      })

    },
  },
  getters: {
    status_(state) {
      return state.status_;
    }
  }
}

export default store;