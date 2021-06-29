import store from '../../store'

export default function auth ({ next }) {
  return !store.getters.GET_TOKEN ? next({
    name: 'main'
  }) : next()
}
