import React from 'react';
import './App.css';
import Nav from './components/Nav';
import SearchForm from './sections/SearchForm';
import DataGrid from './sections/DataGrid';
import Banner from './sections/Banner';
import {useDispatch} from 'react-redux';
import {setCapsules} from './store/capsuleSlice';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    let headers = new Headers();
    headers.append('Authorization', 'Basic c2F0aHlhc2VlbGFuOnRlc3Q=');
    fetch('http://localhost:8888/brainstorm-force/?capsules=yes', {
      method: 'GET',
      redirect: 'follow',
      headers: headers,
    })
        .then(response => response.text())
        .then(result => {
          let parsedResults = JSON.parse(result);
          dispatch(setCapsules(parsedResults));
        })
        .catch(error => console.log('error', error));
  }, [dispatch]);

  return (
      <div className="grey">
        <Nav/>
        <Banner/>
        <div className="mt-10">
          <h2 className="text-2xl text-center font-bold">Filter Capsules</h2>
          <div className="mx-auto w-10 border-b-2 mt-2 border-indigo-600"/>
          <p className="text-center mt-5 text-gray-400">Search and find your
            favourite Space X
            capsules in few clicks!</p>
        </div>
        <SearchForm/>
        <div className="mt-20">
          <h2 className="text-2xl text-center font-bold">Available SpaceX
            Capsules</h2>
          <div className="mx-auto w-10 border-b-2 mt-2 border-indigo-600"/>
          <p className="text-center mt-5 text-gray-400">Capsules selected by
            NASA to support sustained lunar exploration</p>
        </div>
        <DataGrid/>
      </div>
  );
}

export default App;
