import React from 'react'

export default function CreateVote() {
  return (
    <div className="form">
      <form>
        <h2 className="title">Create vote</h2>

        <label>Vote name</label>
        <input type="text"></input>

        <button type="submit">Login</button>
      </form>
    </div>
  )
}
