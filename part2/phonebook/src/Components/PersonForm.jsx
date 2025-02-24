const PersonForm = ({ newName, newNumber, addPerson, handleFormChange }) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input value={newName} onChange={handleFormChange} />
            </div>
            <div>
                number: <input value={newNumber} onChange={handleFormChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm