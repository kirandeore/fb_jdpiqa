/**
 * @version 0.1
 * @author  Kiran Deore, http://quinstreet.com
 *
 * This file is common to all clients under qsagency
 *
 * cache structure
 *
 * {
 *    activeOwner:  'DCEH'
 *    ownerDataCollection: {
 *       DCEH: {
 *          allowedApps: Object,
 *          ownerKey: Number
 *       }
 *    },
 *     userConfig: {
 *        firstName: String,
 *        lastName: String,
 *        ....
 *     }
 * }
 */

/* eslint-disable */

import { mapGetters, mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations({
      // used by all
      setSessionDataInVuex: 'sessionModule/setSessionDataInVuex',
    })
  },
  computed: {
    ...mapGetters({
      // used by all
      sessionData: 'sessionModule/getSessionDataFromVuex',
      
      // used by QsAgency.vue
      sessionDataInCache: 'sessionModule/getSessionDataFromCache'
    })
  }
}

