import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Footer from '../components/Footer'

const UpdateDeleteRoom = () => {
  const { id } = useParams() // Room ID from URL
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    roomName: '',
    hotelName: '',
    price: '',
    location: '',
    latitude: '',
    longitude: '',
    description: '',
    noOfBeds: ''
  })
  const [image, setImage] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false) // Prevent multiple submissions

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/room/get_single_room/${id}`
        )
        if (response.data && response.data.data) {
          const room = response.data.data
          // If location is GeoJSON, extract lat/lng
          let latitude = ''
          let longitude = ''
          if (
            room.location &&
            typeof room.location === 'object' &&
            Array.isArray(room.location.coordinates)
          ) {
            longitude = room.location.coordinates[0]
            latitude = room.location.coordinates[1]
          }
          setFormData({
            ...room,
            latitude: latitude,
            longitude: longitude,
            location:
              room.location && typeof room.location === 'string'
                ? room.location
                : ''
          })
        } else {
          toast.error('Room data not found.')
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || 'Failed to fetch room details.'
        )
      }
    }
    fetchRoom()
  }, [id])

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleImageChange = e => {
    setImage(e.target.files[0])
  }

  const handleUpdate = async e => {
    e.preventDefault()
    if (isSubmitting) return // Prevent multiple submissions
    setIsSubmitting(true)

    const formDataToSend = new FormData()
    // Prepare GeoJSON location if lat/lng present
    const { latitude, longitude, ...rest } = formData
    Object.keys(rest).forEach(key => {
      formDataToSend.append(key, rest[key])
    })
    if (latitude && longitude) {
      formDataToSend.append('latitude', String(latitude))
      formDataToSend.append('longitude', String(longitude))
    }
    if (image) {
      formDataToSend.append('image', image)
    }

    try {
      await axios.put(
        `http://localhost:5000/api/room/update_room/${id}`,
        formDataToSend,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      )
      toast.success('Room updated successfully!')
      navigate('/rooms')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update room.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this room?')) return

    try {
      await axios.delete(`http://localhost:5000/api/room/delete_room/${id}`)
      toast.success('Room deleted successfully!')
      navigate('/rooms')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete room.')
    }
  }

  const styles = {
    layout: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    },
    content: {
      flex: 1,
      padding: '40px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    formContainer: {
      width: '60%',
      maxWidth: '800px',
      padding: '20px',
      backgroundColor: '#FFFFFF',
      borderRadius: '12px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
    },
    form: {
      display: 'grid',
      gap: '16px'
    },
    input: {
      padding: '12px',
      fontSize: '16px',
      border: '1px solid #CCC',
      borderRadius: '8px'
    },
    textarea: {
      padding: '12px',
      fontSize: '16px',
      border: '1px solid #CCC',
      borderRadius: '8px',
      resize: 'vertical',
      minHeight: '120px'
    },
    button: {
      padding: '12px 20px',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer'
    },
    updateButton: {
      backgroundColor: '#28A745',
      color: '#FFFFFF',
      border: 'none'
    },
    deleteButton: {
      backgroundColor: '#DC3545',
      color: '#FFFFFF',
      border: 'none'
    },
    cancelButton: {
      backgroundColor: '#6C757D',
      color: '#FFFFFF',
      border: 'none'
    }
  }

  return (
    <div style={styles.layout}>
      {/* Main Content */}
      <div style={styles.content}>
        <div style={styles.formContainer}>
          <h1
            style={{
              marginBottom: '20px',
              textAlign: 'center',
              fontFamily: "'Roboto Slab', serif"
            }}
          >
            Update or Delete Room
          </h1>
          <form onSubmit={handleUpdate} style={styles.form}>
            <input
              type='text'
              name='roomName'
              placeholder='Room Name'
              value={formData.roomName || ''}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <input
              type='text'
              name='hotelName'
              placeholder='Hotel Name'
              value={formData.hotelName || ''}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <input
              type='number'
              name='price'
              placeholder='Price'
              value={formData.price || ''}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <input
              type='text'
              name='location'
              placeholder='Location (e.g., Kathmandu, Nepal)'
              value={formData.location || ''}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <input
              type='number'
              name='latitude'
              placeholder='Latitude (e.g., 27.7172)'
              value={formData.latitude}
              onChange={handleChange}
              required
              step='any'
              style={styles.input}
            />
            <input
              type='number'
              name='longitude'
              placeholder='Longitude (e.g., 85.3240)'
              value={formData.longitude}
              onChange={handleChange}
              required
              step='any'
              style={styles.input}
            />
            <textarea
              name='description'
              placeholder='Description'
              value={formData.description || ''}
              onChange={handleChange}
              required
              style={styles.textarea}
            />
            <input
              type='number'
              name='noOfBeds'
              placeholder='Number of Beds'
              value={formData.noOfBeds || ''}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <input
              type='file'
              name='image'
              onChange={handleImageChange}
              accept='image/*'
              style={styles.input}
            />
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button
                type='submit'
                style={{ ...styles.button, ...styles.updateButton }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Updating...' : 'Update Room'}
              </button>
              <button
                type='button'
                onClick={handleDelete}
                style={{ ...styles.button, ...styles.deleteButton }}
              >
                Delete Room
              </button>
              <button
                type='button'
                onClick={() => navigate('/rooms')}
                style={{ ...styles.button, ...styles.cancelButton }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default UpdateDeleteRoom
