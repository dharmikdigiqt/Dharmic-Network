import { Switch, Route, Router as WouterRouter } from 'wouter';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { theme } from './theme';
import { AppLayout } from './layouts/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { Communities } from './pages/Communities';
import { Marketplace } from './pages/Marketplace';
import { Messages } from './pages/Messages';
import { Saved } from './pages/Saved';
import { Profile } from './pages/Profile';
import { Discover } from './pages/Discover';
import { Notifications as NotificationsPage } from './pages/Notifications';
import { EditProfile } from './pages/EditProfile';
import NotFound from './pages/not-found';

function Router() {
  return (
    <AppLayout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/discover" component={Discover} />
        <Route path="/communities" component={Communities} />
        <Route path="/marketplace" component={Marketplace} />
        <Route path="/messages" component={Messages} />
        <Route path="/saved" component={Saved} />
        <Route path="/profile" component={Profile} />
        <Route path="/profile/edit" component={EditProfile} />
        <Route path="/notifications" component={NotificationsPage} />
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

function App() {
  return (
    <MantineProvider theme={theme}>
      <Notifications position="top-right" />
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <Router />
      </WouterRouter>
    </MantineProvider>
  );
}

export default App;
