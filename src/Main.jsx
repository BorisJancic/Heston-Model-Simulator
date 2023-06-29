import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './components/home-page/HomePage';
import GraphsPage from './components/graphs-page/GraphsPage';
import RandomWalkPage from './components/random-walk-page/RandomWalkPage';
import InfoPage from './components/info-page/InfoPage';
import Test from './components/test/Test';

const Main = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />}></Route>
            <Route path='/graphs' element={<GraphsPage />}></Route>
            <Route path='/random-walk' element={<RandomWalkPage />}></Route>
            <Route path='/info-page' element={<InfoPage />}></Route>
            <Route path='/test' element={<Test />}></Route>
        </Routes>
    )
}

export default Main;