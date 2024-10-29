import React from 'react'

export default function CreateUser() {
  return (
    <div className="form">
      <form>
        <h2 className="title">Create User</h2>

        <label>Name</label>
        <input type="text"></input>

        <label>Email</label>
        <input type="mail"></input>

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
