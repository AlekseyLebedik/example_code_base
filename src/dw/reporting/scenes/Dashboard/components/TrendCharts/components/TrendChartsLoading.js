import React from 'react';
import ContentLoader from 'react-content-loader';

const TrendChartsLoading = props => (
  <div style={{ width: 430, height: 200 }}>
    <ContentLoader
      height={200}
      width={430}
      speed={2}
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
      {...props}
    >
      <rect x="60" y="10" rx="0" ry="0" width="390" height="1" />

      <rect x="60" y="55" rx="0" ry="0" width="390" height="1" />
      <rect x="30" y="37" rx="0" ry="0" width="20" height="18" />

      <rect x="60" y="100" rx="0" ry="0" width="390" height="1" />
      <rect x="40" y="82" rx="0" ry="0" width="10" height="18" />

      <rect x="115" y="100" rx="0" ry="0" width="1" height="10" />
      <rect x="90" y="112" rx="0" ry="0" width="50" height="12" />
      <rect x="245" y="100" rx="0" ry="0" width="1" height="10" />
      <rect x="220" y="112" rx="0" ry="0" width="50" height="12" />
      <rect x="375" y="100" rx="0" ry="0" width="1" height="10" />
      <rect x="350" y="112" rx="0" ry="0" width="50" height="12" />
    </ContentLoader>
  </div>
);
export default TrendChartsLoading;
