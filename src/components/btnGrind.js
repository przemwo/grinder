import bel from 'bel';
import _ from 'lodash';
import store from './../store';
import data from './../common/data';

function grind(){
  const oldCoffeeTypesOrder = store.getState().coffeeTypes;
  const archOrder = store.getState().shuffleArch;

  //TODO porownanie parami: a z b, b z c itd.
  if(1 < oldCoffeeTypesOrder.length){
    let newCoffeeTypesOrder;
    let newCoffeeTypesOrderIds;
    let newOrder;
    do {
      newOrder = true;
      newCoffeeTypesOrder = _.shuffle(oldCoffeeTypesOrder);
      newCoffeeTypesOrderIds = newCoffeeTypesOrder.map((item) =>{
        return {id: item.id};
      });
      archOrder.map((item, index) => {
        let itemIds = item.map((item) => {
          return {id: item.id};
        });
        if(_.isEqual(itemIds, newCoffeeTypesOrderIds)) {
          console.log(item, newCoffeeTypesOrder);
          newOrder = false;
        }
      });
    } while(!newOrder);
    console.log('FINISH');
    //Save shuffle order to firebase
    data.addShuffleItem(newCoffeeTypesOrder);
    store({
      type: 'shuffle',
      payload: newCoffeeTypesOrder
    });
  }
}


export default function() {
  return bel`
    <div>
      <a
        href="#"
        class="btn btn-lg btn-primary"
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
