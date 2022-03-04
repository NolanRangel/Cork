import React, { useState } from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import AllAds from './components/adBrowse/AllAds';

import FilterBar from './components/navigation/FilterBar'
import TitleNote from './components/navigation/TitleNote';
import ComponentWithNavigation from './views/ComponentWithNavigation';
import Main from './views/Main';
import FilterForm from './components/navigation/FilterForm';
import EditAdForm from './components/editCreateAdForms/EditAdForm';
import NewAdForm from './components/editCreateAdForms/NewAdForm';
import SearchBar from './components/navigation/SearchBar';
import NavButtonsContainer from './components/navigation/NavButtonsContainer';
import PostAd from './components/navigation/navigationButtons/PostAd';
import Back from './components/navigation/navigationButtons/Back';
import Browse from './components/navigation/navigationButtons/Browse';
import ContactForm from './components/contactForm/ContactForm';
import DeleteForm from './components/deleteForm/DeleteForm';
import Landing from './views/Landing';
import AdPosted from './components/adPosted/AdPosted';
import AdDetails from './components/adDetails/AdDetails';
import Spacer from './components/navigation/navigationButtons/Spacer';



function App() {

  const [ adList, setAdList ] = useState([]);
  const [ category, setCategory ] = useState('all');


  return (
    <div className="App">

      <BrowserRouter>
        <Main>
          <Switch>
            <Route path='/browse'>
              <ComponentWithNavigation >
                <TitleNote />
                <FilterBar >
                  <FilterForm setAdList={setAdList} category={category} setCategory={setCategory} />
                  <SearchBar setAdList={setAdList} category={category} />
                  <NavButtonsContainer >
                    <PostAd />
                  </NavButtonsContainer>
                </FilterBar>
                <AllAds adList={adList} />
              </ComponentWithNavigation>
            </Route>
            <Route path='/post_ad'>
              <ComponentWithNavigation >
                <TitleNote />
                <FilterBar >
                  <Spacer />
                  <NavButtonsContainer >
                    <Back />
                    <Browse />
                  </NavButtonsContainer>
                  <Spacer />
                </FilterBar>
                <NewAdForm />
              </ComponentWithNavigation>
            </Route>
            <Route path='/details/:adId'>
              <ComponentWithNavigation >
                <TitleNote />
                <FilterBar >
                  <Spacer />
                  <NavButtonsContainer >
                    <Browse />
                    <PostAd />
                  </NavButtonsContainer>
                  <Spacer />
                </FilterBar>
                <AdDetails />
              </ComponentWithNavigation>
            </Route>
            <Route path='/edit_ad/:adId'>
              <ComponentWithNavigation >
                <TitleNote />
                <FilterBar >
                  <Spacer />
                  <NavButtonsContainer >
                    <Browse />
                    <PostAd />
                  </NavButtonsContainer>
                  <Spacer />
                </FilterBar>
                <EditAdForm />
              </ComponentWithNavigation>
            </Route>
            <Route path='/contact/:adId'>
              <ComponentWithNavigation >
                <TitleNote />
                <FilterBar >
                  <Spacer />
                  <NavButtonsContainer >
                    <Back />
                    <Browse />
                  </NavButtonsContainer>
                  <Spacer />
                </FilterBar>
                <ContactForm />
              </ComponentWithNavigation>
            </Route>
            <Route path='/delete/:adId'>
              <ComponentWithNavigation >
                <TitleNote />
                <FilterBar >
                  <Spacer />
                  <NavButtonsContainer >
                    <Browse />
                    <PostAd />
                  </NavButtonsContainer>
                  <Spacer />
                </FilterBar>
                <DeleteForm />
              </ComponentWithNavigation>
            </Route>
            <Route path='/posted/:adId'>
              <ComponentWithNavigation >
                <TitleNote />
                <FilterBar >
                  <Spacer />
                  <NavButtonsContainer >
                    <Browse />
                    <PostAd />
                  </NavButtonsContainer>
                  <Spacer />
                </FilterBar>
                <AdPosted />
              </ComponentWithNavigation>
            </Route>
            <Route path='/'>
              <Landing />
            </Route>
          </Switch>
        </Main>
      </BrowserRouter>
    </div>
  );
}

export default App;
