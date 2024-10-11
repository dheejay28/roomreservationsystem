document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const adminDashboard = document.getElementById('admin-dashboard');
    const guestDashboard = document.getElementById('guest-dashboard');
    const loginScreen = document.getElementById('login-screen');
    const roomList = document.getElementById('room-list');
    const availableRooms = document.getElementById('available-rooms');
    const roomSelect = document.getElementById('room-select');
    const reservationMessage = document.getElementById('reservation-message');
    const newRoomInput = document.getElementById('new-room');
    const reserveDate = document.getElementById('reserve-date');

    const users = {
        admin: { password: 'admin123', role: 'admin' },
        guest: { password: 'guest123', role: 'guest' }
    };

    let rooms = JSON.parse(localStorage.getItem('rooms')) || [];

    function updateRoomList() {
        roomList.innerHTML = '';
        availableRooms.innerHTML = '';
        roomSelect.innerHTML = '';

        rooms.forEach((room, index) => {
            const li = document.createElement('li');
            li.textContent = `${room.name} - ${room.available ? 'Available' : 'Occupied'}`;
            roomList.appendChild(li);

            if (room.available) {
                const liAvailable = document.createElement('li');
                liAvailable.textContent = room.name;
                availableRooms.appendChild(liAvailable);

                const option = document.createElement('option');
                option.value = index;
                option.textContent = room.name;
                roomSelect.appendChild(option);
            }
        });
    }

    function login(username, password) {
        const user = users[username];
        if (user && user.password === password) {
            if (user.role === 'admin') {
                loginScreen.style.display = 'none';
                adminDashboard.style.display = 'block';
                updateRoomList();
            } else if (user.role === 'guest') {
                loginScreen.style.display = 'none';
                guestDashboard.style.display = 'block';
                updateRoomList();
            }
        } else {
            document.getElementById('login-message').textContent = 'Invalid username or password!';
        }
    }

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        login(username, password);
    });

    document.getElementById('logout-admin').addEventListener('click', function () {
        adminDashboard.style.display = 'none';
        loginScreen.style.display = 'block';
    });

    document.getElementById('logout-guest').addEventListener('click', function () {
        guestDashboard.style.display = 'none';
        loginScreen.style.display = 'block';
    });

    document.getElementById('add-room').addEventListener('click', function () {
        const roomName = newRoomInput.value;
        if (roomName) {
            rooms.push({ name: roomName, available: true });
            localStorage.setItem('rooms', JSON.stringify(rooms));
            updateRoomList();
            newRoomInput.value = '';
        }
    });

    document.getElementById('reserve-room').addEventListener('click', function () {
        const selectedRoomIndex = roomSelect.value;
        if (selectedRoomIndex !== '' && reserveDate.value !== '') {
            rooms[selectedRoomIndex].available = false;
            localStorage.setItem('rooms', JSON.stringify(rooms));
            updateRoomList();
            reservationMessage.textContent = `Room reserved successfully for ${reserveDate.value}!`;
        } else {
            reservationMessage.textContent = 'Please select a room and date!';
        }
    });

    updateRoomList();
});
