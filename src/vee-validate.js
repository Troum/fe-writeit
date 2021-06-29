import { extend, localize, setInteractionMode } from 'vee-validate'
import {confirmed, email, required} from 'vee-validate/dist/rules'
import de from "vee-validate/dist/locale/de.json";
import en from "vee-validate/dist/locale/en.json";

setInteractionMode('lazy')

extend('required', required)
extend('email', email)
extend('confirmed', confirmed)
localize({
    de,
    en
})
