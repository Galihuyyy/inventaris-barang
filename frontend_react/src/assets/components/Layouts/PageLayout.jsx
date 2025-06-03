import Sidebar from "../Sidebar/Sidebar"

export const PageLayout = (props) => {

    const {children, openSide} = props
  return (
    <div className='min-h-screen flex bg-neutral-200 md:ps-68'>
        <Sidebar openSide={openSide}/>
    
        <main className=' flex-1 p-6'>
            {children}
        </main>
    </div>
  )
}
