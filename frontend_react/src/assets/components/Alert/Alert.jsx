const Alert = (props) => {

    const {children, type = 'success'} = props
    
    const typeStyles = {
        success: 'bg-green-100 border-green-400 text-green-700',
        error: 'bg-red-100 border-red-400 text-red-700',
        warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
        info: 'bg-blue-100 border-blue-400 text-blue-700',
    }

    const style = typeStyles[type] || typeStyles.info

    
  return (
    <div className={`border-l-4 p-4 rounded-md mb-4 ${style}`}>
      <b>{type == 'success' ? 'Berhasil : ' : 'Error : '}</b><p className="text-sm">{children}</p>
    </div>
  )
}

export default Alert