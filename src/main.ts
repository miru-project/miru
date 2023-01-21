import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./assets/main.scss";
import config from "../package.json";
const app = createApp(App);

console.log(`
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk      kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
kkkkkkkbbbbbbbbbbbbbbbbbbbkkkkkkp   kkbkkkkbbbbbbbbbbbbbbbbbbbkkkkkkkbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbkkkkkkkbbbbbbbbbbbbkkkkkkkbbbbbbbbbbbkkkkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkbkb kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
kkkkkkk                   bkbkkkbkkkkkkkkk                    kkkkkbk                              kbkkkkk           Qkkkkkbk           kkkkkkk
kkkkkkk                    kkbkkkkbkkkkkk                    $kkkkkbk                              kbkkkkkn          bkkkkkbk           kkkkkkk
kkkkkkk                     kkbkkkkkkbkk                     $kkkkkbk                              kbkkkkkn          bkkkkkbk           kkkkkkk
kkkkkkk                      pkkkkkkbkk                      $kkkkkbk                              kbkkkkkn          bkkkkkbk           kkkkkkk
kkkkkkk              *Q        kkkkkkb        mn             $kkkkkbkhaaaaaaaaaaaaaakppppppppppppppkbkkkkkn          bkkkkkbk           kkkkkkk
kkkkkkk           kkkkkkk       akkh       hkkkkkk           $kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkn          bkkkkkbk           kkkkkkk
kkkkkkk           kbbkkbkkh               kkbkkkbk           $kkkkkkkbbbbbbbbbbbbbkkkkkkkbbbbbbbbbbkkkkkkk$          bkkkkkbk           kkkkkkk
kkkkkkk           kbkkkkkbkb            bkkkkkkkbk           $kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkbk           bkkkkkbk           kkkkkkk
kkkkkkk           kbkkkkkkkkkh         kkbkkkkkkbk           $kkkkkbkQQQQQQQQQQQQQkkkkkkkkb        kbkkkbk           bkkkkkbk           kkkkkkk
kkkkkkk           kbkkkkkkkkbkk      kkkkkkkkkkkbk           $kkkkkbk              kkbkkkbkk       kbkkkbk           bkkkkkbk           kkkkkkk
kkkkkkk           kbkkkkkkkkkkkkb  $kkbkkkkkkkkkbk           $kkkkkbk               kkbkkkbkk      kbkkkbk           bkkkkkbk           kkkkkkk
kkkkkkk           kbkkkkkkkbkkkbkkkkkkkkkkkkkkkkbk           $kkkkkbk                kkbkkkkkk     kbkkkbk           bkkkkkbk           kkkkkkk
kkkkkkk           kbkkkkk bkkkkkkkkbkkkbkk kbkkkbk           $kkkkkbk                 kkkkkkkkk    kbkkkbk           bkkkkkbk           kkkkkkk
kkkkkkk           kbkkkkkb  kkbkkkkkkbkkb  kbkkkbk           $kkkkkbk                   kkkkkkkk$  kbkkkbk           bkkkkkbk           kkkkkkk
kkkkkkk           kbkkkkkb   bkkbkkbbkk    kbkkkbk           $kkkkkbk                    kkkkkkbka kbkkkbk           *kbkkbbk           kkkkkkk
kkkkkkk           kbkkkkkb     kkkkkkk     kbkkkbk           $kkkkkbk                     kkbkkkbkkkbkkkbk            kkkkkkk           kkkkkkk
kkkkkkk           kbkkkkkb       p*        kbkkkbk           $kkkkkbk                      kkbkkkbkkkkkkbk              Q*              kkkkkkk
kkkkkkk           kbkkkkkb                 kbkkkbk           $kkkkkbk                       bkbkkkkkkkkkbk                              kkkkkkk
kkkkkkk           kbkkkkkb                 kbkkkbk           $kkkkkbk                        hkbkkkkkkkkbk                              kkkkkkk
kkkkkkk           kbkkkkkb                 kbkkkbk           $kkkkkbk                         $kkkkkkkkkbk                              kkkkkkk
kkkkkkk           kbkkkkkb                 kbkkkbk            kkkkkbk                           kkkkkkkkbk                              kkkkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkb                 kbkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
kkkkkkkbbbbbbbbbbbkkkkkbkm                 kbkkkkkbbbbbbbbbbbbkkkkkkkbbbbbbbbbbbbbbbbbbbbbbbbbbbbkkkkkkkkkbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbkkkkkkk
kkkkkkkkkkkkkkkkkkkkkkkkk                  bkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
`);

console.log(`%c Miru v${config.version} %c https://github.com/miru-project/miru `, 'color: #fff;font-weight: 900;; background-color: rgb(246, 0, 78); padding:5px 0;', 'background-color: rgb(255, 219, 219); padding:5px 0;');

app.use(createPinia());
app.use(router);
app.mount("#app");
