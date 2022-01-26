import React, {useState} from 'react';
import '../App.css';

function Note({text}) {
    const [notes, setNotes] = useState([]);

    const handleRemove = id => {
        setNotes(prevNotes => prevNotes.filter(o => o.id !== id));
    };

    const handleSubmit = evt => {
        evt.preventDefault();
        if (!form.date || !form.km) return;
        form.date = parseDate(form.date);
        setRecords(prevRecords => {
            const arr = prevRecords.slice();
            //проверить если уже есть такая дата
            const index = arr.findIndex((item) => item.id === form.date);
            if (index > -1) {
                const km = String(Number(arr[index].km) + Number(form.km));
                arr.splice(index, 1);
                arr.push(new RecordModel(form.date, km));
                arr.sort((a, b) => compare(a.id, b.id));

            } else {
                const record = new RecordModel(form.date, form.km);
                arr.push(record);
                arr.sort((a, b) => compare(a.id, b.id));
            }
            setForm({date: '', km: ''});
            return [...arr];
        });
    };

    return (
        <>
            <div className={"external"}>
                <button className={"close"} onClick={() => handleRemove(id)}>X</button>
                <div className={"internal"}>{text}</div>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="date" className="form-label">New Note</label>
                </div>
                <div className={note-text}></div>
                <div>
                    <input type={"submit"} value={"OK"}/>
                </div>
            </form>
        </>
    )

}

export default Note;
