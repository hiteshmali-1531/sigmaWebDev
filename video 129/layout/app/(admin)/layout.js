import AdminNavbar from "@/components/AdminNavbar"


const AdminLayout = ({children}) => {
  return (
    <>      
    <AdminNavbar />
        {children}
    </>
  )
}

export default AdminLayout
