import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  // base: './',
  // mode: "history",
  routes: [
    {
      path: "/",
      component: Home,
      redirect: "/index",
      children: [
        {
          path: "/index",
          name: "index",
          component: () => import(/* webpackChunkName: "home" */ "./views/home/map/Index.vue")
        },
        {
          path: "/home/visit",
          name: "visit",
          component: () => import(/* webpackChunkName: "home" */ "./views/home/visit/Visit.vue")
        }
      ]
    },
    {
      path: "/productapply",
      name: "productapply",
      component: () =>
        import(/* webpackChunkName: "home" */ "./views/home/productapply/ProductApply.vue")
    },
    {
      path: "/integral",
      name: "integral",
      component: () => import(/* webpackChunkName: "home" */ "./views/home/integral/Integral.vue")
    },
    {
      path: "/visitrecord",
      name: "visitrecord",
      component: () => import(/* webpackChunkName: "visit" */ "./views/visit/VisitRecord.vue")
    },
    {
      path: "/visitdetailedit",
      name: "visitdetailedit",
      component: () => import(/* webpackChunkName: "visit" */ "./views/visit/VisitDetailEdit.vue")
    },
    {
      path: "/visitdetailcontent",
      name: "visitdetailcontent",
      component: () =>
        import(/* webpackChunkName: "visit" */ "./views/visit/VisitDetailContent.vue")
    },
    {
      path: "/newvisit",
      name: "newvisit",
      component: () => import(/* webpackChunkName: "visit" */ "./views/visit/NewVisit.vue")
    },
    {
      path: "/developvisit",
      name: "developvisit",
      component: () => import(/* webpackChunkName: "visit" */ "./views/visit/VisitDevelop.vue")
    },
    {
      path: "/mettingrecord",
      name: "mettingrecord",
      component: () => import(/* webpackChunkName: "metting" */ "./views/metting/MettingRecord.vue")
    },
    {
      path: "/newmetting",
      name: "newmetting",
      component: () => import(/* webpackChunkName: "metting" */ "./views/metting/NewMetting.vue")
    },
    {
      path: "/newmetting2",
      name: "newmetting2",
      component: () => import(/* webpackChunkName: "metting" */ "./views/metting/NewMetting2.vue")
    },
    {
      path: "/mettingdetailcontent",
      name: "mettingdetailcontent",
      component: () =>
        import(/* webpackChunkName: "metting" */ "./views/metting/MettingDetailContent.vue")
    },
    {
      path: "/mettingdetailedit",
      name: "mettingdetailedit",
      component: () =>
        import(/* webpackChunkName: "metting" */ "./views/metting/MettingDetailEdit.vue"),
      meta: {
        title: "编辑会议",
        requiresAuth: true
      }
    },
    {
      path: "/notify",
      name: "notify",
      component: () => import(/* webpackChunkName: "notify" */ "./views/notify/Notify.vue")
    },
    {
      path: "/productapplydetail",
      name: "productapplydetail",
      component: () =>
        import(/* webpackChunkName: "home" */ "./views/home/productapply/ProductApplyDetail.vue")
    },
    {
      path: "/loginpassword",
      name: "loginpassword",
      component: () =>
        import(
          /* webpackChunkName: "login" */
          "./views/login/LoginPassword.vue"
        )
    },
    {
      path: "/loginprotocol",
      name: "loginprotocol",
      component: () =>
        import(
          /* webpackChunkName: "login" */
          "./views/login/LoginProtocol.vue"
        )
    },
    {
      path: "/loginsms",
      name: "loginsms",
      component: () => import(/* webpackChunkName: "login" */ "./views/login/LoginSMS.vue")
    },
    {
      path: "/changepassword",
      name: "changepassword",
      component: () =>
        import(
          /* webpackChunkName: "login" */
          "./views/login/ChangePassword.vue"
        )
    },
    {
      path: "/retrievepassword",
      name: "retrievepassword",
      component: () =>
        import(
          /* webpackChunkName: "login" */
          "./views/login/RetrievePassword.vue"
        )
    },
    {
      path: "/improvepersonalinfo", //improvepersonalinfo
      name: "improvepersonalinfo",
      component: () =>
        import(
          /* webpackChunkName: "login" */
          "./views/login/ImprovePersonalInfo.vue"
        )
    },
    {
      path: "/register",
      name: "register",
      component: () =>
        import(
          /* webpackChunkName: "register" */
          "./views/register/Register.vue"
        )
    },
    {
      path: "/approveindex",
      name: "approveIidex",
      component: () =>
        import(
          /* webpackChunkName: "approve" */
          "./views/approve/ApproveIndex.vue"
        )
    },
    {
      path: "/doctorapprove",
      name: "doctorapprove",
      component: () =>
        import(
          /* webpackChunkName: "approve" */
          "./views/approve/DoctorApprove.vue"
        )
    },
    {
      path: "/hospitalapprove",
      name: "hospitalapprove",
      component: () =>
        import(
          /* webpackChunkName: "approve" */
          "./views/approve/HospitalApprove.vue"
        )
    },
    {
      path: "/answer",
      name: "answer",
      component: () =>
        import(
          /* webpackChunkName: "answertest" */
          "./views/answertest/Answer.vue"
        )
    },
    {
      path: "/hospitalinfo",
      name: "hospitalinfo",
      component: () => import(/* webpackChunkName: "index" */ "./views/index/HospitalInfo.vue")
    },
    {
      path: "/submitapplications",
      name: "submitapplications",
      component: () =>
        import(
          /* webpackChunkName: "index" */
          "./views/index/SubmitApplications.vue"
        )
    },
    {
      path: "/signcontract",
      name: "signcontract",
      component: () => import(/* webpackChunkName: "index" */ "./views/index/SignContract.vue")
    },
    {
      path: "/hospitalmanagement",
      name: "hospitalmanagement",
      component: () =>
        import(
          /* webpackChunkName: "management" */
          "./views/management/HospitalManagement.vue"
        )
    },
    {
      path: "/doctormanagement",
      name: "doctormanagement",
      component: () =>
        import(
          /* webpackChunkName: "management" */
          "./views/management/DoctorManagement.vue"
        )
    },
    {
      path: "/newdoctor",
      name: "newdoctor",
      component: () =>
        import(
          /* webpackChunkName: "management" */
          "./views/management/NewDoctor.vue"
        )
    },
    {
      path: "/doctorapplylist",
      name: "doctorapplylist",
      component: () =>
        import(
          /* webpackChunkName: "management" */
          "./views/management/DoctorApplyList.vue"
        )
    },
    {
      path: "/doctordetail",
      name: "doctordetail",
      component: () =>
        import(
          /* webpackChunkName: "management" */
          "./views/management/DoctorDetail.vue"
        )
    },
    {
      path: "/applyhospitaldetail",
      name: "applyhospitaldetail",
      component: () =>
        import(
          /* webpackChunkName: "index" */
          "./views/management/ApplyHospitalDetail.vue"
        )
    },
    {
      path: "/usersetting",
      name: "usersetting",
      component: () =>
        import(
          /* webpackChunkName: "usersetting" */
          "./views/usersetting/UserSetting.vue"
        )
    },
    {
      path: "/bankcard",
      name: "bankcard",
      component: () =>
        import(
          /* webpackChunkName: "index" */
          "./views/usersetting/BankCard.vue"
        )
    },
    {
      path: "/about",
      name: "about",
      component: () =>
        import(
          /* webpackChunkName: "usersetting" */
          "./views/usersetting/About.vue"
        )
    },
    {
      path: "/notice",
      name: "notice",
      component: () =>
        import(
          /* webpackChunkName: "usersetting" */
          "./views/usersetting/Notice.vue"
        )
    },
    {
      path: "/help",
      name: "help",
      component: () =>
        import(
          /* webpackChunkName: "help" */
          "./views/help/Help.vue"
        )
    },
    {
      path: "/userinfocenter",
      name: "userinfocenter",
      component: () =>
        import(
          /* webpackChunkName: "userinfo" */
          "./views/userinfo/UserInfoCenter.vue"
        )
    },
    {
      path: "/userinfodetail",
      name: "userinfodetail",
      component: () =>
        import(
          /* webpackChunkName: "userinfo" */
          "./views/userinfo/UserInfoDetail.vue"
        )
    },
    {
      path: "/selfstudy",
      name: "selfstudy",
      component: () =>
        import(
          /* webpackChunkName: "userinfo" */
          "./views/selfstudy/SelfStudy.vue"
        )
    },
    {
      path: "/productdata",
      name: "productdata",
      component: () =>
        import(
          /* webpackChunkName: "userinfo" */
          "./views/selfstudy/ProductData.vue"
        )
    },
    {
      path: "/productbonus",
      name: "productbonus",
      component: () => import(/* webpackChunkName: "approve" */ "./views/approve/ProductBonus.vue")
    },
    {
      path: "/totalbonus",
      name: "totalbonus",
      component: () => import(/* webpackChunkName: "approve" */ "./views/approve/TotalBonus.vue")
    },
    {
      path: "/flowdirectiondownload",
      name: "flowdirectiondownload",
      component: () =>
        import(/* webpackChunkName: "approve" */ "./views/approve/FlowDirectionDownload.vue")
    },
    {
      path: "/feedbacklist",
      name: "feedbacklist",
      component: () => import(/* webpackChunkName: "approve" */ "./views/approve/FeedbackList.vue")
    }
  ]
});
