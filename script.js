// ===============================
// SIGNUP
// ===============================

function signup() {

    let name =
        document.getElementById("signupName").value;

    let email =
        document.getElementById("signupEmail").value;

    let password =
        document.getElementById("signupPassword").value;


    if (name === "" ||
        email === "" ||
        password === "") {

        alert("Please fill all fields");

        return;
    }


    let users =
        JSON.parse(localStorage.getItem("users")) || [];


    let existingUser =
        users.find(user => user.email === email);


    if (existingUser) {

        alert("User already exists");

        return;
    }


    users.push({

        name: name,

        email: email,

        password: password,

        role: "user"

    });


    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );


    alert("Signup successful!");

    window.location.href = "login.html";
}


// ===============================
// LOGIN
// ===============================

function login() {

    let email =
        document.getElementById("loginEmail").value;

    let password =
        document.getElementById("loginPassword").value;


    // ADMIN LOGIN

    if (
        email === "admin@gmail.com" &&
        password === "admin123"
    ) {

        localStorage.setItem(
            "currentUser",
            "admin"
        );

        window.location.href =
            "admin.html";

        return;
    }


    // USER LOGIN

    let users =
        JSON.parse(localStorage.getItem("users")) || [];


    let user = users.find(

        u =>
            u.email === email &&
            u.password === password

    );


    if (user) {

        localStorage.setItem(
            "currentUser",
            user.email
        );

        window.location.href =
            "index.html";

    } else {

        alert("Invalid email or password");

    }
}


// ===============================
// LOGOUT
// ===============================

function logout() {

    localStorage.removeItem(
        "currentUser"
    );

    window.location.href =
        "login.html";
}


// ===============================
// ADD PROJECT
// ===============================

function addProject() {

    let title =
        document.getElementById(
            "projectTitle"
        ).value;


    let description =
        document.getElementById(
            "projectDescription"
        ).value;


    if (
        title === "" ||
        description === ""
    ) {

        alert(
            "Please enter project details"
        );

        return;
    }


    let projects =
        JSON.parse(
            localStorage.getItem("projects")
        ) || [];


    projects.push({

        title: title,

        description: description

    });


    localStorage.setItem(

        "projects",

        JSON.stringify(projects)

    );


    alert(
        "Project added successfully!"
    );


    document.getElementById(
        "projectTitle"
    ).value = "";


    document.getElementById(
        "projectDescription"
    ).value = "";


    displayAdminProjects();
}


// ===============================
// DISPLAY PROJECTS FOR USER
// ===============================

function displayProjects() {

    let projectList =
        document.getElementById(
            "projectList"
        );


    if (!projectList) {

        return;

    }


    let projects =
        JSON.parse(
            localStorage.getItem("projects")
        ) || [];


    projectList.innerHTML = "";


    if (projects.length === 0) {

        projectList.innerHTML =
            "<p>No projects available.</p>";

        return;
    }


    projects.forEach(
        project => {

            projectList.innerHTML += `

                <div class="card">

                    <h3>
                        ${project.title}
                    </h3>

                    <br>

                    <p>
                        ${project.description}
                    </p>

                </div>

            `;

        }
    );
}


// ===============================
// DISPLAY PROJECTS FOR ADMIN
// ===============================

function displayAdminProjects() {

    let container =
        document.getElementById(
            "adminProjects"
        );


    if (!container) {

        return;

    }


    let projects =
        JSON.parse(
            localStorage.getItem("projects")
        ) || [];


    container.innerHTML = "";


    if (projects.length === 0) {

        container.innerHTML =
            "<p>No projects available.</p>";

        return;
    }


    projects.forEach(

        (project, index) => {

            container.innerHTML += `

                <div class="card">

                    <h3>
                        ${project.title}
                    </h3>

                    <br>

                    <p>
                        ${project.description}
                    </p>

                    <br>

                    <button
                        onclick="deleteProject(${index})">

                        Delete

                    </button>

                </div>

            `;

        }
    );
}


// ===============================
// DELETE PROJECT
// ===============================

function deleteProject(index) {

    let projects =
        JSON.parse(
            localStorage.getItem("projects")
        ) || [];


    projects.splice(index, 1);


    localStorage.setItem(

        "projects",

        JSON.stringify(projects)

    );


    alert(
        "Project deleted successfully!"
    );


    displayAdminProjects();
}


// ===============================
// SEND CONTACT MESSAGE
// ===============================

function sendMessage(event) {

    event.preventDefault();


    let name =
        document.getElementById(
            "contactName"
        ).value;


    let email =
        document.getElementById(
            "contactEmail"
        ).value;


    let message =
        document.getElementById(
            "message"
        ).value;


    let messages =
        JSON.parse(
            localStorage.getItem("messages")
        ) || [];


    messages.push({

        name: name,

        email: email,

        message: message

    });


    localStorage.setItem(

        "messages",

        JSON.stringify(messages)

    );


    alert(
        "Message sent successfully!"
    );


    document.querySelector(
        "form"
    ).reset();
}


// ===============================
// DISPLAY MESSAGES FOR ADMIN
// ===============================

function displayMessages() {

    let container =
        document.getElementById(
            "messages"
        );


    if (!container) {

        return;

    }


    let messages =
        JSON.parse(
            localStorage.getItem("messages")
        ) || [];


    container.innerHTML = "";


    if (messages.length === 0) {

        container.innerHTML =
            "<p>No messages available.</p>";

        return;
    }


    messages.forEach(

        msg => {

            container.innerHTML += `

                <div class="message-card">

                    <h3>
                        ${msg.name}
                    </h3>

                    <p>
                        Email: ${msg.email}
                    </p>

                    <br>

                    <p>
                        ${msg.message}
                    </p>

                </div>

            `;

        }
    );
}


// ===============================
// PAGE LOAD
// ===============================

window.onload = function () {

    displayProjects();

    displayAdminProjects();

    displayMessages();

};