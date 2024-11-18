import React from 'react'
import { memo } from 'react';

function Navbar({adjective}) {
    console.log("navbar is rendered");
  return (
    <div>
      Navbar {adjective}
    </div>
  )
}

export default memo(Navbar)
