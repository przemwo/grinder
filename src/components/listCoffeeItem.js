import bel from 'bel';
import store from './../store';
import data from './../common/data';

const ENTER_KEY = 13;
let isEditing = false;

//Editing Coffee
function editCoffee(coffee) {
  const { id } = coffee;
  isEditing = true;
  store({
    type: 'editCoffee:start',
    payload: id
  });
}

//Remove Coffee from store.coffeeTypes
function removeCoffee(coffee) {
  const { id } = coffee;
  data.remove('coffeeTypes/' + id);
  store({
    type: 'coffeeTypes:remove',
    payload: id
  });
}

//Save editing coffee
function saveEditCoffee(coffee, newName) {
  if(newName && isEditing) {
    isEditing = false;
    const changeName = {
      name: newName,
      id: coffee.id
    };
    data.update('coffeeTypes/' + changeName.id, changeName.name);
    store({
      type: 'editCoffee:save',
      payload: changeName
    });
  }
}


export default function(coffee) {
  return bel`${coffee.isEditing?
    bel`${editListItem(coffee)}`
  :
    bel`${listItem(coffee)}`
  }`
}


function listItem(coffee) {
  return bel`
    <li class="list-group-item">
        <div
          style="cursor: pointer"
          ondblclick=${function(e){
            editCoffee(coffee);
          }}
        >
          ${coffee.name}
        </div>
        <a
          href="#"
          onclick=${function(e){
            e.preventDefault();
            removeCoffee(coffee);
          }}
        >
          <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
        </a>
    </li>`;
}

function editListItem(coffee) {
  return bel`
    <li class="list-group-item">
      <input
        type="text"
        value="${coffee.name}"
        id="js-changeName"
        onkeydown=${function(e){
          if(e.keyCode === ENTER_KEY) {
            var newName = e.target.value.trim();
            e.target.value = null;
            saveEditCoffee(coffee, newName);
          }
        }}

        onblur=${function(e){
          var newName = e.target.value.trim();
          saveEditCoffee(coffee, newName);
        }}
      >
    </li>
  `;
}
