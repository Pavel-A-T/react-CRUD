import React, {useState, useEffect} from 'react';
import '../App.css';

const requestURL = 'http://localhost:7777/notes';
const headers = {
    'Content-Type': 'application/json'
}

function Note() {
    const [notes, setNotes] = useState([]);

    const handleRemove = id => {
        const url = requestURL + `/${id}`;
        fetch(url, {method: 'DELETE'});
    };

    const update =() => {
        fetch(requestURL, {method: 'GET'}).then(response => {
            return response.json();
        }).then((data) => {
            setNotes(() => {
                return data;
            })
        });
    }

    const handleSubmit = evt => {
        evt.preventDefault();
        const story = document.querySelector(".story");
        if (!story.value) return;
        const body = {
            "id": 0,
            "content": story.value
        }
        fetch(requestURL, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: headers
        }).then(() => {});
        story.value = '';
    };

    useEffect(update);

    return (
        <div className={"main"}>
            <div className={"header"}>
                <h2>Notes</h2>
                <button className={"update"} onClick={()=>update()}>Update</button>
            </div>
            {notes.map((element) => {
                return <div className={"external"} key={element.id}>
                    <button className={"close"} onClick={() => handleRemove(element.id)}>X</button>
                    <div className={"internal"}>{element.content}</div>
                </div>
            })
            }
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="form-label">New Note</label>
                </div>
                <div className="note-text">
                    <textarea className="story"
                              rows="5" cols="33">
                    </textarea>
                    <div>
                        <input type={"submit"} className={"button"} value={"Add"}/>
                    </div>
                </div>
            </form>
        </div>
    )

}

export default Note;
