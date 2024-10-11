document.addEventListener('DOMContentLoaded', () => {
    // Initial room data
    let rooms = {
        "101": "Vacant", "102": "Vacant", "103": "Vacant", "104": "Vacant",
        "201": "Vacant", "202": "Vacant", "203": "Vacant", "204": "Vacant",
        "301": "Vacant", "302": "Vacant", "303": "Vacant"
    };

    let reservations = {}; // Store reservation details

    const occupiedList = document.getElementById('occupiedRooms');
    const vacantList = document.getElementById('vacantRooms');

    const updateRoomDisplay = () => {
        occupiedList.innerHTML = '';
        vacantList.innerHTML = '';
        for (let room in rooms) {
            let listItem = document.createElement('li');
            if (rooms[room] === "Occupied") {
                listItem.textContent = `Room ${room} - Reservation Code: ${reservations[room].code}`;
                occupiedList.appendChild(listItem);
            } else {
                listItem.textContent = `Room ${room}`;
                vacantList.appendChild(listItem);
            }
        }
    };

    // Generate a random reservation code
    const generateReservationCode = () => {
        return Math.random().toString(36).substring(2, 10).toUpperCase();
    };

    // Handle room reservation
    document.getElementById('reserveForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const roomNumber = document.getElementById('roomNumber').value;
        const section = document.getElementById('section').value;
        const time = document.getElementById('time').value;
        const date = document.getElementById('date').value;

        if (rooms[roomNumber] === "Vacant") {
            let code = generateReservationCode();
            rooms[roomNumber] = "Occupied";
            reservations[roomNumber] = { section, time, date, code };
            alert(`Room reserved successfully. Your reservation code is ${code}`);
        } else {
            alert('Room is already occupied!');
        }

        updateRoomDisplay();
    });

    // Handle room return
    document.getElementById('returnForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const roomNumber = document.getElementById('returnRoomNumber').value;
        const reservationCode = document.getElementById('reservationCode').value;

        if (rooms[roomNumber] === "Occupied" && reservations[roomNumber].code === reservationCode) {
            rooms[roomNumber] = "Vacant";
            delete reservations[roomNumber];
            alert(`Room ${roomNumber} has been returned.`);
        } else {
            alert('Invalid reservation code or room is not occupied!');
        }

        updateRoomDisplay();
    });

    // Handle admin login to add a new room
    document.getElementById('adminLoginBtn').addEventListener('click', () => {
        const adminUsername = prompt("Enter Admin Username:");
        const adminPassword = prompt("Enter Admin Password:");

        if (adminUsername === 'admin' && adminPassword === 'password123') {
            document.getElementById('addRoomForm').style.display = 'block';
        } else {
            alert('Invalid admin credentials!');
        }
    });

    // Handle adding a new room
    document.getElementById('addRoomForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const newRoomNumber = document.getElementById('newRoomNumber').value;

        if (!rooms[newRoomNumber]) {
            rooms[newRoomNumber] = "Vacant";
            alert(`Room ${newRoomNumber} added successfully.`);
            updateRoomDisplay();
        } else {
            alert('Room already exists!');
        }
    });

    updateRoomDisplay();
});
