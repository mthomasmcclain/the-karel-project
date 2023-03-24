import MapPlayer from '../components/MapPlayer/index.vue'
import viewVue from '9c958df3-ca98-11ed-82b6-23f47d2a0ab1'

export default function (module, environment) {
  viewVue({ default: MapPlayer }, environment, { mapConfig: module.default })
}
