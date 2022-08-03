import { Toast } from 'vant'
import 'vant/es/toast/style'

import { Dialog } from 'vant'
import 'vant/es/dialog/style'

import { Notify } from 'vant'
import 'vant/es/notify/style'

import { ImagePreview } from 'vant'
import 'vant/es/image-preview/style'

export default {
  install(app: any) {
    app.provide('Toast', Toast)
    app.provide('Dialog', Dialog)
    app.provide('Notify', Notify)
    app.provide('ImagePreview', ImagePreview)
  }
}
