import React from 'react';

import NavbarLayout from 'dw/core/components/NavbarLayout';
import Profile from 'dw/core/components/Profile';

function NavigationBar() {
  return (
    <NavbarLayout>
      <div>
        <div>{/* Empty div just to force the profile icon to the left */}</div>
        <Profile enableProfilePopup={false} />
      </div>
    </NavbarLayout>
  );
}

export default NavigationBar;
