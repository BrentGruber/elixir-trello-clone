import css from '../css/app.css'
import 'phoenix_html'
import { LiveSocket } from 'phoenix_live_view'
import { Socket } from 'phoenix'
import Sortable from 'sortablejs'

let Hooks = {}



Hooks.Lists = {
  mounted() {
    const that = this
    Sortable.create(this.el, {
      group: 'lists',
      direction: 'horizontal',
      fallbackOnBody: false,
      onEnd: function(event) {
        const details = {
          list_id: parseInt(event.item.id),
          to_position: event.newIndex,
        }

        that.pushEvent('reorder_list', details)
      },
    })

    const buttons = document.querySelectorAll('div.more-list-actions')
    buttons.forEach(button => {
      button.addEventListener('click', event => {
        const list_id = button.closest('div.list-wrapper').id
        const { left, top } = button.getBoundingClientRect()
        that.pushEvent('show_list_actions', {
          should_show: 'true',
          left,
          top: top + 65,
          list_id: parseInt(list_id),
        })
      })
    })
  },
}

Hooks.List = {
  mounted() {
    const that = this
    const cards = this.el.querySelector('div.list-cards')
    if (!cards) return

    Sortable.create(cards, {
      group: 'cards',
      onEnd: function(event) {
        const details = {
          to_list: parseInt(event.to.dataset.listId),
          to_position: event.newIndex,
          card_id: parseInt(event.item.dataset.cardId),
        }

        that.pushEvent('move_card', details)
      },
    })
  },
}

Hooks.ListTitle = {
  mounted() {
    const that = this
    const input = this.el

    input.addEventListener('blur', e => {
      that.pushEvent('update_list_title', {
        list_id: input.dataset.list_id,
        title: input.value,
      })
    })
  },
}

Hooks.CardTitle = {
  mounted() {
    const that = this
    const input = this.el

    input.addEventListener('blur', e => {
      that.pushEvent('update_card_title', {
        card_id: input.dataset.card_id,
        title: input.value,
      })
    })
  },
}

let csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content");
let liveSocket = new LiveSocket('/live', Socket, { hooks: Hooks, params: {_csrf_token: csrfToken} })
liveSocket.connect()