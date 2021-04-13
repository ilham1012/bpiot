const Vue = require('vue');

const TodoList = {
    data() {
      return {
        groceryList: [
          { id: 0, text: 'Vegetables' },
          { id: 1, text: 'Cheese' },
          { id: 2, text: 'Whatever else humans are supposed to eat' }
        ]
      }
    }
  }
  
  const app = Vue.createApp(TodoList)
  
  app.component('todo-item', {
    props: ['todo'],
    template: `<li>{{ todo.text }}</li>`
  })
  
  app.mount('#devices-app')