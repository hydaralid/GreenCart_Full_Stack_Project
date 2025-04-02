import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import Footer from './Footer';
import { getEvents, addEvent, updateEvent, deleteEvent } from './api.js';

const AddEvent = () => {
    const [events, setEvents] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentEventId, setCurrentEventId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        time: '',
        place: '',
        about: ''
    });

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async () => {
        const response = await getEvents();
        setEvents(response.data);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (isEditing) {
            await updateEvent(currentEventId, formData);
        } else {
            await addEvent(formData);
        }

        loadEvents();
        resetForm();
    };

    const handleEdit = (event) => {
        setFormData(event);
        setIsEditing(true);
        setCurrentEventId(event.id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            await deleteEvent(id);
            loadEvents();
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            date: '',
            time: '',
            place: '',
            about: ''
        });
        setIsEditing(false);
        setCurrentEventId(null);
    };

    return (
        <div>
            <Header />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6">
                        <form onSubmit={handleSubmit} className="border p-4 rounded">
                            <h2 className="text-center mb-4">
                                {isEditing ? 'Update Event' : 'Event Registration'}
                            </h2>

                            <div className="mb-3">
                                <label className="form-label">Event Name</label>
                                <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Event Date</label>
                                <input type="date" className="form-control" name="date" value={formData.date} onChange={handleChange} required />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Event Time</label>
                                <input type="time" className="form-control" name="time" value={formData.time} onChange={handleChange} required />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Event Place</label>
                                <input type="text" className="form-control" name="place" value={formData.place} onChange={handleChange} required />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">About Event</label>
                                <textarea className="form-control" name="about" rows="4" value={formData.about} onChange={handleChange} required></textarea>
                            </div>

                            <div className="text-center">
                                <button type="submit" className="btn btn-success">
                                    {isEditing ? 'Update Event' : 'Register Event'}
                                </button>
                                {isEditing && (
                                    <button type="button" className="btn btn-secondary ms-2" onClick={resetForm}>
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    <div className="col-md-6">
                        <h3>Registered Events</h3>
                        {events.length === 0 ? (
                            <p>No events registered yet.</p>
                        ) : (
                            <div className="list-group">
                                {events.map(event => (
                                    <div key={event.id} className="list-group-item">
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5>{event.name}</h5>
                                            <small>{event.date} at {event.time}</small>
                                        </div>
                                        <p>{event.place}</p>
                                        <p>{event.about}</p>
                                        <div>
                                            <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(event)}>
                                                Edit
                                            </button>
                                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(event.id)}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AddEvent;
