import { useState } from "react";

function Player({initialName, symbol, isActive }) {
  const [ playerName, setPlayerName ] = useState(initialName);
  const [ isEditing, setIsEditing ] = useState(false); 

  function handlEditOnClick() {
    setIsEditing(editingFlag => !editingFlag);
  }

  function handlechange(event) {
    setPlayerName(event.target.value);
  }

  const component = isEditing ? <input type="text" required value={playerName} onChange={handlechange}/> : 
  <span className="player-name">{playerName}</span>;

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {component}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handlEditOnClick}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  );
}

export default Player;
