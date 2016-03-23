import store from './store';
import grinderContainer from './components/grinderContainer';
import update from './common/update';
import data from './common/data';
import style from './css/style.css';

const grinderContainerDOM = grinderContainer({action: null});

document.getElementById('appMountPoint').appendChild(grinderContainerDOM);


//Get coffeeTypes init data
data.read('coffeeTypes')
  .then((res) => {
    store({
      type: 'data:getAll',
      payload: res
    });
  });

//Get shuffle archive
data.readShuffleArchive('shuffle')
  .then((res) => {
    store({
      type: 'dataShuffle:getAll',
      payload: res
    });
  });
