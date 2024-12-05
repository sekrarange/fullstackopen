const Notification = ({ notifMessage, errorMessage }) => {
  if (notifMessage === null && errorMessage === null) {
    return null
  }

  return (
    <>
      {notifMessage && <div className="notif">{notifMessage}</div>}
      {errorMessage && <div className="error">{errorMessage}</div>}
    </>
  )
}

export default Notification
