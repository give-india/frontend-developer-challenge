import React from 'react'

const InputForm = ({
    youTubeUrl,
    handleYoutubeUrl,
    handleSubmit
}) => {
    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="form-center">
                <div className="form-group">
                    <label className="form-element" htmlFor="youTubeUrl">
                        Add a youtube link
                    </label>
                    <input
                        type="text"
                        className="form-element"
                        id="youTubeUrl"
                        name="youTubeUrl"
                        placeholder="e.g. https://www.youtube.com/watch?v=8DBTCMY3Qi8"
                        value={youTubeUrl}
                        onChange={handleYoutubeUrl}
                    />
                </div>
            </div>
            <button type="submit" className="btn">
                Submit
            </button>
        </form>
    )
}

export default InputForm
