import VueRouter, { Route } from "vue-router";
import Vue from "vue";

declare module "*.vue" {
  export default Vue;
}

declare namespace NodeJS {
  interface Process {
    browser: boolean;
  }
}
