import React from 'react';
import OriginalLayout from '@theme-original/Layout';
import GlobalCursorTrail from '../../components/GlobalCursorTrail';

export default function Layout(props) {
  return (
    <>
      <GlobalCursorTrail />
      <OriginalLayout {...props} />
    </>
  );
}
