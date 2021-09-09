import './styles.css';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Switch } from 'react-router';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import { useLocation } from 'react-router-dom';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import LoginForm from '../../features/users/LoginForm';
import { useStore } from '../stores/store';
import { useEffect } from 'react';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import RegisterForm from '../../features/users/RegisterForm';

function App() {
  const location = useLocation();
  const {commonStore,userStore} = useStore();
  useEffect(()=>{
    if (commonStore.token) {
      userStore.getUser().finally(()=> commonStore.setAppLoaded());

    }else{
      commonStore.setAppLoaded();
    }
  },[commonStore,userStore])

  if(!commonStore.appLoaded) return<LoadingComponent 
  content='Loading App...'/>
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        theme="colored"
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ModalContainer />

      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container style={{
              marginTop: '7em'
            }}>
              <Switch>
                <Route exact path='/activities' component={ActivityDashboard} />
                <Route path='/activities/:id' component={ActivityDetails} />
                <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} />
                <Route path='/errors' component={TestErrors} />
                <Route path='/server-error' component={ServerError} />
                <Route path='/login' component={LoginForm} />
                <Route path='/register' component={RegisterForm} />
                
                <Route component={NotFound} />

              </Switch>
            </Container>
          </>
        )}
      />



    </>
  );
}

export default observer(App);