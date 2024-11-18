import Link from 'next/link';
import React from 'react'

function NotFound() {
  return (
    <div>
      <h2>This is not Found page</h2>
      <Link href='/'>return to Home page</Link>
    </div>
  )
}

export default NotFound;
