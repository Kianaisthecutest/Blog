import React from 'react';
import OriginalLayout from '@theme-original/Layout';
import GlobalCursorTrail from '../../components/GlobalCursorTrail';
import GlobalMusicPlayer from '../../components/GlobalMusicPlayer';

export default function Layout(props) {
  return (
    <>
      <GlobalCursorTrail />
      <GlobalMusicPlayer />
      <OriginalLayout {...props} />
    </>
  );
}
