import React, { useEffect, useMemo, useState } from 'react';
import Header from './Header';
import Navigation from './Navigation';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { localCurrencySettings } from '../utils/constants';
import { getProfile, getAccountBalanceByClient } from '../store/actions/profile';

const Layout = ({ children, profile, auth, getProfile, getAccountBalanceByClient }) => {
  // TODO get user data from store
  // const [funds, setFunds] = useState('$0.00')

  useEffect(() => {
    if (auth.isAuthenticated) {
      getAccountBalanceByClient()
      getProfile(auth.user.id)
    };
  }, [auth]);

  const funds = useMemo(() => {
console.log({profile: profile.balance})
   return  profile?.balance.total_balance
    ? Number(profile.balance.total_balance - (profile.balance.on_hold || 0))
      .toLocaleString('en-US', localCurrencySettings)
    : '$0.00'
  }, [profile])
  // useEffect(() => {
  //   getProfile(user.id).then((res) => {
  //     setFunds(res.balance.total_balance
  //       ? Number(res.balance.total_balance - (res.balance.on_hold || 0))
  //         .toLocaleString('en-US', localCurrencySettings)
  //       : '$0.00')
  //   })
  // }, [user])

  return (
    <div className="root">
      <Header 
        availableFunds={funds}
        notificationCount={6}
      />
      <Navigation />
      <div className="content">
        {children}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  user: state.auth.user,
  auth: state.auth,
});

const mapDispatchToProps = {
  getProfile,
  getAccountBalanceByClient,
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
// export default Layout;  