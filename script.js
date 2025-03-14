async function getGrades() {
    try {
        let response = await fetch(`https://amhep.pythonanywhere.com/grades`);
        let data = await response.json();
        console.log("All Grades: ", data);
    } catch (error) {
        console.error("Error fetching grades: ", error);
    }
}

// ----------------------------------------

async function searchGrades(){
    let name = document.getElementById("searchName").value.trim();

    try {
        let response = await fetch(`https://amhep.pythonanywhere.com/grades`);
        if (!response.ok) throw new Error("Unable to find student.");

        let data = await response.json();
        console.log(`Searched Name: "${name}"`);
        console.log("Server Response:", data);

        if (data[name]) {
            document.getElementById("retrievedGrade").value = data[name];
        } else {
            document.getElementById("retrievedGrade").value = "No grade found";
        }
    } catch (error) {
        console.error("Error getting grade: ", error);
        document.getElementById("retrievedGrade").value = "Error retrieving grade";
    }
}

// ----------------------------------------

async function addGrades(){
    let name = document.getElementById("addName").value.trim();
    let grade = document.getElementById("addGrade").value.trim();

    if (!name || !grade) {
        console.error("Enter both name and grade");
        return;
    }

    try {
        let response = await fetch(`https://amhep.pythonanywhere.com/grades`, {
            method: "POST",
            headers: {"Content-Type": "application/json" },
            body: JSON.stringify({name, grade: parseFloat(grade)})
        });

        let data = await response.json();
        console.log("Successfully added.", data);
        document.getElementById("addName").value = "";
        document.getElementById("addGrade").value = "";
        getGrades();

    } catch (error) {
        console.error("Error adding:", error);
        document.getElementById("addName").value = "";
        document.getElementById("addGrade").value = "";
    }
}

// ----------------------------------------

async function updateGrade() {
    let name = document.getElementById("editName").value.trim();
    let grade = document.getElementById("editGrade").value.trim();

    try {
        let response = await fetch(`https://amhep.pythonanywhere.com/grades/${encodeURIComponent(name)}`,
    {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({grade: parseFloat(grade)})
    });
    
    let data = await response.json();
    console.log("Successfully updated: ", data);

    document.getElementById("editName").value = "";
    document.getElementById("editGrade").value = "";
    getGrades();
    } catch (error) {
        console.error("Error updating: ", error);

        document.getElementById("editName").value = "";
        document.getElementById("editGrade").value = "";
    }
}

async function deleteGrade() {
    let name = document.getElementById("deleteName").value.trim();

    try { 
        let response = await fetch(`https://amhep.pythonanywhere.com/grades/${encodeURIComponent(name)}`, {
            method: "DELETE"
        });
        let data = await response.json();
        document.getElementById("deleteName").value = "";
        getGrades();

    } catch (error) {
        console.error("Error deleting: ", error);
        document.getElementById("deleteName").value = "";
    }
}