import bel from 'bel';
import update from './../common/update';
import inputAddCoffee from './inputAddCoffee';
import listCoffeeItems from './listCoffeeItems';
import btnGrind from './btnGrind';
import store from './../store';


const inputAddCoffeeDOM = inputAddCoffee();
const listCoffeeItemsDOM = listCoffeeItems();
const btnGrindDOM = btnGrind();


store.on('editCoffee', function(action, state, oldState){
  update(listCoffeeItemsDOM, listCoffeeItems());
  if(document.getElementById('js-changeName')){
    document.getElementById('js-changeName').focus();
  }
});

store.on('newCoffeeType:add', function(action, state, oldState){
  update(inputAddCoffeeDOM, inputAddCoffee());
  update(listCoffeeItemsDOM, listCoffeeItems());
  update(btnGrindDOM, btnGrind());
});

store.on('coffeeTypes:remove', function(action, state, oldState){
  update(listCoffeeItemsDOM, listCoffeeItems());
  update(btnGrindDOM, btnGrind());
});

store.on('shuffle', function(action, state, oldState){
  update(listCoffeeItemsDOM, listCoffeeItems());
});

store.on('data:getAll', function(action, state, oldState){
  update(listCoffeeItemsDOM, listCoffeeItems());
  update(btnGrindDOM, btnGrind());
});


export default function() {
  return bel`
    <div>

      ${inputAddCoffeeDOM}

      ${listCoffeeItemsDOM}

      ${btnGrindDOM}

    </div>`;
}
