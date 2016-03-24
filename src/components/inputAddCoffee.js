import bel from 'bel';
import store from './../store';
import data from './../common/data';

const ENTER_KEY = 13;

//Test input
function testInput(str, pattern) {
  return (-1 !== str.search(new RegExp(pattern)));
};

//Set NewCoffeeType name
function newCoffeeTypeNameInput(newName) {
  store({
    type: 'newCoffeeType:input',
    payload: newName
  });
}

//Add NewCoffeeType name
function newCoffeTypeNameAdd(pattern) {
  const newName = store.getState().newCoffeeType;
  if(newName && testInput(newName, pattern)){
    data.create('coffeeTypes', { name: newName})
    .then((res) => {
      store({
        type: 'newCoffeeType:add',
        payload: { newId: res.key() }
      });
    });
  }
}


export default function() {
  return bel`
  <div class="input-group">
    <input
      type="text"
      class="form-control"
      id="js-addNewCoffyBtn"
      pattern="^[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ0-9][a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ0-9- _\.]{1,199}$"
      oninput=${function(e){
        newCoffeeTypeNameInput(e.target.value.trim());
      }}
      onkeydown=${function(e){
        var keyCode = e.keyCode;
        if(keyCode === ENTER_KEY) {
          newCoffeTypeNameAdd(e.target.getAttribute('pattern'));
        }
      }}
    >
    <div class="input-group-btn">
      <a
        href="#"
        class="btn btn-default"
        onclick=${function(e){
          e.preventDefault();
          var pattern = document.getElementById('js-addNewCoffyBtn').getAttribute('pattern');
          newCoffeTypeNameAdd(pattern);
        }}
      >
        Dodaj
      </a>
    </div>
  </div>`;
}
