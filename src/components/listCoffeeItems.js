import bel from 'bel';
import store from './../store';
import listCoffeeItem from './listCoffeeItem';

export default function() {
  const coffeeTypes = store.getState().coffeeTypes;
  return bel`
    <div>
      ${(store.getState().isLoading)
        ? bel`<div class="spinner"></div>`
        : ''}
      <ul class="list-group list-items">
        ${coffeeTypes.map(function(coffee){
          return bel`${listCoffeeItem(coffee)}`;
        })}
      </ul>
    </div>
  `;
}
