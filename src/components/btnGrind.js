import bel from 'bel';
import _ from 'lodash';
import store from './../store';
import data from './../common/data';

//Return (n-1)! permutations of input - like seating people at a round table
function roundTable(input) {
  var permArr = [],
    usedChars = [];

  //Return permutation of input
  function permute(input) {
    var i, ch;
    for (i = 0; i < input.length; i++) {
      ch = input.splice(i, 1)[0];
      usedChars.push(ch);
      if (input.length == 0) {
        permArr.push(usedChars.slice());
      }
      permute(input);
      input.splice(i, 0, ch);
      usedChars.pop();
    }
    return permArr
  };

  let newInput = permute(input);

  const firstItem = newInput[0][0].id;
  let result = newInput.filter((item) =>{
    return item[0].id === firstItem;
  });
  return result;
}

function grind(){
  const oldCoffeeTypesOrder = store.getState().coffeeTypes;
  //Min 5 items on the list -> we are checking last 10 orders -> (n-1)! -> (5-1)! = 24, (4-1)! = 6 <- too little
  ///wiebierz 1 losowo i sparwdz czy nie bylo takiej w ostatnich 10 ruchach (dla n >= 5, gdyz wtedy (n-1)! = 24)
  if(4 < oldCoffeeTypesOrder.length) {
    const archOrder = store.getState().shuffleArch;
    const permutations = roundTable(oldCoffeeTypesOrder);
    let newPick;
    let newOrder;
    do{
      newOrder = true;
      newPick = _.sample(permutations);
      archOrder.map((item, index) => {
        if(_.isEqual(item, newPick)) {
          newOrder = false;
        }
      });
    } while(!newOrder);
    //Save shuffle order to firebase
    data.addShuffleItem(newPick);
    store({
      type: 'shuffle',
      payload: newPick
    });
  }
}


export default function() {
  return bel`
    <div>
      <a
        href="#"
        class="btn btn-lg btn-primary ${(4 >= store.getState().coffeeTypes.length)? `disabled` : ``}"
        onclick=${function(e){
          e.preventDefault();
          grind();
        }}
      >
        Mieszaj
      </a>
    </div>
  `;
}
