//TODO:
//mieszaj
import createStore from 'store-emitter';
import data from './common/data';


const initialState = {
  coffeeTypes: [],
  newCofeeType: null,
  shuffleArch: []
};

function modifier(action, state) {
  //Remove coffee from coffeeTypes
  if(action.type === 'coffeeTypes:remove') {
    state.coffeeTypes = state.coffeeTypes.filter(function(coffee){
      return coffee.id !== action.payload;
    });
    return state;

  //Edit coffe type
  } else if(action.type === 'editCoffee:start') {
    state.coffeeTypes = state.coffeeTypes.map(function(coffee){
      return (coffee.id === action.payload)? { name: coffee.name, id: coffee.id, isEditing: true } : { name: coffee.name, id: coffee.id, isEditing: null };
    });
    return state;

  } else if(action.type === 'editCoffee:save') {
    state.coffeeTypes = state.coffeeTypes.map(function(coffee){
      return (coffee.id === action.payload.id)? { name: action.payload.name, id: coffee.id, isEditing: null } : { name: coffee.name, id: coffee.id, isEditing: null };
    });
    return state;

  } else if(action.type === 'newCoffeeType:input') {
    state.newCoffeeType = action.payload;
    return state;

  } else if(action.type === 'newCoffeeType:add') {
    state.coffeeTypes.push({name: state.newCoffeeType, id: action.payload.newId});
    state.newCoffeeType = null;
    return state;

  } else if(action.type === 'shuffle') {
    state.shuffleArch.push(action.payload);
    state.shuffleArch.shift();
    state.coffeeTypes = action.payload;
    return state;

  } else if(action.type === 'data:getAll') {
    const items = action.payload;
    for(let item in items) {
      items[item].id = item;
      state.coffeeTypes.push(items[item]);
    }
    return state;

  } else if(action.type === 'dataShuffle:getAll') {
    const items = action.payload;
    for(let item in items) {
      state.shuffleArch.push(items[item]);
    }
    return state;

  }
}

const store = createStore(modifier, initialState);

export default store;
