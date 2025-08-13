import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import RoomCard from '../components/RoomCard'

const RoomPage = () => {
  const [rooms, setRooms] = useState([])
  const [filteredRooms, setFilteredRooms] = useState([])
  const [sortOrder, setSortOrder] = useState('none')
  const [searchQuery, setSearchQuery] = useState('')
  const [bedFilter, setBedFilter] = useState('all')
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const roomsPerPage = 8

  // Fetch rooms from backend
  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true)
      try {
        const response = await axios.get(
          'http://localhost:5000/api/room/get_all_rooms'
        )
        setRooms(response.data.data)
        setFilteredRooms(response.data.data)
      } catch (error) {
        console.error('Error fetching rooms:', error)
      }
      setLoading(false)
    }

    fetchRooms()
  }, [])

  // Apply filters and search
  useEffect(() => {
    let result = [...rooms]

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        room =>
          room.hotelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          room.roomName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply bed filter
    if (bedFilter !== 'all') {
      result = result.filter(room => room.noOfBeds === parseInt(bedFilter))
    }

    // Apply price range filter
    if (priceRange.min !== '') {
      result = result.filter(room => room.price >= parseInt(priceRange.min))
    }
    if (priceRange.max !== '') {
      result = result.filter(room => room.price <= parseInt(priceRange.max))
    }

    setFilteredRooms(result)
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchQuery, bedFilter, priceRange, rooms])

  // Handle sorting
  const handleSort = order => {
    setSortOrder(order)
    const sortedRooms = [...filteredRooms].sort((a, b) => {
      if (order === 'low-to-high') {
        return a.price - b.price
      } else if (order === 'high-to-low') {
        return b.price - a.price
      }
      return 0
    })
    setFilteredRooms(sortedRooms)
  }

  // Handle price range change
  const handlePriceRangeChange = (type, value) => {
    setPriceRange(prev => ({
      ...prev,
      [type]: value
    }))
  }

  // Pagination
  const indexOfLastRoom = currentPage * roomsPerPage
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom)
  const totalPages = Math.ceil(filteredRooms.length / roomsPerPage)

  return (
    <>
      {/* Filters Section */}
      <div
        style={{
          marginTop: '20px',
          marginBottom: '20px',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px'
          }}
        >
          {/* Search Input */}
          <div style={{ flex: '1', minWidth: '200px' }}>
            <input
              type='text'
              placeholder='Search by hotel or room name...'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '5px',
                border: '1px solid #ccc'
              }}
            />
          </div>

          {/* Bed Filter */}
          <div style={{ minWidth: '150px' }}>
            <select
              value={bedFilter}
              onChange={e => setBedFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                backgroundColor: '#fff'
              }}
            >
              <option value='all'>All Beds</option>
              <option value='1'>1 Bed</option>
              <option value='2'>2 Beds</option>
              <option value='3'>3 Beds</option>
              <option value='4'>4 Beds</option>
            </select>
          </div>

          {/* Price Range */}
          <div
            style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              minWidth: '300px'
            }}
          >
            <input
              type='number'
              placeholder='Min Price'
              value={priceRange.min}
              onChange={e => handlePriceRangeChange('min', e.target.value)}
              style={{
                width: '120px',
                padding: '8px',
                borderRadius: '5px',
                border: '1px solid #ccc'
              }}
            />
            <span>-</span>
            <input
              type='number'
              placeholder='Max Price'
              value={priceRange.max}
              onChange={e => handlePriceRangeChange('max', e.target.value)}
              style={{
                width: '120px',
                padding: '8px',
                borderRadius: '5px',
                border: '1px solid #ccc'
              }}
            />
          </div>

          {/* Sort */}
          <div style={{ minWidth: '150px' }}>
            <select
              value={sortOrder}
              onChange={e => handleSort(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                backgroundColor: '#fff'
              }}
            >
              <option value='none'>Sort by Price</option>
              <option value='low-to-high'>Low to High</option>
              <option value='high-to-low'>High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div style={{ padding: '0 20px' }}>
        <p style={{ color: '#666' }}>
          {filteredRooms.length} {filteredRooms.length === 1 ? 'room' : 'rooms'}{' '}
          found
        </p>
      </div>

      {/* Loading State */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>Loading rooms...</p>
        </div>
      ) : (
        <div
          className='section-three'
          style={{
            marginBottom: '40px',
            padding: '0 20px'
          }}
        >
          <div
            className='hotel-rooms'
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              justifyContent: 'center',
              padding: '0 10px'
            }}
          >
            {/* Map over rooms and render RoomCard components */}
            {currentRooms.length > 0 ? (
              currentRooms.map(room => <RoomCard key={room._id} room={room} />)
            ) : (
              <p style={{ fontSize: '16px', color: '#555' }}>
                No rooms available at the moment.
              </p>
            )}
          </div>
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '20px'
              }}
            >
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                style={{
                  padding: '8px 16px',
                  marginRight: '8px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  backgroundColor: currentPage === 1 ? '#eee' : '#fff',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                }}
              >
                Previous
              </button>
              <span style={{ alignSelf: 'center' }}>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage(prev => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                style={{
                  padding: '8px 16px',
                  marginLeft: '8px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  backgroundColor: currentPage === totalPages ? '#eee' : '#fff',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                }}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      <Footer />
    </>
  )
}

export default RoomPage
