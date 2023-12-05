// let details = [];

// Data();
async function Data() {
  let response = await fetch("https://api.openbrewerydb.org/v1/breweries");
  let result = await response.json();
  // Send fetched data to the backend
  // await sendDataToBackend(result);
  let datafromBackend = await fetchDataFromBackend();
  console.log("datafromBackend", datafromBackend);
  return datafromBackend;
}

// export const barId;
// Function to filter and display data based on conditions
async function filterAndDisplay() {
  let res = await Data();
  let parentDiv = document.getElementById("card-listings");
  parentDiv.innerHTML = ""; // Clear the previous content

  if (cond.name === "" && cond.type === "" && cond.city === "") {
    // If all fields are empty, display all data
    addAllToDom();
  } else {
    // Otherwise, filter and display data based on conditions
    res.forEach((ele) => {
      if (
        (cond.name === "" || ele.name.includes(cond.name)) &&
        (cond.city === "" || ele.city.includes(cond.city)) &&
        (cond.type === "" || ele.brewery_type.includes(cond.type))
      ) {
        let singleCard = cardStructure(ele);
        parentDiv.innerHTML += singleCard;
      }
    });
  }
}
async function addAllToDom() {
  // console.log(cond)
  let res = await Data();
  let parentDiv = document.getElementById("card-listings");
  res.forEach((ele) => {
    let singleCard = cardStructure(ele);
    parentDiv.innerHTML += singleCard;
    setRatingOnC(ele);
  });
}

// addTODOM();

function setRatingOnC(data) {
  let reviewLength = data.reviews.length;
  let reviewCount = 0;

  for (let i = 0; i < reviewLength; i++) {
    if (data.reviews[i]?.rating != undefined) {
      reviewCount += data.reviews[i]?.rating;
    }
  }

  let avgRating;

  if (reviewLength != 0) {
    avgRating = Math.floor(reviewCount / reviewLength);
  } else {
    avgRating = 1;
  }

  let rateId = document.getElementById(data._id);
  for (let i = 0; i < avgRating; i++) {
    rateId.innerHTML += `<label for="star8" style="color: orange;">&#9733;</label>`;
  }
}

function cardStructure(data) {
  let cardHtml = `            
              <a href="../Details/detail.html?id=${data._id}" target="_blank">
                <div class="card">
                    <div class="card-img">
                    <img src="../../Images/cardimage.jpg" alt="" srcset="">
                    </div>
                    <div class="card-details">
                    <div class="card-details-1">
                        <h2>${data.name}</h2>
                        <h2 id=${data._id} class="ratingStarClass"></h2>
                    </div>
                    <p>${data.city}, ${data.state}</p>
                    <div class="card-details-2">
                        <p>Address: ${data.address_1}</p>
                        <p>Phone Number: ${data.phone}</p>
                        <a id="anc" href="${data.website_url}" target="_blank">Visit Bar</a>
                    </div>
                </div>
              </a>
                    `;

  return cardHtml;
}

var cond = {
  name: "",
  city: "",
  type: "",
};

document.getElementById("name").addEventListener("input", (e) => {
  cond.name = e.target.value.trim();
  filterAndDisplay(); // Call the filtering function on input change
});

document.getElementById("city").addEventListener("input", (e) => {
  cond.city = e.target.value.trim();
  filterAndDisplay(); // Call the filtering function on input change
});

document.getElementById("opt").addEventListener("input", (e) => {
  cond.type = e.target.value.trim();
  filterAndDisplay(); // Call the filtering function on input change
});

// Initial check to display all data if inputs are empty
filterAndDisplay();

// Send data to the backend
async function sendDataToBackend(data) {
  try {
    const response = await fetch("http://localhost:8080/breweries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log("Data sent successfully to the backend:", responseData);
  } catch (error) {
    console.error("Error sending data to the backend:", error.message);
  }
}

// Function to fetch data from the backend
async function fetchDataFromBackend() {
  try {
    const response = await fetch("http://localhost:8080/breweries");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error; // Rethrow the error for handling at a higher level if needed
  }
}
