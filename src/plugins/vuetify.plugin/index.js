import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#EA5573',
                secondary: colors.lightBlue.lighten4,
                accent: colors.indigo.base,
                success: colors.green.darken1,
                error: colors.red.darken2,
                warning: colors.orange.darken1,
                info: colors.lightBlue.darken1,
            },
        },
    }
});
