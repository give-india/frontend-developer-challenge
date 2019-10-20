import React, {useState} from 'react';

function AddTrack({tracks, onSubmit}) {
  const [url, setUrl] = useState (null);
  const handleChange = e => {
    setUrl (e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault ();
    let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    let check = url.match (regExp);
    if (check && check[2].length === 11) {
      onSubmit (url, tracks === undefined ? 0 : tracks.length);
    } else {
      alert ('enter valid youtube url!');
    }
  };
  return (
    <div className="addtrack-container">
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          className="trackField"
          type="text"
          placeholder="Paste youtube url here"
        />
      </form>
    </div>
  );
}

export default AddTrack;
