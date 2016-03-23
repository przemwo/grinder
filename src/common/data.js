import firebase from 'firebase';
import _ from 'lodash';

const ref = new Firebase('https://grinder.firebaseio.com/');

function read(child) {
  const refChild = ref.child(child);
  return refChild.once('value').then(function(snap){
    return snap.val();
  });
}

function remove(node) {
  const refChild = ref.child(node);
  return refChild.remove();
}

function create(child, data) {
  const refChild = ref.child(child);
  return refChild.push(data);
}

function update(node, data) {
  const refChild = ref.child(node);
  return refChild.update({
    "name": data
  });
}

function addShuffleItem(data) {
  const refChild = ref.child('shuffle');
  return refChild.push(data);
}

function readShuffleArchive(child) {
  const refChild = ref.child(child);
  return refChild.orderByKey().limitToLast(10).once('value').then(function(snap){
    //Limit shuffle arch to 10 items
    const countItems = _.size(snap.val());
    if(countItems === 10) {
      refChild.set(snap.val());
    }
    return snap.val();
  });
}


export default (function() {
  const publicAPI = {
    create: create,
    read: read,
    update: update,
    remove: remove,
    readShuffleArchive: readShuffleArchive,
    addShuffleItem: addShuffleItem
  };
  return publicAPI;
})();
