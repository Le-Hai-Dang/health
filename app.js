let jitsiApi;
const ADMIN_CODE = "doctor123";
let isAdmin = false;
const waitingUsers = [];  // Đổi từ Set sang Array để dễ quản lý thứ tự

function generateUserId() {
    return 'user_' + Math.random().toString(36).substr(2, 9);
}

function requestJoinQueue() {
    const userId = generateUserId();
    waitingUsers.push(userId);
    updateWaitingList();
    updateUserPosition(userId);
    document.getElementById('requestButton').style.display = 'none';
    document.getElementById('waitingRoom').style.display = 'block';
}

function updateUserPosition(userId) {
    const position = waitingUsers.indexOf(userId) + 1;
    document.getElementById('queuePosition').textContent = position;
    document.getElementById('totalQueue').textContent = waitingUsers.length;
}

function updateWaitingList() {
    if (!isAdmin) return;
    
    const waitingList = document.getElementById("waitingList");
    waitingList.innerHTML = '';
    
    waitingUsers.forEach((userId, index) => {
        const userDiv = document.createElement('div');
        userDiv.className = 'waiting-user';
        userDiv.innerHTML = `
            Bệnh nhân #${index + 1}
            <button onclick="approveUser('${userId}')">Cho phép vào</button>
            <button onclick="rejectUser('${userId}')">Từ chối</button>
        `;
        waitingList.appendChild(userDiv);
    });
}

function approveUser(userId) {
    const index = waitingUsers.indexOf(userId);
    if (index > -1) {
        waitingUsers.splice(index, 1);
    }
    updateWaitingList();
    // Cập nhật lại vị trí cho tất cả user đang chờ
    waitingUsers.forEach(id => updateUserPosition(id));
    alert(`Đã chấp nhận bệnh nhân #${index + 1}`);
}

function rejectUser(userId) {
    const index = waitingUsers.indexOf(userId);
    if (index > -1) {
        waitingUsers.splice(index, 1);
    }
    updateWaitingList();
    // Cập nhật lại vị trí cho tất cả user đang chờ
    waitingUsers.forEach(id => updateUserPosition(id));
    alert(`Đã từ chối bệnh nhân #${index + 1}`);
}

function loginAsAdmin() {
    const adminCodeInput = document.getElementById("adminCode").value;
    if (adminCodeInput === ADMIN_CODE) {
        isAdmin = true;
        document.getElementById("adminPanel").style.display = "block";
        document.getElementById("adminLogin").style.display = "none";
        document.getElementById("waitingRoom").style.display = "none";
        startMeeting(true);
    } else {
        alert("Mã bác sĩ không đúng!");
    }
}

function startMeeting(asAdmin = false) {
    const userId = generateUserId();
    
    if (!asAdmin) {
        waitingUsers.push(userId);
        updateWaitingList();
        return;
    }

    document.getElementById("mainContainer").style.display = "none";
    document.getElementById("meet").style.display = "block";

    const domain = "meet.jit.si";
    const options = {
        roomName: "PhongKhamTrucTuyen_" + Math.random().toString(36).substring(7),
        width: "100%",
        height: "100%",
        parentNode: document.querySelector("#meet"),
        userInfo: {
            displayName: asAdmin ? "Bác sĩ" : "Bệnh nhân"
        },
        interfaceConfigOverwrite: {
            TOOLBAR_BUTTONS: [
                'microphone', 'camera', 'closedcaptions', 'desktop', 
                'fullscreen', 'hangup', 'chat', 'settings', 'raisehand'
            ],
            SHOW_JITSI_WATERMARK: false,
            SHOW_WATERMARK_FOR_GUESTS: false,
        }
    };

    jitsiApi = new JitsiMeetExternalAPI(domain, options);
}

// Tự động vào phòng chờ khi trang được tải
window.onload = function() {
    if (!isAdmin) {
        startMeeting(false);
    }
};