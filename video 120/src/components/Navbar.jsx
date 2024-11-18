import { useSelector } from "react-redux"

function Navbar() {
    const count = useSelector((state) =>state.counter.value)
  return (
    <div>
      Navbar count {count}
    </div>
  )
}

export default Navbar
