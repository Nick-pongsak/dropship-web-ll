<template>
    <div>
        <div>
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,600;1,600&display=swap" rel="stylesheet">
    
    <table style="font-family: 'Nunito', sans-serif;width: 100%;">
            <tbody>
                <tr>
                    <td style="width: 3%;" rowspan="2"> <img   src="@/assets/icons/logo.png"></td>
                    <td style="
                        width: 95%;
                        font-weight: 800;
                        padding:0 0 0 10px;
                        font-size: 20px;
                    ">Dropship portal</td>
                </tr>
                <tr>
                    <td><small style="padding:0 0 0 10px;font-size: 8px;">by DHA Siamwalla co., Ltd.</small></td>
                </tr>
            </tbody>
        </table>


            <div style="    
            width: 100%;
            border-radius: 20px;
            padding:50px 0 0 0;
            display: flex;
            padding:20px;
            justify-content: center;width: 100%;">
            <table style="
            
                border-radius: 20px;
                background-color:#EFF6FF;
                width: 90%;">

            <tbody style="font-size:16px; font-family: 'Nunito', sans-serif; border-radius: 20px;">
                <tr>
                    <td style="width: 7%;" rowspan="3">
                        <div style="font-weight: bold; padding:10px 0 0 10px;height: 100%; width: 100%;">
                            HELLO ,
                        </div>
                        
                    </td>
                    <td style="padding:10px 0 0 0;text-decoration: underline;color:#0085D1;" colspan="3">Example@gmail.com</td>
                </tr>
                <tr>
                    <td style="font-weight: 800;padding:10px 0 0 0;width: 70%;" colspan="2">
                    <div>
                        request has been recived to change the password for your
                    </div>
                    <div>
                        Dropship portal account
                    </div>
                    <div style="margin:20px 0 0 0;">
                        <button style="
                        width: 270px;
                        height: 34px;
                        left: calc(50% - 270px/2 - 199px);
                        top: calc(50% - 34px/2 + 6.5px);
                        color:#fff;
                        background: #000000;
                        border-radius: 50px;
                        ">change password</button>
                    </div>
                    <div style="padding:20px 0 0 0">
                        If you did not initiate this request, please contact us immediately at </div>
                        <a href="">dropshipportal@dhas.com </a>
                                                            
                    </td>
                    <td><img src="@/assets/images/lock-mail.png"></td>
                </tr>
                <tr>
                    <td colspan="3">
                        <div style=" 
                        padding:0 30px 20px 0;  
                        display: flex;
                        justify-content: flex-end;
                        width: 100%;">  
                        <div>
                        Thank you <br>
                        Dropship portal Team
                        </div>
                        </div>
                    
                    </td>
                </tr>
            </tbody>
            </table>
            </div>
        </div>
    </div>
</template>
  
  <script>
  import Vue from "vue";
  export default {
    name: 'logout',
    data () {
      return {}
    },
    computed: {
     
    },
    watch: {},
    methods: {},
    components: {},
    created () {
    },
    mounted () {}
  }
  </script>
  <style>
    td, th {
        padding: 3px;
        width: 30px;
        height: 25px;
    }

  </style>
  