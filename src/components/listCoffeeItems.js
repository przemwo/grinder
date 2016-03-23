import bel from 'bel';
import store from './../store';
import listCoffeeItem from './listCoffeeItem';

export default function() {
  const coffeeTypes = store.getState().coffeeTypes;
  return bel`
    <ul class="list-group">
      ${coffeeTypes.map(function(coffee){
        return bel`${listCoffeeItem(coffee)}`;
      })}
    </ul>
  `;
}
